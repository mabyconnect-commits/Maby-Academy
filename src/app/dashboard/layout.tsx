import { redirect } from "next/navigation";
import { getCurrentUser, isStaff } from "@/lib/auth/session";
import { countUnread } from "@/server/services/notifications";
import { DashboardNav } from "@/components/DashboardNav";
import { Logo } from "@/components/Brand";
import { Avatar, Pill } from "@/components/ui";
import { logoutAction } from "@/server/actions/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/dashboard");

  const unread = await countUnread(user.id);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-ink-800 bg-ink-950/85 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-4">
          <Logo size="sm" />

          <div className="flex items-center gap-3">
            <Pill tone="gold">⚡ {user.pointsBalance.toLocaleString()} pts</Pill>
            {user.currentStreak > 0 && (
              <Pill tone="growth">🔥 {user.currentStreak}d</Pill>
            )}
            <div className="flex items-center gap-2.5">
              <Avatar name={user.name} src={user.avatarUrl} size={32} />
              <div className="hidden sm:block leading-tight">
                <p className="text-sm text-mist-100">{user.name}</p>
                <p className="text-[11px] text-mist-400 capitalize">
                  {user.role.toLowerCase()}
                </p>
              </div>
            </div>
            <form action={logoutAction}>
              <button
                type="submit"
                className="text-sm text-mist-400 hover:text-mist-100 px-2 py-1 rounded"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 grid lg:grid-cols-[220px_1fr] gap-8 items-start">
        <DashboardNav unread={unread} showStaffLink={isStaff(user.role)} />
        <main id="main" className="min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
