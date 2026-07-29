import Link from "next/link";
import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { getGradingQueue } from "@/server/services/assessment";
import { Avatar, EmptyState, LinkButton, StatusPill } from "@/components/ui";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Grading queue" };
export const dynamic = "force-dynamic";

export default async function GradingQueuePage() {
  const staff = await requireRole("INSTRUCTOR", "ADMIN");
  const queue = await getGradingQueue({ id: staff.id, role: staff.role });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Grading queue</h1>
        <p className="mt-1.5 text-sm text-mist-400">
          Oldest first — students are waiting. {queue.length} submission
          {queue.length === 1 ? "" : "s"} to review.
        </p>
      </header>

      {queue.length === 0 ? (
        <EmptyState
          icon="✅"
          title="Queue is empty"
          description="Every submission has been graded. Good work."
          action={<LinkButton href="/admin">Back to overview</LinkButton>}
        />
      ) : (
        <div className="space-y-2.5">
          {queue.map((s) => (
            <Link
              key={s.id}
              href={`/admin/grading/${s.id}`}
              className="surface p-4 flex flex-wrap items-center gap-4 hover:border-gold-600/50 transition-colors"
            >
              <Avatar name={s.student.name} src={s.student.avatarUrl} size={40} />

              <div className="flex-1 min-w-[200px]">
                <p className="font-medium text-mist-100">
                  {s.assignment.title}
                </p>
                <p className="mt-1 text-xs text-mist-400">
                  {s.student.name} ·{" "}
                  {s.assignment.lesson.module.course.title} · attempt{" "}
                  {s.attempt}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-mist-400">
                  {s.submittedAt
                    ? `Submitted ${formatDate(s.submittedAt, true)}`
                    : "Not submitted"}
                </span>
                <StatusPill status={s.status} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
