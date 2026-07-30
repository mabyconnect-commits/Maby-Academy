import type { Metadata } from "next";
import { guardPermission } from "@/lib/auth/guard";
import { listMentorSessions } from "@/server/services/mentorship";
import {
  Avatar,
  Card,
  EmptyState,
  Pill,
  StatusPill,
} from "@/components/ui";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Sessions" };
export const dynamic = "force-dynamic";

export default async function MentorSessionsPage() {
  const user = await guardPermission("mentee:view_progress", "Mentor sessions");
  const sessions = await listMentorSessions(user.id);

  if (sessions.length === 0) {
    return (
      <EmptyState
        icon="calendar"
        title="No sessions yet"
        description="Sessions you schedule with your mentees appear here, with your private notes alongside the notes they can read."
      />
    );
  }

  const now = new Date();
  const upcoming = sessions.filter(
    (s) => s.status === "SCHEDULED" && s.scheduledAt >= now,
  );
  const rest = sessions.filter((s) => !upcoming.includes(s));

  return (
    <div className="flex flex-col gap-5">
      {upcoming.length > 0 && (
        <section>
          <h2 className="eyebrow mb-3">Upcoming</h2>
          <div className="flex flex-col gap-2.5">
            {upcoming.map((s) => (
              <SessionCard key={s.id} session={s} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="eyebrow mb-3">History</h2>
        <div className="flex flex-col gap-2.5">
          {rest.map((s) => (
            <SessionCard key={s.id} session={s} />
          ))}
        </div>
      </section>
    </div>
  );
}

function SessionCard({
  session,
}: {
  session: Awaited<ReturnType<typeof listMentorSessions>>[number];
}) {
  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar
            name={session.mentee.name}
            src={session.mentee.avatarUrl}
            size={32}
          />
          <div className="min-w-0">
            <p className="truncate text-[13px] font-bold text-mist-100">
              {session.mentee.name}
            </p>
            <p className="mt-0.5 text-[10.5px] font-medium text-mist-400">
              {formatDate(session.scheduledAt, true)} · {session.durationMins}{" "}
              min
            </p>
          </div>
        </div>
        <StatusPill status={session.status} />
      </div>

      {session.sharedNotes && (
        <div className="mt-3.5 border-t border-rule pt-3.5">
          <div className="mb-1.5 flex items-center gap-2">
            <p className="text-[10px] font-bold tracking-[0.12em] text-mist-400 uppercase">
              Shared notes
            </p>
            <Pill tone="info" shape="tag">
              Mentee can read
            </Pill>
          </div>
          <p className="text-[11.5px] leading-[1.65] text-mist-300">
            {session.sharedNotes}
          </p>
        </div>
      )}

      {session.privateNotes && (
        <div className="mt-3.5 border-t border-rule pt-3.5">
          <div className="mb-1.5 flex items-center gap-2">
            <p className="text-[10px] font-bold tracking-[0.12em] text-mist-400 uppercase">
              Your notes
            </p>
            {/* Labelled explicitly, because the cost of a mentor mistaking
                which box a mentee can read is a broken relationship. */}
            <Pill tone="neutral" shape="tag">
              Private to you
            </Pill>
          </div>
          <p className="text-[11.5px] leading-[1.65] text-mist-400">
            {session.privateNotes}
          </p>
        </div>
      )}
    </Card>
  );
}
