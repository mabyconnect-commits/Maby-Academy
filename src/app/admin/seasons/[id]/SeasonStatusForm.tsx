"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { emptyFormState } from "@/server/actions/formState";
import {
  lockSeasonAction,
  setSeasonStatusAction,
} from "@/server/actions/seasons";

export function SeasonStatusForm({
  seasonId,
  status,
  endsAt,
  pendingReview,
}: {
  seasonId: string;
  status: string;
  endsAt: string;
  pendingReview: number;
}) {
  const [statusState, statusAction] = useActionState(
    setSeasonStatusAction,
    emptyFormState,
  );
  const [lockState, lockAction] = useActionState(
    lockSeasonAction,
    emptyFormState,
  );

  const hasEnded = new Date(endsAt) <= new Date();
  const message = statusState.message ?? lockState.message;
  const ok = statusState.message ? statusState.ok : lockState.ok;

  return (
    <div className="space-y-3.5">
      {message && <Alert tone={ok ? "success" : "error"}>{message}</Alert>}

      {status === "DRAFT" && (
        <form action={statusAction} className="flex flex-wrap gap-2.5">
          <input type="hidden" name="seasonId" value={seasonId} />
          <input type="hidden" name="status" value="OPEN" />
          <SubmitButton pendingText="Opening…">Open to members</SubmitButton>
        </form>
      )}

      {status === "OPEN" && (
        <>
          <form action={lockAction} className="flex flex-wrap gap-2.5">
            <input type="hidden" name="seasonId" value={seasonId} />
            {/* The service refuses an early lock too — this only saves the
                operator a round trip to be told so. */}
            <SubmitButton pendingText="Freezing…" disabled={!hasEnded}>
              Lock and freeze standings
            </SubmitButton>
          </form>
          {!hasEnded && (
            <p className="text-[11px] text-mist-400">
              The window has not closed yet. Freezing now would settle results
              while members are still working.
            </p>
          )}
        </>
      )}

      {status === "LOCKED" && (
        <>
          <form action={statusAction} className="flex flex-wrap gap-2.5">
            <input type="hidden" name="seasonId" value={seasonId} />
            <input type="hidden" name="status" value="SETTLED" />
            <SubmitButton
              variant="secondary"
              pendingText="Settling…"
              disabled={pendingReview > 0}
            >
              Mark season settled
            </SubmitButton>
          </form>
          {pendingReview > 0 && (
            <p className="text-[11px] text-mist-400">
              {pendingReview} result{pendingReview === 1 ? " is" : "s are"} still
              awaiting review. Settle only once every one has been decided.
            </p>
          )}
        </>
      )}

      {(status === "DRAFT" || status === "OPEN") && (
        <form action={statusAction} className="flex flex-wrap gap-2.5">
          <input type="hidden" name="seasonId" value={seasonId} />
          <input type="hidden" name="status" value="CANCELLED" />
          <SubmitButton variant="ghost" pendingText="Cancelling…">
            Cancel season
          </SubmitButton>
        </form>
      )}
    </div>
  );
}
