/**
 * Rubrics are stored as JSON, and two shapes exist in the data.
 *
 * The authored course content declares `{ criterion, weight, descriptor }`,
 * which reads better in a course file. The authoring UI and the inline seed
 * write `{ name, maxPoints, description }`, which is what every consumer
 * expects.
 *
 * The content loader now normalises to the second shape on the way in, so new
 * data is consistent. This parser accepts both anyway, because a database
 * seeded before that fix still has to grade correctly — and because a blind
 * cast is what caused the original bug: rubrics with no `name` rendered as
 * blank criteria, keyed their scores under "undefined", and left the grader's
 * derived total stuck at zero on every authored course.
 *
 * No `server-only` import: this is shared with the client-side assignment
 * view, which shows learners how their work will be marked.
 */
export type RubricCriterion = {
  name: string;
  maxPoints: number;
  description?: string;
};

export function parseRubric(value: unknown): RubricCriterion[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((row) => {
    if (typeof row !== "object" || row === null) return [];
    const r = row as Record<string, unknown>;

    const name =
      typeof r.name === "string"
        ? r.name
        : typeof r.criterion === "string"
          ? r.criterion
          : null;
    // A criterion with no usable name is dropped rather than rendered blank —
    // an unlabelled score box is worse than one fewer row.
    if (name === null) return [];

    const maxPoints =
      typeof r.maxPoints === "number"
        ? r.maxPoints
        : typeof r.weight === "number"
          ? r.weight
          : 0;

    const description =
      typeof r.description === "string"
        ? r.description
        : typeof r.descriptor === "string"
          ? r.descriptor
          : undefined;

    return [{ name, maxPoints, description }];
  });
}
