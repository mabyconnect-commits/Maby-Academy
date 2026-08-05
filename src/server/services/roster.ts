import "server-only";
import { db } from "@/lib/db";
import { ServiceError } from "@/lib/errors";
import { parseRubric } from "@/lib/rubric";
import { actorCan, type Actor } from "./policy";
import { flagFor, type RosterFlag } from "@/lib/roster-flags";

/**
 * The teaching side of a learner's record.
 *
 * The grading queue answers "what is waiting for me?", which is only half of
 * an instructor's job. The other half is noticing the student who is *not*
 * in the queue — the one who enrolled six weeks ago, stopped at lesson four
 * and has submitted nothing. Nothing surfaced those people at all, so they
 * were invisible by construction: a queue can only ever show you work that
 * arrived.
 *
 * Scope is enforced here, once. An instructor sees learners enrolled on the
 * courses they own and nobody else; an administrator sees everyone. Pages ask
 * for a roster and get back only rows the actor is entitled to, so a page
 * cannot leak by forgetting a filter.
 *
 * What is deliberately absent: journals. A learner's journal is private by
 * default and reachable only through a per-assignment mentorship consent —
 * there is no administrative override, and adding one here to make a roster
 * "complete" would quietly repeal that promise.
 */

export type RosterRow = {
  enrolmentId: string;
  learnerId: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  courseId: string;
  courseTitle: string;
  courseSlug: string;
  status: string;
  progressPercent: number;
  enrolledAt: Date;
  lastAccessedAt: Date | null;
  /** Whole days since the learner last opened anything on this course. */
  daysSinceAccess: number | null;
  /** Same, but counted from enrolment when they have never opened it. */
  idleDays: number;
  lessonsCompleted: number;
  lessonsTotal: number;
  /** Submissions sitting in this actor's queue for this learner. */
  awaitingGrade: number;
  /** Graded submissions that came back below the pass mark and were not redone. */
  needsResubmission: number;
  flag: RosterFlag;
};

/** Restricts a query to courses the actor is entitled to see learners on. */
function courseScope(actor: Actor) {
  // An administrator oversees the whole catalogue; an instructor oversees the
  // courses they own. Mentors are excluded entirely — their access to a
  // mentee runs through the mentorship consent, not through a course roster.
  if (actorCan(actor, "user:edit")) return {};
  return { instructorId: actor.id };
}

/**
 * Every learner the actor is responsible for, one row per enrolment.
 *
 * Counts are gathered with three grouped queries rather than per-row lookups.
 * The naive version issued four queries per enrolment, which on a course of
 * two hundred students was eight hundred round trips to render one page.
 */
