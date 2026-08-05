import Link from "next/link";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";
import { listCategories, listPublishedCourses } from "@/server/services/courses";
import { Card, LinkButton, Pill, ProgressBar } from "@/components/ui";
import { Icon, type IconName } from "@/components/Icon";
import { CourseCard } from "@/components/CourseCard";

export const dynamic = "force-dynamic";

/**
 * The landing page, built to the design's hero: a two-column grid with the
 * headline on the left and a progress panel on the right, then the learning
 * tracks as numbered cards.
 *
 * Cormorant italic appears exactly once — on "yourself." in the headline. The
 * design reserves the serif for ceremonial moments (a certificate, a recipient's
 * name), and one word in the hero is the only place on the marketing site that
 * earns it. Used twice it would become decoration.
 */

/** Pillar icons, mapped from the seeded category slugs. */
const PILLAR_ICONS: Record<string, IconName> = {
  "crypto-foundations": "wallet",
  "on-chain-analysis": "search",
  "trading-and-risk": "chart",
  "money-and-business": "card",
  "faith-and-purpose": "journal",
  "health-and-mindset": "seedling",
};

const STEPS = [
  {
    title: "Answer four questions",
    body: "Where you're starting, what you're here for, which pillars you want, and how much time you actually have. Two minutes, and it builds your path.",
  },
  {
    title: "Learn, then prove it",
    body: "Written and video lessons, then a quiz or a real assignment. Opening a page never completes a lesson — that rule is the whole reason a certificate means anything.",
  },
  {
    title: "Get read by a person",
    body: "Assignments are graded against a published rubric by an instructor who writes you feedback. Not a score from a script.",
  },
  {
    title: "Leave with something verifiable",
    body: "A serialised certificate anyone can check on a public page, carrying what you completed and the score you earned.",
  },
];

