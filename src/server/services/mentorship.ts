import "server-only";
import { db } from "@/lib/db";
import { ServiceError } from "./auth";

/**
 * Mentorship.
 *
 * The privacy boundary is the whole point of this module, so it is stated once
 * here and enforced in every function:
 *
 *  - A mentor sees a mentee's *learning progress* by default — enrolments,
 *    completion, graded work. That is what mentoring requires.
 *  - A mentor sees a mentee's *goals* only when that goal is shared, and their
 *    *journal* only when the mentee has granted journal consent on the
 *    assignment. Consent is per-assignment, off by default, and revocable.
 *  - `privateNotes` on a session are mentor-only working notes. Every
 *    mentee-facing read below selects `sharedNotes` and never `privateNotes`,
 *    which is why the split exists rather than one notes field with a flag.
 */

/** What the mentee sees on their own mentorship page. */
export async function getMenteeView(userId: string) {
  const assignment = await db.mentorAssignment.findFirst({
    where: { menteeId: userId, isActive: true },
    select: {
      id: true,
      journalConsent: true,
      startedAt: true,
      mentor: {
        select: { id: true, name: true, avatarUrl: true, bio: true },
      },
      sessions: {
        orderBy: { scheduledAt: "desc" },
        select: {
          id: true,
          scheduledAt: true,
          durationMins: true,
          meetingUrl: true,
          status: true,
          // sharedNotes only. `privateNotes` must never appear in a mentee
          // query, and leaving it out of the select is the enforcement.
          sharedNotes: true,
        },
      },
    },
  });

  return assignment;
}

/** The mentor's roster. Progress only — no journals, no unshared goals. */
export async function listMentees(mentorId: string) {
  return db.mentorAssignment.findMany({
    where: { mentorId, isActive: true },
    orderBy: { startedAt: "asc" },
    select: {
      id: true,
      journalConsent: true,
      startedAt: true,
      mentee: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
          currentStreak: true,
          lifetimePoints: true,
          enrollments: {
            where: { status: "ACTIVE" },
            select: {
              progressPercent: true,
              lastAccessedAt: true,
              course: { select: { title: true, slug: true } },
            },
          },
          _count: { select: { certificates: true } },
        },
      },
      sessions: {
        where: { status: "SCHEDULED", scheduledAt: { gte: new Date() } },
        orderBy: { scheduledAt: "asc" },
        take: 1,
        select: { id: true, scheduledAt: true, meetingUrl: true },
      },
    },
  });
}

/**
 * A risk flag is a prompt to reach out, not a score and not a judgement.
 *
 * It is computed here rather than stored so it can never go stale, and it
 * deliberately looks only at behaviour the mentee has already agreed a mentor
 * can see — activity dates and course progress. It never reads a journal, a
 * habit or an unshared goal.
 */
export type MenteeRisk = { level: "ok" | "watch" | "stalled"; reason: string };

export function assessRisk(mentee: {
  enrollments: { progressPercent: number; lastAccessedAt: Date | null }[];
}): MenteeRisk {
  if (mentee.enrollments.length === 0) {
    return { level: "watch", reason: "No active course" };
  }

  const lastTouch = mentee.enrollments
    .map((e) => e.lastAccessedAt?.getTime() ?? 0)
    .reduce((a, b) => Math.max(a, b), 0);

  if (lastTouch === 0) {
    return { level: "watch", reason: "Enrolled but not started" };
  }

  const days = Math.floor((Date.now() - lastTouch) / 86_400_000);
  if (days >= 21) return { level: "stalled", reason: `Quiet for ${days} days` };
  if (days >= 10) return { level: "watch", reason: `Quiet for ${days} days` };
  return { level: "ok", reason: `Active ${days === 0 ? "today" : `${days}d ago`}` };
}

/**
 * The mentee grants or revokes journal access.
 *
 * Only the mentee can call this — the signature takes the mentee's id as the
 * authority and looks the assignment up by it, so a mentor cannot grant
 * themselves consent by passing an assignment id.
 */
export async function setJournalConsent(params: {
  menteeId: string;
  assignmentId: string;
  consent: boolean;
}) {
  const assignment = await db.mentorAssignment.findUnique({
    where: { id: params.assignmentId },
    select: { menteeId: true },
  });

  if (!assignment || assignment.menteeId !== params.menteeId) {
    throw new ServiceError("Mentorship not found.", 404);
  }

  return db.mentorAssignment.update({
    where: { id: params.assignmentId },
    data: { journalConsent: params.consent },
    select: { id: true, journalConsent: true },
  });
}

export async function listMentorSessions(mentorId: string) {
  return db.mentorSession.findMany({
    where: { mentorId },
    orderBy: { scheduledAt: "desc" },
    take: 40,
    select: {
      id: true,
      scheduledAt: true,
      durationMins: true,
      status: true,
      meetingUrl: true,
      sharedNotes: true,
      privateNotes: true,
      mentee: { select: { id: true, name: true, avatarUrl: true } },
    },
  });
}
