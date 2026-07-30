import type { Metadata } from "next";
import { guardPermission } from "@/lib/auth/guard";
import { getGradingQueue } from "@/server/services/assessment";
import { GradingQueueList } from "@/components/GradingQueueList";

export const metadata: Metadata = { title: "Grading queue" };
export const dynamic = "force-dynamic";

export default async function GradingQueuePage() {
  // Permission, not a role list. `requireRole("INSTRUCTOR", "ADMIN")` locked
  // SUPER_ADMIN out of the queue entirely — the one role that is meant to see
  // all of it.
  const staff = await guardPermission("submission:grade", "The grading queue");
  const queue = await getGradingQueue({ id: staff.id, role: staff.role });

  return <GradingQueueList queue={queue} emptyHref="/admin" />;
}
