import "server-only";
import { randomBytes } from "node:crypto";
import { db } from "@/lib/db";
import { env } from "@/lib/env";
import {
  DEFAULT_PROVIDER,
  PaymentError,
  getProvider,
  paymentsEnabled,
} from "@/lib/payments";
import { ServiceError } from "./auth";
import { notify, audit } from "./notifications";
import { payoutOrderCommissions } from "./referrals";
import { isFeatureEnabled } from "./features";

/**
 * Checkout and fulfilment.
 *
 * The invariant everything here protects: **a member is enrolled if and only
 * if a verified payment exists for their order**. Enrolment therefore happens
 * in exactly one place — `fulfilOrder` — which is idempotent, verifies with
 * the provider rather than trusting any inbound request, and re-checks the
 * amount and currency against what we asked for.
 */

/** Human-ish, unique, and safe in a URL query string. */
function generateReference() {
  return `MABY-${Date.now().toString(36).toUpperCase()}-${randomBytes(4)
    .toString("hex")
    .toUpperCase()}`;
}

export async function startCourseCheckout(params: {
  userId: string;
  courseId: string;
}) {
  const [user, course] = await Promise.all([
    db.user.findUnique({
      where: { id: params.userId },
      select: { id: true, email: true, name: true },
    }),
    db.course.findUnique({
      where: { id: params.courseId },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        priceMinor: true,
        currency: true,
      },
    }),
  ]);

  if (!user) throw new ServiceError("Account not found.", 404);
  if (!course || course.status !== "PUBLISHED") {
    throw new ServiceError("That course is not available.", 404);
  }
  if (course.priceMinor <= 0) {
    throw new ServiceError("This course is free — no payment is needed.", 400);
  }

  const existing = await db.enrollment.findUnique({
    where: { userId_courseId: { userId: user.id, courseId: course.id } },
    select: { id: true },
  });
  if (existing) {
    throw new ServiceError("You are already enrolled in this course.", 409);
  }

  if (!paymentsEnabled()) {
    throw new ServiceError(
      "Payments are not available right now. Please try again later.",
      503,
    );
  }

  const provider = getProvider(DEFAULT_PROVIDER);
  if (!provider.currencies.includes(course.currency.toUpperCase())) {
    throw new ServiceError(
      `This course is priced in ${course.currency}, which the payment provider cannot accept.`,
      400,
    );
  }

  // Reuse an unpaid order for the same course rather than littering the
  // ledger every time someone abandons checkout and comes back.
  const pending = await db.order.findFirst({
    where: { userId: user.id, courseId: course.id, status: "PENDING" },
    orderBy: { createdAt: "desc" },
  });

  const order =
    pending ??
    (await db.order.create({
      data: {
        userId: user.id,
        courseId: course.id,
        amountMinor: course.priceMinor,
        currency: course.currency,
        status: "PENDING",
        provider: DEFAULT_PROVIDER,
        providerRef: generateReference(),
      },
    }));

  // The reference is the join between our order and the provider's record.
  const reference = order.providerRef ?? generateReference();
  if (!order.providerRef) {
    await db.order.update({
      where: { id: order.id },
      data: { providerRef: reference },
    });
  }

  const session = await provider.createCheckout({
    reference,
    amountMinor: order.amountMinor,
    currency: order.currency,
    customer: { email: user.email, name: user.name },
    description: course.title,
    redirectUrl: `${env.NEXT_PUBLIC_APP_URL}/checkout/return`,
    metadata: { orderId: order.id, courseId: course.id, userId: user.id },
  });

  await audit({
    userId: user.id,
    action: "checkout.started",
    entityType: "Order",
    entityId: order.id,
    metadata: { reference, amountMinor: order.amountMinor },
  });

  return { order, reference, paymentUrl: session.paymentUrl };
}

/**
 * Verify a payment with the provider and, if genuine, fulfil the order.
 *
 * Safe to call repeatedly and concurrently — from the return page, from the
 * webhook, or from a manual retry. All three routes land here.
 */
