import Link from "next/link";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";
import { listPublishedCourses } from "@/server/services/courses";
import { LinkButton, Card, Pill, StatTile } from "@/components/ui";
import { CourseCard } from "@/components/CourseCard";

export const dynamic = "force-dynamic";

const PILLARS = [
  {
    emoji: "₿",
    title: "Crypto & Web3",
    body: "Wallets, self-custody, DeFi, tokenomics and the mental models that keep you from being exit liquidity.",
  },
  {
    emoji: "🔍",
    title: "On-chain analysis",
    body: "Read the chain yourself. Follow smart money, spot distribution, and value a protocol on its actual usage.",
  },
  {
    emoji: "📈",
    title: "Trading & markets",
    body: "Risk first, entries second. Position sizing, journalling and the discipline that separates traders from gamblers.",
  },
  {
    emoji: "💼",
    title: "Finance & business",
    body: "Cash flow, budgeting, building income that survives a bear market, and turning skills into an actual business.",
  },
  {
    emoji: "🙏",
    title: "Faith & purpose",
    body: "Character before capital. Stewardship, integrity and the conviction that makes wealth worth having.",
  },
  {
    emoji: "💪",
    title: "Health & mindset",
    body: "Sleep, training, focus and emotional regulation — because a broken body cannot hold a big vision.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Enrol and get your dashboard",
    body: "One account, your own login, and a dashboard that tracks every lesson, grade, streak and certificate in one place.",
  },
  {
    n: "02",
    title: "Learn, then prove it",
    body: "Video and written lessons, then quizzes and real assignments. An instructor reads your work and grades it against a rubric.",
  },
  {
    n: "03",
    title: "Show up live",
    body: "Scheduled sessions with the community — RSVP, attend, earn points, and watch the replay if life happens.",
  },
  {
    n: "04",
    title: "Earn what you've earned",
    body: "Points, badges and streaks as you go. A serialised, publicly verifiable certificate when you finish.",
  },
];

export default async function HomePage() {
  const [user, courses, studentCount, certificateCount, lessonCount] =
    await Promise.all([
      getCurrentUser(),
      listPublishedCourses(),
      db.user.count({ where: { role: "STUDENT", isActive: true } }),
      db.certificate.count({ where: { revokedAt: null } }),
      db.lesson.count(),
    ]);

  const featured = courses.slice(0, 3);

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:pt-24">
        <Pill tone="gold">A growth academy, not a signal group</Pill>

        <h1 className="mt-6 text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05] max-w-3xl">
          Learn crypto properly.
          <br />
          <span className="text-gradient-gold">Grow everything else too.</span>
        </h1>

        <p className="mt-6 text-lg text-mist-300 max-w-2xl leading-relaxed">
          Maby Academy teaches Web3, on-chain analysis and finance with the
          structure of a real school — assignments, grading, mentorship and
          verifiable certificates. Alongside it, we build the parts of you that
          make the money mean something: faith, health and mindset.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <LinkButton href={user ? "/dashboard" : "/register"} size="lg">
            {user ? "Go to my dashboard" : "Join the academy — free to start"}
          </LinkButton>
          <LinkButton href="/courses" variant="secondary" size="lg">
            Browse the curriculum
          </LinkButton>
        </div>

        <dl className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatTile label="Courses live" value={courses.length} icon="📚" />
          <StatTile label="Lessons" value={lessonCount} icon="🎬" />
          <StatTile label="Members" value={studentCount} icon="👥" />
          <StatTile label="Certificates issued" value={certificateCount} icon="🎓" />
        </dl>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Pillars                                                           */}
      {/* ---------------------------------------------------------------- */}
      <section id="pillars" className="mx-auto max-w-6xl px-4 py-16 scroll-mt-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight">
            Six pillars. One person.
          </h2>
          <p className="mt-3 text-mist-300 leading-relaxed">
            Most crypto education stops at charts. That produces people who can
            read a candle and nothing else. We teach the whole stack of a life
            that can actually hold wealth.
          </p>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <Card key={p.title} className="hover:border-ink-500 transition-colors">
              <div className="text-2xl" aria-hidden>
                {p.emoji}
              </div>
              <h3 className="mt-3 font-semibold text-mist-100">{p.title}</h3>
              <p className="mt-2 text-sm text-mist-400 leading-relaxed">
                {p.body}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* How it works                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section id="how" className="mx-auto max-w-6xl px-4 py-16 scroll-mt-20">
        <h2 className="text-3xl font-semibold tracking-tight">
          How the academy works
        </h2>

        <div className="mt-9 grid gap-4 md:grid-cols-2">
          {STEPS.map((s) => (
            <Card key={s.n} className="flex gap-4">
              <span className="text-sm font-mono font-semibold text-gold-500 shrink-0">
                {s.n}
              </span>
              <div>
                <h3 className="font-semibold text-mist-100">{s.title}</h3>
                <p className="mt-1.5 text-sm text-mist-400 leading-relaxed">
                  {s.body}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Featured courses                                                  */}
      {/* ---------------------------------------------------------------- */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold tracking-tight">
              Start here
            </h2>
            <Link
              href="/courses"
              className="text-sm text-gold-400 hover:text-gold-300"
            >
              See all courses →
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Referral CTA                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="surface p-8 sm:p-12 text-center">
          <Pill tone="growth">Grow together</Pill>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight">
            Bring your people. Get rewarded for it.
          </h2>
          <p className="mt-3 text-mist-300 max-w-xl mx-auto leading-relaxed">
            Every member gets a referral code and a multi-level commission on
            what their network learns and buys — plus points the moment someone
            joins with your link.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <LinkButton href={user ? "/dashboard/referrals" : "/register"} size="lg">
              {user ? "Open my referral dashboard" : "Claim my referral code"}
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
