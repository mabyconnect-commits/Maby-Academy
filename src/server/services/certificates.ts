import "server-only";
import type { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { certificateSerial, generateToken } from "@/lib/auth/tokens";
import { env } from "@/lib/env";
import { notify } from "./notifications";
import { awardPoints } from "./rewards";

type Tx = Prisma.TransactionClient;

export const COURSE_COMPLETION_POINTS = 250;

export function verifyUrl(token: string) {
  return `${env.NEXT_PUBLIC_APP_URL}/verify/${token}`;
}

/**
 * The final score a certificate should carry: the average of the learner's
 * graded assignment scores for the course, as a percentage — "whatever the
 * tutor graded them". Returns null when the course has no graded assignments,
 * so the caller can fall back to the completion percentage.
 *
 * Only GRADED submissions count, and there is exactly one per assignment (a
 * fail is RETURNED, a pass is GRADED), so this is a clean per-assignment mean.
 */
export async function computeCourseFinalScore(
  client: Tx,
  userId: string,
  courseId: string,
): Promise<number | null> {
  const graded = await client.submission.findMany({
    where: {
      studentId: userId,
      status: "GRADED",
      score: { not: null },
      assignment: { lesson: { module: { courseId } } },
    },
    select: { score: true, assignment: { select: { maxScore: true } } },
  });
  if (graded.length === 0) return null;

  const percents = graded.map((s) =>
    s.assignment.maxScore > 0 ? ((s.score as number) / s.assignment.maxScore) * 100 : 0,
  );
  return Math.round(percents.reduce((a, b) => a + b, 0) / percents.length);
}

/**
 * Courses the learner has finished the work for but whose certificate is still
 * waiting on a tutor — so the certificates page can say "grading in progress"
 * rather than showing nothing. A course counts as pending when the learner has
 * submitted assignment work that hasn't been graded yet and no certificate has
 * been issued.
 */
export async function getPendingCertificates(userId: string) {
  const awaiting = await db.submission.findMany({
    where: {
      studentId: userId,
      status: { in: ["SUBMITTED", "UNDER_REVIEW"] },
    },
    select: {
      assignment: {
        select: {
          lesson: {
            select: {
              module: {
                select: {
                  course: {
                    select: {
                      id: true,
                      title: true,
                      slug: true,
                      category: { select: { name: true, iconEmoji: true } },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  // One card per course, with a count of how many pieces are being graded.
  const byCourse = new Map<
    string,
    {
      courseId: string;
      title: string;
      slug: string;
      category: { name: string; iconEmoji: string | null };
      awaitingCount: number;
    }
  >();
  for (const s of awaiting) {
    const course = s.assignment.lesson.module.course;
    const entry = byCourse.get(course.id);
    if (entry) {
      entry.awaitingCount += 1;
    } else {
      byCourse.set(course.id, {
        courseId: course.id,
        title: course.title,
        slug: course.slug,
        category: course.category,
        awaitingCount: 1,
      });
    }
  }
  if (byCourse.size === 0) return [];

  // Drop any course that already has a certificate — grading finished.
  const certified = await db.certificate.findMany({
    where: { userId, courseId: { in: [...byCourse.keys()] }, revokedAt: null },
    select: { courseId: true },
  });
  for (const c of certified) byCourse.delete(c.courseId);

  return [...byCourse.values()];
}

/**
 * Issue a certificate for a completed course.
 *
 * Idempotent on (userId, courseId). The serial is derived from a live count,
 * so two certificates issued at the same instant can collide on the unique
 * index — we retry with the next number rather than failing the completion.
 */
export async function issueCertificate(
  client: Tx,
  params: { userId: string; courseId: string; finalScore?: number },
) {
  const existing = await client.certificate.findUnique({
    where: {
      userId_courseId: { userId: params.userId, courseId: params.courseId },
    },
  });
  if (existing) return existing;

  const course = await client.course.findUnique({
    where: { id: params.courseId },
    select: { title: true, slug: true },
  });

  const year = new Date().getFullYear();
  let lastError: unknown = null;

  for (let attempt = 0; attempt < 5; attempt++) {
    const count = await client.certificate.count();
    try {
      const certificate = await client.certificate.create({
        data: {
          userId: params.userId,
          courseId: params.courseId,
          serial: certificateSerial(count + 1 + attempt, year),
          verifyToken: generateToken(24),
          finalScore: params.finalScore ?? null,
        },
      });

      await notify(client, {
        userId: params.userId,
        type: "CERTIFICATE",
        title: "Your certificate is ready 🎓",
        body: `You completed ${course?.title ?? "your course"}. Your certificate is signed, serialised and publicly verifiable.`,
        linkUrl: "/dashboard/certificates",
      });

      return certificate;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Could not issue certificate");
}

export async function getMyCertificates(userId: string) {
  return db.certificate.findMany({
    where: { userId, revokedAt: null },
    orderBy: { issuedAt: "desc" },
    include: {
      course: {
        include: {
          category: true,
          instructor: { select: { name: true } },
        },
      },
    },
  });
}

/** Public lookup used by /verify/[token]. Returns null for revoked/unknown. */
export async function verifyCertificate(token: string) {
  const certificate = await db.certificate.findUnique({
    where: { verifyToken: token },
    include: {
      user: { select: { name: true, country: true } },
      course: {
        select: {
          title: true,
          level: true,
          estimatedHours: true,
          category: { select: { name: true } },
          instructor: { select: { name: true } },
        },
      },
    },
  });

  if (!certificate) return { status: "not_found" as const };
  if (certificate.revokedAt) {
    return { status: "revoked" as const, certificate };
  }
  return { status: "valid" as const, certificate };
}

/**
 * Called whenever progress changes. Marks the enrolment complete and issues
 * the certificate once the course's pass threshold is met.
 */
export async function maybeCompleteCourse(
  client: Tx,
  params: { userId: string; courseId: string; progressPercent: number },
) {
  const course = await client.course.findUnique({
    where: { id: params.courseId },
    select: { passThreshold: true, title: true },
  });
  if (!course) return null;
  if (params.progressPercent < course.passThreshold) return null;

  const enrollment = await client.enrollment.findUnique({
    where: {
      userId_courseId: { userId: params.userId, courseId: params.courseId },
    },
    select: { id: true, status: true },
  });
  if (!enrollment || enrollment.status === "COMPLETED") return null;

  await client.enrollment.update({
    where: { id: enrollment.id },
    data: { status: "COMPLETED", completedAt: new Date() },
  });

  await awardPoints(client, {
    userId: params.userId,
    amount: COURSE_COMPLETION_POINTS,
    reason: "COURSE_COMPLETED",
    referenceKey: `course:${params.courseId}`,
    note: course.title,
  });

  // The certificate carries the tutor's grade — the average of graded
  // assignments — falling back to completion for a course with none.
  const gradedScore = await computeCourseFinalScore(
    client,
    params.userId,
    params.courseId,
  );

  return issueCertificate(client, {
    userId: params.userId,
    courseId: params.courseId,
    finalScore: gradedScore ?? params.progressPercent,
  });
}
