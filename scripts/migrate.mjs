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

if (!DATABASE_URL) {
  console.error(
    "\n✗ DATABASE_URL is not set — cannot run migrations.\n" +
      "  Add it in your host's environment variables and redeploy.\n",
  );
  process.exit(1);
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
