import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";
import { db } from "@/lib/db";
import { env } from "@/lib/env";
import { ServiceError } from "./auth";
import { audit } from "./notifications";

/**
 * First-admin bootstrap.
 *
 * A live production database is seeded with author accounts whose passwords are
 * random and unknowable, so nobody can log in as the seeded admin. That left
 * the real owner with no in-app way to become an admin — only a database edit
 * or the set-role CLI. This closes that gap: with ADMIN_BOOTSTRAP_SECRET set,
 * the owner promotes their own logged-in account by proving they hold the
 * secret. The secret is a deployment env var, so only whoever controls the
 * hosting can use it, and it can be removed again once the first admin exists.
 */

/** Compare over fixed-length hashes so length and content don't leak by timing. */
function secretsMatch(provided: string, expected: string): boolean {
  const a = createHash("sha256").update(provided).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export function isAdminClaimEnabled(): boolean {
  return Boolean(env.ADMIN_BOOTSTRAP_SECRET);
}

export async function claimAdminWithSecret(userId: string, providedSecret: string) {
  const expected = env.ADMIN_BOOTSTRAP_SECRET;
  if (!expected) {
    throw new ServiceError(
      "Admin claim is turned off. Set ADMIN_BOOTSTRAP_SECRET on the deployment to enable it.",
      403,
    );
  }
  if (!providedSecret || !secretsMatch(providedSecret, expected)) {
    throw new ServiceError("That secret is not correct.", 403, "secret");
  }

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true, email: true, name: true },
  });
  if (!user) throw new ServiceError("Account not found.", 404);

  if (user.role === "ADMIN" || user.role === "SUPER_ADMIN") {
    return { alreadyAdmin: true as const };
  }

  await db.user.update({ where: { id: user.id }, data: { role: "ADMIN" } });

  // A self-promotion is exactly the kind of privileged change the audit log
  // exists for.
  await audit({
    userId: user.id,
    action: "user.self_promoted_admin",
    entityType: "User",
    entityId: user.id,
    metadata: { via: "bootstrap_secret", email: user.email },
  });

  return { promoted: true as const };
}
