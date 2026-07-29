import "server-only";
import type { CourseStatus } from "@prisma/client";
import { db } from "@/lib/db";
import { ServiceError } from "./auth";
import { notify, audit } from "./notifications";
import { assertCan, assertCanEditCourse, type Actor } from "./policy";

/**
 * Course editorial workflow.
 *
 *   DRAFT ──submit──▶ IN_REVIEW ──approve──▶ APPROVED ──publish──▶ PUBLISHED
 *                         │                                            │
 *                         └──request changes──▶ CHANGES_REQUESTED      │
 *                                     │                                │
 *                                     └──────── back to DRAFT ◀────────┘
 *
 * The point of the gate is that the author cannot open it. An instructor may
 * submit but not approve; approving and publishing are separate capabilities
 * so a reviewer signing off on quality does not also decide release timing.
 */

const TRANSITIONS: Record<CourseStatus, CourseStatus[]> = {
  DRAFT: ["IN_REVIEW", "ARCHIVED"],
  IN_REVIEW: ["APPROVED", "CHANGES_REQUESTED", "DRAFT"],
  CHANGES_REQUESTED: ["DRAFT", "IN_REVIEW"],
  APPROVED: ["PUBLISHED", "DRAFT", "ARCHIVED"],
  PUBLISHED: ["ARCHIVED", "DRAFT"],
  ARCHIVED: ["DRAFT"],
};

export function canTransition(from: CourseStatus, to: CourseStatus): boolean {
  return TRANSITIONS[from]?.includes(to) ?? false;
}

async function loadCourse(courseId: string) {
  const course = await db.course.findUnique({
    where: { id: courseId },
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      instructorId: true,
      _count: { select: { modules: true } },
    },
  });
  if (!course) throw new ServiceError("Course not found.", 404);
  return course;
}

async function applyTransition(params: {
  actorId: string;
  courseId: string;
  from: CourseStatus;
  to: CourseStatus;
  notes?: string;
  extraData?: Record<string, unknown>;
}) {
  return db.$transaction(async (tx) => {
    const updated = await tx.course.update({
      where: { id: params.courseId },
      data: {
        status: params.to,
        reviewNotes: params.notes ?? null,
        ...(params.extraData ?? {}),
      },
    });

    await tx.courseReviewLog.create({
      data: {
        courseId: params.courseId,
        actorId: params.actorId,
        fromStatus: params.from,
        toStatus: params.to,
        notes: params.notes ?? null,
      },
    });

    return updated;
  });
}

/** Instructor sends a course for editorial review. */
export async function submitForReview(
  actor: Actor,
  courseId: string,
  notes?: string,
) {
  assertCan(actor, "course:submit_for_review");
  await assertCanEditCourse(actor, courseId);

  const course = await loadCourse(courseId);

  if (!canTransition(course.status, "IN_REVIEW")) {
    throw new ServiceError(
      `A course in ${course.status.toLowerCase().replace(/_/g, " ")} cannot be sent for review.`,
      400,
    );
  }
  // An empty course wastes a reviewer's time; catch it here rather than there.
  if (course._count.modules === 0) {
    throw new ServiceError(
      "Add at least one module before submitting for review.",
      400,
    );
  }

  const updated = await applyTransition({
    actorId: actor.id,
    courseId,
    from: course.status,
    to: "IN_REVIEW",
    notes,
    extraData: { submittedForReviewAt: new Date() },
  });

  await audit({
    userId: actor.id,
    action: "course.submitted_for_review",
    entityType: "Course",
    entityId: courseId,
  });

  return updated;
}

