"use client";

import { useEffect, useState } from "react";
import { Card, LinkButton } from "@/components/ui";

const DISMISS_KEY = "maby:community-promo-dismissed";

/**
 * A dismissible nudge toward the community, where posting and replying earn
 * points. Starts hidden and reveals after checking localStorage, so a member
 * who has dismissed it never sees a flash of it on the next visit.
 */
export function CommunityPromo({
  postPoints,
  commentPoints,
  dailyCap,
}: {
  postPoints: number;
  commentPoints: number;
  dailyCap: number;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(localStorage.getItem(DISMISS_KEY) !== "1");
  }, []);

  if (!show) return null;

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, "1");
    setShow(false);
  }

  return (
    <Card variant="gold" pad="wide" className="relative">
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute right-3 top-3 rounded-full p-1.5 text-mist-400 transition-colors hover:bg-ink-800 hover:text-mist-100"
      >
        ✕
      </button>

      <p className="eyebrow">Earn while you learn</p>
      <h2 className="mt-2 pr-8 text-lg font-semibold text-mist-100">
        Jump into the community — it pays
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mist-300">
        Ask a question, share a win, or help someone out. Every post earns{" "}
        <span className="font-semibold text-gold-300">+{postPoints} points</span>{" "}
        and every helpful reply{" "}
        <span className="font-semibold text-gold-300">+{commentPoints}</span> — up
        to {dailyCap} a day. Points climb the leaderboard and unlock rewards.
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <LinkButton href="/community" size="sm">
          Open the community
        </LinkButton>
        <button
          type="button"
          onClick={dismiss}
          className="text-xs font-semibold text-mist-400 hover:text-mist-200"
        >
          Maybe later
        </button>
      </div>
    </Card>
  );
}
