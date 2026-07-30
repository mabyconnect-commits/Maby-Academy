/**
 * Support taxonomy and help-centre copy.
 *
 * Plain module, not `server-only`: the ticket form is a client component and
 * needs the same category list the service validates against. Keeping one
 * declaration means the dropdown can never offer a category the server
 * rejects.
 */

/** The specialist queues, with the response time each one promises. */
export const SUPPORT_CATEGORIES = [
  { value: "account", label: "Account & access", sla: "Within 1 working day" },
  { value: "billing", label: "Billing & refunds", sla: "Within 1 working day" },
  {
    value: "coursework",
    label: "Coursework & grading",
    sla: "Within 2 working days",
  },
  {
    value: "certificate",
    label: "Certificate problem",
    sla: "Within 2 working days",
  },
  {
    value: "security",
    label: "Security concern",
    // Deliberately the fastest queue: a compromised account loses money every
    // hour it stays compromised.
    sla: "Same day, priority",
  },
  {
    value: "report",
    label: "Report a member or scam",
    sla: "Same day, priority",
  },
] as const;

export type SupportCategory = (typeof SUPPORT_CATEGORIES)[number]["value"];

export const CATEGORY_VALUES: ReadonlySet<string> = new Set(
  SUPPORT_CATEGORIES.map((c) => c.value),
);

/** Security and abuse reports jump the queue without the member asking. */
export const URGENT_CATEGORIES: ReadonlySet<string> = new Set([
  "security",
  "report",
]);

export function categoryLabel(value: string): string {
  return SUPPORT_CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

/** Help-centre articles. Static copy, so there is no query and no CMS. */
export const HELP_ARTICLES = [
  {
    title: "Why can't I mark a lesson complete?",
    category: "Learning",
    body: "Some lessons require you to watch a minimum share of the video, pass the quiz, or submit the assignment before they will complete. Opening a page never counts as learning — that rule is what makes the certificate worth something.",
  },
  {
    title: "How do I get my certificate?",
    category: "Certificates",
    body: "A certificate issues automatically once you pass the course's completion threshold, which is shown on the course page. It carries a serial anyone can verify.",
  },
  {
    title: "Someone asked for my seed phrase. What do I do?",
    category: "Security",
    body: "Stop, and report it. Nobody at Maby Academy will ever ask for a seed phrase, private key or recovery phrase — not support, not an instructor, not a mentor. Anyone who does is impersonating us and trying to steal from you. Use the 'Report a member or scam' form; it goes to a priority queue.",
  },
  {
    title: "Who can read my journal?",
    category: "Privacy",
    body: "Only you. No role — including super administrator — can read your journal entries. A mentor can see a goal only if you explicitly share that goal, and you can revoke it at any time.",
  },
  {
    title: "How do refunds work?",
    category: "Billing",
    body: "Open a Billing & refunds ticket with your invoice number. A refund reverses any referral commission earned on that purchase, which is why a person handles it rather than a button.",
  },
  {
    title: "My payment succeeded but I'm not enrolled",
    category: "Billing",
    body: "Enrolment happens when the payment provider confirms the charge, which is usually instant but can lag. If it has been more than a few minutes, open a Billing ticket with your reference and support will reconcile it — you will never be charged twice for the same course.",
  },
  {
    title: "Can I change my learning path later?",
    category: "Learning",
    body: "Yes. Your onboarding answers live in Settings and you can change them whenever you like. Turning off faith or health content removes it immediately.",
  },
  {
    title: "How do I sign out of a device I no longer have?",
    category: "Security",
    body: "Settings → Security lists every active session with the device it was created on. Revoke one, or sign out everywhere. Changing your password does not end other sessions by itself, so do both if you suspect a compromise.",
  },
] as const;
