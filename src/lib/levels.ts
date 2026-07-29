/**
 * Level tiers, derived from lifetime points.
 *
 * Derived rather than stored: a stored level can drift from the ledger, and
 * there is no question a stored column answers that a pure function does not.
 *
 * Thresholds widen as they climb so early levels arrive quickly (the first
 * week should feel like progress) while later ones represent real work.
 */
export type Level = {
  number: number;
  name: string;
  minPoints: number;
  /** Points at which the next level begins; null at the top. */
  nextAt: number | null;
};

const TIERS: { name: string; minPoints: number }[] = [
  { name: "Newcomer", minPoints: 0 },
  { name: "Student", minPoints: 100 },
  { name: "Apprentice", minPoints: 300 },
  { name: "Practitioner", minPoints: 700 },
  { name: "Analyst", minPoints: 1500 },
  { name: "Strategist", minPoints: 3000 },
  { name: "Scholar", minPoints: 5500 },
  { name: "Mentor", minPoints: 9000 },
  { name: "Steward", minPoints: 14000 },
  { name: "Fellow", minPoints: 21000 },
];

export function levelFor(lifetimePoints: number): Level {
  const points = Math.max(0, lifetimePoints);

  let index = 0;
  for (let i = 0; i < TIERS.length; i++) {
    if (points >= TIERS[i].minPoints) index = i;
  }

  const tier = TIERS[index];
  const next = TIERS[index + 1] ?? null;

  return {
    number: index + 1,
    name: tier.name,
    minPoints: tier.minPoints,
    nextAt: next?.minPoints ?? null,
  };
}

/** Progress through the current level, 0–100. Full at the top tier. */
export function levelProgress(lifetimePoints: number): number {
  const level = levelFor(lifetimePoints);
  if (level.nextAt === null) return 100;

  const span = level.nextAt - level.minPoints;
  if (span <= 0) return 100;

  const earned = Math.max(0, lifetimePoints) - level.minPoints;
  return Math.max(0, Math.min(100, Math.round((earned / span) * 100)));
}

export function pointsToNextLevel(lifetimePoints: number): number | null {
  const level = levelFor(lifetimePoints);
  if (level.nextAt === null) return null;
  return Math.max(0, level.nextAt - Math.max(0, lifetimePoints));
}

export const LEVEL_TIERS = TIERS;
