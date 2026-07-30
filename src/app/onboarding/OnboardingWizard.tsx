"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LogoMark } from "@/components/Brand";
import { Icon } from "@/components/Icon";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { ONBOARDING_STEPS } from "@/lib/onboarding/questions";
import type { OnboardingAnswers } from "@/server/services/onboarding";

/**
 * The onboarding wizard.
 *
 * Steps are held in local state rather than routed per step. That is the right
 * trade here: answers are worthless until the whole set is submitted (the path
 * builder needs level *and* pillars *and* hours together), and a URL per step
 * invites someone to deep-link into step 3 with no answers behind it.
 *
 * Nothing is required. `Next` is always enabled, and the skip link is present
 * on every step — an onboarding flow you cannot escape is worse than none.
 */
export function OnboardingWizard({
  onSubmit,
  onSkip,
}: {
  onSubmit: (answers: OnboardingAnswers) => Promise<void>;
  onSkip: () => Promise<void>;
}) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<OnboardingAnswers>({});
  const [pending, startTransition] = useTransition();

  const step = ONBOARDING_STEPS[index];
  const total = ONBOARDING_STEPS.length;
  const isLast = index === total - 1;
  const selected = answers[step.field] ?? [];

  function toggle(value: string) {
    setAnswers((prev) => {
      const current = prev[step.field] ?? [];
      if (!step.multiple) {
        // Single-choice: re-tapping the chosen option clears it, so a member
        // can un-answer a question they'd rather skip.
        return { ...prev, [step.field]: current[0] === value ? [] : [value] };
      }
      return {
        ...prev,
        [step.field]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  }

  function next() {
    if (!isLast) {
      setIndex((i) => i + 1);
      return;
    }
    startTransition(async () => {
      await onSubmit(answers);
      router.push("/dashboard?welcome=1");
    });
  }

  function skip() {
    startTransition(async () => {
      await onSkip();
      router.push("/dashboard");
    });
  }

  const pct = Math.round(((index + 1) / total) * 100);

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-8 sm:px-6 sm:py-14">
      <div className="w-full max-w-[680px]">
        <div className="mb-[26px] flex items-center gap-2.5">
          <LogoMark size={26} className="text-mist-100" />
          <span className="text-xs font-extrabold tracking-[0.18em] text-mist-100 uppercase">
            Maby <span className="text-gold-500">Academy</span>
          </span>
        </div>

        {/* Step counter and rail. The rail is the only progress signal, so it
            animates — motion confirming a state change, per the design. */}
        <div className="mb-2 flex items-center gap-3">
          <span className="text-[10px] font-semibold tracking-[0.24em] whitespace-nowrap text-gold-500 uppercase">
            Step {index + 1} of {total}
          </span>
          <div
            className="h-[3px] flex-1 rounded-sm bg-mist-100/10"
            role="progressbar"
            aria-valuenow={index + 1}
            aria-valuemin={1}
            aria-valuemax={total}
            aria-label="Onboarding progress"
          >
            <div
              className="h-[3px] rounded-sm bg-gold-500 transition-[width] duration-250 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* aria-live so a screen reader hears the new question when the step
            changes — without it, tapping Next announces nothing at all. */}
        <div aria-live="polite">
          <h1 className="mt-[18px] mb-2 text-[22px] leading-[1.25] font-extrabold text-mist-100 sm:text-[28px]">
            {step.title}
          </h1>
          <p className="mb-6 text-[13.5px] leading-[1.6] text-mist-400">
            {step.subtitle}
          </p>
        </div>

        <div
          className="grid gap-3 sm:grid-cols-2"
          role={step.multiple ? "group" : "radiogroup"}
          aria-label={step.title}
        >
          {step.options.map((option) => {
            const on = selected.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => toggle(option.value)}
                role={step.multiple ? "checkbox" : "radio"}
                aria-checked={on}
                className={cn(
                  "rounded-[var(--radius-inset)] border p-[18px] text-left transition-colors",
                  on
                    ? "border-gold-500/55 bg-gold-500/10"
                    : "border-rule-strong bg-ink-850 hover:border-gold-500/55",
                )}
              >
                <span className="flex items-start justify-between gap-2.5">
                  <span className="text-[13.5px] leading-[1.35] font-bold text-mist-100">
                    {option.label}
                  </span>
                  {/* Square mark for multi-select, round for single — the
                      shape is the only cue that tells someone whether they can
                      pick more than one. */}
                  <span
                    className={cn(
                      "grid size-[18px] shrink-0 place-items-center border-[1.5px]",
                      step.multiple ? "rounded-[5px]" : "rounded-full",
                      on
                        ? "border-gold-500 bg-gold-500 text-ink-950"
                        : "border-mist-100/25",
                    )}
                  >
                    {on && <Icon name="check" size={10} strokeWidth={3.5} />}
                  </span>
                </span>
                {option.description && (
                  <span className="mt-[7px] block text-[11.5px] leading-[1.5] text-mist-400">
                    {option.description}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-[30px] flex flex-wrap items-center justify-between gap-3">
          {index === 0 ? (
            <button
              type="button"
              onClick={skip}
              disabled={pending}
              className="text-xs font-medium text-mist-400 transition-colors hover:text-mist-200 disabled:opacity-50"
            >
              Skip for now
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIndex((i) => i - 1)}
              disabled={pending}
              className="text-xs font-medium text-mist-400 transition-colors hover:text-mist-200 disabled:opacity-50"
            >
              ← Back
            </button>
          )}

          <Button type="button" onClick={next} size="lg" disabled={pending}>
            {pending
              ? "Building your path…"
              : isLast
                ? "Build my learning path"
                : "Continue"}
          </Button>
        </div>

        <p className="mt-[26px] border-t border-rule pt-[18px] text-[11px] leading-[1.6] text-mist-400/70">
          Your answers generate a personalised learning pathway. Faith and health
          content is optional and can be turned off at any time in Settings.
          Educational content only — not financial advice.
        </p>
      </div>
    </div>
  );
}
