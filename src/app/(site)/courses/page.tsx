import Link from "next/link";
import type { Metadata } from "next";
import { listCategories, listPublishedCourses } from "@/server/services/courses";
import { CourseCard } from "@/components/CourseCard";
import { EmptyState, LinkButton, Pill } from "@/components/ui";
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
        <Pill tone="gold">The curriculum</Pill>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight">
          {activeCategory ? activeCategory.name : "Every course in the academy"}
        </h1>
        <p className="mt-3 text-mist-300 max-w-2xl leading-relaxed">
          {activeCategory?.description ??
            "Start free, go deep. Every course carries assignments that a real instructor reads and grades, and ends in a verifiable certificate."}
        </p>
      </header>

      {/* Search ---------------------------------------------------------- */}
      <form action="/courses" className="mt-8 flex gap-2 max-w-md">
        {params.category && (
          <input type="hidden" name="category" value={params.category} />
        )}
        {params.level && <input type="hidden" name="level" value={params.level} />}
        <input
          type="search"
          name="q"
          defaultValue={params.q ?? ""}
          placeholder="Search courses…"
          aria-label="Search courses"
          className="flex-1 rounded-lg bg-ink-900 border border-ink-600 px-3.5 py-2.5 text-sm text-mist-100 placeholder:text-mist-400/60 focus:border-gold-500"
        />
        <button
          type="submit"
          className="rounded-lg bg-ink-800 border border-ink-600 px-4 text-sm text-mist-200 hover:bg-ink-700"
        >
          Search
        </button>
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
            >
              {cat.iconEmoji} {cat.name}
              <span className="ml-1 text-mist-400">{cat._count.courses}</span>
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
      <p className="mt-8 text-sm text-mist-400">
        {courses.length} {courses.length === 1 ? "course" : "courses"}
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
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
        active
          ? "bg-gold-500 border-gold-500 text-ink-950 font-medium"
          : "bg-ink-850 border-ink-600 text-mist-300 hover:border-ink-500 hover:text-mist-100",
      )}
    >
      {children}
    </Link>
  );
}
