"use client";

import { useActionState } from "react";
import { Alert, LinkButton } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { emptyFormState } from "@/server/actions/formState";
import { trackProgressAction } from "@/server/actions/learning";

export function CompleteLessonForm({
  lessonId,
  path,
  isCompleted,
  nextHref,
}: {
  lessonId: string;
  path: string;
  isCompleted: boolean;
  nextHref: string | null;
}) {
  const [state, formAction] = useActionState(trackProgressAction, emptyFormState);

  // Once complete, nudge forward rather than offering the button again.
  if (isCompleted) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-growth-400">
          ✓ You&apos;ve completed this lesson.
        </p>
        {nextHref && (
          <LinkButton href={nextHref} variant="growth">
            Next lesson →
          </LinkButton>
        )}
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="lessonId" value={lessonId} />
      <input type="hidden" name="completed" value="true" />
      <input type="hidden" name="path" value={path} />

      {state.message && (
        <Alert tone={state.ok ? "success" : "error"}>{state.message}</Alert>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton size="lg" pendingText="Saving…">
          Mark lesson complete
        </SubmitButton>
        <p className="text-sm text-mist-400">
          Earns points and moves your course progress forward.
        </p>
      </div>
    </form>
  );
}
