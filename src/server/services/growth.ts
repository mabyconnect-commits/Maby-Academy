import "server-only";
import type { GoalHorizon, GrowthArea, JournalKind } from "@prisma/client";
import { db } from "@/lib/db";
import { ServiceError } from "./auth";
import { awardPoints } from "./rewards";
import { assertCanReadJournal, type Actor } from "./policy";

/**
 * Personal growth: habits, goals and journals.
 *
 * The design constraint that matters more than any feature here: **this data
 * is private**. A reflection or prayer journal that its writer suspects is
 * being read is a journal that never gets written in, so privacy is enforced
 * in the service rather than left to the UI, and no administrative role
 * overrides it.
 *
 * Health and faith areas are deliberately just areas — the platform records
 * what a member chose to track and never interprets it.
 */

/** Dates are stored at UTC midnight so one entry per habit per day is enforceable. */
function utcDay(date = new Date()): Date {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
}

export const HABIT_POINTS = 3;
/** Ceiling on habit points per day, so adding fifty habits is not a strategy. */
export const DAILY_HABIT_POINT_CAP = 15;

// ---------------------------------------------------------------------------
// Habits
// ---------------------------------------------------------------------------

/** Default habits offered at onboarding — one per pillar that suits a daily rhythm. */
export const SUGGESTED_HABITS = [
  { name: "Complete one lesson", area: "LEARNING" as GrowthArea, iconEmoji: "📚" },
  { name: "Read for 20 minutes", area: "LEARNING" as GrowthArea, iconEmoji: "📖" },
  { name: "Devotional and prayer", area: "FAITH" as GrowthArea, iconEmoji: "🙏" },
  { name: "Move for 30 minutes", area: "HEALTH" as GrowthArea, iconEmoji: "💪" },
  { name: "Sleep before midnight", area: "HEALTH" as GrowthArea, iconEmoji: "😴" },
  { name: "Review the trading journal", area: "FINANCE" as GrowthArea, iconEmoji: "📈" },
  { name: "Track today's spending", area: "FINANCE" as GrowthArea, iconEmoji: "💰" },
  { name: "Plan tomorrow", area: "PRODUCTIVITY" as GrowthArea, iconEmoji: "🗓" },
];

