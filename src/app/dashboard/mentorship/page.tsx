import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/session";
import { getMenteeView } from "@/server/services/mentorship";
import {
  Avatar,
  Card,
  EmptyState,
  LinkButton,
  PanelHead,
  Pill,
  StatusPill,
} from "@/components/ui";
import { formatDate } from "@/lib/utils";
import { JournalConsentToggle } from "./JournalConsentToggle";

export const metadata: Metadata = { title: "Mentorship" };
export const dynamic = "force-dynamic";

export default async function MentorshipPage() {
  const user = await requireUser();
  const assignment = await getMenteeView(user.id);

  if (!assignment) {
    return (
      <EmptyState
        icon="handshake"
        title="No mentor assigned yet"
        description="Mentorship is matched by the academy rather than requested — it starts once you have real work for a mentor to look at. Keep going and one will be assigned."
        action={<LinkButton href="/dashboard/courses">My courses</LinkButton>}
      />
    );
  }

  const upcoming = assignment.sessions.filter(
    (s) => s.status === "SCHEDULED" && s.scheduledAt >= new Date(),
  );
  const past = assignment.sessions.filter((s) => !upcoming.includes(s));

  return (
    <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="flex flex-col gap-5">
        <Card pad="wide">
          <PanelHead title="Your mentor" />
          <div className="flex items-start gap-3.5">
            <Avatar
              name={assignment.mentor.name}
              src={assignment.mentor.avatarUrl}
              size={52}
            />
            <div className="min-w-0">
              <p className="text-[15px] font-bold text-mist-100">
                {assignment.mentor.name}
              </p>
              <p className="mt-0.5 text-[10.5px] font-medium text-mist-400">
                Mentoring you since {formatDate(assignment.startedAt)}
              </p>
              {assignment.mentor.bio && (
                <p className="mt-2.5 text-[11.5px] leading-[1.6] text-mist-400">
                  {assignment.mentor.bio}
                </p>
              )}
            </div>
          </div>
        </Card>

        <Card pad="wide">
          <PanelHead
            title="Sessions"
            meta={
              upcoming.length > 0 ? (
                <Pill tone="info">{upcoming.length} upcoming</Pill>
              ) : undefined
            }
          />
          {assignment.sessions.length === 0 ? (
            <p className="text-xs leading-[1.65] text-mist-400">
              No sessions yet. Your mentor schedules these — they will appear
              here with a joining link in your own time zone.
            </p>
          ) : (
            <div className="flex flex-col gap-2.5">
              {[...upcoming, ...past].map((session) => (
                <div key={session.id} className="surface-inset p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2.5">
                    <span className="text-[12.5px] font-bold text-mist-100">
                      {formatDate(session.scheduledAt, true)}
                    </span>
                    <StatusPill status={session.status} />
                  </div>
                  <p className="mt-1.5 text-[10.5px] font-medium text-mist-400">
                    {session.durationMins} minutes
                  </p>

                  {/* Shared notes only. Mentor working notes are a separate
                      column that no mentee-facing query selects. */}
                  {session.sharedNotes && (
                    <p className="mt-2.5 border-t border-rule pt-2.5 text-[11.5px] leading-[1.65] text-mist-300">
                      {session.sharedNotes}
                    </p>
                  )}

                  {session.meetingUrl && session.status === "SCHEDULED" && (
                    <LinkButton
                      href={session.meetingUrl}
                      size="sm"
                      className="mt-3"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join session
                    </LinkButton>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Card pad="wide">
        <PanelHead title="What your mentor can see" className="mb-2" />
        <p className="text-[11.5px] leading-[1.7] text-mist-400">
          Mentorship only works if you know exactly where the line is, so here it
          is in full.
        </p>

        <ul className="mt-4 space-y-3">
          <Boundary allowed>
            Your course progress, completed lessons and graded work
          </Boundary>
          <Boundary allowed>Goals you have explicitly chosen to share</Boundary>
          <Boundary allowed>Notes from your sessions together</Boundary>
          <Boundary>Your journal — unless you switch it on below</Boundary>
          <Boundary>Your daily habits and streaks</Boundary>
          <Boundary>Anything you write in a private goal</Boundary>
        </ul>

        <div className="mt-5 border-t border-rule pt-4">
          <JournalConsentToggle
            assignmentId={assignment.id}
            mentorName={assignment.mentor.name}
            consent={assignment.journalConsent}
          />
        </div>

        <p className="mt-4 text-[11px] leading-[1.65] text-mist-400/80">
          No other role can read your journal, including administrators. Consent
          applies to this mentor only and you can withdraw it at any moment.
        </p>
      </Card>
    </div>
  );
}

function Boundary({
  allowed = false,
  children,
}: {
  allowed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-2.5">
      <span
        className={`mt-px shrink-0 text-[11px] font-bold ${
          allowed ? "text-growth-500" : "text-flag-500"
        }`}
        aria-label={allowed ? "Visible" : "Not visible"}
      >
        {allowed ? "CAN" : "CANNOT"}
      </span>
      <span className="text-[11.5px] leading-[1.55] text-mist-300">
        {children}
      </span>
    </li>
  );
}
