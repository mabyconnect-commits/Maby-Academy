import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { countUnread } from "@/server/services/notifications";
import { permissionsFor } from "@/lib/auth/permissions";
import { levelFor } from "@/lib/levels";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { AppHeader } from "./AppHeader";
import {
  NAV,
  WORKSPACE_REQUIRES,
  WORKSPACE_ROOT,
  type NavItem,
  type NavSection,
  type Workspace,
} from "./nav-config";

/**
 * The authenticated shell, shared by all four workspaces.
 *
 * One component rather than four layouts: the sidebar, mobile bar and header
 * are identical in structure across Learn, Teach, Mentor and Admin — only the
 * nav declaration changes. Duplicating the chrome per workspace is how the
 * mobile bar and sidebar drifted apart the first time.
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

  const granted = new Set(permissionsFor([user.role, ...user.extraRoles]));

  /** Drop rows the member has no capability for, then empty sections. */
  const visible = (sections: NavSection[]): NavSection[] =>
    sections
      .map((s) => ({
        ...s,
        items: s.items.filter((i) => !i.requires || granted.has(i.requires)),
      }))
      .filter((s) => s.items.length > 0);

  const sections = visible(NAV[workspace]);

  /**
   * A workspace is offered only when the member holds one of its unlocking
   * capabilities — not merely when some row survives filtering, which offered
   * Teach to everyone because its Overview row is ungated.
   */
  const workspaces = (Object.keys(NAV) as Workspace[]).filter((w) => {
    const needs = WORKSPACE_REQUIRES[w];
    return needs.length === 0 || needs.some((p) => granted.has(p));
  });

  const unread = await countUnread(user.id);

  const mobileItems: NavItem[] = sections
    .flatMap((s) => s.items)
    .filter((i) => i.mobileOrder !== undefined)
    .sort((a, b) => a.mobileOrder! - b.mobileOrder!);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        workspace={workspace}
        sections={sections}
        unread={unread}
        workspaces={workspaces}
        user={{
          name: user.name,
          roleLabel: user.role.replace(/_/g, " ").toLowerCase(),
        }}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader
          workspace={workspace}
          streak={user.currentStreak}
          points={user.lifetimePoints}
          level={levelFor(user.lifetimePoints).number}
          showPills={workspace === "learn"}
        />
        {/* Bottom padding clears the mobile bar so the last card on a page is
            never trapped underneath it. */}
        <main
          id="main"
          className="min-w-0 flex-1 px-4 py-5 pb-28 sm:px-6 lg:px-8 lg:py-6 lg:pb-8"
        >
          {children}
        </main>
      </div>

      <MobileNav items={mobileItems} unread={unread} />
    </div>
  );
}
