import "server-only";
import { db } from "@/lib/db";

/**
 * Feature flags.
 *
 * The mechanism behind the compliance gates in docs/ROADMAP.md: risky
 * capabilities ship dark and are switched on per environment once reviewed,
 * rather than living on a branch that drifts.
 *
 * Fails **closed** — an unknown or unreadable flag is off. For features gated
 * because of legal exposure, silence must mean "no".
 */

const CACHE_TTL_MS = 30_000;
const cache = new Map<string, { value: boolean; expires: number }>();

export async function isFeatureEnabled(key: string): Promise<boolean> {
  const hit = cache.get(key);
  if (hit && hit.expires > Date.now()) return hit.value;

  try {
    const flag = await db.featureFlag.findUnique({
      where: { key },
      select: { isEnabled: true },
    });
    const value = flag?.isEnabled ?? false;
    cache.set(key, { value, expires: Date.now() + CACHE_TTL_MS });
    return value;
  } catch (error) {
    console.error(`[features] could not read "${key}", treating as off:`, error);
    return false;
  }
}

/**
 * Percentage rollout, stable per user.
 *
 * The same user always lands on the same side of the split, so a feature does
 * not flicker in and out between requests.
 */
export async function isFeatureEnabledFor(
  key: string,
  userId: string,
): Promise<boolean> {
  const flag = await db.featureFlag
    .findUnique({
      where: { key },
      select: { isEnabled: true, rolloutPercent: true },
    })
    .catch(() => null);

  if (!flag?.isEnabled) return false;
  if (flag.rolloutPercent >= 100) return true;
  if (flag.rolloutPercent <= 0) return false;

  let hash = 0;
  const seed = `${key}:${userId}`;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % 100 < flag.rolloutPercent;
}

export async function listFeatureFlags() {
  return db.featureFlag.findMany({ orderBy: { key: "asc" } });
}

export async function setFeatureFlag(
  key: string,
  isEnabled: boolean,
  rolloutPercent?: number,
) {
  const updated = await db.featureFlag.update({
    where: { key },
    data: {
      isEnabled,
      ...(rolloutPercent !== undefined
        ? { rolloutPercent: Math.max(0, Math.min(100, rolloutPercent)) }
        : {}),
    },
  });
  cache.delete(key);
  return updated;
}
