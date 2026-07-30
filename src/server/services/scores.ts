import "server-only";
import { db } from "@/lib/db";
import { parseRubric } from "@/lib/rubric";

/**
 * A student's own results, gathered per course.
 *
 * This exists because there was nowhere for a learner to answer the question
 * "how am I doing?" — quiz results only ever appeared on the lesson that
 * contained the quiz, and assignment grades only in a flat list with no
 * course context. Students were asking their instructor by message instead,
 * which is the sign of a missing page rather than a missing explanation.
 *
 * Everything here is scoped to the requesting user. There is no parameter for
 * viewing anyone else's results — staff have their own surfaces for that, and
 * keeping this service single-subject means a mistake in a page cannot leak
 * one learner's marks to another.
 */

export type QuizResult = {
  quizId: string;
  title: string;
  lessonTitle: string;
  lessonSlug: string;
  /** Highest score across every attempt, which is what counts. */
  bestScore: number;
  passScore: number;
  passed: boolean;
  attemptsUsed: number;
  maxAttempts: number;
  lastAttemptAt: Date | null;
};

export type AssignmentResult = {
  assignmentId: string;
  title: string;
  lessonSlug: string;
  status: string;
  score: number | null;
  maxScore: number;
  passScore: number;
  passed: boolean | null;
  feedback: string | null;
  gradedAt: Date | null;
  graderName: string | null;
  /** Per-criterion marks, when the grader used the rubric. */
  rubric: { name: string; maxPoints: number; score: number | null }[];
};

export type CourseScores = {
  courseId: string;
  courseSlug: string;
  courseTitle: string;
  progressPercent: number;
  passThreshold: number;
  quizzes: QuizResult[];
  assignments: AssignmentResult[];
  /**
   * Mean of every graded item as a percentage, or null when nothing has been
   * graded yet. Deliberately not shown as 0% in that case — a learner who has
   * submitted nothing has no average, and displaying zero reads as a fail.
   */
  average: number | null;
  gradedCount: number;
  awaitingCount: number;
  notStartedCount: number;
  certificate: { serial: string; verifyToken: string; issuedAt: Date } | null;
};

/** Per-criterion scores are stored keyed by criterion name. */
function parseRubricScores(value: unknown): Record<string, number> {
  if (typeof value !== "object" || value === null) return {};
  const out: Record<string, number> = {};
  for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
    if (typeof v === "number") out[k] = v;
  }
  return out;
}

