/**
 * Runs `prisma migrate deploy` for production deploys.
 *
 * The schema declares `directUrl = env("DIRECT_DATABASE_URL")`, and Prisma's
 * CLI refuses to load a schema whose referenced environment variables are
 * missing — it fails with P1012 rather than ignoring an unused field. That
 * turns a *nice-to-have* into a hard deploy blocker for anyone whose database
 * doesn't need a separate unpooled URL.
 *
 * So: fall back to DATABASE_URL when DIRECT_DATABASE_URL isn't set. Deploys
 * then work with one URL or two, and a pooled-only setup degrades to "may hit
 * an advisory-lock error during migration" rather than "build fails".
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

/**
 * npm puts `node_modules/.bin` on PATH for scripts it runs, but this file
 * should also work when invoked directly (`node scripts/migrate.mjs`), so
 * resolve the local binary before falling back to PATH.
 */
function resolvePrisma() {
  const binName = process.platform === "win32" ? "prisma.cmd" : "prisma";
  const local = path.join(process.cwd(), "node_modules", ".bin", binName);
  return existsSync(local) ? local : "prisma";
}

const { DATABASE_URL, DIRECT_DATABASE_URL } = process.env;

/**
 * "DATABASE_URL is not set" is a dead end on a hosted build — you can't
 * inspect the environment from a log. So report what the build *can* see:
 * variable names and presence only, never values, since these are secrets.
 */
function diagnose() {
  const expected = [
    "DATABASE_URL",
    "DIRECT_DATABASE_URL",
    "SESSION_SECRET",
    "NEXT_PUBLIC_APP_URL",
  ];

  const lines = expected.map((name) => {
    const value = process.env[name];
    const state = value ? `set (${value.length} chars)` : "MISSING";
    return `    ${name.padEnd(22)} ${state}`;
  });

  // Vercel injects these; seeing them confirms we really are on Vercel and
  // tells us which environment's variables should have applied.
  const vercelEnv = process.env.VERCEL_ENV;
  const context = vercelEnv
    ? `  Detected Vercel environment: ${vercelEnv}\n` +
      `  → In Vercel, environment variables are scoped per environment.\n` +
      `    Check the "${vercelEnv}" box is ticked for each variable, then redeploy.\n`
    : "";

  return `  What this build can see:\n${lines.join("\n")}\n\n${context}`;
}

/**
 * No database configured: skip migrations and let the build continue.
 *
 * The app boots into setup mode and serves a page explaining what to add,
 * which is more useful than a failed deploy with nothing running. Exiting 0
 * here is safe because there is no database to leave un-migrated — the
 * failure modes that must abort a build (unreachable server, failed
 * migration) are still handled below by prisma's own exit code.
 */
if (!DATABASE_URL) {
  console.warn(
    "\n⚠ DATABASE_URL is not set — skipping migrations.\n\n" +
      diagnose() +
      "\n  The app will deploy in SETUP MODE: every route shows a setup page\n" +
      "  until a database is configured. Add DATABASE_URL and redeploy to\n" +
      "  bring the academy online.\n",
  );
  process.exit(0);
}

const env = { ...process.env };

if (!DIRECT_DATABASE_URL) {
  env.DIRECT_DATABASE_URL = DATABASE_URL;
  console.log(
    "• DIRECT_DATABASE_URL not set — using DATABASE_URL for migrations.\n" +
      "  If your database is behind a connection pooler, set DIRECT_DATABASE_URL\n" +
      "  to the direct (unpooled) URL so migrations don't contend on locks.",
  );
}

const result = spawnSync(resolvePrisma(), ["migrate", "deploy"], {
  stdio: "inherit",
  env,
  shell: process.platform === "win32",
});

if (result.error) {
  console.error("✗ Could not run prisma:", result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
