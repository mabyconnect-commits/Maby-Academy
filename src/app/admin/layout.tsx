import { redirect } from "next/navigation";
import { getCurrentUser, isStaff } from "@/lib/auth/session";
import { AppShell } from "@/components/app/AppShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/admin");
  // Students have no business here even with a direct link. This is a
  // convenience redirect, not the guard — every page and action underneath
  // still checks its own permission server-side.
  if (!isStaff(user.role)) redirect("/dashboard");

  return <AppShell workspace="admin">{children}</AppShell>;
}
