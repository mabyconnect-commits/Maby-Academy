import { ZodError } from "zod";
import { ServiceError } from "@/lib/errors";

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

/**
 * Turns a thrown error into a form state every action can return.
 *
 * Shared rather than copied per action file so the error contract stays
 * identical everywhere — and so an unexpected error is never echoed to the
 * member verbatim. A `ServiceError` carries a message written to be read; a
 * `ZodError` carries per-field messages; anything else is logged and replaced
 * with a generic line, because an unhandled error's text can leak internals.
 */
export function toFormState(error: unknown): FormState {
  if (error instanceof ZodError) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of error.issues) {
      const key = issue.path.join(".") || "form";
      fieldErrors[key] ??= issue.message;
    }
    return { ok: false, message: error.issues[0]?.message, fieldErrors };
  }
  if (error instanceof ServiceError) {
    return {
      ok: false,
      message: error.message,
      fieldErrors: error.field ? { [error.field]: error.message } : undefined,
    };
  }
  console.error("[action] unhandled error:", error);
  return { ok: false, message: "Something went wrong. Please try again." };
}
