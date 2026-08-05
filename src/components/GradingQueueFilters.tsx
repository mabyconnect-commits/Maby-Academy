import { Button, Card, Input, LinkButton, Select } from "@/components/ui";

/**
 * The grading queue's filter bar, shared by the instructor and admin pages.
 *
 * A GET form rather than client state: the page stays a server component, and
 * a filtered queue becomes a URL that can be bookmarked or handed to whoever
 * is covering next week.
 */
export function GradingQueueFilters({
  action,
  courses,
  selectedCourse,
  query,
}: {
  action: string;
  courses: { id: string; title: string }[];
  selectedCourse?: string;
  query?: string;
}) {
  const filtered = Boolean(selectedCourse || query);

  return (
    <Card pad="wide">
      <form className="flex flex-col gap-3 sm:flex-row sm:items-end" method="get">
        <label className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="eyebrow">Student</span>
          <Input
            type="search"
            name="q"
            defaultValue={query ?? ""}
            placeholder="Name or email"
          />
        </label>
        <label className="flex min-w-0 flex-col gap-1.5 sm:w-64">
          <span className="eyebrow">Course</span>
          <Select name="course" defaultValue={selectedCourse ?? ""}>
            <option value="">All courses</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </Select>
        </label>
        <div className="flex gap-2">
          <Button type="submit">Filter</Button>
          {filtered && (
            <LinkButton href={action} variant="ghost">
              Clear
            </LinkButton>
          )}
        </div>
      </form>
    </Card>
  );
}
