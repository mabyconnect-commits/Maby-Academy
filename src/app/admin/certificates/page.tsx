import Link from "next/link";
import type { Metadata } from "next";
import { guardPermission } from "@/lib/auth/guard";
import { listCertificates } from "@/server/services/admin";
import { Card, EmptyState, Pill, StatTile } from "@/components/ui";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Certificates",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function AdminCertificatesPage() {
  const actor = await guardPermission("certificate:issue_manual", "Certificate administration");
  const certificates = await listCertificates(actor);

  if (certificates.length === 0) {
    return (
      <EmptyState
        icon="award"
        title="No certificates issued"
        description="Certificates issue automatically when a student passes a course's completion threshold."
      />
    );
  }

  const revoked = certificates.filter((c) => c.revokedAt);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
        <StatTile label="Issued" value={certificates.length} tone="growth" />
        <StatTile
          label="Revoked"
          value={revoked.length}
          tone={revoked.length > 0 ? "flag" : "default"}
        />
        <StatTile
          label="Valid"
          value={certificates.length - revoked.length}
          tone="gold"
        />
      </div>

      <p className="text-[11px] leading-[1.65] text-mist-400">
        Certificates are never hard-deleted. A revoked certificate keeps its
        serial and continues to resolve on the public verification page, marked
        revoked — deleting it would let a screenshot of the original pass as
        valid forever.
      </p>

      <Card pad="none" className="overflow-hidden">
        {certificates.map((c) => (
          <div
            key={c.id}
            className="flex flex-wrap items-center gap-3 border-b border-mist-100/5 px-3.5 py-4 last:border-b-0 sm:px-5"
          >
            <div className="min-w-[180px] flex-1">
              <p className="text-[12.5px] font-bold text-mist-100">
                {c.course.title}
              </p>
              <p className="mt-1 text-[10.5px] font-medium text-mist-400">
                {c.user.name} · {c.serial} · issued {formatDate(c.issuedAt)}
                {c.finalScore != null && ` · ${c.finalScore}%`}
              </p>
              {c.revokedAt && c.revokeReason && (
                <p className="mt-1.5 text-[10.5px] leading-[1.45] text-flag-400">
                  Revoked {formatDate(c.revokedAt)} — {c.revokeReason}
                </p>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-2.5">
              {c.revokedAt ? (
                <Pill tone="flag">revoked</Pill>
              ) : (
                <Pill tone="growth">valid</Pill>
              )}
              <Link
                href={`/verify/${c.verifyToken}`}
                className="-my-2 inline-flex items-center py-2 text-[11px] font-semibold text-gold-500 hover:text-gold-400"
              >
                Verify →
              </Link>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
