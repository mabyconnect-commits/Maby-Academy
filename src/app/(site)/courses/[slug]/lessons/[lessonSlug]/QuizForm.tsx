"use client";

import { useActionState } from "react";
import { Alert, Card, Pill } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { emptyFormState } from "@/server/actions/formState";
import { submitQuizAction } from "@/server/actions/learning";

type Quiz = {
  id: string;
  title: string;
  description: string | null;
  passScore: number;
  maxAttempts: number;
  pointsValue: number;
  questions: {
    id: string;
    prompt: string;
    type: string;
    points: number;
    options: { id: string; text: string }[];
  }[];
};

export function QuizForm({
  quiz,
  path,
  attemptsUsed,
  bestScore,
  hasPassed,
}: {
  quiz: Quiz;
  path: string;
  attemptsUsed: number;
  bestScore: number;
  hasPassed: boolean;
}) {
  const [state, formAction] = useActionState(submitQuizAction, emptyFormState);

  const attemptsLeft = quiz.maxAttempts - attemptsUsed;
  const locked = hasPassed || attemptsLeft <= 0;

  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-mist-100">{quiz.title}</h2>
          {quiz.description && (
            <p className="mt-1 text-sm text-mist-400">{quiz.description}</p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Pill tone="neutral">Pass at {quiz.passScore}%</Pill>
          <Pill tone="gold">+{quiz.pointsValue} pts</Pill>
        </div>
      </div>

      {attemptsUsed > 0 && (
        <div className="mt-4">
          <Alert tone={hasPassed ? "success" : "info"}>
            {hasPassed
              ? `You passed this quiz — best score ${bestScore}%.`
              : `Best score so far: ${bestScore}%. ${attemptsLeft > 0 ? `${attemptsLeft} attempt(s) remaining.` : "No attempts remaining."}`}
          </Alert>
        </div>
      )}

      {state.message && (
        <div className="mt-4">
          <Alert tone={state.ok ? "success" : "error"}>{state.message}</Alert>
        </div>
      )}

      {locked ? (
        <p className="mt-5 text-sm text-mist-400">
          {hasPassed
            ? "Nothing more to do here — well done."
            : "You've used every attempt. Speak to your instructor if you need another."}
        </p>
      ) : (
        <form action={formAction} className="mt-6 space-y-6">
          <input type="hidden" name="quizId" value={quiz.id} />
          <input type="hidden" name="path" value={path} />

          {quiz.questions.map((q, qi) => {
            // Multi-choice needs checkboxes; the rest are radios. Both post
            // under `answer:<questionId>` so the action can group them.
            const multi = q.type === "MULTI_CHOICE";
            return (
              <fieldset key={q.id} className="space-y-2.5">
                <legend className="text-sm font-medium text-mist-100 mb-2">
                  <span className="text-gold-500 font-mono mr-2">
                    {String(qi + 1).padStart(2, "0")}
                  </span>
                  {q.prompt}
                  {multi && (
                    <span className="ml-2 text-xs text-mist-400">
                      (select all that apply)
                    </span>
                  )}
                </legend>

                {q.options.map((opt) => (
                  <label
                    key={opt.id}
                    className="flex items-start gap-3 rounded-lg border border-ink-700 bg-ink-900 px-3.5 py-2.5 text-sm text-mist-200 cursor-pointer hover:border-ink-500 transition-colors has-checked:border-gold-500 has-checked:bg-gold-500/5"
                  >
                    <input
                      type={multi ? "checkbox" : "radio"}
                      name={`answer:${q.id}`}
                      value={opt.id}
                      className="mt-0.5 accent-[#d9a441]"
                    />
                    <span>{opt.text}</span>
                  </label>
                ))}
              </fieldset>
            );
          })}

          <SubmitButton size="lg" pendingText="Marking your answers…">
            Submit quiz ({attemptsLeft} attempt{attemptsLeft === 1 ? "" : "s"} left)
          </SubmitButton>
        </form>
      )}
    </Card>
  );
}
