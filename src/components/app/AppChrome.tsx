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
  type NavItem,
  type NavSection,
  type Workspace,
} from "./nav-config";

type User = NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>;

/**
 * The authenticated chrome: sidebar, sticky header and mobile tab bar.
 *
 * Separated from `AppShell` because two different callers need it under two
 * different rules. `AppShell` demands a session and redirects without one;
 * the public site layout renders this only when a session happens to exist,
 * and the marketing chrome otherwise. Sharing the markup is what keeps a
 * signed-in student's navigation identical on a lesson page and on their
 * dashboard — which it was not when each route group owned its own chrome.
 */
export async function AppChrome({
  workspace,
  user,
  padded = true,
  children,
}: {
  workspace: Workspace;
  user: User;
  /**
   * Whether `main` supplies the page gutter. False for the public site, whose
   * pages each carry their own `mx-auto max-w-* px-4` wrapper — padding here
   * as well would inset them twice.
   */
  padded?: boolean;
  children: React.ReactNode;
}) {
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
          user={{
            name: user.name,
            roleLabel: user.role.replace(/_/g, " ").toLowerCase(),
            avatarUrl: user.avatarUrl,
          }}
        />
        {/* Bottom padding clears the mobile bar so the last card on a page is
            never trapped underneath it. Unpadded pages still need it, so it
            stays outside the `padded` branch. */}
        <main
          id="main"
          className={
            padded
              ? "min-w-0 flex-1 px-4 py-5 pb-28 sm:px-6 lg:px-8 lg:py-6 lg:pb-8"
              : "min-w-0 flex-1 pb-24 lg:pb-0"
          }
        >
          {children}
        </main>
      </div>

      <MobileNav items={mobileItems} unread={unread} />
    </div>
  );
}