export async function listHabits(userId: string, on: Date = new Date()) {
  const day = utcDay(on);

  const habits = await db.habit.findMany({
    where: { userId, isActive: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    include: {
      entries: {
        where: { entryDate: day },
        select: { id: true, completed: true },
      },
    },
  });

  return habits.map((h) => ({
    ...h,
    doneToday: h.entries.some((e) => e.completed),
  }));
}

export async function createHabit(params: {
  userId: string;
  name: string;
  area?: GrowthArea;
  iconEmoji?: string;
}) {
  const name = params.name.trim();
  if (!name) throw new ServiceError("Give the habit a name.", 400);

  const count = await db.habit.count({
    where: { userId: params.userId, isActive: true },
  });
  // A checklist of forty items is not a checklist anyone completes.
  if (count >= 12) {
    throw new ServiceError(
      "Twelve active habits is the limit — archive one first. A list you can't finish stops being useful.",
      400,
    );
  }

  return db.habit.create({
    data: {
      userId: params.userId,
      name,
      area: params.area ?? "LEARNING",
      iconEmoji: params.iconEmoji ?? null,
      sortOrder: count,
    },
  });
}

export async function archiveHabit(userId: string, habitId: string) {
  const habit = await db.habit.findFirst({
    where: { id: habitId, userId },
    select: { id: true },
  });
  if (!habit) throw new ServiceError("Habit not found.", 404);

  // Archived, not deleted — the entry history is a record of work done.
  return db.habit.update({
    where: { id: habitId },
    data: { isActive: false },
  });
}

/**
 * Tick or un-tick a habit for a day.
 *
 * Points are keyed on habit and date, so un-ticking and re-ticking cannot
 * mint more, and a daily cap stops habit-count inflation.
 */
export async function toggleHabit(params: {
  userId: string;
  habitId: string;
  on?: Date;
}) {
  const habit = await db.habit.findFirst({
    where: { id: params.habitId, userId: params.userId },
  });
  if (!habit) throw new ServiceError("Habit not found.", 404);

  const day = utcDay(params.on);
  // Ticking tomorrow's box today defeats the point of a streak.
  if (day.getTime() > utcDay().getTime()) {
    throw new ServiceError("You can't tick a habit for a future day.", 400);
  }

  const existing = await db.habitEntry.findUnique({
    where: { habitId_entryDate: { habitId: habit.id, entryDate: day } },
  });

  return db.$transaction(async (tx) => {
    if (existing?.completed) {
      await tx.habitEntry.delete({ where: { id: existing.id } });
      const streak = await recomputeHabitStreak(tx, habit.id);
      return { completed: false, streak };
    }

    await tx.habitEntry.upsert({
      where: { habitId_entryDate: { habitId: habit.id, entryDate: day } },
      create: { habitId: habit.id, entryDate: day, completed: true },
      update: { completed: true },
    });

    const streak = await recomputeHabitStreak(tx, habit.id);

    const since = new Date();
    since.setUTCHours(0, 0, 0, 0);
    const earned = await tx.pointsTransaction.aggregate({
      where: {
        userId: params.userId,
        createdAt: { gte: since },
        referenceKey: { startsWith: "habit:" },
      },
      _sum: { amount: true },
    });

    if ((earned._sum.amount ?? 0) + HABIT_POINTS <= DAILY_HABIT_POINT_CAP) {
      await awardPoints(tx, {
        userId: params.userId,
        amount: HABIT_POINTS,
        reason: "MANUAL_ADJUSTMENT",
        referenceKey: `habit:${habit.id}:${day.toISOString().slice(0, 10)}`,
        note: habit.name,
      });
    }

    return { completed: true, streak };
  });
}

/**
 * Recompute a habit's streak from its entries.
 *
 * Counted backwards from today, allowing today to be untouched — a streak
 * shouldn't read as broken at 9am simply because the day isn't done.
 */
async function recomputeHabitStreak(
  tx: Parameters<Parameters<typeof db.$transaction>[0]>[0],
  habitId: string,
) {
  const entries = await tx.habitEntry.findMany({
    where: { habitId, completed: true },
    orderBy: { entryDate: "desc" },
    take: 400,
    select: { entryDate: true },
  });

  const days = new Set(
    entries.map((e) => utcDay(e.entryDate).toISOString().slice(0, 10)),
  );

  let streak = 0;
  const cursor = utcDay();

  if (!days.has(cursor.toISOString().slice(0, 10))) {
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }

  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak++;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }

  const habit = await tx.habit.findUniqueOrThrow({
    where: { id: habitId },
    select: { longestStreak: true },
  });

  await tx.habit.update({
    where: { id: habitId },
    data: {
      currentStreak: streak,
      longestStreak: Math.max(habit.longestStreak, streak),
    },
  });

  return streak;
}

