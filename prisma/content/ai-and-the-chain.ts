import type { ContentCourse } from "./types";

/**
 * AI Meets Crypto — where the AI pillar meets the academy's core.
 *
 * Uses AI as an assistant for on-chain research and learning, and confronts
 * the new scam surface AI creates head-on. Written in the house's risk-first,
 * verify-it-yourself voice: AI is a fast research assistant that lies with a
 * straight face, and crypto is irreversible — so the two together demand more
 * verification, not less. Taught by the on-chain analyst.
 */
export const aiAndTheChain: ContentCourse = {
  slug: "ai-and-the-chain",
  title: "AI Meets Crypto: Assistants, Analysis and Red Flags",
  subtitle:
    "Put AI to work on your crypto research and learning — and see clearly how the same tools are being turned into better scams.",
  description: `AI and crypto are colliding, and most people are meeting that collision unprepared — trusting an AI's confident take on a token, or getting caught by a scam that AI made frighteningly convincing.

This course prepares you for both sides. You'll use AI as a genuine research and learning assistant for on-chain work — decoding jargon, drafting explorer queries, sketching an analysis to verify yourself. And you'll face the harder half squarely: how AI supercharges scams, and the verification habits that keep you safe when the money is irreversible.

It assumes you've done AI From Zero and understand self-custody. No price calls, no bot that "prints money" — those are the trap, and you'll learn to see it.`,
  categorySlug: "ai-and-applied-tech",
  level: "INTERMEDIATE",
  priceMinor: 0,
  estimatedHours: 9,
  passThreshold: 80,
  instructorEmail: "grace@mabyacademy.com",
  outcomes: [
    "Use AI to decode crypto jargon and speed up your learning safely",
    "Draft on-chain research questions and explorer steps with AI, then verify them",
    "Explain why 'irreversible + confidently wrong' is a dangerous pair",
    "Recognise AI-supercharged scams: deepfakes, cloned voices, fake support",
    "Apply a verification routine before trusting any AI claim about money",
  ],
  modules: [
    // =====================================================================
    {
      title: "AI as a research assistant",
      description:
        "Genuine, safe ways AI speeds up on-chain learning and analysis — always as a draft you verify.",
      lessons: [
        {
          title: "The right job for AI in crypto",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `AI is genuinely useful in crypto — but only for the right jobs. Give it the wrong one and irreversible money meets confident guessing, which is the worst pairing in this whole space.

## What AI is good for here

- **Explaining concepts and jargon.** "Explain what an approval transaction is and why it can be dangerous, like I'm new." Fast, patient, and easy to check against a second source.
- **Decoding the unfamiliar.** Paste a confusing error, a function name, a bit of documentation, and ask what it means — as a starting point.
- **Drafting a research plan.** "What questions should I ask before trusting a new token?" gives you a checklist to work through yourself.
- **Sketching explorer steps.** It can suggest what to look for on a block explorer — which you then go and look at directly.

Notice the pattern: in every case AI produces a **draft or a direction**, and the chain itself is the source of truth. That's the correct division of labour, and it's the same one from AI From Zero — draft with AI, verify with the world. Here the "world" is the block explorer.

## What AI is never for here

- **Telling you what to buy or sell.** It cannot, and this academy never will. A model's "take" on a coin is likely-sounding words, not analysis, and often not even current.
- **Confirming a token is safe.** It has no live view of a contract's real behaviour and will reassure you fluently about a scam.
- **Anything with your keys.** It never needs them and no legitimate use ever will.

## The core tension, stated plainly

AI is confidently wrong sometimes. Crypto is irreversible always. Put those together and a single trusted hallucination can cost you money you cannot get back. That is why, in this domain, AI earns *less* of your trust than anywhere else — and verification earns more.`,
          activity: {
            title: "Sort the jobs",
            prompt:
              "Write two short lists: three crypto tasks you'd happily use AI to assist with, and three you'd never hand to it. For each 'never', write one line on what could go wrong. Getting this boundary clear now is what keeps you safe when you're tired and in a hurry later.",
          },
        },
        {
          title: "Using AI to learn on-chain analysis faster",
          type: "TEXT",
          points: 10,
          body: `On-chain analysis has a steep vocabulary and a lot of tools. AI is an excellent tutor for climbing that curve — provided you keep verifying against the chain itself.

## Turn confusion into understanding

When something on a block explorer makes no sense, AI is a patient explainer:

- "On this transaction, what does an 'internal transaction' mean and why might it matter?"
- "Explain the difference between a token transfer and an approval, and which one drains wallets."
- "What is gas, in plain terms, and why did this transaction cost more than that one?"

Then — always — go back to the explorer and look at the real thing the explanation described. The concept comes from AI; the confirmation comes from the chain.

## Draft the questions of a good analyst

Before trusting any protocol or token, there's a set of questions worth asking. AI can help you build and rehearse that checklist:

- Who can change or upgrade this contract, and can they take funds?
- Where does the yield actually come from — is it real revenue or new deposits?
- How concentrated is the supply? Who holds the most, and can they dump?
- What does the contract let the creator do that the marketing doesn't mention?

AI will draft good questions. It will *not* reliably answer them for a specific live token — that's your job, on the explorer and in the docs. Use it to sharpen the questions, not to skip the investigation.

## A worked pattern

*"I'm looking at a new token. Give me a step-by-step of what to check on a block explorer before trusting it, and what a red flag looks like at each step."*

You get a solid investigation plan. You then execute every step yourself against the real data. The plan is AI's; the verdict is entirely yours.`,
          quiz: {
            title: "AI as assistant",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt:
                  "What is the correct division of labour when using AI for on-chain research?",
                explanation:
                  "AI drafts and explains — concepts, questions, a plan of what to check. The block explorer and primary sources are the truth you verify against. In crypto especially, the model never gets the final word because it can be confidently wrong and the money is irreversible.",
                options: [
                  {
                    text: "AI drafts and explains; you verify everything against the chain itself",
                    correct: true,
                  },
                  {
                    text: "AI gives the verdict; the explorer is only for beginners",
                    correct: false,
                  },
                  {
                    text: "Whichever agrees with your existing hope wins",
                    correct: false,
                  },
                ],
              },
              {
                prompt:
                  "You ask AI whether a specific new token is safe to buy. What's the problem with trusting its answer?",
                explanation:
                  "The model has no live view of the token's real contract behaviour or current state, and it will reassure you fluently about a scam. It also cannot and must not tell you what to buy. Safety is established by checking the contract and data yourself, not by an AI's confident take.",
                options: [
                  {
                    text: "It has no live view of the contract and will sound confident about a scam",
                    correct: true,
                  },
                  {
                    text: "Nothing — if it says safe, it's safe",
                    correct: false,
                  },
                  {
                    text: "It's only a problem for expensive tokens",
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
      title: "The new scam surface",
      description:
        "AI makes fraud cheaper, faster and far more convincing. Here's exactly how — and how to stay ahead of it.",
      lessons: [
        {
          title: "How AI supercharges crypto scams",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `The uncomfortable truth: the same AI that helps you also hands scammers a massive upgrade. Understanding the upgrade is how you stay ahead of it.

## What used to give scams away

For years, obvious scams had tells — broken English, clumsy formatting, a generic "Dear user". Those tells are gone. AI writes flawless, personalised, native-sounding messages at zero cost and infinite scale.

## The new arsenal

- **Perfect phishing.** Flawless emails and DMs, tailored to you, impersonating a project, an exchange, or this academy — with no language errors to give them away.
- **Deepfake video.** Convincing videos of founders, celebrities or officials announcing a fake "giveaway" or "double your crypto" event. The face and voice are real; the person never said it.
- **Cloned voices.** A few seconds of someone's audio is enough to fake a call from a "friend" or "family member" in urgent need of crypto.
- **Fake support at scale.** AI-run chat agents posing as helpful support in project channels, patiently walking you toward connecting your wallet or revealing your phrase.
- **Fake everything else.** Polished whitepapers, fake reviews, entire fabricated communities of "happy users", generated in minutes.

## Why the old rules still win

Every one of these attacks scale and polish, not the underlying con. The con is always the same: get you to send crypto, connect your wallet to something malicious, or reveal your seed phrase. So the defences from Crypto From Zero still hold — they just matter more now:

- **Nobody legitimate ever needs your seed phrase.** Not a slicker message, not a video of the founder, not a voice that sounds like your brother. The request itself is the attack.
- **Irreversible means verify before, never after.** There is no undo. The check has to happen before you act.
- **A real face or voice proves nothing now.** Identity can be faked; on-chain facts and official channels you reach independently cannot be so easily.`,
          activity: {
            title: "Update your scam radar",
            prompt:
              "Write down the last suspicious message or offer you saw in crypto. Now reimagine it upgraded by AI — flawless writing, a deepfake video, a cloned voice. Would your old instinct still have caught it? Write the one check that would catch it regardless of how polished it looks.",
          },
        },
        {
          title: "Deepfakes, fake founders and 'AI trading bots'",
          type: "TEXT",
          points: 10,
          body: `Three AI-era traps deserve their own warning, because they're catching careful people right now.

## The deepfake giveaway

A polished video of a well-known founder or celebrity: "Send 1 ETH to this address and we'll send 2 back." The video is fake, generated from real footage. **No legitimate giveaway ever asks you to send crypto first.** "Send to receive" is a scam every single time, no matter whose face is on screen. The realistic video is the upgrade; the con underneath is ancient.

## The cloned-voice emergency

A call or voice note from a "friend" or "relative", voice cloned from a snippet online, urgently needing crypto for an emergency. Urgency plus a familiar voice is engineered to bypass your judgement. **Verify through a separate channel** — call the real person back on their known number — before doing anything. Real emergencies survive a two-minute check; scams don't.

## The 'AI trading bot' that prints money

The signature scam of this era: a bot or platform promising "AI-powered" guaranteed returns. Deposit funds, watch a dashboard show gains, then discover you can't withdraw — the dashboard was a picture and the money was gone on deposit.

Hold two truths together:

- **No system reliably predicts prices.** If one did, it would be run quietly by its owners, not sold to you. "AI" is just this decade's word for the same impossible promise.
- **Guaranteed returns are a lie by definition.** Real markets carry real risk. Anyone removing the risk is removing your money.

This is where the whole academy converges: survive first, verify yourself, and remember nobody here — no course, no mentor, no bot — will ever tell you what to buy or promise you a return. **The promise itself is the red flag.**

## The through-line

Every AI scam is old fraud in a better costume. Judge the *ask*, never the packaging: if it wants your phrase, your funds up front, or your wallet connected to something you can't verify, the polish is irrelevant.`,
          quiz: {
            title: "Red flags",
            passScore: 80,
            maxAttempts: 4,
            questions: [
              {
                prompt:
                  "A realistic video of a famous founder says: 'Send 1 ETH to this address and receive 2 back.' What is this?",
                explanation:
                  "A scam, every time. 'Send crypto to receive more' is never legitimate, and AI deepfakes now put a real-looking face and voice on the old con. The realistic video changes nothing about the ask underneath.",
                options: [
                  {
                    text: "A deepfake scam — 'send to receive' is always fraud, whoever appears to say it",
                    correct: true,
                  },
                  {
                    text: "A real promotion, since the founder is clearly on camera",
                    correct: false,
                  },
                  {
                    text: "Worth a small test amount to see if it works",
                    correct: false,
                  },
                ],
              },
              {
                prompt:
                  "A platform advertises an 'AI trading bot' with guaranteed daily returns. What should you conclude?",
                explanation:
                  "No system reliably predicts prices — if one did, its owners would use it quietly, not sell access. Guaranteed returns are a contradiction in a real market. 'AI' is just the current label on an old impossible promise, and the promise itself is the red flag.",
                options: [
                  {
                    text: "It's a scam — guaranteed returns are impossible and the promise is the red flag",
                    correct: true,
                  },
                  {
                    text: "AI has probably solved trading; worth a deposit",
                    correct: false,
                  },
                  {
                    text: "Safe as long as the dashboard shows gains",
                    correct: false,
                  },
                ],
              },
              {
                prompt:
                  "You get an urgent voice note from a 'relative' needing crypto now. It sounds just like them. What's the right move?",
                explanation:
                  "Voices can be cloned from seconds of audio, and urgency is engineered to bypass judgement. Verify through a separate, known channel — call them back on their real number — before acting. A genuine emergency survives a two-minute check.",
                options: [
                  {
                    text: "Verify on a separate known channel before doing anything",
                    correct: true,
                  },
                  {
                    text: "Send it immediately — the voice is proof enough",
                    correct: false,
                  },
                  {
                    text: "Reply asking them to confirm by voice again",
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
      title: "A verification routine you keep",
      description:
        "Turn everything into a fixed habit that runs before you ever trust an AI claim about money.",
      lessons: [
        {
          title: "The check-before-you-act routine",
          type: "TEXT",
          points: 10,
          body: `Safety in this space is not intelligence; it's routine. A fixed sequence you run every time, especially when you're excited or rushed — the two states scams are built to exploit.

## Before trusting any AI claim about money

1. **Is this checkable and consequential?** If it's a number, a name, a source, a contract address, or anything you'll act on — it must be verified, not trusted.
2. **Go to the primary source.** The block explorer, the official documentation, the project's verified channel that you reached independently. Not another AI, and not a link the message handed you.
3. **Confirm the ask against the unbreakable rules.** Does it want your seed phrase? Funds up front? Your wallet connected to something you can't verify? Any yes is a stop, whatever the packaging.
4. **Slow down on urgency.** Manufactured urgency is the scammer's main tool and AI's easiest trick. A real opportunity or emergency survives a ten-minute pause. A scam needs you to skip it.

## Before acting on anything irreversible

- Re-read the address or action. On-chain is final; there's no support line to reverse it.
- Ask what you'd lose if the AI's explanation, or the counterparty, turned out to be wrong. If the answer is "money I can't get back", the verification bar goes up, not down.

## The one sentence to keep

**AI is a fast assistant that sometimes lies with a straight face; crypto is money that can't be clawed back. Draft with the assistant, decide with the chain.**

Internalise that and you're safer with both than nearly everyone around you — which, as with the rest of this academy, is the whole point.`,
          activity: {
            title: "Write your routine card",
            prompt:
              "Write your personal check-before-you-act routine as a short numbered card you could glance at in ten seconds. Keep it wherever you make crypto decisions. The habit isn't remembering it under pressure — it's having written it down calmly, in advance, so the pressure can't rewrite it.",
          },
        },
        {
          title: "Put the routine to the test",
          type: "ASSIGNMENT",
          points: 20,
          body: `The capstone brings both halves together: you'll show AI used well as a research assistant, and the verification routine applied to catch what AI got wrong or couldn't know. This is the whole course in practice — the assistant and the discipline, working together.`,
          assignment: {
            title: "Research and verify",
            instructions: `Pick any real, well-known crypto concept, protocol, or public token you can research safely (no need to buy or connect anything). Then:

1. **Use AI as an assistant.** Ask it to explain the thing and to draft a checklist of what you'd verify before trusting it. Show the prompt you used and a summary of what it gave you.
2. **Verify against primary sources.** Take at least two specific claims from the AI's output and check them against the block explorer, official docs, or a reputable primary source. Report each claim, where you checked, and whether it held up.
3. **Catch a gap.** Identify at least one thing the AI got wrong, oversimplified, couldn't know (e.g. anything live or current), or stated with unearned confidence.
4. **Apply the scam lens.** Name one way a scammer could use AI around this exact topic, and the single check that would defeat it.
5. **Your routine.** Include the check-before-you-act routine you'd run, in your own words.

Write it so a newcomer could follow your example and be safer for it. Around 400–600 words. This is education and analysis practice — not financial advice, and not a recommendation of anything.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "AI used well as assistant",
                weight: 20,
                descriptor:
                  "A clear, appropriate use of AI to explain and to draft a research checklist — not to get a verdict.",
              },
              {
                criterion: "Real verification",
                weight: 30,
                descriptor:
                  "At least two specific claims checked against genuine primary sources, with honest results.",
              },
              {
                criterion: "Caught a gap",
                weight: 20,
                descriptor:
                  "Identifies something the AI got wrong, oversimplified, or couldn't know — showing real scrutiny.",
              },
              {
                criterion: "Scam awareness",
                weight: 20,
                descriptor:
                  "A concrete AI-era scam scenario for the topic and the specific check that defeats it.",
              },
              {
                criterion: "Usable routine",
                weight: 10,
                descriptor:
                  "A clear personal verification routine that would genuinely reduce risk.",
              },
            ],
          },
        },
      ],
    },
  ],
};
