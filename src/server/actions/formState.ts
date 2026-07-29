/**
 * Shared form-action result shape.
 *
 * This lives outside the `"use server"` modules on purpose: a server-action
 * file may only export async functions, so the type and the initial-state
 * constant need a plain module of their own.
 */
export type FormState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
  /** Dev-only: the reset link, since email delivery is not wired up yet. */
  devToken?: string;
};

export const emptyFormState: FormState = { ok: false };
