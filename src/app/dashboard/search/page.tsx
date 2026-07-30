import Link from "next/link";
import type { Metadata } from "next";
import { requireUser } from "@/lib/auth/session";
import { SEARCH_KINDS, search, type SearchKind } from "@/server/services/search";
import { EmptyState, Pill } from "@/components/ui";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Search" };
export const dynamic = "force-dynamic";

const KIND_TONES: Record<SearchKind, "gold" | "info" | "growth" | "ember" | "neutral"> = {
  course: "gold",
  lesson: "info",
  assignment: "ember",
  post: "neutral",
  certificate: "growth",
  journal: "neutral",
};

const VALID_KINDS = new Set<string>(SEARCH_KINDS.map((k) => k.value));

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; kind?: string }>;
}) {
  const user = await requireUser();
  const params = await searchParams;

  const q = (params.q ?? "").slice(0, 120);
  // An unknown `kind` in the URL must narrow to nothing rather than being
  // silently ignored, or a typo quietly returns the unfiltered set.
  const activeKind =
    params.kind && VALID_KINDS.has(params.kind) ? (params.kind as SearchKind) : undefined;

  const results = q
    ? await search({
        userId: user.id,
        query: q,
        kinds: activeKind ? [activeKind] : undefined,
      })
    : [];

  const hrefWith = (kind?: SearchKind) => {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (kind) sp.set("kind", kind);
    const s = sp.toString();
    return s ? `/dashboard/search?${s}` : "/dashboard/search";
  };

  return (
    <div className="max-w-[800px]">
      {/* A GET form so a search is a URL: shareable, bookmarkable, and it
          survives a refresh. */}
      <form action="/dashboard/search">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search lessons, assignments, posts, certificates…"
          aria-label="Search the academy"
          autoFocus
          className="w-full rounded-[10px] border border-gold-500/30 bg-ink-850 px-[18px] py-4 text-sm font-medium text-mist-100 transition-colors outline-none placeholder:text-mist-400/60 focus:border-gold-500"
        />
        {activeKind && <input type="hidden" name="kind" value={activeKind} />}
      </form>

      <nav className="my-4 flex flex-wrap gap-2" aria-label="Filter results">
        <FilterChip href={hrefWith()} active={!activeKind}>
          Everything
        </FilterChip>
        {SEARCH_KINDS.map((k) => (
          <FilterChip
            key={k.value}
            href={hrefWith(k.value)}
            active={activeKind === k.value}
          >
            {k.label}
          </FilterChip>
        ))}
      </nav>

      {!q ? (
        <p className="mt-6 text-xs leading-[1.7] text-mist-400">
          Search across everything you have access to — course content, your
          assignments, community discussion, your certificates and your own
          journal.
        </p>
      ) : results.length === 0 ? (
        <EmptyState
          icon="search"
          title={`Nothing found for “${q}”`}
          description="Try fewer words, or a different filter. Lesson content is only searchable for courses you're enrolled in."
        />
      ) : (
        <div className="flex flex-col gap-2.5">
          {results.map((hit, i) => (
            <Link
              key={`${hit.kind}-${hit.href}-${i}`}
              href={hit.href}
              className="surface rounded-[var(--radius-inset)] p-[18px] transition-colors hover:border-gold-500/40"
            >
              <div className="flex flex-wrap items-center gap-2.5">
                <Pill tone={KIND_TONES[hit.kind]} shape="tag">
                  {hit.kind}
                </Pill>
                <span className="text-[13px] leading-[1.3] font-bold text-mist-100">
                  {hit.title}
                </span>
              </div>
              {hit.snippet && (
                <p className="mt-2.5 line-clamp-2 text-[11.5px] leading-[1.6] text-mist-400">
                  {hit.snippet}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}

      <p className="mt-5 text-[11px] leading-[1.55] text-mist-400/70">
        Results are permission-aware — you only ever see what your enrolment and
        role allow. Your journal is searchable by you alone; no other member and
        no administrator can search it.
      </p>
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
        "rounded-full border px-3.5 py-2.5 text-[11px] font-semibold whitespace-nowrap transition-colors",
        active
          ? "border-gold-500 bg-gold-500 text-ink-950"
          : "border-rule-strong bg-ink-850 text-mist-300 hover:border-gold-500/50 hover:text-gold-400",
      )}
    >
      {children}
    </Link>
  );
}