export async function fulfilOrder(reference: string) {
  const order = await db.order.findFirst({
    where: { providerRef: reference },
    include: {
      user: { select: { id: true, name: true } },
      course: { select: { id: true, title: true, slug: true } },
    },
  });

  if (!order) {
    return { ok: false as const, reason: "unknown_reference" as const };
  }

  // Already done. Return success so a duplicate webhook is a no-op, not an error.
  if (order.status === "PAID") {
    return { ok: true as const, alreadyFulfilled: true, order };
  }

  const provider = getProvider(order.provider);
  const result = await provider.verify(reference);

  if (result.status !== "SUCCESSFUL") {
    if (result.status === "FAILED" || result.status === "CANCELLED") {
      await db.order.update({
        where: { id: order.id },
        data: { status: "FAILED" },
      });
    }
    return {
      ok: false as const,
      reason: result.status.toLowerCase() as
        | "pending"
        | "failed"
        | "cancelled"
        | "not_found",
      order,
    };
  }

  // The payer controls what they type into a hosted checkout page in some
  // flows, so confirm we were paid what we asked for, in the currency we
  // asked for. Underpayment must never grant access.
  if (
    result.amountMinor === null ||
    result.amountMinor < order.amountMinor ||
    result.currency?.toUpperCase() !== order.currency.toUpperCase()
  ) {
    await audit({
      userId: order.userId,
      action: "checkout.amount_mismatch",
      entityType: "Order",
      entityId: order.id,
      metadata: {
        expectedMinor: order.amountMinor,
        expectedCurrency: order.currency,
        receivedMinor: result.amountMinor,
        receivedCurrency: result.currency,
      },
    });
    return { ok: false as const, reason: "amount_mismatch" as const, order };
  }

  const commissionsEnabled = await isFeatureEnabled("referral_commissions");

  await db.$transaction(async (tx) => {
    // Re-read inside the transaction: two webhooks arriving together would
    // otherwise both pass the earlier PAID check and enrol twice.
    const fresh = await tx.order.findUniqueOrThrow({
      where: { id: order.id },
      select: { status: true },
    });
    if (fresh.status === "PAID") return;

    await tx.order.update({
      where: { id: order.id },
      data: {
        status: "PAID",
        paidAt: result.paidAt ?? new Date(),
        providerRef: reference,
      },
    });

    await tx.enrollment.upsert({
      where: {
        userId_courseId: { userId: order.userId, courseId: order.courseId },
      },
      create: {
        userId: order.userId,
        courseId: order.courseId,
        status: "ACTIVE",
      },
      update: {},
    });

    await tx.invoice.create({
      data: {
        number: `INV-${reference}`,
        userId: order.userId,
        orderId: order.id,
        subtotalMinor: order.amountMinor,
        totalMinor: order.amountMinor,
        currency: order.currency,
        status: "PAID",
        paidAt: result.paidAt ?? new Date(),
      },
    });

    // Commissions stay behind a flag until the compliance review recorded in
    // docs/ROADMAP.md is done. Orders still fulfil; nobody accrues a payout.
    if (commissionsEnabled) {
      await payoutOrderCommissions(tx, {
        orderId: order.id,
        buyerId: order.userId,
        amountMinor: order.amountMinor,
        currency: order.currency,
      });
    }

    await notify(tx, {
      userId: order.userId,
      type: "COURSE",
      title: `You're enrolled in ${order.course.title}`,
      body: "Payment received and your seat is confirmed. Start with lesson one.",
      linkUrl: `/courses/${order.course.slug}`,
    });
  });

  await audit({
    userId: order.userId,
    action: "checkout.fulfilled",
    entityType: "Order",
    entityId: order.id,
    metadata: { reference, providerRef: result.providerRef },
  });

  return { ok: true as const, alreadyFulfilled: false, order };
}

export async function getOrderByReference(reference: string, userId?: string) {
  return db.order.findFirst({
    where: { providerRef: reference, ...(userId ? { userId } : {}) },
    include: { course: { select: { title: true, slug: true } } },
  });
}

export async function getMyOrders(userId: string) {
  return db.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      course: { select: { title: true, slug: true } },
      invoices: { select: { id: true, number: true, status: true } },
    },
  });
}
