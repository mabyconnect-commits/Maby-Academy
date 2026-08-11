import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(minor: number, currency = "USD") {
  // The default only applies to `undefined`; a course row can carry an empty
  // string or a junk code, and Intl throws a RangeError on those — which,
  // since this runs inside server components, would crash the whole page. A
  // price formatter must never be able to do that.
  const code = (currency || "USD").trim().toUpperCase();
  const minimumFractionDigits = minor % 100 === 0 ? 0 : 2;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: code,
      minimumFractionDigits,
    }).format(minor / 100);
  } catch {
    return `${code} ${(minor / 100).toLocaleString("en-US", { minimumFractionDigits })}`;
  }
}

export function formatDuration(seconds: number) {
  if (!seconds) return "0m";
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export function formatDate(date: Date | string, withTime = false) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...(withTime ? { hour: "numeric", minute: "2-digit" } : {}),
  });
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function pluralize(n: number, singular: string, plural?: string) {
  return `${n} ${n === 1 ? singular : (plural ?? `${singular}s`)}`;
}

/**
 * First name plus last initial — "Matthew Adeleye" → "Matthew A." Used where a
 * member is shown to other members (the activity feed) so there's a friendly
 * name without publishing everyone's full name.
 */
export function shortName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "Someone";
  if (parts.length === 1) return parts[0];
  const last = parts[parts.length - 1];
  return `${parts[0]} ${last[0].toUpperCase()}.`;
}

/**
 * Fisher–Yates shuffle, returning a new array (never mutates the input).
 *
 * Used to randomise quiz option order per view, so the correct answer's
 * position carries no signal — a quiz whose answer is always the first option
 * is not a test.
 */
export function shuffle<T>(input: readonly T[]): T[] {
  const a = [...input];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
