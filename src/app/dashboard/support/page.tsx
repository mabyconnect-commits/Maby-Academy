import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/session";
import { listMyTickets } from "@/server/services/support";
import {
  SUPPORT_CATEGORIES,
  HELP_ARTICLES,
  categoryLabel,
} from "@/lib/support/categories";
import { Card, PanelHead, StatusPill } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import { NewTicketForm } from "./NewTicketForm";

export const metadata: Metadata = { title: "Support" };
export const dynamic = "force-dynamic";

export default async function SupportPage() {
  const user = await requireUser();
  const tickets = await listMyTickets(user.id);

  return (
    <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="flex flex-col gap-5">
        <Card pad="none" className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-rule px-4 py-5 sm:px-[22px]">
            <span className="text-sm font-bold text-mist-100">Your tickets</span>
            <NewTicketForm />
          </div>

          {tickets.length === 0 ? (
            <p className="px-4 py-6 text-xs leading-[1.65] text-mist-400 sm:px-[22px]">
              No tickets. Open one above and a real person will answer — support
              is not a bot, and it will never ask you for a password or a seed
              phrase.
            </p>
          ) : (
            tickets.map((ticket) => {
              const last = ticket.messages[0];
              // Derived, not stored: a message is from staff when its author
              // is not the member who opened the ticket.
              const lastFromStaff = last && last.authorId !== user.id;

              return (
                <div
                  key={ticket.id}
                  className="border-b border-mist-100/5 px-4 py-4 last:border-b-0 sm:px-[22px]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2.5">
                    <span className="text-[12.5px] leading-[1.35] font-bold text-mist-100">
                      {ticket.subject}
                    </span>
                    <StatusPill status={ticket.status} />
                  </div>
                  <p className="mt-[7px] text-[10.5px] leading-[1.4] font-medium text-mist-400">
                    {ticket.reference} · {categoryLabel(ticket.category)} ·
                    opened {formatDate(ticket.createdAt)}
                    {ticket.agent && ` · with ${ticket.agent.name}`}
                  </p>
                  {last && (
                    <p className="mt-2.5 line-clamp-2 text-[11.5px] leading-[1.6] text-mist-300">
                      <span className="font-bold text-mist-200">
                        {lastFromStaff ? "Support: " : "You: "}
                      </span>
                      {last.body}
                    </p>
                  )}
                </div>
              );
            })
          )}
        </Card>

        <Card pad="wide">
          <PanelHead title="Specialist request forms" />
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {SUPPORT_CATEGORIES.map((c) => (
              <div key={c.value} className="surface-inset p-3.5">
                <p className="text-[11.5px] leading-[1.4] font-semibold text-mist-100">
                  {c.label}
                </p>
                <p className="mt-1.5 text-[10px] leading-[1.4] font-medium text-mist-400">
                  {c.sla}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card pad="wide">
        <PanelHead title="Help centre" className="mb-1.5" />
        <p className="mb-4 text-[11.5px] leading-[1.5] text-mist-400">
          Most questions are answered here in under a minute.
        </p>

        {/* `<details>` rather than a JS accordion: it works without hydration,
            is keyboard-navigable for free, and is searchable by the browser's
            own find-in-page once opened. */}
        <div className="flex flex-col gap-0.5">
          {HELP_ARTICLES.map((a) => (
            <details key={a.title} className="group rounded-lg px-3 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2.5">
                <span className="text-xs leading-[1.45] font-medium text-mist-200 group-hover:text-mist-100">
                  {a.title}
                </span>
                <span className="shrink-0 text-[10px] font-semibold text-mist-400">
                  {a.category}
                </span>
              </summary>
              <p className="mt-2.5 text-[11.5px] leading-[1.65] text-mist-400">
                {a.body}
              </p>
            </details>
          ))}
        </div>

        <p className="mt-4 border-t border-rule pt-3.5 text-[11px] leading-[1.6] text-mist-400">
          Support will never ask for your password, seed phrase or private keys.
          Anyone who does is impersonating us — report it immediately.
        </p>
      </Card>
    </div>
  );
}
