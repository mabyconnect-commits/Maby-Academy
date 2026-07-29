/**
 * Resolving the database connection string across hosting providers.
 *
 * Vercel's Neon / Postgres integrations provision a database and inject the
 * credentials automatically — but under their own variable names, which are
 * not always `DATABASE_URL`. Rather than making the operator hand-copy a
 * connection string that the platform already knows, accept the names the
 * platform actually uses.
 *
 * Deliberately dependency-free and free of Node built-ins: this module is
 * imported by middleware, which runs in a lighter runtime.
 */

/**
 * Pooled / application connection, in priority order.
 *
 * `DATABASE_URL` wins because an explicitly-set variable represents a
 * deliberate choice and should override anything auto-provisioned.
 * `POSTGRES_PRISMA_URL` comes next: Vercel sets it with the pooling
 * parameters Prisma wants.
 */
const APP_URL_KEYS = [
  "DATABASE_URL",
  "POSTGRES_PRISMA_URL",
  "POSTGRES_URL",
] as const;

/** Direct / unpooled connection, used only by migrations. */
const DIRECT_URL_KEYS = [
  "DIRECT_DATABASE_URL",
  "DATABASE_URL_UNPOOLED",
  "POSTGRES_URL_NON_POOLING",
] as const;

function firstNonEmpty(
  keys: readonly string[],
  source: Record<string, string | undefined>,
): { key: string; value: string } | null {
  for (const key of keys) {
    const value = source[key];
    // A variable that exists but is blank is worse than absent — treat it so.
    if (typeof value === "string" && value.trim() !== "") {
      return { key, value: value.trim() };
    }
  }
  return null;
}

export function resolveDatabaseUrl(
  source: Record<string, string | undefined> = process.env,
) {
  return firstNonEmpty(APP_URL_KEYS, source);
}

export function resolveDirectDatabaseUrl(
  source: Record<string, string | undefined> = process.env,
) {
  return firstNonEmpty(DIRECT_URL_KEYS, source);
}

/** True when no database is configured under any recognised name. */
export function hasDatabase(
  source: Record<string, string | undefined> = process.env,
) {
  return resolveDatabaseUrl(source) !== null;
}

/**
 * Public origin of the deployment.
 *
 * Falls back to the domain Vercel assigns, so a deploy is reachable and
 * self-consistent before a custom domain is attached. `NEXT_PUBLIC_APP_URL`
 * still wins — certificate verification links are permanent, so the operator
 * must be able to pin them to the real domain.
 */
export function resolveAppUrl(
  source: Record<string, string | undefined> = process.env,
) {
  const explicit = source.NEXT_PUBLIC_APP_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  // Set by Vercel to the project's stable production domain.
  const production = source.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (production) return `https://${production.replace(/\/+$/, "")}`;

  // Per-deployment URL — changes every deploy, so only a last resort.
  const deployment = source.VERCEL_URL?.trim();
  if (deployment) return `https://${deployment.replace(/\/+$/, "")}`;

  return "http://localhost:3000";
}

export const DATABASE_URL_CANDIDATES = APP_URL_KEYS;
export const DIRECT_URL_CANDIDATES = DIRECT_URL_KEYS;
