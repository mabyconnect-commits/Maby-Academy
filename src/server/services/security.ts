import "server-only";
import { db } from "@/lib/db";
import { hashToken } from "@/lib/auth/tokens";
import { ServiceError } from "./auth";
import { audit } from "./notifications";

/**
 * Account security surface: what is signed in, and how to end it.
 */

export type SessionSummary = {
  id: string;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: Date;
  lastActivityAt: Date;
  expiresAt: Date;
  isCurrent: boolean;
  isExpired: boolean;
  device: string;
};

/**
 * Turn a user-agent string into something a person can recognise.
 * Deliberately coarse — the goal is "is this me?", not analytics.
 */
export function describeDevice(userAgent: string | null): string {
  if (!userAgent) return "Unknown device";
  const ua = userAgent.toLowerCase();

  const os = ua.includes("windows")
    ? "Windows"
    : ua.includes("android")
      ? "Android"
      : ua.includes("iphone") || ua.includes("ipad")
        ? "iOS"
        : ua.includes("mac os")
          ? "macOS"
          : ua.includes("linux")
            ? "Linux"
            : "Unknown OS";

  const browser = ua.includes("edg/")
    ? "Edge"
    : ua.includes("chrome") && !ua.includes("chromium")
      ? "Chrome"
      : ua.includes("firefox")
        ? "Firefox"
        : ua.includes("safari") && !ua.includes("chrome")
          ? "Safari"
          : "Browser";

  return `${browser} on ${os}`;
}

export async function listSessions(
  userId: string,
  currentToken?: string,
): Promise<SessionSummary[]> {
  const currentHash = currentToken ? hashToken(currentToken) : null;

  const sessions = await db.session.findMany({
    where: { userId },
    orderBy: { lastActivityAt: "desc" },
    select: {
      id: true,
      tokenHash: true,
      ipAddress: true,
      userAgent: true,
      createdAt: true,
      lastActivityAt: true,
      expiresAt: true,
    },
  });

  const now = new Date();
  return sessions.map(({ tokenHash, ...s }) => ({
    ...s,
    isCurrent: currentHash !== null && tokenHash === currentHash,
    isExpired: s.expiresAt < now,
    device: describeDevice(s.userAgent),
  }));
}

/**
 * End one session.
 *
 * Scoped by userId as well as session id so a guessed or leaked identifier
 * from another account cannot be used to sign someone else out.
 */
export async function revokeSession(
  userId: string,
  sessionId: string,
  currentToken?: string,
) {
  const session = await db.session.findFirst({
    where: { id: sessionId, userId },
    select: { id: true, tokenHash: true },
  });
  if (!session) throw new ServiceError("Session not found.", 404);

  const isCurrent =
    currentToken !== undefined && session.tokenHash === hashToken(currentToken);

  await db.session.delete({ where: { id: session.id } });
  await audit({
    userId,
    action: "session.revoked",
    entityType: "Session",
    entityId: sessionId,
  });

  return { revoked: true, wasCurrent: isCurrent };
}

/** End every session except the one making the request. */
export async function revokeOtherSessions(
  userId: string,
  currentToken?: string,
) {
  const currentHash = currentToken ? hashToken(currentToken) : null;

  const { count } = await db.session.deleteMany({
    where: {
      userId,
      ...(currentHash ? { tokenHash: { not: currentHash } } : {}),
    },
  });

  await audit({
    userId,
    action: "session.revoked_others",
    metadata: { count },
  });

  return { count };
}

/** Recent security-relevant activity, for the security centre. */
export async function recentSecurityActivity(userId: string, limit = 15) {
  return db.auditLog.findMany({
    where: {
      userId,
      action: {
        in: [
          "user.login",
          "user.register",
          "user.password_change",
          "user.password_reset",
          "session.revoked",
          "session.revoked_others",
        ],
      },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}
