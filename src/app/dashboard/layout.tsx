import { AppShell } from "@/components/app/AppShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell workspace="learn">{children}</AppShell>;
}
