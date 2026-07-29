import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { AuthError } from "@/lib/auth/session";
import { ServiceError } from "@/server/services/auth";

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ ok: true, data }, { status });
}

export function fail(message: string, status = 400, details?: unknown) {
  return NextResponse.json(
    { ok: false, error: { message, details } },
    { status },
  );
}

/**
 * Single translation point from thrown domain errors to HTTP.
 *
 * Anything unrecognised is logged server-side and reported as a generic 500 —
 * internal messages and stack traces never reach the client.
 */
export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return fail(
      error.issues[0]?.message ?? "Invalid request.",
      422,
      error.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
    );
  }
  if (error instanceof AuthError) return fail(error.message, error.status);
  if (error instanceof ServiceError) {
    return fail(error.message, error.status, error.field ? { field: error.field } : undefined);
  }

  console.error("[api] unhandled error:", error);
  return fail("Something went wrong on our side.", 500);
}

/** Wraps a route handler so every thrown error becomes a clean JSON response. */
export function route<Args extends unknown[]>(
  handler: (...args: Args) => Promise<Response>,
) {
  return async (...args: Args): Promise<Response> => {
    try {
      return await handler(...args);
    } catch (error) {
      return handleApiError(error);
    }
  };
}

export async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    throw new ServiceError("Request body must be valid JSON.", 400);
  }
}

export function clientMeta(request: Request) {
  return {
    ipAddress:
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
    userAgent: request.headers.get("user-agent"),
  };
}
