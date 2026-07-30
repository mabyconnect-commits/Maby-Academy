import type { Metadata } from "next";
import { guardPermission } from "@/lib/auth/guard";
import { listUpcomingSessions, listPastSessions } from "@/server/services/liveSessions";
import { Avatar, Card, EmptyState, Pill, StatusPill } from "@/components/ui";
import { formatDate, pluralize } from "@/lib/utils";

export const metadata: Metadata = { title: "Live sessions" };
export const dynamic = "force-dynamic";

export default async function TeachSessionsPage() {
  const user = await guardPermission("course:create", "Live sessions");
  const [upcoming, past] = await Promise.all([
    listUpcomingSessions(),
    listPastSessions(),
  ]);

  if (upcoming.length === 0 && past.length === 0) {
    return (
      <EmptyState
        icon="calendar"
        title="No sessions scheduled"
        description="Live sessions are created by an administrator and appear here once scheduled, with attendance and RSVP counts."
      />
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {upcoming.length > 0 && (
        <section>
          <h2 className="eyebrow mb-3">Upcoming</h2>
          <div className="flex flex-col gap-2.5">
            {upcoming.map((s) => (
              <Card key={s.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-mist-100">{s.title}</p>
                    <p className="mt-1 text-[10.5px] font-medium text-mist-400">
                      {formatDate(s.startsAt, true)} ·{" "}
                      {Math.round(
                        (s.endsAt.getTime() - s.startsAt.getTime()) / 60000,
                      )}{" "}
                      min
                      {s.course && ` · ${s.course.title}`}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2.5">
                    <Pill tone="info">
                      {pluralize(s._count.rsvps, "signup")}
                    </Pill>
                    <StatusPill status={s.status} />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-[10.5px] text-mist-400">
                  <Avatar name={s.host.name} src={s.host.avatarUrl} size={20} />
                  Hosted by {s.host.name}
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section>
          <h2 className="eyebrow mb-3">Past</h2>
          <div className="flex flex-col gap-2.5">
            {past.map((s) => (
              <Card key={s.id}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-mist-100">{s.title}</p>
                    <p className="mt-1 text-[10.5px] font-medium text-mist-400">
                      {formatDate(s.startsAt, true)}
                    </p>
                  </div>
                  <Pill tone="neutral">
                    {pluralize(s._count.rsvps, "attendee")}
                  </Pill>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
