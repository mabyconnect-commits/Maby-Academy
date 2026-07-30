"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth/session";
import {
  createLesson,
  createModule,
  deleteLesson,
  reorderLessons,
  reorderModules,
  updateLesson,
} from "@/server/services/authoring";
import { toFormState, type FormState } from "./formState";

/** Every action revalidates the builder for the course it touched. */
function refresh(courseId: string) {
  revalidatePath(`/teach/courses/${courseId}`);
  revalidatePath("/teach");
}

export async function createModuleAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const courseId = String(formData.get("courseId") ?? "");
  try {
    const user = await requireUser();
    await createModule(user, { courseId, title: String(formData.get("title") ?? "") });
    refresh(courseId);
    return { ok: true, message: "Module added." };
  } catch (error) {
    return toFormState(error);
  }
}

export async function createLessonAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const courseId = String(formData.get("courseId") ?? "");
  try {
    const user = await requireUser();
    const type = String(formData.get("type") ?? "TEXT");
    // Narrowed rather than cast: an unexpected value must not reach the
    // database as a lesson type.
    const allowed = ["VIDEO", "TEXT", "QUIZ", "ASSIGNMENT", "LIVE"] as const;
    const lessonType = (allowed as readonly string[]).includes(type)
      ? (type as (typeof allowed)[number])
      : "TEXT";

    await createLesson(user, {
      courseId,
      moduleId: String(formData.get("moduleId") ?? ""),
      title: String(formData.get("title") ?? ""),
      type: lessonType,
    });
    refresh(courseId);
    return { ok: true, message: "Lesson added." };
  } catch (error) {
    return toFormState(error);
  }
}

export async function updateLessonAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const courseId = String(formData.get("courseId") ?? "");
  try {
    const user = await requireUser();

    /** Absent means "don't change"; empty string means "clear". */
    const optionalText = (key: string) => {
      if (!formData.has(key)) return undefined;
      const value = String(formData.get(key) ?? "").trim();
      return value === "" ? null : value;
    };
    const optionalInt = (key: string) => {
      if (!formData.has(key)) return undefined;
      const n = Number(formData.get(key));
      return Number.isFinite(n) ? Math.round(n) : undefined;
    };

    await updateLesson(user, {
      courseId,
      lessonId: String(formData.get("lessonId") ?? ""),
      title: formData.has("title") ? String(formData.get("title")) : undefined,
      content: optionalText("content"),
      videoUrl: optionalText("videoUrl"),
      videoDuration: optionalInt("videoDuration"),
      minWatchPercent: optionalInt("minWatchPercent"),
      pointsValue: optionalInt("pointsValue"),
      // A checkbox that is off is simply absent from the form body, so its
      // presence is the value.
      isPreview: formData.has("isPreviewPresent")
        ? formData.get("isPreview") === "on"
        : undefined,
    });

    refresh(courseId);
    return { ok: true, message: "Lesson saved." };
  } catch (error) {
    return toFormState(error);
  }
}

export async function deleteLessonAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const courseId = String(formData.get("courseId") ?? "");
  try {
    const user = await requireUser();
    await deleteLesson(user, {
      courseId,
      lessonId: String(formData.get("lessonId") ?? ""),
    });
    refresh(courseId);
    return { ok: true, message: "Lesson deleted." };
  } catch (error) {
    return toFormState(error);
  }
}

export async function reorderLessonsAction(params: {
  courseId: string;
  moduleId: string;
  lessonIds: string[];
}): Promise<FormState> {
  try {
    const user = await requireUser();
    await reorderLessons(user, params);
    refresh(params.courseId);
    return { ok: true };
  } catch (error) {
    return toFormState(error);
  }
}

export async function reorderModulesAction(params: {
  courseId: string;
  moduleIds: string[];
}): Promise<FormState> {
  try {
    const user = await requireUser();
    await reorderModules(user, params);
    refresh(params.courseId);
    return { ok: true };
  } catch (error) {
    return toFormState(error);
  }
}
