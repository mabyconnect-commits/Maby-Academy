import Link from "next/link";
import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/session";
import { getDashboardSummary } from "@/server/services/progress";
import { getOnboardingProfile } from "@/server/services/onboarding";
import { listRecentBadges } from "@/server/services/rewards";
import {
  Card,
  CardLink,
  EmptyState,
  LinkButton,
  PanelHead,
  Pill,
  ProgressBar,
  StatTile,
} from "@/components/ui";
import { Icon } from "@/components/Icon";
import { formatDate, pluralize } from "@/lib/utils";

export const metadata: Metadata = { title: "Overview" };
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireUser();
  const [summary, profile, badges] = await Promise.all([
    getDashboardSummary(user.id),
    getOnboardingProfile(user.id),
    listRecentBadges(user.id, 3),
  ]);
  const { stats, resume, enrollments, gradedRecently, upcomingSessions, dueSoon } =
    summary;

  const nextSession = upcomingSessions[0];

  return (
    // The design's dashboard is a two-column grid that collapses to one — the
    // right rail is context (what's next, what you earned, what's due), never
    // required to make sense of the left.
    <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="flex flex-col gap-5">
        {/* Onboarding prompt ------------------------------------------- */}
        {!profile?.completedAt && (
          <Card variant="gold" pad="wide">
            <p className="eyebrow">Two minutes</p>
            <h2 className="mt-2.5 text-[17px] leading-[1.25] font-extrabold text-mist-100 sm:text-[19px]">
              Answer four questions and we&apos;ll build your path.
            </h2>
            <p className="mt-2.5 text-xs text-mist-400">
              Where you&apos;re starting, what you&apos;re here for, which
              pillars you want, and how much time you have.
            </p>
            <LinkButton href="/onboarding" className="mt-4" size="lg">
              Set up my path
            </LinkButton>
          </Card>
        )}

        {/* Resume ------------------------------------------------------ */}
        {resume ? (
          <Card
            variant="gold"
            pad="wide"
            className="flex flex-wrap items-center justify-between gap-5"
          >
            <div className="min-w-0">
              <p className="eyebrow">Continue learning</p>
              <h2 className="mt-2.5 text-[17px] leading-[1.25] font-extrabold text-mist-100 sm:text-[22px]">
                {resume.course.title}
              </h2>
              <p className="mt-2.5 text-xs font-medium text-mist-400">
                {resume.progressPercent}% complete
                {resume.nextLesson && ` · up next: ${resume.nextLesson.title}`}
              </p>
            </div>
            <LinkButton
              href={
                resume.nextLesson
                  ? `/courses/${resume.course.slug}/lessons/${resume.nextLesson.slug}`
                  : `/courses/${resume.course.slug}`
              }
              size="lg"
              className="shrink-0"
            >
              <Icon name="play" size={12} strokeWidth={2.5} />
              {resume.progressPercent > 0 ? "Resume" : "Start"}
            </LinkButton>
          </Card>
        ) : (
          <EmptyState
            icon="book"
            title="Nothing in progress"
            description="Enrol in a course and it will appear here, ready to pick up where you left off."
            action={<LinkButton href="/courses">Browse courses</LinkButton>}
          />
        )}

        {/* Stats ------------------------------------------------------- */}
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
          <StatTile
            label="Active courses"
            value={stats.activeCourses}
            hint={
              stats.completedCourses > 0
                ? `${stats.completedCourses} completed`
                : undefined
            }
          />
          <StatTile label="Lessons done" value={stats.completedLessons} />
          <StatTile
            label="Points"
            value={user.pointsBalance.toLocaleString()}
            tone="gold"
          />
          <StatTile
            label="Certificates"
            value={stats.certificates}
            tone="growth"
            hint={
              stats.pendingSubmissions > 0
                ? `${stats.pendingSubmissions} in review`
                : undefined
            }
          />
        </div>

        {/* Track progress --------------------------------------------- */}
        {enrollments.length > 0 && (
          <Card pad="wide">
            <PanelHead
              title="Track progress"
              action={<CardLink href="/dashboard/courses">View all →</CardLink>}
            />
            <div className="space-y-4">
              {enrollments.slice(0, 4).map((e) => (
                <Link key={e.id} href={`/courses/${e.course.slug}`} className="block">
                  <div className="mb-[7px] flex items-center justify-between gap-3">
                    <span className="min-w-0 flex-1 truncate text-[12.5px] font-semibold text-mist-200">
                      {e.course.title}
                    </span>
                    <span className="shrink-0 text-xs font-bold text-gold-500 tabular-nums">
                      {e.progressPercent}%
                    </span>
                  </div>
                  <ProgressBar value={e.progressPercent} />
                </Link>
              ))}
            </div>
          </Card>
        )}

        {/* Recent feedback -------------------------------------------- */}
        <Card pad="wide">
          <PanelHead
            title="Recent feedback"
            action={<CardLink href="/dashboard/assignments">All work →</CardLink>}
          />
          {gradedRecently.length === 0 ? (
            <p className="text-xs leading-[1.6] text-mist-400">
              No graded work yet. Submit an assignment and a real instructor
              reads it — that is what makes the certificate mean something.
            </p>
          ) : (
            <div className="space-y-2.5">
              {gradedRecently.map((s) => (
                <Link
                  key={s.id}
                  href={`/courses/${s.assignment.lesson.module.course.slug}/lessons/${s.assignment.lesson.slug}`}
                  className="surface-inset block p-3.5 transition-colors hover:border-gold-500/40"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-xs font-bold text-mist-100">
                      {s.assignment.title}
                    </p>
                    <span className="shrink-0 text-xs font-bold text-growth-500 tabular-nums">
                      {s.score}/{s.assignment.maxScore}
                    </span>
                  </div>
                  {s.feedback && (
                    <p className="mt-1.5 line-clamp-2 text-[10.5px] leading-[1.4] text-mist-400">
                      {s.feedback}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* --------------------------------------------------------------- */}
      {/* Right rail                                                       */}
      {/* --------------------------------------------------------------- */}
      <div className="flex flex-col gap-5">
        <Card>
          <PanelHead
            title="Next live session"
            action={<CardLink href="/dashboard/live">All →</CardLink>}
          />
          {nextSession ? (
            <div className="tint-gold rounded-[10px] p-4">
              <p className="text-[13px] leading-[1.4] font-bold text-mist-100">
                {nextSession.title}
              </p>
              <p className="mt-[7px] text-[11px] leading-[1.5] font-medium text-mist-400">
                {formatDate(nextSession.startsAt, true)} · with{" "}
                {nextSession.host.name}
              </p>
              <LinkButton
                href="/dashboard/live"
                size="sm"
                className="mt-3"
              >
                {nextSession.rsvps.length > 0 ? "You're going" : "Reserve a seat"}
              </LinkButton>
            </div>
          ) : (
            <p className="text-xs leading-[1.6] text-mist-400">
              Nothing scheduled right now. New sessions appear here as they are
              announced, in your own time zone.
            </p>
          )}
        </Card>

        <Card>
          <PanelHead
            title="Recent badges"
            action={<CardLink href="/dashboard/rewards">Rewards →</CardLink>}
          />
          {badges.length === 0 ? (
            <p className="text-xs leading-[1.6] text-mist-400">
              No badges yet. They arrive for finishing things, not for signing
              up.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {badges.map((b) => (
                <div key={b.id} className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-gold-500/35 bg-gold-500/12 text-gold-500">
                    <Icon name="award" size={16} strokeWidth={2} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-bold text-mist-100">
                      {b.badge.name}
                    </span>
                    <span className="mt-[3px] block text-[10.5px] leading-[1.3] text-mist-400">
                      {b.badge.description}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>

        {dueSoon && (
          <Card>
            <div className="flex items-center justify-between gap-3">
              <span className="text-[13px] font-bold text-mist-100">
                Assignment due
              </span>
              <Pill tone={dueSoon.daysLeft <= 2 ? "flag" : "gold"}>
                {dueSoon.daysLeft <= 0
                  ? "TODAY"
                  : `${pluralize(dueSoon.daysLeft, "DAY")}`}
              </Pill>
            </div>
            <p className="mt-3 text-[12.5px] leading-[1.4] font-semibold text-mist-200">
              {dueSoon.title}
            </p>
            <div className="mt-2.5">
              <CardLink href={dueSoon.href}>Open assignment →</CardLink>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
