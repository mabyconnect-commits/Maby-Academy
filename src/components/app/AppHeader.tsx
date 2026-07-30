"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/Icon";
import { LogoMark } from "@/components/Brand";
import { StreakPill, XpPill } from "@/components/ui";
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
}: {
  workspace: Workspace;
  streak: number;
  points: number;
  level: number;
  /** Only the learner workspace carries progress pills. */
  showPills: boolean;
}) {
  const pathname = usePathname();
  const title = titleFor(workspace, pathname);

  return (
    <header className="sticky top-0 z-[5] flex flex-wrap items-center justify-between gap-2.5 border-b border-rule bg-ink-950/92 px-4 py-3.5 backdrop-blur-lg sm:px-6 lg:px-8 lg:py-[18px]">
      <div className="flex min-w-0 items-center gap-3">
        {/* The mark stands in for the sidebar logo on phones, where the
            sidebar isn't rendered at all. */}
        <Link href="/" className="lg:hidden" aria-label="Maby Academy home">
          <LogoMark size={24} className="text-mist-100" />
        </Link>
        <h1 className="truncate text-base font-extrabold text-mist-100 lg:text-lg">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {showPills && (
          <>
            <StreakPill days={streak} />
            <XpPill points={points} level={level} />
          </>
        )}
        <Link
          href="/dashboard/search"
          aria-label="Search"
          className="rounded-full p-2 text-mist-400 transition-colors hover:bg-ink-800 hover:text-mist-100"
        >
          <Icon name="search" size={17} />
        </Link>
      </div>
    </header>
  );
}
