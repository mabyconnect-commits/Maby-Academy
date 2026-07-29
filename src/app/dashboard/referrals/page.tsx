import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/session";
import { getReferralOverview } from "@/server/services/referrals";
import {
  Avatar,
  Card,
  EmptyState,
  Pill,
  SectionHeading,
  StatTile,
  StatusPill,
} from "@/components/ui";
import { CopyButton } from "@/components/CopyButton";
import { formatDate, formatMoney, pluralize } from "@/lib/utils";

export const metadata: Metadata = { title: "Referrals" };
export const dynamic = "force-dynamic";

export default async function ReferralsPage() {
  const user = await requireUser();
  const data = await getReferralOverview(user.id);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">
          Referral programme
        </h1>
        <p className="mt-1.5 text-sm text-mist-400">
          Earn on what your network learns — across {data.rates.length} levels
          deep.
        </p>
      </header>

      {/* Code & link ----------------------------------------------------- */}
      <Card className="border-gold-600/30 bg-gold-500/[0.04]">
        <p className="text-xs uppercase tracking-wide text-mist-400">
          Your referral code
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <span className="font-mono text-2xl font-semibold text-gold-300 tracking-wider">
            {data.referralCode}
          </span>
          <CopyButton value={data.referralCode} label="Copy code" />
        </div>

        <div className="mt-5 pt-5 border-t border-ink-700">
          <p className="text-xs uppercase tracking-wide text-mist-400">
            Your invite link
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <code className="text-sm text-mist-200 break-all">{data.link}</code>
            <CopyButton value={data.link} label="Copy link" />
          </div>
        </div>
      </Card>

      {/* Earnings -------------------------------------------------------- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatTile
          label="Direct referrals"
          value={data.directReferrals.length}
          icon="🤝"
          hint="Level 1"
        />
        <StatTile
          label="Network"
          value={data.directReferrals.length + data.level2Count}
          icon="🌐"
          hint={`${data.level2Count} at level 2`}
        />
        <StatTile
          label="Pending"
          value={formatMoney(data.earnings.pending)}
          icon="⏳"
        />
        <StatTile
          label="Total earned"
          value={formatMoney(data.earnings.total)}
          icon="💰"
          hint={`${formatMoney(data.earnings.paid)} paid out`}
        />
      </div>

      {/* Rate card ------------------------------------------------------- */}
      <section>
        <SectionHeading
          title="How the commission works"
          subtitle="Paid on every purchase made by someone in your network, at the rate for their level."
        />
        <div className="grid gap-3 sm:grid-cols-3">
          {data.rates.map((rate, i) => (
            <Card key={i}>
              <div className="flex items-center justify-between">
                <Pill tone={i === 0 ? "gold" : "neutral"}>Level {i + 1}</Pill>
                <span className="text-2xl font-semibold text-gold-300">
                  {Math.round(rate * 100)}%
                </span>
              </div>
              <p className="mt-3 text-xs text-mist-400 leading-relaxed">
                {i === 0
                  ? "People who join directly with your code."
                  : `People invited by your level ${i} referrals.`}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Direct referrals ------------------------------------------------ */}
      <section>
        <SectionHeading
          title="Your direct referrals"
          subtitle={pluralize(data.directReferrals.length, "person")}
        />

        {data.directReferrals.length === 0 ? (
          <EmptyState
            icon="🤝"
            title="No referrals yet"
            description="Share your link with people who are serious about growth. You earn points the moment they join, and commission when they buy."
          />
        ) : (
          <div className="space-y-2.5">
            {data.directReferrals.map((r) => (
              <Card key={r.id} className="flex items-center gap-4">
                <Avatar name={r.name} src={r.avatarUrl} size={40} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-mist-100">{r.name}</p>
                  <p className="text-xs text-mist-400">
                    Joined {formatDate(r.createdAt)} ·{" "}
                    {pluralize(r._count.enrollments, "course")} ·{" "}
                    {r.lifetimePoints.toLocaleString()} pts
                  </p>
                </div>
                {r._count.referrals > 0 && (
                  <Pill tone="growth">
                    +{r._count.referrals} in their network
                  </Pill>
                )}
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Commission history ---------------------------------------------- */}
      {data.commissions.length > 0 && (
        <section>
          <SectionHeading title="Commission history" />
          <Card className="p-0 overflow-x-auto">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="border-b border-ink-700 text-left text-xs uppercase tracking-wide text-mist-400">
                  <th className="px-4 py-3 font-medium">From</th>
                  <th className="px-4 py-3 font-medium">Course</th>
                  <th className="px-4 py-3 font-medium">Level</th>
                  <th className="px-4 py-3 font-medium text-right">Amount</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-800">
                {data.commissions.map((c) => (
                  <tr key={c.id}>
                    <td className="px-4 py-3 text-mist-200">
                      {c.sourceUser.name}
                    </td>
                    <td className="px-4 py-3 text-mist-400">
                      {c.order.course.title}
                    </td>
                    <td className="px-4 py-3 text-mist-400">
                      L{c.level} · {c.ratePercent}%
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-mist-100">
                      {formatMoney(c.amountMinor, c.currency)}
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill status={c.status} />
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