export async function listLearners(
  actor: Actor,
  options: { courseId?: string; query?: string } = {},
): Promise<RosterRow[]> {
  if (!actorCan(actor, "submission:view") && !actorCan(actor, "submission:grade")) {
    throw new ServiceError("You cannot view learner records.", 403);
  }

  const scope = courseScope(actor);
  const search = options.query?.trim();

  const enrolments = await db.enrollment.findMany({
    where: {
      course: {
        ...scope,
        ...(options.courseId ? { id: options.courseId } : {}),
      },
      ...(search
        ? {
            user: {
              OR: [
                { name: { contains: search, mode: "insensitive" as const } },
                { email: { contains: search, mode: "insensitive" as const } },
              ],
            },
          }
        : {}),
    },
    orderBy: [{ lastAccessedAt: "desc" }, { enrolledAt: "desc" }],
    select: {
      id: true,
      status: true,
      progressPercent: true,
      enrolledAt: true,
      lastAccessedAt: true,
      userId: true,
      courseId: true,
      user: { select: { name: true, email: true, avatarUrl: true } },
      course: { select: { title: true, slug: true } },
    },
  });

  if (enrolments.length === 0) return [];

  const learnerIds = [...new Set(enrolments.map((e) => e.userId))];
  const courseIds = [...new Set(enrolments.map((e) => e.courseId))];

  // Lesson totals per course, and completions per learner-course. Prisma
  // cannot group a lesson count by course through two relations in one call,
  // so the module ids are fetched once and folded in memory.
  const modules = await db.module.findMany({
    where: { courseId: { in: courseIds } },
    select: { id: true, courseId: true },
  });
  const courseOfModule = new Map(modules.map((m) => [m.id, m.courseId]));

  const lessons = await db.lesson.findMany({
    where: { moduleId: { in: modules.map((m) => m.id) } },
    select: { id: true, moduleId: true },
  });
  const courseOfLesson = new Map<string, string>();
  const lessonTotals = new Map<string, number>();
  for (const lesson of lessons) {
    const courseId = courseOfModule.get(lesson.moduleId);
    if (!courseId) continue;
    courseOfLesson.set(lesson.id, courseId);
    lessonTotals.set(courseId, (lessonTotals.get(courseId) ?? 0) + 1);
  }

  const [completions, submissions] = await Promise.all([
    db.lessonProgress.findMany({
      where: {
        userId: { in: learnerIds },
        lessonId: { in: [...courseOfLesson.keys()] },
        isCompleted: true,
      },
      select: { userId: true, lessonId: true },
    }),
    db.submission.findMany({
      where: {
        studentId: { in: learnerIds },
        assignment: {
          lesson: { module: { courseId: { in: courseIds } } },
        },
      },
      select: {
        studentId: true,
        status: true,
        assignment: {
          select: { lesson: { select: { module: { select: { courseId: true } } } } },
        },
      },
    }),
  ]);

  const key = (userId: string, courseId: string) => `${userId}:${courseId}`;

  const completedCounts = new Map<string, number>();
  for (const row of completions) {
    const courseId = courseOfLesson.get(row.lessonId);
    if (!courseId) continue;
    const k = key(row.userId, courseId);
    completedCounts.set(k, (completedCounts.get(k) ?? 0) + 1);
  }

  const awaiting = new Map<string, number>();
  const returned = new Map<string, number>();
  for (const row of submissions) {
    const courseId = row.assignment.lesson.module.courseId;
    const k = key(row.studentId, courseId);
    if (row.status === "SUBMITTED" || row.status === "UNDER_REVIEW") {
      awaiting.set(k, (awaiting.get(k) ?? 0) + 1);
    } else if (row.status === "RETURNED") {
      returned.set(k, (returned.get(k) ?? 0) + 1);
    }
  }

  const now = Date.now();

  return enrolments.map((e) => {
    const k = key(e.userId, e.courseId);
    const daysSinceAccess = e.lastAccessedAt
      ? Math.floor((now - e.lastAccessedAt.getTime()) / 86_400_000)
      : null;
    // Never opened counts as idle since enrolment, not as unknown.
    const idleDays =
      daysSinceAccess ??
      Math.floor((now - e.enrolledAt.getTime()) / 86_400_000);
    const awaitingGrade = awaiting.get(k) ?? 0;
    const needsResubmission = returned.get(k) ?? 0;

    return {
      enrolmentId: e.id,
      learnerId: e.userId,
      name: e.user.name,
      email: e.user.email,
      avatarUrl: e.user.avatarUrl,
      courseId: e.courseId,
      courseTitle: e.course.title,
      courseSlug: e.course.slug,
      status: e.status,
      progressPercent: e.progressPercent,
      enrolledAt: e.enrolledAt,
      lastAccessedAt: e.lastAccessedAt,
      daysSinceAccess,
      idleDays,
      lessonsCompleted: completedCounts.get(k) ?? 0,
      lessonsTotal: lessonTotals.get(e.courseId) ?? 0,
      awaitingGrade,
      needsResubmission,
      flag: flagFor({
        status: e.status,
        progressPercent: e.progressPercent,
        idleDays,
        awaitingGrade,
        needsResubmission,
      }),
    };
  });
}

