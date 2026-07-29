"use client";

import { useActionState } from "react";
import { Alert, Field, Input } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { changePasswordAction } from "@/server/actions/auth";
import { emptyFormState } from "@/server/actions/formState";

export function PasswordForm() {
  const [state, formAction] = useActionState(changePasswordAction, emptyFormState);

  return (
    <form action={formAction} className="space-y-4">
      {state.message && <Alert tone="error">{state.message}</Alert>}

      <Field
        label="Current password"
        htmlFor="currentPassword"
        error={state.fieldErrors?.currentPassword}
      >
        <Input
          id="currentPassword"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
          required
        />
      </Field>

      <Field
        label="New password"
        htmlFor="newPassword"
        hint="At least 10 characters, with a number or symbol."
        error={state.fieldErrors?.newPassword}
      >
        <Input
          id="newPassword"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          required
          minLength={10}
        />
      </Field>

      <SubmitButton variant="secondary" pendingText="Updating…">
        Change password
      </SubmitButton>
    </form>
  );
}
