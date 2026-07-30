"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { emptyFormState } from "@/server/actions/formState";
import { setJournalConsentAction } from "@/server/actions/mentorship";

/**
 * Journal consent.
 *
 * Written as an explicit two-state form rather than a switch on purpose. A
 * toggle invites an accidental tap, and the thing being toggled is whether
 * another person can read your private writing — that deserves a labelled
 * button and a sentence saying what will happen.
 */
export function JournalConsentToggle({
  assignmentId,
  mentorName,
  consent,
}: {
  assignmentId: string;
  mentorName: string;
  consent: boolean;
}) {
  const [state, formAction] = useActionState(
    setJournalConsentAction,
    emptyFormState,
  );

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="assignmentId" value={assignmentId} />
      {/* Sends the *desired* state rather than "flip it", so a double submit
          cannot toggle consent back on after it was withdrawn. */}
      <input type="hidden" name="consent" value={consent ? "false" : "true"} />

      {state.message && (
        <Alert tone={state.ok ? "success" : "error"}>{state.message}</Alert>
      )}

      <p className="text-[11.5px] leading-[1.6] font-semibold text-mist-200">
        {consent
          ? `${mentorName} can currently read your journal entries.`
          : `${mentorName} cannot read your journal.`}
      </p>

      <SubmitButton
        variant={consent ? "secondary" : "secondary"}
        size="sm"
        pendingText="Saving…"
      >
        {consent ? "Withdraw journal access" : "Let my mentor read my journal"}
      </SubmitButton>
    </form>
  );
}
