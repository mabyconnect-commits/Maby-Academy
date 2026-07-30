import "server-only";
import { db } from "@/lib/db";
import { ServiceError } from "@/server/services/auth";
import {
  FAITH_PILLAR,
  HEALTH_PILLAR,
  ONBOARDING_STEPS,
  type OnboardingStep,
} from "@/lib/onboarding/questions";

/**
 * Onboarding: capture answers, then turn them into a learning path.
 *
 * The path is *derived*, never stored as a snapshot of course IDs. A stored
 * list goes stale the moment a course is published, archived or repriced, and
 * then quietly recommends things that no longer exist. Recomputing from the
 * saved answers costs one query and is always current.
 */

export type OnboardingAnswers = Record<string, string[]>;

const STEP_BY_FIELD = new Map<string, OnboardingStep>(
  ONBOARDING_STEPS.map((s) => [s.field, s]),
);

/**
 * Rejects anything not offered by the questionnaire. Without this the profile
 * accumulates whatever a caller posts, and the path builder later queries
 * categories that were never real options.
 */
function sanitise(answers: OnboardingAnswers): OnboardingAnswers {
  const clean: OnboardingAnswers = {};
  for (const [field, values] of Object.entries(answers)) {
    const step = STEP_BY_FIELD.get(field);
    if (!step) continue;
    const allowed = new Set(step.options.map((o) => o.value));
    const kept = [...new Set(values)].filter((v) => allowed.has(v));
    // A single-choice step must never persist two answers.
    clean[field] = step.multiple ? kept : kept.slice(0, 1);
  }
  return clean;
}

export async function getOnboardingProfile(userId: string) {
  return db.onboardingProfile.findUnique({ where: { userId } });
}

/** True when the member still needs to see the questionnaire. */
export async function needsOnboarding(userId: string): Promise<boolean> {
  const profile = await db.onboardingProfile.findUnique({
    where: { userId },
    select: { completedAt: true },
  });
  return !profile?.completedAt;
}

export async function saveOnboarding(userId: string, raw: OnboardingAnswers) {
  const answers = sanitise(raw);

  const interests = answers.interests ?? [];
  const hours = Number(answers.weeklyHours?.[0]);

  const data = {
    knowledgeLevel: answers.knowledgeLevel?.[0] ?? null,
    primaryGoals: answers.primaryGoals ?? [],
    interests,
    weeklyHours: Number.isFinite(hours) ? hours : null,
    // Opt-in by construction: absent from `interests` means off, so a member
    // who skips this step never receives faith or health content.
    wantsFaithContent: interests.includes(FAITH_PILLAR),
    wantsHealthContent: interests.includes(HEALTH_PILLAR),
    answers,
    completedAt: new Date(),
  };

  return db.onboardingProfile.upsert({
    where: { userId },
    create: { userId, ...data },
    update: data,
  });
}

/** Records that the member chose to skip, so they aren't asked on every visit. */
export async function skipOnboarding(userId: string) {
  const now = new Date();
  return db.onboardingProfile.upsert({
    where: { userId },
    create: { userId, completedAt: now, answers: {} },
    update: { completedAt: now },
  });
}

/** How deep to start, given the member's stated level. */
const LEVEL_ORDER = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;

const START_AT: Record<string, number> = {
  beginner: 0,
  learning: 0,
  intermediate: 1,
  advanced: 2,
};

export type LearningPath = {
  /** Ordered so the first entry is the one to start today. */
  courses: Awaited<ReturnType<typeof publishedCourses>>;
  /** Lessons per week the member's stated hours can sustain. */
  weeklyLessonTarget: number;
  reason: string;
};

function publishedCourses(where: object) {
  return db.course.findMany({
    where: { status: "PUBLISHED", ...where },
    select: {
      id: true,
      title: true,
      slug: true,
      subtitle: true,
      level: true,
      priceMinor: true,
      currency: true,
      estimatedHours: true,
      category: { select: { name: true, slug: true, iconEmoji: true } },
      _count: { select: { modules: true } },
    },
    orderBy: [{ level: "asc" }, { priceMinor: "asc" }],
  });
}

