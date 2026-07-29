import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/session";
import { getMyCertificates, verifyUrl } from "@/server/services/certificates";
import { Card, EmptyState, LinkButton } from "@/components/ui";
import { Certificate } from "@/components/Certificate";
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
        <div className="space-y-8">
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
                  <LinkButton href={`/verify/${cert.verifyToken}`}>
                    View public record
                  </LinkButton>
                  <CopyButton value={url} label="Copy verify link" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
