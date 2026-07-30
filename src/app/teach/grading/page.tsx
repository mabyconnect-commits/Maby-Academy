import type { Metadata } from "next";
import { guardPermission } from "@/lib/auth/guard";
import { getGradingQueue } from "@/server/services/assessment";
import { GradingQueueList } from "@/components/GradingQueueList";

export const metadata: Metadata = { title: "Grading queue" };
export const dynamic = "force-dynamic";

/**
 * The instructor's own queue. Same component and same service as the admin
 * view — the service scopes rows to courses this grader owns, so an instructor
 * sees only their own students without the page needing to know that.
 */
export default async function TeachGradingPage() {
  const staff = await guardPermission("submission:grade", "The grading queue");
  const queue = await getGradingQueue({ id: staff.id, role: staff.role });

  return <GradingQueueList queue={queue} emptyHref="/teach" />;
}
