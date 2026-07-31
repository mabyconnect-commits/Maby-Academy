"use client";

import { useActionState, useMemo, useState } from "react";
import { Alert, Field, Input, Textarea } from "@/components/ui";
import { SubmitButton } from "@/components/SubmitButton";
import { emptyFormState } from "@/server/actions/formState";
import { createSeasonAction } from "@/server/actions/seasons";

type Band = { rankFrom: string; rankTo: string; amount: string; label: string };

const BLANK: Band = { rankFrom: "", rankTo: "", amount: "", label: "" };

/** Monday of the current week, so the default season is a clean seven days. */
function nextWeekRange() {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  const iso = (d: Date) => d.toISOString().slice(0, 16);
  return { start: iso(start), end: iso(end) };
}

export function NewSeasonForm() {
  const [state, formAction] = useActionState(createSeasonAction, emptyFormState);
  const [bands, setBands] = useState<Band[]>([
    { rankFrom: "1", rankTo: "1", amount: "", label: "Winner" },
  ]);
  const defaults = useMemo(nextWeekRange, []);

  const parsed = bands
    .filter((b) => b.rankFrom && b.rankTo && b.amount)
    .map((b) => ({
      rankFrom: Number(b.rankFrom),
      rankTo: Number(b.rankTo),
      amountMinor: Math.round(Number(b.amount) * 100),
      label: b.label || undefined,
    }));

  // Shown live so the pool cannot be a surprise after the season is created.
  // A band covering ranks 2–5 pays its amount four times, which is easy to
  // miss when entering it.
  const pool = parsed.reduce(
    (sum, b) => sum + b.amountMinor * Math.max(0, b.rankTo - b.rankFrom + 1),
    0,
  );

  const overlap = parsed
    .slice()
    .sort((a, b) => a.rankFrom - b.rankFrom)
    .some((b, i, arr) => i > 0 && b.rankFrom <= arr[i - 1].rankTo);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="prizes" value={JSON.stringify(parsed)} />

      {state.message && (
        <Alert tone={state.ok ? "success" : "error"}>{state.message}</Alert>
      )}

      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={state.fieldErrors?.name}>
          <Input id="name" name="name" placeholder="Week of 4 August" required />
        </Field>
        <Field
          label="Slug"
          htmlFor="slug"
          hint="Lowercase, hyphens. Used in links."
          error={state.fieldErrors?.slug}
        >
          <Input id="slug" name="slug" placeholder="week-2026-08-04" required />
        </Field>
      </div>

      <Field label="Blurb" htmlFor="blurb" hint="Optional. Shown on the board.">
        <Textarea
          id="blurb"
          name="blurb"
          rows={2}
          placeholder="What this week's season is about."
        />
      </Field>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field label="Starts" htmlFor="startsAt" error={state.fieldErrors?.startsAt}>
          <Input
            id="startsAt"
            name="startsAt"
            type="datetime-local"
            defaultValue={defaults.start}
            required
          />
        </Field>
        <Field label="Ends" htmlFor="endsAt" error={state.fieldErrors?.endsAt}>
          <Input
            id="endsAt"
            name="endsAt"
            type="datetime-local"
            defaultValue={defaults.end}
            required
          />
        </Field>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-3">
        <Field label="Currency" htmlFor="currency">
          <Input id="currency" name="currency" defaultValue="NGN" maxLength={3} />
        </Field>
        <Field
          label="Min active days"
          htmlFor="minActiveDays"
          hint="Stops a season being won in one night."
        >
          <Input
            id="minActiveDays"
            name="minActiveDays"
            type="number"
            min={1}
            max={31}
            defaultValue={3}
          />
        </Field>
        <Field
          label="Min points"
          htmlFor="minQualifyingPoints"
          hint="Floor to appear on a paid board."
        >
          <Input
            id="minQualifyingPoints"
            name="minQualifyingPoints"
            type="number"
            min={0}
            defaultValue={100}
          />
        </Field>
      </div>

      {/* Prize bands ---------------------------------------------------- */}
      <div>
        <p className="eyebrow mb-2">Prize bands</p>
        <div className="space-y-2.5">
          {bands.map((band, i) => (
            <div key={i} className="grid gap-2 sm:grid-cols-[70px_70px_1fr_1fr_auto]">
              <Input
                aria-label={`Band ${i + 1} first rank`}
                placeholder="From"
                inputMode="numeric"
                value={band.rankFrom}
                onChange={(e) =>
                  setBands((b) =>
                    b.map((x, j) =>
                      j === i ? { ...x, rankFrom: e.target.value } : x,
                    ),
                  )
                }
              />
              <Input
                aria-label={`Band ${i + 1} last rank`}
                placeholder="To"
                inputMode="numeric"
                value={band.rankTo}
                onChange={(e) =>
                  setBands((b) =>
                    b.map((x, j) =>
                      j === i ? { ...x, rankTo: e.target.value } : x,
                    ),
                  )
                }
              />
              <Input
                aria-label={`Band ${i + 1} amount each`}
                placeholder="Amount each"
                inputMode="decimal"
                value={band.amount}
                onChange={(e) =>
                  setBands((b) =>
                    b.map((x, j) =>
                      j === i ? { ...x, amount: e.target.value } : x,
                    ),
                  )
                }
              />
              <Input
                aria-label={`Band ${i + 1} label`}
                placeholder="Label (optional)"
                value={band.label}
                onChange={(e) =>
                  setBands((b) =>
                    b.map((x, j) =>
                      j === i ? { ...x, label: e.target.value } : x,
                    ),
                  )
                }
              />
              <button
                type="button"
                onClick={() => setBands((b) => b.filter((_, j) => j !== i))}
                className="rounded px-2 py-2 text-xs text-mist-400 hover:text-flag-400"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setBands((b) => [...b, { ...BLANK }])}
          className="mt-2.5 rounded px-2 py-2 text-[11px] font-semibold text-gold-500 hover:text-gold-400"
        >
          + Add band
        </button>

        {overlap && (
          <div className="mt-2.5">
            <Alert tone="error">
              Two bands cover the same rank. A rank in two bands would pay
              whichever was read first, so this is refused rather than
              guessed.
            </Alert>
          </div>
        )}

        <p className="mt-2.5 text-[11px] text-mist-400">
          Total pool:{" "}
          <span className="font-bold text-mist-200 tabular-nums">
            {(pool / 100).toLocaleString()}
          </span>{" "}
          — a band covering several ranks pays its amount once per rank.
        </p>
      </div>

      <SubmitButton size="lg" pendingText="Creating…" disabled={overlap}>
        Create as draft
      </SubmitButton>
    </form>
  );
}
