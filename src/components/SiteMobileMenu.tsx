"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";

/**
 * The public site's mobile navigation.
 *
 * The desktop nav is `hidden md:flex`, which left phones with no navigation at
 * all on any public page — a visitor on the catalogue could reach Courses,
 * Community or Verify only via the browser's back button. Hiding navigation
 * without providing a replacement is the same mistake that left sign-out
 * unreachable on mobile, so this exists for the same reason.
 */
export function SiteMobileMenu({
  items,
  signedIn,
}: {
  items: { href: string; label: string }[];
  signedIn: boolean;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on navigation. Without this the panel stays open over the new page,
  // which reads as the tap having failed.
  useEffect(() => setOpen(false), [pathname]);

  // Lock the page behind the panel and close on Escape.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="site-mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        className="grid size-9 place-items-center rounded-lg border border-rule-strong text-mist-200 transition-colors hover:border-gold-500/60 hover:text-gold-400"
      >
        {/* Two bars to three-line hamburger, drawn inline so it can animate to
            a cross without a second icon. */}
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden
        >
          {open ? (
            <>
              <path d="M6 6 L18 18" />
              <path d="M18 6 L6 18" />
            </>
          ) : (
            <>
              <path d="M4 7 H20" />
              <path d="M4 12 H20" />
              <path d="M4 17 H20" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <>
          {/* Scrim. Tapping anywhere off the panel closes it — a menu with only
              one exit is a trap on a phone. */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-[65px] z-30 bg-ink-950/70 backdrop-blur-sm"
          />

          <nav
            id="site-mobile-nav"
            aria-label="Site"
            className="surface fixed inset-x-3 top-[70px] z-40 rounded-[var(--radius-card)] p-2 shadow-[0_30px_80px_rgb(0_0_0/0.5)]"
          >
            {items.map((item) => {
              const active =
                item.href.startsWith("/") &&
                !item.href.includes("#") &&
                (item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between rounded-[var(--radius-control)] px-4 py-3.5 text-sm font-semibold transition-colors",
                    active
                      ? "bg-gold-500/12 text-gold-500"
                      : "text-mist-200 hover:bg-mist-100/5",
                  )}
                >
                  {item.label}
                  <Icon name="chevronRight" size={14} />
                </Link>
              );
            })}

            <div className="mt-2 border-t border-rule pt-2">
              <Link
                href={signedIn ? "/dashboard" : "/login"}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-[var(--radius-control)] px-4 py-3.5 text-sm font-semibold text-mist-200 transition-colors hover:bg-mist-100/5"
              >
                {signedIn ? "My dashboard" : "Sign in"}
                <Icon name="chevronRight" size={14} />
              </Link>
              {!signedIn && (
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="mt-1 flex items-center justify-center rounded-[var(--radius-btn)] bg-gold-500 px-4 py-3.5 text-sm font-bold text-ink-950 transition-colors hover:bg-gold-400"
                >
                  Join free
                </Link>
              )}
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
