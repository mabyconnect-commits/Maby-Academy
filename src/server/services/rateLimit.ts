import "server-only";
import { db } from "@/lib/db";
import { ServiceError } from "./auth";

/**
 * Fixed-window rate limiting backed by Postgres.
 *
 * Redis is the conventional home for this, but adding a second datastore for
 * counters this small is not yet justified. The trade-off accepted: a fixed
 * window allows a burst across a boundary (up to 2× the limit spanning two
 * windows). For abuse protection — not billing — that is fine, and it keeps
 * the deployment to one moving part.
 *
 * Fails **open** on database error: a rate limiter that takes down login
 * because it cannot count is worse than the abuse it prevents.
 */

export type RateLimitRule = {
  /** Maximum attempts allowed inside the window. */
  limit: number;
  /** Window length in seconds. */
  windowSeconds: number;
};

export const RATE_LIMITS = {
  login: { limit: 8, windowSeconds: 300 },
  register: { limit: 5, windowSeconds: 900 },
  passwordReset: { limit: 4, windowSeconds: 900 },
  submission: { limit: 30, windowSeconds: 300 },
  post: { limit: 15, windowSeconds: 300 },
  comment: { limit: 40, windowSeconds: 300 },
  ticket: { limit: 6, windowSeconds: 3600 },
} as const satisfies Record<string, RateLimitRule>;

export type RateLimitScope = keyof typeof RATE_LIMITS;

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
};

function windowStartFor(windowSeconds: number, now = Date.now()): Date {
  const ms = windowSeconds * 1000;
  return new Date(Math.floor(now / ms) * ms);
}

/**
 * Records an attempt and reports whether it is allowed.
 *
 * `identifier` should be the most specific stable thing available — an IP for
 * anonymous endpoints, a user id for authenticated ones.
 */
export async function consumeRateLimit(
  scope: RateLimitScope,
  identifier: string,
): Promise<RateLimitResult> {
  const rule = RATE_LIMITS[scope];
  const key = `${scope}:${identifier}`;
  const windowStart = windowStartFor(rule.windowSeconds);
  const expiresAt = new Date(windowStart.getTime() + rule.windowSeconds * 1000);

  try {
    // Upsert-and-increment in one statement so concurrent requests cannot
    // both read a stale count and each believe they are under the limit.
    const row = await db.rateLimit.upsert({
      where: { key_windowStart: { key, windowStart } },
      create: { key, windowStart, count: 1, expiresAt },
      update: { count: { increment: 1 } },
      select: { count: true },
    });

    const allowed = row.count <= rule.limit;
    return {
      allowed,
      remaining: Math.max(0, rule.limit - row.count),
      retryAfterSeconds: allowed
        ? 0
        : Math.max(1, Math.ceil((expiresAt.getTime() - Date.now()) / 1000)),
    };
  } catch (error) {
    console.error("[rateLimit] failing open:", error);
    return { allowed: true, remaining: rule.limit, retryAfterSeconds: 0 };
  }
}

/** Consume and throw a user-facing error when the limit is exceeded. */
export async function enforceRateLimit(
  scope: RateLimitScope,
  identifier: string,
  message = "Too many attempts. Please wait a moment and try again.",
) {
  const result = await consumeRateLimit(scope, identifier);
  if (!result.allowed) {
    throw new ServiceError(
      `${message} (retry in ${result.retryAfterSeconds}s)`,
      429,
    );
  }
  return result;
}

/** Housekeeping — safe to call from a cron or after a successful login. */
export async function pruneExpiredRateLimits() {
  const { count } = await db.rateLimit.deleteMany({
    where: { expiresAt: { lt: new Date() } },
  });
  return count;
}
