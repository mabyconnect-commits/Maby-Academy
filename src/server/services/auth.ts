import "server-only";
import { db } from "@/lib/db";
import {
  generateReferralCode,
  generateToken,
  hashPassword,
  hashToken,
  verifyPassword,
} from "@/lib/auth/tokens";
import type { RegisterInput } from "@/lib/validation";
import { findReferrerByCode, recordSignupReferral } from "./referrals";
import { notify } from "./notifications";
import { evaluateBadges } from "./rewards";

export class ServiceError extends Error {
  constructor(
    message: string,
    readonly status = 400,
    readonly field?: string,
  ) {
    super(message);
    this.name = "ServiceError";
  }
}

/** Referral codes are random; retry on the astronomically unlikely collision. */
async function uniqueReferralCode(name: string) {
  for (let i = 0; i < 6; i++) {
    const code = generateReferralCode(name);
    const taken = await db.user.findUnique({
      where: { referralCode: code },
      select: { id: true },
    });
    if (!taken) return code;
  }
  throw new ServiceError("Could not allocate a referral code. Try again.", 500);
}

export async function registerUser(input: RegisterInput) {
  const existing = await db.user.findUnique({
    where: { email: input.email },
    select: { id: true },
  });
  if (existing) {
    throw new ServiceError("An account with that email already exists.", 409, "email");
  }

  const referrer = input.referralCode
    ? await findReferrerByCode(input.referralCode)
    : null;
  if (input.referralCode && !referrer) {
    throw new ServiceError("That referral code is not valid.", 400, "referralCode");
  }

  const [passwordHash, referralCode] = await Promise.all([
    hashPassword(input.password),
    uniqueReferralCode(input.name),
  ]);

  const user = await db.$transaction(async (tx) => {
    const created = await tx.user.create({
      data: {
        name: input.name,
        email: input.email,
        passwordHash,
        referralCode,
        referredById: referrer?.isActive ? referrer.id : null,
      },
    });

    if (referrer?.isActive) {
      await recordSignupReferral(tx, {
        newUserId: created.id,
        newUserName: created.name,
        referrerId: referrer.id,
      });
      await evaluateBadges(tx, referrer.id);
    }

    await notify(tx, {
      userId: created.id,
      type: "SYSTEM",
      title: "Welcome to Maby Academy 👋",
      body: "Your journey starts here. Browse the catalogue and enrol in your first course — growth compounds.",
      linkUrl: "/courses",
    });

    return created;
  });

  return user;
}

export async function authenticate(email: string, password: string) {
  const user = await db.user.findUnique({ where: { email } });

  // Always run a comparison so a missing account and a wrong password take
  // the same amount of time — otherwise the response time enumerates users.
  const hash =
    user?.passwordHash ??
    "$2a$12$............................................................";
  const ok = await verifyPassword(password, hash);

  if (!user || !ok) {
    throw new ServiceError("Email or password is incorrect.", 401);
  }
  if (!user.isActive) {
    throw new ServiceError("This account has been deactivated.", 403);
  }

  await db.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  return user;
}

// --- Password reset ------------------------------------------------------

const RESET_TTL_MS = 60 * 60 * 1000;

/**
 * Always resolves, whether or not the email exists — the caller shows the
 * same message either way so the endpoint cannot be used to enumerate users.
 * Returns the raw token when one was issued so the caller can email it.
 */
export async function createPasswordReset(email: string) {
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });
  if (!user) return null;

  const token = generateToken();
  await db.passwordResetToken.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(token),
      expiresAt: new Date(Date.now() + RESET_TTL_MS),
    },
  });
  return token;
}

export async function consumePasswordReset(token: string, newPassword: string) {
  const record = await db.passwordResetToken.findUnique({
    where: { tokenHash: hashToken(token) },
  });

  if (!record || record.usedAt || record.expiresAt < new Date()) {
    throw new ServiceError("This reset link is invalid or has expired.", 400);
  }

  const passwordHash = await hashPassword(newPassword);

  await db.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: record.userId },
      data: { passwordHash },
    });
    await tx.passwordResetToken.update({
      where: { id: record.id },
      data: { usedAt: new Date() },
    });
    // A reset is a trust boundary: drop every existing session.
    await tx.session.deleteMany({ where: { userId: record.userId } });
  });

  return record.userId;
}

export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string,
) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { passwordHash: true },
  });
  if (!user) throw new ServiceError("Account not found.", 404);

  const ok = await verifyPassword(currentPassword, user.passwordHash);
  if (!ok) {
    throw new ServiceError("Your current password is incorrect.", 400, "currentPassword");
  }

  const passwordHash = await hashPassword(newPassword);
  await db.user.update({ where: { id: userId }, data: { passwordHash } });
}

// --- Email verification --------------------------------------------------

export async function createEmailVerification(userId: string) {
  const token = generateToken();
  await db.verificationToken.create({
    data: {
      userId,
      tokenHash: hashToken(token),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });
  return token;
}

export async function consumeEmailVerification(token: string) {
  const record = await db.verificationToken.findUnique({
    where: { tokenHash: hashToken(token) },
  });
  if (!record || record.usedAt || record.expiresAt < new Date()) {
    throw new ServiceError("This verification link is invalid or has expired.", 400);
  }

  await db.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: record.userId },
      data: { emailVerifiedAt: new Date() },
    });
    await tx.verificationToken.update({
      where: { id: record.id },
      data: { usedAt: new Date() },
    });
  });

  return record.userId;
}