/** Completion history for the last N days, for a contribution-style grid. */
export async function habitHistory(userId: string, days = 30) {
  const from = utcDay();
  from.setUTCDate(from.getUTCDate() - (days - 1));

  const [habits, entries] = await Promise.all([
    db.habit.count({ where: { userId, isActive: true } }),
    db.habitEntry.findMany({
      where: {
        habit: { userId, isActive: true },
        entryDate: { gte: from },
        completed: true,
      },
      select: { entryDate: true },
    }),
  ]);

  const counts = new Map<string, number>();
  for (const e of entries) {
    const key = utcDay(e.entryDate).toISOString().slice(0, 10);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const series: { date: string; completed: number; total: number }[] = [];
  const cursor = new Date(from);
  for (let i = 0; i < days; i++) {
    const key = cursor.toISOString().slice(0, 10);
    series.push({ date: key, completed: counts.get(key) ?? 0, total: habits });
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return series;
}

// ---------------------------------------------------------------------------
// Goals
// ---------------------------------------------------------------------------

export async function listGoals(userId: string, includeFinished = false) {
  return db.goal.findMany({
    where: {
      userId,
      ...(includeFinished ? {} : { status: "ACTIVE" }),
    },
    orderBy: [{ status: "asc" }, { dueAt: "asc" }, { createdAt: "desc" }],
  });
}

export async function createGoal(params: {
  userId: string;
  title: string;
  description?: string;
  area?: GrowthArea;
  horizon?: GoalHorizon;
  targetValue?: number;
  unit?: string;
  dueAt?: Date;
  sharedWithMentor?: boolean;
}) {
  const title = params.title.trim();
  if (!title) throw new ServiceError("Give the goal a title.", 400);

  return db.goal.create({
    data: {
      userId: params.userId,
      title,
      description: params.description?.trim() || null,
      area: params.area ?? "LEARNING",
      horizon: params.horizon ?? "MONTHLY",
      targetValue: params.targetValue ?? null,
      unit: params.unit?.trim() || null,
      dueAt: params.dueAt ?? null,
      sharedWithMentor: params.sharedWithMentor ?? false,
    },
  });
}

export async function updateGoalProgress(params: {
  userId: string;
  goalId: string;
  currentValue: number;
}) {
  const goal = await db.goal.findFirst({
    where: { id: params.goalId, userId: params.userId },
  });
  if (!goal) throw new ServiceError("Goal not found.", 404);

  const value = Math.max(0, params.currentValue);
  const achieved = goal.targetValue !== null && value >= goal.targetValue;

  return db.goal.update({
    where: { id: goal.id },
    data: {
      currentValue: value,
      ...(achieved && goal.status === "ACTIVE"
        ? { status: "ACHIEVED", completedAt: new Date() }
        : {}),
    },
  });
}

export async function setGoalStatus(params: {
  userId: string;
  goalId: string;
  status: "ACTIVE" | "ACHIEVED" | "MISSED" | "ABANDONED";
}) {
  const goal = await db.goal.findFirst({
    where: { id: params.goalId, userId: params.userId },
    select: { id: true },
  });
  if (!goal) throw new ServiceError("Goal not found.", 404);

  return db.goal.update({
    where: { id: goal.id },
    data: {
      status: params.status,
      completedAt: params.status === "ACHIEVED" ? new Date() : null,
    },
  });
}

export async function toggleGoalSharing(userId: string, goalId: string) {
  const goal = await db.goal.findFirst({
    where: { id: goalId, userId },
    select: { id: true, sharedWithMentor: true },
  });
  if (!goal) throw new ServiceError("Goal not found.", 404);

  return db.goal.update({
    where: { id: goal.id },
    data: { sharedWithMentor: !goal.sharedWithMentor },
  });
}

// ---------------------------------------------------------------------------
// Journal — private by default
// ---------------------------------------------------------------------------

export async function listJournal(params: {
  actor: Actor;
  ownerId: string;
  kind?: JournalKind;
  take?: number;
}) {
  await assertCanReadJournal(params.actor, params.ownerId);

  return db.journalEntry.findMany({
    where: {
      userId: params.ownerId,
      ...(params.kind ? { kind: params.kind } : {}),
      // Even a consented mentor never sees entries the writer kept private.
      ...(params.actor.id === params.ownerId ? {} : { isPrivate: false }),
    },
    orderBy: { createdAt: "desc" },
    take: params.take ?? 40,
  });
}

export async function createJournalEntry(params: {
  userId: string;
  kind?: JournalKind;
  area?: GrowthArea;
  title?: string;
  body: string;
  mood?: number;
  isPrivate?: boolean;
}) {
  const body = params.body.trim();
  if (!body) throw new ServiceError("Write something first.", 400);

  return db.journalEntry.create({
    data: {
      userId: params.userId,
      kind: params.kind ?? "REFLECTION",
      area: params.area ?? null,
      title: params.title?.trim() || null,
      body,
      mood:
        params.mood !== undefined
          ? Math.max(1, Math.min(5, params.mood))
          : null,
      // Private unless the writer deliberately says otherwise.
      isPrivate: params.isPrivate ?? true,
    },
  });
}

export async function deleteJournalEntry(userId: string, entryId: string) {
  const entry = await db.journalEntry.findFirst({
    where: { id: entryId, userId },
    select: { id: true },
  });
  if (!entry) throw new ServiceError("Entry not found.", 404);

  await db.journalEntry.delete({ where: { id: entry.id } });
  return { deleted: true };
}

// ---------------------------------------------------------------------------
// Overview
// ---------------------------------------------------------------------------

export async function getGrowthOverview(userId: string) {
  const [habits, goals, journalCount, history] = await Promise.all([
    listHabits(userId),
    listGoals(userId),
    db.journalEntry.count({ where: { userId } }),
    habitHistory(userId, 28),
  ]);

  const doneToday = habits.filter((h) => h.doneToday).length;

  // Areas the member is actually tracking, so the UI can show their picture
  // rather than a fixed list of ten pillars they never chose.
  const areas = new Map<GrowthArea, { habits: number; goals: number }>();
  for (const h of habits) {
    const entry = areas.get(h.area) ?? { habits: 0, goals: 0 };
    entry.habits++;
    areas.set(h.area, entry);
  }
  for (const g of goals) {
    const entry = areas.get(g.area) ?? { habits: 0, goals: 0 };
    entry.goals++;
    areas.set(g.area, entry);
  }

  return {
    habits,
    goals,
    journalCount,
    history,
    today: { done: doneToday, total: habits.length },
    areas: [...areas.entries()].map(([area, counts]) => ({ area, ...counts })),
  };
}
