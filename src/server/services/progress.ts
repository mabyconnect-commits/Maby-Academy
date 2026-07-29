import "server-only";
import type { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { ServiceError } from "./auth";
import { awardPoints, evaluateBadges, touchStreak } from "./rewards";
import { maybeCompleteCourse } from "./certificates";

type Tx = Prisma.TransactionClient;

/**
 * Recompute an enrolment's progress from the source of truth (completed
 * lesson rows) rather than incrementing a counter — so a re-run, a deleted
 * lesson or a manual fix can never leave the percentage wrong.
 */
export async function recomputeEnrollmentProgress(
  client: Tx,
  userId: string,
  courseId: string,
) {
  const lessons = await client.lesson.findMany({
    where: { module: { courseId } },
    select: { id: true },
  });
  const total = lessons.length;
  if (total === 0) return 0;

  const completed = await client.lessonProgress.count({
    where: {
      userId,
      isCompleted: true,
      lessonId: { in: lessons.map((l) => l.id) },
    },
  });

  const progressPercent = Math.round((completed / total) * 100);

  await client.enrollment.updateMany({
    where: { userId, courseId },
    data: { progressPercent },
  });

  return progressPercent;
}

/**
 * Record playback position and/or completion for a lesson.
 *
 * Points are awarded exactly once per lesson via the ledger's reference key,
 * so replaying "complete" is harmless.
 */
export async function trackLessonProgress(params: {
  userId: string;
  lessonId: string;
  watchedSeconds?: number;
  completed?: boolean;
}) {
  const lesson = await db.lesson.findUnique({
    where: { id: params.lessonId },
    select: {
      id: true,
      title: true,
      pointsValue: true,
      module: { select: { courseId: true, course: { select: { slug: true } } } },
    },
  });
  if (!lesson) throw new ServiceError("Lesson not found.", 404);

  const courseId = lesson.module.courseId;

  const enrollment = await db.enrollment.findUnique({
    where: { userId_courseId: { userId: params.userId, courseId } },
    select: { id: true },
  });
  if (!enrollment) {
    throw new ServiceError("Enrol in this course to track your progress.", 403);
  }

  return db.$transaction(async (tx) => {
    const existing = await tx.lessonProgress.findUnique({
      where: {
        userId_lessonId: { userId: params.userId, lessonId: lesson.id },
      },
    });

    const wasCompleted = existing?.isCompleted ?? false;
    const nowCompleted = params.completed ?? wasCompleted;

    // Watch position only ever moves forward — scrubbing back shouldn't
    // discard how far the student has actually watched.
    const watchedSeconds = Math.max(
      existing?.watchedSeconds ?? 0,
      params.watchedSeconds ?? 0,
    );

    await tx.lessonProgress.upsert({
      where: {
        userId_lessonId: { userId: params.userId, lessonId: lesson.id },
      },
      create: {
        userId: params.userId,
        lessonId: lesson.id,
        watchedSeconds,
        isCompleted: nowCompleted,
        completedAt: nowCompleted ? new Date() : null,
      },
      update: {
        watchedSeconds,
        isCompleted: nowCompleted,
        completedAt: nowCompleted
          ? (existing?.completedAt ?? new Date())
          : null,
      },
    });

    await tx.enrollment.update({
      where: { id: enrollment.id },
      data: { lastAccessedAt: new Date(), lastLessonId: lesson.id },
    });

    let awardedPoints = 0;
    let certificate = null;
    let newBadges: string[] = [];

    if (nowCompleted && !wasCompleted) {
      const credited = await awardPoints(tx, {
        userId: params.userId,
        amount: lesson.pointsValue,
        reason: "LESSON_COMPLETED",
        referenceKey: `lesson:${lesson.id}`,
        note: lesson.title,
      });
      if (credited) awardedPoints = lesson.pointsValue;

      await touchStreak(tx, params.userId);
    }

    const progressPercent = await recomputeEnrollmentProgress(
      tx,
      params.userId,
      courseId,
    );

    if (nowCompleted && !wasCompleted) {
      certificate = await maybeCompleteCourse(tx, {
        userId: params.userId,
        courseId,
        progressPercent,
      });
      newBadges = await evaluateBadges(tx, params.userId);
    }

    return { progressPercent, awardedPoints, certificate, newBadges };
  });
}

/** Everything the student dashboard shows above the fold. */
export async function getDashboardSummary(userId: string) {
  const now = new Date();

  const [
    enrollments,
    completedLessons,
    certificates,
    pendingSubmissions,
    gradedRecently,
    upcomingSessions,
    unreadCount,
    user,
  ] = await Promise.all([
    db.enrollment.findMany({
      where: { userId },
      orderBy: [{ lastAccessedAt: "desc" }, { enrolledAt: "desc" }],
      include: {
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
            thumbnailUrl: true,
            level: true,
            category: { select: { name: true, iconEmoji: true } },
          },
        },
      },
    }),
    db.lessonProgress.count({ where: { userId, isCompleted: true } }),
    db.certificate.count({ where: { userId, revokedAt: null } }),
    db.submission.count({
      where: { studentId: userId, status: { in: ["SUBMITTED", "UNDER_REVIEW"] } },
    }),
    db.submission.findMany({
      where: { studentId: userId, status: "GRADED" },
      orderBy: { gradedAt: "desc" },
      take: 3,
      include: {
        assignment: {
          select: {
            title: true,
            maxScore: true,
            lesson: {
              select: {
                slug: true,
                module: { select: { course: { select: { slug: true } } } },
              },
            },
          },
        },
      },
    }),
    db.liveSession.findMany({
      where: { startsAt: { gte: now }, status: { in: ["SCHEDULED", "LIVE"] } },
      orderBy: { startsAt: "asc" },
      take: 3,
      include: {
        host: { select: { name: true, avatarUrl: true } },
        course: { select: { title: true } },
        rsvps: { where: { userId }, select: { id: true } },
      },
    }),
    db.notification.count({ where: { userId, readAt: null } }),
    db.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        pointsBalance: true,
        lifetimePoints: true,
        currentStreak: true,
        longestStreak: true,
      },
    }),
  ]);

  const active = enrollments.filter((e) => e.status === "ACTIVE");
  const resume = active.find((e) => e.lastLessonId) ?? active[0] ?? null;

  return {
    user,
    enrollments,
    stats: {
      activeCourses: active.length,
      completedCourses: enrollments.filter((e) => e.status === "COMPLETED").length,
      completedLessons,
      certificates,
      pendingSubmissions,
      unreadCount,
    },
    resume,
    gradedRecently,
    upcomingSessions,
  };
}
