import "server-only";
import { db } from "@/lib/db";
import { ServiceError } from "./auth";
import { awardPoints, touchStreak } from "./rewards";
import { notify } from "./notifications";

export async function listUpcomingSessions(userId?: string) {
  return db.liveSession.findMany({
    where: {
      startsAt: { gte: new Date(Date.now() - 2 * 60 * 60 * 1000) },
      status: { in: ["SCHEDULED", "LIVE"] },
    },
    orderBy: { startsAt: "asc" },
    include: {
      host: { select: { id: true, name: true, avatarUrl: true } },
      course: { select: { title: true, slug: true } },
      _count: { select: { rsvps: true } },
      ...(userId
        ? { rsvps: { where: { userId }, select: { id: true, attended: true } } }
        : {}),
    },
  });
}

export async function listPastSessions(limit = 12) {
  return db.liveSession.findMany({
    where: { status: "ENDED" },
    orderBy: { startsAt: "desc" },
    take: limit,
    include: {
      host: { select: { name: true, avatarUrl: true } },
      course: { select: { title: true, slug: true } },
    },
  });
}

export async function toggleRsvp(userId: string, sessionId: string) {
  const session = await db.liveSession.findUnique({
    where: { id: sessionId },
    select: {
      id: true,
      title: true,
      startsAt: true,
      capacity: true,
      status: true,
      _count: { select: { rsvps: true } },
    },
  });
  if (!session) throw new ServiceError("Session not found.", 404);
  if (session.status === "CANCELLED" || session.status === "ENDED") {
    throw new ServiceError("This session is no longer open for RSVPs.", 400);
  }

  const existing = await db.liveSessionRsvp.findUnique({
    where: { sessionId_userId: { sessionId, userId } },
  });

  if (existing) {
    await db.liveSessionRsvp.delete({ where: { id: existing.id } });
    return { rsvped: false };
  }

  if (session.capacity !== null && session._count.rsvps >= session.capacity) {
    throw new ServiceError("This session is fully booked.", 409);
  }

  await db.liveSessionRsvp.create({ data: { sessionId, userId } });

  await notify(db, {
    userId,
    type: "LIVE_SESSION",
    title: `You're on the list: ${session.title}`,
    body: `Starts ${session.startsAt.toUTCString()}. The join link appears here when it goes live.`,
    linkUrl: "/dashboard/live",
  });

  return { rsvped: true };
}

/** Marks attendance and credits points — run by a host after a session. */
export async function markAttendance(
  sessionId: string,
  userIds: string[],
) {
  const session = await db.liveSession.findUnique({
    where: { id: sessionId },
    select: { id: true, title: true, pointsValue: true },
  });
  if (!session) throw new ServiceError("Session not found.", 404);

  return db.$transaction(async (tx) => {
    await tx.liveSessionRsvp.updateMany({
      where: { sessionId, userId: { in: userIds } },
      data: { attended: true },
    });

    for (const userId of userIds) {
      await awardPoints(tx, {
        userId,
        amount: session.pointsValue,
        reason: "LIVE_ATTENDED",
        referenceKey: `live:${sessionId}`,
        note: session.title,
      });
      await touchStreak(tx, userId);
    }

    return { attended: userIds.length };
  });
}

export async function getMySessions(userId: string) {
  return db.liveSessionRsvp.findMany({
    where: { userId },
    orderBy: { session: { startsAt: "asc" } },
    include: {
      session: {
        include: {
          host: { select: { name: true, avatarUrl: true } },
          course: { select: { title: true, slug: true } },
        },
      },
    },
  });
}
