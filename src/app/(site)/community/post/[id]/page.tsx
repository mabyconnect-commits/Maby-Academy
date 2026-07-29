import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/session";
import { getPost } from "@/server/services/community";
import { actorCan } from "@/server/services/policy";
import { Avatar, Card, LinkButton, Pill } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import { CommentForm, PostControls, ReportButton } from "./PostControls";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await getPost(id, null);
  return {
    title: data?.post.title ?? "Post",
    description: data?.post.body.slice(0, 150),
  };
}

const ROLE_BADGES: Record<string, string> = {
  ADMIN: "Staff",
  SUPER_ADMIN: "Staff",
  INSTRUCTOR: "Instructor",
  MENTOR: "Mentor",
  MODERATOR: "Moderator",
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  const actor = user
    ? { id: user.id, role: user.role, extraRoles: user.extraRoles }
    : null;

  const data = await getPost(id, actor);
  if (!data) notFound();

  const { post, comments } = data;
  const path = `/community/post/${post.id}`;
  const isAuthor = actor?.id === post.authorId;
  const canModerate = actor ? actorCan(actor, "report:review") : false;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <nav className="text-sm text-mist-400 mb-6" aria-label="Breadcrumb">
        <Link
          href={`/community/${post.community.slug}`}
          className="hover:text-mist-200"
        >
          ← {post.community.name}
        </Link>
      </nav>

      <article className="surface p-6">
        <div className="flex flex-wrap items-center gap-2">
          {post.isPinned && <Pill tone="gold">📌 Pinned</Pill>}
          <Pill tone="neutral">{post.type.toLowerCase()}</Pill>
          {post.isLocked && <Pill tone="flag">Locked</Pill>}
          {post.status === "FLAGGED" && (
            <Pill tone="flag">Reported — under review</Pill>
          )}
        </div>

        {post.title && (
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">
            {post.title}
          </h1>
        )}

        <div className="mt-4 flex items-center gap-3">
          <Avatar name={post.author.name} src={post.author.avatarUrl} size={36} />
          <div>
            <p className="text-sm text-mist-100 flex items-center gap-2">
              {post.author.name}
              {ROLE_BADGES[post.author.role] && (
                <Pill tone="gold">{ROLE_BADGES[post.author.role]}</Pill>
              )}
            </p>
            <p className="text-xs text-mist-400">
              {formatDate(post.createdAt, true)}
            </p>
          </div>
        </div>

        <div className="mt-5 prose-lesson text-sm">
          {post.body.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {post.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Pill key={tag} tone="neutral">
                #{tag}
              </Pill>
            ))}
          </div>
        )}

        {actor && (
          <div className="mt-6 pt-4 border-t border-ink-700">
            <PostControls
              postId={post.id}
              path={path}
              slug={post.community.slug}
              reactionCount={post.reactionCount}
              hasReacted={
                "reactions" in post && Array.isArray(post.reactions)
                  ? post.reactions.length > 0
                  : false
              }
              isAuthor={isAuthor}
              canModerate={canModerate}
              isPinned={post.isPinned}
              isLocked={post.isLocked}
            />
          </div>
        )}
      </article>

      {/* Comments -------------------------------------------------------- */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-mist-100">
          {post.commentCount === 0
            ? "No replies yet"
            : `${post.commentCount} ${post.commentCount === 1 ? "reply" : "replies"}`}
        </h2>

        <div className="mt-4 space-y-3">
          {comments.map((comment) => (
            <Card key={comment.id}>
              <div className="flex items-start gap-3">
                <Avatar
                  name={comment.author.name}
                  src={comment.author.avatarUrl}
                  size={30}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-mist-100 flex flex-wrap items-center gap-2">
                    {comment.author.name}
                    {ROLE_BADGES[comment.author.role] && (
                      <Pill tone="gold">{ROLE_BADGES[comment.author.role]}</Pill>
                    )}
                    <span className="text-xs text-mist-400">
                      {formatDate(comment.createdAt, true)}
                    </span>
                  </p>
                  <p className="mt-1.5 text-sm text-mist-300 leading-relaxed whitespace-pre-wrap">
                    {comment.body}
                  </p>

                  {actor && (
                    <div className="mt-2.5 flex items-center gap-3">
                      <ReportButton commentId={comment.id} />
                    </div>
                  )}

                  {comment.replies.length > 0 && (
                    <div className="mt-4 space-y-3 pl-4 border-l border-ink-700">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start gap-2.5">
                          <Avatar
                            name={reply.author.name}
                            src={reply.author.avatarUrl}
                            size={24}
                          />
                          <div className="min-w-0">
                            <p className="text-xs text-mist-100">
                              {reply.author.name}
                              <span className="ml-2 text-mist-400">
                                {formatDate(reply.createdAt)}
                              </span>
                            </p>
                            <p className="mt-1 text-sm text-mist-300 leading-relaxed whitespace-pre-wrap">
                              {reply.body}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {actor && !post.isLocked && (
                    <div className="mt-3">
                      <CommentForm
                        postId={post.id}
                        parentId={comment.id}
                        compact
                      />
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          {!actor ? (
            <Card>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-mist-300">Sign in to reply.</p>
                <LinkButton href={`/login?next=${path}`}>Sign in</LinkButton>
              </div>
            </Card>
          ) : post.isLocked ? (
            <Card>
              <p className="text-sm text-mist-400">
                This thread is locked. No new replies.
              </p>
            </Card>
          ) : (
            <CommentForm postId={post.id} />
          )}
        </div>
      </section>
    </div>
  );
}
