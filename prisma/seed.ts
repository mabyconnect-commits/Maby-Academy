/**
 * Seed script — builds a realistic, fully-populated academy so every feature
 * can be exercised immediately: a referral tree with paid commissions,
 * courses with quizzes and graded assignments, certificates, live sessions,
 * badges and a populated leaderboard.
 *
 * Safe to re-run: everything upserts on a natural key.
 */
import { PrismaClient, type Prisma, type Role } from "@prisma/client";
import {
  PERMISSIONS,
  ROLE_PERMISSION_MAP,
} from "../src/lib/auth/permissions";
import bcrypt from "bcryptjs";
import { randomBytes, createHmac } from "node:crypto";
import { AUTHORED_COURSES, loadCourses } from "./content";

const db = new PrismaClient();

const PASSWORD = "MabyAcademy2026!";

function token(bytes = 24) {
  return randomBytes(bytes).toString("base64url");
}

// Mirrors hashToken() in src/lib/auth/tokens.ts so seeded verify tokens are
// consistent with the running app's secret.
function hmac(value: string) {
  return createHmac("sha256", process.env.SESSION_SECRET ?? "seed-secret")
    .update(value)
    .digest("hex");
}

/**
 * This seed creates demo accounts whose password is written in plain text in
 * this file and in the README. Running it against a live database would hand
 * anyone who reads the repo an admin login, so it refuses to run in
 * production unless someone very deliberately overrides it.
 */
function assertNotProduction() {
  const forced = process.env.ALLOW_PRODUCTION_SEED === "yes-i-am-sure";
  if (forced) {
    console.warn("⚠ ALLOW_PRODUCTION_SEED set — seeding anyway.");
    return;
  }

  const isProd =
    process.env.NODE_ENV === "production" ||
    process.env.VERCEL_ENV === "production";

  if (isProd) {
    console.error(
      "\n✗ Refusing to seed: this looks like a production environment.\n" +
        "  The seed creates demo accounts with a publicly known password.\n" +
        "  If you genuinely want them, set ALLOW_PRODUCTION_SEED=yes-i-am-sure.\n",
    );
    process.exit(1);
  }
}

