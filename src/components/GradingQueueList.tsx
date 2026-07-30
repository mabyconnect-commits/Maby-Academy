import Link from "next/link";
import { Avatar, EmptyState, LinkButton, Pill, StatusPill } from "@/components/ui";
import { formatDate, pluralize } from "@/lib/utils";
import type { getGradingQueue } from "@/server/services/assessment";

type Queue = Awaited<ReturnType<typeof getGradingQueue>>;

/**
 * The grading queue list.
 *
 * Shared by the instructor and admin workspaces so both render the same rows —
 * the queue's *contents* already differ per grader (the service scopes it to
 * courses they own unless they are an administrator), and duplicating the
 * presentation would have meant one of the two copies quietly drifting.
 */
export function GradingQueueList({
  queue,
  emptyHref,
}: {
  queue: Queue;
  emptyHref: string;
}) {
  if (queue.length === 0) {
    return (
      <EmptyState
        icon="check"
        title="Queue is empty"
        description="Every submission has been graded. Feedback that arrives quickly is worth far more than feedback that arrives complete."
        action={<LinkButton href={emptyHref}>Back to overview</LinkButton>}
      />
    );
  }

  const now = Date.now();

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-xs leading-[1.6] text-mist-400">
        Oldest first — {pluralize(queue.length, "submission")} waiting.
      </p>

      {queue.map((s) => {
        // Days waiting, shown on the row rather than only in aggregate: a
        // number next to a name is what actually prompts someone to open it.
        const waitingDays = s.submittedAt
          ? Math.floor((now - s.submittedAt.getTime()) / 86_400_000)
          : null;

        return (
          <Link
            key={s.id}
            href={`/admin/grading/${s.id}`}
            className="surface flex flex-wrap items-center gap-4 p-4 transition-colors hover:border-gold-500/50"
          >
            <Avatar name={s.student.name} src={s.student.avatarUrl} size={40} />

            <div className="min-w-[200px] flex-1">
              <p className="text-[13px] font-bold text-mist-100">
                {s.assignment.title}
              </p>
              <p className="mt-1 text-[10.5px] font-medium text-mist-400">
                {s.student.name} · {s.assignment.lesson.module.course.title} ·
                attempt {s.attempt}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              {waitingDays !== null && waitingDays >= 3 && (
                <Pill tone={waitingDays >= 7 ? "flag" : "ember"}>
                  {waitingDays}d wait
                </Pill>
              )}
              <span className="hidden text-[10.5px] text-mist-400 sm:block">
                {s.submittedAt
                  ? formatDate(s.submittedAt, true)
                  : "Not submitted"}
              </span>
              <StatusPill status={s.status} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
