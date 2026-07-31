"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth/session";
import { lessonAnswerSchema, lessonQuestionSchema } from "@/lib/validation";
import {
  answerLessonQuestion,
  askLessonQuestion,
  deleteOwnAnswer,
  deleteOwnQuestion,
  toggleAcceptedAnswer,
  toggleQuestionResolved,
} from "@/server/services/lessonQuestions";
import { toFormState } from "./formState";
import type { FormState } from "./formState";

async function actor() {
  const user = await requireUser();
  return { id: user.id, role: user.role, extraRoles: user.extraRoles };
}

/** Revalidate the lesson page the form was submitted from. */
function revalidateLesson(formData: FormData) {
  const path = String(formData.get("path") || "");
  if (path.startsWith("/")) revalidatePath(path);
}

export async function askQuestionAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const input = lessonQuestionSchema.parse({
      lessonId: formData.get("lessonId"),
      body: formData.get("body") ?? "",
    });

    await askLessonQuestion({
      actor: await actor(),
      lessonId: input.lessonId,
      body: input.body,
    });

    revalidateLesson(formData);
    return { ok: true, message: "Question posted. You'll be notified of answers." };
  } catch (error) {
    return toFormState(error);
  }
}

export async function answerQuestionAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const input = lessonAnswerSchema.parse({
      questionId: formData.get("questionId"),
      body: formData.get("body") ?? "",
    });

    await answerLessonQuestion({
      actor: await actor(),
      questionId: input.questionId,
      body: input.body,
    });

    revalidateLesson(formData);
    return { ok: true, message: "Answer posted." };
  } catch (error) {
    return toFormState(error);
  }
}

export async function acceptAnswerAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const result = await toggleAcceptedAnswer(
      await actor(),
      String(formData.get("answerId") || ""),
    );
    revalidateLesson(formData);
    return {
      ok: true,
      message: result.accepted ? "Marked as the answer." : "Answer unmarked.",
    };
  } catch (error) {
    return toFormState(error);
  }
}

export async function resolveQuestionAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const result = await toggleQuestionResolved(
      await actor(),
      String(formData.get("questionId") || ""),
    );
    revalidateLesson(formData);
    return {
      ok: true,
      message: result.resolved ? "Marked resolved." : "Reopened.",
    };
  } catch (error) {
    return toFormState(error);
  }
}

export async function deleteQuestionAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await deleteOwnQuestion(await actor(), String(formData.get("questionId") || ""));
    revalidateLesson(formData);
    return { ok: true, message: "Question removed." };
  } catch (error) {
    return toFormState(error);
  }
}

export async function deleteAnswerAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await deleteOwnAnswer(await actor(), String(formData.get("answerId") || ""));
    revalidateLesson(formData);
    return { ok: true, message: "Answer removed." };
  } catch (error) {
    return toFormState(error);
  }
}
