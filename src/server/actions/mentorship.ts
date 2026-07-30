"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth/session";
import { setJournalConsent } from "@/server/services/mentorship";
import { audit } from "@/server/services/notifications";
import { toFormState, type FormState } from "./formState";

export async function setJournalConsentAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const user = await requireUser();
    const consent = formData.get("consent") === "true";

    const result = await setJournalConsent({
      menteeId: user.id,
      assignmentId: String(formData.get("assignmentId") ?? ""),
      consent,
    });

    // Consent changes are audited so there is a record of when access was
    // granted and withdrawn — the member's evidence, not the academy's.
    await audit({
      userId: user.id,
      action: consent ? "mentorship.journal_consent_granted" : "mentorship.journal_consent_withdrawn",
      entityType: "MentorAssignment",
      entityId: result.id,
    });

    revalidatePath("/dashboard/mentorship");
    return {
      ok: true,
      message: consent
        ? "Your mentor can now read your journal. You can withdraw this at any time."
        : "Journal access withdrawn. Your mentor can no longer read your entries.",
    };
  } catch (error) {
    return toFormState(error);
  }
}
