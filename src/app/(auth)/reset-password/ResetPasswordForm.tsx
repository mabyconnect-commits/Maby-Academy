"use client";

import { useActionState } from "react";
import { Alert, Field, Input } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { resetPasswordAction } from "@/server/actions/auth";
import { emptyFormState } from "@/server/actions/formState";

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, formAction] = useActionState(resetPasswordAction, emptyFormState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      {state.message && <Alert tone="error">{state.message}</Alert>}

      <input type="hidden" name="token" value={token} />

      <Field
        label="New password"
        htmlFor="password"
        error={state.fieldErrors?.password}
        hint="At least 10 characters, with a number or symbol."
      >
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={10}
        />
      </Field>

      <SubmitButton className="w-full" size="lg" pendingText="Updating…">
        Set new password
      </SubmitButton>
    </form>
  );
}
