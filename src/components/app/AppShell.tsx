import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { AppChrome } from "./AppChrome";
import { WORKSPACE_ROOT, type Workspace } from "./nav-config";

/**
 * The authenticated shell, shared by all four workspaces.
 *
 * One component rather than four layouts: the sidebar, mobile bar and header
 * are identical in structure across Learn, Teach, Mentor and Admin — only the
 * nav declaration changes. Duplicating the chrome per workspace is how the
 * mobile bar and sidebar drifted apart the first time.
 *
 * This wrapper's own job is the guard. The chrome itself lives in `AppChrome`
 * so the public site layout can render it for a signed-in visitor without
 * inheriting the redirect, which would lock anonymous people out of the
 * marketing pages.
 */
export async function AppShell({
  workspace,
  children,
}: {
  workspace: Workspace;
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${WORKSPACE_ROOT[workspace]}`);

  return (
    <AppChrome workspace={workspace} user={user}>
      {children}
    </AppChrome>
  );
}
