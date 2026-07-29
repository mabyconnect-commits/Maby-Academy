"use client";

import { useActionState } from "react";
import { Alert, Field, Input } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { registerAction } from "@/server/actions/auth";
import { emptyFormState } from "@/server/actions/formState";

export function RegisterForm({
  defaultReferralCode = "",
}: {
  defaultReferralCode?: string;
}) {
  const [state, formAction] = useActionState(registerAction, emptyFormState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      {state.message && !state.fieldErrors && (
        <Alert tone="error">{state.message}</Alert>
      )}

      <Field label="Full name" htmlFor="name" error={state.fieldErrors?.name}>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          required
          placeholder="Your name"
        />
      </Field>

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

      <Field
        label="Password"
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

      <Field
        label="Referral code"
        htmlFor="referralCode"
        error={state.fieldErrors?.referralCode}
        hint="Optional — if a member invited you, put their code here."
      >
        <Input
          id="referralCode"
          name="referralCode"
          defaultValue={defaultReferralCode}
          placeholder="MABY1234"
          className="uppercase"
        />
      </Field>

      <SubmitButton className="w-full" size="lg" pendingText="Creating your account…">
        Create account
      </SubmitButton>

      <p className="text-xs text-mist-400 leading-relaxed">
        By joining you agree to learn honestly, do the work, and treat this
        community with respect. Nothing taught here is financial advice.
      </p>
    </form>
  );
}
