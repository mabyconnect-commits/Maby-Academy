import type { Metadata } from "next";
import { LinkButton, Card } from "@/components/ui";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Maby Academy teaches crypto, capital and character together — and the promises we enforce in the software, not just the footer.",
};

/**
 * The About page. Deliberately not a slick "our mission" brochure — it states
 * what the academy is, why the six pillars are taught together, and the
 * promises that are enforced in the product. The voice matches the founder's
 * bio and the landing page's "responsibility, in the product" section.
 */
export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
      <p className="eyebrow-wide">About Maby Academy</p>
      <h1 className="mt-4 text-[34px] leading-[1.1] font-black tracking-tight text-mist-100 sm:text-[44px]">
        Crypto, capital and character —{" "}
        <span className="font-display text-gold-500">in that order.</span>
      </h1>
      <p className="mt-5 text-base leading-[1.75] text-mist-300">
        Most people lose money in crypto long before they place a bad trade —
        to a phishing link, a screenshot of a seed phrase, an exchange that
        never let them withdraw. Maby Academy exists because that is a teaching
        failure, not a personal one. We build the foundation first: how to hold
        your own money safely, think clearly, and stay whole while you grow.
      </p>

      <Section title="Why the pillars are taught together">
        <p>
          Finance without character produces reckless traders. Skill without
          health produces burnout. Ambition without wisdom produces people who
          win a game that never made them happier. So the academy is built on
          six pillars — Crypto Foundations, On-Chain Analysis, Trading &amp;
          Risk, Money &amp; Business, Faith &amp; Purpose, and Health &amp;
          Mindset — taught alongside each other rather than in isolation.
        </p>
        <p>
          Faith and health are entirely optional, chosen by you during
          onboarding and switchable off at any time. Nothing is preached. But
          the door is open, because a life is more than a portfolio.
        </p>
      </Section>

      <Section title="Completion is earned, not clicked">
        <p>
          Opening a page never completes a lesson. Every lesson is gated on a
          real condition — a written reflection, a quiz, or an assignment a real
          instructor grades against a published rubric. That single rule is the
          entire reason a certificate from here means anything. We would rather
          a smaller number of genuine completions than a large number of clicks.
        </p>
      </Section>

      <Section title="What we promise, in the software">
        <p className="mb-5">
          These are not footer disclaimers. They are enforced in the product and
          repeated wherever they matter.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card variant="gold" pad="wide">
            <p className="eyebrow">Never</p>
            <ul className="mt-3 space-y-2.5">
              <Vow no>
                Ask for your seed phrase, private key or recovery phrase — not
                support, not an instructor, not the founder
              </Vow>
              <Vow no>Take custody of your funds, or execute a trade</Vow>
              <Vow no>Tell you what to buy, or predict a price</Vow>
              <Vow no>Let any role read your private journal</Vow>
            </ul>
          </Card>
          <Card pad="wide">
            <p className="eyebrow">Always</p>
            <ul className="mt-3 space-y-2.5">
              <Vow>Gate every lesson on a real condition</Vow>
              <Vow>Have a person grade your assignments against a rubric</Vow>
              <Vow>Make every certificate publicly verifiable by serial</Vow>
              <Vow>State plainly that this is education, not financial advice</Vow>
            </ul>
          </Card>
        </div>
      </Section>

      <Section title="Who teaches here">
        <p>
          The academy is led by Mabi, its founder, alongside a small teaching
          team: an on-chain analyst who spent years reading blocks before it was
          a job title, a risk-first trader who survived three bear markets by
          refusing to be a hero, and a health and mindset coach who believes
          discipline is a form of self-respect. Courses are authored as prose
          you can read in a diff, so the curriculum is reviewable, not a black
          box.
        </p>
      </Section>

      <div className="mt-14 flex flex-wrap gap-3">
        <LinkButton href="/register" size="lg">
          Start learning free
        </LinkButton>
        <LinkButton href="/courses" variant="secondary" size="lg">
          Browse the courses
        </LinkButton>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12 border-t border-rule pt-10">
      <h2 className="text-xl font-extrabold tracking-tight text-mist-100 sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[15px] leading-[1.75] text-mist-300">
        {children}
      </div>
    </section>
  );
}

function Vow({ no = false, children }: { no?: boolean; children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <span className={`mt-px shrink-0 ${no ? "text-flag-500" : "text-growth-500"}`}>
        <Icon name={no ? "flag" : "check"} size={14} strokeWidth={2.5} />
      </span>
      <span className="text-[12.5px] leading-[1.6] text-mist-300">{children}</span>
    </li>
  );
}
