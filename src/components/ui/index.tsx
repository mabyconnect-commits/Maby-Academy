import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon, type IconName } from "@/components/Icon";
import { cn, initials } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger"
  | "growth"
  | "dashed";
type ButtonSize = "sm" | "md" | "lg";

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-btn)] font-bold transition-colors disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-gold-500 text-ink-950 hover:bg-gold-400",
  // Outlined. The design's secondary is a white hairline that turns gold on
  // hover — border carries state, never a shadow or a fill.
  secondary:
    "border border-rule-strong bg-transparent text-mist-100 hover:border-gold-500 hover:text-gold-400",
  ghost: "font-semibold text-mist-300 hover:bg-ink-800 hover:text-mist-100",
  danger: "bg-flag-500 text-white hover:bg-flag-400",
  growth: "bg-growth-500 text-ink-950 hover:bg-growth-400",
  /** Dashed gold outline — the design's "+ Add a habit" affordance. */
  dashed:
    "w-full border border-dashed border-gold-500/40 bg-transparent font-semibold text-gold-500 hover:bg-gold-500/8",
};

/** Padding and type sizes taken from the design's button specimens. */
const BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: "px-4 py-2.5 text-[11px]",
  md: "px-4 py-3 text-xs",
  lg: "px-6 py-[15px] text-[13px]",
};

export function buttonClass(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(BUTTON_BASE, BUTTON_VARIANTS[variant], BUTTON_SIZES[size], className);
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return <button className={buttonClass(variant, size, className)} {...props} />;
}

export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return <Link className={buttonClass(variant, size, className)} {...props} />;
}

// ---------------------------------------------------------------------------
// Surfaces
// ---------------------------------------------------------------------------

type CardVariant = "default" | "gold" | "raised" | "inset";

const CARD_SURFACES: Record<CardVariant, string> = {
  default: "surface",
  // Reserved for the single most important thing on a screen.
  gold: "surface-gold",
  raised: "surface-raised",
  // A card inside a card.
  inset: "surface-inset",
};

/**
 * Panel padding is 22px, matching the design's card specimens — with `pad`
 * available for the two exceptions: the wide clamped panels (18px on a phone
 * rising to 24px) and the tiles, which sit tighter at 18px.
 */
export function Card({
  variant = "default",
  pad = "default",
  className,
  ...props
}: ComponentProps<"div"> & {
  variant?: CardVariant;
  pad?: "default" | "wide" | "tight" | "none";
}) {
  const padding = {
    default: "p-[22px]",
    wide: "p-[18px] sm:p-6",
    tight: "p-[18px]",
    none: "",
  }[pad];

  return (
    <div className={cn(CARD_SURFACES[variant], padding, className)} {...props} />
  );
}

/**
 * The panel heading used at the top of nearly every card in the design: a
 * 700-weight 13–14px title with an optional gold text action on the right.
 */
export function PanelHead({
  title,
  meta,
  action,
  className,
}: {
  title: ReactNode;
  meta?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-4 flex flex-wrap items-center justify-between gap-2.5",
        className,
      )}
    >
      <span className="text-sm font-bold text-mist-100">{title}</span>
      {meta}
      {action}
    </div>
  );
}

/** The recurring "View all →" affordance. Gold, 11px, semibold. */
export function CardLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      // The negative margin cancels the padding, so the tap area grows to a
      // comfortable ~33px on touch without moving the link visually. An 11px
      // label is a 17px-tall target otherwise, which is a miss on a phone.
      className="-my-2 inline-flex items-center py-2 text-[11px] font-semibold whitespace-nowrap text-gold-500 transition-colors hover:text-gold-400"
    >
      {children}
    </Link>
  );
}

/**
 * The two status chips that sit in every header in the design: a streak in
 * ember and an XP total in gold. Kept together because they always appear
 * together and must stay visually paired.
 */
