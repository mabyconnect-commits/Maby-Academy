import type { Metadata } from "next";
import Link from "next/link";
import { LinkButton } from "@/components/ui";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Straight answers about how Maby Academy works — courses, certificates, payments, safety, and what we will and won't do.",
};

/**
 * FAQ, grouped and rendered as native <details> so it needs no client
 * JavaScript. Answers are deliberately plain and honest — several point back
 * to the promises the academy enforces rather than softening them.
 */
const GROUPS: { title: string; items: { q: string; a: React.ReactNode }[] }[] = [
  {
    title: "Getting started",
    items: [
      {
        q: "Is it really free to start?",
        a: (
          <>
            Yes. The foundation courses cost nothing and need no card — including
            Crypto From Zero, the one that matters most. Some deeper courses are
            paid, but there is no upsell in the middle of a free course and no
            subscription. See{" "}
            <Link href="/pricing" className="text-gold-400 hover:text-gold-300">
              pricing
            </Link>
            .
          </>
        ),
      },
      {
        q: "Do I need any prior knowledge?",
        a: "No. The courses are written to be finishable by someone starting from zero. Onboarding asks four quick questions and builds a path from where you actually are.",
      },
      {
        q: "How much time does a course take?",
        a: "Each course lists an estimate — the foundation courses are roughly 12–14 focused hours. You go at your own pace; progress is saved as you complete lessons.",
      },
    ],
  },
  {
    title: "Lessons and certificates",
    items: [
      {
        q: "Why doesn't opening a lesson complete it?",
        a: "Because opening a page is not learning. Every lesson is gated on a real condition — a written reflection, a quiz, or a graded assignment. That rule is the entire reason a certificate from here means anything.",
      },
      {
        q: "Who grades my assignments?",
        a: "A real instructor, against a published rubric, with written feedback — not a score from a script. You can see the rubric before you submit.",
      },
      {
        q: "Is the write-up on written lessons graded?",
        a: "No. The reflection on a written lesson is private, ungraded, and read by nobody. It exists so you've actually done the exercise before the lesson counts — the UI says so plainly.",
      },
      {
        q: "Can anyone verify my certificate?",
        a: (
          <>
            Yes. Every certificate has a serial anyone can check on a public
            page. A revoked certificate is marked as revoked rather than deleted.{" "}
            <Link href="/verify" className="text-gold-400 hover:text-gold-300">
              Verify a certificate
            </Link>
            .
          </>
        ),
      },
    ],
  },
  {
    title: "Safety and money",
    items: [
      {
        q: "Will you ever ask for my seed phrase or private key?",
        a: (
          <>
            Never — not support, not an instructor, not the founder. Anyone
            asking for your seed phrase, private key, or recovery phrase while
            claiming to represent the academy is committing fraud. Report it. See
            the{" "}
            <Link
              href="/legal/risk-disclosure"
              className="text-gold-400 hover:text-gold-300"
            >
              risk disclosure
            </Link>
            .
          </>
        ),
      },
      {
        q: "Do you hold my funds or trade for me?",
        a: "No. Maby Academy never holds, custodies, invests, or trades member funds, and never executes transactions on your behalf. We teach; you stay in control of your own money.",
      },
      {
        q: "Is any of this financial advice?",
        a: "No. This is education. Nobody here tells you what to buy, when, or how much. For advice tailored to your situation, engage a licensed professional in your jurisdiction.",
      },
      {
        q: "How do payments work for paid courses?",
        a: (
          <>
            Paid courses are a one-time payment through our payment provider —
            no subscription. A cancelled checkout leaves nothing behind. See{" "}
            <Link href="/pricing" className="text-gold-400 hover:text-gold-300">
              pricing
            </Link>{" "}
            and the{" "}
            <Link
              href="/legal/refund"
              className="text-gold-400 hover:text-gold-300"
            >
              refund policy
            </Link>
            .
          </>
        ),
      },
    ],
  },
  {
    title: "Community and support",
    items: [
      {
        q: "Is there a community?",
        a: (
          <>
            Yes — a members' community for discussion and support, held to{" "}
            <Link
              href="/legal/community-guidelines"
              className="text-gold-400 hover:text-gold-300"
            >
              community guidelines
            </Link>
            . No one in the community speaks for the academy as a financial
            adviser.
          </>
        ),
      },
      {
        q: "How do I get help or report a problem?",
        a: (
          <>
            Reach us on the{" "}
            <Link href="/contact" className="text-gold-400 hover:text-gold-300">
              contact page
            </Link>
            . If someone is impersonating the academy or asking for your keys,
            report it there straight away.
          </>
        ),
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
      <p className="eyebrow-wide">Questions</p>
      <h1 className="mt-4 text-[34px] leading-[1.1] font-black tracking-tight text-mist-100 sm:text-[44px]">
        Straight answers
      </h1>
      <p className="mt-5 text-base leading-[1.75] text-mist-300">
        How the academy works, what it costs, and what we will and won&apos;t
        do. If your question isn&apos;t here,{" "}
        <Link href="/contact" className="text-gold-400 hover:text-gold-300">
          ask us
        </Link>
        .
      </p>

      <div className="mt-12 space-y-12">
        {GROUPS.map((group) => (
          <section key={group.title}>
            <h2 className="text-xs font-bold tracking-[0.14em] text-gold-500 uppercase">
              {group.title}
            </h2>
            <div className="mt-4 divide-y divide-rule border-y border-rule">
              {group.items.map((item) => (
                <details key={item.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold text-mist-100 marker:content-none">
                    {item.q}
                    <span className="shrink-0 text-mist-400 transition-transform group-open:rotate-90">
                      <Icon name="chevronRight" size={16} strokeWidth={2.5} />
                    </span>
                  </summary>
                  <div className="mt-3 text-[14px] leading-[1.75] text-mist-300">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-14 flex flex-wrap gap-3">
        <LinkButton href="/register" size="lg">
          Start learning free
        </LinkButton>
        <LinkButton href="/contact" variant="secondary" size="lg">
          Contact us
        </LinkButton>
      </div>
    </div>
  );
}
