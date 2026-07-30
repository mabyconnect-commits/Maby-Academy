import type { Metadata } from "next";
import { guardPermission } from "@/lib/auth/guard";
import { assessRisk, listMentees } from "@/server/services/mentorship";
import { listSharedGoalsForMentor } from "@/server/services/growth";
import {
  Card,
  EmptyState,
  PanelHead,
  Pill,
  ProgressBar,
} from "@/components/ui";
import { Icon } from "@/components/Icon";
import { cn, initials } from "@/lib/utils";

export const metadata: Metadata = { title: "Assigned students" };
export const dynamic = "force-dynamic";

const RISK_TONES = {
  ok: "growth",
  watch: "ember",
  stalled: "flag",
} as const;

export default async function MentorPage() {
  const user = await guardPermission("mentee:view_progress", "The mentor workspace");
  const [mentees, sharedGoals] = await Promise.all([
    listMentees(user.id),
    listSharedGoalsForMentor(user.id),
  ]);

  if (mentees.length === 0) {
    return (
      <EmptyState
        icon="users"
        title="No students assigned"
        description="Mentees appear here once the academy assigns them to you. You will see their course progress and any goals they choose to share — never their journals."
      />
    );
  }

  const assessed = mentees.map((a) => ({ ...a, risk: assessRisk(a.mentee) }));
  const atRisk = assessed.filter((a) => a.risk.level !== "ok");

  return (
    <div className="flex flex-col gap-5">
      {atRisk.length > 0 && (
        <div className="flex flex-wrap items-center gap-3.5 rounded-[var(--radius-tile)] border border-flag-500/28 bg-flag-500/7 p-[18px]">
          <span className="shrink-0 text-flag-500">
            <Icon name="flag" size={20} strokeWidth={2} />
          </span>
          <div className="min-w-[180px] flex-1">
            <p className="text-[13px] leading-[1.3] font-bold text-flag-500">
              {atRisk.length} {atRisk.length === 1 ? "student needs" : "students need"}{" "}
              a check-in
            </p>
            <p className="mt-1.5 text-[11.5px] leading-[1.5] font-medium text-mist-300">
              Flagged on activity alone — no lesson progress for ten days or
              more. It is a prompt to reach out, not a judgement, and it never
              looks at anything private.
            </p>
          </div>
        </div>
      )}

      <Card pad="none" className="overflow-hidden">
        {assessed.map((a) => {
          const active = a.mentee.enrollments;
          // Average across active enrolments — a mentee doing well in one
          // course and stalled in another should not read as "fine".
          const avg = active.length
            ? Math.round(
                active.reduce((s, e) => s + e.progressPercent, 0) / active.length,
              )
            : 0;

          return (
            <div
              key={a.id}
              className={cn(
                "flex flex-wrap items-center gap-3.5 border-b border-mist-100/5 px-3.5 py-4 last:border-b-0 sm:px-5",
                a.risk.level === "stalled" && "bg-flag-500/5",
              )}
            >
              <span className="grid size-[34px] shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-500 to-gold-600 text-xs font-extrabold text-ink-950">
                {initials(a.mentee.name)}
              </span>

              <div className="min-w-[130px] flex-1">
                <p className="text-[13px] leading-[1.3] font-bold text-mist-100">
                  {a.mentee.name}
                </p>
                <p className="mt-1 text-[10.5px] leading-[1.3] font-medium text-mist-400">
                  {active.length > 0
                    ? active[0].course.title
                    : "No active course"}
                  {active.length > 1 && ` +${active.length - 1} more`}
                </p>
              </div>

              <div className="w-[110px] shrink-0">
                <ProgressBar value={avg} />
                <p className="mt-1.5 text-[9.5px] font-semibold text-mist-400 tabular-nums">
                  {avg}% complete
                </p>
              </div>

              <Pill tone={RISK_TONES[a.risk.level]} className="shrink-0 px-2.5 py-1.5">
                {a.risk.reason}
              </Pill>
            </div>
          );
        })}
      </Card>

      <Card pad="wide">
        <PanelHead title="Goals shared with you" className="mb-2" />
        <p className="mb-4 text-[11.5px] leading-[1.55] text-mist-400">
          Only goals a student has explicitly chosen to share. Journals are
          never visible to any role, including yours — a mentee can grant
          journal access individually, and it appears here only if they have.
        </p>

        {sharedGoals.length === 0 ? (
          <p className="text-xs leading-[1.65] text-mist-400">
            Nothing shared yet. Sharing is entirely the student&apos;s decision,
            and asking for it is usually less effective than earning it.
          </p>
        ) : (
          <div className="flex flex-col gap-2.5">
            {sharedGoals.map((g) => (
              <div
                key={g.id}
                className="surface-inset flex flex-wrap items-center gap-3 p-3.5"
              >
                <div className="min-w-[150px] flex-1">
                  <p className="text-xs leading-[1.35] font-semibold text-mist-200">
                    {g.title}
                  </p>
                  <p className="mt-1.5 text-[10.5px] leading-[1.3] font-medium text-mist-400">
                    {g.user.name} · {g.area.replace(/_/g, " ").toLowerCase()}
                  </p>
                </div>
                <span className="shrink-0 text-[11px] font-bold text-gold-500 tabular-nums">
                  {g.progressPercent}%
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
