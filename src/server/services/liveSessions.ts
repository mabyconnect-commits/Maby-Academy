import "server-only";
import { db } from "@/lib/db";
import { ServiceError } from "./auth";
import { awardPoints, touchStreak } from "./rewards";
import { notify } from "./notifications";
import { actorCan, canEditCourse, type Actor } from "./policy";

/** Whether the actor may schedule against any course, not just their own. */
function canScheduleAnyCourse(actor: Actor) {
  return actorCan(actor, "course:approve");
}

/**
 * Courses a staff member may attach a session to: everything for an admin or
 * reviewer, only their own for an instructor. An academy-wide session (no
 * course) is always allowed and doesn't need this list.
 */
export async function listSchedulableCourses(actor: Actor) {
  return db.course.findMany({
    where: canScheduleAnyCourse(actor) ? {} : { instructorId: actor.id },
    orderBy: { title: "asc" },
    select: { id: true, title: true },
  });
}

/**
 * Schedule a live session. Instructors can attach one to a course they teach;
 * admins to any course, or to none for an academy-wide session. Enrolled
 * learners are notified so "those taking that course can access the live
 * session" is true the moment it's scheduled, not only when they next look.
 */
export async function createLiveSession(params: {
  actor: Actor;
  title: string;
  description?: string;
  courseId?: string;
  startsAt: Date;
  endsAt: Date;
  meetingUrl?: string;
  capacity?: number;
  pointsValue?: number;
}) {
  if (params.endsAt <= params.startsAt) {
    throw new ServiceError("The end time must be after the start time.", 400);
  }

  let course: { id: string; title: string } | null = null;
  if (params.courseId) {
    const found = await db.course.findUnique({
      where: { id: params.courseId },
      select: { id: true, title: true },
    });
    if (!found) throw new ServiceError("That course does not exist.", 404);
    if (!(await canEditCourse(params.actor, found.id))) {
      throw new ServiceError(
        "You can only schedule sessions for courses you teach.",
        403,
      );
    }
    course = found;
  }

  const session = await db.liveSession.create({
    data: {
      title: params.title.trim(),
      description: params.description?.trim() || null,
      hostId: params.actor.id,
      courseId: course?.id ?? null,
      startsAt: params.startsAt,
      endsAt: params.endsAt,
      meetingUrl: params.meetingUrl?.trim() || null,
      capacity: params.capacity ?? null,
      pointsValue: params.pointsValue ?? 20,
    },
  });

  // Let the people it's for know. Only for a course session — an academy-wide
  // blast would notify everyone, which is a decision, not a default.
  if (course) {
    const enrolled = await db.enrollment.findMany({
      where: { courseId: course.id },
      select: { userId: true },
    });
    if (enrolled.length > 0) {
      await db.notification.createMany({
        data: enrolled.map((e) => ({
          userId: e.userId,
          type: "LIVE_SESSION" as const,
          title: `Live session scheduled: ${session.title}`,
          body: `A live session for ${course.title} is booked for ${session.startsAt.toUTCString()}. RSVP to save your place.`,
          linkUrl: "/dashboard/live",
        })),
      });
    }
  }

  return session;
}

/** Cancel a scheduled session and tell everyone who had RSVP'd. */
export async function cancelLiveSession(actor: Actor, sessionId: string) {
  const session = await db.liveSession.findUnique({
    where: { id: sessionId },
    select: {
      id: true,
      title: true,
      hostId: true,
      status: true,
      rsvps: { select: { userId: true } },
    },
  });
  if (!session) throw new ServiceError("Session not found.", 404);
  if (session.hostId !== actor.id && !canScheduleAnyCourse(actor)) {
    throw new ServiceError("You can only cancel a session you host.", 403);
  }
  if (session.status === "ENDED") {
    throw new ServiceError("A session that has ended cannot be cancelled.", 400);
  }

  await db.liveSession.update({
    where: { id: session.id },
    data: { status: "CANCELLED" },
  });

  if (session.rsvps.length > 0) {
    await db.notification.createMany({
      data: session.rsvps.map((r) => ({
        userId: r.userId,
        type: "LIVE_SESSION" as const,
        title: `Session cancelled: ${session.title}`,
        body: "A live session you'd booked has been cancelled. Sorry for the change of plan.",
        linkUrl: "/dashboard/live",
      })),
    });
  }

  return { cancelled: true };
}

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
      // Attendance is what makes a past session worth listing to a host.
      _count: { select: { rsvps: true } },
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
