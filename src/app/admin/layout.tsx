import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser, isStaff } from "@/lib/auth/session";
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

          <nav className="flex items-center gap-4" aria-label="Instructor">
            <Link
              href="/admin"
              className="text-sm text-mist-300 hover:text-mist-100"
            >
              Overview
            </Link>
            <Link
              href="/admin/grading"
              className="text-sm text-mist-300 hover:text-mist-100"
            >
              Grading
            </Link>
            <Link
              href="/dashboard"
              className="text-sm text-mist-300 hover:text-mist-100"
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
