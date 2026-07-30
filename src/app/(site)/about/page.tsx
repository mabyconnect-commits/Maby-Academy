import type { Metadata } from "next";
import { db } from "@/lib/db";
import { Card, LinkButton } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { Avatar } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "Maby Academy is an accountability institution — Web3 and finance education joined to faith, health and discipline, with work that a real person grades.",
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  // Instructors are read from the database rather than hard-coded, so this page
  // cannot advertise a teacher who has left.
  const instructors = await db.user.findMany({
    where: {
      isActive: true,
      OR: [
        { role: { in: ["INSTRUCTOR", "ADMIN", "SUPER_ADMIN", "MENTOR"] } },
        { taughtCourses: { some: { status: "PUBLISHED" } } },
      ],
    },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      name: true,
      bio: true,
      avatarUrl: true,
      role: true,
      _count: { select: { taughtCourses: { where: { status: "PUBLISHED" } } } },
    },
  });

  const teaching = instructors.filter((i) => i._count.taughtCourses > 0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <header>
        <p className="eyebrow">About</p>
        <h1 className="mt-3 text-4xl leading-[1.1] font-semibold tracking-tight text-mist-100 sm:text-5xl">
          Not a course catalogue. An accountability institution.
        </h1>
        <p className="mt-5 text-base leading-[1.75] text-mist-300">
          Most crypto education is a video library with a progress bar. You watch,
          the bar fills, and at the end you know roughly what you knew before —
          except now you have a certificate saying otherwise.
        </p>
      </header>

      <div className="prose-lesson mt-10">
        <h2>Three commitments</h2>

        <p>
          <strong>Completion is earned, not clicked.</strong> A lesson finishes
          only when its condition is met — a watch threshold, a quiz passed, an
          assignment submitted, or the exercise actually written up. Opening a
          page has never completed a lesson here, and the course builder refuses
          to publish a lesson with no condition at all. That single rule is what
          makes a certificate worth showing anyone.
        </p>

        <p>
          <strong>Growth is whole-person.</strong> Finance without character
          produces reckless traders. Alongside the market work there is a Growth
          Centre for habits, goals and reflection — private by default, and never
          scored as a spiritual or medical judgement. Faith and health content is
          opt-in during onboarding, and switching it off removes it immediately.
        </p>

        <p>
          <strong>Responsibility is structural.</strong> The risk disclosure, the
          &ldquo;not financial advice&rdquo; line, taking no custody of funds, and
          the absolute prohibition on ever collecting a seed phrase — these are
          enforced in the software and repeated where they matter, not buried in a
          footer nobody reads.
        </p>

        <h2>Who this is for</h2>

        <p>
          People who want to understand markets rather than follow calls. Who would
          rather check a claim themselves than believe a screenshot. Who suspect
          that the discipline underneath the returns matters more than the returns,
          and who want somewhere that treats it that way.
        </p>

        <p>
          It is not for anyone looking for signals, guaranteed returns, or someone
          to tell them what to buy. Nobody here will, at any price.
        </p>

        <h2>Where it came from</h2>

        <p>
          Maby Academy grew out of Maby Connect. The mark is an open ring — a
          community that is not closed — cradling an <strong>M</strong> drawn as an
          ascending path. Growth and connection in one figure. No graduation cap,
          because a cap is about the day you finish and this is about what you can
          do afterwards.
        </p>
      </div>

      {/* Instructors ------------------------------------------------------ */}
      {teaching.length > 0 && (
        <section className="mt-14 border-t border-rule pt-12">
          <p className="eyebrow-wide">Who teaches here</p>
          <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-mist-100">
            The people who read your work
          </h2>
          <p className="mt-3 text-sm leading-[1.7] text-mist-400">
            Assignments are graded by these people against a published rubric.
            Not by a script, and not by an AI — which is a deliberate constraint,
            because feedback you cannot argue with is not feedback.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {teaching.map((person) => (
              <Card key={person.id} pad="wide">
                <div className="flex items-start gap-3.5">
                  <Avatar name={person.name} src={person.avatarUrl} size={44} />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-mist-100">
                      {person.name}
                    </p>
                    <p className="mt-0.5 text-[10px] font-semibold tracking-[0.1em] text-gold-500 uppercase">
                      {person._count.taughtCourses === 1
                        ? "1 course"
                        : `${person._count.taughtCourses} courses`}
                    </p>
                    {person.bio && (
                      <p className="mt-2 text-[11.5px] leading-[1.6] text-mist-400">
                        {person.bio}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Honest limits ---------------------------------------------------- */}
      <section className="mt-14 border-t border-rule pt-12">
        <p className="eyebrow-wide">What we have not built yet</p>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-mist-100">
          Stated, rather than implied
        </h2>
        <p className="mt-3 text-sm leading-[1.7] text-mist-400">
          A young platform that pretends to be finished is the first thing you
          should distrust. So here is the current honest position.
        </p>

        <Card pad="wide" className="mt-6">
          <ul className="space-y-3">
            <Limit>
              Email delivery is not connected yet, so verification and reset
              links are generated but not posted. Support handles account access
              directly in the meantime.
            </Limit>
            <Limit>
              Video hosting is not wired up. Lessons are written, and written
              lessons carry their own exercises.
            </Limit>
            <Limit>
              Referral commissions exist and are calculated, but stay switched off
              behind a feature flag pending compliance review. Nothing pays out
              until that review is done.
            </Limit>
            <Limit>
              Organisation and team accounts are specified but not built.
            </Limit>
          </ul>
        </Card>
      </section>

      <section className="mt-12">
        <Card variant="gold" pad="wide" className="text-center">
          <p className="eyebrow">Start where it matters</p>
          <h2 className="mx-auto mt-3 max-w-lg text-xl leading-[1.3] font-extrabold text-mist-100">
            Own your keys before you own anything else.
          </h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <LinkButton href="/courses/crypto-from-zero" size="lg">
              Open the free course
            </LinkButton>
            <LinkButton href="/faq" variant="secondary" size="lg">
              Read the FAQ
            </LinkButton>
          </div>
        </Card>
      </section>
    </div>
  );
}

function Limit({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <span className="mt-px shrink-0 text-ember-500">
        <Icon name="flag" size={14} strokeWidth={2.5} />
      </span>
      <span className="text-[12.5px] leading-[1.65] text-mist-300">{children}</span>
    </li>
  );
}
