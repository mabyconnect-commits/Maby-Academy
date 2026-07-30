import type { Metadata } from "next";
import { guardPermission } from "@/lib/auth/guard";
import { listAllTickets } from "@/server/services/admin";
import { categoryLabel } from "@/lib/support/categories";
import { Card, EmptyState, Pill, StatTile, StatusPill } from "@/components/ui";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Support desk",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function AdminSupportPage() {
  const actor = await guardPermission("ticket:respond", "The support desk");
  const tickets = await listAllTickets(actor);

  if (tickets.length === 0) {
    return (
      <EmptyState
        icon="lifebuoy"
        title="No tickets"
        description="Nothing waiting. Urgent categories — security concerns and scam reports — always sort to the top of this queue."
      />
    );
  }

  const open = tickets.filter((t) => t.status === "OPEN");
  const urgent = tickets.filter(
    (t) => t.priority === "URGENT" && t.status !== "CLOSED",
  );
  const unanswered = open.filter((t) => !t.firstRespondedAt);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
        <StatTile label="Open" value={open.length} />
        <StatTile
          label="Never answered"
          value={unanswered.length}
          tone={unanswered.length > 0 ? "flag" : "growth"}
        />
        <StatTile
          label="Urgent"
          value={urgent.length}
          tone={urgent.length > 0 ? "flag" : "growth"}
        />
        <StatTile label="Total" value={tickets.length} />
      </div>

      <Card pad="none" className="overflow-hidden">
        {tickets.map((t) => (
          <div
            key={t.id}
            className={`border-b border-mist-100/5 px-3.5 py-4 last:border-b-0 sm:px-5 ${
              t.priority === "URGENT" && t.status !== "CLOSED"
                ? "bg-flag-500/5"
                : ""
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <span className="text-[12.5px] leading-[1.35] font-bold text-mist-100">
                {t.subject}
              </span>
              <div className="flex shrink-0 items-center gap-2">
                {t.priority === "URGENT" && <Pill tone="flag">urgent</Pill>}
                {!t.firstRespondedAt && t.status === "OPEN" && (
                  <Pill tone="ember">unanswered</Pill>
                )}
                <StatusPill status={t.status} />
              </div>
            </div>
            <p className="mt-[7px] text-[10.5px] leading-[1.4] font-medium text-mist-400">
              {t.reference} · {categoryLabel(t.category)} ·{" "}
              {t.requester.name} · opened {formatDate(t.createdAt)}
              {t.agent ? ` · assigned to ${t.agent.name}` : " · unassigned"}
            </p>
          </div>
        ))}
      </Card>
    </div>
  );
}
