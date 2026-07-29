"use client";

import { useActionState, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Field,
  Input,
  Pill,
  ProgressBar,
  Select,
  Textarea,
} from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { emptyFormState } from "@/server/actions/formState";
import {
  createGoalAction,
  setGoalStatusAction,
  toggleGoalSharingAction,
  updateGoalProgressAction,
} from "@/server/actions/growth";

type Goal = {
  id: string;
  title: string;
  description: string | null;
  area: string;
  horizon: string;
  targetValue: number | null;
  currentValue: number;
  unit: string | null;
  dueAt: string | null;
  status: string;
  sharedWithMentor: boolean;
};

export function GoalList({ goals }: { goals: Goal[] }) {
  const [progressState, updateProgress] = useActionState(
    updateGoalProgressAction,
    emptyFormState,
  );
  const [statusState, setStatus] = useActionState(
    setGoalStatusAction,
    emptyFormState,
  );
  const [shareState, toggleShare] = useActionState(
    toggleGoalSharingAction,
    emptyFormState,
  );

  const message =
    progressState.message || statusState.message || shareState.message;
  const ok = progressState.ok || statusState.ok || shareState.ok;

  return (
    <div className="space-y-3">
      {message && <Alert tone={ok ? "success" : "error"}>{message}</Alert>}

      {goals.map((goal) => {
        const percent =
          goal.targetValue && goal.targetValue > 0
            ? Math.round((goal.currentValue / goal.targetValue) * 100)
            : null;

        return (
          <Card key={goal.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Pill tone="neutral">{goal.horizon.toLowerCase()}</Pill>
                  <Pill tone="neutral">{goal.area.toLowerCase()}</Pill>
                  {goal.sharedWithMentor && (
                    <Pill tone="gold">Visible to mentor</Pill>
                  )}
                </div>

                <h3 className="mt-2.5 font-semibold text-mist-100">
                  {goal.title}
                </h3>
                {goal.description && (
                  <p className="mt-1 text-sm text-mist-400 leading-relaxed">
                    {goal.description}
                  </p>
                )}
                {goal.dueAt && (
                  <p className="mt-1.5 text-xs text-mist-400">
                    Due {goal.dueAt}
                  </p>
                )}
              </div>

              <form action={toggleShare} className="shrink-0">
                <input type="hidden" name="goalId" value={goal.id} />
                <button
                  type="submit"
                  className="text-xs text-mist-400 hover:text-gold-300 px-2 py-1 rounded"
                >
                  {goal.sharedWithMentor ? "Make private" : "Share with mentor"}
                </button>
              </form>
            </div>

            {percent !== null && (
              <div className="mt-4">
                <ProgressBar value={percent} showLabel />
                <p className="mt-1.5 text-xs text-mist-400 tabular-nums">
                  {goal.currentValue} of {goal.targetValue}
                  {goal.unit ? ` ${goal.unit}` : ""}
                </p>
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-end gap-3">
              {goal.targetValue !== null && (
                <form action={updateProgress} className="flex items-end gap-2">
                  <input type="hidden" name="goalId" value={goal.id} />
                  <div>
                    <label
                      htmlFor={`progress-${goal.id}`}
                      className="block text-xs text-mist-400 mb-1"
                    >
                      Update progress
                    </label>
                    <Input
                      id={`progress-${goal.id}`}
                      name="currentValue"
                      type="number"
                      min={0}
                      defaultValue={goal.currentValue}
                      className="w-28"
                    />
                  </div>
                  <SubmitButton size="sm" variant="secondary" pendingText="Saving…">
                    Save
                  </SubmitButton>
                </form>
              )}

              <form action={setStatus} className="flex gap-2">
                <input type="hidden" name="goalId" value={goal.id} />
                <input type="hidden" name="status" value="ACHIEVED" />
                <SubmitButton size="sm" variant="growth" pendingText="…">
                  Mark achieved
                </SubmitButton>
              </form>

              <form action={setStatus}>
                <input type="hidden" name="goalId" value={goal.id} />
                <input type="hidden" name="status" value="ABANDONED" />
                <SubmitButton size="sm" variant="ghost" pendingText="…">
                  Drop it
                </SubmitButton>
              </form>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

const AREAS = [
  ["LEARNING", "Learning"],
  ["FINANCE", "Finance"],
  ["FAITH", "Faith"],
  ["HEALTH", "Health"],
  ["CAREER", "Career"],
  ["BUSINESS", "Business"],
  ["PRODUCTIVITY", "Productivity"],
  ["LEADERSHIP", "Leadership"],
  ["RELATIONSHIPS", "Relationships"],
  ["PURPOSE", "Purpose"],
] as const;

const HORIZONS = [
  ["WEEKLY", "This week"],
  ["MONTHLY", "This month"],
  ["QUARTERLY", "This quarter"],
  ["ANNUAL", "This year"],
  ["DAILY", "Today"],
] as const;

export function AddGoal() {
  const [state, formAction] = useActionState(createGoalAction, emptyFormState);
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <Button type="button" variant="secondary" onClick={() => setOpen(true)}>
        + Set a goal
      </Button>
    );
  }

  return (
    <Card>
      <form action={formAction} className="space-y-4">
        {state.message && (
          <Alert tone={state.ok ? "success" : "error"}>{state.message}</Alert>
        )}

        <Field
          label="What are you going after?"
          htmlFor="title"
          hint="Be specific. 'Save three months of expenses' beats 'save more'."
        >
          <Input id="title" name="title" required maxLength={140} />
        </Field>

        <Field label="Why it matters" htmlFor="description">
          <Textarea id="description" name="description" rows={2} />
        </Field>

        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Area" htmlFor="goal-area">
            <Select id="goal-area" name="area" defaultValue="LEARNING">
              {AREAS.map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Timeframe" htmlFor="horizon">
            <Select id="horizon" name="horizon" defaultValue="MONTHLY">
              {HORIZONS.map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          <Field label="Target" htmlFor="targetValue" hint="Optional">
            <Input id="targetValue" name="targetValue" type="number" min={0} />
          </Field>

          <Field label="Unit" htmlFor="unit" hint="e.g. lessons, months">
            <Input id="unit" name="unit" maxLength={20} />
          </Field>

          <Field label="Due" htmlFor="dueAt" hint="Optional">
            <Input id="dueAt" name="dueAt" type="date" />
          </Field>
        </div>

        <label className="flex items-start gap-2.5 text-sm text-mist-300">
          <input
            type="checkbox"
            name="sharedWithMentor"
            className="mt-0.5 accent-[#d9a441]"
          />
          <span>
            Let my mentor see this goal
            <span className="block text-xs text-mist-400 mt-0.5">
              Off by default. You can change it at any time.
            </span>
          </span>
        </label>

        <div className="flex gap-2">
          <SubmitButton pendingText="Saving…">Set goal</SubmitButton>
          <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
