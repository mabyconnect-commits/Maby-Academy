import type { Metadata } from "next";
import { guardPermission } from "@/lib/auth/guard";
import { getCourseDropoff, listAuthoredCourses } from "@/server/services/authoring";
import { Card, EmptyState, PanelHead, StatTile } from "@/components/ui";
import { cn, pluralize } from "@/lib/utils";

export const metadata: Metadata = { title: "Course analytics" };
export const dynamic = "force-dynamic";

export default async function TeachAnalyticsPage() {
  const user = await guardPermission("course:create", "Course analytics");
  const courses = await listAuthoredCourses(user);
  const withStudents = courses.filter((c) => c.enrolledCount > 0);

  if (withStudents.length === 0) {
    return (
      <EmptyState
        icon="chart"
        title="No data yet"
        description="Analytics appear once students enrol. The most useful chart here is where they stop — it tells you which lesson to rewrite."
      />
    );
  }

  const dropoff = await Promise.all(
    withStudents.slice(0, 3).map(async (c) => ({
      course: c,
      lessons: await getCourseDropoff(user, c.id),
    })),
  );

  return (
    <div className="flex flex-col gap-5">
      {dropoff.map(({ course, lessons }) => {
        // The biggest single fall between consecutive lessons is the thing
        // worth acting on, so it is named rather than left to be eyeballed.
        let worst = { index: -1, drop: 0, title: "" };
        for (let i = 1; i < lessons.length; i++) {
          const drop = lessons[i - 1].completionRate - lessons[i].completionRate;
          if (drop > worst.drop) {
            worst = { index: i, drop, title: lessons[i].title };
          }
        }

        return (
          <Card key={course.id} pad="wide">
            <PanelHead title={course.title} className="mb-1.5" />
            <p className="mb-5 text-[11.5px] leading-[1.5] text-mist-400">
              Completion rate by lesson · {pluralize(course.enrolledCount, "student")}
            </p>

            <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
              <StatTile label="Enrolled" value={course.enrolledCount} />
              <StatTile
                label="Average completion"
                value={`${course.avgCompletion}%`}
                tone={course.avgCompletion >= 50 ? "growth" : "ember"}
              />
              <StatTile label="Lessons" value={lessons.length} />
              <StatTile
                label="Rating"
                value={course.avgRating != null ? `★ ${course.avgRating}` : "—"}
                tone="gold"
              />
            </div>

            {/* A monochrome gold bar chart, per the design's data-display rule
                — one series, never a rainbow. Bars carry an accessible label
                each, because a chart nobody can read is decoration. */}
            {/* The chart scrolls in its own box rather than compressing to
                fit. A forty-lesson course gives each bar under 8px at phone
                width — unreadable, and the labels overflow the page because a
                nowrap "L40" cannot shrink. A minimum bar width plus horizontal
                scroll keeps every bar legible and keeps the page the width of
                the screen. */}
            <div className="mt-5 -mx-1 overflow-x-auto px-1 pb-1">
              <div className="flex h-[130px] items-end gap-2">
                {lessons.map((l, i) => (
                  <div
                    key={l.id}
                    className="flex h-full min-w-[14px] flex-1 flex-col items-center justify-end gap-2"
                    title={`${l.title}: ${l.completionRate}% complete`}
                  >
                    <div
                      className={cn(
                        "w-full rounded-t-[4px]",
                        i === worst.index ? "bg-ember-500" : "bg-gold-500",
                      )}
                      style={{ height: `${Math.max(2, l.completionRate)}%` }}
                      role="img"
                      aria-label={`Lesson ${i + 1}, ${l.title}: ${l.completionRate} percent completed`}
                    />
                    <span className="text-[9px] font-semibold text-mist-400">
                      L{i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {worst.index > 0 && worst.drop >= 10 && (
              <p className="mt-4 border-t border-rule pt-3.5 text-[11.5px] leading-[1.5] font-medium text-ember-500">
                “{worst.title}” loses {worst.drop}% of the students who finished
                the lesson before it. Consider splitting it, or adding a worked
                example.
              </p>
            )}
          </Card>
        );
      })}
    </div>
  );
}
