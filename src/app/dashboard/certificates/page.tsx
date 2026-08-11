import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/session";
import {
  getMyCertificates,
  getPendingCertificates,
  verifyUrl,
} from "@/server/services/certificates";
import { buttonClass, Card, EmptyState, LinkButton, Pill } from "@/components/ui";
import { Certificate } from "@/components/Certificate";
import { pluralize } from "@/lib/utils";
import { CopyButton } from "@/components/CopyButton";

export const metadata: Metadata = { title: "Certificates" };
export const dynamic = "force-dynamic";

export default async function CertificatesPage() {
  const user = await requireUser();
  const [certificates, pending] = await Promise.all([
    getMyCertificates(user.id),
    getPendingCertificates(user.id),
  ]);

  const nothingYet = certificates.length === 0 && pending.length === 0;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Certificates</h1>
        <p className="mt-1.5 text-sm text-mist-400">
          Every certificate carries a serial number and a public verification
          link — share it with anyone who needs proof.
        </p>
      </header>

      {nothingYet ? (
        <EmptyState
          icon="award"
          title="No certificates yet"
          description="Finish a course and pass its graded work — your certificate is then issued automatically, carrying your grade."
          action={<LinkButton href="/dashboard/courses">See my courses</LinkButton>}
        />
      ) : (
        <div className="space-y-8">
          {/* Pending — the learner has done the work, a tutor is grading it. */}
          {pending.map((p) => (
            <Card key={p.courseId} variant="inset">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="eyebrow flex items-center gap-1.5">
                    <span aria-hidden>{p.category.iconEmoji ?? "📘"}</span>
                    {p.category.name}
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-mist-100">
                    {p.title}
                  </h2>
                </div>
                <Pill tone="gold">Grading in progress</Pill>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-mist-400">
                You&apos;ve submitted your work — {pluralize(p.awaitingCount, "piece")}{" "}
                {p.awaitingCount === 1 ? "is" : "are"} with your tutor. Your
                certificate is issued automatically the moment it&apos;s graded
                and you pass, and your grade is printed on it.
              </p>
              <div className="mt-4">
                <LinkButton href={`/courses/${p.slug}`} variant="secondary" size="sm">
                  Back to the course
                </LinkButton>
              </div>
            </Card>
          ))}

          {/* Issued certificates. */}
          {certificates.map((cert) => {
            const url = verifyUrl(cert.verifyToken);

            return (
              <div key={cert.id}>
                <Certificate
                  recipientName={user.name}
                  courseTitle={cert.course.title}
                  issuedAt={cert.issuedAt}
                  serial={cert.serial}
                  finalScore={cert.finalScore}
                />

                <div className="mt-4 flex flex-wrap gap-3">
                  <LinkButton
                    href={`/verify/${cert.verifyToken}?print=1`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ⬇ Download certificate
                  </LinkButton>
                  <a
                    href={`/verify/${cert.verifyToken}/image`}
                    download={`maby-certificate-${cert.serial}.png`}
                    className={buttonClass("secondary")}
                  >
                    🖼 Download as image
                  </a>
                  <LinkButton
                    href={`/verify/${cert.verifyToken}`}
                    variant="secondary"
                  >
                    View public record
                  </LinkButton>
                  <CopyButton value={url} label="Copy verify link" />
                </div>
                <p className="mt-2 text-xs text-mist-400">
                  PDF opens a clean copy and your save dialog. Image gives you
                  the certificate on its own — perfect for sharing.
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
