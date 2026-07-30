"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth/session";
import { setFeatureFlag } from "@/server/services/admin";
import { audit } from "@/server/services/notifications";
import { toFormState, type FormState } from "./formState";

export async function setFeatureFlagAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const actor = await requireUser();
    const key = String(formData.get("key") ?? "");
    const enabled = formData.get("enabled") === "true";

    const flag = await setFeatureFlag(actor, { key, enabled });

    // A flag change alters behaviour for every member at once, so it is
    // audited with the value it was set to — not just that it changed.
    await audit({
      userId: actor.id,
      action: enabled ? "flag.enabled" : "flag.disabled",
      entityType: "FeatureFlag",
      entityId: key,
      metadata: { key, enabled },
    });

    revalidatePath("/admin/flags");
    return {
      ok: true,
      message: `${flag.key} is now ${flag.isEnabled ? "on" : "off"}.`,
    };
  } catch (error) {
    return toFormState(error);
  }
}