/**
 * Builds the recommended path.
 *
 * Ordering rule: courses in a chosen pillar at or below the member's stated
 * level come first, cheapest and most foundational first, so the path opens
 * with something they can start immediately rather than something they must
 * buy. Free courses therefore lead naturally — that is a consequence of the
 * ordering, not a sales tactic bolted on.
 */
export async function buildLearningPath(userId: string): Promise<LearningPath> {
  const profile = await getOnboardingProfile(userId);

  const interests = profile?.interests ?? [];
  const startIndex = START_AT[profile?.knowledgeLevel ?? "beginner"] ?? 0;
  const levels = LEVEL_ORDER.slice(startIndex);

  const hours = profile?.weeklyHours ?? 4;
  // Roughly 25 minutes of lesson plus exercise per hour committed, floored at
  // one so a target is never zero — a goal of "0 lessons" is demoralising and
  // meaningless.
  const weeklyLessonTarget = Math.max(1, Math.round((hours * 60) / 45));

  /**
   * Relax in stages rather than falling straight back to everything.
   *
   * An advanced member whose pillars have nothing advanced published should
   * still get *their pillars* — just at a lower level — before we start
   * offering them unrelated subjects. And whichever stage answers has to be
   * the one we explain: the first version of this reported "based on your
   * pillars and an advanced starting point" while actually listing beginner
   * courses from every pillar, which is worse than saying nothing.
   */
  const stages: { where: object; reason: string }[] = [];

  if (interests.length) {
    stages.push({
      where: { category: { slug: { in: interests } }, level: { in: levels } },
      reason: `Matched to your pillars at ${describeLevel(profile?.knowledgeLevel)} level.`,
    });
    stages.push({
      where: { category: { slug: { in: interests } } },
      reason:
        "Your pillars, starting from the foundations — nothing is published at your level in them yet.",
    });
  } else {
    stages.push({
      where: { level: { in: levels } },
      reason: `Everything at ${describeLevel(profile?.knowledgeLevel)} level. Choose your pillars in Settings to narrow it.`,
    });
  }

  stages.push({
    where: {},
    reason: "The full catalogue — refine your path any time in Settings.",
  });

  for (const stage of stages) {
    const courses = await publishedCourses(stage.where);
    if (courses.length > 0) {
      return { courses, weeklyLessonTarget, reason: stage.reason };
    }
  }

  // Nothing published at all. Real on a fresh install, so it must not throw.
  return {
    courses: [],
    weeklyLessonTarget,
    reason: "No courses are published yet. Your path appears here as soon as they are.",
  };
}

/** Reads naturally in a sentence — and avoids "a advanced". */
function describeLevel(level: string | null | undefined): string {
  return (
    {
      beginner: "beginner",
      learning: "beginner",
      intermediate: "intermediate",
      advanced: "advanced",
    }[level ?? "beginner"] ?? "beginner"
  );
}

/** Enrols the member in every free course on their path, idempotently. */
export async function enrolInFreePathCourses(userId: string) {
  const { courses } = await buildLearningPath(userId);
  const free = courses.filter((c) => c.priceMinor === 0);
  if (free.length === 0) return 0;

  // `createMany` + `skipDuplicates` leans on the unique(userId, courseId)
  // constraint, so running this twice cannot double-enrol.
  const result = await db.enrollment.createMany({
    data: free.map((c) => ({ userId, courseId: c.id })),
    skipDuplicates: true,
  });
  return result.count;
}

export function assertOnboardingStep(index: number) {
  if (!Number.isInteger(index) || index < 0 || index >= ONBOARDING_STEPS.length) {
    throw new ServiceError("That onboarding step does not exist.", 400);
  }
}
