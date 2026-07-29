import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/session";
import { getMyCertificates, verifyUrl } from "@/server/services/certificates";
import { Card, EmptyState, LinkButton, Pill } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import { CopyButton } from "@/components/CopyButton";

export const metadata: Metadata = { title: "Certificates" };
export const dynamic = "force-dynamic";

export default async function CertificatesPage() {
  const user = await requireUser();
  const certificates = await getMyCertificates(user.id);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Certificates</h1>
        <p className="mt-1.5 text-sm text-mist-400">
          Every certificate carries a serial number and a public verification
          link — share it with anyone who needs proof.
        </p>
      </header>

      {certificates.length === 0 ? (
        <EmptyState
          icon="🎓"
          title="No certificates yet"
          description="Complete a course past its pass threshold and your certificate is issued automatically."
          action={<LinkButton href="/dashboard/courses">See my courses</LinkButton>}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {certificates.map((cert) => {
            const url = verifyUrl(cert.verifyToken);

            return (
              <Card
                key={cert.id}
                className="relative overflow-hidden border-gold-600/30"
              >
                <div
                  className="absolute inset-0 opacity-[0.05] pointer-events-none text-[10rem] leading-none font-black text-gold-500 select-none"
                  aria-hidden
                >
                  M
                </div>

                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <Pill tone="gold">
                      {cert.course.category.iconEmoji}{" "}
                      {cert.course.category.name}
                    </Pill>
                    <span className="text-2xl" aria-hidden>
                      🎓
                    </span>
                  </div>

                  <h2 className="mt-4 font-semibold text-mist-100 leading-snug">
                    {cert.course.title}
                  </h2>
                  <p className="mt-1.5 text-xs text-mist-400">
                    Awarded to {user.name} · {formatDate(cert.issuedAt)}
                    {cert.finalScore != null && ` · ${cert.finalScore}%`}
                  </p>

                  <p className="mt-4 font-mono text-xs text-gold-400">
                    {cert.serial}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <LinkButton
                      href={`/verify/${cert.verifyToken}`}
                      variant="secondary"
                      size="sm"
                    >
                      View public record
                    </LinkButton>
                    <CopyButton value={url} label="Copy verify link" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
