"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireUser } from "@/lib/auth/session";
import {
  createSeason,
  lockSeason,
  markSeasonResultPaid,
  reviewSeasonResult,
  setSeasonStatus,
} from "@/server/services/seasons";
import { toFormState, type FormState } from "./formState";

/**
 * Season actions.
 *
 * Every one of these re-derives the actor from the session rather than
 * trusting anything in the form. The capability checks live in the service,
 * so a hand-built POST to one of these hits exactly the same guard the UI
 * does — the page only decides what to render, never what is allowed.
 */

const moneySchema = z
  .string()
  .trim()
  .regex(/^\d+(\.\d{1,2})?$/, "Enter an amount like 5000 or 5000.50")
  .transform((v) => Math.round(Number(v) * 100));

const createSchema = z
  .object({
    name: z.string().trim().min(3, "Give the season a name."),
    slug: z
      .string()
      .trim()
      .min(3)
      .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and hyphens."),
    blurb: z.string().trim().max(400).optional(),
    startsAt: z.string().min(1, "Pick a start date."),
    endsAt: z.string().min(1, "Pick an end date."),
    currency: z.string().trim().length(3).toUpperCase(),
    minActiveDays: z.coerce.number().int().min(1).max(31),
    minQualifyingPoints: z.coerce.number().int().min(0),
    prizes: z.string(),
  })
  .transform((v) => ({ ...v, startsAt: new Date(v.startsAt), endsAt: new Date(v.endsAt) }));

/** Prize bands arrive as JSON from the client form. */
const prizeSchema = z.array(
  z.object({
    rankFrom: z.coerce.number().int().min(1),
    rankTo: z.coerce.number().int().min(1),
    amountMinor: z.coerce.number().int().min(0),
    label: z.string().trim().max(80).optional(),
  }),
);

export async function createSeasonAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const actor = await requireUser();
    const input = createSchema.parse({
      name: formData.get("name"),
      slug: formData.get("slug"),
      blurb: formData.get("blurb") ?? undefined,
      startsAt: formData.get("startsAt"),
      endsAt: formData.get("endsAt"),
      currency: formData.get("currency") ?? "NGN",
      minActiveDays: formData.get("minActiveDays") ?? 3,
      minQualifyingPoints: formData.get("minQualifyingPoints") ?? 100,
      prizes: formData.get("prizes") ?? "[]",
    });

    const prizes = prizeSchema.parse(JSON.parse(input.prizes));

    const season = await createSeason({
      actor,
      name: input.name,
      slug: input.slug,
      blurb: input.blurb,
      startsAt: input.startsAt,
      endsAt: input.endsAt,
      currency: input.currency,
      minActiveDays: input.minActiveDays,
      minQualifyingPoints: input.minQualifyingPoints,
      prizes,
    });

    revalidatePath("/admin/seasons");
    return {
      ok: true,
      message: `"${season.name}" created as a draft. Open it when you are ready for members to see it.`,
    };
  } catch (error) {
    return toFormState(error);
  }
}

export async function setSeasonStatusAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const actor = await requireUser();
    const seasonId = String(formData.get("seasonId") ?? "");
    const status = z
      .enum(["DRAFT", "OPEN", "CANCELLED", "SETTLED"])
      .parse(formData.get("status"));

    await setSeasonStatus({ actor, seasonId, status });

    revalidatePath("/admin/seasons");
    revalidatePath(`/admin/seasons/${seasonId}`);
    revalidatePath("/dashboard/leaderboard");
    return { ok: true, message: `Season set to ${status.toLowerCase()}.` };
  } catch (error) {
    return toFormState(error);
  }
}

export async function lockSeasonAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const actor = await requireUser();
    const seasonId = String(formData.get("seasonId") ?? "");

    const { frozen } = await lockSeason({ actor, seasonId });

    revalidatePath("/admin/seasons");
    revalidatePath(`/admin/seasons/${seasonId}`);
    revalidatePath("/dashboard/leaderboard");
    return {
      ok: true,
      message: `Standings frozen for ${frozen} qualifying member${frozen === 1 ? "" : "s"}. Nothing pays until each one is reviewed.`,
    };
  } catch (error) {
    return toFormState(error);
  }
}

export async function reviewSeasonResultAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const actor = await requireUser();
    const resultId = String(formData.get("resultId") ?? "");
    const decision = z
      .enum(["APPROVED", "WITHHELD"])
      .parse(formData.get("decision"));
    const reason = String(formData.get("reason") ?? "");

    await reviewSeasonResult({ actor, resultId, decision, reason });

    revalidatePath("/admin/seasons");
    return {
      ok: true,
      message:
        decision === "APPROVED"
          ? "Approved. It can now be marked paid by someone with payout access."
          : "Withheld, with the reason recorded against the result.",
    };
  } catch (error) {
    return toFormState(error);
  }
}

export async function markSeasonResultPaidAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const actor = await requireUser();
    const resultId = String(formData.get("resultId") ?? "");
    const payoutRef = String(formData.get("payoutRef") ?? "");

    await markSeasonResultPaid({ actor, resultId, payoutRef });

    revalidatePath("/admin/seasons");
    return { ok: true, message: "Recorded as paid." };
  } catch (error) {
    return toFormState(error);
  }
}
