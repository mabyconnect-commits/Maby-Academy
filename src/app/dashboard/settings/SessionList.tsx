"use client";

import { useActionState } from "react";
import { Alert, Pill } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { emptyFormState } from "@/server/actions/formState";
import {
  revokeOtherSessionsAction,
  revokeSessionAction,
} from "@/server/actions/staff";
import { formatDate } from "@/lib/utils";

type SessionRow = {
  id: string;
  device: string;
  ipAddress: string | null;
  createdAt: Date;
  lastActivityAt: Date;
  isCurrent: boolean;
  isExpired: boolean;
};

export function SessionList({ sessions }: { sessions: SessionRow[] }) {
  const [revokeState, revoke] = useActionState(
    revokeSessionAction,
    emptyFormState,
  );
  const [othersState, revokeOthers] = useActionState(
    revokeOtherSessionsAction,
    emptyFormState,
  );

  const others = sessions.filter((s) => !s.isCurrent && !s.isExpired);
  const message = revokeState.message ?? othersState.message;
  const ok = revokeState.ok || othersState.ok;

  return (
    <div className="space-y-4">
      {message && <Alert tone={ok ? "success" : "error"}>{message}</Alert>}

      <ul className="space-y-2.5">
        {sessions.map((s) => (
          <li
            key={s.id}
            className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-800 pb-3 last:border-0 last:pb-0"
          >
            <div className="min-w-0">
              <p className="text-sm text-mist-200 flex items-center gap-2 flex-wrap">
                {s.device}
                {s.isCurrent && <Pill tone="growth">This device</Pill>}
                {s.isExpired && <Pill tone="neutral">Expired</Pill>}
              </p>
              <p className="text-xs text-mist-400 mt-0.5">
                {s.ipAddress ?? "unknown IP"} · last active{" "}
                {formatDate(s.lastActivityAt, true)}
              </p>
            </div>

            <form action={revoke}>
              <input type="hidden" name="sessionId" value={s.id} />
              <SubmitButton
                variant={s.isCurrent ? "secondary" : "ghost"}
                size="sm"
                pendingText="Signing out…"
              >
                {s.isCurrent ? "Sign out here" : "Sign out"}
              </SubmitButton>
            </form>
          </li>
        ))}
      </ul>

      {others.length > 0 && (
        <form action={revokeOthers} className="pt-3 border-t border-ink-700">
          <SubmitButton variant="danger" size="sm" pendingText="Signing out…">
            Sign out {others.length} other device
            {others.length === 1 ? "" : "s"}
          </SubmitButton>
          <p className="mt-2 text-xs text-mist-400">
            Use this if you see a device you don&apos;t recognise. You stay
            signed in here.
          </p>
        </form>
      )}
    </div>
  );
}
