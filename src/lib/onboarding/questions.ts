/**
 * The onboarding questionnaire.
 *
 * Four steps, declared as data so the wizard component holds no copy and the
 * answers map cleanly onto `OnboardingProfile` columns. Adding a step is a
 * change here and nowhere else.
 *
 * Two rules the shape enforces:
 *
 * 1. **Nothing here is required.** A member who skips every question still
 *    reaches a working dashboard on the general path. An onboarding flow that
 *    can trap someone is worse than no onboarding at all.
 * 2. **Faith and health are opt-in, never opt-out.** They are absent unless
 *    chosen, and the copy says they can be switched off later — which is a
 *    promise the settings page has to keep.
 */

export type OnboardingOption = {
  value: string;
  label: string;
  description?: string;
};

export type OnboardingStep = {
  /** Column on OnboardingProfile, or `interests` for the pillar picker. */
  field: "knowledgeLevel" | "primaryGoals" | "interests" | "weeklyHours";
  title: string;
  subtitle: string;
  /** Radio semantics when false — the mark renders round instead of square. */
  multiple: boolean;
  options: OnboardingOption[];
};

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    field: "knowledgeLevel",
    title: "Where are you starting from?",
    subtitle:
      "Answer honestly rather than aspirationally — it decides which lesson you open first, and nobody else sees it.",
    multiple: false,
    options: [
      {
        value: "beginner",
        label: "Complete beginner",
        description:
          "You've heard the words but never owned crypto or read a chart.",
      },
      {
        value: "learning",
        label: "Still learning",
        description:
          "You've bought something, maybe held a wallet, but you're not confident why.",
      },
      {
        value: "intermediate",
        label: "Intermediate",
        description:
          "You self-custody, you understand fees and chains, you want depth.",
      },
      {
        value: "advanced",
        label: "Advanced",
        description:
          "You read contracts or on-chain data already and want rigour, not basics.",
      },
    ],
  },
  {
    field: "primaryGoals",
    title: "What are you actually here for?",
    subtitle: "Pick everything that's true. Most people choose two or three.",
    multiple: true,
    options: [
      {
        value: "understand_crypto",
        label: "Understand crypto properly",
        description: "Stop relying on other people's opinions.",
      },
      {
        value: "protect_capital",
        label: "Stop losing money",
        description: "Risk management, position sizing, scam awareness.",
      },
      {
        value: "build_income",
        label: "Build an income skill",
        description: "On-chain analysis, research, or building.",
      },
      {
        value: "long_term_wealth",
        label: "Long-term wealth",
        description: "Saving, investing and compounding with patience.",
      },
      {
        value: "career",
        label: "Work in Web3",
        description: "A portfolio and a certificate that stand up to scrutiny.",
      },
      {
        value: "discipline",
        label: "Personal discipline",
        description: "The habits underneath every result above.",
      },
    ],
  },
  {
    field: "interests",
    title: "Which pillars do you want in your path?",
    subtitle:
      "Faith and health are entirely optional. Leave them out and you'll never see that content — you can add them later in Settings.",
    multiple: true,
    options: [
      {
        value: "crypto-foundations",
        label: "Crypto & Web3",
        description: "Wallets, chains, self-custody, DeFi.",
      },
      {
        value: "on-chain-analysis",
        label: "On-chain analysis",
        description: "Read the data yourself instead of taking a claim on trust.",
      },
      {
        value: "trading-and-risk",
        label: "Trading & risk",
        description: "Survive first. Discipline over prediction.",
      },
      {
        value: "money-and-business",
        label: "Money & business",
        description: "Budgeting, income, pricing, building something real.",
      },
      {
        value: "faith-and-purpose",
        label: "Faith & purpose",
        description: "Optional. Stewardship, contentment, why you're doing this.",
      },
      {
        value: "health-and-mindset",
        label: "Health & mindset",
        description: "Optional. Sleep, focus, and the body that carries the work.",
      },
    ],
  },
  {
    field: "weeklyHours",
    title: "How much time can you really give this?",
    subtitle:
      "Be conservative. A path you can sustain beats an ambitious one you abandon in week three.",
    multiple: false,
    options: [
      {
        value: "2",
        label: "About 2 hours a week",
        description: "One lesson and its exercise. Slow, but it compounds.",
      },
      {
        value: "5",
        label: "4–5 hours a week",
        description: "Steady progress. Most members are here.",
      },
      {
        value: "10",
        label: "8–10 hours a week",
        description: "You'll finish a track in weeks, not months.",
      },
      {
        value: "20",
        label: "15+ hours a week",
        description: "You're treating this as training, not a hobby.",
      },
    ],
  },
];

/** Pillar slugs that switch on the two optional content areas. */
export const FAITH_PILLAR = "faith-and-purpose";
export const HEALTH_PILLAR = "health-and-mindset";
