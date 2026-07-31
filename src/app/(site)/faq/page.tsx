import Link from "next/link";
import type { Metadata } from "next";
import { Card, LinkButton } from "@/components/ui";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "How completion works, who reads your assignments, what we will never ask for, how refunds work, and who can see your journal.",
};

/**
 * The FAQ.
 *
 * Ordered by what a sceptical newcomer actually asks, hardest question first.
 * The security and privacy answers are deliberately blunt — a hedged answer to
 * "will you ever ask for my seed phrase" is worse than none, because the whole
 * value of that rule is that it has no exceptions to remember.
 */
const GROUPS: {
  heading: string;
  items: { q: string; a: React.ReactNode }[];
}[] = [
  {
    heading: "Security and trust",
    items: [
      {
        q: "Will you ever ask for my seed phrase, private key or recovery phrase?",
        a: (
          <>
            <strong>No. Never, in any context, for any reason.</strong> Not
            support, not an instructor, not a mentor, not the founder. There is no
            situation — verification, restoration, an airdrop, a certificate, a
            competition — in which anyone from Maby Academy needs it.
            <br />
            <br />
            If someone contacts you claiming otherwise, including using our name,
            branding or a similar domain, they are trying to steal from you.
            Report it through Support; scam reports go to a priority queue.
          </>
        ),
      },
      {
        q: "Do you hold my crypto or execute trades?",
        a: "No. The academy takes no custody of member funds and executes no trades. Every tool here is educational — the position calculator does arithmetic in your browser and stores nothing. You keep your own keys, which is the entire point of the first course.",
      },
      {
        q: "Is this financial advice?",
        a: "No. Everything here is education. Nobody will tell you what to buy or predict a price, and any figure shown is for teaching rather than a live quote. What you do with your money is your decision and your responsibility.",
      },
    ],
  },
  {
    heading: "Learning and certificates",
    items: [
      {
        q: "Why can't I mark a lesson complete?",
        a: "Because opening a page is not learning. Every lesson has a real condition — watch a minimum share of the video, pass the quiz, submit the assignment, or write up the exercise. The course builder refuses to publish a lesson with no condition at all. It is slower, and it is the only reason a certificate from here means anything.",
      },
      {
        q: "Who reads my assignments?",
        a: "A person. Assignments are graded by an instructor against a rubric published on the assignment itself, and they write you feedback. Not a script, and not an AI — deliberately, because feedback you cannot argue with is not feedback.",
      },
      {
        q: "How do I get a certificate, and can anyone check it?",
        a: (
          <>
            It issues automatically once you pass the course&apos;s completion
            threshold, shown on the course page. It carries a serial that anyone
            can check on the{" "}
            <Link href="/verify" className="font-semibold text-gold-500 hover:text-gold-400">
              public verification page
            </Link>
            .
            <br />
            <br />
            A revoked certificate keeps its serial and still resolves — marked
            revoked. Deleting it would let a screenshot of the original pass as
            valid forever.
          </>
        ),
      },
      {
        q: "Do I lose access if I stop paying?",
        a: "Not to a course you bought outright — that is lifetime access, including future updates to it. Plans bundle access to several courses, and that bundled access does end with the plan. The distinction is shown at checkout before you pay.",
      },
    ],
  },
  {
    heading: "Privacy",
    items: [
      {
        q: "Who can read my journal?",
        a: (
          <>
            <strong>Only you.</strong> No role can read your journal entries —
            including administrators and the super administrator. That is not a
            policy someone could quietly change in a settings panel; the queries
            that would allow it do not exist.
            <br />
            <br />
            A mentor can see a goal only if you explicitly share that goal, and
            can read your journal only if you grant consent on that specific
            mentorship. Both are off by default and both are revocable at any
            moment.
          </>
        ),
      },
      {
        q: "What does my mentor actually see?",
        a: "Your course progress, completed lessons and graded work — that is what mentoring needs. Not your habits, not your streaks, not an unshared goal, and not your journal unless you have granted it. The mentorship page lists the boundary in full, item by item, so you never have to guess.",
      },
      {
        q: "Is faith or health content forced on me?",
        a: "No. Both are opt-in, chosen during onboarding, and absent unless you pick them. Turning them off in Settings removes them immediately. Skipping onboarding entirely leaves them off.",
      },
    ],
  },
  {
    heading: "Money and referrals",
    items: [
      {
        q: "How do refunds work?",
        a: (
          <>
            Open a billing ticket with your invoice number and support answers
            within one working day. A refund also reverses any referral commission
            earned on that purchase, which is why a person handles it rather than
            a button — that reversal has to be right.
            <br />
            <br />
            If a course was not what the page said it was, you get your money
            back. If you simply did not do the work, we will say so plainly
            instead of pretending otherwise.
          </>
        ),
      },
      {
        q: "How does the referral programme work?",
        a: "You get a code and an invite link. When someone you invited buys a course, you earn a share of that purchase — and a smaller share on their invitees, up to three levels. Commissions are tied to genuine purchases only; nothing pays for recruitment itself. Multi-level commissions are currently switched off behind a feature flag pending compliance review, and nothing pays out until that review is finished.",
      },
      {
        q: "What payment methods work?",
        a: "Card, bank transfer, USSD and mobile money, through Flutterwave. We never see or store your card details. Every price is shown in full before you pay — no fee appears at checkout that was not on the page.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <header>
        <p className="eyebrow">Questions</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-mist-100 sm:text-5xl">
          Frequently asked
        </h1>
        <p className="mt-4 leading-relaxed text-mist-300">
          The hard questions first. If yours is not here,{" "}
          <Link
            href="/dashboard/support"
            className="font-semibold text-gold-500 hover:text-gold-400"
          >
            ask support
          </Link>{" "}
          — a person answers.
        </p>
      </header>

      {GROUPS.map((group) => (
        <section key={group.heading} className="mt-12">
          <h2 className="eyebrow-wide">{group.heading}</h2>

          {/* Native <details>: works without hydration, keyboard-navigable for
              free, and findable by the browser's own find-in-page once open. */}
          <div className="mt-4 space-y-2.5">
            {group.items.map((item) => (
              <details
                key={item.q}
                className="surface group px-5 py-4 [&[open]]:border-gold-500/35"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                  <span className="text-sm leading-[1.45] font-bold text-mist-100">
                    {item.q}
                  </span>
                  <span
                    className="mt-0.5 shrink-0 text-lg leading-none text-gold-500 transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <div className="mt-3 border-t border-rule pt-3 text-[12.5px] leading-[1.75] text-mist-400">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      ))}

      <Card variant="gold" pad="wide" className="mt-14 text-center">
        <p className="eyebrow">Still unsure</p>
        <h2 className="mx-auto mt-3 max-w-md text-xl leading-[1.3] font-extrabold text-mist-100">
          The first course is free. Judge it on the work, not the marketing.
        </h2>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <LinkButton href="/courses/crypto-from-zero" size="lg">
            Open the free course
          </LinkButton>
          <LinkButton href="/about" variant="secondary" size="lg">
            About the academy
          </LinkButton>
        </div>
      </Card>
    </div>
  );
}
