"use client";

import { useEffect } from "react";
import { Button, LinkButton } from "@/components/ui";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Swap for your error reporter (Sentry et al.) when one is wired up.
    console.error("[app] render error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <p className="text-5xl" aria-hidden>
        ⚠
      </p>
      <h1 className="mt-5 text-2xl font-semibold tracking-tight">
        Something broke on our side
      </h1>
      <p className="mt-3 text-mist-400 max-w-md">
        This has been logged. Try again — if it keeps happening, let us know
        what you were doing when it did.
      </p>

      {error.digest && (
        <p className="mt-4 font-mono text-xs text-mist-400">
          Reference: {error.digest}
        </p>
      )}

      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        <Button onClick={reset}>Try again</Button>
        <LinkButton href="/dashboard" variant="secondary">
          Back to dashboard
        </LinkButton>
      </div>
    </div>
  );
}
