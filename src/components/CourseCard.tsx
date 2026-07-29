import Link from "next/link";
import { Pill, ProgressBar } from "@/components/ui";
import { formatMoney, pluralize } from "@/lib/utils";

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
};

export function CourseCard({ course, progressPercent }: CourseCardProps) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="surface p-5 flex flex-col hover:border-gold-600/50 transition-colors group"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-2xl" aria-hidden>
          {course.category.iconEmoji ?? "📘"}
        </span>
        <div className="flex gap-1.5">
          <Pill tone="neutral">{course.category.name}</Pill>
        </div>
      </div>

      <h3 className="mt-4 font-semibold text-mist-100 leading-snug group-hover:text-gold-300 transition-colors">
        {course.title}
      </h3>

      {course.subtitle && (
        <p className="mt-2 text-sm text-mist-400 leading-relaxed line-clamp-2">
          {course.subtitle}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-mist-400">
        <span className="capitalize">{course.level.toLowerCase()}</span>
        {course.lessonCount !== undefined && (
          <>
            <span aria-hidden>·</span>
            <span>{pluralize(course.lessonCount, "lesson")}</span>
          </>
        )}
        {course.estimatedHours > 0 && (
          <>
            <span aria-hidden>·</span>
            <span>{course.estimatedHours}h</span>
          </>
        )}
        {course.avgRating != null && (
          <>
            <span aria-hidden>·</span>
            <span className="text-gold-400">★ {course.avgRating}</span>
          </>
        )}
      </div>

      {progressPercent !== undefined ? (
        <div className="mt-4 pt-4 border-t border-ink-700">
          <ProgressBar value={progressPercent} showLabel />
        </div>
      ) : (
        <div className="mt-4 pt-4 border-t border-ink-700 flex items-center justify-between">
          <span className="text-sm font-semibold text-mist-100">
            {course.priceMinor === 0
              ? "Free"
              : formatMoney(course.priceMinor, course.currency)}
          </span>
          {course._count && (
            <span className="text-xs text-mist-400">
              {pluralize(course._count.enrollments, "student")}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
