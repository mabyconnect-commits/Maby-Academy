import { randomBytes } from "node:crypto";
import { z } from "zod";
import {
  resolveAppUrl,
  resolveDatabaseUrl,
  resolveDirectDatabaseUrl,
} from "@/lib/database-url";

const resolvedDatabase = resolveDatabaseUrl();
const resolvedDirect = resolveDirectDatabaseUrl();

/**
 * Setup mode.
 *
 * With no DATABASE_URL there is no academy — every page reads from the
 * database. Rather than fail the build (leaving nothing deployed) or deploy
 * something that 500s on every route, the app boots into a read-only setup
 * page that explains what is missing.
 *
 * This is deliberately keyed on DATABASE_URL alone: it is the one variable
 * that cannot be defaulted or invented. Once it is present the app switches
 * to strict validation, so a *real* deployment still fails loudly on a
 * missing SESSION_SECRET rather than quietly signing sessions with a key
 * that changes on every cold start.
 */
export const isSetupMode = resolvedDatabase === null;

/** Which variable the connection string came from, for diagnostics. */
export const databaseUrlSource = resolvedDatabase?.key ?? null;

/**
 * Placeholders are substituted into the parsed config only — `process.env`
 * is never written to. Mutating it would make DATABASE_URL appear set to
 * everything downstream, including the middleware whose entire job is to
 * detect that it is absent.
 */
const SETUP_DATABASE_URL =
  "postgresql://setup:setup@127.0.0.1:5432/setup?schema=public";

/**
 * Environment is validated once, at import time, so a misconfigured deploy
 * fails loudly at boot instead of silently at 2am.
 */
const schema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  /** Unpooled URL for migrations. Defaults to DATABASE_URL for local dev. */
  DIRECT_DATABASE_URL: z.string().optional(),
  /**
   * Public origin. A trailing slash here would produce double-slashed
   * certificate and referral links (".site//verify/..."), which look broken
   * to anyone a student shares them with — so strip it once, here.
   */
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url()
    .default("http://localhost:3000")
    .transform((url) => url.replace(/\/+$/, "")),
  SESSION_SECRET: z
    .string()
    .min(32, "SESSION_SECRET must be at least 32 characters"),
  SESSION_TTL_DAYS: z.coerce.number().int().positive().default(30),
  REFERRAL_COMMISSION_RATES: z.string().default("0.10,0.05,0.02"),
});

const parsed = schema.safeParse({
  DATABASE_URL: resolvedDatabase?.value ?? (isSetupMode ? SETUP_DATABASE_URL : undefined),
  DIRECT_DATABASE_URL: resolvedDirect?.value,
  NEXT_PUBLIC_APP_URL: resolveAppUrl(),
  SESSION_SECRET:
    process.env.SESSION_SECRET ??
    // Ephemeral and never used: in setup mode nobody can sign in, because
    // every route redirects before a session is ever created.
    (isSetupMode ? randomBytes(32).toString("hex") : undefined),
  SESSION_TTL_DAYS: process.env.SESSION_TTL_DAYS,
  REFERRAL_COMMISSION_RATES: process.env.REFERRAL_COMMISSION_RATES,
});

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
    .join("\n");
  throw new Error(`Invalid environment configuration:\n${issues}`);
}

export const env = parsed.data;

/**
 * Commission rate per referral level, as decimals. Index 0 is level 1.
 * Depth of the payout tree is however many rates are configured.
 */
export const referralRates: number[] = env.REFERRAL_COMMISSION_RATES.split(",")
  .map((r) => Number.parseFloat(r.trim()))
  .filter((r) => Number.isFinite(r) && r > 0);
