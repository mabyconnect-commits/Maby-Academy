import Link from "next/link";
import type { Metadata } from "next";
import { guardPermission } from "@/lib/auth/guard";
import { listLearners, listScopedCourses } from "@/server/services/roster";
import { FLAG_RANK, type RosterFlag } from "@/lib/roster-flags";
import {
  Avatar,
  Button,
  Card,
  EmptyState,
  Input,
  LinkButton,
  Pill,
  ProgressBar,
  Select,
  StatTile,
} from "@/components/ui";
import { Icon } from "@/components/Icon";
import { formatDate, pluralize } from "@/lib/utils";

export const metadata: Metadata = { title: "Learners" };
export const dynamic = "force-dynamic";

/**
 * The instructor's roster.
 *
 * The grading queue can only ever show work that arrived, which makes the
 * students who stopped submitting invisible — exactly the students who most
 * need noticing. This page is the other half: every enrolment on the courses
 * this member owns, ordered so the ones that need attention come first.
 *
 * Filtering is done with a plain GET form rather than client state. It keeps
 * the page a server component, and it means a filtered roster is a URL an
 * instructor can bookmark or send to a colleague.
 */

const FLAG_LABELS: Record<RosterFlag, string> = {
  "awaiting-grade": "Waiting on you",
  "at-risk": "Needs resubmission",
  stalled: "Stalled",
  "on-track": "On track",
  done: "Completed",
};

const FLAG_TONES: Record<RosterFlag, "gold" | "flag" | "ember" | "growth" | "neutral"> = {
  "awaiting-grade": "gold",
  "at-risk": "flag",
  stalled: "ember",
  "on-track": "neutral",
  done: "growth",
};

export default async function LearnersPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string; q?: string }>;
}) {
  const staff = await guardPermission("submission:grade", "The learner roster");
  const params = await searchParams;

  const [rows, courses] = await Promise.all([
    listLearners(staff, { courseId: params.course, query: params.q }),
    listScopedCourses(staff),
  ]);

  // Within a flag, the longest silence comes first — `idleDays` rather than
  // `daysSinceAccess`, so a learner who never opened the course at all is not
  // treated as freshly active.
  const sorted = [...rows].sort(
    (a, b) => FLAG_RANK[a.flag] - FLAG_RANK[b.flag] || b.idleDays - a.idleDays,
  );

  const counts = {
    awaiting: rows.filter((r) => r.flag === "awaiting-grade").length,
    atRisk: rows.filter((r) => r.flag === "at-risk").length,
    stalled: rows.filter((r) => r.flag === "stalled").length,
  };

  const filtered = Boolean(params.course || params.q);

  return (
    <div className="flex min-w-0 flex-col gap-5">
      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        <StatTile label="Learners" value={rows.length} />
        <StatTile
          label="Waiting on you"
          value={counts.awaiting}
          tone={counts.awaiting > 0 ? "gold" : "growth"}
        />
        <StatTile
          label="Need to resubmit"
          value={counts.atRisk}
          tone={counts.atRisk > 0 ? "flag" : "growth"}
        />
        <StatTile
          label="Stalled"
          value={counts.stalled}
          tone={counts.stalled > 0 ? "ember" : "growth"}
        />
      </div>

      {/* A GET form: the filter lives in the URL, so it survives a refresh and
          can be shared. */}
      <Card pad="wide">
        <form className="flex flex-col gap-3 sm:flex-row sm:items-end" method="get">
          <label className="flex min-w-0 flex-1 flex-col gap-1.5">
            <span className="eyebrow">Search</span>
            <Input
              type="search"
              name="q"
              defaultValue={params.q ?? ""}
              placeholder="Name or email"
            />
          </label>
          <label className="flex min-w-0 flex-col gap-1.5 sm:w-64">
            <span className="eyebrow">Course</span>
            <Select name="course" defaultValue={params.course ?? ""}>
              <option value="">All courses</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </Select>
          </label>
          <div className="flex gap-2">
            <Button type="submit">Filter</Button>
            {filtered && (
              <LinkButton href="/teach/learners" variant="ghost">
                Clear
              </LinkButton>
            )}
          </div>
        </form>
      </Card>

      {sorted.length === 0 ? (
        <EmptyState
          icon="users"
          title={filtered ? "No learners match that" : "No learners yet"}
          description={
            filtered
              ? "Try a different course, or clear the filter to see everyone."
              : "Once someone enrols on one of your courses they will appear here, with their progress and anything they are waiting on."
          }
          action={
            filtered ? (
              <LinkButton href="/teach/learners">Clear the filter</LinkButton>
            ) : (
              <LinkButton href="/teach/courses">Your courses</LinkButton>
            )
          }
        />
      ) : (
        <div className="flex min-w-0 flex-col gap-2.5">
          <p className="text-xs leading-[1.6] text-mist-400">
            {pluralize(sorted.length, "learner")} — those waiting on you first,
            then those who need to resubmit, then anyone who has stopped.
          </p>

          {sorted.map((r) => (
            <Link
              key={r.enrolmentId}
              href={`/teach/learners/${r.learnerId}`}
              className="surface-inset flex min-w-0 flex-col gap-3 rounded-[var(--radius-card)] border border-rule p-3.5 transition-colors hover:border-gold-500/40 sm:flex-row sm:items-center"
            >
              <Avatar name={r.name} src={r.avatarUrl} size={38} />

              <div className="min-w-0 flex-1">
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <span className="truncate text-sm font-bold text-mist-100">
                    {r.name}
                  </span>
                  <Pill tone={FLAG_TONES[r.flag]}>{FLAG_LABELS[r.flag]}</Pill>
                </div>
                <p className="mt-1 truncate text-xs text-mist-400">
                  {r.courseTitle}
                </p>
                <p className="mt-1.5 text-[11px] text-mist-500">
                  {r.lessonsCompleted} of {r.lessonsTotal} lessons
                  {r.daysSinceAccess === null
                    ? " · never opened"
                    : r.daysSinceAccess === 0
                      ? " · active today"
                      : ` · last seen ${pluralize(r.daysSinceAccess, "day")} ago`}
                  {r.awaitingGrade > 0 &&
                    ` · ${pluralize(r.awaitingGrade, "submission")} to grade`}
                </p>
              </div>

              <div className="w-full shrink-0 sm:w-40">
                <ProgressBar value={r.progressPercent} showLabel />
              </div>

              <Icon
                name="chevronRight"
                className="hidden size-4 shrink-0 text-mist-500 sm:block"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
