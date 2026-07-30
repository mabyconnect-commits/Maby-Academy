import type { Metadata } from "next";
import { guardPermission } from "@/lib/auth/guard";
import { listMembers } from "@/server/services/admin";
import { Button, Card, EmptyState, Input, Pill } from "@/components/ui";
import { formatDate, initials } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Users & roles",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const actor = await guardPermission("user:view", "Users and roles");
  const params = await searchParams;
  const members = await listMembers(actor, { query: params.q });

  return (
    <div className="flex flex-col gap-4">
      <form action="/admin/users" className="flex max-w-md gap-2">
        <Input
          type="search"
          name="q"
          defaultValue={params.q ?? ""}
          placeholder="Search by name or email…"
          aria-label="Search members"
          className="flex-1"
        />
        <Button type="submit" variant="secondary">
          Search
        </Button>
      </form>

      {members.length === 0 ? (
        <EmptyState
          icon="users"
          title="No members match"
          description="Try a different name or email."
        />
      ) : (
        <Card pad="none" className="overflow-hidden">
          {members.map((m) => (
            <div
              key={m.id}
              className="flex flex-wrap items-center gap-3.5 border-b border-mist-100/5 px-3.5 py-4 last:border-b-0 sm:px-5"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-500 to-gold-600 text-xs font-extrabold text-ink-950">
                {initials(m.name)}
              </span>

              <div className="min-w-[160px] flex-1">
                <p className="text-[13px] font-bold text-mist-100">{m.name}</p>
                {/* Email is shown because staff need it to act on an account,
                    and it is already scoped behind `user:view`. */}
                <p className="mt-0.5 truncate text-[10.5px] font-medium text-mist-400">
                  {m.email}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <Pill tone={m.role === "STUDENT" ? "neutral" : "gold"}>
                  {m.role.replace(/_/g, " ").toLowerCase()}
                </Pill>
                {m.extraRoles.map((r) => (
                  <Pill key={r.role} tone="info" shape="tag">
                    {r.role.replace(/_/g, " ").toLowerCase()}
                  </Pill>
                ))}
                {!m.isActive && <Pill tone="flag">suspended</Pill>}
              </div>

              <div className="hidden text-right text-[10.5px] text-mist-400 lg:block">
                <p>{m._count.enrollments} enrolments</p>
                <p className="mt-0.5">joined {formatDate(m.createdAt)}</p>
              </div>
            </div>
          ))}
        </Card>
      )}

      <p className="text-[11px] leading-[1.6] text-mist-400/80">
        Role changes are made from the command line with{" "}
        <code className="rounded bg-ink-800 px-1.5 py-0.5 text-[10px]">
          npm run set-role
        </code>{" "}
        and are written to the audit log. There is deliberately no button here:
        granting a role is not something to do with one click in a list.
      </p>
    </div>
  );
}