export default async function HomePage() {
  const [user, courses, categories, lessonCount, studentCount, certificateCount] =
    await Promise.all([
      getCurrentUser(),
      listPublishedCourses({}),
      listCategories(),
      db.lesson.count(),
      db.user.count({ where: { role: "STUDENT", isActive: true } }),
      db.certificate.count({ where: { revokedAt: null } }),
    ]);

  const featured = courses.slice(0, 6);

  return (
    <>
      {/* ================================================================= */}
      {/* Hero                                                              */}
      {/* ================================================================= */}
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:gap-14 sm:py-20 lg:grid-cols-2 lg:py-24">
        {/* min-w-0: a grid item defaults to min-width:auto, so its widest
            unbreakable content sizes the track — and the track can then exceed
            the container, pushing the page wider than the screen. */}
        <div className="min-w-0">
          <p className="text-[11px] font-semibold tracking-[0.34em] text-gold-500 uppercase">
            Crypto · Finance · Faith · Wellness
          </p>

          <h1 className="mt-5 text-[36px] leading-[1.08] font-black tracking-tight text-mist-100 sm:text-[46px] lg:text-[54px]">
            Learn the markets.
            <br />
            Master{" "}
            <span className="font-display text-[38px] leading-none text-gold-500 sm:text-[50px] lg:text-[58px]">
              yourself.
            </span>
          </h1>

          <p className="mt-5 max-w-[460px] text-base leading-[1.7] text-mist-400">
            Structured tracks in Web3, on-chain analysis, personal finance and
            whole-life growth — with progress tracking, assignments a real
            instructor grades, certificates, and a community that rises together.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href={user ? "/dashboard" : "/register"} size="lg">
              {user ? "Go to my dashboard" : "Start learning free"}
            </LinkButton>
            <LinkButton href="/courses" variant="secondary" size="lg">
              View tracks
            </LinkButton>
          </div>

          {/* Real counts from the database, never marketing figures. If the
              academy is small today, these say so. */}
          <dl className="mt-8 flex flex-wrap gap-x-9 gap-y-5 sm:mt-11">
            <Stat value={courses.length} label="Courses live" />
            <Stat value={lessonCount} label="Lessons" />
            <Stat value={studentCount} label="Members" />
            <Stat value={certificateCount} label="Certificates issued" gold />
          </dl>
        </div>

        <HeroPanel user={user} courses={featured} lessonCount={lessonCount} />
      </section>

      {/* ================================================================= */}
      {/* Learning tracks                                                   */}
      {/* ================================================================= */}
      <section className="mx-auto max-w-6xl px-4 pb-14 sm:pb-24" id="pillars">
        <p className="eyebrow-wide">Learning tracks</p>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-mist-100 sm:text-[32px]">
          Six pillars, one person
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-[1.7] text-mist-400">
          Finance without character produces reckless traders, which is why the
          pillars are taught together. Faith and health are entirely optional —
          chosen by you during onboarding, and switchable off at any time.
        </p>

        <div className="mt-8 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => (
            <Link
              key={category.id}
              href={`/courses?category=${category.slug}`}
              className="surface group rounded-[var(--radius-tile)] p-6 transition-colors hover:border-gold-500/50"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[22px] leading-none font-extrabold text-gold-500 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-gold-500/70">
                  <Icon
                    name={PILLAR_ICONS[category.slug] ?? "book"}
                    size={20}
                    strokeWidth={1.6}
                  />
                </span>
              </div>
              <h3 className="mt-3 text-base leading-[1.3] font-bold text-mist-100 transition-colors group-hover:text-gold-300">
                {category.name}
              </h3>
              <p className="mt-2 text-[12.5px] leading-[1.6] text-mist-400">
                {category.description}
              </p>
              <p className="mt-4 text-[11px] font-semibold text-gold-500">
                {category._count.courses === 0
                  ? "Coming soon"
                  : `${category._count.courses} ${
                      category._count.courses === 1 ? "course" : "courses"
                    } →`}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* How it works                                                      */}
      {/* ================================================================= */}
      <section
        className="mx-auto max-w-6xl border-t border-rule px-4 py-14 sm:py-20"
        id="how"
      >
        <p className="eyebrow-wide">How it works</p>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-mist-100 sm:text-[32px]">
          Completion is earned, not clicked
        </h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div key={step.title}>
              <span className="grid size-8 place-items-center rounded-full border border-gold-500/35 text-xs font-bold text-gold-500 tabular-nums">
                {i + 1}
              </span>
              <h3 className="mt-3.5 text-sm leading-[1.35] font-bold text-mist-100">
                {step.title}
              </h3>
              <p className="mt-2 text-[12.5px] leading-[1.65] text-mist-400">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* Featured courses                                                  */}
      {/* ================================================================= */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl border-t border-rule px-4 py-14 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow-wide">Start here</p>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-mist-100 sm:text-[32px]">
                Courses open now
              </h2>
            </div>
            <Link
              href="/courses"
              className="-my-2 inline-flex items-center py-2 text-[11px] font-semibold text-gold-500 hover:text-gold-400"
            >
              Every course →
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      )}

      {/* ================================================================= */}
      {/* The promises                                                      */}
      {/* ================================================================= */}
      <section className="mx-auto max-w-6xl border-t border-rule px-4 py-14 sm:py-20">
        <p className="eyebrow-wide">What we will and won&apos;t do</p>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-mist-100 sm:text-[32px]">
          Responsibility, in the product
        </h2>
        {/* This line introduces the two cards below it. It used to describe how
            the promises were built rather than what they say, which told a
            first-time reader nothing about what they were looking at. */}
        <p className="mt-3 max-w-2xl text-sm leading-[1.7] text-mist-400">
          Two lists. The first is what nobody here will ever do — not support,
          not an instructor, not the founder. The second is what happens every
          time, whether or not you ask for it.
        </p>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <Card variant="gold" pad="wide">
            <p className="eyebrow">Never, under any circumstances</p>
            <ul className="mt-4 space-y-3">
              <Vow no>
                Ask for your seed phrase, private key or recovery phrase — not
                support, not an instructor, not the founder
              </Vow>
              <Vow no>Take custody of your funds, or execute a trade</Vow>
              <Vow no>Tell you what to buy, or predict a price</Vow>
              <Vow no>
                Let any role — including super administrator — read your private
                journal
              </Vow>
            </ul>
          </Card>

          <Card pad="wide">
            <p className="eyebrow">Always</p>
            <ul className="mt-4 space-y-3">
              <Vow>
                Gate every lesson on a real condition, so a certificate reflects
                work rather than clicks
              </Vow>
              <Vow>
                Have a person read and grade your assignments against a published
                rubric
              </Vow>
              <Vow>
                Make every certificate publicly verifiable by serial, and mark a
                revoked one rather than deleting it
              </Vow>
              <Vow>State plainly that this is education, not financial advice</Vow>
            </ul>
          </Card>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Final call                                                        */}
      {/* ================================================================= */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <Card variant="raised" pad="none" className="p-8 text-center sm:p-14">
          <p className="eyebrow-wide">Start free</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-2xl leading-[1.2] font-extrabold tracking-tight text-mist-100 sm:text-[34px]">
            The first course costs nothing, and it is the one that matters most.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-[1.7] text-mist-400">
            Own your keys before you own anything else. Twelve hours, no card, and
            no upsell in the middle.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <LinkButton href={user ? "/courses" : "/register"} size="lg">
              {user ? "Browse courses" : "Create a free account"}
            </LinkButton>
            <LinkButton href="/verify" variant="secondary" size="lg">
              Verify a certificate
            </LinkButton>
          </div>
        </Card>
      </section>
    </>
  );
}

