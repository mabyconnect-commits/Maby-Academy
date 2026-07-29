"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ZodError } from "zod";
import { requireRole, requireUser } from "@/lib/auth/session";
import {
  enrollSchema,
  gradeSchema,
  progressSchema,
  quizAttemptSchema,
  reviewSchema,
  rsvpSchema,
  submissionSchema,
} from "@/lib/validation";
import { ServiceError } from "@/server/services/auth";
import { enrollUser, upsertReview } from "@/server/services/courses";
import { trackLessonProgress } from "@/server/services/progress";
import {
  gradeSubmission,
  saveSubmission,
  submitQuizAttempt,
} from "@/server/services/assessment";
import { toggleRsvp } from "@/server/services/liveSessions";
import { markRead } from "@/server/services/notifications";
import type { FormState } from "./formState";

function toFormState(error: unknown): FormState {
  if (error instanceof ZodError) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of error.issues) {
      fieldErrors[issue.path.join(".") || "form"] ??= issue.message;
    }
    return { ok: false, message: error.issues[0]?.message, fieldErrors };
  }
  if (error instanceof ServiceError) {
    return { ok: false, message: error.message };
  }
  if (error instanceof Error && error.message.includes("signed in")) {
    return { ok: false, message: error.message };
  }
  console.error("[action] unhandled error:", error);
  return { ok: false, message: "Something went wrong. Please try again." };
}

export async function enrollAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  let slug: string | null = null;
  try {
    const user = await requireUser();
    const { courseId } = enrollSchema.parse({ courseId: formData.get("courseId") });
    slug = String(formData.get("slug") || "");
    await enrollUser(user.id, courseId);
    revalidatePath(`/courses/${slug}`);
    revalidatePath("/dashboard");
  } catch (error) {
    return toFormState(error);
  }

  redirect(slug ? `/courses/${slug}` : "/dashboard");
}

export async function trackProgressAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const user = await requireUser();
    const input = progressSchema.parse({
      lessonId: formData.get("lessonId"),
      watchedSeconds: formData.get("watchedSeconds") ?? undefined,
      completed: formData.get("completed") === "true",
    });

    const result = await trackLessonProgress({
      userId: user.id,
      lessonId: input.lessonId,
      watchedSeconds: input.watchedSeconds,
      completed: input.completed,
    });

    revalidatePath("/dashboard");
    const path = String(formData.get("path") || "");
    if (path.startsWith("/")) revalidatePath(path);

    const parts = [`Progress saved — ${result.progressPercent}% complete.`];
    if (result.awardedPoints) parts.push(`+${result.awardedPoints} points.`);
    if (result.newBadges.length) parts.push(`New badge: ${result.newBadges.join(", ")}.`);
    if (result.certificate) parts.push("Certificate issued 🎓");

    return { ok: true, message: parts.join(" ") };
  } catch (error) {
    return toFormState(error);
  }
}

export async function submitAssignmentAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const user = await requireUser();
    const asDraft = formData.get("intent") === "draft";
    const input = submissionSchema.parse({
      assignmentId: formData.get("assignmentId"),
      textAnswer: formData.get("textAnswer") ?? "",
      linkUrl: formData.get("linkUrl") ?? "",
      fileUrl: formData.get("fileUrl") ?? "",
      asDraft,
    });

    await saveSubmission({
      userId: user.id,
      assignmentId: input.assignmentId,
      textAnswer: input.textAnswer || undefined,
      linkUrl: input.linkUrl || undefined,
      fileUrl: input.fileUrl || undefined,
      asDraft,
    });

    const path = String(formData.get("path") || "");
    if (path.startsWith("/")) revalidatePath(path);
    revalidatePath("/dashboard/assignments");

    return {
      ok: true,
      message: asDraft
        ? "Draft saved. Come back any time before you submit."
        : "Submitted. Your instructor will review it shortly.",
    };
  } catch (error) {
    return toFormState(error);
  }
}

export async function gradeSubmissionAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const grader = await requireRole("INSTRUCTOR", "ADMIN");

    const rubricRaw = formData.get("rubricScores");
    const rubricScores =
      typeof rubricRaw === "string" && rubricRaw
        ? (JSON.parse(rubricRaw) as Record<string, number>)
        : undefined;

    const input = gradeSchema.parse({
      submissionId: formData.get("submissionId"),
      score: formData.get("score"),
      feedback: formData.get("feedback") ?? "",
      rubricScores,
    });

    await gradeSubmission({
      graderId: grader.id,
      graderRole: grader.role,
      submissionId: input.submissionId,
      score: input.score,
      feedback: input.feedback || undefined,
      rubricScores: input.rubricScores,
    });

    revalidatePath("/admin/grading");
    return { ok: true, message: "Grade recorded and the student notified." };
  } catch (error) {
    return toFormState(error);
  }
}

export async function submitQuizAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const user = await requireUser();
    const quizId = String(formData.get("quizId") || "");

    // Answers arrive as answer:<questionId> entries; multi-choice repeats.
    const grouped = new Map<string, string[]>();
    for (const [key, value] of formData.entries()) {
      if (!key.startsWith("answer:")) continue;
      const questionId = key.slice("answer:".length);
      const list = grouped.get(questionId) ?? [];
      list.push(String(value));
      grouped.set(questionId, list);
    }

    const input = quizAttemptSchema.parse({
      quizId,
      answers: [...grouped.entries()].map(([questionId, selectedOptionIds]) => ({
        questionId,
        selectedOptionIds,
      })),
    });

    const result = await submitQuizAttempt({
      userId: user.id,
      quizId: input.quizId,
      answers: input.answers,
    });

    const path = String(formData.get("path") || "");
    if (path.startsWith("/")) revalidatePath(path);
    revalidatePath("/dashboard");

    return {
      ok: true,
      message: result.passed
        ? `Passed with ${result.scorePercent}% (${result.earned}/${result.possible}).`
        : `Scored ${result.scorePercent}%. ${result.attemptsLeft > 0 ? `${result.attemptsLeft} attempt(s) left — review the lesson and try again.` : "No attempts left; reach out to your instructor."}`,
    };
  } catch (error) {
    return toFormState(error);
  }
}

export async function rsvpAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const user = await requireUser();
    const { sessionId } = rsvpSchema.parse({ sessionId: formData.get("sessionId") });
    const result = await toggleRsvp(user.id, sessionId);

    revalidatePath("/dashboard/live");
    revalidatePath("/dashboard");

    return {
      ok: true,
      message: result.rsvped
        ? "You're booked in. See you there."
        : "RSVP cancelled.",
    };
  } catch (error) {
    return toFormState(error);
  }
}

export async function reviewAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const user = await requireUser();
    const input = reviewSchema.parse({
      courseId: formData.get("courseId"),
      rating: formData.get("rating"),
      comment: formData.get("comment") ?? "",
    });

    await upsertReview(user.id, input.courseId, input.rating, input.comment || undefined);

    const path = String(formData.get("path") || "");
    if (path.startsWith("/")) revalidatePath(path);

    return { ok: true, message: "Thanks for the review." };
  } catch (error) {
    return toFormState(error);
  }
}

export async function markNotificationsReadAction() {
  const user = await requireUser();
  await markRead(user.id);
  revalidatePath("/dashboard/notifications");
  revalidatePath("/dashboard");
}