export type LearnerCourseDetail = {
  courseId: string;
  courseTitle: string;
  courseSlug: string;
  passThreshold: number;
  progressPercent: number;
  status: string;
  enrolledAt: Date;
  lastAccessedAt: Date | null;
  lessonsCompleted: number;
  lessonsTotal: number;
  quizzes: {
    title: string;
    lessonTitle: string;
    bestScore: number | null;
    passScore: number;
    attempts: number;
    maxAttempts: number;
  }[];
  assignments: {
    submissionId: string | null;
    assignmentId: string;
    title: string;
    status: string;
    score: number | null;
    maxScore: number;
    passScore: number;
    submittedAt: Date | null;
    gradedAt: Date | null;
    graderName: string | null;
    feedback: string | null;
    rubric: { name: string; maxPoints: number; score: number | null }[];
  }[];
  /** Mean of graded work as a percentage, or null when nothing is graded. */
  average: number | null;
};

export type LearnerDetail = {
  learnerId: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  joinedAt: Date;
  lifetimePoints: number;
  currentStreak: number;
  courses: LearnerCourseDetail[];
};

/**
 * One learner's record, restricted to the courses the actor teaches.
 *
 * An instructor who owns two of the six courses a learner is enrolled on sees
 * those two. That is the point: it is a teaching record, not a profile, and an
 * instructor has no standing to review work set by somebody else.
 */
