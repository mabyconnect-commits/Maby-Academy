import Link from "next/link";
import type { Metadata } from "next";
import { Card, LinkButton } from "@/components/ui";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "No access",
  robots: { index: false, follow: false },
};

/**
 * The refusal page.
 *
 * A permission refusal is a normal, expected outcome — a moderator typing
 * `/admin/flags` should be told plainly that flags are super-admin only. Before
 * this page existed the thrown `AuthError` fell through to the generic error
 * boundary and rendered "Something broke on our side" with a 500, which blames
 * the platform for working correctly and invites a support ticket.
 */
export default async function ForbiddenPage({
  searchParams,
}: {
  searchParams: Promise<{ area?: string }>;
}) {
  const { area } = await searchParams;

  return (
    <main
      id="main"
      className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-4 py-16"
    >
      <Card pad="wide">
        <span className="grid size-11 place-items-center rounded-full border border-gold-500/35 bg-gold-500/10 text-gold-500">
          <Icon name="lock" size={18} strokeWidth={2} />
        </span>

        <h1 className="mt-4 text-xl font-extrabold text-mist-100">
          You don&apos;t have access to this area
        </h1>

        <p className="mt-2.5 text-[11.5px] leading-[1.7] text-mist-400">
          {area
            ? `${area} needs a capability your account doesn't hold.`
            : "This area needs a capability your account doesn't hold."}{" "}
          That is the system working as intended, not a fault — the server
          refuses on its own authority regardless of what the interface shows.
        </p>

        <p className="mt-3 text-[11.5px] leading-[1.7] text-mist-400">
          If you believe you should have access, ask an administrator rather than
          retrying. Role changes are recorded in the audit log.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <LinkButton href="/dashboard">My dashboard</LinkButton>
          <Link
            href="/dashboard/support"
            className="text-[11px] font-semibold text-mist-400 hover:text-mist-200"
          >
            Contact support →
          </Link>
        </div>
      </Card>
    </main>
  );
}
