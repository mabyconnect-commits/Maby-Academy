import type { ContentCourse } from "./types";

/**
 * Tokenomics — valuing what you actually own.
 *
 * The counterweight to the trading courses. Where those teach reading price,
 * this teaches reading the thing price is supposedly about: supply, demand,
 * who holds it, who is about to sell it, and whether any value accrues to the
 * holder at all.
 *
 * The editorial spine is a single question repeated until it is instinctive:
 * why would anyone need to buy this, from whom, and at what rate. Most tokens
 * cannot answer it, and the course's real deliverable is the ability to notice
 * that quickly rather than after a year of holding.
 *
 * Deliberately unglamorous about valuation. It teaches that most crypto assets
 * cannot be valued in the way equities can, says so plainly, and then teaches
 * what can honestly be established instead.
 */
export const tokenomics: ContentCourse = {
  slug: "tokenomics",
  title: "Tokenomics: Valuing What You Actually Own",
  subtitle:
    "Supply schedules, unlocks, holder concentration and value accrual. How to work out whether a token has any reason to be worth anything.",
  description: `A token's price is a number. What sits behind it is a supply schedule, a distribution, a set of people who received it cheaply and can sell it, and — sometimes — a mechanism by which value reaches whoever holds it. Most people buy the number without reading any of that.

This course teaches the reading. How to find the real supply rather than the one displayed, and why circulating supply is the most misleading figure in the industry. How to find unlock schedules and work out how much sell pressure is scheduled against you. How to read holder concentration and see when a handful of addresses control the outcome. How to trace whether revenue, fees or any economic activity actually reaches token holders — and to notice that for most tokens, it does not.

Then valuation, honestly. Most crypto assets cannot be valued the way a business can, because there are no cash flows to discount. The course says this plainly rather than dressing up a model. What it teaches instead is what can genuinely be established: comparative analysis, the arithmetic of what has to be true for a price to make sense, and the ability to state clearly when the honest answer is that nobody knows.

The spine of the whole course is one question, repeated until it is automatic: why would anyone need to buy this, from whom, and at what rate? Most tokens cannot answer it. Being able to notice that within twenty minutes, rather than after a year of holding, is the deliverable.

Reading the Chain is a useful prerequisite but not required — this course teaches the data sources it needs.`,
  categorySlug: "on-chain-analysis",
  level: "ADVANCED",
  priceMinor: 0,
  estimatedHours: 18,
  passThreshold: 80,
  instructorEmail: "grace@mabyacademy.com",
  outcomes: [
    "Find a token's real supply, including what is not in the circulating figure",
    "Read an unlock schedule and quantify the sell pressure scheduled against you",
    "Assess holder concentration and identify when a few addresses control the outcome",
    "Trace whether protocol revenue actually accrues to token holders, or does not",
    "Distinguish genuine demand for a token from demand manufactured by incentives",
    "Apply comparative valuation honestly, including stating when nothing can be established",
    "Read a token's documentation for what it omits as well as what it claims",
    "Produce a written thesis with a falsifiable claim and a stated invalidation",
  ],
  modules: [
    // =====================================================================
    {
      title: "Supply: the number that is usually wrong",
      description:
        "Circulating supply, fully diluted value, and why the figure on the front page misleads almost everyone who reads it.",
      lessons: [
        {
          title: "The question this whole course answers",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `One question runs through every lesson here, and by the end it should be automatic.

## The question

Why would anyone need to buy this token, from whom, and at what rate?

Three parts, and each does work.

Why would anyone need to buy it. Not want — need. Is there a function that requires holding or spending this specific token? Paying fees, providing collateral, staking to secure something, accessing something otherwise unavailable?

From whom. Every buyer needs a seller. Who is selling, and are they selling because they want to or because a vesting schedule just released them?

At what rate. Demand must exceed the rate of new supply arriving. A token with genuine demand and a faster issuance schedule still falls.

## Why most tokens cannot answer it

Most tokens have no function that requires holding them. Governance rights that nobody exercises, a claim on nothing, and a supply schedule that releases steadily into a market of holders hoping to sell higher.

For those, the honest answer to "why would anyone need to buy this" is: they would not need to. They might want to, if they expect someone else to want it later. That is a different thing, and it is the entire basis of most token prices.

There is nothing wrong with saying so. What is wrong is not knowing which kind you hold.

## What this course is not

It is not a way to find tokens that will go up. Nothing reliably does that.

It is not a valuation model that produces a target price. Most crypto assets cannot be valued that way and this course will explain precisely why rather than pretending otherwise.

## What it is

A way to establish what you actually own, what is scheduled to happen to its supply, who controls it, and whether any economic value reaches you.

That is enough to avoid a large category of losses — the ones where the information was public, sitting in a document, and nobody read it.

## The standard

For every token you look at after this course, you should be able to answer the three-part question in twenty minutes, or state clearly that it cannot be answered.

The second outcome is as valuable as the first, and it is more common.`,
          activity: {
            title: "Ask it of something you hold",
            prompt:
              "Take a token you hold or have considered. Answer the three-part question in writing right now, before learning anything else in this course: why would anyone need to buy it, from whom, and at what rate relative to new supply. Do not research — answer from what you currently know. Then note honestly how much of your answer was a guess. You will answer this again at the end of the course and the comparison is the point.",
          },
        },
        {
          title: "Circulating supply is not what you think",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `The most-quoted figure in crypto, and the one that misleads the most people, because it describes something narrower than readers assume.

## What it claims to be

Tokens currently available to trade — total issued, minus what is locked, vested, or held by the project.

## Why it is unreliable

There is no standard definition. Different data providers use different rules for the same token, and the differences can be large.

Projects self-report. The figure often comes from the team, and the team benefits from a lower number, because a lower circulating supply produces a higher implied value per token at the same market capitalisation.

The exclusions are inconsistent. Treasury holdings, foundation reserves, tokens held by the team, and tokens locked in contracts may or may not be counted, and the choice is frequently not documented.

## The consequence

Market capitalisation — price times circulating supply — is derived from a number that is soft. A token can appear to have a modest market capitalisation and have a far larger amount that will exist and can be sold.

Comparing two tokens by market capitalisation assumes both computed the figure the same way. They usually did not.

## Fully diluted valuation

Price times maximum supply. What the project would be worth if every token that will ever exist existed today.

This is a much more honest starting point, because it does not depend on someone's judgement about what counts as locked.

The gap between market capitalisation and fully diluted valuation tells you how much supply is scheduled to arrive. A token trading at a modest market capitalisation with a fully diluted valuation ten times higher has 90% of its supply still to come — and it will come, and it will come to people who received it more cheaply than you.

## Not a valuation

Fully diluted valuation is not a claim about worth. It is a comparison tool and a measure of the overhang.

Its weakness is that it ignores timing. Supply arriving over ten years is very different from supply arriving next quarter, and fully diluted valuation treats them identically. That is what the unlock schedule is for, and it is the next lesson.

## The habit

Never look at market capitalisation alone. Always look at both, and always at the ratio.

That single habit filters out a large category of tokens whose apparent cheapness is an artefact of a number the team chose.`,
          activity: {
            title: "Compare the two figures",
            prompt:
              "Take five tokens you have heard of. For each, find the circulating supply, the maximum or total supply, the market capitalisation and the fully diluted valuation. Calculate the ratio of fully diluted valuation to market capitalisation for each. Write them in order. Then check one of them across two different data providers and note whether the circulating supply figures agree. Write down any discrepancy you find.",
          },
        },
        {
          title: "Emission schedules and the rate of new supply",
          type: "TEXT",
          points: 10,
          body: `How fast new tokens arrive determines how much demand is required simply to hold a price steady. Most people never look.

## The mechanics

Tokens enter circulation through issuance. Common sources: block rewards to validators or miners, liquidity incentives paid to users, staking rewards, and scheduled releases to teams and investors.

Each is new supply arriving at a rate you can find and calculate.

## The arithmetic that matters

If a token issues 10% of its circulating supply per year, then demand must grow 10% per year just to hold the price flat. Anything less and price falls, even if adoption is rising.

This is why tokens with real usage and high emissions still decline. The usage is genuine; the issuance outruns it.

## Where the emissions go

To validators securing the network. Some sell to cover costs, and the rate at which they do is a real and estimable figure.

To liquidity providers and users as incentives. This is the important case: recipients of incentive emissions are usually there for the incentive, and they sell. The demand created is entirely dependent on continued payment.

To the team and investors. Covered in the unlocks lesson.

## Incentive-driven demand is rented

A protocol paying users in its own token to use it has manufactured demand that lasts as long as the payment. When emissions reduce, the users leave and the metrics collapse.

This is the single most common way growth figures mislead. Usage went up because the protocol paid for it, and the payment was in a token whose value depends on the usage. It is circular, and the circle unwinds.

The test: if emissions stopped tomorrow, what fraction of this usage remains?

## Deflation and burns

Some tokens destroy supply — burning a share of fees, for instance. This offsets issuance.

Read it carefully. Burns are frequently much smaller than issuance and are marketed as though they were the dominant force. Calculate net supply change, not the burn in isolation.

Net issuance is what matters: new supply minus destroyed supply, as a percentage of circulating supply per year. That one number tells you the headwind.

## What to establish

Annual issuance rate as a percentage of circulating supply. Where it goes. Net of any burn. And whether current usage would survive its removal.

Four figures, all findable, and together they tell you whether the token is fighting its own supply.`,
          activity: {
            title: "Calculate net issuance",
            prompt:
              "Pick one token with meaningful on-chain activity. Find its annual issuance and any burn mechanism, and calculate net supply change as a percentage of circulating supply per year. Then write where the issuance goes — validators, incentives, team, or a mix. Finally, answer the test: if incentive emissions stopped tomorrow, what fraction of the usage would remain? Write your estimate and what evidence you based it on.",
          },
        },
        {
          title: "Unlocks: the sell pressure with a date on it",
          type: "TEXT",
          points: 10,
          body: `The most predictable negative catalyst in crypto, published in advance, and routinely ignored by the people it affects.

## How allocations work

At launch, tokens are allocated: some to the team, some to early investors, some to a foundation or treasury, some to the public.

The team and investor portions are usually subject to a cliff — a period with no release — followed by vesting, a gradual release over months or years.

## Why it matters so much

Early investors bought at a fraction of the public price. Sometimes a hundredth. When their tokens unlock, they hold something with enormous unrealised profit and no reason to be sentimental.

The team's position is similar, with more nuance — some hold, and many sell at least a portion, reasonably.

The result is scheduled sell pressure at known dates, against a market of buyers who paid far more.

## Reading a schedule

Find the token distribution and the vesting terms. They are usually in documentation, a blog post, or a data provider's unlock page.

Establish: what percentage unlocks, on what date, to whom, and at what cost basis relative to the current price.

Then calculate the unlock as a percentage of daily trading volume. A release equal to thirty days of volume is a very different event from one equal to one day.

That ratio is the single most useful number here, and almost nobody computes it.

## What actually happens around unlocks

Price frequently weakens in the weeks before a large unlock, as informed participants position ahead of it. The event itself is sometimes an anticlimax because the selling was pre-positioned.

Sometimes the unlocked tokens are not sold — locked into staking, or held by parties with long horizons. This is why the ratio matters more than the raw number, and why the recipient matters.

## The pattern to recognise

A token launched with a small public float, a high fully diluted valuation, and a large cliff twelve months out. The price is supported by scarcity during the lockup, and the scarcity ends on a known date.

This structure is common and it is not accidental. Being on the wrong side of it is avoidable by reading a schedule.

## The habit

Before buying any token, find the unlock schedule and write down the next three events with dates and percentages. If you cannot find one, that absence is itself the finding — and it should reduce your position, not be ignored.`,
          activity: {
            title: "Chart the next three unlocks",
            prompt:
              "Take two tokens. For each, find the unlock schedule and write down the next three events: date, percentage of circulating supply, and recipient. Then find the average daily trading volume and express each unlock as a number of days of volume. Write those ratios. If you cannot find a schedule for one of them, write down where you looked and treat the absence as a finding worth noting.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on supply. Everything after this builds on the idea that the supply side is knowable in advance and is where most avoidable losses come from.`,
          quiz: {
            title: "Supply and issuance",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "Why is circulating supply an unreliable figure?",
                explanation:
                  "There is no standard definition, providers differ, and projects self-report — with an incentive toward a lower number, since it makes the implied value per token higher at the same market capitalisation.",
                options: [
                  {
                    text: "It is self-reported, has no standard definition, and providers compute it differently",
                    correct: true,
                  },
                  { text: "It is updated only annually", correct: false },
                  { text: "It excludes tokens held on exchanges", correct: false },
                  { text: "It is calculated by regulators", correct: false },
                ],
              },
              {
                prompt: "A token has a fully diluted valuation ten times its market capitalisation. What does that tell you?",
                explanation:
                  "Roughly 90% of its supply is still to arrive, to holders who received it more cheaply. It says nothing about timing, which is what the unlock schedule is for — supply over ten years and supply next quarter look identical on this measure.",
                options: [
                  {
                    text: "About 90% of supply is still to come, though not when",
                    correct: true,
                  },
                  { text: "The token is undervalued by a factor of ten", correct: false },
                  { text: "The team holds 90% of the supply", correct: false },
                  { text: "The token will decline 90%", correct: false },
                ],
              },
              {
                prompt: "A protocol pays users in its own token to use it, and usage is rising. What is the test?",
                explanation:
                  "If emissions stopped tomorrow, what fraction of usage remains? Incentive-driven demand is rented and the arrangement is circular — usage rises because the protocol pays, and the payment's value depends on the usage.",
                options: [
                  {
                    text: "What fraction of the usage would remain if the incentives stopped",
                    correct: true,
                  },
                  { text: "Whether usage is growing faster than the sector", correct: false },
                  { text: "Whether the token is listed on major exchanges", correct: false },
                  { text: "Whether the team is public", correct: false },
                ],
              },
              {
                prompt: "What is the most useful way to size an upcoming unlock?",
                explanation:
                  "As a multiple of average daily trading volume. A release equal to thirty days of volume is a very different event from one equal to a single day, and the raw percentage does not capture that.",
                options: [
                  { text: "As a number of days of average trading volume", correct: true },
                  { text: "As a percentage of maximum supply", correct: false },
                  { text: "As a dollar value at the current price", correct: false },
                  { text: "By the number of wallets receiving it", correct: false },
                ],
              },
              {
                prompt: "A token issues 15% of circulating supply annually with a burn worth 2%. What matters?",
                explanation:
                  "Net issuance of about 13% per year, meaning demand must grow 13% annually just to hold price flat. Burns are often marketed as the dominant force while being much smaller than issuance.",
                options: [
                  {
                    text: "Net issuance of roughly 13%, which demand must outgrow just to hold price flat",
                    correct: true,
                  },
                  { text: "The burn, since deflationary mechanisms dominate", correct: false },
                  { text: "Neither — issuance is priced in", correct: false },
                  { text: "Only the gross issuance figure", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Who holds it",
      description:
        "Distribution and concentration. Reading the holder list tells you who decides the outcome, and it is public.",
      lessons: [
        {
          title: "Reading a holder distribution",
          type: "TEXT",
          points: 10,
          body: `Every token's holder list is public. Reading it takes ten minutes and tells you things no amount of price analysis will.

## Where to look

A block explorer for the relevant chain has a holders page for any token contract. It lists addresses by balance, with percentages.

## What to establish

What share the top ten addresses hold. What share the top hundred hold. How many holders there are in total, and how that has changed.

## Interpreting concentration

High concentration means a small number of parties can move the price and control any governance vote. It is not automatically bad — a young project will be concentrated — but it defines who the actual decision-makers are.

The concerning pattern is high concentration in addresses that are not identifiable and not locked. Those are people who can sell into you at a moment of their choosing.

## Addresses that are not holders

Do not take the list at face value. Several entries are usually not what they appear.

Exchange wallets hold many users' tokens pooled. A large exchange address is not one holder.

Contract addresses hold tokens locked in protocols, staking, or liquidity pools. Those are not free-floating.

Burn addresses hold destroyed tokens.

Treasury and vesting contracts hold tokens not yet released.

Identify these before drawing conclusions, or you will misread pooled and locked holdings as concentration and vice versa.

## Where the real concentration hides

Sophisticated holders split across many addresses. A list showing no single large holder can still be dominated by one party using fifty addresses.

Clustering — grouping addresses that behave as one, by funding patterns and timing — is how this is detected, and some analytics tools do it. It is genuinely difficult and worth knowing is possible.

## The change over time

More informative than the snapshot. Is concentration rising or falling? Are large holders accumulating or distributing?

A steady decline in the top holders' share alongside a rising holder count is healthy distribution. The reverse, particularly into a rising price, means someone is selling to new entrants.

## The habit

Before any position, open the holders page. Ten minutes. Note the top ten share, identify which entries are exchanges or contracts, and check the direction of change.

It is the cheapest research available and most people skip it entirely.`,
          activity: {
            title: "Read a holder list properly",
            prompt:
              "Pick one token and open its holders page on a block explorer. Write down the top ten addresses with their percentages. Then identify each one: exchange, contract, burn address, treasury, or unidentified individual. Recalculate the concentration counting only the unidentified free-floating holders. Write both the naive figure and the corrected one, and note how different they are.",
          },
        },
        {
          title: "Insiders, treasuries and who is actually selling",
          type: "TEXT",
          points: 10,
          body: `Knowing who holds a token is half the picture. Knowing what they are doing with it is the other half, and it is also public.

## Following an allocation

Vesting contracts release on schedule. You can watch the release and then watch where the tokens go.

If they move to an exchange, that is a strong indication of selling. If they move to a staking contract or sit still, that is different information.

This is genuinely observable and very few holders bother to observe it.

## Treasury behaviour

Most projects hold a treasury for development and operations. Its behaviour tells you about the project's health and intentions.

A treasury steadily converting tokens to stablecoins is funding operations, which is prudent and is also persistent selling.

A treasury that is entirely in its own token is exposed to its own price — a fall in the token is a funding crisis, which forces selling at exactly the worst moment. This has ended projects.

A treasury with a long stablecoin runway can survive a downturn without selling, which is a genuine positive and is checkable.

## Team behaviour

Some teams sell, and reasonably — people have lives and taxes. The question is proportion and disclosure.

A team selling a modest portion on a stated schedule, disclosed in advance, is behaving well. A team quietly moving large amounts to exchanges while publicly encouraging holding is telling you something important.

## The signals worth watching

Large transfers from known team or investor addresses to exchanges.

Treasury conversions to stablecoins, and their pace.

Accumulation by addresses that have historically been early and correct.

New large holders appearing, and whether they came from an exchange — which means a purchase — or from a vesting contract, which means a release.

## The limits

Addresses are pseudonymous. Attribution is often uncertain, labels can be wrong, and a transfer to an exchange is not proof of a sale — it could be collateral or a transfer between custody arrangements.

Treat these as evidence rather than proof, and weight accordingly.

## Where to look

Explorer address pages, labelled by analytics providers. Some services alert on movements from known team or investor addresses.

The point is that this is public. The people selling into you are doing it in the open, and the only reason it works is that almost nobody looks.`,
          activity: {
            title: "Follow the money from a vesting contract",
            prompt:
              "Find a token whose vesting contract you can identify on an explorer. Look at the last two releases and trace where the tokens went — to exchanges, to staking, or nowhere. Write what you found. Then find the project's treasury address if you can, and note its composition: what fraction is in its own token versus stablecoins, and roughly how many months of runway that represents. State how confident you are in each identification.",
          },
        },
        {
          title: "Governance, and whether it means anything",
          type: "TEXT",
          points: 10,
          body: `Most tokens are described as governance tokens, offering a vote on the protocol's direction. It is worth establishing what that is actually worth, which is frequently very little.

## What governance rights usually are

The ability to vote on proposals — parameter changes, treasury spending, upgrades. Voting power proportional to tokens held.

## Why it is often close to worthless

Participation is typically very low. A few percent of supply votes on most proposals, which means a small number of large holders decide everything.

If the top ten addresses hold a majority, your vote is decorative. You are not participating in governance; you are observing it.

Proposals are often shaped before the vote. By the time something reaches a formal vote, it has usually been agreed among the parties who matter, and the vote ratifies it.

And critically: a vote is not a claim on anything. Governance rights confer no revenue, no dividend and no liquidation claim. Owning a governance token is not owning a share of a business, however similar the vocabulary sounds.

## When governance does matter

When it controls a treasury of real value, votes have real consequences and the token has a genuine function.

When parameters materially affect economics — fee levels, emissions, collateral requirements — control is worth something.

When the protocol holds assets that could be directed to holders, governance is a route to value even if it is not currently used.

## The vote-buying problem

Where governance controls value, markets emerge for votes. Parties acquire or rent voting power to direct incentives toward themselves.

This is not necessarily corrupt — it can be efficient — and it means governance power flows to whoever benefits most from a given decision, which is not necessarily the holders in general.

## The honest assessment

Ask three things. Does governance control anything of value? Is participation high enough that the outcome is not predetermined? Does any of it reach me as a holder?

For most tokens the answers are: not much, no, and no.

## Why this matters for valuation

Because "governance token" is frequently the entire stated reason for the token to exist. If governance is worthless, the token has no established function, and the three-part question from lesson one has no answer.

That is a legitimate finding, and it applies to a large share of the market.`,
          activity: {
            title: "Check whether a vote matters",
            prompt:
              "Pick a governance token and find its recent proposals. For three of them, write down: total votes cast as a percentage of supply, and what share the largest voter held. Then answer whether the outcome was determined by a small number of addresses. Finally, answer the three questions: does governance control anything of value, is participation meaningful, and does any value reach holders? Write your conclusion plainly.",
          },
        },
        {
          title: "Liquidity: can you actually sell",
          type: "TEXT",
          points: 10,
          body: `A holding you cannot exit at a reasonable price is worth less than the quoted price says. Liquidity is part of what you own and it is routinely ignored until it matters.

## What to establish

The depth available near the current price, on both sides. Not the daily volume figure — the actual orders or pool depth you could transact against.

Where the liquidity sits. Concentrated on one venue, or spread across several? A single venue is a single point of failure.

Who provides it. If most liquidity is supplied by the project or by incentivised providers, it can be withdrawn.

## The size test

Take the position you are considering and ask what selling it would do to the price. If the answer is a large percentage, the quoted price does not apply to you.

This is the most practical liquidity check and it takes two minutes on a depth chart or a pool page.

## Incentivised liquidity is rented

Protocols pay providers in tokens to supply liquidity. Those providers are there for the payment and leave when it stops.

So a token with deep liquidity today can have very little in three months if emissions are reducing. Check whether liquidity is paid for, and check the emissions schedule alongside it.

## Liquidity disappears when you need it

In a sharp fall, providers withdraw and depth thins exactly when everyone wants to sell. The exit that looked adequate in calm conditions is not there.

Assume the liquidity available to you in a crisis is a fraction of what you measure today. Size accordingly.

## Concentration in one pool

Many smaller tokens have effectively one liquidity pool. If it is drained, exploited, or the incentives end, there is no market.

Check how many venues have meaningful depth. One is fragile.

## The relationship to everything else

Liquidity ties directly to unlocks. A large unlock into thin liquidity moves price far more than the same unlock into deep liquidity — which is why the days-of-volume ratio from module one is the right way to size an unlock.

## The practical rule

Before buying, establish what selling your intended position would cost you in slippage, and assume conditions will be worse when you actually want out.

If that cost is significant, either reduce the size or accept that you are in something you cannot exit cleanly — which is a legitimate choice made knowingly, and a bad surprise made unknowingly.`,
          activity: {
            title: "Cost your own exit",
            prompt:
              "Take a token you hold or would hold and a realistic position size. Find the actual depth available and estimate what selling that position in one go would cost you in slippage. Write the percentage. Then find how many venues have meaningful liquidity, and whether liquidity providers are being paid in emissions. Finally, halve your depth estimate to simulate a crisis and recalculate. Write both numbers.",
          },
        },
        {
          title: "Assignment: a distribution and supply audit",
          type: "ASSIGNMENT",
          points: 25,
          body: `The first graded piece. It asks for an evidenced audit of one token's supply and distribution — the facts, not a view on price.

Pick something you actually hold or are considering. The exercise is worth more when the answer matters to you.`,
          assignment: {
            title: "Supply and distribution audit",
            instructions: `Audit one token's supply and distribution. 700 to 1,000 words. Every figure sourced — state where you found it.

**1. Supply.** Circulating supply, total supply, maximum supply, market capitalisation and fully diluted valuation, with the ratio. Note any discrepancy between two data providers.

**2. Issuance.** Annual issuance as a percentage of circulating supply, where it goes, any burn mechanism, and net supply change. State what demand growth is required simply to hold price flat.

**3. Incentive dependence.** What fraction of current usage and liquidity is paid for in emissions, and your estimate of what remains if payments stopped. State the evidence for your estimate.

**4. Unlocks.** The next three unlock events with dates, percentages, and recipients. Each expressed as a multiple of average daily volume. If no schedule is published, say where you looked and treat the absence as a finding.

**5. Distribution.** Top ten holders with percentages, each identified as exchange, contract, treasury, burn or unidentified. The corrected concentration counting only free-floating holders. The direction of change over time if you can establish it.

**6. Insider behaviour.** What you could establish about team, investor or treasury movements. Treasury composition and rough runway. State your confidence in each attribution.

**7. Liquidity.** Depth available, number of venues with meaningful liquidity, whether it is incentivised, and the slippage cost of exiting a realistic position — plus the same figure assuming half the depth.

**8. The three-part question.** Why would anyone need to buy this, from whom, and at what rate? Answer it, or state clearly that it cannot be answered — which is a full-marks answer where it is true.

No price prediction anywhere in this submission.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Supply figures are complete and sourced",
                weight: 15,
                descriptor:
                  "All five figures with the ratio and a cross-provider check. Full marks note any discrepancy rather than reporting one source.",
              },
              {
                criterion: "Net issuance is calculated and its implication stated",
                weight: 15,
                descriptor:
                  "Issuance net of burn as an annual percentage, with the required demand growth stated explicitly.",
              },
              {
                criterion: "Incentive dependence is assessed with evidence",
                weight: 15,
                descriptor:
                  "A real estimate of what survives without emissions, supported by evidence rather than asserted.",
              },
              {
                criterion: "Unlocks are sized against volume",
                weight: 15,
                descriptor:
                  "Three dated events expressed as days of volume, or a documented search and a stated finding where no schedule exists.",
              },
              {
                criterion: "Holders are identified, not just listed",
                weight: 20,
                descriptor:
                  "Each top holder categorised, with concentration recalculated on free-floating holdings only. Full marks state confidence in attributions.",
              },
              {
                criterion: "Liquidity is tested at realistic size",
                weight: 10,
                descriptor:
                  "Slippage on an actual intended position, plus a stressed figure at reduced depth.",
              },
              {
                criterion: "The three-part question is answered honestly",
                weight: 10,
                descriptor:
                  "A direct answer, or a clear statement that it cannot be answered. The second scores full marks where it is the truth.",
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Does value reach you",
      description:
        "The question that separates a token with economics from a token with a story: does anything the protocol earns arrive at the holder?",
      lessons: [
        {
          title: "Revenue, and where it goes",
          type: "TEXT",
          points: 10,
          body: `Some protocols genuinely earn money. Whether any of it reaches token holders is a separate question, and the answer is usually no.

## Protocol revenue

Fees charged by the protocol for its service — trading fees, borrowing interest, transaction fees. This is real economic activity and it is measurable on chain.

Distinguish it from volume. A billion in trading volume at a 0.05% fee is half a million in revenue. Volume figures are quoted because they are larger.

## Where revenue can go

To liquidity providers or users, which is most common. The protocol earns and distributes to the people supplying the service. Token holders receive nothing.

To a treasury, controlled by governance. Holders benefit only if governance directs it to them, which mostly does not happen.

To token buybacks or burns, reducing supply. This does reach holders, indirectly.

To direct distribution to stakers. This reaches holders most directly and is the rarest.

## The question to ask

Of every dollar this protocol earns, how much reaches someone holding the token and doing nothing else?

For most protocols the honest answer is zero. The token has a governance right over a treasury that is not distributed, and no claim on revenue.

That is not necessarily fatal — it may accrue value later, and optionality has worth — but it must be stated plainly rather than assumed.

## Why this is obscured

Marketing conflates protocol revenue with token value. A dashboard showing large fees implies holders benefit. Usually they do not, and the documentation rarely says so clearly.

Read the mechanism, not the dashboard. Find the specific pathway by which a dollar of revenue becomes value for a holder, and if you cannot trace it, it does not exist.

## Buybacks and burns

A protocol using revenue to buy and burn tokens transfers value to holders by reducing supply.

Check three things: is it actually happening on chain, at what scale relative to issuance, and is it discretionary or automatic? A discretionary buyback announced but not executed is a press release.

## The comparison to equity

Equity holders have a residual claim — profits belong to them, whether distributed or retained. Token holders generally do not. Retained value in a protocol treasury does not become the holder's unless a mechanism says so.

This is the single largest difference between crypto and equity analysis, and importing equity intuitions without noticing it is the most common analytical error in this field.`,
          activity: {
            title: "Trace one dollar",
            prompt:
              "Pick a protocol with real revenue. Find its annual revenue figure and then trace, specifically, what happens to it: what share goes to liquidity providers, to a treasury, to buybacks, or to stakers. Write the breakdown. Then answer the question: of one dollar earned, how many cents reach someone holding the token and doing nothing else? If the answer is zero, write that plainly and note whether the project's own materials make that clear.",
          },
        },
        {
          title: "Staking: real yield and the other kind",
          type: "TEXT",
          points: 10,
          body: `Staking rewards are presented as yield. Some of it is real and some of it is you being paid in newly printed tokens, and the distinction decides whether you are gaining anything.

## Two sources

Emissions. New tokens created and given to stakers. Your token count rises; everyone else's share falls proportionally. If you did not stake, you would be diluted. If you did, you roughly held your position.

This is not yield. It is a defence against dilution, presented as income.

Revenue share. A portion of fees the protocol actually earned, distributed to stakers. This is real — value flowing from users into holders.

## Telling them apart

Ask what the reward is paid from. If from new issuance, it is dilution defence. If from fees collected, it is real.

Many protocols pay both, and quote the combined figure. Separate them, because a headline rate that is 90% emissions and 10% revenue is a very different proposition from the reverse.

## The arithmetic of emission-based staking

If a token issues 20% annually to stakers and you stake, you receive roughly 20% more tokens. If everyone stakes, everyone's share is unchanged and the price absorbs the issuance.

Nothing was created. Value was transferred from non-stakers to stakers, and the headline number describes a redistribution rather than a return.

## What staking costs you

Lock-up periods, during which you cannot sell — including during a fall.

Unbonding delays, often days or weeks, meaning your exit is not immediate.

Slashing risk on some networks, where misbehaviour by your validator costs you principal.

Smart contract risk in liquid staking arrangements.

These are real costs against a return that may be illusory, and they should be weighed against the honest yield, not the headline.

## Real yield as a category

Protocols distributing actual fee revenue to stakers are a small and identifiable group. Their yield is genuine and is usually modest — because real revenue is modest compared to the numbers emissions can produce.

A modest real yield is worth more than a large emissions yield, and it is the correct thing to look for.

## The test

What is the yield paid from, what is the net after issuance dilution, and what does locking cost me in flexibility and risk?

Answer those three and the headline rate stops mattering.`,
          activity: {
            title: "Split a headline yield",
            prompt:
              "Find a staking opportunity with an advertised rate. Establish what portion comes from new issuance and what portion from distributed fee revenue — the documentation or a data provider will usually let you work this out. Write both figures. Then calculate the net position: your reward rate minus the dilution you would suffer from total issuance. Finally, list the lock-up, unbonding period and any slashing risk, and state whether the real yield compensates for them.",
          },
        },
        {
          title: "Utility: what the token is actually needed for",
          type: "TEXT",
          points: 10,
          body: `The strongest reason for a token to have value is that using the system requires it. Most tokens do not clear this bar, and it is worth being precise about what does.

## Genuine utility

Paying for something that can only be paid for in this token. Transaction fees on a network are the clearest example — using it requires acquiring it, which creates continuous, non-speculative demand.

Collateral that the system specifically requires.

Staking that secures a network with real value at stake, where the security function is genuine rather than nominal.

Access that cannot be obtained otherwise and that people actually want.

## Weak or absent utility

Governance nobody exercises, over a treasury that is not distributed.

Fee discounts, which create weak demand — people hold the minimum required and no more, and the discount can be changed.

"Ecosystem" claims with no specific requirement, which is the most common category and means nothing.

Rewards for using the protocol, which is the protocol paying you to create the appearance of demand.

## The substitution test

If the protocol replaced its token with a stablecoin tomorrow, what would break?

If the answer is nothing, the token is not required and its demand is speculative. If the answer is that the network could not be secured or fees could not be paid, it is genuinely required.

This test cuts through marketing very quickly and is worth applying to everything.

## Velocity

Even required tokens can have weak demand if nobody needs to hold them. If you buy a token, use it immediately and it returns to the market, the demand is transient.

Mechanisms that create holding — staking, locking, collateral requirements — turn transactional demand into held demand, which supports price far more.

Ask not only whether the token is needed but whether it is needed to be held.

## The honest distribution

A small number of tokens have genuine, non-substitutable utility. A larger number have weak utility. Most have none, and their price is entirely a function of expectation about other buyers.

Recognising which category something is in is most of what this course is for. It does not tell you what will happen to the price — plenty of tokens with no utility have risen a great deal — but it tells you what you are relying on.

If you are relying on other people's expectations rather than on a mechanism, know that, and size accordingly.`,
          activity: {
            title: "Run the substitution test",
            prompt:
              "Take three tokens, ideally ones you hold. For each, run the substitution test in writing: if the protocol replaced this token with a stablecoin tomorrow, what specifically would break? Be concrete — name the function. Then answer the second question: is the token needed to be held, or only to be passed through? Rank the three by strength of utility and write which category each falls into.",
          },
        },
        {
          title: "Reading documentation for what it omits",
          type: "TEXT",
          points: 10,
          body: `A project's own documentation is the primary source, and reading it well means noticing absences as much as claims.

## What should be there

Total supply and the full allocation breakdown, with percentages.

Vesting terms for every allocated group, with cliffs and durations.

The emission schedule, with rates over time.

A clear statement of the token's function.

Treasury size, composition and governance.

Fee structure and where fees go.

## What omissions mean

No vesting terms means either they do not exist, which is unusual, or they are unfavourable. Either way you cannot assess unlock risk, and that is a finding.

No allocation breakdown means you do not know how much insiders hold. This is a serious gap and it is sometimes deliberate.

Vague utility described in terms of ecosystem participation generally means there is no specific requirement. Precise documentation describes a mechanism; vague documentation describes an aspiration.

No fee destination means fees probably do not reach holders, because a project that had built that would say so prominently.

## Language to notice

Claims of a fixed supply that hold only if governance does not vote to change it. Check whether supply is actually immutable or merely currently capped.

Deflationary framing where the burn is a fraction of issuance.

Revenue figures presented without stating who receives them.

Partnership announcements that describe conversations rather than integrations.

Audits described without naming the auditor or linking the report, or audits of an earlier version of the code.

## Cross-checking against the chain

The documentation says what is intended. The chain says what is happening.

Check that the contract matches the documented supply. Check that vesting contracts hold what the allocation claims. Check that burns described are actually occurring, at the scale described.

Discrepancies between documentation and chain are among the most informative findings available, and they are rarely accidental.

## How to read efficiently

Twenty minutes, in order: allocation table, vesting terms, emission schedule, token function, fee destination. Then the chain to verify the first three.

If any of those five is missing or vague, note it and weight your conclusion accordingly. Three missing is usually enough to stop.`,
          activity: {
            title: "Read one set of documents against the chain",
            prompt:
              "Take one token and spend twenty minutes on its documentation, in the order given: allocation, vesting, emissions, function, fee destination. Write what you found for each and mark any that were missing or vague. Then check two of them against the chain — supply and a vesting contract balance are the easiest. Write down any discrepancy between what the documents claim and what the chain shows.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on value accrual. This is the module that most changes how people read a project, because the answer for most tokens turns out to be that nothing reaches the holder.`,
          quiz: {
            title: "Value accrual",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "A protocol earns substantial fees. What determines whether that benefits token holders?",
                explanation:
                  "Whether a specific mechanism routes value to holders — buybacks, burns, or direct distribution to stakers. Revenue going to liquidity providers or an undistributed treasury reaches holders not at all, and token holders have no residual claim the way equity holders do.",
                options: [
                  {
                    text: "Whether a specific mechanism routes it to holders, since they have no residual claim",
                    correct: true,
                  },
                  { text: "Revenue always benefits holders through price", correct: false },
                  { text: "Whether the protocol is profitable overall", correct: false },
                  { text: "Whether the treasury is growing", correct: false },
                ],
              },
              {
                prompt: "Staking rewards paid entirely from new issuance are best described as what?",
                explanation:
                  "A defence against dilution rather than yield. Your token count rises and so does everyone else's share denominator; if all holders stake, nobody's share changes. Value is redistributed from non-stakers, not created.",
                options: [
                  { text: "A defence against dilution, not a return", correct: true },
                  { text: "Real yield backed by protocol revenue", correct: false },
                  { text: "Interest paid by borrowers", correct: false },
                  { text: "A share of transaction fees", correct: false },
                ],
              },
              {
                prompt: "What is the substitution test?",
                explanation:
                  "Asking what would break if the protocol replaced its token with a stablecoin tomorrow. If nothing breaks, the token is not required and demand for it is speculative rather than functional.",
                options: [
                  {
                    text: "Asking what breaks if the token were replaced by a stablecoin",
                    correct: true,
                  },
                  { text: "Comparing the token against a similar project", correct: false },
                  { text: "Checking whether the token can be bridged to other chains", correct: false },
                  { text: "Testing whether the token can be used as collateral", correct: false },
                ],
              },
              {
                prompt: "Documentation gives no vesting terms for team and investor allocations. What is that?",
                explanation:
                  "A finding in itself. It means unlock risk cannot be assessed, and the omission is more often unfavourable than accidental. Absences in documentation are evidence, not gaps to fill with optimism.",
                options: [
                  {
                    text: "A finding — unlock risk cannot be assessed, and the omission is rarely accidental",
                    correct: true,
                  },
                  { text: "Normal, since vesting is always standard", correct: false },
                  { text: "Evidence there are no insider allocations", correct: false },
                  { text: "Unimportant if the team is public", correct: false },
                ],
              },
              {
                prompt: "Why does velocity matter even for a token with genuine utility?",
                explanation:
                  "Because a token bought, used and immediately returned to the market creates only transient demand. Mechanisms that require holding — staking, locking, collateral — convert transactional demand into held demand, which supports price far more.",
                options: [
                  {
                    text: "A token passed straight through creates transient demand, not held demand",
                    correct: true,
                  },
                  { text: "High velocity indicates the network is being attacked", correct: false },
                  { text: "Velocity determines the emission rate", correct: false },
                  { text: "It only matters for stablecoins", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Valuation, honestly",
      description:
        "What can and cannot be established about what a token is worth — and why most valuation content in this field is theatre.",
      lessons: [
        {
          title: "Why most crypto assets cannot be valued",
          type: "TEXT",
          points: 10,
          body: `The honest starting point, and the one most content in this area avoids because it does not sell.

## How valuation normally works

A business is valued on the cash it will produce. Estimate future cash flows, discount them for time and risk, and you have a value. The estimates are uncertain and the framework is sound — there is a thing being valued and a mechanism by which it reaches the owner.

## Why it usually does not apply

Most tokens produce no cash flow to the holder. There is nothing to discount.

You could value the protocol's revenue, but if that revenue does not reach holders, you have valued something you do not own.

So the standard framework has no input. Not because it is hard to estimate — because the quantity does not exist.

## What people do instead

Comparative valuation. This project is worth less than that similar one, so it should rise. This assumes the comparison is correctly valued, which is exactly what nobody knows, and it usually reduces to circular reasoning.

Total addressable market. If this captures 1% of some enormous market, it would be worth an enormous amount. The 1% is chosen to produce the desired answer, and there is generally no mechanism connecting market size to token value.

Network value ratios. Interesting descriptively, unstable in practice, and heavily dependent on how the denominator is defined.

Stock-to-flow and similar. Curve-fitting to history with no causal mechanism. Several have failed publicly and conspicuously.

## What can honestly be established

For the small set of tokens with genuine value accrual, something like a normal analysis is possible. Estimate the revenue reaching holders, discount it, and you have a basis. This is a small category and it is worth identifying.

For everything else: the supply picture, the distribution, the utility, and the required assumptions.

## Required assumptions

The most useful honest technique. Rather than producing a value, work backwards: at this price, what would have to be true?

If a token's fully diluted valuation is two billion, what adoption, revenue and value capture would justify it? Then ask whether that is plausible.

This does not tell you what something is worth. It tells you what you are implicitly assuming by owning it, which is far more useful and is answerable.

## The honest conclusion

For most crypto assets, nobody knows what they are worth, including the people who sound certain. Price is set by expectation about other buyers.

That is not a reason to avoid them. It is a reason to size positions as though you do not know — because you do not — and to be suspicious of anyone presenting a target price with confidence.`,
          activity: {
            title: "Work backwards from a price",
            prompt:
              "Take one token and its current fully diluted valuation. Now work backwards: what would have to be true — in users, revenue, and value actually reaching holders — for that number to be reasonable? Write the required figures out. Then compare them to something real: the revenue of a known company of similar valuation, or the total revenue of the sector. Write down whether the required assumptions are plausible and how confident you are.",
          },
        },
        {
          title: "Comparative analysis without fooling yourself",
          type: "TEXT",
          points: 10,
          body: `Comparison is the most-used technique in this field, and it is usually applied in a way that guarantees the conclusion the analyst wanted.

## The common error

Find a project with a higher valuation, note that yours does something similar, and conclude yours should rise to meet it.

This assumes the comparison is correctly valued. In a market where nothing is anchored to cash flows, that assumption is unfounded — you may simply have found two mispriced things.

## Doing it more honestly

Compare on measurable quantities rather than narratives. Revenue, users, transactions, total value held, and — critically — value actually reaching holders.

Compare ratios rather than absolutes. Fully diluted valuation divided by annual revenue is comparable across projects in a way that valuation alone is not.

Compare like with like. Two lending protocols are comparable; a lending protocol and a network are not, however similar the valuations.

Use a range rather than a single reference point. One comparison is an anecdote; a set of eight tells you where something sits in a distribution.

## What comparison can honestly tell you

Where something sits relative to peers on measurable metrics. That is genuinely useful and it is the limit of what it establishes.

It cannot tell you that the peer group is correctly priced, and it cannot tell you the gap will close.

## The gap that does not close

An asset can trade at a lower multiple than peers for years, correctly, because of something you have not identified — worse token economics, a supply overhang, weaker retention, or a market that has noticed something you have not.

"Cheap relative to peers" is a starting question, not a conclusion. The next question is why, and if you cannot answer it, you have not finished.

## Adjusting for supply

A frequent error: comparing market capitalisations while ignoring fully diluted valuation. A token with most of its supply outstanding is not comparable to one with 20% circulating, and comparing them on market capitalisation makes the second look cheap when it is not.

Always compare on fully diluted valuation, or state clearly why not.

## The honest use

Build the peer set, compute the ratios on measurable quantities, note where your subject sits, and then explain the position rather than assuming it is an error.

Most of the time the market has a reason. Finding it is the analysis; assuming its absence is not.`,
          activity: {
            title: "Build a real peer set",
            prompt:
              "Pick a token and assemble a peer set of at least five genuinely comparable projects — same category, same function. For each, find fully diluted valuation and annual revenue, and compute the ratio. Rank them. Note where your subject sits. Then, and this is the actual exercise, write down at least two specific reasons the market might rate it where it does. If you cannot find any, write that down too and treat it as unfinished work.",
          },
        },
        {
          title: "Narrative, reflexivity and the honest role of stories",
          type: "TEXT",
          points: 10,
          body: `Prices in this market are driven substantially by narrative. Pretending otherwise produces analysis that is correct and useless.

## What a narrative does

A story about why something matters attracts attention, attention attracts capital, and capital moves price. Rising price validates the story, attracting more attention.

This is reflexive: the belief changes the thing believed in. It is not irrational, and it is not sustainable indefinitely.

## Why fundamentals lag

A project with excellent economics and no narrative can be ignored for years. One with a compelling story and no economics can rise a very long way.

Over long periods, the gap tends to close — but "tends to" and "eventually" are doing enormous work, and eventually can outlast a position.

## Being honest about which you are trading

If you buy on narrative, know that. Your exit depends on attention persisting, and attention is fickle. Size and time horizon should reflect that.

If you buy on economics, know that too. You may be early by a long time, and your thesis needs a duration you can actually sustain.

The failure is buying on narrative while believing you bought on fundamentals — which produces holding through a collapse that the fundamentals never supported, because you have attributed your position to reasoning it never had.

## Reading a narrative honestly

Is it new, or a repackaging of something from a previous cycle? Most are repackagings.

Is there anything underneath it — real usage, real revenue — or only expectation?

Who benefits from it spreading? Narratives are frequently promoted by people holding early positions.

How crowded is it? A narrative everyone has heard is one where the buying has largely happened.

## What this course can do about it

Not predict narratives. Nobody does that reliably.

What it can do is tell you what is underneath one, so that when the attention leaves — and it does — you know whether anything remains. That is the difference between a drawdown you can hold through and one you should not.

## The practical instruction

For every position, write one sentence: I own this because of X. If X is a story, say so. If X is a mechanism, name the mechanism.

Then, when price falls 60%, read the sentence. If X is still true, the fall is noise. If X was a story and the story has moved on, the fall is information.

That single sentence is the most useful thing you can write about a holding.`,
          activity: {
            title: "Write the sentence for every holding",
            prompt:
              "For every token you hold, write one sentence: I own this because of X. Be precise, and be honest about whether X is a mechanism or a story — both are legitimate, but they demand different sizing and different time horizons. Then, for each, write what would have to happen for X to stop being true. Keep this list. It is what you will read the next time something falls sharply.",
          },
        },
        {
          title: "The failures worth studying",
          type: "TEXT",
          points: 10,
          body: `Specific patterns that have destroyed value repeatedly, each of which was visible in advance to anyone who read the supply and distribution.

## The high fully diluted valuation, low float launch

A token launches with a small percentage circulating and a very high fully diluted valuation. Scarcity supports the price. Then the unlocks arrive and supply multiplies into the same demand.

Visible in advance from the allocation table and the vesting schedule. This structure has produced a long series of declines from launch, and it remains common because it works for the people designing it.

## The incentive-driven growth story

A protocol pays users in its own token. Usage rises, metrics look excellent, valuation follows. Emissions reduce, users leave, metrics collapse.

Visible in advance by asking what fraction of usage is paid for.

## The circular reserve

An ecosystem where the primary backing for a token is another token from the same ecosystem. Both are supported by the same confidence, so both fail together and quickly.

Visible in advance by tracing what actually backs the value and noticing it is a token whose value depends on the first.

## The governance token over an undistributed treasury

The project earns real revenue, holders receive nothing, and the token trades on the expectation that governance will one day distribute. It does not.

Visible in advance by tracing the fee destination and finding that no mechanism exists.

## The concentrated float

A token with a small free float, most of it held by a handful of addresses. Price is easily supported and easily abandoned. When the large holders distribute, there is no depth to absorb it.

Visible in advance from the holders page in ten minutes.

## The common thread

Every one of these was public. The allocation was in the documentation, the schedule was published, the holders were on chain, the fee destination was traceable.

The information was not hidden. It was simply not read, because reading it takes twenty minutes and buying takes one.

## What this means for you

Most of the losses this course can prevent are of this kind: avoidable, documented, and lost to impatience rather than to bad luck.

The twenty minutes is the entire product.`,
          activity: {
            title: "Diagnose a real failure",
            prompt:
              "Find a token that fell heavily from its launch or peak in the last two years. Work backwards through this lesson's patterns and identify which applied. Then find the specific public evidence that was available beforehand — the allocation table, the vesting schedule, the holders page, the fee destination. Write down what was knowable and when. Then write down whether you would have caught it with the checks from this course.",
          },
        },
        {
          title: "Assignment: a valuation you can defend",
          type: "ASSIGNMENT",
          points: 25,
          body: `The second graded piece. It asks for an honest valuation attempt — including, where it is the truth, the conclusion that nothing can be established.

Concluding that a token cannot be valued, properly argued, scores full marks.`,
          assignment: {
            title: "Valuation attempt with stated limits",
            instructions: `Attempt to value one token honestly. 700 to 1,000 words.

**1. Value accrual.** Trace the specific mechanism by which protocol economics reach a holder who does nothing but hold. If none exists, say so — this determines everything that follows.

**2. If accrual exists:** estimate the annual value reaching holders, state your assumptions, and produce a range rather than a figure. State what would make your estimate wrong.

**3. If accrual does not exist:** state plainly that a cash-flow-based valuation is not possible, and say what the price therefore depends on.

**4. Required assumptions.** Work backwards from the current fully diluted valuation: what adoption, revenue and capture would have to be true to justify it? Compare those figures against something real. State whether they are plausible.

**5. Comparative analysis.** A peer set of at least five genuinely comparable projects, compared on fully diluted valuation against a measurable quantity. Where your subject sits, and at least two specific reasons the market may rate it there.

**6. Narrative.** What story currently supports this, whether it is new or a repackaging, who benefits from it spreading, and how crowded it is.

**7. The one sentence.** I would own this because of X — with X named precisely and identified as a mechanism or a story.

**8. Invalidation.** What specifically would tell you the thesis was wrong. Not a price — an observable fact about supply, distribution, revenue or usage.

No target price. If you find yourself producing one, reread lesson one of this module.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Value accrual is traced or its absence stated plainly",
                weight: 25,
                descriptor:
                  "A specific mechanism identified, or a clear statement that none exists with the consequence drawn. Full marks state what the price therefore rests on.",
              },
              {
                criterion: "Required assumptions are computed and tested",
                weight: 25,
                descriptor:
                  "Backward working from the current valuation to the adoption and revenue implied, compared against a real reference, with a plausibility judgement.",
              },
              {
                criterion: "Comparative work uses fully diluted valuation and explains the position",
                weight: 20,
                descriptor:
                  "At least five genuine peers on a measurable ratio, with two specific reasons for the subject's position. Assuming a gap is an error scores low.",
              },
              {
                criterion: "Narrative is identified honestly",
                weight: 15,
                descriptor:
                  "The current story named, its novelty assessed, beneficiaries identified and crowding judged.",
              },
              {
                criterion: "Thesis and invalidation are precise",
                weight: 15,
                descriptor:
                  "One sentence with X named and classified as mechanism or story, plus an observable non-price invalidation.",
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Categories and their economics",
      description:
        "Different kinds of token have different value questions. Applying one framework to all of them produces confident nonsense.",
      lessons: [
        {
          title: "Networks: fees, security and the honest case",
          type: "TEXT",
          points: 10,
          body: `The native asset of a blockchain has the clearest economic story available in this field, and it is still weaker than most holders assume.

## What the asset does

Pays transaction fees. Every use of the network requires acquiring it, which creates continuous demand from actual usage rather than from speculation.

Secures the network. Validators stake it, and the value at stake is what makes attacking the network expensive. The asset's price is therefore part of the security model.

## The genuine strength

Fee demand is real, non-substitutable and grows with usage. This clears the substitution test properly: replace the token with a stablecoin and the security model breaks.

That is a stronger case than almost anything else in crypto, and it is why network assets dominate the market by value.

## The honest weaknesses

Fee revenue is usually small relative to valuation. Networks trade at multiples of revenue that would be extraordinary anywhere else, and the gap is filled by expectation.

Issuance frequently exceeds fees. If a network pays validators more in new supply than it collects in fees, it is net inflationary and holders are diluted despite genuine usage.

Fees fall as capacity rises. Improvements that make a network cheaper to use reduce the revenue per transaction, and volume must grow faster than price per transaction falls.

Competition is severe and switching is easy. Users move to cheaper networks quickly, so a fee moat is not durable.

## What to establish

Annual fee revenue, and issuance to validators. Net position: is the asset inflationary or deflationary at current usage?

The multiple of fully diluted valuation to annual fees. Compare across networks; the spread is instructive.

Whether fee revenue is growing faster than issuance.

What fraction of usage is genuine rather than incentivised or self-referential.

## The security question

Security spending — what validators are paid — has to come from somewhere. Fees, or issuance, or both.

A network whose security is paid for almost entirely by issuance has an unresolved long-term question: what happens when issuance declines? Either fees rise to replace it, or security falls.

That question is legitimate, it is unresolved for several major networks, and anyone who tells you it is settled is not being careful.

## The honest summary

Network assets have the best value case in crypto and it is still substantially an expectation about future usage rather than a claim on current economics. Own them knowing that.`,
          activity: {
            title: "Compare three networks on fees",
            prompt:
              "Take three networks. For each, find annual fee revenue and annual issuance to validators, and calculate the net position — inflationary or deflationary. Then compute fully diluted valuation divided by annual fees for each and rank them. Write down which looks most expensive on that measure and at least one reason the market might rate it there. Finally, note for each whether security is currently paid mostly by fees or mostly by issuance.",
          },
        },
        {
          title: "Applications: revenue, moats and the accrual gap",
          type: "TEXT",
          points: 10,
          body: `Protocols built on top of networks — exchanges, lenders, derivatives platforms — generate real revenue, which makes them look most like businesses. The gap between that revenue and their token is where the analysis lives.

## Why they look analysable

They have users, volume, fees and revenue. Everything a normal analyst wants is present and measurable on chain.

## The accrual gap

Almost all of that revenue goes to the people supplying the service — liquidity providers, lenders — rather than to token holders.

So you can build a beautiful revenue model and then discover the token has no claim on any of it. The protocol is a business; the token is frequently not a share in it.

This is the single most important check in this category and it is skipped constantly, because the revenue figures are so satisfying to analyse.

## Moats, and their absence

Most protocols are open source and can be copied in weeks. A competitor can launch the same product with better incentives, and users move because switching costs are near zero.

What durable advantage exists usually comes from liquidity depth — deeper markets give better execution, which attracts more users — and from integrations that make a protocol infrastructure for others.

Brand and trust matter more than people expect, particularly after any incident. A protocol that has held large value for years without an exploit has something a new competitor cannot buy.

## The mercenary user problem

Users attracted by incentives leave when the incentives do. Retention after emissions reduce is the honest measure of a protocol's product.

If a protocol has never reduced emissions, you do not know whether it has users or customers of its own subsidy.

## What to establish

Annual revenue, and the share reaching token holders. State both.

Retention through any past emission reduction.

Concentration: what share of volume comes from the top handful of users. High concentration means the business is a few relationships.

Whether the protocol is a dependency for others, which is the strongest form of moat available here.

## The realistic case

A small number of application tokens have genuine revenue accrual and defensible positions. They can be analysed in something close to a normal way, and this is the category where the valuation module's methods actually apply.

For the rest, the revenue is real and belongs to somebody else.`,
          activity: {
            title: "Separate the business from the token",
            prompt:
              "Pick one application protocol with real revenue. Write two separate assessments. First, the business: annual revenue, growth, user concentration, and whether it retained users through any emission reduction. Second, the token: what share of that revenue reaches a holder who does nothing. Then write one sentence on whether a good business assessment tells you anything at all about the token, given what you found.",
          },
        },
        {
          title: "Memecoins, and being honest about them",
          type: "TEXT",
          points: 10,
          body: `A category with no pretence of economics, which makes it easier to analyse honestly than tokens that pretend.

## What they are

Tokens with no utility, no revenue, no mechanism and usually no roadmap. Value comes entirely from attention and the expectation that others will buy.

## Why the honesty helps

There is no story to see through. Nobody claims a memecoin has cash flows, so nobody is misled about the basis.

A holder of a memecoin knows they are relying on other buyers. A holder of a governance token over an undistributed treasury frequently does not, and is in substantially the same position.

That comparison is the useful part of this lesson. Many tokens with elaborate documentation have exactly the same economic basis as a memecoin, dressed differently.

## What can still be analysed

Supply and distribution apply exactly as elsewhere. A memecoin where the deployer holds 40% is a different proposition from one distributed widely, and the holders page tells you which in ten minutes.

Liquidity applies. Many are thin enough that exiting a modest position moves the price substantially.

The specific frauds are checkable: contracts that let the deployer mint more, that block selling, or that take a large fee on transactions. These are readable in the contract and there are tools that check for them.

Locked liquidity is checkable. Unlocked liquidity means it can be removed, which ends the market instantly.

## What cannot be analysed

Whether attention will persist. Nobody knows, and it is the entire variable.

## The honest position

This is a category where the expected value for a typical participant is strongly negative, because the distribution is a small number of very large winners against a large number of total losses, and the early holders are positioned before anyone else can be.

If you participate, do it with money designated for loss, at a size that changes nothing, and with the checks above run first — those at least remove the outright frauds.

## The comparison worth keeping

The point of including this category is not to endorse it. It is that once you can see a memecoin clearly, you can recognise the same structure wearing better clothes — and that recognition is the more valuable skill.`,
          activity: {
            title: "Find the same structure in a serious token",
            prompt:
              "Take one memecoin and run the checks: deployer holdings, liquidity locked or not, contract permissions, and exit slippage on a small position. Write what you found. Then take one token with full documentation and a professional presentation, and answer the three-part question for it. Write down honestly whether its economic basis is different from the memecoin's, or only better presented.",
          },
        },
        {
          title: "Tokenised real-world assets and where the risk sits",
          type: "TEXT",
          points: 10,
          body: `Tokens representing claims on things outside the blockchain — debt, property, commodities, funds. The economics are clearer than most crypto and the risk moves somewhere the chain cannot see.

## What they are

A token whose value derives from an off-chain asset held by an identifiable party. Tokenised government debt is the most developed example.

## Why the value question is easier

There is an underlying asset with a knowable value and often a yield. The valuation question that most crypto cannot answer has an answer here.

## Where the risk actually is

Off chain, entirely. The token is a claim, and a claim is only as good as the party honouring it.

Custody: who holds the actual asset, and are they solvent, regulated and audited?

Legal enforceability: does holding the token give you an enforceable right to the asset, in a jurisdiction, or does it give you a position in a queue behind other creditors?

Redemption: can you actually exchange the token for the asset or its value, and under what conditions? Redemption limited to large institutional holders means an individual relies on the market rather than on the claim.

## The chain tells you nothing about the important part

You can verify the token's supply and transfers perfectly and learn nothing about whether the treasury bills exist. Every technique in this course applies to the token and none of it applies to the risk.

That inversion is the thing to understand. For most crypto, the risk is on chain and verifiable. Here it is off chain and requires trusting an institution.

## What to establish

Who holds the underlying, and their regulatory standing. Whether an independent auditor attests to it, how often, and whether the attestation covers liabilities as well as assets. What legal right the token confers and under which jurisdiction. Who can redeem, and on what terms.

## The honest assessment

These instruments can be genuinely useful, particularly for accessing dollar yield from places where that is otherwise difficult. The yields are real and the mechanism is comprehensible.

They also reintroduce exactly the counterparty risk that self-custody was meant to remove, and they do it in a form that looks like a token — which makes it easy to forget.

Judge them as you would judge the institution, because that is what you are actually holding.`,
          activity: {
            title: "Assess the institution, not the token",
            prompt:
              "Find one tokenised real-world asset product. Then write an assessment that ignores the token entirely and evaluates the arrangement behind it: who holds the underlying, their regulatory standing, who audits and how often, what legal right you would hold and where, and who can redeem on what terms. Write down which of those you could not establish. Then state whether you would hold it, judged as you would judge that institution.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on categories. The theme is that the right question differs by category, and applying one framework to all of them is how confident, wrong analysis gets produced.`,
          quiz: {
            title: "Categories and their questions",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "What is the unresolved long-term question for most network assets?",
                explanation:
                  "Whether fees will rise to replace declining issuance in paying for security. Security spending must come from fees or issuance; if issuance falls and fees do not rise, security falls. This is unsettled for several major networks.",
                options: [
                  {
                    text: "Whether fee revenue will replace declining issuance in paying for security",
                    correct: true,
                  },
                  { text: "Whether the code will remain open source", correct: false },
                  { text: "Whether validators will remain decentralised", correct: false },
                  { text: "Whether transaction speeds can improve further", correct: false },
                ],
              },
              {
                prompt: "You build a strong revenue model for an application protocol. What must you check next?",
                explanation:
                  "What share of that revenue reaches token holders. Almost all protocol revenue goes to liquidity providers and lenders — the protocol is a business, and the token is frequently not a share in it. The revenue model can be perfect and irrelevant.",
                options: [
                  {
                    text: "What share of the revenue actually reaches token holders",
                    correct: true,
                  },
                  { text: "Whether the revenue is growing", correct: false },
                  { text: "How the revenue compares to competitors", correct: false },
                  { text: "Whether the protocol is audited", correct: false },
                ],
              },
              {
                prompt: "Why does this course include memecoins at all?",
                explanation:
                  "Because once you can see a memecoin clearly — no utility, value entirely from attention — you can recognise the same economic structure in tokens with elaborate documentation. Many governance tokens over undistributed treasuries are in substantially the same position, better dressed.",
                options: [
                  {
                    text: "So you recognise the same structure when it appears in a token with better presentation",
                    correct: true,
                  },
                  { text: "Because they are a reliable way to make money", correct: false },
                  { text: "Because they have unusual supply mechanics", correct: false },
                  { text: "Because they generate protocol revenue", correct: false },
                ],
              },
              {
                prompt: "Where does the risk sit in a tokenised real-world asset?",
                explanation:
                  "Off chain, with the institution holding the underlying. Every on-chain verification technique applies to the token and none of it tells you whether the underlying exists — which inverts the usual situation, where risk is on chain and verifiable.",
                options: [
                  {
                    text: "Off chain with the custodian, where no on-chain analysis can reach it",
                    correct: true,
                  },
                  { text: "In the smart contract holding the token", correct: false },
                  { text: "In the liquidity pool depth", correct: false },
                  { text: "In the token's supply schedule", correct: false },
                ],
              },
              {
                prompt: "What is the honest test of an application protocol's product?",
                explanation:
                  "Retention through an emission reduction. Users attracted by incentives leave when incentives stop. A protocol that has never reduced emissions has not demonstrated whether it has users or subscribers to its own subsidy.",
                options: [
                  { text: "Whether users stayed when emissions were reduced", correct: true },
                  { text: "Total value held in the protocol", correct: false },
                  { text: "Number of integrations announced", correct: false },
                  { text: "Growth in monthly volume", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Risks the token page does not show",
      description:
        "Contract, team, regulatory and dependency risk. The ways a correct thesis on supply and revenue still ends at zero.",
      lessons: [
        {
          title: "Smart contract risk, assessed practically",
          type: "TEXT",
          points: 10,
          body: `Your analysis can be perfect and the contract can be drained on a Tuesday. This risk is not reducible to zero and it is assessable.

## What can go wrong

Logic flaws that allow value to be extracted. Access control errors that let someone with the wrong key do something they should not. Upgrade mechanisms that let a party change the rules. Dependencies on other contracts that fail.

## Audits, and what they mean

An audit is a review by a firm over a period, of a specific version. It is evidence of care and it is not a guarantee — audited protocols have been exploited many times.

Read the audit rather than noting its existence. Which firm, when, which version, what did they find, and were the findings fixed? An audit of a version from eighteen months and forty commits ago tells you little.

Multiple audits from reputable firms, with published reports and fixed findings, are meaningfully better than one audit mentioned in a blog post.

## Time and value as evidence

A contract holding large value for years without incident is meaningful evidence. It has been a target and has survived.

This is the most reliable signal available to a non-technical reader, and it is why new protocols with attractive yields deserve more suspicion, not less — nobody has had time to attack them properly.

## Upgradeability

Check whether the contract can be changed, and by whom. An upgradeable contract means the rules you analysed can be replaced.

If a single key can upgrade it, that key is the risk, whatever the code says. Multi-signature control with a timelock — a delay before changes take effect — is much better, because it gives holders time to exit.

## Bug bounties

A large, active bounty is evidence of confidence and creates an incentive for researchers to report rather than exploit. A protocol holding a billion with a small bounty has miscalculated.

## Dependency risk

Protocols build on other protocols. A failure in a dependency propagates. Map what your protocol depends on — oracles, other protocols, bridges — because your risk includes theirs.

Oracle risk deserves specific mention: a protocol relying on a price feed can be exploited by manipulating the feed, and this has been done repeatedly for very large sums.

## The practical assessment

How long has it held significant value. How many audits, by whom, how recent, findings fixed. Is it upgradeable and by whom, with what delay. What does it depend on. How large is the bounty.

Five questions, answerable in half an hour, and they separate most of the survivable from most of the not.`,
          activity: {
            title: "Run the five questions",
            prompt:
              "Take one protocol you use or hold a token in. Answer the five questions with evidence: time holding significant value, audits with firm and date and whether findings were fixed, upgradeability and who controls it and with what delay, its dependencies including oracles, and the size of its bug bounty. Write down which answers you could not find. Then state what maximum share of your holdings you would put at risk in it.",
          },
        },
        {
          title: "Team, governance capture and the human failure",
          type: "TEXT",
          points: 10,
          body: `Code fails less often than people do. The human risks are harder to assess and account for a large share of total losses.

## Abandonment

The most common failure, and the least dramatic. The team stops working. No announcement, no exit — commits slow, the forum goes quiet, questions go unanswered.

The token continues to trade for a long time afterwards, which is how holders miss it.

Checkable: commit frequency in public repositories, forum and announcement activity, whether recent roadmap items shipped.

## Exit

The team sells its allocation and moves on. Sometimes disclosed, often not.

Checkable on chain, as covered in module two. Watch the addresses.

## Governance capture

A party accumulates enough voting power to direct the treasury or the parameters to their own benefit. Legal, and it happens.

Checkable: voting power concentration and whether any recent proposals benefited a specific large holder disproportionately.

## Key control

Where a small number of keys can upgrade contracts or move treasury funds, those keyholders are the protocol. A decentralised protocol with three keys controlling it is a company with extra steps.

Checkable: multi-signature configuration, number of signers, and whether a timelock exists.

## Founder concentration

A project depending on one person is fragile in every direction — they can leave, be arrested, become unwell, or simply lose interest.

## Legal exposure

Founders in jurisdictions with active enforcement, or with a history of previous ventures that ended badly, are a real risk to a project's continuity. This is checkable and rarely checked.

## What to do with all this

You cannot eliminate human risk. You can notice the signals: development slowing, treasury converting, insiders selling, governance concentrating, announcements becoming vaguer.

Set a review cadence. Once a quarter, check commits, treasury, insider addresses and governance for anything you hold.

## The honest note

The most common way people lose money to team failure is not fraud. It is holding something for two years after the team quietly stopped working on it — because nobody announces that, and the price takes a long time to admit it.

The quarterly check is the entire defence.`,
          activity: {
            title: "Run a quarterly team check now",
            prompt:
              "For one token you hold, check four things and write what you found: commit activity in the public repository over the last three months against the three before it, the last substantive announcement and its date, treasury and insider address movements, and the concentration of voting power in recent proposals. Then write your verdict: active, slowing, or effectively abandoned. Set a calendar reminder to repeat this in three months.",
          },
        },
        {
          title: "Regulatory risk, without pretending to give legal advice",
          type: "TEXT",
          points: 10,
          body: `Rules change, and they change what a token is allowed to be. This course cannot tell you the law where you live, and it can tell you what to watch.

## The main exposures

Classification. If a token is determined to be a regulated security in a major jurisdiction, exchanges may delist it, access may be restricted, and the project may face enforcement. This has happened to substantial tokens.

Exchange access. Your ability to buy or sell depends on venues serving you. Both can change.

Project location. A team in a jurisdiction that becomes hostile faces problems that reach the token regardless of its technical merits.

Specific product rules. Lending, staking-as-a-service, derivatives and stablecoins have each attracted specific attention in various places, sometimes resulting in products being withdrawn.

## What raises classification risk

A token sold to the public in a fundraising, with promises about future work by a central team, where holders expect profit from that team's efforts. That description is roughly the test used in several jurisdictions.

Tokens distributed without a sale, without a central promoter, and with genuine functional use, sit further from it.

This is a heuristic and not legal advice, and the honest position is that these questions are contested and evolving.

## What to actually watch

Whether major exchanges in well-regulated jurisdictions list the token. Their legal departments have views and their behaviour is informative.

Whether the project is engaging with regulators or avoiding them.

Whether the team is identifiable and located somewhere with a functioning legal system.

Whether the distribution involved a public sale with promises.

## The practical response

Do not concentrate in things with obvious classification risk.

Prefer venues that comply with rules where you live, because that reduces the chance of losing access.

Keep records, so that whatever the eventual treatment, you can comply with it.

Accept that this risk cannot be analysed away. It can be diversified against and it cannot be eliminated.

## The one thing worth doing today

Find out, from your own regulator's website, what the position is where you live on holding and trading crypto. Not from a group chat, and not from a course written elsewhere. The answer varies enormously and it is the input to everything else here.`,
          activity: {
            title: "Establish your own position",
            prompt:
              "Go to your own country's financial regulator and central bank websites and find their stated position on crypto holding, trading and any specific products. Write down what you found with the source. Then, for your two largest holdings, assess classification risk against the heuristic in this lesson: was there a public sale, is there a central promoting team, do holders expect profit from that team's work? Write your conclusion and how it affects your sizing.",
          },
        },
        {
          title: "Concentration and the correlation you already own",
          type: "TEXT",
          points: 10,
          body: `A portfolio of twelve tokens frequently contains one or two real positions. Understanding what you actually own is the last analytical step.

## The correlation problem

Most crypto assets move together, and correlation rises during stress. Twelve tokens in a falling market is one position twelve times.

Diversification within crypto reduces project-specific risk — the exploit, the team quitting, the unlock. It does very little against market risk, which is the larger source of drawdown.

## The hidden common exposures

Several tokens on the same network share that network's risk.

Several protocols depending on the same oracle, the same bridge, or the same stablecoin share those dependencies entirely.

Several positions on the same venue share its counterparty risk.

Map these. People are frequently surprised by how much of a diversified-looking portfolio depends on three or four things.

## Position sizing against uncertainty

The valuation module established that most crypto assets cannot be valued. That has a direct sizing implication: when you cannot establish a value, you cannot know how wrong the price is, so size for the possibility of total loss.

A useful rule: size each position so that its going to zero is annoying rather than damaging. If that produces uncomfortably small positions, that discomfort is accurate information about the asset class.

## Concentration where you have an edge

The opposite error is over-diversifying into things you have not researched. Twenty positions means twenty theses to maintain and twenty quarterly checks, which nobody does.

Better: a small number you have genuinely researched and can monitor, sized so that any one failing is survivable.

The number of positions should be bounded by how many theses you can actually keep current.

## Rebalancing

Winners grow into oversized positions. Rebalancing back to target sizes is unglamorous and mechanically sound — it sells strength and buys weakness, which is emotionally difficult and arithmetically sensible.

Set thresholds in advance so it is a rule rather than a judgement.

## The honest allocation question

Before any of this: what share of your total net worth belongs in an asset class where most assets cannot be valued, drawdowns of 80% are normal, and the regulatory position is unsettled?

That number is personal and for most people it is smaller than what they currently hold. Deciding it deliberately, in writing, is the single most consequential decision in this course.`,
          activity: {
            title: "Map what you actually own",
            prompt:
              "List every crypto position with its size as a percentage of your crypto holdings, and of your total net worth. Then group them by shared exposure: same network, same oracle, same bridge, same stablecoin, same venue. Write down how many genuinely independent positions you have — it will be fewer than the count. Then write your target allocation to crypto as a share of net worth, and the gap between that and where you are.",
          },
        },
        {
          title: "Assignment: a full risk assessment",
          type: "ASSIGNMENT",
          points: 25,
          body: `The third graded piece. It covers everything that can take your money while your supply and revenue analysis is entirely correct.`,
          assignment: {
            title: "Risk assessment beyond the token",
            instructions: `Assess the non-economic risks of one holding, and then of your portfolio. 700 to 1,000 words, evidenced.

**1. Contract risk.** The five questions: time holding significant value, audits with firm and date and whether findings were fixed, upgradeability and who controls it with what delay, dependencies including oracles, and bug bounty size. State what you could not establish.

**2. Team risk.** Commit activity over the last three months against the three before, last substantive announcement, insider and treasury movements, and governance concentration. Your verdict: active, slowing, or abandoned.

**3. Regulatory risk.** Your own regulator's stated position, sourced. Classification risk assessed against the heuristic — public sale, central promoting team, profit expectation from that team's work. Which venues serving you list it.

**4. Portfolio correlation.** Every position grouped by shared exposure: network, oracle, bridge, stablecoin, venue. State how many genuinely independent positions you have against how many you hold.

**5. Sizing.** Each position sized so that its going to zero is annoying rather than damaging — state whether that is currently true. Your target crypto allocation as a share of net worth and your current gap.

**6. The correlated crash.** Everything falls 80% together, one protocol you hold is exploited, and one team goes quiet, in the same quarter. Walk through what that does to you financially and whether it is survivable.

**7. What you are changing.** Specific positions, amounts and dates. If nothing, justify it against your own numbers in sections five and six.

No credentials, keys, addresses you would rather not share, or account identifiers.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Contract risk assessed with evidence",
                weight: 20,
                descriptor:
                  "All five questions answered from sources, with unfound answers stated. Full marks read the audits rather than noting their existence.",
              },
              {
                criterion: "Team activity is measured, not assumed",
                weight: 20,
                descriptor:
                  "Real commit and announcement data compared across periods, with insider and governance checks and a stated verdict.",
              },
              {
                criterion: "Regulatory position sourced from the regulator",
                weight: 15,
                descriptor:
                  "The writer's own jurisdiction from a primary source, plus classification risk assessed against the stated heuristic.",
              },
              {
                criterion: "Correlation is mapped to real independence",
                weight: 20,
                descriptor:
                  "Positions grouped by shared network, oracle, bridge, stablecoin and venue, with the count of genuinely independent positions stated against the nominal count.",
              },
              {
                criterion: "Sizing is tested against total loss",
                weight: 15,
                descriptor:
                  "Each position checked against the annoying-not-damaging standard, with a stated target net-worth allocation and the current gap.",
              },
              {
                criterion: "The compound scenario is worked through",
                weight: 10,
                descriptor:
                  "A concrete financial outcome for the writer with a survivability judgement. Concluding it would be fine scores zero unless the exposure is genuinely trivial.",
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Selling",
      description:
        "The half of investing nobody teaches. When a thesis has played out, when it has broken, and how to decide before you need to.",
      lessons: [
        {
          title: "Why selling is harder than buying",
          type: "TEXT",
          points: 10,
          body: `Everything written about crypto is about what to buy. Almost nothing is about when to stop owning it, which is where most of the returns are actually decided.

## The asymmetry in attention

Buying is optional and pleasant. You choose the moment, you are excited, and the decision feels like progress.

Selling is uncomfortable in both directions. Selling into strength means watching it continue without you. Selling into weakness means realising a loss and admitting an error.

So people research buying extensively and improvise selling, which is the wrong way round given that the sale determines the result.

## The specific traps

Anchoring to the price you paid. The market does not know your cost basis and it is irrelevant to whether the asset is worth holding now. "I will sell when I get back to even" is a decision made by a number that exists only in your account history.

Anchoring to the peak. Having seen a position at a higher value, every lower value feels like a loss, and people hold waiting for a return to a number that was never realised.

Identity. Holding something long enough makes it part of how you see yourself. Selling then feels like abandoning a position you have defended publicly, and people defend positions long past the evidence.

Round numbers. Waiting for a psychologically satisfying figure that has no relationship to anything.

## The two legitimate reasons to sell

The thesis has played out. What you expected to happen has happened, and the reason for owning it no longer applies.

The thesis has broken. Something you said would have to be true is no longer true.

Notice that neither is a price. Price is how you measure the result; it is not the reason.

## The one illegitimate reason

Because it fell. A fall with the thesis intact is noise, and selling into it converts a temporary drawdown into a permanent loss.

This is why the written thesis from the previous module matters so much. When something falls 60%, you read the sentence. If X is still true, you hold. If X was a story and the story is gone, you sell.

Without the sentence, you decide with adrenaline.

## The instruction

Decide your exit conditions when you buy, in writing, as observable events rather than prices. The decision made calmly is the only one worth having.

Everything in the rest of this module is how to make that decision well.`,
          activity: {
            title: "Find your own anchor",
            prompt:
              "For every position you hold, write down three numbers: what you paid, the highest value you have seen it at, and its current value. Then answer honestly for each: which of those three numbers is influencing your decision to keep holding? If the answer is the first or the second for any position, write down that you are anchored, and write what the actual thesis-based reason to hold would be — or admit there is not one.",
          },
        },
        {
          title: "Selling into strength",
          type: "TEXT",
          points: 10,
          body: `The harder of the two sells, because everything feels good and the reasons to hold are loud.

## Why it is hard

The position is working. Recent evidence says you were right. Selling feels like a lack of conviction, and everyone around you is confident.

And you may be wrong to sell — some positions keep going a very long way. That genuine uncertainty is what makes it difficult rather than merely unpleasant.

## Scaling out

The practical answer for most people. Sell portions at intervals rather than attempting to identify a peak.

This guarantees you neither sell everything too early nor hold everything too long. It produces an average rather than an outcome, and averages are what you can actually achieve.

Set the levels in advance — either at price multiples, or at portfolio-weight thresholds — so the decision is a rule rather than a judgement made while excited.

## Rebalancing as an exit mechanism

If a position grows from 5% of your portfolio to 25%, selling back to 10% is not a call on the asset. It is a decision about concentration, and it is defensible regardless of what happens next.

This is the most psychologically sustainable form of selling into strength, because it is not a prediction. You are not saying it will fall; you are saying you do not want a quarter of everything in one thing.

## Selling into narrative peaks

When a story is everywhere — mainstream coverage, people who never discuss it asking about it, extreme funding rates, unusually high valuations relative to peers — the buying has largely happened.

This is not a timing signal and it can persist. It is a reason to be scaling out rather than adding.

## Taking out the original stake

Selling enough to recover what you put in, then holding the rest. Emotionally powerful and mathematically arbitrary — there is nothing special about your cost basis.

It is included because it is genuinely useful for people who would otherwise never sell anything. A rule you will follow beats an optimal rule you will not.

## The regret question

The useful test: which would I regret more — selling and watching it triple, or holding and watching it fall 80%?

Both happen. Answering honestly tells you which mistake you are built to survive, and you should size and scale accordingly rather than pretending you are neutral.

## The habit

Write your scale-out levels when you buy. Then it is arithmetic rather than a decision made in the middle of the best week of your year.`,
          activity: {
            title: "Set scale-out levels now",
            prompt:
              "For each position you hold, write scale-out rules in advance: either price multiples at which you sell a stated fraction, or a portfolio weight above which you rebalance back to a target. Use real numbers. Then answer the regret question honestly for each — selling early or holding through a collapse — and note whether your rules match the answer. Most people find their rules are more aggressive than their temperament.",
          },
        },
        {
          title: "Selling into weakness",
          type: "TEXT",
          points: 10,
          body: `The sell that saves you, and the one people most often get backwards — holding what has broken and selling what has merely fallen.

## The distinction that matters

Has the thesis broken, or has the price fallen? These feel identical and are entirely different.

A price fall with the thesis intact is an opportunity or noise. A thesis break with the price flat is a reason to sell immediately.

The written thesis is what lets you tell them apart, and it is why the previous module insisted on observable, non-price invalidations.

## What a genuine break looks like

Revenue declining for consecutive periods with no explanation.

Usage collapsing after incentives reduced — which is the answer to the question you asked at the outset.

The team stopping work: commits slowing, announcements ceasing, roadmap items missed with no acknowledgement.

Insiders selling substantially beyond a disclosed schedule.

A promised mechanism not delivered by a stated date.

A dependency failing — the oracle, the bridge, the stablecoin your thesis rested on.

Each of these is observable and none of them is a price.

## Acting on a break

Immediately, and completely. A broken thesis is not a reason to reduce; it is a reason to be out.

The reflex is to sell half and see. That is usually the decision that keeps you in something you have already concluded is finished, and the remaining half tends to be sold much lower or not at all.

## The dead position

Distinct from a break and more common. Nothing dramatic has happened; the project has simply become irrelevant. Development slowed, attention moved, the token drifts down.

There is no moment that forces a decision, which is exactly why people hold these for years. They occupy attention and capital with no realistic path to mattering.

The quarterly review exists to catch these. If a position has not progressed against its thesis in a year and you would not buy it today, sell it.

## The would-I-buy-it-today test

The single most useful selling question. Ignore what you paid and what it was worth. If you had the cash and no position, would you buy this now at this price?

If no, you are holding out of inertia or anchoring. The answer is usually clear once the question is asked, and the whole difficulty is that people do not ask.

## The tax and cost note

Selling has costs and in some jurisdictions a tax consequence. Factor them, and do not let them become the excuse for holding something you have already concluded is finished. A tax bill on a smaller loss is cheaper than no tax bill on a total one.`,
          activity: {
            title: "Apply the buy-it-today test to everything",
            prompt:
              "Go through every position and ask: if I had the cash and no position, would I buy this today at this price? Answer yes or no for each, with one line of reasoning. For every no, write what is stopping you from selling — anchoring to cost, anchoring to the peak, identity, or a genuine reason. Then pick the clearest no and decide, in writing, what you will do about it and by when.",
          },
        },
        {
          title: "The review that catches everything",
          type: "TEXT",
          points: 10,
          body: `The mechanism that makes all of this work in practice: a scheduled review, run the same way every time, on everything you hold.

## Why it must be scheduled

Because the alternative is reviewing when something moves, which means reacting to price rather than to evidence.

A scheduled review examines dull positions too — and dull positions are where the dead ones hide.

## Quarterly is right

Frequent enough to catch deterioration before it is total. Infrequent enough that you are not reacting to noise, and that you will actually do it.

## The order

Read the original thesis first, before looking at the price. Price contaminates the assessment, and reading it first is how people talk themselves into whatever the price implies.

Then check the observable facts you said would matter: revenue, usage, commits, treasury, insiders, governance, dependencies.

Then ask whether the invalidation conditions have occurred.

Then apply the buy-it-today test.

Then — last — look at the price, to size and rebalance.

## The four outcomes

Thesis intact and progressing: hold, and consider whether the weight is right.

Thesis intact but slower than expected: hold, note it, and set a date by which it must show progress.

Thesis broken: sell.

Thesis irrelevant — the project is dead but nothing broke: sell.

## Updating the thesis in writing

If your view has changed, write the new one, dated, with what changed and why. Do not silently revise.

The most instructive document you will own after two years is a set of theses with their revisions, because it shows you whether you update on evidence or on price.

## The honest count

At each review, count how many positions you are holding for a reason you could state to someone else without embarrassment.

If the number is smaller than your position count, the difference is inertia, and inertia is expensive.

## Keeping it feasible

The review must be short enough that you do it. Fifteen minutes per position, quarterly, is realistic — which caps how many positions you can responsibly hold.

If you cannot review them all, you hold too many. That is the constraint, and it is a better guide to portfolio size than any diversification argument.`,
          activity: {
            title: "Run one full review today",
            prompt:
              "Pick your largest holding and run the complete review in order: read the thesis before looking at the price, check the observable facts, test the invalidation conditions, apply the buy-it-today test, then look at price for sizing. Write the outcome — intact, slow, broken or dead — and what you are doing. Then count how many positions you hold and multiply by fifteen minutes. If that number is more time than you will realistically spend quarterly, write down how many you should hold instead.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on selling. Every correct answer here points away from price and toward observable evidence, which is the whole argument of the module.`,
          quiz: {
            title: "Exits",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "What are the two legitimate reasons to sell?",
                explanation:
                  "The thesis has played out, or the thesis has broken. Neither is a price — price measures the result, it is not the reason. Selling because something fell, with the thesis intact, converts a temporary drawdown into a permanent loss.",
                options: [
                  { text: "The thesis has played out, or the thesis has broken", correct: true },
                  { text: "The price has fallen, or the price has reached your target", correct: false },
                  { text: "You have recovered your original stake, or you are at a loss", correct: false },
                  { text: "Sentiment has turned, or a better opportunity appeared", correct: false },
                ],
              },
              {
                prompt: "Why must you read the thesis before looking at the price in a review?",
                explanation:
                  "Price contaminates the assessment. Seeing it first lets you talk yourself into whatever the price implies, rather than checking the observable facts you said would matter.",
                options: [
                  {
                    text: "Seeing the price first biases the assessment toward whatever it implies",
                    correct: true,
                  },
                  { text: "Because price data is often inaccurate", correct: false },
                  { text: "To save time during the review", correct: false },
                  { text: "Because the thesis contains the target price", correct: false },
                ],
              },
              {
                prompt: "What is the would-I-buy-it-today test for?",
                explanation:
                  "Removing the anchors. It ignores what you paid and what it peaked at, and asks only whether the position is worth holding on its merits now. A no means you are holding out of inertia or anchoring.",
                options: [
                  {
                    text: "Removing cost-basis and peak anchoring from the hold decision",
                    correct: true,
                  },
                  { text: "Establishing a fair valuation", correct: false },
                  { text: "Deciding how much more to buy", correct: false },
                  { text: "Timing the market cycle", correct: false },
                ],
              },
              {
                prompt: "You conclude a thesis has broken. What is the correct action?",
                explanation:
                  "Sell completely. Selling half and seeing is the decision that keeps people in something they have already concluded is finished, and the remainder typically goes much lower or is never sold at all.",
                options: [
                  { text: "Exit completely, rather than reducing and watching", correct: true },
                  { text: "Sell half and reassess in a month", correct: false },
                  { text: "Hold until the price recovers somewhat", correct: false },
                  { text: "Add, since the price now reflects the bad news", correct: false },
                ],
              },
              {
                prompt: "What should determine how many positions you hold?",
                explanation:
                  "Whether you can actually review them all. Fifteen minutes per position quarterly is realistic, and that caps the number. Holding more than you can review means holding positions whose deterioration you will not notice.",
                options: [
                  { text: "How many you can realistically review each quarter", correct: true },
                  { text: "How many are needed for diversification", correct: false },
                  { text: "How many good ideas you currently have", correct: false },
                  { text: "The size of your account", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Research as a practice",
      description:
        "Turning all of it into a repeatable process, a written record, and a habit of noticing when you are wrong.",
      lessons: [
        {
          title: "The twenty-minute screen",
          type: "TEXT",
          points: 10,
          body: `Most tokens can be eliminated quickly. A fast, consistent screen means you spend your real attention on the small number that survive it.

## The order

Supply first, because it is fastest and it eliminates the most. Circulating, total, maximum, and the fully diluted ratio. A ratio above five with no clear reason is usually enough to stop.

Unlocks second. Next three events, as days of volume. A large near-term unlock into thin volume is usually enough to stop.

Holders third. Top ten, identified. High concentration in unidentified free-floating addresses is usually enough to stop.

Value accrual fourth. Trace one dollar of revenue. If nothing reaches holders, you are relying on narrative, which is allowed but must be known.

Utility fifth. The substitution test. If nothing breaks, demand is speculative.

## Why this order

Cheapest and most eliminating first. There is no point analysing the utility of something whose supply schedule already disqualifies it.

Most tokens fail in the first two steps, which takes under ten minutes.

## The output

Three possible conclusions.

Eliminated, with the reason recorded.

Survived the screen and warrants real work.

Cannot be assessed — documentation missing, data unavailable. This is a legitimate outcome and it should usually mean no position, because you would be relying on hope rather than analysis.

## Recording eliminations

Keep them. A record of what you rejected and why is valuable for two reasons: you avoid re-researching the same thing in six months, and you can check later whether your rejections were correct.

If everything you rejected went up, your screen is miscalibrated and you should know that.

## Why speed matters

Because the alternative is analysing three tokens deeply and buying one of them because you have invested effort. Sunk cost applies to research as much as to positions.

A fast screen across twenty candidates puts your deep work where it belongs.

## The discipline

Run the screen before forming an opinion, not to justify one. The order above is designed so that the disqualifying facts arrive before you have had time to build a story.

That sequencing is deliberate, and it is most of why the screen works.`,
          activity: {
            title: "Screen five tokens in an hour",
            prompt:
              "Take five tokens you know little about and run the five-step screen on each, timing yourself. Record for each: the step at which it failed, or that it survived, or that it could not be assessed. Write the reason in one line. Then note how long the whole exercise took. Keep this list — you will check it in three months to see whether your rejections were correct.",
          },
        },
        {
          title: "Writing a thesis that can be wrong",
          type: "TEXT",
          points: 10,
          body: `A thesis that cannot be wrong is not a thesis. Writing one that can be is what turns research into something you can learn from.

## What a thesis contains

What you own and why, with X named precisely.

The mechanism or story you are relying on.

What has to happen for this to work, stated as observable events rather than as price.

What would tell you it is not working — again, observable, and not a price level.

A rough timeframe, because an idea with no timeframe cannot be evaluated.

Your confidence, as a number.

## Why the invalidation must not be a price

Price falling tells you price fell. It does not tell you the thesis was wrong, and treating it as though it does produces selling at lows and holding through genuine deterioration.

An observable invalidation might be: revenue declines for two consecutive quarters, the team's treasury address sells more than a stated share, usage falls below a level once incentives reduce, or a promised mechanism is not shipped by a stated date.

Those are facts you can check, and they are independent of what the price is doing.

## The timeframe

Without one you can hold a failing thesis indefinitely by claiming it needs more time. Set a date at which you will review the thesis against evidence, decided at the outset.

## Confidence as a number

Record it. Later, group your theses by confidence and check whether the high-confidence ones worked more often. If they did not, your confidence carries no information and should not affect your sizing.

Almost nobody runs this check, in any field.

## Updating rather than defending

When evidence arrives that contradicts your thesis, the correct response is to update it — in writing, with a date, noting what changed.

The common response is to find a reason the evidence does not count. That reflex is what turns a position into an identity, and identities do not get sold.

## Reviewing

Set a date. On that date, read the original thesis before looking at the price. Ask whether the things you said would happen have happened.

Reading the price first contaminates the assessment, which is why the order matters.

## The value of the record

After a year you will have a set of theses with stated expectations, invalidations and outcomes. That is the only way to find out whether your research produces anything.

Without it you have a collection of memories, and memory in this domain is reliably self-flattering.`,
          activity: {
            title: "Write a full thesis and diary it",
            prompt:
              "Write a complete thesis for one holding or candidate: what you own and why, the mechanism or story, what must happen stated observably, what would invalidate it stated observably and not as a price, a review date, and confidence out of five. Then put the review date in your calendar. On that date, read the thesis before you look at the price. Write down now that you will do it in that order.",
          },
        },
        {
          title: "Where the data actually comes from",
          type: "TEXT",
          points: 10,
          body: `Everything in this course depends on data, and the data varies in reliability. Knowing which source to trust for what is part of the skill.

## The chain

The most reliable source. Supply, balances, transfers and contract state are verifiable and not self-reported.

Use a block explorer for the relevant chain. Anything you can check here, check here rather than trusting an aggregator.

Limits: pseudonymity means attribution is uncertain, and interpreting contract state requires knowing what the contract does.

## Aggregators

Convenient for supply figures, valuations and rankings. Also the source of the circulating supply problem — figures are self-reported and definitions differ.

Use them for orientation and cross-check anything that matters against the chain. Never rely on a single aggregator for a figure that decides a position.

## Analytics platforms

Dashboards for protocol revenue, usage, and holder analysis. Genuinely valuable and dependent on how the queries were written.

Check what a metric actually measures before trusting it. Two dashboards labelled "revenue" frequently measure different things, and the difference can be large.

## Project documentation

Primary source for intent: allocation, vesting, mechanisms. Not a source for whether any of it is being followed — verify against the chain.

## Unlock trackers

Convenient for schedules. Accuracy varies, and they can be out of date after a change. Verify important dates against documentation or the vesting contract itself.

## Social sources

Useful for noticing what people are paying attention to. Not a source of fact. Anyone with a position has an incentive, and the loudest voices are usually the most positioned.

## The hierarchy

Chain, then documentation, then analytics, then aggregators, then social.

When two sources disagree, prefer the one higher on that list, and note the disagreement — a discrepancy between documentation and chain is itself one of the most informative findings available.

## Building your set

Assemble a small set of tools you know well rather than many you know shallowly. An explorer, one aggregator, one analytics platform, one unlock tracker.

Knowing exactly what your four tools measure is worth more than access to twenty.`,
          activity: {
            title: "Cross-check one figure four ways",
            prompt:
              "Pick one token and one figure that matters — circulating supply is ideal. Find it on two aggregators, in the project's documentation, and on the chain. Write down all four values. Note any discrepancy and work out which is most likely correct and why. Then write down the four tools you are adopting as your standard set, and one sentence each on exactly what they measure.",
          },
        },
        {
          title: "What you can now do",
          type: "TEXT",
          points: 10,
          body: `A final accounting before the capstone.

## What you can do

Find a token's real supply, including what is not in the circulating figure, and read the fully diluted ratio as a measure of overhang.

Calculate net issuance and state what demand growth is needed just to hold price flat.

Find an unlock schedule and size each event against daily volume rather than against supply.

Read a holder list properly — identifying exchanges, contracts and treasuries — and correct the concentration figure to free-floating holders only.

Trace whether a dollar of protocol revenue reaches a holder, and recognise that for most tokens it does not.

Separate real yield from dilution defence.

Apply the substitution test, and know whether demand is functional or speculative.

Read documentation for its omissions, and check its claims against the chain.

Work backwards from a price to the assumptions it requires, and say plainly when nothing can be established.

Run a twenty-minute screen and write a thesis with an observable invalidation.

## What you know that most holders do not

That circulating supply is soft and self-reported. That a fully diluted ratio above five is a supply overhang. That incentive-driven usage is rented. That governance over an undistributed treasury reaches you not at all. That staking rewards from issuance are not yield. That most crypto assets cannot be valued, including by the people quoting targets.

## What none of this predicts

Price. Tokens with no utility and terrible supply schedules have risen a great deal, and will again. This course does not tell you what will happen.

What it tells you is what you are relying on — a mechanism or an expectation about other buyers — so that you can size accordingly and know what a fall means.

## The sentence to keep

Why would anyone need to buy this, from whom, and at what rate? If you cannot answer it, you are relying on someone else's expectations, and that is a position to hold small and knowingly.

## What is left

The capstone, and then the practice: twenty minutes before every position, a written thesis, a review date, and the willingness to read your own record honestly.`,
          activity: {
            title: "Answer the opening question again",
            prompt:
              "Go back to lesson one, where you answered the three-part question about something you hold, from what you knew then. Read it. Now answer it again properly, with research. Write both answers side by side and mark what you got wrong, what you had guessed, and what you did not know existed. Then decide whether the holding survives the second answer, and write what you will do about it.",
          },
        },
        {
          title: "Capstone: a complete research report",
          type: "ASSIGNMENT",
          points: 40,
          body: `The final piece. A full research report on one token, written so that a competent reader could check every claim and disagree with your conclusion on the evidence.

A report concluding "I would not hold this", or "this cannot be assessed", scores full marks where the evidence supports it.`,
          assignment: {
            title: "Complete token research report",
            instructions: `Produce a research report on one token. 1,200 to 1,800 words. Every figure sourced. No target price anywhere.

**1. Summary.** Your conclusion in three sentences, stated first so a reader knows what they are checking.

**2. Supply.** All supply figures with the fully diluted ratio, cross-checked across sources with any discrepancy noted. Net annual issuance and the demand growth required to hold price flat.

**3. Unlocks.** Next three events, dated, as percentages and as days of average volume. Recipients and their likely cost basis. If no schedule is published, document the search and treat it as a finding.

**4. Distribution.** Top ten holders identified by type, concentration corrected to free-floating holders, and direction of change. What you could establish about team, investor and treasury behaviour, with stated confidence in each attribution.

**5. Value accrual.** The traced path from a dollar of protocol revenue to a holder who does nothing. If none exists, state it plainly and say what the price rests on instead. Separate any staking yield into issuance and real revenue components.

**6. Utility.** The substitution test applied concretely, and whether the token must be held or only passed through.

**7. Liquidity.** Depth, venues, whether it is incentivised, and the slippage cost of exiting a realistic position at current depth and at half that depth.

**8. Valuation.** Required assumptions worked backwards from the current fully diluted valuation, compared against a real reference. A peer set of at least five on a measurable ratio, with reasons for the subject's position.

**9. Narrative.** What story supports it, whether it is a repackaging, who benefits, how crowded.

**10. Thesis and invalidation.** One sentence with X named and classified. An observable, non-price invalidation. A review date. Confidence out of five.

**11. What you could not establish.** The gaps in your own research and how they affect your confidence. A report claiming no gaps scores zero on that criterion.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Supply and issuance are complete and cross-checked",
                weight: 15,
                descriptor:
                  "All figures sourced across providers with discrepancies noted, net issuance calculated, and the required demand growth stated.",
              },
              {
                criterion: "Unlocks are dated and sized against volume",
                weight: 15,
                descriptor:
                  "Three events with recipients and cost basis, expressed in days of volume. A documented absence scores full marks where no schedule exists.",
              },
              {
                criterion: "Distribution is identified and corrected",
                weight: 15,
                descriptor:
                  "Holders categorised, concentration recalculated on free float, insider behaviour traced with stated confidence.",
              },
              {
                criterion: "Value accrual is traced, not assumed",
                weight: 20,
                descriptor:
                  "A specific path from revenue to holder, or a plain statement that none exists. Full marks separate staking yield into issuance and revenue components.",
              },
              {
                criterion: "Valuation is honest about its limits",
                weight: 15,
                descriptor:
                  "Required assumptions computed and tested against a real reference, peer set on fully diluted valuation with the position explained. Producing a target price scores zero here.",
              },
              {
                criterion: "Thesis is falsifiable",
                weight: 10,
                descriptor:
                  "X named and classified, an observable non-price invalidation, a review date and a numeric confidence.",
              },
              {
                criterion: "Gaps are stated",
                weight: 10,
                descriptor:
                  "Honest account of what could not be established and its effect on confidence. Claiming no gaps scores zero.",
              },
            ],
          },
        },
      ],
    },
  ],
};
