import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { COMMUNITIES } from "@/content/communities";
import { Pill } from "@/components/ui";
import { JoinCommunitiesForm } from "./JoinCommunitiesForm";

export const metadata: Metadata = {
  title: "Join the community",
  description:
    "Free courses are unlocked by joining the Maby Academy communities and channels. Join all of them, then confirm.",
};

/**
 * The community-join gate. Reached when a member tries to enrol in a free
 * course before joining, or directly. Signed-in only, because the confirmation
 * has to attach to an account — so an anonymous visitor is sent to sign in and
 * bounced back here.
 */
export default async function JoinCommunitiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const user = await getCurrentUser();
  const sp = await searchParams;
  const slug = typeof sp.course === "string" ? sp.course : "";
  const courseId = typeof sp.courseId === "string" ? sp.courseId : "";

  if (!user) {
    const params = new URLSearchParams();
    if (slug) params.set("course", slug);
    if (courseId) params.set("courseId", courseId);
    const q = params.toString();
    redirect(`/login?next=${encodeURIComponent(`/communities/join${q ? `?${q}` : ""}`)}`);
  }

  const alreadyJoined = Boolean(user.communitiesJoinedAt);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:py-20">
      <p className="eyebrow-wide">One small step</p>
      <h1 className="mt-4 text-[32px] leading-[1.1] font-black tracking-tight text-mist-100 sm:text-[42px]">
        Join the community, learn for free
      </h1>
      <p className="mt-5 text-base leading-[1.75] text-mist-300">
        Our courses are free. The one thing we ask in return is that you join
        the community you&apos;ll be growing alongside — the WhatsApp groups and
        Telegram channels below. Join all of them, tick each box, and your free
        courses unlock.
      </p>

      {alreadyJoined && (
        <div className="mt-6">
          <Pill tone="growth">You&apos;ve already unlocked free courses</Pill>
        </div>
      )}

      <JoinCommunitiesForm
        communities={COMMUNITIES}
        slug={slug}
        courseId={courseId}
        alreadyJoined={alreadyJoined}
      />
    </div>
  );
}
