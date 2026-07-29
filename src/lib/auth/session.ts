import "server-only";
import { cookies } from "next/headers";
import { cache } from "react";
import type { Role, User } from "@prisma/client";
import { db } from "@/lib/db";
import { env } from "@/lib/env";
import { generateToken, hashToken } from "./tokens";

export const SESSION_COOKIE = "maby_session";

/** The shape passed around the app — never the password hash. */
export type SessionUser = Pick<
  User,
  | "id"
  | "email"
  | "name"
  | "role"
  | "avatarUrl"
  | "referralCode"
  | "pointsBalance"
  | "lifetimePoints"
  | "currentStreak"
  | "emailVerifiedAt"
  | "timezone"
>;

const SESSION_SELECT = {
  id: true,
  email: true,
  name: true,
  role: true,
  avatarUrl: true,
  referralCode: true,
  pointsBalance: true,
  lifetimePoints: true,
  currentStreak: true,
  emailVerifiedAt: true,
  timezone: true,
} as const;

export async function createSession(
  userId: string,
  meta: { ipAddress?: string | null; userAgent?: string | null } = {},
) {
  const token = generateToken();
  const expiresAt = new Date(
    Date.now() + env.SESSION_TTL_DAYS * 24 * 60 * 60 * 1000,
  );

  await db.session.create({
    data: {
      userId,
      tokenHash: hashToken(token),
      expiresAt,
      ipAddress: meta.ipAddress ?? null,
      userAgent: meta.userAgent ?? null,
    },
  });

  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });

  return { token, expiresAt };
}

/**
 * Resolve the current user from the session cookie.
 *
 * Wrapped in React's `cache` so that a single render — layout, page and any
 * number of components — hits the database once, not once per caller.
 */
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await db.session.findUnique({
    where: { tokenHash: hashToken(token) },
    select: {
      id: true,
      expiresAt: true,
      user: { select: { ...SESSION_SELECT, isActive: true } },
    },
  });

  if (!session) return null;
  if (session.expiresAt < new Date()) {
    await db.session.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }
  if (!session.user.isActive) return null;

  const { isActive: _isActive, ...user } = session.user;
  return user;
});

export async function destroySession() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) {
    await db.session
      .deleteMany({ where: { tokenHash: hashToken(token) } })
      .catch(() => {});
  }
  store.delete(SESSION_COOKIE);
}

/** Sign out everywhere — used after a password change. */
export async function destroyAllSessions(userId: string) {
  await db.session.deleteMany({ where: { userId } });
}

export class AuthError extends Error {
  constructor(
    message: string,
    readonly status: number = 401,
  ) {
    super(message);
    this.name = "AuthError";
  }
}

export async function requireUser(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) throw new AuthError("You must be signed in.", 401);
  return user;
}

export async function requireRole(...roles: Role[]): Promise<SessionUser> {
  const user = await requireUser();
  if (!roles.includes(user.role)) {
    throw new AuthError("You do not have access to this resource.", 403);
  }
  return user;
}

export function isStaff(role: Role) {
  return role === "ADMIN" || role === "INSTRUCTOR";
}
