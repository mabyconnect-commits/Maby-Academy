"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/Icon";
import { LogoMark } from "@/components/Brand";
import { logoutAction } from "@/server/actions/auth";
import { cn } from "@/lib/utils";
import {
  NAV,
  WORKSPACE_LABELS,
  WORKSPACE_ROOT,
  isActive,
  type NavSection,
  type Workspace,
} from "./nav-config";

/**
 * The desktop sidebar: a 230px panel that owns the full height of the viewport
 * and scrolls its own nav list, so the workspace switcher and the account row
 * stay pinned at the bottom no matter how long the page is.
 */
export function Sidebar({
  workspace,
  sections,
  unread,
  workspaces,
  user,
}: {
  workspace: Workspace;
  sections: NavSection[];
  unread: number;
  workspaces: Workspace[];
  user: { name: string; roleLabel: string };
}) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-[230px] shrink-0 flex-col border-r border-rule bg-ink-870 lg:flex">
      <Link
        href="/"
        className="flex items-center gap-2.5 px-5 pt-[22px] pb-5"
        aria-label="Maby Academy home"
      >
        <LogoMark size={26} className="text-mist-100" />
        <span className="text-xs font-extrabold tracking-[0.16em] text-mist-100 uppercase">
          Maby <span className="text-gold-500">Academy</span>
        </span>
      </Link>

      {/* min-h-0 is what lets this actually scroll inside a flex column —
          without it the list grows and pushes the footer off-screen. */}
      <nav
        aria-label={`${WORKSPACE_LABELS[workspace]} navigation`}
        className="flex min-h-0 flex-1 flex-col gap-px overflow-y-auto px-3 py-2"
      >
        {sections.map((section, i) => (
          <div key={section.heading ?? `group-${i}`} className="contents">
            {section.heading && (
              <p className="nav-heading px-3 pt-4 pb-[7px]">{section.heading}</p>
            )}
            {section.items.map((item) => {
              const active = isActive(item, pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-[11px] rounded-[var(--radius-control)] px-3 py-[9.5px] text-xs leading-[1.3] font-semibold transition-colors",
                    active
                      ? "bg-gold-500/12 text-gold-500"
                      : "text-mist-100/65 hover:bg-mist-100/5 hover:text-mist-100",
                  )}
                >
                  <Icon name={item.icon} size={16} />
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  {item.badge && unread > 0 && (
                    <span className="min-w-[18px] rounded-full bg-gold-500 px-1 text-center text-[10px] font-bold text-ink-950 tabular-nums">
                      {unread > 99 ? "99+" : unread}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="border-t border-rule p-3">
        {/*
          The design shows a "VIEWING AS" role switcher here. In the prototype
          it was a demo device that could impersonate any role; here it only
          lists workspaces the signed-in user genuinely holds, and it is hidden
          entirely for the common case of a member with one role. Switching
          navigates — it never changes who you are, so nothing about it can
          escalate a permission.
        */}
        {workspaces.length > 1 && (
          <>
            <p className="nav-heading mt-1 mb-2 px-1">Workspace</p>
            <div className="mb-3.5 flex gap-1">
              {workspaces.map((w) => {
                const active = w === workspace;
                return (
                  <Link
                    key={w}
                    href={WORKSPACE_ROOT[w]}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "flex-1 rounded-[var(--radius-btn)] py-[7px] text-center text-[9px] font-bold tracking-[0.04em] uppercase transition-colors",
                      active
                        ? "bg-gold-500/15 text-gold-500"
                        : "text-mist-100/45 hover:bg-mist-100/6 hover:text-mist-100",
                    )}
                  >
                    {WORKSPACE_LABELS[w]}
                  </Link>
                );
              })}
            </div>
          </>
        )}

        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard/settings"
            className="flex min-w-0 flex-1 items-center gap-2.5"
          >
            <span className="grid size-[34px] shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-500 to-gold-600 text-[13px] font-extrabold text-ink-950">
              {user.name.trim().charAt(0).toUpperCase()}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-bold text-mist-100">
                {user.name}
              </span>
              <span className="mt-[3px] block truncate text-[10px] font-medium text-gold-500">
                {user.roleLabel}
              </span>
            </span>
          </Link>
          {/* A server action, not a link: a GET must never end a session, or
              any prefetch or image tag could sign a member out. */}
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded p-1 text-mist-100/40 transition-colors hover:text-flag-500"
              aria-label="Sign out"
            >
              <Icon name="logout" size={16} strokeWidth={2} />
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
