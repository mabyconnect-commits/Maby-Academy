import Link from "next/link";
import type { Metadata } from "next";
import { listSchools } from "@/server/services/schools";
import { Card, EmptyState, LinkButton, Pill } from "@/components/ui";
import { Icon, type IconName } from "@/components/Icon";
import { pluralize } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Schools",
  description:
    "The six schools of Maby Academy — crypto and Web3, on-chain analysis, trading and risk, money and business, faith and purpose, health and mindset.",
};

export const dynamic = "force-dynamic";

const PILLAR_ICONS: Record<string, IconName> = {
  CRYPTO: "wallet",
  TRADING: "chart",
  FINANCE: "card",
  FAITH: "journal",
  HEALTH: "seedling",
  MINDSET: "target",
};

export default async function SchoolsPage() {
  const schools = await listSchools();

  if (schools.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-14">
        <EmptyState
          icon="building"
          title="No schools published yet"
          description="Schools group the academy's courses into pillars. They appear here once published."
          action={<LinkButton href="/courses">Browse courses instead</LinkButton>}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <header>
        <p className="eyebrow">The academy</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-mist-100 sm:text-5xl">
          Schools
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-mist-300">
          A school is a pillar of the academy. Inside each are courses, and
          sometimes a programme — an ordered route through several courses with a
          stated outcome at the end.
        </p>
      </header>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {schools.map((school) => (
          <Card key={school.id} pad="wide">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span className="text-gold-500">
                  <Icon
                    name={PILLAR_ICONS[school.pillar] ?? "book"}
                    size={22}
                    strokeWidth={1.6}
                  />
                </span>
                <h2 className="mt-3 text-lg font-bold text-mist-100">
                  {school.name}
                </h2>
                {school.tagline && (
                  <p className="mt-1 text-xs font-medium text-gold-500">
                    {school.tagline}
                  </p>
                )}
              </div>
              {/* Honest count: published courses only. */}
              <Pill tone={school._count.courses > 0 ? "gold" : "neutral"}>
                {school._count.courses > 0
                  ? pluralize(school._count.courses, "course")
                  : "In development"}
              </Pill>
            </div>

            <p className="mt-3.5 text-[12.5px] leading-[1.7] text-mist-400">
              {school.description}
            </p>

            {school.programmes.length > 0 && (
              <div className="mt-4 border-t border-rule pt-3.5">
                <p className="text-[10px] font-bold tracking-[0.12em] text-mist-400 uppercase">
                  Programmes
                </p>
                <ul className="mt-2.5 space-y-1.5">
                  {school.programmes.map((programme) => (
                    <li key={programme.id} className="text-[12px] text-mist-300">
                      <span className="font-semibold">{programme.title}</span>
                      {programme.subtitle && (
                        <span className="text-mist-400"> — {programme.subtitle}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-rule pt-4">
              <LinkButton href={`/schools/${school.slug}`} size="sm">
                Open school
              </LinkButton>
              <Link
                href={`/courses`}
                className="text-[11px] font-semibold text-mist-400 hover:text-mist-200"
              >
                All courses →
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
