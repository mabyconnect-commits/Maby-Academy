import Link from "next/link";
import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/session";
import { countUnread, listNotifications } from "@/server/services/notifications";
import { Card, EmptyState, Pill } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { markNotificationsReadAction } from "@/server/actions/learning";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Notifications" };
export const dynamic = "force-dynamic";

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

export default async function NotificationsPage() {
  const user = await requireUser();
  const [notifications, unread] = await Promise.all([
    listNotifications(user.id, 50),
    countUnread(user.id),
  ]);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Notifications
          </h1>
          <p className="mt-1.5 text-sm text-mist-400">
            {unread > 0 ? `${unread} unread` : "You're all caught up."}
          </p>
        </div>

        {unread > 0 && (
          <form action={markNotificationsReadAction}>
            <SubmitButton variant="secondary" size="sm" pendingText="Marking…">
              Mark all read
            </SubmitButton>
          </form>
        )}
      </header>

      {notifications.length === 0 ? (
        <EmptyState
          icon="bell"
          title="Nothing here yet"
          description="Grades, certificates, live sessions and referral activity all land here."
        />
      ) : (
        <div className="space-y-2.5">
          {notifications.map((n) => {
            const body = (
              <div
                className={`surface p-4 flex gap-3.5 ${
                  n.readAt ? "" : "border-gold-600/30 bg-gold-500/[0.03]"
                } ${n.linkUrl ? "hover:border-ink-500 transition-colors" : ""}`}
              >
                <span className="text-lg shrink-0" aria-hidden>
                  {TYPE_ICONS[n.type] ?? "•"}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-sm font-medium text-mist-100">
                      {n.title}
                    </h2>
                    {!n.readAt && <Pill tone="gold">New</Pill>}
                  </div>
                  <p className="mt-1 text-sm text-mist-400 leading-relaxed">
                    {n.body}
                  </p>
                  <p className="mt-2 text-xs text-mist-400">
                    {formatDate(n.createdAt, true)}
                  </p>
                </div>
              </div>
            );

            return n.linkUrl ? (
              <Link key={n.id} href={n.linkUrl} className="block">
                {body}
              </Link>
            ) : (
              <div key={n.id}>{body}</div>
            );
          })}
        </div>
      )}
    </div>
  );
}
