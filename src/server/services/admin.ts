import "server-only";
import { db } from "@/lib/db";
import type { Actor } from "./policy";
import { actorCan } from "./policy";
import { ServiceError } from "./auth";

/**
 * Administration reads.
 *
 * Each function asserts its own capability rather than trusting the layout that
 * rendered it. The admin layout redirects non-staff as a convenience, but a
 * moderator reaching /admin/finance by typing the URL must be refused here —
 * the layout check is not the boundary.
 */

function require(actor: Actor, permission: Parameters<typeof actorCan>[1]) {
  if (!actorCan(actor, permission)) {
    throw new ServiceError("You do not have access to this area.", 403);
  }
}

export async function listMembers(
  actor: Actor,
  opts: { query?: string; role?: string; take?: number } = {},
) {
  require(actor, "user:view");

  const q = opts.query?.trim();

  return db.user.findMany({
    where: {
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { email: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
      ...(opts.role ? { role: opts.role as never } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: opts.take ?? 50,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      lifetimePoints: true,
      currentStreak: true,
      country: true,
      extraRoles: { select: { role: true } },
      _count: { select: { enrollments: true, certificates: true } },
    },
  });
}

/** Feature flags, for the platform page. */
export async function listFeatureFlags(actor: Actor) {
  require(actor, "feature_flag:manage");
  return db.featureFlag.findMany({ orderBy: { key: "asc" } });
}

export async function setFeatureFlag(
  actor: Actor,
  params: { key: string; enabled: boolean },
) {
  require(actor, "feature_flag:manage");

  const flag = await db.featureFlag.findUnique({ where: { key: params.key } });
  if (!flag) throw new ServiceError("Unknown feature flag.", 404);

  return db.featureFlag.update({
    where: { key: params.key },
    data: { isEnabled: params.enabled },
    select: { key: true, isEnabled: true, description: true },
  });
}

/** The audit log, newest first. Read-only — there is no mutation for it. */
export async function listAuditLog(
  actor: Actor,
  opts: { take?: number; action?: string } = {},
) {
  require(actor, "audit:view");

  return db.auditLog.findMany({
    where: opts.action ? { action: { startsWith: opts.action } } : {},
    orderBy: { createdAt: "desc" },
    take: opts.take ?? 100,
    select: {
      id: true,
      action: true,
      entityType: true,
      entityId: true,
      ipAddress: true,
      metadata: true,
      createdAt: true,
      user: { select: { name: true, email: true, role: true } },
    },
  });
}

/** Every certificate, for the issue/revoke desk. */
export async function listCertificates(actor: Actor, opts: { take?: number } = {}) {
  require(actor, "certificate:issue_manual");

  return db.certificate.findMany({
    orderBy: { issuedAt: "desc" },
    take: opts.take ?? 60,
    select: {
      id: true,
      serial: true,
      verifyToken: true,
      finalScore: true,
      issuedAt: true,
      revokedAt: true,
      revokeReason: true,
      user: { select: { name: true, email: true } },
      course: { select: { title: true, slug: true } },
    },
  });
}

/** All tickets, for the support desk. */
export async function listAllTickets(actor: Actor) {
  require(actor, "ticket:respond");

  return db.supportTicket.findMany({
    orderBy: [
      // Urgent first, then oldest — a security report must never sit behind a
      // billing question just because it arrived later.
      { priority: "desc" },
      { createdAt: "asc" },
    ],
    take: 80,
    select: {
      id: true,
      reference: true,
      subject: true,
      category: true,
      status: true,
      priority: true,
      createdAt: true,
      firstRespondedAt: true,
      requester: { select: { name: true, email: true } },
      agent: { select: { name: true } },
      _count: { select: { messages: true } },
    },
  });
}
