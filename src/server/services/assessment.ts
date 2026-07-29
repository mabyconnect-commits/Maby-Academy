import "server-only";
import { db } from "@/lib/db";
import { ServiceError } from "./auth";
import { awardPoints, evaluateBadges, touchStreak } from "./rewards";
import { notify } from "./notifications";
import { recomputeEnrollmentProgress } from "./progress";
import { maybeCompleteCourse } from "./certificates";

// ===========================================================================
// Assignments & submissions
// ===========================================================================

export async function getAssignmentForStudent(
  assignmentId: string,
  userId: string,
) {
  const assignment = await db.assignment.findUnique({
    where: { id: assignmentId },
    include: {
      lesson: {
        select: {
          title: true,
          slug: true,
          module: {
            select: {
              course: { select: { id: true, title: true, slug: true } },
            },
          },
        },
      },
    },
  });
  if (!assignment) return null;

  const submissions = await db.submission.findMany({
    where: { assignmentId, studentId: userId },
    orderBy: { attempt: "desc" },
    include: { grader: { select: { name: true, avatarUrl: true } } },
  });

  return { assignment, submissions, latest: submissions[0] ?? null };
}

/**
 * Create or update a submission.
 *
 * A DRAFT is editable in place. Once SUBMITTED it is frozen; a resubmission
 * opens a new attempt so the grading history stays intact.
 */
export async function saveSubmission(params: {
  userId: string;
  assignmentId: string;
  textAnswer?: string;
  linkUrl?: string;
  fileUrl?: string;
  asDraft?: boolean;
}) {
  const assignment = await db.assignment.findUnique({
    where: { id: params.assignmentId },
    include: {
      lesson: {
        select: {
          title: true,
          module: { select: { courseId: true } },
        },
      },
    },
  });
  if (!assignment) throw new ServiceError("Assignment not found.", 404);

  const courseId = assignment.lesson.module.courseId;
  const enrollment = await db.enrollment.findUnique({
    where: { userId_courseId: { userId: params.userId, courseId } },
    select: { id: true },
  });
  if (!enrollment) {
    throw new ServiceError("Enrol in this course to submit work.", 403);
  }

  const latest = await db.submission.findFirst({
    where: { assignmentId: params.assignmentId, studentId: params.userId },
    orderBy: { attempt: "desc" },
  });

  const payload = {
    textAnswer: params.textAnswer || null,
    linkUrl: params.linkUrl || null,
    fileUrl: params.fileUrl || null,
    status: params.asDraft ? ("DRAFT" as const) : ("SUBMITTED" as const),
    submittedAt: params.asDraft ? null : new Date(),
  };

  if (latest && latest.status === "DRAFT") {
    return db.submission.update({ where: { id: latest.id }, data: payload });
  }

  if (latest && latest.status !== "RETURNED" && !params.asDraft && latest.status === "SUBMITTED") {
    throw new ServiceError(
      "Your work is already submitted and waiting to be reviewed.",
      409,
    );
  }

  return db.submission.create({
    data: {
      assignmentId: params.assignmentId,
      studentId: params.userId,
      attempt: (latest?.attempt ?? 0) + 1,
      ...payload,
    },
  });
}

/** Queue of work awaiting review, scoped to what this grader may see. */
export async function getGradingQueue(grader: {
  id: string;
  role: string;
}) {
  const courseFilter =
    grader.role === "ADMIN"
      ? {}
      : {
          assignment: {
            lesson: { module: { course: { instructorId: grader.id } } },
          },
        };

  return db.submission.findMany({
    where: {
      status: { in: ["SUBMITTED", "UNDER_REVIEW"] },
      ...courseFilter,
    },
    orderBy: { submittedAt: "asc" },
    include: {
      student: { select: { id: true, name: true, avatarUrl: true, email: true } },
      assignment: {
        include: {
          lesson: {
            select: {
              title: true,
              module: {
                select: { course: { select: { title: true, slug: true } } },
              },
            },
          },
        },
      },
    },
  });
}

