import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/session";
import { actorCan } from "@/server/services/policy";
import {
  HOLDING_PERIOD_DAYS,
  getCommissionQueue,
  getFinanceOverview,
} from "@/server/services/finance";
import {
  Avatar,
  Card,
  EmptyState,
  Pill,
  SectionHeading,
  StatTile,
  StatusPill,
} from "@/components/ui";
import { formatDate, formatMoney } from "@/lib/utils";
import { CommissionActions, BulkApprove } from "./CommissionActions";

export const metadata: Metadata = { title: "Finance" };
export const dynamic = "force-dynamic";

export default async function FinancePage() {
  const user = await requireUser();
  const actor = { id: user.id, role: user.role, extraRoles: user.extraRoles };

  if (!actorCan(actor, "commission:approve")) redirect("/admin");

  const [overview, pending, approved] = await Promise.all([
    actorCan(actor, "financial_report:export")
      ? getFinanceOverview(actor)
      : null,
    getCommissionQueue(actor, "PENDING"),
    getCommissionQueue(actor, "APPROVED"),
  ]);

  const canPayout = actorCan(actor, "payout:execute");
  const clearCount = pending.filter((c) => c.isClearToApprove).length;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Finance</h1>
        <p className="mt-1.5 text-sm text-mist-400">
          Commissions are written the moment an order is paid, but money only
          moves after a human approves it. That gap is where refunds and
          self-referrals get caught.
        </p>
      </header>

      {overview && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatTile
              label="Net revenue"
              value={formatMoney(overview.netMinor)}
              hint={`${formatMoney(overview.grossMinor)} gross`}
            />
            <StatTile
              label="Refunded"
              value={formatMoney(overview.refundedMinor)}
              hint={`${overview.refundCount} orders`}
            />
            <StatTile
              label="Commission liability"
              value={formatMoney(overview.liabilityMinor)}
              hint="owed, not yet paid"
            />
            <StatTile
              label="Paid out"
              value={formatMoney(overview.commissions.paid.amountMinor)}
              hint={`${overview.commissions.paid.count} commissions`}
            />
          </div>

          {overview.liabilityMinor > overview.netMinor &&
            overview.netMinor >= 0 && (
              <Card className="border-flag-500/40 bg-flag-500/10">
                <p className="text-sm font-semibold text-flag-400">
                  Commission liability exceeds net revenue
                </p>
                <p className="mt-1.5 text-sm text-mist-300 leading-relaxed">
                  You owe {formatMoney(overview.liabilityMinor)} against{" "}
                  {formatMoney(overview.netMinor)} of net revenue. Review the
                  commission rates before approving anything further.
                </p>
              </Card>
            )}
        </>
      )}

      {/* Pending ------------------------------------------------------- */}
      <section>
        <SectionHeading
          title="Awaiting approval"
          subtitle={`${pending.length} pending · ${clearCount} with no flags · ${HOLDING_PERIOD_DAYS}-day holding period`}
          action={clearCount > 0 ? <BulkApprove count={clearCount} /> : undefined}
        />

        {pending.length === 0 ? (
          <EmptyState
            icon="check"
            title="Nothing pending"
            description="Every commission has been reviewed."
          />
        ) : (
          <div className="space-y-2.5">
            {pending.map((c) => (
              <Card key={c.id}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <Avatar
                        name={c.beneficiary.name}
                        src={c.beneficiary.avatarUrl}
                        size={34}
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-mist-100">
                          {c.beneficiary.name}
                          <span className="ml-2 text-xs text-mist-400">
                            level {c.level} · {c.ratePercent}%
                          </span>
                        </p>
                        <p className="text-xs text-mist-400 truncate">
                          from {c.sourceUser.name} · {c.order.course.title}
                        </p>
                      </div>
                    </div>

                    {c.flags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {c.flags.map((flag) => (
                          <Pill key={flag} tone="flag">
                            ⚠ {flag}
                          </Pill>
                        ))}
                      </div>
                    )}

                    <p className="mt-2 text-xs text-mist-400">
                      Created {formatDate(c.createdAt)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2.5 shrink-0">
                    <span className="text-lg font-semibold tabular-nums text-mist-100">
                      {formatMoney(c.amountMinor, c.currency)}
                    </span>
                    <CommissionActions
                      commissionId={c.id}
                      status="PENDING"
                      canPayout={canPayout}
                      flagged={!c.isClearToApprove}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Approved, awaiting payout ------------------------------------- */}
      {approved.length > 0 && (
        <section>
          <SectionHeading
            title="Approved, awaiting payout"
            subtitle={
              canPayout
                ? "Mark as paid once the transfer has actually left."
                : "Payout requires the payout:execute permission."
            }
          />
          <div className="space-y-2.5">
            {approved.map((c) => (
              <Card key={c.id} className="flex flex-wrap items-center gap-4">
                <Avatar
                  name={c.beneficiary.name}
                  src={c.beneficiary.avatarUrl}
                  size={32}
                />
                <div className="flex-1 min-w-[180px]">
                  <p className="text-sm text-mist-100">{c.beneficiary.name}</p>
                  <p className="text-xs text-mist-400 truncate">
                    {c.beneficiary.email} · L{c.level}
                  </p>
                </div>
                <span className="text-sm font-semibold tabular-nums text-growth-400">
                  {formatMoney(c.amountMinor, c.currency)}
                </span>
                <CommissionActions
                  commissionId={c.id}
                  status="APPROVED"
                  canPayout={canPayout}
                  flagged={false}
                />
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Recent orders -------------------------------------------------- */}
      {overview && overview.recentOrders.length > 0 && (
        <section>
          <SectionHeading title="Recent orders" />
          <Card className="p-0 overflow-x-auto">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-ink-700 text-left text-xs uppercase tracking-wide text-mist-400">
                  <th className="px-4 py-3 font-medium">Member</th>
                  <th className="px-4 py-3 font-medium">Course</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Amount</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-800">
                {overview.recentOrders.map((o) => (
                  <tr key={o.id}>
                    <td className="px-4 py-3 text-mist-200">{o.user.name}</td>
                    <td className="px-4 py-3 text-mist-400">{o.course.title}</td>
                    <td className="px-4 py-3">
                      <StatusPill status={o.status} />
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-mist-100">
                      {formatMoney(o.amountMinor, o.currency)}
                    </td>
                    <td className="px-4 py-3 text-mist-400">
                      {formatDate(o.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </section>
      )}
    </div>
  );
}
