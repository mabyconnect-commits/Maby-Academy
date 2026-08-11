import { describe, expect, it } from "vitest";
import { lessonAnswerSchema, lessonQuestionSchema } from "./validation";

describe("lessonQuestionSchema", () => {
  it("accepts a real question and trims surrounding whitespace", () => {
    const result = lessonQuestionSchema.parse({
      lessonId: "lesson_1",
      body: "  Why does the wallet show a different balance?  ",
    });
    expect(result.body).toBe("Why does the wallet show a different balance?");
  });

  it("rejects a body that is only whitespace or too short", () => {
    expect(() =>
      lessonQuestionSchema.parse({ lessonId: "lesson_1", body: "   " }),
    ).toThrow();
    expect(() =>
      lessonQuestionSchema.parse({ lessonId: "lesson_1", body: "hi" }),
    ).toThrow();
  });

  it("rejects a missing lessonId", () => {
    expect(() =>
      lessonQuestionSchema.parse({ lessonId: "", body: "A perfectly fine question" }),
    ).toThrow();
  });

  it("rejects a body past the length ceiling", () => {
    expect(() =>
      lessonQuestionSchema.parse({
        lessonId: "lesson_1",
        body: "x".repeat(4001),
      }),
    ).toThrow();
  });
});

describe("lessonAnswerSchema", () => {
  it("accepts a short answer and trims it", () => {
    const result = lessonAnswerSchema.parse({
      questionId: "q_1",
      body: "  Check the network selector.  ",
    });
    expect(result.body).toBe("Check the network selector.");
  });

  it("rejects an empty answer", () => {
    expect(() =>
      lessonAnswerSchema.parse({ questionId: "q_1", body: " " }),
    ).toThrow();
  });

  it("rejects an answer past the length ceiling", () => {
    expect(() =>
      lessonAnswerSchema.parse({ questionId: "q_1", body: "x".repeat(8001) }),
    ).toThrow();
  });
});
