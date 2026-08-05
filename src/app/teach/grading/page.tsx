import type { Metadata } from "next";
import { guardPermission } from "@/lib/auth/guard";
import { getGradingQueue } from "@/server/services/assessment";
import { listScopedCourses } from "@/server/services/roster";
import { GradingQueueList } from "@/components/GradingQueueList";
import { GradingQueueFilters } from "@/components/GradingQueueFilters";

export const metadata: Metadata = { title: "Grading queue" };
export const dynamic = "force-dynamic";

/**
 * The instructor's own queue. Same component and same service as the admin
 * view — the service scopes rows to courses this grader owns, so an instructor
 * sees only their own students without the page needing to know that.
 */
export default async function TeachGradingPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string; q?: string }>;
}) {
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
        action="/teach/grading"
        courses={courses}
        selectedCourse={params.course}
        query={params.q}
      />
      <GradingQueueList queue={queue} emptyHref="/teach" />
    </div>
  );
}
