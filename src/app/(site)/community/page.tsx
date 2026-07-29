import Link from "next/link";
import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/session";
import { listCommunities } from "@/server/services/community";
import { Card, EmptyState, LinkButton, Pill } from "@/components/ui";
import { pluralize } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Where Maby Academy members ask real questions, answer them properly, and hold each other to the work.",
};
export const dynamic = "force-dynamic";

type CommunityRow = Awaited<ReturnType<typeof listCommunities>>[number] & {
  members?: { id: string; role: string }[];
};

export default async function CommunityIndexPage() {
  const user = await getCurrentUser();
  const communities = (await listCommunities(user?.id)) as CommunityRow[];

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <header>
        <Pill tone="gold">The community</Pill>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight">
          Learn in public.
        </h1>
        <p className="mt-3 text-mist-300 leading-relaxed max-w-2xl">
          Ask real questions. Answer them properly. Nobody here will ever ask
          for your seed phrase, and anyone who does is not from this academy.
        </p>
      </header>

      {!user && (
        <Card className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-mist-300">
              Join the academy to post and reply.
            </p>
            <LinkButton href="/register">Create an account</LinkButton>
          </div>
        </Card>
      )}

      <div className="mt-8 space-y-3">
        {communities.length === 0 ? (
          <EmptyState
            icon="💬"
            title="No communities yet"
            description="Rooms will appear here as the academy opens them."
          />
        ) : (
          communities.map((c) => {
            const joined = (c.members?.length ?? 0) > 0;
            return (
              <Link
                key={c.id}
                href={`/community/${c.slug}`}
                className="surface p-5 block hover:border-gold-600/50 transition-colors"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-semibold text-mist-100">{c.name}</h2>
                      {joined && <Pill tone="growth">Joined</Pill>}
                      <Pill tone="neutral">{c.scope.toLowerCase()}</Pill>
                    </div>
                    {c.description && (
                      <p className="mt-1.5 text-sm text-mist-400 leading-relaxed">
                        {c.description}
                      </p>
                    )}
                  </div>
                  <div className="text-right text-xs text-mist-400 shrink-0">
                    <p>{pluralize(c._count.members, "member")}</p>
                    <p className="mt-0.5">{pluralize(c._count.posts, "post")}</p>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>

      <Card className="mt-8">
        <h2 className="text-sm font-semibold text-mist-100">Before you post</h2>
        <ul className="mt-3 space-y-2 text-sm text-mist-400">
          <li>• Be useful or be quiet. A confident wrong answer costs someone money here.</li>
          <li>• Never post or request a seed phrase or private key. Ever.</li>
          <li>• No shilling, no price calls, no referral links in posts.</li>
          <li>• If you hold a position in what you&apos;re discussing, say so.</li>
        </ul>
        <Link
          href="/legal/community-guidelines"
          className="mt-4 inline-block text-sm text-gold-400 hover:text-gold-300"
        >
          Read the full guidelines →
        </Link>
      </Card>
    </div>
  );
}
