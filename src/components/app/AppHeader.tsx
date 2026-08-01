"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/Icon";
import { LogoMark } from "@/components/Brand";
import { StreakPill, XpPill } from "@/components/ui";
import { AccountMenu } from "./AccountMenu";
import { NotificationBell, type BellNotification } from "./NotificationBell";
import { titleFor, type Workspace } from "./nav-config";

/**
 * The sticky content header: the current page's title on the left, the
 * streak and XP pills on the right.
 *
 * The title is derived from the route rather than passed down by each page, so
 * a new page cannot ship with the previous page's heading — a mismatch nobody
 * notices in review but every user sees.
 */
export function AppHeader({
  workspace,
  streak,
  points,
  level,
  showPills,
  user,
  notifications,
  unread,
}: {
  workspace: Workspace;
  streak: number;
  points: number;
  level: number;
  /** Only the learner workspace carries progress pills. */
  showPills: boolean;
  user: { name: string; roleLabel: string; avatarUrl: string | null };
  notifications: BellNotification[];
  unread: number;
}) {
  const pathname = usePathname();
  const title = titleFor(workspace, pathname);

  return (
    <header className="sticky top-0 z-[5] flex items-center justify-between gap-2.5 border-b border-rule bg-ink-950/92 px-4 py-3.5 backdrop-blur-lg sm:px-6 lg:px-8 lg:py-[18px]">
      <div className="flex min-w-0 items-center gap-3">
        {/* The mark stands in for the sidebar logo on phones, where the
            sidebar isn't rendered at all. */}
        <Link
          href="/"
          className="-m-1.5 p-1.5 lg:hidden"
          aria-label="Maby Academy home"
        >
          <LogoMark size={24} className="text-mist-100" />
        </Link>
        <h1 className="min-w-0 truncate text-base font-extrabold text-mist-100 lg:text-lg">
          {title}
        </h1>
      </div>

      {/* shrink-0 so the icons never compress or wrap; the title truncates
          instead. The progress pills are the widest items and the least
          essential in the bar (they headline the Rewards page), so they drop
          away on the narrowest screens to keep the icons evenly spaced. */}
      <div className="flex shrink-0 items-center gap-2">
        {showPills && (
          <div className="hidden items-center gap-2 min-[420px]:flex">
            <StreakPill days={streak} />
            <XpPill points={points} level={level} />
          </div>
        )}
        <Link
          href="/dashboard/search"
          aria-label="Search"
          className="rounded-full p-2 text-mist-400 transition-colors hover:bg-ink-800 hover:text-mist-100"
        >
          <Icon name="search" size={17} />
        </Link>
        <NotificationBell notifications={notifications} unread={unread} />
        {/* Phones only — on desktop the account row lives in the sidebar
            footer. Without this there was no way to sign out on mobile. */}
        <AccountMenu
          name={user.name}
          roleLabel={user.roleLabel}
          avatarUrl={user.avatarUrl}
        />
      </div>
    </header>
  );
}
