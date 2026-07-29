import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/session";
import { findReferrerByCode } from "@/server/services/referrals";
import { RegisterForm } from "./RegisterForm";

export const metadata: Metadata = { title: "Create your account" };

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  const { ref } = await searchParams;
  const referrer = ref ? await findReferrerByCode(ref) : null;

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">
        Create your account
      </h1>
      <p className="mt-2 text-sm text-mist-400">
        Free to join. Start with a free course today.
      </p>

      {referrer?.isActive && (
        <div className="mt-5 rounded-lg border border-growth-600/40 bg-growth-500/10 px-4 py-3 text-sm text-growth-400">
          <strong className="font-semibold">{referrer.name}</strong> invited you
          to Maby Academy. Their code is applied.
        </div>
      )}

      <RegisterForm defaultReferralCode={referrer?.isActive ? ref : ""} />

      <p className="mt-6 text-sm text-mist-400 text-center">
        Already a member?{" "}
        <Link href="/login" className="text-gold-400 hover:text-gold-300">
          Sign in
        </Link>
      </p>
    </div>
  );
}
