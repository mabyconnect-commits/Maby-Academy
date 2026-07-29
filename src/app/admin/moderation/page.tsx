import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth/session";
import { getModerationQueue } from "@/server/services/community";
import { actorCan } from "@/server/services/policy";
import { Avatar, Card, EmptyState, LinkButton, Pill } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import { ResolveReport } from "./ResolveReport";

export const metadata: Metadata = { title: "Moderation" };
export const dynamic = "force-dynamic";

export default async function ModerationPage() {
  const user = await requireUser();
  const actor = { id: user.id, role: user.role, extraRoles: user.extraRoles };

  if (!actorCan(actor, "report:review")) redirect("/admin");

  const reports = await getModerationQueue(actor);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Moderation</h1>
        <p className="mt-1.5 text-sm text-mist-400">
          Reported content, oldest first. Reported items are flagged but stay
          visible — one report should never let a person silence another.
        </p>
      </header>

      {reports.length === 0 ? (
        <EmptyState
          icon="🛡"
          title="Nothing reported"
          description="The community is behaving. Reports appear here the moment a member flags something."
          action={<LinkButton href="/admin">Back to overview</LinkButton>}
        />
      ) : (
        <div className="space-y-4">
          {reports.map((report) => {
            const target = report.post ?? report.comment;
            const isPost = Boolean(report.post);
            const link = report.post
              ? `/community/post/${report.post.id}`
              : report.comment
                ? `/community/post/${report.comment.post.id}`
                : "#";

            return (
              <Card key={report.id}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Pill tone="flag">{report.reason}</Pill>
                      <Pill tone="neutral">{isPost ? "Post" : "Comment"}</Pill>
                      <span className="text-xs text-mist-400">
                        {formatDate(report.createdAt, true)}
                      </span>
                    </div>

                    {report.details && (
                      <p className="mt-2.5 text-sm text-mist-300">
                        <span className="text-mist-400">Reporter said: </span>
                        {report.details}
                      </p>
                    )}

                    <div className="mt-3 flex items-center gap-2 text-xs text-mist-400">
                      <Avatar
                        name={report.reporter.name}
                        src={report.reporter.avatarUrl}
                        size={20}
                      />
                      Reported by {report.reporter.name}
                    </div>

                    {/* The content itself, so a moderator never has to leave
                        the queue to make an obvious call. */}
                    {target && (
                      <div className="mt-4 rounded-lg border border-ink-700 bg-ink-900 p-4">
                        <p className="text-xs text-mist-400 mb-2">
                          By {target.author.name}
                          {report.post?.community &&
                            ` in ${report.post.community.name}`}
                        </p>
                        {report.post?.title && (
                          <p className="font-medium text-mist-100 mb-1.5">
                            {report.post.title}
                          </p>
                        )}
                        <p className="text-sm text-mist-300 leading-relaxed whitespace-pre-wrap line-clamp-6">
                          {target.body}
                        </p>
                        <Link
                          href={link}
                          className="mt-3 inline-block text-xs text-gold-400 hover:text-gold-300"
                        >
                          Open in context →
                        </Link>
                      </div>
                    )}
                  </div>

                  <div className="w-full lg:w-72 shrink-0">
                    <ResolveReport reportId={report.id} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
