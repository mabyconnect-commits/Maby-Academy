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
    name: "Maby",
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


/**
 * The community rooms.
 *
 * Deliberately few. A forum with twenty empty rooms reads as abandoned, while
 * one busy room reads as alive — so this opens the academy-wide room plus one
 * per pillar, and lets course rooms come later when a course has enough members
 * to sustain a conversation.
 *
 * Guidelines are stored per room rather than linked to a policy page, because a
 * rule nobody reads is a rule nobody follows, and the seed-phrase rule is the
 * one that costs real money when it is missed.
 */
const HOUSE_RULES = [
  "Be useful or be quiet. A confident wrong answer costs someone money here.",
  "Never post or request a seed phrase, private key or recovery phrase. Anyone who asks is not from this academy — report them.",
  "No price calls, no shilling, no referral links. Explain your reasoning or don't post the conclusion.",
  "Disagree with the argument, not the person. Say \"I was wrong\" when you were.",
].join("\n");

const ROOMS: {
  slug: string;
  name: string;
  description: string;
  categorySlug?: string;
}[] = [
  {
    slug: "the-commons",
    name: "The Commons",
    description:
      "The academy-wide room. Introductions, wins, questions and accountability. Start here if you are not sure where something belongs.",
  },
  {
    slug: "crypto-and-web3",
    name: "Crypto & Web3",
    description:
      "Wallets, self-custody, chains and the things that actually go wrong. Bring the transaction hash, not the screenshot.",
    categorySlug: "crypto-foundations",
  },
  {
    slug: "on-chain-research",
    name: "On-Chain Research",
    description:
      "Show your working. Post the address, the query and what you concluded — and let people check it.",
    categorySlug: "on-chain-analysis",
  },
  {
    slug: "risk-and-markets",
    name: "Risk & Markets",
    description:
      "Position sizing, journals and post-mortems. Losses discussed openly are worth more here than wins announced.",
    categorySlug: "trading-and-risk",
  },
  {
    slug: "money-and-building",
    name: "Money & Building",
    description:
      "Budgets, income, pricing and the unglamorous mechanics of building something that survives a bad year.",
    categorySlug: "money-and-business",
  },
  {
    slug: "faith-and-purpose",
    name: "Faith & Purpose",
    description:
      "Character, stewardship and contentment. Optional, and never a condition of belonging anywhere else in the academy.",
    categorySlug: "faith-and-purpose",
  },
  {
    slug: "health-and-mindset",
    name: "Health & Mindset",
    description:
      "Sleep, focus, training and emotional control — the body and mind that have to carry everything else.",
    categorySlug: "health-and-mindset",
  },
];

async function ensureCommunities() {
  for (const [i, room] of ROOMS.entries()) {
    // A pillar room is linked to nothing in the schema — `courseId` ties a room
    // to one course, and a pillar spans several — so the association stays
    // descriptive. Linking to an arbitrary course would make the room vanish if
    // that course were ever archived.
    await db.community.upsert({
      where: { slug: room.slug },
      create: {
        slug: room.slug,
        name: room.name,
        description: room.description,
        scope: "ACADEMY",
        isPublic: true,
        guidelines: HOUSE_RULES,
      },
      // Refreshes copy on re-run without touching posts or membership.
      update: {
        name: room.name,
        description: room.description,
        guidelines: HOUSE_RULES,
      },
    });
    void i;
  }
  console.log(`  ✓ ${ROOMS.length} community rooms`);
}

async function main() {
  console.log("→ Publishing authored courses…");
  await ensureCategories();
  await ensureAuthors();
  await loadCourses(db, AUTHORED_COURSES);
  await ensureCommunities();
  console.log(`✓ Published ${AUTHORED_COURSES.length} courses and ${ROOMS.length} rooms.`);
}

main()
  .catch((error) => {
    console.error("✗ Failed to publish courses:", error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
