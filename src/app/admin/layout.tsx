import Link from "next/link";
import { redirect } from "next/navigation";
import { can, getCurrentUser, isStaff } from "@/lib/auth/session";
import { Logo } from "@/components/Brand";
import { Avatar, Pill } from "@/components/ui";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/admin");
  // Students have no business here even with a direct link.
  if (!isStaff(user.role)) redirect("/dashboard");

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-ink-800 bg-ink-950/85 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Logo size="sm" />
            <Pill tone="gold">Instructor tools</Pill>
          </div>

          {/* Only surface the areas this member actually has powers in. */}
          <nav
            className="flex items-center gap-4 overflow-x-auto"
            aria-label="Instructor"
          >
            <Link
              href="/admin"
              className="text-sm text-mist-300 hover:text-mist-100 whitespace-nowrap"
            >
              Overview
            </Link>
            {can(user, "submission:grade") && (
              <Link
                href="/admin/grading"
                className="text-sm text-mist-300 hover:text-mist-100 whitespace-nowrap"
              >
                Grading
              </Link>
            )}
            {can(user, "course:approve") && (
              <Link
                href="/admin/review"
                className="text-sm text-mist-300 hover:text-mist-100 whitespace-nowrap"
              >
                Review
              </Link>
            )}
            {can(user, "report:review") && (
              <Link
                href="/admin/moderation"
                className="text-sm text-mist-300 hover:text-mist-100 whitespace-nowrap"
              >
                Moderation
              </Link>
            )}
            {can(user, "commission:approve") && (
              <Link
                href="/admin/finance"
                className="text-sm text-mist-300 hover:text-mist-100 whitespace-nowrap"
              >
                Finance
              </Link>
            )}
            <Link
              href="/dashboard"
              className="text-sm text-mist-300 hover:text-mist-100 whitespace-nowrap"
            >
              My dashboard
            </Link>
            <Avatar name={user.name} src={user.avatarUrl} size={30} />
          </nav>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-7xl px-4 py-8">
        {children}
      </main>
    </div>
  );
}
