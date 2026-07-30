"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth/session";
import {
  enrolInFreePathCourses,
  saveOnboarding,
  skipOnboarding,
  type OnboardingAnswers,
} from "@/server/services/onboarding";

/**
 * Saves the questionnaire and enrols the member in the free courses on their
 * path, so the dashboard they land on has something on it. Without that step
 * a member finishes onboarding and arrives at an empty "My courses".
 */
export async function completeOnboardingAction(answers: OnboardingAnswers) {
  const user = await requireUser();
  await saveOnboarding(user.id, answers);
  await enrolInFreePathCourses(user.id);
  revalidatePath("/dashboard");
}

export async function skipOnboardingAction() {
  const user = await requireUser();
  await skipOnboarding(user.id);
  revalidatePath("/dashboard");
}
