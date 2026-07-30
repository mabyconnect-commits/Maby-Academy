import type { ContentCourse } from "./types";

/**
 * Reading the Chain — the free on-chain-analysis foundation.
 *
 * Written for the person who is tired of taking someone else's word for it —
 * who wants to open the ledger and check a claim themselves. The order is
 * deliberate: the analyst's skeptical mindset before any tool, the block
 * explorer before any dashboard, evidence before conclusions. Because the whole
 * point of a public ledger is that you never have to trust anyone; you can look.
 *
 * Authored to enrich the catalogue skeleton that already carries this slug, so
 * it upserts in place and student progress survives.
 *
 * Like the rest of the academy, almost every lesson is a written exercise. You
 * do not become an analyst by reading about analysis. You become one by opening
 * a block explorer and checking something for yourself — which is exactly what
 * these activities make you do.
 */
export const readingTheChain: ContentCourse = {
  slug: "reading-the-chain",
  title: "Reading the Chain: On-Chain Analysis From Zero",
  subtitle:
    "Stop taking people's word for it. Open the public ledger, follow the money, value a protocol by its real usage, and spot the scams — using free tools and your own two eyes.",
  description: `In crypto, almost everyone is trying to sell you a conclusion — this coin will moon, that project is solid, this whale is accumulating. On-chain analysis is the skill that lets you stop trusting the storytellers and check the claims yourself, because on a public blockchain, the evidence is right there for anyone willing to look.

This course teaches you to read that evidence. You'll learn to use a block explorer like a microscope, follow funds across addresses, tell real usage from vanity metrics, judge how a token is actually distributed, and recognise the on-chain fingerprints of rug pulls, wash trading, and manipulation. By the end you'll be able to research a project independently and form your own evidence-based view — the rarest and most valuable skill in a space built on hype.

No paid tools required, no promises about prices. Just the analyst's mindset — skepticism, evidence, and the patience to verify — and the practical ability to read what the chain is actually telling you.`,
  categorySlug: "on-chain-analysis",
  level: "INTERMEDIATE",
  priceMinor: 0,
  estimatedHours: 13,
  passThreshold: 80,
  instructorEmail: "grace@mabyacademy.com",
  outcomes: [
    "Read any transaction, address, and token transfer on a block explorer",
    "Follow funds across addresses and recognise exchanges, mixers, and bridges",
    "Judge how a token is really distributed and spot concentration red flags",
    "Value a protocol by its real usage — revenue, users, activity — not vanity metrics",
    "Recognise the on-chain fingerprints of rug pulls, wash trading, and manipulation",
    "Read exchange flows, stablecoin flows, and smart-money behaviour",
    "Run an independent, evidence-based research process and write it up",
  ],
  modules: [
    // =====================================================================
    {
      title: "Why read the chain yourself",
      description:
        "Before any tool: the analyst's mindset. Why a public ledger means you never have to trust anyone — you can look — and what looking can and can't tell you.",
      lessons: [
        {
          title: "Welcome — trust nothing, verify everything",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `I've spent eight years reading blocks, since before it was a job title. Here's what I learned first: in crypto, almost everyone is selling you a conclusion, and almost none of them will show you the evidence. On-chain analysis is how you stop needing them. The ledger is public. You can check the claim yourself. This course teaches you how.

## What you'll be able to do

- Read any transaction, address, and token transfer on a block explorer
- Follow funds across addresses and recognise exchanges, mixers, and bridges
- Judge how a token is really distributed and spot concentration red flags
- Value a protocol by its real usage, not vanity metrics
- Recognise the on-chain fingerprints of scams and manipulation
- Run an independent research process and reach your own view

## What this course is not

It is not a signal service or a source of price predictions. Nobody here will tell you what to buy. The goal is that you become the kind of person who can investigate a claim, follow the evidence, and reach a conclusion nobody handed you — which is the rarest skill in this entire space.

## The analyst's creed

On a public blockchain, "trust me" is never necessary, because you can verify. Where a normal financial system asks you to trust institutions you can't see into, a blockchain lets you look directly at the record. This course is about using that superpower — trusting nothing, verifying everything, and forming views from evidence rather than from whoever shouted loudest.

## How the lessons work

Opening a page does not complete it. Almost every lesson has an exercise — usually opening a free block explorer and checking something real — and it only counts once you've done it and written up what you found. The write-up is private; nobody grades it or reads it. It exists because you don't become an analyst by reading about analysis. You become one by looking for yourself.`,
          activity: {
            title: "Write down a claim you'll verify",
            prompt:
              "Write down one crypto claim you've heard and taken on faith — 'whales are accumulating', 'this project has real users', 'the team dumped their tokens', anything. Note who told you and whether they showed evidence. By the end of this course you'll be able to check claims like this yourself. Keep it; you'll return to it.",
          },
        },
        {
          title: "The public ledger — everything is visible",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `The single fact that makes on-chain analysis possible is this: most blockchains are radically, permanently public. Every transaction ever made is recorded, visible to anyone, forever. This is the opposite of how people imagine crypto, and it's the foundation of everything in this course.

## Public, permanent, and complete

When someone sends funds on a public chain, that transfer is written to the ledger and stays there: who sent it (by address), who received it, how much, exactly when, and what it cost. Anyone in the world can look it up. There's no login, no permission, no gatekeeper — the entire financial history of the chain is open to inspection. This is genuinely extraordinary. Imagine being able to see every transaction of every bank account in the world, forever. That's roughly what a public blockchain offers, for the assets on it.

## Pseudonymous, not anonymous

The crucial nuance: addresses aren't names. An address is a string of characters, not "John Smith", so at first glance activity is pseudonymous — you can see what an address did, but not immediately who owns it. But this is far weaker privacy than people think. Because everything is public and permanent, patterns of behaviour, connections between addresses, and links to known entities (like exchanges) can often reveal who's behind an address, or at least a great deal about them. Pseudonymity is a thin veil, not a mask, and much of on-chain analysis is the art of seeing through it.

## Why this changes everything

Because the ledger is public, you never have to take anyone's word for an on-chain claim. Did the team really lock their tokens? Look. Did that whale really buy? Look. Is that volume real or faked? Look. The evidence exists, publicly, permanently, for anyone willing to learn to read it. That's the power this course hands you — and almost nobody in crypto actually uses it, which is exactly why those who can have such an edge.`,
          activity: {
            title: "Look at a real transaction",
            prompt:
              "Open a free block explorer (search for the explorer of any major chain). Find any recent transaction — the explorer's homepage lists them. Write down what you can see: the sender and receiver addresses, the amount, the time, the fee. Notice that you needed no permission to see a stranger's transaction. That openness is the foundation of everything here.",
          },
        },
        {
          title: "What on-chain analysis can and can't tell you",
          type: "TEXT",
          points: 10,
          body: `Before you get excited about your new superpower, an honest boundary: on-chain analysis is powerful but limited. Knowing exactly what the chain can and cannot tell you keeps you from the overconfidence that produces bad conclusions — the mark of an amateur is claiming certainty the evidence doesn't support.

## What it can tell you

The chain reliably shows you facts about on-chain activity: what moved, when, between which addresses, for how much, and at what cost. From these facts, skilled analysis can infer a great deal — how a token is distributed, whether funds flowed to an exchange (often a precursor to selling), whether "volume" is real trades or wash trading, whether a contract has dangerous properties, whether a team's tokens are actually locked. These are enormously valuable, and most people never check any of them. On-chain data is ground truth about on-chain events — it's not someone's claim, it's the record itself.

## What it can't tell you

But the chain has hard limits. It usually can't tell you who really owns an address (only patterns and connections that suggest it). It can't tell you why someone did something — a transfer to an exchange might be selling, or moving to a safer venue, or a loan, and the chain doesn't say which. It can't see off-chain reality — the team's actual intentions, a partnership's real substance, what happens in private agreements or centralised systems. And it can't predict the future; it shows what happened, not what will. Analysts who forget these limits overreach, reading certainty and motive into data that only shows action.

## Inference, held humbly

Good on-chain analysis is careful inference from solid facts, held with appropriate humility. You reason from what the chain definitely shows toward what it probably means, always aware that alternative explanations exist and that you're inferring, not knowing. The best analysts distinguish sharply between "the chain shows X" (fact) and "which probably means Y" (inference), and they hold the inference loosely. This discipline — powerful facts, humble conclusions — is what separates real analysis from the confident storytelling that fills crypto.`,
          activity: {
            title: "Separate fact from inference",
            prompt:
              "Take the claim you wrote in lesson 1. Write down: what would the chain be able to show as fact (e.g. 'this address sent tokens to an exchange address'), and what would remain inference (e.g. 'which probably means they intend to sell')? Practise separating the two. Holding this line — solid facts, humble inferences — is the core discipline of an analyst.",
          },
        },
        {
          title: "The analyst's mindset",
          type: "TEXT",
          points: 10,
          body: `On-chain analysis is a skill, but underneath the skill is a mindset — a way of approaching claims that's more important than any specific technique. Cultivating this mindset is most of what turns someone into a real analyst, and it's the opposite of how most people engage with crypto.

## Skepticism as a default

The analyst's default is skepticism — not cynicism (assuming everything is bad), but the refusal to accept claims without evidence. When someone says "smart money is buying" or "this project is thriving", the analyst's instinct isn't to believe or disbelieve, but to ask: what's the evidence, and can I check it? In a space overflowing with hype, paid promotion, and outright lies, this reflexive "show me" is your best protection. Most people believe conclusions that flatter their hopes or come from confident voices; the analyst suspends judgement until the evidence is in. This is uncomfortable — it means often saying "I don't know yet" while others are certain — but it's the foundation of getting things right.

## Following evidence where it leads

The flip side of skepticism is genuine openness to evidence — going where the data leads rather than where you want it to. This is harder than it sounds, because we all have positions we want confirmed: the coin we hold, the thesis we've committed to publicly. The disciplined analyst actively looks for evidence against their view, not just for it, and updates when the chain contradicts them. An analyst who only finds evidence for what they already believe isn't analysing; they're rationalising. The willingness to be proven wrong by the data, and to change your mind, is what makes analysis worth anything.

## Patience and rigour

Finally, the mindset requires patience and rigour — the willingness to actually do the work of checking, tracing, and verifying rather than reaching for a quick conclusion. Real analysis takes time: pulling the transactions, following the flows, considering alternative explanations, checking your reasoning. The temptation is always to shortcut to a satisfying story, but shortcuts are where errors hide. The analysts whose conclusions you can trust are the ones who did the patient, rigorous work — and cultivating that patience, that refusal to shortcut, is as important as any tool. Skepticism, openness to evidence, patience, rigour: build these, and the techniques become powerful. Skip them, and the techniques just help you fool yourself faster.`,
          activity: {
            title: "Catch your own confirmation bias",
            prompt:
              "Think of a crypto position or view you hold and want to be true. Honestly ask: have you been seeking evidence for it, or also against it? Write down one piece of evidence that would challenge your view — and commit to genuinely checking it. Actively looking for evidence against your own position is the hardest and most important analyst habit.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on the analyst's foundations before we pick up the block explorer. These ideas — the public ledger, the limits of on-chain data, the skeptical evidence-driven mindset — run through everything that follows.`,
          quiz: {
            title: "The analyst's foundations",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "What makes on-chain analysis possible in the first place?",
                explanation:
                  "Most blockchains are radically public and permanent — every transaction is visible to anyone, forever, with no permission needed. That open record is the raw material an analyst reads.",
                options: [
                  {
                    text: "Most blockchains are public and permanent, so anyone can inspect every transaction",
                    correct: true,
                  },
                  { text: "Exchanges publish everyone's identity", correct: false },
                  { text: "Regulators share private account data", correct: false },
                  { text: "Blockchains are fully anonymous and hidden", correct: false },
                ],
              },
              {
                prompt: "Why is blockchain activity 'pseudonymous, not anonymous'?",
                explanation:
                  "Addresses aren't names, so activity isn't tied to a real identity at first glance — but because everything is public and permanent, patterns and links to known entities can often reveal who's behind an address. The privacy is a thin veil, not a mask.",
                options: [
                  {
                    text: "Addresses hide names, but public patterns and links can often reveal who's behind them",
                    correct: true,
                  },
                  { text: "It's completely anonymous with no way to trace anyone", correct: false },
                  { text: "Every address shows the owner's real name", correct: false },
                  { text: "Only exchanges can ever see any activity", correct: false },
                ],
              },
              {
                prompt: "Which is something on-chain analysis generally CANNOT tell you?",
                explanation:
                  "The chain shows what moved, when, and between which addresses — facts. It usually can't tell you why (motive) or who really owns an address for certain, and it can't predict the future. Good analysis separates fact from humble inference.",
                options: [
                  { text: "The true motive behind a transaction", correct: true },
                  { text: "How much was transferred", correct: false },
                  { text: "When a transaction happened", correct: false },
                  { text: "Which addresses were involved", correct: false },
                ],
              },
              {
                prompt: "What's the core of the analyst's mindset?",
                explanation:
                  "Skepticism (accept no claim without evidence), genuine openness to where evidence leads (including against your own view), and the patience and rigour to actually verify. Techniques help, but this mindset is what makes analysis trustworthy.",
                options: [
                  {
                    text: "Skepticism, openness to evidence even against your view, and patient rigour",
                    correct: true,
                  },
                  { text: "Believing confident voices in the space", correct: false },
                  { text: "Finding evidence only for what you already believe", correct: false },
                  { text: "Reaching quick conclusions to act fast", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },

    // =====================================================================
    {
      title: "The block explorer, your microscope",
      description:
        "The one free tool that does most of the work. Reading transactions, addresses, token transfers, and fees — the raw literacy all analysis is built on.",
      lessons: [
        {
          title: "Anatomy of a transaction",
          type: "TEXT",
          points: 10,
          body: `The block explorer is the analyst's microscope — a free website that lets you inspect everything on a chain. And the fundamental unit you'll inspect is the transaction. Learn to read one fully and you've learned the alphabet of on-chain analysis; everything else is combinations of this.

## The parts of a transaction

Every transaction on the explorer shows a consistent set of fields. The **sender** (the address that initiated and signed it) and the **receiver** (where it went). The **amount** and asset transferred. The **timestamp** — exactly when it was confirmed. The **fee** paid to the network. A **status** (success or failure). And a unique **transaction hash** — its permanent ID, which you can share so anyone can look up the exact same transaction. These fields are the who, what, when, and how-much of every on-chain event, and reading them fluently is the first skill.

## More than a simple transfer

Simple transfers move an asset from A to B. But many transactions do more — they interact with a smart contract (a program on the chain), which might swap tokens, deposit into a protocol, mint an NFT, or execute complex logic. For these, the explorer shows additional detail: which contract was called, what function, and often a breakdown of the token transfers that happened inside the transaction (a single transaction can move several assets among several addresses at once). Learning to read these richer transactions — to see past "address called contract" to "this was a swap of X for Y" — is where real fluency develops, and it's how you'll later spot swaps, deposits, and manipulation.

## Reading with questions

The skill isn't just identifying fields — it's reading a transaction with questions in mind. Who initiated this? What actually happened (a transfer? a swap? a contract interaction)? Where did the value go? Does anything look unusual? A transaction is a small story, and the analyst reads it as evidence: this address did this thing, at this time, moving this value, there. String enough of these small stories together and you can reconstruct what's happening across a whole protocol or wallet. But it starts here, with the patient ability to open any transaction and understand exactly what it did.`,
          activity: {
            title: "Read a transaction fully",
            prompt:
              "On a block explorer, open any transaction and identify every field: sender, receiver, amount and asset, timestamp, fee, status, and hash. Then determine what actually happened — was it a simple transfer, or an interaction with a contract (a swap, a deposit)? Write down your full reading of the transaction. This fluency is the alphabet of on-chain analysis.",
          },
        },
        {
          title: "Addresses, wallets and pseudonymity",
          type: "TEXT",
          points: 10,
          body: `If transactions are the alphabet, addresses are the characters in the story — the actors whose behaviour you'll analyse. Understanding what an address is, what its page on the explorer reveals, and the limits of its pseudonymity is essential to everything from following the money to judging distribution.

## What an address page shows

Look up any address on the explorer and you get its complete public history: its current balances (of the native coin and every token it holds), and its full transaction history — every transfer in and out, forever. This is remarkable: you can see everything an address has ever done and everything it currently holds. From this alone you can start to characterise an address — is it active or dormant, does it hold many tokens or few, does it interact with certain protocols, does it receive from or send to notable places? An address's history is its behavioural fingerprint, and reading it is a core analytical skill.

## Types of address

Not all addresses are the same, and telling them apart matters. Some are individuals' wallets. Some belong to exchanges (often huge, with constant activity, receiving from and sending to countless users). Some are smart contracts (programs, not people — a protocol, a token, a pool). Some are special: burn addresses (where tokens are sent to be destroyed), team or treasury wallets, deployer addresses. Learning to recognise the type of an address from its behaviour and connections — this looks like an exchange, that's a contract, this is a fresh personal wallet — is crucial, because the same transaction means very different things depending on who the addresses are. A transfer to an exchange is a potential sale; the same transfer between two personal wallets might just be housekeeping.

## The limits of the veil

Remember that an address is pseudonymous — no name attached — but the veil is thin. Because the full history is public, a single link between an address and a real identity (a public donation address, an exchange withdrawal that KYC ties to a person, someone announcing "this is my wallet") can unmask not just that transaction but the address's entire history, past and future. Analysts and firms build large databases labelling addresses with known entities precisely because these links accumulate. So while you often can't immediately name who's behind an address, you can frequently learn a great deal, and sometimes identify them, through the connections their public history reveals. Treat every address as a knowable actor whose story the chain is telling, and pseudonymity as a puzzle to be worked, not a wall.`,
          activity: {
            title: "Profile an address",
            prompt:
              "On the explorer, look up an address (use a sender or receiver from the transaction you examined). Explore its page: its balances and its transaction history. Try to characterise it — active or dormant? Holds many assets or few? Interacts with contracts or just transfers? Does it look like a personal wallet, an exchange, or a contract? Write your profile. Reading an address's history is reading an actor's fingerprint.",
          },
        },
        {
          title: "Reading a token transfer",
          type: "TEXT",
          points: 10,
          body: `Most on-chain analysis involves tokens — the countless assets that live on top of a chain — rather than just the native coin. Reading token transfers, and understanding a token's own page on the explorer, unlocks the analysis of specific projects: their distribution, their holders, their real activity.

## Tokens versus the native coin

The native coin (the chain's own currency, used to pay fees) is handled directly by the chain. Tokens are different: they're managed by a smart contract that keeps its own ledger of who holds how much. So a token transfer is actually an interaction with the token's contract, which updates its internal balances. On the explorer, token transfers appear both in a transaction's detail and on each address's page (as its token transfer history), and each token has its own contract page — a hub of information about that specific token. Understanding that tokens live in contracts, separate from the native coin, explains a lot, including the classic beginner trap of holding a token but no native coin to pay the fee to move it.

## The token's contract page

A token's page on the explorer is a goldmine for analysis. It shows the token's total supply, the number of holders, and — critically — often a list of the top holders and how much each controls. It shows recent transfers of the token. It may show the contract's code and properties. From this single page you can begin to answer vital questions: How concentrated is ownership? Who are the biggest holders? Is supply held by many or few? Is there active transfer activity or is it dead? Much of the distribution and red-flag analysis later in this course starts on a token's contract page, reading these fields with a skeptical eye.

## Following a specific token

Reading token transfers lets you follow a specific asset's movement — watching where a project's tokens flow, which is often more revealing than watching the native coin. You can see the team's tokens move, watch large holders transfer to exchanges (potential selling), observe how tokens spread from initial holders to the wider market, and track whether real users are transacting or whether it's a few wallets shuffling tokens to fake activity. The ability to isolate and follow one token — to filter the noise down to just the asset you care about and read its story — is a key practical skill, and the token's contract page plus its transfer history are where you do it.`,
          activity: {
            title: "Explore a token's contract page",
            prompt:
              "Find a token you're curious about and open its contract page on the explorer. Note what it reveals: total supply, number of holders, the top holders and their share, recent transfer activity. Write down your first impressions — does ownership look concentrated or spread out? Is there real activity? You've just done the opening move of project analysis.",
          },
        },
        {
          title: "Gas, fees and what they reveal",
          type: "TEXT",
          points: 10,
          body: `Every transaction pays a fee to the network, and while fees might seem like mere cost, they carry analytical signal. Understanding fees — what they are, why they vary, and what they reveal — adds another dimension to reading the chain, and helps you interpret activity correctly.

## What the fee is

A transaction fee (often called gas on many chains) pays the network for the work of processing and recording your transaction. The fee generally depends on two things: how complex the transaction is (a simple transfer is cheap; a complex contract interaction costs more) and how congested the network is at that moment (when many people want to transact, fees rise as they compete for limited space). This is why the same action can cost wildly different amounts at different times — you're partly paying for computational work and partly bidding for scarce block space during busy periods. Understanding this explains the fee field on every transaction and why fees spike during frenzies.

## Fees as a signal of activity and urgency

Fees carry information. Network-wide, high fees signal high demand and congestion — lots of people urgently transacting, often during periods of excitement, panic, or intense activity (a hot launch, a market crash, a popular event). So the fee environment is itself a rough gauge of network activity and sentiment; sustained high fees mean the chain is in heavy demand. At the individual level, someone paying an unusually high fee to get their transaction processed fast can signal urgency — they wanted in or out immediately, which around key moments (a launch, a liquidation, a scramble) can be meaningful. Fees are a subtle but real layer of signal about how busy and how urgent on-chain activity is.

## Fees and interpreting behaviour

Fees also help you interpret behaviour sensibly. If an action costs a meaningful fee, tiny or pointless-looking transactions that pay real fees are often not pointless — someone paid to do them, so they had a reason (this matters when spotting manipulation, where wash traders pay real fees to fake activity, revealing it isn't free and organic). Conversely, on cheap chains where fees are negligible, be more suspicious of activity, because faking it costs almost nothing, so high transaction counts can be meaningless. Factoring in the cost of actions — who paid what to do what — sharpens your interpretation of whether activity is genuine, urgent, or manufactured. Fees turn "something happened" into "someone paid this much to make it happen", which is a more useful fact.`,
          activity: {
            title: "Read the fees",
            prompt:
              "On the explorer, look at the fee on a few different transactions — a simple transfer versus a complex contract interaction. Note the difference. Then check the current network fee level (many explorers show a gas/fee tracker) — is the chain busy or quiet right now? Write down what the fees tell you about transaction complexity and overall network activity. Fees are a quiet layer of signal.",
          },
        },
        {
          title: "Your first investigation",
          type: "ASSIGNMENT",
          points: 25,
          body: `Put your block-explorer literacy to work on a real, complete investigation. Graded on thoroughness and on cleanly separating fact from inference — the analyst's core discipline.

Your instructor reads this. There's no 'right answer' about the address you pick; the marks are for how carefully and honestly you read the evidence.`,
          assignment: {
            title: "Investigate an address end to end",
            instructions: `Pick any address on a public chain (a large holder of a token, an address from a transaction you found, anything of interest) and investigate it thoroughly using only a free block explorer. Write up your investigation.

Cover all five:

**1. The address.** Which address you investigated and why you chose it (paste the address so it can be checked).

**2. What it holds.** Its current balances — native coin and notable tokens.

**3. Its behaviour.** A characterisation of its transaction history — active or dormant, what kinds of transactions (transfers, swaps, contract interactions), any patterns you notice.

**4. Its connections.** Notable addresses it interacts with — does it send to or receive from anything identifiable (an exchange, a contract, a notable wallet)?

**5. Fact versus inference.** A clear separation: what the chain definitely shows (facts) versus what you infer it might mean (held humbly, with alternative explanations noted).

Do not include private keys or seed phrases — you're reading public addresses only, never anyone's secrets.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Thorough, accurate reading",
                weight: 40,
                descriptor:
                  "The address's holdings, behaviour, and connections are read carefully and correctly from the explorer, showing real block-explorer fluency rather than a superficial glance.",
              },
              {
                criterion: "Fact separated from inference",
                weight: 35,
                descriptor:
                  "A clean, honest distinction between what the chain shows as fact and what is inferred — with inferences held humbly and alternative explanations acknowledged.",
              },
              {
                criterion: "Genuine curiosity and rigour",
                weight: 25,
                descriptor:
                  "The investigation goes beyond the obvious, follows interesting threads, and reflects the patient, skeptical analyst's mindset rather than reaching for a quick story.",
              },
            ],
          },
        },
      ],
    },

    // =====================================================================
    {
      title: "Following the money",
      description:
        "The classic analyst skill: tracing funds across addresses, linking addresses to real entities, and knowing where the trail goes cold.",
      lessons: [
        {
          title: "Tracing funds across addresses",
          type: "TEXT",
          points: 10,
          body: `The most iconic on-chain skill is following the money — tracing funds as they move from address to address across the chain. Because the ledger is public and permanent, you can follow a trail of value that would be invisible in traditional finance, and this ability underpins investigating hacks, tracking whales, and exposing scams.

## The trail exists

When funds move on-chain, they leave a permanent, public trail: address A sent to B, B sent some to C and some to D, and so on. You can follow this chain of transfers step by step, hop by hop, reconstructing where value flowed. This is possible precisely because of the public ledger — every hop is recorded and visible, so a determined analyst can trace funds through many addresses. This is how stolen funds get tracked after hacks, how analysts follow large holders' movements, and how the flow of money through a scheme gets mapped. The trail is right there; following it is a matter of patience and method.

## Following the flow, hop by hop

Tracing is methodical work. You start at a point of interest — a hack address, a whale's wallet, a token's initial distribution — and follow the outgoing (or incoming) transfers to the next addresses, then repeat, building a map of where funds went. The explorer makes each hop visible; your job is to follow the significant flows, note where funds split (one address sending to many) or pool (many sending to one), and keep track of the branching paths. It can get complex fast — funds split across dozens of addresses, recombine, pass through contracts — so tracing is as much about staying organised and focused on the significant flows as about any single lookup. But fundamentally, it's just following visible transfers, one hop at a time, wherever they lead.

## What tracing reveals

Following the money reveals things that stay hidden in normal finance. You can see where a hacker's stolen funds ultimately went (often toward an exchange or a mixer — more on both soon). You can watch a large holder move funds to an exchange before a price drop, or accumulate quietly across wallets. You can map how a scam collected victims' funds and where the operators sent them. You can trace whether "different" projects or wallets are secretly connected by shared funding. The public trail turns the flow of money into readable evidence, and the analyst who can follow it sees connections and movements that those relying on stories never will. It's the skill that most makes on-chain analysis feel like detective work — because it is.`,
          activity: {
            title: "Follow a trail three hops",
            prompt:
              "Pick an address with clear outgoing transfers. Follow the money: pick a significant outgoing transfer, go to the receiving address, find where it sent funds next, and repeat for at least three hops. Write down the path you traced (the addresses and amounts), and note where funds split or pooled. Notice how you reconstructed a flow that would be invisible in normal finance.",
          },
        },
        {
          title: "Clustering — linking addresses to entities",
          type: "TEXT",
          points: 10,
          body: `A single person or entity usually controls many addresses, and a powerful analytical technique is clustering — grouping addresses that likely belong to the same owner. Clustering turns a scatter of individual addresses into a picture of the real actors behind them, and it's essential to understanding who's really doing what on-chain.

## Why one entity means many addresses

People and organisations rarely use just one address. Individuals spread holdings across multiple wallets (for security, organisation, or privacy); exchanges operate thousands of addresses; projects have deployer, treasury, and operational wallets. So the raw picture — thousands of separate addresses — hides the reality that many are controlled by the same hands. If you analyse addresses individually, you miss that one entity might control what looks like fifty independent wallets, dramatically understating their true holdings or influence. Clustering corrects this by grouping addresses that evidence suggests share an owner, revealing the actual actors behind the addresses.

## How addresses get linked

Analysts link addresses through behavioural and structural clues. Addresses that repeatedly transact with each other, that are funded by the same source, that move in coordinated patterns, or that share certain technical fingerprints, are candidates for the same owner. For example, if a fresh address is funded by, and regularly sends back to, one main wallet, they're plausibly the same person. If a set of addresses all received their initial funds from one source and behave identically, they may be one entity's cluster. This is inference, not certainty — held with the usual humility — but accumulated clues can build a strong case that certain addresses belong together. Firms that label addresses do this at scale, but you can do it manually for a specific investigation.

## What clustering unlocks

Clustering unlocks a truer view of concentration and influence. When you group an entity's addresses, you might find that a token's ownership is far more concentrated than the per-address holder list suggests — what looks like the top holder controlling a modest share might actually be one entity controlling several 'top holders'. You can see the real size of a whale hidden across wallets, the full extent of a team's holdings split up to look distributed, or the coordinated wallets behind a manipulation scheme. Clustering is often what reveals the hidden concentration, coordination, or connection that a naive address-by-address view completely misses — and hidden concentration, as later lessons show, is one of the most important red flags there is. Seeing past individual addresses to the entities behind them is a mark of a serious analyst.`,
          activity: {
            title: "Build a small cluster",
            prompt:
              "Pick an address and look for signs of related addresses: ones it repeatedly transacts with, that it funded, or that fund it. Sketch a small cluster of addresses you suspect might share an owner, and write down the evidence linking them (and why it's inference, not proof). Then note what the cluster would change about your view of that entity's real size or activity. Clustering reveals hidden concentration.",
          },
        },
        {
          title: "Exchanges, hot wallets and on/off ramps",
          type: "TEXT",
          points: 10,
          body: `Exchanges are the most important entities to recognise on-chain, because they're where crypto meets the traditional world (the on- and off-ramps) and because flows to and from them carry strong signal. Learning to identify exchange addresses and interpret exchange flows is one of the most practically useful skills in on-chain analysis.

## Recognising exchange addresses

Exchanges operate distinctive addresses. Their **hot wallets** (used for active deposits and withdrawals) show enormous, constant activity — receiving from and sending to vast numbers of different addresses, holding large balances. Their patterns are unmistakable once you've seen them: a hub with countless connections, unlike a personal wallet's sparse history. Analysts and explorers often label known exchange addresses, so you'll frequently see them tagged, but even unlabelled, an exchange hot wallet's behaviour (huge, hub-like, high-volume) gives it away. Recognising when an address is an exchange is crucial, because it completely changes what a transfer means.

## Why exchange flows signal so much

Flows to and from exchanges are among the most-watched on-chain signals because of what they typically imply. Moving funds **to** an exchange often precedes selling — you generally send an asset to an exchange when you intend to trade or sell it, so large inflows to exchanges can signal intent to sell (potential downward pressure). Moving funds **off** exchanges into private wallets often signals accumulation and holding — taking coins into self-custody to hold rather than sell, reducing available supply on exchanges. So the direction of exchange flows is a rough read on market intent: heavy inflows suggest selling pressure building, heavy outflows suggest accumulation and conviction. This is inference (someone might deposit to an exchange for reasons other than selling), but in aggregate, exchange flows are a genuinely useful sentiment signal, which is why analysts track them closely.

## Ramps and the edge of the chain

Exchanges are also the main on- and off-ramps between crypto and traditional money, which makes them significant for tracing. When funds move to an exchange, the on-chain trail often effectively ends there for the outside analyst — the exchange takes custody, and what happens inside (a sale, a withdrawal to another user, a transfer to fiat) usually isn't visible on-chain. This matters for following the money: a trail that reaches a major exchange frequently goes cold, because you can't see the exchange's internal ledger. It also matters for de-anonymisation: exchanges typically know their users' real identities (through KYC), so while you can't see it, the link between an address and a person often exists at the exchange — which is how law enforcement traces funds that reach a compliant exchange. Recognising exchanges, reading their flows as sentiment, and understanding that they're both ramps and trail-enders is essential practical knowledge for any analyst.`,
          activity: {
            title: "Spot an exchange flow",
            prompt:
              "Find a large transfer to or from a known exchange address (explorers often label these, or look for a hub-like address with huge activity). Note the direction — into the exchange (potential selling) or out of it (potential accumulation). Write down what you found and what it might signal, remembering it's inference. Then note how the trail behaves once funds reach the exchange.",
          },
        },
        {
          title: "Mixers, bridges and where trails go cold",
          type: "TEXT",
          points: 10,
          body: `Not every trail can be followed to its end. Certain tools and structures are specifically designed to break the link between source and destination, or to move funds off the chain you're watching, and knowing where and why trails go cold is essential to honest tracing — and to recognising when someone is deliberately hiding funds.

## Mixers — breaking the link

Mixers (or tumblers) are services designed to break the traceable link between where funds came from and where they go. Simplified: many people deposit funds into a mixer, and later withdraw to fresh addresses, so that it's difficult or impossible to tell which withdrawal corresponds to which deposit — the funds are 'mixed' together, obscuring the trail. When a trail you're following enters a mixer, it typically goes cold: you can see funds went into the mixer, but not reliably where they came out. Mixers have legitimate privacy uses, but they're also heavily used to launder stolen or illicit funds precisely because they break tracing. For an analyst, a trail entering a mixer is both a dead end and a signal — someone deliberately wanted to obscure where these funds went, which is itself informative, especially when tracing a hack or scam.

## Bridges — moving to another chain

Bridges move assets from one blockchain to another. When funds cross a bridge, they leave the chain you're watching and appear on a different chain, which can interrupt tracing if you don't follow them across. This isn't obfuscation by design (bridges have essential legitimate uses connecting chains), but it complicates tracing: a trail can 'disappear' simply because the funds bridged to another chain, and to keep following you'd need to pick up the trail on the destination chain. Sophisticated actors sometimes hop across multiple chains via bridges specifically to make tracing harder — each bridge crossing is another place a careless analyst loses the trail. Recognising a bridge interaction, and knowing to continue the trace on the other chain rather than concluding the funds vanished, is an important skill as crypto spans more chains.

## Honest tracing and its limits

The existence of mixers, bridges, exchanges, and other trail-obscuring structures means honest tracing has limits, and a good analyst acknowledges them rather than fabricating certainty. Sometimes the honest conclusion is 'the funds entered a mixer and the trail ends here' or 'the funds bridged to another chain and I'd need to trace there'. Pretending you followed funds you actually lost is exactly the kind of false certainty this course warns against. At the same time, these dead ends are themselves evidence: funds deliberately routed through mixers, split across many bridges, or structured to obscure their path suggest an actor trying to hide something, which is meaningful when investigating illicit activity. Trace as far as the evidence honestly allows, recognise and name where trails go cold and why, and treat deliberate obfuscation as the signal it is — but never invent a conclusion the chain doesn't support. Knowing the limits of tracing is part of doing it well.`,
          activity: {
            title: "Map where a trail could go cold",
            prompt:
              "Think about a trail you might trace (or one you already did). Write down the points where it could go cold: reaching an exchange (internal ledger hidden), entering a mixer (link broken), or crossing a bridge (moves to another chain). For each, note how you'd recognise it and what the honest conclusion would be. Then reflect: why is deliberately obscuring funds itself a signal? Naming a trail's limits is part of honest tracing.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on following the money before we turn to analysing holders and distribution. These skills — tracing, clustering, recognising exchanges and obfuscation — are the detective core of on-chain analysis.`,
          quiz: {
            title: "Following the money",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "Why is it possible to 'follow the money' on-chain when you can't in normal finance?",
                explanation:
                  "The ledger is public and permanent, so every transfer — every hop from address to address — is visible. An analyst can reconstruct where funds flowed, hop by hop, which is invisible in traditional finance.",
                options: [
                  {
                    text: "Every transfer is public and permanent, so the whole trail is visible to follow",
                    correct: true,
                  },
                  { text: "Banks publish all their customers' transfers", correct: false },
                  { text: "Crypto transactions include the sender's name", correct: false },
                  { text: "It isn't possible to trace anything on-chain", correct: false },
                ],
              },
              {
                prompt: "What does clustering addresses reveal?",
                explanation:
                  "One entity usually controls many addresses. Grouping them (via shared funding, coordinated behaviour, repeated interaction) reveals the true actors — often exposing hidden concentration that an address-by-address view completely misses.",
                options: [
                  {
                    text: "The real entities behind many addresses, often exposing hidden concentration",
                    correct: true,
                  },
                  { text: "The real names of every address owner, with certainty", correct: false },
                  { text: "Which addresses will transact next", correct: false },
                  { text: "Nothing useful — addresses are always independent", correct: false },
                ],
              },
              {
                prompt: "Why do large inflows TO exchanges often signal potential selling?",
                explanation:
                  "People generally send an asset to an exchange when they intend to trade or sell it. So heavy inflows can signal selling pressure building, while heavy outflows to private wallets suggest accumulation. It's a useful (if inferential) sentiment signal.",
                options: [
                  {
                    text: "You usually send funds to an exchange when you intend to trade or sell them",
                    correct: true,
                  },
                  { text: "Exchanges force everyone to sell on deposit", correct: false },
                  { text: "Inflows always mean the price will rise", correct: false },
                  { text: "Exchange flows carry no signal at all", correct: false },
                ],
              },
              {
                prompt: "What should an honest analyst do when a trail enters a mixer?",
                explanation:
                  "A mixer breaks the link between deposits and withdrawals, so the trail typically goes cold. The honest conclusion is that it ends there — while noting that deliberate obfuscation is itself a signal. Never fabricate a conclusion the chain doesn't support.",
                options: [
                  {
                    text: "Acknowledge the trail goes cold, while treating the obfuscation itself as a signal",
                    correct: true,
                  },
                  { text: "Guess where the funds went and state it as fact", correct: false },
                  { text: "Assume the funds were destroyed", correct: false },
                  { text: "Conclude no crime could have occurred", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },

    // =====================================================================
    {
      title: "Holders and distribution",
      description:
        "Who actually owns a token tells you much of what you need to know. Reading distribution, spotting dangerous concentration, and identifying insiders.",
      lessons: [
        {
          title: "Who holds this token?",
          type: "TEXT",
          points: 10,
          body: `One of the most revealing questions about any token is simply: who holds it? The distribution of ownership — how a token is spread across holders — tells you an enormous amount about a project's health, its risks, and whether the 'community' is real or a facade. And it's readable directly from the chain.

## Distribution is destiny

How a token is distributed shapes almost everything about it. A token genuinely spread across many independent holders behaves very differently from one where a handful of wallets control most of the supply. Broad distribution suggests real adoption and reduces the risk that a few holders can crash the price by selling; extreme concentration means a few actors hold the power to dump on everyone else, and often signals that the 'project' is really a vehicle for insiders. So reading distribution isn't a minor detail — it's often the single most informative thing you can check about a token, and it directly bears on the risk you'd take holding it. Distribution is, to a large degree, destiny.

## Reading the holder list

The chain makes distribution readable. A token's contract page typically shows the number of holders and a list of the top holders with their balances and percentage of supply. From this you can quickly gauge: How many holders are there (few or many)? What share do the top holders control (is it concentrated at the top)? Does the largest holder or few hold a dangerous portion? You can see, at a glance, whether supply is spread across thousands of wallets or hoarded by a dozen. This top-holder view is the starting point of distribution analysis, and reading it skeptically — is this really as distributed as it looks? — is a core skill.

## The picture behind the numbers

Reading distribution well means looking past the surface numbers to the real picture, which requires the skepticism and clustering from earlier. A holder list showing a spread of top wallets might, on clustering, reveal that several 'independent' top holders are actually one entity — real concentration hidden as distribution. A high holder count might be padded with dust (tiny meaningless balances) or wallets that got tokens for free, overstating genuine adoption. Some top holders are benign (an exchange holding many users' tokens, a locked contract, a burn address) and shouldn't count as concentration risk, while others (an anonymous whale, the team's wallet) very much should. So distribution analysis isn't just reading a number — it's interpreting the holder list intelligently, distinguishing genuine spread from disguised concentration and meaningful holders from noise. Done well, it gives you a clear-eyed view of who really controls a token, which is one of the most important things to know before trusting it.`,
          activity: {
            title: "Read a token's distribution",
            prompt:
              "Pick a token and open its holder list on the explorer. Note: how many holders, and what share the top 10 (and top 1) control. Then interpret intelligently — are any top holders benign (exchange, burn address, locked contract) versus concerning (anonymous whale, team)? Does it look genuinely distributed or concentrated? Write your read. Distribution is often the most informative single check on a token.",
          },
        },
        {
          title: "Whales, concentration and red flags",
          type: "TEXT",
          points: 10,
          body: `Large holders — whales — and concentrated ownership are among the most important risks to assess in any token. Concentration is behind a huge share of crypto losses, because when a few wallets control the supply, everyone else is exposed to their decisions. Learning to spot dangerous concentration and read what whales are doing is essential risk analysis.

## Why concentration is dangerous

When a small number of wallets control a large portion of a token's supply, several dangers follow. They can crash the price by selling — a whale dumping a large holding overwhelms buyers and tanks the price, leaving smaller holders with losses. They may have received tokens cheaply or for free (as insiders), so they can profit by selling to later buyers at any price above their near-zero cost, a setup that structurally disadvantages the public. And their coordinated action (if the 'whales' are actually connected insiders) can manipulate the market. High concentration means the many are at the mercy of the few, and it's one of the clearest structural red flags a token can have. A genuinely decentralised, widely-held token is far safer than one where a handful of wallets hold the power to ruin everyone else.

## Reading concentration as a red flag

Certain concentration patterns are strong warning signs. A single wallet or a few wallets holding a very large share of supply (especially if they're anonymous and not an exchange or locked contract) is a serious red flag — that entity can dump on you. Top holders that cluster together (revealing coordinated insiders behind apparently separate wallets) are worse, suggesting organised control. Concentration combined with other red flags (unlocked team tokens, low genuine holder count, tokens that were mostly allocated to insiders at launch) compounds the danger. When you see supply heavily concentrated in a few non-benign wallets, your skepticism should spike: this token's fate rests with a few actors whose interests may not align with yours, and who can exit at your expense. Many rug pulls and dumps are visible in advance as extreme concentration that the promoters never mention.

## Watching what whales do

Beyond static concentration, watching whale behaviour over time adds signal. Are large holders accumulating (buying/holding more) or distributing (selling/spreading out)? A whale steadily moving tokens to exchanges may be preparing to sell — a warning. Whales accumulating might signal confidence (though it also increases concentration). Sudden large transfers from a top holder are worth investigating: where did they go (an exchange, suggesting a sale? a mixer, suggesting something to hide?). Tracking the biggest holders' movements — using the tracing and exchange-flow skills from the last module — turns static distribution into a dynamic read on what the most powerful holders are actually doing, which often precedes major price moves. The whales' behaviour is watched closely for good reason: when those who control the supply move, it matters. Reading concentration as a risk, spotting dangerous patterns, and watching whale movements are core to protecting yourself and understanding a token's real dynamics.`,
          activity: {
            title: "Assess concentration risk",
            prompt:
              "For a token you're examining, assess its concentration risk: do a few non-benign wallets control a large share? Are any top holders clustered (coordinated insiders)? Write down your risk read. Then pick the largest concerning holder and check its recent activity — is it accumulating or moving toward exchanges? Note what that behaviour might signal. Concentration is one of the clearest structural red flags there is.",
          },
        },
        {
          title: "Insider and team wallets",
          type: "TEXT",
          points: 10,
          body: `Behind many tokens are insiders — the team, founders, early investors, and their associates — who typically hold significant allocations. Identifying insider and team wallets, and watching what they do, is one of the most valuable analytical skills, because insiders' behaviour often reveals a project's real health and intentions long before any announcement.

## Finding the insider wallets

Insiders usually receive their tokens in identifiable ways: at or near launch, in large allocations, often from the token's initial distribution or the deployer. By examining a token's earliest transactions and initial distribution — who received large amounts at the start, directly from the contract or team — you can often identify the team, investor, and insider wallets. These wallets frequently share tell-tale patterns: they got large allocations early, they may be interconnected (clustering), and they sometimes behave in coordinated ways. Tracing a token back to its origin — its initial distribution and the addresses that seeded it — is how you find the insiders, and it's illuminating, because the launch allocation reveals who the project was really built to benefit. A token where insiders took most of the supply at launch is structurally different from one with a fair, broad initial distribution.

## Watching insider behaviour

What insiders do with their tokens is a powerful signal, often more honest than anything they say publicly. Insiders selling — moving their allocations to exchanges — is a serious warning, especially if it contradicts their public optimism; teams dumping on their own community while cheerleading is a depressingly common pattern, and the chain reveals it even when they hide it. Conversely, insiders holding or locking their tokens (verifiably, on-chain) suggests alignment with the project's long-term success. So watching whether team and insider wallets are selling, holding, or locked tells you whether their actions match their words — and actions on-chain are far more trustworthy than words in a chat. Many project failures and rug pulls are foreshadowed by insiders quietly selling, visible on-chain to anyone watching those wallets, while the public relies on the team's reassurances.

## Locked tokens and vesting — verify, don't trust

Projects often claim their team tokens are 'locked' or 'vesting' (released gradually over time) to reassure holders that insiders can't dump. The analyst's response is: verify it on-chain. Locking and vesting can be implemented in verifiable on-chain contracts — you can check whether the tokens are actually in a locking contract, what the real release schedule is, and whether the lock is genuine and can't be bypassed. Many projects claim locks that don't exist, are trivially bypassable, or release far sooner than implied, and only on-chain verification reveals the truth. This is the analyst's creed applied directly: don't trust the 'tokens locked' claim, check whether the tokens are really in a genuine locking contract with the stated terms. Verifying insider allocations, watching insider behaviour, and checking claimed locks against on-chain reality together give you a clear view of whether a project's insiders are aligned with holders or set up to exploit them — one of the most important things to know before trusting any token.`,
          activity: {
            title: "Trace a token to its insiders",
            prompt:
              "Pick a token and trace it toward its origin: look at its earliest transactions and initial distribution to identify likely team/insider wallets (large early allocations). Note what you find. Then, if the project claims team tokens are locked, try to verify it on-chain (is there a real locking contract?). Write your findings. Insiders' on-chain actions are far more honest than their public words.",
          },
        },
        {
          title: "Accumulation versus distribution",
          type: "TEXT",
          points: 10,
          body: `Zooming out from individual wallets to overall holder behaviour, one of the most useful patterns to read is whether a token is broadly being accumulated or distributed — whether holders are, on balance, building positions or unloading them. This aggregate behaviour often reveals the real state of a token beneath its price, and reading it is a valuable analytical skill.

## Accumulation and distribution defined

Accumulation is when holders are, on net, acquiring and holding more of a token — buying and keeping it, moving it into wallets for the long term, reducing the supply readily available to sell. Distribution is the opposite — holders on net offloading, spreading tokens out to sell, moving supply toward exchanges and buyers. These patterns describe the aggregate behaviour of a token's holders, and they matter because they reflect the real conviction (or lack of it) among those who hold the asset. A token being accumulated by its holders has different underlying strength than one being steadily distributed and sold, even if their prices look similar in the moment. Reading which is happening gives you insight into the token's real trajectory beneath the noise of price.

## Reading the pattern on-chain

The chain offers signals for accumulation versus distribution. Are large holders' balances growing (accumulation) or shrinking (distribution)? Are tokens flowing off exchanges into private wallets (accumulation — taking supply off the market to hold) or onto exchanges (distribution — preparing to sell)? Is the holder count growing with real holders (broadening ownership, often healthy) or are a few big holders offloading to many small buyers (insiders distributing to the public, often a warning)? Is supply increasingly held in wallets that don't move (strong hands accumulating) or actively being shuffled and sold? By reading these flows and balance changes across a token's holders, you can characterise whether it's in accumulation or distribution — a read that price alone won't give you and that often precedes price catching up.

## The revealing divergences

The most valuable insights come when accumulation/distribution diverges from the story or the price. A token whose price is rising while insiders and large holders are quietly distributing (selling into the hype) is a warning — the price strength is being used as an exit by those who know most, and it often ends badly for late buyers. A token whose price is flat or falling while genuine holders accumulate and supply leaves exchanges may be building underlying strength that price hasn't reflected yet. When the on-chain behaviour of holders contradicts the public narrative or the price action, the on-chain behaviour is often the more honest signal, because it's what people are actually doing with their money rather than what they're saying or what the price implies. Learning to read accumulation versus distribution, and especially to spot where it diverges from the narrative, is a genuinely edge-giving skill — it lets you see the real conviction beneath a token, and catch the moments when the informed are quietly doing the opposite of what the crowd believes.`,
          activity: {
            title: "Read accumulation or distribution",
            prompt:
              "For a token, gather signals on whether it's being accumulated or distributed: are large holders' balances growing or shrinking? Are tokens flowing off exchanges (accumulation) or onto them (distribution)? Is the holder base broadening healthily or are big holders offloading to many small buyers? Write your read. Then note whether it agrees or diverges from the token's price and public narrative — divergence is the most revealing signal.",
          },
        },
        {
          title: "A distribution report",
          type: "ASSIGNMENT",
          points: 25,
          body: `Produce a full distribution analysis of a token — the kind of report that answers 'who really controls this, and what are they doing?' Graded on rigour and honest interpretation.

Your instructor reads this. Pick any token; the marks are for how carefully you read its distribution and how honestly you separate fact from inference.`,
          assignment: {
            title: "Analyse a token's distribution",
            instructions: `Choose any token and produce a distribution analysis using free on-chain tools. Write it up.

Cover all six:

**1. The token.** Which token, and its basic facts (total supply, holder count) — paste the contract address so it can be checked.

**2. Concentration.** The share held by the top holders, with an assessment of concentration risk. Distinguish benign top holders (exchanges, burn addresses, locked contracts) from concerning ones (anonymous whales, team).

**3. Insiders.** Your best identification of team/insider wallets (from initial distribution), how much they hold, and whether any claimed locks or vesting check out on-chain.

**4. Whale behaviour.** What the largest non-benign holders have been doing recently — accumulating, holding, or moving toward exchanges.

**5. Accumulation vs distribution.** Your read on whether the token is broadly being accumulated or distributed, and whether that agrees with or diverges from its price/narrative.

**6. Verdict and honesty.** Your overall read on the token's distribution health and risks — with a clear line between what the chain shows (fact) and what you infer (held humbly).

Read public data only — never handle anyone's keys or private information.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Rigorous distribution reading",
                weight: 40,
                descriptor:
                  "Concentration, insiders, and holder behaviour are read carefully and correctly, distinguishing benign from concerning holders and using clustering/tracing where relevant — not a superficial glance at the holder count.",
              },
              {
                criterion: "Honest interpretation",
                weight: 35,
                descriptor:
                  "A clean separation of fact from inference, appropriate skepticism toward claimed locks and apparent distribution, and a verdict genuinely supported by the evidence.",
              },
              {
                criterion: "Meaningful divergence and risk read",
                weight: 25,
                descriptor:
                  "Engages with whale behaviour and accumulation/distribution, notably where on-chain behaviour diverges from narrative or price, and draws sensible risk conclusions.",
              },
            ],
          },
        },
      ],
    },

    // =====================================================================
    {
      title: "Valuing a protocol on-chain",
      description:
        "Beyond price and hype: judging a protocol by its real usage — revenue, users, and activity — and telling genuine traction from vanity metrics.",
      lessons: [
        {
          title: "Beyond price — fundamentals on-chain",
          type: "TEXT",
          points: 10,
          body: `Price tells you what a token costs, not whether the thing behind it has any real value or usage. On-chain analysis lets you look past price at fundamentals — the actual activity, usage, and economics of a protocol — which is how you tell a genuinely used product from an empty shell with a ticker. This shift, from price to fundamentals, is what separates investing from gambling.

## Price is not value

In crypto, price is loud and fundamentals are quiet, so people fixate on price and ignore whether anything real is happening. But price can be completely detached from any underlying usage or value — a token can have a high price and zero real users (pumped by hype and manipulation), or genuine usage and a suppressed price. Price alone tells you nothing about whether a protocol is actually used, generates any value, or has a future; it only tells you what the market is currently willing to pay, which in crypto is driven heavily by hype, speculation, and manipulation. To judge whether there's anything real behind a token, you have to look past price at what the protocol actually does and how much it's genuinely used — and on-chain, you can.

## Fundamentals you can read on-chain

Unlike traditional finance, where you rely on companies' self-reported figures, on-chain protocols often expose their fundamentals directly and verifiably. You can read how many people actually use a protocol (active users, transactions), how much real economic activity flows through it (volume, value processed), how much revenue or fees it genuinely generates, how much value is deposited in it, and whether these are growing or shrinking. These are the crypto equivalent of a business's customers, revenue, and growth — the real measures of whether something is a used, valuable product or an empty vehicle for speculation. And because they're on-chain, you can verify them yourself rather than trusting a team's marketing claims. This is a genuine advantage: the fundamentals of many crypto protocols are more transparent and verifiable than those of traditional businesses, if you know how to read them.

## The fundamental question

The core question fundamentals answer is: is anyone actually using this, and does it generate real value? A protocol with growing genuine users, real revenue, and increasing usage has something real behind it, regardless of short-term price. A protocol with a high price but negligible real usage, no genuine revenue, and activity that turns out to be faked is a hollow shell that price will eventually reflect. Learning to read on-chain fundamentals lets you answer this question with evidence instead of hype, distinguishing the projects with genuine traction from the many that are all narrative and no substance. This is the foundation of evidence-based crypto investing: judging a protocol by what it actually does and how much it's genuinely used, read directly from the chain, rather than by its price or its promoters' promises. The rest of this module covers the specific fundamentals — value locked, revenue, users — and, crucially, how to tell the real ones from the vanity metrics designed to fool you.`,
          activity: {
            title: "Separate price from usage",
            prompt:
              "Pick a protocol or token you know mainly by its price and hype. Write down what you actually know about its real usage — do people use it, does it generate revenue, is activity growing? Notice how much you know about its price versus its fundamentals. Then write the key question you'd want to answer with on-chain data: is anyone genuinely using this? This shift from price to usage is the heart of fundamental analysis.",
          },
        },
        {
          title: "Total value locked and what it means",
          type: "TEXT",
          points: 10,
          body: `A widely-cited on-chain fundamental is Total Value Locked (TVL) — the total value of assets deposited in a protocol. TVL is useful for gauging how much capital a protocol has attracted, but it's also frequently misunderstood and gamed, so learning what it really means, and its limitations, is important for reading it honestly.

## What TVL measures

Total Value Locked is the total value of assets that users have deposited into a protocol — for example, the funds supplied to a lending protocol, or the assets pooled in a decentralised exchange. It's a rough measure of how much capital a protocol has attracted and is entrusted with, and by extension of its scale and the confidence users have placed in it. A protocol with substantial, stable or growing TVL has convinced many people to deposit real value into it, which is a meaningful signal of adoption and trust — people don't usually lock significant funds into something they consider worthless or unsafe. So TVL, read carefully, is a genuine indicator of a protocol's scale and the capital it commands, and it's readable directly on-chain by summing the assets held in the protocol's contracts.

## The limits and games

But TVL is easily misread and often gamed, so treat it skeptically. First, TVL is denominated in value, so it moves with token prices — a protocol's TVL can rise or fall sharply just because the price of the deposited assets changed, not because more or less was actually deposited; rising TVL in a bull market can be mostly price appreciation, not real growth. Second, TVL can be inflated by incentives — protocols that pay high rewards attract 'mercenary' capital that deposits purely for the rewards and flees the moment they stop, so high TVL propped up by unsustainable incentives isn't the sign of genuine adoption it appears to be. Third, TVL can be double-counted or artificially inflated through circular schemes where the same value is counted multiple times across linked protocols. So a big TVL number, taken at face value, can badly mislead — you have to ask whether it's real, sticky capital or price-inflated, incentive-chasing, or double-counted froth.

## Reading TVL well

To use TVL honestly: look at its trend in real terms, trying to separate genuine deposit growth from mere price appreciation of the deposited assets. Ask whether the TVL is sticky (users deposit because the protocol is genuinely useful) or mercenary (chasing temporary rewards that will leave). Consider TVL alongside other fundamentals — a protocol with high TVL but negligible usage, revenue, or users is suspicious (why is all that capital there if nobody's using the protocol?), suggesting the TVL is incentive-driven rather than a sign of a valuable, used product. And be aware of the games — double-counting, circular inflation — that can make TVL look bigger than the real value at stake. Read this way, TVL is a useful piece of the fundamental picture — a gauge of scale and attracted capital — but only one piece, and one that's easily inflated, so it should never be read alone or at face value. The skeptical analyst treats a big TVL as a claim to verify and contextualise, not a conclusion.`,
          activity: {
            title: "Interrogate a TVL figure",
            prompt:
              "Find a protocol's TVL (many analytics sites show it). Then interrogate it skeptically: Is recent TVL growth real deposits or mostly price appreciation of the deposited assets? Is the capital likely sticky (genuine use) or mercenary (chasing rewards)? Does the TVL match the protocol's actual usage and revenue, or is it suspiciously high with little real activity? Write your read. A big TVL is a claim to verify, not a conclusion.",
          },
        },
        {
          title: "Revenue, fees and real usage",
          type: "TEXT",
          points: 10,
          body: `Perhaps the truest measure of whether a protocol has real, sustainable value is whether it generates genuine revenue — real fees paid by real users for a service they actually want. Revenue is hard to fake sustainably and cuts through the hype like almost nothing else, making it one of the most valuable fundamentals to read on-chain.

## Why revenue is the acid test

Revenue — the fees a protocol earns from people using it — is powerful evidence because it represents real demand: people paying real money for a service means the service is genuinely valued. Unlike TVL (which can be parked incentive capital) or user counts (which can be faked cheaply), sustained genuine revenue is hard to fake, because faking it means actually paying the fees yourself, which is expensive and pointless. A protocol earning substantial, growing revenue from a broad base of users has a real, working business — people are paying to use it because it provides value. This is the crypto equivalent of a company's sales, and just as with companies, real revenue is one of the most reliable signs that there's a genuine, valuable product rather than an empty speculative vehicle. When you want to cut through crypto hype to what's real, following the revenue is one of the sharpest tools.

## Reading revenue and fees on-chain

Many protocols' fees and revenue are visible on-chain, because the fees are paid in transactions you can observe, and analytics tools often aggregate them into revenue figures. You can look at how much a protocol earns in fees over time, whether it's growing or shrinking, and how it compares to the protocol's valuation. Crucially, you can often distinguish real user revenue (fees paid by genuine users for the service) from artificial or incentive-driven activity. A protocol generating real fees from real usage — and ideally growing — has demonstrable value; one with a high valuation but negligible real revenue is priced on hype and hope rather than on any actual economic activity. Comparing a token's valuation to the real revenue the protocol generates is a sanity check that deflates many overhyped projects: if the protocol earns almost nothing but is valued enormously, that gap is a warning.

## Revenue quality and sustainability

Not all revenue is equal, so read it with nuance. Is the revenue genuine (paid by real users for real value) or artificially generated (wash trading paying fees to fake usage, or the protocol's own incentives cycling through)? Is it sustainable (from ongoing genuine demand) or temporary (a burst of hype-driven activity that will fade)? Is it diversified across many users or dependent on a few? Is it growing, stable, or declining? High-quality revenue — genuine, sustainable, broad-based, growing — is a strong positive signal; low-quality revenue (faked, incentive-driven, one-off, or from a few wash-trading wallets) is not, and can be a red flag if the protocol is dressing up fake activity as real business. So reading revenue means not just finding the number but assessing its quality and sustainability, using the same skepticism you apply everywhere. Done well, revenue analysis is one of the most powerful ways to separate protocols with real, valuable, sustainable businesses from the majority that are all narrative and no substance — following the real fees paid by real users is following the truth of whether something is genuinely used and valued.`,
          activity: {
            title: "Follow the real revenue",
            prompt:
              "Pick a protocol and find its revenue/fees (analytics sites often show 'fees' or 'revenue'). Assess: Is it meaningful and growing, or negligible? Compare it roughly to the protocol's valuation — is the valuation justified by real revenue, or priced on hype? Then judge the revenue's quality — genuine user demand, or possibly faked/incentive-driven? Write your read. Real, sustainable revenue is one of the sharpest tools for cutting through hype.",
          },
        },
        {
          title: "Active users versus vanity metrics",
          type: "TEXT",
          points: 10,
          body: `Every project wants to look popular and used, so the space is full of metrics designed to impress rather than inform — vanity metrics. Learning to distinguish genuine usage (real people getting real value) from vanity metrics (numbers that look big but mean little) is one of the most important analytical skills, because a huge fraction of crypto 'traction' is manufactured or meaningless.

## The problem with user metrics

Metrics like 'number of addresses', 'transactions', or 'users' seem like obvious measures of adoption, but they're deeply gameable on-chain, because creating addresses and transactions is cheap or free. A project can generate thousands of addresses and transactions using a handful of controlled wallets or cheap automated activity, producing impressive-looking 'user' numbers that represent no real people and no genuine value. Airdrops and incentive programs create swarms of addresses that interact once to farm a reward and never return — real addresses, but not real users. So the headline metrics projects tout are frequently vanity: technically real numbers that vastly overstate genuine adoption because they're cheaply manufactured or reflect reward-chasing rather than real use. Taking these numbers at face value is exactly the trap the skeptical analyst avoids.

## Finding genuine usage

Genuine usage looks different from vanity metrics, and distinguishing them is the skill. Real users tend to return and use a protocol repeatedly over time (retention), rather than interacting once and vanishing. Real usage involves genuine economic activity and value, not tiny meaningless transactions or reward-farming. Real adoption grows organically and holds up when incentives stop, rather than collapsing the moment the free rewards end. So to find genuine usage, look past raw address and transaction counts to quality: Are users returning (retention) or one-and-done? Is the activity economically meaningful or trivial? Does usage persist without incentives, or is it entirely propped up by rewards? Are the 'users' plausibly real people or a few wallets faking breadth (clustering can reveal this)? Genuine usage — real, returning users doing meaningful things, sustained without bribery — is the signal; the raw impressive-sounding counts are usually the noise.

## The vanity red flags

Certain patterns signal vanity metrics dressed up as traction, and spotting them protects you. Huge user/transaction numbers that don't match the protocol's actual revenue or economic activity (why so many 'users' generating so little real value?). Activity that's concentrated in a few wallets cycling repeatedly (fake breadth). Usage that spiked with an incentive program and would obviously collapse without it (rented, not real, adoption). Metrics the project heavily promotes while staying quiet about revenue, retention, or genuine economic activity (touting the vanity numbers, hiding the real ones). When a project's impressive metrics don't align with real revenue and genuine sustained usage, treat the metrics as vanity until proven otherwise. The most useful question to cut through it all: strip away the incentives, the one-time interactions, and the wallet-shuffling, and how many real people are genuinely using this for real value? That number — the genuine usage beneath the vanity — is what actually matters, and reading past the impressive-but-empty metrics to find it is a core skill of the on-chain analyst. In a space full of manufactured traction, the ability to tell real usage from vanity is a genuine edge.`,
          activity: {
            title: "Test a metric for vanity",
            prompt:
              "Find a usage metric a project promotes (users, addresses, transactions). Test it for vanity: Does it match the protocol's real revenue and economic activity, or is it suspiciously high relative to them? Is the activity concentrated in few wallets or genuinely broad? Would it survive without incentives? Write your assessment of how much genuine usage lies beneath the metric. Telling real usage from vanity is a genuine edge.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on valuing protocols before we turn to spotting scams and manipulation. These fundamentals — usage over price, verifying TVL, following real revenue, seeing past vanity metrics — are how you judge whether anything real lies behind a token.`,
          quiz: {
            title: "Fundamentals on-chain",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "Why look at fundamentals rather than just price?",
                explanation:
                  "Price can be completely detached from real usage or value — pumped by hype with zero real users, or genuine with a suppressed price. Fundamentals (usage, revenue, users) reveal whether anything real lies behind a token, which price alone never shows.",
                options: [
                  {
                    text: "Price can be detached from reality; fundamentals show whether anything real is behind a token",
                    correct: true,
                  },
                  { text: "Price is impossible to find on-chain", correct: false },
                  { text: "Fundamentals are always identical to price", correct: false },
                  { text: "Price is the only thing that matters", correct: false },
                ],
              },
              {
                prompt: "Why must TVL be read skeptically?",
                explanation:
                  "TVL moves with token prices (so growth can be mere price appreciation), can be inflated by temporary incentives attracting mercenary capital, and can be double-counted. A big TVL is a claim to verify and contextualise, not a conclusion.",
                options: [
                  {
                    text: "It moves with prices, can be inflated by incentives, and can be double-counted",
                    correct: true,
                  },
                  { text: "It's always completely fake", correct: false },
                  { text: "It can never be checked on-chain", correct: false },
                  { text: "It perfectly measures a protocol's value", correct: false },
                ],
              },
              {
                prompt: "Why is genuine revenue such a powerful fundamental?",
                explanation:
                  "Sustained real revenue means real people are paying real money for a service they value — and it's hard to fake, because faking it means actually paying the fees yourself. It's the acid test for whether a protocol has a real, valuable business.",
                options: [
                  {
                    text: "It reflects real demand and is hard to fake, since faking it means paying the fees yourself",
                    correct: true,
                  },
                  { text: "It's the easiest metric of all to fake", correct: false },
                  { text: "It has nothing to do with real usage", correct: false },
                  { text: "Revenue can't be seen on-chain", correct: false },
                ],
              },
              {
                prompt: "What distinguishes genuine usage from a vanity metric?",
                explanation:
                  "Genuine usage means real, returning users doing economically meaningful things, sustained without incentives. Vanity metrics are cheap-to-manufacture counts (addresses, transactions) that don't match real revenue, are concentrated in few wallets, or collapse without rewards.",
                options: [
                  {
                    text: "Real returning users and meaningful activity sustained without incentives, versus cheap manufactured counts",
                    correct: true,
                  },
                  { text: "Vanity metrics are always higher quality", correct: false },
                  { text: "Raw address counts always prove real adoption", correct: false },
                  { text: "There's no way to tell them apart", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },

    // =====================================================================
    {
      title: "Spotting scams and manipulation",
      description:
        "The chain reveals the scams to those who look. Rug pulls, wash trading, honeypots, and coordinated pump-and-dumps — and their on-chain fingerprints.",
      lessons: [
        {
          title: "Rug pulls and how the chain reveals them",
          type: "TEXT",
          points: 10,
          body: `A rug pull is one of crypto's most common scams: a project attracts investment, then the creators pull the value out and vanish, leaving holders with worthless tokens. The reassuring truth is that rug pulls usually leave on-chain fingerprints — often visible in advance — so the analyst who checks can avoid most of them. Learning these fingerprints is directly protective.

## What a rug pull is

In a typical rug pull, creators launch a token, generate hype, attract buyers who provide real money (often into a liquidity pool that lets people trade the token), and then the creators suddenly remove that value — pulling the liquidity, dumping their large token holdings, or exploiting a backdoor in the contract — leaving buyers holding tokens they can no longer sell for anything. The victims' money ends up with the scammers, and the project is abandoned. Rug pulls range from crude (obvious scams) to elaborate (projects that looked legitimate for a while), but they share this basic shape: value flows in from the public, then gets extracted by insiders who disappear. They're depressingly common, especially among new, hyped tokens, and they've cost people enormous sums.

## The fingerprints, often visible in advance

Crucially, rug pulls tend to leave detectable on-chain signs, many visible before the pull. Extreme concentration of tokens in the creators' wallets (they hold most of the supply, ready to dump). Liquidity that isn't locked (the creators can remove it at any moment — a huge red flag; genuine projects often lock liquidity verifiably) or is locked only briefly. Contract properties that let the creators mint unlimited tokens, block selling, or otherwise exploit holders (backdoors, discussed in later lessons). Insider wallets already positioned to extract value. A token that's mostly held by a few connected wallets with the public providing the liquidity. These are readable on-chain in advance, and their presence means the scam is structurally possible — the creators have the ability and position to rug. Many rug pulls were entirely predictable from these on-chain red flags, ignored by buyers swept up in hype but obvious to anyone who checked.

## Checking before you trust

The protective practice is to check for rug-pull fingerprints before trusting any token, especially a new or hyped one. Is the supply dangerously concentrated in creator wallets? Is the liquidity locked, verifiably and for a meaningful time, or can the creators pull it whenever they like? Does the contract give the creators dangerous powers (minting, blocking sales, altering balances)? Are insiders positioned to extract value? A token that fails these checks — concentrated supply, unlocked liquidity, dangerous contract powers, insiders ready to dump — has the structure of a potential rug pull, and the analyst treats it as such regardless of the hype and promises. This won't catch every elaborate scam, but it catches a large share of them, because most rugs rely on the very structural features (concentration, unlocked liquidity, backdoors) that on-chain checking reveals. In a space where rug pulls are everywhere, the simple discipline of checking these fingerprints before trusting a token is one of the most valuable protective skills you can have — the chain shows you the trap, if you look before you leap.`,
          activity: {
            title: "Check a token for rug fingerprints",
            prompt:
              "Take a new or hyped token and check it for rug-pull fingerprints on-chain: Is the supply heavily concentrated in creator/insider wallets? Is the liquidity locked (verifiably, and for how long) or can it be pulled anytime? Does the contract appear to give creators dangerous powers? Write down what you find and whether the token has the structure of a potential rug. Checking before trusting catches a large share of rug pulls.",
          },
        },
        {
          title: "Wash trading and fake volume",
          type: "TEXT",
          points: 10,
          body: `Volume — how much of an asset is traded — is supposed to indicate genuine interest and liquidity, so scammers fake it. Wash trading, where someone trades with themselves to create the illusion of volume, is rampant in crypto, and learning to detect fake volume protects you from the false impression of activity and demand that it's designed to create.

## What wash trading is

Wash trading is the practice of buying and selling the same asset to yourself (across wallets you control) to create the appearance of trading volume and activity without any real change in ownership or genuine demand. The trader shuffles the asset back and forth between their own addresses, generating volume figures that look like a busy, liquid market, when in reality it's one entity trading with itself. The purpose is deception: high volume attracts real buyers (who think there's genuine interest and liquidity), inflates a token's apparent popularity, games rankings and listings that reward volume, and creates a false impression of a thriving market. Wash trading is illegal in regulated markets and rampant in unregulated crypto, where a large fraction of reported volume on some tokens and platforms is fake. Taking volume at face value, without checking whether it's real, is a serious analytical error.

## Detecting fake volume

Wash trading leaves on-chain patterns that can expose it. The tell-tale sign is the same wallets (or clusters of connected wallets) trading back and forth repeatedly — buying and selling among themselves in ways that generate volume without real distribution of the asset. If you examine the trades making up a token's volume and find them concentrated among a small set of interconnected addresses cycling the asset between each other, that's wash trading, not genuine market activity. Other signs include volume that doesn't match other indicators of genuine interest (high 'volume' but few real holders, little genuine usage, no organic price discovery), suspiciously regular or bot-like trading patterns, and volume concentrated in ways that make no sense for a genuinely broad market. Using clustering and trade analysis, you can often distinguish real volume (many independent participants genuinely trading) from wash-traded volume (a few wallets faking it), which the raw volume number completely hides.

## Why it matters and how to respond

Detecting fake volume matters because volume is used — by traders, by rankings, by the naive — as a proxy for genuine interest and liquidity, so faking it manipulates all of them. A token with impressive volume that turns out to be mostly wash-traded has far less real interest and liquidity than it appears, meaning the 'demand' luring you in is manufactured and the liquidity you're counting on to exit may not really be there. The analyst's response is the usual skepticism: don't trust volume at face value, especially on new or thinly-held tokens where faking it is easy and tempting. Check whether the volume reflects many genuine independent participants or a few wallets cycling the asset. Compare volume against other signals of genuine interest (real holders, genuine usage, organic activity) — a big divergence (huge volume, little else real) suggests wash trading. Treat suspiciously high volume that doesn't match a token's other fundamentals as likely fake until proven otherwise. In a space where fake volume is everywhere, the ability to see through it to genuine market activity protects you from the false impressions it's specifically designed to create, and is another way the chain rewards those who verify over those who trust.`,
          activity: {
            title: "Question a volume figure",
            prompt:
              "Find a token with notable trading volume. Question it: does the volume match the token's other signs of genuine interest (real holder count, genuine usage), or is it suspiciously high relative to them? If you can, look at whether the trades involve many independent participants or a few cycling wallets. Write your assessment of how much of the volume is likely real. Volume is one of the most faked metrics in crypto.",
          },
        },
        {
          title: "Honeypots and malicious contracts",
          type: "TEXT",
          points: 10,
          body: `Some scams are built directly into a token's smart contract — malicious code that traps buyers or gives creators dangerous powers. Honeypots (tokens you can buy but can't sell) are a notorious example. While you don't need to be a programmer, understanding that contracts can be malicious, and knowing how to check for danger, protects you from traps that pure price-and-hype analysis would never reveal.

## The contract can be the trap

A token is governed by its smart contract — the code that controls how it behaves. Most people never consider that this code could be deliberately malicious, but it can be, and this is a whole category of scam. A honeypot is a token whose contract lets people buy it but prevents them (or all but the creators) from selling — so buyers pile in seeing the price rise, then discover they're trapped, unable to sell, while the creators extract the real money. Other malicious contract features include the ability for creators to mint unlimited new tokens (diluting holders to nothing), to arbitrarily take or freeze holders' tokens, to change fees to confiscatory levels, or to include hidden backdoors. The token might look fine on the surface and in its price action, while its contract contains a trap that springs when you try to exit or that lets the creators rug at will. The danger lives in the code, invisible to anyone only watching the price.

## Checking for malicious contracts

You don't need to read code fluently to protect yourself, because several approaches help. Contract-scanning and token-safety tools exist that automatically check a token's contract for known dangerous patterns (honeypot behaviour, mint functions, ability to block selling, high or changeable fees, other red flags) and flag them — running a token through such a checker before trusting it catches many malicious contracts. You can look at whether the contract is verified and open (unverified or deliberately obscured contracts are more suspicious — why hide the code?) and whether it's been audited by a credible party (though audits aren't guarantees). You can check on-chain whether people are actually able to sell the token (a honeypot shows buys but few or no successful sells by ordinary holders — a detectable pattern). And you can note dangerous powers the contract grants creators (minting, blocking transfers, altering balances), which even non-experts can often see flagged by tools. These checks don't require you to be a developer, but they let you avoid a large share of contract-based scams.

## Structural skepticism toward new tokens

The broader lesson is structural skepticism toward tokens whose contracts you haven't verified as safe, especially new and hyped ones. Because the trap can be in the code, a token can look perfectly good — nice price, hype, apparent activity — while being a honeypot or containing a backdoor that will spring on you. So a complete pre-trust check includes the contract: is it verified and readable, does it pass safety checks, can people actually sell it, does it give creators dangerous powers? A token that fails these — unverified or obfuscated code, honeypot behaviour, dangerous creator powers, failed safety scans — is dangerous regardless of how good everything else looks, and the analyst avoids it. This dimension of analysis, checking the contract itself for malice, catches scams that no amount of price, volume, or distribution analysis would reveal, because the trap is in the code rather than the visible activity. In a space where malicious contracts are a real and common threat, incorporating contract safety checks into your analysis — using the available tools even without deep coding knowledge — closes a dangerous blind spot and protects you from a category of scam designed to be invisible until it's too late.`,
          activity: {
            title: "Run a contract safety check",
            prompt:
              "Take a token (ideally a newer one) and check its contract for danger: is the contract verified and readable, or hidden? Run it through a free token-safety/honeypot checker if you can, and note what it flags. Check whether ordinary holders are actually able to sell it. Write down what you found about the contract's safety. The trap can live in the code, invisible to price-and-hype analysis.",
          },
        },
        {
          title: "Pump-and-dumps and coordinated wallets",
          type: "TEXT",
          points: 10,
          body: `A pump-and-dump inflates a token's price through coordinated buying and hype, then the organisers sell into the excitement they created, crashing the price and leaving latecomers with losses. These schemes leave on-chain traces — coordinated wallets, telltale timing — and recognising them protects you from being the exit liquidity for someone else's scheme.

## The anatomy of a pump-and-dump

In a pump-and-dump, organisers accumulate a token cheaply, then coordinate to drive up its price and generate hype — through buying, promotion, fake activity, and building excitement — attracting a wave of buyers chasing the rising price. Once the price is pumped and the crowd is euphorically buying, the organisers dump their holdings into that demand, selling at the inflated prices to the latecomers, which crashes the price and leaves those latecomers holding tokens worth a fraction of what they paid. The organisers profit at the direct expense of the crowd they lured in. This pattern is ancient and rampant in crypto, where thinly-traded tokens are easy to pump and coordinated groups deliberately run these schemes, often with the very people promoting the token being the ones dumping on their followers. The crowd chasing the pump becomes the exit liquidity for the organisers' dump.

## On-chain traces of coordination

Pump-and-dumps leave on-chain fingerprints, particularly signs of coordination. Groups of wallets accumulating a token together before the pump (often connected or funded from common sources — clustering reveals them), then selling together at the top, betray coordinated operation rather than organic market activity. The timing is telling: coordinated buying that suddenly appears, drives the price up, and is followed by coordinated selling by the same cluster of wallets at the peak. Insider or organiser wallets that bought cheap early and dump into the pump they orchestrated. A token that pumps dramatically on activity concentrated among interconnected wallets, rather than broad organic demand, has the signature of a manipulated pump rather than genuine interest. Using clustering and behaviour analysis, you can often see the coordinated accumulation-and-dump pattern that distinguishes an engineered pump-and-dump from a genuine price move — the organisers' wallets acting in concert, invisible to those watching only the price.

## Avoiding being the exit liquidity

The protective insight is to recognise the pump-and-dump pattern and refuse to be the exit liquidity. When a token pumps dramatically, especially a thinly-traded or hyped one, the skeptical questions are: is this organic demand or a coordinated pump? Are a cluster of connected wallets driving this, positioned to dump on the crowd? Am I being lured in to provide the exit for organisers who bought far cheaper? The classic sign that you're the intended victim is a token pumping hard on hype and coordinated activity, with promoters urging you to buy in — the very setup where the pumpers dump on the buyers they've excited. Recognising this, and the on-chain coordination behind it, lets you avoid chasing pumps that are actually traps. More deeply, it connects to the accumulation-versus-distribution and insider analysis from earlier: watching whether coordinated insiders are distributing into a pump reveals the scheme in progress. The chain shows the coordinated wallets accumulating and then dumping if you look, turning the pump-and-dump from an invisible trap into a recognisable pattern you can avoid. In a space full of manufactured pumps designed to make you the exit liquidity, the ability to spot the on-chain coordination behind them — and the discipline not to chase the pump — protects you from a scam that specifically preys on the excitement of a rising price.`,
          activity: {
            title: "Spot a coordinated pump pattern",
            prompt:
              "Think of a token that pumped dramatically (or examine one). Look for coordination signs: did a cluster of connected wallets accumulate before the pump and sell at the top? Was the buying broad and organic or concentrated among few interconnected wallets? Write down what would distinguish a coordinated pump-and-dump from genuine demand, and how you'd avoid being the exit liquidity. The chain reveals the coordination if you look.",
          },
        },
        {
          title: "A scam autopsy",
          type: "ASSIGNMENT",
          points: 25,
          body: `Perform an on-chain autopsy of a scam — a rug pull, honeypot, wash-trading scheme, or pump-and-dump — reconstructing what happened from the evidence. Graded on rigour and honest, evidence-based reconstruction.

Your instructor reads this. You can analyse a well-documented past scam or a token you assess as a likely scam; the marks are for the quality of your on-chain evidence and reasoning.`,
          assignment: {
            title: "Autopsy a scam on-chain",
            instructions: `Choose a scam (a known past rug pull, honeypot, wash-trading case, or pump-and-dump — or a current token you assess as a likely scam) and perform an on-chain autopsy. Write it up.

Cover all six:

**1. The subject.** Which token/scheme you're analysing and why you chose it (paste the relevant address(es)).

**2. The type.** Which kind of scam it is (or appears to be) and how that type works.

**3. The fingerprints.** The specific on-chain red flags you found — concentration, unlocked liquidity, coordinated wallets, honeypot behaviour, fake volume, dangerous contract powers, insider dumping — as relevant to the type.

**4. The reconstruction.** How the scheme worked (or would work) based on the on-chain evidence — what the operators did or are positioned to do, and how value flowed (or would flow) from victims to them.

**5. What would have warned a careful analyst.** Which of these signs were (or are) visible in advance, so a careful checker could have avoided it.

**6. Fact versus inference.** A clear separation of what the chain shows from what you infer.

Read public data only — never handle keys or private information, and don't attempt to interact with malicious contracts with real funds.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Correct identification and fingerprints",
                weight: 40,
                descriptor:
                  "The scam type is correctly identified and its specific on-chain fingerprints are found and explained accurately, using the appropriate techniques (concentration, clustering, liquidity/lock checks, contract checks, volume analysis).",
              },
              {
                criterion: "Evidence-based reconstruction",
                weight: 35,
                descriptor:
                  "The scheme is reconstructed from genuine on-chain evidence, showing how value flowed or would flow to the operators, with a clear separation of fact from inference.",
              },
              {
                criterion: "Protective insight",
                weight: 25,
                descriptor:
                  "Clearly identifies which warning signs were visible in advance, demonstrating how a careful analyst could have avoided the scam — the protective payoff of the analysis.",
              },
            ],
          },
        },
      ],
    },

    // =====================================================================
    {
      title: "On-chain signals and market behaviour",
      description:
        "Reading the informed money: smart-money wallets, exchange and stablecoin flows, and the on-chain signals that sometimes diverge from price.",
      lessons: [
        {
          title: "Smart money and following the informed",
          type: "TEXT",
          points: 10,
          body: `Some on-chain participants are consistently more informed or successful than others — 'smart money' — and because their activity is public, you can watch what they do. Following smart money is a popular on-chain strategy, but it comes with real pitfalls, so understanding both its value and its limits is important.

## What 'smart money' means

Smart money refers to wallets or entities that appear to be well-informed, sophisticated, or consistently successful — early investors in successful projects, wallets with strong track records, funds and professionals known for good decisions. The idea is that these participants may have better information, analysis, or judgement than the average, so watching what they buy, sell, and hold might offer useful signal. Because everything is on-chain, you can identify and track such wallets (once you've established which they are) and observe their moves in real time — something impossible in traditional finance, where you can't see what sophisticated investors are doing until much later, if ever. This transparency is genuinely powerful: the actions of informed participants are visible on the public ledger, if you can identify them and read their behaviour.

## The real value

Following smart money can add signal in several ways. Seeing informed wallets accumulate a token early might flag it for your own research before the crowd notices. Watching what successful wallets are entering or exiting can surface ideas and shift your attention to what the informed are doing. Noticing smart money exiting a position you hold might prompt you to re-examine your thesis. Used as one input among many — a source of leads and a check on your own view — tracking informed wallets can genuinely enrich your analysis, precisely because these participants' visible actions may reflect information or judgement you lack. The transparency of the chain turns 'what are the smart people doing?' from an unanswerable question into something you can partially observe, which is a real edge when used well.

## The serious pitfalls

But following smart money has serious pitfalls that the naive ignore. First, identifying who's actually 'smart' is hard and often done in hindsight — a wallet that made great calls in the past may just have been lucky, or may not repeat, and labelling wallets 'smart' after their wins is survivorship bias. Second, you see their moves without their reasoning or context — you don't know why they bought or sold, their overall strategy, their risk management, or their other positions, so blindly copying a move you don't understand is dangerous. Third, timing and information asymmetry work against you — by the time you see and react to a smart-money move, the informed participant may already be positioned or exiting, and you might be late. Fourth, it can become an excuse to abandon your own analysis, outsourcing your thinking to wallets you don't really understand, which is the opposite of the independent, evidence-based approach this course teaches. So smart-money tracking is a useful supplementary signal and source of leads, but a dangerous crutch if it replaces your own analysis. Use it to generate ideas and check your views, always doing your own research on anything it surfaces, and never blindly follow wallets whose reasoning and context you don't understand. The informed money's visible actions are a genuine input, but they're not a substitute for the skeptical, independent analysis that is the real skill.`,
          activity: {
            title: "Weigh a smart-money signal",
            prompt:
              "Consider following a 'smart money' wallet. Write down: how would you even establish that a wallet is genuinely informed rather than lucky in hindsight? Then list the pitfalls of acting on its moves (you don't see its reasoning, you may be late, it can replace your own analysis). Finally, note how you'd use smart-money signals well — as leads to research, not commands to follow. The informed money is an input, not a substitute for your own analysis.",
          },
        },
        {
          title: "Exchange flows and what they signal",
          type: "TEXT",
          points: 10,
          body: `We met exchange flows when learning to trace money; now we treat them as a market signal in their own right. Aggregate flows of assets to and from exchanges are among the most-watched on-chain indicators, because they offer a read on the market's collective intent that price alone doesn't provide. Understanding how to read them — and their limits — is valuable market analysis.

## The core signal

The core logic, as established, is that assets moving to exchanges often precede selling (you send to an exchange to trade or sell), while assets moving off exchanges into private wallets often signal accumulation and holding (taking supply into self-custody rather than selling). Aggregated across the whole market, these flows become a sentiment indicator: large net inflows to exchanges suggest holders are, on balance, positioning to sell (potential selling pressure), while large net outflows suggest accumulation and reduced selling pressure (supply leaving the market to be held). Because this reflects what large numbers of holders are actually doing with their assets — moving them toward selling venues or away into cold storage — it offers a read on collective intent and positioning that can precede or explain price moves. Many analysts watch exchange flows as one of their primary on-chain sentiment gauges for exactly this reason.

## Specific flow signals

Beyond the broad direction, specific flow patterns carry signal. A large holder or many holders suddenly moving significant amounts to exchanges can foreshadow selling pressure — worth noting, especially if it's whales or insiders. Sustained outflows from exchanges over time (supply steadily leaving to be held) can indicate a market where holders have conviction and available selling supply is shrinking, sometimes a constructive backdrop. Flows around specific events (a token unlock, a major announcement) can reveal how holders are reacting — moving to exchanges to sell the news, or holding. Exchange reserve levels (how much of an asset sits on exchanges) trending down can suggest accumulation and scarcity, while rising reserves can suggest the opposite. These flow-based signals, read across the market, provide a window into holder behaviour and positioning that complements price analysis, and they're a staple of on-chain market analysis for those who track them.

## Reading flows with appropriate caution

As always, exchange flows should be read with the analyst's caution, because they're inferential and imperfect. Not every deposit to an exchange leads to a sale (people deposit for many reasons — to trade for other assets, to use exchange services, to move between wallets), so flows indicate probable intent, not certainty. The signal is stronger in aggregate and over time than for any single transfer. Flow data can be affected by exchange-specific factors (internal movements, changes in how exchanges hold funds) that muddy the read. And like any popular signal, exchange flows can be watched by so many that their predictive edge is partly priced in. So treat exchange flows as a genuine but imperfect sentiment signal — useful for gauging the market's collective positioning and for flagging notable moves (like whales heading to exchanges), but inferential, best read in aggregate and over time, and best combined with other analysis rather than used alone. Read this way, exchange flows are one of the more valuable on-chain market signals, offering a view of what holders are collectively doing that price alone can't show, while never being a crystal ball.`,
          activity: {
            title: "Read an exchange-flow signal",
            prompt:
              "Find exchange flow or exchange reserve data for a major asset (many analytics sites show net flows or exchange balances). Read the current signal: are assets net flowing to exchanges (potential selling pressure) or off them (accumulation)? Are exchange reserves rising or falling over time? Write down what the flows suggest about collective holder positioning — and note why it's an inferential signal, not a certainty.",
          },
        },
        {
          title: "Stablecoin flows and liquidity",
          type: "TEXT",
          points: 10,
          body: `Stablecoins — tokens designed to hold a steady value — play a special role in crypto markets as the 'cash' that buys other assets, so their flows and supply carry distinctive signal about buying power and liquidity. Reading stablecoin dynamics adds a valuable dimension to on-chain market analysis that complements the asset-flow signals from the last lesson.

## Stablecoins as the market's cash

Stablecoins function as the dollars of crypto — the stable-value medium people hold to sit out of volatile assets and use to buy them. Because of this role, stablecoins represent buying power on the sidelines: stablecoins held ready to deploy are potential demand waiting to flow into other assets. This makes stablecoin supply and flows a meaningful signal. When lots of stablecoin value is sitting on exchanges or in wallets, there's significant potential buying power ready to enter the market; when that stablecoin capital flows into other assets, it represents actual buying demand being deployed. So watching stablecoins is like watching the cash that fuels the market — its quantity, its location, and its movement all indicate the buying power available and how it's being used. This is a distinctive angle: rather than watching the assets being bought, you watch the money that buys them.

## Reading stablecoin signals

Several stablecoin signals are worth reading. Growing total stablecoin supply can indicate capital flowing into the crypto ecosystem (new dollars entering, potential buying power building), while shrinking supply can indicate capital leaving. Large amounts of stablecoins moving onto exchanges can signal buying power being positioned to purchase assets (potential demand incoming — an interesting counterpart to asset inflows signalling selling). Stablecoins flowing from exchanges into protocols or being deployed into assets represents buying power being used. High stablecoin reserves relative to asset prices can suggest significant sidelined buying power that could enter the market. These signals offer a read on the demand side — the available and deploying buying power — that asset-flow signals (which lean toward the supply/selling side) don't capture, making stablecoin analysis a valuable complement. Together, asset flows (potential selling) and stablecoin flows (potential buying) give a fuller picture of the market's supply-and-demand dynamics on-chain.

## Liquidity and the fuller picture

Stablecoins also relate to liquidity — the availability of assets to trade against — since much trading and many protocols are denominated in or backed by stablecoins, so stablecoin availability affects how easily assets can be traded and how much buying support exists. Ample stablecoin liquidity supports trading and provides buying support; thin stablecoin liquidity can mean less buying power and more fragile markets. Reading stablecoin supply, flows, and liquidity thus adds to your understanding of the market's health and buying capacity. As with all these signals, read stablecoin dynamics with the usual caution — they're inferential (stablecoins move for many reasons, and available buying power doesn't guarantee buying), best read in aggregate and over time, and best combined with other signals. But incorporating stablecoin analysis — watching the market's cash and buying power alongside the asset flows and other on-chain data — gives a more complete view of the supply-and-demand forces at work than watching assets alone. The informed on-chain analyst reads both sides: the assets and the stable 'cash' that buys them, building a fuller, more balanced picture of what's really happening in the market beneath the price.`,
          activity: {
            title: "Read the market's buying power",
            prompt:
              "Find data on stablecoin supply or exchange stablecoin balances (analytics sites show these). Read the signal: is total stablecoin supply growing (capital entering, buying power building) or shrinking? Are stablecoins flowing onto exchanges (buying power positioning)? Write down what the stablecoin picture suggests about available buying power — and how it complements the asset-flow (selling-side) signals from the last lesson.",
          },
        },
        {
          title: "On-chain sentiment versus price",
          type: "TEXT",
          points: 10,
          body: `The most valuable insights in on-chain analysis often come from divergences — when what the chain shows about real behaviour disagrees with what the price is doing. Learning to read on-chain signals against price, and to weigh the divergences, is where on-chain analysis offers its sharpest edge over watching price alone.

## Price versus the behaviour beneath it

Price reflects the market's current pricing, driven heavily by sentiment, speculation, and short-term flows. On-chain data reflects what participants are actually doing with their assets — accumulating or distributing, holding or selling, using or abandoning a protocol, real usage growing or shrinking. Often these agree (rising price with genuine accumulation and growing usage). But sometimes they diverge, and the divergences are where the real insight lies, because on-chain behaviour — what people actually do with their money — is frequently a more honest signal than price, which can be manipulated, hyped, or driven by sentiment detached from reality. When the chain shows one thing and price shows another, the chain's picture of real behaviour deserves serious weight, and the divergence itself is valuable information.

## The revealing divergences

Certain divergences are especially telling. A rising price while insiders and large holders are quietly distributing (selling into the strength) suggests the rally is being used as an exit by the informed, often ending badly for latecomers — the price says 'bullish' while the on-chain behaviour says 'the smart holders are leaving'. A falling or flat price while genuine holders accumulate, supply leaves exchanges, and real usage grows suggests underlying strength that price hasn't reflected — the price says 'weak' while the chain says 'real conviction and usage are building'. A pumping price on faked volume and coordinated wallets rather than genuine demand reveals a manipulated move rather than real interest. High price with collapsing real usage and revenue reveals a valuation detached from any fundamentals. In each case, reading the on-chain behaviour against the price exposes a reality the price alone hides — and the divergence, rather than either signal alone, is the insight. The times when on-chain reality most contradicts the price narrative are often the most important moments to notice.

## Weighing the signals wisely

Reading on-chain signals against price is powerful but requires judgement, not mechanical rules. On-chain data is often the more honest signal, but it's not infallible — it's inferential, sometimes noisy, and price can be 'right' for reasons on-chain data doesn't capture (broader market forces, off-chain developments, information not yet reflected on-chain). So a divergence isn't an automatic trade signal but a flag for deeper investigation: when the chain and price disagree, dig into why, weigh the strength and reliability of each signal, and consider what could explain the gap. The skill is holding both the price and the on-chain reality in view, noticing when they diverge, investigating the divergence with the full toolkit (distribution, flows, usage, insider behaviour), and forming an evidence-based judgement about what's really happening beneath the price. This is where on-chain analysis most earns its keep — not in confirming what the price already says, but in revealing, through the honest signal of real behaviour, the moments when the price is telling a story the chain contradicts. Learning to read these divergences, weigh them wisely, and act on genuine insight rather than either price or on-chain data alone, is the culmination of the analytical skills this course builds toward.`,
          activity: {
            title: "Find a price-behaviour divergence",
            prompt:
              "Pick a token and compare its price story to its on-chain behaviour: is the price's message (bullish/bearish) matched by the on-chain reality (accumulation/distribution, real usage, insider behaviour, genuine vs faked activity)? Look for a divergence — where price and on-chain behaviour disagree. Write down any divergence you find and what deeper investigation it would call for. Divergences are where on-chain analysis most earns its edge.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on on-chain market signals before the final module on becoming an independent analyst. These signals — smart money, exchange and stablecoin flows, price divergences — are how the chain informs a view of the market, always as inputs to judgement rather than mechanical rules.`,
          quiz: {
            title: "On-chain signals",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "What's the biggest pitfall of following 'smart money'?",
                explanation:
                  "You see their moves without their reasoning, context, or timing — and identifying who's genuinely 'smart' is often hindsight/luck. Blindly copying moves you don't understand, or letting it replace your own analysis, is dangerous. Use it for leads, not as a crutch.",
                options: [
                  {
                    text: "You see the moves without the reasoning or context, so blindly copying is dangerous",
                    correct: true,
                  },
                  { text: "Smart money is always wrong", correct: false },
                  { text: "Their wallets are impossible to see on-chain", correct: false },
                  { text: "There are no pitfalls — just copy them", correct: false },
                ],
              },
              {
                prompt: "Why do stablecoin flows signal something different from asset flows?",
                explanation:
                  "Stablecoins are the market's 'cash' — buying power on the sidelines. Their flows indicate potential and deploying demand (the buying side), complementing asset flows to exchanges, which lean toward the selling side. Together they give a fuller supply-and-demand picture.",
                options: [
                  {
                    text: "Stablecoins represent buying power, so their flows signal the demand side of the market",
                    correct: true,
                  },
                  { text: "Stablecoin flows are meaningless", correct: false },
                  { text: "They signal exactly the same thing as asset flows", correct: false },
                  { text: "Stablecoins can't be tracked on-chain", correct: false },
                ],
              },
              {
                prompt: "Why are divergences between on-chain behaviour and price so valuable?",
                explanation:
                  "On-chain behaviour — what people actually do with their money — is often a more honest signal than price, which can be hyped or manipulated. When they disagree (e.g. price rising while insiders distribute), the divergence exposes a reality the price hides.",
                options: [
                  {
                    text: "On-chain behaviour is often more honest than price, so divergences expose a hidden reality",
                    correct: true,
                  },
                  { text: "Price is always correct, so divergences are errors", correct: false },
                  { text: "Divergences never actually happen", correct: false },
                  { text: "On-chain data should always be ignored", correct: false },
                ],
              },
              {
                prompt: "How should a divergence between the chain and price be treated?",
                explanation:
                  "Not as an automatic trade signal, but as a flag for deeper investigation — dig into why they disagree, weigh each signal's reliability, and form an evidence-based judgement using the full toolkit. On-chain signals inform judgement, they aren't mechanical rules.",
                options: [
                  {
                    text: "As a flag for deeper investigation and judgement, not an automatic signal",
                    correct: true,
                  },
                  { text: "As an automatic instruction to buy or sell", correct: false },
                  { text: "As proof the price will reverse immediately", correct: false },
                  { text: "As something to ignore entirely", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },

    // =====================================================================
    {
      title: "Becoming an independent analyst",
      description:
        "Putting it together into a repeatable practice: a research process, guarding against your own biases, staying current, acting ethically — and your own report.",
      lessons: [
        {
          title: "Building a research process",
          type: "TEXT",
          points: 10,
          body: `Skills scattered are less than skills organised. To analyse consistently and reliably, you need a research process — a repeatable approach that pulls together the techniques from this course into a systematic way of investigating any token or protocol. A good process makes your analysis thorough, consistent, and much harder to fool.

## Why a process beats improvisation

Without a process, analysis is haphazard — you check whatever catches your eye, miss things you'd have caught if you'd looked, and reach conclusions influenced by what you happened to notice rather than a complete picture. A research process is a checklist and a method that ensures you systematically examine the important dimensions every time, so you don't skip the check that would have revealed the red flag. It also makes your analysis consistent (you apply the same rigour to a token you like and one you don't, guarding against bias) and efficient (you know what to look at and in what order). Just as this whole course put risk and skepticism into a deliberate structure, a personal research process turns your scattered skills into a reliable practice that catches what improvisation misses. The best analysts work to a process, not just intuition.

## What a research process covers

A solid on-chain research process works through the dimensions this course has built: What is this, really (the project, its claims, what it does)? Distribution — who holds it, how concentrated, who are the insiders, are claimed locks real? Fundamentals — real usage, revenue, users versus vanity metrics, is anyone genuinely using it? Scam checks — rug-pull fingerprints, contract safety, honeypot behaviour, wash trading, coordination? Money flows — where do funds move, what do exchange and holder flows suggest, what are insiders and large holders doing? Signals versus narrative — does the on-chain reality match the price and story, or diverge? And throughout: separating fact from inference, and holding conclusions humbly. Working through these systematically — as a checklist you run on anything you seriously analyse — ensures you cover the dimensions that matter and don't miss the check that mattered most. You can adapt and refine the process to your needs, but having one, and following it, is what makes analysis reliable rather than hit-or-miss.

## Documenting and refining

A good process includes documenting your analysis — writing down what you found, your evidence, your reasoning, and your conclusions (with the fact/inference line clear). Documentation forces rigour (vague thinking is exposed when you write it down), creates a record you can revisit and learn from, and lets you separate solid findings from speculation. It also lets you refine your process over time: reviewing past analyses shows you what you missed, what proved right or wrong, and how to improve your checklist and method. Over time, this loop — a systematic process, documented analysis, and honest review of how your analyses held up — steadily makes you a better analyst, catching more, fooling yourself less, and reaching more reliable conclusions. Building a personal research process, following it consistently, documenting your work, and refining it through review is how you turn the individual skills of this course into a durable, improving analytical practice — the mark of a real independent analyst rather than someone who occasionally pokes at the chain.`,
          activity: {
            title: "Draft your research process",
            prompt:
              "Draft your personal on-chain research checklist — the dimensions you'll systematically work through for any serious analysis (what it is, distribution, fundamentals, scam checks, money flows, signals vs narrative, fact vs inference). Write it as a checklist you could actually follow every time. A process turns scattered skills into a reliable practice and catches what improvisation misses.",
          },
        },
        {
          title: "Avoiding your own biases",
          type: "TEXT",
          points: 10,
          body: `The greatest threat to your analysis isn't a lack of data — it's your own biases, the ways your mind distorts what you see to fit what you want or already believe. Guarding against your own biases is one of the most important and most neglected parts of analysis, because the analyst you most need to protect against fooling is yourself.

## Confirmation bias, the chief enemy

The most dangerous bias in analysis is confirmation bias — the tendency to seek, notice, and believe evidence that confirms what you already think or want, while ignoring or dismissing evidence that contradicts it. If you hold a token, you'll unconsciously find reasons it's good and downplay the red flags; if you've committed publicly to a thesis, you'll defend it against contrary evidence. This is fatal to real analysis, because analysis is supposed to follow the evidence wherever it leads, and confirmation bias makes it follow your prior desires instead, dressed up as objectivity. The antidote is deliberate and uncomfortable: actively seek evidence against your view, not just for it; treat contrary evidence with the same seriousness as supporting evidence (or more); and be especially skeptical of conclusions that happen to flatter your holdings or hopes. When your analysis conveniently confirms what you wanted to believe, that's precisely when to double-check it. The disciplined analyst treats their own desired conclusions as suspects, not as findings.

## The other distorting biases

Beyond confirmation bias, several other distortions threaten analysis. Anchoring — fixating on an initial impression or number and failing to update. Recency bias — overweighting the latest events and forgetting the longer pattern. Herd/social bias — believing what the crowd or influential voices believe, rather than the evidence (dangerous in hype-driven crypto). Sunk-cost bias — clinging to a losing position or thesis because you've already invested in it. Overconfidence — reading more certainty into your inferences than the evidence supports (the false certainty this course keeps warning against). Narrative bias — preferring a satisfying story over messy evidence, so you accept a compelling narrative without adequate proof. Each of these warps analysis away from the evidence toward the comfortable, the recent, the popular, or the story. Knowing these biases exist, and watching for them in your own thinking, is a large part of thinking clearly — you can't eliminate biases, but you can catch and correct for them when you know their shapes.

## Structural defences against yourself

Because biases operate largely unconsciously, willpower alone isn't enough — you need structural defences. Following a consistent research process (last lesson) applies the same rigour regardless of your feelings about a token, guarding against selectively checking only what confirms your view. Separating fact from inference forces you to distinguish evidence from wishful interpretation. Actively arguing the opposite case — genuinely trying to make the argument against your own conclusion — surfaces the evidence your bias hid. Seeking out and genuinely considering opposing views and disconfirming evidence counteracts confirmation bias and herd thinking. Documenting your reasoning exposes where you leapt from evidence to desired conclusion. And basic humility — holding conclusions loosely, updating when evidence changes, being willing to be wrong — is the foundation. These structural habits protect your analysis from your own mind far better than resolving to 'be objective', which biases easily defeat. The best analysts aren't those without biases (nobody is); they're those who know their biases, actively guard against them with structure and honest self-scrutiny, and thereby follow the evidence more faithfully than their unexamined instincts would. Guarding against yourself is the final, essential discipline that makes all the other skills trustworthy.`,
          activity: {
            title: "Argue against yourself",
            prompt:
              "Take a current view you hold about a token or the market. Deliberately build the strongest case AGAINST it — genuinely seek the disconfirming evidence your confirmation bias might be hiding. Write it out. Then note which biases you're most prone to (confirmation, herd, sunk-cost, narrative, overconfidence) and one structural habit you'll use to guard against them. The analyst you most need to protect against fooling is yourself.",
          },
        },
        {
          title: "Tools, dashboards and staying current",
          type: "TEXT",
          points: 10,
          body: `While a block explorer and your own eyes are the foundation, a range of tools and dashboards can make on-chain analysis faster and more powerful, and the space evolves constantly. Knowing the landscape of tools, using them wisely, and staying current are practical parts of being an effective analyst — without letting the tools replace understanding.

## The tool landscape

Beyond block explorers, many tools serve on-chain analysis: analytics platforms that aggregate and visualise on-chain data (flows, TVL, revenue, users, holder metrics) into dashboards; token-safety and contract-scanning tools that check for scam patterns; wallet-tracking and labelling services that identify and monitor notable addresses; charting tools that overlay on-chain metrics with price; and specialised dashboards for particular protocols or data. Many have free tiers sufficient for serious analysis. These tools save enormous time — computing metrics, visualising flows, flagging risks, and surfacing data that would take ages to gather manually from a raw explorer. Knowing what tools exist and what each does well lets you work far faster and see patterns that raw exploration would obscure. The effective analyst uses good tools to amplify their analysis, not to avoid it.

## Tools amplify understanding, they don't replace it

A crucial caution: tools should amplify your understanding, not substitute for it. A dashboard showing a metric is useless — or worse, misleading — if you don't understand what the metric means, its limitations, and how it can be gamed (as with TVL, volume, and user counts). Tools that flag scams are helpful but not infallible, and blindly trusting a green checkmark without understanding what was and wasn't checked is dangerous. Relying on tools you don't understand reintroduces exactly the 'trust, don't verify' problem this course fights — you're now trusting the tool's conclusions instead of the ledger's evidence. So the foundation must be genuine understanding (which this course built): know what the underlying data means, what the metrics really measure, how they can mislead, so that you use tools as accelerators for analysis you could in principle do yourself, and can judge when a tool's output is sound or suspect. Understanding first, tools second — tools in the hands of someone who understands the fundamentals are powerful; in the hands of someone who doesn't, they're just a fancier way to be fooled.

## Staying current in a fast-moving space

On-chain analysis evolves constantly — new chains, new protocols, new scam techniques, new tools, new data. Staying effective means staying current: keeping up with new developments in the space, new analytical techniques and tools, and especially new scam and manipulation methods (since bad actors constantly innovate, and yesterday's checks may miss today's schemes). This means ongoing learning — following credible analysts and sources (skeptically), engaging with the analytical community, practising on new situations, and updating your knowledge and process as the space changes. It also means intellectual humility about the limits of your current knowledge, since there's always more to learn and the ground keeps shifting. The analyst who stops learning falls behind as the space evolves past their techniques. So treat on-chain analysis as an ongoing practice of learning and refinement — building on the solid foundation of understanding and skepticism this course provides, adopting useful new tools and techniques, staying alert to new scams, and continually deepening your skill. The fundamentals (public ledger, skepticism, evidence, fact versus inference) endure, but the specifics evolve, and staying current — while never losing the foundational understanding and skeptical mindset — is what keeps an analyst effective over time in this fast-moving space.`,
          activity: {
            title: "Map your toolkit and learning plan",
            prompt:
              "List the tools you'll use in your analysis (block explorer plus any analytics, safety-check, or wallet-tracking tools you know), and for each, note what it's good for and one limitation to stay aware of. Then write your plan for staying current — how you'll keep learning about new techniques and, especially, new scams. Remember: tools amplify understanding, they don't replace it.",
          },
        },
        {
          title: "Ethics and responsible analysis",
          type: "TEXT",
          points: 10,
          body: `On-chain analysis is powerful, and with power comes responsibility. Because you can uncover real information about real people's activity and influence others with your conclusions, the analyst has genuine ethical obligations — around privacy, honesty, and the impact of what you publish. Analysing ethically isn't just virtuous; it protects others from harm and you from becoming part of the problem you're trying to see through.

## Privacy and the power to unmask

The transparency that makes analysis possible also means you can uncover a lot about real people — potentially unmasking pseudonymous individuals, exposing their finances, and revealing activity they intended to keep private. This power carries responsibility. There's a real difference between legitimate analysis (investigating scams, examining public protocols, understanding market dynamics) and harmful uses (doxxing individuals, exposing private people's finances to enable harassment or targeting, unmasking people who have legitimate reasons for privacy). Just because on-chain data is public and you can unmask someone doesn't always mean you should — ordinary people have legitimate privacy interests, and exposing an individual's identity and finances can enable real harm (harassment, theft, extortion, danger). The ethical analyst distinguishes between exposing wrongdoing or analysing public activity in the public interest, and violating the privacy of individuals in ways that harm them without justification. Handle the power to unmask with care, weighing the legitimate purpose against the potential harm, especially for private individuals rather than scammers or public actors.

## Honesty in what you publish

If you share your analysis — and on-chain analysts often do, influencing others — you have a strong obligation to honesty, because people may act on your conclusions with real money at stake. This means: clearly separating fact from inference (never presenting your guesses as certainties, especially when they could move markets or damage reputations); acknowledging uncertainty and alternative explanations rather than false confidence; disclosing your own positions and conflicts of interest (if you hold or are shorting what you're analysing, that biases you and your audience deserves to know); not manipulating others through selectively presented or exaggerated analysis (using 'analysis' to pump or dump for your own benefit is a betrayal, and common); and being willing to correct yourself when wrong. The space is full of dishonest 'analysis' — biased, exaggerated, or self-serving conclusions dressed as objective — and the ethical analyst refuses to add to it, holding themselves to genuine honesty because others may trust and act on their word. Your influence over others' decisions is a responsibility, not just an opportunity.

## Analysis as a force for good

Beyond avoiding harm, on-chain analysis can be a real force for good, and the ethical analyst leans into that. Exposing scams protects people from being defrauded. Revealing manipulation and dishonesty makes the space more honest. Helping people verify claims and think critically counters the hype and lies that harm so many. Contributing genuine, honest analysis raises the level of understanding in a space badly in need of it. The skills this course built can be used to protect and inform people — to be part of the solution in an ecosystem full of deception. Using your analytical power responsibly (respecting legitimate privacy, being scrupulously honest, disclosing conflicts) and constructively (exposing scams, informing others, promoting verification over blind trust) makes you a positive force rather than another source of noise or harm. In the end, the analyst's creed — trust nothing, verify everything, follow the evidence honestly — is itself an ethical stance, a commitment to truth over hype and manipulation. Carrying that commitment through to how you use and share your analysis, with responsibility for others and honesty about what you know, completes what it means to be a genuine on-chain analyst: not just skilled at reading the chain, but trustworthy and constructive in how you use that skill.`,
          activity: {
            title: "Set your analyst's ethics",
            prompt:
              "Write down your personal ethics as an analyst: how you'll handle the power to unmask individuals (weighing legitimate purpose against harm, especially for private people), your commitments around honesty if you share analysis (fact vs inference, disclosing your positions, no self-serving manipulation), and how you'll use your skills constructively. Analysing ethically protects others from harm and you from becoming part of the problem.",
          },
        },
        {
          title: "Your on-chain research report",
          type: "ASSIGNMENT",
          points: 30,
          body: `The capstone. Produce a complete, independent on-chain research report on a token or protocol of your choice — bringing together every skill in this course into one evidence-based analysis.

Your instructor reads this final assignment. It should read like the work of a genuine independent analyst: thorough, skeptical, honest about fact versus inference, and reaching an evidence-based conclusion nobody handed you.`,
          assignment: {
            title: "Your independent research report",
            instructions: `Produce a complete on-chain research report on any token or protocol, using free tools and your own analysis. This is your chance to demonstrate everything you've learned.

Work through your research process and cover all seven:

**1. The subject.** What you're analysing and why, with the key addresses/contract so it can be checked.

**2. What it is, really.** The project and its claims, and what it actually does — cutting through the marketing.

**3. Distribution.** Concentration, insiders (and whether claimed locks check out), and whale/holder behaviour.

**4. Fundamentals.** Real usage, revenue, and users versus vanity metrics — is anyone genuinely using it, and is there real value?

**5. Risk and scam checks.** Rug-pull fingerprints, contract safety, wash trading, or manipulation signs — as relevant.

**6. Signals versus narrative.** What money flows and on-chain behaviour suggest, and whether the on-chain reality matches or diverges from the price and story.

**7. Evidence-based conclusion.** Your honest overall assessment — with a clear separation of fact from inference, acknowledgement of what you couldn't determine, disclosure of any position you hold, and appropriate humility.

Finally, look back at the claim you wrote in lesson one — the one you'd taken on faith. Write one line on whether you could now verify a claim like it yourself.

Read public data only — never handle keys or private information, respect legitimate privacy, and be scrupulously honest about fact versus inference.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Thoroughness and correct technique",
                weight: 35,
                descriptor:
                  "Works systematically through the research process, correctly applying the course's techniques (distribution, fundamentals, scam checks, flows, signals) with genuine block-explorer and tool fluency.",
              },
              {
                criterion: "Honesty and evidence discipline",
                weight: 35,
                descriptor:
                  "Rigorously separates fact from inference, holds conclusions humbly, acknowledges what couldn't be determined and any conflicts of interest, and guards against confirmation bias — the analyst's core discipline throughout.",
              },
              {
                criterion: "Independent, evidence-based conclusion",
                weight: 30,
                descriptor:
                  "Reaches a genuine, well-reasoned conclusion grounded in the evidence gathered — an independent view nobody handed them — demonstrating the whole point of the course, and closes the loop with the lesson-one claim.",
              },
            ],
          },
        },
      ],
    },
  ],
};