async function main() {
  assertNotProduction();

  console.log("→ Seeding Maby Academy…");
  const passwordHash = await bcrypt.hash(PASSWORD, 12);

  // -------------------------------------------------------------------
  // Categories (the six pillars)
  // -------------------------------------------------------------------
  const categorySeed = [
    {
      name: "Crypto Foundations",
      slug: "crypto-foundations",
      pillar: "CRYPTO" as const,
      iconEmoji: "₿",
      sortOrder: 1,
      description:
        "Wallets, keys, self-custody and the mental models that keep your money yours.",
    },
    {
      name: "On-Chain Analysis",
      slug: "on-chain-analysis",
      pillar: "ONCHAIN_ANALYSIS" as const,
      iconEmoji: "🔍",
      sortOrder: 2,
      description:
        "Read the chain yourself. Follow the flows, value the protocol, ignore the noise.",
    },
    {
      name: "Trading & Risk",
      slug: "trading-and-risk",
      pillar: "TRADING" as const,
      iconEmoji: "📈",
      sortOrder: 3,
      description:
        "Risk management, position sizing and the discipline that outlives any single trade.",
    },
    {
      name: "Money & Business",
      slug: "money-and-business",
      pillar: "FINANCE" as const,
      iconEmoji: "💼",
      sortOrder: 4,
      description:
        "Cash flow, budgeting and turning what you know into income that survives a bear market.",
    },
    {
      name: "Faith & Purpose",
      slug: "faith-and-purpose",
      pillar: "FAITH" as const,
      iconEmoji: "🙏",
      sortOrder: 5,
      description:
        "Character, stewardship and conviction — the foundation everything else is built on.",
    },
    {
      name: "Health & Mindset",
      slug: "health-and-mindset",
      pillar: "HEALTH" as const,
      iconEmoji: "💪",
      sortOrder: 6,
      description:
        "Sleep, training, focus and emotional control. A broken body can't hold a big vision.",
    },
  ];

  const categories: Record<string, string> = {};
  for (const c of categorySeed) {
    const row = await db.category.upsert({
      where: { slug: c.slug },
      create: c,
      update: c,
    });
    categories[c.slug] = row.id;
  }
  console.log(`  ✓ ${categorySeed.length} categories`);

  // -------------------------------------------------------------------
  // People — including a three-level referral tree
  // -------------------------------------------------------------------
  const mabi = await db.user.upsert({
    where: { email: "mabi@mabyacademy.com" },
    create: {
      email: "mabi@mabyacademy.com",
      name: "Mabi",
      passwordHash,
      role: "ADMIN",
      referralCode: "MABY0001",
      emailVerifiedAt: new Date(),
      country: "Nigeria",
      timezone: "Africa/Lagos",
      bio: "Founder of Maby Academy. Teaching crypto, capital and character — in that order of urgency, never in that order of importance.",
    },
    update: { role: "ADMIN" },
  });

  const instructorSeed = [
    {
      email: "grace@mabyacademy.com",
      name: "Grace Adeyemi",
      code: "GRAC1001",
      bio: "On-chain analyst. Eight years reading blocks before it was a job title.",
    },
    {
      email: "daniel@mabyacademy.com",
      name: "Daniel Okoro",
      code: "DANI1002",
      bio: "Risk-first trader and coach. Survived three bear markets by refusing to be a hero.",
    },
    {
      email: "ruth@mabyacademy.com",
      name: "Ruth Bello",
      code: "RUTH1003",
      bio: "Health and mindset coach. Believes discipline is a form of self-respect.",
    },
  ];

  const instructors: Record<string, string> = {};
  for (const i of instructorSeed) {
    const row = await db.user.upsert({
      where: { email: i.email },
      create: {
        email: i.email,
        name: i.name,
        passwordHash,
        role: "INSTRUCTOR",
        referralCode: i.code,
        emailVerifiedAt: new Date(),
        bio: i.bio,
        referredById: mabi.id,
      },
      update: { role: "INSTRUCTOR", bio: i.bio },
    });
    instructors[i.email] = row.id;
  }

  // Students, arranged into a referral tree:
  //   mabi → tobi → chidi → amara     (levels 1, 2, 3 from mabi)
  //   mabi → zainab, joseph, blessing
  const studentSeed = [
    { email: "tobi@example.com", name: "Tobi Adewale", code: "TOBI2001", referrer: mabi.id, country: "Nigeria", points: 1450 },
    { email: "chidi@example.com", name: "Chidi Nwosu", code: "CHID2002", referrer: null, country: "Nigeria", points: 980 },
    { email: "amara@example.com", name: "Amara Eze", code: "AMAR2003", referrer: null, country: "Ghana", points: 720 },
    { email: "zainab@example.com", name: "Zainab Yusuf", code: "ZAIN2004", referrer: mabi.id, country: "Kenya", points: 1180 },
    { email: "joseph@example.com", name: "Joseph Mensah", code: "JOSE2005", referrer: mabi.id, country: "Ghana", points: 340 },
    { email: "blessing@example.com", name: "Blessing Obi", code: "BLES2006", referrer: mabi.id, country: "Nigeria", points: 610 },
  ];

  const students: Record<string, string> = {};
  for (const s of studentSeed) {
    const row = await db.user.upsert({
      where: { email: s.email },
      create: {
        email: s.email,
        name: s.name,
        passwordHash,
        role: "STUDENT",
        referralCode: s.code,
        emailVerifiedAt: new Date(),
        country: s.country,
        referredById: s.referrer,
      },
      update: {},
    });
    students[s.email] = row.id;
  }

  // Wire the deeper levels now that every student row exists.
  await db.user.update({
    where: { id: students["chidi@example.com"] },
    data: { referredById: students["tobi@example.com"] },
  });
  await db.user.update({
    where: { id: students["amara@example.com"] },
    data: { referredById: students["chidi@example.com"] },
  });

  console.log(`  ✓ ${1 + instructorSeed.length + studentSeed.length} users`);

  // -------------------------------------------------------------------
  // Badges
  // -------------------------------------------------------------------
  const badgeSeed = [
    { code: "FIRST_STEP", name: "First Step", description: "Completed your very first lesson.", iconEmoji: "👣", pointsValue: 25, sortOrder: 1, criteria: { type: "lessons_completed", count: 1 } },
    { code: "TEN_DOWN", name: "Ten Down", description: "Completed ten lessons. The habit is forming.", iconEmoji: "🔟", pointsValue: 75, sortOrder: 2, criteria: { type: "lessons_completed", count: 10 } },
    { code: "GRADUATE", name: "Graduate", description: "Finished your first full course.", iconEmoji: "🎓", pointsValue: 200, sortOrder: 3, criteria: { type: "courses_completed", count: 1 } },
    { code: "SCHOLAR", name: "Scholar", description: "Finished three courses. You're not playing.", iconEmoji: "📖", pointsValue: 500, sortOrder: 4, criteria: { type: "courses_completed", count: 3 } },
    { code: "WEEK_STRONG", name: "Week Strong", description: "Seven days in a row.", iconEmoji: "🔥", pointsValue: 100, sortOrder: 5, criteria: { type: "streak_days", count: 7 } },
    { code: "UNBROKEN", name: "Unbroken", description: "Thirty days without missing.", iconEmoji: "⚡", pointsValue: 400, sortOrder: 6, criteria: { type: "streak_days", count: 30 } },
    { code: "CONNECTOR", name: "Connector", description: "Brought three people into the academy.", iconEmoji: "🤝", pointsValue: 250, sortOrder: 7, criteria: { type: "referrals", count: 3 } },
    { code: "PROVEN", name: "Proven", description: "Passed five graded assignments.", iconEmoji: "✍", pointsValue: 300, sortOrder: 8, criteria: { type: "assignments_passed", count: 5 } },
  ];

  for (const b of badgeSeed) {
    await db.badge.upsert({
      where: { code: b.code },
      create: b as Prisma.BadgeCreateInput,
      update: { name: b.name, description: b.description, criteria: b.criteria },
    });
  }
  console.log(`  ✓ ${badgeSeed.length} badges`);

  // -------------------------------------------------------------------
  // Courses
  // -------------------------------------------------------------------
  type LessonSeed = {
    title: string;
    slug: string;
    type: "VIDEO" | "TEXT" | "QUIZ" | "ASSIGNMENT";
    content?: string;
    videoDuration?: number;
    isPreview?: boolean;
    points?: number;
    quiz?: {
      title: string;
      description?: string;
      questions: {
        prompt: string;
        type?: "SINGLE_CHOICE" | "MULTI_CHOICE" | "TRUE_FALSE";
        explanation?: string;
        options: { text: string; correct?: boolean }[];
      }[];
    };
    assignment?: {
      title: string;
      instructions: string;
      rubric: { name: string; description: string; maxPoints: number }[];
      maxScore: number;
      passScore: number;
    };
  };

  const courseSeed: {
    title: string;
    slug: string;
    subtitle: string;
    description: string;
    category: string;
    instructorEmail: string;
    level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
    priceMinor: number;
    hours: number;
    modules: { title: string; description: string; lessons: LessonSeed[] }[];
  }[] = [
    {
      title: "Crypto From Zero: Own Your Keys",
      slug: "crypto-from-zero",
      subtitle:
        "Everything you need to hold, move and protect crypto without trusting anyone you shouldn't.",
      description:
        "Most people lose money in crypto long before they ever place a bad trade. They lose it to a phishing link, a screenshot of a seed phrase, an exchange that never let them withdraw.\n\nThis course fixes that first. You'll learn what a blockchain actually does, how wallets and keys really work, and how to move money on-chain without fear. By the end you'll be able to set up self-custody properly, verify a transaction before you sign it, and spot the scams that catch most beginners.\n\nNo hype, no price predictions. Just the foundation everything else stands on.",
      category: "crypto-foundations",
      instructorEmail: "mabi@mabyacademy.com",
      level: "BEGINNER",
      priceMinor: 0,
      hours: 6,
      modules: [
        {
          title: "What you're actually buying",
          description: "The mental model that makes the rest make sense.",
          lessons: [
            {
              title: "Welcome — and what this course will cost you",
              slug: "welcome",
              type: "VIDEO",
              videoDuration: 480,
              isPreview: true,
              content:
                "Crypto rewards patience and punishes shortcuts. This course asks for about six focused hours.\n\n## What you'll be able to do\n\n- Explain what a blockchain is to someone else, in plain language\n- Set up a self-custody wallet and back it up properly\n- Send a transaction and verify it independently\n- Recognise the four scams that catch nearly every beginner\n\n## What this course is not\n\nIt is not a list of coins to buy. Nobody here will tell you what to buy. The goal is that you become the kind of person who can work that out for themselves.",
            },
            {
              title: "Blockchains without the buzzwords",
              slug: "blockchains-without-buzzwords",
              type: "TEXT",
              isPreview: true,
              content:
                "A blockchain is a shared record that nobody in particular controls and everybody can check.\n\n## Why that matters\n\nEvery financial system you've used until now works because somebody keeps the ledger and you trust them to keep it honestly. Your bank knows your balance. You can't verify it — you can only ask them.\n\nA blockchain flips that. The ledger is public, every participant holds a copy, and changing history would require redoing more work than the rest of the network combined.\n\n## The trade-off nobody mentions\n\nYou gain the ability to hold money nobody can freeze. You also lose the safety net. There is no support line, no chargeback, no manager. **The same property that makes crypto powerful makes it unforgiving.**\n\nThat is the deal. Take it seriously and it works in your favour.",
            },
            {
              title: "Check your understanding",
              slug: "foundations-quiz",
              type: "QUIZ",
              quiz: {
                title: "Foundations check",
                description:
                  "Five questions. You need 70% to pass, and you get three attempts.",
                questions: [
                  {
                    prompt: "What makes a blockchain different from a bank's ledger?",
                    explanation:
                      "The defining property is that anyone can verify the record independently, rather than trusting one institution.",
                    options: [
                      { text: "Anyone can verify it independently", correct: true },
                      { text: "It processes transactions faster" },
                      { text: "It is always free to use" },
                      { text: "It is controlled by a government" },
                    ],
                  },
                  {
                    prompt: "You lose your seed phrase and have no backup. What happens to your funds?",
                    explanation:
                      "There is no recovery process. This is why backing up properly is the single most important step in self-custody.",
                    options: [
                      { text: "They are gone permanently", correct: true },
                      { text: "Support can restore them within 30 days" },
                      { text: "The network refunds you automatically" },
                      { text: "They transfer to your email address" },
                    ],
                  },
                  {
                    prompt: "Which of these should you NEVER share? Select all that apply.",
                    type: "MULTI_CHOICE",
                    explanation:
                      "Your public address is meant to be shared — that's how people pay you. Seed phrases and private keys are you.",
                    options: [
                      { text: "Your seed phrase", correct: true },
                      { text: "Your private key", correct: true },
                      { text: "Your public wallet address" },
                      { text: "A screenshot of your recovery words", correct: true },
                    ],
                  },
                  {
                    prompt: "Leaving your crypto on an exchange means you own the keys.",
                    type: "TRUE_FALSE",
                    explanation:
                      "The exchange holds the keys and owes you a balance. Not your keys, not your coins.",
                    options: [
                      { text: "False", correct: true },
                      { text: "True" },
                    ],
                  },
                  {
                    prompt: "Before signing a transaction, the most important thing to check is:",
                    explanation:
                      "Address poisoning and clipboard malware both work by changing the destination. Always verify it on the device you're signing with.",
                    options: [
                      { text: "The destination address, character by character", correct: true },
                      { text: "The current price of the asset" },
                      { text: "How many people follow the project on social media" },
                      { text: "Whether the gas fee is the lowest available" },
                    ],
                  },
                ],
              },
            },
          ],
        },
        {
          title: "Self-custody, properly",
          description: "Set it up once, set it up right.",
          lessons: [
            {
              title: "Wallets, keys and what you're really holding",
              slug: "wallets-and-keys",
              type: "VIDEO",
              videoDuration: 900,
              content:
                "A wallet doesn't hold coins. It holds keys. The coins live on the chain; the keys prove they're yours.\n\n## Hot versus cold\n\nA hot wallet is connected to the internet — convenient, and exposed. A cold wallet never touches a networked device. Most people should use both: a hot wallet for spending money and a cold wallet for savings.\n\n**Rule of thumb: if losing it would change your year, it belongs in cold storage.**",
            },
            {
              title: "Back up your wallet — for real",
              slug: "backup-assignment",
              type: "ASSIGNMENT",
              assignment: {
                title: "Set up and verify self-custody",
                instructions:
                  "This is the assignment that matters most in the whole course. You're going to set up a wallet, back it up, and then prove the backup works.\n\nDo the following, then write up what happened:\n\n1. Create a new self-custody wallet on a device you control.\n2. Write your recovery phrase on paper. Not a screenshot, not a note app, not a password manager. Paper.\n3. Send a small test amount in — an amount you would genuinely shrug off if it vanished.\n4. Delete the wallet from your device entirely.\n5. Restore it from your paper backup and confirm the funds are there.\n\nIn your submission, describe what you did at each step, what you found confusing, and one thing that surprised you. Do NOT include your recovery phrase, any part of it, or a screenshot showing it. Including it fails this assignment automatically — the point of the exercise is that nobody sees it but you.",
                rubric: [
                  { name: "Completed the full restore cycle", description: "Actually deleted and restored, not just described the theory.", maxPoints: 40 },
                  { name: "Security hygiene", description: "No seed phrase exposure anywhere in the submission.", maxPoints: 30 },
                  { name: "Reflection quality", description: "Specific about what was confusing and what was learned.", maxPoints: 30 },
                ],
                maxScore: 100,
                passScore: 70,
              },
            },
          ],
        },
      ],
    },
    {
      title: "Reading the Chain: On-Chain Analysis",
      slug: "reading-the-chain",
      subtitle:
        "Stop taking someone else's word for it. Learn to pull the data and judge a protocol yourself.",
      description:
        "Every claim in crypto is checkable. Almost nobody checks.\n\nThis course teaches you to open a block explorer, follow the money, and form your own view on whether a protocol is actually being used or is just well marketed. You'll learn to read wallet flows, spot distribution before it's obvious, separate real users from wash traffic, and build a dashboard that answers a question you actually care about.\n\nBy the end you won't need anyone's alpha. You'll have the data.",
      category: "on-chain-analysis",
      instructorEmail: "grace@mabyacademy.com",
      level: "INTERMEDIATE",
      priceMinor: 14900,
      hours: 12,
      modules: [
        {
          title: "The explorer is your microscope",
          description: "Everything starts with reading a transaction correctly.",
          lessons: [
            {
              title: "Anatomy of a transaction",
              slug: "anatomy-of-a-transaction",
              type: "VIDEO",
              videoDuration: 1080,
              isPreview: true,
              content:
                "Open any transaction and you can see the sender, the recipient, the value, the fee, and — crucially — what the transaction actually called.\n\n## The field most people skip\n\nThe input data tells you what function was invoked. A transfer looks nothing like an approval, and confusing the two is how people get drained. Learning to read this field is the single highest-leverage skill in on-chain analysis.",
            },
            {
              title: "Following the money",
              slug: "following-the-money",
              type: "TEXT",
              content:
                "Money leaves a trail. Your job is to follow it without fooling yourself.\n\n## Cluster before you conclude\n\nA single wallet tells you very little. Groups of wallets that consistently move together tell you a great deal. Before you claim a whale is selling, establish that the addresses you're watching actually belong together.\n\n## Beware the exchange hop\n\nFunds moving to an exchange address is not a sale. It is a wallet transfer that *may* precede a sale. **The difference between those two statements is the difference between analysis and rumour.**",
            },
          ],
        },
        {
          title: "Judging a protocol",
          description: "Usage, revenue and the gap between narrative and reality.",
          lessons: [
            {
              title: "Real users versus rented ones",
              slug: "real-users",
              type: "VIDEO",
              videoDuration: 1200,
              content:
                "Incentives buy activity. They rarely buy retention.\n\nThe question is never 'how many wallets used this?' — it is 'how many came back after the rewards stopped?'",
            },
            {
              title: "Analyse a protocol end to end",
              slug: "protocol-analysis-assignment",
              type: "ASSIGNMENT",
              assignment: {
                title: "Protocol teardown",
                instructions:
                  "Pick any live protocol with a token. Not one you already hold — that biases you, and it will show.\n\nProduce a short written teardown covering:\n\n1. What the protocol does, in two sentences a non-crypto friend would understand.\n2. Its actual usage over the last 90 days — active addresses, transaction counts, and whether these are trending up or down.\n3. Where its revenue comes from, and who captures it.\n4. The single strongest argument AGAINST holding the token. This section is mandatory and it is the one we grade hardest.\n5. Your conclusion, with the specific data point that would change your mind.\n\nLink to your dashboard or spreadsheet so we can check your numbers. Cite where each figure came from.",
                rubric: [
                  { name: "Data accuracy", description: "Figures are correct, sourced and reproducible.", maxPoints: 30 },
                  { name: "Bear case quality", description: "The argument against is genuine and specific, not a token gesture.", maxPoints: 30 },
                  { name: "Reasoning", description: "Conclusions follow from the data presented.", maxPoints: 25 },
                  { name: "Clarity", description: "A reader outside crypto could follow it.", maxPoints: 15 },
                ],
                maxScore: 100,
                passScore: 65,
              },
            },
          ],
        },
      ],
    },
    {
      title: "Risk First: Trading Without Blowing Up",
      slug: "risk-first-trading",
      subtitle:
        "The unglamorous discipline that keeps you in the game long enough to get good.",
      description:
        "Most trading education sells entries. Entries are the least important part.\n\nThis course is about the parts that actually determine whether you're still trading in three years: position sizing, drawdown limits, journalling, and knowing the difference between a losing trade and a bad one.\n\nIt is deliberately unexciting. That is the point.",
      category: "trading-and-risk",
      instructorEmail: "daniel@mabyacademy.com",
      level: "INTERMEDIATE",
      priceMinor: 19900,
      hours: 10,
      modules: [
        {
          title: "Survive first",
          description: "Everything else is downstream of not blowing up.",
          lessons: [
            {
              title: "The maths of ruin",
              slug: "maths-of-ruin",
              type: "VIDEO",
              videoDuration: 960,
              isPreview: true,
              content:
                "Lose 50% and you need 100% to get back. Lose 80% and you need 400%.\n\n## Why this changes everything\n\nDrawdowns are not symmetric, so risk management is not optional decoration on top of a strategy — it *is* the strategy. A mediocre edge with strict risk control compounds. A brilliant edge without it goes to zero eventually, and 'eventually' arrives sooner than anyone plans for.",
            },
            {
              title: "Position sizing you'll actually follow",
              slug: "position-sizing",
              type: "TEXT",
              content:
                "A rule you abandon under pressure is not a rule.\n\n## Start smaller than feels right\n\nThe correct position size is the one you can hold through a drawdown without checking your phone at 3am. For most people starting out, that is a fraction of what they think.\n\n**If a single trade can change your mood for the day, it is too big.**",
            },
          ],
        },
      ],
    },
    {
      title: "Built to Last: Faith, Health and the Long Game",
      slug: "built-to-last",
      subtitle:
        "The part of wealth nobody charts — character, health and the reason you're doing any of this.",
      description:
        "Money magnifies whoever you already are. If that person is anxious, undisciplined and unclear about what they're building toward, more money makes it worse, not better.\n\nThis course covers the foundation: stewardship and integrity, physical health as a non-negotiable, focus as a trainable skill, and defining what 'enough' means before the market defines it for you.\n\nIt is the course people skip and later say they wish they'd taken first.",
      category: "faith-and-purpose",
      instructorEmail: "ruth@mabyacademy.com",
      level: "BEGINNER",
      priceMinor: 4900,
      hours: 5,
      modules: [
        {
          title: "Foundations",
          description: "Who you are when the chart is red.",
          lessons: [
            {
              title: "Define 'enough' before the market does",
              slug: "define-enough",
              type: "VIDEO",
              videoDuration: 720,
              isPreview: true,
              content:
                "People who never define 'enough' never arrive. There is always another multiple.\n\n## The exercise\n\nWrite down the specific number and the specific life it buys. Be concrete: where you live, what you do on a Tuesday, who you're responsible for.\n\n**A target you can picture is a target you can stop at.**",
            },
            {
              title: "Health is a position size",
              slug: "health-is-position-size",
              type: "TEXT",
              content:
                "You can recover from a bad trade. You cannot recover from a decade of bad sleep.\n\n## The three non-negotiables\n\n- Sleep, protected like a meeting you can't move\n- Movement, daily, boring, unskippable\n- Real food, most of the time\n\nNone of this is complicated. All of it is hard, which is why it's a genuine edge.",
            },
            {
              title: "Your written commitment",
              slug: "commitment-assignment",
              type: "ASSIGNMENT",
              assignment: {
                title: "Write your operating principles",
                instructions:
                  "Write between 300 and 600 words setting out how you intend to operate.\n\nCover:\n\n1. What you're building toward, and what 'enough' looks like in specific terms.\n2. Three non-negotiables for your health, and when in the day each happens.\n3. One rule about money you commit to keeping even when it costs you.\n4. Who is allowed to tell you when you're off track, and how you'll respond when they do.\n\nWrite it for yourself, not for a grade. We're reading for honesty and specificity, not polish — a vague, impressive-sounding answer scores lower than a plain, concrete one.",
                rubric: [
                  { name: "Specificity", description: "Concrete commitments, not aspirations.", maxPoints: 40 },
                  { name: "Honesty", description: "Engages with real weaknesses rather than performing.", maxPoints: 35 },
                  { name: "Accountability", description: "Names a real person and a real mechanism.", maxPoints: 25 },
                ],
                maxScore: 100,
                passScore: 60,
              },
            },
          ],
        },
      ],
    },
  ];

  const courseIds: Record<string, string> = {};

  for (const c of courseSeed) {
    const instructorId =
      c.instructorEmail === "mabi@mabyacademy.com"
        ? mabi.id
        : instructors[c.instructorEmail];

    const course = await db.course.upsert({
      where: { slug: c.slug },
      create: {
        title: c.title,
        slug: c.slug,
        subtitle: c.subtitle,
        description: c.description,
        level: c.level,
        status: "PUBLISHED",
        priceMinor: c.priceMinor,
        estimatedHours: c.hours,
        categoryId: categories[c.category],
        instructorId,
        publishedAt: new Date(),
      },
      update: {
        title: c.title,
        subtitle: c.subtitle,
        description: c.description,
        status: "PUBLISHED",
        priceMinor: c.priceMinor,
      },
    });
    courseIds[c.slug] = course.id;

    // Rebuild the tree each run so content edits above take effect.
    await db.module.deleteMany({ where: { courseId: course.id } });

    for (const [mi, m] of c.modules.entries()) {
      const module = await db.module.create({
        data: {
          courseId: course.id,
          title: m.title,
          description: m.description,
          sortOrder: mi,
        },
      });

      for (const [li, l] of m.lessons.entries()) {
        const lesson = await db.lesson.create({
          data: {
            moduleId: module.id,
            title: l.title,
            slug: l.slug,
            type: l.type,
            content: l.content ?? null,
            videoDuration: l.videoDuration ?? 0,
            sortOrder: li,
            isPreview: l.isPreview ?? false,
            pointsValue: l.points ?? 10,
          },
        });

        if (l.quiz) {
          const quiz = await db.quiz.create({
            data: {
              lessonId: lesson.id,
              title: l.quiz.title,
              description: l.quiz.description ?? null,
            },
          });
          for (const [qi, q] of l.quiz.questions.entries()) {
            await db.quizQuestion.create({
              data: {
                quizId: quiz.id,
                prompt: q.prompt,
                type: q.type ?? "SINGLE_CHOICE",
                explanation: q.explanation ?? null,
                sortOrder: qi,
                options: {
                  createMany: {
                    data: q.options.map((o, oi) => ({
                      text: o.text,
                      isCorrect: o.correct ?? false,
                      sortOrder: oi,
                    })),
                  },
                },
              },
            });
          }
        }

        if (l.assignment) {
          await db.assignment.create({
            data: {
              lessonId: lesson.id,
              title: l.assignment.title,
              instructions: l.assignment.instructions,
              rubric: l.assignment.rubric,
              maxScore: l.assignment.maxScore,
              passScore: l.assignment.passScore,
              dueAt: new Date(Date.now() + 14 * 86_400_000),
            },
          });
        }
      }
    }
  }
  console.log(`  ✓ ${courseSeed.length} courses with modules, lessons, quizzes and assignments`);

  // -------------------------------------------------------------------
  // Authored curriculum
  //
  // Full write-up courses live in prisma/content as data, one file per course,
  // and are loaded here. The loader upserts in place on stable natural keys, so
  // re-running the seed updates the curriculum without recreating lessons —
  // which matters because LessonProgress points at a lesson id, and recreating
  // lessons would silently reset every student's completion.
  // -------------------------------------------------------------------
  console.log("→ Loading authored curriculum…");
  await loadCourses(db, AUTHORED_COURSES);

  // -------------------------------------------------------------------
  // Live sessions
  // -------------------------------------------------------------------
  const day = 86_400_000;
  const liveSeed = [
    {
      title: "Live wallet setup clinic",
      description: "Bring your device. We set up self-custody together, live, and you leave with it working.",
      hostId: mabi.id,
      courseId: courseIds["crypto-from-zero"],
      startsAt: new Date(Date.now() + 3 * day),
      hours: 1.5,
      status: "SCHEDULED" as const,
      capacity: 50,
    },
    {
      title: "On-chain office hours: bring your teardown",
      description: "Grace reviews student protocol teardowns live and shows how she'd approach each one.",
      hostId: instructors["grace@mabyacademy.com"],
      courseId: courseIds["reading-the-chain"],
      startsAt: new Date(Date.now() + 7 * day),
      hours: 2,
      status: "SCHEDULED" as const,
      capacity: null,
    },
    {
      title: "Risk review: the trades that hurt this month",
      description: "Daniel walks through real losing trades — his and students' — and what the risk rules would have changed.",
      hostId: instructors["daniel@mabyacademy.com"],
      courseId: courseIds["risk-first-trading"],
      startsAt: new Date(Date.now() + 12 * day),
      hours: 1.5,
      status: "SCHEDULED" as const,
      capacity: 100,
    },
    {
      title: "Community call: what we're building this quarter",
      description: "Where the academy is going, what's coming, and open Q&A with Mabi.",
      hostId: mabi.id,
      courseId: null,
      startsAt: new Date(Date.now() - 9 * day),
      hours: 1,
      status: "ENDED" as const,
      capacity: null,
    },
  ];

  for (const s of liveSeed) {
    const existing = await db.liveSession.findFirst({ where: { title: s.title } });
    const data = {
      title: s.title,
      description: s.description,
      hostId: s.hostId,
      courseId: s.courseId,
      startsAt: s.startsAt,
      endsAt: new Date(s.startsAt.getTime() + s.hours * 3_600_000),
      status: s.status,
      capacity: s.capacity,
      meetingUrl: "https://meet.example.com/maby-academy",
      replayUrl: s.status === "ENDED" ? "https://replays.example.com/maby-q1" : null,
    };
    if (existing) {
      await db.liveSession.update({ where: { id: existing.id }, data });
    } else {
      await db.liveSession.create({ data });
    }
  }
  console.log(`  ✓ ${liveSeed.length} live sessions`);

  // -------------------------------------------------------------------
  // Enrolments, progress, submissions, orders & commissions
  // -------------------------------------------------------------------
  const enrolPlan: {
    email: string;
    course: string;
    completeRatio: number;
  }[] = [
    { email: "tobi@example.com", course: "crypto-from-zero", completeRatio: 1 },
    { email: "tobi@example.com", course: "reading-the-chain", completeRatio: 0.5 },
    { email: "chidi@example.com", course: "crypto-from-zero", completeRatio: 0.6 },
    { email: "chidi@example.com", course: "risk-first-trading", completeRatio: 0.25 },
    { email: "amara@example.com", course: "crypto-from-zero", completeRatio: 0.3 },
    { email: "zainab@example.com", course: "crypto-from-zero", completeRatio: 1 },
    { email: "zainab@example.com", course: "built-to-last", completeRatio: 0.66 },
    { email: "joseph@example.com", course: "crypto-from-zero", completeRatio: 0.15 },
    { email: "blessing@example.com", course: "built-to-last", completeRatio: 0.5 },
  ];

  for (const plan of enrolPlan) {
    const userId = students[plan.email];
    const courseId = courseIds[plan.course];

    const enrollment = await db.enrollment.upsert({
      where: { userId_courseId: { userId, courseId } },
      create: { userId, courseId, status: "ACTIVE" },
      update: {},
    });

    const lessons = await db.lesson.findMany({
      where: { module: { courseId } },
      orderBy: [{ module: { sortOrder: "asc" } }, { sortOrder: "asc" }],
      select: { id: true },
    });

    const completeCount = Math.round(lessons.length * plan.completeRatio);
    for (const lesson of lessons.slice(0, completeCount)) {
      await db.lessonProgress.upsert({
        where: { userId_lessonId: { userId, lessonId: lesson.id } },
        create: {
          userId,
          lessonId: lesson.id,
          isCompleted: true,
          completedAt: new Date(),
        },
        update: { isCompleted: true },
      });
    }

    const percent =
      lessons.length > 0
        ? Math.round((completeCount / lessons.length) * 100)
        : 0;

    await db.enrollment.update({
      where: { id: enrollment.id },
      data: {
        progressPercent: percent,
        lastAccessedAt: new Date(),
        lastLessonId: lessons[Math.max(0, completeCount - 1)]?.id ?? null,
        ...(percent >= 80
          ? { status: "COMPLETED" as const, completedAt: new Date() }
          : {}),
      },
    });

    // Paid courses generate an order, which fans out referral commissions.
    const course = await db.course.findUniqueOrThrow({
      where: { id: courseId },
      select: { priceMinor: true, currency: true },
    });

    if (course.priceMinor > 0) {
      const existingOrder = await db.order.findFirst({
        where: { userId, courseId, status: "PAID" },
      });
      const order =
        existingOrder ??
        (await db.order.create({
          data: {
            userId,
            courseId,
            amountMinor: course.priceMinor,
            currency: course.currency,
            status: "PAID",
            // Demo history only. Real purchases go through Flutterwave and are
            // fulfilled by checkout.fulfilOrder after verification.
            provider: "seed",
            providerRef: `SEED-${userId.slice(-6)}-${courseId.slice(-6)}`.toUpperCase(),
            paidAt: new Date(),
          },
        }));

      // Walk the upline: 10% / 5% / 2%.
      const rates = [0.1, 0.05, 0.02];
      let currentId: string | null = userId;
      for (let level = 1; level <= rates.length; level++) {
        const node: { referredById: string | null } | null =
          await db.user.findUnique({
            where: { id: currentId as string },
            select: { referredById: true },
          });
        const beneficiaryId: string | null = node?.referredById ?? null;
        if (!beneficiaryId) break;

        await db.referralCommission.upsert({
          where: { orderId_beneficiaryId: { orderId: order.id, beneficiaryId } },
          create: {
            orderId: order.id,
            beneficiaryId,
            sourceUserId: userId,
            level,
            ratePercent: Math.round(rates[level - 1] * 100),
            amountMinor: Math.round(course.priceMinor * rates[level - 1]),
            currency: course.currency,
            status: level === 1 ? "APPROVED" : "PENDING",
          },
          update: {},
        });

        currentId = beneficiaryId;
      }
    }
  }
  console.log(`  ✓ ${enrolPlan.length} enrolments with progress, orders and commissions`);

  // -------------------------------------------------------------------
  // Certificates for completed courses
  // -------------------------------------------------------------------
  const completed = await db.enrollment.findMany({
    where: { status: "COMPLETED" },
    select: { userId: true, courseId: true, progressPercent: true },
  });

  let serialCounter = await db.certificate.count();
  for (const e of completed) {
    const exists = await db.certificate.findUnique({
      where: { userId_courseId: { userId: e.userId, courseId: e.courseId } },
    });
    if (exists) continue;

    serialCounter += 1;
    await db.certificate.create({
      data: {
        userId: e.userId,
        courseId: e.courseId,
        serial: `MABY-${new Date().getFullYear()}-${String(serialCounter).padStart(6, "0")}`,
        verifyToken: token(24),
        finalScore: e.progressPercent,
      },
    });
  }
  console.log(`  ✓ ${completed.length} certificates`);

  // -------------------------------------------------------------------
  // A submission in the grading queue + one already graded
  // -------------------------------------------------------------------
  const backupAssignment = await db.assignment.findFirst({
    where: { lesson: { slug: "backup-assignment" } },
  });

  if (backupAssignment) {
    const pendingStudent = students["chidi@example.com"];
    const already = await db.submission.findFirst({
      where: { assignmentId: backupAssignment.id, studentId: pendingStudent },
    });
    if (!already) {
      await db.submission.create({
        data: {
          assignmentId: backupAssignment.id,
          studentId: pendingStudent,
          status: "SUBMITTED",
          submittedAt: new Date(),
          textAnswer:
            "I set up a fresh wallet on my phone and wrote the twelve words in a notebook I keep at home. Sending the test amount was fine — it arrived in about twenty seconds.\n\nDeleting the app was genuinely uncomfortable. I sat there for a minute before doing it, which told me something: I did not fully trust my own backup. The restore worked first try and the 0.002 was still there.\n\nThe thing that surprised me was how ordinary it felt afterwards. I expected it to be technical and it was mostly just careful. The confusing part was the difference between the wallet password and the recovery phrase — I assumed the password would restore it, and it does not.",
          linkUrl: "https://example.com/chidi-wallet-writeup",
        },
      });
    }

    const gradedStudent = students["tobi@example.com"];
    const gradedExists = await db.submission.findFirst({
      where: { assignmentId: backupAssignment.id, studentId: gradedStudent },
    });
    if (!gradedExists) {
      await db.submission.create({
        data: {
          assignmentId: backupAssignment.id,
          studentId: gradedStudent,
          status: "GRADED",
          submittedAt: new Date(Date.now() - 3 * day),
          textAnswer:
            "Created the wallet, wrote the phrase on paper, stored it in two separate places. Sent a test amount, deleted the app, restored from paper. Funds were there.\n\nWhat surprised me: I had been keeping a screenshot of an old seed phrase in my photos for two years without thinking about it. Deleted it after this lesson.",
          score: 92,
          feedback:
            "Strong work, and the detail about the old screenshot is exactly the kind of thing this exercise is meant to surface — that alone was worth the assignment.\n\nOne thing to tighten: two paper copies in the same building is one fire away from zero copies. Move one somewhere geographically separate.",
          graderId: mabi.id,
          gradedAt: new Date(Date.now() - 2 * day),
        },
      });
    }
  }

  // -------------------------------------------------------------------
  // Points ledger, streaks and badges to populate the leaderboard
  // -------------------------------------------------------------------
  for (const s of studentSeed) {
    const userId = students[s.email];

    await db.pointsTransaction.upsert({
      where: { userId_referenceKey: { userId, referenceKey: "seed:opening-balance" } },
      create: {
        userId,
        amount: s.points,
        reason: "MANUAL_ADJUSTMENT",
        referenceKey: "seed:opening-balance",
        note: "Seeded activity",
      },
      update: {},
    });

    const streak = Math.max(1, Math.floor(s.points / 200));
    await db.user.update({
      where: { id: userId },
      data: {
        pointsBalance: s.points,
        lifetimePoints: s.points,
        currentStreak: streak,
        longestStreak: streak + 3,
        lastActiveDate: new Date(),
      },
    });

    // Award any badges the seeded stats already qualify for.
    const [lessonsDone, coursesDone, referralCount] = await Promise.all([
      db.lessonProgress.count({ where: { userId, isCompleted: true } }),
      db.enrollment.count({ where: { userId, status: "COMPLETED" } }),
      db.user.count({ where: { referredById: userId } }),
    ]);

    const badges = await db.badge.findMany();
    for (const badge of badges) {
      const c = badge.criteria as { type: string; count: number } | null;
      if (!c) continue;

      const stat =
        c.type === "lessons_completed"
          ? lessonsDone
          : c.type === "courses_completed"
            ? coursesDone
            : c.type === "referrals"
              ? referralCount
              : c.type === "streak_days"
                ? streak + 3
                : c.type === "points"
                  ? s.points
                  : 0;

      if (stat >= c.count) {
        await db.userBadge.upsert({
          where: { userId_badgeId: { userId, badgeId: badge.id } },
          create: { userId, badgeId: badge.id },
          update: {},
        });
      }
    }

    await db.notification.createMany({
      data: [
        {
          userId,
          type: "SYSTEM",
          title: "Welcome to Maby Academy 👋",
          body: "Your journey starts here. Browse the catalogue and enrol in your first course — growth compounds.",
          linkUrl: "/courses",
        },
      ],
      skipDuplicates: true,
    });
  }
  console.log("  ✓ points, streaks, badges and notifications");

  // -------------------------------------------------------------------
  // Permission catalogue + role bundles
  // -------------------------------------------------------------------
  for (const [key, description] of Object.entries(PERMISSIONS)) {
    await db.permission.upsert({
      where: { key },
      create: { key, description, domain: key.split(":")[0] },
      update: { description, domain: key.split(":")[0] },
    });
  }

  const permissionRows = await db.permission.findMany({
    select: { id: true, key: true },
  });
  const permissionId = new Map(permissionRows.map((p) => [p.key, p.id]));

  for (const [role, keys] of Object.entries(ROLE_PERMISSION_MAP)) {
    for (const key of keys) {
      const id = permissionId.get(key);
      if (!id) continue;
      await db.rolePermission.upsert({
        where: {
          role_permissionId: { role: role as Role, permissionId: id },
        },
        create: { role: role as Role, permissionId: id },
        update: {},
      });
    }
  }
  console.log(
    `  ✓ ${Object.keys(PERMISSIONS).length} permissions across ${Object.keys(ROLE_PERMISSION_MAP).length} roles`,
  );

  // -------------------------------------------------------------------
  // Schools and programmes
  // -------------------------------------------------------------------
  const schoolSeed = [
    {
      name: "School of Crypto Foundations",
      slug: "school-of-crypto-foundations",
      pillar: "CRYPTO" as const,
      iconEmoji: "₿",
      tagline: "Own your keys before you own anything else.",
      description:
        "Where every member starts. Wallets, self-custody, transaction literacy and the scam patterns that catch almost everyone once.",
      sortOrder: 1,
      courses: ["crypto-from-zero"],
    },
    {
      name: "School of On-Chain Analysis",
      slug: "school-of-on-chain-analysis",
      pillar: "ONCHAIN_ANALYSIS" as const,
      iconEmoji: "🔍",
      tagline: "Stop taking someone else's word for it.",
      description:
        "Read the chain yourself: wallet clustering, flow analysis, protocol revenue and the discipline to argue against your own thesis.",
      sortOrder: 2,
      courses: ["reading-the-chain"],
    },
    {
      name: "School of Trading and Risk",
      slug: "school-of-trading-and-risk",
      pillar: "TRADING" as const,
      iconEmoji: "📈",
      tagline: "Survive first. Everything else is downstream.",
      description:
        "Position sizing, drawdown maths, journalling and the psychology that separates a trader from a gambler.",
      sortOrder: 3,
      courses: ["risk-first-trading"],
    },
    {
      name: "School of Faith and Purpose",
      slug: "school-of-faith-and-purpose",
      pillar: "FAITH" as const,
      iconEmoji: "🙏",
      tagline: "Character before capital.",
      description:
        "Stewardship, integrity, health and the definition of 'enough' — the foundation that makes wealth worth holding.",
      sortOrder: 4,
      courses: ["built-to-last"],
    },
  ];

  for (const s of schoolSeed) {
    const school = await db.school.upsert({
      where: { slug: s.slug },
      create: {
        name: s.name,
        slug: s.slug,
        pillar: s.pillar,
        iconEmoji: s.iconEmoji,
        tagline: s.tagline,
        description: s.description,
        sortOrder: s.sortOrder,
      },
      update: { tagline: s.tagline, description: s.description },
    });

    // Attach existing courses to their school.
    for (const courseSlug of s.courses) {
      const id = courseIds[courseSlug];
      if (id) {
        await db.course.update({
          where: { id },
          data: { schoolId: school.id },
        });
      }
    }
  }
  console.log(`  ✓ ${schoolSeed.length} schools`);

  // A flagship programme spanning two schools, to exercise the join model.
  const foundationsSchool = await db.school.findUniqueOrThrow({
    where: { slug: "school-of-crypto-foundations" },
  });

  const programme = await db.programme.upsert({
    where: { slug: "web3-analyst-pathway" },
    create: {
      schoolId: foundationsSchool.id,
      title: "Web3 Analyst Pathway",
      slug: "web3-analyst-pathway",
      subtitle:
        "From never having held a wallet to defending an on-chain thesis in public.",
      description:
        "A structured route through the two courses that matter most for anyone who wants to research Web3 seriously rather than follow calls.\n\nYou start by taking custody of your own funds and understanding what a transaction actually is. You finish by producing a full protocol teardown — with a mandatory bear case — that an instructor grades against a rubric.",
      outcomes: [
        "Set up and independently verify self-custody",
        "Read and explain any on-chain transaction",
        "Assess whether a protocol has real usage or rented activity",
        "Produce a sourced, reproducible research teardown",
        "Argue the strongest case against your own conclusion",
      ],
      level: "INTERMEDIATE",
      status: "PUBLISHED",
      estimatedWeeks: 10,
      publishedAt: new Date(),
    },
    update: { status: "PUBLISHED" },
  });

  const pathwayCourses = ["crypto-from-zero", "reading-the-chain"];
  for (const [i, slug] of pathwayCourses.entries()) {
    const courseId = courseIds[slug];
    if (!courseId) continue;
    await db.programmeCourse.upsert({
      where: { programmeId_courseId: { programmeId: programme.id, courseId } },
      create: { programmeId: programme.id, courseId, sortOrder: i },
      update: { sortOrder: i },
    });
  }
  console.log("  ✓ 1 programme with ordered courses");

  // -------------------------------------------------------------------
  // Communities
  // -------------------------------------------------------------------
  const academyCommunity = await db.community.upsert({
    where: { slug: "the-commons" },
    create: {
      name: "The Commons",
      slug: "the-commons",
      description:
        "The academy-wide room. Introductions, wins, questions and accountability.",
      scope: "ACADEMY",
      guidelines:
        "Be useful or be quiet. No shilling, no price calls, no referral spam. Ask real questions and answer them properly.",
    },
    update: {},
  });

  const everyone = [mabi.id, ...Object.values(students)];
  for (const userId of everyone) {
    await db.communityMember.upsert({
      where: {
        communityId_userId: { communityId: academyCommunity.id, userId },
      },
      create: {
        communityId: academyCommunity.id,
        userId,
        role: userId === mabi.id ? "MODERATOR" : "MEMBER",
      },
      update: {},
    });
  }

  const existingPost = await db.post.findFirst({
    where: { communityId: academyCommunity.id },
  });
  if (!existingPost) {
    const welcome = await db.post.create({
      data: {
        communityId: academyCommunity.id,
        authorId: mabi.id,
        type: "ANNOUNCEMENT",
        title: "Read this first",
        body: "Welcome. Three things before you start.\n\nOne: do the assignments. The videos are the easy part — the work is where it becomes yours.\n\nTwo: nothing taught here is financial advice, and nobody here will ever ask for your seed phrase. Not me, not an instructor, not a moderator. Anyone who does is not from this academy.\n\nThree: post when you're stuck. Someone here has been stuck on the same thing.",
        isPinned: true,
        tags: ["start-here"],
      },
    });

    await db.comment.create({
      data: {
        postId: welcome.id,
        authorId: students["tobi@example.com"],
        body: "The wallet restore assignment was the most useful thing I've done all year. I found an old seed phrase screenshot in my photos and deleted it.",
      },
    });
    await db.post.update({
      where: { id: welcome.id },
      data: { commentCount: 1 },
    });
  }
  console.log("  ✓ community with pinned announcement");

  // -------------------------------------------------------------------
  // Growth: habits and goals for one student
  // -------------------------------------------------------------------
  const growthUser = students["tobi@example.com"];
  const habitSeed = [
    { name: "Complete one lesson", area: "LEARNING" as const, icon: "📚" },
    { name: "Devotional and prayer", area: "FAITH" as const, icon: "🙏" },
    { name: "Move for 30 minutes", area: "HEALTH" as const, icon: "💪" },
    { name: "Review the trading journal", area: "FINANCE" as const, icon: "📈" },
  ];
  for (const [i, h] of habitSeed.entries()) {
    const existing = await db.habit.findFirst({
      where: { userId: growthUser, name: h.name },
    });
    if (!existing) {
      await db.habit.create({
        data: {
          userId: growthUser,
          name: h.name,
          area: h.area,
          iconEmoji: h.icon,
          sortOrder: i,
          currentStreak: 4,
          longestStreak: 11,
        },
      });
    }
  }

  const existingGoal = await db.goal.findFirst({ where: { userId: growthUser } });
  if (!existingGoal) {
    await db.goal.createMany({
      data: [
        {
          userId: growthUser,
          title: "Finish the Web3 Analyst Pathway",
          area: "LEARNING",
          horizon: "QUARTERLY",
          targetValue: 100,
          currentValue: 62,
          unit: "%",
        },
        {
          userId: growthUser,
          title: "Build three months of living expenses in stablecoins",
          area: "FINANCE",
          horizon: "ANNUAL",
          targetValue: 3,
          currentValue: 1,
          unit: "months",
        },
      ],
    });
  }
  console.log("  ✓ habits and goals");

  // -------------------------------------------------------------------
  // Plans
  // -------------------------------------------------------------------
  const planSeed = [
    {
      name: "Member",
      slug: "member",
      priceMinor: 0,
      interval: "MONTHLY" as const,
      sortOrder: 1,
      description: "Start free. Free courses, the community, and your dashboard.",
      features: [
        "All free courses",
        "The Commons community",
        "Progress tracking and streaks",
        "Certificates on free courses",
      ],
    },
    {
      name: "Scholar",
      slug: "scholar",
      priceMinor: 2900,
      interval: "MONTHLY" as const,
      sortOrder: 2,
      description: "The full curriculum, graded assignments and live sessions.",
      features: [
        "Every course and programme",
        "Graded assignments with instructor feedback",
        "Live sessions and replays",
        "Verifiable certificates",
        "Referral commissions",
      ],
    },
    {
      name: "Fellow",
      slug: "fellow",
      priceMinor: 9900,
      interval: "MONTHLY" as const,
      sortOrder: 3,
      description: "Everything in Scholar, plus a mentor and cohort seat.",
      features: [
        "Everything in Scholar",
        "Assigned mentor and monthly one-to-one",
        "Cohort seat with a dated start and finish",
        "Priority assignment review",
        "Capstone project supervision",
      ],
    },
  ];
  for (const p of planSeed) {
    await db.plan.upsert({
      where: { slug: p.slug },
      create: p,
      update: { priceMinor: p.priceMinor, features: p.features },
    });
  }
  console.log(`  ✓ ${planSeed.length} plans`);

  // -------------------------------------------------------------------
  // Feature flags — risky capabilities ship dark
  // -------------------------------------------------------------------
  const flagSeed = [
    {
      key: "referral_commissions",
      description:
        "Multi-level referral commissions. Must stay off until compliance review — payouts have to be tied to genuine purchases, never recruitment.",
      isEnabled: false,
    },
    {
      key: "token_rewards",
      description:
        "Any crypto or cash-value reward. Off until legal review in every operating region.",
      isEnabled: false,
    },
    {
      key: "ai_assistant",
      description:
        "AI learning assistant. Off until provider, data handling and labelling are settled.",
      isEnabled: false,
    },
    {
      key: "community",
      description: "Community posts, comments and moderation.",
      isEnabled: true,
    },
    {
      key: "growth_centre",
      description: "Habits, goals and private journals.",
      isEnabled: true,
    },
  ];
  for (const f of flagSeed) {
    await db.featureFlag.upsert({
      where: { key: f.key },
      create: f,
      update: { description: f.description },
    });
  }
  console.log(`  ✓ ${flagSeed.length} feature flags (risky ones off by default)`);

  // Silence the unused-helper warning while keeping hmac available for
  // anyone extending the seed with pre-signed tokens.
  void hmac;

  console.log("\n✓ Seed complete.\n");
  console.log("  Sign in with any of these — password for all: " + PASSWORD);
  console.log("    Admin       mabi@mabyacademy.com");
  console.log("    Instructor  grace@mabyacademy.com");
  console.log("    Student     tobi@example.com\n");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
