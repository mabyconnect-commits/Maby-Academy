import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn, initials } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "growth";
type ButtonSize = "sm" | "md" | "lg";

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-gold-500 text-ink-950 hover:bg-gold-400 shadow-sm shadow-gold-600/20",
  secondary:
    "bg-ink-800 text-mist-100 border border-ink-600 hover:bg-ink-700 hover:border-ink-500",
  ghost: "text-mist-300 hover:text-mist-100 hover:bg-ink-800",
  danger: "bg-flag-500 text-white hover:bg-flag-400",
  growth: "bg-growth-500 text-ink-950 hover:bg-growth-400",
};

const BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: "text-sm px-3 py-1.5",
  md: "text-sm px-4 py-2.5",
  lg: "text-base px-6 py-3",
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

export function Card({
  className,
  ...props
}: ComponentProps<"div">) {
  return <div className={cn("surface p-5", className)} {...props} />;
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
  icon = "✨",
  title,
  description,
  action,
}: {
  icon?: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="surface p-10 text-center">
      <div className="text-3xl mb-3" aria-hidden>
        {icon}
      </div>
      <h3 className="font-semibold text-mist-100">{title}</h3>
      <p className="text-sm text-mist-400 mt-1.5 max-w-md mx-auto">{description}</p>
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Badges & pills
// ---------------------------------------------------------------------------

type Tone = "neutral" | "gold" | "growth" | "flag" | "info";

const TONES: Record<Tone, string> = {
  neutral: "bg-ink-800 text-mist-300 border-ink-600",
  gold: "bg-gold-500/12 text-gold-300 border-gold-600/40",
  growth: "bg-growth-500/12 text-growth-400 border-growth-600/40",
  flag: "bg-flag-500/12 text-flag-400 border-flag-500/40",
  info: "bg-ink-700 text-mist-200 border-ink-500",
};

export function Pill({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
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
        className="h-1.5 flex-1 rounded-full bg-ink-700 overflow-hidden"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Course progress"
      >
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-500",
            pct >= 100 ? "bg-growth-500" : "bg-gold-500",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs tabular-nums text-mist-400 w-9 text-right">
          {pct}%
        </span>
      )}
    </div>
  );
}

export function StatTile({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: string;
}) {
  return (
    <div className="surface p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wide text-mist-400">{label}</p>
        {icon && (
          <span className="text-base" aria-hidden>
            {icon}
          </span>
        )}
      </div>
      <p className="mt-2 text-2xl font-semibold tabular-nums text-mist-100">
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-mist-400">{hint}</p>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Forms
// ---------------------------------------------------------------------------

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
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-mist-200">
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

const CONTROL =
  "w-full rounded-lg bg-ink-900 border border-ink-600 px-3.5 py-2.5 text-sm text-mist-100 placeholder:text-mist-400/60 focus:border-gold-500 transition-colors";

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
