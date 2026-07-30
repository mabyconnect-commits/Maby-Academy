"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { emptyFormState } from "@/server/actions/formState";
import { setFeatureFlagAction } from "@/server/actions/admin";

export function FlagToggle({
  flagKey,
  isEnabled,
  description,
}: {
  flagKey: string;
  isEnabled: boolean;
  description: string | null;
}) {
  const [state, formAction] = useActionState(setFeatureFlagAction, emptyFormState);

  return (
    <form action={formAction} className="surface-inset p-4">
      <input type="hidden" name="key" value={flagKey} />
      {/* Sends the target state, not "toggle" — a double submit cannot flip a
          flag back on after it was deliberately turned off. */}
      <input type="hidden" name="enabled" value={isEnabled ? "false" : "true"} />

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-[11.5px] font-bold text-mist-100">
            {flagKey}
          </p>
          {description && (
            <p className="mt-1.5 text-[11px] leading-[1.55] text-mist-400">
              {description}
            </p>
          )}
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.08em] uppercase ${
            isEnabled
              ? "bg-growth-500/12 text-growth-500"
              : "bg-ink-800 text-mist-400"
          }`}
        >
          {isEnabled ? "On" : "Off"}
        </span>
      </div>

      {state.message && (
        <div className="mt-3">
          <Alert tone={state.ok ? "success" : "error"}>{state.message}</Alert>
        </div>
      )}

      <div className="mt-3.5">
        <SubmitButton
          variant={isEnabled ? "danger" : "primary"}
          size="sm"
          pendingText="Saving…"
        >
          {isEnabled ? "Turn off" : "Turn on"}
        </SubmitButton>
      </div>
    </form>
  );
}