/** Reviewer approves the content. Approval is not publication. */
export async function approveCourse(
  actor: Actor,
  courseId: string,
  notes?: string,
) {
  assertCan(actor, "course:approve");
  const course = await loadCourse(courseId);

  // Authors cannot approve their own work, whatever else they hold. This is
  // the entire reason the gate exists.
  if (course.instructorId === actor.id && actor.role !== "SUPER_ADMIN") {
    throw new ServiceError(
      "You cannot approve a course you authored. Ask another reviewer.",
      403,
    );
  }

  if (!canTransition(course.status, "APPROVED")) {
    throw new ServiceError("This course is not awaiting review.", 400);
  }

  const updated = await applyTransition({
    actorId: actor.id,
    courseId,
    from: course.status,
    to: "APPROVED",
    notes,
    extraData: { reviewedById: actor.id, reviewedAt: new Date() },
  });

  await notify(db, {
    userId: course.instructorId,
    type: "COURSE",
    title: `Approved: ${course.title}`,
    body: notes
      ? `Your course passed review. Reviewer notes: ${notes}`
      : "Your course passed editorial review and is ready to publish.",
    linkUrl: `/admin/courses/${courseId}`,
  });

  await audit({
    userId: actor.id,
    action: "course.approved",
    entityType: "Course",
    entityId: courseId,
  });

  return updated;
}

/** Reviewer sends it back. Notes are mandatory — "no" without "why" is useless. */
export async function requestChanges(
  actor: Actor,
  courseId: string,
  notes: string,
) {
  assertCan(actor, "course:approve");

  if (!notes?.trim()) {
    throw new ServiceError(
      "Explain what needs to change — a rejection without reasons cannot be acted on.",
      400,
    );
  }

  const course = await loadCourse(courseId);
  if (!canTransition(course.status, "CHANGES_REQUESTED")) {
    throw new ServiceError("This course is not awaiting review.", 400);
  }

  const updated = await applyTransition({
    actorId: actor.id,
    courseId,
    from: course.status,
    to: "CHANGES_REQUESTED",
    notes,
    extraData: { reviewedById: actor.id, reviewedAt: new Date() },
  });

  await notify(db, {
    userId: course.instructorId,
    type: "COURSE",
    title: `Changes requested: ${course.title}`,
    body: notes,
    linkUrl: `/admin/courses/${courseId}`,
  });

  await audit({
    userId: actor.id,
    action: "course.changes_requested",
    entityType: "Course",
    entityId: courseId,
  });

  return updated;
}

/** Publish an approved course. Separate capability from approval. */
export async function publishCourse(actor: Actor, courseId: string) {
  assertCan(actor, "course:publish");
  const course = await loadCourse(courseId);

  if (!canTransition(course.status, "PUBLISHED")) {
    throw new ServiceError(
      "Only an approved course can be published. Send it for review first.",
      400,
    );
  }

  const updated = await applyTransition({
    actorId: actor.id,
    courseId,
    from: course.status,
    to: "PUBLISHED",
    extraData: { publishedAt: new Date() },
  });

  await notify(db, {
    userId: course.instructorId,
    type: "COURSE",
    title: `Published: ${course.title}`,
    body: "Your course is live and open for enrolment.",
    linkUrl: `/courses/${course.slug}`,
  });

  await audit({
    userId: actor.id,
    action: "course.published",
    entityType: "Course",
    entityId: courseId,
  });

  return updated;
}

export async function archiveCourse(
  actor: Actor,
  courseId: string,
  notes?: string,
) {
  assertCan(actor, "course:archive");
  const course = await loadCourse(courseId);

  if (!canTransition(course.status, "ARCHIVED")) {
    throw new ServiceError("This course cannot be archived from its current state.", 400);
  }

  const updated = await applyTransition({
    actorId: actor.id,
    courseId,
    from: course.status,
    to: "ARCHIVED",
    notes,
  });

  await audit({
    userId: actor.id,
    action: "course.archived",
    entityType: "Course",
    entityId: courseId,
  });

  return updated;
}

/** Courses waiting on a reviewer, excluding any the actor authored. */
export async function getReviewQueue(actor: Actor) {
  return db.course.findMany({
    where: {
      status: "IN_REVIEW",
      ...(actor.role === "SUPER_ADMIN"
        ? {}
        : { instructorId: { not: actor.id } }),
    },
    orderBy: { submittedForReviewAt: "asc" },
    include: {
      instructor: { select: { name: true, avatarUrl: true } },
      category: { select: { name: true, iconEmoji: true } },
      _count: { select: { modules: true } },
    },
  });
}

export async function getCourseReviewHistory(courseId: string) {
  return db.courseReviewLog.findMany({
    where: { courseId },
    orderBy: { createdAt: "desc" },
    take: 25,
  });
}
