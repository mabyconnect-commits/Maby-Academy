"use client";

import { useActionState, useRef, useState } from "react";
import {
  Alert,
  Card,
  Field,
  Input,
  Select,
  Textarea,
} from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { emptyFormState } from "@/server/actions/formState";
import {
  createJournalEntryAction,
  deleteJournalEntryAction,
} from "@/server/actions/growth";

const KINDS = [
  ["REFLECTION", "🪞 Reflection"],
  ["GRATITUDE", "🙏 Gratitude"],
  ["PRAYER", "✝ Prayer"],
  ["LESSON_NOTE", "📝 Lesson note"],
  ["REVIEW", "🔍 Weekly review"],
] as const;

/** Prompts, so a blank page is never the obstacle. */
const PROMPTS: Record<string, string> = {
  REFLECTION:
    "What went well today, what didn't, and the one thing you'd do differently tomorrow?",
  GRATITUDE: "Three specific things you're grateful for. Specific beats grand.",
  PRAYER: "What are you bringing, and what are you letting go of?",
  LESSON_NOTE: "What did this lesson change about how you think?",
  REVIEW:
    "What moved this week? What stalled? What is the single most important thing next week?",
};

export function JournalComposer() {
  const [state, formAction] = useActionState(
    createJournalEntryAction,
    emptyFormState,
  );
  const [kind, setKind] = useState<string>("REFLECTION");
  const formRef = useRef<HTMLFormElement>(null);

  // Clear the form after a successful save so the next entry starts fresh.
  if (state.ok && formRef.current) formRef.current.reset();

  return (
    <Card>
      <form ref={formRef} action={formAction} className="space-y-4">
        {state.message && (
          <Alert tone={state.ok ? "success" : "error"}>{state.message}</Alert>
        )}

        <div className="grid sm:grid-cols-[auto_1fr] gap-3">
          <Field label="Kind" htmlFor="kind">
            <Select
              id="kind"
              name="kind"
              value={kind}
              onChange={(e) => setKind(e.target.value)}
            >
              {KINDS.map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Title" htmlFor="title" hint="Optional">
            <Input id="title" name="title" maxLength={120} />
          </Field>
        </div>

        <Field label="Entry" htmlFor="body">
          <Textarea
            id="body"
            name="body"
            rows={7}
            required
            placeholder={PROMPTS[kind]}
          />
        </Field>

        <div className="grid sm:grid-cols-2 gap-4 items-end">
          <Field
            label="How was the day?"
            htmlFor="mood"
            hint="Optional. Only you see this."
          >
            <Select id="mood" name="mood" defaultValue="">
              <option value="">Not saying</option>
              <option value="1">Rough</option>
              <option value="2">Low</option>
              <option value="3">Steady</option>
              <option value="4">Good</option>
              <option value="5">Strong</option>
            </Select>
          </Field>

          <label className="flex items-start gap-2.5 text-sm text-mist-300 pb-2">
            <input
              type="checkbox"
              name="shareWithMentor"
              className="mt-0.5 accent-[#d9a441]"
            />
            <span>
              Share this entry with my mentor
              <span className="block text-xs text-mist-400 mt-0.5">
                Off by default. Applies to this entry only.
              </span>
            </span>
          </label>
        </div>

        <SubmitButton pendingText="Saving…">Save entry</SubmitButton>
      </form>
    </Card>
  );
}

export function DeleteEntry({ entryId }: { entryId: string }) {
  const [state, formAction] = useActionState(
    deleteJournalEntryAction,
    emptyFormState,
  );
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="text-xs text-mist-400 hover:text-flag-400"
      >
        Delete
      </button>
    );
  }

  return (
    <form action={formAction} className="flex items-center gap-2">
      <input type="hidden" name="entryId" value={entryId} />
      <SubmitButton variant="danger" size="sm" pendingText="…">
        Confirm
      </SubmitButton>
      <button
        type="button"
        onClick={() => setConfirming(false)}
        className="text-xs text-mist-400 hover:text-mist-200"
      >
        Cancel
      </button>
      {state.message && !state.ok && (
        <span className="text-xs text-flag-400">{state.message}</span>
      )}
    </form>
  );
}
