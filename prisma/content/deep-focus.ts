import type { ContentCourse } from "./types";

/**
 * Deep Focus — attention, deep work and digital discipline.
 *
 * The health-and-mindset pillar's course on the one input every other course
 * in the catalogue depends on. A student who cannot hold attention for forty
 * minutes cannot complete a forty-lesson course, cannot read a chart
 * carefully, and cannot do the written exercises that make any of it stick.
 *
 * Written for an audience whose phone is also their office, their bank, their
 * social life and their trading terminal — so the advice is not "delete social
 * media", which is unavailable to most of them, but a set of structural
 * changes that survive needing the device.
 *
 * The editorial spine is that attention is a capacity rather than a virtue:
 * it is trainable, it degrades with specific measurable behaviours, and
 * willpower is the least reliable way to protect it.
 */
export const deepFocus: ContentCourse = {
  slug: "deep-focus",
  title: "Deep Focus: Attention, Deep Work and Digital Discipline",
  subtitle:
    "The capacity every other skill is built on. Why your attention span shortened, what actually restores it, and how to do hard work on a device designed to interrupt you.",
  description: `Everything else in this academy assumes something that is quietly failing for most people: the ability to hold your attention on one difficult thing long enough to get somewhere with it.

If you cannot read for forty minutes without reaching for your phone, you cannot finish a forty-lesson course, cannot read a chart carefully enough to see what is there, and cannot do the written exercises that turn reading into knowing. Skill is downstream of attention, and attention is the thing currently under the most sustained commercial attack in history.

This course treats attention as a capacity rather than a virtue. It is trainable, it degrades in specific measurable ways, and willpower is the least reliable method of protecting it — which is why people who "just try harder" fail repeatedly and conclude something is wrong with them.

You will learn what actually happens when you switch tasks, why the cost is much larger than it feels, and why the phone in your pocket reduces your available attention even when it is face down and silent. Then the practical work: building a session you can actually hold, protecting it structurally rather than by intention, and rebuilding the tolerance for boredom that deep work requires.

The approach assumes your phone is also your office, your bank and your social life. "Delete everything" is advice for people who do not need the device. This is for people who do.`,
  categorySlug: "health-and-mindset",
  level: "BEGINNER",
  priceMinor: 0,
  estimatedHours: 14,
  passThreshold: 80,
  instructorEmail: "ruth@mabyacademy.com",
  outcomes: [
    "Explain what task switching actually costs, and why it feels cheaper than it is",
    "Measure your own attention honestly rather than estimating it",
    "Build a focused session you can hold, and extend it deliberately",
    "Protect attention structurally instead of relying on willpower",
    "Reduce the pull of a device you cannot give up",
    "Rebuild a tolerance for boredom, which is what deep work requires",
    "Tell shallow work from deep work and stop confusing busyness with progress",
    "Keep a practice that survives a busy week",
  ],
  modules: [
    // =====================================================================
    {
      title: "What happened to your attention",
      description:
        "The mechanism, honestly. Not a moral failing — a capacity under specific, well-understood pressure.",
      lessons: [
        {
          title: "Why this course is in a crypto academy",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `This looks like the least relevant course in the catalogue and it is the one the others depend on.

## The dependency

Reading a chart carefully takes sustained attention. So does working through a supply schedule, checking an audit, reading a contract, or doing the written exercise at the end of a lesson.

Every course here asks for forty lessons of continued effort. A person who cannot hold thirty minutes will not finish one, and will conclude that the course was too long rather than that the input was missing.

## The thing nobody says

Most people reading this cannot currently read for forty minutes without reaching for a device. That is not a character judgement; it is close to universal, and it is recent.

The capacity was not lost through weakness. It was reduced by a decade of using tools engineered by very capable people to capture exactly that capacity, and the tools won because they were designed to.

## Why willpower is the wrong frame

Treating this as a discipline problem produces the standard cycle: resolve to focus, fail within twenty minutes, conclude you lack discipline, feel worse, and reach for the device that reliably makes feeling worse go away.

The frame that works is structural. You are not fighting your own weakness; you are competing with well-designed systems, and you win by changing the environment rather than by trying harder inside it.

## What this course does not ask

It does not ask you to delete social media, get a basic phone, or go offline. For most people here the phone is the office, the bank, the exchange and the family group. Advice that assumes otherwise is written for someone else.

What it asks is that the device stops being available by default, which is a different and achievable thing.

## What is recoverable

The capacity comes back with practice, and faster than most people expect. Someone who can hold fifteen minutes today can usually hold forty-five within a few weeks of deliberate work.

It does not come back on its own, and it does not come back through intention. It comes back through repeated sessions of exactly the thing that is currently difficult.

## The honest promise

Not that you will become someone who reads for four hours. That you will be able to do one hard thing for a sustained period, most days — which is enough to finish courses, do real work, and get meaningfully better at something.

That is a smaller claim than most productivity material makes and it is the one that survives contact with an ordinary life.`,
          activity: {
            title: "Find out where you actually are",
            prompt:
              "Set a timer and read something genuinely difficult — a lesson from another course here, or anything requiring real attention. Read until you first reach for your phone, open another tab, or find your mind somewhere else. Stop the timer then, honestly, at the first genuine break rather than the first one you notice. Write the number of minutes. Do not judge it; it is your starting measurement and you will compare against it at the end.",
          },
        },
        {
          title: "What switching actually costs",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `The single most useful piece of knowledge in this course, because the cost is real and almost entirely invisible while you are paying it.

## The residue

When you switch from one task to another, part of your attention stays on the first. It does not release cleanly, and it takes time to fully arrive at the second.

The effect is worse when the first task was unfinished, which is nearly always — you switch precisely because something interrupted you mid-thought.

## Why it feels free

Because the switch itself is instant. You look at the message, you look back, and subjectively nothing was lost.

What was lost is the depth you had built — the loaded context, the half-formed structure, the thing you were about to see. Rebuilding it takes several minutes and the rebuilding does not feel like work, so it is not counted.

## The arithmetic

If a check costs you five minutes of rebuilt context and you check twelve times in an afternoon, the afternoon is gone regardless of how many hours you sat there.

This is why people work for six hours and produce an hour of output, and conclude they are slow. They were not slow. They were switching.

## The kinds of work this destroys

Anything requiring you to hold several things in mind at once — which is most valuable work. Reading something difficult. Writing something structured. Debugging. Analysing anything with more than one moving part.

Shallow work is unaffected, which is why a fragmented day still feels productive: you cleared messages, replied to things, handled the immediate. All of it was real and none of it was the work that compounds.

## Notifications you did not open

Worth stating separately: an alert you saw and dismissed still cost you. The interruption happened at the moment of perception, not at the moment of response.

"I did not even reply" is not a defence. The residue is created by noticing.

## What follows practically

Batching. Handle messages in defined windows rather than continuously. The delay costs almost nothing and the recovered depth is substantial.

Single-tasking as a deliberate practice rather than an ideal — one thing, until a stopping point, then the next.

And accepting that a day of thirty available minutes between meetings is not a day in which deep work can happen, however many total hours it contains.`,
          activity: {
            title: "Count your switches",
            prompt:
              "Take one working session of at least an hour. Keep a tally — a mark on paper — every single time you switch: a message, a tab, a thought that sends you elsewhere, anything. Do not try to reduce it; just count. Write the total and the length of the session. Then multiply the switches by four minutes of rebuilt context and write what that says about the session you thought you had.",
          },
        },
        {
          title: "The device changes you even when it is silent",
          type: "TEXT",
          points: 10,
          body: `A specific and unsettling finding: the mere presence of your phone reduces your available attention, even face down, even silent, even untouched.

## The effect

Part of your capacity goes to not attending to it. Knowing it is there, and knowing it might have something, occupies resources continuously.

The people affected most are the ones who report the strongest attachment to their device — and they are also the ones most confident it has no effect.

## Why the usual defences do not work

Face down does not help. Silent does not help. Willing yourself not to think about it does not help, and consumes some of the capacity you were trying to protect.

The only reliable intervention is distance: the device in another room. Not in your bag under the desk — a different room, where retrieving it is a decision requiring you to stand up.

## Why the friction matters

Every barrier between an impulse and its satisfaction is a moment in which the impulse can pass.

Reaching into your pocket is one second and no decision. Walking to another room is fifteen seconds and a clear decision, and the impulse very often dissolves inside it.

You are not making the device unavailable. You are making its use conscious, which is the entire mechanism.

## Applying this when you need the device

Many people here genuinely need the phone for the work — an exchange, a client, a payment. The answer is not the phone in the room; it is defined windows.

Work in a session without it. Check at the end of the session. If something genuinely cannot wait forty minutes, that is a small category and it is worth establishing honestly rather than assuming everything is in it.

## The same for the computer

Everything above applies to browser tabs, which are the desktop version of the pocket. An open tab you are not looking at costs the same residue.

Close them. Not minimise — close. The tab you might need is a tab you are partly attending to.

## The uncomfortable test

Leave your phone in another room for one hour while you work, then notice what happens in the first ten minutes.

Most people experience something between mild unease and genuine agitation, and reach for the pocket several times without deciding to.

That reaction is the clearest possible evidence of what is being described, and it is much more persuasive than the finding.`,
          activity: {
            title: "Run the other-room test",
            prompt:
              "Work for one hour with your phone in a different room — not in a bag, a different room. Note every time you reach for your pocket or look at where it usually is, and roughly when the urge stopped. Write down what the first ten minutes felt like, honestly. Then do the same with browser tabs: close everything not required for the task, and note how many you closed and how many you reopened.",
          },
        },
        {
          title: "Boredom, and why you cannot tolerate it any more",
          type: "TEXT",
          points: 10,
          body: `Deep work requires the ability to stay with something that is not currently rewarding. That tolerance is trainable, it has been eroded, and rebuilding it is most of this course.

## What changed

Every dull moment now has an escape available in under a second — a queue, a lift, a gap between tasks, the two seconds while a page loads.

Take every one of those escapes for a decade and you train a reflex: discomfort arrives, hand moves, discomfort ends. It becomes automatic and it operates below deliberate thought.

## Why it matters for hard work

All difficult work has an unrewarding middle. The point where you do not yet understand, where progress is invisible, where it would be more pleasant to do something else.

That middle is where the understanding actually forms. A person who leaves at the first discomfort never reaches it, and experiences every difficult subject as one they are not suited to.

They are not unsuited. They left early, repeatedly, and the leaving became a habit.

## The training

Deliberately do nothing in the small gaps. Queue without your phone. Walk without headphones. Wait without filling.

This is uncomfortable at first in a way that is genuinely informative — noticing how strong the pull is, in an ordinary two-minute queue, tells you more than any argument.

## Why the small gaps matter most

Because that is where the reflex was built. You cannot train tolerance during a difficult work session if every trivial gap in the rest of your day is filled.

The capacity is general. Filling every small gap keeps it low; leaving them empty raises it, and the effect shows up in your ability to stay with hard work.

## The second thing it restores

Thinking. Ideas arrive in unfilled time — walking, waiting, showering — and a life with no unfilled time has none.

People who feel they have stopped having ideas usually have not. They have stopped having the gaps in which ideas surface.

## The practice

One walk a week with no input. No music, no podcast, no phone. Twenty minutes.

Almost everyone finds this harder than expected and most find that something useful surfaces by the end. Both of those facts are the point.`,
          activity: {
            title: "Leave the gaps empty for three days",
            prompt:
              "For three days, do not fill any gap under five minutes — queues, lifts, waiting, the moment after finishing something. No phone, no headphones, nothing. Keep a note of how many times you reached anyway without deciding to. Then take one twenty-minute walk with no input at all and write down what you thought about, including whether anything useful surfaced. Note honestly which of the three days was hardest.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on the mechanism. The theme throughout is that this is structural rather than moral — which is what makes it fixable.`,
          quiz: {
            title: "How attention degrades",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "Why does checking a message mid-task cost more than the seconds it takes?",
                explanation:
                  "Attention residue. Part of your focus stays on the interrupted task and the depth you had built — loaded context, a half-formed structure — has to be rebuilt, which takes minutes. The switch feels instant because the rebuilding does not feel like work.",
                options: [
                  {
                    text: "The context you had built has to be rebuilt, and that takes minutes",
                    correct: true,
                  },
                  { text: "Because messages usually require a reply", correct: false },
                  { text: "Because the phone screen tires your eyes", correct: false },
                  { text: "It does not — the cost is only the seconds spent", correct: false },
                ],
              },
              {
                prompt: "You saw a notification and dismissed it without replying. What did it cost?",
                explanation:
                  "The full interruption. The residue is created at the moment of perception, not at the moment of response — so 'I did not even reply' is not a defence against the cost.",
                options: [
                  { text: "The full interruption — the cost is created by noticing, not by replying", correct: true },
                  { text: "Nothing, since you did not engage with it", correct: false },
                  { text: "Roughly half of a normal interruption", correct: false },
                  { text: "Only the time taken to read it", correct: false },
                ],
              },
              {
                prompt: "What is the only reliable way to remove the attentional cost of your phone?",
                explanation:
                  "Distance — another room. Face down, silent, and willing yourself to ignore it all fail, and the last one consumes some of the capacity you were protecting. Distance makes retrieval a conscious decision rather than a reflex.",
                options: [
                  { text: "Put it in a different room, so retrieving it requires a decision", correct: true },
                  { text: "Turn it face down and silence it", correct: false },
                  { text: "Put it in a bag under the desk", correct: false },
                  { text: "Use willpower to ignore it", correct: false },
                ],
              },
              {
                prompt: "Why does filling every small gap matter for deep work?",
                explanation:
                  "Because the reflex — discomfort arrives, hand moves — is built in those gaps, and the capacity is general. You cannot train tolerance during a hard session while every trivial gap in the rest of the day is filled.",
                options: [
                  {
                    text: "The escape reflex is built in small gaps, and the capacity it erodes is general",
                    correct: true,
                  },
                  { text: "Small gaps are when most useful work happens", correct: false },
                  { text: "It only matters for people who work with their hands", correct: false },
                  { text: "It does not — only long sessions matter", correct: false },
                ],
              },
              {
                prompt: "Why is treating this as a willpower problem counterproductive?",
                explanation:
                  "It produces a cycle of resolve, failure, and self-blame — and reaching for the device is what reliably makes feeling bad go away. The structural frame works: change the environment rather than trying harder inside it.",
                options: [
                  {
                    text: "It produces a failure-and-self-blame cycle, and the relief for that feeling is the device",
                    correct: true,
                  },
                  { text: "Because willpower cannot be improved at all", correct: false },
                  { text: "Because attention is fixed from birth", correct: false },
                  { text: "It is not counterproductive — discipline is the answer", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Building the session",
      description:
        "The practical unit of deep work. Length, structure, and how to extend what you can hold.",
      lessons: [
        {
          title: "Start from what you can actually do",
          type: "TEXT",
          points: 10,
          body: `The most common failure is beginning at four hours, failing, and concluding it is not possible.

## Start from the measurement

You have a number from lesson one — the point at which your attention first broke. That is your honest starting length, and it is frequently between ten and twenty-five minutes.

Begin there, or slightly below it. A session you complete builds the capacity; a session you abandon trains the abandoning.

## Extending

Add five minutes when the current length has been comfortable for several sessions. Not when you have managed it once.

Progress is faster than people expect — often fifteen to forty-five minutes within a few weeks — and it is not linear. There will be days that are worse for reasons unrelated to practice.

## The structure of one session

A single defined task, decided before you start. "Work on the course" is not a task; "read lesson four and write the exercise" is. Deciding at the start of a session consumes the session.

A timer, visible. It removes the checking impulse — the recurring question of how long is left — which is itself a switch.

No device in the room. Nothing else open.

A hard stop when the timer ends, even if it is going well. Especially then, early on, because ending on capability rather than exhaustion is what makes you willing to start the next one.

## What to do when your mind wanders

It will, constantly, and that is not failure. The practice is returning, not never leaving.

Notice, return, without commentary. The self-criticism costs more attention than the wandering did.

## Capturing intrusions

Keep paper beside you. When something surfaces — a thing to do, a message to send, an idea — write one line and return.

This works because the mind repeats a thing partly to avoid losing it. Written down, it stops repeating.

## Between sessions

Genuine break, and not the phone. The phone is not a break for attention; it is more of the same input in a different posture.

Walk, look out of a window, get water. Five minutes of actual nothing.

## The daily number

One or two sessions is a real practice. Four is a good day. Nobody sustains eight, and material claiming otherwise is describing shallow work.

Two focused sessions daily is more than most people manage in a week, and it is enough to finish courses and get properly good at something.`,
          activity: {
            title: "Run three sessions at your honest length",
            prompt:
              "Set your session length at or just below your measured number. Run three sessions on three different days with the full structure: one defined task decided in advance, visible timer, no device in the room, paper for intrusions, hard stop. Write down for each: whether you completed it, how many times your mind wandered, and what you wrote on the paper. Then decide whether to extend by five minutes.",
          },
        },
        {
          title: "Deep work and shallow work are different jobs",
          type: "TEXT",
          points: 10,
          body: `Confusing these two is why people work long days and feel they achieved nothing.

## Deep work

Cognitively demanding, requires uninterrupted concentration, produces something that would be difficult for someone else to replicate quickly.

Learning something hard. Writing something structured. Analysing a problem with several moving parts. Building.

It is the only category that improves you, and it cannot be done in fragments.

## Shallow work

Logistical, low demand, doable while distracted. Messages, scheduling, admin, most meetings, most of what fills a day.

Necessary and largely worthless as a measure of a day. It can absorb unlimited time and it is what remains when attention is gone.

## The trap

Shallow work feels productive because it produces visible completions — inbox cleared, replies sent, calls made.

Deep work often produces nothing visible for hours, which makes it feel unproductive at exactly the moment it is working.

So a fragmented day ends feeling busy and a focused day sometimes ends feeling uncertain, and people optimise for the wrong feeling.

## Separating them

Protect a deep block first, at the time your mind is actually sharpest. For most people that is early and it is the block most readily given away.

Batch the shallow into defined windows. Twice a day is enough for most roles, and the reduction in switching is worth more than the responsiveness lost.

Never begin the day in your inbox. It sets the day to reactive, and the deep block never arrives because something more urgent always exists.

## Auditing it

For one week, mark each hour deep or shallow.

Most people find under 20% deep and are surprised, because the shallow hours were genuinely full and genuinely work.

The number itself matters less than the direction. Going from one to two deep hours a day is a doubling of everything that compounds.

## The limit worth accepting

Deep work has a ceiling. Three or four hours a day is what most people can sustain over years.

That is not a small amount. Three deep hours daily is more real output than almost anyone achieves, and the remaining hours are for the shallow work that legitimately has to happen.

The goal is not to make the whole day deep. It is to stop the day having none.`,
          activity: {
            title: "Audit a week and protect one block",
            prompt:
              "For one week, mark each working hour as deep or shallow. Total them and write your deep percentage. Then look at when your deep hours occurred and when your mind is actually sharpest — for most people these do not match. Finally, protect one block at your sharpest time as a repeating calendar entry, and write what shallow work you will move to a defined window to make room for it.",
          },
        },
        {
          title: "Protecting the block structurally",
          type: "TEXT",
          points: 10,
          body: `A block protected by intention is not protected. It survives one busy week and then quietly stops existing.

## Why intention fails

Because in the moment, everything else is more urgent, and the block is the only thing with no external pressure behind it.

Nobody complains when you skip your focused hour. Everybody complains when you skip their meeting. The incentive is entirely one-directional.

## Structural protection

In the calendar, as a real entry, recurring. Not a note in your head.

Named as something. "Deep work" is easy to move; a named piece of work looks like a commitment.

Same time daily. A variable block requires a decision each day, and the decision goes badly under pressure.

Somewhere else, if possible. A different room, a different desk, anywhere with an association. Location is a surprisingly strong cue.

## Telling people

Say it out loud. "I am not available before eleven" is a normal thing to say and most people accommodate it without difficulty.

Unstated boundaries are not boundaries; they are hopes, and they are broken without anyone knowing they existed.

## The genuine exceptions

There are some. A real emergency, a client in crisis, a family matter.

The test: would this still matter in two hours? Almost everything would, and the small category that would not is manageable if you say so in advance.

## Recovering after a break

Missing a day is ordinary. Missing three is a pattern.

The recovery is to restart at a shorter length rather than at your best. Trying to resume at forty-five minutes after a fortnight off produces a failed session and a reason to stop entirely.

## The protection that matters most

The first fifteen minutes. That is where the block is lost — a quick check before starting, one message, and the session is gone.

Begin with the device already elsewhere, the task already decided, and the timer already running. Removing the decisions at the start removes the failure point.

## The honest expectation

You will lose the block regularly. The practice is not perfection; it is noticing quickly and restarting, rather than concluding it does not work for you.

Someone who protects it four days out of five for a year has done something significant. Someone who requires seven to count it has usually stopped by March.`,
          activity: {
            title: "Put it in the calendar and tell someone",
            prompt:
              "Create the block as a recurring calendar entry with a specific name — a real piece of work, not 'focus time' — at the same time each day, at your sharpest hour. Then tell at least one person the boundary out loud: 'I am not available before X.' Write down who you told and what they said. Then write your two genuine exceptions, and check them against the test: would this still matter in two hours?",
          },
        },
        {
          title: "The hardest part is starting",
          type: "TEXT",
          points: 10,
          body: `Most failed sessions are not abandoned in the middle. They never begin.

## Why starting is hard

The first minutes of difficult work are the least rewarding. You are loading context, remembering where you were, confronting what you do not yet understand.

Anything else available is more immediately pleasant, and the mind is very good at supplying a reason why the other thing is actually necessary first.

## The reasons that are not reasons

I will just clear my messages first. This never takes the time you allocate and it puts you in reactive mode.

I need to be in the right frame of mind. The frame of mind arrives a few minutes after starting, not before. Waiting for it means never starting.

I do not have enough time for a proper session. Twenty minutes is a session. This reason is available every day.

I am not sure where to begin. Real, and solved the night before rather than at the start of the session.

## What actually works

Decide the first action in advance, specifically. Not "work on the analysis" but "open the file and write the first paragraph of the summary". A first action small enough to be trivially begun.

Leave it half-finished the night before. Stopping mid-sentence gives you an obvious re-entry point, and the discomfort of an unfinished thing pulls you back.

Reduce the friction to zero. Everything open, or everything closed, whichever the task needs. Nothing to arrange when the timer starts.

Start badly on purpose. Give yourself permission for the first ten minutes to be poor work. It removes the standard that was making it hard to begin, and the work usually improves once you are in it.

## The five-minute agreement

Commit to five minutes only, with genuine permission to stop.

Almost always you continue, because starting was the barrier rather than the work. And on the days you genuinely stop at five, that was a day when stopping was correct.

## Repetition removes the decision

The strongest protection is that it is simply what you do at that time. A practice that requires deciding each day loses to whatever is more appealing.

That takes weeks, and it is why consistency matters more than length early on. A month of short daily sessions builds something a week of long ones does not.`,
          activity: {
            title: "Set up tomorrow's start tonight",
            prompt:
              "Tonight, do three things for tomorrow's session: write the specific first action — small enough to be trivially begun — leave the work itself half-finished if you can, and arrange the environment so nothing needs setting up. Then tomorrow, use the five-minute agreement: commit to five only, with real permission to stop. Write down what your first action was, whether you continued past five, and what almost stopped you starting.",
          },
        },
        {
          title: "Assignment: two weeks of practice",
          type: "ASSIGNMENT",
          points: 25,
          body: `The first graded piece, and it requires two weeks of actual practice rather than a plan. Start now and submit when you have the data.

It is graded on honesty and on what the record shows, not on whether the practice went well.`,
          assignment: {
            title: "A two-week focus log",
            instructions: `Run a focus practice for two weeks and report what happened. 600 to 900 words plus your log.

**1. Your starting measurement.** The number from lesson one — how long you lasted before the first genuine break — and the conditions you measured it in.

**2. The design.** Your session length, time of day, location, how you protected it structurally, and who you told.

**3. The log.** Every session across two weeks: date, planned length, whether you completed it, roughly how many times your mind wandered, and what you wrote on the intrusion paper. Include the days you missed and why.

**4. The switch count.** From lesson two, plus a second count taken in week two. Report both numbers.

**5. What broke it.** The specific things that ended or prevented sessions. Be precise — "I was busy" is not a finding. Which of them were genuine exceptions by the two-hour test, and which were not?

**6. The device.** What you changed about where your phone is during sessions, and what the first ten minutes of the other-room test felt like. Whether the boredom practice in small gaps changed anything.

**7. Deep versus shallow.** Your audit percentage, when your deep hours actually occurred, and whether that matched your sharpest time.

**8. Where you are now.** A repeat of the lesson-one measurement at the end of two weeks. Both numbers side by side.

**9. What you will keep.** The version of this practice you will still be running in three months — which should be smaller than what you did for two weeks, because a practice you sustain beats one you abandon.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "The practice actually ran for two weeks",
                weight: 25,
                descriptor:
                  "A real log with dates including missed days. A plan without a log scores low regardless of how well designed it is.",
              },
              {
                criterion: "Measurements are before and after",
                weight: 20,
                descriptor:
                  "Starting and closing attention measurements, plus two switch counts. Full marks report an unflattering result honestly rather than omitting it.",
              },
              {
                criterion: "What broke it is specific",
                weight: 20,
                descriptor:
                  "Named causes tested against the two-hour rule, distinguishing genuine exceptions from avoidance. 'I was busy' scores nothing.",
              },
              {
                criterion: "Structural protection, not intention",
                weight: 15,
                descriptor:
                  "Calendar entry, stated boundary told to a real person, device relocated. Relying on willpower scores low.",
              },
              {
                criterion: "The deep-shallow audit was done",
                weight: 10,
                descriptor:
                  "A real percentage with the timing compared against the writer's sharpest hours.",
              },
              {
                criterion: "The kept version is smaller than the trial",
                weight: 10,
                descriptor:
                  "A sustainable practice the writer will plausibly still run in three months. An ambitious commitment scores lower than a defended modest one.",
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "The environment",
      description:
        "Changing what is available rather than what you intend. Devices, notifications, and the people around you.",
      lessons: [
        {
          title: "Making the phone less compelling",
          type: "TEXT",
          points: 10,
          body: `Assuming you need the device, here is what actually reduces its pull, in order of effect.

## Notifications

Turn off everything except direct human contact from specific people. Not "reduce" — off.

Every app defaults to notifications because attention is its business model. Nothing is enabled by default for your benefit.

This single change is the largest available and takes fifteen minutes.

## Home screen

Only tools — things you open for a purpose and close. Messages, maps, camera, banking.

Nothing you open out of habit. If an app is opened without a reason, it should require searching for it, which reintroduces the moment of decision.

## Greyscale

Removing colour reduces the pull measurably. The interfaces are designed with colour doing real work, and without it they are noticeably less compelling.

Most people find this the single most effective change and also the one they revert soonest, which is itself informative.

## The lock screen

Remove message previews. A visible preview is an interruption whether or not you open it, and it is often enough to pull you in.

## Removing the worst one

Most people have one application accounting for most of the loss. You know which it is.

Options in increasing strength: remove the notification, remove it from the home screen, use it only in a browser, remove it from the phone and keep it on a computer.

The browser version is frequently the right balance — it remains available and it is meaningfully less pleasant to use, which is the intention.

## Charging elsewhere

Overnight in another room, with a separate alarm.

This changes two things: the last thing before sleep and the first thing on waking, both of which set the tone for a day more than people expect.

## What does not work

Screen-time limits you can dismiss. You will dismiss them.

Willpower. Covered already.

Deleting and reinstalling. The reinstall is two minutes and the cycle teaches you that the barrier is not real.

## The realistic outcome

Not a dramatic reduction in use. A reduction in unconscious use — the opens that were not decisions.

That is where most of the loss is, and it is the part that responds to friction rather than to intention.`,
          activity: {
            title: "Make five changes today",
            prompt:
              "Do five things now: turn off every notification except direct contact from named people, clear your home screen to tools only, try greyscale for a day, remove lock-screen previews, and apply one intervention to your single worst application. Write down which you did, which you reverted within a day, and what your daily screen time was before and one week after. The one you reverted fastest is the one worth examining.",
          },
        },
        {
          title: "The space you work in",
          type: "TEXT",
          points: 10,
          body: `Environment does more work than motivation, and it is much cheaper to change.

## One place for focused work

A specific location used only for this, where possible. The association builds and sitting down starts to produce the state rather than requiring it.

Not the sofa. Not the bed. Not the place where you also relax, because the association will be the stronger one.

## What is in view

Nothing related to other tasks. A visible pile of other work occupies attention continuously, in the same way the phone does.

Clear the surface. Not for tidiness — for the same reason as the closed tabs.

## Sound

Silence is best for most people and is often unavailable.

Consistent noise without words is the practical alternative — rain, a fan, instrumental. Anything with lyrics competes for the language system you are using to read and write.

Music with words feels like it helps and measurably does not, for verbal work.

## The people

The largest environmental factor and the one least addressed.

Household or colleagues who interrupt freely will end every session regardless of what you do with your phone.

The conversation is the same one as in the leadership course: state the boundary explicitly, with a time, and say what an actual exception is. Unstated boundaries are hopes.

## The signal

Something visible that means you are unavailable — a closed door, headphones, a note. It works because it removes the judgement from the other person about whether this is a good moment.

## Light and body

Daylight where possible. Facing a window helps most people.

Water within reach, so that getting up is not required. A break taken for a legitimate reason frequently does not return.

And the ordinary things: sleep, having eaten, not being in pain. No environmental optimisation compensates for four hours of sleep, and the largest single improvement available to most people is not a technique.

## The minimum

One place, cleared, no phone, door shut or headphones on, water present, at the same time each day.

Everything above that is refinement.`,
          activity: {
            title: "Set up one place properly",
            prompt:
              "Choose and set up one location for focused work: clear the surface, remove anything related to other tasks, arrange light and water, and establish your unavailability signal. Then have the boundary conversation with whoever shares your space — state the time and what a real exception is — and write down what you said and how they responded. Finally, note honestly whether sleep is currently the larger problem.",
          },
        },
        {
          title: "Inputs and the state you arrive in",
          type: "TEXT",
          points: 10,
          body: `What you consume before working determines the state you bring to it, and most people arrive already fragmented.

## The first hour

Beginning the day with feeds, messages or news puts you in a reactive, fast-switching mode, and that mode does not clear quickly.

Most people's most valuable hour is spent this way and the remainder is spent trying to recover from it.

## The alternative

Do something requiring attention before consuming anything. Even fifteen minutes of reading, writing or work establishes the day differently.

This is the highest-return change in the course for most people and it costs nothing but a rearrangement.

## Volume

Continuous consumption of short, fast content trains the expectation that stimulation is constant.

Read something long once a week. A book, a long article, anything requiring sustained attention. This is training as much as it is reading.

## The news problem

Most news is fast, emotionally charged, and not actionable by you. It occupies attention and produces an agitation that persists into work.

Once a day, deliberately, from a source that summarises rather than streams, is sufficient for almost everyone and removes the continuous drip.

## After work

Recovery matters, and what most people do for recovery is not recovery. Scrolling is more input, not rest.

Genuine recovery: walking, conversation, physical activity, anything with no screen. People who feel exhausted despite not working hard are usually consuming continuously rather than working hard.

## Before sleep

Screens late affect sleep, and sleep is the largest single input to next-day attention.

The practical version, given phones are alarms and readers: stop the fast, emotional, social input an hour before bed. Reading is fine. The feed is not.

## The honest framing

You are not going to consume nothing. The realistic goal is that consumption is chosen rather than continuous, and that it is not the first or last thing in your day.

Those two boundaries — the first hour and the last — do most of the work available here.`,
          activity: {
            title: "Move the first hour",
            prompt:
              "For one week, do something requiring attention before consuming anything — no feeds, messages or news for the first hour. Write down what you did instead and how the day differed, honestly, including any day it failed and why. Then do the same at the end: no fast input in the hour before sleep. Note which of the two was harder and what your sleep was like.",
          },
        },
        {
          title: "When you cannot control the environment",
          type: "TEXT",
          points: 10,
          body: `Much of the advice above assumes a degree of control that many people do not have. This lesson is for the rest.

## Shared and crowded spaces

If you share a room, a house with many people, or work in an open office, the deep block may not be available at the times everyone else is present.

The realistic answer is time rather than space: early morning or late evening, when the environment changes without you having to change it.

Many people find that thirty minutes at five in the morning is more available than two hours at eight in the evening, unpleasant as it sounds.

## Unreliable power and connectivity

Where power or internet is intermittent, the discipline is to have work prepared that does not need them. Reading downloaded, writing offline, thinking on paper.

An outage then becomes a focused block rather than an interruption, which inverts the problem entirely.

## Work that requires responsiveness

If your job genuinely requires being reachable, the deep block moves rather than disappears. Before the day starts, after it ends, or a defined hour agreed with whoever needs you.

Agreeing it explicitly is what makes it possible. An unstated attempt to be unreachable inside a responsive role fails and damages trust.

## Caring responsibilities

Sessions may need to be twenty minutes rather than ninety, taken when they are available rather than at a chosen time.

Twenty minutes is a real session. The material claiming four uninterrupted hours are necessary is written by people whose lives permit it, and it is not a standard to measure yourself against.

## The principle underneath

Everything in this course reduces to two things: reduce the available interruptions, and repeat the practice.

Both are achievable in almost any circumstance, at some length, at some hour. The specific advice about rooms and hours is implementation, not the point.

## What not to do

Conclude that because the ideal version is unavailable, the practice is unavailable.

Twenty minutes at an awkward hour, four days a week, in a room with other people, with the phone in a drawer, is a real practice and it will change what you can do within a couple of months.

The person who does that outperforms the person waiting for conditions to permit something better.`,
          activity: {
            title: "Design the version that fits your life",
            prompt:
              "Write your honest constraints: who shares your space, when it is quiet, what your obligations are, whether power or connectivity is reliable, and whether your work requires responsiveness. Then design the version of this practice that actually fits — the length, the hour, the place, and what you will do when the usual conditions fail. Then run it three times this week and write what happened.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on environment. The theme is that changing what is available beats changing what you intend, and that the ideal version is not required.`,
          quiz: {
            title: "Environment and inputs",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "What is the single highest-return change to a phone?",
                explanation:
                  "Turning off every notification except direct human contact from specific people. Every app defaults to notifications because attention is its business model — nothing is enabled by default for the user's benefit.",
                options: [
                  { text: "Turning off all notifications except direct contact from named people", correct: true },
                  { text: "Setting a daily screen-time limit", correct: false },
                  { text: "Deleting and reinstalling apps as needed", correct: false },
                  { text: "Keeping it face down while working", correct: false },
                ],
              },
              {
                prompt: "Why is music with lyrics a poor choice for reading or writing?",
                explanation:
                  "It competes for the same language system you are using. It feels like it helps and measurably does not for verbal work — consistent wordless noise is the practical alternative when silence is unavailable.",
                options: [
                  { text: "It competes for the language system the work is using", correct: true },
                  { text: "It is too loud to concentrate through", correct: false },
                  { text: "It makes people work faster and less accurately", correct: false },
                  { text: "It does not — lyrics have no measurable effect", correct: false },
                ],
              },
              {
                prompt: "Why does starting the day with feeds and messages cost so much?",
                explanation:
                  "It establishes a reactive, fast-switching mode that does not clear quickly, and it consumes the hour most people are sharpest. Doing something requiring attention first is the highest-return rearrangement available.",
                options: [
                  {
                    text: "It sets a reactive mode that persists, and spends your sharpest hour",
                    correct: true,
                  },
                  { text: "It uses up the day's willpower allowance", correct: false },
                  { text: "It is only a problem if the news is bad", correct: false },
                  { text: "It does not matter if the rest of the day is protected", correct: false },
                ],
              },
              {
                prompt: "You share a crowded space and cannot control it. What is the realistic answer?",
                explanation:
                  "Change the time rather than the space — early morning or late evening, when the environment changes without you having to change it. Many find thirty minutes at five is more available than two hours in the evening.",
                options: [
                  { text: "Move the session to a time when the environment is different", correct: true },
                  { text: "Wait until you can arrange a dedicated room", correct: false },
                  { text: "Use noise-cancelling headphones and work as normal", correct: false },
                  { text: "Accept that deep work is not available to you", correct: false },
                ],
              },
              {
                prompt: "Is scrolling a form of recovery after focused work?",
                explanation:
                  "No — it is more input in a different posture. Genuine recovery is walking, conversation, physical activity, anything without a screen. People exhausted despite not working hard are usually consuming continuously.",
                options: [
                  { text: "No — it is more input, not rest", correct: true },
                  { text: "Yes, provided it is light content", correct: false },
                  { text: "Yes, if limited to short periods", correct: false },
                  { text: "It depends on whether the work was verbal or numerical", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "The body underneath",
      description:
        "Attention runs on a body. Sleep, movement and food change it more than any technique in this course.",
      lessons: [
        {
          title: "Sleep is the whole foundation",
          type: "TEXT",
          points: 10,
          body: `No technique in this course compensates for insufficient sleep, and most people trying to fix their focus are trying to fix the wrong variable.

## What short sleep does specifically

Reduces sustained attention first, before anything else. The capacity this whole course is about is the one most sensitive to sleep loss.

Impairs the ability to filter distraction, so the same environment becomes harder to work in.

Degrades judgement about your own state. Tired people reliably rate their own performance as normal while performing measurably worse, which is why the deficit is invisible from inside.

## The accumulation

A week of six hours produces impairment comparable to a night of none, and the person experiences it as normal because the decline was gradual.

This is why "I function fine on six hours" is unreliable evidence. You have no calibration point.

## The realistic barriers

Late work, because the block was lost during the day. Screens and fast input in the last hour. A phone by the bed. Caffeine later than the body clears it.

Each is addressable and none requires a change in circumstances.

## The changes that do most

A consistent wake time, including at weekends. More effective than a consistent bedtime, because it anchors the whole rhythm.

Phone charging in another room. Covered already, and it is here as well because it affects both ends of the day.

No fast, emotional input in the last hour. Reading is fine.

Caffeine cut off much earlier than feels necessary — it has a long half-life and it affects sleep quality even when it does not prevent sleep.

## The test

For one week, add an hour. Not a perfect regime — one extra hour, however achieved.

Then measure your attention with the same test from lesson one and compare.

For most people this single change outperforms every technique in this course, which is worth knowing before spending months optimising sessions on four hours of sleep.

## The honest note

Some people cannot get more sleep — a new child, shift work, a second job, an unwell family member.

If that is you, the answer is not guilt. It is to expect less of your attention during that period, protect the smallest viable practice, and know that the capacity returns when the circumstance changes.

Treating an unavoidable constraint as a personal failure is the most common and least useful response to it.`,
          activity: {
            title: "Add an hour for a week, then measure",
            prompt:
              "For one week, add an hour of sleep by any means — earlier to bed, later wake, a fixed wake time, whatever fits. Track roughly how long you slept each night. At the end, repeat the attention measurement from lesson one and compare it to your starting number. Write both. Then note which of the four barriers — late work, screens, phone by the bed, late caffeine — is the one actually costing you.",
          },
        },
        {
          title: "Movement, and what it does to the head",
          type: "TEXT",
          points: 10,
          body: `Physical activity affects attention directly and quickly, and it is the second largest lever after sleep.

## The immediate effect

A single session of moderate exercise improves attention and working memory for a period afterwards — hours rather than minutes.

Which means the placement matters: movement before a deep block is not time taken from the block, it is preparation for it.

## The cumulative effect

Regular activity improves baseline attention over weeks, independent of the immediate boost.

It also improves sleep, which loops back to the previous lesson, and reduces the background anxiety that makes sitting still difficult.

## What counts

Less than people assume. Brisk walking counts. Twenty minutes counts. It does not require a gym, equipment, or a programme.

The most common barrier is believing that it does not count unless it is serious, which produces nothing rather than something.

## The sitting problem

Long unbroken sitting degrades attention within the session itself, separately from fitness.

Standing and moving for two minutes every half hour is measurably better than not, and it does not break a focus session if it is done without a device in hand.

The version that fails is standing up and reaching for the phone, which converts a physical break into a switch.

## Placement for this course

Movement before your deep block, on the days that is possible. Even ten minutes.

A short walk between sessions rather than a screen. This is the genuine recovery from the earlier lesson and it does two jobs at once.

## The bidirectional trap

Low attention makes exercise feel harder to start, and no exercise lowers attention.

The way out is the same as with sessions: reduce the size until starting is trivial. Ten minutes of walking is not a compromise version; it is the version that happens.

## The honest framing

This is not a fitness course and there is one in the catalogue. What matters here is narrow: movement is an input to the capacity this course is about, and it is the cheapest one available after sleep.

Someone who walks twenty minutes before their block will out-focus someone who does not, holding everything else equal — and that is a large effect for a small cost.`,
          activity: {
            title: "Put movement before the block",
            prompt:
              "For one week, do ten to twenty minutes of movement immediately before your deep block — walking counts. Note for each session whether you moved first and how the session went, using your usual wander count. Then compare the moved and unmoved days. Also try the two-minute break every half hour within a long session, without touching a device, and write whether it helped or broke the session.",
          },
        },
        {
          title: "Food, water and the afternoon collapse",
          type: "TEXT",
          points: 10,
          body: `Ordinary, unglamorous inputs that produce large swings in the capacity this course is about.

## Dehydration

Mild dehydration measurably reduces concentration, and most people are mildly dehydrated for much of the day without noticing.

Thirst is a late signal. By the time you register it, the effect has been present for a while.

The fix is trivial and it is genuinely one of the highest ratios of effect to effort available: water within reach, drunk regularly rather than when noticed.

## Blood sugar

Large, fast-releasing meals produce a rise and then a drop, and the drop is the afternoon collapse most people attribute to the time of day.

The pattern is more reliable than people expect once they look for it: heavy lunch, then ninety minutes of near-useless attention.

## What helps

Smaller meals, more often, with protein and slower-releasing carbohydrate rather than fast sugar.

Not skipping meals entirely, which produces its own crash later and worse decisions in between.

This is not a nutrition course. The narrow point is that a heavy meal before your best block will cost you the block.

## Placement

Deep work before the largest meal of the day, wherever that is possible.

For most people that means the morning block happens before lunch, and the afternoon is used for shallower work — which matches the natural dip anyway.

## Caffeine, honestly

It works. It genuinely improves attention in the short term.

Two caveats. It borrows against sleep if taken late, which returns the deficit with interest. And tolerance builds, so the person drinking six cups is largely treating withdrawal rather than gaining anything.

The useful pattern: earlier in the day, less than you currently take, and used before a block rather than continuously.

## The afternoon

Rather than fighting the dip with more caffeine, use it. Shallow work, admin, messages, anything that does not require depth.

Trying to force deep work into the worst hour of your day, then concluding you cannot focus, is a scheduling error rather than an attention problem.

## The check

For one week, note what you ate and drank before each session and how the session went.

Most people find one clear pattern within a week, and it is usually the one they suspected and had not confirmed.`,
          activity: {
            title: "Log inputs against sessions for a week",
            prompt:
              "For one week, note before each session: what you last ate and how long ago, how much water you have had, and any caffeine and when. Then rate the session honestly. At the end, look for the pattern — there is usually one obvious one. Write what you found. Then make one change: water within reach at all times, or moving your deep block before the largest meal.",
          },
        },
        {
          title: "Anxiety, and why you cannot sit still",
          type: "TEXT",
          points: 10,
          body: `Sometimes the inability to focus is not an attention problem. It is that sitting quietly with your own mind is uncomfortable, and the device is the escape.

## How to tell the difference

An attention problem: you want to work, you start, and you drift.

An avoidance problem: you cannot bring yourself to start, you feel restless when you do, and the pull is toward anything that removes the feeling rather than toward anything in particular.

The second is common among people building something under financial pressure, which describes much of this academy's audience.

## What drives it

Uncertainty about money. A situation you cannot currently solve. A decision you are avoiding. Something in your life you are not looking at.

The mind returns to it whenever it is unoccupied, and the phone is extremely good at occupying it.

## Why this matters here

Because no amount of technique fixes it. Someone in this state will do the sessions badly, conclude the practice does not work, and be right — the practice is addressing the wrong thing.

## What helps

Name the thing. Write down what you are actually anxious about, specifically. Vague dread is worse than a specific problem, and much of the weight is that it has not been articulated.

Separate what you can act on from what you cannot. For anything actionable, take the smallest next step, today. Action reduces the loop more than reassurance does.

For what you cannot act on, a written statement of that fact is genuinely useful — the mind returns to unsolved problems and it returns less to ones it has been told are currently unsolvable.

Physical movement, which was two lessons ago and is one of the most reliable reducers of this specific state.

## Talking to someone

If it is persistent, this is the intervention rather than another productivity technique.

That may be a friend, a mentor, someone in a faith community, or a professional. The choice matters less than that it is not only inside your own head.

## Where it becomes something else

If this is constant, affecting sleep and appetite, and not connected to a specific solvable thing, it is worth treating as health rather than as focus.

That is not a failure and it is not outside the scope of a course about attention — attention is a health outcome, and pretending otherwise sends people round a loop of technique that was never going to work.

## The practical instruction

Before assuming your focus practice is failing, ask whether you are avoiding something.

The answer is frequently yes, and addressing the actual thing does more for your attention than any change to your session structure.`,
          activity: {
            title: "Name what you are avoiding",
            prompt:
              "Write down what is actually occupying your mind when you cannot settle — specifically, not 'work stress'. Then split the list into what you can act on and what you cannot. For the first item you can act on, take the smallest possible step today and write what it was. For anything you cannot act on, write that fact down plainly. Then decide whether this is something to tell someone about, and who.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on the physical inputs. The theme is that several of these outperform every technique in this course, and people optimise sessions while ignoring them.`,
          quiz: {
            title: "The body underneath",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "Why is 'I function fine on six hours' unreliable evidence?",
                explanation:
                  "Sleep loss degrades judgement about your own state. Tired people rate their performance as normal while performing measurably worse, and after a week of short sleep there is no calibration point left to compare against.",
                options: [
                  {
                    text: "Sleep loss impairs the judgement you would use to assess it",
                    correct: true,
                  },
                  { text: "Because six hours is enough for most people", correct: false },
                  { text: "Because the effect only appears after several months", correct: false },
                  { text: "It is reliable if you feel alert", correct: false },
                ],
              },
              {
                prompt: "When is the best time to exercise relative to a deep block?",
                explanation:
                  "Before it. A single session of moderate activity improves attention and working memory for hours afterwards, so movement before a block is preparation for it rather than time taken from it.",
                options: [
                  { text: "Before, since the boost to attention lasts hours", correct: true },
                  { text: "After, so it does not tire you before working", correct: false },
                  { text: "It makes no difference when", correct: false },
                  { text: "Only on days you are not doing deep work", correct: false },
                ],
              },
              {
                prompt: "What commonly causes the afternoon collapse?",
                explanation:
                  "A large, fast-releasing meal producing a rise and then a drop. The pattern is more reliable than people expect once they look for it, and it is usually attributed to the time of day rather than to lunch.",
                options: [
                  { text: "A heavy meal, whose drop is blamed on the time of day", correct: true },
                  { text: "Natural circadian rhythm alone", correct: false },
                  { text: "Insufficient caffeine after midday", correct: false },
                  { text: "Accumulated screen exposure", correct: false },
                ],
              },
              {
                prompt: "How do you tell an attention problem from an avoidance problem?",
                explanation:
                  "An attention problem: you start and drift. Avoidance: you cannot bring yourself to start, feel restless, and the pull is toward anything that removes the feeling. No technique fixes the second, which is why the practice appears not to work.",
                options: [
                  {
                    text: "Attention drifts after starting; avoidance prevents starting and feels restless",
                    correct: true,
                  },
                  { text: "Avoidance only happens with work you dislike", correct: false },
                  { text: "They are the same problem with different names", correct: false },
                  { text: "Avoidance improves with a longer session length", correct: false },
                ],
              },
              {
                prompt: "You cannot get more sleep because of a new child. What is the right response?",
                explanation:
                  "Expect less of your attention during that period, protect the smallest viable practice, and know the capacity returns when the circumstance does. Treating an unavoidable constraint as a personal failure is the most common and least useful response.",
                options: [
                  {
                    text: "Expect less, keep the smallest viable practice, and do not treat it as failure",
                    correct: true,
                  },
                  { text: "Increase caffeine to compensate", correct: false },
                  { text: "Stop the practice until circumstances change", correct: false },
                  { text: "Extend session length to make up lost ground", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Learning hard things",
      description:
        "Attention applied to study. Why re-reading fails, what actually produces retention, and how to work through material you do not yet understand.",
      lessons: [
        {
          title: "Why re-reading feels like learning and is not",
          type: "TEXT",
          points: 10,
          body: `The most common study method is also among the least effective, and the reason it survives is that it feels productive.

## The illusion

Reading something a second time is easier than the first. That ease is experienced as understanding.

It is not understanding. It is familiarity, which is a different thing and is a poor predictor of whether you can use the material.

## The test that exposes it

Close the material and write what it said, from memory, in your own words.

Almost everyone who has re-read three times and feels confident produces very little. That gap between felt confidence and actual recall is the entire problem, and it is why people are surprised by tests.

## What works instead

Retrieval. Trying to recall the material without looking, before checking.

This feels worse and is measurably better. The difficulty is the mechanism — the effort of retrieval is what strengthens the memory, so a method that feels easy is doing less.

## The practical version

After reading a section, close it and write down what it said. Then check. Then note specifically what you missed.

That is the whole technique and it is roughly twice as effective per minute as re-reading.

## Spacing

Reviewing at increasing intervals — a day, three days, a week, a month — retains far better than the same total time spent in one block.

Cramming works for a test in the morning and it does not survive to the following month. If you intend to use the material rather than pass something, spacing is not optional.

## Applied to this academy

Each lesson here ends with a written exercise. That is retrieval, and it is why the courses are gated on it rather than on opening the page.

Someone who reads forty lessons without doing the exercises has been entertained. Someone who does them has learned, and the difference is visible a month later.

## The uncomfortable implication

Effective study feels harder and less pleasant than ineffective study.

Which means the feeling of a good study session is a poor guide, and people optimise toward the method that feels best. The correct expectation is mild frustration and a sense of not quite having it, which is what learning actually feels like from inside.`,
          activity: {
            title: "Run the closed-book test",
            prompt:
              "Take a lesson you have already read from any course here and feel you understood. Without looking, write down everything it said in your own words. Then open it and mark what you missed. Write down how much you actually recalled as a rough percentage. Then re-do the exercise for that lesson properly, and note the difference between how it felt and how much you retained.",
          },
        },
        {
          title: "Working through what you do not understand",
          type: "TEXT",
          points: 10,
          body: `Every worthwhile subject contains a section you do not understand on first reading. What you do at that moment determines whether you learn it.

## The two responses

Skip it and continue, planning to return. You will not return, and everything afterwards is built on the gap.

Stay with it. Uncomfortable, slow, and the only one that works.

## Why people skip

Because not understanding feels like evidence of inadequacy, and continuing restores the feeling of progress.

Reframing this is genuinely useful: not understanding is the normal state at the point of learning something. It is what learning feels like immediately before it happens, rather than a signal that you are unsuited.

## The sequence that works

Read it again slowly, aloud if necessary. A surprising proportion of confusion is insufficiently careful reading.

Identify the specific point of failure. Not "I do not get this section" but "I do not know what this term means" or "I cannot see why the second step follows". Precision usually reduces a large fog to a small definite gap.

Look up the one thing. Frequently the whole section resolves.

Explain it out loud to nobody. The point where you stumble is the point you do not have.

Write it in your own words. If you cannot, you do not understand it yet, and the sentence you cannot finish shows you where.

Find one other explanation. A different author, a different angle. Sometimes the first explanation was simply poor.

## When to move on

If you have spent a genuine effort — say thirty minutes across the steps above — and it has not resolved, note it specifically and continue.

Mark what you did not get, precisely. Then return to it after the next section, because later material frequently makes earlier material obvious.

That is different from skipping, because the gap is recorded rather than forgotten.

## The compounding problem

Skipped gaps accumulate. Three sections later you are confused for reasons you cannot locate, and the honest cause is four pages back.

If you find yourself lost with no clear reason, go back rather than forward. The problem is almost always behind you.

## The mark of someone learning well

They can say exactly what they do not understand.

Someone who says "I do not get any of this" has usually not engaged closely enough to locate the failure. Someone who says "I follow it until this step, and I cannot see why it follows" is about to understand it.`,
          activity: {
            title: "Locate one specific gap",
            prompt:
              "Find something in any course here that you did not fully understand and moved past. Go back to it and work the sequence: reread slowly, locate the precise point of failure, look up the one thing, explain it aloud, write it in your own words, find another explanation. Write down what the precise gap turned out to be — it is usually much smaller than the fog suggested — and whether it resolved.",
          },
        },
        {
          title: "Notes that are worth taking",
          type: "TEXT",
          points: 10,
          body: `Most note-taking is transcription, which produces a record you will not read and no learning at the time.

## Why copying fails

Writing down what was said requires almost no processing. It feels diligent and it is close to inert.

Worse, it occupies the attention that would otherwise be doing the understanding. The person taking full notes frequently understands less than the person listening.

## What a useful note is

Written after, not during, from memory. This makes it retrieval rather than transcription.

In your own words. If it is a quotation, you have not processed it.

Short. A note longer than a paragraph per section is a transcript.

About the structure rather than the detail — what the argument was, why it followed, what it connects to. Detail is recoverable from the source; structure is what you actually need to hold.

## The question note

The most useful thing to record is what you did not understand and what you disagreed with.

Those two lists are where your learning actually is. A page of agreement is a page of things you already believed.

## The connection note

Where does this contradict or support something else you know?

Material connected to existing knowledge is retained far better than isolated material, and the act of finding the connection is most of the processing.

## For the courses here

After each lesson, before the written exercise, close it and write three lines: what it argued, what you did not understand, and what it contradicts or confirms.

Three lines, from memory. That is more valuable than any amount of highlighting, and it takes two minutes.

## Reviewing

A note never re-read was a study aid at the moment of writing and nothing afterwards, which is fine as long as you know that is what it was.

If you intend to review, space it: a day, a week, a month. Otherwise write the note for the processing and let the source be the record.

## Highlighting

Close to useless on its own. It marks material as important without processing it, and it produces a page of colour that looks like work.

If you highlight, do it on the second pass and write in the margin why. The writing is the part that does anything.`,
          activity: {
            title: "Take three-line notes on five lessons",
            prompt:
              "For the next five lessons you read in any course here, take notes only after finishing and only from memory: three lines each — what it argued, what you did not understand, what it contradicts or confirms. No highlighting, no notes during. Then a week later, read your fifteen lines and write down how much of each lesson comes back. Compare that to how much comes back from a lesson you highlighted instead.",
          },
        },
        {
          title: "Practising rather than consuming",
          type: "TEXT",
          points: 10,
          body: `The final distinction in learning, and the one that separates people who accumulate courses from people who acquire skills.

## The gap

You can read forty lessons on trading and not be able to size a position. You can read about pricing and not be able to say a number without flinching.

Knowing and doing are different, and only one of them transfers by reading.

## What closes it

Doing the thing, badly, repeatedly, with feedback.

That is the whole mechanism. There is no version where sufficient reading produces the capability.

## Why people avoid it

Because doing it badly is uncomfortable and reading about it is pleasant.

Consuming more material feels like progress and produces the sensation of getting closer without the risk of visible failure. It is the most common trap in self-directed learning.

## The signal to watch for

If you have read three books on a subject and produced nothing, the problem is not that you need a fourth.

The consumption has become the activity. This is worth noticing early because it can continue for years.

## What practice looks like here

Every course in this academy ends its lessons with a written exercise, and the assignments require you to do something real — a plan, a calculation, a conversation, an audit.

That structure exists because of this lesson. The gating is not administrative; it is the difference between the course working and not.

## Feedback

Practice without feedback entrenches errors. You get better at doing it the way you do it.

Sources of feedback: the assignments here, which a person reads. Reality — did the price get accepted, did the trade work over fifty attempts, did the process survive being handed over. And someone further ahead who will tell you plainly.

## The ratio

Roughly: for every hour of consuming, an hour of doing. Most people run at twenty to one and wonder why nothing changes.

You do not need to have finished a course to start practising it. Start applying module two while reading module three; the application is what makes module three make sense.

## The honest summary

Attention gets you through the material. Practice is what turns the material into a capability, and no amount of the first substitutes for the second.

This course was about the input. What you do with it is the point.`,
          activity: {
            title: "Work out your ratio",
            prompt:
              "For the last month, estimate honestly: how many hours did you spend consuming material — courses, videos, articles — and how many doing the thing itself? Write the ratio. Then pick one course you have read and name one specific thing from it you have never actually done. Do it this week and write what happened, including what was harder than the reading suggested.",
          },
        },
        {
          title: "Assignment: learn one hard thing properly",
          type: "ASSIGNMENT",
          points: 25,
          body: `The second graded piece. It asks you to apply the whole course — attention, sessions, and study method — to something you genuinely do not yet understand.

Pick something real that you have previously bounced off.`,
          assignment: {
            title: "A learning log for one difficult subject",
            instructions: `Learn one genuinely difficult thing over two weeks, using the methods in this course. 600 to 900 words plus the log.

**1. What you chose and why it is hard.** Something you have previously started and not got through. State honestly what happened last time.

**2. The plan.** Your session length and schedule, how many sessions you allocated, and what "understanding it" would concretely mean — a thing you could do afterwards, not a feeling.

**3. The log.** Each session: date, what you covered, and your three-line note from memory. Include the sessions where you made no progress.

**4. Retrieval.** At least three closed-book recall attempts across the two weeks, with a rough percentage of what came back each time. Report the first one honestly — it is usually low.

**5. The gap you located.** At least one specific point of failure, worked through with the sequence: reread, locate precisely, look up the one thing, explain aloud, write it in your own words, find another explanation. State what the precise gap turned out to be.

**6. Practice.** What you actually did with the material rather than read about it. The ratio of consuming to doing across the two weeks.

**7. Feedback.** How you found out whether you had it right — a person, reality, or an exercise that could be marked wrong.

**8. Where you are.** Can you do the concrete thing from section two? If not, what specifically remains, and how long you estimate it needs.

**9. What you would do differently.** About the method, not the subject.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "The subject is genuinely difficult and previously abandoned",
                weight: 10,
                descriptor:
                  "Something real that the writer has bounced off before, with an honest account of what happened then.",
              },
              {
                criterion: "Success was defined as a capability, not a feeling",
                weight: 15,
                descriptor:
                  "A concrete thing the writer could do afterwards, stated in advance and returned to at the end.",
              },
              {
                criterion: "Retrieval was practised and reported honestly",
                weight: 25,
                descriptor:
                  "At least three closed-book attempts with rough percentages. Full marks report a low first attempt rather than omitting it.",
              },
              {
                criterion: "A specific gap was located and worked through",
                weight: 20,
                descriptor:
                  "The precise point of failure identified — a term, a step — rather than a general area, with the sequence applied and the outcome stated.",
              },
              {
                criterion: "Practice happened alongside consumption",
                weight: 20,
                descriptor:
                  "Real application of the material with a stated ratio. A log of reading only scores low regardless of quality.",
              },
              {
                criterion: "Honest assessment of where they got to",
                weight: 10,
                descriptor:
                  "A straight answer on whether the capability was reached, with what remains specified. Claiming complete mastery in two weeks scores low.",
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "The digital life",
      description:
        "Comparison, information diet, and the specific pressures of building something in public while everyone else appears to be succeeding.",
      lessons: [
        {
          title: "Comparison and the feed",
          type: "TEXT",
          points: 10,
          body: `A specific cost of the same devices, worth separating from attention because the mechanism and the harm are different.

## What you are comparing against

Not other people's lives. Their published highlights, selected and often exaggerated, from a population large enough that someone is always succeeding.

Your own complete experience against a curated selection from thousands of people is a comparison with a guaranteed outcome.

## Why it matters for this audience

In finance and crypto specifically, the published material skews heavily toward gains. Losses are not posted. The person who blew up their account is silent, and the person with one good month is loud.

So the apparent distribution of outcomes is wrong, and people calibrate their own expectations and their risk-taking against a fiction.

That is not only demoralising; it produces concrete bad decisions, which the trading courses cover from the other direction.

## The effect on work

Comparison produces either paralysis — everyone is ahead, why start — or frantic imitation, jumping between approaches because each looks better than the one you are doing.

Both prevent the sustained ordinary effort that actually produces anything.

## The practical responses

Follow fewer people, and specifically fewer people who post only outcomes.

Follow people who post process and failure. They are rarer and they are far more useful, and their presence recalibrates what normal looks like.

Notice your state after consuming. If you consistently feel worse after a particular source, that is sufficient reason to remove it regardless of its quality.

Compare against your own record. Your position last year, your own numbers, your own progress. It is the only comparison that contains complete information on both sides.

## The specific practice

Once a month, write down what you have actually done in the last year. Concretely.

Most people substantially underestimate this, because progress is invisible from inside and the feed supplies a constant reference point that is not real.

## The honest limit

You will not stop comparing. It is not a habit that can be removed by deciding.

What you can change is what is available to compare against, and how often. That is an environment problem, and environment problems are solvable.`,
          activity: {
            title: "Audit what you follow and write your year",
            prompt:
              "Go through everything you follow and mark each: posts outcomes only, posts process and failure, or unclear. Unfollow or mute five from the first group. Then notice your state after consuming for three days and note which sources consistently leave you feeling worse. Finally, write down concretely what you have actually done in the last year — most people underestimate it badly.",
          },
        },
        {
          title: "Your information diet",
          type: "TEXT",
          points: 10,
          body: `What you consume shapes what you think about, and most people's diet is chosen by algorithms optimising for engagement rather than usefulness.

## The two failure modes

Too much, so that nothing is processed and everything is half-known.

Too narrow, so that you only encounter positions you already hold and mistake that for the world.

Both are produced by the same mechanism: systems that show you more of what held your attention last time.

## Signal and noise

Most information is not actionable by you. It occupies attention, produces a feeling, and changes nothing you do.

The test: what would I do differently having learned this? For the great majority of what people consume, the honest answer is nothing.

That is fine for entertainment, provided it is labelled as entertainment rather than as staying informed.

## Depth over frequency

One long, careful piece is worth more than fifty short ones on the same subject, and takes less total time.

Short-form content optimises for being finished, not for being understood, and the accumulation produces the sensation of knowing a subject without the structure.

## Choosing rather than receiving

The core change: consume things you went looking for rather than things that arrived.

A feed is a stream someone else assembled. A book, a specific paper, a person's archive — these are chosen, and the choosing is most of the difference.

## Deliberate disagreement

Follow at least one thoughtful source you disagree with, and read it properly rather than to refute it.

This is genuinely unpleasant and it is the main protection against the narrowing that otherwise happens automatically.

## For this field specifically

Crypto information is unusually polluted by incentive. Almost everyone with an audience holds a position and benefits from you sharing their view.

The question from the security course applies continuously: who benefits from me believing this? It is the single most useful filter available.

## The practical diet

One or two sources you chose, read properly, on a schedule. One source that disagrees. Feeds consumed deliberately and briefly rather than continuously.

And a periodic audit: what did I consume this month, and what did I do differently as a result?

If the second answer is nothing, the consumption was entertainment, and knowing that is enough to change the volume.`,
          activity: {
            title: "Apply the what-would-I-do-differently test",
            prompt:
              "For three days, after each thing you read or watch, write one line: what would I do differently having learned this? Be strict — 'be more aware' is nothing. Count how many produced a real answer. Then choose two sources you will read properly on a schedule, and one thoughtful source you disagree with. Write down who they are and when you will read them.",
          },
        },
        {
          title: "Building in public without losing your attention",
          type: "TEXT",
          points: 10,
          body: `Many people here need an audience — for clients, for a business, for referrals. That requirement conflicts directly with everything in this course, and the conflict is manageable.

## The genuine tension

Being visible requires being present on the platforms designed to capture attention. You cannot post and not see the feed.

Advice to disconnect entirely is unavailable to someone whose work depends on being findable.

## The separation that works

Producing and consuming are different activities and should not happen in the same session.

Write and schedule in a focused block, with the feed not open. Then consume, deliberately, in a defined window.

Most people do both at once, which means every attempt to post costs an hour of scrolling.

## Batching

Write several pieces in one session, schedule them, and stay off the platform between.

This is the single largest change available. The daily-posting model requires daily presence, which is where the cost is.

## Checking responses

Once a day, in a window, at a time that is not the start of the day.

Replies and reactions are the most compelling part and the least valuable, and checking them continuously is what converts a business activity into a habit.

## Using a computer rather than a phone

Where possible, do the producing on a desktop and remove the app from the phone.

The desktop version is meaningfully less compelling and the friction is in the right place.

## The metric trap

Watching follower counts and engagement is a specific attention sink with almost no informational value at small scale.

Check monthly rather than daily. The number does not change fast enough for daily checking to tell you anything, and the checking is not really about information.

## What you are actually building

For most people here, the audience is not the goal — clients, credibility and referrals are.

Which means a modest, genuine presence maintained cheaply is usually correct, and the pursuit of a large audience is frequently a distraction from the work that the audience was meant to support.

## The check

How many hours a week does this consume, and what did it produce — clients, opportunities, income?

Run that honestly once a quarter. Many people find the return does not justify the cost, and that a smaller, cheaper presence would have produced nearly the same result.`,
          activity: {
            title: "Separate producing from consuming",
            prompt:
              "For two weeks, do all your posting in one batched session per week, scheduled, with the feed closed — and consume only in one defined daily window. Track the total hours the whole activity consumes. Then write what it produced: clients, opportunities, income, or nothing measurable. Compare the hours to the return honestly and write what you will change.",
          },
        },
        {
          title: "The version of you that is online",
          type: "TEXT",
          points: 10,
          body: `A shorter lesson on something adjacent to attention: what performing yourself continuously does to you.

## The performance

Anyone posting regularly develops a version of themselves for it — slightly more certain, slightly more successful, slightly more finished.

That is not dishonesty; it is normal editing. It becomes a problem when the gap gets large, because you then have to maintain it.

## The specific costs

You start making decisions with the audience in mind. Taking the position that is defensible publicly rather than the one you think is right.

Admitting error becomes expensive, so you do it less, which is exactly the opposite of the disposition every other course here requires.

And you cannot be seen struggling, which removes access to help.

## The people who avoid it

They post the failures as well as the outcomes. Not performatively, but as ordinary reporting.

This costs a little credibility in the short term and produces far more trust over years, and it removes the maintenance burden entirely.

## The private life

Keep parts of your life and work outside it. Not everything needs to be content.

A project shared from the start is a project you are performing rather than doing, and the difference in quality is real.

## For those with a faith practice

The oldest writing on this is unusually direct: performing virtue publicly and possessing it are different things, and the first can quietly replace the second.

That warning predates any platform and applies to them precisely.

## The check

Would I make this decision the same way if nobody would ever know?

Ask it about a business decision, a public position, a piece of work you are about to share.

Where the answer is no, the audience is deciding, and that is worth noticing while it is still a small thing.`,
          activity: {
            title: "Ask the nobody-would-know question",
            prompt:
              "Take three decisions you have made in the last month that had any public dimension — a position taken, a thing shared, a project chosen. For each, ask: would I have decided the same way if nobody would ever know? Write the honest answer. Then identify one thing you are currently doing that is being performed rather than done, and decide whether to stop performing it or stop doing it.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on digital life. The theme is that these are environment and incentive problems rather than character problems, and they respond to the same structural approach as attention.`,
          quiz: {
            title: "Comparison and information",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "Why is the apparent distribution of trading outcomes online wrong?",
                explanation:
                  "Losses are not posted. The person who blew up their account is silent and the one with a good month is loud, so people calibrate their expectations and their risk-taking against a fiction — which produces concrete bad decisions, not just discouragement.",
                options: [
                  {
                    text: "Losses go unposted, so the visible sample is not the real distribution",
                    correct: true,
                  },
                  { text: "Most posted results are outright fabricated", correct: false },
                  { text: "Platforms deliberately suppress losses", correct: false },
                  { text: "It is not wrong — it reflects real outcomes", correct: false },
                ],
              },
              {
                prompt: "What is the test for whether information is worth consuming?",
                explanation:
                  "What would I do differently having learned this? For the great majority of what people consume, the honest answer is nothing — which is fine, provided it is labelled entertainment rather than staying informed.",
                options: [
                  { text: "What would I do differently having learned this?", correct: true },
                  { text: "Is the source reputable?", correct: false },
                  { text: "Is it about my field?", correct: false },
                  { text: "Did I find it interesting?", correct: false },
                ],
              },
              {
                prompt: "What is the single largest change for someone who must post publicly?",
                explanation:
                  "Separating producing from consuming, and batching the production. Doing both in one session means every attempt to post costs an hour of scrolling; batching removes the daily presence that carries the cost.",
                options: [
                  {
                    text: "Batch production in a focused session with the feed closed, and consume in a separate window",
                    correct: true,
                  },
                  { text: "Post less frequently overall", correct: false },
                  { text: "Hire someone else to post", correct: false },
                  { text: "Only use platforms with no feed", correct: false },
                ],
              },
              {
                prompt: "What is the risk of a large gap between your online version and yourself?",
                explanation:
                  "You start deciding with the audience in mind, admitting error becomes expensive so you do it less, and you cannot be seen struggling — which removes access to help. The disposition every other course here requires is the one it erodes.",
                options: [
                  {
                    text: "Decisions get made for the audience, and admitting error becomes too expensive",
                    correct: true,
                  },
                  { text: "Followers will eventually notice and leave", correct: false },
                  { text: "It requires too much time to maintain", correct: false },
                  { text: "There is no real risk if the edits are minor", correct: false },
                ],
              },
              {
                prompt: "Which comparison contains complete information on both sides?",
                explanation:
                  "Your own record against your own past. Comparing your complete experience to curated highlights from thousands of people is a comparison with a guaranteed outcome, because one side is edited and the other is not.",
                options: [
                  { text: "Your position now against your position last year", correct: true },
                  { text: "Your results against people at a similar stage", correct: false },
                  { text: "Your results against published averages", correct: false },
                  { text: "Your results against people you follow", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Other people's attention",
      description:
        "You are also an interruption. Meetings, messages, and being someone who is good to work with.",
      lessons: [
        {
          title: "You are somebody's notification",
          type: "TEXT",
          points: 10,
          body: `Everything in this course applies in reverse. Your messages cost other people exactly what theirs cost you.

## The asymmetry that causes it

Sending is instant and free. Receiving is an interruption with a rebuild cost.

Which means a message that saves you two minutes can cost the recipient ten, and you will never see that cost.

## The habits worth changing

Batch what you send. Five messages across a morning is five interruptions; one message with five points is one.

Say whether it is urgent. Most is not, and marking the rare thing that is means people can safely deprioritise everything else.

Do not send "hi" and wait. It creates an interruption that carries no information and forces a second one.

Put the ask in the first line. The recipient can then decide immediately whether this needs them now.

Ask fewer questions you could answer yourself. The fifteen-minute rule from the leadership course applies in both directions.

## Meetings

Covered in the leadership course from the organiser's side. From this side: decline the ones you are not needed in, and say why briefly.

A meeting you attend and contribute nothing to costs you an hour and the fragmentation around it, which is usually worse than the hour.

## The status you set

If you reply within seconds at all hours, you have taught people that you are always available, and they will use it.

Reply within a reasonable window instead. Almost nobody notices the difference and it changes what is expected of you permanently.

## Protecting other people's blocks

If you lead anyone, this matters more than protecting your own.

Do not message people during their focused time. Do not create urgency that is not real. Do not schedule meetings that fragment the morning.

A leader who protects their team's attention produces more than one who extracts more hours, and it is rare enough to be noticed.

## The reciprocity

The people who are best to work with are the ones whose messages are clear, batched, and honestly labelled for urgency.

Being that person costs almost nothing and it is the practical form of taking this course seriously — otherwise you have protected your own attention while continuing to spend everyone else's.`,
          activity: {
            title: "Audit what you send",
            prompt:
              "Look at everything you sent in the last two working days. Count how many separate messages went to the same person, how many were marked or implied urgent when they were not, and how many opened with something other than the actual ask. Write the numbers. Then rewrite one recent multi-message exchange as the single message it should have been.",
          },
        },
        {
          title: "Working with people who have no boundaries",
          type: "TEXT",
          points: 10,
          body: `Your practice will meet someone who messages constantly, calls without warning, and treats everything as urgent. This lesson is about that.

## Why it happens

Usually not malice. Different working style, anxiety, or simply never having been told.

Some people genuinely think out loud and send as they think. They are not aware that each message arrives as an event.

## Stating it

Directly, once, without complaint. "I check messages at eleven and four — if something is genuinely urgent, call and I will pick up."

That sentence does most of the work. It gives them a route for real urgency, which removes the reason to escalate everything.

Most people accommodate it immediately, because they were not trying to interrupt you; they were using the only channel they knew.

## Making the exception real

Give a genuine urgent route and honour it. If you say call me and then do not answer, the boundary collapses and everything returns to messages.

## When it is a client

Same conversation, framed around their outcome. "I do focused work on your project in the mornings and check messages after — that is when the actual work happens."

Clients accept this readily. Constant availability is not what they are paying for, though many will use it if offered.

## When it is your manager

Harder, and usually still available. Frame it as output rather than preference: "I can do the analysis properly if I have the morning uninterrupted — is it all right if I check messages from eleven?"

Most managers agree, because they want the output.

## When it genuinely cannot change

Some roles require continuous availability, and some cultures will not accommodate this.

Then the deep block moves outside those hours — early, late, or one agreed period — rather than being abandoned. That was the point of the constraints lesson.

## The thing not to do

Suffer it silently and resent it. The person almost certainly does not know, and the resentment leaks into the relationship long before the boundary is ever stated.

Almost everyone who finally has this conversation reports the same thing: it was easier than expected and should have happened much earlier.`,
          activity: {
            title: "State one boundary this week",
            prompt:
              "Identify the person whose interruptions cost you most. Write the sentence you will say — your checking windows plus a genuine urgent route. Then say it this week and write down how they responded. If it is a client or a manager, frame it around their outcome rather than your preference, and write that version too. Note whether it was easier or harder than you expected.",
          },
        },
        {
          title: "Being good to work with",
          type: "TEXT",
          points: 10,
          body: `A closing practical lesson: the behaviours that make someone easy to work with are largely attention behaviours.

## What people actually value

Someone who reads the whole message before replying, so the reply addresses what was asked.

Someone who does the thing they said, by when they said, without needing to be chased.

Someone who is present in a conversation rather than half-attending while doing something else.

Someone whose messages are clear enough to be actioned without a follow-up.

None of these is a personality trait. All of them are attention applied to other people.

## The half-attention tell

People can tell when you are not fully in a conversation, on a call or in person, and they adjust — they say less, they stop bringing you things, and they stop telling you the difficult ones.

This is the same filtering effect as in the leadership course, produced by a different cause.

## Reading properly

A surprising proportion of workplace friction is people replying to the first line of a message.

Reading the whole thing costs thirty seconds and prevents an exchange of four messages plus the irritation.

## Doing what you said

Attention applied to commitments. Most missed commitments are not refusals; they are things that were agreed while half-present and never properly registered.

Write down what you agreed to, at the moment you agree to it. That single habit removes most of it.

## In person

Phone away. Not face down — away.

This is noticed immediately and it is rare enough to be memorable, and it is the same intervention as everywhere else in this course.

## The compounding

Being easy to work with produces referrals, opportunities and goodwill in a way that is difficult to trace and very large in aggregate.

People choose to work with people who are straightforward, present and reliable, and they mention them to others.

## The connection to everything else

This course started as a productivity subject and it ends here, because attention is what you give to work and it is also what you give to people.

The same capacity, the same interventions, and the second one matters more.`,
          activity: {
            title: "Fix one commitment habit",
            prompt:
              "For one week, write down every commitment at the moment you make it — in a conversation, a call, a message — with the date you said. At the end of the week, check how many you had already forgotten before writing them down. Then pick one relationship where you have been half-present and give that person one fully attentive conversation, phone in another room, and note what was different.",
          },
        },
        {
          title: "Assignment: attention beyond your own work",
          type: "ASSIGNMENT",
          points: 25,
          body: `The third graded piece. It is about the attention you spend of other people's, which is the part most people ignore after taking a course like this.`,
          assignment: {
            title: "Your effect on other people's attention",
            instructions: `Audit and change how you spend other people's attention. 600 to 900 words.

**1. What you send.** Two days of your outgoing messages counted: how many separate messages to the same person, how many implied urgency falsely, how many did not open with the ask. Give the numbers.

**2. One rewrite.** A real multi-message exchange rewritten as the single message it should have been. Include both versions.

**3. Meetings.** Any recurring meeting you attend and contribute nothing to. What you will do about it and what you will say.

**4. The boundary you stated.** Who interrupts you most, the sentence you used, and how they responded. Include the genuine urgent route you offered and whether you have honoured it.

**5. If you lead anyone.** What you are doing to protect their attention — messaging outside their focused time, manufactured urgency, meetings that fragment mornings. Be honest about which you have been doing.

**6. Commitments.** A week of writing down commitments at the moment of making them. How many you had already forgotten before recording. What you are changing.

**7. One conversation.** A fully attentive conversation with someone, phone in another room. What was different, and whether they said anything.

**8. What you have not changed.** The habit you know costs other people and are not yet willing to give up, and why. A submission claiming none scores zero on that criterion.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Outgoing messages were actually counted",
                weight: 20,
                descriptor:
                  "Real numbers across two days for volume, false urgency and buried asks, with a genuine rewrite showing both versions.",
              },
              {
                criterion: "A boundary was stated to a real person",
                weight: 20,
                descriptor:
                  "The sentence used, the response, and a genuine urgent route that has been honoured. A planned boundary scores low against a stated one.",
              },
              {
                criterion: "Effect on people they lead is examined honestly",
                weight: 20,
                descriptor:
                  "Specific behaviours named and admitted, or a clear statement that they lead nobody. Claiming perfect practice scores low.",
              },
              {
                criterion: "The commitment habit was tested",
                weight: 15,
                descriptor:
                  "A week of recording with an honest count of what had already been forgotten.",
              },
              {
                criterion: "The attentive conversation happened",
                weight: 15,
                descriptor:
                  "A real conversation with the device absent, and an account of what was different.",
              },
              {
                criterion: "An unchanged habit is admitted",
                weight: 10,
                descriptor:
                  "A genuine habit the writer is not yet willing to give up, with an honest reason. Claiming none scores zero.",
              },
            ],
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `The last check before the final module. The theme is that everything in this course applies in reverse — you are also an interruption.`,
          quiz: {
            title: "Other people's attention",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "Why does sending a quick message often cost more than it saves?",
                explanation:
                  "Sending is instant and free; receiving is an interruption with a rebuild cost. A message that saves you two minutes can cost the recipient ten, and you never see that cost — which is why the habit persists.",
                options: [
                  {
                    text: "Sending is free and receiving carries the rebuild cost, which you never see",
                    correct: true,
                  },
                  { text: "Because most messages require a long reply", correct: false },
                  { text: "Because messages are usually misunderstood", correct: false },
                  { text: "It does not — short messages are low cost", correct: false },
                ],
              },
              {
                prompt: "What makes a stated boundary about messages actually hold?",
                explanation:
                  "Giving a genuine urgent route and honouring it. If you say to call for real urgency and then do not answer, the boundary collapses and everything returns to messages — the route is what removes the reason to escalate everything.",
                options: [
                  { text: "Offering a real urgent route and actually honouring it", correct: true },
                  { text: "Repeating the boundary regularly", correct: false },
                  { text: "Turning off notifications so you do not see them", correct: false },
                  { text: "Replying slowly until people learn", correct: false },
                ],
              },
              {
                prompt: "Why do people stop bringing you things when you are half-attending?",
                explanation:
                  "They can tell, and they adjust — saying less and eventually withholding the difficult things. It is the same filtering effect that power produces in the leadership course, arriving through a different cause.",
                options: [
                  {
                    text: "They can tell, and they adjust by saying less and withholding the hard things",
                    correct: true,
                  },
                  { text: "They assume you are too busy", correct: false },
                  { text: "They find someone more senior instead", correct: false },
                  { text: "They do not notice half-attention", correct: false },
                ],
              },
              {
                prompt: "What causes most missed commitments?",
                explanation:
                  "They were agreed while half-present and never properly registered. Writing down each commitment at the moment of agreeing removes most of them, which is attention applied to promises.",
                options: [
                  {
                    text: "They were agreed while half-attending and never registered",
                    correct: true,
                  },
                  { text: "Unrealistic deadlines", correct: false },
                  { text: "Deliberate over-promising", correct: false },
                  { text: "Poor calendar systems", correct: false },
                ],
              },
              {
                prompt: "If you lead people, whose attention should you protect first?",
                explanation:
                  "Theirs. A leader who protects their team's attention produces more than one who extracts more hours, and it is rare enough to be noticed — while protecting only your own means spending everyone else's.",
                options: [
                  { text: "Theirs, before your own", correct: true },
                  { text: "Your own, since your decisions matter most", correct: false },
                  { text: "Whoever is most senior", correct: false },
                  { text: "Whoever complains about interruptions", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Keeping it",
      description:
        "What survives a busy week, what to do when it collapses, and the version still running in a year.",
      lessons: [
        {
          title: "What actually breaks a practice",
          type: "TEXT",
          points: 10,
          body: `Practices rarely end by decision. They erode, in a pattern that is worth recognising early.

## The sequence

A genuinely busy week where sessions are missed for real reasons.

Then a week where they are missed for reasons that are less real but still plausible.

Then the block stays in the calendar and stops being honoured, becoming a small daily reminder of failure.

Then it is removed, with a resolution to restart when things are calmer. Things are not calmer.

## The point of intervention

The second week. The first is genuinely unavoidable and the third is already a pattern.

Which means the practical rule is: after any week of missed sessions, restart immediately in the next one, at a reduced length, before deciding anything about the practice.

## Reduce rather than abandon

The instinct after missing time is to restart at your previous best, which fails and confirms that it is not working.

Restart at half. Ten minutes when you were doing thirty. It rebuilds the habit rather than testing the capacity, and the capacity returns quickly once the habit is back.

## The minimum viable version

Decide it now, while things are calm: what is the smallest version that still counts?

Ten minutes, one session, any time of day. If that is your floor, a difficult week produces a reduced practice rather than none, which is the difference between a dip and a collapse.

## Tracking

Something visible — a mark on a calendar for each day with a session. Not an app.

The value is that a gap is visible before it becomes a fortnight, and the record of previous consistency is genuinely motivating when the current week is bad.

## What not to track

Length, quality, or how well it went. Those become a standard to fail against, and the thing you want is frequency.

Did I do a session: yes or no. That is the whole record.

## The realistic expectation

You will lose it several times a year. Everyone does.

The people who still have a practice in five years are not the ones who never stopped. They are the ones who restarted quickly, at a reduced length, without treating the gap as evidence about themselves.`,
          activity: {
            title: "Set your floor and start marking",
            prompt:
              "Decide your minimum viable session now, while things are calm — the smallest version that still counts on your worst week. Write it down. Then start a visible tracker: a calendar with a mark for each day you did a session, tracking only yes or no. Then write your restart rule as a sentence: after a missed week, restart within the next one, at what length.",
          },
        },
        {
          title: "The days it does not work",
          type: "TEXT",
          points: 10,
          body: `Some sessions are bad for reasons that have nothing to do with your practice, and misreading them is how people quit.

## The ordinary variation

Attention fluctuates. Sleep, illness, stress, the time of the month, something happening at home, weather, and a great deal that has no identifiable cause.

A session where you could not settle is usually not a signal about your practice. It is a Tuesday.

## The misreading

One bad session becomes evidence that it is not working. Two become evidence that you are not suited to it.

That interpretation, rather than the bad sessions themselves, is what ends most practices.

## Judging over the right window

Look at a month rather than a day. Ten good sessions and four poor ones is a working practice; the four are invisible at that scale and enormous on the day.

This is the same principle as sample size in the trading courses, applied to yourself.

## What to do in the moment

Reduce rather than abandon. If forty minutes is not happening, do fifteen. A short completed session preserves the habit; an abandoned one damages it.

Switch to shallow work honestly rather than sitting at the desk pretending. A bad attention day is a good admin day, and using it that way is not defeat.

## The signals that are real

A month of poor sessions with no obvious cause is worth investigating — sleep, health, something you are avoiding, or a practice that does not fit your circumstances.

That is different from a bad week, and the difference is the window you judge it over.

## Being unkind to yourself about it

The self-criticism after a poor session costs more attention than the poor session did, and it makes starting the next one harder.

Note it, adjust, continue. The commentary is not part of the practice.

## The realistic picture

A year of this will contain excellent weeks, ordinary weeks, and stretches where it barely happens.

The people who still have the capacity at the end of the year are not the ones who had no bad stretches. They are the ones who did not conclude anything from them.`,
          activity: {
            title: "Set your rule for bad days",
            prompt:
              "Write your bad-day rule now, while things are fine: what you will do when the session is not happening — the reduced length you will drop to, and the shallow work you will switch to instead. Then write the window over which you will judge the practice, and commit to not drawing conclusions from anything shorter. Finally, note what you have concluded about yourself after past bad stretches, and whether it was warranted.",
          },
        },
        {
          title: "Attention and the rest of your life",
          type: "TEXT",
          points: 10,
          body: `This course has treated attention as a work capacity. It is also most of what people mean by presence, and that is arguably the larger stake.

## Where it shows

Conversations you were physically in and did not attend to.

Time with people that was interrupted by checking, and everyone noticed.

Meals, walks, evenings, spent in the same room as someone while both of you were elsewhere.

## The thing worth noticing

Everything in this course transfers directly: the same reflex that ends a work session ends a conversation, and the same intervention fixes both.

Phone in another room during a meal is the identical mechanism as phone in another room during a session.

## Attention as a form of care

Giving someone your undivided attention is a thing people notice immediately and remember, and it has become rare enough to be striking.

The person who puts the phone away, faces you, and does not glance at it is doing something that used to be normal and now registers as unusual generosity.

## Children specifically

Worth naming, because it is the case where the cost is largest and the pattern is most easily transmitted.

A child talking to a parent who is looking at a screen learns something specific about their own worth, and learns it repeatedly.

They also learn the behaviour, and they learn it far more from what is modelled than from what is restricted.

## The practical boundaries

Meals with no devices for anyone, including you. This is the highest-return single rule.

The first and last twenty minutes with the people you live with, undivided.

Conversations where the phone is out of reach rather than face down.

## For those with a faith practice

Prayer, reading and silence are all attention practices, and they degrade under exactly the same conditions as work does.

Many people find their practice has become difficult and conclude something is wrong spiritually, when the immediate cause is the same capacity failing that makes reading difficult.

Treating it partly as a training problem is not a reduction of it; it removes an obstacle that was never the point.

## The reframe

Attention is finite and it is what you actually give people. Where it goes is, in a fairly literal sense, where your life went.

That is a heavier framing than productivity and it is the more accurate one.`,
          activity: {
            title: "Give one person an undivided hour",
            prompt:
              "Pick one person and give them an hour with your phone in another room — not silent, not face down, absent. Notice how many times you reach for a pocket that is empty. Afterwards write what was different about the conversation, and whether they said anything. Then set one permanent boundary: meals with no devices for anyone, or the first twenty minutes home undivided. Write which you chose and tell whoever it affects.",
          },
        },
        {
          title: "What you can now do",
          type: "TEXT",
          points: 10,
          body: `A short accounting before the capstone.

## What you can do

Explain what task switching costs and why the cost is invisible, including that a dismissed notification cost the full interruption.

Measure your own attention rather than estimating it, and see it improve against a starting number.

Run a session with a defined task, a visible timer, no device in the room, and paper for intrusions.

Protect a block structurally — in the calendar, at a fixed hour, with a boundary stated out loud to a real person.

Start reliably, using a pre-decided first action and the five-minute agreement.

Tell deep work from shallow, and know your actual percentage rather than your impression.

Reduce the pull of a device you cannot give up, without pretending you can delete it.

Tolerate small gaps unfilled, which is where the escape reflex was built.

Restart quickly after losing the practice, at a reduced length, without treating the gap as a verdict on yourself.

## What you know that most people do not

That the phone costs you attention while silent and face down. That willpower is the least reliable protection and produces a self-blame cycle. That music with lyrics competes with reading. That scrolling is not recovery. That the first hour of the day sets the mode for the rest of it. That twenty minutes is a real session.

## The sentence to keep

Attention is a capacity, not a virtue. It degrades in specific ways and it rebuilds with specific practice, and the environment does more work than the intention.

## What this was for

Every other course here. The forty lessons, the written exercises, the chart read carefully, the contract actually checked.

And the part that is not about courses at all: the conversations you were actually in, and the people who could tell.

## What is left

The capstone, and then the ordinary practice — the block most days, the restart after the weeks you lose, and the slow accumulation of being able to do hard things for longer than you used to.`,
          activity: {
            title: "Measure again",
            prompt:
              "Repeat the measurement from lesson one under the same conditions: read something genuinely difficult and stop the timer at your first genuine break. Write the number next to your starting number. Then write what changed that you did not expect, and what did not change that you hoped would. Finally, write the one habit from this course you are most likely to lose first, and what would make losing it harder.",
          },
        },
        {
          title: "Capstone: your attention practice",
          type: "ASSIGNMENT",
          points: 40,
          body: `The final piece. A practice you will still be running in six months, described precisely enough that someone could check whether you were.`,
          assignment: {
            title: "Your attention practice",
            instructions: `Write your practice. 900 to 1,400 words, based on what you actually did during this course.

**1. Where you started and where you are.** Both measurements, the conditions, and both switch counts. Report an unflattering result plainly if that is what you have.

**2. The practice as it stands.** Session length, time, place, how it is protected, who knows about it, and your intrusion method. Then your minimum viable version for a bad week.

**3. Deep versus shallow.** Your audit percentage, when your deep hours actually occur, and what shallow work you moved to defined windows to make room.

**4. The environment.** What you changed about the device, the space and your inputs. Which changes you reverted, and how quickly — the one you reverted fastest is worth examining, so examine it.

**5. Your constraints.** The honest version of your circumstances — shared space, obligations, responsiveness required, unreliable power — and how the practice fits them rather than an ideal.

**6. What broke it.** Every session lost during the course, with specific causes tested against the two-hour rule. Distinguish genuine exceptions from avoidance, and be honest about the ratio.

**7. The restart rule.** What you do after a missed week, at what length, and how you will notice — including what you are tracking and how it is visible.

**8. Beyond work.** One boundary you set for attention with people, what you told them, and what changed.

**9. What will break this.** The circumstance under which the practice will fail — a busy period, a crisis, a change in your living situation. Every practice has one. A submission claiming none scores zero on that criterion.

**10. Six months.** The version you will still be running, which should be smaller than what you managed during the course.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Measurements are real and reported honestly",
                weight: 20,
                descriptor:
                  "Before and after attention measurements and two switch counts, under stated conditions. Full marks report a poor or flat result rather than omitting it.",
              },
              {
                criterion: "The practice is structurally protected",
                weight: 20,
                descriptor:
                  "Calendar entry, fixed hour, stated boundary told to a named person, device relocated, plus a defined minimum for bad weeks.",
              },
              {
                criterion: "Environment changes are specific, including reversions",
                weight: 15,
                descriptor:
                  "Concrete changes to device, space and inputs, with reverted ones named and examined rather than quietly dropped.",
              },
              {
                criterion: "The practice fits real constraints",
                weight: 15,
                descriptor:
                  "Designed around the writer's actual circumstances rather than an ideal setup. Concluding the practice is unavailable scores low; adapting it scores full marks.",
              },
              {
                criterion: "Failures are analysed against the two-hour rule",
                weight: 15,
                descriptor:
                  "Every lost session accounted for with specific causes, honestly split between genuine exceptions and avoidance.",
              },
              {
                criterion: "The failure case is named and the kept version is modest",
                weight: 15,
                descriptor:
                  "A specific circumstance that will break the practice, plus a six-month version smaller than the trial. Claiming no failure case scores zero on this criterion.",
              },
            ],
          },
        },
      ],
    },
  ],
};
