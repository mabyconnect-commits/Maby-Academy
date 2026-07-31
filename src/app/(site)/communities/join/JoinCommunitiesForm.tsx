"use client";

import { useActionState, useState } from "react";
import { Alert, Card } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { SubmitButton } from "@/components/SubmitButton";
import { emptyFormState } from "@/server/actions/formState";
import { confirmCommunitiesAction } from "@/server/actions/learning";
import type { Community } from "@/content/communities";

/**
 * The join gate. Every community must be opened and ticked before the member
 * can confirm — the confirmation is an honest self-attestation (WhatsApp and
 * Telegram give us no way to verify a join), so the UI says plainly that this
 * is on their honour, the same way the lesson reflection gate does.
 *
 * Opening a link auto-ticks its box, because someone who clicked through to
 * join shouldn't also have to hunt for a checkbox — but they can still untick
 * it, so the tick means "I joined", not merely "I clicked".
 */
export function JoinCommunitiesForm({
  communities,
  slug,
  courseId,
  alreadyJoined,
}: {
  communities: Community[];
  slug: string;
  courseId: string;
  alreadyJoined: boolean;
}) {
  const [state, formAction] = useActionState(
    confirmCommunitiesAction,
    emptyFormState,
  );
  const [joined, setJoined] = useState<boolean[]>(
    () => communities.map(() => false),
  );

  const allJoined = joined.every(Boolean);

  function setAt(i: number, value: boolean) {
    setJoined((prev) => prev.map((v, idx) => (idx === i ? value : v)));
  }

  return (
    <form action={formAction} className="mt-10 space-y-4">
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="courseId" value={courseId} />

      {communities.map((c, i) => (
        <Card key={c.url} pad="wide" className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-[15px] font-bold text-mist-100">{c.name}</h3>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase ${
                    c.platform === "WhatsApp"
                      ? "bg-growth-500/15 text-growth-400"
                      : "bg-info-500/15 text-info-500"
                  }`}
                >
                  {c.platform} {c.kind}
                </span>
              </div>
              <p className="mt-1.5 text-[13px] leading-[1.6] text-mist-400">
                {c.blurb}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setAt(i, true)}
              className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] border border-gold-500/40 px-3.5 py-2 text-[13px] font-semibold text-gold-400 transition-colors hover:bg-gold-500/10"
            >
              Open &amp; join
              <Icon name="chevronRight" size={14} strokeWidth={2.5} />
            </a>

            <label className="flex cursor-pointer items-center gap-2.5 text-[13px] font-medium text-mist-200 select-none">
              <input
                type="checkbox"
                checked={joined[i]}
                onChange={(e) => setAt(i, e.target.checked)}
                className="size-4 accent-gold-500"
              />
              I&apos;ve joined
            </label>
          </div>
        </Card>
      ))}

      {state.message && (
        <Alert tone={state.ok ? "success" : "error"}>{state.message}</Alert>
      )}

      <div className="rounded-[var(--radius-tile)] border border-rule bg-ink-900/60 p-5">
        <p className="text-[12.5px] leading-[1.7] text-mist-400">
          Ticking the boxes is on your honour — we can&apos;t see your WhatsApp
          or Telegram, and we don&apos;t want to. It&apos;s a small ask in
          exchange for free courses: be part of the community you&apos;re
          learning alongside.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <SubmitButton
            size="lg"
            pendingText="Unlocking…"
            disabled={!allJoined && !alreadyJoined}
          >
            {alreadyJoined ? "Continue" : "I've joined — unlock my courses"}
          </SubmitButton>
          {!allJoined && !alreadyJoined && (
            <p className="text-xs text-mist-500">
              Join and tick all {communities.length} to continue.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
