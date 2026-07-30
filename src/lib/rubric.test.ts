import { describe, expect, it } from "vitest";
import { parseRubric } from "./rubric";

describe("parseRubric", () => {
  it("reads the shape the authoring UI and inline seed write", () => {
    expect(
      parseRubric([
        { name: "Data accuracy", maxPoints: 30, description: "Sourced." },
      ]),
    ).toEqual([
      { name: "Data accuracy", maxPoints: 30, description: "Sourced." },
    ]);
  });

  it("reads the shape the authored course content writes", () => {
    // This is the case that broke grading: the form read `name`, found
    // undefined, keyed every score under "undefined" and derived a total of 0.
    expect(
      parseRubric([
        { criterion: "Sizing is derived", weight: 25, descriptor: "Shown." },
      ]),
    ).toEqual([
      { name: "Sizing is derived", maxPoints: 25, description: "Shown." },
    ]);
  });

  it("drops rows with no usable name rather than rendering them blank", () => {
    expect(parseRubric([{ weight: 10 }, { name: "Kept", maxPoints: 5 }])).toEqual(
      [{ name: "Kept", maxPoints: 5, description: undefined }],
    );
  });

  it("defaults a missing weight to zero rather than NaN", () => {
    // A NaN here propagated into the grader's derived total and made the
    // whole form unusable, not just the one criterion.
    const [row] = parseRubric([{ name: "No weight" }]);
    expect(row.maxPoints).toBe(0);
    expect(Number.isNaN(row.maxPoints)).toBe(false);
  });

  it("returns an empty list for anything that is not an array", () => {
    for (const value of [null, undefined, {}, "rubric", 7]) {
      expect(parseRubric(value)).toEqual([]);
    }
  });

  it("ignores non-object entries inside the array", () => {
    expect(parseRubric([null, "x", 3, { name: "Real", maxPoints: 1 }])).toEqual([
      { name: "Real", maxPoints: 1, description: undefined },
    ]);
  });
});
