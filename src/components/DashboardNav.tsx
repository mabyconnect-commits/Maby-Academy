"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * `inTabBar` marks destinations the mobile bottom bar already covers. Those
 * are hidden from this scroller on phones so the two navigations don't
 * present the same links twice — everything else stays reachable here.
 */
const ITEMS = [
  { href: "/dashboard", label: "Overview", icon: "◈", exact: true, inTabBar: true },
  { href: "/dashboard/courses", label: "My courses", icon: "📚", inTabBar: true },
  { href: "/dashboard/assignments", label: "Assignments", icon: "✍", inTabBar: true },
  { href: "/dashboard/live", label: "Live sessions", icon: "🔴" },
  { href: "/dashboard/growth", label: "Growth", icon: "🌱" },
  { href: "/dashboard/journal", label: "Journal", icon: "📓" },
  { href: "/dashboard/certificates", label: "Certificates", icon: "🎓", inTabBar: true },
  { href: "/dashboard/rewards", label: "Rewards", icon: "⚡" },
  { href: "/dashboard/referrals", label: "Referrals", icon: "🤝", inTabBar: true },
  { href: "/dashboard/notifications", label: "Notifications", icon: "🔔", badge: true },
  { href: "/dashboard/settings", label: "Settings", icon: "⚙" },
];

export function DashboardNav({
  unread,
  showStaffLink,
}: {
  unread: number;
  showStaffLink: boolean;
}) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Dashboard"
      className="lg:sticky lg:top-24 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0"
    >
      {ITEMS.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "items-center gap-2.5 rounded-[9px] px-3 py-2 text-sm whitespace-nowrap transition-colors",
              item.inTabBar ? "hidden lg:flex" : "flex",
              active
                ? "bg-ink-800 text-mist-100 font-medium"
                : "text-mist-400 hover:text-mist-100 hover:bg-ink-850",
            )}
          >
            <span className="w-4 text-center shrink-0" aria-hidden>
              {item.icon}
            </span>
            {item.label}
            {item.badge && unread > 0 && (
              <span className="ml-auto rounded-full bg-gold-500 text-ink-950 text-[11px] font-semibold px-1.5 min-w-5 text-center">
                {unread > 99 ? "99+" : unread}
              </span>
            )}
          </Link>
        );
      })}

      {showStaffLink && (
        <>
          <div className="hidden lg:block h-px bg-ink-800 my-2" />
          <Link
            href="/admin"
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm whitespace-nowrap transition-colors",
              pathname.startsWith("/admin")
                ? "bg-ink-800 text-gold-300 font-medium"
                : "text-gold-400/80 hover:text-gold-300 hover:bg-ink-850",
            )}
          >
            <span className="w-4 text-center shrink-0" aria-hidden>
              🛠
            </span>
            Instructor tools
          </Link>
        </>
      )}
    </nav>
  );
}
