"use client";

import { useActionState } from "react";
import { Alert, LinkButton } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { emptyFormState } from "@/server/actions/formState";
import { enrollAction } from "@/server/actions/learning";

export function EnrollButton({
  courseId,
  slug,
  isSignedIn,
  isPaid = false,
  paymentsAvailable = true,
  priceLabel,
}: {
  courseId: string;
  slug: string;
  isSignedIn: boolean;
  isPaid?: boolean;
  paymentsAvailable?: boolean;
  priceLabel?: string;
}) {
  const [state, formAction] = useActionState(enrollAction, emptyFormState);

  if (!isSignedIn) {
    return (
      <div className="space-y-3">
        <LinkButton
          href={`/register?next=/courses/${slug}`}
          className="w-full"
          size="lg"
        >
          Join to enrol
        </LinkButton>
        <p className="text-center text-xs text-mist-400">
          Already a member?{" "}
          <a
            href={`/login?next=/courses/${slug}`}
            className="text-gold-400 hover:text-gold-300"
          >
            Sign in
          </a>
        </p>
      </div>
    );
  }

  if (isPaid && !paymentsAvailable) {
    return (
      <Alert tone="info">
        Card and bank payments are being set up. Check back shortly — free
        courses are open in the meantime.
      </Alert>
    );
  }

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="courseId" value={courseId} />
      <input type="hidden" name="slug" value={slug} />

      {state.message && <Alert tone="error">{state.message}</Alert>}

      <SubmitButton
        className="w-full"
        size="lg"
        pendingText={isPaid ? "Opening checkout…" : "Enrolling…"}
      >
        {isPaid ? `Pay ${priceLabel ?? "now"}` : "Enrol now"}
      </SubmitButton>

      {isPaid && (
        <p className="text-center text-xs text-mist-400 leading-relaxed">
          Secure checkout by Flutterwave. Card, bank transfer, USSD and mobile
          money. You&apos;re enrolled the moment payment clears.
        </p>
      )}
    </form>
  );
}
