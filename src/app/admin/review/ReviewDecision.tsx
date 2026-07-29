"use client";

import { useActionState, useState } from "react";
import { Alert, Textarea } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { emptyFormState } from "@/server/actions/formState";
import {
  approveCourseAction,
  publishCourseAction,
  requestChangesAction,
} from "@/server/actions/staff";

export function ReviewDecision({
  courseId,
  canPublish,
}: {
  courseId: string;
  canPublish: boolean;
}) {
  const [approveState, approve] = useActionState(
    approveCourseAction,
    emptyFormState,
  );
  const [changesState, requestChanges] = useActionState(
    requestChangesAction,
    emptyFormState,
  );
  const [publishState, publish] = useActionState(
    publishCourseAction,
    emptyFormState,
  );

  const [mode, setMode] = useState<"approve" | "changes">("approve");

  const message =
    approveState.message ?? changesState.message ?? publishState.message;
  const ok = approveState.ok || changesState.ok || publishState.ok;

  return (
    <div className="space-y-3">
      {message && <Alert tone={ok ? "success" : "error"}>{message}</Alert>}

      <div
        className="flex rounded-lg border border-ink-600 overflow-hidden"
        role="tablist"
        aria-label="Review decision"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === "approve"}
          onClick={() => setMode("approve")}
          className={`flex-1 px-3 py-2 text-sm transition-colors ${
            mode === "approve"
              ? "bg-growth-500 text-ink-950 font-medium"
              : "bg-ink-850 text-mist-300 hover:bg-ink-800"
          }`}
        >
          Approve
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "changes"}
          onClick={() => setMode("changes")}
          className={`flex-1 px-3 py-2 text-sm transition-colors ${
            mode === "changes"
              ? "bg-flag-500 text-white font-medium"
              : "bg-ink-850 text-mist-300 hover:bg-ink-800"
          }`}
        >
          Request changes
        </button>
      </div>

      {mode === "approve" ? (
        <form action={approve} className="space-y-2.5">
          <input type="hidden" name="courseId" value={courseId} />
          <Textarea
            name="notes"
            rows={3}
            placeholder="Optional note to the author."
            aria-label="Approval note"
          />
          <SubmitButton variant="growth" className="w-full" pendingText="Approving…">
            Approve content
          </SubmitButton>
        </form>
      ) : (
        <form action={requestChanges} className="space-y-2.5">
          <input type="hidden" name="courseId" value={courseId} />
          <Textarea
            name="notes"
            rows={4}
            required
            placeholder="What specifically needs to change? A rejection without reasons cannot be acted on."
            aria-label="Requested changes"
          />
          <SubmitButton variant="danger" className="w-full" pendingText="Sending…">
            Send back to author
          </SubmitButton>
        </form>
      )}

      {canPublish && (
        <form action={publish} className="pt-2 border-t border-ink-700">
          <input type="hidden" name="courseId" value={courseId} />
          <SubmitButton
            variant="secondary"
            className="w-full"
            pendingText="Publishing…"
          >
            Approve and publish now
          </SubmitButton>
          <p className="mt-1.5 text-xs text-mist-400">
            Only works once the course is approved.
          </p>
        </form>
      )}
    </div>
  );
}
