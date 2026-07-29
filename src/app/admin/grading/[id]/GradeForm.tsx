"use client";

import { useActionState, useMemo, useState } from "react";
import { Alert, Field, Input, Textarea } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { emptyFormState } from "@/server/actions/formState";
import { gradeSubmissionAction } from "@/server/actions/learning";

type RubricCriterion = { name: string; description?: string; maxPoints: number };

export function GradeForm({
  submissionId,
  maxScore,
  passScore,
  rubric,
  defaultScore,
  defaultFeedback,
}: {
  submissionId: string;
  maxScore: number;
  passScore: number;
  rubric: RubricCriterion[];
  defaultScore: number | null;
  defaultFeedback: string;
}) {
  const [state, formAction] = useActionState(
    gradeSubmissionAction,
    emptyFormState,
  );

  // When a rubric exists the total score is derived from the criteria, so a
  // grader can't accidentally hand out a total that contradicts their marks.
  const [criterionScores, setCriterionScores] = useState<Record<string, number>>(
    () => Object.fromEntries(rubric.map((c) => [c.name, 0])),
  );
  const [manualScore, setManualScore] = useState<number>(defaultScore ?? 0);

  const rubricTotal = useMemo(
    () => Object.values(criterionScores).reduce((a, b) => a + (b || 0), 0),
    [criterionScores],
  );

  const score = rubric.length > 0 ? rubricTotal : manualScore;
  const passes = score >= passScore;

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="submissionId" value={submissionId} />
      <input type="hidden" name="score" value={score} />
      {rubric.length > 0 && (
        <input
          type="hidden"
          name="rubricScores"
          value={JSON.stringify(criterionScores)}
        />
      )}

      {state.message && (
        <Alert tone={state.ok ? "success" : "error"}>{state.message}</Alert>
      )}

      {rubric.length > 0 ? (
        <div className="space-y-3">
          {rubric.map((c) => (
            <div key={c.name}>
              <label
                htmlFor={`rubric-${c.name}`}
                className="flex justify-between gap-3 text-sm text-mist-200"
              >
                <span>{c.name}</span>
                <span className="text-mist-400 tabular-nums shrink-0">
                  / {c.maxPoints}
                </span>
              </label>
              {c.description && (
                <p className="text-xs text-mist-400 mt-0.5">{c.description}</p>
              )}
              <Input
                id={`rubric-${c.name}`}
                type="number"
                min={0}
                max={c.maxPoints}
                value={criterionScores[c.name] ?? 0}
                onChange={(e) =>
                  setCriterionScores((prev) => ({
                    ...prev,
                    [c.name]: Math.min(
                      c.maxPoints,
                      Math.max(0, Number(e.target.value) || 0),
                    ),
                  }))
                }
                className="mt-1.5"
              />
            </div>
          ))}
        </div>
      ) : (
        <Field label={`Score (out of ${maxScore})`} htmlFor="manualScore">
          <Input
            id="manualScore"
            type="number"
            min={0}
            max={maxScore}
            value={manualScore}
            onChange={(e) =>
              setManualScore(
                Math.min(maxScore, Math.max(0, Number(e.target.value) || 0)),
              )
            }
          />
        </Field>
      )}

      <div
        className={`rounded-lg border px-4 py-3 flex items-center justify-between ${
          passes
            ? "border-growth-600/40 bg-growth-500/10"
            : "border-flag-500/40 bg-flag-500/10"
        }`}
      >
        <span className="text-sm text-mist-200">Total</span>
        <span
          className={`text-lg font-semibold tabular-nums ${
            passes ? "text-growth-400" : "text-flag-400"
          }`}
        >
          {score} / {maxScore}
          <span className="ml-2 text-xs font-normal">
            {passes ? "pass" : "below pass mark"}
          </span>
        </span>
      </div>

      <Field
        label="Feedback"
        htmlFor="feedback"
        hint="Be specific. Tell them what to do differently next time."
      >
        <Textarea
          id="feedback"
          name="feedback"
          rows={7}
          defaultValue={defaultFeedback}
          placeholder="What worked, what didn't, and the one thing to fix first."
        />
      </Field>

      <SubmitButton
        className="w-full"
        size="lg"
        variant={passes ? "growth" : "primary"}
        pendingText="Recording…"
      >
        {passes ? "Pass and notify student" : "Return for revisions"}
      </SubmitButton>
    </form>
  );
}
