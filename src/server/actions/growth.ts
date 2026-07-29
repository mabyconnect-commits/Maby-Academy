"use server";

import { revalidatePath } from "next/cache";
import type { GoalHorizon, GrowthArea, JournalKind } from "@prisma/client";
import { requireUser } from "@/lib/auth/session";
import { ServiceError } from "@/server/services/auth";
import {
  archiveHabit,
  createGoal,
  createHabit,
  createJournalEntry,
  deleteJournalEntry,
  setGoalStatus,
  toggleGoalSharing,
  toggleHabit,
  updateGoalProgress,
} from "@/server/services/growth";
import type { FormState } from "./formState";

function toFormState(error: unknown): FormState {
  if (error instanceof ServiceError) return { ok: false, message: error.message };
  if (error instanceof Error && error.name === "AuthError") {
    return { ok: false, message: error.message };
  }
  console.error("[action] growth error:", error);
  return { ok: false, message: "Something went wrong. Please try again." };
}

const GROWTH_PATHS = ["/dashboard/growth", "/dashboard"];
function refresh() {
  for (const path of GROWTH_PATHS) revalidatePath(path);
}

// --- Habits ---------------------------------------------------------------

export async function toggleHabitAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const user = await requireUser();
    const result = await toggleHabit({
      userId: user.id,
      habitId: String(formData.get("habitId") || ""),
    });
    refresh();
    return {
      ok: true,
      message: result.completed
        ? result.streak > 1
          ? `Done — ${result.streak} days running.`
          : "Done."
        : "Unticked.",
    };
  } catch (error) {
    return toFormState(error);
  }
}

export async function createHabitAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const user = await requireUser();
    await createHabit({
      userId: user.id,
      name: String(formData.get("name") || ""),
      area: (String(formData.get("area") || "LEARNING") as GrowthArea),
      iconEmoji: String(formData.get("iconEmoji") || "") || undefined,
    });
    refresh();
    return { ok: true, message: "Habit added." };
  } catch (error) {
    return toFormState(error);
  }
}

export async function archiveHabitAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const user = await requireUser();
    await archiveHabit(user.id, String(formData.get("habitId") || ""));
    refresh();
    return { ok: true, message: "Archived. Your history is kept." };
  } catch (error) {
    return toFormState(error);
  }
}

// --- Goals ----------------------------------------------------------------

export async function createGoalAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const user = await requireUser();
    const target = Number(formData.get("targetValue"));
    const due = String(formData.get("dueAt") || "");

    await createGoal({
      userId: user.id,
      title: String(formData.get("title") || ""),
      description: String(formData.get("description") || "") || undefined,
      area: (String(formData.get("area") || "LEARNING") as GrowthArea),
      horizon: (String(formData.get("horizon") || "MONTHLY") as GoalHorizon),
      targetValue: Number.isFinite(target) && target > 0 ? target : undefined,
      unit: String(formData.get("unit") || "") || undefined,
      dueAt: due ? new Date(due) : undefined,
      sharedWithMentor: formData.get("sharedWithMentor") === "on",
    });
    refresh();
    return { ok: true, message: "Goal set." };
  } catch (error) {
    return toFormState(error);
  }
}

export async function updateGoalProgressAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const user = await requireUser();
    const goal = await updateGoalProgress({
      userId: user.id,
      goalId: String(formData.get("goalId") || ""),
      currentValue: Number(formData.get("currentValue")) || 0,
    });
    refresh();
    return {
      ok: true,
      message:
        goal.status === "ACHIEVED"
          ? "Goal achieved. Well done."
          : "Progress saved.",
    };
  } catch (error) {
    return toFormState(error);
  }
}

export async function setGoalStatusAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const user = await requireUser();
    const status = String(formData.get("status") || "ACTIVE") as
      | "ACTIVE"
      | "ACHIEVED"
      | "MISSED"
      | "ABANDONED";

    await setGoalStatus({
      userId: user.id,
      goalId: String(formData.get("goalId") || ""),
      status,
    });
    refresh();
    return { ok: true, message: "Updated." };
  } catch (error) {
    return toFormState(error);
  }
}

export async function toggleGoalSharingAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const user = await requireUser();
    const goal = await toggleGoalSharing(
      user.id,
      String(formData.get("goalId") || ""),
    );
    refresh();
    return {
      ok: true,
      message: goal.sharedWithMentor
        ? "Your mentor can now see this goal."
        : "Hidden from your mentor again.",
    };
  } catch (error) {
    return toFormState(error);
  }
}

// --- Journal --------------------------------------------------------------

export async function createJournalEntryAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const user = await requireUser();
    const mood = Number(formData.get("mood"));

    await createJournalEntry({
      userId: user.id,
      kind: (String(formData.get("kind") || "REFLECTION") as JournalKind),
      title: String(formData.get("title") || "") || undefined,
      body: String(formData.get("body") || ""),
      mood: Number.isFinite(mood) && mood > 0 ? mood : undefined,
      // Private unless the writer deliberately unticks it.
      isPrivate: formData.get("shareWithMentor") !== "on",
    });
    revalidatePath("/dashboard/journal");
    return { ok: true, message: "Saved. Only you can read this." };
  } catch (error) {
    return toFormState(error);
  }
}

export async function deleteJournalEntryAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const user = await requireUser();
    await deleteJournalEntry(user.id, String(formData.get("entryId") || ""));
    revalidatePath("/dashboard/journal");
    return { ok: true, message: "Deleted." };
  } catch (error) {
    return toFormState(error);
  }
}
