import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { Card, Pill } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";

export const metadata: Metadata = {
  title: "Verify a certificate",
  description:
    "Check that a Maby Academy certificate is genuine, and see what it was awarded for.",
};

async function lookup(formData: FormData) {
  "use server";
  const token = String(formData.get("token") ?? "").trim();
  // Codes are opaque tokens; anything else simply won't match.
  if (!token) redirect("/verify");
  redirect(`/verify/${encodeURIComponent(token)}`);
}

export default function VerifyIndexPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20">
      <Pill tone="gold">Public record</Pill>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight">
        Verify a certificate
      </h1>
      <p className="mt-3 text-mist-300 leading-relaxed">
        Every Maby Academy certificate carries a serial number and a
        verification code. Paste the code below to confirm it&apos;s genuine,
        who it belongs to, and what they completed to earn it.
      </p>

      <Card className="mt-8">
        <form action={lookup} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="token"
              className="block text-sm font-medium text-mist-200"
            >
              Verification code
            </label>
            <input
              id="token"
              name="token"
              required
              placeholder="Paste the code from the certificate"
              className="w-full rounded-lg bg-ink-900 border border-ink-600 px-3.5 py-2.5 text-sm text-mist-100 placeholder:text-mist-400/60 focus:border-gold-500 font-mono"
            />
          </div>

          <SubmitButton size="lg" pendingText="Checking…">
            Verify certificate
          </SubmitButton>
        </form>
      </Card>

      <p className="mt-6 text-sm text-mist-400 leading-relaxed">
        Employers and partners: a valid result confirms the holder completed
        the named course to the standard the academy requires. Revoked
        certificates are reported as revoked, never as valid.
      </p>
    </div>
  );
}
