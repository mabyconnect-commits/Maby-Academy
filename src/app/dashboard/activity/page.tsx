import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/session";
import { getActivityFeed } from "@/server/services/activity";
import { Card, EmptyState } from "@/components/ui";

export const metadata: Metadata = { title: "Activity" };
export const dynamic = "force-dynamic";

function timeAgo(date: Date): string {
  const secs = Math.max(0, Math.round((Date.now() - date.getTime()) / 1000));
  if (secs < 60) return "just now";
  const mins = Math.round(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

export default async function ActivityPage() {
  await requireUser();
  const items = await getActivityFeed(60);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Activity</h1>
        <p className="mt-1.5 text-sm text-mist-400">
          What&apos;s happening across the academy — new members, and everyone
          earning their certificates. You&apos;re next.
        </p>
      </header>

      {items.length === 0 ? (
        <EmptyState
          icon="spark"
          title="Nothing here yet"
          description="As members join and complete courses, it shows up here. Be the one who sets it off."
        />
      ) : (
        <Card className="p-0">
          <ul className="divide-y divide-rule">
            {items.map((item) => (
              <li key={item.id} className="flex items-start gap-3 px-4 py-3.5">
                <span className="mt-0.5 shrink-0 text-lg" aria-hidden>
                  {item.kind === "certificate" ? "🎓" : "👋"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-mist-200">
                    <span className="font-semibold text-mist-100">
                      {item.name}
                    </span>{" "}
                    {item.kind === "certificate" ? (
                      <>
                        earned a certificate in{" "}
                        <span className="text-gold-300">{item.courseTitle}</span>
                      </>
                    ) : (
                      "joined the academy"
                    )}
                  </p>
                  <p className="mt-0.5 text-xs text-mist-400">
                    {timeAgo(item.at)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