export async function getLearnerDetail(
  actor: Actor,
  learnerId: string,
): Promise<LearnerDetail | null> {
  if (!actorCan(actor, "submission:view") && !actorCan(actor, "submission:grade")) {
    throw new ServiceError("You cannot view learner records.", 403);
  }

  const learner = await db.user.findUnique({
    where: { id: learnerId },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
      createdAt: true,
      lifetimePoints: true,
      currentStreak: true,
    },
  });
  if (!learner) return null;

  const enrolments = await db.enrollment.findMany({
    where: { userId: learnerId, course: courseScope(actor) },
    orderBy: { enrolledAt: "desc" },
    select: {
      status: true,
      progressPercent: true,
      enrolledAt: true,
      lastAccessedAt: true,
      course: {
        select: {
          id: true,
          title: true,
          slug: true,
          passThreshold: true,
          modules: {
            orderBy: { sortOrder: "asc" },
            select: {
              lessons: {
                orderBy: { sortOrder: "asc" },
                select: {
                  id: true,
                  title: true,
                  quiz: {
                    select: { id: true, title: true, passScore: true, maxAttempts: true },
                  },
                  assignment: {
                    select: {
                      id: true,
                      title: true,
                      maxScore: true,
                      passScore: true,
                      rubric: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  // An instructor asking about a learner on none of their courses gets an
  // empty record rather than a 404 — the distinction would confirm whether
  // the account exists, which is not theirs to learn.
  if (enrolments.length === 0) {
    return {
      learnerId: learner.id,
      name: learner.name,
      email: learner.email,
      avatarUrl: learner.avatarUrl,
      joinedAt: learner.createdAt,
      lifetimePoints: learner.lifetimePoints,
      currentStreak: learner.currentStreak,
      courses: [],
    };
  }

  const lessonIds = enrolments.flatMap((e) =>
    e.course.modules.flatMap((m) => m.lessons.map((l) => l.id)),
  );
  const quizIds = enrolments.flatMap((e) =>
    e.course.modules.flatMap((m) =>
      m.lessons.flatMap((l) => (l.quiz ? [l.quiz.id] : [])),
    ),
  );
  const assignmentIds = enrolments.flatMap((e) =>
    e.course.modules.flatMap((m) =>
      m.lessons.flatMap((l) => (l.assignment ? [l.assignment.id] : [])),
    ),
  );

  const [completions, attempts, submissions] = await Promise.all([
    db.lessonProgress.findMany({
      where: { userId: learnerId, lessonId: { in: lessonIds }, isCompleted: true },
      select: { lessonId: true },
    }),
    db.quizAttempt.findMany({
      where: { userId: learnerId, quizId: { in: quizIds } },
      select: { quizId: true, scorePercent: true },
    }),
    db.submission.findMany({
      where: { studentId: learnerId, assignmentId: { in: assignmentIds } },
      // An assignment can be submitted more than once — a returned piece is
      // redone under a new attempt number. Ascending order means the map below
      // ends up holding the latest attempt, which is the one that counts.
      orderBy: { attempt: "asc" },
      select: {
        id: true,
        assignmentId: true,
        status: true,
        score: true,
        submittedAt: true,
        gradedAt: true,
        feedback: true,
        rubricScores: true,
        grader: { select: { name: true } },
      },
    }),
  ]);

  const completed = new Set(completions.map((c) => c.lessonId));

  const attemptsByQuiz = new Map<string, number[]>();
  for (const a of attempts) {
    const list = attemptsByQuiz.get(a.quizId) ?? [];
    list.push(a.scorePercent);
    attemptsByQuiz.set(a.quizId, list);
  }

  const submissionByAssignment = new Map(
    submissions.map((s) => [s.assignmentId, s]),
  );

  const courses: LearnerCourseDetail[] = enrolments.map((e) => {
    const lessons = e.course.modules.flatMap((m) => m.lessons);

    const quizzes = lessons.flatMap((l) => {
      if (!l.quiz) return [];
      const scores = attemptsByQuiz.get(l.quiz.id) ?? [];
      return [
        {
          title: l.quiz.title,
          lessonTitle: l.title,
          bestScore: scores.length > 0 ? Math.max(...scores) : null,
          passScore: l.quiz.passScore,
          attempts: scores.length,
          maxAttempts: l.quiz.maxAttempts,
        },
      ];
    });

    const assignments = lessons.flatMap((l) => {
      if (!l.assignment) return [];
      const submission = submissionByAssignment.get(l.assignment.id);
      const criteria = parseRubric(l.assignment.rubric);
      const marks = (submission?.rubricScores ?? null) as Record<
        string,
        number
      > | null;

      return [
        {
          submissionId: submission?.id ?? null,
          assignmentId: l.assignment.id,
          title: l.assignment.title,
          status: submission?.status ?? "NOT_STARTED",
          score: submission?.score ?? null,
          maxScore: l.assignment.maxScore,
          passScore: l.assignment.passScore,
          submittedAt: submission?.submittedAt ?? null,
          gradedAt: submission?.gradedAt ?? null,
          graderName: submission?.grader?.name ?? null,
          feedback: submission?.feedback ?? null,
          rubric: criteria.map((c) => ({
            name: c.name,
            maxPoints: c.maxPoints,
            score: marks && typeof marks[c.name] === "number" ? marks[c.name] : null,
          })),
        },
      ];
    });

    // Everything is normalised to a percentage before averaging, so a quiz
    // marked out of 100 and an assignment marked out of 40 carry equal weight
    // rather than the assignment being silently discounted.
    const percentages = [
      ...quizzes.flatMap((q) => (q.bestScore === null ? [] : [q.bestScore])),
      ...assignments.flatMap((a) =>
        a.score === null ? [] : [(a.score / a.maxScore) * 100],
      ),
    ];

    return {
      courseId: e.course.id,
      courseTitle: e.course.title,
      courseSlug: e.course.slug,
      passThreshold: e.course.passThreshold,
      progressPercent: e.progressPercent,
      status: e.status,
      enrolledAt: e.enrolledAt,
      lastAccessedAt: e.lastAccessedAt,
      lessonsCompleted: lessons.filter((l) => completed.has(l.id)).length,
      lessonsTotal: lessons.length,
      quizzes,
      assignments,
      average:
        percentages.length > 0
          ? Math.round(percentages.reduce((s, p) => s + p, 0) / percentages.length)
          : null,
    };
  });

  return {
    learnerId: learner.id,
    name: learner.name,
    email: learner.email,
    avatarUrl: learner.avatarUrl,
    joinedAt: learner.createdAt,
    lifetimePoints: learner.lifetimePoints,
    currentStreak: learner.currentStreak,
    courses,
  };
}

/** The courses an actor may filter a roster by, for the page's select. */
export async function listScopedCourses(actor: Actor) {
  return db.course.findMany({
    where: courseScope(actor),
    orderBy: { title: "asc" },
    select: { id: true, title: true },
  });
}
