"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { markNotificationsReadAction } from "@/server/actions/learning";

const TYPE_ICONS: Record<string, string> = {
  SYSTEM: "📣",
  COURSE: "📚",
  ASSIGNMENT: "✍",
  GRADE: "📊",
  CERTIFICATE: "🎓",
  LIVE_SESSION: "🔴",
  REFERRAL: "🤝",
  REWARD: "⚡",
};

export type BellNotification = {
  id: string;
  type: string;
  title: string;
  body: string;
  linkUrl: string | null;
  readAt: Date | string | null;
  createdAt: Date | string;
};

function timeAgo(date: Date | string): string {
  const then = new Date(date).getTime();
  const secs = Math.max(0, Math.round((Date.now() - then) / 1000));
  if (secs < 60) return "just now";
  const mins = Math.round(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString();
}

/**
 * The top-bar bell: an unread count, and a dropdown of the latest updates so a
 * member sees what's new without leaving the page they're on. The full history
 * still lives at /dashboard/notifications.
 */
export function NotificationBell({
  notifications,
  unread,
}: {
  notifications: BellNotification[];
  unread: number;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={unread > 0 ? `Notifications (${unread} unread)` : "Notifications"}
        aria-expanded={open}
        className="relative rounded-full p-2 text-mist-400 transition-colors hover:bg-ink-800 hover:text-mist-100"
      >
        <Icon name="bell" size={17} />
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-ink-950">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-[var(--radius-card)] border border-rule-strong bg-ink-900 shadow-xl">
          <div className="flex items-center justify-between border-b border-rule px-4 py-3">
            <p className="text-sm font-semibold text-mist-100">Notifications</p>
            {unread > 0 && (
              <form action={markNotificationsReadAction}>
                <button
                  type="submit"
                  className="text-xs font-semibold text-gold-400 hover:text-gold-300"
                >
                  Mark all read
                </button>
              </form>
            )}
          </div>

          {notifications.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-mist-400">
              Nothing new yet.
            </p>
          ) : (
            <ul className="max-h-[60vh] divide-y divide-rule overflow-y-auto">
              {notifications.map((n) => {
                const unreadItem = !n.readAt;
                const body = (
                  <div
                    className={`flex gap-3 px-4 py-3 transition-colors hover:bg-ink-800 ${
                      unreadItem ? "bg-gold-500/5" : ""
                    }`}
                  >
                    <span className="shrink-0 text-base" aria-hidden>
                      {TYPE_ICONS[n.type] ?? "📣"}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-semibold text-mist-100">
                        {n.title}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-mist-400">
                        {n.body}
                      </p>
                      <p className="mt-1 text-[10.5px] text-mist-500">
                        {timeAgo(n.createdAt)}
                      </p>
                    </div>
                    {unreadItem && (
                      <span
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold-500"
                        aria-label="Unread"
                      />
                    )}
                  </div>
                );
                return (
                  <li key={n.id}>
                    {n.linkUrl ? (
                      <Link href={n.linkUrl} onClick={() => setOpen(false)}>
                        {body}
                      </Link>
                    ) : (
                      body
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          <Link
            href="/dashboard/notifications"
            onClick={() => setOpen(false)}
            className="block border-t border-rule px-4 py-3 text-center text-xs font-semibold text-gold-400 hover:bg-ink-800 hover:text-gold-300"
          >
            See all notifications
          </Link>
        </div>
      )}
    </div>
  );
}
