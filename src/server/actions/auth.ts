"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { ZodError } from "zod";
import { db } from "@/lib/db";
import {
  createSession,
  destroyAllSessions,
  destroySession,
  requireUser,
} from "@/lib/auth/session";
import {
  changePasswordSchema,
  loginSchema,
  registerSchema,
  requestResetSchema,
  resetPasswordSchema,
  updateProfileSchema,
} from "@/lib/validation";
import {
  ServiceError,
  authenticate,
  changePassword,
  consumePasswordReset,
  createPasswordReset,
  registerUser,
} from "@/server/services/auth";
import { audit } from "@/server/services/notifications";
import type { FormState } from "./formState";

function toFormState(error: unknown): FormState {
  if (error instanceof ZodError) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of error.issues) {
      const key = issue.path.join(".") || "form";
      fieldErrors[key] ??= issue.message;
    }
    return { ok: false, message: error.issues[0]?.message, fieldErrors };
  }
  if (error instanceof ServiceError) {
    return {
      ok: false,
      message: error.message,
      fieldErrors: error.field ? { [error.field]: error.message } : undefined,
    };
  }
  console.error("[action] unhandled error:", error);
  return { ok: false, message: "Something went wrong. Please try again." };
}

async function requestMeta() {
  const h = await headers();
  return {
    ipAddress: h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
    userAgent: h.get("user-agent"),
  };
}

export async function registerAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const input = registerSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      referralCode: formData.get("referralCode") ?? "",
    });

    const user = await registerUser(input);
    const meta = await requestMeta();
    await createSession(user.id, meta);
    await audit({
      userId: user.id,
      action: "user.register",
      entityType: "User",
      entityId: user.id,
      ipAddress: meta.ipAddress,
    });
  } catch (error) {
    return toFormState(error);
  }

  redirect("/dashboard");
}

export async function loginAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const nextPath = String(formData.get("next") || "/dashboard");

  try {
    const input = loginSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const user = await authenticate(input.email, input.password);
    const meta = await requestMeta();
    await createSession(user.id, meta);
    await audit({
      userId: user.id,
      action: "user.login",
      entityType: "User",
      entityId: user.id,
      ipAddress: meta.ipAddress,
    });
  } catch (error) {
    return toFormState(error);
  }

  // Only allow relative redirects — an absolute URL here would be an open
  // redirect straight out of the login form.
  redirect(nextPath.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/dashboard");
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}

export async function requestResetAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const { email } = requestResetSchema.parse({ email: formData.get("email") });
    const token = await createPasswordReset(email);

    // The response is identical whether or not the account exists.
    return {
      ok: true,
      message:
        "If that email belongs to an account, a reset link is on its way.",
      devToken:
        token && process.env.NODE_ENV !== "production" ? token : undefined,
    };
  } catch (error) {
    return toFormState(error);
  }
}

export async function resetPasswordAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const input = resetPasswordSchema.parse({
      token: formData.get("token"),
      password: formData.get("password"),
    });
    const userId = await consumePasswordReset(input.token, input.password);
    await audit({ userId, action: "user.password_reset" });
  } catch (error) {
    return toFormState(error);
  }

  redirect("/login?reset=1");
}

export async function updateProfileAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const user = await requireUser();
    const input = updateProfileSchema.parse({
      name: formData.get("name"),
      bio: formData.get("bio") ?? "",
      country: formData.get("country") ?? "",
      timezone: formData.get("timezone") ?? "",
    });

    await db.user.update({
      where: { id: user.id },
      data: {
        name: input.name,
        bio: input.bio || null,
        country: input.country || null,
        timezone: input.timezone || "UTC",
      },
    });

    revalidatePath("/dashboard/settings");
    return { ok: true, message: "Profile updated." };
  } catch (error) {
    return toFormState(error);
  }
}

export async function changePasswordAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const user = await requireUser();
    const input = changePasswordSchema.parse({
      currentPassword: formData.get("currentPassword"),
      newPassword: formData.get("newPassword"),
    });

    await changePassword(user.id, input.currentPassword, input.newPassword);
    await destroyAllSessions(user.id);
    await audit({ userId: user.id, action: "user.password_change" });
  } catch (error) {
    return toFormState(error);
  }

  redirect("/login?changed=1");
}
