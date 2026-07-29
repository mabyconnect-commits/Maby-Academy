"use client";

import { useActionState, useState } from "react";
import { Alert, Button, Card, Field, Input, Pill, Select } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { emptyFormState } from "@/server/actions/formState";
import {
  archiveHabitAction,
  createHabitAction,
  toggleHabitAction,
} from "@/server/actions/growth";

type Habit = {
  id: string;
  name: string;
  area: string;
  iconEmoji: string | null;
  currentStreak: number;
  doneToday: boolean;
};

export function HabitChecklist({ habits }: { habits: Habit[] }) {
  const [state, toggle] = useActionState(toggleHabitAction, emptyFormState);
  const [archiveState, archive] = useActionState(
    archiveHabitAction,
    emptyFormState,
  );

  const message = state.message || archiveState.message;

  return (
    <div className="space-y-2.5">
      {message && (
        <Alert tone={state.ok || archiveState.ok ? "success" : "error"}>
          {message}
        </Alert>
      )}

      {habits.map((habit) => (
        <div
          key={habit.id}
          className={`surface p-4 flex items-center gap-3 transition-colors ${
            habit.doneToday ? "border-growth-600/40 bg-growth-500/[0.04]" : ""
          }`}
        >
          {/* The whole row is the control — a small checkbox is a poor target
              on a phone, which is where most of these get ticked. */}
          <form action={toggle} className="flex-1">
            <input type="hidden" name="habitId" value={habit.id} />
            <button
              type="submit"
              className="flex items-center gap-3 w-full text-left"
              aria-pressed={habit.doneToday}
            >
              <span
                className={`h-6 w-6 rounded-md border flex items-center justify-center text-xs shrink-0 ${
                  habit.doneToday
                    ? "bg-growth-500 border-growth-500 text-ink-950"
                    : "border-ink-600 text-transparent"
                }`}
                aria-hidden
              >
                ✓
              </span>
              <span className="text-base shrink-0" aria-hidden>
                {habit.iconEmoji ?? "•"}
              </span>
              <span
                className={`flex-1 text-sm ${
                  habit.doneToday
                    ? "text-mist-400 line-through decoration-mist-500"
                    : "text-mist-100"
                }`}
              >
                {habit.name}
              </span>
              {habit.currentStreak > 1 && (
                <Pill tone="gold">🔥 {habit.currentStreak}</Pill>
              )}
            </button>
          </form>

          <form action={archive}>
            <input type="hidden" name="habitId" value={habit.id} />
            <button
              type="submit"
              className="text-xs text-mist-400 hover:text-flag-400 px-2 py-1 rounded"
              aria-label={`Archive ${habit.name}`}
            >
              Archive
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}

const AREAS = [
  ["LEARNING", "Learning"],
  ["FAITH", "Faith"],
  ["HEALTH", "Health"],
  ["FINANCE", "Finance"],
  ["PRODUCTIVITY", "Productivity"],
  ["CAREER", "Career"],
  ["BUSINESS", "Business"],
  ["LEADERSHIP", "Leadership"],
  ["RELATIONSHIPS", "Relationships"],
  ["PURPOSE", "Purpose"],
] as const;

export function AddHabit({
  suggestions,
}: {
  suggestions: { name: string; area: string; iconEmoji: string }[];
}) {
  const [state, formAction] = useActionState(createHabitAction, emptyFormState);
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <Button type="button" variant="secondary" onClick={() => setOpen(true)}>
        + Add a habit
      </Button>
    );
  }

  return (
    <Card>
      <form action={formAction} className="space-y-4">
        {state.message && (
          <Alert tone={state.ok ? "success" : "error"}>{state.message}</Alert>
        )}

        <div className="grid sm:grid-cols-[1fr_auto_auto] gap-3 items-end">
          <Field label="Habit" htmlFor="name">
            <Input
              id="name"
              name="name"
              required
              maxLength={80}
              placeholder="Something you want to do most days"
            />
          </Field>

          <Field label="Area" htmlFor="area">
            <Select id="area" name="area" defaultValue="LEARNING">
              {AREAS.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Icon" htmlFor="iconEmoji">
            <Input
              id="iconEmoji"
              name="iconEmoji"
              maxLength={4}
              placeholder="📚"
              className="w-20 text-center"
            />
          </Field>
        </div>

        <div>
          <p className="text-xs text-mist-400 mb-2">Or start from one of these:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s.name}
                type="submit"
                name="name"
                value={s.name}
                className="rounded-full border border-ink-600 bg-ink-850 px-3 py-1.5 text-xs text-mist-300 hover:border-gold-600/50 hover:text-gold-300 transition-colors"
              >
                {s.iconEmoji} {s.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <SubmitButton pendingText="Adding…">Add habit</SubmitButton>
          <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
