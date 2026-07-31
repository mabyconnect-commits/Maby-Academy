"use client";

import { useActionState, useState } from "react";
import { Alert, Input, Pill } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { emptyFormState } from "@/server/actions/formState";
import {
  markSeasonResultPaidAction,
  reviewSeasonResultAction,
} from "@/server/actions/seasons";
import { formatMoney } from "@/lib/utils";

type Result = {
  id: string;
  rank: number;
  name: string;
  email: string;
  qualifyingPoints: number;
  activeDays: number;
  prizeMinor: number;
  currency: string;
  status: string;
  withheldReason: string | null;
  flags: string[];
  reviewedBy: string | null;
  payoutRef: string | null;
};

const STATUS_TONES: Record<string, "neutral" | "growth" | "flag" | "gold"> = {
  PENDING_REVIEW: "gold",
  APPROVED: "growth",
  WITHHELD: "flag",
  PAID: "neutral",
};

export function ResultRow({
  result,
  cashEnabled,
  canPay,
}: {
  result: Result;
  cashEnabled: boolean;
  canPay: boolean;
}) {
  const [reviewState, reviewAction] = useActionState(
    reviewSeasonResultAction,
    emptyFormState,
  );
  const [payState, payAction] = useActionState(
    markSeasonResultPaidAction,
    emptyFormState,
  );
  // Withholding needs a reason, so the field appears before the button rather
  // than the action failing after the click.
  const [withholding, setWithholding] = useState(false);
  const [reason, setReason] = useState("");

  const message = reviewState.message ?? payState.message;
  const ok = reviewState.message ? reviewState.ok : payState.ok;

  return (
    <div className="px-4 py-3.5 sm:px-[22px]">
      <div className="flex items-start gap-3">
        <span className="w-7 shrink-0 pt-0.5 text-[12px] font-bold text-mist-400 tabular-nums">
          {result.rank}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="truncate text-[12.5px] font-bold text-mist-100">
              {result.name}
            </span>
            <Pill tone={STATUS_TONES[result.status] ?? "neutral"}>
              {result.status.replace("_", " ").toLowerCase()}
            </Pill>
          </div>
          <p className="mt-1 truncate text-[10.5px] text-mist-400">
            {result.email} · {result.qualifyingPoints.toLocaleString()} pts over{" "}
            {result.activeDays} days
          </p>

          {result.flags.length > 0 && (
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {result.flags.map((f) => (
                <li key={f}>
                  <Pill tone="ember">{f}</Pill>
                </li>
              ))}
            </ul>
          )}

          {result.withheldReason && (
            <p className="mt-2 text-[10.5px] leading-[1.5] text-flag-400">
              Withheld: {result.withheldReason}
            </p>
          )}
          {result.payoutRef && (
            <p className="mt-2 text-[10.5px] text-mist-400">
              Paid · ref {result.payoutRef}
            </p>
          )}
          {result.reviewedBy && !result.payoutRef && (
            <p className="mt-2 text-[10.5px] text-mist-400">
              Reviewed by {result.reviewedBy}
            </p>
          )}
        </div>

        {cashEnabled && result.prizeMinor > 0 && (
          <span className="shrink-0 text-[12.5px] font-bold text-growth-500 tabular-nums">
            {formatMoney(result.prizeMinor, result.currency)}
          </span>
        )}
      </div>

      {message && (
        <div className="mt-3">
          <Alert tone={ok ? "success" : "error"}>{message}</Alert>
        </div>
      )}

      {/* Review ---------------------------------------------------------- */}
      {result.status === "PENDING_REVIEW" && (
        <div className="mt-3 flex flex-wrap items-start gap-2.5">
          <form action={reviewAction}>
            <input type="hidden" name="resultId" value={result.id} />
            <input type="hidden" name="decision" value="APPROVED" />
            <SubmitButton size="sm" pendingText="Approving…">
              Approve
            </SubmitButton>
          </form>

          {withholding ? (
            <form action={reviewAction} className="flex flex-wrap gap-2">
              <input type="hidden" name="resultId" value={result.id} />
              <input type="hidden" name="decision" value="WITHHELD" />
              <Input
                name="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Why is this withheld?"
                aria-label="Reason for withholding"
                className="min-w-[220px]"
              />
              <SubmitButton
                size="sm"
                variant="secondary"
                pendingText="Withholding…"
                disabled={reason.trim().length === 0}
              >
                Confirm withhold
              </SubmitButton>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setWithholding(true)}
              className="rounded px-2 py-2 text-xs text-mist-400 hover:text-flag-400"
            >
              Withhold
            </button>
          )}
        </div>
      )}

      {/* Payment --------------------------------------------------------- */}
      {result.status === "APPROVED" && result.prizeMinor > 0 && (
        <div className="mt-3">
          {!cashEnabled ? (
            <p className="text-[11px] text-mist-400">
              Approved. It can be paid once cash rewards are switched on.
            </p>
          ) : !canPay ? (
            // Deliberately separate from approval: the person who approves a
            // prize is not the person who records paying it.
            <p className="text-[11px] text-mist-400">
              Approved. Someone with payout access records the payment.
            </p>
          ) : (
            <form action={payAction} className="flex flex-wrap gap-2">
              <input type="hidden" name="resultId" value={result.id} />
              <Input
                name="payoutRef"
                placeholder="Transfer reference"
                aria-label="Payment reference"
                className="min-w-[200px]"
                required
              />
              <SubmitButton size="sm" pendingText="Recording…">
                Mark paid
              </SubmitButton>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
