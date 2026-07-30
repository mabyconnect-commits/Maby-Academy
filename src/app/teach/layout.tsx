import { redirect } from "next/navigation";
import { can, getCurrentUser } from "@/lib/auth/session";
import { AppShell } from "@/components/app/AppShell";

export default async function TeachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/teach");
  // Convenience redirect only — each page and action underneath still checks
  // its own permission, and every course query is scoped to the author.
  if (!can(user, "course:create")) redirect("/dashboard");

  return <AppShell workspace="teach">{children}</AppShell>;
}
