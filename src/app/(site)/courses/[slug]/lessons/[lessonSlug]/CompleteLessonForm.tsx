"use client";

import { useActionState, useState } from "react";
import { Alert, Card, LinkButton, Textarea } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { SubmitButton } from "@/components/SubmitButton";
import { emptyFormState } from "@/server/actions/formState";
import { trackProgressAction } from "@/server/actions/learning";

/**
 * Lesson completion, with the activity write-up where one is required.
 *
 * A written lesson with no quiz and no assignment used to complete on a single
 * click, which contradicts the academy's central promise that opening a page is
 * not learning. Such lessons now carry an exercise and require the learner to
 * write up what happened.
 *
 * The write-up is **not graded and nobody reads it** — that is stated in the UI,
 * because a box that looks like coursework changes what people write in it. It
 * exists so the learner has done the exercise before the lesson counts.
 */
export function CompleteLessonForm({
  lessonId,
  path,
  isCompleted,
  nextHref,
  activity,
  minReflectionChars,
  existingReflection,
}: {
  lessonId: string;
  path: string;
  isCompleted: boolean;
  nextHref: string | null;
  activity: { title: string; prompt: string } | null;
  minReflectionChars: number;
  existingReflection: string | null;
}) {
  const [state, formAction] = useActionState(trackProgressAction, emptyFormState);
  const [reflection, setReflection] = useState(existingReflection ?? "");

  const needsReflection = minReflectionChars > 0;
  const remaining = minReflectionChars - reflection.trim().length;

  // Once complete, nudge forward rather than offering the button again — but
  // keep the write-up visible and editable, since it is the learner's own note.
  if (isCompleted) {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-growth-500">
            <Icon name="check" size={15} strokeWidth={2.5} />
            You&apos;ve completed this lesson.
          </p>
          {nextHref && (
            <LinkButton href={nextHref} variant="growth">
              Next lesson →
            </LinkButton>
          )}
        </div>

        {existingReflection && activity && (
          <Card variant="inset">
            <p className="text-[10px] font-bold tracking-[0.12em] text-mist-400 uppercase">
              Your write-up · {activity.title}
            </p>
            <p className="mt-2.5 text-[12.5px] leading-[1.7] whitespace-pre-wrap text-mist-300">
              {existingReflection}
            </p>
          </Card>
        )}
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="lessonId" value={lessonId} />
      <input type="hidden" name="completed" value="true" />
      <input type="hidden" name="path" value={path} />

      {activity && (
        <Card variant="gold" pad="wide">
          <p className="eyebrow">Do this before you move on</p>
          <h3 className="mt-2.5 text-sm font-bold text-mist-100">
            {activity.title}
          </h3>
          <p className="mt-2 text-[12.5px] leading-[1.7] text-mist-300">
            {activity.prompt}
          </p>

          {needsReflection && (
            <div className="mt-4">
              <label
                htmlFor={`reflection-${lessonId}`}
                className="mb-2 block text-[11px] font-semibold tracking-[0.1em] text-mist-300 uppercase"
              >
                What happened when you did it?
              </label>
              <Textarea
                id={`reflection-${lessonId}`}
                name="reflection"
                rows={5}
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="A few sentences. What you did, what surprised you, what you'd do differently."
              />
              <p className="mt-2 text-[11px] text-mist-400">
                {remaining > 0 ? (
                  <>
                    {remaining} more character{remaining === 1 ? "" : "s"} to go.
                  </>
                ) : (
                  <span className="text-growth-500">Long enough — go ahead.</span>
                )}{" "}
                Nobody grades this and no instructor reads it. It is your note to
                yourself, and it is private.
              </p>
            </div>
          )}
        </Card>
      )}

      {state.message && (
        <Alert tone={state.ok ? "success" : "error"}>{state.message}</Alert>
      )}

      <div className="flex flex-wrap items-center gap-3">
        {/* Not disabled on a short write-up: a disabled button with no
            explanation is worse than a button that tells you why. The server
            refuses it regardless, so this is presentation only. */}
        <SubmitButton size="lg" pendingText="Saving…">
          Mark lesson complete
        </SubmitButton>
        <p className="text-xs text-mist-400">
          Earns points and moves your course progress forward.
        </p>
      </div>
    </form>
  );
}
