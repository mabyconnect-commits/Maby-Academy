import Link from "next/link";
import type { Metadata } from "next";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export const metadata: Metadata = { title: "Reset your password" };

export default function ForgotPasswordPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">
        Reset your password
      </h1>
      <p className="mt-2 text-sm text-mist-400">
        Enter your email and we&apos;ll send you a link to set a new one.
      </p>

      <ForgotPasswordForm />

      <p className="mt-6 text-sm text-mist-400 text-center">
        Remembered it?{" "}
        <Link href="/login" className="text-gold-400 hover:text-gold-300">
          Sign in
        </Link>
      </p>
    </div>
  );
}
