import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/session";
import {
  listPastSessions,
  listUpcomingSessions,
} from "@/server/services/liveSessions";
import {
  Avatar,
  Card,
  EmptyState,
  Pill,
  SectionHeading,
  StatusPill,
} from "@/components/ui";
import { formatDate, pluralize } from "@/lib/utils";
import { RsvpButton } from "./RsvpButton";

export const metadata: Metadata = { title: "Live sessions" };
export const dynamic = "force-dynamic";

type UpcomingSession = Awaited<ReturnType<typeof listUpcomingSessions>>[number] & {
  rsvps?: { id: string; attended: boolean }[];
};

export default async function LiveSessionsPage() {
  const user = await requireUser();
  const [upcoming, past] = await Promise.all([
    listUpcomingSessions(user.id) as Promise<UpcomingSession[]>,
    listPastSessions(),
  ]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Live sessions</h1>
        <p className="mt-1.5 text-sm text-mist-400">
          Show up, ask questions, earn points. Replays are posted for anyone who
          couldn&apos;t make it.
        </p>
      </header>

      <section>
        <SectionHeading
          title="Upcoming"
          subtitle={pluralize(upcoming.length, "session")}
        />

        {upcoming.length === 0 ? (
          <EmptyState
            icon="calendar"
            title="Nothing scheduled yet"
            description="New sessions are announced here and in your notifications. Keep an eye out."
          />
        ) : (
          <div className="space-y-3">
            {upcoming.map((s) => {
              const going = (s.rsvps?.length ?? 0) > 0;
              const full =
                s.capacity !== null && s._count.rsvps >= s.capacity && !going;

              return (
                <Card key={s.id}>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusPill status={s.status} />
                        {going && <Pill tone="growth">You&apos;re going</Pill>}
                        {full && <Pill tone="flag">Fully booked</Pill>}
                        {s.course && <Pill tone="neutral">{s.course.title}</Pill>}
                      </div>

                      <h3 className="mt-3 font-semibold text-mist-100">
                        {s.title}
                      </h3>
                      {s.description && (
                        <p className="mt-1.5 text-sm text-mist-400 leading-relaxed">
                          {s.description}
                        </p>
                      )}

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-mist-400">
                        <span className="flex items-center gap-2">
                          <Avatar
                            name={s.host.name}
                            src={s.host.avatarUrl}
                            size={20}
                          />
                          {s.host.name}
                        </span>
                        <span>🗓 {formatDate(s.startsAt, true)}</span>
                        <span>
                          👥 {s._count.rsvps}
                          {s.capacity ? ` / ${s.capacity}` : ""} attending
                        </span>
                        <span className="text-gold-400">
                          +{s.pointsValue} pts
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 shrink-0">
                      <RsvpButton
                        sessionId={s.id}
                        going={going}
                        disabled={full}
                      />
                      {going && s.meetingUrl && s.status === "LIVE" && (
                        <a
                          href={s.meetingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-center text-sm text-gold-400 hover:text-gold-300"
                        >
                          Join now ↗
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {past.length > 0 && (
        <section>
          <SectionHeading title="Replays" subtitle="Catch up on what you missed." />
          <div className="space-y-2.5">
            {past.map((s) => (
              <Card key={s.id} className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[200px]">
                  <p className="font-medium text-mist-100">{s.title}</p>
                  <p className="mt-1 text-xs text-mist-400">
                    {s.host.name} · {formatDate(s.startsAt)}
                    {s.course && ` · ${s.course.title}`}
                  </p>
                </div>
                {s.replayUrl ? (
                  <a
                    href={s.replayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gold-400 hover:text-gold-300 shrink-0"
                  >
                    Watch replay ↗
                  </a>
                ) : (
                  <span className="text-xs text-mist-400 shrink-0">
                    Replay coming soon
                  </span>
                )}
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
