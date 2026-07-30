"use client";

import { useMemo, useState } from "react";
import { Card, Field, Input, PanelHead } from "@/components/ui";

/**
 * Position size calculator.
 *
 * Runs entirely in the browser and stores nothing. It is a teaching tool for
 * one idea — decide the loss you accept *before* you enter — so it starts from
 * risk and derives size, never the other way round.
 *
 * It deliberately does not connect to a wallet, quote live prices, or place an
 * order. The academy takes no custody and executes no trades.
 */
export function PositionCalculator() {
  const [account, setAccount] = useState("5000");
  const [riskPercent, setRiskPercent] = useState("1");
  const [entry, setEntry] = useState("2400");
  const [stop, setStop] = useState("2280");

  const result = useMemo(() => {
    const acct = Number(account);
    const risk = Number(riskPercent);
    const e = Number(entry);
    const s = Number(stop);

    if (![acct, risk, e, s].every((n) => Number.isFinite(n) && n > 0)) {
      return { error: "Enter positive numbers in every field." };
    }
    if (s === e) {
      return { error: "Your stop cannot equal your entry — that is no stop at all." };
    }

    // Distance to stop, in price terms. Absolute, so the maths holds for a
    // short (stop above entry) exactly as it does for a long.
    const distance = Math.abs(e - s);
    const riskAmount = acct * (risk / 100);
    const units = riskAmount / distance;
    const notional = units * e;

    return {
      riskAmount,
      units,
      notional,
      distancePercent: (distance / e) * 100,
      // 3R is a convention, not a promise — labelled as such in the UI.
      rewardAt3R: riskAmount * 3,
      /**
       * The number most people never look at: a position sized off a tight
       * stop can quietly exceed the account. Flagging it is the whole lesson.
       */
      leveraged: notional > acct,
    };
  }, [account, riskPercent, entry, stop]);

  const money = (n: number) =>
    n.toLocaleString(undefined, { maximumFractionDigits: 2 });

  return (
    <Card pad="wide">
      <PanelHead title="Position size calculator" className="mb-1.5" />
      <p className="mb-5 text-[11.5px] leading-[1.5] text-mist-400">
        Risk first — decide the loss you accept before you enter.
      </p>

      <div className="flex flex-col gap-3.5">
        <Field label="Account size" htmlFor="calc-account">
          <Input
            id="calc-account"
            inputMode="decimal"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
        </Field>
        <Field
          label="Risk per trade (%)"
          htmlFor="calc-risk"
          hint="Most professionals stay at or below 1%."
        >
          <Input
            id="calc-risk"
            inputMode="decimal"
            value={riskPercent}
            onChange={(e) => setRiskPercent(e.target.value)}
          />
        </Field>
        <div className="grid gap-3.5 sm:grid-cols-2">
          <Field label="Entry price" htmlFor="calc-entry">
            <Input
              id="calc-entry"
              inputMode="decimal"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
            />
          </Field>
          <Field label="Stop price" htmlFor="calc-stop">
            <Input
              id="calc-stop"
              inputMode="decimal"
              value={stop}
              onChange={(e) => setStop(e.target.value)}
            />
          </Field>
        </div>
      </div>

      <div className="tint-gold mt-5 rounded-[10px] p-[18px]" aria-live="polite">
        {"error" in result ? (
          <p className="text-xs leading-[1.6] text-flag-400">{result.error}</p>
        ) : (
          <>
            <div className="flex flex-wrap items-baseline justify-between gap-2.5">
              <span className="text-[11px] font-semibold tracking-[0.1em] text-gold-500 uppercase">
                Position size
              </span>
              <span className="text-[19px] font-extrabold text-mist-100 tabular-nums sm:text-[25px]">
                {money(result.notional)}
              </span>
            </div>
            <p className="mt-1 text-right text-[10.5px] text-mist-400 tabular-nums">
              {money(result.units)} units
            </p>

            <dl className="mt-3.5 space-y-2.5 border-t border-gold-500/20 pt-3.5">
              <Row label="Amount at risk" value={money(result.riskAmount)} tone="flag" />
              <Row
                label="Stop distance"
                value={`${result.distancePercent.toFixed(2)}%`}
              />
              <Row
                label="Reward at 3R"
                value={money(result.rewardAt3R)}
                tone="growth"
              />
            </dl>

            {result.leveraged && (
              <p className="mt-3.5 border-t border-gold-500/20 pt-3.5 text-[11px] leading-[1.6] text-ember-500">
                This position is larger than your whole account, which means it
                needs leverage. The risk figure above only holds if your stop
                actually fills at that price — in a fast market it may not.
              </p>
            )}
          </>
        )}
      </div>
    </Card>
  );
}

function Row({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "flag" | "growth";
}) {
  const colour = {
    default: "text-mist-100",
    flag: "text-flag-500",
    growth: "text-growth-500",
  }[tone];

  return (
    <div className="flex items-baseline justify-between gap-2.5">
      <dt className="text-[11px] font-medium text-mist-400">{label}</dt>
      <dd className={`text-[13px] font-bold tabular-nums ${colour}`}>{value}</dd>
    </div>
  );
}
