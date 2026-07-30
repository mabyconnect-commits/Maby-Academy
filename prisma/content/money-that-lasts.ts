import type { ContentCourse } from "./types";

/**
 * Money That Lasts — the free personal-finance foundation.
 *
 * Written for someone who earns money but never feels in control of it, and who
 * has been told their whole life that the answer is "spend less" without anyone
 * showing them the machinery. The order is deliberate: seeing comes before
 * budgeting, budgeting before debt, debt before investing. You cannot fix a
 * number you cannot see, and you cannot grow money you are still bleeding.
 *
 * Almost every lesson is a written exercise. The point is not to read about
 * money — it is to look at your own, honestly, once. That is the thing most
 * people never do, and it is where every improvement starts.
 */
export const moneyThatLasts: ContentCourse = {
  slug: "money-that-lasts",
  title: "Money That Lasts: Personal Finance From Zero",
  subtitle:
    "Take control of what you earn — track it, budget it, kill the debt, and grow the rest — without shame, hype, or a spreadsheet you'll abandon by Friday.",
  description: `Most people don't have a money problem. They have a visibility problem. They earn, they spend, and at the end of the month they genuinely don't know where it went — so they blame themselves, promise to "be better", and change nothing, because you cannot manage a number you have never actually looked at.

This course fixes the visibility first. You'll build an honest picture of where your money goes, then a budget that survives real life instead of collapsing the first time a tyre bursts. You'll learn how debt actually works against you and how to escape it in the right order, how to earn more without burning out, and how to grow what's left through boring, reliable compounding rather than lottery tickets dressed up as investing.

No shame, no get-rich-quick, no pretending everyone starts from the same place. Just the machinery — and the habit of looking at your own money without flinching, which turns out to be the whole game.`,
  categorySlug: "money-and-business",
  level: "BEGINNER",
  priceMinor: 0,
  estimatedHours: 14,
  passThreshold: 80,
  instructorEmail: "mabi@mabyacademy.com",
  outcomes: [
    "Build an honest map of exactly where your money goes each month",
    "Run a budget you'll actually keep, using a simple three-account system",
    "Size and place an emergency fund that ends the cycle of surprises",
    "Pay off debt in the order that costs you the least, without getting scammed",
    "Raise your income deliberately instead of only ever cutting costs",
    "Grow the rest through compounding and index investing, ignoring the hype",
    "Write a one-page money plan that ties every number to a life you actually want",
  ],
  modules: [
    // =====================================================================
    {
      title: "Money is a tool, not a scoreboard",
      description:
        "Before any spreadsheet: the handful of ideas that make the rest of the course make sense. Mostly about honesty, not maths.",
      lessons: [
        {
          title: "Welcome — and what this course will cost you",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `This course asks for about fourteen focused hours and one uncomfortable thing: that you look at your own money honestly, at least once, without flinching. Most people never do that. It is the reason most money advice bounces off — you cannot fix a number you have never actually seen.

## What you'll be able to do

- Build an honest map of where your money really goes
- Run a budget that survives a burst tyre and a bad week
- Size and place an emergency fund that ends the cycle of surprises
- Pay off debt in the order that costs you the least
- Raise your income on purpose, not only cut costs
- Grow what's left through boring, reliable compounding

## What this course is not

It is not a list of stocks to buy or a scheme to get rich by Friday. Nobody here will promise you a shortcut, because the shortcuts are how people get poorer. The goal is that you become the kind of person who runs their money on purpose — and who can tell, instantly, when someone is selling them a fantasy.

## One promise, stated once

This course meets you where you are. Some of you are choosing between two good options; some are choosing which bill to pay late. The maths is the same; the stakes are not. Nothing here assumes you started with a cushion. Where a step is easier with money you don't have yet, it says so plainly rather than pretending.

## How the lessons work

Opening a page does not complete it. Almost every lesson has an exercise attached, and the lesson only counts once you've done it and written up what happened. The write-up is private — nobody grades it and nobody reads it. It exists so that you've actually looked at your own money, which is the only thing that ever changes anything.`,
          activity: {
            title: "Name the number that would change your week",
            prompt:
              "Write one sentence: what is the specific money situation that, if it were fixed, would take a weight off your chest this month? Not 'be rich' — something concrete, like 'stop the overdraft', 'have a hundred spare', 'know I can cover rent'. Be precise. You'll come back to this sentence at the end of the course.",
          },
        },
        {
          title: "Where your money actually goes",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `Ask most people where their money goes and you'll get a confident answer that is roughly half true. The confident half is rent, transport, the big obvious bills. The missing half is the small, frequent, forgettable spending — and it is almost always bigger than people think, because each piece is too small to remember and there are hundreds of them.

## The gap between the story and the statement

You have a story about your spending: "I'm careful, I just have expensive rent." Then you read the statement line by line and the story cracks. The three coffees, the delivery fees, the app you forgot you pay for, the "quick" top-ups. None of it is shameful. All of it is invisible until you write it down.

This gap — between the story you tell and the statement that's true — is where nearly all money trouble hides. Not in dramatic mistakes. In small, unwatched leaks.

## Why willpower isn't the fix

The instinct is to blame discipline: I should just spend less. But you can't apply discipline to spending you can't see. Willpower spent on invisible leaks is willpower wasted. First you make the money visible; then, and only then, do choices become possible.

## The whole course in one sentence

See it, shape it, grow it — in that order. This module and the next are about seeing, because everything else is built on it. A budget on top of a story is fiction. A budget on top of the truth is a plan.`,
          activity: {
            title: "Guess before you look",
            prompt:
              "Without checking anything, write down your best guess for two numbers: (1) how much you spent on food you didn't cook at home last month, and (2) how much your subscriptions cost you per month in total. Write the guesses down now. In two lessons you'll check them against reality — and the size of the gap is the point.",
          },
        },
        {
          title: "The two numbers that run your life",
          type: "TEXT",
          points: 10,
          body: `Strip everything away and personal finance is two numbers: what comes in, and what goes out. Income and outflow. Every technique in this course is a way of widening the gap between them in your favour, and then doing something useful with the gap.

## Why the gap is the only score that matters

A big income with a bigger outflow is a person going broke slowly in a nice car. A modest income with a smaller outflow is a person quietly building freedom. The absolute size of your income is not the score. The gap is. This is genuinely good news, because you have two levers on the gap, not one — and most people only ever pull the first.

## Lever one: outflow

Spend less than comes in. This is where all the usual advice lives, and it matters — but it has a floor. You cannot cut below what it costs to live, and past a point, cutting harder just makes life grim. Cutting is real, and it is limited.

## Lever two: income

Earn more. This lever has no ceiling, and most people never seriously pull it because it feels harder and slower. We'll spend a whole module on it later, because a plan that only ever cuts is a plan that runs out of room. The people who get free usually do it by widening the gap from both ends.

## The trap of the invisible gap

Here's the catch: you can't manage a gap you can't measure. If you don't know your real outflow, you don't know your real gap, and you're flying blind. So the next few lessons make outflow visible. Boring, and the most valuable thing you'll do.`,
          activity: {
            title: "Find your two numbers, roughly",
            prompt:
              "Write down your monthly income (what actually lands in your account, after tax and deductions — the real number, not the headline salary). Then write your rough guess for monthly outflow. Subtract to get your guessed gap. Note whether the gap is positive, roughly zero, or negative. You now have a hypothesis to test — most people's real gap is smaller than they think.",
          },
        },
        {
          title: "Wants, needs, and the lie in between",
          type: "TEXT",
          points: 10,
          body: `Every budget framework tells you to separate needs from wants. The advice is fine; the execution is where people quietly cheat, because almost anything can be dressed up as a need if you word it carefully enough.

## The honest test

A need is something whose absence would genuinely damage your life or your ability to earn: shelter, basic food, the transport that gets you to work, the phone you actually need for your job. A want is everything that makes life nicer but wouldn't break it. The lie in between is the want wearing a need's clothes — the "I need my coffee", the "I need a newer phone", the upgrade you've decided is a baseline.

There's no shame in wants. A life of pure needs isn't a life. The point isn't to eliminate wants — it's to stop misfiling them, because a want you've relabelled as a need is a want you've decided you're not allowed to question.

## Why the misfiling costs you

When everything is a "need", you have no flexibility. The first time money is tight, you feel like you're cutting into bone, when really you're surrounded by wants you promoted to needs years ago and stopped seeing. Correctly labelled spending is spending you can actually negotiate with.

## The graceful middle

A useful third category: things that are wants, but ones you consciously choose to keep because they matter to you. That's not cheating — that's a decision. The difference between "I need it" and "it's a want and I choose it" is the difference between a hostage and a person spending on purpose.`,
          activity: {
            title: "Relabel three of your 'needs'",
            prompt:
              "List five things you'd instinctively call needs. Then apply the honest test to each: would its absence genuinely damage your life or your income? Find at least three that are actually wants wearing a need's clothes. For each, decide honestly: is this a want I consciously choose to keep, or one I've just never questioned? Write down which.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A short check on the foundations before we start counting. If any answer surprises you, reread the lesson — the tracking module builds directly on these ideas, and it's easier to fix a shaky foundation now than three modules in.`,
          quiz: {
            title: "Foundations",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "Why does willpower alone rarely fix spending?",
                explanation:
                  "You cannot apply discipline to spending you can't see. Most leaks are small, frequent and forgettable, so they never enter the decision. Making spending visible has to come before trying to control it.",
                options: [
                  {
                    text: "Because most spending is invisible until you write it down, so there's nothing to apply willpower to",
                    correct: true,
                  },
                  { text: "Because willpower is fixed and can't be improved", correct: false },
                  { text: "Because budgets are a scam", correct: false },
                  { text: "Because only income matters, not spending", correct: false },
                ],
              },
              {
                prompt: "What is the single score that actually matters in personal finance?",
                explanation:
                  "The gap between income and outflow. A large income with a larger outflow is going broke; a modest income with a smaller outflow is building freedom. The absolute size of income is not the score.",
                options: [
                  { text: "The gap between what comes in and what goes out", correct: true },
                  { text: "The size of your income", correct: false },
                  { text: "The size of your savings account today", correct: false },
                  { text: "Your credit score", correct: false },
                ],
              },
              {
                prompt: "Which lever on the gap has no ceiling?",
                explanation:
                  "Cutting spending has a floor — you can't spend less than it costs to live. Earning more has no ceiling, which is why a plan that only ever cuts eventually runs out of room.",
                options: [
                  { text: "Increasing income", correct: true },
                  { text: "Cutting spending", correct: false },
                  { text: "Both have the same fixed limit", correct: false },
                  { text: "Neither can be changed", correct: false },
                ],
              },
              {
                prompt: "What is 'the lie in between' wants and needs?",
                explanation:
                  "A want relabelled as a need. Once everything is a 'need', you have no flexibility and every cut feels like cutting into bone. The fix is honest labelling, not eliminating wants.",
                options: [
                  {
                    text: "A want dressed up as a need so it never gets questioned",
                    correct: true,
                  },
                  { text: "A need you forgot to budget for", correct: false },
                  { text: "Spending that is genuinely essential", correct: false },
                  { text: "Money you lend to others", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },

    // =====================================================================
    {
      title: "Seeing clearly — the honest ledger",
      description:
        "The unglamorous heart of the course. You will look at where your money actually goes, in full, once. Everything else stands on this.",
      lessons: [
        {
          title: "Why you can't manage what you can't see",
          type: "TEXT",
          points: 10,
          body: `Imagine trying to lose weight with no scale, no mirror, and no idea what you ate. You'd be guessing, and your guesses would flatter you, because that's what guesses do. Money is exactly the same. Without a record, your sense of your own spending is a hopeful story, and the story always underestimates the leaks.

## Measurement changes behaviour on its own

Here's something strange and useful: people who simply start tracking their spending — changing nothing else — tend to spend less. Not because tracking has magic powers, but because a purchase you know you'll have to write down is a purchase you think about for one extra second. That second is where a lot of bad spending dies. The record isn't just data. It's a mirror, and mirrors change behaviour.

## The rule for this module: no judging while you count

The biggest reason people abandon tracking is that it turns into a self-punishment session. They see the coffee number, feel ashamed, and stop looking. So here's the rule: while you're counting, you are not allowed to judge. You are a scientist recording data, not a judge handing down a verdict. The judging comes later, gently, when you have the full picture. Shame ends tracking; curiosity sustains it.

## What "seeing" actually means

You're going to reconstruct one real month of spending, every line, sorted into a handful of categories. One month. Not a new habit forever yet — just one honest month, so that for the first time you're deciding based on truth instead of a story.`,
          activity: {
            title: "Commit to the no-judging rule",
            prompt:
              "Write down, in your own words, a promise to yourself: for the next few lessons you will record your spending as a neutral scientist, not judge it. Then write the one spending number you're most afraid to look at — and notice that naming it out loud already took some of its power away. You'll look at it for real next lesson.",
          },
        },
        {
          title: "Building your first spending map",
          type: "TEXT",
          points: 15,
          body: `Now we count. This is the most important single exercise in the course, and it takes about an hour. Do it properly once and you'll never see your money the same way.

## Get the raw data

Open your last full month of bank and card statements, plus any cash you can remember spending. Most banking apps let you export or at least scroll a month. If you use cash a lot, you'll have to estimate — that's fine, estimate honestly and mark it as an estimate.

## Sort every line into a handful of buckets

Don't invent forty categories; you'll drown. Use a small set you can hold in your head:

- **Home** — rent or mortgage, utilities, anything to keep the roof on
- **Food in** — groceries you cook
- **Food out** — restaurants, delivery, coffee, snacks
- **Transport** — fuel, fares, car costs
- **Bills & subscriptions** — phone, internet, streaming, apps, insurance
- **Debt** — minimum payments and interest
- **People & fun** — gifts, going out, hobbies
- **Everything else** — the honest catch-all

## Add each bucket up

Total each category for the month. Then total the totals, and compare that to your income. This single comparison — total outflow versus income — is your real gap, the one you guessed two lessons ago.

## Expect a surprise

Almost everyone finds one category that is far bigger than they believed. That category is not your enemy. It's your biggest opportunity, because it's the place where a small change frees the most money. Circle it. We'll come back for it.`,
          activity: {
            title: "Build the map and check your guesses",
            prompt:
              "Reconstruct one full month of spending, sorted into the buckets above (or your own small set). Total each. Now compare 'food out' and 'subscriptions' to the guesses you wrote in lesson 2. Write down the two gaps between guess and reality. Then name the one category that surprised you most — that's the one worth the most to you.",
          },
        },
        {
          title: "The subscription audit",
          type: "TEXT",
          points: 10,
          body: `Subscriptions deserve their own lesson because they are engineered to be forgotten. That's not an accident — a subscription is the most profitable kind of sale precisely because the customer stops noticing they're paying. Your job is to notice, once, on purpose.

## Why they slip past you

Each one is small. Each one felt reasonable the day you signed up. And each one renews silently, so there's never a moment where you actively choose to pay again. Ten forgotten subscriptions at a few units each is a real bill you never agreed to in any meaningful sense — you agreed once, years ago, and have been agreeing by default ever since.

## The audit

Go through your statement and list every recurring charge — monthly and annual. The annual ones hide best because they only appear once a year, often on a date you don't remember. For each, ask three questions:

1. **Did I use this in the last month?** If no, that's a strong signal.
2. **Would I sign up for this today at this price?** If no, cancel it.
3. **Is there a free or cheaper version that does enough?** Often yes.

## The default is 'cancel', not 'keep'

Flip the burden of proof. Instead of "is there a reason to cancel?", ask "is there a live reason to keep paying?" Most subscriptions can't pass that test, and the ones that can, you'll keep with a clear conscience. Cancelling something you'll miss takes ten seconds to resubscribe. Keeping something you never use costs you every single month, silently, forever.`,
          activity: {
            title: "Run the audit and cancel one thing today",
            prompt:
              "List every recurring charge you can find, monthly and annual. Apply the three questions to each. Then actually cancel at least one before you finish this lesson — not 'later', now. Write down what you cancelled and the annual saving (monthly cost × 12). That number is real money you just gave back to yourself.",
          },
        },
        {
          title: "Fixed, variable, and why the difference matters",
          type: "TEXT",
          points: 10,
          body: `Your spending splits into two kinds, and knowing which is which tells you where your real control is.

## Fixed costs

Fixed costs are roughly the same every month and hard to change quickly: rent, loan payments, insurance, core utilities. They're the skeleton of your budget. You can change them, but usually only with a big decision — move house, refinance, switch provider — not on a random Tuesday. Because they're large and predictable, they set the baseline your whole budget has to clear.

## Variable costs

Variable costs move month to month and respond to daily choices: food out, shopping, entertainment, the small stuff. This is where your day-to-day control lives. It's also where most people focus all their guilt — the coffee, the takeaway — even though the fixed costs are often the bigger lever.

## The counterintuitive lesson

Everyone obsesses over variable costs because they're the ones you feel yourself choosing. But the biggest wins are often hiding in the fixed costs you've stopped questioning. Renegotiating one insurance policy or switching one provider can save more, permanently, than a year of skipped coffees — and it takes one afternoon instead of daily willpower. Variable cuts need effort every day; fixed cuts need effort once and then pay you forever.

## Use both, in the right way

Trim variable costs where it doesn't make life grim — that's the daily hygiene. But once a year, attack the fixed costs hard: shop every renewal, question every large recurring commitment. The fixed-cost review is the highest-leverage hour in personal finance, and almost nobody schedules it.`,
          activity: {
            title: "Split your map and find your biggest fixed cost",
            prompt:
              "Go back to your spending map and mark each category as mostly fixed or mostly variable. Then identify your single largest fixed cost that isn't rent. Write down one concrete action you could take this year to reduce it — get a competing quote, ask for a loyalty discount, switch provider — and a date you'll do it by.",
          },
        },
        {
          title: "Your money snapshot",
          type: "ASSIGNMENT",
          points: 25,
          body: `Time to pull the seeing phase together into one honest document. This assignment is the foundation the rest of the course builds on, so it's graded on honesty and completeness, not on whether the numbers are impressive.

Your instructor reads this one. Nothing you write here is judged as good or bad — a negative gap is a finding, not a failure, and naming it honestly is worth full marks.`,
          assignment: {
            title: "Your one-month money snapshot",
            instructions: `Write and submit your honest money snapshot for the month you tracked. This is the baseline you'll measure every later change against.

Cover all five:

**1. Income.** What actually landed in your account this month, after tax and deductions.

**2. Outflow by category.** Your totals for each spending bucket. Don't smooth them or round them kindly — the real numbers.

**3. Your real gap.** Income minus total outflow. State whether it's positive, roughly zero, or negative, in plain words.

**4. The surprise.** The one category that was bigger than you believed, and your honest guess at why.

**5. The first lever.** Based on everything above, name the single change that would most improve your gap — and say whether it's a spending cut or an income increase.

Do not include account numbers, card details, or passwords — describe amounts and categories, never credentials. This is about your patterns, not your login.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Honesty and completeness",
                weight: 40,
                descriptor:
                  "All categories accounted for, including the uncomfortable ones. Estimates are marked as estimates. Nothing obviously smoothed to look better.",
              },
              {
                criterion: "The real gap is stated plainly",
                weight: 30,
                descriptor:
                  "Income minus outflow is calculated and named honestly, including if it's negative. No hedging or hand-waving.",
              },
              {
                criterion: "A clear first lever",
                weight: 30,
                descriptor:
                  "One specific, actionable change is identified and correctly classified as a cut or an income increase, with reasoning that follows from the numbers.",
              },
            ],
          },
        },
      ],
    },

    // =====================================================================
    {
      title: "The budget that survives real life",
      description:
        "Most budgets die in week two. This module builds one designed for a life that includes surprises, bad days, and the occasional treat.",
      lessons: [
        {
          title: "Why most budgets fail",
          type: "TEXT",
          points: 10,
          body: `Almost everyone has tried to budget. Almost everyone has abandoned one. The failure is so common that people conclude they're "bad with money" — when really they were handed a budget designed to fail.

## Failure one: the perfectionist budget

You build a beautiful spreadsheet with forty categories, each with a precise limit. It works for eight days. Then one number goes over, the whole thing feels broken, and you quit — because a budget that punishes you for being human isn't a plan, it's a trap with your name on it. A budget you can keep at 80% beats a perfect one you keep for a week.

## Failure two: the no-fun budget

You cut everything enjoyable to the bone. It feels virtuous for two weeks and unbearable by week three, and then you rebound hard — the financial equivalent of a crash diet ending in a binge. A budget with zero room for joy is a budget you're planning to break.

## Failure three: the surprise-blind budget

You budget for a normal month. But there is no normal month — every month has a surprise: a birthday, a car problem, a dental bill. If your budget has no room for the thing that always happens, the thing that always happens will break it every single time, and you'll blame yourself for the budget's design flaw.

## What survives instead

A budget that survives is simple enough to keep in your head, leaves deliberate room for both fun and surprises, and forgives you when a number goes over. The next lessons build exactly that — starting with a system so simple it fits in three accounts.`,
          activity: {
            title: "Autopsy your last failed budget",
            prompt:
              "Think of the last time you tried to budget and it didn't stick. Which of the three failures killed it — too perfect, too joyless, or too surprise-blind? Or a mix? Write down what specifically happened when it broke, and how you felt right before you gave up. Naming the failure mode is how you avoid repeating it.",
          },
        },
        {
          title: "The three-account system",
          type: "TEXT",
          points: 15,
          body: `Here's a budgeting system simple enough that you'll actually keep it. It uses your bank accounts to do the work, so you don't have to hold willpower in your head all month.

## The idea

Instead of one account where everything mixes into an anxious blur, you split your money across three, each with one job. Money is separated by purpose the moment it arrives, so "money for bills" and "money to spend" are never the same pile — and you can never accidentally spend the rent because it isn't sitting where your spending money is.

## Account one: Bills

Every fixed cost is paid from here — rent, utilities, subscriptions, debt minimums. On payday, you move exactly the month's fixed costs into it and set the direct debits to draw from it. Once it's funded, you don't touch it. This account's job is to make sure the essential things are paid before you're tempted by anything else.

## Account two: Spending

This is your day-to-day money for variable costs — food, transport, fun. When it's empty, you're done for the period, and that's the whole point: it's a visible, physical limit instead of an abstract one. You spend from here freely and without guilt, because everything important is already handled in the Bills account.

## Account three: Saving

This is where the gap goes — your emergency fund first, then your goals. Crucially, money moves here automatically on payday, before you can spend it. We'll cover why "pay yourself first" is the single most powerful habit in the next lesson. For now: three accounts, three jobs, no willpower required.`,
          activity: {
            title: "Design your three accounts",
            prompt:
              "Using your snapshot numbers, work out what would flow into each account on payday: total fixed costs → Bills, your saving target → Saving, and whatever remains → Spending. Write the three amounts. Then note whether your bank lets you open free extra accounts or 'spaces/pots' — most do — and pick a day this week to set them up.",
          },
        },
        {
          title: "Paying yourself first",
          type: "TEXT",
          points: 15,
          body: `There is one habit that separates people who slowly build wealth from people who never do, regardless of income. It's called paying yourself first, and it sounds too simple to matter. It's the most important sentence in this course.

## The default that keeps people broke

Most people save what's left at the end of the month. The problem: there's never anything left. Spending expands to fill whatever's available — this is so reliable it has a name, Parkinson's Law for money. If saving is the last thing you do, it's the thing that never happens, no matter how much you earn.

## The reversal

Pay yourself first means you save at the start, automatically, the moment money arrives — before you've had a chance to spend it. You treat your future self like the most important bill you have, and you pay that bill first. Then you live on what's left, which is exactly what you'd have done anyway, except now the saving actually happened.

## Why automation beats discipline

The magic isn't the amount — it's that it's automatic. A standing order that moves money to Saving the day after payday requires one decision, once, instead of a fresh act of willpower every month. Willpower is a battery that drains; automation is a machine that doesn't. Every reliable saver you've ever met is quietly running on automation, not superhuman discipline.

## Start smaller than feels serious

If a big number feels impossible, start with an amount so small it's almost a joke. The point right now is not the sum — it's building the pipe. Once the pipe exists and runs automatically, widening it later is easy. A tiny automatic transfer beats a huge intended one every time.`,
          activity: {
            title: "Set your first automatic transfer",
            prompt:
              "Decide on an automatic amount to move to Saving on payday — start smaller than feels serious if you need to. Then actually set up the standing order, or if you can't right now, write the exact steps and the date you'll do it. Write down the amount and when it'll trigger. This one pipe, once built, does more than years of good intentions.",
          },
        },
        {
          title: "The zero-based month",
          type: "TEXT",
          points: 10,
          body: `Once the three accounts and the automatic saving are running, there's one more idea that turns a budget from a vague intention into a plan: giving every unit of money a job before the month begins.

## What zero-based means

At the start of the month, you assign all your expected income to a purpose — bills, spending, saving, a specific goal — until the amount left to assign is zero. Not zero in your account; zero unassigned. Every unit has a job. This is the opposite of the usual approach, where money sits in an undifferentiated pile and gets spent reactively until it runs low and you panic.

## Why 'a job for every unit' works

Unassigned money is money that leaks. When a unit has no defined purpose, it quietly drifts toward whatever's in front of you. When every unit already has a job, spending it on something else means consciously taking it off its assigned task — and that small friction is where impulse spending goes to die. You're not forbidding yourself anything; you're just making the trade-off visible.

## Handling a month with irregular income

If your income varies — freelance, commission, shift work — budget against your last low month, not your best one. Assign the reliable minimum first; when a good month arrives, the surplus gets assigned then, mostly to saving and debt. Budgeting to your lowest normal month means the plan holds even when the work is thin, and windfalls become fuel instead of the baseline you depend on.

## It's a plan, not a prison

A zero-based budget isn't a set of forbidden things. It's a set of decisions you make once, calmly, in advance — so that in the moment you're just following a choice you already made, instead of negotiating with yourself while holding a card.`,
          activity: {
            title: "Give every unit a job for next month",
            prompt:
              "For next month, assign all your expected income to purposes — bills, spending, saving, any specific goal — until nothing is left unassigned. If your income varies, budget against a low-normal month. Write the plan out. Note how much you assigned to Saving, and whether writing it down changed what you were willing to give it.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on the budgeting system before we move to emergencies and debt. These habits — separate accounts, pay yourself first, a job for every unit — are the engine the rest of the course drives. Make sure they're solid.`,
          quiz: {
            title: "Budgeting that survives",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "Why do perfectionist budgets usually fail?",
                explanation:
                  "A budget with too many precise limits breaks the first time one number goes over, and then people quit entirely. A simpler budget you keep at 80% beats a perfect one you abandon in a week.",
                options: [
                  {
                    text: "One number goes over, the whole thing feels broken, and people quit",
                    correct: true,
                  },
                  { text: "They don't include enough categories", correct: false },
                  { text: "Spreadsheets are inherently unreliable", correct: false },
                  { text: "They save too much money", correct: false },
                ],
              },
              {
                prompt: "What does 'pay yourself first' mean?",
                explanation:
                  "Save automatically at the start, the moment money arrives, before you can spend it — then live on the rest. Saving what's left at the end fails because there's never anything left.",
                options: [
                  {
                    text: "Move money to savings automatically as soon as you're paid, before spending",
                    correct: true,
                  },
                  { text: "Buy yourself a treat before paying bills", correct: false },
                  { text: "Pay your own debts before lending to others", correct: false },
                  { text: "Save whatever is left at the end of the month", correct: false },
                ],
              },
              {
                prompt: "Why does automation beat discipline for saving?",
                explanation:
                  "Willpower drains; a standing order doesn't. Automating the transfer means one decision once, instead of a fresh act of willpower every month. That's why reliable savers run on automation, not heroics.",
                options: [
                  {
                    text: "A standing order needs one decision once; willpower is needed fresh every month",
                    correct: true,
                  },
                  { text: "Banks pay more interest on automatic transfers", correct: false },
                  { text: "Automation lets you save without earning more", correct: false },
                  { text: "It isn't — discipline is more reliable", correct: false },
                ],
              },
              {
                prompt: "In a zero-based budget, what does 'zero' refer to?",
                explanation:
                  "Zero money left unassigned — every unit has a job before the month starts. It does not mean zero in your account. Unassigned money is money that leaks toward whatever's in front of you.",
                options: [
                  { text: "Zero money left unassigned to a purpose", correct: true },
                  { text: "Zero money in your account", correct: false },
                  { text: "Zero spending on anything fun", correct: false },
                  { text: "Zero debt", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },

    // =====================================================================
    {
      title: "The emergency fund — ending the surprises",
      description:
        "The single change that turns constant low-grade money panic into calm. Why surprises aren't surprising, and how to be ready.",
      lessons: [
        {
          title: "Why surprises aren't surprising",
          type: "TEXT",
          points: 10,
          body: `The car breaks down. The tooth needs work. The phone dies. The boiler fails. Each of these feels like a bolt from the blue — an unfair, unpredictable disaster. But step back and look at a whole year, or a decade, and a different picture appears: something always breaks. Not the same thing, and not on a schedule you can predict, but the category "an unexpected expense" is the most predictable line in your budget.

## The reframe that changes everything

You cannot predict which surprise will happen, but you can predict with near-certainty that a surprise will happen. That shift — from "if" to "when" — is the whole idea behind an emergency fund. You're not budgeting for the boiler specifically. You're budgeting for the fact that boilers, in general, exist and eventually fail.

## Why the surprise does so much damage

The real damage of an unexpected expense usually isn't the expense — it's what you have to do to cover it. Without a buffer, a surprise gets paid for with a credit card, an overdraft, or a payday loan, and now a one-time problem becomes a long-term debt that costs far more than the original bill. The pothole becomes a sinkhole. An emergency fund's job is to keep a one-time problem one-time.

## The quiet benefit nobody mentions

Beyond the maths, an emergency fund changes how you feel every day. Living without a buffer is living one bad day away from crisis, and that low hum of dread affects everything — your sleep, your choices, your ability to walk away from a bad job. The fund buys calm as much as it buys safety, and calm is worth more than the interest you're not earning on it.`,
          activity: {
            title: "List your last three 'surprises'",
            prompt:
              "Write down the last three unexpected expenses that hit you, roughly what each cost, and — honestly — how you paid for each. If any went onto a card or overdraft, note whether you're still paying for it. This is the pattern an emergency fund breaks. Seeing it written down is the reason to build one.",
          },
        },
        {
          title: "How much is enough",
          type: "TEXT",
          points: 10,
          body: `"Build an emergency fund" is useless advice without a number. Too small and it won't catch a real emergency; too big and you've got money sitting idle that could be working. Here's how to size it honestly for your life, not a generic rule.

## Start with your real monthly essentials

Not your full spending — your essentials. The number you'd need to survive a month if all the fun stopped: home, basic food, transport, minimum debt payments, core bills. This "bare survival" figure is usually a good bit lower than your normal spending, and it's the right unit to measure your fund in.

## The staircase, not the leap

The classic advice is three-to-six months of expenses, and that's a fine destination — but it's a terrible starting target, because it's so far away it feels pointless to begin. So climb a staircase instead:

- **Step one: one month's essentials, or even just a small starter buffer.** This alone stops most small surprises from becoming debt. It's the highest-value step and the fastest to reach.
- **Step two: three months' essentials.** Now you can absorb a real shock — a job loss, a major repair — without borrowing.
- **Step three: six months, if your income is unstable** or you support others. More cushion for more risk.

## Match the size to your risk

A salaried person with stable work and no dependents needs less than a freelancer with three kids. If your income is variable or your job is precarious, aim higher. If you're rock-solid and could easily find new work, the smaller end is fine. Size the fund to how bad a realistic bad year would be for you specifically.`,
          activity: {
            title: "Calculate your survival number",
            prompt:
              "Work out your bare monthly essentials — home, basic food, transport, minimum debt payments, core bills only. Write that number. Then set your Step One target (one month of it, or a starter buffer if that's still a stretch) and your eventual destination (three or six months, based on how stable your income is). Write all three figures.",
          },
        },
        {
          title: "Where to keep it",
          type: "TEXT",
          points: 10,
          body: `An emergency fund has two requirements that pull in opposite directions, and getting the balance right is the whole trick.

## Requirement one: you can reach it fast

An emergency by definition can't wait. So the fund must be somewhere you can access within a day or two, not locked in something that takes a week to sell or charges a penalty to withdraw. This rules out most investments — which we'll cover later — because their value moves around and the worst emergencies often arrive exactly when markets are down. Emergency money must be money you can grab, in full, on a bad day.

## Requirement two: it's hard enough to reach that you don't raid it

The opposite danger: if the fund sits in your everyday spending account, it isn't a fund, it's just a big balance you'll spend without noticing. So it needs a little friction — a separate account, ideally at a different bank or in a clearly labelled savings pot, so that dipping into it is a deliberate act, not an accident.

## The sweet spot

A separate, easy-access savings account. It earns a little interest, you can withdraw within a day, and because it's not sitting next to your spending money, you won't leak it. Label it clearly — "Emergency, do not touch" — because the label does real work in the moment you're tempted.

## What it is not

It is not an investment, and you should not feel bad that it's "only" earning a little. Its job is not to grow — its job is to be there, in full, on the worst day. Reaching for a higher return by putting emergency money at risk defeats the entire purpose. Boring and available beats clever and locked-up, every time, for this one specific pot.`,
          activity: {
            title: "Choose the home for your fund",
            prompt:
              "Decide where your emergency fund will live: which account or savings pot, at which bank, and how you'd access it in a hurry. Confirm it's separate from your everyday spending but reachable within a day or two. Write down your choice, and if the account doesn't exist yet, the step to open it. Give it a clear label.",
          },
        },
        {
          title: "Rebuilding after you use it",
          type: "TEXT",
          points: 10,
          body: `Here's a scenario nobody prepares you for: you build your emergency fund, feel proud, and then an actual emergency happens and you spend it. It can feel like failure — like you're back to square one. It is the exact opposite. The fund did its job perfectly.

## Using it is success, not failure

The whole point of an emergency fund is to be spent on emergencies. A fund that gets used to cover a real crisis — instead of a credit card at brutal interest — has just saved you from exactly the debt spiral this module is about. Spending it isn't the plan failing; it's the plan working. The only failure would have been not having it and reaching for a loan instead.

## Refill before anything else

After you use the fund, refilling it becomes your top financial priority — ahead of extra debt payments, ahead of investing, ahead of goals. Because until it's back, you're exposed again, and the next surprise (which is coming) will hit you unprotected. Redirect your automatic saving straight back into the fund until it's whole, then resume normal life.

## The muscle you're building

Each time you use and rebuild the fund, something valuable happens: you learn, in your body, that you can absorb a shock and recover. That confidence is a genuine asset. People with a working emergency fund make better decisions everywhere else — they don't panic-sell, don't take desperate loans, don't stay in bad situations out of fear — because they've proven to themselves that a bad surprise is survivable. The fund isn't just money. It's evidence that you can handle things, and that evidence changes how you live.`,
          activity: {
            title: "Write your refill rule now",
            prompt:
              "Write your rule for after you use the fund, before you ever need it: 'If I spend my emergency fund, I will redirect [my automatic saving / this specific amount] straight back into it until it's whole, before I do anything else with spare money.' Deciding this calmly now means you won't have to decide it while stressed later.",
          },
        },
        {
          title: "Your safety plan",
          type: "ASSIGNMENT",
          points: 25,
          body: `Pull the emergency-fund thinking into one concrete plan. This is graded on whether the plan is realistic and specific to your life — a plan you'll actually follow beats an ambitious one you won't.

Your instructor reads this. There's no "right" fund size — only the right size for your situation, honestly reasoned.`,
          assignment: {
            title: "Your emergency fund plan",
            instructions: `Write and submit your emergency fund plan. Make it specific enough that you could hand it to a friend and they'd know exactly what to do.

Cover all four:

**1. Your survival number.** Your bare monthly essentials, and how you calculated it.

**2. Your targets.** Your Step One target and your eventual destination (one month → three or six), with a sentence on why that destination fits your income stability and responsibilities.

**3. Where it lives.** The specific account or pot, why you chose it, and how you'd access it in an emergency.

**4. How you'll build and rebuild it.** The automatic amount going in each month, roughly how many months to reach Step One, and your rule for refilling it after you use it.

Describe amounts and accounts by purpose, never share account numbers or login details.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Realistic sizing",
                weight: 30,
                descriptor:
                  "The survival number is genuinely essentials-only, and the targets are matched to the person's actual income stability and responsibilities, not a generic rule copied blindly.",
              },
              {
                criterion: "Sound placement",
                weight: 30,
                descriptor:
                  "The chosen home is separate from everyday spending, accessible within a day or two, and not at risk in an investment. The reasoning shows they understood the two competing requirements.",
              },
              {
                criterion: "A real build-and-rebuild plan",
                weight: 40,
                descriptor:
                  "There's a concrete monthly amount and timeline to Step One, and a clear refill rule decided in advance. The plan is something they could actually start this month.",
              },
            ],
          },
        },
      ],
    },

    // =====================================================================
    {
      title: "Debt — the maths and the escape",
      description:
        "How interest really works against you, and how to get free in the order that costs you least — without falling for the people who profit from your panic.",
      lessons: [
        {
          title: "Good debt, bad debt, and the honest test",
          type: "TEXT",
          points: 10,
          body: `"Good debt" and "bad debt" get thrown around as if some debts are virtuous. That's too simple and a bit dangerous. Debt is a tool with a cost, and the only honest question is whether what you get for it is worth what it charges you.

## The test that cuts through the labels

Ask one thing: does this debt buy something that will earn or save you more than the debt costs? A loan for training that raises your income, or a sensible mortgage on a home you'd otherwise rent, can pass — the thing you bought pays you back more than the interest takes. A loan for a holiday or a depreciating gadget cannot pass; the thing is gone or losing value while the interest keeps charging.

## Why 'bad debt' is so dangerous

The debts people call bad — credit cards, payday loans, high-interest store finance — share a lethal feature: high interest on things that don't generate any return. You're paying a large ongoing fee for something that gives you nothing back. This is the debt that compounds against you, and it's the first thing to attack, because every unit you owe it is actively working to make you poorer.

## The nuance the labels miss

Even "good" debt goes bad if it's too big or too expensive. A mortgage you can't afford isn't good debt because it's a mortgage — it's a crisis with a respectable name. And a small, cheap "bad" debt is less urgent than a huge, expensive "good" one. Forget the labels. Rank your debts by interest rate and by whether the thing they bought pays you back. That ranking, not the category name, tells you what to fear and what to attack first.`,
          activity: {
            title: "Apply the test to your own debts",
            prompt:
              "List every debt you have: what you owe, and its interest rate if you know it (find it if you don't — it's on the statement). For each, apply the honest test: does it buy something that earns or saves more than it costs? Mark each 'works for me' or 'works against me'. Don't rank yet — just see them all in one place, which most people never do.",
          },
        },
        {
          title: "How interest actually works against you",
          type: "TEXT",
          points: 15,
          body: `To escape debt you have to understand the machine you're fighting. Interest isn't just a fee — on the wrong kind of debt, it's a force that actively grows what you owe, and understanding it turns panic into strategy.

## Interest is rent on money

When you borrow, you're renting money, and interest is the rent. A rate is just the yearly rent expressed as a percentage. The higher the rate, the more you pay to keep using money that isn't yours — which is why the rate, not the balance, is the number that decides how dangerous a debt is. A large debt at a low rate can be calmer than a small debt at a vicious one.

## The trap of the minimum payment

Credit cards are engineered around one number: the minimum payment. It looks kind — pay just this small amount and you're fine. It's the opposite of kind. The minimum is calculated to be barely more than the interest, so paying only the minimum can keep you in debt for years or decades on a modest balance, while you pay back the original amount several times over. The minimum payment isn't a helping hand; it's the business model.

## Compounding, pointed the wrong way

The same compounding that grows investments (a later module) grows debt when it runs against you. Unpaid interest gets added to what you owe, and then you're charged interest on the interest. Left alone, high-interest debt doesn't just sit there — it accelerates. This is why "I'll deal with it later" is so expensive: later, it's bigger, and it got bigger by itself.

## The one hopeful implication

Here's the flip side, and it's genuinely motivating: paying off high-interest debt is one of the best guaranteed returns available anywhere. Clearing a debt charging 25% is exactly as good as an investment that reliably returns 25% — and no investment reliably returns that. Every unit you throw at expensive debt earns you that rate, guaranteed, tax-free. There is often no better use of money.`,
          activity: {
            title: "Find what the minimum is really costing you",
            prompt:
              "Take your most expensive debt. Look at (or estimate) the minimum payment and the interest rate. Roughly, how much of that minimum is just interest versus actually reducing what you owe? Write down what you find. Then reframe it: paying this debt off is a guaranteed return equal to its interest rate. Write that rate down as 'my best available investment right now'.",
          },
        },
        {
          title: "Snowball versus avalanche",
          type: "TEXT",
          points: 10,
          body: `Once you're paying more than the minimum, you face a real choice: which debt to attack first? There are two respected methods, and the honest answer to "which is best" is "the one you'll actually stick to".

## The avalanche: cheapest in pure maths

Pay minimums on everything, then throw every spare unit at the debt with the highest interest rate. When it's gone, roll that money onto the next-highest rate, and so on. Because you're always killing the most expensive debt first, this method costs you the least money and clears you fastest, mathematically. If you're motivated by numbers, this is the optimal path.

## The snowball: cheapest in willpower

Pay minimums on everything, then throw every spare unit at the smallest balance, regardless of rate. When it's gone, roll that money onto the next-smallest. You clear whole debts quickly, and each one you eliminate gives a real jolt of momentum and proof that this is working. It costs slightly more in interest than the avalanche, but it keeps more people going to the finish.

## How to actually choose

If your debts are similar in size, use the avalanche — take the cheaper path. If you have one small debt you could kill this month for a quick win, or you've abandoned debt plans before and need momentum, use the snowball — the small extra interest is a cheap price for actually finishing. The best method is the one that ends with you debt-free, not the one that looks best on a spreadsheet you gave up on.

## The part both methods share

Both rely on the same engine: pay minimums on everything so nothing defaults, then concentrate all firepower on one target instead of spreading it thin. Spreading extra payments across every debt equally is the slow way. Focus is what makes either method work.`,
          activity: {
            title: "Choose your method and your first target",
            prompt:
              "Order your debts two ways: by interest rate (highest first) and by balance (smallest first). Decide which method fits you — avalanche if you're driven by the maths, snowball if you need momentum or have a quick win available. Name your first target debt under your chosen method, and the extra amount you'll aim at it beyond the minimum.",
          },
        },
        {
          title: "Negotiating and consolidating without getting scammed",
          type: "TEXT",
          points: 10,
          body: `When you're in debt, you become a target. An industry exists to profit from your desperation, and it's very good at dressing up predators as rescuers. This lesson is about the legitimate tools — and the traps wearing their clothes.

## The legitimate tools

**Ask for a lower rate.** Lenders sometimes reduce your rate if you simply call and ask, especially if you've paid reliably or mention you're considering moving the balance elsewhere. It's a five-minute call that can save real money, and the worst they can say is no.

**Balance transfers and consolidation.** Moving high-interest debt to a lower-rate product — a consolidation loan or a low-rate transfer — can genuinely cut your interest and simplify many payments into one. Done right, it's a real tool.

## The traps

**Consolidation that lowers the payment by extending the term.** If a "consolidation" cuts your monthly payment mainly by stretching the loan over far longer, you may pay more in total even at a lower rate. Always compare the total cost to the finish, not just the monthly payment. A smaller payment for twice as long is often a worse deal wearing a friendlier face.

**Debt-relief and "settlement" companies charging big fees.** Many charge steep upfront fees for things you could do yourself for free, and some damage your credit or leave you worse off. Free, non-profit debt advice exists in most countries — use that before anyone who charges you to be rescued.

**Anyone who pressures or rushes you.** Legitimate help doesn't need you to decide right now. Urgency, secrecy, and upfront fees are the three flags. If a "solution" has any of them, it's usually the problem.

## The rule

Never pay to be rescued from debt before checking the free options, and never let a lower monthly payment hide a higher total cost. When in doubt, slow down — the pressure to hurry is itself the warning.`,
          activity: {
            title: "Make one legitimate move",
            prompt:
              "Pick one legitimate action you could take this week: call a lender to ask for a lower rate, or research a genuine low-rate balance transfer or consolidation (comparing total cost to the finish, not just the monthly payment). Write down which you'll do, and one 'urgency, secrecy, or upfront fee' red flag you'll watch for if anyone offers to 'help'.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check before we switch from defence to offence and start growing money. The debt module is where the biggest guaranteed returns hide — make sure the mechanics are clear.`,
          quiz: {
            title: "Debt, honestly",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "What's the honest test for whether a debt is worth it?",
                explanation:
                  "Whether the thing it buys earns or saves you more than the debt costs in interest. Training that raises income can pass; a holiday on a credit card cannot. The category labels 'good' and 'bad' are less reliable than this test.",
                options: [
                  {
                    text: "Whether what it buys earns or saves more than the interest costs",
                    correct: true,
                  },
                  { text: "Whether it's called a mortgage or a credit card", correct: false },
                  { text: "Whether the monthly payment feels affordable", correct: false },
                  { text: "Whether a friend recommended it", correct: false },
                ],
              },
              {
                prompt: "Why is paying only the minimum on a credit card a trap?",
                explanation:
                  "The minimum is calculated to be barely more than the interest, so it can keep you in debt for years or decades while you repay the balance several times over. It's the lender's business model, not a helping hand.",
                options: [
                  {
                    text: "It's set barely above the interest, keeping you in debt for years",
                    correct: true,
                  },
                  { text: "It's illegal in most places", correct: false },
                  { text: "It pays the debt off too quickly to earn rewards", correct: false },
                  { text: "It only applies to good debt", correct: false },
                ],
              },
              {
                prompt: "The avalanche method attacks which debt first?",
                explanation:
                  "The highest interest rate, paying minimums on the rest. This costs the least money overall. The snowball attacks the smallest balance first for motivation, at a slightly higher interest cost.",
                options: [
                  { text: "The one with the highest interest rate", correct: true },
                  { text: "The one with the smallest balance", correct: false },
                  { text: "The oldest debt", correct: false },
                  { text: "The one with the largest balance", correct: false },
                ],
              },
              {
                prompt: "Which is a red flag that debt 'help' is actually a scam?",
                explanation:
                  "Urgency, secrecy, and upfront fees are the three classic flags. Legitimate help — including free non-profit debt advice — doesn't pressure you to decide immediately or charge steep fees to do what you could do yourself.",
                options: [
                  {
                    text: "Pressure to decide now, secrecy, or a large upfront fee",
                    correct: true,
                  },
                  { text: "They offer to lower your interest rate", correct: false },
                  { text: "They suggest a balance transfer", correct: false },
                  { text: "They tell you to compare total cost to the finish", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },

    // =====================================================================
    {
      title: "Earning more — income is a skill",
      description:
        "Cutting has a floor; earning has no ceiling. How to raise your income deliberately, at work and beyond, without burning yourself to the ground.",
      lessons: [
        {
          title: "The ceiling on cutting",
          type: "TEXT",
          points: 10,
          body: `You've spent five modules learning to control outflow, and it matters. But there's a hard truth waiting at the bottom of every cutting strategy: you can only cut to zero. Past a point, trimming harder stops freeing meaningful money and starts making life smaller and grimmer. Cutting is essential, and it is finite.

## The asymmetry nobody frames clearly

Here's the asymmetry that should reshape how you think: your spending has a floor you'll hit, but your income has no ceiling you'll ever reach. Someone can always, in principle, earn more — take on a better-paid role, raise their rates, add a second stream, build a skill the market pays more for. The lever with no ceiling is the one most people never seriously pull, because it feels harder and the results come slower.

## Why people avoid the bigger lever

Cutting feels safe and immediate — cancel a subscription, see the saving today. Earning more feels risky and delayed — ask for a raise and you might hear no; start something and it might take months to pay. So people pour all their energy into the small, safe lever and leave the big one untouched. It's completely understandable, and it's a trap, because the small lever runs out and the big one doesn't.

## Both hands on the gap

This isn't "stop cutting" — the discipline you've built is the foundation, and without it, more income just becomes more spending. It's "add the other hand". The people who actually get free almost always do it from both ends: they keep outflow controlled and they deliberately, patiently raise income. This module is about the lever you've probably been avoiding. It's the one with your name on the ceiling — because there isn't one.`,
          activity: {
            title: "Confront your own asymmetry",
            prompt:
              "Be honest: over the last year, how much energy have you put into cutting spending versus increasing income? Most people find it's heavily lopsided toward cutting. Write down your rough split. Then write one sentence about why the income side felt harder to approach — naming the fear is the first step to acting on it.",
          },
        },
        {
          title: "Raising your price at work",
          type: "TEXT",
          points: 15,
          body: `For most people, the fastest available income increase isn't a side hustle — it's getting paid properly for the work they already do. A raise compounds: it lifts every future month and often every future job, since new offers anchor on your current pay. Yet most people never ask, and the ones who do often ask badly.

## Why you have more leverage than you feel

Replacing you is expensive and risky for an employer — hiring, training, and the gap while a new person gets up to speed all cost far more than a raise. If you're doing good work, keeping you is usually the cheaper option, which means you have real leverage even when it doesn't feel that way. The discomfort of asking is not evidence that the answer is no.

## Build the case before the conversation

Don't ask based on need ("my rent went up") — ask based on value. In the months before the conversation, quietly collect evidence: results you've delivered, extra responsibilities you've taken on, problems you've solved, what the role pays elsewhere. You're not begging for a favour; you're presenting a business case for why paying you more is a good decision for them. Come with the evidence, not the emotion.

## Ask well

Pick a good moment — after a win, at a review, when you have leverage, not when the company is visibly struggling. State what you've delivered, state the number you're asking for (a specific figure, researched, slightly above your true target so there's room to settle), and then stop talking. Silence after the ask is powerful; don't fill it by negotiating against yourself.

## If the answer is no

A no isn't the end — it's information. Ask exactly what would need to be true for a yes, and by when. Get it specific and get it agreed. Now you either have a clear path to a raise, or you have clarity that this place won't pay you what you're worth — which is its own valuable answer, and the start of looking elsewhere.`,
          activity: {
            title: "Start your evidence file",
            prompt:
              "Whether or not you're employed right now, practise the skill: write down three concrete results or contributions you've delivered in your work that show your value — with numbers where possible. Then research what your role pays elsewhere and note a specific target figure. This file is the backbone of any raise conversation. Start it today; you'll thank yourself at review time.",
          },
        },
        {
          title: "The side income that doesn't burn you out",
          type: "TEXT",
          points: 10,
          body: `"Get a side hustle" is common advice and often terrible, because most side hustles are just a second low-paid job that eats the life you were trying to improve. A good extra income stream is built differently — it respects your energy and grows in value instead of just trading more hours for cash.

## Trading time versus building an asset

There are two kinds of extra income. One trades your time directly for money — driving, delivering, shift work. It's reliable and quick to start, but it has the same ceiling as any hourly work: you run out of hours, and the moment you stop, the income stops. The other builds something that keeps earning — a skill, an audience, a product, a body of work — that pays you beyond the hours you put in. The first plugs a gap now; the second changes your ceiling later.

## Start with time-for-money if you need cash now

If you're in a hole and need income this month, honest time-for-money work is completely valid — take it, use it to stabilise, and don't let anyone shame you for a "normal" side job. Just go in with eyes open: it's a bridge, not a destination, because it can't scale past your available hours.

## Protect the thing you're working for

The deepest trap is burnout. If your side income destroys your sleep, your health, or your relationships, you're converting long-term wealth into short-term cash at a terrible exchange rate — and often the medical or emotional bill later erases the gain. Guard your recovery like it's part of the plan, because it is. An extra stream that costs you your health or the people you love isn't income; it's a loan against your future taken at a brutal rate.

## The sustainable shape

The best side income uses a skill you already have or want to build, fits into deliberate hours you've protected, and ideally builds toward something that will one day earn without your constant presence. Slower to pay off, far more durable.`,
          activity: {
            title: "Map one time-for-money and one asset idea",
            prompt:
              "Write down one honest time-for-money option you could start quickly if you needed cash, and one 'build an asset' idea that uses a skill you have or want — something that could eventually earn beyond the hours you put in. For the asset idea, name the first small step. Then write one boundary you'll protect (sleep, a rest day, time with someone) no matter what.",
          },
        },
        {
          title: "Turning a skill into an offer",
          type: "TEXT",
          points: 10,
          body: `Most people who want to earn more from a skill get stuck at the same place: they have an ability but no offer. "I'm good at design" isn't something anyone can buy. "I'll build you a one-page website that gets more customers calling you, in a week, for this price" is. Turning a vague skill into a specific offer is the move that unlocks income.

## An offer is a promise plus a price

A real offer has three parts: who it's for, the specific result you'll deliver, and what it costs. Vague availability ("I do social media") makes people's eyes glaze; a sharp offer ("I'll set up and run one month of posts for local restaurants who don't have time, for this price") gives them something to say yes to. Specificity isn't a limitation — it's what makes the sale possible, because people buy solutions to specific problems, not general talent.

## Price on value, not on time

Beginners price by the hour and stay poor, because as they get faster and better, they earn less per job — a perverse outcome. Instead, price on the value of the result to the buyer. A website that brings a business new customers is worth far more than the hours it takes you, and the buyer is happy to pay for the outcome, not your clock. Charging for value is how skill turns into real money.

## Start before you feel ready

You will never feel fully ready, and waiting for expertise is how good offers die in someone's head for years. You don't need to be the best — you need to be genuinely useful to someone and honest about where you are. Your first clients can be at a starter price in exchange for you doing great work and earning a testimonial. Deliver, collect proof, raise the price, repeat. The path to a valuable offer runs through a first imperfect one, not around it.`,
          activity: {
            title: "Draft one specific offer",
            prompt:
              "Take a skill you have and turn it into a real offer with three parts: who it's for, the specific result you'll deliver, and a price (priced on the value to them, not your hours). Write it as one clear sentence someone could say yes to. Then name the first person or type of person you could show it to this month.",
          },
        },
        {
          title: "Your income plan",
          type: "ASSIGNMENT",
          points: 25,
          body: `Turn the income lever into a real, sequenced plan. This is graded on realism and specificity — a modest plan you'll execute beats an ambitious fantasy.

Your instructor reads this. There's no expectation that you launch a business; raising your existing pay counts fully. The point is a deliberate plan where before there was probably none.`,
          assignment: {
            title: "Your income growth plan",
            instructions: `Write and submit a deliberate plan to raise your income over the next year. Make it concrete enough to act on this month.

Cover all four:

**1. The nearest win.** The fastest realistic way to increase what you earn — usually a raise, better-paid role, or higher rates for existing work. State the specific step and when you'll take it.

**2. Your case or offer.** If it's a raise: the three strongest pieces of evidence for your value and your target figure. If it's self-employment: your one specific offer (who, what result, what price).

**3. The longer build.** One 'asset' you could build over the year that raises your ceiling — a skill, a stream, a body of work that eventually earns beyond your hours — and its first small step.

**4. Your guardrails.** The specific limits (sleep, health, relationships, rest) you'll protect so that earning more doesn't cost you the life you're earning for.

Keep it about your plans and skills — no need to share employer names or private contract details.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "A concrete nearest win",
                weight: 30,
                descriptor:
                  "There's a specific, realistic near-term step to earn more, with a timeframe — not a vague aspiration to 'make more money'.",
              },
              {
                criterion: "A real case or offer",
                weight: 30,
                descriptor:
                  "The raise case has value-based evidence and a target figure, or the offer names who it's for, the result, and a value-based price. Specific enough to actually use.",
              },
              {
                criterion: "A ceiling-raising build with guardrails",
                weight: 40,
                descriptor:
                  "A longer-term income asset is identified with a first step, and genuine guardrails are named so the plan protects health and relationships rather than sacrificing them.",
              },
            ],
          },
        },
      ],
    },

    // =====================================================================
    {
      title: "Growing money — investing without the hype",
      description:
        "Once you're saving with no expensive debt, money should grow. The boring, reliable path that actually works — and why it beats the exciting one.",
      lessons: [
        {
          title: "Why saving alone loses to inflation",
          type: "TEXT",
          points: 10,
          body: `You've done the hard part: you have a gap, an emergency fund, and no expensive debt eating you alive. Now money starts piling up in savings — and here's the uncomfortable truth that pushes people toward investing: money sitting still doesn't stay still in value. It quietly shrinks.

## Inflation is a slow leak in your money's value

Prices tend to drift upward over time. That means the same amount of money buys a little less each year — not because the number changed, but because what it can purchase did. Money under the mattress, or in an account paying almost nothing, loses purchasing power every year even though the figure never drops. It's the most patient thief there is: you never see it take anything, but a decade later your money buys noticeably less.

## Why this matters for long-term money

For short-term money — your emergency fund, next year's rent — this barely matters and safety comes first; keep it accessible even though it's slowly losing a little. But for money you won't touch for many years, that slow leak compounds into a serious loss. Money you're saving for a decade away needs to at least keep pace with rising prices, and ideally outgrow them. That's the entire reason investing exists: not to get rich quick, but to stop your long-term money from slowly bleeding value.

## The reframe

Investing isn't the aggressive, risky opposite of sensible saving. For long-term money, investing is the sensible choice and leaving it all in cash is the quietly risky one — the risk being a guaranteed slow loss to inflation rather than a dramatic one. The next lessons show the boring, reliable way to do it, and why boring wins.`,
          activity: {
            title: "Separate your short and long money",
            prompt:
              "Split your saving into two buckets by time: money you might need within the next couple of years (emergency fund, near-term goals) and money you genuinely won't touch for many years. Write down roughly how much is in each. The first bucket stays safe and accessible; the second is what the rest of this module is about. Naming the split is the first investing decision.",
          },
        },
        {
          title: "Compounding, the eighth wonder",
          type: "TEXT",
          points: 15,
          body: `If there's one idea in all of finance worth burning into your memory, it's compounding. It's the force that turns modest, patient saving into real wealth — and the reason starting early beats starting big.

## Growth on growth

Simple growth earns a return on what you put in. Compounding earns a return on what you put in and on all the returns you've already earned. Your money makes money, and then that money makes money too. Early on it looks unimpressive — a small return on a small amount. But each year the base is bigger, so the same rate produces a larger gain, and the growth accelerates. Late in the journey, your money can grow by more in a single year than you originally invested.

## Why time matters more than amount

Because compounding accelerates, the length of time your money grows matters enormously — often more than how much you invest. A modest amount left to compound for thirty years can easily outgrow a much larger amount left for ten. This is the single best argument for starting now, even small: you can't buy back lost years later, no matter how much you eventually earn. Time is the one ingredient you can't add retroactively.

## The discipline it demands

Compounding's power comes almost entirely at the end, which makes it psychologically hard: for years it feels like nothing is happening, and the temptation to pull the money out for something exciting is strong. The people who win with compounding are the ones who leave it alone long enough for the acceleration to arrive. Interrupting it early doesn't just cost you what you withdrew — it costs you all the future growth that money would have generated. Patience isn't a virtue here; it's the entire mechanism.

## The flip side you already met

Remember: this same force runs against you on high-interest debt. That's why the order of this course is deliberate — kill the compounding that works against you before feeding the compounding that works for you.`,
          activity: {
            title: "Picture your own long game",
            prompt:
              "Take the long-term bucket you identified last lesson, plus whatever you could add to it monthly. Without needing exact maths, write down: how many years until you'd actually use this money, and how you'd feel leaving it untouched through years where 'nothing seems to be happening'. Naming that patience now makes it easier to hold later, when the temptation to pull out arrives.",
          },
        },
        {
          title: "Risk, diversification, and not betting the house",
          type: "TEXT",
          points: 10,
          body: `Investing means accepting risk — the possibility that an investment falls in value. You can't earn returns above cash without it. But there's smart risk and stupid risk, and the whole art is taking the kind that pays you over time while avoiding the kind that can wipe you out.

## The risk that pays: patient market risk

Broad markets go up and down in the short term — sometimes sharply and frighteningly. But historically, diversified markets have risen over long periods, rewarding people who stayed invested through the drops. This is the risk worth taking: short-term ups and downs in exchange for long-term growth. The volatility is the price of the return, and if you have years to wait, you can afford to pay it.

## The risk that ruins: concentration

Putting a large share of your money into one thing — one company, one coin, one hot tip — is the risk that can genuinely wipe you out. If that single thing fails, so do you, and individual things fail all the time for reasons no one saw coming. This is the risk that turns 'investing' into gambling, and it's exactly what excited beginners rush toward because it offers the fantasy of getting rich fast.

## Diversification: don't put it all in one basket

The defence is simple and ancient: spread your money across many investments so no single failure can sink you. When you own a slice of hundreds of companies, one going bankrupt is a scratch, not a catastrophe. Diversification doesn't remove risk — it removes the specific, avoidable, ruinous kind, while keeping the patient market risk that actually pays. It's the closest thing to a free lunch in investing, and the next lesson shows how one boring product delivers it automatically.

## The rule

Never bet more than you can afford to lose on any single thing, and for the money that matters, don't bet on single things at all. The goal isn't to hit a jackpot — it's to capture the market's long, boring, reliable rise without ever being one bad event away from disaster.`,
          activity: {
            title: "Check your own concentration",
            prompt:
              "Look honestly at any investing, crypto, or speculative bets you already have. Is a dangerous share of your money riding on one company, one coin, or one idea? Write down your rough concentration — is any single thing a large slice of your total? If so, note it as a risk to reduce. If you haven't started investing, write your rule now: no single bet large enough to ruin me.",
          },
        },
        {
          title: "Index funds and the boring path that works",
          type: "TEXT",
          points: 15,
          body: `Everything so far points to one boring, powerful tool that most beginners eventually arrive at: the low-cost, broad index fund. It's not exciting, nobody gets rich overnight with it, and it quietly outperforms most of the clever alternatives over time. This lesson explains why.

## What an index fund is

Instead of trying to pick winning companies, an index fund simply buys a tiny slice of a huge basket — say, hundreds or thousands of companies at once, weighted to mirror a whole market. When you buy one, you instantly own a diversified spread, exactly the 'don't put it all in one basket' protection from the last lesson, in a single purchase. You're not betting on any one company; you're betting that the broad economy, over decades, keeps growing — a far safer bet.

## Why boring beats clever

Most professional fund managers who try to beat the market fail to do so over the long run, especially after their fees. Fees matter enormously: a fund charging high fees skims a slice of your returns every year, and over decades that compounds into a large amount of your money going to someone else. Low-cost index funds charge very little, so you keep almost all of the market's return. Cheaper and more diversified, they quietly beat most expensive, clever alternatives — not by being smarter, but by not losing to fees and not betting wrong.

## The unglamorous strategy that wins

The approach that works for almost everyone: invest a fixed amount into a broad, low-cost index fund automatically and regularly, and leave it alone for years. Automatic and regular means you buy through the ups and downs without trying to time anything — which almost nobody does successfully. Leaving it alone lets compounding do its work. That's it. It's boring, it's proven, and it beats the exciting strategies that fill your feed.

## A necessary caution

This is education, not personalised advice. Specific products, tax rules, and options differ by country and situation, and it's worth learning the specifics for where you live — and, for large sums, getting qualified, fee-only advice. But the principle travels everywhere: broad, low-cost, automatic, patient.`,
          activity: {
            title: "Research your local version of boring",
            prompt:
              "Look up how broad, low-cost index investing works where you live: what accounts or platforms are available, any tax-advantaged options, and what 'low-cost' looks like locally. Write down one specific, legitimate way you could invest regularly into a diversified low-cost fund. Note one thing you still need to understand before starting — and where you'd learn it. You're building the plan, not being told what to buy.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on the growth principles before the final module ties money back to the life you actually want. If the boring path feels too simple to be right — that reaction is exactly what this quiz is testing.`,
          quiz: {
            title: "Growing money",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "Why is leaving all your long-term money in cash quietly risky?",
                explanation:
                  "Inflation erodes purchasing power over time, so cash buys less each year even though the number doesn't drop. For money you won't touch for many years, that's a near-guaranteed slow loss — which is the whole reason investing exists.",
                options: [
                  {
                    text: "Inflation erodes its purchasing power every year, a slow guaranteed loss",
                    correct: true,
                  },
                  { text: "Banks are likely to collapse", correct: false },
                  { text: "Cash earns nothing so it's the same as investing", correct: false },
                  { text: "It isn't risky — cash is always the safest choice", correct: false },
                ],
              },
              {
                prompt: "Why does starting to invest early matter so much?",
                explanation:
                  "Compounding accelerates over time — returns earn returns — so the length of time invested often matters more than the amount. You can't buy back lost years later, no matter how much you eventually earn.",
                options: [
                  {
                    text: "Compounding accelerates over time, so years invested matter more than the amount",
                    correct: true,
                  },
                  { text: "Investments are cheaper when you're young", correct: false },
                  { text: "Early investments are guaranteed to profit", correct: false },
                  { text: "It doesn't — only the amount matters", correct: false },
                ],
              },
              {
                prompt: "Which kind of risk can genuinely wipe you out?",
                explanation:
                  "Concentration — putting a large share into one company, coin, or tip. If that single thing fails, so do you. Diversification removes this ruinous, avoidable risk while keeping the patient market risk that actually pays.",
                options: [
                  { text: "Concentration — a large share riding on one single thing", correct: true },
                  { text: "Owning a broad, diversified spread of investments", correct: false },
                  { text: "Short-term ups and downs in a diversified market", correct: false },
                  { text: "Investing regularly over many years", correct: false },
                ],
              },
              {
                prompt: "Why do low-cost index funds tend to beat clever, expensive alternatives?",
                explanation:
                  "Most managers fail to beat the market long-term, especially after fees. Index funds are broadly diversified and charge very little, so you keep almost all of the market's return instead of losing a compounding slice to fees.",
                options: [
                  {
                    text: "They're broadly diversified and charge low fees, so you keep almost all the return",
                    correct: true,
                  },
                  { text: "They use secret algorithms to pick winners", correct: false },
                  { text: "They're guaranteed by governments", correct: false },
                  { text: "They avoid all risk entirely", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },

    // =====================================================================
    {
      title: "The life plan — money in service of a life",
      description:
        "The point was never the money. This module ties every number back to a life worth living, and ends with your own one-page plan.",
      lessons: [
        {
          title: "Defining enough",
          type: "TEXT",
          points: 10,
          body: `Everything so far has been about growing the gap and making money work. This final module asks the question all of it was secretly for: enough for what? Because money with no defined purpose has a way of becoming its own purpose, and that's a trap dressed as success.

## The treadmill of more

Without a definition of enough, more money just raises your expectations to match, and you end up running faster to stay in the same emotional place — earning more, spending more, wanting more, never arriving. People who never define enough often reach numbers their younger selves would have called rich, and still feel the same low anxiety, because the target moved every time they approached it. More is not a destination. It's a direction with no end.

## Enough is a number and a life, defined on purpose

Enough isn't a failure of ambition — it's the opposite. It's the confidence to say: this is the life I'm building toward, here's roughly what it costs, and past that, extra money buys me freedom and generosity rather than a bigger number I chase forever. Defining enough turns money from an endless scoreboard into a tool with a job. It's what lets you eventually stop optimising and start living.

## Why this belongs at the end

You had to learn the machinery first — see, budget, escape debt, earn, grow — because 'enough' means nothing without the ability to reach it. But the machinery was always in service of a life, not the other way around. A person who masters money and never asks what it's for has won a game that doesn't make them happier. The last few lessons make sure you don't do that: they point every number you've learned to control back at a life you actually want.`,
          activity: {
            title: "Describe your 'enough'",
            prompt:
              "Write a short description of what 'enough' looks like for you — not a fantasy of unlimited wealth, but the real life you're building toward: how you'd spend your days, what security you'd have, what you could stop worrying about. Then note roughly what kind of money that life needs. This is the target every other number in this course was quietly serving.",
          },
        },
        {
          title: "Goals with dates and numbers",
          type: "TEXT",
          points: 10,
          body: `A dream is "I want to own a home" or "I want to travel". A goal is "I want a deposit of this amount, by this date". The difference isn't pedantry — it's the difference between a wish that stays a wish and a target your money can actually be aimed at.

## Why vague goals never get funded

Your budget can't save toward "someday" because it doesn't know how much or how fast. A vague goal competes badly against concrete spending happening right now, and loses every time. When you attach a number and a date, something changes: you can divide the amount by the months and get a monthly figure — and now the goal is just another job for your money, one your zero-based budget can actually assign to. A dated, numbered goal is a fundable goal.

## Working backwards from the date

Take the target amount, subtract what you already have, divide by the number of months until the date. That's your required monthly saving. If it's achievable, you have a plan. If it's not, you've learned something useful before wasting years: either the date moves, the target shrinks, or you need more income (and you now have a whole module on that). Either way, you're dealing in reality instead of hope.

## A few goals, ranked, not many

Don't set fifteen goals — you'll fund none of them. Pick the two or three that matter most, rank them, and fund them in order, with the emergency fund always first. Focus works the same way here as it did with debt: concentrated effort finishes things, while spreading yourself thin leaves everything perpetually half-done. Money aimed at a few dated targets arrives; money spread across many vague hopes evaporates.`,
          activity: {
            title: "Turn one dream into a funded goal",
            prompt:
              "Take your most important money goal and make it concrete: the exact amount, the date you want it by, and what you already have toward it. Then do the arithmetic — subtract, divide by the months — to get the monthly saving required. Write it down. Is it achievable at your current gap? If not, note whether the date, the target, or your income needs to move.",
          },
        },
        {
          title: "Protecting what you build",
          type: "TEXT",
          points: 10,
          body: `You can do everything right — save, invest, grow — and lose it all to a single event you never prepared for. The final piece of a real money plan isn't about growth; it's about protection. It's unglamorous, easy to postpone, and the reason some careful people still end up in ruin.

## Insurance: transferring the risks you can't absorb

An emergency fund handles the surprises you can absorb. But some events are too big for any fund — a serious illness that stops you working, a fire, an accident that leaves others depending on you. Insurance exists to transfer exactly these — the rare, catastrophic risks you couldn't recover from — to someone who can. You pay a small, known cost to remove a small chance of total disaster. That's not waste; it's the correct use of insurance: not for the small stuff you can cover yourself, but for the things that would genuinely ruin you.

## The kinds worth understanding

The specifics vary by country, but the categories are universal: cover for your health and ability to earn, cover for anyone who depends on your income if you're gone, and cover for irreplaceable major assets. Skip insurance on things you could just replace yourself — that's usually poor value — and make sure you're covered for the handful of events that would be truly catastrophic. Insure the disasters, self-insure the annoyances.

## Inheritance: what happens to it all without you

The hardest one to face: if you died, would the money you built reach the people you'd want it to, and would they even know it exists? Without basic arrangements — a will, records someone can find, named beneficiaries — money can be lost, frozen, or fought over at the worst possible time. This isn't morbid; it's a final act of care. An afternoon spent making sure your money would land where you intend is one of the most loving financial things you can do, and almost everyone avoids it until it's too late.`,
          activity: {
            title: "Find your biggest unprotected risk",
            prompt:
              "Ask two honest questions. First: what single event would financially ruin you or the people who depend on you — and are you covered for it? Second: if you died tomorrow, would your money reach the right people, and would they even know it exists? Write down the biggest gap you find in either, and one concrete step to close it. This is the protection most people postpone forever.",
          },
        },
        {
          title: "Giving, generosity, and stewardship",
          type: "TEXT",
          points: 10,
          body: `A course on personal finance could end at "grow your money and protect it". But that would miss something the most content people with money almost all understand: money held only for yourself has a surprisingly low ceiling on the happiness it buys, and generosity is not the opposite of building wealth — it's part of what wealth is for.

## The paradox of holding tightly

Research and old wisdom agree on something uncomfortable for the anxious saver: past meeting your real needs, spending on yourself delivers less and less happiness, while giving to others delivers a surprising amount. Money used generously — for people you love, for causes you believe in, for someone who's stuck — tends to bring more lasting satisfaction than the same money spent on upgrading your own life again. Holding money in a tight fist, beyond what security requires, is often a way to be wealthy and joyless at once.

## Stewardship: you're managing, not just owning

There's a shift in how you hold money that changes everything: from owner to steward. An owner asks "how much can I keep?" A steward asks "what is this for, and am I managing it well?" Stewardship includes providing for yourself and your family, and it includes using some of your surplus for good beyond your own walls. It's a posture that holds money firmly enough to be responsible and loosely enough to be free — and people who hold it that way tend to be both more secure and more at peace than those gripping it in fear.

## Generosity on purpose, like everything else

Just as saving works best when it's automatic and planned rather than left to whatever's spare, so does giving. Decide in advance what share of your money goes to others, build it into your plan like any other job for your money, and it happens reliably instead of never. You don't have to be rich to be generous — generosity is a habit and a proportion, not an amount. Building it in now, at whatever level you can, shapes the kind of person the money is making you into. That, in the end, matters more than the balance.`,
          activity: {
            title: "Decide your generosity, on purpose",
            prompt:
              "Decide what generosity looks like in your plan — a share of your income, a specific cause or person, or a way of giving that isn't only money. Make it a deliberate, built-in job for your money, however small, rather than whatever happens to be left. Write down what you'll give, to whom or what, and how you'll make it automatic or regular so it actually happens.",
          },
        },
        {
          title: "Your one-page money plan",
          type: "ASSIGNMENT",
          points: 30,
          body: `The capstone. Everything in this course exists to make this one document possible: a single page that runs your money on purpose, tied to a life you actually want.

Your instructor reads this final assignment. It should read like a plan a calm, honest version of you wrote for the year ahead — realistic, specific, and yours.`,
          assignment: {
            title: "Your one-page money plan",
            instructions: `Write your complete one-page money plan. Pull together everything from the course into a single document you could actually run your year by. Aim for clarity over length — one honest page beats ten vague ones.

Cover all seven, briefly:

**1. Your 'enough'.** The life you're building toward, in a sentence or two, and roughly what it costs.

**2. Your real gap.** Your income, your controlled outflow, and the gap between them — with the one lever you're pulling to widen it.

**3. Your budget system.** How you run money month to month (e.g. the three accounts, pay-yourself-first amount, zero-based plan).

**4. Your safety.** Your emergency fund target and where it lives, plus the biggest protection gap (insurance/inheritance) you're closing.

**5. Your debt plan.** What you owe, your method (snowball/avalanche), and your first target — or a sentence that you're debt-free and how you'll stay that way.

**6. Your growth.** How your long-term money grows (the boring, diversified, automatic path) and roughly how much goes in.

**7. Your goals and giving.** Your two or three dated, numbered goals, and your deliberate generosity.

Finally, look back at the sentence you wrote in lesson one — the money situation that would take a weight off your chest. Write one line on how this plan addresses it.

Keep it about your plan and patterns — no account numbers, credentials, or private third-party details.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Completeness and coherence",
                weight: 30,
                descriptor:
                  "All seven areas are present and they fit together — the budget funds the goals, the gap enables the saving, the pieces reference each other rather than sitting as disconnected facts.",
              },
              {
                criterion: "Realism and specificity",
                weight: 40,
                descriptor:
                  "The numbers and steps are concrete and achievable for this person's actual situation. It reads like a plan they'll follow, not an idealised fantasy, and hard truths (a negative gap, a big debt) are faced honestly.",
              },
              {
                criterion: "Tied to a life, not just numbers",
                weight: 30,
                descriptor:
                  "The plan is visibly in service of a defined 'enough' and dated goals, closes the loop with the lesson-one sentence, and includes deliberate protection and generosity — money as a tool for a life, not a scoreboard.",
              },
            ],
          },
        },
      ],
    },
  ],
};
