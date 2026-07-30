import Link from "next/link";
import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/session";
import { getReviewQueue } from "@/server/services/editorial";
import { actorCan } from "@/server/services/policy";
import { redirect } from "next/navigation";
import {
  Avatar,
  Card,
  EmptyState,
  LinkButton,
  Pill,
  StatusPill,
} from "@/components/ui";
import { formatDate, pluralize } from "@/lib/utils";
import { ReviewDecision } from "./ReviewDecision";

export const metadata: Metadata = { title: "Review queue" };
export const dynamic = "force-dynamic";

export default async function ReviewQueuePage() {
  const user = await requireUser();
  const actor = { id: user.id, role: user.role, extraRoles: user.extraRoles };

  if (!actorCan(actor, "course:approve")) redirect("/admin");

  const queue = await getReviewQueue(actor);
  const canPublish = actorCan(actor, "course:publish");

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Review queue</h1>
        <p className="mt-1.5 text-sm text-mist-400">
          Courses awaiting editorial approval, oldest first. Your own courses
          are excluded — an author cannot approve their own work.
        </p>
      </header>

      {queue.length === 0 ? (
        <EmptyState
          icon="check"
          title="Nothing waiting on review"
          description="Every submitted course has been reviewed. Instructors will appear here when they submit new material."
          action={<LinkButton href="/admin">Back to overview</LinkButton>}
        />
      ) : (
        <div className="space-y-4">
          {queue.map((course) => (
            <Card key={course.id}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusPill status={course.status} />
                    <Pill tone="neutral">
                      {course.category.iconEmoji} {course.category.name}
                    </Pill>
                    <StatusPill status={course.level} />
                  </div>

                  <h2 className="mt-3 font-semibold text-mist-100">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="hover:text-gold-300"
                    >
                      {course.title}
                    </Link>
                  </h2>
                  {course.subtitle && (
                    <p className="mt-1.5 text-sm text-mist-400 leading-relaxed">
                      {course.subtitle}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-mist-400">
                    <span className="flex items-center gap-2">
                      <Avatar
                        name={course.instructor.name}
                        src={course.instructor.avatarUrl}
                        size={20}
                      />
                      {course.instructor.name}
                    </span>
                    <span>{pluralize(course._count.modules, "module")}</span>
                    {course.submittedForReviewAt && (
                      <span>
                        Submitted {formatDate(course.submittedForReviewAt, true)}
                      </span>
                    )}
                  </div>

                  {course.reviewNotes && (
                    <p className="mt-3 rounded-lg border border-ink-700 bg-ink-900 px-3.5 py-2.5 text-sm text-mist-300">
                      <span className="text-mist-400">Author&apos;s note: </span>
                      {course.reviewNotes}
                    </p>
                  )}
                </div>

                <div className="w-full lg:w-80 shrink-0">
                  <ReviewDecision courseId={course.id} canPublish={canPublish} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <h2 className="text-sm font-semibold text-mist-100">
          How the gate works
        </h2>
        <p className="mt-2 text-sm text-mist-400 leading-relaxed">
          Approval and publication are separate powers. Approving confirms the
          material meets the academy&apos;s standard; publishing decides when it
          goes live. An instructor can submit but never approve, and nobody can
          approve their own course — that separation is the only thing making
          the review meaningful.
        </p>
      </Card>
    </div>
  );
}
