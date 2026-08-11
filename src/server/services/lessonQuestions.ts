import "server-only";
import type { ModerationStatus, Role } from "@prisma/client";
import { db } from "@/lib/db";
import { isStaff } from "@/lib/auth/session";
import { ServiceError } from "./auth";
import { notify } from "./notifications";
import { enforceRateLimit } from "./rateLimit";
import { actorCan, type Actor } from "./policy";

/**
 * The lesson questions box.
 *
 * A learner reaches for this the moment something doesn't click, without
 * leaving the lesson to hunt for the right community thread. Two rules, same
 * as the community:
 *
 * 1. **Hidden content stays hidden.** Every read path filters moderation
 *    status, so a removed question can't resurface through another query.
 * 2. **Only people in the room can talk.** Asking and answering require
 *    enrolment in the lesson's course; platform staff (instructors, mentors,
 *    moderators) can always answer and moderate.
 */

const PUBLIC_STATUSES: ModerationStatus[] = ["VISIBLE", "FLAGGED"];

function visibilityFilter(actor: Actor | null) {
  // Moderators see flagged and hidden content — that's the job. Nobody sees
  // REMOVED except through the moderation queue.
  if (actor && actorCan(actor, "report:review")) {
    return { status: { not: "REMOVED" as ModerationStatus } };
  }
  return { status: { in: PUBLIC_STATUSES } };
}

const authorSelect = {
  select: { id: true, name: true, avatarUrl: true, role: true },
} as const;

/** Staff can be granted through the primary role or an extra role. */
function isStaffActor(actor: Actor): boolean {
  return [actor.role, ...(actor.extraRoles ?? [])].some((r: Role) => isStaff(r));
}

/**
 * Resolve the lesson's course and confirm the actor may take part. Returns the
 * course/lesson slugs so a caller building a notification link doesn't fetch
 * them again.
 */
async function requireParticipant(actor: Actor, lessonId: string) {
  const lesson = await db.lesson.findUnique({
    where: { id: lessonId },
    select: {
      slug: true,
      module: {
        select: { courseId: true, course: { select: { slug: true } } },
      },
    },
  });
  if (!lesson) throw new ServiceError("Lesson not found.", 404);

  const courseId = lesson.module.courseId;
  if (!isStaffActor(actor)) {
    const enrollment = await db.enrollment.findUnique({
      where: { userId_courseId: { userId: actor.id, courseId } },
      select: { id: true },
    });
    if (!enrollment) {
      throw new ServiceError(
        "Enrol in this course to ask or answer questions.",
        403,
      );
    }
  }

  return { courseSlug: lesson.module.course.slug, lessonSlug: lesson.slug };
}

// ---------------------------------------------------------------------------
// Reads
// ---------------------------------------------------------------------------

export async function listLessonQuestions(lessonId: string, actor: Actor | null) {
  return db.lessonQuestion.findMany({
    where: { lessonId, ...visibilityFilter(actor) },
    // Open questions first so what still needs help is what a helper sees;
    // within each group, newest first.
    orderBy: [{ isResolved: "asc" }, { createdAt: "desc" }],
    include: {
      author: authorSelect,
      answers: {
        where: visibilityFilter(actor),
        // Accepted answer first, then oldest — the reply that resolved it
        // should lead for the next reader with the same question.
        orderBy: [{ isAccepted: "desc" }, { createdAt: "asc" }],
        include: { author: authorSelect },
      },
    },
  });
}

export type LessonQuestionWithAnswers = Awaited<
  ReturnType<typeof listLessonQuestions>
>[number];

// ---------------------------------------------------------------------------
// Writes
// ---------------------------------------------------------------------------

export async function askLessonQuestion(params: {
  actor: Actor;
  lessonId: string;
  body: string;
}) {
  await enforceRateLimit("post", params.actor.id);
  await requireParticipant(params.actor, params.lessonId);

  const body = params.body.trim();
  if (body.length < 5) throw new ServiceError("Ask something first.", 400);
  if (body.length > 4000) throw new ServiceError("That question is too long.", 400);

  return db.lessonQuestion.create({
    data: { lessonId: params.lessonId, authorId: params.actor.id, body },
  });
}