export async function getSubmissionForGrader(
  submissionId: string,
  grader: { id: string; role: string },
) {
  const submission = await db.submission.findUnique({
    where: { id: submissionId },
    include: {
      student: { select: { id: true, name: true, email: true, avatarUrl: true } },
      grader: { select: { name: true } },
      assignment: {
        include: {
          lesson: {
            select: {
              title: true,
              slug: true,
              module: {
                select: {
                  course: {
                    select: { title: true, slug: true, instructorId: true },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  if (!submission) return null;

  const isOwner =
    submission.assignment.lesson.module.course.instructorId === grader.id;
  if (grader.role !== "ADMIN" && !isOwner) {
    throw new ServiceError("You cannot grade work for this course.", 403);
  }

  return submission;
}

/**
 * Grade a submission.
 *
 * A passing grade credits points, refreshes the streak and can complete the
 * course — all inside one transaction so a student can never see a grade
 * without the rewards that come with it.
 */
export async function gradeSubmission(params: {
  graderId: string;
  graderRole: string;
  submissionId: string;
  score: number;
  feedback?: string;
  rubricScores?: Record<string, number>;
}) {
  const submission = await getSubmissionForGrader(params.submissionId, {
    id: params.graderId,
    role: params.graderRole,
  });
  if (!submission) throw new ServiceError("Submission not found.", 404);

  const { assignment } = submission;
  if (params.score > assignment.maxScore) {
    throw new ServiceError(
      `Score cannot exceed the maximum of ${assignment.maxScore}.`,
      400,
    );
  }

  const passed = params.score >= assignment.passScore;
  const courseSlug = assignment.lesson.module.course.slug;

  return db.$transaction(async (tx) => {
    const updated = await tx.submission.update({
      where: { id: submission.id },
      data: {
        score: params.score,
        feedback: params.feedback || null,
        rubricScores: params.rubricScores ?? undefined,
        graderId: params.graderId,
        gradedAt: new Date(),
        status: passed ? "GRADED" : "RETURNED",
      },
    });

    if (passed) {
      await awardPoints(tx, {
        userId: submission.studentId,
        amount: assignment.pointsValue,
        reason: "ASSIGNMENT_GRADED",
        referenceKey: `assignment:${assignment.id}`,
        note: assignment.title,
      });

      // A passed assignment also completes its lesson.
      await tx.lessonProgress.upsert({
        where: {
          userId_lessonId: {
            userId: submission.studentId,
            lessonId: assignment.lessonId,
          },
        },
        create: {
          userId: submission.studentId,
          lessonId: assignment.lessonId,
          isCompleted: true,
          completedAt: new Date(),
        },
        update: { isCompleted: true, completedAt: new Date() },
      });

      const courseId = await tx.lesson
        .findUnique({
          where: { id: assignment.lessonId },
          select: { module: { select: { courseId: true } } },
        })
        .then((l) => l?.module.courseId);

      if (courseId) {
        const percent = await recomputeEnrollmentProgress(
          tx,
          submission.studentId,
          courseId,
        );
        await maybeCompleteCourse(tx, {
          userId: submission.studentId,
          courseId,
          progressPercent: percent,
        });
      }

      await touchStreak(tx, submission.studentId);
      await evaluateBadges(tx, submission.studentId);
    }

    await notify(tx, {
      userId: submission.studentId,
      type: "GRADE",
      title: passed
        ? `Passed: ${assignment.title}`
        : `Revisions requested: ${assignment.title}`,
      body: passed
        ? `You scored ${params.score}/${assignment.maxScore}. ${params.feedback ? "Read your feedback for the details." : "Well done."}`
        : `You scored ${params.score}/${assignment.maxScore}, below the pass mark of ${assignment.passScore}. Read the feedback and resubmit — this is how it's supposed to work.`,
      linkUrl: `/courses/${courseSlug}/lessons/${assignment.lesson.slug}`,
    });

    return updated;
  });
}

// ===========================================================================
// Quizzes
// ===========================================================================

/**
 * Score a quiz attempt.
 *
 * Correctness is computed server-side from the database; the client never
 * sees which options are correct until after submitting, and never gets to
 * assert its own score.
 */
export async function submitQuizAttempt(params: {
  userId: string;
  quizId: string;
  answers: { questionId: string; selectedOptionIds: string[] }[];
}) {
  const quiz = await db.quiz.findUnique({
    where: { id: params.quizId },
    include: {
      questions: { include: { options: true } },
      lesson: {
        select: {
          id: true,
          title: true,
          module: { select: { courseId: true } },
        },
      },
    },
  });
  if (!quiz) throw new ServiceError("Quiz not found.", 404);

  const courseId = quiz.lesson.module.courseId;
  const enrollment = await db.enrollment.findUnique({
    where: { userId_courseId: { userId: params.userId, courseId } },
    select: { id: true },
  });
  if (!enrollment) {
    throw new ServiceError("Enrol in this course to take the quiz.", 403);
  }

  const priorAttempts = await db.quizAttempt.count({
    where: { quizId: quiz.id, userId: params.userId },
  });
  if (priorAttempts >= quiz.maxAttempts) {
    throw new ServiceError(
      `You have used all ${quiz.maxAttempts} attempts for this quiz.`,
      403,
    );
  }

  const answerMap = new Map(
    params.answers.map((a) => [a.questionId, new Set(a.selectedOptionIds)]),
  );

  let earned = 0;
  let possible = 0;
  const graded: {
    questionId: string;
    selectedOptionIds: string[];
    isCorrect: boolean;
  }[] = [];

  for (const question of quiz.questions) {
    possible += question.points;
    const correctIds = new Set(
      question.options.filter((o) => o.isCorrect).map((o) => o.id),
    );
    const selected = answerMap.get(question.id) ?? new Set<string>();

    // Exact set match — partial credit would reward guessing everything.
    const isCorrect =
      selected.size === correctIds.size &&
      [...selected].every((id) => correctIds.has(id));

    if (isCorrect) earned += question.points;
    graded.push({
      questionId: question.id,
      selectedOptionIds: [...selected],
      isCorrect,
    });
  }

  const scorePercent = possible > 0 ? Math.round((earned / possible) * 100) : 0;
  const passed = scorePercent >= quiz.passScore;

  return db.$transaction(async (tx) => {
    const attempt = await tx.quizAttempt.create({
      data: {
        quizId: quiz.id,
        userId: params.userId,
        attempt: priorAttempts + 1,
        scorePercent,
        passed,
        submittedAt: new Date(),
        answers: { createMany: { data: graded } },
      },
    });

    if (passed) {
      await awardPoints(tx, {
        userId: params.userId,
        amount: quiz.pointsValue,
        reason: "QUIZ_PASSED",
        referenceKey: `quiz:${quiz.id}`,
        note: quiz.title,
      });

      await tx.lessonProgress.upsert({
        where: {
          userId_lessonId: { userId: params.userId, lessonId: quiz.lesson.id },
        },
        create: {
          userId: params.userId,
          lessonId: quiz.lesson.id,
          isCompleted: true,
          completedAt: new Date(),
        },
        update: { isCompleted: true, completedAt: new Date() },
      });

      const percent = await recomputeEnrollmentProgress(
        tx,
        params.userId,
        courseId,
      );
      await maybeCompleteCourse(tx, {
        userId: params.userId,
        courseId,
        progressPercent: percent,
      });
      await touchStreak(tx, params.userId);
      await evaluateBadges(tx, params.userId);
    }

    return {
      attempt,
      scorePercent,
      passed,
      earned,
      possible,
      attemptsLeft: quiz.maxAttempts - (priorAttempts + 1),
      review: graded.map((g) => {
        const q = quiz.questions.find((qq) => qq.id === g.questionId);
        return {
          questionId: g.questionId,
          prompt: q?.prompt ?? "",
          explanation: q?.explanation ?? null,
          isCorrect: g.isCorrect,
          correctOptionIds: q?.options.filter((o) => o.isCorrect).map((o) => o.id) ?? [],
          selectedOptionIds: g.selectedOptionIds,
        };
      }),
    };
  });
}

export async function getQuizAttempts(quizId: string, userId: string) {
  return db.quizAttempt.findMany({
    where: { quizId, userId },
    orderBy: { attempt: "desc" },
  });
}

/** A student's assignments across every course, for the dashboard list. */
export async function getMyAssignments(userId: string) {
  const enrollments = await db.enrollment.findMany({
    where: { userId },
    select: { courseId: true },
  });
  const courseIds = enrollments.map((e) => e.courseId);
  if (courseIds.length === 0) return [];

  const assignments = await db.assignment.findMany({
    where: { lesson: { module: { courseId: { in: courseIds } } } },
    orderBy: [{ dueAt: "asc" }, { createdAt: "asc" }],
    include: {
      lesson: {
        select: {
          slug: true,
          module: {
            select: { course: { select: { title: true, slug: true } } },
          },
        },
      },
      submissions: {
        where: { studentId: userId },
        orderBy: { attempt: "desc" },
        take: 1,
      },
    },
  });

  return assignments.map((a) => ({
    ...a,
    submission: a.submissions[0] ?? null,
  }));
}
