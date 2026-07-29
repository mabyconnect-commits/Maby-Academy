import "server-only";
import type { NotificationType, Prisma } from "@prisma/client";
import { db } from "@/lib/db";

type Tx = Prisma.TransactionClient;

export async function notify(
  client: Tx | typeof db,
  params: {
    userId: string;
    type: NotificationType;
    title: string;
    body: string;
    linkUrl?: string;
  },
) {
  return client.notification.create({ data: params });
}

export async function listNotifications(userId: string, limit = 30) {
  return db.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function countUnread(userId: string) {
  return db.notification.count({ where: { userId, readAt: null } });
}

export async function markRead(userId: string, notificationId?: string) {
  return db.notification.updateMany({
    where: {
      userId,
      readAt: null,
      ...(notificationId ? { id: notificationId } : {}),
    },
    data: { readAt: new Date() },
  });
}

export async function audit(params: {
  userId?: string | null;
  action: string;
  entityType?: string;
  entityId?: string;
  metadata?: Prisma.InputJsonValue;
  ipAddress?: string | null;
}) {
  return db.auditLog
    .create({
      data: {
        userId: params.userId ?? null,
        action: params.action,
        entityType: params.entityType,
        entityId: params.entityId,
        metadata: params.metadata,
        ipAddress: params.ipAddress ?? null,
      },
    })
    // Auditing must never take down the action it is recording.
    .catch(() => null);
}
