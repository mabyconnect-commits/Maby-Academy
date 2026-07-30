import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSchoolBySlug } from "@/server/services/schools";
import { CourseCard } from "@/components/CourseCard";
import { Card, EmptyState, LinkButton, Pill } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { cn, pluralize } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const school = await getSchoolBySlug(slug);
  if (!school) return { title: "School not found" };
  return {
    title: school.name,
    description: school.tagline ?? school.description.slice(0, 155),
  };
}

export default async function SchoolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const school = await getSchoolBySlug(slug);
  if (!school) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <nav className="mb-6 text-sm text-mist-400" aria-label="Breadcrumb">
        <Link href="/schools" className="hover:text-mist-200">
          Schools
        </Link>
      </nav>

      <header>
        <p className="eyebrow">School</p>
        <h1 className="mt-3 text-4xl leading-tight font-semibold tracking-tight text-mist-100">
          {school.name}
        </h1>
        {school.tagline && (
          <p className="mt-3 text-lg leading-relaxed text-mist-300">
            {school.tagline}
          </p>
        )}
        <p className="mt-4 max-w-2xl border-t border-rule pt-5 text-sm leading-[1.75] text-mist-400">
          {school.description}
        </p>
      </header>

      {/* Programmes ------------------------------------------------------- */}
      {school.programmes.length > 0 && (
        <section className="mt-12">
          <p className="eyebrow-wide">Programmes</p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-mist-100">
            An ordered route, not a pile of courses
          </h2>

          <div className="mt-6 space-y-5">
            {school.programmes.map((programme) => {
              // Outcomes are Json in the schema, so narrow before rendering
              // rather than trusting the column's shape.
              const outcomes = Array.isArray(programme.outcomes)
                ? (programme.outcomes as unknown[]).filter(
                    (o): o is string => typeof o === "string",
                  )
                : [];

              return (
                <Card key={programme.id} variant="gold" pad="wide">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-mist-100">
                        {programme.title}
                      </h3>
                      {programme.subtitle && (
                        <p className="mt-1.5 text-[12.5px] text-mist-400">
                          {programme.subtitle}
                        </p>
                      )}
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <Pill tone="gold">
                        <span className="capitalize">
                          {programme.level.toLowerCase()}
                        </span>
                      </Pill>
                      {programme.estimatedWeeks > 0 && (
                        <Pill tone="neutral">
                          {pluralize(programme.estimatedWeeks, "week")}
                        </Pill>
                      )}
                    </div>
                  </div>

                  {outcomes.length > 0 && (
                    <ul className="mt-4 grid gap-2 border-t border-rule pt-4 sm:grid-cols-2">
                      {outcomes.map((outcome) => (
                        <li key={outcome} className="flex gap-2.5">
                          <span className="mt-px shrink-0 text-growth-500">
                            <Icon name="check" size={13} strokeWidth={2.5} />
                          </span>
                          <span className="text-[12px] leading-[1.55] text-mist-300">
                            {outcome}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {programme.courses.length > 0 && (
                    <ol className="mt-4 space-y-2 border-t border-rule pt-4">
                      {programme.courses.map((entry, i) => {
                        const published = entry.course.status === "PUBLISHED";
                        return (
                          <li key={entry.course.slug}>
                            {/* Unpublished courses in a route are shown but not
                                linked — hiding them would misrepresent the
                                route's length, and linking them would 404. */}
                            {published ? (
                              <Link
                                href={`/courses/${entry.course.slug}`}
                                className="surface-inset flex items-center gap-3.5 p-3.5 transition-colors hover:border-gold-500/45"
                              >
                                <Step index={i} />
                                <span className="min-w-0 flex-1 truncate text-[12.5px] font-semibold text-mist-100">
                                  {entry.course.title}
                                </span>
                                {!entry.isRequired && (
                                  <Pill tone="neutral" shape="tag">
                                    Optional
                                  </Pill>
                                )}
                              </Link>
                            ) : (
                              <div className="surface-inset flex items-center gap-3.5 p-3.5 opacity-60">
                                <Step index={i} />
                                <span className="min-w-0 flex-1 truncate text-[12.5px] font-semibold text-mist-300">
                                  {entry.course.title}
                                </span>
                                <Pill tone="ember" shape="tag">
                                  In development
                                </Pill>
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ol>
                  )}
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* Courses ---------------------------------------------------------- */}
      <section className="mt-12">
        <p className="eyebrow-wide">Courses in this school</p>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-mist-100">
          {school.courses.length > 0
            ? pluralize(school.courses.length, "course")
            : "Nothing published yet"}
        </h2>

        {school.courses.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              icon="book"
              title="No published courses in this school"
              description="Courses appear here once they pass editorial review. In the meantime the rest of the catalogue is open."
              action={<LinkButton href="/courses">Browse all courses</LinkButton>}
            />
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {school.courses.map((course) => (
              <CourseCard
                key={course.id}
                course={{
                  ...course,
                  lessonCount: course.modules.reduce(
                    (sum, m) => sum + m._count.lessons,
                    0,
                  ),
                }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Step({ index }: { index: number }) {
  return (
    <span
      className={cn(
        "grid size-6 shrink-0 place-items-center rounded-full border border-gold-500/35 text-[10px] font-bold text-gold-500 tabular-nums",
      )}
      aria-hidden
    >
      {index + 1}
    </span>
  );
}
