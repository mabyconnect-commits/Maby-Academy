import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The Maby mark: an open "C" ring with a gold "M" inside it.
 *
 * Drawn as SVG rather than shipped as an image so it stays crisp at every
 * size, inherits colour from the theme, and costs no extra request. The ring
 * gap sits on the right, which is what keeps it reading as a C rather than an O.
 */
export function LogoMark({
  size = 34,
  className,
  style,
}: {
  size?: number;
  className?: string;
  /** Lets fixed-colour contexts (the certificate) override the themed ring. */
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      style={style}
      role="img"
      aria-label="Maby"
    >
      {/* The C: an arc left open between roughly -50° and 50°. */}
      <path
        d="M 71.5 21.5 A 36 36 0 1 0 71.5 78.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
      {/* The M, in brand gold, sitting inside the ring. */}
      <path
        d="M 36 64 L 43 38 L 50 52 L 57 38 L 64 64"
        fill="none"
        stroke="var(--color-gold-500)"
        strokeWidth="8.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({
  size = "md",
  className,
  href = "/",
  showWordmark = true,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
  showWordmark?: boolean;
}) {
  const dims = { sm: 28, md: 34, lg: 44 }[size];
  const text = { sm: "text-sm", md: "text-base", lg: "text-xl" }[size];

  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-2.5 group", className)}
    >
      <LogoMark size={dims} className="text-mist-100" />
      {showWordmark && (
        <span
          className={cn(
            "font-semibold tracking-[0.14em] uppercase text-mist-100 leading-none",
            text,
          )}
        >
          Maby <span className="text-gold-500">Academy</span>
        </span>
      )}
    </Link>
  );
}

/**
 * Stacked lockup, matching the brand sheet: mark to the left, two lines of
 * wide-tracked type. Used where the logo is the subject rather than
 * navigation — certificates, the setup page, auth screens.
 */
export function LogoLockup({
  size = 56,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex items-center gap-4", className)}>
      <LogoMark size={size} className="text-mist-100" />
      <span className="leading-[1.15]">
        <span
          className="block font-bold tracking-[0.22em] uppercase text-mist-100"
          style={{ fontSize: size * 0.34 }}
        >
          Maby
        </span>
        <span
          className="block font-bold tracking-[0.22em] uppercase text-mist-100"
          style={{ fontSize: size * 0.34 }}
        >
          Acad<span className="text-gold-500">e</span>my
        </span>
      </span>
    </div>
  );
}
