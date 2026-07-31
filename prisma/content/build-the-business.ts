import type { ContentCourse } from "./types";

/**
 * Build the Business — the step after From Skill to Income.
 *
 * That course gets someone their first paying clients. This one is about what
 * breaks next: pricing that traps you at your starting rate, delivery that
 * only works when you are personally present, books you cannot read, and a
 * business that stops the week you are ill.
 *
 * The editorial spine is a single distinction repeated throughout — the
 * difference between a job you gave yourself and a business. Most people
 * building "a business" are building the first thing and do not find out for
 * three years.
 */
export const buildTheBusiness: ContentCourse = {
  slug: "build-the-business",
  title: "Build the Business: Pricing, Systems and Books That Survive You",
  subtitle:
    "The step after your first clients. How to price without trapping yourself, deliver without being the bottleneck, and keep books you can actually read.",
  description: `Getting paid is the first problem. Staying paid, at a rate that rises, without working every hour, is a completely different one — and it is where most people who succeed at the first problem quietly stall.

This course is about that second stage. Why pricing by the hour caps you at the number of hours you have, and what to charge instead. How to write a scope that stops a project growing by 40% for free. Why your best client is usually your most dangerous one. How to build delivery that does not require you personally, so that being ill is an inconvenience rather than a month with no income.

Then the unglamorous half that decides whether any of it lasts: books you can read at a glance, the difference between revenue and money you can actually spend, paying yourself properly, and knowing your real numbers well enough to make decisions with them rather than with a feeling.

The distinction running through every module is between a job you gave yourself and a business. A job you gave yourself pays only when you work, has one customer who could end it, and cannot be sold, paused or handed over. Most people building "a business" are building the first thing, and find out three years in.

Take From Skill to Income first if you have not yet been paid by anyone. This course assumes you have clients and the problem has changed.`,
  categorySlug: "money-and-business",
  level: "INTERMEDIATE",
  priceMinor: 0,
  estimatedHours: 17,
  passThreshold: 80,
  instructorEmail: "mabi@mabyacademy.com",
  outcomes: [
    "Tell the difference between a job you gave yourself and a business you own",
    "Price on value and outcome rather than on the hours you happen to have",
    "Write a scope that makes extra work a conversation instead of a gift",
    "Spot client concentration before it becomes the thing that ends you",
    "Build delivery that works when you are ill, travelling or simply busy",
    "Keep books simple enough that you actually read them",
    "Separate revenue from money you can spend, and pay yourself deliberately",
    "Make decisions from your own numbers rather than from a feeling",
  ],
  modules: [
    // =====================================================================
    {
      title: "A job you gave yourself",
      description:
        "The distinction that decides everything after it. Most people find out three years in that they built the wrong thing.",
      lessons: [
        {
          title: "The test that tells you which one you built",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `There is a difference between a business and a job you gave yourself, and almost nobody makes it deliberately. They just work, and one day notice which one they have.

## The four questions

Does it earn when you do not work? Not passively and forever — but does a week off produce income, or zero?

Could you hand a piece of it to somebody else? Is any part of what you do written down well enough that another competent person could run it?

Would it survive losing your largest client? If one relationship ending would end you, you do not have a business with a concentration problem. You have a job with a single employer who does not owe you notice.

Could you sell it? Not because you want to — because the question exposes what you actually own. If the answer is "nobody would buy it, it is just me", then the asset is you, and you cannot be sold, rested or inherited.

## Why this matters more than growth

A job you gave yourself can pay very well and still be fragile in a specific way: it ends the moment you stop. Illness, a family emergency, burnout, or simply getting older all take it away, and there is nothing left behind.

That is not an argument against freelancing. Freelancing is a perfectly good way to earn, and many people should stay there deliberately. The failure is doing it accidentally while believing you are building something.

## The middle position

Most people reading this are somewhere between. Some repeatable delivery, one client who is too large, some documentation, no ability to step away.

That is normal and it is not a problem, provided you know which parts are which. The plan then becomes concrete: which of the four questions do I want to change, and what would that take?

## What this course does

Works through each of the four in order. Pricing and scope, because they decide whether you have margin to build anything. Client mix, because concentration is what kills. Delivery systems, because that is what removes you from the middle. Books, because you cannot manage what you cannot see.

## The honest note

You do not have to build a business. A well-paid freelancer with three good clients, a modest set of systems and clean books is in a genuinely strong position and should not be made to feel it is a lesser outcome.

What you should not do is work for a decade under the impression you are building an asset, and discover at the end that you were renting yourself out the whole time.`,
          activity: {
            title: "Score yourself on the four questions",
            prompt:
              "Answer the four questions about what you have right now, honestly and in writing: does it earn when you do not work, could you hand a piece of it over, would it survive losing your largest client, could anyone buy it. Give each a yes, no, or partly, with one sentence of evidence. Then write which single one you most want to change in the next year, and why that one rather than the others.",
          },
        },
        {
          title: "Why your income stopped growing",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `Almost everyone who sells their time hits the same ceiling, in the same way, and misdiagnoses it the same way.

## The arithmetic of the ceiling

Your income is your rate times your billable hours. Hours have a hard limit — perhaps 25 to 30 genuinely billable in a week once you account for finding work, admin and the parts of the job nobody pays for.

So growth has to come from rate. And rate, for most people, moves slowly and by small increments, because each rise has to be negotiated with someone who was happy with the old one.

## The misdiagnosis

People conclude they need more clients, and take on more work at the same rate. This does not raise income much and does raise the amount of coordination, which reduces the hours available for the work itself.

The result is a busier person earning roughly the same, concluding they need to work harder.

## Where the ceiling actually breaks

Three ways, and only three.

Charge more for the same work. Requires positioning, evidence and the willingness to lose price-sensitive clients. Available immediately, and usually the fastest.

Charge for something other than time. Fixed price for an outcome, a retainer for availability, a productised service with a defined shape. Breaks the link between hours and income.

Get leverage. Other people, or software, doing part of the delivery. Real leverage, not just subcontracting your margin away.

## Which to do first

Almost always the first. It requires no new hires, no new systems and no new product, and it works on the clients you already have.

Most people skip it because raising a price is uncomfortable in a way that working more hours is not, and then spend two years pursuing the harder options.

## The uncomfortable observation

If none of your clients has ever pushed back on your price, your price is too low. A rate nobody questions is a rate that was obviously acceptable, and obviously acceptable means you left money there.

You should be losing some proportion of prospects on price. If you lose none, you are the cheap option, and being the cheap option in a service business is a position with no floor — there is always someone newer and hungrier.

## What comes next

The rest of this module is about knowing your real numbers, because you cannot raise a price sensibly without knowing what you actually earn per hour today, including all the hours nobody pays for.`,
          activity: {
            title: "Find your real hourly rate",
            prompt:
              "Take your last complete month. Write down: total money received, then total hours worked including everything unpaid — finding clients, quoting, admin, revisions, chasing invoices. Divide. That is your real hourly rate, and it is usually 40 to 60% of your headline rate. Write both numbers side by side. Then write down how many prospects said no to your price last month; if the answer is zero, write that down too.",
          },
        },
        {
          title: "The numbers you have to know",
          type: "TEXT",
          points: 10,
          body: `Five numbers. Not a dashboard, not accounting software — five figures you should be able to state from memory. Almost nobody can.

## One: your real hourly rate

Money received divided by all hours worked, including unpaid ones. Calculated in the last lesson.

This is the only honest measure of what your time earns, and it is usually a shock the first time.

## Two: your monthly floor

The minimum you must earn to cover business costs and your own living costs. Not what you would like — what you must.

Knowing it changes negotiation completely. Someone who knows their floor can refuse work calmly. Someone who does not is guessing every time, and guessing under pressure means accepting.

## Three: your runway

How many months you could survive with no new income, using money that actually exists. Not projected income, not invoices sent — money in an account.

Under one month, every decision is made from fear, and fear is expensive. Three months changes what you can refuse. Six changes what you can build.

## Four: your client concentration

What percentage of income comes from your largest client. Anything above 50% is a job with one employer, whatever the contract says.

Most people know this figure roughly and avoid computing it precisely, because the precise version is uncomfortable.

## Five: your conversion rate

Of the people who ask about your work, what fraction becomes a paying client. Without it, you cannot tell whether a slow month was a demand problem or a sales problem, and those have opposite fixes.

## Why memory rather than a spreadsheet

Because decisions happen in conversations. A client asks for a discount, a prospect appears, an opportunity has a deadline — and you answer with what is in your head, not what is in a file you will open later.

Five numbers is small enough to hold. That is the whole point of choosing five.

## The refresh

Once a month, twenty minutes, recompute all five. Attach it to something that already happens — the day you invoice is ideal, since you are already looking at money.

The value is not the precision. It is that you notice the direction before it becomes a crisis.`,
          activity: {
            title: "Compute all five, from real records",
            prompt:
              "Work out all five numbers from your actual records rather than from memory: real hourly rate, monthly floor, runway in months, largest client as a percentage of income, and conversion rate. Write them on one page. Then look at them together and write one sentence about what they say that you did not already know. Finally, pick the day of the month you will recompute them and attach it to something you already do.",
          },
        },
        {
          title: "Deciding what you are actually building",
          type: "TEXT",
          points: 10,
          body: `Before pricing or systems, a decision that determines which advice applies to you. Skipping it means following advice written for someone building something else.

## The three shapes

The practice. You, doing skilled work, for a small number of clients, at a high rate. Income is capped by your hours and can be very good. Nothing is being built that outlives you, and that is a legitimate choice.

The agency. You plus other people delivering work. Income can exceed your hours. It requires managing people, which is a different job from the one you are good at, and margins are thinner than they look.

The product. Something that is sold repeatedly without proportional effort — software, a course, a template, a tool. High leverage, long unpaid build, high failure rate, and it usually needs an audience you do not yet have.

## Choosing honestly

Most people say "product" because it sounds best, then continue running a practice while feeling behind.

The honest question is not which is best. It is which one matches what you will actually do for the next two years — including the parts you dislike.

If you hate managing people, an agency will fail regardless of the numbers. If you cannot tolerate months without income, a product is not available to you yet. Those constraints are real and are not character flaws.

## The sequence that works

Practice first, deliberately. Raise the rate. Build the surplus and the runway.

Then use that surplus to fund the next shape, if you want one. A product built while a practice pays the bills has a survivable failure. A product built with no income has one attempt.

## The trap of building both badly

Splitting attention between a practice and a product usually produces a stalled practice and an unfinished product. The practice suffers because you are distracted; the product suffers because it gets the leftover hours.

If you do both, be explicit about the split — a fixed number of hours, protected, on the same days each week — rather than working on the product whenever client work is quiet, which means whenever you can least afford it.

## Writing it down

One sentence: I am building a ___, and in two years it looks like ___. Dated, and revisited annually.

Its value is that it tells you what to say no to, which is most of what strategy is.`,
          activity: {
            title: "Write the sentence and its consequences",
            prompt:
              "Write your one sentence: I am building a practice, an agency or a product, and in two years it looks like this. Then write three specific things this decision means you will say no to, and one thing you have been doing that does not fit and will stop. If you choose to build two shapes at once, write the exact hours per week protected for the second, and which day they sit on.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on the foundations. These decide which of the later modules apply to you, so it is worth being clear rather than roughly right.`,
          quiz: {
            title: "What you are building",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "What is the fastest way to break an income ceiling for most people?",
                explanation:
                  "Charging more for the same work. It needs no new hires, systems or products, and it applies to clients you already have. People skip it because raising a price is uncomfortable in a way that working more hours is not.",
                options: [
                  { text: "Charge more for the same work", correct: true },
                  { text: "Take on more clients at the current rate", correct: false },
                  { text: "Hire someone to increase capacity", correct: false },
                  { text: "Build a product", correct: false },
                ],
              },
              {
                prompt: "Nobody has ever pushed back on your price. What does that indicate?",
                explanation:
                  "The price is too low. A rate nobody questions was obviously acceptable, which means money was left there. You should lose some proportion of prospects on price — losing none makes you the cheap option, a position with no floor.",
                options: [
                  { text: "Your price is too low — you should be losing some prospects on it", correct: true },
                  { text: "Your positioning is working well", correct: false },
                  { text: "Your clients value the relationship over cost", correct: false },
                  { text: "It means nothing either way", correct: false },
                ],
              },
              {
                prompt: "Why does runway have to be money that exists rather than invoices sent?",
                explanation:
                  "Because decisions made from fear are expensive, and only money you actually hold removes the fear. An invoice can be paid late, disputed or never — counting it as runway means discovering you had none at the moment it mattered.",
                options: [
                  {
                    text: "Only money you hold removes the fear that makes decisions expensive",
                    correct: true,
                  },
                  { text: "Invoices are usually fraudulent", correct: false },
                  { text: "Because tax is owed on invoices immediately", correct: false },
                  { text: "It does not matter which you count", correct: false },
                ],
              },
              {
                prompt: "What does the 'could you sell it' question actually expose?",
                explanation:
                  "What you own that is separate from yourself. If the honest answer is that nobody would buy it because it is just you, then the asset is you — and you cannot be sold, rested, or inherited. That is a job you gave yourself.",
                options: [
                  {
                    text: "Whether you own anything separable from yourself",
                    correct: true,
                  },
                  { text: "How profitable the business currently is", correct: false },
                  { text: "Whether your clients are satisfied", correct: false },
                  { text: "How much tax you would owe on a sale", correct: false },
                ],
              },
              {
                prompt: "Why does building a practice before a product usually work better?",
                explanation:
                  "Because a product built while a practice pays the bills has a survivable failure, while one built with no income gets a single attempt. The surplus funds the next shape rather than the next shape needing to succeed immediately.",
                options: [
                  {
                    text: "The practice funds the attempt, so failing is survivable rather than final",
                    correct: true,
                  },
                  { text: "Products are always worse businesses", correct: false },
                  { text: "Clients will not buy from someone with a product", correct: false },
                  { text: "It is easier to price a practice", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Pricing",
      description:
        "The highest-leverage thing you can change, and the one people avoid longest. Value, packaging, and the conversation itself.",
      lessons: [
        {
          title: "Why hourly billing works against you",
          type: "TEXT",
          points: 10,
          body: `Hourly pricing feels fair to everyone and is structurally against your interests in a way that is worth spelling out.

## The incentive is backwards

Getting faster reduces your income. Every efficiency you gain, every skill that lets you do in two hours what took six, costs you money.

So you are paid to be slow, and your improvement is a financial penalty. No sensible arrangement does this.

## It prices your input, not their outcome

The client does not want hours. They want a result. Selling hours makes the conversation about how long something takes, which is the least relevant fact about it.

Worse, it makes your expertise invisible. Twenty years of experience compressing a job into three hours looks like a small invoice.

## It caps you visibly

An hourly rate is easy to compare and easy to anchor on. Once a client knows your hourly figure, every future conversation starts there, and raising it means arguing about a number they have already accepted.

## It invites surveillance

Hourly work attracts questions about how the hours were spent, timesheets, and clients who feel entitled to manage your process because they are buying your time rather than your output.

## Where hourly is genuinely right

Ongoing, unpredictable work with no definable outcome — support, maintenance, "be available for whatever comes up".

Early on, when you genuinely cannot estimate. Charging hourly while you learn how long things take is honest, and you should be moving off it as soon as you can estimate.

## The alternatives, briefly

Fixed price for a defined outcome. You keep the gains from being efficient, the client knows the cost in advance, and the conversation is about the result.

Retainer for ongoing access or a defined monthly scope. Predictable for both sides.

Productised service — a fixed shape, fixed price, fixed timeline, sold repeatedly. The most leverage available without hiring anyone.

## The transition

You do not have to convert everyone at once. Price the next new client on a fixed basis, learn what breaks, adjust. Existing clients can move at renewal.

The first fixed-price quote is uncomfortable because you carry the risk of underestimating. That risk is exactly what you are being paid for, and it is why the ceiling lifts.`,
          activity: {
            title: "Reprice one real job",
            prompt:
              "Take a job you have done recently and priced hourly. Write down what you charged and how long it took. Now reprice it as a fixed price for the outcome: what was the result worth to the client, and what would you charge for that result regardless of hours? Write the two numbers. Then write what you would have earned per hour at the fixed price, and what specific risk you would have been taking on.",
          },
        },
        {
          title: "Pricing on what it is worth to them",
          type: "TEXT",
          points: 10,
          body: `The alternative to pricing your effort is pricing their outcome. It is harder, it requires questions most people do not ask, and it is where the large increases live.

## The principle

A client buys a change in their situation. The price they will accept relates to the size of that change, not to how difficult it was for you.

Something that saves a business fifty thousand a year is worth more than something that took you longer and saves nothing. Effort and value are unrelated quantities, and pricing on effort means charging randomly.

## The questions that reveal value

What happens if this does not get done? Often the most useful question in the entire sale. The answer is the cost of inaction, and your price sits below it.

What is this worth if it works? Revenue gained, cost saved, time released, risk removed.

How long has this been a problem? A problem tolerated for two years is expensive and known to be expensive.

What have you already tried? Failed attempts are sunk cost and are also evidence of how much the problem matters.

Who else is affected? A problem costing one person an afternoon is small; the same problem across a team is not.

## Asking without sounding like a haggler

Frame it as scoping, because it is. You genuinely cannot price sensibly without knowing what the outcome is worth, and clients understand that framing.

"Before I quote, help me understand what this is costing you at the moment" is a normal professional question. It is also the question that most changes the number.

## When value pricing does not apply

Commodity work where the outcome is identical whoever does it, and the buyer knows it. You can be efficient there, and you cannot charge a premium.

Very small jobs where the discovery costs more than the difference.

Clients who genuinely have no money. Value exists and they cannot access it, and no framing changes that.

## The evidence problem

Value pricing requires the client to believe you can deliver the outcome. Without evidence, a high price reads as arrogance.

So the sequence is: gather evidence at ordinary prices, then use it to price on value. Case studies with numbers, not testimonials with adjectives.

## The number itself

A useful rule: your price should be a fraction of the value created — a tenth is defensible in many contexts — and comfortably above your own floor.

If a tenth of the value is below your floor, the job is not worth doing at any price, which is itself a finding.`,
          activity: {
            title: "Run the value questions on a real prospect",
            prompt:
              "Take a real prospect or a recent client. Answer the five value questions as best you can from what you know: cost of inaction, value if it works, how long it has been a problem, what they have tried, who else is affected. Then estimate the annual value of the outcome, and write what a tenth of it would be. Compare that to what you charged or planned to charge. Write down the gap.",
          },
        },
        {
          title: "Scope, and the work that arrives for free",
          type: "TEXT",
          points: 10,
          body: `Fixed pricing only works if the thing being priced is fixed. The most common way a good price becomes a bad job is that the work quietly grows.

## How it happens

Not through bad faith. Through a series of small, reasonable requests, each individually trivial, each hard to refuse without seeming difficult.

"While you are in there, could you also…" is how a well-priced project becomes a poorly-paid one, one sentence at a time.

## What a scope must contain

What is included, specifically enough to be checked.

What is explicitly not included. This section does more work than the first — it is where the arguments live, and naming the obvious exclusions costs nothing at the time and saves the relationship later.

How many rounds of revision. Unlimited revisions is a promise nobody should make.

What you need from them, by when. Most delays are on the client side, and a scope that does not name their obligations makes their delay your problem.

What happens when something is added. Not a threat — a process. "Additional work is quoted separately before it starts" is a normal sentence.

## The magic phrase

"That is outside what we agreed, and I am happy to do it — let me send you a price."

It is not a refusal. It does not damage the relationship. It converts an assumption into a decision, and most clients accept it without friction because they never intended to get something free; they simply did not think about it.

The people who react badly to that sentence were relying on you not saying it.

## Change orders as routine

Make additions a normal event rather than a confrontation. A short note: here is the change, here is the price, here is the effect on the timeline, confirm and I will proceed.

Doing this for the first small addition sets the pattern for the whole project. Letting the first one through sets a different pattern.

## The scope you cannot write

If you cannot describe what "done" means, you cannot price it fixed. Either do discovery as a separate paid piece of work, or price it hourly and say why.

Paid discovery is underused. A short, paid engagement that produces a specification is valuable to the client on its own, and it means the main quote is based on knowledge rather than optimism.

## The honest reason people avoid this

Scoping conversations feel like distrust, early in a relationship you want to go well. But an unscoped project ends in a much worse conversation, at a much worse moment, with money already spent.

Clear scope is a kindness to both parties. Vague scope is a bill someone will pay later, and it is usually you.`,
          activity: {
            title: "Write the exclusions list",
            prompt:
              "Take the kind of work you do most often. Write the 'not included' section for it — at least eight specific exclusions, drawn from things that have actually crept in before. Then write your change-order note as a reusable template: the change, the price, the timeline effect, and the confirmation request. Keep both. The exclusions list is the one that will save you money.",
          },
        },
        {
          title: "The price conversation",
          type: "TEXT",
          points: 10,
          body: `Knowing the right price is half of it. Saying it without flinching is the other half, and it is learnable.

## Say the number and stop

The most common error is explaining. "It is eight hundred, because it takes a while, and there is the research, and…" Every word after the number weakens it, and the client hears anxiety.

State the price. Then be quiet. The silence is uncomfortable and it is not your job to fill it.

## Give the price with the outcome, not the effort

"Eight hundred to have the whole thing running by the fifteenth" is a different sentence from "eight hundred because it will take me about ten hours". Same number, different purchase.

## Never discount without changing scope

If you reduce the price and deliver the same thing, you have told the client the first number was invented. Every future price is now negotiable.

If they need a lower number, reduce what is included. "I can do it for six hundred if we drop the second phase" is a real answer. It keeps the price honest and gives them a genuine choice.

## The pushback that is not a rejection

"That is more than I expected" is information, not a no. The right response is a question — what were you expecting, and what did you have in mind for the budget — rather than an immediate concession.

Very often the gap is about what they thought they were buying, and the conversation resolves without a discount at all.

## When to walk away

When the price is below your floor. When they want the value price on an effort budget and will not move. When the discovery conversation shows they will be difficult in ways the money does not cover.

Being willing to lose the work is what makes the price real. A price you will always concede on is not a price; it is an opening bid.

## Raising prices for existing clients

Give notice, in writing, well ahead — a month or more. State the new rate plainly, without apology or extensive justification, and give a date it starts.

Expect to lose some. Losing your lowest-paying, highest-friction clients when you raise prices is the mechanism working, not the mechanism failing.

## The uncomfortable part

You will price something too high and lose it, and price something too low and resent it. Both happen and both are information.

The people who get good at this are the ones who kept a record of what they quoted and what happened, and looked at it. Which is the next lesson.`,
          activity: {
            title: "Rehearse it out loud",
            prompt:
              "Write your price sentence for your most common piece of work: the number, framed as an outcome with a date, ending cleanly. Then say it out loud five times and notice where you want to add words. Write down the words you wanted to add — those are the ones that weaken it. Then write your two responses: to 'that is more than I expected', and to a request for a discount with no scope change.",
          },
        },
        {
          title: "Assignment: reprice your offer",
          type: "ASSIGNMENT",
          points: 25,
          body: `The first graded piece. It asks you to rebuild your pricing on real numbers and produce something you could send to a client this week.`,
          assignment: {
            title: "Repriced offer with scope",
            instructions: `Rebuild the pricing for your main offer. 600 to 900 words, using your own real figures.

**1. Where you are now.** Your real hourly rate including unpaid hours, your monthly floor, and what you currently charge for this work. State how you arrived at the current price — most people find the honest answer is that they guessed once.

**2. The value case.** For a typical client: cost of inaction, value if it works, how long they have had the problem, who else is affected. Give an annual value figure and say how confident you are in it.

**3. The new price.** What you will charge, on what basis — fixed, retainer or productised — and why that basis. Show it against both a fraction of the value and your own floor.

**4. What is included.** Specific enough that a client could check it.

**5. What is not included.** At least eight exclusions drawn from things that have actually crept into your work before. This section is graded hardest, because it is the one that saves the money.

**6. The mechanics.** Revision rounds, what you need from the client and by when, and your change-order process stated as a normal step rather than a warning.

**7. The conversation.** Your price sentence written out. Your response to "that is more than I expected". Your response to a discount request. Your walk-away point as a number.

**8. The transition.** Which existing clients move to this, when, and what you will say. Name the ones you expect to lose and say whether that is acceptable.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Current position uses real figures",
                weight: 15,
                descriptor:
                  "Real hourly rate including unpaid hours, a computed floor, and an honest account of how the current price was set.",
              },
              {
                criterion: "Value case is quantified with stated confidence",
                weight: 20,
                descriptor:
                  "All five questions answered with an annual value figure and a confidence statement. Full marks distinguish what is known from what is estimated.",
              },
              {
                criterion: "The new price is justified from both directions",
                weight: 20,
                descriptor:
                  "Tested against a fraction of value and against the writer's own floor, with the pricing basis chosen for a stated reason.",
              },
              {
                criterion: "Exclusions are specific and drawn from experience",
                weight: 25,
                descriptor:
                  "At least eight, concrete, and recognisably from real scope creep rather than a generic list. This is the section that saves money and is graded hardest.",
              },
              {
                criterion: "The conversation is rehearsed, not described",
                weight: 10,
                descriptor:
                  "An actual price sentence, actual responses to pushback, and a numeric walk-away point.",
              },
              {
                criterion: "The transition is planned, including losses",
                weight: 10,
                descriptor:
                  "Named clients, dates and wording, with expected losses stated and judged acceptable or not.",
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Clients",
      description:
        "Who you work with decides more than what you charge. Concentration, selection, and the ones to decline.",
      lessons: [
        {
          title: "Concentration is the thing that kills",
          type: "TEXT",
          points: 10,
          body: `The most common way a working business ends is not competition or a downturn. It is one client leaving.

## The arithmetic

If one client is 60% of your income and they go, you have lost more than half your revenue in a single conversation, usually with little warning, and usually for reasons that have nothing to do with your work — a budget cut, a new manager, a change of direction.

## Why it happens so easily

Big clients are efficient. One relationship, one invoice, steady work, no constant selling. Every incentive pushes toward taking more from the client who is already there.

And because it grows gradually, there is no moment where you decide to become dependent. You simply are one day.

## The thresholds

Under 25% from any one client is comfortable. Losing them hurts and does not threaten you.

25 to 40% is a real risk you should be actively reducing.

Above 50% is not a business with a concentration problem. It is employment without the protections — no notice period, no severance, no unemployment cover — and it should be understood in those terms.

## The behavioural cost, which is worse

Long before they leave, a dominant client changes how you behave. You accept scope creep because you cannot afford friction. You take the difficult call. You do not raise your price. You put their work first even when another client is waiting.

You have stopped negotiating, and they can tell.

That erosion costs more than the eventual loss, and it happens quietly.

## Reducing it without losing them

You do not fix concentration by firing your best client. You fix it by growing everything else, which requires selling while you are busy — the thing nobody does.

Protect a fixed amount of time for finding work every week, including good weeks. Especially good weeks. The month you have no time to sell is the month before the quiet one.

Raise prices for the dominant client too. If they leave over it, you learned the relationship was thinner than it looked, at a moment of your choosing rather than theirs.

## The number to watch

Recompute the percentage monthly. It moves gradually and nobody notices a slow slide.

If it has risen three months running, that is the signal, and the response is more selling rather than less.`,
          activity: {
            title: "Compute it and set a rule",
            prompt:
              "Work out what percentage of your income each client represented over the last six months. Write the list in order. Then answer: which threshold is your largest in, and has it risen or fallen over those six months? Write your rule — the percentage at which you will actively reduce, and the specific weekly time you will protect for finding work even during busy periods. Put that time in your calendar now.",
          },
        },
        {
          title: "Choosing clients rather than accepting them",
          type: "TEXT",
          points: 10,
          body: `Early on you take whoever will pay. At some point that has to stop, because the wrong client costs more than the money they bring.

## What a bad client actually costs

Time you cannot bill. Endless calls, unclear instructions, rework caused by their indecision.

Attention. A difficult client occupies your thinking well beyond the hours, and that attention is not available to the good ones.

Standards. Work done under bad conditions is worse work, and worse work becomes your portfolio.

Other clients. Time spent placating one is time not spent finding three better ones.

## The signals, visible before you start

Haggling on price before understanding the work. Someone who negotiates before scoping is buying on price, and they will keep doing it.

Urgency with no reason. A rush created by their disorganisation becomes your emergency.

Bad-mouthing the previous supplier. Sometimes the previous supplier was bad. If it is the third one in a row, the constant is the client.

Wanting to skip the contract. "We do not need all that, we trust each other" reliably precedes the situation where you needed it.

Unclear decision-making. If you cannot find out who signs off, you will discover the answer during revisions.

Disrespect in small things — missed calls without apology, late responses, treating your time as free. Small early, larger later.

## The rule worth adopting

Any two signals, decline. Not because they are certainly bad, but because your judgement about the exception is worse than your judgement about the rule, and you will talk yourself into it every time.

## Declining well

You do not owe an explanation. "I do not think I am the right fit for this — thank you for thinking of me" is complete.

Refer them onward if you genuinely know someone suitable. Do not refer a bad client to a friend as a favour; that is not a favour.

## The fear

Turning down money when you need money feels irrational, and sometimes you genuinely cannot afford to. That is what runway is for — it is what converts "I must take this" into "I can choose".

Every month of runway is a month of being able to decline, which is why the number in module one matters here.

## The good client

Clear about what they want. Responds. Pays without chasing. Respects the scope. Treats you as a professional rather than a supplier to be managed.

You will not get all five often. Two or three is a good client, and worth keeping deliberately — telling them so, prioritising them, and occasionally doing something small that was not billed.`,
          activity: {
            title: "Score your clients honestly",
            prompt:
              "List every current client. Score each on the five good-client markers: clear, responsive, pays without chasing, respects scope, treats you as a professional. Then note any warning signals present. Rank them by the total, and put your income percentages next to the ranking. If your worst client is also one of your largest, write down what you are going to do about it and by when.",
          },
        },
        {
          title: "Getting paid",
          type: "TEXT",
          points: 10,
          body: `Money owed is not money. A business can be profitable on paper and fail because the cash arrives after the bills do.

## The terms that actually work

Deposit before starting. A third to a half for project work. This is standard, it filters out people who were never going to pay, and it means you are never fully exposed.

Staged payments on longer work, tied to milestones. Never more than a month of work unpaid at any point.

Final payment before handover of anything they need. Once the work is delivered, your leverage is gone entirely.

Payment due on receipt, or within seven days. Thirty days is a convention you can decline; small suppliers accept it because they think they must.

## Late fees, which are mostly a signal

Include them. They rarely get charged and they change behaviour, because an invoice with a stated consequence gets paid before one without.

## Chasing without damage

Chase on the day it is due, not a week later. A polite same-day note is normal. Waiting teaches that your dates are soft.

Escalate on a schedule you decided in advance: a reminder, then a firmer note, then a call, then stopping work. Having the schedule means each step is routine rather than a decision made while annoyed.

Stop work when payment is significantly overdue, and say so before you do it. Continuing to work for someone who has not paid is not professionalism; it is funding them.

## The pattern to watch

A client who pays late once has had a bad month. A client who pays late three times has a policy, and it is that you are financing their cash flow.

Move them to payment in advance, or stop working with them. This is where a firm decision is much cheaper than a slow drift.

## Making it easy to pay

Invoice immediately, not at month end. Every day of delay is your money sitting in their account.

Give clear payment details and more than one method. Remove every reason for a delay that is not a decision.

Number invoices and keep the record. Chasing is much easier when you can state exactly what was sent and when.

## The uncomfortable truth

Most late payment is not hardship. It is that you have not made it a problem for them, and there is always something more urgent.

Being firm about payment does not damage good relationships. It only damages relationships that depended on you being soft.`,
          activity: {
            title: "Write your payment policy and audit the last year",
            prompt:
              "Write your payment terms as you would put them in a contract: deposit, stages, final payment, due date, late fee, and your escalation schedule with day numbers. Then audit the last year — for each client, how many days on average past due did they pay? Identify anyone with a pattern rather than an incident, and write what you will change with them specifically.",
          },
        },
        {
          title: "Ending relationships well",
          type: "TEXT",
          points: 10,
          body: `Some clients need to end, and how you do it matters — professionally, reputationally and for your own peace.

## When to end one

They are consistently unprofitable once real hours are counted.

The relationship damages your standards or your health.

They will not accept a price that makes the work worth doing.

They treat you or anyone you work with badly. This one does not require any other justification.

They have become a concentration risk you cannot reduce any other way — rare, and it happens.

## Doing it properly

Give notice, in writing, with a date. A month is generous and usually right.

Finish what you committed to. Leaving work half-done damages you far more than the client.

Hand over cleanly — files, access, documentation, anything they need to continue with someone else. Being easy to leave is part of being professional, and it is remembered.

Do not explain at length. "I am changing the focus of my work and will not be able to continue past the fifteenth" is sufficient and true.

## What not to do

Do not disappear. Silence is what people remember and repeat.

Do not raise the price purely to make them leave. If you want to end it, end it. The manoeuvre is transparent and it turns a clean exit into a bad story.

Do not tell them everything they did wrong. It changes nothing and it costs you the reference.

## Being fired

It will happen, sometimes deservedly and sometimes not. Respond the same way: finish well, hand over cleanly, ask once what you could have done better and actually listen to the answer.

Then look at the numbers. Losing a client is a data point. Losing three in a quarter is a pattern, and the pattern is usually in your delivery, your communication or your pricing rather than in bad luck.

## The reputation point

In most fields the community is smaller than it appears. How you leave is discussed more than how you worked.

A person who was expensive but professional gets recommended. A person who was cheap and disappeared does not, and the story outlives the saving.

## The relief

Ending a bad client relationship almost always produces the same reaction: it should have happened months earlier.

That reaction is worth remembering next time, because the thing that delays it is always the same — the money, and the fear that nothing will replace it. Something usually does, and quickly, because the attention that client was consuming goes somewhere useful.`,
          activity: {
            title: "Write the note you have been avoiding",
            prompt:
              "Identify the client relationship you know should end. Write the actual notice — short, dated, with a clean handover offer, and no list of grievances. Then write down what has stopped you sending it: the money, the fear, the awkwardness. Put a number on the money. Then decide a date by which you will either send it or consciously accept keeping them, and write which you chose.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on the client half. Notice how many correct answers are about acting earlier than feels comfortable — that is the theme of the whole module.`,
          quiz: {
            title: "Working with clients",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "One client is 60% of your income. What do you actually have?",
                explanation:
                  "Employment without the protections — no notice, no severance, no unemployment cover. The behavioural cost arrives long before they leave: you stop negotiating, accept scope creep, and do not raise your price, and they can tell.",
                options: [
                  { text: "Employment without the protections that come with it", correct: true },
                  { text: "A strong, efficient business relationship", correct: false },
                  { text: "A normal position for a service business", correct: false },
                  { text: "A problem only if they show signs of leaving", correct: false },
                ],
              },
              {
                prompt: "How do you reduce client concentration?",
                explanation:
                  "By growing everything else, which means selling while you are busy — especially in good weeks. The month you have no time to sell is the month before the quiet one. Firing your best client is not the fix.",
                options: [
                  {
                    text: "Sell during busy periods too, protecting fixed time for it every week",
                    correct: true,
                  },
                  { text: "Stop taking work from the dominant client", correct: false },
                  { text: "Wait until they leave and then rebuild", correct: false },
                  { text: "Lower prices to attract more small clients", correct: false },
                ],
              },
              {
                prompt: "A client asks for a lower price. What is the correct response?",
                explanation:
                  "Reduce the scope, not the price. Delivering the same thing for less tells the client the first number was invented, and every future price becomes negotiable. Offering less for less is a real answer that keeps the price honest.",
                options: [
                  { text: "Offer less work for the lower price, never the same work", correct: true },
                  { text: "Discount once to secure the relationship", correct: false },
                  { text: "Explain in detail why the price is justified", correct: false },
                  { text: "Meet them in the middle", correct: false },
                ],
              },
              {
                prompt: "Why chase an invoice on the day it is due rather than a week later?",
                explanation:
                  "Because waiting teaches that your dates are soft. Most late payment is not hardship — it is that you have not made it a problem, and there is always something more urgent competing for their attention.",
                options: [
                  { text: "Waiting teaches the client that your dates are negotiable", correct: true },
                  { text: "Legal claims require immediate action", correct: false },
                  { text: "Late fees only apply on the first day", correct: false },
                  { text: "It is more polite than waiting", correct: false },
                ],
              },
              {
                prompt: "You want to end a client relationship. What should you not do?",
                explanation:
                  "Raise the price purely to push them out. It is transparent, and it turns what could be a clean professional exit into a story people repeat. If you want to end it, end it plainly with notice and a clean handover.",
                options: [
                  { text: "Raise the price purely to make them leave", correct: true },
                  { text: "Give a month's written notice with a date", correct: false },
                  { text: "Finish what you already committed to", correct: false },
                  { text: "Hand over files and access cleanly", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Systems",
      description:
        "Removing yourself from the middle. What to write down, what to automate, and what genuinely needs you.",
      lessons: [
        {
          title: "The bottleneck is always the same person",
          type: "TEXT",
          points: 10,
          body: `In almost every small business, one person is the constraint, and that person is reading this.

## How it shows up

Nothing moves while you are away. Questions queue for you. Clients ask for you specifically. Every process runs through your judgement, including the parts that do not need judgement.

## Why it happens

Because it is faster in the moment. Explaining a task takes longer than doing it, every single time, so the explanation never happens and the dependency deepens.

This is a genuinely rational choice made repeatedly, producing an irrational outcome. That is what makes it hard to escape.

## What it costs

You cannot be ill. You cannot take a proper holiday. You cannot work on the business, because you are inside the delivery.

And the business cannot be sold, handed over, or grown beyond your personal capacity, because you are the mechanism.

## The three categories

Work that genuinely needs your judgement. The skilled core — the reason clients come to you. Keep this.

Work that needs a person but not you. Coordination, follow-up, chasing, formatting, scheduling. Someone competent could do it from instructions.

Work that needs no person. Repetitive, rule-based, identical every time. Templates and automation.

Most people's weeks are perhaps a third first category and two thirds the other two, while feeling entirely necessary.

## The first move

Not hiring. Writing things down.

You cannot hand over what only exists in your head, and you cannot automate a process you have never described. Documentation is the prerequisite for every other kind of leverage, and it is the step people skip because it produces nothing visible.

## The week that reveals it

Track your time for one week, honestly, in fifteen-minute blocks. Then categorise every entry into the three types.

The result is usually uncomfortable and it is the only reliable way to see it — because your sense of how you spend your time is constructed from the memorable parts, and the memorable parts are the skilled ones.

## The order of operations

Document, then automate the rule-based, then delegate the person-but-not-you, then finally consider hiring for volume.

People do this backwards — hire first, then discover they have nothing to hand over, then spend six months managing someone while doing their own job as well.`,
          activity: {
            title: "Track a week and categorise it",
            prompt:
              "Track your working time for one week in fifteen-minute blocks. Do not tidy it up. Then categorise every block into the three types: needs your judgement, needs a person but not you, needs no person. Add up the hours in each. Write the percentages. Then pick the single largest item in the third category — the rule-based one — because that is the cheapest thing to remove first.",
          },
        },
        {
          title: "Writing down what you know",
          type: "TEXT",
          points: 10,
          body: `Documentation has a reputation for being corporate and pointless. Done properly it is the highest-leverage unglamorous work available to a small business.

## What it buys

Consistency — the work is the same whoever does it and whatever mood you are in.

The ability to hand over. Nothing can be delegated until it exists outside your head.

Speed. You stop re-deciding solved problems.

Sale value. A documented process is an asset. An undocumented one is your memory.

## What to write first

Not everything. The things you do repeatedly and the things that go wrong.

Client onboarding, from enquiry to started. Your most common delivery process. Invoicing and chasing. Handover and project close. Whatever you have had to redo because a step was missed.

Five processes covers most of the value.

## How to write it usefully

Steps, in order, with enough detail that a competent stranger could follow them. Not a description of the philosophy — the actual sequence.

Include the decisions: at this point, if X, do Y, otherwise Z. Decision points are where undocumented processes fail.

Include the templates inline — the email you send, the fields on the form, the checklist.

Note what usually goes wrong at each step. This is the most valuable part and the part nobody writes, because it only exists in the memory of the person who has done it forty times.

## Writing it as you work

The cheapest method: the next time you do the process, write it down as you go. It costs perhaps 20% extra on that one occasion, and it is far more accurate than trying to recall it afterwards.

## Keeping it alive

A document that is wrong is worse than none, because it will be followed.

Update it when the process changes, in the moment. And review the set once a quarter — twenty minutes, checking whether each still describes what you actually do.

## The realistic standard

Not perfect documentation of everything. Five processes, accurate, with the failure points noted, updated when they change.

That is achievable in a few weeks of ordinary work and it changes what is possible afterwards. The version people aim for — a complete manual — never gets written, and the pursuit of it is why they end up with nothing.`,
          activity: {
            title: "Document one process while doing it",
            prompt:
              "Pick the process you run most often. The next time you do it, write it down as you go: every step in order, every decision point with its condition, the templates inline, and what usually goes wrong at each step. Then hand it to someone and ask whether they could follow it without asking you anything. Write down every question they had — each one is a gap in the document.",
          },
        },
        {
          title: "Delegating without creating more work",
          type: "TEXT",
          points: 10,
          body: `Most first attempts at delegation fail, in a predictable way, and put people off for years.

## The usual failure

You hand over a task with a vague instruction. The result is wrong. You fix it yourself, conclude that delegation does not work, and take the task back — now having spent more time than if you had done it.

The task was not the problem. The handover was.

## What a delegated task needs

The outcome, stated so it can be checked. Not "tidy up the invoices" but "every invoice from last month recorded in the sheet with date, client, amount and status".

The process, if one exists — which is why documentation comes first.

The boundaries. What they can decide alone, what needs to be asked, what they must never do.

The deadline, and how you will know it is done.

Access to whatever they need, arranged before they start rather than discovered mid-task.

## Start with a whole thing, not a fragment

Delegating a small piece of a process you still run keeps you in the middle. Delegating the whole of a small process removes you from it.

Better to hand over all of invoicing than half of client onboarding.

## The first three times

Expect to check the work and expect it to be imperfect. Give specific corrections rather than redoing it silently — silent correction teaches nothing and guarantees you will do it forever.

By the third or fourth time it should need little checking. If it does not, either the instruction is unclear or the person is wrong for it, and those need different responses.

## Who to delegate to

You do not need an employee. A part-time contractor, a virtual assistant, or a specialist for a specific task are all real options, and much easier to start and stop.

Start smaller than feels worth it. A few hours a week of the right task removes a surprising amount of drag, and it teaches you how to delegate before the stakes rise.

## The cost you must actually compare

Not "can I afford to pay someone". Rather: what is an hour of my time worth at my real rate, and what does an hour of theirs cost?

If your real rate is meaningfully higher, delegating is profitable — provided the hour you release goes into billable or business-building work rather than evaporating.

That last condition is the one people miss. Freed time that fills with more admin has bought nothing.

## What never to delegate

The client relationship, early on. The skilled core. Anything you do not understand well enough to check.

Delegating something you cannot evaluate means you will not know it is wrong until a client tells you.`,
          activity: {
            title: "Write one delegation brief",
            prompt:
              "Pick one whole small process from your documentation. Write the brief: the outcome stated so it can be checked, the process, what they may decide alone versus must ask, the deadline, and the access they need. Then calculate the economics — your real hourly rate against theirs — and write specifically what you will do with the hours released. If you cannot name what the freed time is for, the delegation has not been justified.",
          },
        },
        {
          title: "The business that runs without you for two weeks",
          type: "TEXT",
          points: 10,
          body: `A concrete test, and a good target: could your business survive two weeks without you, with no warning?

## Why two weeks

Long enough to expose real dependencies. Short enough to be achievable within a year for most small businesses.

It is also the realistic length of an illness, a family emergency, or a holiday you should be able to take.

## What breaks

Work in progress with no one else able to continue it.

Clients who only deal with you and have no other contact.

Payments not chased, so cash stops.

Decisions that need you, queuing.

Access — accounts, files, systems — that only you can reach.

## Building toward it

Documentation for anything in flight, so someone could pick it up.

A second point of contact for clients, even if it is a person who only takes messages and reassures. Silence is what damages relationships.

Invoicing and chasing that runs on a schedule rather than on your attention. Much of this can be automated or handed over entirely.

Access shared safely — a password manager with a trusted person able to reach what is needed. This is also basic continuity planning and almost nobody has it.

A written "if I am unavailable" note: who to contact, what is in flight, what can wait, what cannot.

## Testing it

Take a week off. Genuinely off — not checking messages.

You will discover the dependencies immediately, and the list of things that broke is your work plan. That is the point of the test, and it is far cheaper to learn this during a chosen week than during an emergency.

## The realistic version

Most small businesses cannot survive two weeks with zero involvement, and do not need to. A version where a competent person keeps things moving and holds three decisions for your return is genuinely achievable and is most of the benefit.

## Why this is worth doing even if you never stop

Because everything that makes a business survive your absence also makes it possible to grow, to hand over, to sell, and to work on rather than in.

The two-week test is not really about holidays. It is a measure of how much of the business exists outside your head — which is the same question the first module asked, made testable.`,
          activity: {
            title: "Write the unavailable note, then find the gaps",
            prompt:
              "Write the note someone would need if you were unreachable from tomorrow: who to contact, what is in flight and its state, what can wait two weeks, what cannot, and where to find access. Then read it as that person and list every question you could not answer from it. Those gaps are your work plan. Pick the two most damaging and write what you will do about them this month.",
          },
        },
        {
          title: "Assignment: remove yourself from one process",
          type: "ASSIGNMENT",
          points: 25,
          body: `The second graded piece, and a practical one. It asks you to actually document and hand over a real process, and report what happened rather than what you planned.`,
          assignment: {
            title: "Documented and delegated process",
            instructions: `Take one real process out of your own hands. 600 to 900 words.

**1. The time audit.** Your week tracked in blocks, categorised into needs-your-judgement, needs-a-person-not-you, and needs-no-person. Give the hours and percentages. Name the largest item in each category.

**2. The process you chose.** Which one and why. It should be a whole small process rather than a fragment of a large one — say why yours qualifies.

**3. The documentation.** The process written out: steps in order, decision points with conditions, templates inline, and what usually goes wrong at each step. This last part is graded hardest because it is what only you know.

**4. The test.** You gave it to someone to follow. Every question they asked, listed. What you changed as a result.

**5. The delegation brief.** Outcome stated so it can be checked, boundaries on what they may decide, deadline, and access arranged in advance.

**6. The economics.** Your real hourly rate against the cost of theirs, and specifically what the released hours are for. If you cannot name what the freed time does, say so — that means the delegation is not yet justified.

**7. What actually happened.** If you have handed it over, how the first attempt went and what you corrected. If not yet, the date you will and who to.

**8. What is still only in your head.** The next process to document, and an honest assessment of how much of the business currently exists outside you.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "The time audit is real and categorised",
                weight: 15,
                descriptor:
                  "Tracked rather than estimated, with hours and percentages across the three categories and the largest item in each named.",
              },
              {
                criterion: "A whole process was chosen, not a fragment",
                weight: 10,
                descriptor:
                  "Justified as something that removes the writer from a process entirely rather than leaving them in the middle of it.",
              },
              {
                criterion: "Documentation includes decisions and failure points",
                weight: 30,
                descriptor:
                  "Steps in order with conditional branches, inline templates, and what goes wrong at each step. Full marks on the failure points, which is the part only the writer knows.",
              },
              {
                criterion: "It was tested with a real person",
                weight: 20,
                descriptor:
                  "Questions listed and changes made. A document that was never handed to anyone scores low here regardless of quality.",
              },
              {
                criterion: "The economics name what the freed time is for",
                weight: 15,
                descriptor:
                  "Real rates compared, with a specific use for the released hours. Admitting the delegation is unjustified where that is true scores full marks.",
              },
              {
                criterion: "Honest account of what remains in the writer's head",
                weight: 10,
                descriptor:
                  "A next step and a realistic assessment of dependency, not a claim that the business is now independent.",
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "The books",
      description:
        "Numbers you can read at a glance. Revenue versus money you can spend, paying yourself, and knowing before it hurts.",
      lessons: [
        {
          title: "Revenue is not money you can spend",
          type: "TEXT",
          points: 10,
          body: `The single most common financial mistake in small business, and the reason profitable businesses run out of cash.

## The four different numbers

Revenue — what you invoiced. Includes money not yet received and money that may never arrive.

Cash received — what actually landed. Lower, and later.

Profit — cash received minus the costs of earning it. Lower again.

Money you can actually spend — profit minus tax owed, minus what you must hold for upcoming costs. Lower still, and it is the only one that is really yours.

## Why people spend the wrong number

Because revenue is the biggest and it is the one people quote. A good month feels like money, and some of it is already committed to a tax bill that arrives later.

## The tax trap

You receive money, spend it, and months later a tax bill arrives for income you no longer have. This is extremely common and it is entirely avoidable.

The fix is simple and boring: when money arrives, move a fixed percentage into a separate account immediately, and treat that account as not yours. It is money you are holding on behalf of the tax authority, because that is exactly what it is.

The percentage depends on where you are. Find out and use a real figure rather than a hopeful one.

## The three-account structure

Operating — money comes in here, bills go out.

Tax — a percentage moved the day money arrives. Never touched for anything else.

Profit or reserve — a smaller percentage, for runway and for paying yourself.

Three accounts and two automatic transfers. It takes an afternoon to set up and it removes the largest financial failure mode a small business has.

## The number to watch

Not revenue. Cash in the operating account against the next 60 days of committed costs.

That single comparison tells you whether you are fine, and it is the number to check weekly.

## Why this matters more than growth

A business can grow itself into failure — more work means more costs paid before the invoices arrive, and cash goes negative while the business looks successful on paper.

Growth consumes cash. Knowing that in advance is what stops a good year becoming a crisis.`,
          activity: {
            title: "Separate the four numbers, then set up the accounts",
            prompt:
              "For your last three months, work out all four numbers separately: revenue invoiced, cash actually received, profit after costs, and money genuinely available after tax and committed costs. Write all four. The gap between the first and the last usually surprises people. Then find your actual tax percentage where you live, and set up the second account with an automatic transfer — or write the date you will do it this week.",
          },
        },
        {
          title: "Books simple enough that you read them",
          type: "TEXT",
          points: 10,
          body: `An elaborate accounting system you avoid is worth less than a simple one you look at weekly.

## What you actually need

Every payment in: date, client, amount, what it was for, invoice number.

Every payment out: date, who, amount, category.

That is the core. Everything else is analysis on top of it.

## Categories that earn their place

Keep few. Direct costs of delivery, tools and subscriptions, professional fees, marketing, equipment, your own pay, tax set aside.

Seven or eight categories is enough to answer real questions. Thirty categories produces a beautiful record nobody reviews.

## When to use software

If you have more than a handful of transactions a month, or employees, or complex tax, proper software pays for itself.

Below that, a spreadsheet is genuinely fine and has the advantage that you understand every row.

The failure is not choosing wrongly. It is choosing something and then not entering the data.

## The weekly ten minutes

Enter what came in and what went out. Check the operating account against the next 60 days.

Weekly rather than monthly because ten minutes is easy and two hours is not, and because a problem found in week two is much cheaper than one found in week eight.

## The monthly half hour

Money in, money out, profit. The five numbers from module one. What changed and why.

Ask one question: is anything moving in a direction I do not like? That is the entire purpose, and it does not require sophistication.

## Receipts

Keep them. Photograph them immediately and file by month. This is boring, takes seconds, and is genuinely painful to reconstruct later — a deduction you cannot evidence is a deduction you do not get.

## The honest reason people avoid the books

Not difficulty. It is that the numbers might say something uncomfortable — that a client is unprofitable, that the good month was not, that the business earns less than a job would.

Avoiding the books does not change any of that. It only delays the point at which you could have acted, and every month of delay is a month of the same decision being made blindly.`,
          activity: {
            title: "Build the sheet and enter one month",
            prompt:
              "Build the simplest version: two tabs, money in and money out, with the fields from this lesson and no more than eight categories. Then enter one full recent month from your bank statement. Write down how long it took, and anything that surprised you — an unexpected subscription, a client who cost more than they paid, a category that is larger than you thought. Then set your weekly ten minutes as a repeating calendar entry.",
          },
        },
        {
          title: "Paying yourself properly",
          type: "TEXT",
          points: 10,
          body: `Most people running a small business pay themselves whatever is left, which is not a decision and produces a predictable set of problems.

## What is wrong with taking what is left

Your income swings wildly, which makes personal planning impossible.

The business never accumulates anything, because any surplus becomes personal spending.

You cannot tell whether the business is viable, because the largest cost — your own labour — is invisible in the accounts.

And in bad months you pay yourself nothing, which is unsustainable and how people quietly burn out.

## Paying yourself a salary

Decide a figure you can sustain and pay it on the same date every month, from the operating account, recorded as a cost.

The number should be based on your monthly floor and on what the business can actually support — usually lower than you would like at first, and rising deliberately.

## Why it changes the picture

Once your pay is a cost, the profit figure means something. A business that is profitable after paying you properly is genuinely working. One that is only profitable because you paid yourself nothing is a job with extra risk.

That distinction is invisible until you make your own labour a line item, and it is the single most clarifying change you can make to your books.

## Bonuses from surplus

When there is genuine surplus after tax and reserve, take some as a bonus and leave some in.

Deciding the split in advance — half out, half retained, say — stops good months being fully spent and bad months having nothing behind them.

## The reserve

Aim for three months of business costs plus your salary, held and not touched.

This is the same runway from module one, and it is what converts fear into choice: the ability to decline a bad client, wait for a better contract, or survive a slow quarter without panic.

Build it before increasing your own pay. It is worth more than the difference.

## The comparison worth making annually

What would you earn employed, doing this work, including benefits and the value of not carrying the risk?

If the business pays you meaningfully less than that after several years, it needs to change or you should choose it for reasons other than money — which is legitimate, and should be a decision rather than a drift.

Most people never make this comparison, and some of them are earning less than employment while working considerably harder.`,
          activity: {
            title: "Set the salary and run the comparison",
            prompt:
              "Decide your salary: a specific figure, paid on a specific date each month, based on your floor and what the business supports. Write it down. Then recalculate your last three months' profit with that salary as a cost, and write what the profit actually was. Finally, work out what you would earn employed doing similar work, including benefits, and write both numbers side by side with one sentence on what you conclude.",
          },
        },
        {
          title: "Making decisions from your numbers",
          type: "TEXT",
          points: 10,
          body: `The point of books is not records. It is that decisions stop being guesses.

## Which clients are actually profitable

Revenue per client minus the real hours spent, at your real rate. Including the unbilled hours — the calls, the revisions, the chasing.

The result is frequently a surprise: the largest client is often among the least profitable per hour, because volume came with demands.

Once you know, the options are concrete — raise their price, reduce what is included, or let them go.

## Which work is worth doing

The same calculation by type of work rather than by client. Some categories of job are consistently good and some consistently poor.

Most people have a sense of this and have never checked. The check often reveals that a favourite kind of work is unprofitable, or that a disliked one pays very well — both of which are useful to know deliberately.

## Whether to buy something

Against the return, not against whether you can afford it. A tool that saves four hours a month is worth roughly four times your real hourly rate, monthly, and the decision is arithmetic rather than a feeling about spending.

## Whether to hire

Cost of the person against the revenue their time enables, plus the management time they will consume, which is always more than expected.

And the cash question, which is the one that catches people: you pay them before the extra revenue arrives. That gap needs funding, and hiring into a thin cash position is how businesses fail while growing.

## Whether to take a piece of work

Against your floor, your current capacity and your client mix. A job at a poor rate when you are busy costs you the better one you cannot then take.

## The quarterly review

Half an hour, four questions. What did I earn and is it moving in the right direction? Which clients and work types are actually profitable? What is my concentration doing? Is my reserve growing?

Then one decision, acted on before the next quarter. Not five — one. A single change made is worth more than a list written.

## The habit underneath all of it

Looking. The businesses that survive are not the ones with the most sophisticated numbers. They are the ones whose owners look at simple numbers regularly and act before the situation forces them to.`,
          activity: {
            title: "Find your least profitable client",
            prompt:
              "Calculate profitability per client for the last quarter: revenue minus all hours spent at your real rate, including unbilled time. Rank them. Write down which is least profitable and whether that surprised you. Then do the same by type of work. Finally, pick one decision that follows from what you found — a price rise, a scope reduction, a client to end, or a type of work to stop offering — and write when you will act on it.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on the financial half. These are the mistakes that end otherwise-working businesses, and none of them require sophistication to avoid.`,
          quiz: {
            title: "Money and books",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "Why do profitable businesses run out of cash?",
                explanation:
                  "Because revenue, cash received, profit and spendable money are four different numbers, and growth consumes cash — more work means costs paid before invoices arrive. A business can look successful on paper while going cash-negative.",
                options: [
                  {
                    text: "Revenue is not spendable money, and growth consumes cash before invoices arrive",
                    correct: true,
                  },
                  { text: "Because they price too low", correct: false },
                  { text: "Because they have too many clients", correct: false },
                  { text: "Because tax rates are unpredictable", correct: false },
                ],
              },
              {
                prompt: "What is the point of paying yourself a salary as a cost?",
                explanation:
                  "It makes the profit figure meaningful. A business profitable after paying you properly is working; one profitable only because you took nothing is a job with extra risk. That distinction is invisible until your labour is a line item.",
                options: [
                  {
                    text: "Profit becomes meaningful, because your labour is finally counted as a cost",
                    correct: true,
                  },
                  { text: "It reduces the tax owed", correct: false },
                  { text: "It makes the business easier to sell", correct: false },
                  { text: "It is legally required", correct: false },
                ],
              },
              {
                prompt: "Why check the books weekly rather than monthly?",
                explanation:
                  "Ten minutes is easy and two hours is not, so weekly actually happens. And a problem found in week two is much cheaper to fix than the same problem found in week eight.",
                options: [
                  {
                    text: "Ten minutes gets done where two hours does not, and problems are found earlier",
                    correct: true,
                  },
                  { text: "Tax authorities require weekly records", correct: false },
                  { text: "Monthly figures are less accurate", correct: false },
                  { text: "Weekly review improves client relationships", correct: false },
                ],
              },
              {
                prompt: "What usually surprises people about per-client profitability?",
                explanation:
                  "The largest client is often among the least profitable per hour, because volume arrived with demands — unbilled calls, revisions and chasing. It only becomes visible when real hours including unbilled time are counted.",
                options: [
                  {
                    text: "The largest client is often the least profitable per hour",
                    correct: true,
                  },
                  { text: "The newest clients are always most profitable", correct: false },
                  { text: "All clients are roughly equally profitable", correct: false },
                  { text: "Profitability tracks the size of the invoice", correct: false },
                ],
              },
              {
                prompt: "What is the cash risk specific to hiring?",
                explanation:
                  "You pay them before the revenue their work enables arrives. That gap has to be funded, and hiring into a thin cash position is a well-worn way for a growing business to fail.",
                options: [
                  {
                    text: "You pay them before the extra revenue arrives, and that gap needs funding",
                    correct: true,
                  },
                  { text: "Employees cost more than contractors in every case", correct: false },
                  { text: "Hiring always reduces profit permanently", correct: false },
                  { text: "There is no particular cash risk", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Finding work",
      description:
        "Where clients actually come from, and why the channel that works is usually the one you are avoiding.",
      lessons: [
        {
          title: "Where your clients actually came from",
          type: "TEXT",
          points: 10,
          body: `Before deciding how to find more work, find out where the work you already have came from. Most people are wrong about this.

## Do the count

Every client from the last two years, and how each one actually found you. Not roughly — specifically. Who introduced them, which post, which conversation.

## What people usually find

Referrals and personal contacts dominate — frequently more than half, sometimes almost all.

The channel they spend most effort on produces almost nothing. Usually social media, where the effort is visible and the return is not.

One or two unexpected sources produced disproportionate results, and were never repeated because nobody noticed.

## What that implies

Do more of what worked, which sounds obvious and almost nobody does, because the thing that worked is often the least comfortable — asking, following up, talking to people.

Stop or reduce what has produced nothing after a fair trial. A channel you have worked for a year with no clients is not a channel that needs more effort.

## Referrals do not happen by themselves

The most common source of work is also the one people treat as luck.

Ask. At the end of a good project, when the client is pleased: do you know anyone else with this problem? Most people never ask, and most clients are willing.

Make it easy — tell them specifically who you are looking for. "Anyone you know" produces nothing; "someone running a small e-commerce business struggling with X" produces names.

Stay in contact with past clients. Most work does not come from strangers; it comes from people who already know you and had forgotten you were available.

## The uncomfortable channel

For most people the highest-return activity is direct contact — messaging people who fit, personally, one at a time, with something specific and useful.

It is uncomfortable, it does not scale, and it works. Which is exactly why most people build a website instead and wait.

## The realistic mix

Two channels done properly beats six done occasionally. Almost always: referrals worked deliberately, plus one other you can sustain.

Choose the second based on what your count showed rather than on what is fashionable.`,
          activity: {
            title: "Count every client and their source",
            prompt:
              "List every client from the last two years and how each actually found you — specifically, not by category. Group them and count. Write down which channel produced the most, which channel you spend most effort on, and whether those are the same. Then write the specific sentence you will use to ask for referrals, naming exactly who you are looking for.",
          },
        },
        {
          title: "Being findable for the right thing",
          type: "TEXT",
          points: 10,
          body: `Positioning is not marketing language. It is the answer to a question people ask about you when you are not there.

## The question

When someone says "do you know anyone who does X?", what has to be true for your name to come up?

Your name comes up when X is specific and someone associates it with you. It does not come up when you do many things competently.

## Why narrow works

A generalist is compared with everyone and remembered by nobody. A specialist is compared with few and is the obvious answer when their thing arises.

Narrowing reduces the number of opportunities and increases the proportion you win, at a higher price. For most people that trade is strongly positive, and it feels dangerous, which is why it is rare.

## Choosing the narrow thing

Look at your own record: which work was most profitable, which you did best, which clients were happiest, and which you would happily do more of.

The intersection is usually obvious once written down, and usually smaller than the range of work you currently accept.

## Saying it plainly

One sentence: I help [specific kind of client] with [specific problem].

If it could describe five other people you know, it is not specific enough yet.

## What you lose

Work outside the specialism. Some of it good.

You can still take it — narrowing your positioning does not require refusing everything else. It changes what you are known for, which is what determines what arrives unprompted.

## Evidence beats claims

A specific claim needs specific proof. Two or three short accounts of the same kind of problem solved, with outcomes, are worth more than a long list of everything you can do.

This is why the case-study habit from the competition lesson matters here: positioning without evidence reads as a claim, and positioning with evidence reads as a fact.

## The test

Ask three people who know your work what they would say if someone asked what you do.

If the answers differ significantly from each other and from yours, your positioning exists only in your own head — and that is genuinely useful to find out, because it explains why referrals are not arriving.`,
          activity: {
            title: "Write the sentence and test it",
            prompt:
              "Look at your record — most profitable work, best work, happiest clients, work you would do more of — and write the intersection. Then write your positioning sentence: I help [specific client] with [specific problem]. Check it against the test: could it describe five people you know? Narrow until it could not. Then actually ask three people who know your work what they would say you do, and write down the gap between their answers and yours.",
          },
        },
        {
          title: "Proposals that get accepted",
          type: "TEXT",
          points: 10,
          body: `A proposal is not a description of what you will do. It is an argument that the client's problem is worth solving and that you are the person to solve it.

## What most proposals get wrong

They are about the supplier. History, credentials, process, team. The client cares about none of this until they believe you understand their situation.

They list activities rather than outcomes. "Ten hours of consultation" is a cost; "a working process your team can run without you" is a purchase.

They arrive late. A proposal sent a week after the conversation loses to one sent the next day, regardless of quality, because urgency decays.

They are long. Length signals effort to the writer and reads as padding to the client.

## The structure that works

Their situation, in their words. Demonstrating you listened is more persuasive than anything you can claim about yourself, and getting this section right does most of the work.

What it is costing them. From the value questions — the cost of inaction, stated back.

What you will deliver. Specific outcomes, not activities.

What is not included. Yes, here too. It prevents the misunderstanding that turns a won project into a bad one.

The price, stated plainly, with options if useful.

Timeline and what you need from them.

How to say yes. One clear next step.

Two pages. Three at most.

## Options rather than one number

Two or three tiers changes the question from "yes or no" to "which one", which is a substantially easier question to get a positive answer to.

Make the middle one the intended choice. The cheapest should be genuinely thin and the expensive one genuinely valuable — fake options are transparent and damage trust.

## Sending it

Fast. Within a day of the conversation while the problem is still vivid.

With a stated expiry. Not as pressure, but because a price quoted three months ago should not bind you, and it gives a natural reason to follow up.

## Following up

Once after a few days, once more after a week, then stop. Most acceptances come after a follow-up and most people never send one.

Silence is usually not rejection; it is that your proposal is not the most urgent thing on their desk.

## After a no

Ask why, once, without arguing. The answers accumulate into a pattern: price, scope, timing, or that you were never the right fit.

Each pattern has a different fix, and you cannot tell which you have without asking.`,
          activity: {
            title: "Rewrite a real proposal",
            prompt:
              "Take a proposal you have sent — or write one for a real prospect — and rebuild it in the structure from this lesson: their situation in their words first, the cost of inaction, outcomes not activities, exclusions, price with two or three tiers, timeline, and one clear next step. Keep it to two pages. Then write your follow-up schedule with actual day numbers, and the single question you will ask after a no.",
          },
        },
        {
          title: "Saying no, and what it makes possible",
          type: "TEXT",
          points: 10,
          body: `The ability to decline work is the difference between running a business and being available to whoever asks.

## What refusing requires

Runway, so a no is not a financial decision made under pressure.

A floor, so you know what you are refusing against.

Enough pipeline that this is not the only opportunity.

Those three are why the earlier modules come first. Without them, "learn to say no" is advice you cannot act on.

## What to refuse

Work below your floor. Work outside your positioning that you do not want more of. Clients showing two or more warning signals. Anything whose scope you cannot define and they will not pay to discover. Work that would push a single client past your concentration threshold.

## Refusing well

Quickly. A slow no is worse than a fast one — it holds up their plans and yours.

Without a long justification. "This is not the right fit for me" is complete and does not invite negotiation.

With a referral where you genuinely have one. It costs nothing and it is remembered.

## The counter-intuitive effect

Turning work down tends to increase the work available, for reasons that are not mysterious: you have more capacity for the clients you kept, you deliver better, and being visibly selective changes how people describe you.

The person who is always available is assumed to be available because nobody else wants them.

## The version that is a trap

Refusing work you should take because it is not perfect. Waiting for ideal clients while the reserve drains is not discipline; it is avoidance dressed as standards.

The distinction: refusing because it fails a stated rule is discipline. Refusing because it does not feel exciting is something else, and it should be checked against your floor and your pipeline.

## The one to remember

The work you say no to determines what you have time to say yes to.

Every hour on a poor client is an hour unavailable to the good one who appears next week. That trade is invisible when you make it and obvious afterwards.`,
          activity: {
            title: "Write your rules and one refusal",
            prompt:
              "Write your five refusal rules as specific, checkable conditions — with your floor as a number and your concentration threshold as a percentage. Then write the actual sentence you will use to decline, short enough to send without editing. Finally, look at your current work and identify anything you took that breaks one of your own rules, and write what you will do about it.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on finding work. The theme is that the effective channel is usually the uncomfortable one, and the comfortable one is usually where the effort goes.`,
          quiz: {
            title: "Finding and winning work",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "What do most people find when they count where their clients actually came from?",
                explanation:
                  "Referrals and personal contacts dominate, while the channel absorbing most effort produced almost nothing. The implication is to work referrals deliberately — asking, following up, staying in contact — which is the uncomfortable option people avoid.",
                options: [
                  {
                    text: "Referrals dominate, and the channel they work hardest on produced almost none",
                    correct: true,
                  },
                  { text: "Social media produces the majority of clients", correct: false },
                  { text: "Their website is the main source", correct: false },
                  { text: "Sources are evenly spread across channels", correct: false },
                ],
              },
              {
                prompt: "Why does narrowing your positioning tend to increase income?",
                explanation:
                  "A generalist is compared with everyone and remembered by nobody; a specialist is the obvious answer when their thing comes up. Fewer opportunities, a higher proportion won, at a higher price.",
                options: [
                  {
                    text: "Fewer opportunities but a higher win rate at a higher price, and your name comes up unprompted",
                    correct: true,
                  },
                  { text: "Specialists have lower costs", correct: false },
                  { text: "It reduces the amount of work needed", correct: false },
                  { text: "Clients pay more for scarcity of any kind", correct: false },
                ],
              },
              {
                prompt: "What should the first section of a proposal be?",
                explanation:
                  "Their situation, in their words. Demonstrating you listened is more persuasive than any claim about yourself, and the client cares nothing for your credentials until they believe you understand their problem.",
                options: [
                  { text: "Their situation, restated in their own words", correct: true },
                  { text: "Your background and credentials", correct: false },
                  { text: "The price, so they can decide quickly", correct: false },
                  { text: "Your process and methodology", correct: false },
                ],
              },
              {
                prompt: "Why offer two or three tiers rather than one price?",
                explanation:
                  "It changes the question from 'yes or no' to 'which one', which is substantially easier to answer positively. The tiers must be genuine — fake options are transparent and cost trust.",
                options: [
                  {
                    text: "It changes the question from whether to buy into which to buy",
                    correct: true,
                  },
                  { text: "It disguises the real price", correct: false },
                  { text: "Clients always choose the most expensive", correct: false },
                  { text: "It reduces the need for a scope", correct: false },
                ],
              },
              {
                prompt: "What distinguishes disciplined refusal from avoidance?",
                explanation:
                  "Whether it fails a stated rule. Refusing against a written floor, concentration threshold or warning-signal count is discipline. Refusing because the work does not feel exciting, while the reserve drains, is avoidance dressed as standards.",
                options: [
                  {
                    text: "Discipline refuses against a written rule; avoidance refuses on feeling",
                    correct: true,
                  },
                  { text: "Discipline always refuses more work", correct: false },
                  { text: "There is no meaningful difference", correct: false },
                  { text: "Avoidance is refusing large projects specifically", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Contracts and the legal floor",
      description:
        "The paperwork that only matters when something goes wrong — which is exactly when you cannot create it.",
      lessons: [
        {
          title: "Why you need something in writing",
          type: "TEXT",
          points: 10,
          body: `Most work goes fine and no contract is ever consulted. The contract exists for the small proportion that does not, and it cannot be created retrospectively.

## What it actually does

Records what both sides agreed, at a time when both were being reasonable. Memory diverges, and it diverges in each party's own favour without anyone lying.

Sets out what happens when something goes wrong — late payment, cancellation, a dispute — so those become procedures rather than arguments.

Establishes who owns what. Without a term, ownership of what you produce may not sit where either party assumes.

## The objection you will hear

"We do not need all that, we trust each other."

The people who say this are not usually planning anything. But a contract is not an expression of distrust; it is a record of an agreement, and the situations it covers are ones neither party is anticipating.

The reliable observation is that this sentence precedes the situations where you needed it, more often than chance would suggest.

## The minimum

You do not need a long document. A one-page agreement covering the essentials is enormously better than nothing, and better than an elaborate template you did not read.

Scope, referencing your detailed version. Price and payment terms. Timeline and what you need from them. What happens if either side wants to stop. Who owns the output and when. Revisions included.

## Getting it accepted

Send it as routine rather than as a negotiation. "Here is the agreement, same as always" is normal; presenting it apologetically invites a discussion.

Keep it readable. A short, plain document gets signed. A dense one gets sent to somebody's lawyer and returns in three weeks.

## When to pay for proper advice

When the amounts are meaningful relative to your income. When there is intellectual property that matters. When you are hiring. When a client's own contract is long and you do not understand it.

A lawyer once, producing a template you reuse, is a small cost that pays for itself the first time it is needed.

## Signing theirs

Larger clients will send their own. Read it — particularly payment terms, liability, ownership and termination.

You are allowed to ask for changes. Suppliers do this routinely and it is not remarkable. Accepting unlimited liability or ninety-day payment terms because you were embarrassed to ask is a decision with a real price.`,
          activity: {
            title: "Write your one-page agreement",
            prompt:
              "Write your minimum agreement covering the six essentials: scope reference, price and payment terms, timeline and client obligations, cancellation, ownership of output and when it transfers, and revisions included. Keep it to one readable page. Then write the sentence you will use when sending it, framed as routine. Finally, note whether the amounts you work with justify paying a lawyer to review it, and if so, when you will.",
          },
        },
        {
          title: "Ownership, and what you are actually selling",
          type: "TEXT",
          points: 10,
          body: `Who owns what you produce is decided by the agreement, and where there is no agreement it may not sit where either side assumes.

## The default is not obvious

In many places, the person who creates something owns it initially, even when paid to create it — unless the contract says otherwise or an employment relationship applies.

Clients generally assume they own everything they paid for. You may assume you retain rights to reuse your own methods.

Both can be wrong, and the disagreement surfaces at the worst moment: when they want to modify it without you, or when you want to reuse something in a portfolio.

## What to specify

What transfers to the client, and when. Commonly on final payment, which is a useful lever and a reasonable position.

What you retain. Your own tools, methods, libraries and general knowledge. You should not be signing away the ability to do the same kind of work again, and a broad transfer clause can do exactly that.

Whether you may show the work publicly. Get this agreed at the start; asking afterwards frequently gets a no for no particular reason.

Third-party materials — fonts, images, libraries — and who holds those licences.

## The reuse question

Much of your value is that you have solved this before. If every project transfers everything including your underlying approach, you are rebuilding from nothing each time and giving away the asset.

The standard, workable position: the client owns the specific deliverable, you retain your general methods and any pre-existing components.

Say so explicitly. It is uncontroversial when raised at the start and contentious when raised later.

## Confidentiality

Often reasonable and sometimes overreaching. Read what you are agreeing not to disclose and for how long. An agreement preventing you from saying you worked with them at all is a real cost to your future positioning.

## The practical minimum

Two sentences in your agreement covering what transfers and when, and what you retain. Plus one on whether you may show the work.

That is most of the protection, and it takes a paragraph.`,
          activity: {
            title: "Write your ownership clause",
            prompt:
              "Write the ownership section of your agreement: what transfers to the client and at what moment, what you explicitly retain, and whether you may show the work publicly. Then review your last three projects — under your new clause, would you have retained what you needed and been able to show the work? Write down anything you have already signed away without noticing.",
          },
        },
        {
          title: "When something goes wrong",
          type: "TEXT",
          points: 10,
          body: `Disputes are rare and expensive in attention. Handling them well is mostly about acting early and keeping records.

## The most common ones

Non-payment. Scope disagreement — they believed something was included. Quality dispute. Cancellation partway. Missed deadlines, on either side.

## The first move, always

Talk before writing anything formal. Most disputes are misunderstandings, and a phone call resolves what an email escalates.

Written communication in a dispute reads colder than intended and gets forwarded.

## Then write it down

After the conversation, send a short note recording what was agreed. Not as a threat — as a record, and because two people leave a call with different versions more often than either believes.

## The records that matter

Your agreement. The scope. Change orders. Invoices with dates. The messages where things were agreed.

Keeping these as a matter of routine costs nothing. Reconstructing them during a dispute is difficult and sometimes impossible, and the party with records usually prevails simply because they can show what happened.

## Escalating

Direct conversation, then a written summary, then a formal letter stating what you require and by when, then a decision about whether to pursue it further.

Each step is slower and more expensive than the last, and most resolve in the first two.

## When to let it go

Frequently. The cost of pursuing a small debt — in time, attention and stress — often exceeds the debt.

Deciding to write something off is a legitimate business decision, and it is better made deliberately than by drifting into it after months of chasing.

Set a threshold in advance: below a certain amount, one formal letter and then it is written off. Above it, pursue properly.

## Preventing most of them

Deposits, so you are never fully exposed. Staged payments, so exposure is bounded. Written scope with exclusions. Change orders. Stopping work when payment is significantly late.

Every dispute mechanism in this lesson is worse than the prevention in the earlier ones. The paperwork is not there to win arguments; it is there so the arguments do not happen.`,
          activity: {
            title: "Set your threshold and check your records",
            prompt:
              "Write your dispute policy: the amount below which you will send one formal letter and then write it off, and above which you will pursue. Then take your largest current client and check whether you actually hold the records that matter — agreement, scope, change orders, dated invoices, and the messages where things were agreed. List anything missing and fix it this week.",
          },
        },
        {
          title: "Insurance, structure and the boring protections",
          type: "TEXT",
          points: 10,
          body: `A short lesson on the protections people skip because nothing has gone wrong yet.

## Business structure

Operating as an individual means your personal assets and the business's are the same thing. A claim against the business is a claim against you.

A separate legal entity puts a boundary there. Whether it is worth the administrative cost depends on your amounts, your risk and where you are — this is a question for a local accountant, not for a course.

Note the honest limit: a company structure does not protect you from your own negligence, and small companies are often asked for personal guarantees anyway.

## Professional insurance

Cover for a claim that your work caused a loss. Whether you need it depends on what you do — advice and anything a client relies on financially carries more exposure than most.

Some clients require it before they will contract with you, which is often how people discover it exists.

## Separating money

Already covered in the books module and worth restating here as a protection rather than as bookkeeping. A separate business account is the practical minimum, whatever your legal structure.

Mixing personal and business money makes accounting painful, makes tax questions harder to answer, and weakens any argument that the business is separate from you.

## Backups and access

If everything lives on one laptop, one theft ends the business. Backups, and access recorded somewhere a trusted person could reach, are continuity rather than paranoia.

The two-week test from the systems module fails immediately without this.

## The realistic prioritisation

Separate bank account. A written agreement. Deposits. Records kept as routine.

Then, as amounts grow: professional advice on structure, insurance if your work carries reliance risk, and proper backups.

## Why it feels unnecessary

Because it is unnecessary right up until it is not, and the moment it becomes necessary is the moment you cannot arrange it.

The whole category is cheap in advance and unavailable afterwards. That asymmetry is the entire argument.`,
          activity: {
            title: "Audit the four protections",
            prompt:
              "Check yourself against four things and write what you find: is your business money in a separate account, do you have a written agreement you actually use, do you take deposits, and could you recover if your main device disappeared tomorrow. For each no, write the specific action and a date. Then note whether your amounts justify asking a local accountant about structure, and if so, when you will.",
          },
        },
        {
          title: "Assignment: your operating agreement",
          type: "ASSIGNMENT",
          points: 25,
          body: `The third graded piece. It asks for the paperwork you would actually send, rather than a description of what a contract should contain.`,
          assignment: {
            title: "Your working agreement and policies",
            instructions: `Produce the documents you will actually use. 600 to 900 words plus the agreement itself.

**1. The agreement.** Your one-page working agreement, written out in full: scope reference, price and payment terms, timeline and client obligations, cancellation, ownership and when it transfers, what you retain, whether you may show the work, and revisions included. It should be readable and sendable as it stands.

**2. Ownership reasoning.** Why you drew the retention line where you did, and what you would have lost on your last three projects under a broad transfer clause.

**3. Payment policy.** Deposit, stages, final payment, due date, late fee, and your escalation schedule with day numbers.

**4. Dispute policy.** Your write-off threshold as a number, and what you do above and below it. State which records you keep as routine.

**5. Refusal rules.** Your five conditions as checkable statements, with the floor as a number and the concentration threshold as a percentage. Plus the sentence you will use.

**6. Protections audit.** Where you stand on separate accounts, written agreements, deposits and backups. Each gap with a dated action.

**7. What you have already signed.** Anything in an existing client contract you accepted without reading properly — liability, payment terms, ownership, confidentiality. If you have not checked, say so and give the date you will.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "The agreement is complete and usable as written",
                weight: 30,
                descriptor:
                  "All nine elements present, on one readable page, in language a client would sign without sending it to a lawyer. A description of what a contract should say scores zero here.",
              },
              {
                criterion: "Ownership line is reasoned against real projects",
                weight: 20,
                descriptor:
                  "A stated retention position tested against the writer's last three projects, identifying what a broad clause would have cost.",
              },
              {
                criterion: "Payment and dispute policies are numeric",
                weight: 20,
                descriptor:
                  "Specific day numbers, a stated late fee and a write-off threshold as a figure. Vague policies score low.",
              },
              {
                criterion: "Refusal rules are checkable",
                weight: 15,
                descriptor:
                  "Conditions a third party could apply, with the floor and concentration threshold as numbers, plus a sendable refusal sentence.",
              },
              {
                criterion: "Protections audit is honest and dated",
                weight: 15,
                descriptor:
                  "Real current state across the four protections with dated actions for gaps, and an honest account of anything already signed unread.",
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Making it last",
      description:
        "Slow months, competition, your own capacity, and the version of this that is still standing in five years.",
      lessons: [
        {
          title: "Slow months, and planning for them",
          type: "TEXT",
          points: 10,
          body: `Every service business has quiet periods. Treating each one as a crisis is exhausting and unnecessary, because they are predictable in aggregate even when unpredictable individually.

## Why they happen

Seasonality — most industries have quiet periods and yours probably has one you could name if you looked.

The feast-famine loop: you get busy, stop selling, finish the work, and have nothing lined up. This is the most common cause and it is entirely self-inflicted.

Client cycles, budget timing, or simply variance.

## Breaking the loop

Protect selling time in busy weeks. This is the whole fix and almost nobody does it, because when you are busy it feels absurd to spend two hours looking for more work.

Those two hours in a busy week are what prevent the quiet month six weeks later. The cost is felt immediately and the benefit arrives invisibly, which is why it does not happen without being scheduled.

## Recognising it in advance

Track your pipeline — enquiries, quotes out, work booked — not just current work.

A pipeline that thins is a quiet month you can see coming, which turns a shock into a plan.

## What to do in a slow month

The wrong response is panic pricing. Discounting to fill time sets a rate you then have to escape, and it usually attracts exactly the clients module three said to avoid.

The right responses: sell harder, contact past clients, finish the things you never have time for — documentation, the website, the case studies, the process improvements.

A quiet month with a good reserve is genuinely useful. It is when the business gets built rather than run.

## The reserve, again

This is why it exists. Three months of costs converts a quiet period from an emergency into an inconvenience, and the difference in the decisions you make is enormous.

Every bad decision described in this course — the discount, the bad client accepted, the scope creep tolerated — is made easier by having no reserve.

## The mental part

Slow periods are frightening in a way that is out of proportion, because income stopping feels permanent even when you know it is not.

Two things help: knowing your runway precisely, so the fear has a boundary; and having done this before, so you have evidence it recovers.

Writing down what happened in your last slow month — how long, what ended it, what you did — is genuinely useful, because next time you will not remember and your mind will supply something worse.`,
          activity: {
            title: "Find your pattern and protect the time",
            prompt:
              "Look at your income by month for as far back as you have records. Identify your quiet months and whether there is a pattern — seasonal, or the feast-famine loop following busy periods. Write what you find. Then schedule your protected selling time as a repeating calendar entry, including in busy weeks, and write down what you will do with the next slow month rather than discounting.",
          },
        },
        {
          title: "Competition and being hard to replace",
          type: "TEXT",
          points: 10,
          body: `Someone will always be cheaper. Competing on price against people with lower costs, less experience or more desperation is a race you lose by winning.

## Why cheaper competition is not the threat it looks like

Clients who choose purely on price were never yours, and they are the most expensive clients to serve. Losing them to someone cheaper is a transfer of a problem.

The threat is being indistinguishable — where a client genuinely cannot tell the difference between you and a cheaper option, and reasonably picks the cheaper one.

## What makes you hard to replace

Specificity. A generalist competes with everyone; a specialist competes with few. "I do this particular thing for this particular kind of client" is a far stronger position than "I do design".

Narrowing feels like losing opportunities and it is what allows a higher price, because expertise in a narrow area is visible and valuable in a way that general competence is not.

Evidence. Results with numbers, from clients like the one you are talking to. This is the single most persuasive asset and most people never collect it, because asking for outcomes feels awkward.

Relationships. Trust built over time is not replaceable by a lower quote, and it is why the client-quality work in module three matters commercially and not only pleasantly.

Reliability. Being the person who does what they said, when they said, is rarer than it should be and is worth a premium.

Process. Something documented, consistent and explicable is more credible than talent, because the client can see what they are buying.

## The positioning question

If a client is choosing between you and someone half your price, what is the sentence that makes the difference?

If you do not have one, that is the work — and it is positioning work rather than sales work.

## Collecting evidence

Ask, at the end of every project: what changed as a result of this? Get a number if one exists.

Do it while the result is fresh and they are pleased. Six months later they have forgotten and you have nothing.

A dozen short case studies with real numbers is worth more than any amount of marketing.

## The honest limit

Some markets genuinely are commodities and there is no premium available. If yours is, the answer is not better positioning — it is a different market, a different service, or accepting the ceiling deliberately.

Recognising that early saves years of trying to differentiate something that buyers correctly see as identical.`,
          activity: {
            title: "Write the sentence, then get one number",
            prompt:
              "Write the sentence that makes the difference when a client is comparing you to someone half your price. Be specific — if it could be said by any competent person in your field, it is not the sentence. Then contact one recent client and ask what changed as a result of your work, aiming for a number. Write down what they said. If you cannot get a number, write down what that tells you about how you are describing your value.",
          },
        },
        {
          title: "Your own capacity",
          type: "TEXT",
          points: 10,
          body: `The business depends on one person continuing to function, and that constraint is usually managed worse than any other.

## Burnout is a business risk

Not a personal weakness. It has an operational cost: worse work, worse decisions, lost clients, and sometimes months of reduced capacity.

Treating it as a risk rather than as a character issue is what makes it manageable, because risks get mitigations and character issues get willpower.

## What actually causes it

Not hours alone. Hours plus lack of control, plus no visible end, plus financial fear.

Which explains why self-employment burns people out at rates comparable to demanding jobs, despite the autonomy: the control is real but the fear is constant and there is no end to the week.

## The specific protections

An end to the day. Self-employment removes the boundary that a workplace provided, and without a replacement the work fills everything.

At least one full day off, genuinely off. Not "I might check messages".

A reserve, which removes the financial fear that makes rest feel irresponsible.

Enough clients that no single one can create panic.

Saying no, which is only possible with the previous two.

## The warning signs

Dreading work you used to enjoy. Irritation with clients who have done nothing wrong. Working longer and producing less. Avoiding admin entirely. Physical symptoms — sleep, appetite, illness.

These arrive in that rough order, and the earlier ones are much cheaper to act on.

## What to do

Reduce load before it is a crisis, not after. Take the week now rather than the month later.

Look at what specifically is draining rather than at the total. Frequently it is one client or one type of work producing most of the drag, and removing that is more effective than working less overall.

Tell someone. Isolation is a large part of why this gets bad — there is no colleague to notice, and the person who would normally notice is you.

## The long view

This has to be sustainable for years, not sprinted for months. A rate of work you can hold indefinitely beats a rate that produces a great year followed by a bad one.

The people still doing good work in ten years are not the ones who worked hardest. They are the ones who built something they could keep doing.`,
          activity: {
            title: "Audit your load and cut one thing",
            prompt:
              "Write down honestly where you are against the warning signs in this lesson — which, if any, apply right now. Then identify the single largest source of drain: name the client, the type of work, or the condition. Write what removing it would cost in money, and what it is currently costing in capacity. Then write your two boundaries: what time your day ends, and which day is fully off. Put both somewhere you will see them.",
          },
        },
        {
          title: "What you can now do",
          type: "TEXT",
          points: 10,
          body: `A short accounting before the capstone.

## What you can do

Tell the difference between a job you gave yourself and a business, and say which you have.

State your five numbers from memory, and recompute them monthly.

Price on the value of an outcome rather than on the hours you happen to have, and say the number without explaining it away.

Write a scope whose exclusions section does the real work, and treat additions as a quoted change rather than a gift.

Measure client concentration and act on it by selling during busy weeks rather than by firing your best client.

Recognise a bad client from the signals before starting, and decline with two words of explanation.

Document a process well enough that someone else can run it, including the parts that go wrong.

Separate revenue from money you can spend, hold tax the day it arrives, and pay yourself as a cost so profit means something.

Work out which clients and which work are actually profitable, and make one decision a quarter from it.

## What you know that most people running small businesses do not

That a rate nobody questions is too low. That effort and value are unrelated quantities. That the exclusions list saves more money than the price. That a dominant client changes your behaviour long before they leave. That documentation is the prerequisite for every other kind of leverage. That growth consumes cash. That the largest client is often the least profitable per hour.

## The distinction to keep

A job you gave yourself pays only when you work, has customers who could end it, and cannot be paused, handed over or sold.

Both are legitimate. Only one of them is what most people think they are building, and the difference is decided by choices in pricing, systems and books rather than by ambition.

## What is left

The capstone, and then the ordinary work — the weekly ten minutes, the protected selling time, the quarterly half hour, and one decision acted on rather than five written down.`,
          activity: {
            title: "Answer your own scores",
            prompt:
              "Go back to the first lesson, where you scored yourself on the four questions and named the one you most wanted to change. Read it. Now write what has actually changed during this course — concretely, in prices set, scopes written, processes documented, or numbers computed. Then rescore the four questions and write which one you are working on next, and the first action for it.",
          },
        },
        {
          title: "Capstone: your business plan on one page",
          type: "ASSIGNMENT",
          points: 40,
          body: `The final piece. Not a document for investors — a working plan you will actually use, precise enough that someone could hold you to it.`,
          assignment: {
            title: "Your one-page business plan",
            instructions: `Write your working plan. 900 to 1,400 words, using your own real figures throughout.

**1. What you are building.** Practice, agency or product, in one sentence, with what it looks like in two years. Then three specific things you are saying no to as a result.

**2. Your numbers.** All five: real hourly rate, monthly floor, runway in months, largest client percentage, conversion rate. Say which are moving in the wrong direction.

**3. Pricing.** What you charge, on what basis, justified against both a fraction of the value created and your own floor. Your walk-away number. Which clients are moving to this and when, including the ones you expect to lose.

**4. Client mix.** Your concentration figure and its trend over six months. Your target, the protected selling time in your calendar, and any client you have decided to end with a date.

**5. Systems.** What is documented, what is delegated, and what remains only in your head. The result of the two-week test — genuine, if you have run it — or the date you will run it.

**6. Money.** Your account structure, the tax percentage you hold, your salary figure and payment date, and your reserve target against where it stands.

**7. Profitability.** Your least profitable client and least profitable type of work, with the figures. The one decision that follows, and when you will act on it.

**8. Capacity.** Where you sit against the warning signs, your largest source of drain, and your two boundaries — when the day ends and which day is off.

**9. What breaks this.** The circumstance that would undo the plan — a lost client, an illness, a slow quarter — and what actually happens if it arrives. A plan claiming nothing would break scores zero on that criterion.

**10. The next quarter.** One decision. Not five. What it is, when it happens, and how you will know it worked.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Direction is chosen with consequences named",
                weight: 10,
                descriptor:
                  "A stated shape and two-year picture, plus three specific things being declined as a result.",
              },
              {
                criterion: "All five numbers are real and assessed",
                weight: 15,
                descriptor:
                  "Computed from records rather than estimated, with a stated judgement on which are trending badly.",
              },
              {
                criterion: "Pricing is justified from both directions",
                weight: 20,
                descriptor:
                  "Tested against value and against the floor, with a numeric walk-away point and a transition plan that names expected losses.",
              },
              {
                criterion: "Concentration is measured and acted on",
                weight: 15,
                descriptor:
                  "A real percentage with its six-month trend, protected selling time actually scheduled, and any ending decision dated.",
              },
              {
                criterion: "Systems progress is honest",
                weight: 15,
                descriptor:
                  "What is genuinely documented and delegated versus what remains in the writer's head, with the two-week test run or dated. Claiming independence not yet earned scores low.",
              },
              {
                criterion: "Money structure is concrete",
                weight: 15,
                descriptor:
                  "Accounts, a real tax percentage, a salary figure and date, and a reserve target against its current state. Profitability findings with figures and one dated decision.",
              },
              {
                criterion: "The failure case is named",
                weight: 10,
                descriptor:
                  "A specific circumstance traced to what actually happens. Claiming nothing would break scores zero here.",
              },
            ],
          },
        },
      ],
    },
  ],
};
