import type { Metadata } from "next";
import { guardPermission } from "@/lib/auth/guard";
import { getGradingQueue } from "@/server/services/assessment";
import { listScopedCourses } from "@/server/services/roster";
import { GradingQueueList } from "@/components/GradingQueueList";
import { GradingQueueFilters } from "@/components/GradingQueueFilters";

export const metadata: Metadata = { title: "Grading queue" };
export const dynamic = "force-dynamic";

export default async function GradingQueuePage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string; q?: string }>;
}) {
  // Permission, not a role list. `requireRole("INSTRUCTOR", "ADMIN")` locked
  // SUPER_ADMIN out of the queue entirely — the one role that is meant to see
  // all of it.
  const staff = await guardPermission("submission:grade", "The grading queue");
  const params = await searchParams;

  const [queue, courses] = await Promise.all([
    getGradingQueue(
      { id: staff.id, role: staff.role },
      { courseId: params.course, query: params.q },
    ),
    listScopedCourses(staff),
  ]);

  return (
    <div className="flex min-w-0 flex-col gap-5">
      <GradingQueueFilters
        action="/admin/grading"
        courses={courses}
        selectedCourse={params.course}
        query={params.q}
      />
      <GradingQueueList queue={queue} emptyHref="/admin" />
    </div>
  );
}
