import "server-only";
import type { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { env, referralRates } from "@/lib/env";
import { awardPoints } from "./rewards";
import { notify } from "./notifications";

type Tx = Prisma.TransactionClient;

export const SIGNUP_REFERRAL_POINTS = 100;

export function referralLink(code: string) {
  return `${env.NEXT_PUBLIC_APP_URL}/register?ref=${code}`;
}

export async function findReferrerByCode(code: string) {
  if (!code) return null;
  return db.user.findUnique({
    where: { referralCode: code.trim().toUpperCase() },
    select: { id: true, name: true, isActive: true },
  });
}

/**
 * Walk the referral tree upward from a user, up to the configured depth.
 * Returns [{ userId, level }] with level 1 = direct referrer.
 *
 * A `seen` set guards against a cycle in the tree — which the API prevents,
 * but a bad backfill or manual DB edit could still introduce, and an infinite
 * loop here would hang a request holding a transaction open.
 */
export async function getUpline(
  client: Tx | typeof db,
  userId: string,
  depth = referralRates.length,
): Promise<{ userId: string; level: number }[]> {
  const chain: { userId: string; level: number }[] = [];
  const seen = new Set<string>([userId]);
  let currentId: string | null = userId;

  for (let level = 1; level <= depth; level++) {
    const node: { referredById: string | null } | null =
      await client.user.findUnique({
        where: { id: currentId as string },
        select: { referredById: true },
      });
    const parentId: string | null = node?.referredById ?? null;
    if (!parentId || seen.has(parentId)) break;
    seen.add(parentId);
    chain.push({ userId: parentId, level });
    currentId = parentId;
  }

  return chain;
}

/**
 * Called once, inside the registration transaction, when a new member signs
 * up with a referral code. Pays a flat signup bonus to the direct referrer.
 */
export async function recordSignupReferral(
  client: Tx,
  params: { newUserId: string; newUserName: string; referrerId: string },
) {
  await awardPoints(client, {
    userId: params.referrerId,
    amount: SIGNUP_REFERRAL_POINTS,
    reason: "REFERRAL_SIGNUP",
    referenceKey: `referral-signup:${params.newUserId}`,
    note: `${params.newUserName} joined with your code`,
  });

  await notify(client, {
    userId: params.referrerId,
    type: "REFERRAL",
    title: "Someone joined with your code 🎉",
    body: `${params.newUserName} just joined Maby Academy through your referral link. You earned ${SIGNUP_REFERRAL_POINTS} points.`,
    linkUrl: "/dashboard/referrals",
  });
}

/**
 * Multi-level commission payout for a paid order.
 *
 * Walks the buyer's upline and writes one commission row per level, at the
 * rate configured for that level. Runs inside the caller's transaction so a
 * paid order and its commissions commit together or not at all.
 */
export async function payoutOrderCommissions(
  client: Tx,
  params: {
    orderId: string;
    buyerId: string;
    amountMinor: number;
    currency: string;
  },
) {
  const upline = await getUpline(client, params.buyerId);
  if (upline.length === 0) return [];

  const created: { beneficiaryId: string; level: number; amountMinor: number }[] = [];

  for (const { userId: beneficiaryId, level } of upline) {
    const rate = referralRates[level - 1];
    if (!rate) continue;

    const amountMinor = Math.round(params.amountMinor * rate);
    if (amountMinor <= 0) continue;

    // Unique on (orderId, beneficiaryId) makes replaying a webhook safe.
    const existing = await client.referralCommission.findUnique({
      where: {
        orderId_beneficiaryId: { orderId: params.orderId, beneficiaryId },
      },
      select: { id: true },
    });
    if (existing) continue;

    await client.referralCommission.create({
      data: {
        orderId: params.orderId,
        beneficiaryId,
        sourceUserId: params.buyerId,
        level,
        ratePercent: Math.round(rate * 100),
        amountMinor,
        currency: params.currency,
        status: "PENDING",
      },
    });

    await notify(client, {
      userId: beneficiaryId,
      type: "REFERRAL",
      title: `Level ${level} commission earned`,
      body: `You earned a level ${level} commission from a purchase in your network.`,
      linkUrl: "/dashboard/referrals",
    });

    created.push({ beneficiaryId, level, amountMinor });
  }

  return created;
}

/** Everything the referrals dashboard needs, in one round trip per concern. */
export async function getReferralOverview(userId: string) {
  const [me, directReferrals, commissions, totals] = await Promise.all([
    db.user.findUnique({
      where: { id: userId },
      select: { referralCode: true, name: true },
    }),
    db.user.findMany({
      where: { referredById: userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        avatarUrl: true,
        createdAt: true,
        lifetimePoints: true,
        _count: { select: { referrals: true, enrollments: true } },
      },
    }),
    db.referralCommission.findMany({
      where: { beneficiaryId: userId },
      orderBy: { createdAt: "desc" },
      take: 50,
      include: {
        sourceUser: { select: { name: true, avatarUrl: true } },
        order: { select: { course: { select: { title: true } } } },
      },
    }),
    db.referralCommission.groupBy({
      by: ["status"],
      where: { beneficiaryId: userId },
      _sum: { amountMinor: true },
    }),
  ]);

  // Count level-2 members (referrals of my referrals) for the network view.
  const directIds = directReferrals.map((r) => r.id);
  const level2Count =
    directIds.length > 0
      ? await db.user.count({ where: { referredById: { in: directIds } } })
      : 0;

  const sumFor = (status: string) =>
    totals.find((t) => t.status === status)?._sum.amountMinor ?? 0;

  return {
    referralCode: me?.referralCode ?? "",
    link: me ? referralLink(me.referralCode) : "",
    directReferrals,
    level2Count,
    commissions,
    earnings: {
      pending: sumFor("PENDING"),
      approved: sumFor("APPROVED"),
      paid: sumFor("PAID"),
      total: sumFor("PENDING") + sumFor("APPROVED") + sumFor("PAID"),
    },
    rates: referralRates,
  };
}
