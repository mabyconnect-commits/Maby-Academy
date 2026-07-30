import Link from "next/link";
import type { Metadata } from "next";
import { listCategories, listPublishedCourses } from "@/server/services/courses";
import { CourseCard } from "@/components/CourseCard";
import { Button, EmptyState, Input, LinkButton } from "@/components/ui";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Crypto, Web3, on-chain analysis, finance, faith, health and mindset — the full Maby Academy curriculum.",
};

export const dynamic = "force-dynamic";

const LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; level?: string; q?: string }>;
}) {
  const params = await searchParams;

  const [categories, courses] = await Promise.all([
    listCategories(),
    listPublishedCourses({
      categorySlug: params.category,
      level: params.level,
      search: params.q,
    }),
  ]);

  /** Build a filter URL that preserves the other active filters. */
  const hrefWith = (patch: Record<string, string | undefined>) => {
    const merged = { ...params, ...patch };
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(merged)) if (v) qs.set(k, v);
    const s = qs.toString();
    return s ? `/courses?${s}` : "/courses";
  };

  const activeCategory = categories.find((c) => c.slug === params.category);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <header>
        <p className="eyebrow">The curriculum</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-mist-100 sm:text-5xl">
          {activeCategory ? activeCategory.name : "Every course in the academy"}
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-mist-300">
          {activeCategory?.description ??
            "Start free, go deep. Every course carries assignments that a real instructor reads and grades, and ends in a verifiable certificate."}
        </p>
      </header>

      {/* Search ---------------------------------------------------------- */}
      <form action="/courses" className="mt-8 flex max-w-md gap-2">
        {params.category && (
          <input type="hidden" name="category" value={params.category} />
        )}
        {params.level && <input type="hidden" name="level" value={params.level} />}
        <Input
          type="search"
          name="q"
          defaultValue={params.q ?? ""}
          placeholder="Search courses…"
          aria-label="Search courses"
          className="flex-1"
        />
        <Button type="submit" variant="secondary">
          Search
        </Button>
      </form>

      {/* Filters --------------------------------------------------------- */}
      <div className="mt-6 space-y-3">
        <nav className="flex flex-wrap gap-2" aria-label="Filter by pillar">
          <FilterChip href={hrefWith({ category: undefined })} active={!params.category}>
            All pillars
          </FilterChip>
          {categories.map((cat) => (
            <FilterChip
              key={cat.id}
              href={hrefWith({ category: cat.slug })}
              active={params.category === cat.slug}
              // A pillar with nothing published yet stays visible — it tells
              // people the academy is going there — but dimmed, so the chip
              // doesn't promise courses that aren't behind it.
              muted={cat._count.courses === 0}
            >
              {cat.iconEmoji} {cat.name}
              <span
                className={cn(
                  "ml-1.5 tabular-nums",
                  params.category === cat.slug ? "text-ink-950/60" : "text-mist-400",
                )}
              >
                {cat._count.courses}
              </span>
            </FilterChip>
          ))}
        </nav>

        <nav className="flex flex-wrap gap-2" aria-label="Filter by level">
          <FilterChip href={hrefWith({ level: undefined })} active={!params.level}>
            Any level
          </FilterChip>
          {LEVELS.map((level) => (
            <FilterChip
              key={level}
              href={hrefWith({ level })}
              active={params.level === level}
            >
              <span className="capitalize">{level.toLowerCase()}</span>
            </FilterChip>
          ))}
        </nav>
      </div>

      {/* Results --------------------------------------------------------- */}
      <p className="mt-8 border-t border-rule pt-5 text-sm text-mist-400">
        <span className="font-semibold text-mist-200 tabular-nums">
          {courses.length}
        </span>{" "}
        {courses.length === 1 ? "course" : "courses"}
        {params.q && ` matching “${params.q}”`}
      </p>

      {courses.length === 0 ? (
        <div className="mt-5">
          <EmptyState
            icon="🔍"
            title="Nothing matches those filters"
            description="Try a different pillar, level or search term — or browse the whole catalogue."
            action={
              <LinkButton href="/courses" variant="secondary">
                Clear filters
              </LinkButton>
            }
          />
        </div>
      ) : (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  href,
  active,
  muted = false,
  children,
}: {
  href: string;
  active: boolean;
  muted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm whitespace-nowrap transition-colors",
        active
          ? "border-gold-500 bg-gold-500 font-semibold text-ink-950"
          : "border-ink-600 bg-ink-850 text-mist-300 hover:border-gold-600/60 hover:text-gold-300",
        !active && muted && "opacity-55",
      )}
    >
      {children}
    </Link>
  );
}
