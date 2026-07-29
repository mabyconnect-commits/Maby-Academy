import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/session";
import { getCommunityBySlug, listPosts } from "@/server/services/community";
import {
  Avatar,
  Card,
  EmptyState,
  LinkButton,
  Pill,
} from "@/components/ui";
import { formatDate, pluralize } from "@/lib/utils";
import { PostComposer, JoinButton } from "./PostComposer";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const community = await getCommunityBySlug(slug);
  return community
    ? { title: community.name, description: community.description ?? undefined }
    : { title: "Community" };
}

const TYPE_META: Record<string, { label: string; emoji: string }> = {
  DISCUSSION: { label: "Discussion", emoji: "💬" },
  QUESTION: { label: "Question", emoji: "❓" },
  ANNOUNCEMENT: { label: "Announcement", emoji: "📣" },
  POLL: { label: "Poll", emoji: "📊" },
  RESOURCE: { label: "Resource", emoji: "🔗" },
};

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const user = await getCurrentUser();
  const community = (await getCommunityBySlug(slug, user?.id)) as
    | (Awaited<ReturnType<typeof getCommunityBySlug>> & {
        members?: { id: string; role: string }[];
      })
    | null;

  if (!community) notFound();

  const actor = user
    ? { id: user.id, role: user.role, extraRoles: user.extraRoles }
    : null;

  const posts = await listPosts({ communityId: community.id, actor });
  const isMember = (community.members?.length ?? 0) > 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <nav className="text-sm text-mist-400 mb-6" aria-label="Breadcrumb">
        <Link href="/community" className="hover:text-mist-200">
          ← All communities
        </Link>
      </nav>

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-3xl font-semibold tracking-tight">
            {community.name}
          </h1>
          {community.description && (
            <p className="mt-2 text-mist-300 leading-relaxed">
              {community.description}
            </p>
          )}
          <p className="mt-3 text-xs text-mist-400">
            {pluralize(community._count.members, "member")} ·{" "}
            {pluralize(community._count.posts, "post")}
          </p>
        </div>

        {user && (
          <JoinButton
            communityId={community.id}
            slug={community.slug}
            isMember={isMember}
          />
        )}
      </header>

      {community.guidelines && (
        <Card variant="gold" className="mt-6">
          <p className="text-xs uppercase tracking-wide text-mist-400">
            House rules
          </p>
          <p className="mt-1.5 text-sm text-mist-300 leading-relaxed">
            {community.guidelines}
          </p>
        </Card>
      )}

      {/* Composer -------------------------------------------------------- */}
      <div className="mt-8">
        {!user ? (
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-mist-300">
                Sign in to join the conversation.
              </p>
              <LinkButton href={`/login?next=/community/${slug}`}>
                Sign in
              </LinkButton>
            </div>
          </Card>
        ) : isMember ? (
          <PostComposer communityId={community.id} slug={community.slug} />
        ) : (
          <Card>
            <p className="text-sm text-mist-300">
              Join this community to post and reply.
            </p>
          </Card>
        )}
      </div>

      {/* Posts ----------------------------------------------------------- */}
      <div className="mt-8 space-y-3">
        {posts.length === 0 ? (
          <EmptyState
            icon="💬"
            title="No posts yet"
            description="Be the first. Introduce yourself, or ask the thing you're actually stuck on."
          />
        ) : (
          posts.map((post) => {
            const meta = TYPE_META[post.type] ?? {
              label: post.type,
              emoji: "•",
            };
            return (
              <Link
                key={post.id}
                href={`/community/post/${post.id}`}
                className="surface p-5 block hover:border-ink-500 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-2">
                  {post.isPinned && <Pill tone="gold">📌 Pinned</Pill>}
                  <Pill tone="neutral">
                    {meta.emoji} {meta.label}
                  </Pill>
                  {post.isLocked && <Pill tone="flag">Locked</Pill>}
                  {post.status === "FLAGGED" && (
                    <Pill tone="flag">Reported — under review</Pill>
                  )}
                </div>

                {post.title && (
                  <h2 className="mt-3 font-semibold text-mist-100">
                    {post.title}
                  </h2>
                )}
                <p className="mt-1.5 text-sm text-mist-400 leading-relaxed line-clamp-3">
                  {post.body}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-mist-400">
                  <span className="flex items-center gap-2">
                    <Avatar
                      name={post.author.name}
                      src={post.author.avatarUrl}
                      size={20}
                    />
                    {post.author.name}
                  </span>
                  <span>{formatDate(post.createdAt)}</span>
                  <span>💬 {post.commentCount}</span>
                  <span>♡ {post.reactionCount}</span>
                  {post.tags.length > 0 && (
                    <span className="text-gold-400">
                      {post.tags.map((t) => `#${t}`).join(" ")}
                    </span>
                  )}
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
