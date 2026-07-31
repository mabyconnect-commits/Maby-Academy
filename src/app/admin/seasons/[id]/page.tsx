import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/session";
import { guardPermission } from "@/lib/auth/guard";
import { getSeasonAdminView } from "@/server/services/seasons";
import { isFeatureEnabled } from "@/server/services/features";
import { actorCan } from "@/server/services/policy";
import { ServiceError } from "@/lib/errors";
import {
  Alert,
  Card,
  EmptyState,
  PanelHead,
  Pill,
  StatTile,
} from "@/components/ui";
import { formatDate, formatMoney } from "@/lib/utils";
import { SeasonStatusForm } from "./SeasonStatusForm";
import { ResultRow } from "./ResultRow";

export const metadata: Metadata = {
  title: "Season",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

const FLAG_LABELS: Record<string, string> = {
  "few-active-days": "Earned across very few days",
  "far-above-median": "Far above the middle of the board",
};

export default async function SeasonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const actor = await guardPermission("settings:manage", "Seasons");
  const { id } = await params;

  let view;
  try {
    view = await getSeasonAdminView(actor, id);
  } catch (error) {
    if (error instanceof ServiceError && error.status === 404) notFound();
    throw error;
  }

  const { season, results, live, counts, money } = view;
  const cashEnabled = await isFeatureEnabled("token_rewards");
  // Rendered from the same capability the service enforces, so the button is
  // absent for an admin who would only be refused if they pressed it.
  const canPay = actorCan(actor, "payout:execute");

  return (
    <div className="flex flex-col gap-5">
      <nav className="text-sm text-mist-400" aria-label="Breadcrumb">
        <Link href="/admin/seasons" className="hover:text-mist-200">
          ← Seasons
        </Link>
      </nav>

      <header className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Pill tone="neutral">{season.status.toLowerCase()}</Pill>
          {season.lockedAt && (
            <Pill tone="gold">Frozen {formatDate(season.lockedAt)}</Pill>
          )}
        </div>
        <h1 className="mt-2.5 text-2xl font-semibold tracking-tight">
          {season.name}
        </h1>
        <p className="mt-1.5 text-sm text-mist-400">
          {formatDate(season.startsAt)} – {formatDate(season.endsAt)} · needs{" "}
          {season.minQualifyingPoints} points across {season.minActiveDays} days
        </p>
      </header>

      {!cashEnabled && season.prizePoolMinor > 0 && (
        <Alert tone="info">
          Cash rewards are off, so members do not see prize amounts and nothing
          can be marked paid. Reviewing still works — turn the flag on when the
          legal position is settled and the approvals are already done.
        </Alert>
      )}

      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
        <StatTile label="Awaiting review" value={counts.pending} tone={counts.pending > 0 ? "ember" : undefined} />
        <StatTile label="Approved" value={counts.approved} tone="growth" />
        <StatTile label="Flagged" value={counts.flagged} tone={counts.flagged > 0 ? "ember" : undefined} />
        <StatTile
          label="Owed"
          value={cashEnabled ? formatMoney(money.owed, season.currency) : "—"}
          tone="gold"
          hint={money.paid > 0 ? `${formatMoney(money.paid, season.currency)} paid` : undefined}
        />
      </div>

      <Card pad="wide">
        <PanelHead title="Status" className="mb-3" />
        <SeasonStatusForm
          seasonId={season.id}
          status={season.status}
          endsAt={season.endsAt.toISOString()}
          pendingReview={counts.pending}
        />
      </Card>

      {/* Live board while open ------------------------------------------ */}
      {live && (
        <Card pad="none" className="overflow-hidden">
          <div className="border-b border-rule px-4 py-3.5 sm:px-[22px]">
            <p className="eyebrow">Live standings</p>
            <p className="mt-1 text-[10.5px] text-mist-400">
              Recomputed on every read. Nothing here is final until the season
              is locked.
            </p>
          </div>
          {live.rows.length === 0 ? (
            <p className="p-4 text-xs text-mist-400 sm:p-[22px]">
              Nobody qualifies yet.
            </p>
          ) : (
            <div className="divide-y divide-rule">
              {live.rows.map((row) => (
                <div
                  key={row.userId}
                  className="flex items-center gap-3 px-4 py-3 sm:px-[22px]"
                >
                  <span className="w-7 shrink-0 text-[12px] font-bold text-mist-400 tabular-nums">
                    {row.rank ?? "—"}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12.5px] font-semibold text-mist-100">
                      {row.name}
                    </span>
                    <span className="mt-0.5 block text-[10.5px] text-mist-400">
                      {row.activeDays} active days
                      {!row.eligible && " · below the floor"}
                    </span>
                  </span>
                  {cashEnabled && row.prizeMinor > 0 && (
                    <span className="shrink-0 text-[11px] font-bold text-growth-500 tabular-nums">
                      {formatMoney(row.prizeMinor, season.currency)}
                    </span>
                  )}
                  <span className="shrink-0 text-[12.5px] font-bold text-gold-500 tabular-nums">
                    {row.qualifyingPoints.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* Frozen results ------------------------------------------------- */}
      {results.length > 0 ? (
        <Card pad="none" className="overflow-hidden">
          <div className="border-b border-rule px-4 py-3.5 sm:px-[22px]">
            <p className="eyebrow">Frozen results</p>
            <p className="mt-1 text-[10.5px] leading-[1.5] text-mist-400">
              A flag is a prompt to look, never a verdict. Withholding requires
              a reason, which the member can be shown.
            </p>
          </div>
          <div className="divide-y divide-rule">
            {results.map((r) => (
              <ResultRow
                key={r.id}
                result={{
                  id: r.id,
                  rank: r.rank,
                  name: r.user.name,
                  email: r.user.email,
                  qualifyingPoints: r.qualifyingPoints,
                  activeDays: r.activeDays,
                  prizeMinor: r.prizeMinor,
                  currency: r.currency,
                  status: r.status,
                  withheldReason: r.withheldReason,
                  flags: r.flags.map((f) => FLAG_LABELS[f] ?? f),
                  reviewedBy: r.reviewedBy?.name ?? null,
                  payoutRef: r.payoutRef,
                }}
                cashEnabled={cashEnabled}
                canPay={canPay}
              />
            ))}
          </div>
        </Card>
      ) : (
        season.status !== "OPEN" &&
        season.status !== "DRAFT" && (
          <EmptyState
            icon="trophy"
            title="No frozen results"
            description="Nobody met the floors for this season, so there is nothing to review or pay."
          />
        )
      )}
    </div>
  );
}
