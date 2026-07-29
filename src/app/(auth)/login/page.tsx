import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/session";
import { Alert } from "@/components/ui";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; reset?: string; changed?: string }>;
}) {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  const params = await searchParams;

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
      <p className="mt-2 text-sm text-mist-400">
        Pick up where you left off.
      </p>

      {params.reset && (
        <div className="mt-5">
          <Alert tone="success">
            Password reset. Sign in with your new password.
          </Alert>
        </div>
      )}
      {params.changed && (
        <div className="mt-5">
          <Alert tone="success">
            Password changed. For your security, we signed you out everywhere —
            sign in again.
          </Alert>
        </div>
      )}

      <LoginForm next={params.next} />

      <p className="mt-6 text-sm text-mist-400 text-center">
        New here?{" "}
        <Link href="/register" className="text-gold-400 hover:text-gold-300">
          Create an account
        </Link>
      </p>
    </div>
  );
}
