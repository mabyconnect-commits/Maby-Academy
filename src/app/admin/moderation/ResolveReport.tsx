"use client";

import { useActionState } from "react";
import { Alert, Textarea } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { emptyFormState } from "@/server/actions/formState";
import { resolveReportAction } from "@/server/actions/community";

export function ResolveReport({ reportId }: { reportId: string }) {
  const [state, formAction] = useActionState(
    resolveReportAction,
    emptyFormState,
  );

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="reportId" value={reportId} />

      {state.message && (
        <Alert tone={state.ok ? "success" : "error"}>{state.message}</Alert>
      )}

      <Textarea
        name="resolution"
        rows={3}
        placeholder="Note for the record (optional)"
        aria-label="Resolution note"
      />

      <div className="grid grid-cols-2 gap-2">
        <SubmitButton
          name="action"
          value="REMOVE"
          variant="danger"
          size="sm"
          className="w-full"
          pendingText="Removing…"
        >
          Remove
        </SubmitButton>
        <SubmitButton
          name="action"
          value="DISMISS"
          variant="secondary"
          size="sm"
          className="w-full"
          pendingText="Dismissing…"
        >
          Dismiss
        </SubmitButton>
      </div>

      <p className="text-xs text-mist-400 leading-relaxed">
        Dismissing restores full visibility — the flag was provisional.
        Removing hides it from everyone.
      </p>
    </form>
  );
}
