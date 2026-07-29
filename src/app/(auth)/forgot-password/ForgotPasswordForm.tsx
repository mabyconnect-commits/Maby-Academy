"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Alert, Field, Input } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { requestResetAction } from "@/server/actions/auth";
import { emptyFormState } from "@/server/actions/formState";

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState(requestResetAction, emptyFormState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      {state.ok && state.message && <Alert tone="success">{state.message}</Alert>}
      {!state.ok && state.message && <Alert tone="error">{state.message}</Alert>}

      {/* Email delivery is not wired up yet, so in development we surface the
          link directly rather than leaving the flow untestable. */}
      {state.devToken && (
        <Alert tone="info">
          <span className="block font-medium mb-1">Development only</span>
          <Link
            href={`/reset-password?token=${state.devToken}`}
            className="text-gold-400 hover:text-gold-300 break-all"
          >
            Open the reset link →
          </Link>
        </Alert>
      )}

      <Field label="Email" htmlFor="email" error={state.fieldErrors?.email}>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
        />
      </Field>

      <SubmitButton className="w-full" size="lg" pendingText="Sending…">
        Send reset link
      </SubmitButton>
    </form>
  );
}
