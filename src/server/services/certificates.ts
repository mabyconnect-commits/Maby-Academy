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

  return issueCertificate(client, {
    userId: params.userId,
    courseId: params.courseId,
    finalScore: params.progressPercent,
  });
}
