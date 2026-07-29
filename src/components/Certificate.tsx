import { LogoMark } from "@/components/Brand";
import { formatDate } from "@/lib/utils";

/**
 * The certificate.
 *
 * A double gold rule, the mark centred, wide-tracked small caps for the
 * institutional lines, and the recipient's name in Cormorant italic — the one
 * place the academy allows itself a serif. Everything else in the product is
 * Archivo, which is exactly what makes this feel like a different kind of
 * object.
 *
 * **Colours here are fixed, not themed.** This is a document, not a panel: it
 * looks the same printed, screenshotted, and shared, and it must stay legible
 * on a light page. Using theme tokens inside it renders the recipient's name
 * near-black on black in light mode — which is exactly the bug this comment
 * exists to prevent someone reintroducing.
 *
 * Rendered as ordinary DOM rather than an image so it stays selectable,
 * translatable and printable, and so the serial is real text a person can copy.
 */

const INK = "#0e0e11";
const GOLD = "#c9a227";
const GOLD_SOFT = "rgba(201, 162, 39, 0.45)";
const GOLD_FAINT = "rgba(201, 162, 39, 0.28)";
const PAPER = "#f5f5f7";
const MUTED = "#9a9a9a";
const RULE = "rgba(255, 255, 255, 0.18)";

export function Certificate({
  recipientName,
  courseTitle,
  issuedAt,
  serial,
  founderName = "Mabi",
  finalScore,
  revokedAt,
}: {
  recipientName: string;
  courseTitle: string;
  issuedAt: Date | string;
  serial: string;
  founderName?: string;
  finalScore?: number | null;
  revokedAt?: Date | string | null;
}) {
  const revoked = Boolean(revokedAt);

  return (
    <div
      className="relative rounded-[14px] p-2.5 sm:p-3"
      style={{
        background: `linear-gradient(150deg, #1a160c, ${INK} 70%)`,
        border: `1px solid ${GOLD_SOFT}`,
      }}
    >
      {/* The inner rule — the detail that makes it read as a document. */}
      <div
        className="rounded-[10px] px-5 py-9 sm:px-10 sm:py-12 text-center"
        style={{ border: `1px solid ${GOLD_FAINT}` }}
      >
        <LogoMark size={56} className="mx-auto" style={{ color: PAPER }} />

        <p
          className="mt-7 text-[11px] font-bold uppercase"
          style={{ color: GOLD, letterSpacing: "0.18em" }}
        >
          Maby Academy Certifies
        </p>

        <p
          className="font-display mt-5 text-4xl sm:text-5xl leading-tight"
          style={{ color: PAPER }}
        >
          {recipientName}
        </p>

        <p
          className="mt-5 text-sm max-w-sm mx-auto leading-relaxed"
          style={{ color: MUTED }}
        >
          has successfully completed all requirements of the
        </p>

        <p
          className="mt-4 text-lg sm:text-xl font-bold uppercase leading-snug"
          style={{ color: GOLD, letterSpacing: "0.06em" }}
        >
          {courseTitle}
        </p>

        {finalScore != null && (
          <p className="mt-3 text-xs" style={{ color: MUTED }}>
            Final score {finalScore}%
          </p>
        )}

        {/* Signature block. Two columns above a phone, stacked below — a
            squeezed two-column signature reads as a layout bug. */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 text-left">
          <div>
            <p className="font-display text-2xl" style={{ color: PAPER }}>
              {founderName}
            </p>
            <div style={{ borderTop: `1px solid ${RULE}` }} className="mt-2 pt-2">
              <p
                className="text-[10px] font-bold uppercase"
                style={{ color: MUTED, letterSpacing: "0.14em" }}
              >
                Founder, Maby Academy
              </p>
            </div>
          </div>

          <div className="sm:text-right">
            <p className="text-sm font-semibold" style={{ color: PAPER }}>
              {formatDate(issuedAt)}
            </p>
            <div style={{ borderTop: `1px solid ${RULE}` }} className="mt-2 pt-2">
              <p
                className="text-[10px] font-bold uppercase"
                style={{ color: MUTED, letterSpacing: "0.14em" }}
              >
                Date issued · No. {serial}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* A revoked certificate must never pass as valid, including in a
          screenshot — so the state is stamped across the artwork itself. */}
      {revoked && (
        <div
          className="absolute inset-0 grid place-items-center rounded-[14px]"
          style={{ background: "rgba(11, 11, 13, 0.72)" }}
        >
          <p
            className="rotate-[-12deg] px-6 py-2 text-xl font-black uppercase"
            style={{
              color: "#e05c5c",
              border: "2px solid #e05c5c",
              letterSpacing: "0.2em",
            }}
          >
            Revoked
          </p>
        </div>
      )}
    </div>
  );
}
