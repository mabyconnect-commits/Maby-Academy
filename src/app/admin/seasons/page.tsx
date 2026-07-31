import Link from "next/link";
import type { Metadata } from "next";
import { guardPermission } from "@/lib/auth/guard";
import { listSeasons } from "@/server/services/seasons";
import { isFeatureEnabled } from "@/server/services/features";
import { Alert, Card, EmptyState, PanelHead, Pill } from "@/components/ui";
import { formatDate, formatMoney } from "@/lib/utils";
import { NewSeasonForm } from "./NewSeasonForm";

export const metadata: Metadata = {
  title: "Seasons",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

const STATUS_TONES = {
  DRAFT: "neutral",
  OPEN: "growth",
  LOCKED: "gold",
  SETTLED: "info",
  CANCELLED: "flag",
} as const;

export default async function AdminSeasonsPage() {
  await guardPermission("settings:manage", "Seasons");
  const [seasons, cashEnabled] = await Promise.all([
    listSeasons(),
    isFeatureEnabled("token_rewards"),
  ]);

  return (
    <div className="flex flex-col gap-5">
      {/* The flag governs money, not the competition. Saying so here stops an
          operator concluding the whole feature is broken. */}
      {!cashEnabled && (
        <Alert tone="info">
          Cash rewards are switched off, so prize amounts are hidden from
          members and no result can be marked paid. The leaderboard itself
          still runs. Turn on the <code>token_rewards</code> flag once the
          legal position in every operating region has been reviewed.
        </Alert>
      )}

      <Card pad="wide">
        <PanelHead title="How a season runs" className="mb-2" />
        <ol className="space-y-1.5 text-[11.5px] leading-[1.6] text-mist-400">
          <li>
            <strong className="text-mist-200">Draft</strong> — set the dates,
            the floors and the prize bands. Members cannot see it.
          </li>
          <li>
            <strong className="text-mist-200">Open</strong> — the board is live
            and recomputed from the points ledger on every read.
          </li>
          <li>
            <strong className="text-mist-200">Locked</strong> — the window has
            passed and you freeze the standings. Later activity can no longer
            change a settled result.
          </li>
          <li>
            <strong className="text-mist-200">Review</strong> — every frozen
            result is approved or withheld by a person. Nothing pays
            automatically, and flagged rows are a prompt to look rather than a
            verdict.
          </li>
          <li>
            <strong className="text-mist-200">Settled</strong> — payments
            recorded against their references.
          </li>
        </ol>
      </Card>

      {seasons.length === 0 ? (
        <EmptyState
          icon="trophy"
          title="No seasons yet"
          description="Create one below. A season scores only the points earned inside its own window, so the same members do not win every week."
        />
      ) : (
        <Card pad="none" className="overflow-hidden">
          <div className="border-b border-rule px-4 py-3.5 sm:px-[22px]">
            <p className="eyebrow">Seasons</p>
          </div>
          <div className="divide-y divide-rule">
            {seasons.map((s) => (
              <Link
                key={s.id}
                href={`/admin/seasons/${s.id}`}
                className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-gold-500/6 sm:px-[22px]"
              >
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="truncate text-[13px] font-bold text-mist-100">
                      {s.name}
                    </span>
                    <Pill tone={STATUS_TONES[s.status]}>
                      {s.status.toLowerCase()}
                    </Pill>
                  </span>
                  <span className="mt-1 block text-[10.5px] text-mist-400">
                    {formatDate(s.startsAt)} – {formatDate(s.endsAt)}
                    {s._count.results > 0 &&
                      ` · ${s._count.results} frozen result${s._count.results === 1 ? "" : "s"}`}
                  </span>
                </span>
                {cashEnabled && s.prizePoolMinor > 0 && (
                  <span className="shrink-0 text-[12px] font-bold text-growth-500 tabular-nums">
                    {formatMoney(s.prizePoolMinor, s.currency)}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </Card>
      )}

      <Card pad="wide">
        <PanelHead title="New season" className="mb-3" />
        <NewSeasonForm />
      </Card>
    </div>
  );
}
