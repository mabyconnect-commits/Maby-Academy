"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { logoutAction } from "@/server/actions/auth";
import { cn, initials } from "@/lib/utils";

/**
 * The account menu in the header.
 *
 * This exists because sign-out was previously only in the desktop sidebar
 * footer, which is `hidden lg:flex` — so on a phone there was no way to sign out
 * at all. Authentication must never be a one-way door on any screen size, so the
 * control now lives in the header, which is rendered at every width.
 */
export function AccountMenu({
  name,
  roleLabel,
  avatarUrl,
}: {
  name: string;
  roleLabel: string;
  avatarUrl: string | null;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click and on Escape — a menu you cannot dismiss without
  // navigating is worse than no menu.
  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Account menu"
        className="grid size-8 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-gold-500 to-gold-600 text-[11px] font-extrabold text-ink-950"
      >
        {avatarUrl ? (
          // Avatars are arbitrary remote URLs; next/image would need every host
          // whitelisted, so a plain img is the pragmatic choice.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatarUrl} alt="" className="size-8 object-cover" />
        ) : (
          initials(name)
        )}
      </button>

      {open && (
        <div
          role="menu"
          className={cn(
            "surface-raised absolute right-0 z-50 mt-2 w-56 overflow-hidden p-0",
          )}
        >
          <div className="border-b border-rule px-4 py-3">
            <p className="truncate text-xs font-bold text-mist-100">{name}</p>
            <p className="mt-0.5 truncate text-[10px] font-medium text-gold-500">
              {roleLabel}
            </p>
          </div>

          <Link
            href="/dashboard/settings"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-3 text-xs font-semibold text-mist-200 hover:bg-mist-100/5"
          >
            <Icon name="settings" size={15} />
            Settings
          </Link>

          <Link
            href="/dashboard/support"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-3 text-xs font-semibold text-mist-200 hover:bg-mist-100/5"
          >
            <Icon name="lifebuoy" size={15} />
            Support
          </Link>

          {/* A form, not a link: a GET must never end a session, or a prefetch
              could sign someone out. */}
          <form action={logoutAction} className="border-t border-rule">
            <button
              type="submit"
              role="menuitem"
              className="flex w-full items-center gap-2.5 px-4 py-3 text-xs font-semibold text-flag-500 hover:bg-flag-500/8"
            >
              <Icon name="logout" size={15} />
              Sign out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
