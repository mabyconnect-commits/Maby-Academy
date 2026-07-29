import Link from "next/link";
import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/session";
import { db } from "@/lib/db";
import {
  Avatar,
  Card,
  LinkButton,
  SectionHeading,
  StatTile,
  StatusPill,
} from "@/components/ui";
import { formatDate, formatMoney } from "@/lib/utils";

export const metadata: Metadata = { title: "Instructor overview" };
export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const staff = await requireRole("INSTRUCTOR", "ADMIN");
  const isAdmin = staff.role === "ADMIN";

  // Instructors see only their own courses; admins see everything.
  const courseScope = isAdmin ? {} : { instructorId: staff.id };
  const submissionScope = isAdmin
    ? {}
    : {
        assignment: {
          lesson: { module: { course: { instructorId: staff.id } } },
        },
      };

  const [
    courseCount,
    studentCount,
    pendingCount,
    certificateCount,
    revenue,
    courses,
    recentStudents,
  ] = await Promise.all([
    db.course.count({ where: courseScope }),
    db.enrollment.count({ where: { course: courseScope } }),
    db.submission.count({
      where: { status: { in: ["SUBMITTED", "UNDER_REVIEW"] }, ...submissionScope },
    }),
    db.certificate.count({ where: { course: courseScope, revokedAt: null } }),
    db.order.aggregate({
      where: { status: "PAID", course: courseScope },
      _sum: { amountMinor: true },
    }),
    db.course.findMany({
      where: courseScope,
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        _count: { select: { enrollments: true, modules: true } },
      },
    }),
    db.enrollment.findMany({
      where: { course: courseScope },
      orderBy: { enrolledAt: "desc" },
      take: 8,
      include: {
        user: { select: { name: true, email: true, avatarUrl: true } },
        course: { select: { title: true } },
      },
    }),
  ]);

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {isAdmin ? "Academy overview" : "Your teaching overview"}
          </h1>
          <p className="mt-1.5 text-sm text-mist-400">
            {isAdmin
              ? "Everything across Maby Academy."
              : "Scoped to the courses you teach."}
          </p>
        </div>
        {pendingCount > 0 && (
          <LinkButton href="/admin/grading">
            Grade {pendingCount} submission{pendingCount === 1 ? "" : "s"}
          </LinkButton>
        )}
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <StatTile label="Courses" value={courseCount} icon="📚" />
        <StatTile label="Enrolments" value={studentCount} icon="👥" />
        <StatTile label="Awaiting grade" value={pendingCount} icon="✍" />
        <StatTile label="Certificates" value={certificateCount} icon="🎓" />
        <StatTile
          label="Revenue"
          value={formatMoney(revenue._sum.amountMinor ?? 0)}
          icon="💰"
        />
      </div>

      <section>
        <SectionHeading title="Courses" />
        {courses.length === 0 ? (
          <Card>
            <p className="text-sm text-mist-400">
              No courses yet. Seed the database or create one directly to get
              started.
            </p>
          </Card>
        ) : (
          <Card className="p-0 overflow-x-auto">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="border-b border-ink-700 text-left text-xs uppercase tracking-wide text-mist-400">
                  <th className="px-4 py-3 font-medium">Course</th>
                  <th className="px-4 py-3 font-medium">Pillar</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Modules</th>
                  <th className="px-4 py-3 font-medium text-right">Students</th>
                  <th className="px-4 py-3 font-medium text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-800">
                {courses.map((c) => (
                  <tr key={c.id}>
                    <td className="px-4 py-3">
                      <Link
                        href={`/courses/${c.slug}`}
                        className="text-mist-100 hover:text-gold-300"
                      >
                        {c.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-mist-400">
                      {c.category.iconEmoji} {c.category.name}
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill status={c.status} />
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-mist-300">
                      {c._count.modules}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-mist-300">
                      {c._count.enrollments}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-mist-300">
                      {c.priceMinor === 0
                        ? "Free"
                        : formatMoney(c.priceMinor, c.currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </section>

      <section>
        <SectionHeading title="Recent enrolments" />
        {recentStudents.length === 0 ? (
          <Card>
            <p className="text-sm text-mist-400">No enrolments yet.</p>
          </Card>
        ) : (
          <div className="space-y-2.5">
            {recentStudents.map((e) => (
              <Card key={e.id} className="flex items-center gap-4">
                <Avatar name={e.user.name} src={e.user.avatarUrl} size={36} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-mist-100">
                    {e.user.name}
                  </p>
                  <p className="text-xs text-mist-400 truncate">
                    {e.course.title} · {formatDate(e.enrolledAt)}
                  </p>
                </div>
                <span className="text-xs tabular-nums text-mist-400 shrink-0">
                  {e.progressPercent}%
                </span>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
