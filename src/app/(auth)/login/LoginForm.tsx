"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Alert, Field, Input } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { loginAction } from "@/server/actions/auth";
import { emptyFormState } from "@/server/actions/formState";

export function LoginForm({ next }: { next?: string }) {
  const [state, formAction] = useActionState(loginAction, emptyFormState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      {state.message && <Alert tone="error">{state.message}</Alert>}

      <input type="hidden" name="next" value={next ?? "/dashboard"} />

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

      <Field label="Password" htmlFor="password" error={state.fieldErrors?.password}>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </Field>

      <div className="flex justify-end">
        <Link
          href="/forgot-password"
          className="text-xs text-mist-400 hover:text-gold-300"
        >
          Forgot your password?
        </Link>
      </div>

      <SubmitButton className="w-full" size="lg" pendingText="Signing you in…">
        Sign in
      </SubmitButton>
    </form>
  );
}
