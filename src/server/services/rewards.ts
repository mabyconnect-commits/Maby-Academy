import "server-only";
import type { PointsReason, Prisma } from "@prisma/client";
import { db } from "@/lib/db";

/**
 * The rewards economy.
 *
 * Every point movement is an append-only row in `points_transactions`.
 * `User.pointsBalance` is a denormalised running total that is only ever
 * changed inside the same transaction that writes the ledger row, so the two
 * can never drift.
 *
 * Awards are idempotent via `referenceKey`: awarding "lesson:abc" twice is a
 * no-op, which matters because a student can click "complete" repeatedly.
 */

type Tx = Prisma.TransactionClient;

export async function awardPoints(
  client: Tx,
  params: {
    userId: string;
    amount: number;
    reason: PointsReason;
    referenceKey?: string;
    note?: string;
  },
): Promise<boolean> {
  const { userId, amount, reason, referenceKey, note } = params;
  if (amount === 0) return false;

  if (referenceKey) {
    const existing = await client.pointsTransaction.findUnique({
      where: { userId_referenceKey: { userId, referenceKey } },
      select: { id: true },
    });
    if (existing) return false;
  }

  await client.pointsTransaction.create({
    data: { userId, amount, reason, referenceKey, note },
  });

  await client.user.update({
    where: { id: userId },
    data: {
      pointsBalance: { increment: amount },
      // Lifetime points only ever go up — redemptions must not shrink rank.
      ...(amount > 0 ? { lifetimePoints: { increment: amount } } : {}),
    },
  });

  return true;
}

/**
 * Daily streak. Called on any meaningful learning action.
 * Same day → no change. Consecutive day → +1. Any gap → reset to 1.
 */
export async function touchStreak(client: Tx, userId: string) {
  const user = await client.user.findUnique({
    where: { id: userId },
    select: { lastActiveDate: true, currentStreak: true, longestStreak: true },
  });
  if (!user) return;

  const today = startOfUtcDay(new Date());
  const last = user.lastActiveDate ? startOfUtcDay(user.lastActiveDate) : null;

  if (last && last.getTime() === today.getTime()) return;

  const yesterday = new Date(today.getTime() - 86_400_000);
  const continued = last !== null && last.getTime() === yesterday.getTime();
  const currentStreak = continued ? user.currentStreak + 1 : 1;
  const longestStreak = Math.max(user.longestStreak, currentStreak);

  await client.user.update({
    where: { id: userId },
    data: { currentStreak, longestStreak, lastActiveDate: today },
  });

  // Milestone bonuses keep long streaks feeling worth defending.
  const bonus = STREAK_BONUSES[currentStreak];
  if (bonus) {
    await awardPoints(client, {
      userId,
      amount: bonus,
      reason: "STREAK_BONUS",
      referenceKey: `streak:${currentStreak}`,
      note: `${currentStreak}-day streak`,
    });
  }
}

const STREAK_BONUSES: Record<number, number> = {
  3: 25,
  7: 75,
  14: 150,
  30: 400,
  60: 900,
  100: 2000,
};

function startOfUtcDay(d: Date) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

// ---------------------------------------------------------------------------
// Badges
// ---------------------------------------------------------------------------

type BadgeCriteria =
  | { type: "lessons_completed"; count: number }
  | { type: "courses_completed"; count: number }
  | { type: "assignments_passed"; count: number }
  | { type: "streak_days"; count: number }
  | { type: "referrals"; count: number }
  | { type: "points"; count: number };

/**
 * Re-evaluates every badge for a user and awards any newly earned ones.
 * Cheap enough to run after each milestone action; returns what was granted
 * so the caller can surface a toast / notification.
 */
export async function evaluateBadges(client: Tx, userId: string) {
  const [badges, owned, user] = await Promise.all([
    client.badge.findMany(),
    client.userBadge.findMany({ where: { userId }, select: { badgeId: true } }),
    client.user.findUnique({
      where: { id: userId },
      select: { longestStreak: true, lifetimePoints: true },
    }),
  ]);
  if (!user) return [];

  const ownedIds = new Set(owned.map((b) => b.badgeId));
  const candidates = badges.filter((b) => !ownedIds.has(b.id) && b.criteria);
  if (candidates.length === 0) return [];

  const needs = new Set(
    candidates.map((b) => (b.criteria as BadgeCriteria).type),
  );

  const stats = {
    lessons_completed: needs.has("lessons_completed")
      ? await client.lessonProgress.count({ where: { userId, isCompleted: true } })
      : 0,
    courses_completed: needs.has("courses_completed")
      ? await client.enrollment.count({ where: { userId, status: "COMPLETED" } })
      : 0,
    assignments_passed: needs.has("assignments_passed")
      ? await client.submission.count({ where: { studentId: userId, status: "GRADED" } })
      : 0,
    streak_days: user.longestStreak,
    referrals: needs.has("referrals")
      ? await client.user.count({ where: { referredById: userId } })
      : 0,
    points: user.lifetimePoints,
  };

  const awarded: string[] = [];
  for (const badge of candidates) {
    const c = badge.criteria as BadgeCriteria;
    if (stats[c.type] >= c.count) {
      await client.userBadge.create({ data: { userId, badgeId: badge.id } });
      awarded.push(badge.name);
      if (badge.pointsValue > 0) {
        await awardPoints(client, {
          userId,
          amount: badge.pointsValue,
          reason: "BADGE_AWARDED",
          referenceKey: `badge:${badge.id}`,
          note: badge.name,
        });
      }
    }
  }
  return awarded;
}

// ---------------------------------------------------------------------------
// Leaderboard
// ---------------------------------------------------------------------------

export async function getLeaderboard(limit = 20) {
  return db.user.findMany({
    where: { isActive: true, role: "STUDENT" },
    orderBy: [{ lifetimePoints: "desc" }, { createdAt: "asc" }],
    take: limit,
    select: {
      id: true,
      name: true,
      avatarUrl: true,
      country: true,
      lifetimePoints: true,
      currentStreak: true,
      _count: { select: { certificates: true } },
    },
  });
}

export async function getUserRank(userId: string) {
  const me = await db.user.findUnique({
    where: { id: userId },
    select: { lifetimePoints: true },
  });
  if (!me) return null;
  const ahead = await db.user.count({
    where: {
      isActive: true,
      role: "STUDENT",
      lifetimePoints: { gt: me.lifetimePoints },
    },
  });
  return ahead + 1;
}

export async function getRewardsOverview(userId: string) {
  const [user, transactions, badges, rank, totalStudents] = await Promise.all([
    db.user.findUnique({
      where: { id: userId },
      select: {
        pointsBalance: true,
        lifetimePoints: true,
        currentStreak: true,
        longestStreak: true,
      },
    }),
    db.pointsTransaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 25,
    }),
    db.userBadge.findMany({
      where: { userId },
      include: { badge: true },
      orderBy: { awardedAt: "desc" },
    }),
    getUserRank(userId),
    db.user.count({ where: { isActive: true, role: "STUDENT" } }),
  ]);

  return { user, transactions, badges, rank, totalStudents };
}
