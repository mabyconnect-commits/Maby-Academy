import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/session";
import { listTradeNotes } from "@/server/services/growth";
import { Card, CardLink, EmptyState, PanelHead } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import { PositionCalculator } from "./PositionCalculator";
import { ScamDrill } from "./ScamDrill";

export const metadata: Metadata = { title: "Web3 tools" };
export const dynamic = "force-dynamic";

export default async function ToolsPage() {
  const user = await requireUser();
  const trades = await listTradeNotes(user.id, 5);

  return (
    <div className="flex flex-col gap-5">
      {/*
        This disclosure is first, not in a footer. The blueprint's rule is that
        responsibility is structural — a member should read what these tools
        are and are not before they touch one.
      */}
      <div className="tint-ember rounded-[var(--radius-tile)] px-[18px] py-4 text-xs leading-[1.65] text-mist-300">
        Educational tools only. Nothing here is financial advice, no figure is a
        live quote, and no calculation is a recommendation. Maby Academy never
        takes custody of funds, never executes trades, and will never ask for
        your seed phrase or private keys — anyone who does is stealing from you.
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-2">
        <PositionCalculator />

        <div className="flex flex-col gap-4">
          <Card>
            <PanelHead
              title="Trading journal"
              action={<CardLink href="/dashboard/journal">Open journal →</CardLink>}
            />
            {trades.length === 0 ? (
              <p className="text-xs leading-[1.6] text-mist-400">
                No entries yet. Write up a trade — what you expected, what you
                did, and what actually happened. The gap between those three is
                where the learning is.
              </p>
            ) : (
              <div className="flex flex-col gap-2.5">
                {trades.map((t) => (
                  <div
                    key={t.id}
                    className="surface-inset flex flex-wrap items-center gap-3 p-3.5"
                  >
                    <div className="min-w-[110px] flex-1">
                      <p className="text-xs font-bold text-mist-100">
                        {t.title || "Untitled entry"}
                      </p>
                      <p className="mt-1 text-[10px] leading-[1.35] text-mist-400">
                        {formatDate(t.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <p className="mt-3.5 text-[11px] leading-[1.55] text-mist-400">
              Journalling is assessed on discipline and honesty, never on profit.
            </p>
          </Card>

          <ScamDrill />
        </div>
      </div>

      <Card pad="wide">
        <PanelHead title="Research checklist" className="mb-1.5" />
        <p className="mb-4 text-[11.5px] leading-[1.55] text-mist-400">
          Before you put money into anything, you should be able to answer all
          eight. If you cannot answer one, that is the research you still owe.
        </p>
        <ol className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
          {[
            "What does this actually do, in one sentence, without jargon?",
            "Who is paying for it, and what do they get?",
            "Where does the yield come from? Name the payer.",
            "What has to be true for this to go to zero?",
            "Who can change the rules, and how fast?",
            "How much of the supply do insiders hold, and when does it unlock?",
            "What is my exit, decided now rather than later?",
            "Would I still hold this if the price fell 70% tomorrow?",
          ].map((q, i) => (
            <li key={q} className="flex gap-2.5">
              <span className="mt-px shrink-0 text-[11px] font-bold text-gold-500 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-xs leading-[1.55] text-mist-300">{q}</span>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
