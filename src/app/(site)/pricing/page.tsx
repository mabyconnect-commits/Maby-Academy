import Link from "next/link";
import type { Metadata } from "next";
import { listPlans, } from "@/server/services/schools";
import { listPublishedCourses } from "@/server/services/courses";
import { Card, LinkButton, Pill } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { formatMoney } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start free. Pay per course, or subscribe. No card needed to begin, and every price is shown in full before you commit.",
};

export const dynamic = "force-dynamic";

const INTERVAL_LABEL: Record<string, string> = {
  MONTHLY: "/month",
  QUARTERLY: "/quarter",
  ANNUAL: "/year",
  LIFETIME: "once",
  ONE_TIME: "once",
};

export default async function PricingPage() {
  const [plans, courses] = await Promise.all([
    listPlans(),
    listPublishedCourses({}),
  ]);

  const free = courses.filter((c) => c.priceMinor === 0);
  const paid = courses
    .filter((c) => c.priceMinor > 0)
    .sort((a, b) => a.priceMinor - b.priceMinor);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <header>
        <p className="eyebrow">Pricing</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-mist-100 sm:text-5xl">
          Start free. Pay when it&apos;s worth paying.
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-mist-300">
          The foundation course is free and always will be — it is the one that
          keeps people from losing money, so putting it behind a card would be
          indefensible. Everything else is priced per course, or bundled into a
          plan if you intend to work through several.
        </p>
      </header>

      {/* Plans ------------------------------------------------------------ */}
      {plans.length > 0 && (
        <section className="mt-12">
          <h2 className="eyebrow-wide">Plans</h2>
          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            {plans.map((plan, i) => {
              // The middle plan is the one most people should pick, so it gets
              // the single gold surface on the page.
              const featured = plans.length === 3 && i === 1;
              return (
                <Card
                  key={plan.id}
                  variant={featured ? "gold" : "default"}
                  pad="wide"
                  className="flex flex-col"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base font-bold text-mist-100">
                      {plan.name}
                    </h3>
                    {featured && <Pill tone="gold">Most chosen</Pill>}
                  </div>

                  <p className="mt-4 flex items-baseline gap-1.5">
                    <span className="text-[32px] leading-none font-extrabold text-mist-100">
                      {plan.priceMinor === 0
                        ? "Free"
                        : formatMoney(plan.priceMinor, plan.currency)}
                    </span>
                    {plan.priceMinor > 0 && (
                      <span className="text-xs font-medium text-mist-400">
                        {INTERVAL_LABEL[plan.interval] ?? ""}
                      </span>
                    )}
                  </p>

                  {plan.description && (
                    <p className="mt-3 text-[12.5px] leading-[1.65] text-mist-400">
                      {plan.description}
                    </p>
                  )}

                  {plan.trialDays > 0 && (
                    <p className="mt-2 text-[11px] font-semibold text-growth-500">
                      {plan.trialDays}-day trial, no card required
                    </p>
                  )}

                  <ul className="mt-4 flex-1 space-y-2.5 border-t border-rule pt-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-2.5">
                        <span className="mt-px shrink-0 text-growth-500">
                          <Icon name="check" size={13} strokeWidth={2.5} />
                        </span>
                        <span className="text-[12px] leading-[1.55] text-mist-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <LinkButton href="/register" className="mt-5 w-full" size="lg">
                    {plan.priceMinor === 0 ? "Start free" : "Choose this plan"}
                  </LinkButton>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* Per-course ------------------------------------------------------- */}
      <section className="mt-14">
        <h2 className="eyebrow-wide">Or pay per course</h2>
        <p className="mt-3 max-w-2xl text-sm leading-[1.7] text-mist-400">
          One payment, lifetime access, including every future update to that
          course. No subscription required.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[...free, ...paid].map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.slug}`}
              className="surface flex items-center justify-between gap-4 p-4 transition-colors hover:border-gold-500/50"
            >
              <div className="min-w-0">
                <p className="truncate text-[13px] font-bold text-mist-100">
                  {course.title}
                </p>
                <p className="mt-1 text-[10.5px] font-medium text-mist-400">
                  {course.category.name} · {course.level.toLowerCase()}
                </p>
              </div>
              <span
                className={`shrink-0 text-sm font-bold ${
                  course.priceMinor === 0 ? "text-growth-500" : "text-mist-100"
                }`}
              >
                {course.priceMinor === 0
                  ? "Free"
                  : formatMoney(course.priceMinor, course.currency)}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* What we don't do ------------------------------------------------- */}
      <section className="mt-14 border-t border-rule pt-12">
        <h2 className="eyebrow-wide">On billing, plainly</h2>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Card pad="wide">
            <ul className="space-y-3">
              <Fact>
                Every price is shown in full before you pay. No fees appear at
                checkout that were not on the page.
              </Fact>
              <Fact>
                Payments are processed by Flutterwave — card, bank transfer, USSD
                and mobile money. We never see or store your card details.
              </Fact>
              <Fact>
                A course purchase is lifetime access to that course. It does not
                expire if you stop paying for a plan.
              </Fact>
              <Fact>
                Maby Academy never takes custody of your funds and never executes
                a trade on your behalf.
              </Fact>
            </ul>
          </Card>

          <Card pad="wide">
            <p className="eyebrow">Refunds</p>
            <p className="mt-3 text-[12.5px] leading-[1.7] text-mist-400">
              Refunds are handled by a person rather than a button. A refund also
              reverses any referral commission earned on that purchase, and that
              reversal has to be correct — so it goes through support with your
              invoice number, and is answered within one working day.
            </p>
            <p className="mt-3 text-[12.5px] leading-[1.7] text-mist-400">
              If a course was not what the page said it was, say so and you will
              get your money back. If you simply did not do the work, we will
              tell you that plainly instead of pretending otherwise.
            </p>
            <LinkButton
              href="/dashboard/support"
              variant="secondary"
              size="sm"
              className="mt-4"
            >
              Contact support
            </LinkButton>
          </Card>
        </div>
      </section>
    </div>
  );
}

function Fact({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <span className="mt-px shrink-0 text-gold-500">
        <Icon name="check" size={14} strokeWidth={2.5} />
      </span>
      <span className="text-[12.5px] leading-[1.65] text-mist-300">{children}</span>
    </li>
  );
}
