/**
 * How a learner's enrolment is triaged on an instructor's roster.
 *
 * Pure, and deliberately kept out of the roster service so it can be tested
 * directly — the service imports `server-only`, which cannot be loaded from a
 * test runner. The rule this encodes is the whole reason the roster exists, so
 * it is worth being able to assert it without a database.
 */

export type RosterFlag =
  | "stalled"
  | "at-risk"
  | "awaiting-grade"
  | "on-track"
  | "done";

/** How stale an enrolment gets before it is worth an instructor's attention. */
export const STALLED_AFTER_DAYS = 14;

/** Progress below this after the stall window reads as "stuck", not "slow". */
export const STUCK_BELOW_PERCENT = 80;

export type FlagInput = {
  status: string;
  progressPercent: number;
  /**
   * Days since the learner last touched the course — measured from the
   * enrolment when they have never opened it at all. Deriving this only from
   * `lastAccessedAt` left the never-opened case null and skipped the stall
   * check, so someone who signed up two months ago and never opened a single
   * lesson came out as "on track", which is the opposite of the truth.
   */
  idleDays: number;
  awaitingGrade: number;
  needsResubmission: number;
};

/**
 * Order matters, and it is the instructor's order of obligation: work the
 * instructor owes the student outranks work the student owes back, which
 * outranks a student who has quietly disappeared.
 */
export function flagFor(input: FlagInput): RosterFlag {
  if (input.status === "COMPLETED" || input.progressPercent >= 100) return "done";
  if (input.awaitingGrade > 0) return "awaiting-grade";
  if (input.needsResubmission > 0) return "at-risk";
  if (
    input.idleDays >= STALLED_AFTER_DAYS &&
    input.progressPercent < STUCK_BELOW_PERCENT
  ) {
    return "stalled";
  }
  return "on-track";
}

/** Sort rank for the roster: most in need of attention first. */
export const FLAG_RANK: Record<RosterFlag, number> = {
  "awaiting-grade": 0,
  "at-risk": 1,
  stalled: 2,
  "on-track": 3,
  done: 4,
};
