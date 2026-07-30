import type { Metadata } from "next";
import Link from "next/link";
import { LinkButton, Card } from "@/components/ui";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "How Maby Academy charges — free foundation courses, one-time payments for deeper ones, no subscription, no upsell in the middle.",
};

/**
 * Pricing. There is no Plan/subscription model in the product, and this page
 * refuses to invent one — it describes the honest reality: free foundations,
 * one-time payments for some deeper courses, and no recurring billing.
 */
export default function PricingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
      <p className="eyebrow-wide">Pricing</p>
      <h1 className="mt-4 text-[34px] leading-[1.1] font-black tracking-tight text-mist-100 sm:text-[44px]">
        Honest pricing, no subscription
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-[1.75] text-mist-300">
        You start free, and the course that matters most stays free forever.
        Some deeper courses are paid — a one-time payment, never a subscription,
        and never an upsell dropped into the middle of something you already
        started.
      </p>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <Card variant="raised" pad="wide" className="flex flex-col">
          <p className="eyebrow">Free forever</p>
          <p className="mt-4 text-[40px] leading-none font-black text-mist-100">
            $0
          </p>
          <p className="mt-3 text-sm leading-[1.65] text-mist-400">
            No card, no trial that expires. Everything you need to hold your own
            money safely and start growing.
          </p>
          <ul className="mt-6 space-y-2.5">
            <Perk>The full foundation courses, including Crypto From Zero</Perk>
            <Perk>Progress tracking and gated lessons</Perk>
            <Perk>Quizzes and reflections on every lesson</Perk>
            <Perk>A verifiable certificate when you complete a free course</Perk>
            <Perk>The members&apos; community</Perk>
          </ul>
          <div className="mt-7">
            <LinkButton href="/register" size="lg">
              Create a free account
            </LinkButton>
          </div>
        </Card>

        <Card variant="gold" pad="wide" className="flex flex-col">
          <p className="eyebrow">Paid courses</p>
          <p className="mt-4 text-[40px] leading-none font-black text-mist-100">
            One-time
          </p>
          <p className="mt-3 text-sm leading-[1.65] text-mist-300">
            Some advanced courses carry a one-time price, shown on the course
            before you enrol. Pay once, keep access.
          </p>
          <ul className="mt-6 space-y-2.5">
            <Perk gold>Everything in the free tier</Perk>
            <Perk gold>Graded assignments read by a real instructor</Perk>
            <Perk gold>Deeper, longer courses as they&apos;re published</Perk>
            <Perk gold>A one-time payment — no recurring billing, ever</Perk>
          </ul>
          <div className="mt-7">
            <LinkButton href="/courses" variant="secondary" size="lg">
              Browse the courses
            </LinkButton>
          </div>
        </Card>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <Note title="No subscription">
          You are never billed on a recurring schedule. A paid course is a
          single payment.
        </Note>
        <Note title="No upsell mid-course">
          A free course stays free the whole way through. Nothing is paywalled
          after you start.
        </Note>
        <Note title="Cancelled checkout is clean">
          Change your mind at checkout and nothing is charged and nothing is
          left behind.
        </Note>
      </div>

      <p className="mt-10 text-sm leading-[1.7] text-mist-400">
        Payments are handled by our payment provider; we never store your card
        details. See the{" "}
        <Link href="/legal/refund" className="text-gold-400 hover:text-gold-300">
          refund policy
        </Link>{" "}
        and the{" "}
        <Link href="/legal/terms" className="text-gold-400 hover:text-gold-300">
          terms
        </Link>
        .
      </p>
    </div>
  );
}

function Perk({ gold = false, children }: { gold?: boolean; children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <span className="mt-px shrink-0 text-growth-500">
        <Icon name="check" size={15} strokeWidth={2.5} />
      </span>
      <span className={`text-[13px] leading-[1.55] ${gold ? "text-mist-200" : "text-mist-300"}`}>
        {children}
      </span>
    </li>
  );
}

function Note({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--radius-tile)] border border-rule p-5">
      <p className="text-[13px] font-bold text-mist-100">{title}</p>
      <p className="mt-1.5 text-[12.5px] leading-[1.6] text-mist-400">{children}</p>
    </div>
  );
}
