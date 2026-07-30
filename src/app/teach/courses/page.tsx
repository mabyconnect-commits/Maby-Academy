import Link from "next/link";
import type { Metadata } from "next";
import { guardPermission } from "@/lib/auth/guard";
import { listAuthoredCourses } from "@/server/services/authoring";
import {
  Card,
  EmptyState,
  LinkButton,
  Pill,
  ProgressBar,
  StatusPill,
} from "@/components/ui";
import { formatDate, formatMoney, pluralize } from "@/lib/utils";

export const metadata: Metadata = { title: "Course builder" };
export const dynamic = "force-dynamic";

export default async function TeachCoursesPage() {
  const user = await guardPermission("course:create", "The course builder");
  const courses = await listAuthoredCourses(user);

  if (courses.length === 0) {
    return (
      <EmptyState
        icon="book"
        title="No courses yet"
        description="Courses are created by an administrator and then assigned to you to build. Ask for one and it will appear here ready for modules and lessons."
        action={<LinkButton href="/dashboard/support">Request a course</LinkButton>}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs leading-[1.65] text-mist-400">
        Structural edits — adding, removing or reordering lessons — are only
        possible while a course is a draft or has changes requested. A published
        course has students part-way through it, and moving lessons under them
        would break their progress.
      </p>

      <div className="grid gap-4 lg:grid-cols-2">
        {courses.map((c) => (
          <Card key={c.id} pad="wide">
            <div className="flex flex-wrap items-start justify-between gap-2.5">
              <div className="min-w-0">
                <p className="eyebrow">{c.category.name}</p>
                <h2 className="mt-2 text-[15px] leading-[1.3] font-bold text-mist-100">
                  {c.title}
                </h2>
              </div>
              <StatusPill status={c.status} />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] font-medium text-mist-400">
              <span>{pluralize(c.moduleCount, "module")}</span>
              <span aria-hidden>·</span>
              <span>{pluralize(c.enrolledCount, "student")}</span>
              {c.avgRating != null && (
                <>
                  <span aria-hidden>·</span>
                  <span className="text-gold-500">★ {c.avgRating}</span>
                </>
              )}
              <span aria-hidden>·</span>
              <span>
                {c.priceMinor === 0 ? "Free" : formatMoney(c.priceMinor, c.currency)}
              </span>
            </div>

            {c.enrolledCount > 0 && (
              <div className="mt-3.5">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-[0.12em] text-mist-400 uppercase">
                    Average completion
                  </span>
                  <span className="text-[11px] font-bold text-gold-500 tabular-nums">
                    {c.avgCompletion}%
                  </span>
                </div>
                <ProgressBar value={c.avgCompletion} />
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-2.5 border-t border-rule pt-4">
              <LinkButton href={`/teach/courses/${c.id}`} size="sm">
                Open builder
              </LinkButton>
              <Link
                href={`/courses/${c.slug}`}
                className="text-[11px] font-semibold text-mist-400 hover:text-mist-200"
              >
                Preview as student →
              </Link>
              <span className="ml-auto text-[10px] text-mist-400/70">
                {formatDate(c.updatedAt)}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
