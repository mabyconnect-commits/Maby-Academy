import type { Metadata } from "next";
import { guardPermission } from "@/lib/auth/guard";
import { listAuditLog } from "@/server/services/admin";
import { Card, EmptyState, Pill } from "@/components/ui";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Audit log",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function AdminAuditPage() {
  const actor = await guardPermission("audit:view", "The audit log");
  const entries = await listAuditLog(actor);

  if (entries.length === 0) {
    return (
      <EmptyState
        icon="scroll"
        title="Nothing logged yet"
        description="Privileged actions write here in the same transaction that performs them, so the log cannot drift from what actually happened."
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs leading-[1.65] text-mist-400">
        Append-only. Every privileged action writes a row inside the same
        transaction that performs it — there is no edit or delete, for anyone.
      </p>

      <Card pad="none" className="overflow-hidden">
        {entries.map((e) => (
          <div
            key={e.id}
            className="flex flex-wrap items-center gap-3 border-b border-mist-100/5 px-3.5 py-3.5 last:border-b-0 sm:px-5"
          >
            <Pill tone="neutral" shape="tag" className="shrink-0">
              {e.action}
            </Pill>
            <div className="min-w-[160px] flex-1">
              <p className="text-[11.5px] font-semibold text-mist-200">
                {e.user?.name ?? "System"}
                {e.user && (
                  <span className="font-normal text-mist-400">
                    {" "}
                    · {e.user.role.replace(/_/g, " ").toLowerCase()}
                  </span>
                )}
              </p>
              {e.entityType && (
                <p className="mt-0.5 text-[10px] text-mist-400">
                  {e.entityType}
                  {e.entityId && ` ${e.entityId.slice(-8)}`}
                </p>
              )}
            </div>
            <span className="shrink-0 text-[10.5px] text-mist-400 tabular-nums">
              {formatDate(e.createdAt, true)}
            </span>
          </div>
        ))}
      </Card>
    </div>
  );
}
