import { describe, expect, it } from "vitest";
import { shuffle } from "./utils";

describe("shuffle", () => {
  it("returns a new array without mutating the input", () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffle(input);
    expect(result).not.toBe(input);
    expect(input).toEqual([1, 2, 3, 4, 5]);
  });

  it("preserves every element exactly once", () => {
    const input = ["a", "b", "c", "d"];
    const result = shuffle(input);
    expect(result).toHaveLength(input.length);
    expect([...result].sort()).toEqual([...input].sort());
  });

  it("handles empty and single-element arrays", () => {
    expect(shuffle([])).toEqual([]);
    expect(shuffle([42])).toEqual([42]);
  });

  it("does not always leave the first element first (position carries no signal)", () => {
    // With 4 elements over 200 runs, the correct answer landing first every
    // time would be astronomically unlikely — this guards the anti-gaming fix.
    const input = [0, 1, 2, 3];
    let firstStayedFirst = 0;
    for (let i = 0; i < 200; i++) {
      if (shuffle(input)[0] === 0) firstStayedFirst++;
    }
    expect(firstStayedFirst).toBeLessThan(200);
    expect(firstStayedFirst).toBeGreaterThan(0);
  });
});