function Stat({
  value,
  label,
  gold = false,
}: {
  value: number;
  label: string;
  gold?: boolean;
}) {
  return (
    <div>
      <dd
        className={`text-[26px] leading-none font-extrabold tabular-nums ${
          gold ? "text-gold-500" : "text-mist-100"
        }`}
      >
        {value.toLocaleString()}
      </dd>
      <dt className="mt-1.5 text-[11px] leading-[1.4] font-medium text-mist-400">
        {label}
      </dt>
    </div>
  );
}

function Vow({ no = false, children }: { no?: boolean; children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <span className={`mt-px shrink-0 ${no ? "text-flag-500" : "text-growth-500"}`}>
        <Icon name={no ? "flag" : "check"} size={14} strokeWidth={2.5} />
      </span>
      <span className="text-[12.5px] leading-[1.6] text-mist-300">{children}</span>
    </li>
  );
}

/**
 * The hero's right-hand panel.
 *
 * A signed-in member sees their actual enrolments. A visitor sees what the
 * dashboard looks like, explicitly labelled "Example" — the design's mock panel
 * showed "LEVEL 7 · 2,140 XP" and three part-finished tracks, and presenting
 * that as real progress would be a fabricated screenshot of somebody's account.
 */
async function HeroPanel({
  user,
  courses,
  lessonCount,
}: {
  user: Awaited<ReturnType<typeof getCurrentUser>>;
  courses: Awaited<ReturnType<typeof listPublishedCourses>>;
  lessonCount: number;
}) {
  const enrolments = user
    ? await db.enrollment.findMany({
        where: { userId: user.id },
        orderBy: [{ lastAccessedAt: "desc" }],
        take: 3,
        select: {
          id: true,
          progressPercent: true,
          course: { select: { title: true, slug: true } },
        },
      })
    : [];

  const showReal = enrolments.length > 0;

  return (
    // min-w-0 so this grid item can shrink below the min-content width of its
    // course titles. Without it the track grows to fit the longest title and
    // the whole page ends up wider than the screen — the titles truncate only
    // once the item is allowed to be narrower than they are.
    <Card variant="raised" pad="none" className="min-w-0 p-6">
      <div className="mb-[18px] flex flex-wrap items-center justify-between gap-2.5">
        <span className="text-[13px] font-bold text-mist-100">
          {showReal ? "Your progress" : "What your dashboard looks like"}
        </span>
        {showReal && user ? (
          <Pill tone="gold">{user.lifetimePoints.toLocaleString()} XP</Pill>
        ) : (
          <Pill tone="neutral">Example</Pill>
        )}
      </div>

      <div className="space-y-3.5">
        {showReal
          ? enrolments.map((e) => (
              <Link key={e.id} href={`/courses/${e.course.slug}`} className="block">
                <div className="mb-[7px] flex items-center justify-between gap-3">
                  <span className="min-w-0 flex-1 truncate text-xs font-semibold text-mist-200">
                    {e.course.title}
                  </span>
                  <span className="shrink-0 text-xs font-bold text-gold-500 tabular-nums">
                    {e.progressPercent}%
                  </span>
                </div>
                <ProgressBar value={e.progressPercent} />
              </Link>
            ))
          : courses.slice(0, 3).map((course) => (
              <div key={course.id}>
                <div className="mb-[7px] flex items-center justify-between gap-3">
                  <span className="min-w-0 flex-1 truncate text-xs font-semibold text-mist-200">
                    {course.title}
                  </span>
                  <span className="shrink-0 text-xs font-bold text-mist-400 tabular-nums">
                    0%
                  </span>
                </div>
                <ProgressBar value={0} />
              </div>
            ))}
      </div>

      <div className="mt-5 flex items-center gap-2.5 border-t border-rule pt-[18px]">
        <span className="shrink-0 text-gold-500">
          <Icon name="award" size={18} strokeWidth={2} />
        </span>
        <span className="text-xs leading-[1.4] text-mist-400">
          {showReal
            ? "Next milestone: your first verifiable certificate"
            : `${lessonCount} lessons, each gated on real work`}
        </span>
      </div>
    </Card>
  );
}
