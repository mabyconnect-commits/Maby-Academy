import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Logo } from "@/components/Brand";
import { getCurrentUser } from "@/lib/auth/session";
import { isAdminClaimEnabled } from "@/server/services/bootstrap";
import { ClaimAdminForm } from "./ClaimAdminForm";

export const metadata: Metadata = {
  title: "Claim admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/**
 * A no-database, no-terminal way to create the first real admin: the owner
 * sets ADMIN_BOOTSTRAP_SECRET on the deployment, logs in, and proves they hold
 * it here. Deliberately standalone (no app chrome) and noindexed.
 */
export default async function ClaimAdminPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/setup/admin");

  const enabled = isAdminClaimEnabled();
  const alreadyAdmin = user.role === "ADMIN" || user.role === "SUPER_ADMIN";

  return (
    <main id="main" className="min-h-screen px-5 py-16">
      <div className="mx-auto max-w-xl">
        <Logo />

        <h1 className="mt-10 text-3xl font-semibold tracking-tight text-mist-100">
          Become an admin
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-mist-400">
          Signed in as <span className="text-mist-200">{user.email}</span>. This
          promotes this account so the Admin and Teach areas — users, grading,
          content review, live sessions — become available.
        </p>

        {alreadyAdmin ? (
          <div className="mt-6 rounded-lg border border-growth-500/40 bg-growth-500/10 px-4 py-4 text-sm text-growth-400">
            <p className="font-semibold">You already have admin access.</p>
            <p className="mt-1.5 text-mist-300">
              <Link href="/admin" className="text-gold-400 hover:text-gold-300">
                Open the Admin area →
              </Link>
            </p>
          </div>
        ) : enabled ? (
          <>
            <ClaimAdminForm />
            <p className="mt-8 border-t border-ink-800 pt-5 text-xs leading-relaxed text-mist-400">
              Once you have your admin account, remove{" "}
              <code className="text-gold-400">ADMIN_BOOTSTRAP_SECRET</code> from
              the deployment and redeploy — this page then turns itself off.
              From then on you add other staff from{" "}
              <span className="text-mist-300">Admin → Users &amp; roles</span>.
            </p>
          </>
        ) : (
          <div className="mt-6 rounded-lg border border-gold-600/40 bg-gold-500/10 px-4 py-4 text-sm text-gold-300">
            <p className="font-semibold">This page is turned off.</p>
            <div className="mt-2 space-y-2 text-mist-300">
              <p>To use it once, on your hosting (e.g. Vercel):</p>
              <ol className="list-decimal space-y-1 pl-5">
                <li>
                  Add an environment variable{" "}
                  <code className="text-gold-400">ADMIN_BOOTSTRAP_SECRET</code>{" "}
                  set to any long, private phrase (16+ characters).
                </li>
                <li>Redeploy so the new variable takes effect.</li>
                <li>Come back to this page and enter that phrase.</li>
              </ol>
              <p>
                Remove the variable afterwards to switch this off again. Nothing
                here touches a terminal or the database.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
