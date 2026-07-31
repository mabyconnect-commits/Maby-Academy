import "server-only";
import type { PointsReason, Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { ServiceError } from "@/lib/errors";
import type { Actor } from "./policy";
import { actorCan } from "./policy";
import { isFeatureEnabled } from "./features";

/**
 * Seasons — the weekly leaderboard competition and its cash prizes.
 *
 * The moment money is attached to a number, that number stops being a
 * measurement and becomes a target. Everything unusual in this file exists
 * because of that.
 *
 * Three rules carry most of the weight:
 *
 * 1. Only points from *verified work* count. Anything a member can generate
 *    by showing up, inviting people, or being granted something by staff is
 *    excluded from the qualifying total.
 *
 * 2. Points must be spread across several distinct days. A season decided by
 *    one long night rewards stamina rather than learning, and is trivially
 *    farmed by someone with a free weekend.
 *
 * 3. Nothing pays automatically. Standings freeze, a human reviews each
 *    result, and payment is recorded by hand. There is no code path from
 *    "season ended" to "money left the account".
 */

/**
 * The reasons that count toward a cash prize.
 *
 * Each of these requires work that another person or a gate has verified:
 * a lesson is gated behind a quiz, an assignment or a written reflection;
 * a quiz has to be passed; an assignment is read and marked by a human.
 */
const QUALIFYING_REASONS: PointsReason[] = [
  "LESSON_COMPLETED",
  "QUIZ_PASSED",
  "ASSIGNMENT_GRADED",
  "COURSE_COMPLETED",
  "LIVE_ATTENDED",
];

/**
 * Deliberately excluded, and why:
 *
 * STREAK_BONUS   — pays for opening the app, not for learning. Farmable by
 *                  anyone with a calendar reminder.
 * REFERRAL_SIGNUP— paying cash for recruitment is the line between an academy
 *                  and a scheme. Referral rewards already sit behind their own
 *                  compliance flag; a prize board must not route around it.
 * BADGE_AWARDED  — badges are derived from the qualifying actions above, so
 *                  counting them pays twice for the same work.
 * MANUAL_ADJUSTMENT — staff-granted. If this counted, any admin could hand
 *                  someone a cash prize with no second signature.
 * REDEMPTION     — negative, and spending points in the store must never
 *                  affect standing.
 */

function require(actor: Actor, permission: Parameters<typeof actorCan>[1]) {
  if (!actorCan(actor, permission)) {
    throw new ServiceError("You do not have access to this area.", 403);
  }
}

export type SeasonBoardRow = {
  userId: string;
  name: string;
  avatarUrl: string | null;
  country: string | null;
  qualifyingPoints: number;
  activeDays: number;
  /** False when the member is on the board but below a floor. */
  eligible: boolean;
  rank: number | null;
  prizeMinor: number;
};

/** Prize bands are stored as ranges; this resolves one rank against them. */
export function prizeForRank(
  rank: number,
  prizes: { rankFrom: number; rankTo: number; amountMinor: number }[],
): number {
  const band = prizes.find((p) => rank >= p.rankFrom && rank <= p.rankTo);
  return band?.amountMinor ?? 0;
}

export async function getActiveSeason() {
  const now = new Date();
  return db.season.findFirst({
    where: { status: "OPEN", startsAt: { lte: now }, endsAt: { gt: now } },
    orderBy: { startsAt: "desc" },
    include: { prizes: { orderBy: { rankFrom: "asc" } } },
  });
}

export async function getSeasonBySlug(slug: string) {
  return db.season.findUnique({
    where: { slug },
    include: { prizes: { orderBy: { rankFrom: "asc" } } },
  });
}

/**
 * Live standings for an open season.
 *
 * Recomputed from the points ledger on every read rather than kept as a
 * running total, so a corrected or reversed award is reflected immediately
 * instead of leaving a stale figure on a board with money attached.
 */
export async function getSeasonBoard(
  seasonId: string,
  limit = 50,
): Promise<{
  rows: SeasonBoardRow[];
  totalParticipants: number;
}> {
  const season = await db.season.findUnique({
    where: { id: seasonId },
    include: { prizes: { orderBy: { rankFrom: "asc" } } },
  });
  if (!season) throw new ServiceError("Season not found.", 404);

  const ledger = await db.pointsTransaction.findMany({
    where: {
      reason: { in: QUALIFYING_REASONS },
      createdAt: { gte: season.startsAt, lt: season.endsAt },
      // Staff cannot win a prize funded by the academy they run.
      user: { isActive: true, role: "STUDENT" },
    },
    select: { userId: true, amount: true, createdAt: true },
  });

  // Aggregated in memory rather than by SQL because we need distinct *days*
  // per member, which a plain groupBy cannot give us in one pass.
  const byUser = new Map<string, { points: number; days: Set<string> }>();
  for (const row of ledger) {
    const entry = byUser.get(row.userId) ?? { points: 0, days: new Set() };
    entry.points += row.amount;
    // UTC day key. A local-timezone key would let a member in one region get
    // a longer week than another, which on a paid board is not acceptable.
    entry.days.add(row.createdAt.toISOString().slice(0, 10));
    byUser.set(row.userId, entry);
  }

  if (byUser.size === 0) return { rows: [], totalParticipants: 0 };

  const users = await db.user.findMany({
    where: { id: { in: [...byUser.keys()] } },
    select: { id: true, name: true, avatarUrl: true, country: true },
  });
  const userById = new Map(users.map((u) => [u.id, u]));

  const all = [...byUser.entries()]
    .map(([userId, agg]) => {
      const u = userById.get(userId);
      return {
        userId,
        name: u?.name ?? "Member",
        avatarUrl: u?.avatarUrl ?? null,
        country: u?.country ?? null,
        qualifyingPoints: agg.points,
        activeDays: agg.days.size,
        eligible:
          agg.points >= season.minQualifyingPoints &&
          agg.days.size >= season.minActiveDays,
      };
    })
    // Points first, then spread of effort, then the earlier user id so that
    // ties resolve the same way on every read rather than shuffling.
    .sort(
      (a, b) =>
        b.qualifyingPoints - a.qualifyingPoints ||
        b.activeDays - a.activeDays ||
        a.userId.localeCompare(b.userId),
    );

  // Only eligible members take a rank, so an ineligible member cannot occupy
  // a prize-winning position and push a qualifying one out of the money.
  let nextRank = 0;
  const ranked: SeasonBoardRow[] = all.map((row) => {
    if (!row.eligible) return { ...row, rank: null, prizeMinor: 0 };
    nextRank += 1;
    return {
      ...row,
      rank: nextRank,
      prizeMinor: prizeForRank(nextRank, season.prizes),
    };
  });

  return {
    rows: ranked.slice(0, limit),
    totalParticipants: ranked.filter((r) => r.eligible).length,
  };
}

/** One member's standing, including when they are not in the top slice. */
export async function getMySeasonStanding(seasonId: string, userId: string) {
  const { rows } = await getSeasonBoard(seasonId, Number.MAX_SAFE_INTEGER);
  return rows.find((r) => r.userId === userId) ?? null;
}

/**
 * Heuristics that mark a result for closer human attention.
 *
 * These never withhold anything on their own — a flag is a prompt to look,
 * not a verdict. Automatically refusing to pay someone because a heuristic
 * fired would be worse than the fraud it is guarding against.
 */
function flagsFor(row: {
  qualifyingPoints: number;
  activeDays: number;
}, median: number): string[] {
  const flags: string[] = [];
  if (row.activeDays <= 2) flags.push("few-active-days");
  // A score far above the middle of the board is usually a real, motivated
  // member — and is also what a farmed account looks like.
  if (median > 0 && row.qualifyingPoints > median * 6) {
    flags.push("far-above-median");
  }
  return flags;
}

/**
 * Closes a season: freezes the standings into rows, resolves prizes, and
 * flags anything worth a look.
 *
 * Idempotent by construction — a season that is already locked is refused
 * rather than re-frozen, so a double click cannot rewrite settled results.
 */
export async function lockSeason(params: {
  actor: Actor;
  seasonId: string;
}) {
  require(params.actor, "settings:manage");

  const season = await db.season.findUnique({
    where: { id: params.seasonId },
    include: { prizes: { orderBy: { rankFrom: "asc" } } },
  });
  if (!season) throw new ServiceError("Season not found.", 404);
  if (season.status !== "OPEN") {
    throw new ServiceError(
      `Only an open season can be locked. This one is ${season.status.toLowerCase()}.`,
      400,
    );
  }
  if (season.endsAt > new Date()) {
    throw new ServiceError(
      "This season has not finished yet. Locking early would freeze standings while members are still working.",
      400,
    );
  }

  const { rows } = await getSeasonBoard(season.id, Number.MAX_SAFE_INTEGER);
  const eligible = rows.filter((r) => r.rank !== null);

  const sorted = eligible.map((r) => r.qualifyingPoints).sort((a, b) => a - b);
  const median =
    sorted.length === 0 ? 0 : sorted[Math.floor(sorted.length / 2)];

  await db.$transaction(async (tx) => {
    for (const row of eligible) {
      await tx.seasonResult.create({
        data: {
          seasonId: season.id,
          userId: row.userId,
          rank: row.rank!,
          qualifyingPoints: row.qualifyingPoints,
          activeDays: row.activeDays,
          prizeMinor: row.prizeMinor,
          currency: season.currency,
          // Everything starts unreviewed. There is no path that writes
          // APPROVED without a person doing it.
          status: "PENDING_REVIEW",
          flags: flagsFor(row, median),
        },
      });
    }

    await tx.season.update({
      where: { id: season.id },
      data: {
        status: "LOCKED",
        lockedAt: new Date(),
        lockedById: params.actor.id,
      },
    });
  });

  return { frozen: eligible.length };
}

export async function listSeasonResults(seasonId: string) {
  return db.seasonResult.findMany({
    where: { seasonId },
    orderBy: { rank: "asc" },
    include: {
      user: { select: { id: true, name: true, email: true, avatarUrl: true } },
      reviewedBy: { select: { name: true } },
    },
  });
}

/**
 * Records a review decision on one frozen result.
 *
 * Withholding requires a reason. A result excluded from payment with no
 * explanation is indistinguishable from an accident, and the member has no
 * way to contest it.
 */
export async function reviewSeasonResult(params: {
  actor: Actor;
  resultId: string;
  decision: "APPROVED" | "WITHHELD";
  reason?: string;
}) {
  require(params.actor, "commission:approve");

  const result = await db.seasonResult.findUnique({
    where: { id: params.resultId },
    select: { id: true, status: true },
  });
  if (!result) throw new ServiceError("Result not found.", 404);
  if (result.status === "PAID") {
    throw new ServiceError(
      "This prize has already been paid. A payment cannot be reviewed away after the fact.",
      400,
    );
  }
  if (params.decision === "WITHHELD" && !params.reason?.trim()) {
    throw new ServiceError(
      "Give a reason for withholding. An unexplained refusal is not reviewable by anyone, including the member.",
      400,
    );
  }

  return db.seasonResult.update({
    where: { id: params.resultId },
    data: {
      status: params.decision,
      withheldReason:
        params.decision === "WITHHELD" ? params.reason!.trim() : null,
      reviewedById: params.actor.id,
      reviewedAt: new Date(),
    },
  });
}

/**
 * Records that a prize was actually paid.
 *
 * This does not move money — no payout rail is connected, and one should not
 * be driven from a leaderboard. It records a transfer a human has already
 * made, so the obligation and the settlement are both auditable.
 */
export async function markSeasonResultPaid(params: {
  actor: Actor;
  resultId: string;
  payoutRef: string;
}) {
  // Deliberately a different capability from the one that approves. ADMIN can
  // approve a prize but cannot record its payment; that separation already
  // exists for referral commissions and is the only thing standing between one
  // compromised account and money leaving the business.
  require(params.actor, "payout:execute");

  if (!(await isFeatureEnabled("token_rewards"))) {
    throw new ServiceError(
      "Cash rewards are switched off. Enable the token_rewards flag once the legal position in every operating region has been reviewed.",
      403,
    );
  }
  if (!params.payoutRef.trim()) {
    throw new ServiceError(
      "A payment reference is required, so the transfer can be traced back to this result.",
      400,
    );
  }

  const result = await db.seasonResult.findUnique({
    where: { id: params.resultId },
    select: { status: true, prizeMinor: true },
  });
  if (!result) throw new ServiceError("Result not found.", 404);
  if (result.status !== "APPROVED") {
    throw new ServiceError(
      "Only an approved result can be marked paid. Review it first.",
      400,
    );
  }
  if (result.prizeMinor <= 0) {
    throw new ServiceError("This result has no prize attached.", 400);
  }

  return db.seasonResult.update({
    where: { id: params.resultId },
    data: {
      status: "PAID",
      paidAt: new Date(),
      payoutRef: params.payoutRef.trim(),
    },
  });
}

/** A member's own past results, for their rewards page. */
export async function getMySeasonHistory(userId: string) {
  return db.seasonResult.findMany({
    where: {
      userId,
      season: { status: { in: ["LOCKED", "SETTLED"] } },
    },
    orderBy: { createdAt: "desc" },
    take: 12,
    include: {
      season: { select: { name: true, slug: true, endsAt: true, currency: true } },
    },
  });
}

export async function listSeasons(where?: Prisma.SeasonWhereInput) {
  return db.season.findMany({
    where,
    orderBy: { startsAt: "desc" },
    include: {
      prizes: { orderBy: { rankFrom: "asc" } },
      _count: { select: { results: true } },
    },
  });
}

/**
 * Creates a season and its prize bands together.
 *
 * Bands are validated as a set rather than one at a time: overlapping bands
 * would make `prizeForRank` return whichever happened to be first, so two
 * members on adjacent ranks could be told different amounts for the same
 * position depending on row order.
 */
export async function createSeason(params: {
  actor: Actor;
  name: string;
  slug: string;
  blurb?: string;
  startsAt: Date;
  endsAt: Date;
  currency: string;
  minActiveDays: number;
  minQualifyingPoints: number;
  prizes: { rankFrom: number; rankTo: number; amountMinor: number; label?: string }[];
}) {
  require(params.actor, "settings:manage");

  if (params.endsAt <= params.startsAt) {
    throw new ServiceError("A season must end after it starts.", 400);
  }

  const sorted = [...params.prizes].sort((a, b) => a.rankFrom - b.rankFrom);
  for (const [i, band] of sorted.entries()) {
    if (band.rankFrom < 1 || band.rankTo < band.rankFrom) {
      throw new ServiceError(
        `Prize band ${i + 1} covers an impossible range of ranks.`,
        400,
      );
    }
    if (band.amountMinor < 0) {
      throw new ServiceError("A prize cannot be negative.", 400);
    }
    const prev = sorted[i - 1];
    if (prev && band.rankFrom <= prev.rankTo) {
      throw new ServiceError(
        `Prize bands ${i} and ${i + 1} overlap. A rank in two bands would pay whichever band was read first.`,
        400,
      );
    }
  }

  const prizePoolMinor = sorted.reduce(
    (sum, b) => sum + b.amountMinor * (b.rankTo - b.rankFrom + 1),
    0,
  );

  return db.season.create({
    data: {
      name: params.name,
      slug: params.slug,
      blurb: params.blurb || null,
      startsAt: params.startsAt,
      endsAt: params.endsAt,
      currency: params.currency,
      minActiveDays: params.minActiveDays,
      minQualifyingPoints: params.minQualifyingPoints,
      // Derived rather than entered, so the headline figure can never
      // disagree with the sum of what is actually payable.
      prizePoolMinor,
      prizes: { create: sorted },
    },
    include: { prizes: { orderBy: { rankFrom: "asc" } } },
  });
}

/** Moves a season between the states an operator drives by hand. */
export async function setSeasonStatus(params: {
  actor: Actor;
  seasonId: string;
  status: "DRAFT" | "OPEN" | "CANCELLED" | "SETTLED";
}) {
  require(params.actor, "settings:manage");

  const season = await db.season.findUnique({
    where: { id: params.seasonId },
    select: { status: true },
  });
  if (!season) throw new ServiceError("Season not found.", 404);

  // LOCKED is reached only through lockSeason, which freezes the standings.
  // Allowing it here would let an operator mark a season locked without any
  // results being written, leaving members with no record of what they won.
  if (season.status === "LOCKED" && params.status !== "SETTLED") {
    throw new ServiceError(
      "A locked season can only be settled. Its standings are already frozen.",
      400,
    );
  }
  if (season.status === "SETTLED") {
    throw new ServiceError("A settled season cannot be reopened.", 400);
  }

  return db.season.update({
    where: { id: params.seasonId },
    data: { status: params.status },
  });
}

/** Everything an operator needs to decide whether a season can be settled. */
export async function getSeasonAdminView(actor: Actor, seasonId: string) {
  require(actor, "settings:manage");

  const season = await db.season.findUnique({
    where: { id: seasonId },
    include: { prizes: { orderBy: { rankFrom: "asc" } } },
  });
  if (!season) throw new ServiceError("Season not found.", 404);

  const results = await listSeasonResults(seasonId);
  const live =
    season.status === "OPEN" ? await getSeasonBoard(seasonId, 25) : null;

  const owed = results
    .filter((r) => r.status === "APPROVED")
    .reduce((sum, r) => sum + r.prizeMinor, 0);
  const paid = results
    .filter((r) => r.status === "PAID")
    .reduce((sum, r) => sum + r.prizeMinor, 0);

  return {
    season,
    results,
    live,
    counts: {
      pending: results.filter((r) => r.status === "PENDING_REVIEW").length,
      approved: results.filter((r) => r.status === "APPROVED").length,
      withheld: results.filter((r) => r.status === "WITHHELD").length,
      paid: results.filter((r) => r.status === "PAID").length,
      flagged: results.filter((r) => r.flags.length > 0).length,
    },
    money: { owed, paid },
  };
}
