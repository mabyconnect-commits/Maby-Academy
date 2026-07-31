"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth/session";
import { enforceRateLimit } from "@/server/services/rateLimit";
import { claimAdminWithSecret } from "@/server/services/bootstrap";
import { toFormState } from "./formState";
import type { FormState } from "./formState";

export async function claimAdminAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const user = await requireUser();
    // Throttle guesses at the secret, keyed to the account trying.
    await enforceRateLimit(
      "passwordReset",
      user.id,
      "Too many attempts. Wait a moment and try again.",
    );

    const result = await claimAdminWithSecret(
      user.id,
      String(formData.get("secret") || ""),
    );

    // The workspace switcher is chosen from the user's role, so refresh the
    // whole shell once the role changes.
    revalidatePath("/", "layout");

    return {
      ok: true,
      message: result.alreadyAdmin
        ? "You're already an admin — reload and open the Admin area."
        : "Done — you're now an admin. Reload the page and the Admin area appears.",
    };
  } catch (error) {
    return toFormState(error);
  }
}
