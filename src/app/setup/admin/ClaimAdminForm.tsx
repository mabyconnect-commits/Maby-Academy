"use client";

import { useActionState } from "react";
import { Alert, Field, Input } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { emptyFormState } from "@/server/actions/formState";
import { claimAdminAction } from "@/server/actions/bootstrap";

export function ClaimAdminForm() {
  const [state, formAction] = useActionState(claimAdminAction, emptyFormState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <Field
        label="Bootstrap secret"
        htmlFor="secret"
        hint="The value you set for ADMIN_BOOTSTRAP_SECRET on your deployment."
        error={state.fieldErrors?.secret}
      >
        <Input
          id="secret"
          name="secret"
          type="password"
          autoComplete="off"
          placeholder="Paste the secret"
        />
      </Field>

      {state.message && (
        <Alert tone={state.ok ? "success" : "error"}>{state.message}</Alert>
      )}

      <SubmitButton size="lg" pendingText="Checking…">
        Make me an admin
      </SubmitButton>

      {state.ok && (
        <p className="text-sm text-mist-400">
          <a href="/admin" className="text-gold-400 hover:text-gold-300">
            Go to the Admin area →
          </a>{" "}
          (reload first if it isn&apos;t there yet).
        </p>
      )}
    </form>
  );
}
