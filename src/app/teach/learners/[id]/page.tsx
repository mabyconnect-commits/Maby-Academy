import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { guardPermission } from "@/lib/auth/guard";
import { getLearnerDetail } from "@/server/services/roster";
import {
  Avatar,
  Card,
  EmptyState,
  LinkButton,
  PanelHead,
  Pill,
  ProgressBar,
  StatTile,
  StatusPill,
} from "@/components/ui";
import { formatDate, pluralize } from "@/lib/utils";

export const metadata: Metadata = { title: "Learner" };
export const dynamic = "force-dynamic";

/**
 * One learner's teaching record.
 *
 * Scoped by the service to the courses this member actually teaches, so an
 * instructor who owns two of the six courses a student is taking sees those
 * two. It is a teaching record rather than a profile — there is no standing
 * to review work somebody else set.
 *
 * Journals are absent on purpose and should stay absent. They are private by
 * default and reachable only through a per-assignment mentorship consent;
 * surfacing them here to make the page feel complete would repeal that.
 */
export default async function LearnerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const staff = await guardPermission("submission:grade", "Learner records");
  const { id } = await params;

  const learner = await getLearnerDetail(staff, id);
  if (!learner) notFound();

  const graded = learner.courses.flatMap((c) =>
    c.average === null ? [] : [c.average],
  );
  const overall =
    graded.length > 0
      ? Math.round(graded.reduce((s, a) => s + a, 0) / graded.length)
      : null;

  const waiting = learner.courses.reduce(
    (s, c) =>
      s +
      c.assignments.filter(
        (a) => a.status === "SUBMITTED" || a.status === "UNDER_REVIEW",
      ).length,
    0,
  );

  return (
    <div className="flex min-w-0 flex-col gap-5">
      <div>
        <Link
          href="/teach/learners"
          className="-my-1 inline-block py-1 text-xs font-semibold text-mist-400 hover:text-gold-400"
        >
          ← All learners
        </Link>
      </div>

      <Card pad="wide">
        <div className="flex min-w-0 flex-col gap-3.5 sm:flex-row sm:items-center">
          <Avatar name={learner.name} src={learner.avatarUrl} size={54} />
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-[19px] leading-[1.2] font-extrabold text-mist-100">
              {learner.name}
            </h1>
            <p className="mt-1 truncate text-xs text-mist-400">{learner.email}</p>
            <p className="mt-1.5 text-[11px] text-mist-500">
              Joined {formatDate(learner.joinedAt)} ·{" "}
              {pluralize(learner.currentStreak, "day")} streak ·{" "}
              {learner.lifetimePoints.toLocaleString()} XP
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        <StatTile label="Your courses" value={learner.courses.length} />
        <StatTile
          label="Waiting on you"
          value={waiting}
          tone={waiting > 0 ? "gold" : "growth"}
        />
        <StatTile
          label="Average"
          // A learner with nothing graded gets a dash rather than 0%. Zero is
          // a mark; "not yet assessed" is not, and showing one as the other
          // misrepresents someone who has simply not reached an assessment.
          value={overall === null ? "—" : `${overall}%`}
          tone={overall === null ? "default" : overall >= 70 ? "growth" : "ember"}
        />
        <StatTile
          label="Completed"
          value={learner.courses.filter((c) => c.status === "COMPLETED").length}
        />
      </div>

      {learner.courses.length === 0 ? (
        <EmptyState
          icon="book"
          title="Not on any of your courses"
          description="This learner is not enrolled on a course you teach, so there is nothing here to review. An administrator can see their full record."
          action={<LinkButton href="/teach/learners">Back to the roster</LinkButton>}
        />
      ) : (
        learner.courses.map((course) => (
          <Card key={course.courseId} pad="wide" className="min-w-0">
            <PanelHead
              title={course.courseTitle}
              action={
                <Link
                  href={`/teach/courses/${course.courseId}`}
                  className="text-xs font-bold text-gold-500 hover:text-gold-400"
                >
                  Course
                </Link>
              }
            />

            <div className="mt-3.5 flex flex-wrap items-center gap-2">
              <StatusPill status={course.status} />
              <Pill tone={course.average === null ? "neutral" : course.average >= course.passThreshold ? "growth" : "ember"}>
                {course.average === null
                  ? "not yet assessed"
                  : `${course.average}% · pass ${course.passThreshold}%`}
              </Pill>
              <span className="text-[11px] text-mist-500">
                {course.lessonsCompleted} of {course.lessonsTotal} lessons ·{" "}
                {course.lastAccessedAt
                  ? `last seen ${formatDate(course.lastAccessedAt)}`
                  : "never opened"}
              </span>
            </div>

            <div className="mt-3">
              <ProgressBar value={course.progressPercent} showLabel />
            </div>

            {course.quizzes.length > 0 && (
              <div className="mt-5">
                <p className="eyebrow">Quizzes</p>
                <div className="mt-2 flex flex-col divide-y divide-rule">
                  {course.quizzes.map((q) => (
                    <div
                      key={q.title}
                      className="flex min-w-0 items-center gap-3 py-2.5"
                    >
                      <span className="min-w-0 flex-1 truncate text-xs text-mist-300">
                        {q.title}
                      </span>
                      <span className="shrink-0 text-[11px] text-mist-500">
                        {q.attempts === 0
                          ? "not attempted"
                          : `${q.attempts}/${q.maxAttempts} attempts`}
                      </span>
                      <span
                        className={`shrink-0 text-xs font-bold ${
                          q.bestScore === null
                            ? "text-mist-500"
                            : q.bestScore >= q.passScore
                              ? "text-growth-400"
                              : "text-ember-400"
                        }`}
                      >
                        {q.bestScore === null ? "—" : `${q.bestScore}%`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {course.assignments.length > 0 && (
              <div className="mt-5">
                <p className="eyebrow">Assignments</p>
                <div className="mt-2 flex flex-col gap-2.5">
                  {course.assignments.map((a) => (
                    <div
                      key={a.assignmentId}
                      className="surface-inset min-w-0 rounded-[var(--radius-card)] border border-rule p-3"
                    >
                      <div className="flex min-w-0 flex-wrap items-center gap-2">
                        <span className="min-w-0 flex-1 truncate text-xs font-bold text-mist-100">
                          {a.title}
                        </span>
                        <StatusPill status={a.status} />
                        <span
                          className={`shrink-0 text-xs font-bold ${
                            a.score === null
                              ? "text-mist-500"
                              : a.score >= a.passScore
                                ? "text-growth-400"
                                : "text-ember-400"
                          }`}
                        >
                          {a.score === null ? "—" : `${a.score}/${a.maxScore}`}
                        </span>
                      </div>

                      {a.rubric.length > 0 && a.score !== null && (
                        <div className="mt-2.5 flex flex-col gap-1">
                          {a.rubric.map((c) => (
                            <div
                              key={c.name}
                              className="flex min-w-0 items-baseline gap-2 text-[11px]"
                            >
                              <span className="min-w-0 flex-1 truncate text-mist-400">
                                {c.name}
                              </span>
                              <span className="shrink-0 font-semibold text-mist-300">
                                {c.score === null ? "—" : c.score}/{c.maxPoints}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {a.feedback && (
                        <p className="mt-2.5 text-[11px] leading-[1.6] whitespace-pre-wrap text-mist-400">
                          {a.feedback}
                        </p>
                      )}

                      <p className="mt-2 text-[10px] text-mist-500">
                        {a.submittedAt
                          ? `Submitted ${formatDate(a.submittedAt)}`
                          : "Not submitted"}
                        {a.gradedAt &&
                          ` · graded ${formatDate(a.gradedAt)}${a.graderName ? ` by ${a.graderName}` : ""}`}
                      </p>

                      {(a.status === "SUBMITTED" || a.status === "UNDER_REVIEW") &&
                        a.submissionId && (
                          <div className="mt-2.5">
                            <LinkButton
                              href={`/admin/grading/${a.submissionId}`}
                              size="sm"
                            >
                              Grade this
                            </LinkButton>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))
      )}
    </div>
  );
}
