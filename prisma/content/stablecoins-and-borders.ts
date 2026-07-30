import type { ContentCourse } from "./types";

/**
 * Stablecoins and Borders — the most immediately useful course in the
 * catalogue for a West African audience.
 *
 * Written for someone who is paid from abroad, sends money home, or is
 * watching their savings lose value to inflation and a sliding exchange rate.
 * Those are not hypothetical problems here; they are this month's problems.
 *
 * The order runs from understanding to execution and then to consequences.
 * Mechanism first, because "how does a stablecoin hold its price" is the
 * question whose answer tells you which ones can break. Then the practical
 * work of receiving, converting and sending. Then tax, records and the legal
 * position, which is where people who did everything else right still get hurt.
 *
 * The course is careful about two things. It never presents a stablecoin as
 * risk-free — the depeg module exists precisely because the marketing does.
 * And it never tells a student what is legal where they live, because that
 * varies and changes; it teaches them what questions to ask and what records
 * to keep.
 */
export const stablecoinsAndBorders: ContentCourse = {
  slug: "stablecoins-and-borders",
  title: "Stablecoins and Borders: Getting Paid, Saving and Sending",
  subtitle:
    "How dollar-denominated crypto actually works, how to get paid from abroad without losing a fifth of it to fees, and how to hold value when your own currency will not.",
  description: `If you are paid from abroad, send money home, or watch your savings quietly shrink each year, the traditional system charges you heavily for all three. Remittance corridors into Africa are among the most expensive in the world, international transfers take days and fail opaquely, and a currency that loses a third of its value in a year makes long-term saving in it close to pointless.

Stablecoins solve part of that, genuinely and unglamorously. This course covers what they actually are, how each type holds its price, and — the part the marketing skips — which ones can fail and what that failure looks like. You will learn the difference between a stablecoin backed by real reserves, one backed by other crypto, and one backed by nothing but a clever mechanism, because that difference decides whether your savings survive a bad month.

Then the practical half: receiving payment from a foreign client, choosing a network so a transfer costs cents rather than tens of dollars, converting to and from local currency without being robbed on the spread, sending money to family, and holding savings in a way that survives both inflation and your own mistakes.

Finally, the parts that catch careful people: the records you need, how to think about tax without pretending this course is tax advice, and how to find out what is actually legal where you live rather than what a group chat told you.

This course does not tell you crypto is always the answer. Sometimes a bank is cheaper, and it says so.`,
  categorySlug: "money-and-business",
  level: "BEGINNER",
  priceMinor: 0,
  estimatedHours: 16,
  passThreshold: 80,
  instructorEmail: "mabi@mabyacademy.com",
  outcomes: [
    "Explain what a stablecoin is and how each of the three types holds its price",
    "Judge which stablecoins are safe to hold and which carry hidden failure modes",
    "Choose a network so a transfer costs cents instead of tens of dollars",
    "Receive payment from a foreign client without losing a fifth of it to fees",
    "Convert between local currency and stablecoins without being robbed on the spread",
    "Send money across borders faster and cheaper than a remittance service",
    "Hold savings in a way that survives both local inflation and your own mistakes",
    "Keep the records that make tax, proof of income and disputes straightforward",
  ],
  modules: [
    // =====================================================================
    {
      title: "The problem money has with borders",
      description:
        "Why moving value between countries is expensive and slow, and what a stablecoin actually changes about that.",
      lessons: [
        {
          title: "What this course is actually for",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `Most crypto education is about getting richer. This one is about not getting poorer, which for a great many people is the more urgent problem.

## Three situations

You are paid from abroad. A client or employer in another country owes you money, and by the time it reaches your account, a meaningful slice has gone to intermediaries, and several days have passed. Sometimes it fails and nobody can tell you why.

You send money to family, or receive it. Remittance corridors into much of Africa carry some of the highest fees in the world, and the headline fee is not the whole cost — the exchange rate applied is usually worse than the real one, and that spread is often larger than the visible fee.

You are trying to save. If your currency loses value against the dollar year after year, money kept in it shrinks even if you never touch it. Saving diligently in a currency that is falling is running up a downward escalator.

## What stablecoins change

A stablecoin is a token designed to hold a steady value, usually one US dollar. Sending one is sending a blockchain transaction: it settles in seconds to minutes, costs cents on the right network, works at 2am on a Sunday, does not care about borders, and cannot be silently reversed or held for review.

For someone in a stable currency with good banking, that is a modest convenience. For someone whose currency is falling, whose bank transfers take days, and whose remittance costs 8%, it is a different thing entirely.

## What this course will not do

It will not tell you crypto is always better. Sometimes a bank transfer is cheaper and simpler, and this course says so where it is true.

It will not tell you a stablecoin is risk-free. Several have failed. One of them wiped out an enormous amount of ordinary people's savings in three days, and an entire module here is about why.

It will not tell you what is legal where you live. That varies by country, it changes, and getting it wrong from a course written elsewhere is worse than not knowing. What it will do is teach you what to ask and what records to keep.

## What it will do

Make you competent at the actual mechanics — receive, convert, send, hold, record — so that money crossing a border stops being something that happens to you and becomes something you control.`,
          activity: {
            title: "Cost the problem you actually have",
            prompt:
              "Pick the one situation that applies most to you — being paid from abroad, sending or receiving family money, or trying to save in a falling currency. Now put a number on it. Roughly how much money passes through that situation in a year, and roughly what percentage do you lose to fees, spread, or currency decline? Multiply. Write the annual figure down. That number is what this course is worth to you, and it is usually larger than people expect.",
          },
        },
        {
          title: "Why sending money abroad is expensive",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `To understand what stablecoins improve, you need to know why the existing system costs what it does. It is not simply greed — though there is some of that. It is structural.

## No bank talks to every other bank

There is no single global banking network. Your bank has relationships with some banks, which have relationships with others. A payment from Lagos to Toronto may pass through three institutions, each taking a fee and each adding a delay.

This is the correspondent banking system, and it is genuinely old. Every hop is a separate institution doing its own checks in its own hours.

## Nobody is open at the same time

Banks settle in batches, during business hours, on working days. A transfer sent Friday afternoon may not begin moving until Monday, and if it crosses a weekend and a public holiday in either country, it can sit for four days having done nothing.

## Compliance costs are real and are passed to you

Every institution must check sanctions lists, verify identity, and file reports. That work costs money. Smaller corridors — and Africa has many — carry higher costs per transfer because the volume does not spread the fixed cost.

Some banks have simply withdrawn from corridors they consider too costly to police, which reduces competition and raises prices for everyone left.

## The spread is the hidden fee

The visible fee is usually not the main cost. The exchange rate you are given is worse than the real market rate, and the difference is revenue. A service advertising a low fee and taking 3% on the rate is more expensive than one charging a higher fee at the true rate.

Always compare the amount that actually arrives. It is the only number that is not marketing.

## The failure mode nobody prices

Transfers get held for review. The money is neither with you nor with the recipient, nobody will tell you why, and there is no deadline. If you have ever been the person waiting, you know this cost is not measured in percentages.

## What a blockchain removes

There are no correspondents; the network is one system. There are no business hours. There is no batch. Settlement is final in minutes and nobody in the middle can hold it.

That does not make it free or better in every way — and the rest of this course is honest about where it is worse. But the specific costs above are structural to the old system, and they are the ones that go away.`,
          activity: {
            title: "Find the real rate",
            prompt:
              "Take a service you or your family actually uses to move money. Find two numbers: the fee it advertises, and the exchange rate it applies. Then find the real mid-market rate for the same pair right now. Calculate the total cost as a percentage — fee plus spread — on a realistic amount. Write down both the advertised fee and the true total. For most people the gap between those two numbers is the surprise of this lesson.",
          },
        },
        {
          title: "What a stablecoin actually is",
          type: "TEXT",
          points: 10,
          body: `The name suggests something inherently stable. Nothing about a token is inherently anything — a stablecoin is stable because of a mechanism, and the mechanism is what you have to understand.

## The basic idea

A stablecoin is a token that aims to hold a fixed value, almost always one US dollar. It moves like any other token — wallet to wallet, on a blockchain, settling in seconds — while behaving in price like the currency it tracks.

That combination is the whole product: dollar stability with blockchain settlement.

## Why it is not automatic

A token's price is whatever people will pay for it. For that to stay at a dollar, something must reliably create buying pressure when it drifts below and selling pressure when it drifts above.

There are three ways this is done, and they carry completely different risks. Distinguishing them matters more than any other single thing in this course, so the next lessons take one each.

Briefly: some are backed by real dollars in real bank accounts. Some are backed by other cryptocurrency, over-collateralised so a fall does not break them. And some were backed by nothing but a mechanism — those are the ones that failed.

## What a stablecoin is not

It is not a bank deposit. There is no deposit insurance. If the issuer becomes insolvent, you are a creditor, and creditors of failed companies do not always get paid.

It is not a claim you can necessarily enforce. The right to redeem a token for a real dollar generally sits with large institutional partners, not with an individual holding forty dollars. You rely on the market to maintain the price, and the market relies on those partners being able to redeem.

It is not the dollar. It tracks the dollar, and tracking can fail.

## Why it works anyway

For all those caveats, the major reserve-backed stablecoins have held their value through several severe market events, and they move enormous volume daily. They are useful and they work. But "works reliably" and "cannot fail" are different claims, and only the first one is true.

Hold that distinction. It is the difference between using this tool well and being surprised by it.`,
          activity: {
            title: "Say it in your own words",
            prompt:
              "Write a short explanation of what a stablecoin is for someone who has never used crypto — a parent, a colleague, a client. You must include three things: that it holds a dollar value by a mechanism rather than by nature, that it moves like a blockchain transaction, and that it is not a bank deposit and carries no insurance. Keep it under 150 words. If you cannot explain it plainly, you do not have it yet.",
          },
        },
        {
          title: "The three kinds, and which ones broke",
          type: "TEXT",
          points: 10,
          body: `This is the most important lesson in the first half of the course. Get this distinction and you will never hold a stablecoin whose failure mode you do not understand.

## Type one: backed by real reserves

The issuer holds real dollars — cash and short-term government debt — in real accounts, and issues one token per dollar held. When large partners want to redeem, the issuer sells reserves and pays out.

Risk: the issuer. Are the reserves actually there, are they genuinely liquid, is the issuer solvent, and can the accounts be frozen? These are questions about a company, not about mathematics.

What to check: whether reserves are attested by an independent auditor, how often, and what the reserves actually consist of. Cash and short-dated government debt is very different from commercial paper of uncertain quality.

One of the largest reserve-backed coins briefly lost its peg when part of its reserves sat in a bank that failed. It recovered when the deposits were guaranteed. That was a genuinely close call and it is the right lesson: the risk in this type is banking risk, and banking risk is real.

## Type two: backed by other crypto, over-collateralised

You lock up crypto worth more than the stablecoins you mint — often 150% or more — in a smart contract. If the collateral falls in value, it is automatically sold to keep the system solvent.

Risk: the contract, the price feeds it relies on, and violent market falls that outrun the liquidation machinery. It is more transparent than type one — you can inspect the collateral on chain — and more complex.

## Type three: backed by nothing but a mechanism

An algorithm expands and contracts supply, or lets holders swap between the stablecoin and a companion token, to push the price back to a dollar. There are no reserves. The stability depends on people continuing to believe it will be stable.

This type has failed repeatedly, and one failure in 2022 destroyed something on the order of forty billion dollars of value in about three days. Ordinary people lost savings, and some of them lost everything, because the yield being offered was extraordinary and the risk was described as minimal.

The mechanism is circular: the coin is worth a dollar because the companion token has value, and the companion token has value because the coin is worth a dollar. When confidence goes, both go, and they go together, quickly.

## The practical rule

For holding value — savings, payment, remittance — use a major reserve-backed stablecoin, and know which company issues it and what backs it. That is the boring answer and it is the right one.

Treat any stablecoin offering an unusually high yield as a warning rather than an opportunity. The yield is the compensation for a risk that has not been explained to you, and in this specific category, that risk has historically been total.`,
          activity: {
            title: "Identify what you are actually holding",
            prompt:
              "Name every stablecoin you currently hold or have considered holding. For each, look up and write down: which type it is, who issues it, what backs it, and how often those reserves are independently attested. If you cannot find a clear answer to any of those for a coin you hold, write that down — an unanswerable question here is itself the answer, and it should change what you hold.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check before we go anywhere near moving money. The distinction between the three types is the one that decides whether your savings survive, so it is worth being certain rather than roughly right.`,
          quiz: {
            title: "How stablecoins hold their value",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "What makes a reserve-backed stablecoin hold its price?",
                explanation:
                  "The issuer holds real dollars and short-term government debt, and large partners can redeem tokens for those reserves. The risk is therefore about a company and its banking: are the reserves real, liquid, and safe from freezing or insolvency.",
                options: [
                  {
                    text: "An issuer holding real reserves that large partners can redeem against",
                    correct: true,
                  },
                  { text: "An algorithm that expands and contracts supply", correct: false },
                  { text: "Government guarantee and deposit insurance", correct: false },
                  { text: "Its listing on major exchanges", correct: false },
                ],
              },
              {
                prompt: "Why did the large algorithmic stablecoin collapse in 2022?",
                explanation:
                  "Its stability was circular — the coin held its value because a companion token had value, and that token had value because the coin held its peg. Nothing backed either. When confidence broke, both fell together within days.",
                options: [
                  {
                    text: "Nothing backed it — stability depended on circular confidence between two tokens",
                    correct: true,
                  },
                  { text: "Its reserve bank failed", correct: false },
                  { text: "Its smart contract was exploited", correct: false },
                  { text: "Regulators forced it to shut down", correct: false },
                ],
              },
              {
                prompt: "Is a stablecoin balance protected like a bank deposit?",
                explanation:
                  "No. There is no deposit insurance. If the issuer becomes insolvent you are an unsecured creditor, and creditors of failed companies are not always made whole. This is a real difference from a bank account, not a technicality.",
                options: [
                  { text: "No — there is no deposit insurance and you are an unsecured creditor", correct: true },
                  { text: "Yes, up to the same limits as a bank account", correct: false },
                  { text: "Yes, if the issuer is regulated", correct: false },
                  { text: "Yes, because reserves are held one to one", correct: false },
                ],
              },
              {
                prompt:
                  "A stablecoin offers 19% annual yield with the risk described as minimal. What should you conclude?",
                explanation:
                  "That the yield is compensation for a risk nobody has explained. This is close to the exact profile of the algorithmic coin that failed in 2022, where the extraordinary yield was the draw and the risk turned out to be total loss.",
                options: [
                  {
                    text: "The yield is paying for an unexplained risk, and in this category that risk has been total",
                    correct: true,
                  },
                  { text: "It is a good opportunity while it lasts", correct: false },
                  { text: "It is safe if the protocol is large and well known", correct: false },
                  { text: "It is fine for a small portion of savings", correct: false },
                ],
              },
              {
                prompt: "When comparing money-transfer services, which number actually matters?",
                explanation:
                  "The amount that arrives. The advertised fee omits the exchange-rate spread, which is frequently the larger cost — a low fee at a poor rate is more expensive than a higher fee at the true rate.",
                options: [
                  { text: "The amount that actually arrives at the other end", correct: true },
                  { text: "The advertised transfer fee", correct: false },
                  { text: "The stated delivery time", correct: false },
                  { text: "Whether the service is well known", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Networks, fees and getting it right",
      description:
        "The same token on the wrong network costs forty times more — or is lost entirely. The practical mechanics of moving it.",
      lessons: [
        {
          title: "The same coin lives on many networks",
          type: "TEXT",
          points: 10,
          body: `This single misunderstanding costs beginners more money than any other in this course, and the loss is usually permanent.

## The thing to understand

A major stablecoin is not one token. The issuer deploys a separate version on each blockchain it supports. The one on Ethereum, the one on Tron, and the one on a low-cost network are different tokens that happen to share a name and a price.

They are not interchangeable by sending. Moving between networks requires either a bridge or an exchange, both of which are deliberate operations.

## The expensive mistake

You withdraw from an exchange and are asked to pick a network. You pick the default, or the cheapest, without checking what the receiving wallet or exchange actually supports.

If the receiving side does not support that network, the funds arrive at an address that exists on a chain nobody is watching. Sometimes a support team can recover them. Often they cannot, and it is gone.

## The rule

Before any withdrawal, check the network on the receiving side first, then select the matching network on the sending side. Not the reverse. The receiving side is the constraint.

Then send a small test amount, confirm it arrives, and only then send the rest. On a cheap network the test costs cents. It is the best value insurance in this entire subject and almost nobody does it the first few times.

## Why fees differ so much

Each network prices its own block space. A network in heavy demand with limited capacity charges a lot; a network built for cheap throughput charges very little.

The difference is not marginal. The same transfer might cost several dollars on one network and a fraction of a cent on another. On a hundred-dollar remittance, that is the difference between a sensible transfer and a pointless one.

## Choosing sensibly

For everyday amounts, use a low-cost network that both sides support. The saving is the entire reason this is better than a bank.

For very large amounts, some people prefer the most established network despite the cost, on the reasoning that a few dollars is irrelevant against the size and the security record is the longest. That is a defensible trade at size and a silly one on fifty dollars.

Always let the receiving side decide what is possible, then optimise cost within that.`,
          activity: {
            title: "Write your own network checklist",
            prompt:
              "Write the exact sequence you will follow before every withdrawal, in your own words, as numbered steps. It must include: checking the receiving side's supported networks first, matching on the sending side, sending a test amount, confirming arrival, and only then sending the rest. Then find out which networks your own exchange and wallet actually support and write those down too, so the check takes seconds rather than minutes next time.",
          },
        },
        {
          title: "Fees, confirmations and what you actually pay",
          type: "TEXT",
          points: 10,
          body: `To compare crypto honestly against a bank, you have to count all the costs, not just the visible network fee. People routinely under-count and then get a surprise.

## The network fee

Paid to the network for processing. On busy networks it rises with demand; on cheap networks it is negligible and stable. This is the fee people quote, and it is often the smallest part.

## The exchange withdrawal fee

Most exchanges charge their own fee to withdraw, and it is frequently much larger than the network fee — sometimes a fixed amount that makes small withdrawals absurd. Check it before you plan around it. Withdrawing 20 dollars against a 5 dollar withdrawal fee is a 25% cost.

## The conversion spread, twice

Getting in and getting out. If you convert local currency to stablecoins at one rate and back at another, both spreads are real costs. On a round trip they can easily exceed everything else combined.

This is the cost people most often forget, because it does not appear as a fee. It appears as a slightly worse rate, which does not feel like paying.

## Confirmations

A transaction is broadcast, included in a block, then buried under further blocks. More confirmations means harder to reverse. Exchanges require a set number before crediting you, which is why a transfer can be visible on chain and not yet usable.

For ordinary amounts on modern networks this is seconds to a couple of minutes. Knowing it exists prevents the panic of "it says confirmed but my balance has not changed".

## Doing the honest comparison

Add it all up: withdrawal fee, network fee, both conversion spreads, and any local cash-out cost. Compare that total against what a bank or remittance service would take from the same amount.

For small amounts, a cheap local service sometimes wins. For anything meaningful, on a low-cost network, crypto usually wins substantially — but you should know rather than assume, and the arithmetic takes two minutes.

## The habit

Before any transfer that matters, write down the four numbers: what leaves, what the fees are, what the rate is, and what should arrive. Then check what actually arrived against it. Two or three rounds of that and you will know your real costs precisely, which is more than most people can say about their bank.`,
          activity: {
            title: "Cost a real transfer end to end",
            prompt:
              "Take a transfer you would realistically make — an amount, a source, a destination. Work out the full cost: exchange withdrawal fee, network fee, the spread converting in, the spread converting out, and any local cash-out cost. Total it as a percentage. Then find what a bank or remittance service would charge for the same amount and compare. Write both numbers and your conclusion — and if the bank wins at that size, write that down honestly too.",
          },
        },
        {
          title: "Custody for money you are moving",
          type: "TEXT",
          points: 10,
          body: `Money passing through is a different problem from money being saved, and the right custody choice differs.

## Money in motion versus money at rest

Funds you are about to convert or spend — in your wallet for hours or days — need convenience and reasonable safety. Funds you are holding for months need maximum safety and no convenience at all.

Using one arrangement for both means either your savings sit somewhere too accessible, or your working money is locked somewhere too awkward. Most people default to the first, which is the more expensive mistake.

## Where working balances belong

A software wallet you control, on your phone, holding an amount you are actively using. You control the keys, so nobody can freeze it, and the amount is small enough that a mistake is survivable.

Or an exchange account, if you are converting immediately anyway. The trade is real: they can freeze you, but they can also help when something goes wrong, and the funds are there for minutes rather than months.

## Where savings belong

Not on an exchange. Not in the wallet you use daily. A separate wallet, ideally a hardware one, that you do not connect to anything.

The reasoning is the same as in the security course: separate the risk profiles so a mistake with your working money cannot reach your savings.

## Counterparty risk is not theoretical

Exchanges have failed, taking customer funds with them. Some were fraud, some incompetence. In every case, people who considered their balance to be "their money" discovered they held a claim against a company rather than an asset.

The saying is worn out because it is accurate: if you do not hold the keys, you hold a promise. A promise from a large regulated institution is a decent promise. It is still not the same thing as holding the asset.

## The practical arrangement

Working balance in a wallet on your phone, sized to what you actually move in a month. Savings in a separate wallet you rarely open. Exchange used as a conversion venue rather than a storage venue — money arrives, converts, and leaves the same day.

That last habit is the one worth building. An exchange is a place you pass through, not a place you live.`,
          activity: {
            title: "Split your money by job",
            prompt:
              "Write down every place you currently keep value, with rough amounts. Then label each one: money in motion, or money at rest. Where the label does not match the storage — savings sitting on an exchange, or a working balance locked away awkwardly — write down the specific change you will make and by when. Most people find their savings are in the convenient place and their working money is fine; fixing that one mismatch is the whole exercise.",
          },
        },
        {
          title: "Mistakes that cannot be undone",
          type: "TEXT",
          points: 10,
          body: `Blockchain transfers are final. That is the feature — nobody can reverse or freeze them — and it is the danger. Here are the irreversible mistakes, in the order people make them.

## Wrong network

Covered already because it is the most common. Sending on a network the receiving side does not support. Sometimes recoverable through support, often not.

## Wrong address

Addresses are long strings. People copy the wrong one, or paste a stale one from the clipboard, or fall for address poisoning — where an attacker plants a lookalike address in your history hoping you will copy it later.

The defence: copy from the source every time, check the middle of the address rather than just the ends, and send a test amount first.

## Wrong token

Sending a different token to an address expecting a specific one. Some exchanges recover these for a fee; some do not.

## Sending to a contract or an exchange address that cannot receive it

Some addresses are not designed to receive arbitrary tokens. Funds sent there may be stuck permanently.

## Missing the memo

Some exchanges require a memo or tag alongside the address to know whose account to credit. Omitting it means the funds arrive at the exchange and are not attributed to anyone. Recoverable through support sometimes, and a long, unpleasant process.

If the deposit screen shows a memo field, it is required. Not optional. Not "probably fine".

## The habit that prevents all of them

Test first. On a low-cost network a test transfer costs a fraction of a cent and takes under a minute. Send a small amount, confirm it arrives and is credited, then send the rest.

Everyone skips this until the first time they do not, and then they never skip it again. You can have that lesson for free by simply adopting it now.

## And when it does go wrong

Contact the receiving platform's support quickly, through their official site — never a person who messages you. Provide the transaction hash. Be realistic: some of these are recoverable and some are not, and anyone who guarantees recovery for a fee is running a second scam on someone who has just lost money.`,
          activity: {
            title: "Write the pre-send checklist",
            prompt:
              "Write a short pre-send checklist — six lines or fewer — that you will actually run before any transfer. It must cover network match, address verified from source, correct token, memo if the screen shows one, test amount sent and confirmed, then full amount. Put it somewhere you will see it when sending: a note on your phone, or the top of wherever you keep your addresses. Then write down which of these mistakes you have already made or nearly made.",
          },
        },
        {
          title: "Assignment: plan a real transfer",
          type: "ASSIGNMENT",
          points: 25,
          body: `The first graded work. It asks you to plan a genuine transfer end to end — the one you would actually make — so that an instructor can find the hole before it costs you anything.

Use real numbers and real services. A plan built on hypotheticals teaches nothing.`,
          assignment: {
            title: "End-to-end transfer plan",
            instructions: `Plan one real transfer you would genuinely make. 500 to 800 words. Do not include private keys, recovery phrases, passwords, or any account credentials — the plan describes the route, never the secrets.

**1. The situation.** What you are moving, from where to where, roughly how much, and how often this happens. State whether this is payment for work, family remittance, savings, or something else.

**2. The route.** Every step from start to finish: how funds enter crypto, which stablecoin, which network and why, which wallet or exchange at each stage, and how funds reach their final form. Name real services.

**3. The full cost.** Every cost, itemised: conversion spread in, exchange withdrawal fee, network fee, conversion spread out, local cash-out cost. Total it in both money and percentage.

**4. The comparison.** What a bank or remittance service would cost for the same transfer. State which wins and by how much. If the traditional route wins at this size, say so — that is a correct answer, not a failed assignment.

**5. The failure modes.** For your specific route: what happens if you pick the wrong network, if the receiving side needs a memo, if the address is wrong, if a service freezes the transaction. For each, state what you would do and whether the money is recoverable.

**6. The checks.** The test transfer you will make, its size, and exactly what you will confirm before sending the rest.

Nobody at this academy will ever ask you for a recovery phrase, private key or password — not in this assignment, not in support, not anywhere.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "The route is specific and complete",
                weight: 25,
                descriptor:
                  "Every step named with real services, a stated stablecoin and a justified network choice. Full marks explain why that network, rather than simply naming one.",
              },
              {
                criterion: "Costs are fully itemised, including both spreads",
                weight: 25,
                descriptor:
                  "All five cost components present and totalled in money and percentage. Full marks catch both conversion spreads, which is the cost most people omit because it does not look like a fee.",
              },
              {
                criterion: "The comparison is honest",
                weight: 20,
                descriptor:
                  "A real traditional-route cost for the same amount, with a clear verdict. Concluding that the bank wins where it genuinely does scores full marks; forcing a crypto conclusion does not.",
              },
              {
                criterion: "Failure modes are traced to outcomes",
                weight: 20,
                descriptor:
                  "Each named failure followed through to what the writer would actually do and whether the funds are recoverable. Full marks recognise which failures are permanent.",
              },
              {
                criterion: "Verification step is concrete",
                weight: 10,
                descriptor:
                  "A test transfer with a stated size and a stated confirmation before proceeding — not a vague intention to be careful.",
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Getting paid from abroad",
      description:
        "The freelancer and remote-worker module: invoicing, receiving, converting, and looking professional while doing it.",
      lessons: [
        {
          title: "Asking a client to pay you in stablecoins",
          type: "TEXT",
          points: 10,
          body: `Many clients have never done this, and how you raise it decides whether it happens. Handled badly it sounds risky and unprofessional. Handled well it sounds like you are making their life easier — which, done right, you are.

## Lead with their benefit

For the client, the pitch is: it arrives in minutes instead of days, it costs them less in fees, and it does not fail for reasons neither of you can see.

Do not lead with your problems. "My banking system is difficult" invites them to conclude you are difficult to pay. "This settles same-day and costs you less" invites them to conclude you are easy to work with.

## Make it concrete and small

Do not ask them to restructure how they pay everyone. Ask them to try it on one invoice.

Give them exactly what they need: which stablecoin, which network, the address, and a note that they should send a small test first if they are nervous. Precision reads as competence; vagueness reads as risk.

## Anticipate the three objections

Is this legal? For them, sending a payment for services rendered is a normal business payment. What they need is the same paperwork they always need: an invoice, a description of the work, a record.

How do I buy it? If they have never touched crypto, this is the real friction. A reputable exchange with business accounts, or a payment processor that takes their card and delivers a stablecoin payment, removes it. Have a specific suggestion ready.

What if it goes wrong? Test transfer. Say it before they ask.

## Price it properly

If the client is doing you a favour by trying something new, do not also ask them to absorb costs. State clearly who pays the network fee — it should usually be them, as it replaces the wire fee they were already paying, and it is far smaller.

## Invoice like a professional

Your invoice should look exactly like any other invoice: your details, their details, invoice number, date, description of work, amount in dollars, payment terms. Then a payment section with the token, the network, and the address.

That last part matters more than it sounds. An invoice that looks like a normal invoice with a crypto payment method reads as a business. A message saying "send USDT here" reads as something else, and it is the difference between being paid and being ignored.

## When not to push

If a client is uncomfortable, drop it. A client who pays slowly by bank is worth more than a client who is anxious about how they are paying you. This is a tool for the clients who find it easier, not a hill to die on.`,
          activity: {
            title: "Write the actual message",
            prompt:
              "Write the real message you would send to a real client proposing this — not a template, the actual words for a specific person. It should lead with their benefit, ask for one invoice rather than a policy change, name the token and network, offer the test transfer before they ask, and state who covers the fee. Keep it under 200 words. Then write your answer to whichever of the three objections that particular client is most likely to raise.",
          },
        },
        {
          title: "Invoicing, records and looking like a business",
          type: "TEXT",
          points: 10,
          body: `Being paid in stablecoins does not exempt you from the paperwork of being paid. If anything it raises the standard, because you cannot rely on a bank statement to reconstruct what happened.

## What a proper invoice contains

Your name or business name and contact details. The client's details. A unique invoice number. Issue date and due date. A clear description of the work. The amount, stated in dollars. Payment terms.

Then: the token, the network, and the receiving address. Optionally a note about the test transfer.

The dollar amount is the invoice. The stablecoin is the payment method. Keep that separation clear — it is how accountants, clients and tax authorities all think, and matching their model prevents most confusion.

## What to record when payment arrives

The transaction hash. The date and time. The amount received. The value in your local currency at the time it arrived. Which invoice it settles. Which wallet or address received it.

That last column is what makes a year of transactions reconstructable. Without it, you will be reading a blockchain explorer in eleven months trying to remember which payment was which.

## Why local-currency value at the time matters

Wherever you eventually report income, it will be in local currency. A payment received when the rate was one number and converted when it was another produces two events: income at the first rate, and a gain or loss on the difference.

You cannot reconstruct the first number later without knowing the date, and rates move. Record it when it arrives. It takes ten seconds then and is genuinely difficult to recover later.

## Keep a single ledger

A spreadsheet is enough. Date, client, invoice number, amount in dollars, token, network, transaction hash, local value at receipt, date converted, local value at conversion, notes.

Update it when money arrives, not at year end. The people who do it at year end either spend a miserable week on it or quietly guess, and guessing is what turns a tax question into a tax problem.

## Why this also protects you

A dispute, a client who claims they did not pay, a bank asking where funds came from, a visa or loan application asking you to evidence income — all of these are straightforward with a ledger and impossible without one.

Proving income as a freelancer paid in crypto is a real difficulty, and the people who manage it are the ones who kept records from the first payment rather than starting when someone asked.`,
          activity: {
            title: "Build the ledger and backfill it",
            prompt:
              "Create the ledger now — a spreadsheet with the columns from this lesson. Then backfill it with every crypto payment you have already received, as far back as you can reconstruct. Write down how far back you managed to get and what information was impossible to recover. That gap is the cost of not having started earlier, and it is the most persuasive argument for keeping it current from today.",
          },
        },
        {
          title: "Converting to local currency without being robbed",
          type: "TEXT",
          points: 10,
          body: `Getting dollars into your hands as local currency is where a lot of the value can quietly leak away, and it is the step with the most variation between countries.

## Understand the two rates

There is an official rate and there is the rate people actually transact at. In countries with currency controls these can differ substantially, and which one you get depends entirely on the route you use.

Knowing both, today, before you convert, is the single most valuable habit here. Converting without checking is how people accept a rate 10% worse than available and never find out.

## The main routes

Peer-to-peer marketplaces on major exchanges. You are matched with someone buying your stablecoins for local currency, with the exchange holding the crypto in escrow until you confirm the money arrived. Usually the best rates, because it is a real market.

Local exchanges and brokers. Simpler, often worse rates, sometimes better reliability.

Payment services that convert directly to a bank account or mobile money. Convenient, and the convenience is priced in.

## Doing peer-to-peer safely

Only inside the platform's escrow. Never agree to move the trade to a private chat and settle directly — that is the entire scam and it works because the other party seems reasonable and offers a better rate.

Check the counterparty's completed trade count and rating. Prefer high volume and long history over a slightly better price.

Confirm the money has actually arrived in your account — genuinely arrived, not a pending notification or a screenshot — before releasing the crypto. Fake payment confirmations, including convincing forged screenshots, are the standard attack.

Never release early because someone is in a hurry. The hurry is manufactured.

## Watch for the reversible-payment trap

If the buyer pays you by a method that can be reversed after the fact, they can take the money back once you have released the crypto. Prefer payment methods that are final, and be cautious with any that are not.

## The frozen-account risk

In some countries, banks flag accounts receiving frequent payments from many unrelated individuals — which is exactly what peer-to-peer trading looks like from the bank's side.

This is a real risk that people discover the hard way. Mitigations: do not use your main salary account for this, keep the volumes reasonable and consistent, and keep records showing what every payment was for. If your bank asks, being able to answer immediately with documentation is the difference between a phone call and a closed account.

## Compare before every conversion

Rates move and platforms differ. Checking two or three takes two minutes on an amount that matters. Over a year of regular conversions, that habit is worth more than most of the optimisation in this course.`,
          activity: {
            title: "Compare three routes today",
            prompt:
              "Find the actual rate you would get right now, for a realistic amount, on three different routes available where you live — a peer-to-peer marketplace, a local exchange or broker, and one other. Write down the effective rate for each and what you would actually receive. Then note the spread between best and worst as a percentage. Finally, write down which bank account you would use for peer-to-peer and why it should not be your main one.",
          },
        },
        {
          title: "When a bank is genuinely the better answer",
          type: "TEXT",
          points: 10,
          body: `A course like this has an obvious bias, and the honest thing is to name where the traditional route wins. Sometimes it does, clearly.

## When the amounts are small and frequent

Fixed costs — exchange withdrawal fees, conversion minimums, the time each conversion takes — do not shrink with the amount. On very small transfers a cheap local service or mobile money can be better, particularly if it is instant and local.

## When the recipient cannot handle crypto

If the person receiving needs cash in hand and has no straightforward way to convert, you have moved the difficulty rather than solved it. A relative who must find a trader, negotiate a rate and risk a bad counterparty is worse off than one who collects at a familiar counter.

Solve for the recipient's competence, not your own.

## When you need documented, traceable payments

Mortgage applications, visa applications, tax residency questions, business audits. Bank statements are universally accepted evidence. A blockchain history plus a spreadsheet is defensible but requires explanation, and some institutions will simply not engage with it.

If a payment needs to be evidence later, a bank transfer is sometimes worth its cost purely for the paperwork.

## When the legal position is unclear or hostile

If crypto conversion sits in a grey area where you live, or banks in your country actively close accounts over it, the risk-adjusted cost is much higher than the fee suggests. A closed bank account costs far more than a 6% remittance fee.

Know your actual situation rather than the situation described in a group chat by someone in another country.

## When speed does not matter

If money is not needed for a week, the difference between two days and two minutes is worth nothing. Do not pay complexity for speed you do not need.

## The honest summary

Crypto rails win decisively when: the amount is meaningful, both sides are competent, speed matters, and the corridor is expensive. That is a large share of real cases — but it is not all of them.

The person who understands both routes and picks correctly each time beats the person who always uses one. Being good at money is knowing which tool the situation calls for, not being loyal to a tool.`,
          activity: {
            title: "Decide for your three most common cases",
            prompt:
              "List the three money-movement situations you deal with most often. For each, write down which route you should actually use — crypto rails or traditional — and the one factor that decides it: amount, recipient competence, documentation need, legal position, or speed. Be honest where the bank wins. Then write down the one situation where you have been using the wrong route out of habit.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on the practical half. These are the questions whose wrong answers cost real money — network selection, peer-to-peer safety, and knowing when not to use crypto at all.`,
          quiz: {
            title: "Moving money in practice",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "Before withdrawing a stablecoin, what determines which network you choose?",
                explanation:
                  "The receiving side. It is the constraint — if it does not support the network you send on, the funds arrive somewhere nobody is watching and are often unrecoverable. Choose within what the receiver supports, then optimise for cost.",
                options: [
                  { text: "What the receiving wallet or exchange supports", correct: true },
                  { text: "Whichever network is cheapest", correct: false },
                  { text: "The default the exchange suggests", correct: false },
                  { text: "The network with the most confirmations", correct: false },
                ],
              },
              {
                prompt:
                  "In a peer-to-peer trade, the buyer sends a convincing payment screenshot and asks you to release quickly. What do you do?",
                explanation:
                  "Release only after confirming the money has genuinely arrived in your account. Forged screenshots are the standard attack and the urgency is manufactured. Nothing is lost by waiting for the funds to actually appear.",
                options: [
                  {
                    text: "Wait until the money has genuinely landed in your account, ignoring the urgency",
                    correct: true,
                  },
                  { text: "Release, since the screenshot is evidence of payment", correct: false },
                  { text: "Release if their rating is high", correct: false },
                  { text: "Move to private chat to resolve it faster", correct: false },
                ],
              },
              {
                prompt: "Which cost do people most often leave out when comparing crypto to a bank?",
                explanation:
                  "The conversion spread, counted on both the way in and the way out. It does not appear as a fee — it appears as a slightly worse rate — so it does not feel like paying, but on a round trip it frequently exceeds all the visible fees combined.",
                options: [
                  { text: "The conversion spread, on both the way in and the way out", correct: true },
                  { text: "The network fee", correct: false },
                  { text: "The exchange withdrawal fee", correct: false },
                  { text: "The time spent waiting for confirmations", correct: false },
                ],
              },
              {
                prompt: "When is a traditional bank transfer clearly the better choice?",
                explanation:
                  "When the recipient cannot handle crypto safely. Moving the difficulty onto someone who must find a trader and risk a bad counterparty makes them worse off. Solve for the recipient's competence, not your own.",
                options: [
                  {
                    text: "When the recipient has no safe way to convert and needs cash in hand",
                    correct: true,
                  },
                  { text: "When the amount is large", correct: false },
                  { text: "When the transfer is urgent", correct: false },
                  { text: "When the corridor is expensive", correct: false },
                ],
              },
              {
                prompt: "Why record the local-currency value of a payment at the moment it arrives?",
                explanation:
                  "Because income is reported in local currency, and receiving at one rate then converting at another creates two separate events. The rate at receipt is hard to reconstruct later and takes ten seconds to record at the time.",
                options: [
                  {
                    text: "Income is reported in local currency, and the rate at receipt cannot easily be reconstructed later",
                    correct: true,
                  },
                  { text: "To calculate the network fee correctly", correct: false },
                  { text: "Because exchanges require it", correct: false },
                  { text: "To prove the transaction happened", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Saving when your currency will not",
      description:
        "The module for anyone whose money loses value simply by existing. Sizing, mechanics, and being honest about the risks.",
      lessons: [
        {
          title: "What inflation and devaluation actually do to you",
          type: "TEXT",
          points: 10,
          body: `If you have lived with a stable currency, this is theory. If you have not, this is the reason you are taking this course, and it deserves to be stated precisely rather than dramatically.

## Two separate things

Inflation is prices rising in your own currency — the same basket costs more.

Devaluation is your currency falling against others — imports cost more, and anything priced internationally costs more.

They often arrive together and compound. Prices rise, the currency slides, imported goods rise further, and prices rise again.

## What it does to saving

Money in a currency losing a third of its value against the dollar in a year is worth about two-thirds as much in international terms at the end of that year, without you having spent any of it.

Local interest rates rarely compensate. If a savings account pays 10% while prices rise 25%, the saver is losing 15% a year while being told they are earning interest. That is the trap: the number goes up and the value goes down, and the number is what people watch.

## What it does to behaviour

People stop saving, because saving visibly loses. They spend quickly, hold goods rather than money, or borrow. Long-term planning becomes irrational — why save for five years hence when the money will not be there in any meaningful sense?

This is the real damage. It is not the arithmetic; it is that it makes patience unprofitable, and patience is the engine of every other financial improvement.

## What a stablecoin offers

A way to hold value in dollars without a foreign bank account. It does not make you money and it is not an investment. It stops one specific bleed — the loss of value simply by holding your own currency.

For someone whose currency is stable, this is uninteresting. For someone whose currency is not, it is the difference between saving being pointless and saving being possible.

## What it does not solve

It does not protect against dollar inflation, which is real though usually smaller.

It does not make you richer. Your income problem is still an income problem.

It introduces new risks — issuer risk, custody risk, conversion cost, and the legal position where you live — which the rest of this module covers honestly rather than skipping.

## The honest framing

This is defence, not offence. It is a way to stop losing, so that the money you earn is still worth something when you need it. That is a smaller claim than the marketing makes and a much more reliable one.`,
          activity: {
            title: "Measure what last year cost you",
            prompt:
              "Find the exchange rate between your local currency and the US dollar twelve months ago, and today. Calculate the percentage change. Now take a realistic amount you held in local currency across that year and work out what it lost in dollar terms. Write the figure. Then find what a local savings account would have paid over the same period, and write the net result. For many people that number is the most persuasive thing in this course.",
          },
        },
        {
          title: "How much to hold, and in what",
          type: "TEXT",
          points: 10,
          body: `Deciding to hold value in dollars is the easy part. How much, and where, is where judgement is needed — and where over-correcting causes its own problems.

## Start with what you spend

You live in local currency. Rent, food, transport and school fees are all local. Holding everything in dollars means converting constantly, paying spread each time, and being exposed to short-term rate swings on money you need next week.

So: keep near-term spending in local currency. A month or two of expenses, in the account you actually pay from. That is not a failure of strategy; it is the strategy.

## Then the buffer

Emergency money — the fund that means a hospital bill or a lost income month does not become a debt spiral — is a judgement call.

The argument for local: emergencies are local and immediate, and you do not want to be negotiating a conversion at 11pm.

The argument for dollars: emergencies often coincide with currency stress, and that is exactly when local money is worth least.

A split is reasonable. Enough local to handle an immediate emergency without converting anything, the rest in dollars.

## Then long-term savings

Money you will not need for a year or more is where the case for holding value in dollars is strongest, because that is where the erosion compounds.

This is also where you should be least willing to accept issuer or platform risk, since it will sit for a long time. Major reserve-backed stablecoins, held in a wallet you control, not on an exchange.

## Diversifying the issuer

If the amount is meaningful, do not hold all of it in one issuer's token. Split across two major reserve-backed stablecoins.

The reasoning is straightforward: the main risk in this type is the issuer, and holding two issuers halves your exposure to any single one failing. It costs you nothing but a small amount of admin.

## What not to do

Do not chase yield on savings. The moment you lend your stablecoins to earn a return, you have added a completely different risk — the borrower, the platform, the protocol — on top of the issuer risk you already carry. Several large platforms offering exactly this failed and took customer funds with them.

If you want yield, take it deliberately with money you can afford to lose, not with the savings whose entire purpose is not losing.

## The sizing sentence

Write it down as one sentence: this much local for spending, this much local for immediate emergencies, this much in dollars for the medium term, split across these issuers, held here. If you cannot state it in one sentence, it is not a plan yet.`,
          activity: {
            title: "Write your allocation sentence",
            prompt:
              "Write the one sentence: how much stays local for spending, how much local for immediate emergencies, how much is held in dollars, across which issuers, in which custody. Use real amounts or real percentages. Then write the one reason you might be wrong — over-holding dollars if you convert constantly, or under-holding if your currency is sliding fast — and what would make you change it.",
          },
        },
        {
          title: "When a stablecoin breaks its peg",
          type: "TEXT",
          points: 10,
          body: `Depegs happen. Most are brief and recover; some are permanent. Knowing the difference while it is happening is what separates a scare from a loss.

## What a depeg looks like

The token trades below a dollar — sometimes 99 cents, occasionally far lower. It may recover in hours or never.

## The three causes, and what each means

Liquidity stress. A large holder sells into thin markets and the price dips. Usually recovers quickly. Not a solvency problem.

Reserve doubt. Something happens to the issuer's backing — a bank holding reserves fails, an audit raises questions, a regulator acts. This is serious and the outcome depends on facts about the reserves that may take days to emerge.

Mechanism failure. An algorithmic coin's stability loop breaks. This does not recover. The 2022 collapse went from a small deviation to near-total loss in roughly three days.

## Judging it in real time

Which type is it? Reserve-backed coins have recovered from severe depegs. Algorithmic ones have not.

What is the actual claim? "A bank holding 8% of reserves failed" is a specific, boundable problem. "People are worried" is not information.

Is the issuer communicating specifically? Silence or vagueness during a depeg is a bad sign. Precise, checkable statements are a good one.

Is redemption still functioning? If large partners can still redeem at par, the peg has a mechanism pulling it back. If redemption has halted, it does not.

## What to do

Decide in advance, because during the event you will be frightened and information will be poor. Write your rule now:

If a reserve-backed coin I hold drops below some threshold you choose, and redemption has halted or the issuer will not say what backs it, I move to the other stablecoin I hold or to local currency, accepting the loss.

Having a written rule is what stops you doing the two bad things: panic-selling a 0.3% wobble at a loss, or holding a genuinely failing coin because selling makes it real.

## The lesson underneath

This is why you split issuers and why you do not chase yield. A depeg is survivable if it affects half your savings and you have somewhere to move. It is a catastrophe if everything sat in one token because it paid a better return.

Nothing here is a reason to avoid stablecoins. It is a reason to hold the boring ones, in more than one issuer, and to have written down what you will do before you need to know.`,
          activity: {
            title: "Write your depeg rule",
            prompt:
              "Write your rule now, in advance, as a single if-then sentence: the threshold that would make you act, the conditions that would confirm it is serious rather than noise, and exactly where you would move funds. Then write the opposite rule too — what level of wobble you will deliberately ignore, so you do not sell at a loss over a normal fluctuation. Both halves matter; most losses come from the second one being missing.",
          },
        },
        {
          title: "The legal position, and how to find yours",
          type: "TEXT",
          points: 10,
          body: `This lesson will not tell you what is legal where you live. It will tell you how to find out, and what to do given the answer — which is more useful, because the rules differ by country and change.

## Why this course cannot answer it for you

Rules vary enormously and change quickly. A course written once cannot track that, and a confident wrong answer here is worse than no answer.

What is broadly true: in most places, holding and using crypto as an individual is legal, while operating an exchange business is regulated. Between those poles sits considerable variation, and some countries restrict banks from serving crypto businesses without making individual use illegal.

## Where to actually look

Your central bank's own website, which usually states its position directly.

Your tax authority's guidance, which often exists separately and is more practical.

A local accountant or lawyer, if the amounts justify it. For meaningful sums this is cheap relative to the risk.

## Where not to look

A group chat. Someone in another country. A video. A confident stranger who has "been doing this for years". These are how people acquire firm beliefs that are wrong about their own jurisdiction.

## The questions to answer

Can I legally hold and use crypto as an individual? Almost always yes.

Are banks permitted to serve crypto-related transactions, and do they in practice? These differ — a bank may legally be allowed and still close accounts as policy.

Is crypto income taxable, and how is it classified? Income, capital gains, or both.

What are the reporting requirements and thresholds?

Are there currency-control rules that apply to receiving foreign payments regardless of the form?

## What to do regardless of the answer

Keep records. Every transaction, every conversion, every local-currency value at the time. This is the single action that is correct under every legal regime, and it is what converts a difficult question into an answerable one.

Use your own identity honestly. Do not use someone else's account, do not misdescribe payments, do not structure transfers to stay under reporting thresholds. That last one is itself an offence in many places, and it turns a tax question into a criminal one.

Separate accounts. Keep peer-to-peer trading away from your main salary account, so a bank query about one does not freeze the other.

## The realistic risk

For most individuals receiving payment for real work and keeping records, the risk is administrative rather than criminal. The people who get into serious trouble are the ones who cannot explain where money came from — and the fix for that is a ledger, started today.`,
          activity: {
            title: "Answer the five questions for your country",
            prompt:
              "Go and find the actual answers for where you live, from your central bank and tax authority directly rather than from anyone's opinion. Write down what you found for each of the five questions in this lesson, with the source. Where you cannot find a clear answer, write that down too — an unclear position is important information and usually means keeping better records rather than doing nothing. Then note whether you need a local accountant given your amounts.",
          },
        },
        {
          title: "Assignment: your money plan",
          type: "ASSIGNMENT",
          points: 25,
          body: `The second graded piece. It asks for the whole picture — how you hold, why, and what you do when something breaks — so that an instructor can find the assumption that will not survive a bad month.`,
          assignment: {
            title: "Currency and savings plan",
            instructions: `Write your plan for holding and moving value. 600 to 900 words. No credentials, keys or recovery phrases anywhere in it.

**1. Your exposure.** What currency you earn in, what you spend in, and what happened to that currency against the dollar over the last twelve months. Put a number on what holding it cost you.

**2. Allocation.** Your one-sentence allocation — local for spending, local for immediate emergencies, dollars for the medium term — with real amounts or percentages, and your reasoning for the split.

**3. Custody and issuers.** Which stablecoins, which issuers, and why those. Where each portion is held and who else could technically move it. State whether you have split across issuers and why.

**4. The depeg rule.** Your written if-then rule: the threshold, the confirming conditions, where funds move. Include the opposite rule — the level of fluctuation you will deliberately ignore.

**5. Legal and records.** What you established about your own jurisdiction and from which source. What your record-keeping actually looks like now, and what you have backfilled.

**6. The honest weakness.** The part of this plan most likely to fail, and what you are doing about it. A plan with no stated weakness scores zero on that criterion — every real plan has one.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Exposure is quantified from real data",
                weight: 15,
                descriptor:
                  "Actual rates looked up and a real figure calculated for what the last year cost, rather than a general statement that the currency is weak.",
              },
              {
                criterion: "Allocation is specific and reasoned",
                weight: 25,
                descriptor:
                  "Real amounts or percentages across spending, emergency and medium-term, with reasoning. Full marks keep near-term spending local rather than over-converting everything to dollars.",
              },
              {
                criterion: "Custody and issuer risk are addressed",
                weight: 20,
                descriptor:
                  "Named issuers with justification, split across more than one where amounts justify it, savings held off exchanges, and no yield-chasing on money whose purpose is not losing.",
              },
              {
                criterion: "The depeg rule is written in advance and two-sided",
                weight: 20,
                descriptor:
                  "A concrete threshold and destination, plus the deliberate ignore rule. Full marks distinguish reserve-backed recovery from algorithmic failure in the confirming conditions.",
              },
              {
                criterion: "Legal position researched from primary sources",
                weight: 10,
                descriptor:
                  "Answers sourced from the central bank or tax authority rather than opinion, with gaps stated honestly and records described.",
              },
              {
                criterion: "A real weakness is named",
                weight: 10,
                descriptor:
                  "A genuine failure point with a response. Claiming the plan has no weakness scores zero here.",
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Sending money to people you love",
      description:
        "Remittance specifically: the recipient's side, teaching family safely, and the emotional part nobody writes about.",
      lessons: [
        {
          title: "Design for the recipient, not for yourself",
          type: "TEXT",
          points: 10,
          body: `The most common failure in family remittance is a sender who optimises for their own convenience and competence, and a recipient who cannot actually use what arrives.

## Start from the other end

What does the recipient need? Usually local cash, in their hand, at a place they trust, without a complicated process.

Work backwards from that. If your clever low-fee route ends with your mother needing to negotiate with a peer-to-peer trader, you have not saved money — you have transferred difficulty onto the person least equipped to handle it, and added a risk they cannot assess.

## Three arrangements that work

You handle everything. Money moves as stablecoins, you convert on your side or through a service that pays into their account or mobile money, and they receive local currency exactly as they always have. Best when the recipient is not comfortable with crypto and should not have to be.

They hold a small wallet. Appropriate if the recipient is capable and willing, and if there is a reliable local way for them to convert. Gives them control and requires real teaching first.

Hybrid. They hold a wallet for flexibility, and you convert the bulk to their bank account. Common in practice.

## What decides it

Not what is cheapest. Whether the recipient can do it safely, repeatedly, without you on the phone, and without being exposed to a bad counterparty.

If the honest answer is no, choose an arrangement where they never touch crypto. That is not a compromise; it is the correct design.

## The reliability question

Family money is often not optional. School fees, rent, medicine. A route that is 3% cheaper and occasionally takes four days is worse than one that costs slightly more and always arrives when you say it will.

Optimise for reliability first, cost second. This inverts the usual advice and it is right for this specific case.

## Test with a small amount

Before moving a real month's money through a new route, send a small amount and have the recipient go through the entire process including collecting the cash. You will discover the friction that does not appear in any tutorial — the agent who is closed, the ID they need, the step that requires an app on a phone they do not have.

## And have a fallback

Whatever route you use, know what you would do if it stopped working today. Family money should not have a single point of failure, because the failure will arrive on the worst possible week.`,
          activity: {
            title: "Walk your recipient's actual path",
            prompt:
              "Pick a real person you send money to, or would. Write down every single step from your side to cash in their hand, from their point of view — including which app, which agent, what ID, how far they travel, and what happens if a step fails. Then mark the steps that depend on their competence rather than yours. If any of those steps would defeat them on a bad day, redesign the route so it does not, and write down the new one.",
          },
        },
        {
          title: "Teaching family without patronising them",
          type: "TEXT",
          points: 10,
          body: `If someone in your family will hold a wallet, they need teaching — and how you do that decides whether they are safer or merely enabled.

## Teach less than you know

You have taken courses. They need three rules and a working routine, not your understanding.

The three: nobody who contacts you first is legitimate. Nobody ever needs your recovery phrase. Slow down when someone is rushing you.

Everything else can wait, and adding it early makes the essentials blur into a wall of advice they will not retain.

## Set it up with them, in person, once

Do not send instructions. Sit with them, set up the wallet, write the recovery phrase on paper together, and decide where it lives. Then have them receive a small amount and convert it, with you watching but not doing it.

Then have them do it once more, alone, with a small amount, while you are reachable. That second run is what turns a demonstration into a skill.

## Write it down in their words

Leave them a physical page with the steps, in the language they think in, with the actual app names and buttons. Not a link, not a video — a page.

The person who needs it will need it in six months, at a moment when they cannot reach you.

## Expect and design for the scam attempt

Someone will contact them. It is not a possibility, it is a certainty, and it will be someone friendly claiming to help.

Tell them explicitly: if anyone at all contacts you about this money — including someone claiming to be me — you do not act, you call me first on the number you already have. Set that as an absolute rule, not a guideline.

Agree a code word for any urgent money request, since voice cloning has made a familiar voice worth nothing as evidence.

## Do not shame them

If they make a mistake, the single most important thing is that they tell you quickly. Shame produces silence, and silence costs money and time.

Say in advance: if anything goes wrong, tell me immediately, and I will not be angry. Mean it, and act like it when it happens. The alternative is finding out a month later.

## Know when the answer is no

If someone genuinely cannot manage it safely — because of eyesight, memory, unfamiliarity, or simply not wanting to — the right answer is that they never touch a wallet. Handle the crypto side yourself and deliver local currency.

That is not a failure to teach. It is a correct assessment, and pushing past it is how people lose their parents' money.`,
          activity: {
            title: "Write the one-page guide",
            prompt:
              "Write the physical page you would leave with a specific family member — actual app names, actual buttons, in their language, short enough to fit on one side. Include the three rules and the code word. Then write down honestly whether this particular person should hold a wallet at all, and what your answer would be if the honest assessment is no. Deciding that clearly is the real work of this lesson.",
          },
        },
        {
          title: "The money conversations nobody prepares for",
          type: "TEXT",
          points: 10,
          body: `The mechanics are the easy part. What makes remittance hard is that it is money between people who love each other, and that is a different subject entirely.

## The expectation ratchet

Send more once, and that becomes the new baseline. Send during a crisis, and the crisis rate becomes normal. Nobody intends this; it happens because there is no natural moment to renegotiate downward.

The fix is to be explicit early: this is what I can send regularly, and separately I will help with emergencies when I can. Two categories, stated out loud, so that a one-off is understood as a one-off.

## Sending more than you have

The most common and least discussed problem. People send money they need, because the need at the other end is more visible and more emotionally present than their own future.

You cannot help anyone from a position of collapse. An amount you can sustain for five years is worth more than a larger amount for eight months followed by nothing and resentment.

Decide the sustainable number. Write it down. Treat it as a bill, not a decision you re-make monthly under pressure.

## Being the one everyone asks

If you are the person abroad, or the one who earns most, you may become the default answer for every family need. That is a heavy position and it is rarely acknowledged.

It helps to be clear about what you are: a contributor, not the system. Saying "I can do this much, and I cannot do that" is not selfishness; it is the only way the arrangement survives.

## When money is not really the ask

Sometimes a request for money is a request to be seen, or a way of maintaining a relationship, or an expression of fear. Sending money answers the wrong question and the request returns.

It is worth asking what is actually happening before transferring, particularly when the requests are escalating.

## The record helps here too

Keeping a simple record of what you have sent removes an entire category of argument — the misremembering, the "you never help", the accounting that happens in people's heads and is always wrong in both directions.

Not to hold over anyone. Just so that the facts are available when the conversation gets difficult.

## The part that is genuinely good

Being able to send money to people you love, quickly, when they need it, is one of the better things technology has done. The costs above are real and worth naming, and they do not outweigh it.

Get the amount right, get the boundaries stated, get the route reliable — and then it becomes what it should be: a quiet, ordinary thing you do that makes life materially better for people who matter to you.`,
          activity: {
            title: "Set the sustainable number",
            prompt:
              "Write down the amount you can send regularly and sustain for years, not months — and check it against your own savings and obligations honestly. Then write the sentence you would say to establish the two categories: the regular amount, and emergencies handled separately. Finally, write down one boundary you have not stated out loud but should have. You do not have to send anything; the exercise is deciding it deliberately rather than under pressure each month.",
          },
        },
        {
          title: "Building a route that keeps working",
          type: "TEXT",
          points: 10,
          body: `A remittance route is infrastructure. It has to work every month, including the months when something is broken, and that requires design rather than luck.

## Write down the working route

Every step, with the actual services, amounts and timings. Not because you will forget next month, but because someone else may have to run it if you cannot — and because writing it down reveals the steps that depend on one thing.

## Find the single points of failure

Go through your route and mark every step that has exactly one option. One exchange. One peer-to-peer counterparty. One agent. One bank account.

Each of those is a route that stops entirely if that one thing stops. Accounts get frozen, services withdraw from countries, agents close, regulations change.

## Build one alternative for each

Not a fully parallel system — one workable alternative you have tested at least once, so it is a known path rather than a theory.

The moment you need a fallback is the moment you cannot calmly research one.

## Keep a buffer at the receiving end

If possible, keep enough at the recipient's end to cover one cycle. Then a route failure becomes an inconvenience rather than a missed rent payment.

This single habit removes most of the fear from the whole arrangement.

## Review it periodically

Rates change, services change, rules change. A route that was optimal a year ago may now be worse than an alternative, and you will not notice because it still works.

Twice a year, spend twenty minutes checking whether the route is still the right one. Attach it to something you already do so it actually happens.

## Watch for the account-freeze pattern

If you are converting regularly through peer-to-peer, keep the receiving account separate from your primary one, keep volumes consistent rather than lumpy, and keep records that explain every payment.

If a bank asks, an immediate documented answer is usually the end of it. No answer is how accounts get closed.

## The measure of a good route

It works when you are ill. It works when you are travelling. It works when the person receiving cannot reach you. Someone else could run it from your written instructions.

If your route only works when you are available and everything is normal, it is not finished yet.`,
          activity: {
            title: "Find and fix your single points of failure",
            prompt:
              "Write out your actual route step by step, then mark every step that has only one option. For each one, write the alternative you would use and whether you have ever tested it. Pick the most critical untested alternative and test it this month with a small amount. Then write down whether someone else could run your route from your written instructions — and if not, finish writing them until they could.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on the remittance module. Note that almost every correct answer here is about the recipient or about reliability rather than about cost — which is the main lesson of the module.`,
          quiz: {
            title: "Remittance in practice",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "What should decide the design of a family remittance route?",
                explanation:
                  "Whether the recipient can use it safely and repeatedly without help. A cheaper route that ends with a relative negotiating with a peer-to-peer trader has transferred difficulty and risk onto the person least equipped to handle it.",
                options: [
                  {
                    text: "Whether the recipient can complete it safely and repeatedly on their own",
                    correct: true,
                  },
                  { text: "The lowest total cost", correct: false },
                  { text: "The fastest settlement time", correct: false },
                  { text: "Which service you personally find easiest", correct: false },
                ],
              },
              {
                prompt: "For family money, how should reliability and cost be ranked?",
                explanation:
                  "Reliability first. Family money is often not optional — rent, fees, medicine — so a route that is slightly cheaper but occasionally takes four days is worse than one that costs a little more and always arrives on time.",
                options: [
                  { text: "Reliability first, cost second", correct: true },
                  { text: "Cost first, since the amounts are small", correct: false },
                  { text: "Speed first, then cost, then reliability", correct: false },
                  { text: "They matter equally", correct: false },
                ],
              },
              {
                prompt: "You are teaching a parent to use a wallet. What do you teach first?",
                explanation:
                  "The three rules: nobody who contacts you first is legitimate, nobody ever needs your recovery phrase, and slow down when rushed. Adding more early blurs the essentials into advice that will not be retained.",
                options: [
                  {
                    text: "Three rules — no one who contacts first, never share the phrase, slow down when rushed",
                    correct: true,
                  },
                  { text: "How blockchains and networks work", correct: false },
                  { text: "How to compare exchange rates across platforms", correct: false },
                  { text: "How to bridge between networks", correct: false },
                ],
              },
              {
                prompt: "Why keep a buffer at the receiving end?",
                explanation:
                  "So a route failure is an inconvenience rather than a missed rent payment. Every route eventually breaks — frozen accounts, withdrawn services, closed agents — and one cycle of cover removes most of the fear from the arrangement.",
                options: [
                  { text: "So a route failure costs an inconvenience rather than a missed payment", correct: true },
                  { text: "To reduce conversion fees", correct: false },
                  { text: "To take advantage of better rates later", correct: false },
                  { text: "Because exchanges require minimum balances", correct: false },
                ],
              },
              {
                prompt:
                  "You send money regularly, and one month you send much more for an emergency. What is the risk?",
                explanation:
                  "The expectation ratchet — the crisis amount becomes the new baseline, because there is no natural moment to renegotiate downward. The fix is stating two categories out loud in advance: a sustainable regular amount, and emergencies handled separately.",
                options: [
                  {
                    text: "The crisis amount becomes the expected baseline, because nothing renegotiates it downward",
                    correct: true,
                  },
                  { text: "The exchange will flag your account", correct: false },
                  { text: "You will pay a higher percentage in fees", correct: false },
                  { text: "There is no particular risk", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Businesses, teams and paying other people",
      description:
        "Once you are not the only person involved: paying contractors, running a business account, and the risks that scale with you.",
      lessons: [
        {
          title: "Paying contractors and staff across borders",
          type: "TEXT",
          points: 10,
          body: `Being paid is one problem. Paying other people is a harder one, because their difficulties become yours and their mistakes cost you a working relationship.

## What changes when you are the payer

You carry the responsibility for getting it right. A wrong network, a missing memo, or a person who cannot convert is your problem to solve, and it happens on payday.

You also carry a duty of care. Someone accepting payment in a form you proposed is relying on your competence.

## Establish the route before the first payment

Confirm what they can receive: which token, which network, which wallet or exchange, and whether they can actually convert to local currency where they are.

Send a small test and have them confirm arrival and conversion. Do this before payday, not on it.

Write the route down so that the next payment is a repeat rather than a negotiation.

## Pay in a stated currency, not a token amount

Agree the fee in dollars. Pay the dollar equivalent in tokens. This keeps the commercial agreement clean and stops arguments about who bears a price movement.

For a stablecoin the movement is small, but the principle matters and it becomes essential the moment anyone suggests paying in a volatile asset.

## Who pays the network fee

State it before the first payment. Usually the payer, as it replaces the transfer fee they were already absorbing. What matters is that it is agreed rather than discovered.

## Keep the paperwork identical to any other payment

Contract or engagement terms. Invoice from them. Your payment record with the hash. Whatever your jurisdiction requires for contractor payments.

Paying in crypto does not reduce the paperwork. If anything the record has to be better, because there is no bank statement doing the remembering for you.

## Do not become their bank

A recurring request: can you hold their money, or convert it for them, or receive it into your account and pass it on.

Be very careful. It creates liability, it can look like operating an unlicensed money transmission business, and it ends badly when there is a dispute about an amount.

Pay them. Let them handle their own conversion. Help them learn if they want to, but do not run it for them.

## Their competence is your constraint

If a contractor cannot safely receive and convert, the honest answer is to pay them by whatever means they can actually use, even if it costs you more. A cheaper route that loses their payment is not cheaper.

This is the same principle as the remittance module: design for the recipient. When you are the payer, that principle has commercial consequences as well as human ones.`,
          activity: {
            title: "Write the contractor payment procedure",
            prompt:
              "Write the procedure you would hand to a new contractor: what you need from them before the first payment, what the test transfer is, who pays the network fee, what currency the fee is agreed in, and what they must send you for records. Keep it under one page and make it something you could paste into an email. Then identify the one step most likely to fail with someone unfamiliar, and write what you would do when it does.",
          },
        },
        {
          title: "Business accounts, separation and scale",
          type: "TEXT",
          points: 10,
          body: `What works for one person receiving occasional payments breaks when volume grows or when a business is involved. The failure is usually not technical.

## Separate business from personal, completely

Different wallets, different exchange accounts, different bank accounts. Not "mostly separate" — separate.

The reasons compound. Accounting becomes possible rather than archaeological. A restriction on one does not stop the other. Tax treatment differs and mixing them makes both harder to establish. And if the business is ever examined, mixed funds are the single most damaging thing an examiner can find.

## The single-signature problem

A business whose funds sit in one wallet controlled by one person has a single point of failure that includes that person's phone, that person's health, and that person's honesty.

Multi-signature arrangements — where a transaction needs approval from two or three key holders — exist for exactly this. They add friction, which is the point.

At minimum, someone other than you should be able to access business funds if you cannot. Write down how, store it properly, and tell the person it exists. Businesses have died because one person had the only access.

## Volume attracts attention

Bank monitoring, exchange limits and reporting thresholds all scale with what passes through. Activity that was invisible at one level becomes visible at ten times that.

Plan for it rather than being surprised. Understand your exchange's limits and verification tiers before you hit them, because getting verified at a higher tier takes days you may not have.

## Do not let a business become an unlicensed money service

The line matters. Receiving payment for your own goods and services is ordinary commerce. Receiving other people's money and passing it on, converting for others, or holding balances on their behalf is money transmission, and it is licensed activity almost everywhere.

Businesses drift across this line without noticing, usually by helpfully doing a favour that becomes a service. If you find yourself moving money that is not yours, stop and take advice before it grows.

## Reconciliation

Every business needs to reconcile: what the records say against what the wallets and accounts actually hold, monthly.

Discrepancies are always something — a missed entry, a fee not recorded, a payment to the wrong place, or occasionally a problem. Finding them monthly is routine. Finding them annually is a project.

## The scaling principle

Every arrangement that works at your current size should be tested against ten times that size. The ones that break are the ones to fix now, while breaking them is cheap.`,
          activity: {
            title: "Test your setup at ten times the size",
            prompt:
              "Take your current money arrangement — personal or business — and write down what breaks if the volume were ten times larger tomorrow. Consider: exchange limits, bank attention, whether one person holds all access, whether records would still be reconstructable, and whether any activity would start looking like money transmission. Pick the first thing that breaks and write what you will change about it this quarter.",
          },
        },
        {
          title: "Yield, lending and the temptation to do more",
          type: "TEXT",
          points: 10,
          body: `Once you hold stablecoins, offers to earn on them arrive constantly. Some are legitimate. All of them change the risk you are carrying, and the change is usually understated.

## What earning actually means

You are lending. Someone borrows your stablecoins and pays interest. The return has to come from a borrower paying, from trading fees, or from new deposits — and only the first two are sustainable.

So the question from the earlier module applies exactly: where does this money come from, in one sentence? If nobody can answer, the answer is other depositors.

## The risks you add

Counterparty. The platform or protocol could fail. Several large lenders offering exactly this failed within months of each other and customer funds were lost. Their marketing had described the arrangement as safe.

Smart contract. If it is a protocol rather than a company, code can be exploited. This has happened repeatedly and at scale.

Liquidity. Withdrawals can be suspended precisely when everyone wants out, which is exactly when you need it.

Regulatory. Products offering yield on deposits have been challenged in several jurisdictions, sometimes resulting in sudden closure.

## The asymmetry to notice

Your savings in stablecoins exist to not lose value. Their whole purpose is defensive.

Lending them for a few percent risks the entire principal to gain a small return on money whose job was to be safe. That is a poor trade in the specific case of savings, regardless of the platform.

If you want yield, take it deliberately, with money designated for risk, sized so that total loss is survivable. Do not take it with the fund whose purpose is not losing.

## The rate as information

A modest return roughly in line with what safe dollar instruments pay is plausible and probably reflects real lending demand.

A return well above that is telling you about risk, whether or not anyone names it. In this specific category, historically, the high-yield options are the ones that failed.

## The recurring pattern

Every cycle produces platforms offering attractive yields on stablecoins, growing rapidly, describing themselves as safe, and failing. The names change. The structure does not.

The people who avoided each one were not smarter. They simply asked where the money came from and did not accept a vague answer.

## The rule worth keeping

Savings do not earn. If that feels like leaving money on the table, price the alternative honestly: a few percent a year against a non-trivial chance of losing everything. Stated that way, most people decline.`,
          activity: {
            title: "Investigate one real offer",
            prompt:
              "Find one actual yield offer on stablecoins available to you right now. Write down: the advertised rate, who is offering it, and where the return comes from according to their own materials — quoting them. Then answer whether that source is checkable, what would make it go to zero, and whether you would find out before or after. Finally, compare the rate to what safe dollar instruments currently pay and write what the difference is compensating you for.",
          },
        },
        {
          title: "The failures that repeat every cycle",
          type: "TEXT",
          points: 10,
          body: `A short history, because the specific failures repeat with new branding and recognising the shape is worth more than knowing the names.

## The exchange that was not holding your funds

Repeatedly, platforms holding customer deposits have used them — for trading, for lending, to cover losses elsewhere. Customers believed their balance was their money sitting there. It was a claim against a company that had already spent it.

The recurring lesson: a balance on a platform is a promise. Sometimes a good promise. Never the same as holding the asset.

## The lender paying yields it could not sustain

Several large firms offered attractive returns on deposits, grew quickly, and failed within a short period of each other when the underlying borrowers stopped paying. Customers who had treated it as a savings account discovered they were unsecured creditors.

The recurring lesson: yield is compensation for risk, and the risk is real even when the marketing is reassuring.

## The stablecoin that was not stable

An algorithmic design backed by nothing but a companion token, offering a very high yield, collapsed in days and destroyed a great deal of ordinary people's savings.

The recurring lesson: know which of the three types you hold, and treat unusual yield as a warning rather than an opportunity.

## The bridge that was drained

Moving tokens between networks requires a bridge, and bridges hold large pooled balances, which makes them extremely attractive targets. Several have been exploited for enormous sums.

The recurring lesson: minimise time and value sitting in any bridge, and prefer well-established ones with long records.

## The regional platform that vanished

Smaller, locally-marketed platforms — often promoted through community groups and offering better rates than international competitors — that simply stopped honouring withdrawals.

The recurring lesson: proximity and familiarity are not evidence. A platform recommended by people you know is not thereby safe; it is thereby well-marketed to your community.

## The common structure

Every one of these had the same shape. Something offered a return or a convenience. Customer funds sat with a third party. The risk was described as minimal. Growth was rapid. And the failure, when it came, was sudden and total rather than gradual.

## The defence, stated once

Hold your own keys for savings. Use platforms as places you pass through rather than places you live. Ask where returns come from and do not accept vague answers. Keep the amount at any third party to what you could lose without it changing your life.

None of that requires predicting which platform fails next. That is the point — it is a defence that works without foresight.`,
          activity: {
            title: "Audit your exposure to third parties",
            prompt:
              "List every third party currently holding value for you — exchanges, lending platforms, payment services, anything. For each, write the amount and answer: could I lose this entirely without it changing my life? For any where the answer is no, write down what you will move and by when. Then write the total sitting with third parties as a percentage of everything you hold. Most people find that number higher than they expected.",
          },
        },
        {
          title: "Assignment: a route that survives scrutiny",
          type: "ASSIGNMENT",
          points: 25,
          body: `The third graded piece. It takes the operational and administrative material together and asks whether your arrangement would survive a bank query, an accountant's questions, and a platform failure in the same month.`,
          assignment: {
            title: "Operational and compliance review",
            instructions: `Review your own arrangement as though you were an outsider looking for problems. 600 to 900 words. No credentials, keys or phrases anywhere.

**1. Separation.** How personal, business and trading activity are separated across wallets, exchange accounts and bank accounts — or where they are not, and what that would cost you if either were examined.

**2. Records.** What your ledger contains, when it is updated and against which trigger, how far you have backfilled, and where the backup lives. State what you could produce within an hour if asked to evidence a year of income.

**3. The bank query.** The specific answer you would give, and the documents you would attach. State whether you have a second banking relationship and, if not, when you will.

**4. Tax position.** What you established about your own jurisdiction, from which primary source, and whether your amounts justify professional advice. If they do, state when you will get it; if they do not, say why.

**5. Third-party exposure.** Every platform holding value for you, the amounts, and whether losing each entirely would change your life. State the total as a percentage and whether you consider it acceptable.

**6. Access continuity.** What happens to money you control if you are unavailable for a month. If you run a business, who else can access funds and how. If nobody can, say so and state what you will do about it.

**7. The bad month.** Describe a single month in which your bank queries an account, a platform you use suspends withdrawals, and you are ill. Walk through what actually happens and what breaks first.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Separation is real or its absence is costed",
                weight: 15,
                descriptor:
                  "Concrete separation across wallets, accounts and banks, or an honest statement of where funds are mixed and what that would cost under examination.",
              },
              {
                criterion: "Records are current, triggered and backed up",
                weight: 20,
                descriptor:
                  "A ledger with the right fields, updated against a trigger rather than a schedule, with a stated backfill and backup. Full marks state what could actually be produced within an hour.",
              },
              {
                criterion: "The bank answer is specific and documented",
                weight: 15,
                descriptor:
                  "A concrete two-sentence answer naming the activity and its source, with attachable documents. Vague answers such as crypto trading score low.",
              },
              {
                criterion: "Tax position researched from a primary source",
                weight: 15,
                descriptor:
                  "Findings from the tax authority or central bank rather than opinion, with a proportionate decision on professional advice.",
              },
              {
                criterion: "Third-party exposure is quantified and judged",
                weight: 20,
                descriptor:
                  "Every platform listed with amounts and a survivability test, plus a total percentage and a stated judgement. Full marks act on any exposure that fails the test.",
              },
              {
                criterion: "The bad month is worked through honestly",
                weight: 15,
                descriptor:
                  "A concrete walk-through identifying what breaks first. A conclusion that everything would be fine scores zero on this criterion.",
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Records, tax and staying clean",
      description:
        "The part that catches careful people. What to record, how to think about tax, and how to answer a bank that asks where your money came from.",
      lessons: [
        {
          title: "The two events every conversion creates",
          type: "TEXT",
          points: 10,
          body: `Most people treat receiving crypto and converting it as one thing. In almost every tax system they are two separate events, and not knowing that is how honest people end up with a mess.

## Event one: income

You did work and were paid. That is income, valued in your local currency at the rate on the day it arrived. This is true whether you were paid in dollars, in local currency, or in a token.

The form of payment does not change the fact of income. A common and expensive misunderstanding is that being paid in crypto somehow defers the income until you convert. In most systems it does not.

## Event two: disposal

Later you convert the token to local currency. Between receipt and conversion, the value may have moved. That difference is usually a gain or a loss, and it is treated separately from the income.

If you received when a dollar was worth one amount and converted when it was worth more, you made a gain on top of your income. If the reverse, a loss.

For a stablecoin the movement is small, but "small" is not "zero" — the local currency rate moves even when the dollar peg holds, and over a year of payments those differences add up.

## Why this matters practically

You need two pieces of information per payment: the local-currency value at receipt, and the local-currency value at conversion. Without the first, the income figure is a guess. Without the second, the gain is a guess.

The first is the one people lose. It exists only on the day, and reconstructing historical rates for dozens of transactions eleven months later is genuinely painful work.

## What about holding, not converting?

In most systems, simply holding is not an event. You are taxed on income when received and on gains when disposed of, not on unrealised movement.

But "most systems" is doing real work in that sentence, and some countries treat things differently. This is one of the questions to take to a local accountant rather than to a group chat.

## What about moving between your own wallets?

Generally not a disposal, because you have not disposed of anything — it is still yours. But you should still record it, because an unexplained movement in your records looks like something else later, and you will not remember.

## The practical instruction

Record the local value at receipt, every time, on the day. Ten seconds. It is the single highest-value administrative habit in this entire course, and it is the one that is impossible to fix retroactively.`,
          activity: {
            title: "Reconstruct one month, and time it",
            prompt:
              "Take one month of past crypto receipts, if you have any. Try to reconstruct, for each, the local-currency value on the day it arrived. Time yourself. Write down how long it took and how many you could not establish confidently. Then multiply by twelve to see what a year of not recording costs you in work. If you have no past receipts, do the exercise on three hypothetical dates so you experience the friction before it is real.",
          },
        },
        {
          title: "The ledger that answers every question",
          type: "TEXT",
          points: 10,
          body: `One spreadsheet, kept current, solves tax, proof of income, bank queries and disputes simultaneously. There is no more efficient piece of admin available to you.

## The columns

Date. Type — income, conversion, transfer between own wallets, purchase, gift. Counterparty or client. Invoice number if applicable. Token and network. Amount in token. Amount in dollars. Local-currency value at that moment. Transaction hash. Wallet or account involved. A short note in plain language.

That last column matters more than it looks. In a year, "payment for the March landing page work" will mean something and a hash will not.

## Why a spreadsheet rather than software

Automated tools exist and can be useful at volume. For most people a spreadsheet is better: you understand every row, it does not break when a service changes its export format, and it does not stop working if a company shuts down.

If you later need software, a clean spreadsheet imports easily. The reverse is not true.

## The rule about when

At the time, not later. This is the entire discipline.

Attach it to the moment money arrives — the same two minutes in which you check the transfer landed. Not a weekly session you will skip, not a year-end effort you will resent.

## What it lets you answer instantly

How much did I earn last year? A sum.

Where did this money come from? A row with a counterparty, an invoice and a hash.

What do I owe? Income from one column, gains from the difference between two others.

Can you prove your income for this application? A statement built from the ledger, backed by invoices and on-chain records that anyone can independently verify.

That last one is worth dwelling on. Proving freelance income is difficult for everyone, and blockchain records have a property bank statements do not: they are publicly verifiable by the person you are trying to convince.

## Keeping it safe

Back it up somewhere that is not only your laptop. It contains no secrets — no keys, no phrases — so ordinary cloud backup is fine and appropriate here.

Losing the ledger is the one loss in this course that is entirely preventable and entirely your own fault.

## The honest reason people skip it

It is boring, and nothing bad happens immediately. The cost arrives all at once, months later, at a moment when you are also dealing with whatever prompted the question.

The people who keep it are not more disciplined. They are the ones who attached it to something they already do.`,
          activity: {
            title: "Attach the ledger to an existing habit",
            prompt:
              "Set up your ledger with the columns from this lesson if you have not already. Then decide the specific moment it gets updated — not a day of the week, a trigger. 'When I confirm a transfer arrived' or 'when I send an invoice' are triggers; 'every Sunday' is a plan you will abandon. Write down your trigger, and write down where the backup lives. Then update it now with your most recent transaction so the habit has started rather than been planned.",
          },
        },
        {
          title: "When a bank asks where the money came from",
          type: "TEXT",
          points: 10,
          body: `It happens, it is routine, and how you respond in the first exchange usually decides whether it ends there or escalates.

## Why they ask

Banks are legally required to understand the source of funds passing through accounts. Regular incoming payments from many unrelated individuals — exactly what peer-to-peer conversion looks like — matches a pattern their systems flag.

This is not an accusation. It is a system doing what it is required to do, and the overwhelming majority of these queries close with a satisfactory answer.

## What a good answer looks like

Immediate. A delay reads as constructing a story.

Specific. "I work as a freelance designer for overseas clients and convert payments to naira through a peer-to-peer marketplace" is an answer. "Crypto trading" is not, and it invites a much longer conversation.

Documented. Invoices, the ledger, transaction records. Volunteer them.

Consistent with the account activity. If you say occasional client payments and the account shows daily transfers, the answer has created a new question.

## What a bad answer looks like

Vague. Defensive. Delayed. Or — worst — different from the answer you gave last time, which is why having a written record matters more than having a good memory.

## Reducing the chance of being asked

Separate accounts. Do not run peer-to-peer conversion through your main salary account. If one gets queried or restricted, the other keeps working.

Consistency. Regular, similar-sized activity looks like a business. Lumpy, irregular activity looks like something to investigate.

Do not structure. Deliberately keeping transfers under a reporting threshold is itself an offence in many places, and it is exactly the pattern monitoring systems are built to detect. It converts a paperwork question into a criminal one.

## If an account is restricted

Contact them immediately through official channels and provide documentation. Do not open a replacement account and carry on quietly — that pattern is itself a flag, and it looks like what it looks like.

Have a second banking relationship already established, before you need it. Not to hide anything; simply so that a restriction on one account is an inconvenience rather than a crisis.

## The underlying principle

Everything you are doing — earning money for real work, converting it, sending it to family — is ordinary. The difficulty is never that the activity is suspicious; it is that it is unfamiliar to the system and therefore requires explanation.

A person who can explain it immediately, with documents, is fine. A person who cannot is in for a long few weeks, having done nothing wrong.`,
          activity: {
            title: "Write the answer before you need it",
            prompt:
              "Write the two-sentence answer you would give if your bank called today and asked about incoming transfers. Make it specific about what you do, where the money comes from, and how it reaches you. Then list the documents you could attach within an hour. If you could not produce those documents today, write down what is missing and fix it this week. Finally, note whether you have a second banking relationship, and if not, when you will open one.",
          },
        },
        {
          title: "Getting proper advice, and when it is worth it",
          type: "TEXT",
          points: 10,
          body: `At some point the amounts justify professional advice, and knowing when — and how to get useful advice rather than expensive confusion — saves money.

## When it is worth paying for

When the amounts are meaningful relative to your income. A few hundred spent on getting it right against a few thousand of exposure is obviously worth it; the same spend against fifty dollars a month is not.

When you have more than one country involved — you live in one, are paid from another, hold funds in a third. Cross-border situations are exactly where general advice fails.

When you are registering a business, or the activity has become a business in substance whether or not you have registered it.

When something has already gone wrong. An account restriction or a tax query is not the moment for a group chat.

## How to find someone useful

Ask specifically whether they have handled clients receiving foreign income in cryptocurrency. Many accountants have not, and an accountant learning on your file is expensive.

Prefer local. The value is in knowing your jurisdiction's actual treatment, which a foreign specialist will not.

Ask what they will need from you. A good answer is a list resembling your ledger. A vague answer suggests they do not know either.

## How to make the meeting productive

Bring the ledger. An accountant given clean records does the work quickly; one given a shoebox charges for sorting it.

Bring specific questions rather than "how does crypto tax work". Ask: how is income received in stablecoins classified here, what rate applies, what are the reporting thresholds, what records do I need to keep, and what do I file and when.

Ask what they are unsure about. An adviser who names their uncertainty is more useful than one who is confident about everything.

## What not to outsource

The records. Nobody can reconstruct what you did not write down, and paying someone to try is the most expensive way to buy an approximation.

The understanding. You should know roughly what you owe and why, so that you can sanity-check the advice. Advisers make mistakes, and the client who understands the shape of their own situation catches them.

## The proportionate answer

For a person receiving a few hundred dollars a month from one client: keep the ledger, read your tax authority's guidance directly, file what it says.

For a person running a real income across borders: pay for one proper session, implement what they say, and revisit annually.

For anyone with a business, employees, or multiple jurisdictions: ongoing advice is not optional and the cost is a business expense.

Match the spend to the exposure. Both under-spending and over-spending here are common, and the second is less damaging but still a waste.`,
          activity: {
            title: "Decide your level and act on it",
            prompt:
              "Work out which of the three proportionate answers matches your actual situation, using real numbers for what passes through your hands annually. Then take the corresponding action this month: read your tax authority's guidance and write a summary, or find and contact a local accountant with the specific question about crypto-received foreign income. Write down what you did and what you learned, including anything that surprised you about your own jurisdiction.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on the administrative half. This is the module people skip and then regret, because unlike everything else in this course, the mistakes here cannot be fixed retroactively.`,
          quiz: {
            title: "Records and obligations",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt:
                  "You are paid in stablecoins in March and convert to local currency in September. How many events is that, typically?",
                explanation:
                  "Two. Income at the local value on the day it arrived, and separately a gain or loss on the movement between receipt and conversion. Being paid in crypto does not defer the income until conversion in most systems.",
                options: [
                  { text: "Two — income at receipt, and a gain or loss at conversion", correct: true },
                  { text: "One, at conversion, since that is when you got real money", correct: false },
                  { text: "One, at receipt, and nothing further", correct: false },
                  { text: "None until you withdraw to a bank account", correct: false },
                ],
              },
              {
                prompt: "Which piece of information is effectively impossible to recover later?",
                explanation:
                  "The local-currency value at the moment of receipt. It exists only on the day, and reconstructing historical rates across dozens of transactions months later is painful and approximate. It takes ten seconds to record at the time.",
                options: [
                  { text: "The local-currency value at the moment the payment arrived", correct: true },
                  { text: "The transaction hash", correct: false },
                  { text: "The amount received in tokens", correct: false },
                  { text: "Which wallet received it", correct: false },
                ],
              },
              {
                prompt: "Your bank asks about incoming transfers. What is the best response?",
                explanation:
                  "Immediate, specific and documented. Most of these queries close with a satisfactory answer. Delay reads as constructing a story, and vagueness invites a much longer conversation.",
                options: [
                  {
                    text: "Answer immediately and specifically, volunteering invoices and records",
                    correct: true,
                  },
                  { text: "Say as little as possible until they ask again", correct: false },
                  { text: "Open a second account and move the activity there", correct: false },
                  { text: "Reply that it is personal crypto trading", correct: false },
                ],
              },
              {
                prompt: "Why is deliberately keeping transfers below a reporting threshold a serious mistake?",
                explanation:
                  "Structuring is itself an offence in many jurisdictions, and it is precisely the pattern that monitoring systems are designed to detect. It converts a paperwork question into a criminal one.",
                options: [
                  {
                    text: "Structuring is itself an offence and is exactly what monitoring detects",
                    correct: true,
                  },
                  { text: "It causes higher fees per transfer", correct: false },
                  { text: "It slows down settlement", correct: false },
                  { text: "It is fine as long as the income is declared", correct: false },
                ],
              },
              {
                prompt: "What should you never outsource to an accountant?",
                explanation:
                  "The records. Nobody can reconstruct what you did not write down, and paying someone to attempt it buys an expensive approximation. You should also retain enough understanding to sanity-check the advice.",
                options: [
                  { text: "Keeping the records in the first place", correct: true },
                  { text: "Filing the return", correct: false },
                  { text: "Interpreting local rules", correct: false },
                  { text: "Calculating the gains", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Putting it together",
      description:
        "Your whole money system across borders — written down, tested, and able to survive a bad month without you.",
      lessons: [
        {
          title: "The one-page money system",
          type: "TEXT",
          points: 10,
          body: `Everything in this course has to become one page, or it will not survive contact with a busy year.

## What belongs on it

Where value lives. Local currency for spending and immediate emergencies, dollars for the medium term, with amounts and the custody for each.

The routes. In, out, and across — the actual services, the networks, the order of steps.

The rules. Your depeg rule with its threshold. Your remittance amount. Your pre-send checklist.

The records. Where the ledger lives and when you update it.

The fallbacks. One tested alternative for each single point of failure.

## What does not belong on it

Any secret. No keys, no recovery phrases, no passwords, no fragments. The page describes the system; it never contains the way in. If you would not be comfortable with a stranger reading it, remove something.

Anything you do not actually do. A page describing an aspirational system is worse than no page, because it makes you feel organised while you are not.

## Where it lives

Somewhere you will see it in ordinary life, so it stays current, and somewhere findable when something has gone wrong.

## The review

Twice a year, twenty minutes, five questions. Are the rates and services still the best available? Has any single point of failure appeared? Is the ledger current? Has my allocation drifted from what I wrote? Has my situation changed enough that the plan should?

That last one catches the most. Plans do not usually become wrong; they become out of date, and the person holding them is the last to notice.

## Why a page rather than a document

Because you will read a page. The value here is not thoroughness — it is that the thing exists in a form you will actually keep using.

Everything in this course was in service of one outcome: money crossing a border stops being something that happens to you and becomes something you run. A page you keep is what makes that true a year from now.`,
          activity: {
            title: "Write the page",
            prompt:
              "Write your one-page money system now, using the five sections: where value lives, the routes, the rules, the records, the fallbacks. Constraints: one page, no secrets of any kind, and every line describes something you actually do. Put anything not yet done in a clearly marked 'not yet' list at the bottom with a date against each. Then decide where the page lives and put it there today.",
          },
        },
        {
          title: "Teaching this to someone else",
          type: "TEXT",
          points: 10,
          body: `You now know more about this than almost everyone around you, and that creates both an opportunity and a responsibility.

## Why teaching is the real test

You do not know a thing until you can explain it to someone who will act on it and be hurt if you are wrong. Explaining forces you to find the parts you were vague about.

## Teach the order, not the tricks

People want the shortcut — the best rate, the cheapest route. The order matters far more.

Understand what a stablecoin is and what backs it. Then custody. Then networks and test transfers. Then conversion. Only then optimisation.

Someone who learns the optimisation first and the fundamentals never is one bad month from losing everything they saved.

## The four things worth passing on

The three types of stablecoin and which ones broke. This one sentence has saved people their savings.

Check the receiving side's network first, and always send a test amount.

The full cost includes both conversion spreads, and the amount that arrives is the only honest number.

Keep a ledger from the first transaction.

## Be honest about the risks

If you teach someone this and present it as risk-free, you own part of what happens. Tell them about issuer risk, depegs, frozen accounts and irreversibility. The person who knows the risks and proceeds is fine. The person who was told it was safe is not.

## Do not become someone's custodian

You will be asked to hold money for people, or to run their transfers with your account. Be very careful. It creates liability, it can look like operating an unlicensed money business, and it ends friendships when something goes wrong.

Teaching someone to do it themselves, or handling the crypto side while they keep their own bank account, is almost always better than holding their money.

## And do not sell anything

The moment you earn a referral fee, your advice is compromised whether or not you feel compromised. If you do take a commission, say so plainly, every time.

The most valuable thing you have here is that people can trust what you tell them about money. That is worth more than any referral, and it is spent the first time you are not straight with someone.`,
          activity: {
            title: "Teach one person this week",
            prompt:
              "Pick one specific person who would genuinely benefit — someone paid from abroad, sending money home, or watching savings shrink. Write what you will cover, limited to the four things worth passing on, plus an honest statement of the risks. Then have the conversation this week and write down what happened: what they already believed that was wrong, what they found hardest, and what you discovered you could not explain clearly. That last one is your own gap.",
          },
        },
        {
          title: "Where this fits in a bigger plan",
          type: "TEXT",
          points: 10,
          body: `Before the capstone, it is worth placing this course in proportion, because it is easy to over-weight the thing you have just learned.

## What this course solves

The leak. Money lost to fees, spread, and currency decline. That is real, it is often 10 to 30% a year for people in the situations this course addresses, and stopping it is genuinely valuable.

## What it does not solve

Your income. Holding dollars perfectly does not change how much you earn, and for most people income is the larger lever by a wide margin. Stopping a 20% leak on a small amount matters less than doubling the amount.

Your spending. If more goes out than comes in, currency is not the problem.

Your long-term growth. Stablecoins hold value; they do not grow it. Over decades, money that merely holds value loses to money that compounds. This course is defence, and defence alone does not build anything.

## The right sequence

Stop the leak, because it is fast and it compounds against you daily. Then raise income, which has no ceiling. Then build the surplus into something that grows.

This course is the first step, deliberately, because it is the one you can complete in a month and because everything after it works better when your money stops evaporating.

## What comes next

The personal finance course, if you have not done it, is the one that turns a stopped leak into a plan.

The business and income courses are where the larger lever is.

Investing comes after those, not before, and anyone who tells you otherwise is selling something.

## The honest closing

Being competent at moving money across borders is a genuinely useful skill that most people do not have, and it will save you real money for the rest of your life.

It is also not the point. The point is that the money you earn stays worth something long enough for you to do something with it — pay for a course, start a business, help someone, build a life that is not eaten by the friction of the system you happen to live in.

Stop the leak. Then go and do the actual work.`,
          activity: {
            title: "Put this in order for yourself",
            prompt:
              "Write down the three levers in your own situation, with a real number against each: how much you currently lose to leak per year, how much you could realistically add to income in the next year, and how much you currently have compounding. Rank them by size. Then write down which one you have been spending most of your attention on, and whether that matches the ranking. For most people it does not, and noticing the mismatch is the whole point.",
          },
        },
        {
          title: "What you can now do",
          type: "TEXT",
          points: 10,
          body: `A short accounting of what has changed, before the final piece of work.

## What you can explain

What a stablecoin is and why it holds its price. The three types, and specifically which one collapsed and why the mechanism was circular. Why a stablecoin is not a bank deposit and carries no insurance.

## What you can do

Choose a network by checking the receiving side first, and send a test transfer before anything that matters.

Calculate the true cost of a transfer including both conversion spreads, and compare it honestly against a bank — including recognising when the bank wins.

Ask a client to pay you in stablecoins in a way that reads as professional, and invoice properly.

Convert through peer-to-peer without being taken by a forged screenshot or a reversible payment.

Hold savings split across issuers, off exchanges, with a written depeg rule you decided calmly in advance.

Design a remittance route around the recipient's competence rather than your own, with a tested fallback for every single point of failure.

Keep a ledger that makes tax, proof of income and disputes straightforward instead of frightening.

## What you know that most people do not

That the advertised fee is not the cost. That the amount arriving is the only honest number. That reliability beats price for money people depend on. That the recipient's competence, not yours, sets the design. That a stablecoin's safety is a question about a company, not about mathematics.

## The one sentence

If everything else faded, this would be enough: hold the boring reserve-backed ones, split across two issuers, off exchanges, check the receiving network first, always send a test, and write it all down.

## What is left

The capstone, which asks for the whole system as one document — and then the ordinary business of running it, month after month, while it quietly works.`,
          activity: {
            title: "Compare against where you started",
            prompt:
              "Go back to the first lesson's exercise, where you costed the problem you actually have — the annual figure you were losing. Read it again. Now write what that figure would be under the system you have designed in this course. Write both numbers side by side. Then write the one part of your new system you are least confident you will actually keep doing, and what you will change so that you do.",
          },
        },
        {
          title: "Capstone: your cross-border money system",
          type: "ASSIGNMENT",
          points: 40,
          body: `The final piece of work, and the one worth keeping. It pulls the whole course into a single document that an instructor reads looking for the month where it breaks.`,
          assignment: {
            title: "Your complete cross-border money system",
            instructions: `Write your complete system as one document, 900 to 1,400 words. No keys, phrases, passwords or account credentials anywhere in it.

**1. Your position.** What you earn in, spend in, hold, and move. What the last twelve months of currency movement cost you, with the real figure.

**2. Allocation and custody.** Where value sits — spending, emergency, medium-term — with amounts and reasoning. Which stablecoins, which issuers, why more than one, and who other than you could move each portion.

**3. The routes.** Each route you actually use — money in, money out, money across — step by step with real services, networks and the reason for each network choice. Include the full cost of each as a percentage.

**4. The comparison.** For your main route, what the traditional alternative costs. State plainly which wins and by how much, including any case where the bank is the better answer.

**5. Rules written in advance.** Your depeg rule with threshold and destination, plus the fluctuation you will ignore. Your pre-send checklist. Your sustainable remittance amount if that applies.

**6. Resilience.** Every single point of failure in your routes, the tested alternative for each, and what happens to the people depending on you if the main route fails on the worst week of the year.

**7. Records and legal.** What your ledger contains, how far you backfilled it, and when you update it. What you established about your own jurisdiction and from which primary source.

**8. Where this breaks.** Read your own document as though you were looking for the failure. Name the month, the circumstance, or the assumption that breaks it, and what you are doing about that. A document concluding that nothing breaks scores zero on this criterion — every real system has a weak month.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Position and allocation are real and quantified",
                weight: 15,
                descriptor:
                  "Actual figures for currency cost and actual amounts or percentages across the three buckets, with near-term spending sensibly kept local.",
              },
              {
                criterion: "Custody and issuer risk are properly handled",
                weight: 15,
                descriptor:
                  "Named issuers, split where amounts justify it, savings off exchanges, and a clear answer on who else can move each portion. No yield-chasing on money whose purpose is not losing.",
              },
              {
                criterion: "Routes are specific, costed and justified",
                weight: 20,
                descriptor:
                  "Real services and networks with reasons, and full costs including both conversion spreads. Full marks explain the network choice rather than merely naming it.",
              },
              {
                criterion: "The traditional comparison is honest",
                weight: 10,
                descriptor:
                  "A real alternative cost with a clear verdict, including acknowledging any case where the bank wins.",
              },
              {
                criterion: "Rules are written in advance and two-sided",
                weight: 15,
                descriptor:
                  "Depeg rule with a concrete threshold and destination plus a deliberate ignore level; a usable pre-send checklist. Full marks distinguish recoverable from terminal depegs.",
              },
              {
                criterion: "Resilience is designed, not hoped for",
                weight: 15,
                descriptor:
                  "Single points of failure identified with tested alternatives, and the consequences for dependants stated. Full marks include a buffer or equivalent so a failure is an inconvenience rather than a crisis.",
              },
              {
                criterion: "The breaking point is found",
                weight: 10,
                descriptor:
                  "A genuine weak month or assumption identified with a response. Concluding that nothing breaks scores zero here.",
              },
            ],
          },
        },
      ],
    },
  ],
};
