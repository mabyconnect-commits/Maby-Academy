import type { ContentCourse } from "./types";

/**
 * AI for Income — turning AI skill into paid work.
 *
 * The bridge from "I can use AI" to "someone pays me for what I produce with
 * it". Sits deliberately in the academy's skill-to-income tradition: the money
 * comes from the value delivered to a real person, never from the tool itself.
 * Written to keep the learner honest — AI is leverage on a real skill, not a
 * substitute for having one.
 */
export const aiForIncome: ContentCourse = {
  slug: "ai-for-income",
  title: "AI for Income: Turn the Skill Into Work",
  subtitle:
    "Package what AI lets you do into a service people actually pay for — priced on the value you deliver, not the tool you used.",
  description: `Knowing how to use AI is not a business. Plenty of people can prompt a chatbot; almost none of them earn from it, because they never turned the ability into an offer someone would pay for.

This course closes that gap. You'll find a service you can deliver with AI leverage, define it so a buyer instantly understands it, price it on outcomes rather than effort, and build a simple delivery process that stays reliable and honest. It builds directly on AI From Zero — bring that foundation.

No get-rich-quick promises. The money here comes from real value delivered to a real person. AI just lets you deliver more of it, faster.`,
  categorySlug: "ai-and-applied-tech",
  level: "INTERMEDIATE",
  priceMinor: 0,
  estimatedHours: 10,
  passThreshold: 80,
  instructorEmail: "mabi@mabyacademy.com",
  outcomes: [
    "Choose an AI-leveraged service that matches a real skill you have",
    "Write an offer a buyer understands and wants in one read",
    "Price on the value delivered, not the hours or the tool",
    "Run a delivery process that keeps quality high and honest",
    "Land a first paid or pilot client with a clear, ethical pitch",
  ],
  modules: [
    // =====================================================================
    {
      title: "From ability to offer",
      description:
        "Why 'I can use AI' earns nothing on its own, and how to turn it into something sellable.",
      lessons: [
        {
          title: "The gap between using AI and earning from it",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `There is a hard truth at the start of this course: being good with AI is not rare enough to pay for by itself. Millions of people can open a chatbot. Nobody pays for access to a tool they already have.

## What people actually pay for

They pay for an **outcome they can't easily get themselves** — a problem solved, time saved, a result delivered. AI is how you produce that outcome faster or better. It is the leverage, not the product.

Compare two people:

- *"I can use AI to write."* — sells nothing. So can the buyer.
- *"I turn your messy meeting recordings into clean, decision-ready summaries your team reads in two minutes, delivered same day."* — sells, because it names an outcome, a buyer, and a result.

The AI is invisible in the second one. That's correct. The buyer is paying for the summary and the time saved, not the software.

## AI amplifies a skill — it doesn't replace one

AI makes a competent writer faster, a competent analyst sharper, a competent marketer more productive. It does not make a non-writer a writer, because someone still has to judge whether the output is any good, fix what's wrong, and stand behind it. That judgement is the skill you're actually selling. If you have none in the area, you can't tell good output from bad — and neither can your client, until it fails.

So the honest starting question isn't "what can AI do?" It's **"what am I already at least decent at, that AI can help me do more of?"**`,
          activity: {
            title: "List your real skills",
            prompt:
              "Write down three things you're genuinely at least competent at — from work, a hobby, past jobs, anything. Beside each, note one way AI could help you do more of it, faster. You're looking for the overlap between a real skill and AI leverage. That overlap is where your income lives.",
          },
        },
        {
          title: "Choosing a service you can actually deliver",
          type: "TEXT",
          points: 10,
          body: `You don't need a clever idea. You need a boring, useful service you can deliver reliably. Reliability beats novelty every time someone is paying.

## A good first service is

- **Narrow.** "Social media help" is vague. "I write a month of LinkedIn posts for busy founders from one 30-minute call" is a service. Narrow is easier to sell, deliver and improve.
- **Outcome-shaped.** Named by the result the buyer gets, not the task you perform.
- **Repeatable.** You can do it again and again without reinventing it, which is where AI leverage pays off.
- **Inside your judgement.** You can tell whether the output is good, because you already understand the area.

## Some honest examples

- Turning long recordings, calls or documents into clean summaries or notes
- Drafting and editing routine business writing — listings, descriptions, replies, FAQs
- Repurposing one piece of content into many formats for a creator or business
- First-draft research briefs a busy person refines (with sources verified)
- Cleaning up and organising messy documents or data into usable shape

None of these are glamorous. All of them save someone real time, which is exactly why they pay.

## The test before you commit

Ask: *Could I deliver this ten times this month at a quality I'd put my name on?* If yes, it's a service. If you're not sure you could tell good from bad in the output, pick something closer to what you already know — that gap is where reputations get destroyed.`,
          quiz: {
            title: "Finding the offer",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "Why does 'I can use AI to write' earn nothing on its own?",
                explanation:
                  "Buyers pay for outcomes they can't easily get themselves, not for access to a tool they already have. The ability to use AI is common; a specific, reliably-delivered result is what people pay for.",
                options: [
                  {
                    text: "It names a tool, not an outcome — and the buyer already has the tool",
                    correct: true,
                  },
                  {
                    text: "AI writing is never good enough to sell",
                    correct: false,
                  },
                  {
                    text: "Writing services are illegal to sell",
                    correct: false,
                  },
                ],
              },
              {
                prompt:
                  "Which is the strongest first service to sell with AI leverage?",
                explanation:
                  "A narrow, outcome-shaped, repeatable service inside your judgement is easiest to sell and deliver reliably. Broad or vague offers are hard to price and hard to deliver consistently, and selling in an area you can't judge risks shipping bad work you can't even see.",
                options: [
                  {
                    text: "'A month of LinkedIn posts for busy founders from one 30-minute call'",
                    correct: true,
                  },
                  {
                    text: "'General social media and marketing help'",
                    correct: false,
                  },
                  {
                    text: "'Anything you need done with AI'",
                    correct: false,
                  },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Package, price, deliver",
      description:
        "Turn the service into an offer a buyer wants, priced on value, delivered through a process that stays reliable.",
      lessons: [
        {
          title: "Writing an offer people understand in one read",
          type: "TEXT",
          points: 10,
          body: `A buyer decides in seconds whether your offer is for them. If they have to work to understand it, you've lost them. A clear offer answers four questions fast.

## The four questions

**Who is it for?** Name the buyer. "Busy founders", "Etsy sellers with 20+ listings", "coaches who hate writing". Specific beats broad — the reader should think "that's me".

**What do they get?** The concrete deliverable and the outcome. "Ten polished product descriptions that sound like your brand and are ready to publish."

**Why does it matter?** The pain it removes or time it saves. "So you stop losing evenings to writing you dread and never finish."

**What does it cost, and how does it work?** Price, turnaround, and the simple steps. No mystery.

## Put it in one paragraph

*"For Etsy sellers drowning in listings: I write ten polished, on-brand product descriptions from your rough notes, ready to publish, in three days. You fill a short form, I deliver a first draft in 48 hours, and you get one round of edits. $X."*

A reader knows in one pass whether they want it. That clarity does more selling than any clever copy.

## Be honest about AI

You don't need to hide that you use AI, and you don't need to advertise it either — buyers care about the result. But never claim a human wrote something a model drafted if a client is paying specifically for human authorship, and never pass off unverified AI output as checked fact. Your reputation is the asset. One "you sent me made-up nonsense" undoes ten good deliveries.`,
          activity: {
            title: "Draft your one-paragraph offer",
            prompt:
              "Write your offer as a single paragraph answering all four questions — who, what, why, and cost/how. Then read it aloud to someone and ask: 'Do you understand what I'm selling and who it's for?' If they hesitate, it's not clear enough yet. Rewrite until they don't.",
          },
        },
        {
          title: "Pricing on value, not on effort",
          type: "TEXT",
          points: 10,
          body: `The instinct is to price by how long something takes you. That instinct will keep you poor, because AI just made your work faster — pricing by hours means the better you get, the less you earn. Price on the value to the buyer instead.

## Why hourly thinking fails here

If a summary saves a manager three hours of their time and helps them make a better decision, its value to them has nothing to do with whether it took you twenty minutes or two. Charging "twenty minutes of my time" leaves almost all the value on the table — and quietly punishes you for being efficient.

## Anchor to the outcome

Ask what the result is worth to the buyer:

- Time saved — how many hours, at what their time is worth
- Money made or protected — more sales, fewer errors, less rework
- Pain removed — the dread, the delay, the thing they keep not doing

Price a comfortable distance below that value and you're still a bargain to them while earning properly.

## Practical ways to start

- **Package, don't hourly.** A fixed price for a defined deliverable. The buyer knows the cost; you keep the efficiency gains.
- **Tiered.** Basic / better / best. Many buyers pick the middle, and the top tier makes the middle look reasonable.
- **Price, then test.** Set a number, offer it, and adjust. If nobody hesitates, you're too cheap. If everyone balks, ease off or add value.

## The honest floor

Never price below what lets you deliver quality without resenting it. Cheap work you resent becomes bad work, and bad work costs you the reputation that is your whole business. It is fine — often wise — to start with one lower-priced pilot client to build proof. It is not fine to build a business on prices that force you to cut corners.`,
          quiz: {
            title: "Offer and pricing",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt:
                  "Why is pricing by how long the work takes you a poor model once AI speeds you up?",
                explanation:
                  "AI makes delivery faster, so hourly pricing means better efficiency earns you less — the opposite of what you want. Value-based pricing anchors to what the result is worth to the buyer, so you keep the gains from working smart.",
                options: [
                  {
                    text: "It means getting faster earns you less; value to the buyer is what you should price on",
                    correct: true,
                  },
                  {
                    text: "Hourly pricing is against the platform's rules",
                    correct: false,
                  },
                  {
                    text: "Buyers always refuse to pay by the hour",
                    correct: false,
                  },
                ],
              },
              {
                prompt:
                  "A client is paying specifically for verified, human-checked research. What's the ethical line?",
                explanation:
                  "Never pass off unverified AI output as checked fact, and never misrepresent what was human-authored when that's what's being bought. Reputation is the whole asset — one delivery of made-up 'facts' undoes many good ones.",
                options: [
                  {
                    text: "Verify the output as promised and be honest about the process",
                    correct: true,
                  },
                  {
                    text: "Deliver the raw AI output quickly; it usually sounds right",
                    correct: false,
                  },
                  {
                    text: "Hide that AI was involved and hope it's fine",
                    correct: false,
                  },
                ],
              },
            ],
          },
        },
        {
          title: "A delivery process that stays reliable",
          type: "TEXT",
          points: 10,
          body: `Selling once is luck. Selling repeatedly needs a process — a repeatable path from "client says yes" to "client is delighted" that protects quality when you're busy or tired.

## The shape of a good process

**Intake.** A short form or call that gets you exactly what you need to start — no back-and-forth later. The clearer your intake, the better everything downstream.

**Draft with AI.** Your prompt, your context, your judgement. This is where the leverage lives, but it produces a draft, never a deliverable.

**Edit as the professional.** You cut, fix, sharpen and fact-check. This is the step that separates you from someone who just forwards raw output. Never skip it.

**Verify what matters.** Anything checkable and consequential — names, numbers, claims, sources — gets confirmed before it leaves your hands. (Straight from AI From Zero: draft with AI, verify with the world.)

**Deliver and refine.** Send it in a clean, usable form, with one round of edits offered. The edit round turns a good delivery into a client who comes back.

## Build reusable assets

The second time you deliver, you shouldn't start from scratch. Save your best prompts, your intake form, your checklist. Over a few clients you build a small system that makes each job faster and more consistent — that compounding is the real business.

## Protect quality under load

The danger point is when you're busy: the temptation is to skip the edit and verify steps and ship raw output. That's exactly when reputations die. Build the checklist so those steps are non-negotiable, busy or not.`,
          activity: {
            title: "Map your five steps",
            prompt:
              "Write your delivery process as five short steps from 'yes' to 'delighted', with the one thing you must do at each. Mark the two steps you'd be most tempted to skip when busy — those are the ones to make non-negotiable. A process on paper is what keeps quality steady when you're stretched.",
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "The first client",
      description:
        "Getting proof on the board — an honest pitch, a first delivery, and the reputation you build from it.",
      lessons: [
        {
          title: "Landing your first paid or pilot client",
          type: "TEXT",
          points: 10,
          body: `The hardest client is the first, because you have no proof yet. The way through is not a bigger promise — it's a smaller, safer ask, delivered honestly.

## Start where trust already exists

Your first client is usually not a stranger. It's someone who already knows you — a former employer, a small business you use, someone in your community with the exact problem your service solves. Warm beats cold every time when you have no track record.

## Make the first one low-risk for them

- Offer a **pilot** — a smaller version at a lower price (or free for the very first, in exchange for feedback and permission to use it as an example). You're buying proof, not just cash.
- Be specific about what they'll get and when. Certainty lowers the barrier.
- Make it easy to say yes: "Can I do X for you this week and you tell me honestly if it's useful?"

## The honest pitch

Lead with their problem, not your tools:

*"I noticed you spend a lot of time on [thing]. I've built a way to do it faster and cleaner. Let me do one for free this week — if it's useful, we can talk about doing it regularly."*

No hype, no "AI-powered revolution". A real problem, a concrete offer, a low-risk first step.

## Turn one delivery into the next three

After a good first job, ask for two things: a short testimonial, and whether they know one other person with the same problem. A delivered result plus a warm word from a real person is worth more than any advert. That's how a first client quietly becomes a pipeline.

## The reminder that keeps you honest

This platform's rule holds in your own business too: **this is education and skill, not a promise of riches.** Deliver real value to real people, protect your reputation like the asset it is, and let it compound. That's slower than the fantasy and far more durable.`,
          activity: {
            title: "Name three warm leads",
            prompt:
              "Write down three specific people or businesses who already know you and have the problem your service solves. Beside each, draft the one-sentence honest pitch you'd send them. Then — this is the point — actually send one this week and note what happens.",
          },
        },
        {
          title: "Your service, ready to sell",
          type: "ASSIGNMENT",
          points: 20,
          body: `This is the capstone. You'll assemble everything into a service you could genuinely take to a client this week — the offer, the pricing, the process, and your first pitch. Done well, you finish this course not with notes but with a business you can start.`,
          assignment: {
            title: "Your AI service, on one page",
            instructions: `Put your whole service on one page, ready to use. Submit:

1. **The service.** What you deliver, for whom, and the real skill of yours it draws on. One or two sentences.
2. **The offer paragraph.** Your one-paragraph offer answering who / what / why / cost-and-how, clear enough that a stranger gets it in one read.
3. **Your price and reasoning.** The number, and why — anchored to the value to the buyer, not your hours.
4. **Your delivery process.** Five steps from 'yes' to 'delighted', naming where AI drafts, where you edit, and where you verify.
5. **Your first pitch.** The exact honest message you'll send to a specific warm lead, plus who that lead is and why they fit.

Write it so you could act on it tomorrow. Around 400–600 words.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Viable service",
                weight: 20,
                descriptor:
                  "A narrow, deliverable service tied to a real skill — not vague or beyond the learner's judgement.",
              },
              {
                criterion: "Clear offer",
                weight: 25,
                descriptor:
                  "The offer paragraph answers who/what/why/cost in one read; a stranger would understand it.",
              },
              {
                criterion: "Value-based pricing",
                weight: 20,
                descriptor:
                  "A specific price with reasoning anchored to buyer value rather than hours or the tool.",
              },
              {
                criterion: "Reliable process",
                weight: 20,
                descriptor:
                  "A five-step process that explicitly includes editing and verification, not raw output shipped.",
              },
              {
                criterion: "Honest, specific pitch",
                weight: 15,
                descriptor:
                  "A concrete pitch to a real warm lead, leading with their problem and low-risk, with no hype.",
              },
            ],
          },
        },
      ],
    },
  ],
};
