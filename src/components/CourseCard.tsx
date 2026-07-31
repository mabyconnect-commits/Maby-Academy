import Link from "next/link";
import { Pill, ProgressBar } from "@/components/ui";
import { cn, formatMoney, pluralize } from "@/lib/utils";

type CourseCardProps = {
  course: {
    id: string;
    title: string;
    slug: string;
    subtitle: string | null;
    level: string;
    priceMinor: number;
    currency: string;
    estimatedHours: number;
    lessonCount?: number;
    avgRating?: number | null;
    category: { name: string; iconEmoji: string | null };
    instructor?: { name: string };
    _count?: { enrollments: number };
  };
  /** When present the card renders as an enrolled card with progress. */
  progressPercent?: number;
  /**
   * Marks the one card on a screen worth pulling the eye to — the course a
   * learner should resume, or a featured programme. Gold is a scarce resource
   * in this design; a grid where every card is gold communicates nothing.
   */
  featured?: boolean;
};

const LEVEL_TONES: Record<string, "growth" | "gold" | "flag"> = {
  BEGINNER: "growth",
  INTERMEDIATE: "gold",
  ADVANCED: "flag",
};

export function CourseCard({
  course,
  progressPercent,
  featured = false,
}: CourseCardProps) {
  const complete = progressPercent !== undefined && progressPercent >= 100;

  return (
    <Link
      href={`/courses/${course.slug}`}
      className={cn(
        featured ? "surface-gold" : "surface",
        // The border is the hover affordance rather than a lift or a shadow:
        // a grid of cards that all jump on hover is noisy, and the gold edge
        // reads as "selectable" without moving anything.
        "group flex flex-col p-5 transition-colors hover:border-gold-500/45",
      )}
    >
      {/* The category is set as an eyebrow rather than a chip, so it doesn't
          compete with the level pill for attention — it labels the card. */}
      <div className="flex items-start justify-between gap-3">
        <p className="eyebrow flex items-center gap-1.5">
          <span aria-hidden>{course.category.iconEmoji ?? "📘"}</span>
          {course.category.name}
        </p>
        {complete ? (
          <Pill tone="growth">✓ Complete</Pill>
        ) : (
          <Pill tone={LEVEL_TONES[course.level] ?? "neutral"}>
            <span className="capitalize">{course.level.toLowerCase()}</span>
          </Pill>
        )}
      </div>

      <h3 className="mt-3.5 text-[1.0625rem] font-semibold leading-snug text-mist-100 transition-colors group-hover:text-gold-300">
        {course.title}
      </h3>

      {course.subtitle && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-mist-400">
          {course.subtitle}
        </p>
      )}

      {/* Pushes the meta row and footer to the bottom so cards in a grid line
          up regardless of how long their titles run. */}
      <div className="flex-1" />

      <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs text-mist-400">
        {course.lessonCount !== undefined && (
          <span>{pluralize(course.lessonCount, "lesson")}</span>
        )}
        {course.estimatedHours > 0 && (
          <>
            {course.lessonCount !== undefined && <span aria-hidden>·</span>}
            <span>{course.estimatedHours}h</span>
          </>
        )}
        {course.avgRating != null && (
          <>
            <span aria-hidden>·</span>
            <span className="text-gold-400">★ {course.avgRating}</span>
          </>
        )}
        {course.instructor && (
          <>
            <span aria-hidden>·</span>
            <span className="min-w-0 truncate">{course.instructor.name}</span>
          </>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-rule pt-4">
        {progressPercent !== undefined ? (
          <ProgressBar value={progressPercent} showLabel className="flex-1" />
        ) : (
          <>
            <span
              className={cn(
                "text-sm font-semibold",
                course.priceMinor === 0 ? "text-growth-500" : "text-mist-100",
              )}
            >
              {course.priceMinor === 0
                ? "Free"
                : formatMoney(course.priceMinor, course.currency)}
            </span>
            {course._count && (
              <span className="text-xs text-mist-400">
                {pluralize(course._count.enrollments, "student")}
              </span>
            )}
          </>
        )}
      </div>
    </Link>
  );
}
