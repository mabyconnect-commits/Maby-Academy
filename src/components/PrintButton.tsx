"use client";

import type { ComponentProps } from "react";
import { Button } from "@/components/ui";

/**
 * Prints the current page — the browser's print dialog includes "Save as PDF",
 * which is how a learner downloads their certificate. Lives on the standalone
 * verify page, which prints cleanly. Carries `no-print` so the button itself is
 * never part of the printed sheet.
 */
export function PrintButton({
  children = "Download / Save as PDF",
  className,
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      type="button"
      onClick={() => window.print()}
      className={["no-print", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </Button>
  );
}