export async function getMyScores(userId: string): Promise<CourseScores[]> {
  const enrollments = await db.enrollment.findMany({
    where: { userId },
    orderBy: { lastAccessedAt: "desc" },
    select: {
      progressPercent: true,
      course: {
        select: {
          id: true,
          slug: true,
          title: true,
          passThreshold: true,
          modules: {
            orderBy: { sortOrder: "asc" },
            select: {
              lessons: {
                orderBy: { sortOrder: "asc" },
                select: {
                  slug: true,
                  title: true,
                  quiz: {
                    select: {
                      id: true,
                      title: true,
                      passScore: true,
                      maxAttempts: true,
                    },
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

  if (enrollments.length === 0) return [];

  const courseIds = enrollments.map((e) => e.course.id);

  // Two batched reads rather than a query per quiz: a forty-lesson course has
  // four of each, and eleven enrolments would otherwise be ninety round trips.
  const [attempts, submissions, certificates] = await Promise.all([
    db.quizAttempt.findMany({
      where: {
        userId,
        quiz: { lesson: { module: { courseId: { in: courseIds } } } },
      },
      select: {
        quizId: true,
        scorePercent: true,
        passed: true,
        submittedAt: true,
      },
    }),
    db.submission.findMany({
      where: {
        studentId: userId,
        assignment: { lesson: { module: { courseId: { in: courseIds } } } },
      },
      orderBy: { attempt: "desc" },
      select: {
        assignmentId: true,
        status: true,
        score: true,
        feedback: true,
        gradedAt: true,
        rubricScores: true,
        grader: { select: { name: true } },
      },
    }),
    db.certificate.findMany({
      where: { userId, courseId: { in: courseIds }, revokedAt: null },
      select: {
        courseId: true,
        serial: true,
        verifyToken: true,
        issuedAt: true,
      },
    }),
  ]);

  const attemptsByQuiz = new Map<string, typeof attempts>();
  for (const a of attempts) {
    const list = attemptsByQuiz.get(a.quizId) ?? [];
    list.push(a);
    attemptsByQuiz.set(a.quizId, list);
  }

  // Ordered by attempt desc, so the first entry per assignment is the latest.
  const latestByAssignment = new Map<string, (typeof submissions)[number]>();
  for (const s of submissions) {
    if (!latestByAssignment.has(s.assignmentId)) {
      latestByAssignment.set(s.assignmentId, s);
    }
  }

  const certByCourse = new Map(certificates.map((c) => [c.courseId, c]));

  return enrollments.map((enrolment) => {
    const course = enrolment.course;
    const lessons = course.modules.flatMap((m) => m.lessons);

    const quizzes: QuizResult[] = [];
    const assignments: AssignmentResult[] = [];

    for (const lesson of lessons) {
      if (lesson.quiz) {
        const mine = attemptsByQuiz.get(lesson.quiz.id) ?? [];
        const bestScore = mine.reduce((b, a) => Math.max(b, a.scorePercent), 0);
        const lastAttemptAt = mine.reduce<Date | null>(
          (latest, a) =>
            a.submittedAt && (!latest || a.submittedAt > latest)
              ? a.submittedAt
              : latest,
          null,
        );
        quizzes.push({
          quizId: lesson.quiz.id,
          title: lesson.quiz.title,
          lessonTitle: lesson.title,
          lessonSlug: lesson.slug,
          bestScore,
          passScore: lesson.quiz.passScore,
          passed: mine.some((a) => a.passed),
          attemptsUsed: mine.length,
          maxAttempts: lesson.quiz.maxAttempts,
          lastAttemptAt,
        });
      }

      if (lesson.assignment) {
        const sub = latestByAssignment.get(lesson.assignment.id) ?? null;
        const criteria = parseRubric(lesson.assignment.rubric);
        const scores = parseRubricScores(sub?.rubricScores);
        assignments.push({
          assignmentId: lesson.assignment.id,
          title: lesson.assignment.title,
          lessonSlug: lesson.slug,
          status: sub?.status ?? "NOT_STARTED",
          score: sub?.score ?? null,
          maxScore: lesson.assignment.maxScore,
          passScore: lesson.assignment.passScore,
          passed:
            sub?.score == null
              ? null
              : sub.score >= lesson.assignment.passScore,
          feedback: sub?.feedback ?? null,
          gradedAt: sub?.gradedAt ?? null,
          graderName: sub?.grader?.name ?? null,
          rubric: criteria.map((c) => ({
            name: c.name,
            maxPoints: c.maxPoints,
            score: c.name in scores ? scores[c.name] : null,
          })),
        });
      }
    }

    // Everything is normalised to a percentage before averaging, so a quiz
    // scored out of 100 and an assignment scored out of 40 carry equal weight
    // rather than the assignment being silently discounted.
    const graded: number[] = [];
    for (const q of quizzes) {
      if (q.attemptsUsed > 0) graded.push(q.bestScore);
    }
    for (const a of assignments) {
      if (a.score != null && a.maxScore > 0) {
        graded.push((a.score / a.maxScore) * 100);
      }
    }

    const awaitingCount = assignments.filter(
      (a) => a.status === "SUBMITTED" || a.status === "UNDER_REVIEW",
    ).length;
    const notStartedCount =
      quizzes.filter((q) => q.attemptsUsed === 0).length +
      assignments.filter((a) => a.status === "NOT_STARTED" || a.status === "DRAFT")
        .length;

    return {
      courseId: course.id,
      courseSlug: course.slug,
      courseTitle: course.title,
      progressPercent: enrolment.progressPercent,
      passThreshold: course.passThreshold,
      quizzes,
      assignments,
      average:
        graded.length === 0
          ? null
          : Math.round(graded.reduce((s, n) => s + n, 0) / graded.length),
      gradedCount: graded.length,
      awaitingCount,
      notStartedCount,
      certificate: certByCourse.get(course.id) ?? null,
    };
  });
}
