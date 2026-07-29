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

/**
 * Kept in sync with src/lib/database-url.ts. Duplicated rather than imported
 * because this script runs before the TypeScript build exists.
 */
const APP_URL_KEYS = ["DATABASE_URL", "POSTGRES_PRISMA_URL", "POSTGRES_URL"];
const DIRECT_URL_KEYS = [
  "DIRECT_DATABASE_URL",
  "DATABASE_URL_UNPOOLED",
  "POSTGRES_URL_NON_POOLING",
];

function firstNonEmpty(keys) {
  for (const key of keys) {
    const value = process.env[key];
    if (typeof value === "string" && value.trim() !== "") {
      return { key, value: value.trim() };
    }
  }
  return null;
}

const resolvedApp = firstNonEmpty(APP_URL_KEYS);
const resolvedDirect = firstNonEmpty(DIRECT_URL_KEYS);

const DATABASE_URL = resolvedApp?.value;
const DIRECT_DATABASE_URL = resolvedDirect?.value;

/**
 * "DATABASE_URL is not set" is a dead end on a hosted build — you can't
 * inspect the environment from a log. So report what the build *can* see:
 * variable names and presence only, never values, since these are secrets.
 */
function diagnose() {
  const expected = [
    ...APP_URL_KEYS,
    ...DIRECT_URL_KEYS,
    "SESSION_SECRET",
    "NEXT_PUBLIC_APP_URL",
  ];

  const lines = expected.map((name) => {
    const value = process.env[name];
    const state = value ? `set (${value.length} chars)` : "—";
    return `    ${name.padEnd(26)} ${state}`;
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
    "\n⚠ No database connection string found — skipping migrations.\n\n" +
      diagnose() +
      "\n  The app will deploy in SETUP MODE: every route shows a setup page\n" +
      "  until a database is configured. Connect a Postgres database (on\n" +
      "  Vercel: Storage → Neon) or set DATABASE_URL, then redeploy.\n",
  );
  process.exit(0);
}

console.log(`• Using ${resolvedApp.key} for the database connection.`);

// Prisma's CLI reads these specific names from the environment, so map
// whatever the platform provided onto the names the schema references.
const env = { ...process.env, DATABASE_URL };

if (DIRECT_DATABASE_URL) {
  env.DIRECT_DATABASE_URL = DIRECT_DATABASE_URL;
  console.log(`• Using ${resolvedDirect.key} for migrations.`);
} else {
  env.DIRECT_DATABASE_URL = DATABASE_URL;
  console.log(
    "• No unpooled URL found — using the pooled connection for migrations.\n" +
      "  Fine for small schemas; set DIRECT_DATABASE_URL to the direct URL if\n" +
      "  migrations ever contend on advisory locks.",
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
