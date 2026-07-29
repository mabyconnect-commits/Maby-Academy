import { z } from "zod";

/**
 * Environment is validated once, at import time, so a misconfigured deploy
 * fails loudly at boot instead of silently at 2am.
 */
const schema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  /** Unpooled URL for migrations. Defaults to DATABASE_URL for local dev. */
  DIRECT_DATABASE_URL: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  SESSION_SECRET: z
    .string()
    .min(32, "SESSION_SECRET must be at least 32 characters"),
  SESSION_TTL_DAYS: z.coerce.number().int().positive().default(30),
  REFERRAL_COMMISSION_RATES: z.string().default("0.10,0.05,0.02"),
});

const parsed = schema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  DIRECT_DATABASE_URL: process.env.DIRECT_DATABASE_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  SESSION_SECRET: process.env.SESSION_SECRET,
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
