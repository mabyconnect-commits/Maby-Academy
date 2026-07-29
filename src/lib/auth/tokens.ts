import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import bcrypt from "bcryptjs";
import { env } from "@/lib/env";

const BCRYPT_ROUNDS = 12;

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, BCRYPT_ROUNDS);
}

export async function verifyPassword(
  plain: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

/** A URL-safe, 256-bit opaque token. Only ever shown to the user once. */
export function generateToken(bytes = 32): string {
  return randomBytes(bytes).toString("base64url");
}

/**
 * Tokens are stored as an HMAC keyed with SESSION_SECRET rather than a bare
 * hash. Stealing the database is then not enough to forge a session — the
 * attacker also needs the application secret.
 */
export function hashToken(token: string): string {
  return createHmac("sha256", env.SESSION_SECRET).update(token).digest("hex");
}

export function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/** Short, unambiguous referral code — no 0/O/1/I to survive being read aloud. */
export function generateReferralCode(name: string): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const prefix = (name.replace(/[^a-zA-Z]/g, "").slice(0, 4) || "MABY").toUpperCase();
  let suffix = "";
  const bytes = randomBytes(4);
  for (let i = 0; i < 4; i++) suffix += alphabet[bytes[i] % alphabet.length];
  return `${prefix}${suffix}`;
}

/** Deterministic certificate serial component. */
export function certificateSerial(sequence: number, year = new Date().getFullYear()) {
  return `MABY-${year}-${String(sequence).padStart(6, "0")}`;
}

export function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}
