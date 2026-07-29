import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/session";
import { getLeaderboard, getRewardsOverview } from "@/server/services/rewards";
import { db } from "@/lib/db";
import {
  Avatar,
  Card,
  Pill,
  ProgressBar,
  SectionHeading,
  StatTile,
} from "@/components/ui";
import { formatDate } from "@/lib/utils";
import { LEVEL_TIERS, levelFor, levelProgress, pointsToNextLevel } from "@/lib/levels";

export const metadata: Metadata = { title: "Rewards" };
export const dynamic = "force-dynamic";

const REASON_LABELS: Record<string, string> = {
  LESSON_COMPLETED: "Lesson completed",
  QUIZ_PASSED: "Quiz passed",
  ASSIGNMENT_GRADED: "Assignment passed",
  COURSE_COMPLETED: "Course completed",
  LIVE_ATTENDED: "Live session attended",
  STREAK_BONUS: "Streak bonus",
  REFERRAL_SIGNUP: "Referral signup",
  BADGE_AWARDED: "Badge awarded",
  MANUAL_ADJUSTMENT: "Adjustment",
  REDEMPTION: "Redemption",
};

export default async function RewardsPage() {
  const user = await requireUser();

  const [overview, leaderboard, allBadges] = await Promise.all([
    getRewardsOverview(user.id),
    getLeaderboard(10),
    db.badge.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  const earnedIds = new Set(overview.badges.map((b) => b.badgeId));

  const lifetime = overview.user?.lifetimePoints ?? 0;
  const level = levelFor(lifetime);
  const progress = levelProgress(lifetime);
  const toNext = pointsToNextLevel(lifetime);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Rewards</h1>
        <p className="mt-1.5 text-sm text-mist-400">
          Points for doing the work, badges for milestones, and streaks for
          showing up when you don&apos;t feel like it.
        </p>
      </header>

      {/* Level ----------------------------------------------------------- */}
      <Card variant="gold">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-mist-400">
              Level {level.number}
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-gradient-gold">
              {level.name}
            </h2>
          </div>
          <p className="text-sm text-mist-400">
            {toNext === null
              ? "Top tier reached — nothing above this."
              : `${toNext.toLocaleString()} points to ${LEVEL_TIERS[level.number]?.name}`}
          </p>
        </div>
        <div className="mt-4">
          <ProgressBar value={progress} showLabel />
        </div>
        <p className="mt-2 text-xs text-mist-400">
          {lifetime.toLocaleString()} lifetime points. Levels come from lifetime
          points, so spending never costs you rank.
        </p>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatTile
          label="Points balance"
          value={overview.user?.pointsBalance.toLocaleString() ?? 0}
          icon="⚡"
        />
        <StatTile
          label="Lifetime points"
          value={overview.user?.lifetimePoints.toLocaleString() ?? 0}
          icon="📈"
        />
        <StatTile
          label="Current streak"
          value={`${overview.user?.currentStreak ?? 0}d`}
          icon="🔥"
          hint={`best ${overview.user?.longestStreak ?? 0}d`}
        />
        <StatTile
          label="Rank"
          value={overview.rank ? `#${overview.rank}` : "—"}
          icon="🏆"
          hint={`of ${overview.totalStudents}`}
        />
      </div>

      {/* Tier ladder ----------------------------------------------------- */}
      <section>
        <SectionHeading
          title="The ladder"
          subtitle="Thresholds widen as they climb — early levels arrive fast, later ones represent real work."
        />
        <Card className="p-0 overflow-hidden">
          <ol className="divide-y divide-ink-800">
            {LEVEL_TIERS.map((tier, i) => {
              const reached = lifetime >= tier.minPoints;
              const current = i + 1 === level.number;
              return (
                <li
                  key={tier.name}
                  className={`flex items-center gap-3 px-4 py-2.5 ${
                    current ? "bg-gold-500/[0.06]" : ""
                  }`}
                >
                  <span
                    className={`w-6 text-sm tabular-nums shrink-0 ${
                      reached ? "text-gold-400" : "text-mist-400"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`flex-1 text-sm ${
                      reached ? "text-mist-100" : "text-mist-400"
                    }`}
                  >
                    {tier.name}
                    {current && (
                      <span className="ml-2 text-xs text-gold-400">you</span>
                    )}
                  </span>
                  <span className="text-xs tabular-nums text-mist-400">
                    {tier.minPoints.toLocaleString()} pts
                  </span>
                  {reached && (
                    <span className="text-growth-400 text-xs" aria-hidden>
                      ✓
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </Card>
      </section>

      {/* Badges ---------------------------------------------------------- */}
      <section>
        <SectionHeading
          title="Badges"
          subtitle={`${overview.badges.length} of ${allBadges.length} earned`}
        />
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {allBadges.map((badge) => {
            const earned = earnedIds.has(badge.id);
            return (
              <Card
                key={badge.id}
                className={
                  earned
                    ? "border-gold-600/40 bg-gold-500/[0.04]"
                    : "opacity-55"
                }
              >
                <div className="text-2xl" aria-hidden>
                  {badge.iconEmoji}
                </div>
                <h3 className="mt-2 text-sm font-semibold text-mist-100">
                  {badge.name}
                </h3>
                <p className="mt-1 text-xs text-mist-400 leading-relaxed">
                  {badge.description}
                </p>
                {earned ? (
                  <p className="mt-2.5 text-xs text-growth-400">✓ Earned</p>
                ) : (
                  badge.pointsValue > 0 && (
                    <p className="mt-2.5 text-xs text-mist-400">
                      +{badge.pointsValue} pts
                    </p>
                  )
                )}
              </Card>
            );
          })}
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Leaderboard --------------------------------------------------- */}
        <section>
          <SectionHeading
            title="Leaderboard"
            subtitle="Ranked by lifetime points."
          />
          <Card className="p-0 overflow-hidden">
            <ol className="divide-y divide-ink-800">
              {leaderboard.map((entry, i) => {
                const isMe = entry.id === user.id;
                return (
                  <li
                    key={entry.id}
                    className={`flex items-center gap-3 px-4 py-3 ${isMe ? "bg-gold-500/[0.06]" : ""}`}
                  >
                    <span
                      className={`w-6 text-sm font-semibold tabular-nums shrink-0 ${
                        i === 0
                          ? "text-gold-400"
                          : i < 3
                            ? "text-mist-200"
                            : "text-mist-400"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <Avatar name={entry.name} src={entry.avatarUrl} size={30} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-mist-100 truncate">
                        {entry.name}
                        {isMe && (
                          <span className="ml-2 text-xs text-gold-400">you</span>
                        )}
                      </p>
                      <p className="text-xs text-mist-400">
                        {entry._count.certificates} certificate
                        {entry._count.certificates === 1 ? "" : "s"}
                        {entry.currentStreak > 0 && ` · 🔥 ${entry.currentStreak}d`}
                      </p>
                    </div>
                    <span className="text-sm font-semibold tabular-nums text-gold-300 shrink-0">
                      {entry.lifetimePoints.toLocaleString()}
                    </span>
                  </li>
                );
              })}
            </ol>
          </Card>
        </section>

        {/* Ledger -------------------------------------------------------- */}
        <section>
          <SectionHeading
            title="Points activity"
            subtitle="Every point you've earned, and what for."
          />
          {overview.transactions.length === 0 ? (
            <Card>
              <p className="text-sm text-mist-400">
                No points yet. Complete a lesson to get started.
              </p>
            </Card>
          ) : (
            <Card className="p-0 overflow-hidden">
              <ul className="divide-y divide-ink-800">
                {overview.transactions.map((t) => (
                  <li key={t.id} className="flex items-center gap-3 px-4 py-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-mist-200">
                        {REASON_LABELS[t.reason] ?? t.reason}
                      </p>
                      <p className="text-xs text-mist-400 truncate">
                        {t.note ? `${t.note} · ` : ""}
                        {formatDate(t.createdAt)}
                      </p>
                    </div>
                    <Pill tone={t.amount > 0 ? "growth" : "flag"}>
                      {t.amount > 0 ? "+" : ""}
                      {t.amount}
                    </Pill>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </section>
      </div>
    </div>
  );
}
