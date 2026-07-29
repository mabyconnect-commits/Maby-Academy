import "server-only";
import type { Role } from "@prisma/client";
import { db } from "@/lib/db";
import { permissionsFor, type PermissionKey } from "@/lib/auth/permissions";
import { AuthError } from "@/lib/auth/session";

/**
 * Object-level access control.
 *
 * A permission answers "may this role ever do this?". It cannot answer "may
 * this person do this *to this record?*" — holding `submission:grade` says
 * nothing about whose submission. Previously each service answered the second
 * question its own way, which is exactly how one of them eventually forgets.
 *
 * Every check here takes the actor and the specific record, and returns a
 * decision. Services call these instead of hand-rolling ownership tests.
 */

export type Actor = {
  id: string;
  role: Role;
  extraRoles?: Role[];
};

function rolesOf(actor: Actor): Role[] {
  return [actor.role, ...(actor.extraRoles ?? [])];
}

export function actorCan(actor: Actor, permission: PermissionKey): boolean {
  return permissionsFor(rolesOf(actor)).has(permission);
}

/** Throws unless the actor holds the capability at all. */
export function assertCan(actor: Actor, permission: PermissionKey) {
  if (!actorCan(actor, permission)) {
    throw new AuthError("You do not have access to this resource.", 403);
  }
}

function isPlatformStaff(actor: Actor) {
  return rolesOf(actor).some((r) => r === "ADMIN" || r === "SUPER_ADMIN");
}

// ---------------------------------------------------------------------------
// Courses
// ---------------------------------------------------------------------------

/** May the actor edit this course's content? */
export async function canEditCourse(actor: Actor, courseId: string) {
  if (!actorCan(actor, "course:edit")) return false;
  if (isPlatformStaff(actor)) return true;

  const course = await db.course.findUnique({
    where: { id: courseId },
    select: { instructorId: true },
  });
  return course?.instructorId === actor.id;
}

export async function assertCanEditCourse(actor: Actor, courseId: string) {
  if (!(await canEditCourse(actor, courseId))) {
    throw new AuthError("You can only edit courses you teach.", 403);
  }
}

/**
 * May the actor see this course at all?
 *
 * Published courses are public. Unpublished ones are visible to their author,
 * to reviewers (who must read it to approve it), and to platform staff.
 */
export async function canViewCourse(actor: Actor | null, courseId: string) {
  const course = await db.course.findUnique({
    where: { id: courseId },
    select: { status: true, instructorId: true },
  });
  if (!course) return false;
  if (course.status === "PUBLISHED") return true;
  if (!actor) return false;

  if (isPlatformStaff(actor)) return true;
  if (course.instructorId === actor.id) return true;
  return actorCan(actor, "course:approve");
}

// ---------------------------------------------------------------------------
// Submissions
// ---------------------------------------------------------------------------

/** May the actor grade this submission? */
export async function canGradeSubmission(actor: Actor, submissionId: string) {
  if (!actorCan(actor, "submission:grade")) return false;
  if (isPlatformStaff(actor)) return true;

  const submission = await db.submission.findUnique({
    where: { id: submissionId },
    select: {
      assignment: {
        select: {
          lesson: {
            select: { module: { select: { course: { select: { instructorId: true } } } } },
          },
        },
      },
    },
  });

  return (
    submission?.assignment.lesson.module.course.instructorId === actor.id
  );
}

export async function assertCanGradeSubmission(
  actor: Actor,
  submissionId: string,
) {
  if (!(await canGradeSubmission(actor, submissionId))) {
    throw new AuthError("You cannot grade work for this course.", 403);
  }
}

/** May the actor read this submission? Students may read only their own. */
export async function canViewSubmission(actor: Actor, submissionId: string) {
  const submission = await db.submission.findUnique({
    where: { id: submissionId },
    select: { studentId: true },
  });
  if (!submission) return false;
  if (submission.studentId === actor.id) return true;
  if (!actorCan(actor, "submission:view")) return false;
  if (isPlatformStaff(actor)) return true;

  // Support may read submissions to resolve tickets; instructors only their own.
  if (rolesOf(actor).includes("SUPPORT")) return true;
  return canGradeSubmission(actor, submissionId);
}

// ---------------------------------------------------------------------------
// Journals — the strictest boundary on the platform
// ---------------------------------------------------------------------------

/**
 * Journals are readable by their author, and by a mentor **only** where that
 * specific mentee has granted consent on their assignment. No administrative
 * role overrides this: a journal nobody trusts is a journal nobody writes in,
 * and the feature is worthless the moment that stops being true.
 */
export async function canReadJournal(actor: Actor, journalOwnerId: string) {
  if (actor.id === journalOwnerId) return true;
  if (!actorCan(actor, "mentee:view_journal")) return false;

  const assignment = await db.mentorAssignment.findUnique({
    where: { mentorId_menteeId: { mentorId: actor.id, menteeId: journalOwnerId } },
    select: { journalConsent: true, isActive: true },
  });

  return Boolean(assignment?.isActive && assignment.journalConsent);
}

export async function assertCanReadJournal(actor: Actor, ownerId: string) {
  if (!(await canReadJournal(actor, ownerId))) {
    throw new AuthError("This journal is private.", 403);
  }
}

// ---------------------------------------------------------------------------
// Community
// ---------------------------------------------------------------------------

/** Authors may edit their own posts; moderators may edit anyone's. */
export async function canModifyPost(actor: Actor, postId: string) {
  const post = await db.post.findUnique({
    where: { id: postId },
    select: { authorId: true },
  });
  if (!post) return false;
  if (post.authorId === actor.id) return true;
  return actorCan(actor, "report:review");
}

export async function canModifyComment(actor: Actor, commentId: string) {
  const comment = await db.comment.findUnique({
    where: { id: commentId },
    select: { authorId: true },
  });
  if (!comment) return false;
  if (comment.authorId === actor.id) return true;
  return actorCan(actor, "report:review");
}

// ---------------------------------------------------------------------------
// Mentorship
// ---------------------------------------------------------------------------

export async function canViewMenteeProgress(actor: Actor, menteeId: string) {
  if (actor.id === menteeId) return true;
  if (isPlatformStaff(actor)) return true;
  if (!actorCan(actor, "mentee:view_progress")) return false;

  const assignment = await db.mentorAssignment.findUnique({
    where: { mentorId_menteeId: { mentorId: actor.id, menteeId } },
    select: { isActive: true },
  });
  return Boolean(assignment?.isActive);
}

// ---------------------------------------------------------------------------
// Support
// ---------------------------------------------------------------------------

export async function canViewTicket(actor: Actor, ticketId: string) {
  const ticket = await db.supportTicket.findUnique({
    where: { id: ticketId },
    select: { requesterId: true },
  });
  if (!ticket) return false;
  if (ticket.requesterId === actor.id) return true;
  return actorCan(actor, "ticket:respond");
}
