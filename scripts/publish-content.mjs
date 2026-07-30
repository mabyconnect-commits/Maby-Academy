/**
 * Publishes authored course content during a production deploy.
 *
 * Runs after `scripts/migrate.mjs` in the build. Where that script brings the
 * schema up to date, this one loads the authored curriculum into the database
 * so the deployed catalogue actually has courses — closing the gap that left a
 * freshly migrated production database showing zero courses.
 *
 * It mirrors migrate.mjs deliberately:
 *   - the same env-var resolution, so it connects the same way migrations do;
 *   - the same "no database → skip and let the build continue" behaviour, so a
 *     setup-mode deploy (no DATABASE_URL) is unaffected.
 *
 * One difference: a failure here is NON-fatal. A migration failure must abort
 * a build (the schema would be wrong), but if content publishing fails the
 * schema is still fine and the site should still deploy — the catalogue just
 * won't be updated. So this logs loudly and exits 0 rather than breaking a
 * deploy over course content.
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

// Kept in sync with scripts/migrate.mjs and src/lib/database-url.ts.
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

/** Resolve the local tsx binary, falling back to PATH. */
function resolveTsx() {
  const binName = process.platform === "win32" ? "tsx.cmd" : "tsx";
  const local = path.join(process.cwd(), "node_modules", ".bin", binName);
  return existsSync(local) ? local : "tsx";
}

const resolvedApp = firstNonEmpty(APP_URL_KEYS);
const resolvedDirect = firstNonEmpty(DIRECT_URL_KEYS);
const DATABASE_URL = resolvedApp?.value;

// No database configured: nothing to publish. The app deploys in setup mode;
// migrate.mjs has already explained this, so stay quiet and continue.
if (!DATABASE_URL) {
  console.log("• No database configured — skipping course publish.");
  process.exit(0);
}

// Prisma reads DATABASE_URL / DIRECT_DATABASE_URL by name; map whatever the
// platform provided onto those, exactly as migrate.mjs does.
const env = { ...process.env, DATABASE_URL };
env.DIRECT_DATABASE_URL = resolvedDirect?.value ?? DATABASE_URL;

console.log("• Publishing authored courses to the database…");

const result = spawnSync(resolveTsx(), ["prisma/publish.ts"], {
  stdio: "inherit",
  env,
  shell: process.platform === "win32",
});

if (result.error) {
  console.warn(
    `⚠ Could not run the course publisher (${result.error.message}). ` +
      "The site will still deploy; the catalogue just won't be updated.",
  );
  process.exit(0);
}

if ((result.status ?? 0) !== 0) {
  console.warn(
    "⚠ Course publishing failed. The site will still deploy; the catalogue " +
      "just won't be updated. See the error above.",
  );
  process.exit(0);
}

process.exit(0);
