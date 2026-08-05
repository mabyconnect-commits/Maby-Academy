import Link from "next/link";
import type { Metadata } from "next";
import { guardPermission } from "@/lib/auth/guard";
import { listAuthoredCourses } from "@/server/services/authoring";
import { getGradingQueue } from "@/server/services/assessment";
import {
  Card,
  CardLink,
  EmptyState,
  LinkButton,
  PanelHead,
  StatTile,
  StatusPill,
} from "@/components/ui";
import { formatDate, formatMoney, pluralize } from "@/lib/utils";

export const metadata: Metadata = { title: "Overview" };
export const dynamic = "force-dynamic";

export default async function TeachOverviewPage() {
  const user = await guardPermission("course:create", "The instructor workspace");
  const [courses, queue] = await Promise.all([
    listAuthoredCourses(user),
    getGradingQueue(user),
  ]);

  const enrolled = courses.reduce((s, c) => s + c.enrolledCount, 0);
  const published = courses.filter((c) => c.status === "PUBLISHED");
  const avgCompletion = published.length
    ? Math.round(
        published.reduce((s, c) => s + c.avgCompletion, 0) / published.length,
      )
    : 0;
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        <StatTile label="Courses" value={courses.length} />
        <StatTile label="Students enrolled" value={enrolled} tone="gold" />
        <StatTile
          label="Average completion"
          value={`${avgCompletion}%`}
          tone={avgCompletion >= 50 ? "growth" : "ember"}
        />
        <StatTile
          label="Awaiting grade"
          value={queue.length}
          tone={queue.length > 0 ? "flag" : "growth"}
        />
      </div>

      {queue.length > 0 && (
        <Card variant="gold" pad="wide">
          <p className="eyebrow">Students are waiting</p>
          <h2 className="mt-2.5 text-[17px] leading-[1.25] font-extrabold text-mist-100">
            {pluralize(queue.length, "submission")} to grade
          </h2>
          <p className="mt-2.5 text-xs leading-[1.6] text-mist-400">
            {/* Naming the oldest wait is the point: an aggregate count is easy
                to ignore, a specific person waiting eleven days is not.
                The queue is ordered oldest-first, so the longest wait is index
                0 — reading the last element reported the newest submission. */}
            Oldest has been waiting since{" "}
            {formatDate(queue[0].submittedAt ?? new Date())}. Feedback that
            arrives late teaches much less than feedback that arrives next.
          </p>
          <LinkButton href="/teach/grading" className="mt-4" size="lg">
            Open grading queue
          </LinkButton>
        </Card>
      )}

      <Card pad="wide">
        <PanelHead
          title="Your courses"
          // Two destinations, because the courses and the people on them are
          // different jobs: the builder is for the material, the roster is for
          // whoever has stopped moving through it.
          action={
            <span className="flex items-center gap-3">
              <CardLink href="/teach/learners">Learners →</CardLink>
              <CardLink href="/teach/courses">Course builder →</CardLink>
            </span>
          }
        />

        {courses.length === 0 ? (
          <EmptyState
            icon="book"
            title="No courses yet"
            description="Build your first course in the builder — modules, lessons, quizzes and assignments, then submit it for review."
            action={<LinkButton href="/teach/courses">Open the builder</LinkButton>}
          />
        ) : (
          <div className="flex flex-col gap-3">
            {courses.map((c) => (
              <Link
                key={c.id}
                href={`/teach/courses/${c.id}`}
                className="surface-inset block p-4 transition-colors hover:border-gold-500/40"
              >
                <div className="flex flex-wrap items-center justify-between gap-2.5">
                  <span className="text-[13px] leading-[1.3] font-bold text-mist-100">
                    {c.title}
                  </span>
                  <StatusPill status={c.status} />
                </div>
                <p className="mt-2 text-[11px] leading-[1.5] font-medium text-mist-400">
                  {pluralize(c.enrolledCount, "student")} ·{" "}
                  {pluralize(c.moduleCount, "module")} · {c.avgCompletion}%
                  average completion
                  {c.avgRating != null && ` · ★ ${c.avgRating}`} ·{" "}
                  {c.priceMinor === 0
                    ? "Free"
                    : formatMoney(c.priceMinor, c.currency)}
                </p>
                <p className="mt-1 text-[10px] text-mist-400/70">
                  Last edited {formatDate(c.updatedAt)}
                </p>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
