import Link from "next/link";
import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/session";
import { getMyEnrollments } from "@/server/services/courses";
import {
  EmptyState,
  LinkButton,
  ProgressBar,
  StatusPill,
} from "@/components/ui";
import { formatDate, pluralize } from "@/lib/utils";

export const metadata: Metadata = { title: "My courses" };
export const dynamic = "force-dynamic";

export default async function MyCoursesPage() {
  const user = await requireUser();
  const enrollments = await getMyEnrollments(user.id);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">My courses</h1>
          <p className="mt-1.5 text-sm text-mist-400">
            {pluralize(enrollments.length, "enrolment")} · everything you&apos;ve
            started lives here.
          </p>
        </div>
        <LinkButton href="/courses" variant="secondary">
          Find more courses
        </LinkButton>
      </header>

      {enrollments.length === 0 ? (
        <EmptyState
          icon="📚"
          title="You haven't enrolled yet"
          description="Pick a pillar that matters to you right now and start there. You can always add more later."
          action={<LinkButton href="/courses">Browse the catalogue</LinkButton>}
        />
      ) : (
        <div className="space-y-3">
          {enrollments.map((e) => {
            const lessonCount = e.course.modules.reduce(
              (n, m) => n + m._count.lessons,
              0,
            );

            return (
              <Link
                key={e.id}
                href={`/courses/${e.course.slug}`}
                className="surface p-5 flex flex-wrap gap-5 items-center hover:border-gold-600/50 transition-colors"
              >
                <span className="text-3xl shrink-0" aria-hidden>
                  {e.course.category.iconEmoji ?? "📘"}
                </span>

                <div className="flex-1 min-w-[200px]">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold text-mist-100">
                      {e.course.title}
                    </h2>
                    <StatusPill status={e.status} />
                  </div>

                  <p className="mt-1 text-xs text-mist-400">
                    {e.course.category.name} · {e.course.instructor.name} ·{" "}
                    {pluralize(lessonCount, "lesson")}
                  </p>

                  <div className="mt-3 max-w-md">
                    <ProgressBar value={e.progressPercent} showLabel />
                  </div>
                </div>

                <div className="text-right text-xs text-mist-400 shrink-0">
                  {e.completedAt ? (
                    <p className="text-growth-400">
                      Completed {formatDate(e.completedAt)}
                    </p>
                  ) : e.lastAccessedAt ? (
                    <p>Last opened {formatDate(e.lastAccessedAt)}</p>
                  ) : (
                    <p>Enrolled {formatDate(e.enrolledAt)}</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
