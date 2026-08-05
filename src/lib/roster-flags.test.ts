import { describe, expect, it } from "vitest";
import {
  FLAG_RANK,
  STALLED_AFTER_DAYS,
  flagFor,
  type FlagInput,
} from "./roster-flags";

const base: FlagInput = {
  status: "ACTIVE",
  progressPercent: 40,
  idleDays: 1,
  awaitingGrade: 0,
  needsResubmission: 0,
};

const flag = (over: Partial<FlagInput>) => flagFor({ ...base, ...over });

describe("roster triage", () => {
  it("puts work the instructor owes ahead of everything else", () => {
    // Awaiting a grade wins even when the learner is also behind and silent —
    // an instructor cannot fairly call someone stalled while sitting on their
    // submission.
    expect(
      flag({ awaitingGrade: 1, needsResubmission: 3, idleDays: 90 }),
    ).toBe("awaiting-grade");
  });

  it("flags a learner who must resubmit ahead of one who is merely quiet", () => {
    expect(flag({ needsResubmission: 1, idleDays: 90 })).toBe("at-risk");
  });

  it("treats a long silence with low progress as stalled", () => {
    expect(flag({ idleDays: STALLED_AFTER_DAYS, progressPercent: 20 })).toBe(
      "stalled",
    );
  });

  it("does not call someone stalled a day before the window", () => {
    expect(flag({ idleDays: STALLED_AFTER_DAYS - 1, progressPercent: 20 })).toBe(
      "on-track",
    );
  });

  it("leaves a nearly-finished learner alone even when quiet", () => {
    // Someone at 85% who has not logged in for a month is coasting to the end,
    // not stuck. Chasing them is noise that makes the real flags easier to
    // ignore.
    expect(flag({ idleDays: 30, progressPercent: 85 })).toBe("on-track");
  });

  it("flags an enrolment that was never opened at all", () => {
    // The regression this file exists for: idle time used to be derived only
    // from the last access, which is null when there has never been one, so
    // the stall check was skipped and a learner who signed up two months ago
    // and opened nothing was reported as on track.
    expect(flag({ idleDays: 60, progressPercent: 0 })).toBe("stalled");
  });

  it("does not flag a brand-new enrolment", () => {
    expect(flag({ idleDays: 0, progressPercent: 0 })).toBe("on-track");
  });

  it("reports completion from either the status or full progress", () => {
    expect(flag({ status: "COMPLETED", idleDays: 200 })).toBe("done");
    expect(flag({ progressPercent: 100, idleDays: 200 })).toBe("done");
  });

  it("calls a finished course done even with work still in the queue", () => {
    expect(flag({ status: "COMPLETED", awaitingGrade: 2 })).toBe("done");
  });

  it("ranks flags in order of what needs attention first", () => {
    expect(FLAG_RANK["awaiting-grade"]).toBeLessThan(FLAG_RANK["at-risk"]);
    expect(FLAG_RANK["at-risk"]).toBeLessThan(FLAG_RANK.stalled);
    expect(FLAG_RANK.stalled).toBeLessThan(FLAG_RANK["on-track"]);
    expect(FLAG_RANK["on-track"]).toBeLessThan(FLAG_RANK.done);
  });
});
