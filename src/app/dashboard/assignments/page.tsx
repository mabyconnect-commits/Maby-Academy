import Link from "next/link";
import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/session";
import { getMyAssignments } from "@/server/services/assessment";
import {
  Card,
  EmptyState,
  LinkButton,
  Pill,
  StatusPill,
} from "@/components/ui";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Assignments" };
export const dynamic = "force-dynamic";

export default async function AssignmentsPage() {
  const user = await requireUser();
  const assignments = await getMyAssignments(user.id);

  const outstanding = assignments.filter(
    (a) => !a.submission || a.submission.status === "DRAFT" || a.submission.status === "RETURNED",
  );
  const inReview = assignments.filter(
    (a) =>
      a.submission?.status === "SUBMITTED" ||
      a.submission?.status === "UNDER_REVIEW",
  );
  const done = assignments.filter((a) => a.submission?.status === "GRADED");

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Assignments</h1>
        <p className="mt-1.5 text-sm text-mist-400">
          Work that gets read by a human and graded against a rubric. This is
          where the learning actually sticks.
        </p>
      </header>

      {assignments.length === 0 ? (
        <EmptyState
          icon="✍"
          title="No assignments yet"
          description="Assignments appear here once you enrol in a course that has them."
          action={<LinkButton href="/courses">Browse courses</LinkButton>}
        />
      ) : (
        <>
          <Group
            title="To do"
            subtitle="Not yet submitted, or returned for revisions."
            items={outstanding}
            emptyText="Nothing outstanding — you're caught up."
          />
          <Group
            title="In review"
            subtitle="Submitted and waiting on your instructor."
            items={inReview}
            emptyText="Nothing waiting on a grader right now."
          />
          <Group
            title="Passed"
            subtitle="Graded and signed off."
            items={done}
            emptyText="No passed assignments yet."
          />
        </>
      )}
    </div>
  );
}

type Item = Awaited<ReturnType<typeof getMyAssignments>>[number];

function Group({
  title,
  subtitle,
  items,
  emptyText,
}: {
  title: string;
  subtitle: string;
  items: Item[];
  emptyText: string;
}) {
  return (
    <section>
      <div className="flex items-baseline gap-3 mb-3">
        <h2 className="text-lg font-semibold text-mist-100">{title}</h2>
        <span className="text-sm text-mist-400">{items.length}</span>
      </div>
      <p className="text-sm text-mist-400 mb-3 -mt-2">{subtitle}</p>

      {items.length === 0 ? (
        <Card>
          <p className="text-sm text-mist-400">{emptyText}</p>
        </Card>
      ) : (
        <div className="space-y-2.5">
          {items.map((a) => {
            const overdue =
              a.dueAt && new Date(a.dueAt) < new Date() && !a.submission;

            return (
              <Link
                key={a.id}
                href={`/courses/${a.lesson.module.course.slug}/lessons/${a.lesson.slug}`}
                className="surface p-4 block hover:border-ink-500 transition-colors"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-medium text-mist-100">{a.title}</h3>
                    <p className="mt-1 text-xs text-mist-400">
                      {a.lesson.module.course.title}
                      {a.dueAt && ` · due ${formatDate(a.dueAt)}`}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {overdue && <Pill tone="flag">Overdue</Pill>}
                    {a.submission ? (
                      <StatusPill status={a.submission.status} />
                    ) : (
                      <Pill tone="neutral">Not started</Pill>
                    )}
                    {a.submission?.score != null && (
                      <span className="text-sm font-semibold tabular-nums text-mist-100">
                        {a.submission.score}/{a.maxScore}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
