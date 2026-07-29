"use client";

import { useActionState, useState } from "react";
import { Alert, Button, Input } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { emptyFormState } from "@/server/actions/formState";
import {
  approveClearCommissionsAction,
  approveCommissionAction,
  markCommissionPaidAction,
  voidCommissionAction,
} from "@/server/actions/staff";

export function CommissionActions({
  commissionId,
  status,
  canPayout,
  flagged,
}: {
  commissionId: string;
  status: "PENDING" | "APPROVED";
  canPayout: boolean;
  flagged: boolean;
}) {
  const [approveState, approve] = useActionState(
    approveCommissionAction,
    emptyFormState,
  );
  const [voidState, voidIt] = useActionState(
    voidCommissionAction,
    emptyFormState,
  );
  const [paidState, markPaid] = useActionState(
    markCommissionPaidAction,
    emptyFormState,
  );

  const [voiding, setVoiding] = useState(false);
  const message = approveState.message ?? voidState.message ?? paidState.message;
  const ok = approveState.ok || voidState.ok || paidState.ok;

  if (voiding) {
    return (
      <form action={voidIt} className="w-full max-w-xs space-y-2">
        <input type="hidden" name="commissionId" value={commissionId} />
        <Input
          name="reason"
          required
          placeholder="Reason for voiding"
          aria-label="Reason for voiding"
        />
        <div className="flex gap-2">
          <SubmitButton variant="danger" size="sm" pendingText="Voiding…">
            Confirm void
          </SubmitButton>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setVoiding(false)}
          >
            Cancel
          </Button>
        </div>
        {voidState.message && !voidState.ok && (
          <p className="text-xs text-flag-400" role="alert">
            {voidState.message}
          </p>
        )}
      </form>
    );
  }

  return (
    <div className="space-y-2">
      {message && (
        <p
          className={`text-xs ${ok ? "text-growth-400" : "text-flag-400"}`}
          role={ok ? "status" : "alert"}
        >
          {message}
        </p>
      )}

      <div className="flex flex-wrap gap-2 justify-end">
        {status === "PENDING" && (
          <form action={approve}>
            <input type="hidden" name="commissionId" value={commissionId} />
            <SubmitButton
              size="sm"
              variant={flagged ? "secondary" : "growth"}
              pendingText="Approving…"
            >
              {flagged ? "Approve anyway" : "Approve"}
            </SubmitButton>
          </form>
        )}

        {status === "APPROVED" && canPayout && (
          <form action={markPaid}>
            <input type="hidden" name="commissionId" value={commissionId} />
            <SubmitButton size="sm" variant="growth" pendingText="Recording…">
              Mark paid
            </SubmitButton>
          </form>
        )}

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setVoiding(true)}
        >
          Void
        </Button>
      </div>
    </div>
  );
}

export function BulkApprove({ count }: { count: number }) {
  const [state, run] = useActionState(
    approveClearCommissionsAction,
    emptyFormState,
  );

  return (
    <form action={run} className="text-right">
      <SubmitButton size="sm" pendingText="Approving…">
        Approve {count} unflagged
      </SubmitButton>
      {state.message && (
        <div className="mt-2 max-w-xs">
          <Alert tone={state.ok ? "success" : "error"}>{state.message}</Alert>
        </div>
      )}
    </form>
  );
}
