import Link from "next/link";
import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/session";
import { getDashboardSummary } from "@/server/services/progress";
import {
  Avatar,
  Card,
  EmptyState,
  LinkButton,
  Pill,
  ProgressBar,
  SectionHeading,
  StatTile,
  StatusPill,
} from "@/components/ui";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireUser();
  const summary = await getDashboardSummary(user.id);
  const { stats, resume, enrollments, gradedRecently, upcomingSessions } = summary;

  const firstName = user.name.split(" ")[0];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome back, {firstName}.
        </h1>
        <p className="mt-1.5 text-sm text-mist-400">
          {stats.activeCourses > 0
            ? "Consistency beats intensity. Pick up where you left off."
            : "Your seat is ready — enrol in your first course to begin."}
        </p>
      </header>

      {/* Stats ---------------------------------------------------------- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatTile
          label="Active courses"
          value={stats.activeCourses}
          icon="📚"
          hint={`${stats.completedCourses} completed`}
        />
        <StatTile
          label="Lessons done"
          value={stats.completedLessons}
          icon="✓"
        />
        <StatTile
          label="Points"
          value={user.pointsBalance.toLocaleString()}
          icon="⚡"
          hint={`${user.lifetimePoints.toLocaleString()} lifetime`}
        />
        <StatTile
          label="Certificates"
          value={stats.certificates}
          icon="🎓"
          hint={stats.pendingSubmissions > 0 ? `${stats.pendingSubmissions} in review` : undefined}
        />
      </div>

      {/* Resume --------------------------------------------------------- */}
      {resume && (
        <Card className="border-gold-600/30 bg-gold-500/[0.04]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="min-w-0">
              <Pill tone="gold">Continue learning</Pill>
              <h2 className="mt-3 font-semibold text-mist-100 truncate">
                {resume.course.title}
              </h2>
              <div className="mt-3 max-w-sm">
                <ProgressBar value={resume.progressPercent} showLabel />
              </div>
            </div>
            <LinkButton href={`/courses/${resume.course.slug}`} size="lg">
              {resume.progressPercent > 0 ? "Resume" : "Start"}
            </LinkButton>
          </div>
        </Card>
      )}

      {/* Courses -------------------------------------------------------- */}
      <section>
        <SectionHeading
          title="My courses"
          subtitle={`${enrollments.length} enrolment${enrollments.length === 1 ? "" : "s"}`}
          action={
            <Link
              href="/dashboard/courses"
              className="text-sm text-gold-400 hover:text-gold-300"
            >
              View all →
            </Link>
          }
        />

        {enrollments.length === 0 ? (
          <EmptyState
            icon="📚"
            title="No courses yet"
            description="Browse the catalogue and enrol in something. Most people start with crypto foundations."
            action={<LinkButton href="/courses">Browse courses</LinkButton>}
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {enrollments.slice(0, 4).map((e) => (
              <Link
                key={e.id}
                href={`/courses/${e.course.slug}`}
                className="surface p-4 hover:border-gold-600/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-xl" aria-hidden>
                    {e.course.category.iconEmoji ?? "📘"}
                  </span>
                  <StatusPill status={e.status} />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-mist-100 leading-snug">
                  {e.course.title}
                </h3>
                <div className="mt-3">
                  <ProgressBar value={e.progressPercent} showLabel />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent grades ------------------------------------------------ */}
        <section>
          <SectionHeading title="Recent feedback" />
          {gradedRecently.length === 0 ? (
            <Card>
              <p className="text-sm text-mist-400">
                No graded work yet. Submit an assignment and your instructor
                will read it.
              </p>
            </Card>
          ) : (
            <div className="space-y-2.5">
              {gradedRecently.map((s) => (
                <Link
                  key={s.id}
                  href={`/courses/${s.assignment.lesson.module.course.slug}/lessons/${s.assignment.lesson.slug}`}
                  className="surface p-4 block hover:border-ink-500 transition-colors"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-mist-200 truncate">
                      {s.assignment.title}
                    </p>
                    <span className="text-sm font-semibold text-growth-400 tabular-nums shrink-0">
                      {s.score}/{s.assignment.maxScore}
                    </span>
                  </div>
                  {s.feedback && (
                    <p className="mt-1.5 text-xs text-mist-400 line-clamp-2">
                      {s.feedback}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Upcoming live ------------------------------------------------ */}
        <section>
          <SectionHeading
            title="Upcoming live sessions"
            action={
              <Link
                href="/dashboard/live"
                className="text-sm text-gold-400 hover:text-gold-300"
              >
                All →
              </Link>
            }
          />
          {upcomingSessions.length === 0 ? (
            <Card>
              <p className="text-sm text-mist-400">
                Nothing scheduled right now. New sessions appear here as
                they&apos;re announced.
              </p>
            </Card>
          ) : (
            <div className="space-y-2.5">
              {upcomingSessions.map((s) => (
                <Card key={s.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-mist-100 truncate">
                        {s.title}
                      </p>
                      <p className="mt-1 text-xs text-mist-400">
                        {formatDate(s.startsAt, true)}
                      </p>
                    </div>
                    {s.rsvps.length > 0 && <Pill tone="growth">Going</Pill>}
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-mist-400">
                    <Avatar name={s.host.name} src={s.host.avatarUrl} size={20} />
                    {s.host.name}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