export async function answerLessonQuestion(params: {
  actor: Actor;
  questionId: string;
  body: string;
}) {
  await enforceRateLimit("comment", params.actor.id);

  const question = await db.lessonQuestion.findUnique({
    where: { id: params.questionId },
    select: { id: true, authorId: true, lessonId: true, status: true },
  });
  if (!question || question.status === "REMOVED") {
    throw new ServiceError("Question not found.", 404);
  }

  const { courseSlug, lessonSlug } = await requireParticipant(
    params.actor,
    question.lessonId,
  );

  const body = params.body.trim();
  if (body.length < 2) throw new ServiceError("Write your answer first.", 400);
  if (body.length > 8000) throw new ServiceError("That answer is too long.", 400);

  return db.$transaction(async (tx) => {
    const answer = await tx.lessonAnswer.create({
      data: {
        questionId: question.id,
        authorId: params.actor.id,
        body,
      },
    });

    // Counter updated in the same transaction as the row it counts.
    await tx.lessonQuestion.update({
      where: { id: question.id },
      data: { answerCount: { increment: 1 } },
    });

    // Tell the asker, unless they answered their own question.
    if (question.authorId !== params.actor.id) {
      await notify(tx, {
        userId: question.authorId,
        type: "SYSTEM",
        title: "New answer to your question",
        body: "Someone answered a question you asked in a lesson.",
        linkUrl: `/courses/${courseSlug}/lessons/${lessonSlug}#lesson-questions`,
      });
    }

    return answer;
  });
}

/**
 * Mark the answer that resolved a question — or unmark it. Only the asker or
 * staff can, and accepting one clears any previously accepted answer so a
 * question has at most one. Accepting resolves the question; unaccepting
 * reopens it.
 */
export async function toggleAcceptedAnswer(actor: Actor, answerId: string) {
  const answer = await db.lessonAnswer.findUnique({
    where: { id: answerId },
    select: {
      id: true,
      questionId: true,
      isAccepted: true,
      question: { select: { authorId: true } },
    },
  });
  if (!answer) throw new ServiceError("Answer not found.", 404);

  if (answer.question.authorId !== actor.id && !isStaffActor(actor)) {
    throw new ServiceError("Only the asker can accept an answer.", 403);
  }

  const nowAccepted = !answer.isAccepted;

  await db.$transaction(async (tx) => {
    // At most one accepted answer per question.
    await tx.lessonAnswer.updateMany({
      where: { questionId: answer.questionId },
      data: { isAccepted: false },
    });
    if (nowAccepted) {
      await tx.lessonAnswer.update({
        where: { id: answerId },
        data: { isAccepted: true },
      });
    }
    await tx.lessonQuestion.update({
      where: { id: answer.questionId },
      data: { isResolved: nowAccepted },
    });
  });

  return { accepted: nowAccepted };
}

/** Toggle a question's resolved flag directly (asker or staff). */
export async function toggleQuestionResolved(actor: Actor, questionId: string) {
  const question = await db.lessonQuestion.findUnique({
    where: { id: questionId },
    select: { authorId: true, isResolved: true },
  });
  if (!question) throw new ServiceError("Question not found.", 404);

  if (question.authorId !== actor.id && !isStaffActor(actor)) {
    throw new ServiceError("Only the asker can resolve this.", 403);
  }

  const updated = await db.lessonQuestion.update({
    where: { id: questionId },
    data: { isResolved: !question.isResolved },
    select: { isResolved: true },
  });
  return { resolved: updated.isResolved };
}

export async function deleteOwnQuestion(actor: Actor, questionId: string) {
  const question = await db.lessonQuestion.findUnique({
    where: { id: questionId },
    select: { authorId: true },
  });
  if (!question) throw new ServiceError("Question not found.", 404);
  if (question.authorId !== actor.id && !actorCan(actor, "report:review")) {
    throw new ServiceError("You cannot remove this question.", 403);
  }
  // Soft-delete: a thread with answers loses its context if the root vanishes.
  await db.lessonQuestion.update({
    where: { id: questionId },
    data: { status: "REMOVED" },
  });
  return { removed: true };
}

export async function deleteOwnAnswer(actor: Actor, answerId: string) {
  const answer = await db.lessonAnswer.findUnique({
    where: { id: answerId },
    select: { authorId: true, questionId: true },
  });
  if (!answer) throw new ServiceError("Answer not found.", 404);
  if (answer.authorId !== actor.id && !actorCan(actor, "report:review")) {
    throw new ServiceError("You cannot remove this answer.", 403);
  }
  await db.$transaction(async (tx) => {
    await tx.lessonAnswer.update({
      where: { id: answerId },
      data: { status: "REMOVED" },
    });
    await tx.lessonQuestion.update({
      where: { id: answer.questionId },
      data: { answerCount: { decrement: 1 } },
    });
  });
  return { removed: true };
}
