import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/session";
import { listJournal } from "@/server/services/growth";
import { Card, EmptyState, Pill } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import { JournalComposer, DeleteEntry } from "./JournalComposer";

export const metadata: Metadata = {
  title: "Journal",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

const KIND_META: Record<string, { label: string; emoji: string }> = {
  REFLECTION: { label: "Reflection", emoji: "🪞" },
  GRATITUDE: { label: "Gratitude", emoji: "🙏" },
  PRAYER: { label: "Prayer", emoji: "✝" },
  LESSON_NOTE: { label: "Lesson note", emoji: "📝" },
  REVIEW: { label: "Review", emoji: "🔍" },
};

const MOOD_LABELS = ["", "Rough", "Low", "Steady", "Good", "Strong"];

export default async function JournalPage() {
  const user = await requireUser();
  const actor = { id: user.id, role: user.role, extraRoles: user.extraRoles };

  const entries = await listJournal({ actor, ownerId: user.id, take: 60 });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Journal</h1>
        <p className="mt-1.5 text-sm text-mist-400">
          Reflections, gratitude and prayer.
        </p>
      </header>

      {/* The privacy promise, stated plainly. A journal nobody trusts is a
          journal nobody writes in. */}
      <Card className="border-growth-600/30 bg-growth-500/[0.04]">
        <div className="flex gap-3">
          <span className="text-lg shrink-0" aria-hidden>
            🔒
          </span>
          <div>
            <p className="text-sm font-medium text-mist-100">
              This is private
            </p>
            <p className="mt-1 text-sm text-mist-400 leading-relaxed">
              Instructors, moderators, support and administrators cannot read
              your journal. Nothing here is used to recommend courses or shown
              on your profile. A mentor sees an entry only if you share that
              specific one, and you can stop at any time.
            </p>
          </div>
        </div>
      </Card>

      <JournalComposer />

      <section className="space-y-3">
        {entries.length === 0 ? (
          <EmptyState
            icon="📓"
            title="Nothing written yet"
            description="Start with one line about today. What went well, what didn't, and the one thing you'd change tomorrow."
          />
        ) : (
          entries.map((entry) => {
            const meta = KIND_META[entry.kind] ?? {
              label: entry.kind,
              emoji: "•",
            };
            return (
              <Card key={entry.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill tone="neutral">
                      {meta.emoji} {meta.label}
                    </Pill>
                    {entry.mood && (
                      <Pill tone="gold">{MOOD_LABELS[entry.mood]}</Pill>
                    )}
                    {!entry.isPrivate && (
                      <Pill tone="growth">Shared with mentor</Pill>
                    )}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-mist-400">
                      {formatDate(entry.createdAt, true)}
                    </span>
                    <DeleteEntry entryId={entry.id} />
                  </div>
                </div>

                {entry.title && (
                  <h2 className="mt-3 font-semibold text-mist-100">
                    {entry.title}
                  </h2>
                )}
                <p className="mt-2 text-sm text-mist-300 leading-relaxed whitespace-pre-wrap">
                  {entry.body}
                </p>
              </Card>
            );
          })
        )}
      </section>
    </div>
  );
}
