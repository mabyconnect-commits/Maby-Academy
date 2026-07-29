import type { Metadata } from "next";
import { verifyCertificate } from "@/server/services/certificates";
import { Card, LinkButton, Pill } from "@/components/ui";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Certificate verification" };
export const dynamic = "force-dynamic";

export default async function VerifyTokenPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const result = await verifyCertificate(token);

  if (result.status === "not_found") {
    return (
      <Shell>
        <div className="text-5xl mb-4" aria-hidden>
          ✕
        </div>
        <Pill tone="flag">Not found</Pill>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight">
          No certificate matches that code
        </h1>
        <p className="mt-3 text-mist-300">
          Check the code for typos. Certificate codes are case-sensitive and
          contain no spaces.
        </p>
        <LinkButton href="/verify" variant="secondary" className="mt-7">
          Try another code
        </LinkButton>
      </Shell>
    );
  }

  const { certificate } = result;
  const revoked = result.status === "revoked";

  return (
    <Shell>
      <div className="text-5xl mb-4" aria-hidden>
        {revoked ? "⚠" : "🎓"}
      </div>
      <Pill tone={revoked ? "flag" : "growth"}>
        {revoked ? "Revoked" : "Valid certificate"}
      </Pill>

      <h1 className="mt-5 text-3xl font-semibold tracking-tight">
        {certificate.user.name}
      </h1>
      <p className="mt-2 text-lg text-mist-300">
        completed <strong className="text-gold-300">{certificate.course.title}</strong>
      </p>

      {revoked && (
        <p className="mt-5 rounded-lg border border-flag-500/40 bg-flag-500/10 px-4 py-3 text-sm text-flag-400">
          This certificate was revoked on {formatDate(certificate.revokedAt!)}
          {certificate.revokeReason ? ` — ${certificate.revokeReason}` : "."} It
          should not be treated as valid.
        </p>
      )}

      <Card className="mt-8 text-left">
        <dl className="space-y-3 text-sm">
          <Row label="Serial number" value={certificate.serial} mono />
          <Row label="Issued" value={formatDate(certificate.issuedAt)} />
          <Row label="Pillar" value={certificate.course.category.name} />
          <Row
            label="Level"
            value={certificate.course.level.toLowerCase()}
            capitalize
          />
          <Row label="Instructor" value={certificate.course.instructor.name} />
          {certificate.finalScore != null && (
            <Row label="Final score" value={`${certificate.finalScore}%`} />
          )}
          {certificate.course.estimatedHours > 0 && (
            <Row
              label="Course length"
              value={`${certificate.course.estimatedHours} hours`}
            />
          )}
        </dl>
      </Card>

      <p className="mt-6 text-xs text-mist-400">
        Verified against the Maby Academy record at{" "}
        {new Date().toISOString().replace("T", " ").slice(0, 16)} UTC.
      </p>

      <LinkButton href="/courses" className="mt-7">
        Explore the curriculum
      </LinkButton>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">{children}</div>
  );
}

function Row({
  label,
  value,
  mono,
  capitalize,
}: {
  label: string;
  value: string;
  mono?: boolean;
  capitalize?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4 border-b border-ink-800 pb-3 last:border-0 last:pb-0">
      <dt className="text-mist-400">{label}</dt>
      <dd
        className={[
          "text-mist-100 text-right",
          mono ? "font-mono text-xs" : "",
          capitalize ? "capitalize" : "",
        ].join(" ")}
      >
        {value}
      </dd>
    </div>
  );
}
