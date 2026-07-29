"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * Bottom tab bar, phone only.
 *
 * The academy's audience is overwhelmingly mobile, and a sidebar that
 * collapses into a horizontal scroller buries everything past the third item.
 * Five destinations is the ceiling — beyond that the targets get too narrow
 * to hit reliably, so anything else lives behind "More" in the sidebar.
 */
const TABS = [
  { href: "/dashboard", label: "Home", exact: true, icon: HomeIcon },
  { href: "/dashboard/courses", label: "Courses", icon: BookIcon },
  { href: "/dashboard/assignments", label: "Tasks", icon: TaskIcon },
  { href: "/dashboard/certificates", label: "Certs", icon: StarIcon },
  { href: "/dashboard/referrals", label: "Refer", icon: ShareIcon },
];

export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "lg:hidden fixed bottom-0 inset-x-0 z-40",
        "border-t border-ink-700 bg-ink-950/95 backdrop-blur-md",
        // Clears the home indicator on iOS.
        "pb-[env(safe-area-inset-bottom)]",
      )}
    >
      <ul className="grid grid-cols-5">
        {TABS.map((tab) => {
          const active = tab.exact
            ? pathname === tab.href
            : pathname.startsWith(tab.href);
          const Icon = tab.icon;

          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-2.5 transition-colors",
                  active ? "text-gold-500" : "text-mist-400",
                )}
              >
                <span
                  className={cn(
                    "grid place-items-center h-8 w-14 rounded-[9px] transition-colors",
                    active && "bg-gold-500/12",
                  )}
                >
                  <Icon />
                </span>
                <span className="text-[11px] font-semibold leading-none">
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* Line icons at a consistent 1.6 stroke — heavier reads as clip-art at this
   size, lighter disappears on a dark background. */

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden {...strokeProps}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V20h13V9.5" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden {...strokeProps}>
      <rect x="3.5" y="4.5" width="17" height="12" rx="1.5" />
      <path d="M8 20h8" />
    </svg>
  );
}

function TaskIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden {...strokeProps}>
      <rect x="5.5" y="3.5" width="13" height="17" rx="1.8" />
      <path d="M9 8.5h6M9 12h6M9 15.5h3.5" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden {...strokeProps}>
      <path d="m12 3.8 2.5 5.2 5.7.8-4.1 4 1 5.7L12 16.8l-5.1 2.7 1-5.7-4.1-4 5.7-.8z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden {...strokeProps}>
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="6" cy="18" r="2.2" />
      <circle cx="18" cy="18" r="2.2" />
      <path d="M12 7.2v3.3M10.4 12.6 7.4 15.9M13.6 12.6l3 3.3" />
    </svg>
  );
}
