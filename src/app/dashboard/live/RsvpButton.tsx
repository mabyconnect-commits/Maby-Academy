"use client";

import { useActionState } from "react";
import { SubmitButton } from "@/components/SubmitButton";
import { emptyFormState } from "@/server/actions/formState";
import { rsvpAction } from "@/server/actions/learning";

export function RsvpButton({
  sessionId,
  going,
  disabled,
}: {
  sessionId: string;
  going: boolean;
  disabled?: boolean;
}) {
  const [state, formAction] = useActionState(rsvpAction, emptyFormState);

  if (disabled && !going) {
    return (
      <span className="text-xs text-mist-400 px-4 py-2.5 text-center">
        Fully booked
      </span>
    );
  }

  return (
    <form action={formAction} className="space-y-1.5">
      <input type="hidden" name="sessionId" value={sessionId} />
      <SubmitButton
        variant={going ? "secondary" : "primary"}
        pendingText="Saving…"
      >
        {going ? "Cancel RSVP" : "RSVP"}
      </SubmitButton>
      {state.message && !state.ok && (
        <p className="text-xs text-flag-400" role="alert">
          {state.message}
        </p>
      )}
    </form>
  );
}