export function StreakPill({ days }: { days: number }) {
  if (days <= 0) return null;
  return (
    <Pill tone="ember" className="px-3 py-2 whitespace-nowrap">
      <Icon name="flame" size={11} strokeWidth={2.2} />
      {/* Abbreviated on phones — the full phrase wraps to two lines in a
          16px-tall header, which looks broken. */}
      <span className="sm:hidden">{days}d</span>
      <span className="hidden sm:inline">{days}-day streak</span>
      <span className="sr-only">{days} day streak</span>
    </Pill>
  );
}

export function XpPill({ points, level }: { points: number; level?: number }) {
  return (
    <Pill tone="gold" className="px-3 py-2 whitespace-nowrap">
      {/* Wrapped in one span so Pill's flex gap doesn't land between the XP
          total and the level, on top of the separator's own spaces. */}
      <span>
        {points.toLocaleString()} XP
        {level !== undefined && (
          <span className="hidden sm:inline"> · LVL {level}</span>
        )}
      </span>
    </Pill>
  );
}

export function SectionHeading({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-4">
      <div>
        <h2 className="text-lg font-semibold text-mist-100">{title}</h2>
        {subtitle && <p className="text-sm text-mist-400 mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({
  icon = "spark",
  title,
  description,
  action,
}: {
  icon?: IconName;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="surface p-10 text-center">
      <div className="mx-auto mb-4 grid size-11 place-items-center rounded-full border border-gold-500/35 bg-gold-500/10 text-gold-500">
        <Icon name={icon} size={18} strokeWidth={2} />
      </div>
      <h3 className="font-bold text-mist-100">{title}</h3>
      <p className="mx-auto mt-1.5 max-w-md text-sm text-mist-400">{description}</p>
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Badges & pills
// ---------------------------------------------------------------------------

type Tone = "neutral" | "gold" | "growth" | "flag" | "ember" | "info";

const TONES: Record<Tone, string> = {
  // Uses tokens rather than white/α: a white-on-white chip disappears in
  // light mode, leaving bare text where a pill should be.
  neutral: "bg-ink-800 text-mist-300 border-rule",
  gold: "bg-gold-500/12 text-gold-500 border-transparent",
  growth: "bg-growth-500/12 text-growth-500 border-transparent",
  flag: "bg-flag-500/12 text-flag-500 border-transparent",
  ember: "bg-ember-500/12 text-ember-500 border-transparent",
  info: "bg-info-500/12 text-info-500 border-transparent",
};

/**
 * `round` is the default 999px chip. `tag` is the design's squarer 4px variant,
 * used for state labels that sit beside a heading rather than in a row of
 * chips — ENCRYPTED, SHARED.
 */
export function Pill({
  tone = "neutral",
  shape = "round",
  className,
  children,
}: {
  tone?: Tone;
  shape?: "round" | "tag";
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 border text-[11px] leading-none font-bold",
        shape === "round"
          ? "rounded-full px-2.5 py-1"
          : "rounded-[4px] px-2 py-[5px] text-[9px] tracking-[0.08em] uppercase",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

const STATUS_TONES: Record<string, Tone> = {
  ACTIVE: "info",
  COMPLETED: "growth",
  CANCELLED: "flag",
  EXPIRED: "flag",
  DRAFT: "neutral",
  SUBMITTED: "gold",
  UNDER_REVIEW: "gold",
  GRADED: "growth",
  RETURNED: "flag",
  PENDING: "gold",
  APPROVED: "info",
  PAID: "growth",
  VOID: "flag",
  SCHEDULED: "info",
  LIVE: "flag",
  ENDED: "neutral",
  BEGINNER: "growth",
  INTERMEDIATE: "gold",
  ADVANCED: "flag",
  PUBLISHED: "growth",
  ARCHIVED: "neutral",
};

export function StatusPill({ status }: { status: string }) {
  return (
    <Pill tone={STATUS_TONES[status] ?? "neutral"}>
      {status.replace(/_/g, " ").toLowerCase()}
    </Pill>
  );
}

// ---------------------------------------------------------------------------
// Progress
// ---------------------------------------------------------------------------

export function ProgressBar({
  value,
  className,
  showLabel = false,
}: {
  value: number;
  className?: string;
  showLabel?: boolean;
}) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        // 6px track on a 8%-white rail, per the design's data-display spec.
        className="h-1.5 flex-1 overflow-hidden rounded-[3px] bg-mist-100/8"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Course progress"
      >
        {/* Gold *gradient* fill, deep gold into brand gold left to right. A
            flat fill reads as a plain meter; the gradient is what makes the
            bar feel like the design's. Green only once it is finished. */}
        <div
          className={cn(
            "h-full rounded-[3px] transition-[width] duration-500",
            pct >= 100
              ? "bg-growth-500"
              : "bg-gradient-to-r from-gold-600 to-gold-500",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span className="w-9 text-right text-xs font-bold text-gold-500 tabular-nums">
          {pct}%
        </span>
      )}
    </div>
  );
}

/**
 * The design's stat tile leads with the number, not the label: an 800-weight
 * 24px figure with the label in 11px underneath. That order is deliberate — a
 * row of these is meant to be readable at a glance, and a label-first tile
 * makes you read four captions before you see any data.
 */
export function StatTile({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: string | number;
  hint?: string;
  tone?: "default" | "gold" | "growth" | "ember" | "flag";
}) {
  const valueTone = {
    default: "text-mist-100",
    gold: "text-gold-500",
    growth: "text-growth-500",
    ember: "text-ember-500",
    flag: "text-flag-500",
  }[tone];

  return (
    <div className="surface rounded-[var(--radius-tile)] p-[18px]">
      <p className={cn("text-2xl leading-none font-extrabold tabular-nums", valueTone)}>
        {value}
      </p>
      <p className="mt-[7px] text-[11px] leading-[1.4] font-medium text-mist-400">
        {label}
      </p>
      {hint && <p className="mt-1.5 text-[10.5px] text-mist-400/80">{hint}</p>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Forms
// ---------------------------------------------------------------------------

/**
 * The design labels every field in wide-tracked uppercase 11px rather than
 * sentence-case — it is the same eyebrow treatment as section labels, which is
 * what makes a long form read as a single system.
 */
export function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-[7px]">
      <label
        htmlFor={htmlFor}
        className="block text-[11px] font-semibold tracking-[0.1em] text-mist-300 uppercase"
      >
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-mist-400">{hint}</p>}
      {error && (
        <p className="text-xs text-flag-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Controls sit on the *page* background, not the card background — a darker
 * well inside a lighter card. That inversion is what makes an input read as
 * recessed without a shadow.
 */
const CONTROL =
  "w-full rounded-[var(--radius-control)] border border-rule-strong bg-ink-950 px-3.5 py-3.5 text-[13px] font-medium text-mist-100 transition-colors placeholder:text-mist-400/60 focus:border-gold-500";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(CONTROL, className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(CONTROL, "resize-y", className)} {...props} />;
}

export function Select({ className, ...props }: ComponentProps<"select">) {
  return <select className={cn(CONTROL, className)} {...props} />;
}

export function Alert({
  tone = "info",
  children,
}: {
  tone?: "info" | "success" | "error";
  children: ReactNode;
}) {
  const styles = {
    info: "bg-ink-800 border-ink-600 text-mist-200",
    success: "bg-growth-500/10 border-growth-600/40 text-growth-400",
    error: "bg-flag-500/10 border-flag-500/40 text-flag-400",
  }[tone];

  return (
    <div
      className={cn("rounded-lg border px-4 py-3 text-sm", styles)}
      role={tone === "error" ? "alert" : "status"}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Avatar
// ---------------------------------------------------------------------------

export function Avatar({
  name,
  src,
  size = 36,
}: {
  name: string;
  src?: string | null;
  size?: number;
}) {
  if (src) {
    return (
      // Avatars are arbitrary remote URLs; next/image would need every host
      // whitelisted, so a plain img is the pragmatic choice here.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        className="rounded-full object-cover border border-ink-600"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="rounded-full bg-ink-700 border border-ink-600 flex items-center justify-center font-semibold text-gold-300 shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      aria-hidden
    >
      {initials(name)}
    </div>
  );
}
