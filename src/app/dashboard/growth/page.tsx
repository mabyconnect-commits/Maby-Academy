import type { Metadata } from "next";
import Link from "next/link";
import { requireUser } from "@/lib/auth/session";
import { getGrowthOverview, SUGGESTED_HABITS } from "@/server/services/growth";
import {
  Card,
  EmptyState,
  Pill,
  ProgressBar,
  SectionHeading,
  StatTile,
} from "@/components/ui";
import { formatDate } from "@/lib/utils";
import { HabitChecklist, AddHabit } from "./HabitChecklist";
import { GoalList, AddGoal } from "./GoalList";

export const metadata: Metadata = { title: "Growth" };
export const dynamic = "force-dynamic";

const AREA_LABELS: Record<string, { label: string; emoji: string }> = {
  FAITH: { label: "Faith", emoji: "🙏" },
  FINANCE: { label: "Finance", emoji: "💰" },
  HEALTH: { label: "Health", emoji: "💪" },
  CAREER: { label: "Career", emoji: "💼" },
  BUSINESS: { label: "Business", emoji: "🏗" },
  LEARNING: { label: "Learning", emoji: "📚" },
  PRODUCTIVITY: { label: "Productivity", emoji: "⚡" },
  LEADERSHIP: { label: "Leadership", emoji: "🧭" },
  RELATIONSHIPS: { label: "Relationships", emoji: "🤝" },
  PURPOSE: { label: "Purpose", emoji: "✨" },
};

export default async function GrowthPage() {
  const user = await requireUser();
  const overview = await getGrowthOverview(user.id);

  const { today, habits, goals, history, areas, journalCount } = overview;
  const percentToday =
    today.total > 0 ? Math.round((today.done / today.total) * 100) : 0;

  const activeStreak = habits.reduce(
    (best, h) => Math.max(best, h.currentStreak),
    0,
  );
  const daysWithActivity = history.filter((d) => d.completed > 0).length;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Growth</h1>
        <p className="mt-1.5 text-sm text-mist-400">
          The parts of the work no course can do for you. Private by default —
          nobody at the academy sees this unless you choose to share it.
        </p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatTile
          label="Today"
          value={`${today.done}/${today.total}`}
          hint={today.total > 0 ? `${percentToday}% done` : "no habits yet"}
        />
        <StatTile label="Best streak" value={`${activeStreak}d`} />
        <StatTile
          label="Active goals"
          value={goals.length}
        />
        <StatTile
          label="Journal entries"
          value={journalCount}
          hint={`${daysWithActivity}/28 active days`}
        />
      </div>

      {/* Daily checklist ------------------------------------------------- */}
      <section>
        <SectionHeading
          title="Today's checklist"
          subtitle={
            today.total > 0
              ? "Small, repeatable, and yours. Consistency beats intensity."
              : "Pick a few things you want to do most days."
          }
        />

        {today.total > 0 && (
          <div className="mb-4">
            <ProgressBar value={percentToday} showLabel />
          </div>
        )}

        {habits.length === 0 ? (
          <EmptyState
            icon="seedling"
            title="No habits yet"
            description="Start with two or three. A checklist you can actually finish is worth more than one that shames you every morning."
          />
        ) : (
          <HabitChecklist
            habits={habits.map((h) => ({
              id: h.id,
              name: h.name,
              area: h.area,
              iconEmoji: h.iconEmoji,
              currentStreak: h.currentStreak,
              doneToday: h.doneToday,
            }))}
          />
        )}

        <div className="mt-4">
          <AddHabit suggestions={SUGGESTED_HABITS} />
        </div>
      </section>

      {/* 28-day history --------------------------------------------------- */}
      {history.some((d) => d.total > 0) && (
        <section>
          <SectionHeading
            title="Last 28 days"
            subtitle="Every square is a day. Darker means more of your habits were done."
          />
          <Card>
            <div className="flex flex-wrap gap-1.5" role="img" aria-label="Habit completion over the last 28 days">
              {history.map((day) => {
                const ratio = day.total > 0 ? day.completed / day.total : 0;
                const tone =
                  ratio === 0
                    ? "bg-ink-800 border-ink-700"
                    : ratio < 0.5
                      ? "bg-growth-600/40 border-growth-600/50"
                      : ratio < 1
                        ? "bg-growth-500/70 border-growth-500"
                        : "bg-growth-400 border-growth-400";
                return (
                  <span
                    key={day.date}
                    title={`${day.date}: ${day.completed} of ${day.total}`}
                    className={`h-6 w-6 rounded border ${tone}`}
                  />
                );
              })}
            </div>
          </Card>
        </section>
      )}

      {/* Areas ------------------------------------------------------------ */}
      {areas.length > 0 && (
        <section>
          <SectionHeading
            title="What you're working on"
            subtitle="Drawn from what you actually track, not a fixed list."
          />
          <div className="flex flex-wrap gap-2">
            {areas.map(({ area, habits: h, goals: g }) => {
              const meta = AREA_LABELS[area] ?? { label: area, emoji: "•" };
              return (
                <Pill key={area} tone="neutral">
                  {meta.emoji} {meta.label}
                  <span className="ml-1.5 text-mist-400">
                    {h > 0 && `${h}h`}
                    {h > 0 && g > 0 && " · "}
                    {g > 0 && `${g}g`}
                  </span>
                </Pill>
              );
            })}
          </div>
        </section>
      )}

      {/* Goals ------------------------------------------------------------ */}
      <section>
        <SectionHeading
          title="Goals"
          subtitle="Define what 'enough' looks like before the market defines it for you."
        />

        {goals.length === 0 ? (
          <EmptyState
            icon="target"
            title="No goals set"
            description="Write down what you're actually building toward. Concrete beats aspirational — a number and a date you can be held to."
          />
        ) : (
          <GoalList
            goals={goals.map((g) => ({
              id: g.id,
              title: g.title,
              description: g.description,
              area: g.area,
              horizon: g.horizon,
              targetValue: g.targetValue,
              currentValue: g.currentValue,
              unit: g.unit,
              dueAt: g.dueAt ? formatDate(g.dueAt) : null,
              status: g.status,
              sharedWithMentor: g.sharedWithMentor,
            }))}
          />
        )}

        <div className="mt-4">
          <AddGoal />
        </div>
      </section>

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold text-mist-100">Journal</h2>
            <p className="mt-1 text-sm text-mist-400">
              Reflections, gratitude and prayer. Private by default — staff and
              administrators cannot read it.
            </p>
          </div>
          <Link
            href="/dashboard/journal"
            className="text-sm text-gold-400 hover:text-gold-300"
          >
            Open journal →
          </Link>
        </div>
      </Card>
    </div>
  );
}
