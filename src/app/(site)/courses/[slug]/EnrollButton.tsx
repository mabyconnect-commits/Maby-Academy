"use client";

import { useActionState } from "react";
import { Alert, LinkButton } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { emptyFormState } from "@/server/actions/formState";
import { enrollAction } from "@/server/actions/learning";

export function EnrollButton({
  courseId,
  slug,
  isSignedIn,
}: {
  courseId: string;
  slug: string;
  isSignedIn: boolean;
}) {
  const [state, formAction] = useActionState(enrollAction, emptyFormState);

  if (!isSignedIn) {
    return (
      <div className="space-y-3">
        <LinkButton
          href={`/register?next=/courses/${slug}`}
          className="w-full"
          size="lg"
        >
          Join to enrol
        </LinkButton>
        <p className="text-center text-xs text-mist-400">
          Already a member?{" "}
          <a
            href={`/login?next=/courses/${slug}`}
            className="text-gold-400 hover:text-gold-300"
          >
            Sign in
          </a>
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="courseId" value={courseId} />
      <input type="hidden" name="slug" value={slug} />

      {state.message && <Alert tone="error">{state.message}</Alert>}

      <SubmitButton className="w-full" size="lg" pendingText="Enrolling…">
        Enrol now
      </SubmitButton>
    </form>
  );
}
