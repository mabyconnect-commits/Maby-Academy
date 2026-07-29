import "server-only";
import type { CommissionStatus } from "@prisma/client";
import { db } from "@/lib/db";
import { ServiceError } from "./auth";
import { notify, audit } from "./notifications";
import { assertCan, type Actor } from "./policy";

/**
 * Commission review and payout.
 *
 * Commissions are written as PENDING the moment an order is paid, but money
 * only leaves after a human approves it. That gap is deliberate: it is where
 * refunds, chargebacks and self-referral fraud get caught, and it is what
 * keeps the referral programme defensible rather than automatic.
 */

/** How long a commission must sit before it can be approved. */
export const HOLDING_PERIOD_DAYS = 14;

const NEXT_STATUS: Record<CommissionStatus, CommissionStatus[]> = {
  PENDING: ["APPROVED", "VOID"],
  APPROVED: ["PAID", "VOID"],
  PAID: [],
  VOID: [],
};

export async function getCommissionQueue(
  actor: Actor,
  status: CommissionStatus = "PENDING",
) {
  assertCan(actor, "commission:approve");

  const rows = await db.referralCommission.findMany({
    where: { status },
    orderBy: { createdAt: "asc" },
    take: 200,
    include: {
      beneficiary: { select: { id: true, name: true, email: true, avatarUrl: true } },
      sourceUser: { select: { id: true, name: true, email: true } },
      order: {
        select: {
          id: true,
          status: true,
          paidAt: true,
          amountMinor: true,
          course: { select: { title: true } },
        },
      },
    },
  });

  const cutoff = Date.now() - HOLDING_PERIOD_DAYS * 86_400_000;

  return rows.map((row) => {
    // Surface the reasons a human would otherwise have to hunt for.
    const flags: string[] = [];

    if (row.beneficiaryId === row.sourceUserId) {
      flags.push("Self-referral");
    }
    if (row.order.status === "REFUNDED") {
      flags.push("Order refunded");
    }
    if (row.order.status !== "PAID") {
      flags.push(`Order is ${row.order.status.toLowerCase()}`);
    }
    if (row.createdAt.getTime() > cutoff) {
      flags.push(`Inside ${HOLDING_PERIOD_DAYS}-day holding period`);
    }

    return { ...row, flags, isClearToApprove: flags.length === 0 };
  });
}

export async function getFinanceOverview(actor: Actor) {
  assertCan(actor, "financial_report:export");

  const [revenue, refunded, byStatus, recentOrders] = await Promise.all([
    db.order.aggregate({
      where: { status: "PAID" },
      _sum: { amountMinor: true },
      _count: true,
    }),
    db.order.aggregate({
      where: { status: "REFUNDED" },
      _sum: { amountMinor: true },
      _count: true,
    }),
    db.referralCommission.groupBy({
      by: ["status"],
      _sum: { amountMinor: true },
      _count: true,
    }),
    db.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      include: {
        user: { select: { name: true, email: true } },
        course: { select: { title: true } },
      },
    }),
  ]);

  const sumFor = (status: CommissionStatus) =>
    byStatus.find((b) => b.status === status)?._sum.amountMinor ?? 0;
  const countFor = (status: CommissionStatus) =>
    byStatus.find((b) => b.status === status)?._count ?? 0;

  const grossMinor = revenue._sum.amountMinor ?? 0;
  const refundedMinor = refunded._sum.amountMinor ?? 0;
  const liabilityMinor = sumFor("PENDING") + sumFor("APPROVED");

  return {
    grossMinor,
    refundedMinor,
    netMinor: grossMinor - refundedMinor,
    orderCount: revenue._count,
    refundCount: refunded._count,
    commissions: {
      pending: { amountMinor: sumFor("PENDING"), count: countFor("PENDING") },
      approved: { amountMinor: sumFor("APPROVED"), count: countFor("APPROVED") },
      paid: { amountMinor: sumFor("PAID"), count: countFor("PAID") },
      void: { amountMinor: sumFor("VOID"), count: countFor("VOID") },
    },
    /** Money owed but not yet paid out — the number that matters for cashflow. */
    liabilityMinor,
    recentOrders,
  };
}

async function transition(
  actor: Actor,
  commissionId: string,
  to: CommissionStatus,
  note?: string,
) {
  const commission = await db.referralCommission.findUnique({
    where: { id: commissionId },
    include: {
      order: { select: { status: true } },
      beneficiary: { select: { id: true, name: true } },
    },
  });
  if (!commission) throw new ServiceError("Commission not found.", 404);

  if (!NEXT_STATUS[commission.status].includes(to)) {
    throw new ServiceError(
      `A ${commission.status.toLowerCase()} commission cannot become ${to.toLowerCase()}.`,
      400,
    );
  }

  // Never approve or pay against money that was given back.
  if (
    (to === "APPROVED" || to === "PAID") &&
    commission.order.status !== "PAID"
  ) {
    throw new ServiceError(
      `The underlying order is ${commission.order.status.toLowerCase()} — this commission cannot be ${to.toLowerCase()}.`,
      400,
    );
  }

  const updated = await db.referralCommission.update({
    where: { id: commissionId },
    data: { status: to, ...(to === "PAID" ? { paidAt: new Date() } : {}) },
  });

  await audit({
    userId: actor.id,
    action: `commission.${to.toLowerCase()}`,
    entityType: "ReferralCommission",
    entityId: commissionId,
    metadata: { amountMinor: commission.amountMinor, note },
  });

  return { updated, commission };
}

export async function approveCommission(
  actor: Actor,
  commissionId: string,
  note?: string,
) {
  assertCan(actor, "commission:approve");
  const { updated } = await transition(actor, commissionId, "APPROVED", note);
  return updated;
}

export async function voidCommission(
  actor: Actor,
  commissionId: string,
  reason: string,
) {
  assertCan(actor, "commission:approve");

  if (!reason?.trim()) {
    throw new ServiceError("Give a reason for voiding this commission.", 400);
  }

  const { updated, commission } = await transition(
    actor,
    commissionId,
    "VOID",
    reason,
  );

  await notify(db, {
    userId: commission.beneficiaryId,
    type: "REFERRAL",
    title: "A commission was voided",
    body: `A referral commission on your account was voided. Reason: ${reason}`,
    linkUrl: "/dashboard/referrals",
  });

  return updated;
}

export async function markCommissionPaid(
  actor: Actor,
  commissionId: string,
  reference?: string,
) {
  assertCan(actor, "payout:execute");
  const { updated, commission } = await transition(
    actor,
    commissionId,
    "PAID",
    reference,
  );

  await notify(db, {
    userId: commission.beneficiaryId,
    type: "REFERRAL",
    title: "Commission paid",
    body: "A referral commission has been paid out to you.",
    linkUrl: "/dashboard/referrals",
  });

  return updated;
}

/** Approve everything with no flags against it, in one pass. */
export async function approveClearCommissions(actor: Actor) {
  assertCan(actor, "commission:approve");

  const queue = await getCommissionQueue(actor, "PENDING");
  const clear = queue.filter((c) => c.isClearToApprove);

  let approved = 0;
  for (const commission of clear) {
    try {
      await approveCommission(actor, commission.id, "Bulk approval — no flags");
      approved++;
    } catch {
      // One bad row must not abort the batch.
    }
  }

  return { approved, skipped: queue.length - approved };
}
