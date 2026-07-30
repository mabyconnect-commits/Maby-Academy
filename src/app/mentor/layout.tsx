import { redirect } from "next/navigation";
import { can, getCurrentUser } from "@/lib/auth/session";
import { AppShell } from "@/components/app/AppShell";

export default async function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/mentor");
  if (!can(user, "mentee:view_progress")) redirect("/dashboard");

  return <AppShell workspace="mentor">{children}</AppShell>;
}
