/**
 * Legal and disclosure copy.
 *
 * Kept in code rather than the database because these documents must be
 * version-controlled and reviewable in a diff — a silent edit to a risk
 * disclosure is exactly the kind of change that should require a commit.
 *
 * This is honest, plain-language drafting, not legal advice. Have a lawyer in
 * each operating jurisdiction review it before charging money.
 */

export type LegalSection = { heading: string; body: string[] };

export type LegalPage = {
  title: string;
  summary: string;
  updated: string;
  /** Marks documents a member genuinely needs to read, not just accept. */
  isCritical?: boolean;
  sections: LegalSection[];
};

const UPDATED = "29 July 2026";

export const LEGAL_PAGES = {
  "risk-disclosure": {
    title: "Risk disclosure",
    summary:
      "Cryptocurrency can take your money and give nothing back. Read this before you act on anything you learn here.",
    updated: UPDATED,
    isCritical: true,
    sections: [
      {
        heading: "You can lose everything",
        body: [
          "Cryptocurrency markets are volatile, largely unregulated, and open around the clock. Assets can fall by most of their value in days, and some go to zero and never recover.",
          "Never commit money you cannot afford to lose entirely. That is not a formality — it is the single most important sentence on this page. If losing the amount would change how you eat, where you live, or how you support the people who depend on you, it does not belong in crypto.",
        ],
      },
      {
        heading: "Nothing here is financial advice",
        body: [
          "Maby Academy is an education provider. We teach concepts, methods and research technique. We do not tell you what to buy, when to buy it, or how much to allocate.",
          "No instructor, mentor, moderator or community member speaks for the academy in the capacity of a financial adviser. Nothing on this platform is a personal recommendation, and none of it accounts for your circumstances, obligations or risk tolerance.",
          "If you need advice tailored to your situation, engage a licensed professional in your jurisdiction.",
        ],
      },
      {
        heading: "Past results predict nothing",
        body: [
          "Case studies, historical charts and worked examples exist to teach method. They are not projections. A strategy that worked in one market cycle can lose consistently in the next.",
          "Be sceptical of anyone — inside this academy or outside it — who shows returns without showing the losses alongside them.",
        ],
      },
      {
        heading: "We never touch your funds",
        body: [
          "Maby Academy does not hold, custody, manage, invest or trade member funds. We do not operate a wallet on your behalf and we do not execute transactions for you.",
          "We will never ask you for a seed phrase, a private key, a recovery phrase, or a screenshot of any of them. Not by email, not in a lesson, not in the community, not in a support ticket. Anyone requesting these while claiming to represent the academy is committing fraud — report it and tell us.",
        ],
      },
      {
        heading: "Self-custody means self-responsibility",
        body: [
          "The property that makes crypto powerful — that nobody can freeze or reverse it — is the same property that makes mistakes final. There is no chargeback, no support line at the network, and no manager to escalate to.",
          "If you lose your recovery phrase, your funds are gone. If you sign a malicious transaction, your funds are gone. We teach you how to avoid both, but the responsibility remains yours.",
        ],
      },
      {
        heading: "Tax and legal obligations are yours",
        body: [
          "Crypto activity may create tax liabilities and reporting duties where you live, and the rules differ sharply between countries and change often.",
          "You are responsible for understanding and meeting your obligations. We do not provide tax or legal advice.",
        ],
      },
    ],
  },

  "financial-education-disclaimer": {
    title: "Financial education disclaimer",
    summary:
      "What our courses are, what they are not, and the limits of what any education can promise you.",
    updated: UPDATED,
    isCritical: true,
    sections: [
      {
        heading: "What you are buying",
        body: [
          "You are buying structured education: lessons, assignments that a human reads and grades, and access to a community of people doing the same work.",
          "You are not buying signals, calls, portfolio management, guaranteed outcomes, or access to a system that makes money on your behalf. We do not sell any of those, and we would not.",
        ],
      },
      {
        heading: "No income or outcome promises",
        body: [
          "We make no representation that completing a course will increase your income, improve your returns, or lead to employment. Results depend on your effort, your circumstances, market conditions and factors nobody controls.",
          "Any figure shown in course material is illustrative or historical. It is never a forecast of what you will earn.",
        ],
      },
      {
        heading: "Certificates certify learning, not competence in markets",
        body: [
          "A Maby Academy certificate confirms that a named person completed a defined body of work to the standard the academy requires, and that an instructor assessed it.",
          "It is not a professional licence, not a regulatory qualification, and not a statement that the holder will trade or invest successfully.",
        ],
      },
      {
        heading: "Instructor and community content",
        body: [
          "Instructors bring their own experience and opinions. Where an instructor expresses a view, it is theirs, and it may differ from another instructor's.",
          "Community posts are written by members and are not reviewed before publication. Treat them as you would any conversation among peers: useful, unverified, and no substitute for your own research.",
        ],
      },
      {
        heading: "Referral rewards",
        body: [
          "Where the academy runs a referral programme, rewards are earned on genuine purchases of educational products by people you introduce. Rewards are never paid for recruitment alone.",
          "Referral features are configurable and may be limited or disabled in your region. Sharing a referral link does not make you an agent, employee or representative of Maby Academy, and you must not describe it as an investment opportunity.",
        ],
      },
    ],
  },

  "community-guidelines": {
    title: "Community guidelines",
    summary:
      "The academy works because people show up honestly. Here is what that requires.",
    updated: UPDATED,
    sections: [
      {
        heading: "Be useful or be quiet",
        body: [
          "Ask real questions. Answer them properly. If you do not know, say so — a confident wrong answer costs someone real money in this subject.",
        ],
      },
      {
        heading: "Never ask for or share credentials",
        body: [
          "Do not post a seed phrase, private key or recovery phrase, and never ask anyone else for theirs — not to 'help debug', not in a direct message, never.",
          "Anyone requesting these is attempting theft. Report it immediately. We remove accounts that do this without warning.",
        ],
      },
      {
        heading: "No shilling, no calls, no schemes",
        body: [
          "Do not promote tokens, projects, groups or services for personal gain. Do not post price predictions or entry calls. Do not recruit for anything.",
          "Referral links belong in your own referral dashboard, not in community posts.",
        ],
      },
      {
        heading: "Disclose your interest",
        body: [
          "If you hold a position in something you are discussing, say so. Analysis from someone who is quietly long reads very differently once you know.",
        ],
      },
      {
        heading: "Treat people decently",
        body: [
          "No harassment, discrimination, or contempt for beginners. Everyone here was a beginner recently, including the people teaching.",
          "Disagree with the argument, not the person.",
        ],
      },
      {
        heading: "Enforcement",
        body: [
          "Moderators may hide content, lock threads, and suspend accounts. Serious breaches — credential phishing, scams, targeted harassment — result in immediate removal and, where appropriate, a report to the relevant authorities.",
          "If you think a decision was wrong, open a support ticket and it will be reviewed by someone who was not involved.",
        ],
      },
    ],
  },

  privacy: {
    title: "Privacy",
    summary:
      "What we collect, why, and the things we deliberately keep out of reach — including from ourselves.",
    updated: UPDATED,
    sections: [
      {
        heading: "What we collect",
        body: [
          "Account details you give us: name, email, and optionally country, timezone and a short bio.",
          "Learning activity: enrolments, lesson progress, quiz attempts, assignment submissions, certificates.",
          "Security records: session device and IP address, sign-in events and credential changes — kept so you can spot an account compromise.",
          "We do not collect payment card details. Where payments are processed, that happens at the payment provider and card numbers never reach our systems.",
        ],
      },
      {
        heading: "Your journal is private",
        body: [
          "Personal reflections, gratitude entries and prayer notes are private by default and are not readable by staff, instructors or administrators.",
          "A mentor can only see journal entries if you explicitly grant consent on that specific mentor relationship, and you can withdraw it at any time. No administrative role overrides this.",
        ],
      },
      {
        heading: "Faith and health data is opt-in",
        body: [
          "Faith and health features are off unless you turn them on. We never infer religious belief or health status from your activity, and we do not surface this information to anyone but you.",
        ],
      },
      {
        heading: "Who can see what",
        body: [
          "Instructors see the work submitted in courses they teach — not your other courses, and not your personal records.",
          "Support agents can see account state to resolve a ticket. They can never see your password, which is stored only as a hash we cannot reverse.",
          "Finance roles see payments. They have no access to your coursework.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "You can request a copy of your data, ask us to correct it, or ask us to delete your account. Some records — invoices, for example — may be retained where the law requires it.",
          "Open a support ticket to make any of these requests.",
        ],
      },
    ],
  },
} satisfies Record<string, LegalPage>;

export type LegalSlug = keyof typeof LEGAL_PAGES;
