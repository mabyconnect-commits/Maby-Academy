"use client";

import { useFormStatus } from "react-dom";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui";

/**
 * A submit button that disables itself and shows pending text while its
 * enclosing form action is in flight. Must live inside a <form>.
 */
export function SubmitButton({
  children,
  pendingText,
  ...props
}: ComponentProps<typeof Button> & { pendingText?: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} aria-busy={pending} {...props}>
      {pending ? (pendingText ?? "Working…") : children}
    </Button>
  );
}
