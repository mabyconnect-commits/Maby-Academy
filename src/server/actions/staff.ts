"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { cookies } from "next/headers";
import { ZodError } from "zod";
import { requireUser, SESSION_COOKIE } from "@/lib/auth/session";
import { ServiceError } from "@/server/services/auth";
import {
  approveCourse,
  archiveCourse,
  publishCourse,
  requestChanges,
  submitForReview,
} from "@/server/services/editorial";
import {
  approveClearCommissions,
  approveCommission,
  markCommissionPaid,
  voidCommission,
} from "@/server/services/finance";
import { revokeOtherSessions, revokeSession } from "@/server/services/security";
import { markAttendance } from "@/server/services/liveSessions";
import type { FormState } from "./formState";

function toFormState(error: unknown): FormState {
  if (error instanceof ZodError) {
    return { ok: false, message: error.issues[0]?.message };
  }
  if (error instanceof ServiceError) {
    return { ok: false, message: error.message };
  }
  if (error instanceof Error && error.name === "AuthError") {
    return { ok: false, message: error.message };
  }
  console.error("[action] unhandled error:", error);
  return { ok: false, message: "Something went wrong. Please try again." };
}

/** The actor shape the policy layer expects. */
async function actor() {
  const user = await requireUser();
  return { id: user.id, role: user.role, extraRoles: user.extraRoles };
}

// ---------------------------------------------------------------------------
// Editorial
// ---------------------------------------------------------------------------

export async function submitForReviewAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const courseId = String(formData.get("courseId") || "");
    const notes = String(formData.get("notes") || "") || undefined;
    await submitForReview(await actor(), courseId, notes);
    revalidatePath("/admin/courses");
    revalidatePath("/admin/review");
    return { ok: true, message: "Sent for review." };
  } catch (error) {
    return toFormState(error);
  }
}

export async function approveCourseAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const courseId = String(formData.get("courseId") || "");
    const notes = String(formData.get("notes") || "") || undefined;
    await approveCourse(await actor(), courseId, notes);
    revalidatePath("/admin/review");
    return { ok: true, message: "Approved. The author has been notified." };
  } catch (error) {
    return toFormState(error);
  }
}

export async function requestChangesAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const courseId = String(formData.get("courseId") || "");
    const notes = String(formData.get("notes") || "");
    await requestChanges(await actor(), courseId, notes);
    revalidatePath("/admin/review");
    return { ok: true, message: "Sent back with your notes." };
  } catch (error) {
    return toFormState(error);
  }
}

export async function publishCourseAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await publishCourse(await actor(), String(formData.get("courseId") || ""));
    revalidatePath("/admin/review");
    revalidatePath("/courses");
    return { ok: true, message: "Published and open for enrolment." };
  } catch (error) {
    return toFormState(error);
  }
}

export async function archiveCourseAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await archiveCourse(
      await actor(),
      String(formData.get("courseId") || ""),
      String(formData.get("notes") || "") || undefined,
    );
    revalidatePath("/admin/review");
    revalidatePath("/courses");
    return { ok: true, message: "Archived." };
  } catch (error) {
    return toFormState(error);
  }
}

// ---------------------------------------------------------------------------
// Finance
// ---------------------------------------------------------------------------

export async function approveCommissionAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await approveCommission(
      await actor(),
      String(formData.get("commissionId") || ""),
    );
    revalidatePath("/admin/finance");
    return { ok: true, message: "Commission approved." };
  } catch (error) {
    return toFormState(error);
  }
}

export async function voidCommissionAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await voidCommission(
      await actor(),
      String(formData.get("commissionId") || ""),
      String(formData.get("reason") || ""),
    );
    revalidatePath("/admin/finance");
    return { ok: true, message: "Commission voided." };
  } catch (error) {
    return toFormState(error);
  }
}

export async function markCommissionPaidAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await markCommissionPaid(
      await actor(),
      String(formData.get("commissionId") || ""),
      String(formData.get("reference") || "") || undefined,
    );
    revalidatePath("/admin/finance");
    return { ok: true, message: "Marked as paid." };
  } catch (error) {
    return toFormState(error);
  }
}

export async function approveClearCommissionsAction(
  _prev: FormState,
): Promise<FormState> {
  try {
    const result = await approveClearCommissions(await actor());
    revalidatePath("/admin/finance");
    return {
      ok: true,
      message: `Approved ${result.approved}. ${result.skipped} left flagged for manual review.`,
    };
  } catch (error) {
    return toFormState(error);
  }
}

// ---------------------------------------------------------------------------
// Attendance
// ---------------------------------------------------------------------------

export async function markAttendanceAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    await requireUser();
    const sessionId = String(formData.get("sessionId") || "");
    const userIds = formData.getAll("attendee").map(String).filter(Boolean);

    if (userIds.length === 0) {
      return { ok: false, message: "Select at least one attendee." };
    }

    const result = await markAttendance(sessionId, userIds);
    revalidatePath("/admin/sessions");
    return {
      ok: true,
      message: `Marked ${result.attended} attended and credited their points.`,
    };
  } catch (error) {
    return toFormState(error);
  }
}

// ---------------------------------------------------------------------------
// Security
// ---------------------------------------------------------------------------

export async function revokeSessionAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const user = await requireUser();
    const store = await cookies();
    const token = store.get(SESSION_COOKIE)?.value;

    const result = await revokeSession(
      user.id,
      String(formData.get("sessionId") || ""),
      token,
    );

    // Revoking the session you are using signs you out — clear the cookie so
    // the next request isn't carrying a token the database no longer knows.
    if (result.wasCurrent) store.delete(SESSION_COOKIE);

    revalidatePath("/dashboard/settings");
    return {
      ok: true,
      message: result.wasCurrent
        ? "Signed out on this device."
        : "That device has been signed out.",
    };
  } catch (error) {
    return toFormState(error);
  }
}

export async function revokeOtherSessionsAction(
  _prev: FormState,
): Promise<FormState> {
  try {
    const user = await requireUser();
    const store = await cookies();
    const token = store.get(SESSION_COOKIE)?.value;

    const { count } = await revokeOtherSessions(user.id, token);
    revalidatePath("/dashboard/settings");

    return {
      ok: true,
      message:
        count === 0
          ? "No other devices were signed in."
          : `Signed out ${count} other device${count === 1 ? "" : "s"}.`,
    };
  } catch (error) {
    return toFormState(error);
  }
}

/** Kept so the module has a use for `headers` without an unused import. */
export async function currentRequestIp(): Promise<string | null> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
}
