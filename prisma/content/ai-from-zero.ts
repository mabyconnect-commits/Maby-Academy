import type { ContentCourse } from "./types";

/**
 * AI From Zero — the free AI foundation course.
 *
 * The AI equivalent of Crypto From Zero: written to make a complete beginner
 * *safe and useful* with AI before it makes them clever. The order is
 * deliberate — how these tools actually work, and how they fail, come before
 * any productivity tricks, because the most common way a beginner gets burned
 * by AI is not a missed feature; it is trusting a confident answer that was
 * wrong, or pasting something private into a box they didn't understand.
 */
export const aiFromZero: ContentCourse = {
  slug: "ai-from-zero",
  title: "AI From Zero: Think, Prompt, Verify",
  subtitle:
    "Use everyday AI tools well — get real work out of them, catch their mistakes, and never hand over what you shouldn't.",
  description: `Everyone is suddenly using AI, and most people are using it badly — trusting answers that are wrong, pasting in things they shouldn't, or giving up after one lazy prompt and deciding "it doesn't work".

This course fixes that first. You'll learn what a language model actually is, why it makes things up, and how to prompt it so it does useful work. By the end you'll be able to get a real task done with AI, check its output before you rely on it, and know exactly what should never go into the box.

No hype, no "AI will replace you" fear. Just a tool, understood well enough to use it with your eyes open.`,
  categorySlug: "ai-and-applied-tech",
  level: "BEGINNER",
  priceMinor: 0,
  estimatedHours: 8,
  passThreshold: 80,
  instructorEmail: "mabi@mabyacademy.com",
  outcomes: [
    "Explain in plain language what an AI chatbot is actually doing",
    "Write a prompt that gets useful output instead of a vague paragraph",
    "Spot a hallucination and verify a claim before you rely on it",
    "Know what is never safe to paste into an AI tool",
    "Turn a real task you do each week into an AI-assisted workflow",
  ],
  modules: [
    // =====================================================================
    {
      title: "What AI actually is",
      description:
        "The mental model that makes everything else make sense — and the one failure mode you must never forget.",
      lessons: [
        {
          title: "Welcome — a tool, not an oracle",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `AI is the most useful tool most people have ever been handed and the easiest one to misuse. This course asks for about eight focused hours. Give it those hours and you'll finish able to get real work out of these tools while catching the mistakes that trip up everyone else.

## What you'll be able to do

- Explain what an AI chatbot is actually doing, in plain language
- Write prompts that produce useful output instead of vague filler
- Catch a confident wrong answer before it costs you
- Know exactly what must never be pasted into an AI tool

## What this course is not

It is not a tour of forty apps that will be gone by next year. The tools change monthly; the way they work, and the way they fail, does not. Learn that once and every new tool is just a new door on the same house.

## One rule, stated once and never softened

**An AI tool is not a source of truth. It is a source of drafts.** Everything it gives you is a starting point to be checked, never a final answer to be trusted. You will understand exactly why by the end of this module — and once you do, you will be safer with AI than almost everyone around you.`,
          activity: {
            title: "Name the task",
            prompt:
              "Before you read on, write down one task you do most weeks that involves words — writing a message, summarising something, drafting a plan, explaining an idea. You'll rebuild that exact task with AI by the end of the course. Keep it small and real.",
          },
        },
        {
          title: "How a language model works, without the maths",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `Forget the word "intelligence" for a moment. Start with what the machine is really doing.

An AI chatbot has read an enormous amount of text. From all of it, it has learned one narrow skill extremely well: given some words, predict what word tends to come next. That is the whole engine. It runs that prediction again and again, one word at a time, and the result reads like fluent writing.

That is not a trick — it genuinely produces useful language. But notice what it means.

## It is predicting, not looking up

When you ask a question, the model is not searching a database of facts and returning the right one. It is generating the most *likely-sounding* continuation of your question. Most of the time the likely-sounding answer is also the correct one, because true statements are common in what it read. But "likely-sounding" and "true" are not the same thing, and when they come apart, the model follows likely-sounding every time.

## Why it sounds so confident

The model has no sense of its own certainty. A wild guess and a rock-solid fact come out in the same calm, fluent voice. There is no wobble, no "I think", no tell. This is the single most important thing to internalise: **confidence in the output tells you nothing about whether it is right.**

## Why the same question gives different answers

Ask the same thing twice and you may get two different replies. That is expected — it is choosing among likely continuations, not reciting a fixed record. Useful to know when someone insists "the AI told me X" as if X were settled.

## What this buys you

Understanding this one mechanism explains everything the tool does well and everything it does badly. It writes and rephrases beautifully. It reasons through familiar patterns well. And it will, with total confidence, invent a fact, a quote, a source or a number that does not exist — because a plausible-sounding one was the likely next words.`,
          activity: {
            title: "Catch it guessing",
            prompt:
              "Ask an AI chatbot something specific from your own world that you already know the answer to — a local detail, a date, a fact about your field. Then ask it for a source. Note what happens: did it answer confidently? Was it right? Could it actually back up the claim? You're training your eye, not testing the machine.",
          },
        },
        {
          title: "Hallucinations: the failure that matters most",
          type: "TEXT",
          points: 10,
          body: `When an AI states something false as if it were true, that's called a hallucination. It is not a rare bug. It is a direct, permanent consequence of how the tool works, and no version will ever remove it entirely.

## What hallucinations look like

- A citation to a study, book or article that does not exist
- A quote attributed to someone who never said it
- A confident wrong number — a statistic, a price, a conversion
- A made-up feature, function or step that sounds plausible
- A legal, medical or financial "fact" that is simply incorrect

They are dangerous precisely because they are well-formed. A hallucination doesn't look like an error. It looks exactly like the correct answers around it.

## Where they bite hardest

The risk is highest exactly where it costs the most: anything specific and checkable that you *cannot* personally check. Names, numbers, dates, sources, quotes, laws, dosages, code that touches money. The more precise and consequential the claim, the more you must verify it before acting.

## The habit that protects you

For anything that matters, treat every AI output as a claim from a fast, confident, well-read colleague who sometimes makes things up and never admits it. You would not forward that colleague's answer to your boss without checking it. Same here.

There is a full lesson on how to verify later. For now, just carry the instinct: **if it matters and it's checkable, check it.**`,
          quiz: {
            title: "How AI works",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt:
                  "When you ask an AI chatbot a factual question, what is it primarily doing?",
                explanation:
                  "A language model generates the most likely-sounding continuation of your text, one word at a time. It is not looking up a stored fact. Usually the likely answer is also correct — but when they diverge, it follows what sounds likely, which is why it can state falsehoods fluently.",
                options: [
                  {
                    text: "Predicting likely next words, which usually but not always matches the truth",
                    correct: true,
                  },
                  {
                    text: "Searching a verified database and returning the matching fact",
                    correct: false,
                  },
                  {
                    text: "Copying the closest answer it memorised word-for-word",
                    correct: false,
                  },
                  {
                    text: "Reasoning from first principles like a human expert",
                    correct: false,
                  },
                ],
              },
              {
                prompt:
                  "The AI gives you a confident, fluent answer with a specific statistic. What does that confidence tell you?",
                explanation:
                  "Nothing. The model produces guesses and facts in the same calm voice — it has no signal of its own certainty. A specific statistic is exactly the kind of checkable claim most likely to be a hallucination, so confidence is never evidence of correctness.",
                options: [
                  {
                    text: "Nothing about whether it is correct — verify the statistic",
                    correct: true,
                  },
                  {
                    text: "That it is very likely correct, because it sounds sure",
                    correct: false,
                  },
                  {
                    text: "That it found a reliable source for the number",
                    correct: false,
                  },
                ],
              },
              {
                prompt: "What is a hallucination?",
                explanation:
                  "A hallucination is the model stating something false as though it were true — an invented source, a wrong number, a made-up quote. It is a built-in consequence of predicting likely text, not a rare glitch, so it can never be fully switched off.",
                options: [
                  {
                    text: "The model presenting false information as if it were true",
                    correct: true,
                  },
                  {
                    text: "The tool crashing or refusing to answer",
                    correct: false,
                  },
                  {
                    text: "The model admitting it does not know something",
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
      title: "Prompting that actually works",
      description:
        "The difference between a vague paragraph and a useful result is almost always the prompt. This is the craft.",
      lessons: [
        {
          title: "The anatomy of a good prompt",
          type: "TEXT",
          points: 10,
          body: `Most disappointing AI output comes from a lazy prompt. "Write me a business plan" gets you a generic template because you gave it nothing to work with. A good prompt does the model's guessing for it.

## Four things a strong prompt gives

**Role.** Tell it who to be. "You are a careful editor who cuts filler" aims the output better than nothing at all.

**Context.** Give it the specifics only you know. Who is this for? What's the situation? What have you already tried? The model cannot read your mind, and a vague prompt forces it to invent the missing details — which is where generic filler and hallucinations come from.

**Task.** Say exactly what you want done, and how much. "Summarise this in five bullet points a busy manager could read in thirty seconds" beats "summarise this".

**Format.** Ask for the shape you want — a table, a list, a short paragraph, a step-by-step. If you don't specify, you get whatever was most likely, which is rarely what you needed.

## Weak prompt vs strong prompt

Weak: *"Give me marketing ideas."*

Strong: *"You are a growth marketer for small businesses. I run a one-person tailoring business in Lagos; my customers are mostly working women aged 25–40 who find me through word of mouth. Give me five low-budget ways to get repeat orders, each with a concrete first step I could take this week. Put it in a table: idea, why it fits my customers, first step."*

Same tool. Completely different result. The second one did the thinking about who, what and how — so the model didn't have to guess.

## The rule

**Specific in, specific out. Vague in, generic out.** Almost every "AI is useless" complaint is really a vague-prompt complaint.`,
          activity: {
            title: "Rewrite a weak prompt",
            prompt:
              "Take the task you named in lesson 1. Write the lazy one-line version of the prompt, then rewrite it with all four parts — role, context, task, format. Run both. Paste the two outputs side by side in your notes and mark the concrete differences you see.",
          },
        },
        {
          title: "Iterating: the conversation is the tool",
          type: "TEXT",
          points: 10,
          body: `Beginners treat AI like a vending machine: one prompt in, one answer out, take it or leave it. People who get real value treat it like a conversation. The first answer is a draft you steer.

## Steering moves that work

- **"Too long — cut it to half the length."**
- **"That's too generic. Make it specific to a Nigerian small business."**
- **"Good, but change the tone — warmer, less corporate."**
- **"Give me three more options, more ambitious than those."**
- **"Why did you recommend that? Walk me through your reasoning."**

Each reply refines the last. You are not starting over; you are shaping.

## Show it what "good" looks like

If you have an example of the output you want — a message you liked, a format that worked before — paste it and say "match this style". Models are far better at imitating a concrete example than following an abstract description of one.

## Ask it to improve your own thinking

Some of the most useful prompts turn the tool back on your work:

- "Here's my plan. What are the three biggest holes in it?"
- "Argue the opposite case as strongly as you can."
- "What am I not thinking of?"

Used this way it becomes a tireless sparring partner — one that, remember, still makes things up, so you weigh its pushback rather than obey it.

## The mindset

You are the editor, always. The AI drafts; you decide. The moment you hand the deciding over to it, you've stopped using the tool and started being used by it.`,
          quiz: {
            title: "Prompting",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt:
                  "You ask 'give me marketing ideas' and get a generic list. What is the most likely fix?",
                explanation:
                  "Generic output almost always traces back to a vague prompt. Adding role, context, task and format — who you are, who the customer is, exactly what you want and in what shape — gives the model the specifics it would otherwise have to invent.",
                options: [
                  {
                    text: "Add context and specifics — who it's for, your situation, the exact output you want",
                    correct: true,
                  },
                  {
                    text: "Try a different AI tool; this one is weak",
                    correct: false,
                  },
                  {
                    text: "Accept it — that's the best the tool can do",
                    correct: false,
                  },
                ],
              },
              {
                prompt:
                  "The first answer is close but too long and a bit generic. What's the best next step?",
                explanation:
                  "The conversation is the tool. Instead of starting over, steer: ask it to cut the length and make it specific to your situation. Each follow-up refines the draft — you are the editor shaping the output.",
                options: [
                  {
                    text: "Reply with steering instructions: shorter, and specific to your situation",
                    correct: true,
                  },
                  {
                    text: "Copy it as-is; asking again is a waste of time",
                    correct: false,
                  },
                  {
                    text: "Start a brand-new chat with the same prompt",
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
      title: "Safe, and put to work",
      description:
        "What never goes in the box, how to verify what comes out, and turning it all into one real workflow you keep.",
      lessons: [
        {
          title: "What never goes into the box",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `An AI tool is a service run by a company on its servers. What you type may be stored, may be reviewed by staff to improve the product, and in some cases may influence future outputs. Treat the box as a public place, not a private diary.

## Never paste

- **Seed phrases, private keys, recovery phrases, passwords.** This academy will never ask for them and neither should any tool. A wallet phrase in a chat box is a wallet phrase you no longer control. (If AI now touches your crypto life, this rule matters more, not less.)
- **Other people's personal data** — customer records, someone's health or financial details, anything you were trusted to keep.
- **Confidential work** — an employer's private documents, code, or contracts, unless you know for certain the tool is approved for it.
- **ID and financial numbers** — bank details, government ID, card numbers.

## Why this matters even with "privacy" settings

Settings help and are worth using, but they can change, be misconfigured, or not cover the case you assumed. The safe habit is at the keyboard, not in a settings menu: if it would harm you or someone else to have it leak, it does not go in.

## A simple test

Before you paste anything sensitive, ask: *"Would I be comfortable if this exact text appeared in public with my name on it?"* If not, redact it first — replace real names, numbers and secrets with placeholders — or don't paste it at all.

## The scam angle

Because AI writes fluent, personalised text at scale, scams are getting better-written and more convincing — flawless emails, fake "support" replies, cloned voices. The old rule holds and matters more than ever: **nobody legitimate needs your seed phrase or password, no matter how polished the message.**`,
          activity: {
            title: "Draw your red line",
            prompt:
              "Write your personal 'never paste' list — the specific things from your own life and work that must never go into an AI box. Keep it to five items and keep it where you'll see it. Naming them now means you won't have to decide in a hurry later.",
          },
          quiz: {
            title: "Using AI safely",
            passScore: 80,
            maxAttempts: 4,
            questions: [
              {
                prompt:
                  "Which of these is safe to paste into a public AI chatbot?",
                explanation:
                  "A rough draft of your own blog post is yours and harmless to share. Seed phrases, a customer's private records, and an employer's confidential contract can all cause real damage if stored or leaked — they never go in the box.",
                options: [
                  {
                    text: "A rough draft of your own blog post, to tighten the wording",
                    correct: true,
                  },
                  {
                    text: "Your wallet's recovery phrase, to ask if it looks valid",
                    correct: false,
                  },
                  {
                    text: "A customer's ID and bank details, to format them into a table",
                    correct: false,
                  },
                  {
                    text: "Your employer's confidential contract, to summarise it",
                    correct: false,
                  },
                ],
              },
              {
                prompt:
                  "An AI-written email from 'support' asks for your seed phrase to 'secure your account'. It is well written and looks official. What do you do?",
                explanation:
                  "Refuse and report it. Better writing does not make a request legitimate — AI just makes scams read more convincingly. No genuine service ever needs your seed phrase, and this academy never will.",
                options: [
                  {
                    text: "Refuse and report it — no one legitimate ever needs a seed phrase",
                    correct: true,
                  },
                  {
                    text: "Provide it, since the message is clearly professional",
                    correct: false,
                  },
                  {
                    text: "Reply asking them to verify who they are first, then send it",
                    correct: false,
                  },
                ],
              },
            ],
          },
        },
        {
          title: "How to verify what AI tells you",
          type: "TEXT",
          points: 10,
          body: `You now know AI can be confidently wrong. Verification is the skill that lets you use it anyway, safely. It doesn't mean checking every word — it means checking the *right* things.

## Decide what needs checking

Sort every output into two piles:

**Low stakes / self-evident** — a brainstormed list, a reworded sentence, a first draft you'll edit anyway. You can see if it's good just by reading it. No external check needed.

**High stakes / checkable fact** — a statistic, a name, a date, a source, a legal or medical or financial claim, code that moves money, anything you'll act on or pass to someone else. These get verified before you rely on them.

## How to verify

- **Facts, numbers, quotes:** confirm against a real source you trust, not another AI. Search for the primary source. If the AI gave a citation, check the citation actually exists and says what it claimed.
- **"Is this real?":** ask the model for its source, then go and find that source yourself. If it can't produce one that checks out, treat the claim as unverified.
- **Advice with consequences:** for anything legal, medical or financial, AI is a way to get oriented and ask better questions — never the final word. Confirm with a qualified human before acting. (On this platform: education, never financial advice.)

## A second pass that helps

Ask the tool to check itself: "Review your last answer for anything that might be inaccurate or unverifiable, and flag it." It won't catch everything, but it often flags its own weakest claims — a useful prompt, not a substitute for your own check.

## The one-line version

**Use AI to draft and to think. Use the world to verify.** Keep those two jobs separate and you get the speed without the risk.`,
          activity: {
            title: "Verify one claim",
            prompt:
              "Ask an AI a factual question in an area you care about, then fully verify one specific claim from its answer against a real, primary source. Write down: the claim, the source you checked, and whether it held up. This is the habit — practise it once deliberately and it becomes automatic.",
          },
        },
        {
          title: "Build one workflow you'll actually keep",
          type: "ASSIGNMENT",
          points: 20,
          body: `Everything so far comes together here. You're going to take one real, recurring task from your own life and turn it into a repeatable AI-assisted workflow — prompted well, verified properly, and safe.

This is the difference between having watched a course about AI and actually using AI. One solid workflow you keep beats fifty tricks you forget.`,
          assignment: {
            title: "Your AI workflow",
            instructions: `Take the weekly task you named in lesson 1 (or a better one you've thought of since) and build a real workflow for it. Submit the following:

1. **The task.** What it is, how often you do it, and what "done well" looks like.
2. **Your prompt.** The actual prompt you landed on, showing role, context, task and format. Include how you refined it if the first version fell short.
3. **The output.** What the AI produced, and what you changed as the editor before using it.
4. **Your verification step.** What in the output needed checking, how you checked it, and what you would never simply trust.
5. **Your safety note.** What you deliberately kept out of the box for this task, and why.

Write it so someone else could follow your workflow and get a good, safe result. Around 300–500 words.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Real, specific task",
                weight: 20,
                descriptor:
                  "A genuine recurring task with a clear definition of 'done well' — not a hypothetical.",
              },
              {
                criterion: "Prompt quality",
                weight: 30,
                descriptor:
                  "The prompt shows role, context, task and format, and there's evidence of refining rather than one lazy line.",
              },
              {
                criterion: "Editing and judgement",
                weight: 20,
                descriptor:
                  "The learner acted as editor — changed, cut or improved the output rather than pasting it as-is.",
              },
              {
                criterion: "Verification",
                weight: 20,
                descriptor:
                  "A concrete, appropriate check on the parts that mattered, with an honest line on what they wouldn't trust.",
              },
              {
                criterion: "Safety",
                weight: 10,
                descriptor:
                  "A sensible account of what was kept out of the box and why.",
              },
            ],
          },
        },
      ],
    },
  ],
};
