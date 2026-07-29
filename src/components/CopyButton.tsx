"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

/**
 * Copy-to-clipboard with inline confirmation.
 *
 * `navigator.clipboard` needs a secure context; when it isn't available we
 * select the text into a temporary input as a fallback so the button still
 * does something useful over plain HTTP.
 */
export function CopyButton({
  value,
  label = "Copy",
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const el = document.createElement("textarea");
        el.value = value;
        el.style.position = "fixed";
        el.style.opacity = "0";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Button
      type="button"
      variant={copied ? "growth" : "secondary"}
      size="sm"
      onClick={copy}
      className={className}
    >
      {copied ? "✓ Copied" : label}
    </Button>
  );
}
