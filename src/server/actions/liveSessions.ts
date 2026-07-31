"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth/session";
import { liveSessionSchema } from "@/lib/validation";
import {
  cancelLiveSession,
  createLiveSession,
} from "@/server/services/liveSessions";
import { toFormState } from "./formState";
import type { FormState } from "./formState";

async function actor() {
  const user = await requireUser();
  return { id: user.id, role: user.role, extraRoles: user.extraRoles };
}

/** Empty form fields arrive as "" — treat those as absent, not as values. */
function opt(formData: FormData, key: string): string | undefined {
  const value = String(formData.get(key) ?? "").trim();
  return value === "" ? undefined : value;
}

export async function scheduleSessionAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const input = liveSessionSchema.parse({
      title: formData.get("title"),
      description: opt(formData, "description"),
      courseId: opt(formData, "courseId"),
      startsAt: opt(formData, "startsAt"),
      endsAt: opt(formData, "endsAt"),
      meetingUrl: opt(formData, "meetingUrl"),
      capacity: opt(formData, "capacity"),
      pointsValue: opt(formData, "pointsValue"),
    });

    await createLiveSession({ actor: await actor(), ...input });

    revalidatePath("/teach/sessions");
    revalidatePath("/dashboard/live");
    revalidatePath("/dashboard");
    return {
      ok: true,
      message: "Session scheduled. Enrolled learners have been notified.",
    };
  } catch (error) {
    return toFormState(error);
  }
}

export async function cancelSessionAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await cancelLiveSession(
      await actor(),
      String(formData.get("sessionId") || ""),
    );
    revalidatePath("/teach/sessions");
    revalidatePath("/dashboard/live");
    return { ok: true, message: "Session cancelled and attendees notified." };
  } catch (error) {
    return toFormState(error);
  }
}
