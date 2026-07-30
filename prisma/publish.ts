/**
 * Publish authored course content to a database — production-safe.
 *
 * The full seed (`prisma/seed.ts`) builds a demo academy: fake students, a
 * referral tree, certificates, and — critically — accounts whose password is
 * written in plain text in the repo. It therefore refuses to run in
 * production. That left a gap: nothing ever loaded the authored curriculum
 * into a live database, so the deployed catalogue showed zero courses even
 * though the content existed in the repo.
 *
 * This script fills that gap. It seeds only what the published catalogue
 * needs — the six category pillars, the author accounts the courses reference,
 * and the authored courses themselves — and nothing that would be unsafe to
 * run against a live database:
 *
 *   - No demo students, enrolments, certificates, or other fixtures.
 *   - Author accounts are created with a random, unknowable password, so
 *     nobody can log in as them with a password from the repo. On re-run their
 *     password is left untouched, so a real owner who later sets their own
 *     password on one of these emails is never clobbered.
 *
 * It is idempotent (everything upserts on a natural key) and safe to run on
 * every deploy, so pushing new or edited course content publishes it live.
 */
import { PrismaClient, type Pillar, type Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";
import { AUTHORED_COURSES, loadCourses } from "./content";

const db = new PrismaClient();

/**
 * The six pillars the catalogue is organised around. Kept in sync with the
 * category block in prisma/seed.ts — duplicated rather than imported so this
 * script has no dependency on the demo seed and can be reasoned about alone.
 */
const CATEGORIES: {
  name: string;
  slug: string;
  pillar: Pillar;
  iconEmoji: string;
  sortOrder: number;
  description: string;
}[] = [
  {
    name: "Crypto Foundations",
    slug: "crypto-foundations",
    pillar: "CRYPTO",
    iconEmoji: "₿",
    sortOrder: 1,
    description:
      "Wallets, keys, self-custody and the mental models that keep your money yours.",
  },
  {
    name: "On-Chain Analysis",
    slug: "on-chain-analysis",
    pillar: "ONCHAIN_ANALYSIS",
    iconEmoji: "🔍",
    sortOrder: 2,
    description:
      "Read the chain yourself. Follow the flows, value the protocol, ignore the noise.",
  },
  {
    name: "Trading & Risk",
    slug: "trading-and-risk",
    pillar: "TRADING",
    iconEmoji: "📈",
    sortOrder: 3,
    description:
      "Risk management, position sizing and the discipline that outlives any single trade.",
  },
  {
    name: "Money & Business",
    slug: "money-and-business",
    pillar: "FINANCE",
    iconEmoji: "💼",
    sortOrder: 4,
    description:
      "Cash flow, budgeting and turning what you know into income that survives a bear market.",
  },
  {
    name: "Faith & Purpose",
    slug: "faith-and-purpose",
    pillar: "FAITH",
    iconEmoji: "🙏",
    sortOrder: 5,
    description:
      "Character, stewardship and conviction — the foundation everything else is built on.",
  },
  {
    name: "Health & Mindset",
    slug: "health-and-mindset",
    pillar: "HEALTH",
    iconEmoji: "💪",
    sortOrder: 6,
    description:
      "Sleep, training, focus and emotional control. A broken body can't hold a big vision.",
  },
];

/**
 * The author accounts the courses reference by email. These must exist before
 * a course can be loaded (the loader refuses to attach a course to a missing
 * instructor). Emails and display details match prisma/seed.ts so a database
 * seeded either way ends up consistent.
 */
const AUTHORS: {
  email: string;
  name: string;
  role: Role;
  referralCode: string;
  bio: string;
}[] = [
  {
    email: "mabi@mabyacademy.com",
    name: "Mabi",
    role: "ADMIN",
    referralCode: "MABY0001",
    bio: "Founder of Maby Academy. Teaching crypto, capital and character — in that order of urgency, never in that order of importance.",
  },
  {
    email: "grace@mabyacademy.com",
    name: "Grace Adeyemi",
    role: "INSTRUCTOR",
    referralCode: "GRAC1001",
    bio: "On-chain analyst. Eight years reading blocks before it was a job title.",
  },
  {
    email: "daniel@mabyacademy.com",
    name: "Daniel Okoro",
    role: "INSTRUCTOR",
    referralCode: "DANI1002",
    bio: "Risk-first trader and coach. Survived three bear markets by refusing to be a hero.",
  },
  {
    email: "ruth@mabyacademy.com",
    name: "Ruth Bello",
    role: "INSTRUCTOR",
    referralCode: "RUTH1003",
    bio: "Health and mindset coach. Believes discipline is a form of self-respect.",
  },
];

async function ensureCategories() {
  for (const c of CATEGORIES) {
    await db.category.upsert({
      where: { slug: c.slug },
      create: c,
      update: {
        name: c.name,
        pillar: c.pillar,
        iconEmoji: c.iconEmoji,
        sortOrder: c.sortOrder,
        description: c.description,
      },
    });
  }
  console.log(`  ✓ ${CATEGORIES.length} categories`);
}

async function ensureAuthors() {
  for (const a of AUTHORS) {
    await db.user.upsert({
      where: { email: a.email },
      // A random password nobody holds: these accounts exist to author courses,
      // not to be logged into. A real owner can set their own password later,
      // and the update branch below will never overwrite it.
      create: {
        email: a.email,
        name: a.name,
        role: a.role,
        referralCode: a.referralCode,
        bio: a.bio,
        passwordHash: await bcrypt.hash(randomBytes(32).toString("base64"), 12),
        emailVerifiedAt: new Date(),
      },
      // Refresh only display fields on re-run. Deliberately does NOT touch
      // passwordHash, so this is safe to run against a live account.
      update: { name: a.name, role: a.role, bio: a.bio },
    });
  }
  console.log(`  ✓ ${AUTHORS.length} author accounts`);
}

async function main() {
  console.log("→ Publishing authored courses…");
  await ensureCategories();
  await ensureAuthors();
  await loadCourses(db, AUTHORED_COURSES);
  console.log(`✓ Published ${AUTHORED_COURSES.length} courses.`);
}

main()
  .catch((error) => {
    console.error("✗ Failed to publish courses:", error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
