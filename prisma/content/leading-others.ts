import type { ContentCourse } from "./types";

/**
 * Leading Others Well.
 *
 * The faith-and-purpose pillar's course on what happens once other people
 * depend on you — as a mentor, a team lead, a founder, an elder, or simply
 * the person others have started coming to.
 *
 * Written in the same register as Character & Calling: it draws on the oldest
 * wisdom about how to treat people, much of it religious in origin, without
 * requiring the reader to share any particular creed.
 *
 * The editorial spine is that leadership is a set of specific, learnable
 * behaviours rather than a personality — and that almost all of the difficult
 * ones involve saying something true to someone's face, early, kindly. The
 * course is unusually direct about the failure mode of avoidance, because
 * avoidance is what nearly everyone actually does.
 */
export const leadingOthers: ContentCourse = {
  slug: "leading-others",
  title: "Leading Others Well: Mentoring, Teams and Hard Conversations",
  subtitle:
    "What changes when people depend on you. Giving feedback that lands, holding a standard without being cruel, and having the conversation you have been avoiding.",
  description: `At some point people start depending on you — a junior you are mentoring, a team you are leading, a business with staff, a community that looks to you. Almost nobody is trained for this. Most people lead the way they were led, which means repeating whatever was done to them, including the parts that hurt.

This course is about the specific behaviours that make the difference. How to give feedback someone can actually use rather than feedback that only relieves you. How to hold a standard without humiliating anyone. How to delegate authority rather than tasks. What to do about the person who is not performing — early, when it is still fixable and still kind.

Most of the difficulty is not strategic. It is that leading well requires saying true things to people's faces, sooner than is comfortable, and almost everyone avoids it. Avoidance feels like kindness and is the most reliable way to fail someone: the problem you did not name is the problem they could not fix, and the conversation you delayed for six months becomes a dismissal instead of a correction.

It also covers what nobody warns you about — the loneliness, the way people stop telling you things once you have power over them, and the specific temptations that arrive when you are the one who decides.

Written to be useful whether you hold a deep faith or none. The oldest wisdom about how to treat people is largely religious in origin, and the obligations it describes belong to everyone.`,
  categorySlug: "faith-and-purpose",
  level: "INTERMEDIATE",
  priceMinor: 0,
  estimatedHours: 15,
  passThreshold: 80,
  instructorEmail: "mabi@mabyacademy.com",
  outcomes: [
    "Tell the difference between authority, influence and being liked",
    "Give feedback specific enough to act on, early enough to matter",
    "Hold a standard without humiliating the person who missed it",
    "Delegate authority and outcomes rather than tasks and instructions",
    "Have the conversation you have been avoiding, before it becomes a dismissal",
    "Mentor someone toward not needing you, rather than toward depending on you",
    "Recognise what power does to the information reaching you, and counter it",
    "Decide what you will not do to succeed, before the situation asks",
  ],
  modules: [
    // =====================================================================
    {
      title: "What changes when people depend on you",
      description:
        "The shift almost nobody is prepared for, and the three things it stops being about.",
      lessons: [
        {
          title: "You are already leading someone",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `Leadership is usually discussed as a role. It is more often a position you are already in without having accepted it.

## Who you are already leading

The person newer than you who watches how you handle things.

The people who ask your opinion and then act on it.

Anyone whose work depends on your decisions, including a contractor or a supplier.

Your family. Younger siblings. People in a group who have decided you know what you are doing.

If anyone changes their behaviour because of what you say, you are leading them, whether or not anyone gave you the title.

## Why the title matters less than people think

A title gives you authority — the ability to require things. It does not give you influence, which is the ability to change what someone genuinely thinks and does.

People comply with authority and follow influence. The difference shows up the moment you are not in the room.

## The three things it stops being about

Being right. Being right and unable to bring anyone with you is a failure, however satisfying it feels. The point is not the correct answer; it is the correct answer acted on.

Being liked. The desire to be liked is the single most common source of bad leadership, because it makes every hard conversation feel like a risk to the relationship. It is also the desire that leads people to be liked for a year and resented for five.

Doing the work yourself. The skill that got you here is not the skill you now need, and the instinct to fix it yourself — faster, better — is the instinct that keeps everyone else small.

## What it becomes about

Whether the people around you are getting better. That is close to the whole measure, and it is uncomfortable because it is largely observable.

## The default nobody chose

Most people lead the way they were led. If you were managed by someone who avoided conflict and then exploded, you will be surprised how naturally that arrives in you.

Naming what was done to you — the parts that helped and the parts that did not — is the first act of choosing something else. Otherwise you inherit it.

## What this course is

Specific behaviours, mostly conversational, mostly uncomfortable, all learnable. Not a personality. Quiet people lead well; loud people lead badly; the correlation is weak and the behaviours are not.`,
          activity: {
            title: "Name who you are leading, and who led you",
            prompt:
              "List everyone who currently changes their behaviour because of what you say — at work, at home, in any group. Do not filter for whether it feels like leadership. Then write about the person who led you most, for good or ill: two specific things they did that helped, and two that did not. Finally, write which of those four you have already caught yourself repeating.",
          },
        },
        {
          title: "Authority, influence, and what people do when you leave",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `Two different powers, frequently confused, with completely different sources and completely different durability.

## Authority

The right to require. It comes from position — you are the boss, the founder, the one who pays, the one who decides.

It works immediately and it works only while you are watching. It produces compliance, which is the minimum acceptable behaviour performed for someone with power over you.

Authority is real and sometimes necessary. Some decisions have to be made and someone has to make them. The error is mistaking the compliance it produces for agreement.

## Influence

The ability to change what someone actually thinks. It comes from four things:

Competence — you visibly know what you are doing.

Character — you do what you said, including when it costs you.

Care — the person believes you want good things for them, not just from them.

Consistency — you are the same person on a bad day.

None of these can be assigned. All of them can be lost quickly.

## The test

What people do when you are not there.

A leader with authority and no influence finds that standards drop the moment they leave, that information stops reaching them, and that everything requires their presence.

A leader with influence finds the opposite, and it is the only version that scales.

## Why care is the one people fake worst

Everyone claims to care about their people. It is visible in decisions rather than in statements — whether you protect someone in a difficult meeting, whether you give them the interesting work or keep it, whether you notice they are struggling before they say so.

People are extremely good at detecting the difference between someone who wants them to do well and someone who wants their output. They will not say so, and they will act on it.

## The cost of influence

It is slower. It requires being consistent when nobody is checking, admitting error, and occasionally taking a loss to keep a commitment.

Authority is available immediately and free. That is exactly why people reach for it, and why the leaders who rely on it end up with a team that does the minimum.

## The one to build first

Consistency, because it is the cheapest and the most noticed. Being the same person on a bad day is unusual enough that people organise their behaviour around whether you are.

If your team can tell what mood you are in before they can tell what you want, that is the problem to fix first.`,
          activity: {
            title: "Audit your four sources",
            prompt:
              "Score yourself honestly on the four sources of influence — competence, character, care, consistency — with one piece of evidence for each, drawn from something you actually did rather than something you believe about yourself. Then answer the test: what happens when you are not there? Write one specific thing that drops. Finally, ask one person you lead what they would say your mood was yesterday, and whether they adjusted anything because of it.",
          },
        },
        {
          title: "The kindness that is actually cowardice",
          type: "TEXT",
          points: 10,
          body: `The most common failure in leadership is not harshness. It is avoidance, and it disguises itself as kindness so well that people are proud of it.

## The pattern

Someone is underperforming, or behaving badly, or heading somewhere that will not work. You notice. You say nothing, because saying something would be uncomfortable and they are trying.

Months pass. It gets worse. Other people notice, and notice you have not acted, and adjust their own standards accordingly.

Eventually it becomes unbearable and you act — suddenly, disproportionately, and to their genuine astonishment, because from their side nothing was ever wrong until they were dismissed.

## Why it is not kindness

The problem you did not name is the problem they could not fix. You held information that would have let them correct course and you kept it because holding it was more comfortable for you.

That is not care. It is choosing your own comfort over their development, and then calling it consideration.

## The specific harms

To them: a correction at six weeks is a conversation. At six months it is a dismissal. You converted the first into the second by waiting.

To everyone else: they can see the standard is not being held. The message is that this is acceptable, and good people either lower their effort or leave.

To you: the resentment accumulates, and it comes out sideways — in tone, in withheld opportunities, in a coldness the person cannot account for.

## Why we do it anyway

Because the discomfort of the conversation is immediate and certain, and the cost of avoiding it is delayed and diffuse. That is a trade the mind makes badly.

And because we conflate two things: being disliked in a moment, and being disliked overall. People do not resent being told the truth early by someone who clearly wants them to succeed. They resent being told late by someone who let them fail.

## The test

If you are hesitating to say something, ask: am I protecting them, or protecting myself from an uncomfortable ten minutes?

Answer honestly. The second is the usual answer, and admitting it is what makes the conversation happen.

## The commitment worth making

Nobody who works with me will be surprised. If there is a problem, they will hear it from me, early, in private, in words they can act on.

That single commitment covers most of what makes leadership difficult, and keeping it is the work of the next module.`,
          activity: {
            title: "Name the conversation you are avoiding",
            prompt:
              "Write down the conversation you are currently avoiding — the specific person and the specific thing. Then write how long you have known. Then answer the test honestly: are you protecting them or protecting yourself? Finally, write what happens to this situation if you say nothing for another three months, and what it will cost them when you eventually act.",
          },
        },
        {
          title: "What people stop telling you",
          type: "TEXT",
          points: 10,
          body: `The moment you have power over someone, the information reaching you changes — and it changes without anyone deciding to deceive you.

## What happens

People tell you what they think you want to hear. Not from dishonesty; from the entirely rational calculation that disagreeing with someone who decides your future is expensive.

Bad news arrives late, softened, or after it is unfixable.

Your ideas get more enthusiastic responses than they deserve, and you slowly conclude that your ideas are unusually good.

Nobody tells you when you were unfair, unclear, or wrong.

## Why this is dangerous

You are making decisions with filtered information while believing it is complete. The more senior you become, the worse the filter and the more confident you feel — which is the combination that produces the confident, badly-informed leader everyone has worked for.

## What does not fix it

Saying "my door is always open". It costs nothing and signals nothing, and the person who needs to tell you something difficult is not stopped by the door.

Asking "any feedback for me?" in a group. Nobody will be first, and the silence will confirm that everything is fine.

## What does

Ask specific questions. Not "how is it going" but "what is the most frustrating part of working here at the moment", or "what did I get wrong last month".

Ask individually, in private, and then be quiet long enough for the answer to arrive. The first response is usually polite; the second one, after a silence, is often true.

React well the first time. This is the whole thing. If someone tells you something difficult and you explain why they are mistaken, you have taught everyone watching not to bother. The correct response is thank you, a question, and a visible change if they were right.

Keep people who disagree with you, and protect them. The person who tells you unwelcome things is more valuable than the one who agrees, and is usually less comfortable to have around.

## The asymmetry to remember

You will not notice this happening. From inside, a filtered world feels like an accurate one where people happen to agree with you.

Assume it is happening at all times, and build the habits above as a permanent counterweight rather than as a response to a problem you have detected — because you will not detect it.

## The simplest indicator

When did someone last tell you that you were wrong, to your face, unprompted?

If you cannot remember, that is the answer, and it is not because you have stopped being wrong.`,
          activity: {
            title: "Ask the specific question",
            prompt:
              "Write down when someone last told you unprompted that you were wrong. Then pick one person you lead and ask them a specific question in private — 'what did I get wrong last month' or 'what is the most frustrating part of this at the moment' — and stay quiet after their first answer. Write down what they said, both times. Then write what you will visibly change, if anything, and tell them.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on the foundations. These four ideas carry the rest of the course — particularly the one about avoidance, which is the failure almost everyone actually makes.`,
          quiz: {
            title: "What leadership actually is",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "What is the difference between authority and influence?",
                explanation:
                  "Authority is the right to require, and it produces compliance while you are watching. Influence changes what someone actually thinks, and it comes from competence, character, care and consistency. The difference shows up the moment you leave the room.",
                options: [
                  {
                    text: "Authority produces compliance while watching; influence changes what people actually think",
                    correct: true,
                  },
                  { text: "Authority is earned and influence is assigned", correct: false },
                  { text: "They are the same thing described differently", correct: false },
                  { text: "Influence only matters in volunteer organisations", correct: false },
                ],
              },
              {
                prompt: "Why is avoiding a difficult conversation not kindness?",
                explanation:
                  "The problem you did not name is the problem they could not fix. You held information that would have let them correct course, and kept it because holding it was more comfortable for you. A correction at six weeks is a conversation; at six months it is a dismissal.",
                options: [
                  {
                    text: "It withholds the information they needed to correct course, and converts a correction into a dismissal",
                    correct: true,
                  },
                  { text: "It is kind, but inefficient", correct: false },
                  { text: "It is only a problem for serious issues", correct: false },
                  { text: "Because most performance problems resolve on their own", correct: false },
                ],
              },
              {
                prompt: "Someone tells you something difficult about your leadership. What matters most?",
                explanation:
                  "How you react the first time. Explaining why they are mistaken teaches everyone watching not to bother, and the filter closes permanently. Thank them, ask a question, and make a visible change if they were right.",
                options: [
                  {
                    text: "Reacting well — anything defensive teaches everyone watching not to bother",
                    correct: true,
                  },
                  { text: "Establishing whether they are correct before responding", correct: false },
                  { text: "Explaining the context they are missing", correct: false },
                  { text: "Thanking them and moving on quickly", correct: false },
                ],
              },
              {
                prompt: "Why is 'my door is always open' insufficient?",
                explanation:
                  "It costs nothing and signals nothing. The person with something difficult to say is not stopped by the door — they are stopped by the calculation that disagreeing with someone who decides their future is expensive. Specific questions asked in private are what work.",
                options: [
                  {
                    text: "The barrier is the power difference, not access — specific private questions are what work",
                    correct: true,
                  },
                  { text: "Because most people prefer written feedback", correct: false },
                  { text: "Because open doors are impractical in modern workplaces", correct: false },
                  { text: "It is sufficient if repeated often enough", correct: false },
                ],
              },
              {
                prompt: "What is close to the whole measure of whether you are leading well?",
                explanation:
                  "Whether the people around you are getting better. It is uncomfortable precisely because it is largely observable — unlike being right, being liked, or doing the work yourself, which are the three things leadership stops being about.",
                options: [
                  { text: "Whether the people around you are getting better", correct: true },
                  { text: "Whether the team likes working for you", correct: false },
                  { text: "Whether your decisions turn out to be correct", correct: false },
                  { text: "Whether output has increased", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Saying the true thing",
      description:
        "Feedback, standards and the conversation you have been avoiding. The core skill, and the one everyone avoids.",
      lessons: [
        {
          title: "Feedback someone can actually use",
          type: "TEXT",
          points: 10,
          body: `Most feedback fails not because it is too harsh but because it is not specific enough to act on.

## Why vague feedback is useless

"Be more proactive." "Your communication could be better." "I need to see more ownership."

The person hears that you are dissatisfied and does not know what to do differently on Monday. So they do the same things slightly more anxiously, and nothing changes.

Vague feedback also cannot be argued with, which is why people give it — it feels safer. It is safer for you and useless to them.

## The three parts

The behaviour, specifically. What you observed, with an example. Not a characterisation of them — a description of a thing that happened.

The effect. What it caused. This is the part that makes it matter rather than seem like a preference.

The alternative. What to do instead, concretely enough to do it.

"In Tuesday's meeting you disagreed with the plan afterwards rather than during. The result was that we spent the week on something you already thought was wrong. Next time, say it in the room, even half-formed."

That can be acted on. "Be more proactive" cannot.

## Behaviour, never character

"You were careless with that" is about an action. "You are careless" is about a person, and it invites defence rather than change.

People can change what they did. They cannot change what you have decided they are, and telling them what they are makes them argue about the verdict rather than the behaviour.

## Timing

Close to the event. Feedback a month later is an ambush, and by then they have repeated it fifteen times.

Not in front of others. Correction in public is humiliation regardless of your tone, and the audience learns to fear you rather than to trust you.

## The sandwich problem

Praise, criticism, praise. It is taught everywhere and it does not work, because people learn the shape and hear only the middle — or worse, only the praise, and leave believing everything is fine.

Say the thing plainly. Praise separately and genuinely, at other times, so that praise means something when you give it.

## The check

Afterwards, ask them to say back what they will do differently.

If they cannot, you were not specific enough, and that is your failure rather than theirs. It takes ten seconds and it is the difference between feedback given and feedback received.`,
          activity: {
            title: "Rewrite three pieces of vague feedback",
            prompt:
              "Write down three pieces of feedback you have given, or would give, in their current vague form. Then rewrite each in the three parts: the specific behaviour with an example, the effect it caused, and the concrete alternative. Notice how much harder the specific version is to write — that difficulty is why people give the vague one. Then pick one and actually deliver it this week.",
          },
        },
        {
          title: "The conversation you have been avoiding",
          type: "TEXT",
          points: 10,
          body: `There is one. There always is. This lesson is about having it.

## Preparing

Decide the outcome you want. Not "make them understand" — what should be different afterwards? A changed behaviour, a clear expectation, a decision.

Write the first two sentences. Openings are where people soften into vagueness, and a written opening survives the nerves.

Decide what you are not going to say. Old grievances, other people's complaints, anything unrelated that has accumulated. A conversation carrying six months of stored irritation is an ambush.

## Opening

Directly and without a long preamble. "I want to talk about something that is not working, and I would rather say it than let it continue" is a fair opening.

The long warm-up makes it worse. They know something is coming from the moment you asked for the meeting, and the preamble only extends the dread.

## The middle

Say the specific thing. Then stop and let them respond.

Then listen properly. There is frequently information you do not have — something happening at home, an instruction from someone else, a constraint you did not know about. If you talk for eight minutes you will never find it.

Distinguish an explanation from an excuse. An explanation changes what you should do next. An excuse is a reason the behaviour will continue.

## Ending

Agree what changes, specifically, and by when.

Say what happens if it does not. Not as a threat — as clarity. "If this is still happening in a month, we will need to talk about whether this role is right" is kinder than leaving it unsaid and acting on it later.

Write it down and send it. Two lines, so both of you have the same account. Memory diverges and it diverges favourably for both parties.

## Afterwards

Follow up when you said you would. A conversation with no follow-up teaches that your conversations do not mean anything, and the next one will be ignored.

Acknowledge improvement when it happens. People who correct something and hear nothing conclude it did not matter.

## If it goes badly

Some do. They get upset, or angry, or deny it entirely.

Stay steady, do not escalate to match them, and do not retreat from the substance because they are upset. Distress is not evidence that you were wrong.

If it becomes heated, pause it. "Let us stop here and continue tomorrow" is available and is usually right.

## The thing to hold on to

Nobody has ever thanked me for the difficult conversation I did not have. Several people have thanked me, years later, for one I did.`,
          activity: {
            title: "Prepare it properly, then have it",
            prompt:
              "Take the conversation you named in module one. Write your preparation in full: the outcome you want stated as a change, your first two sentences written out, and the list of things you will not bring up. Then write what you will say happens if nothing changes. Then book the time in your calendar this week, and afterwards write down what actually happened — including anything they told you that you did not know.",
          },
        },
        {
          title: "Holding a standard without humiliating anyone",
          type: "TEXT",
          points: 10,
          body: `Standards are held by consistent, ordinary correction — not by occasional dramatic enforcement.

## The two failures

Letting it slide, then exploding. The team learns that the standard is whatever you tolerate today, and that your reaction is about your mood rather than about the work.

Enforcing publicly and harshly. This holds the standard and costs you the relationship and everyone else's trust. It also teaches people to hide problems, which is far more expensive than the original lapse.

## What works

Correct small things small, immediately, privately, without drama. A quiet "this needs redoing, here is why" costs almost nothing when the thing is small.

The reason people find themselves exploding is that they let ten small things pass and then reacted to the eleventh with the accumulated weight of all of them — which is baffling from the other side.

## Consistency is the standard

A rule applied to some people and not others is not a standard; it is a preference, and everyone can see it.

The hardest case is your best performer. Excusing behaviour because someone is talented is the fastest way to lose everyone else, and it is extremely common — the talented person becomes the exception, and the exception becomes the culture.

## Explaining why

A standard people understand is a standard they hold when you are absent. A standard they merely obey lasts as long as supervision.

This takes longer and it is the difference between compliance and agreement, which was the whole point of module one.

## When someone fails badly

Separate the person from the failure, out loud. "This was a serious mistake and I still think you are good at this" is a sentence people remember for a long time.

Ask what happened before deciding what it means. Most failures have causes that are not carelessness — unclear instruction, missing information, something happening in their life.

Fix the system if the system caused it. If one person could make this mistake, others can, and blaming the individual leaves the mechanism in place.

## The line

There is behaviour you do not tolerate at all: dishonesty, cruelty to colleagues, anything that puts someone at risk.

Say what those are in advance, and act the first time. A line enforced inconsistently is not a line, and the first exception is the one everyone remembers.`,
          activity: {
            title: "Find your inconsistency",
            prompt:
              "Write down the standards you believe you hold. Then, for each, name someone who has broken it without consequence — particularly a high performer. Be honest; there is usually at least one. Then write the three lines you do not tolerate at all, and whether you have ever let one pass. Finally, write down the small thing you let slide this week and what a quiet, immediate correction would have sounded like.",
          },
        },
        {
          title: "Receiving criticism yourself",
          type: "TEXT",
          points: 10,
          body: `How you take feedback determines whether you will ever get any, which determines whether you can improve.

## The first three seconds

Your instinct is to explain. Context they are missing, constraints they do not know, why it looked worse than it was.

Every one of those may be true. Saying them immediately still teaches the person that feedback to you produces argument, and they will not do it again.

Say thank you. Ask a question. That is the whole of the first three seconds, and it is genuinely difficult.

## The question to ask

"Can you give me an example?" — because it moves from a characterisation to something specific you can act on, and because it signals that you are taking it seriously rather than absorbing a blow.

## Deciding afterwards

Not all feedback is correct. You are allowed to conclude that someone was wrong.

Do it afterwards, alone, once the defensive reaction has passed. The judgement you make in the moment is not a judgement; it is a reflex.

The useful test: is there a version of this that is true, even if the way it was said is unfair? There usually is a version, and it is usually smaller than what was said and larger than nothing.

## The visible change

If they were right, change something they can see, and tell them it was because of what they said.

This is the single most effective thing a leader can do for the information reaching them. One visible change tells everyone that feedback has an effect, which is worth more than any number of invitations to give it.

## When it is unfair

Sometimes people are wrong, or unkind, or dealing with something else entirely.

You can say so, calmly, later. "I have thought about what you said and I do not think that is right, here is why" is a fair response and it keeps the channel open.

What damages the channel is dismissing it in the moment, in front of others, or with heat.

## The habit worth building

Ask for it before it is offered, specifically, from people who will actually answer. "What is one thing I should do differently" from three people, twice a year, is more than most leaders ever collect.

And write down what they say. You will not remember it accurately, and the pattern across several people over a year is far more informative than any single conversation.`,
          activity: {
            title: "Collect three answers and change one thing",
            prompt:
              "Ask three people who work with you the same specific question: what is one thing I should do differently? Ask in private, and stay quiet after their first answer. Write down all three responses verbatim, without editing them into something more comfortable. Then find the version that is true even if the delivery was unfair, pick one visible change, make it, and tell the person it was because of what they said.",
          },
        },
        {
          title: "Assignment: the conversation, prepared and had",
          type: "ASSIGNMENT",
          points: 25,
          body: `The first graded piece. It is about a real conversation with a real person, and it is graded on specificity rather than on how it went.

Change names if you prefer. Do not change the substance.`,
          assignment: {
            title: "A difficult conversation, prepared and reviewed",
            instructions: `Prepare, have, and review a real difficult conversation. 600 to 900 words.

**1. The situation.** What is happening, with whom, and how long you have known. State plainly why you have not addressed it yet, and answer the test: were you protecting them or protecting yourself?

**2. What it has cost.** To them, to others watching, and to you. Be specific — "it has been frustrating" is not a cost.

**3. The preparation.** Your intended outcome as a change rather than an understanding. Your first two sentences, written out. The list of things you deliberately will not raise.

**4. The feedback itself.** Written in the three parts: specific behaviour with an example, the effect it caused, the concrete alternative. Check it — could they act on it on Monday?

**5. What happens if nothing changes.** The sentence you will say, stated as clarity rather than as a threat.

**6. What actually happened.** Have the conversation, then report it. What they said, including anything you did not know. Whether they could say back what would change. What you agreed and by when.

**7. What you got wrong.** Something. Every one of these has something — you talked too long, you softened it, you brought up an old grievance, you accepted an excuse as an explanation. A report claiming the conversation went perfectly scores zero on this criterion.

**8. The follow-up.** The date you will check, and what you will do in each case.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "The avoidance is examined honestly",
                weight: 15,
                descriptor:
                  "How long it has gone unaddressed, and a straight answer on whose comfort was being protected. Full marks resist the flattering answer.",
              },
              {
                criterion: "Costs are specific",
                weight: 15,
                descriptor:
                  "Concrete effects on the person, on others watching, and on the writer, rather than a statement of frustration.",
              },
              {
                criterion: "Feedback is written in the three parts and is actionable",
                weight: 25,
                descriptor:
                  "Observed behaviour with an example, the effect, and an alternative concrete enough to do on Monday. Any characterisation of the person rather than the behaviour scores low.",
              },
              {
                criterion: "The conversation actually happened",
                weight: 20,
                descriptor:
                  "A real account including what the other person said and anything the writer did not previously know. A prepared-but-unheld conversation scores low here.",
              },
              {
                criterion: "Self-criticism is genuine",
                weight: 15,
                descriptor:
                  "A real thing the writer got wrong. Claiming it went perfectly scores zero on this criterion.",
              },
              {
                criterion: "Follow-up is dated and conditional",
                weight: 10,
                descriptor:
                  "A specific check date with a stated response for each outcome.",
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Growing people",
      description:
        "Delegation, mentoring and the difficult truth that your job is to make yourself unnecessary.",
      lessons: [
        {
          title: "Delegating authority, not tasks",
          type: "TEXT",
          points: 10,
          body: `There is a large difference between handing someone a task and handing them a decision, and only the second one grows anybody.

## Task delegation

You decide what should happen and they execute it. Useful for getting work done and it develops nobody, because the thinking stayed with you.

A person who has only ever been given tasks cannot be given a decision later, because they have had no practice.

## Authority delegation

You hand over the outcome and the decisions that reach it. "Get this working by Friday, you decide how" is a different act from a list of steps.

It is slower at first, produces worse results initially, and is the only thing that produces someone who can do it without you.

## The levels

Useful because you can move someone through them deliberately rather than jumping from one extreme to the other.

Do exactly this. Decide and tell me before you act. Decide, act, then tell me. Decide and act; I do not need to know.

Most people leave everyone permanently at the first level and then complain that nobody takes ownership.

Moving someone up a level is a specific act you can name, and telling them you are doing it matters — it is one of the more motivating conversations available to a leader.

## Letting them do it worse

The hardest part. Their version will be worse than yours for a while, and the temptation to take it back is enormous.

If you take it back, you have taught them that they cannot do it and that you will always rescue. Both are expensive lessons.

The judgement is about the cost of the mistake. If a poor outcome is recoverable, let it happen and debrief it. If it is not — a client relationship, a safety issue, something irreversible — stay closer.

## What to keep

Anything you cannot evaluate. Anything genuinely irreversible. The things only you can do, which is a shorter list than you think.

## The question that reveals it

If you were unavailable for a month, what decisions would simply wait?

Each one is either something to hand over, or something to admit only you can do — and being honest about which is which is the whole exercise.

## The measure

Are the people around you making bigger decisions this year than last year?

If not, you are managing work rather than growing people, and the ceiling on what you can build is your own capacity.`,
          activity: {
            title: "Place everyone on the levels and move one",
            prompt:
              "List everyone you lead and place each on one of the four levels for the main work they do. Notice how many are on level one. Then answer the question: if you were unavailable for a month, which decisions would simply wait? For each, decide whether it is delegable or genuinely only yours. Finally, pick one person, move them up a level, and tell them you are doing it and why.",
          },
        },
        {
          title: "Mentoring toward not needing you",
          type: "TEXT",
          points: 10,
          body: `Good mentoring makes itself unnecessary. Mentoring that produces dependence is flattering and it has failed.

## The failure mode

They bring you problems, you solve them, they are grateful, and you feel useful. It is pleasant for both parties and after two years they still cannot solve those problems.

Being needed is enjoyable, which is exactly why this is hard to notice from the inside.

## The alternative

When they bring a problem, ask what they think first. Every time, even when you know the answer and it would be faster to say it.

Their answer tells you where the gap actually is, which is more useful than your solution. And answering the question is the practice.

Then either confirm their thinking, or correct the reasoning rather than the conclusion. Correcting the conclusion gives them today's answer; correcting the reasoning gives them the next fifty.

## The rule worth adopting

Do not answer a question they could answer with fifteen minutes of effort. Point at where to look instead.

This feels unhelpful and is the opposite. The skill you are building is finding answers, and every answer you supply is a repetition they did not get.

## What mentoring actually consists of

Access — regular, protected time rather than the offer of availability.

Honesty about where they are. Most people are told they are doing well by everyone and have no accurate picture. A specific, kind account of their actual level is rare and valuable.

Exposure — putting them in rooms and situations slightly beyond what they have earned, and then debriefing.

Advocacy. Saying their name when opportunities are discussed. This is often the most valuable thing you do and it is invisible to them.

## The uncomfortable duty

Telling someone they are not on track for what they want.

Almost nobody does this, so people spend years pursuing something they will not reach, having been encouraged the whole way. That is a serious harm, done kindly.

It should be specific — what is missing and whether it is closeable — rather than a verdict.

## Letting them outgrow you

At some point a good mentee needs something you cannot give: a bigger role, a different field, someone further ahead.

Say so, and help them go. Holding someone because they are useful to you is the clearest failure available in this area, and it is common enough to be worth naming plainly.

The measure of mentoring is who they became, not how long they stayed.`,
          activity: {
            title: "Check whether you are building dependence",
            prompt:
              "Take someone you mentor or manage. Write down the last three problems they brought you and what you did — did you answer, or ask what they thought first? Then answer honestly: could they solve those problems alone today? If not, and they have been with you a year, write what you have been doing instead of teaching. Finally, write the true account of where they actually are, and decide whether you will tell them.",
          },
        },
        {
          title: "The person who is not performing",
          type: "TEXT",
          points: 10,
          body: `The situation everyone handles badly, usually by waiting until it resolves itself, which it does not.

## Establish the cause first

Do they know what is expected? Frequently not. Unclear expectations look identical to poor performance from the outside, and the fix is entirely yours.

Can they do it? A skill gap is trainable. Say so plainly and provide the training rather than hoping.

Will they do it? A motivation problem, and it usually has a reason — something at home, a grievance, a role they never wanted, a manager they do not respect.

Is something in the way? Tools, information, another person, a process. Often the honest answer, and often invisible from above.

Are they in the wrong role? Sometimes a genuinely good person is badly placed, and no amount of correction fixes a mismatch.

Each of these needs a different response, and acting before you know which one you have is how good people get pushed out over a fixable problem.

## The conversation

Early. This is the entire lesson. A problem addressed at six weeks is a conversation; at six months it is a dismissal, and you made it one by waiting.

Specific about what is missing, in the three parts from module two.

Clear about what changes, by when, and what happens if it does not.

## Following through

If you said a month, check at a month. Not later, not never.

If it improved, say so clearly. If it did not, act as you said you would.

The leaders who lose credibility are not the strict ones. They are the ones who set a consequence and then did not apply it, because everything they say afterwards is discounted.

## When it does not improve

Move them or let them go. Both are hard and both are kinder than leaving someone failing for years.

Do it with dignity: privately, clearly, with notice, without a list of their faults. Say what is happening and why, once.

## The part people get wrong afterwards

Telling the team. Do not explain the details — it is not theirs and it teaches everyone that their difficulties will be discussed.

Say that the person has left, that you wish them well, and what happens to the work. Nothing more.

## The honest reflection

When someone fails, ask what you contributed. Unclear expectations, feedback withheld, the wrong role, no support.

It is rarely entirely theirs, and the leaders who improve are the ones who look for their own part rather than concluding they hired badly.`,
          activity: {
            title: "Diagnose before deciding",
            prompt:
              "Take someone whose performance concerns you. Work through the five causes in order — do they know what is expected, can they, will they, is something in the way, are they in the wrong role — and write your evidence for each rather than your assumption. Then write which one you actually have and what response it calls for. Finally, write honestly what you have contributed to the situation.",
          },
        },
        {
          title: "Building people better than you",
          type: "TEXT",
          points: 10,
          body: `The most useful thing a leader does is develop people who exceed them, and almost every instinct works against it.

## Why it is resisted

It threatens your position, or feels as though it does. If they can do what you do, what are you for?

It requires giving away the interesting work, which is the work you are best at and enjoy most.

And it produces someone who may leave, taking the investment with them.

All three are real and all three are worth accepting.

## Why it is worth it

Your ceiling is your own capacity unless other people can operate without you. Everything you build is bounded by what you can personally hold.

People who are growing stay longer than people who are not, so the fear of investing in someone who leaves is largely backwards — the reliable way to lose good people is to stop developing them.

And it is the part of the work that lasts. Whatever you build will be changed or replaced; the people you developed carry it forward and develop others.

## What it requires practically

Giving away work you enjoy. This is the concrete cost and it is felt.

Letting them get credit publicly. Saying "she worked that out" in a meeting costs you nothing and is worth an enormous amount to them.

Advocating for them where they cannot hear it.

Being honest when they are ready before you would prefer.

## The insecurity to notice

If you find yourself withholding information, keeping a person from a relationship, or subtly slowing someone down, that is insecurity operating and it is visible to everyone including them.

It is worth naming honestly, because it is common and rarely admitted. The leader who is threatened by their best person eventually loses them, and the manner of the loss is remembered.

## The measure that matters

Where are the people who worked for you five years ago, and what are they doing now?

That is a more honest account of your leadership than anything you achieved directly, and it is the question this whole module is built around.

## The obligation

If people depend on you, you owe them development, not just direction. That is not a nice extra; it is most of what the role actually is.

The version of this job that consists of allocating work and checking it is a job anyone can do, and it produces nobody.`,
          activity: {
            title: "Give away something you enjoy",
            prompt:
              "Write down where the people who worked with you three to five years ago are now, and what part you played. Then identify the work you most enjoy and are best at, and pick one piece of it to give away this month — name the person and the work. Then write down what makes you reluctant. That reluctance is the lesson; write whether it is about their readiness or about your position.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on developing people. The theme is that almost everything that grows someone costs you something immediately — time, comfort, credit, or the interesting work.`,
          quiz: {
            title: "Growing people",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "What is the difference between delegating a task and delegating authority?",
                explanation:
                  "Task delegation keeps the thinking with you and develops nobody. Authority delegation hands over the outcome and the decisions that reach it — slower at first, worse initially, and the only thing that produces someone who can operate without you.",
                options: [
                  {
                    text: "Authority delegation hands over the decisions, not just the execution",
                    correct: true,
                  },
                  { text: "Authority delegation is for senior people only", correct: false },
                  { text: "They are the same with different names", correct: false },
                  { text: "Task delegation is faster and therefore better", correct: false },
                ],
              },
              {
                prompt: "A mentee brings you a problem you know the answer to. What should you do first?",
                explanation:
                  "Ask what they think. Their answer shows where the gap actually is, and answering the question is the practice. Supplying the solution gives them today's answer and no capability — which is how two years of pleasant mentoring produces no independence.",
                options: [
                  { text: "Ask what they think, every time, even when you know", correct: true },
                  { text: "Give the answer, since it is faster and they are busy", correct: false },
                  { text: "Give the answer with an explanation of the reasoning", correct: false },
                  { text: "Tell them to work it out and come back", correct: false },
                ],
              },
              {
                prompt: "Someone is underperforming. What must you establish before deciding what to do?",
                explanation:
                  "The cause — whether they know what is expected, can do it, will do it, are blocked by something, or are in the wrong role. Each needs a different response, and acting before knowing which is how good people are pushed out over a fixable problem.",
                options: [
                  {
                    text: "Which of the five causes applies, because each needs a different response",
                    correct: true,
                  },
                  { text: "Whether other team members have noticed", correct: false },
                  { text: "Whether they can be replaced easily", correct: false },
                  { text: "How long they have been in the role", correct: false },
                ],
              },
              {
                prompt: "Why is the fear of developing someone who then leaves largely backwards?",
                explanation:
                  "Because people who are growing stay longer than people who are not. The reliable way to lose good people is to stop developing them — so withholding development to avoid losing someone produces exactly the loss it was meant to prevent.",
                options: [
                  {
                    text: "People who are growing stay longer; withholding development is what loses them",
                    correct: true,
                  },
                  { text: "Because most people never leave anyway", correct: false },
                  { text: "Because replacements are easy to find", correct: false },
                  { text: "Because training costs are recoverable", correct: false },
                ],
              },
              {
                prompt: "What is the most honest measure of your leadership?",
                explanation:
                  "Where the people who worked for you five years ago are now, and what they are doing. It is a more honest account than anything achieved directly, and it is why developing people who exceed you is the core of the role rather than a nice extra.",
                options: [
                  {
                    text: "Where the people who worked for you years ago are now",
                    correct: true,
                  },
                  { text: "What you personally delivered", correct: false },
                  { text: "How long people stayed in your team", correct: false },
                  { text: "Whether the team met its targets", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Teams",
      description:
        "Who you bring in, what happens between them, and why the group behaves differently from the individuals.",
      lessons: [
        {
          title: "Hiring, and the cost of getting it wrong",
          type: "TEXT",
          points: 10,
          body: `A wrong hire is expensive in a way that is easy to underestimate, because most of the cost is not the salary.

## The real costs

The months before you admit it. Most people know within weeks and act after six months.

The work not done, and the work others absorbed.

The effect on everyone else, who can see the standard slipping and can see you tolerating it.

Your attention, which goes disproportionately to the person who is not working out.

And the exit itself, which is unpleasant for everyone and damages the person too.

## What to hire for

Evidence of the thing, not enthusiasm about the thing. Ask what they have actually done and get specifics — the moment someone cannot describe the detail of their own work, you have learned something.

The ability to be corrected. Ask about a time they were told they were wrong. Someone who cannot name one, or whose example is really a story about being right, will be very hard to develop.

How they treat people with no power over them. This is the most predictive single thing and it is easy to observe.

## What not to hire for

Similarity to you. It is comfortable and it produces a team with one set of blind spots.

Impressive general talk. Fluency is not competence, and the two are easily confused in an interview.

Desperation on your side. Hiring because you urgently need someone is how most bad hires happen, and the urgency was usually created by not hiring earlier.

## The trial

Wherever possible, pay for a small piece of real work before committing. An afternoon of actual work reveals more than three interviews.

It also lets them evaluate you, which matters — someone who joins with an accurate picture stays.

## Acting when it is wrong

Early. The whole of this course is the same point in different settings.

A short, honest conversation at three weeks — this is not working, here is what is missing, here is what would need to change — is far kinder than six months of gradual disappointment ending in a dismissal they did not see coming.

## The one to remember

Hire slowly enough to be sure, and act quickly when you are not. Most people do the exact opposite, and it is the same instinct both times: the discomfort now feels larger than the cost later.`,
          activity: {
            title: "Write your three questions",
            prompt:
              "Write the three questions you will ask every candidate: one that gets specific evidence of the actual work, one about a time they were told they were wrong, and one that reveals how they treat people with no power over them. Then think of your worst hiring decision and write which of the three would have caught it. Finally, write down how long you waited before acting, and what that delay cost.",
          },
        },
        {
          title: "What happens between people",
          type: "TEXT",
          points: 10,
          body: `Two people who are individually reasonable can produce a situation that is not, and it is your job rather than theirs.

## Why you cannot leave it

Conflict between two people does not stay between two people. It spreads, everyone takes a position, and the work routes around the problem in increasingly expensive ways.

And they cannot fix it themselves, usually, because each has told the story to themselves several times and it has hardened.

## The first move

Talk to each separately, and listen for the thing underneath. It is rarely the stated issue. It is usually a perceived slight, an unclear boundary between roles, or a resource one of them believes was taken.

Do not agree with either version while listening. "I understand" is enough; anything stronger becomes evidence in the argument.

## The common causes, worth checking first

Unclear ownership. Two people who both believe a decision is theirs will conflict indefinitely until someone says which. This is your failure and it is your fix.

Unequal treatment, real or perceived. Frequently traceable to something you did without noticing.

One person's behaviour that everybody has complained about except to them. Which returns to module one.

## Bringing them together

Only after you understand it and only with a purpose. A meeting to air feelings makes it worse.

State what you have understood, what the actual disagreement is, and what will now be true — who owns what, what behaviour changes, what happens next.

You are not mediating between equals. You are deciding, having listened.

## When it is not fixable

Sometimes two people should not work closely together, and no amount of conversation changes it.

Separate them structurally rather than continuing to manage the friction. This is a legitimate solution and people avoid it because it feels like defeat.

## When one person is the problem

Sometimes it is not mutual, and treating it as mutual is unjust to the other person. If one person is behaving badly, address that directly rather than convening a balanced conversation about a situation with a cause.

Balance where there is no balance is a failure disguised as fairness.

## The standard

You do not have to make people like each other. You do have to require that they treat each other well, and to say so plainly.`,
          activity: {
            title: "Diagnose a real conflict",
            prompt:
              "Take a real disagreement between two people you lead — or one you have avoided. Write what each would say the problem is, then write what you think is actually underneath it. Check it against the three common causes: unclear ownership, unequal treatment, or one person's behaviour that nobody has named. Then write what you will decide — who owns what, what changes — and whether this is genuinely mutual or has one cause.",
          },
        },
        {
          title: "Meetings that are worth the hours",
          type: "TEXT",
          points: 10,
          body: `Meetings are the largest recurring cost most teams have and the one least examined.

## The arithmetic

Six people for an hour is six hours. Weekly, that is over three hundred hours a year for one recurring meeting.

Nobody would approve a project costing three hundred hours without asking what it produces. Recurring meetings are approved once and never reviewed.

## The three legitimate purposes

To decide something. There is a decision, the people who must make it are present, and it will be made in the room.

To surface information that cannot travel in writing — usually because it requires questions and reactions.

To do work together, where the interaction is the point.

## What is not a purpose

Status updates, almost always. If it can be read, it should be written, and everyone reads faster than anyone speaks.

Being seen to consult, when the decision is made. People know, and it costs more trust than the consultation buys.

Habit. The largest single cause.

## Making them work

State the purpose and the decision in the invitation. If you cannot state it, cancel it.

Invite the fewest people who can do the thing. Everyone else gets the notes. Being excluded is not an insult if it is normal and explained.

Say the decision at the end, out loud, with who does what by when. A meeting that ends with everyone having a slightly different understanding has produced nothing.

Send two lines afterwards. Decision, actions, owners, dates.

## Your own behaviour

Speak last on anything you have a view about. If you speak first, you have ended the discussion and will only hear agreement.

Notice how much of the talking is yours. In most meetings led by the person with authority, it is far more than they believe.

Actively ask the quiet person. Not "any thoughts?" to the room, but their name and a specific question.

## The review

Once a quarter, list your recurring meetings, multiply by the hours, and ask what each produced.

Cancel one. There is always one, and cancelling it is the single most appreciated thing a leader can do.`,
          activity: {
            title: "Cost your meetings and cancel one",
            prompt:
              "List every recurring meeting you run or attend. For each, multiply attendees by hours by frequency to get the annual cost in hours. Write the totals. Then for each, state its purpose from the three legitimate ones — or admit it is habit or status. Cancel one this week, or convert it to a written update. Then, in your next meeting, count roughly what proportion of the talking is yours.",
          },
        },
        {
          title: "The culture is what you tolerate",
          type: "TEXT",
          points: 10,
          body: `Culture is not the values on the wall. It is the pattern of behaviour that is actually rewarded and actually permitted, and it is set almost entirely by what leaders do rather than say.

## How it is actually set

By what you tolerate. The worst behaviour you allow becomes the standard, because everyone can see it and adjusts.

By who you promote. This is the loudest signal available. Promoting someone who delivers results and treats people badly tells everyone precisely what matters.

By what you do under pressure. Anyone can hold values in a good quarter. What you do when money is short is what people remember and imitate.

By what you do when it costs you. Keeping an expensive commitment teaches more than any statement.

## The gap that destroys trust

Stated values that are contradicted by decisions are worse than no stated values, because they add hypocrisy to the original problem.

If you say people matter and then treat someone badly during a difficult period, you have not merely failed once — you have told everyone that the stated values are decoration.

Better to state fewer things and hold them.

## Small signals people read

Who gets interrupted and who does not. Whose ideas get attributed to them. Who is thanked. Whether you defend your team to people outside it. Whether you take the blame publicly and give credit publicly, or the reverse.

These are read continuously and accurately, and they are how culture is actually transmitted.

## Changing one

Slowly, and by behaviour rather than announcement. A change announced and not modelled produces cynicism.

Start with what you tolerate, since that is the fastest lever. One thing you have been letting pass, addressed consistently for a month, changes more than any statement.

## The test

If a new person joined next week and simply watched, what would they conclude is rewarded here?

Answer honestly. The answer is your culture, whatever is written anywhere.`,
          activity: {
            title: "Answer the new-joiner test",
            prompt:
              "Answer the test: if someone joined next week and only watched, what would they conclude is rewarded here? Write it plainly, including anything uncomfortable. Then list who you have promoted or praised most recently and what that signalled. Then name the one behaviour you have been tolerating that is doing the most damage, and commit to addressing it consistently for the next month.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on teams. The recurring theme is that the group reads your behaviour far more accurately than your statements, and adjusts to what you permit.`,
          quiz: {
            title: "Teams and culture",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "What is the most predictive single thing to observe in a candidate?",
                explanation:
                  "How they treat people with no power over them. It is easy to observe and it predicts far more than fluency in an interview, which is frequently mistaken for competence.",
                options: [
                  { text: "How they treat people with no power over them", correct: true },
                  { text: "How well they articulate their experience", correct: false },
                  { text: "Their enthusiasm for the role", correct: false },
                  { text: "Whether they remind you of yourself", correct: false },
                ],
              },
              {
                prompt: "Two people you lead are in conflict. What should you check first?",
                explanation:
                  "Whether ownership is unclear. Two people who both believe a decision is theirs will conflict indefinitely until someone states which — and that ambiguity is the leader's failure and the leader's fix.",
                options: [
                  { text: "Whether ownership of a decision is unclear — usually your own failure", correct: true },
                  { text: "Which of them is more valuable to the team", correct: false },
                  { text: "Whether they can be brought together immediately", correct: false },
                  { text: "How long they have worked together", correct: false },
                ],
              },
              {
                prompt: "Why should you speak last in a meeting on anything you have a view about?",
                explanation:
                  "Because speaking first ends the discussion — you will hear agreement rather than thinking. This is the same filtering effect that power produces generally, concentrated into a single room.",
                options: [
                  { text: "Speaking first ends the discussion and produces only agreement", correct: true },
                  { text: "It gives you time to prepare your argument", correct: false },
                  { text: "It is more polite to junior colleagues", correct: false },
                  { text: "It makes meetings shorter", correct: false },
                ],
              },
              {
                prompt: "What actually sets a team's culture?",
                explanation:
                  "What you tolerate, who you promote, what you do under pressure, and what you do when it costs you. The worst behaviour you permit becomes the standard, because everyone can see it and adjusts.",
                options: [
                  {
                    text: "What is tolerated, who is promoted, and what you do under pressure",
                    correct: true,
                  },
                  { text: "The values the organisation has published", correct: false },
                  { text: "The hiring process", correct: false },
                  { text: "How often the team socialises", correct: false },
                ],
              },
              {
                prompt: "Why are stated values worse than none when contradicted by decisions?",
                explanation:
                  "Because they add hypocrisy to the original problem. Saying people matter and then treating someone badly under pressure does not just fail once — it tells everyone the stated values are decoration, which is a second and larger loss.",
                options: [
                  {
                    text: "They add hypocrisy, and teach that everything stated is decoration",
                    correct: true,
                  },
                  { text: "They are harder to remember", correct: false },
                  { text: "They create legal exposure", correct: false },
                  { text: "They raise expectations unrealistically", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Being understood",
      description:
        "Clarity as an obligation. Announcing decisions, writing so people act, and the cost of assuming you were clear.",
      lessons: [
        {
          title: "The instruction they actually heard",
          type: "TEXT",
          points: 10,
          body: `A large proportion of what looks like poor performance is a communication failure that was never checked.

## Why it happens

You have the full context — the reasoning, the constraints, the history. You say a compressed version and hear it as complete, because your mind supplies the rest.

They receive the compressed version only, fill the gaps with reasonable assumptions, and act on something adjacent to what you meant.

Neither party has done anything wrong, and the work is now wrong.

## The check that costs ten seconds

Ask them to say back what they are going to do. Not "does that make sense" — which reliably produces yes — but "what is your first step?"

The gap between what you said and what comes back is the information you needed, and it appears immediately.

## What an instruction should contain

The outcome, so they can judge trade-offs you did not anticipate.

Why it matters, so they can make sensible decisions when reality differs from your assumption.

The constraints that are real, distinguished from your preferences. People treat every stated preference as a requirement unless told otherwise, which removes the judgement you wanted.

The deadline, and how good it needs to be. "Rough and Tuesday" and "excellent and whenever" are different jobs, and people guess wrong in both directions.

## Written or spoken

Anything with detail, dates or multiple parts should be written, even if you also said it. People remember conversations inaccurately and confidently.

Two lines after a conversation is enough. This is the same habit as the difficult conversation, and it prevents the same divergence.

## The failure to watch for

If someone repeatedly produces the wrong thing, check your instruction before concluding anything about them. Ask them to tell you what they understood the last request to be.

It is uncomfortable to discover that a performance concern was your own vagueness, and it is common enough to check first.

## The compression trap for experts

The more expert you are, the more you compress, and the less legible you become to someone earlier in the journey.

The skill is not simplification. It is remembering what you knew before you knew this, which is genuinely hard and worth practising.`,
          activity: {
            title: "Test what was actually heard",
            prompt:
              "Take something you have recently asked someone to do. Before checking with them, write what you believe you communicated. Then ask them to tell you what they understood, and what their first step is. Write down the gap. Then rewrite the original instruction with the four parts: outcome, why it matters, real constraints separated from preferences, and deadline plus quality bar.",
          },
        },
        {
          title: "Announcing decisions people will not like",
          type: "TEXT",
          points: 10,
          body: `How an unwelcome decision is announced determines whether people disagree with it or lose trust in you.

## The order that works

The decision, first and plainly. Burying it after three paragraphs of context is transparent and reads as evasion.

The reasoning, honestly. Including the constraint you were under, if there was one.

What it means for them, specifically. This is what they are actually listening for and everything before it is noise until it arrives.

What is not changing. Uncertainty expands to fill silence; naming what is stable removes most of the fear.

What is genuinely still open, and what is not. Pretending a settled decision is open invites input you will ignore, which is worse than saying it is settled.

## What destroys trust

Presenting a decision as a consultation. People discover it was already made and conclude that everything you ask is theatre.

Hiding the reason. If the real reason is money, say it is money. People deal with hard facts better than with obvious evasions.

Disappearing afterwards. The instinct is to announce and avoid, precisely when your visibility matters most.

Blaming someone above you while implementing it. If you are delivering it, own it. Distancing yourself from a decision you are enforcing satisfies nobody and makes you look weak to both sides.

## Taking the questions

Immediately, in person, and answer honestly including "I do not know".

"I do not know, and I will tell you when I do" is a strong answer. An invented reassurance that turns out false costs more than the original decision.

## Individual conversations

For anything that materially affects a specific person, tell them before the group. Finding out in a meeting that your role is changing is a humiliation that is remembered permanently.

## The thing people actually want

Not agreement. They want to have been treated as adults — told the truth, told early, and given a straight answer about what it means for them.

Most anger about decisions is really anger about how they were communicated, and that part is entirely within your control.`,
          activity: {
            title: "Write an announcement in the right order",
            prompt:
              "Take a decision you have made or expect to make that people will not like. Write the announcement in the order from this lesson: the decision first and plainly, the honest reasoning including the constraint, what it means for them specifically, what is not changing, and what is genuinely still open. Then list anyone who must be told individually first, and when. Finally, write the honest answer to the hardest question you expect, including if that answer is 'I do not know'.",
          },
        },
        {
          title: "Writing that gets acted on",
          type: "TEXT",
          points: 10,
          body: `Most of what a leader communicates is written, and most of it is written badly enough that people skim it.

## Why it matters more than it seems

An unclear message multiplies: everyone who reads it either acts wrongly or comes back with a question. Ten minutes spent making a message clear saves an hour of clarification.

## The rules that do most of the work

Put the ask first. If someone needs to do something, the first line says what and by when. Everything else is supporting detail they may or may not need.

One message, one purpose. A message containing an update, a question and a request will get a response to one of them.

Name the person. "Can someone look at this" is addressed to nobody and actioned by nobody.

Be specific about time. "Soon", "when you can" and "urgent" all mean different things to different people. A date and a time do not.

Short. A long message is a message that will be read later, and later frequently means never.

## Structure for anything long

The decision or ask at the top, in two lines.

Then the detail, in sections with headings, so people can find their part without reading all of it.

Then the background, at the bottom, for anyone who wants it.

Most people write this in the exact reverse order, following the sequence in which they thought about it rather than the sequence in which it will be read.

## Tone

Written text reads colder than intended, particularly from someone with authority. A neutral message from a leader is often received as displeasure.

Add a degree of warmth you would not need in speech. It is not softness; it is correcting for a known distortion in the medium.

Never write anything critical while annoyed. Write it, do not send it, and read it the next morning. You will change it.

## What should not be written

Anything genuinely difficult about a person. That is a conversation. Written criticism is permanent, forwardable, and lands harder than intended.

Write to confirm afterwards. Do not deliver by text what should be said face to face.

## The test

Could someone act correctly having read only the first two lines?

If not, restructure. That is the whole standard.`,
          activity: {
            title: "Rewrite your longest recent message",
            prompt:
              "Find the longest message you have sent your team recently. Rewrite it in the correct order: the ask or decision in the first two lines with a named person and a specific date, then detail in sections, then background at the bottom. Cut its length by half. Then apply the test — could someone act correctly on the first two lines alone? Finally, check it for the tone correction: does it read colder than you intended?",
          },
        },
        {
          title: "Saying you were wrong",
          type: "TEXT",
          points: 10,
          body: `Admitting error is treated as a risk to authority. It is close to the opposite, and the reasoning is worth being explicit about.

## What people already know

They know when a decision went badly. They were there.

The only question is whether you will say so. Not saying so does not conceal it; it tells them you either cannot see it or will not admit it, and both are worse than the original error.

## What a good admission contains

The specific thing, named. Not "mistakes were made" but "I decided X and it was wrong."

What it cost, acknowledged rather than minimised.

What you got wrong in the reasoning — which is the part that has value to everyone listening, because it is transferable.

What you are doing differently.

No excessive apology. A leader performing extended contrition makes it about them and forces everyone to reassure you, which is a second imposition.

## What it buys

Permission for everyone else to admit error, which is worth an enormous amount. In a team where the leader never gets anything wrong, mistakes get hidden until they are expensive.

Credibility for the things you do assert. Someone who admits error is believed when they claim success; someone who never does is discounted on everything.

## The limits

Do not confess constantly. Continuous self-criticism is its own performance and it makes people uneasy about whether anyone is steering.

Do not admit to things that were not your fault to seem humble. It is dishonest and it confuses the actual account of what happened.

## Under pressure

The temptation is strongest when the stakes are highest — a failed project, a lost client, a decision that cost money.

That is precisely when admitting it matters most, because that is when everyone is watching to see what happens to people who get things wrong here.

If you protect yourself while blaming others once, the culture is set, and no statement afterwards will undo it.

## The measure

When did you last say, plainly, in front of your team, that you were wrong about something specific?

If it has been a long time, it is unlikely to be because you have been right.`,
          activity: {
            title: "Say one specific thing plainly",
            prompt:
              "Write down when you last told your team plainly that you were wrong about something specific. Then identify a decision from the last six months that did not work. Write the admission in the four parts: the specific thing, what it cost, what you got wrong in the reasoning, and what you are doing differently. Keep it short and free of excessive apology. Then say it, out loud, to the people affected.",
          },
        },
        {
          title: "Assignment: communicate a real decision",
          type: "ASSIGNMENT",
          points: 25,
          body: `The second graded piece. It asks you to communicate something real and difficult, and to check what was actually received rather than what you intended.`,
          assignment: {
            title: "A decision, communicated and checked",
            instructions: `Communicate a real decision people will not welcome, and report what happened. 600 to 900 words.

**1. The decision and its constraint.** What you decided and the honest reason, including any constraint you were under. State whether you were tempted to present it as more open than it was.

**2. Who is individually affected.** Anyone who must be told before the group, and when you told them. Finding out in a meeting that your role is changing is not recoverable — say how you avoided that.

**3. The announcement.** Written in full and in the right order: decision first and plain, honest reasoning, what it means for them specifically, what is not changing, what is genuinely still open.

**4. The hard questions.** The three you expected, with your honest answers — including any that are "I do not know, and I will tell you when I do".

**5. What was actually received.** Deliver it, then check. Ask two people to say back what they understood the decision to be and what it means for them. Report the gap between what you said and what came back.

**6. The written follow-up.** Your two-line confirmation, structured so someone could act on the first two lines alone.

**7. What you got wrong.** In the decision, the timing, or the delivery. Every one of these has something — you softened it, you buried the reason, you avoided someone, you announced before telling an individual. A report claiming it was handled perfectly scores zero on that criterion.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "The decision is real and the reasoning honest",
                weight: 15,
                descriptor:
                  "A genuine unwelcome decision with its actual constraint stated, including an honest note on any temptation to disguise it as consultation.",
              },
              {
                criterion: "Individuals were told before the group",
                weight: 20,
                descriptor:
                  "Anyone materially affected identified and told first, with timing stated. Failing to do this, and saying so, scores better than claiming it was unnecessary.",
              },
              {
                criterion: "The announcement follows the right order",
                weight: 25,
                descriptor:
                  "Decision first and plain, honest reasoning, specific implications, what is stable, and what is genuinely open. Burying the decision after context scores low.",
              },
              {
                criterion: "What was received was actually checked",
                weight: 25,
                descriptor:
                  "Two people asked to say it back, with the gap reported honestly. An assertion that it was clear, without checking, scores low here.",
              },
              {
                criterion: "Self-criticism is genuine",
                weight: 15,
                descriptor:
                  "A real error in the decision, timing or delivery. Claiming it was handled perfectly scores zero on this criterion.",
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Hard seasons",
      description:
        "Leading when things are going badly — uncertainty, shortage, failure, and the decisions that cost people.",
      lessons: [
        {
          title: "Leading through uncertainty",
          type: "TEXT",
          points: 10,
          body: `People can work through difficulty. What they cannot work through is not knowing, and the two are frequently confused.

## What uncertainty does

It occupies attention continuously. Someone who does not know whether their role is safe is not working at full capacity, however professional they are.

It produces rumour, which is always worse than the truth and travels faster.

It causes the best people to leave first, because they have options and they use them when the picture is unclear.

## The instinct that makes it worse

Saying nothing until you know everything. It feels responsible — you do not want to alarm anyone or say something that turns out wrong.

Meanwhile people are constructing an account from fragments, and the account they construct is worse than the reality, always.

## What to do instead

Say what you know, what you do not know, and when you will next say something.

That third part does most of the work. "I do not have an answer and I will update you on Friday whether or not anything has changed" converts open-ended dread into a bounded wait.

Then update on Friday even if nothing has changed. Especially then.

## What you can commit to when you cannot commit to outcomes

That you will tell them as soon as you know. That they will not find out from someone else. That you will be honest about how bad it is.

Those are promises you can actually keep, and they are what people are asking for underneath the question about outcomes.

## Not pretending

False reassurance is the most expensive thing available here. If it turns out badly, everything you say afterwards is discounted, permanently.

You can be steady without being falsely positive. "This is difficult, here is what we are doing, here is what would have to be true for it to work" is honest and it is not despair.

## Your own visible state

People read you continuously in a hard season. Not for cheerfulness — for steadiness.

You are allowed to say it is hard. You are not helping if you transmit panic, because they cannot act on your fear and it becomes theirs as well.

## The thing to keep doing

Ordinary rhythms. The regular meeting, the usual check-in, the normal standards.

When everything is uncertain, the routine that continues is disproportionately reassuring — it says that not everything is in question.`,
          activity: {
            title: "Write the uncertainty update",
            prompt:
              "Take a genuine uncertainty in your work right now — something you do not know the outcome of. Write the update in three parts: what you know, what you do not know, and exactly when you will next say something. Then write the three commitments you can actually keep regardless of outcome. Then send it, and put the next update date in your calendar. Send that one even if nothing has changed.",
          },
        },
        {
          title: "When you have to let people go",
          type: "TEXT",
          points: 10,
          body: `The hardest thing in this course, and the one where the difference between doing it well and badly is largest for the person on the other side.

## Before it happens

If it is performance, they should already know. Everything in module two exists so that this is never a surprise, and a surprise here is a failure that happened months earlier.

If it is money or restructuring, nothing they did caused it, and saying so clearly matters enormously.

## Doing it

In person, privately, at the start of a week rather than a Friday afternoon, so they can act rather than sit with it for two days.

Say it in the first minute. A preamble while they wait for the obvious is cruel.

Be clear that it is decided. A conversation that sounds negotiable when it is not creates false hope and a much worse second conversation.

Give the reason once, plainly, and do not repeat or elaborate under pressure. Elaborating turns into a debate about the reasons, which helps nobody.

## What you owe them

Whatever notice and payment is due, at minimum, and more where you can.

Practical help: a reference, introductions, time to look. If you cannot say something positive honestly, say what you can — that they were reliable, or good with people, or worked hard.

Dignity in how they leave. Do not have someone walked out unless there is a genuine risk. Being removed like a threat is remembered for years by them and by everyone watching.

## What you owe everyone else

Tell them promptly and simply. The person has left, this is what happens to the work, this is what it means for the team.

Do not explain the details. It is not theirs, and it teaches everyone that their circumstances will be discussed.

If more may follow, say so honestly. If not, say that clearly, because everyone is asking it.

## Afterwards

Expect a period of reduced output and increased anxiety. This is normal and pushing hard against it makes it worse.

Be more visible than usual, not less. The instinct is to avoid, and it reads as guilt or indifference.

## The part to sit with

If it was a performance dismissal, ask what you contributed. Unclear expectations, feedback withheld, the wrong role, no support.

Do this genuinely rather than as a formality. The leaders who improve are the ones who find their own part, and it is almost always there.`,
          activity: {
            title: "Prepare for it before you need to",
            prompt:
              "Write your process for ending someone's employment, before you are in the situation: the timing, your first sentence, the reason stated once, what you will provide practically, and what you will say to the rest of the team. Then, if you have done this before, write honestly what you contributed to the situation and what you would do differently. If you have not, write what would have to be true for you to be sure it was not a surprise.",
          },
        },
        {
          title: "Your own failure",
          type: "TEXT",
          points: 10,
          body: `Sooner or later you will lead something that fails, and how you handle it matters more than the failure.

## The temptations

Blaming circumstances, which are usually genuinely part of it, which is what makes it plausible.

Blaming individuals, which is available and is the single fastest way to destroy trust.

Quiet revisionism — telling a version in which it was always going to be difficult and you had reservations. Everyone who was there remembers that you did not.

Disappearing into work, so you do not have to talk about it.

## What to do

Say what happened and what your part was, specifically, once.

Protect the people who worked on it. They did what you asked; the direction was yours. Publicly taking that is one of the more important things a leader does, and it is remembered.

Draw the actual lesson rather than a comfortable one. "We should have validated demand before building for six months" is a lesson. "We learned a lot" is not.

Then move. Extended post-mortem becomes its own avoidance.

## The private part

Failure at this level is genuinely painful in a way that is worth acknowledging — money lost, people affected, a thing you believed in that did not work.

Do not process it in front of the team. Do process it, with someone outside, because unprocessed failure comes out as caution, irritability, or an unwillingness to commit to anything again.

## What it does to your judgement

After a failure people become either too cautious or determined to prove something. Both are distortions and both are predictable.

Knowing which way you lean is useful. Ask someone who knows you which one you are doing; you will not be able to tell.

## What people are watching for

Not whether you succeeded. Whether you told the truth about it, whether you protected them, and whether you learned something specific.

A leader who fails honestly and visibly learns is followed further than one who has never visibly failed — because the second one is not believed.

## The thing that lasts

Almost nothing you build will last in the form you built it. What lasts is the people, and how they were treated during the part that did not work.`,
          activity: {
            title: "Write the honest account",
            prompt:
              "Take something you led that did not work. Write the honest account in four parts: what happened, what your specific part was, what the people who worked on it did right, and the specific transferable lesson — not 'we learned a lot'. Then answer: which way did it distort your judgement afterwards, too cautious or something to prove? Ask someone who knows you, because you will not be able to tell.",
          },
        },
        {
          title: "Keeping going",
          type: "TEXT",
          points: 10,
          body: `A hard season that lasts is different from a crisis, and it requires different things.

## The difference

A crisis has adrenaline and an end. People can sustain a great deal for a short period.

A long difficult season has neither, and the same effort applied indefinitely produces exhaustion rather than results.

Treating a long season like a crisis — constant urgency, everything critical — is the most common leadership error in a downturn, and it burns out the people you most need.

## What to change

Reduce what you are doing rather than everything's intensity. Choose what stops, say so, and mean it. Half-doing eight things is worse than doing four properly.

Protect recovery deliberately. In a long season people stop taking time off, which reduces capacity precisely when it is needed.

Lower the standard on things that do not matter, explicitly. Unspoken standards remain in force and people exhaust themselves meeting them.

## Marking progress

In a long difficult period there are no obvious wins, and people lose the sense of moving.

Name what has been achieved, specifically and regularly. It is not cheerleading; it is supplying information that is genuinely hard to see from inside.

## Being honest about the length

If it is going to be a year, say so. People organise themselves differently for a year than for a month, and being repeatedly told it is nearly over is corrosive.

An honest long horizon is easier to live with than a series of optimistic short ones that pass.

## Your own limit

You cannot lead a long season on empty, and you will be the last to notice you are.

The specific things: sleep, one day genuinely off, someone outside to talk to, and something in your week that is not this.

Those look like luxuries in a hard period and they are the maintenance of the instrument everything else depends on.

## When it does not end

Sometimes the honest answer is that this will not improve, and the right decision is to stop — close it, leave it, change it.

Persistence is a virtue up to the point where it becomes an inability to accept information. Knowing which one you are doing requires someone outside, because from inside they feel identical.

## The thing that carries people

Not optimism. Being told the truth, seeing you steady, knowing what is being asked and for how long, and believing you will tell them when it changes.`,
          activity: {
            title: "Decide what stops",
            prompt:
              "If you are in a long difficult period, write down everything currently being asked of your team and choose what stops — actually stops, not slows. Say it to them explicitly, including which standards you are lowering on purpose. Then write your honest estimate of how long this lasts, and commit to saying that rather than a series of optimistic short horizons. Finally, name the four things maintaining your own capacity and which one has slipped.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on hard seasons. Notice that almost every correct answer involves telling people something uncomfortable sooner than instinct suggests.`,
          quiz: {
            title: "Leading in difficulty",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "You do not yet know the outcome of something serious. What should you tell your team?",
                explanation:
                  "What you know, what you do not, and when you will next speak — then speak then, even if nothing has changed. Saying nothing until you know everything feels responsible and lets people construct an account from fragments, which is always worse than the truth.",
                options: [
                  {
                    text: "What you know, what you do not, and a specific date for the next update",
                    correct: true,
                  },
                  { text: "Nothing, until you have something definite to say", correct: false },
                  { text: "A reassurance that it will probably be fine", correct: false },
                  { text: "Only the parts that affect their immediate work", correct: false },
                ],
              },
              {
                prompt: "You are dismissing someone for performance. What does a surprise indicate?",
                explanation:
                  "A failure that happened months earlier. If the feedback had been given early and specifically, they would already know. Surprise here means the conversation was avoided when it was still a correction rather than a dismissal.",
                options: [
                  {
                    text: "That you avoided the conversation months ago, when it was still fixable",
                    correct: true,
                  },
                  { text: "That they were not paying attention", correct: false },
                  { text: "That the standards were not written down", correct: false },
                  { text: "Nothing — dismissals are always a surprise", correct: false },
                ],
              },
              {
                prompt: "Something you led has failed. What do people watch for?",
                explanation:
                  "Whether you told the truth about it, protected the people who did the work, and learned something specific. A leader who fails honestly is followed further than one who has never visibly failed, because the second is not believed.",
                options: [
                  {
                    text: "Whether you were honest, protected your people, and drew a specific lesson",
                    correct: true,
                  },
                  { text: "Whether you can recover the losses quickly", correct: false },
                  { text: "Whether you identified who was responsible", correct: false },
                  { text: "Whether you remain confident about the next attempt", correct: false },
                ],
              },
              {
                prompt: "What is the most common leadership error in a long downturn?",
                explanation:
                  "Treating a long season like a crisis — constant urgency, everything critical. A crisis has adrenaline and an end; a long season has neither, and the same intensity applied indefinitely burns out exactly the people you need.",
                options: [
                  {
                    text: "Running it at crisis intensity, which exhausts the people you need most",
                    correct: true,
                  },
                  { text: "Reducing what the team is asked to do", correct: false },
                  { text: "Being too honest about how long it will last", correct: false },
                  { text: "Lowering standards on non-critical work", correct: false },
                ],
              },
              {
                prompt: "Why say a difficult period will last a year, if it will?",
                explanation:
                  "Because people organise themselves differently for a year than for a month, and repeated optimistic short horizons that pass are corrosive. An honest long horizon is easier to live with than a series of hopeful ones.",
                options: [
                  {
                    text: "People plan differently for a long horizon, and repeated false short ones corrode trust",
                    correct: true,
                  },
                  { text: "It lowers expectations so any improvement looks good", correct: false },
                  { text: "It encourages people who cannot commit to leave", correct: false },
                  { text: "It is legally required in most places", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Succession",
      description:
        "Building something that outlives your involvement, and handing it over without breaking it.",
      lessons: [
        {
          title: "The bus test, applied to people rather than processes",
          type: "TEXT",
          points: 10,
          body: `The systems question — what breaks if you disappear — has a human version that is harder and matters more.

## The question

If you left in three months, who would do what you do? Not the tasks — the judgement, the relationships, the decisions nobody else has made.

Most leaders cannot answer, and most have not tried, because the honest answer is uncomfortable in two directions: nobody is ready, and preparing someone makes you replaceable.

## Why it is not optional

You will leave eventually. Every role ends — by choice, by illness, by circumstance, by time.

An organisation where the leader's departure is a crisis is one that was built badly, however well it performed while they were there.

And the alternative to succession is not permanence. It is a bad handover at a bad moment.

## What cannot simply be handed over

Relationships. The client who deals with you, the partner who trusts you, the person who joined because of you. These transfer slowly and only if you introduce them deliberately, over time, and then step back.

Judgement about the specific situation — which is built by making decisions, which means letting someone make decisions while you are still there to catch the consequences.

Context that has never been said out loud. Why things are the way they are, what was tried before, which constraints are real and which are habit.

## Starting early

Long before you intend to leave, because all three of the above take years rather than weeks.

Identify who might. Tell them, honestly, including what is missing. Being told you are being developed for something is one of the more motivating conversations available, and being quietly assessed for years and then passed over is one of the worst experiences.

Give them decisions, then bigger ones, and let some go wrong.

## The insecurity, again

Developing a successor makes you replaceable, and that is exactly the point. A leader who cannot be replaced has built a dependency rather than an institution.

If your value rests on being the only one who can do it, you have made yourself a bottleneck and called it importance.

## When there is nobody

Sometimes there genuinely is not, and the honest response is to hire or to say so — not to conclude that you must therefore stay indefinitely.

That conclusion is comfortable and it is how organisations end up with a leader who stayed five years past the point of usefulness.

## The measure

Could someone competent take this on in six months with what exists — written down, introduced, practised?

If not, that gap is the work, and it is the work regardless of whether you are going anywhere.`,
          activity: {
            title: "Answer the three-month question",
            prompt:
              "Answer it plainly: if you left in three months, who would do what you do, and what would break? List the relationships that exist only with you, the decisions nobody else has made, and the context that has never been said out loud. Then name one person who could grow into part of it, and write what is missing. Then tell them you are developing them for it, and what the gaps are.",
          },
        },
        {
          title: "Handing over relationships",
          type: "TEXT",
          points: 10,
          body: `The hardest part of any handover, and the part most often done badly by being done suddenly.

## Why it fails when rushed

A relationship transferred by announcement is not transferred. The client, partner or colleague has a relationship with you, and an email introducing someone else does not create one with them.

What happens instead is that they keep contacting you, the successor is undermined without anyone intending it, and the handover quietly fails.

## The sequence that works

Bring them in early, as a participant rather than an observer. They attend, they contribute, they are visibly part of it.

Then hand over specific pieces while you are still present. They lead a meeting; you are there and you do not take over.

Then step back visibly. Say plainly to the other party: from now, this is theirs, and I am not the route.

Then actually stop being the route. This is where most handovers fail — one exception, and the pattern re-establishes.

## What to say to the other party

Directly, and with a reason that is about them rather than about your convenience. "She will be looking after this now, and she knows it better than I do at this point" is an endorsement rather than an abandonment.

Vagueness invites them to keep coming to you.

## What to say to the successor

What you actually know about the person: what matters to them, what they are difficult about, what history exists, what has gone wrong before.

Almost none of this is written anywhere and all of it is the substance of the relationship.

## Redirecting afterwards

When someone comes to you anyway — and they will — do not simply answer. Answer once if it is urgent, then redirect, and tell the successor it happened.

Answering quietly to be helpful is the single most common way a handover is undermined by the person who arranged it.

## The feeling

There is a real loss in this. Relationships you built, and being needed, are genuinely part of what makes the work satisfying.

Naming that honestly is better than acting it out by remaining subtly indispensable.

## The measure

Six months later, does the other party contact them first, without thinking about it?

That is the only test, and it takes that long to know.`,
          activity: {
            title: "Plan one handover properly",
            prompt:
              "Pick one relationship that exists only with you. Write the four-step plan with dates: bring them in as a participant, hand over specific pieces while present, step back visibly with what you will say, and stop being the route. Then write everything you know about that person that is not recorded anywhere — what matters to them, what they are difficult about, the history. That document is the handover.",
          },
        },
        {
          title: "Knowing when to go",
          type: "TEXT",
          points: 10,
          body: `Leaving well is a leadership act, and staying too long is a common and quiet failure.

## The signs it is time

You are the constraint. Things you decide are the things that wait, and your presence is slowing rather than enabling.

You have stopped learning. Two years of the same year repeated is a signal.

You are protecting the thing you built rather than serving what it needs — resisting changes because they are not your version.

Someone else could do it better, and you know who.

The organisation needs something you are not. A different stage frequently needs a different person, and that is not a judgement on you.

You are staying for the identity rather than the work. This one is hardest to see and worth asking someone about.

## The reasons people stay too long

It is who they are now. Leaving means becoming someone without the role, which is genuinely disorienting.

Nobody is ready — often true, and usually because succession was not started.

The money, or the status.

Believing it will fall apart. Sometimes true and usually overestimated, and it is a judgement you are the least well placed to make.

## Leaving well

Give real notice, proportional to your responsibility.

Finish what you started or hand it over cleanly. Leaving a half-done thing damages people who trusted you.

Hand over relationships properly, which takes months rather than an announcement.

Say clearly why you are going, without a subtext everyone has to decode.

Do not criticise on the way out. Whatever is true, saying it in the last week costs your successor and helps nobody.

## Afterwards

Step back genuinely. A predecessor who keeps offering opinions makes it impossible for the next person to lead — everyone can see there is a second authority.

Be available if asked. Do not be present unless asked.

## The version worth aiming for

The thing continues, improves, and eventually looks different from how you would have done it — and you can be pleased about that rather than diminished by it.

That is the point of building something rather than performing a role, and it is only visible after you have gone.`,
          activity: {
            title: "Check yourself against the signs",
            prompt:
              "Go through the six signs honestly and write yes, no or partly against each, with evidence rather than opinion. Then go through the four reasons people stay too long and mark which apply to you. Then ask one person outside your authority whether they think you are staying for the work or for the identity — and write what they said rather than what you expected.",
          },
        },
        {
          title: "What you leave behind",
          type: "TEXT",
          points: 10,
          body: `A closing lesson on what actually persists, because it is not the thing most people spend their effort on.

## What does not last

The specific work. It will be replaced, rebuilt or made irrelevant, usually sooner than expected.

The organisation in its current form. It will change beyond recognition or it will end.

Your position. Someone else holds it, and within a few years most people will not remember it was yours.

None of that is cynicism. It is the ordinary course of things and it applies to almost everyone.

## What does last

The people. How they were treated, what they learned, what they became able to do, what they took with them into the next place.

The standards, if they were held consistently enough to be transmitted. People carry a sense of how things ought to be done, and it comes from someone.

Whether it was safe to tell the truth. Someone who worked for a leader who could be told difficult things is much more likely to be that kind of leader themselves.

## The multiplication

If you develop five people well, and two of them lead others in the same way, the effect continues past anything you could achieve directly.

That is the only mechanism by which the work of one person lasts, and it happens almost entirely through the unglamorous behaviours in this course: the early conversation, the credit given away, the standard held on a bad day.

## The obligation this implies

If people depend on you, you owe them development. Not because it produces better results, though it does, but because you have influence over how their working life goes and that is not a small thing.

Most people's experience of work is largely determined by their manager. That is a serious responsibility and it is usually treated as an administrative role.

## For those with a faith

Much of the oldest thinking about authority frames it as stewardship rather than possession: the people are not yours, the position is held on trust, and you will be asked how you used it.

Those who hold that will find it clarifying. Those who do not can hold the same obligation on ordinary grounds — you have power over how other people's lives go, and that is enough.

## The question to end on

The people who worked with you: are they better off for it?

Not more productive. Better off — more capable, more confident, better treated than they expected, carrying something forward.

That is the measure, and it is available to anyone in any role, including one with no title at all.`,
          activity: {
            title: "Write to one person",
            prompt:
              "Think of someone who worked with or for you and is now doing well. Write down what part you actually played — honestly, without inflating it. Then write the message you would send them saying what you saw in them and what you were glad to have been part of. Then send it. Then write down one person currently working with you who should receive that message in three years, and what has to happen between now and then.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `The last check before the capstone. The theme is that everything durable is transmitted through people rather than through what you personally built.`,
          quiz: {
            title: "Succession and what lasts",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "Why is developing a successor not optional?",
                explanation:
                  "Because you will leave eventually, by choice or circumstance. The alternative to succession is not permanence — it is a bad handover at a bad moment. An organisation where the leader's departure is a crisis was built badly.",
                options: [
                  {
                    text: "The alternative is not permanence, it is a bad handover at a bad moment",
                    correct: true,
                  },
                  { text: "Because most organisations require it formally", correct: false },
                  { text: "Because it reduces your workload immediately", correct: false },
                  { text: "It is optional if you intend to stay", correct: false },
                ],
              },
              {
                prompt: "What most commonly undermines a relationship handover?",
                explanation:
                  "The person who arranged it answering quietly to be helpful when the other party comes to them anyway. One exception re-establishes the pattern, and the successor is undermined without anyone intending it.",
                options: [
                  {
                    text: "You continuing to answer when they come to you anyway",
                    correct: true,
                  },
                  { text: "The successor lacking technical knowledge", correct: false },
                  { text: "Announcing the change too formally", correct: false },
                  { text: "The other party disliking the successor", correct: false },
                ],
              },
              {
                prompt: "Which is a sign it is time to leave a role?",
                explanation:
                  "Protecting what you built rather than serving what it needs — resisting changes because they are not your version. It is a quiet failure and it usually comes with a good justification.",
                options: [
                  {
                    text: "You resist changes because they are not your version of the thing",
                    correct: true,
                  },
                  { text: "The work has become routine", correct: false },
                  { text: "A difficult period has begun", correct: false },
                  { text: "Someone has disagreed with your direction", correct: false },
                ],
              },
              {
                prompt: "What actually persists after you leave?",
                explanation:
                  "The people — what they learned, what they became able to do, and whether it was safe to tell the truth. The specific work, the organisation's current form and your position will all change or disappear.",
                options: [
                  {
                    text: "The people, and the standards they carry into the next place",
                    correct: true,
                  },
                  { text: "The systems and processes you built", correct: false },
                  { text: "The organisation in its current form", correct: false },
                  { text: "Your position and its authority", correct: false },
                ],
              },
              {
                prompt: "Why does a leader who cannot be replaced have a problem?",
                explanation:
                  "They have built a dependency rather than an institution. If your value rests on being the only one who can do it, you have made yourself a bottleneck and called it importance.",
                options: [
                  {
                    text: "They have built a dependency and called it importance",
                    correct: true,
                  },
                  { text: "They will be overworked", correct: false },
                  { text: "They cannot be promoted", correct: false },
                  { text: "They have no problem — that is job security", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "The weight of it",
      description:
        "Loneliness, power, and the decisions that reveal what you actually are. The part nobody warns you about.",
      lessons: [
        {
          title: "What power does to you",
          type: "TEXT",
          points: 10,
          body: `Having power over people changes the person who has it, reliably and gradually, and the change is not visible from inside.

## The documented effects

People with power interrupt more, listen less, and take more of the available speaking time — without noticing any of it.

They become worse at reading others' emotional states, which is precisely the skill the role most requires.

They apply rules more strictly to others than to themselves, and genuinely do not experience this as hypocrisy.

They overestimate how much others agree with them, because the disagreement stopped reaching them.

None of this requires a bad character. It happens to ordinary people who acquire ordinary amounts of authority.

## The specific temptations

Using authority where influence would be slower but better, because it is available and it works today.

Surrounding yourself with people who agree, which is comfortable and feels like team cohesion.

Believing your own judgement has improved, when what has improved is the enthusiasm of the responses.

Small privileges that become expected — being late, being interrupted for, having your preferences accommodated without asking.

Making exceptions for yourself on rules you enforce.

## Why the small things matter

Nobody starts by doing something serious. They start by being ten minutes late without apologising, and by having that go unremarked because of who they are.

The distance between that and something genuinely wrong is made of many small steps, each of which was normal given the last one.

## Countering it

Keep people who will tell you. Actively, at cost, protecting them when they do.

Apply rules to yourself first and visibly. The leader who queues, who apologises for lateness, who follows the process they set, is doing something structurally important rather than being modest.

Notice how much you are talking. A simple, humbling measure available in any meeting.

Have relationships outside your authority — people who knew you before, and people over whom you have no power. They will treat you normally, and the contrast is informative.

## The check

Ask yourself once a quarter: what have I started expecting that I did not use to expect?

That question catches drift earlier than any other, because drift is made of expectations rather than actions.`,
          activity: {
            title: "Look for the drift",
            prompt:
              "Answer three questions honestly in writing. What do you now expect that you did not two years ago — in how people treat you, respond to you, or accommodate you? Which of your own rules have you quietly exempted yourself from? And in the last meeting you led, roughly what proportion of the talking was yours? Then name one person who has no power relationship with you and would tell you the truth, and when you last spoke to them.",
          },
        },
        {
          title: "The loneliness nobody mentions",
          type: "TEXT",
          points: 10,
          body: `Leadership is isolating in specific ways that are worth naming, because people experience them as personal failure rather than as a structural feature of the role.

## What changes

You cannot complain to the people you lead. Your frustration is heavier coming from you, and it becomes their anxiety.

You cannot be fully honest about difficulties — a struggling business, a decision you are unsure about — without transferring the weight to people who cannot act on it.

You know things you cannot share: someone leaving, someone's personal situation, a decision not yet announced.

Friendships change. People who were peers are now managed by you, and that relationship cannot be what it was, however much both parties want it to be.

## The common mistakes

Confiding in someone you lead. It feels like closeness and it burdens them, compromises your judgement about them, and looks like favouritism to everyone else.

Pretending everything is fine. People can tell, and the pretence costs you credibility while also isolating you further.

Withdrawing entirely, which is the most common response and makes everything worse.

## What actually helps

Peers outside your organisation — other people doing the same job elsewhere. This is the single most valuable thing, and it is the thing people neglect because it takes deliberate effort with no immediate return.

A mentor or a coach: someone with no stake in your decisions who you can be fully honest with.

Relationships that predate the role, where you are not the leader.

A partner or close friend who is outside it entirely, with clear limits on what is fair to share.

## What you can say to your team

You can be honest about difficulty without transferring weight. "This is a hard period and here is how we get through it" is honest and steady. "I do not know if we will survive this" is honest and abandoning.

The distinction is whether you are giving them information they can act on, or giving them your fear to hold.

## The faith dimension, for those who have one

Many people find that this is where a practice of prayer, silence or confession earns its place — a relationship in which you are not the one in charge, and a place to put what cannot go anywhere else.

For those without it, the equivalent is a discipline of honest reflection with someone who has no stake. The need is the same; what fills it varies.

## The thing to accept

Some of this does not resolve. Parts of the role are lonely and will remain so, and expecting otherwise turns a normal feature into evidence that something is wrong with you.

Building the relationships above does not remove it. It makes it survivable, which is the realistic goal.`,
          activity: {
            title: "Build the outside relationships",
            prompt:
              "Write down who you can be fully honest with about this role — and rule out anyone you lead. If the list is short or empty, that is the finding. Then name one person doing a similar job elsewhere that you could contact this month, and write the message. Finally, write down one thing you have been carrying alone that you should be saying to someone, and who that someone is.",
          },
        },
        {
          title: "Decisions that reveal what you are",
          type: "TEXT",
          points: 10,
          body: `Most decisions are ordinary. A few are the ones that tell you and everyone else what you actually are, and they are recognisable in advance.

## What they look like

A choice between what is right and what is profitable, where nobody would know.

Whether to protect someone who cannot protect themselves, at a cost to you.

Whether to tell a client, a partner or your team something true and unwelcome.

Whether to take credit that belongs to someone else, or accept blame that is genuinely yours.

Whether to keep a promise that has become expensive.

## Deciding in advance

The reason people fail these is that they decide in the moment, under pressure, with a good-sounding reason available.

The counter is to decide beforehand, when nothing is at stake: what will I not do, whatever it costs?

Write the list. Short, specific, and yours rather than a general list of virtues. "I will not misrepresent what we can deliver to close a sale" is a line. "I will be honest" is not.

## Why in advance works

Because in the moment you will not be reasoning; you will be rationalising. And the rationalisation will be excellent, because you are intelligent and motivated.

A line drawn calmly is the only kind that holds under pressure. This is the same principle as the stopping rule in the trading courses, and it works for the same reason.

## The small ones

Almost nobody's first compromise is large. It is a small exaggeration, a slightly unfair allocation, a promise made knowing it might not hold.

Each makes the next one easier, and after enough of them the large one does not feel like a departure.

So the line is held in small things, which is inconvenient, because small things are where it feels disproportionate to hold it.

## When you fail one

You will. The response determines what it becomes.

Name it, to yourself and to anyone affected. Repair what can be repaired. Do not construct a version in which it was fine.

A leader who admits a specific failure and corrects it gains more credibility than one who has never visibly failed, because the second is not believed.

## The measure

Would you be comfortable if the people who work for you knew exactly how you made your last five significant decisions?

Not the outcomes — the reasoning. That question is a reliable test, and it is uncomfortable in proportion to how much you need to ask it.`,
          activity: {
            title: "Write the lines before you need them",
            prompt:
              "Write your list: what you will not do, whatever it costs. Make each specific enough that a stranger could tell whether you had crossed it — no general virtues. Aim for five. Then take your last five significant decisions and ask whether you would be comfortable with your team knowing the reasoning, not just the outcome. Write down any where the honest answer is no, and what you will do about it.",
          },
        },
        {
          title: "What you can now do",
          type: "TEXT",
          points: 10,
          body: `A short accounting before the capstone.

## What you can do

Tell authority from influence, and know which one your team is responding to.

Recognise avoidance dressed as kindness, in yourself, and act on it earlier.

Give feedback in three parts — behaviour, effect, alternative — specific enough to act on by Monday.

Prepare and have a difficult conversation, including saying what happens if nothing changes.

Hold a standard by correcting small things small, and apply it to your best performer as well as everyone else.

Take criticism without explaining, and make one visible change so that people keep telling you things.

Delegate authority rather than tasks, and move someone up a level deliberately.

Mentor by asking what they think first, and tell someone the truth about where they actually are.

Diagnose underperformance before deciding what it means.

Notice what power is doing to you, and keep people who will say so.

Decide your lines while nothing is at stake.

## What you know that most people leading do not

That the problem you did not name is the problem they could not fix. That vague feedback is safer for you and useless to them. That the sandwich does not work. That a standard applied inconsistently is a preference. That being needed is enjoyable and is not the same as mentoring. That the information reaching you is filtered and you will not notice. That almost nobody's first compromise is large.

## The sentence to keep

Nobody who works with me will be surprised.

If that is true, most of this course is being practised. If it is not, the specific place it fails is where the work is.

## What is left

The capstone, and then the ordinary business of it — the conversations had earlier than is comfortable, the credit given away, the standard held on a day when it would be easier not to, and the people who are better in a year than they are now.`,
          activity: {
            title: "Check the sentence",
            prompt:
              "Test the sentence: nobody who works with me will be surprised. Go through everyone you lead and ask whether each of them knows exactly where they stand with you — what you think of their work, what you want changed, and whether anything is at risk. List anyone for whom the answer is no. That list is your work, and each name is a conversation with a date.",
          },
        },
        {
          title: "Capstone: how you will lead",
          type: "ASSIGNMENT",
          points: 40,
          body: `The final piece. Not a philosophy of leadership — a specific account of how you will behave, precise enough that the people you lead could hold you to it.`,
          assignment: {
            title: "Your leadership commitments",
            instructions: `Write how you will lead. 900 to 1,400 words. Everything specific to your actual situation and the actual people in it.

**1. Who you lead.** Everyone whose behaviour changes because of what you say, including the ones without a formal relationship. State which of them currently know exactly where they stand with you and which do not.

**2. What you inherited.** How you were led, what you have caught yourself repeating, and which of it you are deliberately keeping or discarding.

**3. Influence audit.** Your four sources — competence, character, care, consistency — each with evidence from something you did. Then what happens when you are not there, stated concretely.

**4. Avoidance.** The conversation from the first assignment, what happened, and what you got wrong. Then anything still unaddressed, with a date.

**5. Feedback practice.** Your three-part format applied to a live example. Your rule on timing and privacy. How you will check that it landed.

**6. Standards.** The standards you hold, where you have been inconsistent — including with a high performer — and the lines you do not tolerate at all.

**7. Development.** Where each person sits on the four delegation levels, who you are moving up and when, and one piece of work you enjoy that you are giving away. Then the honest account of where people who worked with you before are now.

**8. What power is doing.** What you have started expecting. Rules you have exempted yourself from. Who has no power relationship with you and would tell you the truth, and when you last spoke.

**9. Your lines.** Five specific things you will not do, whatever it costs, each checkable by a stranger. Plus whether you would be comfortable with your team knowing the reasoning behind your last five significant decisions.

**10. Where this fails.** The circumstance under which you will break these commitments — under pressure, when short of money, when it is someone you like. Every leader has one. A document claiming none scores zero on that criterion.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "The account is of real people and real situations",
                weight: 15,
                descriptor:
                  "Named situations and specific relationships throughout, rather than a general philosophy of leadership.",
              },
              {
                criterion: "Avoidance is confronted with dates",
                weight: 20,
                descriptor:
                  "The held conversation reported honestly including errors, and anything still outstanding given a date. Full marks resist a flattering account.",
              },
              {
                criterion: "Standards inconsistency is admitted",
                weight: 15,
                descriptor:
                  "A real instance of a standard not applied evenly, particularly to a strong performer. Claiming perfect consistency scores low.",
              },
              {
                criterion: "Development is concrete and costly",
                weight: 20,
                descriptor:
                  "Delegation levels assigned per person, a named move, and a specific piece of enjoyable work being given away. Full marks include the honest account of where former colleagues are now.",
              },
              {
                criterion: "Power drift is examined",
                weight: 15,
                descriptor:
                  "Specific new expectations and self-exemptions named, with a real person outside the writer's authority identified.",
              },
              {
                criterion: "Lines are checkable and the failure case is named",
                weight: 15,
                descriptor:
                  "Five specific, testable commitments plus an honest account of the circumstance under which they would break. Claiming no failure case scores zero on this criterion.",
              },
            ],
          },
        },
      ],
    },
  ],
};
