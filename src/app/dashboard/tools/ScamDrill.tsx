"use client";

import { useState } from "react";
import { Card, PanelHead } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";

/**
 * Scam-awareness drill.
 *
 * A rotating set of one-question drills where every option is plausible and
 * exactly one is *always* a scam. Kept in the client with no scoring and no
 * record: this is a reflex to build, not an assessment to grade, and a member
 * should be able to get it wrong ten times in private.
 *
 * The seed-phrase item is deliberately first. It is the single most costly
 * mistake a beginner makes, and the academy's own hard rule — we never ask for
 * one — only means something if members know that asking is itself the tell.
 */
const DRILLS: {
  question: string;
  options: { label: string; scam: boolean; because: string }[];
}[] = [
  {
    question: "Which of these is always a scam?",
    options: [
      {
        label:
          "A support agent asks for your seed phrase to restore your wallet",
        scam: true,
        because:
          "Nobody legitimate ever needs your seed phrase — not support, not a developer, not an exchange, not Maby Academy. The phrase *is* the wallet. Anyone holding it can empty it.",
      },
      {
        label: "An exchange asks you to verify your identity before withdrawing",
        scam: false,
        because:
          "Annoying, and a real privacy trade-off, but ordinary regulated practice. Verify you are on the right domain and continue.",
      },
      {
        label: "A protocol asks you to sign a transaction to claim rewards",
        scam: false,
        because:
          "Sometimes genuine — but read what you are signing. An unlimited token approval to an unknown address is how wallets get drained without a seed phrase.",
      },
    ],
  },
  {
    question: "You are DM'd first by someone offering help. What is the tell?",
    options: [
      {
        label: "They messaged you first and moved you off the public channel",
        scam: true,
        because:
          "The pattern, not the words. Real support answers in public and lets you come to them. Being pulled into a DM removes the witnesses.",
      },
      {
        label: "Their English is imperfect",
        scam: false,
        because:
          "Nothing. Most of the world is multilingual, and grammar-policing teaches the wrong reflex — polished scams exist and cost more.",
      },
      {
        label: "They have a small number of followers",
        scam: false,
        because:
          "Weak evidence in both directions. Follower counts are bought, and genuine helpful people are often new.",
      },
    ],
  },
  {
    question: "Which promise should end the conversation immediately?",
    options: [
      {
        label: "“Guaranteed returns” of any size",
        scam: true,
        because:
          "Nobody can guarantee a return on a volatile asset. The word 'guaranteed' is doing the fraud, whether the number is 5% or 500%.",
      },
      {
        label: "“This could fall 60% and you should size accordingly”",
        scam: false,
        because:
          "This is what honest looks like. Downside stated plainly, sizing left to you.",
      },
      {
        label: "“I hold this myself and here is my reasoning”",
        scam: false,
        because:
          "A disclosed position with stated reasoning is fine — judge the reasoning. Disclosure is not endorsement and not advice.",
      },
    ],
  },
];

export function ScamDrill() {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  const drill = DRILLS[index];
  const answered = picked !== null;
  const chosen = answered ? drill.options[picked] : null;

  function nextDrill() {
    setPicked(null);
    setIndex((i) => (i + 1) % DRILLS.length);
  }

  return (
    <Card>
      <PanelHead title="Scam-awareness drill" className="mb-1.5" />
      <p className="mb-4 text-[11.5px] leading-[1.55] text-mist-400">
        {drill.question}
      </p>

      <div className="flex flex-col gap-2.5">
        {drill.options.map((option, i) => {
          const isChosen = picked === i;
          // Once answered, reveal every option's status — the wrong answers
          // teach as much as the right one.
          const state = !answered
            ? "idle"
            : option.scam
              ? "scam"
              : isChosen
                ? "missed"
                : "safe";

          return (
            <button
              key={option.label}
              type="button"
              onClick={() => !answered && setPicked(i)}
              disabled={answered}
              aria-pressed={isChosen}
              className={cn(
                "flex items-center gap-[11px] rounded-[var(--radius-row)] border p-3.5 text-left transition-colors",
                state === "idle" &&
                  "border-rule bg-ink-880 hover:border-gold-500/40",
                state === "scam" && "border-flag-500/45 bg-flag-500/10",
                state === "missed" && "border-ember-500/45 bg-ember-500/10",
                state === "safe" && "border-rule bg-ink-880 opacity-60",
              )}
            >
              <span
                className={cn(
                  "flex-1 text-xs leading-[1.45] font-semibold",
                  state === "scam" ? "text-mist-100" : "text-mist-200",
                )}
              >
                {option.label}
              </span>
              {answered && (
                <span
                  className={cn(
                    "shrink-0",
                    option.scam ? "text-flag-500" : "text-growth-500",
                  )}
                >
                  <Icon
                    name={option.scam ? "flag" : "check"}
                    size={14}
                    strokeWidth={2.5}
                  />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {answered && chosen && (
        <div className="mt-4 border-t border-rule pt-4" aria-live="polite">
          <p
            className={cn(
              "text-[11px] font-bold tracking-[0.1em] uppercase",
              chosen.scam ? "text-growth-500" : "text-ember-500",
            )}
          >
            {chosen.scam ? "Correct" : "Not the one"}
          </p>
          <p className="mt-2 text-[11.5px] leading-[1.65] text-mist-300">
            {chosen.because}
          </p>
          {!chosen.scam && (
            <p className="mt-2.5 text-[11.5px] leading-[1.65] text-mist-400">
              <span className="font-bold text-mist-200">
                The always-a-scam answer:
              </span>{" "}
              {drill.options.find((o) => o.scam)?.because}
            </p>
          )}
          <button
            type="button"
            onClick={nextDrill}
            className="mt-3.5 text-[11px] font-semibold text-gold-500 hover:text-gold-400"
          >
            Next drill →
          </button>
        </div>
      )}
    </Card>
  );
}
