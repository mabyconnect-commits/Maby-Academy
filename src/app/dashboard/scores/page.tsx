import Link from "next/link";
import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/session";
import { getMyScores } from "@/server/services/scores";
import type { CourseScores } from "@/server/services/scores";
import {
  Card,
  EmptyState,
  LinkButton,
  Pill,
  ProgressBar,
} from "@/components/ui";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "My scores" };
export const dynamic = "force-dynamic";

export default async function ScoresPage() {
  const user = await requireUser();
  const courses = await getMyScores(user.id);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">My scores</h1>
        <p className="mt-1.5 text-sm text-mist-400">
          Every quiz and every assignment, per course, with the feedback your
          instructor left. Quizzes count your best attempt.
        </p>
      </header>

      {courses.length === 0 ? (
        <EmptyState
          icon="award"
          title="No scores yet"
          description="Enrol in a course and your quiz and assignment results will appear here as you complete them."
          action={<LinkButton href="/courses">Browse courses</LinkButton>}
        />
      ) : (
        courses.map((course) => <CourseBlock key={course.courseId} course={course} />)
      )}
    </div>
  );
}

function CourseBlock({ course }: { course: CourseScores }) {
  const hasWork = course.quizzes.length > 0 || course.assignments.length > 0;

  return (
    <Card pad="none" className="overflow-hidden">
      {/* Header ------------------------------------------------------- */}
      <div className="border-b border-rule bg-ink-800/40 p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/courses/${course.courseSlug}`}
              className="text-[15px] leading-tight font-extrabold text-mist-100 hover:text-gold-300"
            >
              {course.courseTitle}
            </Link>
            <p className="mt-1.5 text-[11.5px] text-mist-400">
              {course.progressPercent}% of lessons complete
              {course.gradedCount > 0 &&
                ` · ${course.gradedCount} item${course.gradedCount === 1 ? "" : "s"} graded`}
            </p>
          </div>

          {/* An average of nothing is not zero. A learner who has submitted
              nothing yet should not be shown 0%, which reads as a fail. */}
          {course.average == null ? (
            <Pill tone="neutral">Nothing graded yet</Pill>
          ) : (
            <div className="shrink-0 text-right">
              <p
                className={
                  course.average >= course.passThreshold
                    ? "text-2xl leading-none font-extrabold text-growth-500 tabular-nums"
                    : "text-2xl leading-none font-extrabold text-ember-500 tabular-nums"
                }
              >
                {course.average}%
              </p>
              <p className="mt-1 text-[10.5px] font-medium text-mist-400">
                average · {course.passThreshold}% to pass
              </p>
            </div>
          )}
        </div>

        <div className="mt-3">
          <ProgressBar value={course.progressPercent} />
        </div>

        {(course.awaitingCount > 0 || course.notStartedCount > 0) && (
          <p className="mt-2.5 text-[11px] text-mist-400">
            {course.awaitingCount > 0 &&
              `${course.awaitingCount} waiting on a grader`}
            {course.awaitingCount > 0 && course.notStartedCount > 0 && " · "}
            {course.notStartedCount > 0 &&
              `${course.notStartedCount} not started`}
          </p>
        )}

        {course.certificate && (
          <p className="mt-3 text-[11.5px] font-semibold text-gold-400">
            Certificate {course.certificate.serial} issued{" "}
            {formatDate(course.certificate.issuedAt)}
          </p>
        )}
      </div>

      {!hasWork ? (
        <p className="p-4 text-xs leading-[1.6] text-mist-400 sm:p-5">
          This course has no quizzes or graded assignments. Your progress is
          tracked by lesson completion instead.
        </p>
      ) : (
        <div className="divide-y divide-rule">
          {course.quizzes.length > 0 && (
            <Section title="Quizzes">
              {course.quizzes.map((q) => (
                <Row
                  key={q.quizId}
                  href={`/courses/${course.courseSlug}/lessons/${q.lessonSlug}`}
                  title={q.title}
                  subtitle={
                    q.attemptsUsed === 0
                      ? "Not attempted"
                      : `${q.attemptsUsed} of ${q.maxAttempts} attempt${q.maxAttempts === 1 ? "" : "s"} used${
                          q.lastAttemptAt
                            ? ` · ${formatDate(q.lastAttemptAt)}`
                            : ""
                        }`
                  }
                  value={q.attemptsUsed === 0 ? null : `${q.bestScore}%`}
                  target={`${q.passScore}% to pass`}
                  state={
                    q.attemptsUsed === 0 ? "none" : q.passed ? "pass" : "fail"
                  }
                />
              ))}
            </Section>
          )}

          {course.assignments.length > 0 && (
            <Section title="Assignments">
              {course.assignments.map((a) => (
                <div key={a.assignmentId}>
                  <Row
                    href={`/courses/${course.courseSlug}/lessons/${a.lessonSlug}`}
                    title={a.title}
                    subtitle={
                      a.gradedAt
                        ? `Graded ${formatDate(a.gradedAt)}${a.graderName ? ` by ${a.graderName}` : ""}`
                        : a.status === "SUBMITTED" || a.status === "UNDER_REVIEW"
                          ? "Submitted — waiting on your instructor"
                          : a.status === "RETURNED"
                            ? "Returned for revisions"
                            : a.status === "DRAFT"
                              ? "Draft saved, not submitted"
                              : "Not started"
                    }
                    value={a.score == null ? null : `${a.score}/${a.maxScore}`}
                    target={`${a.passScore}/${a.maxScore} to pass`}
                    state={
                      a.passed == null ? "none" : a.passed ? "pass" : "fail"
                    }
                  />

                  {/* Rubric and feedback are the reason a human graded this;
                      hiding them behind another click wastes the effort. */}
                  {a.rubric.some((r) => r.score != null) && (
                    <ul className="space-y-1.5 px-4 pb-3 sm:px-5">
                      {a.rubric.map((r) => (
                        <li
                          key={r.name}
                          className="flex items-start justify-between gap-3 text-[11px]"
                        >
                          <span className="min-w-0 text-mist-400">
                            {r.name}
                          </span>
                          <span className="shrink-0 font-semibold text-mist-200 tabular-nums">
                            {r.score == null ? "—" : `${r.score}/${r.maxPoints}`}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {a.feedback && (
                    <div className="px-4 pb-4 sm:px-5">
                      <div className="surface-inset p-3.5">
                        <p className="eyebrow">Instructor feedback</p>
                        <p className="mt-2 text-[12px] leading-[1.6] whitespace-pre-line text-mist-200">
                          {a.feedback}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </Section>
          )}
        </div>
      )}
    </Card>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="eyebrow px-4 pt-4 pb-1 sm:px-5">{title}</p>
      <div className="divide-y divide-rule/60">{children}</div>
    </div>
  );
}

function Row({
  href,
  title,
  subtitle,
  value,
  target,
  state,
}: {
  href: string;
  title: string;
  subtitle: string;
  value: string | null;
  target: string;
  state: "pass" | "fail" | "none";
}) {
  return (
    <Link
      href={href}
      // min-w-0 on the text column: without it the longest quiz title sets the
      // flex row's minimum and the card grows wider than a phone.
      className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-gold-500/6 sm:px-5"
    >
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[12.5px] font-semibold text-mist-100">
          {title}
        </span>
        <span className="mt-0.5 block text-[10.5px] text-mist-400">
          {subtitle}
        </span>
      </span>
      <span className="shrink-0 text-right">
        {value == null ? (
          <span className="text-[11px] font-medium text-mist-400">—</span>
        ) : (
          <span
            className={
              state === "pass"
                ? "text-[13px] font-bold text-growth-500 tabular-nums"
                : "text-[13px] font-bold text-ember-500 tabular-nums"
            }
          >
            {value}
          </span>
        )}
        <span className="mt-0.5 block text-[10px] text-mist-400">{target}</span>
      </span>
    </Link>
  );
}
