import Link from "next/link";
import type { Metadata } from "next";
import { Alert } from "@/components/ui";
import { ResetPasswordForm } from "./ResetPasswordForm";

export const metadata: Metadata = { title: "Choose a new password" };

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Missing reset link
        </h1>
        <div className="mt-5">
          <Alert tone="error">
            This page needs a valid reset link. Request a new one.
          </Alert>
        </div>
        <p className="mt-6 text-sm text-center">
          <Link
            href="/forgot-password"
            className="text-gold-400 hover:text-gold-300"
          >
            Request a reset link →
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">
        Choose a new password
      </h1>
      <p className="mt-2 text-sm text-mist-400">
        Setting a new password signs you out on every other device.
      </p>

      <ResetPasswordForm token={token} />
    </div>
  );
}
