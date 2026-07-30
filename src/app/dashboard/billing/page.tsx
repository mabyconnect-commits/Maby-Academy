import Link from "next/link";
import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/session";
import { listBillingHistory } from "@/server/services/finance";
import { Card, EmptyState, LinkButton, PanelHead, StatTile, StatusPill } from "@/components/ui";
import { formatDate, formatMoney } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Billing",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function BillingPage() {
  const user = await requireUser();
  const { orders, invoices, totalSpentMinor, currency } = await listBillingHistory(
    user.id,
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
        <StatTile label="Courses purchased" value={orders.filter((o) => o.status === "PAID").length} />
        <StatTile
          label="Total spent"
          value={formatMoney(totalSpentMinor, currency)}
          tone="gold"
        />
        <StatTile label="Invoices" value={invoices.length} />
      </div>

      <Card pad="none" className="overflow-hidden">
        <div className="border-b border-rule px-4 py-5 sm:px-[22px]">
          <span className="text-sm font-bold text-mist-100">Payment history</span>
        </div>

        {orders.length === 0 ? (
          <div className="px-4 py-6 sm:px-[22px]">
            <p className="text-xs leading-[1.65] text-mist-400">
              Nothing here yet. Free courses need no payment, so an empty
              history is perfectly normal.
            </p>
            <LinkButton href="/courses" size="sm" className="mt-3.5">
              Browse courses
            </LinkButton>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="flex flex-wrap items-center justify-between gap-3 border-b border-mist-100/5 px-4 py-4 last:border-b-0 sm:px-[22px]"
            >
              <div className="min-w-0">
                <p className="truncate text-[12.5px] font-bold text-mist-100">
                  {order.course.title}
                </p>
                <p className="mt-1 text-[10.5px] font-medium text-mist-400">
                  {formatDate(order.createdAt)} · ref {order.providerRef ?? order.id.slice(-8).toUpperCase()}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-[13px] font-bold text-mist-100 tabular-nums">
                  {formatMoney(order.amountMinor, order.currency)}
                </span>
                <StatusPill status={order.status} />
              </div>
            </div>
          ))
        )}
      </Card>

      {invoices.length > 0 && (
        <Card pad="none" className="overflow-hidden">
          <div className="border-b border-rule px-4 py-5 sm:px-[22px]">
            <span className="text-sm font-bold text-mist-100">Invoices</span>
          </div>
          {invoices.map((inv) => (
            <div
              key={inv.id}
              className="flex flex-wrap items-center justify-between gap-3 border-b border-mist-100/5 px-4 py-4 last:border-b-0 sm:px-[22px]"
            >
              <div>
                <p className="text-[12.5px] font-bold text-mist-100">
                  {inv.number}
                </p>
                <p className="mt-1 text-[10.5px] font-medium text-mist-400">
                  Issued {formatDate(inv.issuedAt)}
                  {inv.paidAt && ` · paid ${formatDate(inv.paidAt)}`}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-bold text-mist-100 tabular-nums">
                  {formatMoney(inv.totalMinor, inv.currency)}
                </span>
                <StatusPill status={inv.status} />
              </div>
            </div>
          ))}
        </Card>
      )}

      <Card>
        <PanelHead title="Refunds and disputes" className="mb-2" />
        <p className="text-[11.5px] leading-[1.7] text-mist-400">
          Refunds are handled by a person, not a button — a refund also reverses
          any referral commission earned on that purchase, and that reversal has
          to be right. Open a{" "}
          <Link
            href="/dashboard/support"
            className="font-semibold text-gold-500 hover:text-gold-400"
          >
            Billing &amp; refunds ticket
          </Link>{" "}
          with your invoice number and support will handle it within one working
          day.
        </p>
        <p className="mt-3 text-[11px] leading-[1.65] text-mist-400/80">
          Maby Academy never stores your card details. Payments are processed by
          Flutterwave, and the academy never takes custody of member funds.
        </p>
      </Card>
    </div>
  );
}
