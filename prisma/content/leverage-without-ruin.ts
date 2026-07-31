import type { ContentCourse } from "./types";

/**
 * Leverage Without Ruin — the most dangerous subject in the catalogue.
 *
 * Written on the assumption that people will use leverage whether or not we
 * teach it, and that the version they learn from a group chat will destroy
 * them. So the course exists, and it is relentlessly defensive.
 *
 * Two editorial rules run through it. Every module states the arithmetic
 * before the technique, because the arithmetic is what people skip and it is
 * what kills them. And the final module argues, honestly, that most students
 * should not use leverage at all — including the ones who have just passed
 * every quiz.
 *
 * Marked ADVANCED and gated behind the two prior trading courses in the
 * intended order. A student arriving here without position sizing is told to
 * leave in lesson one, in plain terms.
 */
export const leverageWithoutRuin: ContentCourse = {
  slug: "leverage-without-ruin",
  title: "Leverage Without Ruin: Futures, Funding and Liquidation",
  subtitle:
    "The arithmetic of borrowed money, why liquidation happens earlier than people expect, and an honest account of who should not be doing this at all.",
  description: `Leverage is the fastest way to lose money that has ever been invented, and it is offered to beginners at a hundred times their capital by platforms that profit when they are liquidated. That combination is why this course exists. People will use it whether or not anyone teaches them properly, and the version learned from a group chat is the version that ends accounts.

This course teaches the arithmetic first, because the arithmetic is what people skip. Why a 1% move against a hundred-times position is a total loss. Why liquidation arrives before your stop. Why a 50% loss requires a 100% gain to recover, and why that asymmetry is fatal at size. Why funding rates quietly consume a position that is otherwise correct.

Then the mechanics: how liquidation is actually calculated, what maintenance margin means, how an exchange's insurance fund and auto-deleveraging can take a winning position from you, and why the counterparty risk of a derivatives venue is larger than most traders assume.

Then the part that matters most — sizing. Leverage does not change how much you should risk. It changes how little capital that risk requires, which is a completely different thing, and confusing the two is the single error behind almost every liquidation.

The final module argues that most people reading this should not use leverage, and it makes the case with numbers rather than caution. If that argument persuades you, this course has succeeded.

Take Risk-First Trading and Reading the Market before this one. Arriving here without position sizing is not a shortcut; it is the beginning of a specific and well-documented outcome.`,
  categorySlug: "trading-and-risk",
  level: "ADVANCED",
  priceMinor: 0,
  estimatedHours: 18,
  passThreshold: 85,
  instructorEmail: "daniel@mabyacademy.com",
  outcomes: [
    "Do the arithmetic of leverage, including why recovery is harder than the loss",
    "Calculate a liquidation price before entering, and know why it arrives early",
    "Explain maintenance margin, insurance funds and auto-deleveraging",
    "Account for funding rates as a real, compounding cost of holding a position",
    "Size a leveraged position from risk rather than from available margin",
    "Judge the counterparty risk of a derivatives venue, not only the market risk",
    "Recognise the psychological changes leverage produces and design around them",
    "Decide honestly whether you should be using leverage at all",
  ],
  modules: [
    // =====================================================================
    {
      title: "The arithmetic nobody does",
      description:
        "Before any platform or instrument: the numbers that decide the outcome. Most people who lose to leverage never did this module's sums.",
      lessons: [
        {
          title: "Read this before you open a position",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `A plain warning, and it is not a disclaimer.

## Who should not be here

If you have not completed a course on risk and position sizing, leave and do that first. Leverage amplifies whatever your sizing does. If your sizing is poor, leverage converts a slow loss into a fast one, and it will happen before you learn anything from it.

If you are trading money you need, stop. Leverage has a non-trivial probability of total loss on any single position, and "non-trivial" understates it at the multiples commonly offered.

If you are trying to recover a loss, stop. That specific motivation combined with leverage is the most reliably destructive combination in retail finance. It is not a character flaw; it is a well-documented pattern, and knowing it applies to you is the only defence.

## What the platforms are

Venues offering a hundred times leverage to new accounts are not providing a service to skilled traders. They are running a business whose revenue includes liquidations, and the account sizes and hold times of their users are known to them precisely.

That is not a conspiracy claim. It is a statement about incentives, and you should factor it in the way you factor any counterparty's incentives.

## Why this course exists anyway

Because people use leverage regardless, and the alternative to teaching it properly is that they learn it from someone selling a signals group.

There are also legitimate uses — hedging an existing position, capital efficiency for a professional with genuine edge — and those are real.

## What this course will do

Teach the arithmetic until it is boring, because the arithmetic is what people skip.

Teach liquidation mechanics precisely, because most people discover them at the moment they apply.

Teach sizing from risk rather than from available margin, which is the single distinction that separates survivors from statistics.

And, in the final module, argue that most readers should not do this — with numbers.

## The standard

The pass threshold on this course is higher than any other in the catalogue, deliberately. Getting this material approximately right is not good enough, because approximately right on leverage is a total loss.

If you find yourself skimming, stop. The section you skim will be the one that applies.`,
          activity: {
            title: "State your position honestly",
            prompt:
              "Write down four things before continuing. Whether you have completed a position-sizing course. Whether the money you would use is money you need. Whether you are currently down and hoping to recover. And what your largest single loss has been so far, in money and as a percentage of your account. If any of the first three answers disqualify you under this lesson, write down what you will do instead and when you would revisit this course.",
          },
        },
        {
          title: "What leverage actually does",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `Leverage means controlling a position larger than your capital. The mechanism is borrowing, and the consequence is that every percentage move is multiplied against a fixed amount of your money.

## The basic arithmetic

With 1,000 dollars and no leverage, a 10% move gives or costs you 100 dollars.

With 1,000 dollars at ten times leverage, you control 10,000. A 10% move gives or costs you 1,000 — your entire capital.

At a hundred times, you control 100,000. A 1% move is your entire capital.

Crypto routinely moves 1% in minutes. At a hundred times leverage, a routine minute is a total loss.

## The number people misread

Leverage multiples describe position size relative to capital. They do not describe risk relative to capital, which depends on where your invalidation is.

This is the distinction the entire course rests on. Ten times leverage with a stop 0.5% away risks 5% of capital. Two times leverage with a stop 10% away risks 20%. The lower leverage number is the riskier position.

Anyone who talks about leverage without talking about stop distance is not talking about risk at all.

## Why recovery is harder than the loss

A 50% loss requires a 100% gain to return to even. A 90% loss requires a 900% gain.

This asymmetry is always true and is usually ignored, because at small losses it barely matters — a 5% loss needs 5.3% to recover, which feels the same. At large losses it becomes the dominant fact.

Leverage is what moves you from the region where the asymmetry is negligible to the region where it is fatal, quickly, in a single position.

## Compounding losses

Lose 20% four times in a row and you have not lost 80%. You have 41% of what you started with, because each loss applies to a smaller base.

Lose 50% twice and you have 25%. Three times and you have 12.5%.

A leveraged trader taking a run of ordinary losing trades — a run which is statistically certain — arrives somewhere that ordinary arithmetic does not suggest.

## The one sentence

Leverage does not increase your expected return. It increases the variance around it, and increases the probability of hitting zero, from which no expected return can recover you.

That sentence contains the whole argument. Everything else in this course is detail.`,
          activity: {
            title: "Do the sums yourself",
            prompt:
              "Work these out by hand and write down each answer. With 1,000 dollars: at 20x, what percentage move against you is a total loss? At 50x? At 100x? Then: after a 60% loss, what percentage gain returns you to even? After 80%? Then: if you lose 25% five times consecutively, what fraction of your starting capital remains? Do not use a calculator's memory of what you expect — write the working. The numbers are more persuasive when you produce them.",
          },
        },
        {
          title: "Why liquidation comes before you expect",
          type: "TEXT",
          points: 10,
          body: `Most people assume they are liquidated when their loss equals their margin. It happens earlier, and the gap has ended a great many positions that were about to be right.

## Maintenance margin

The exchange requires you to keep a minimum equity in the position — the maintenance margin, typically a small percentage of position value.

When your equity falls to that level, you are liquidated. Not when equity reaches zero. The exchange closes you while there is still something left, because it needs to close before the position goes negative and becomes their loss.

## The consequence

At a hundred times leverage, your capital is 1% of position value. If maintenance margin is 0.5%, you are liquidated after roughly a 0.5% adverse move, not 1%.

Half the move you calculated. People do the naive sum, place a stop just inside their expected liquidation, and are liquidated before the stop is touched.

## Fees make it worse

Opening fees, funding payments and the closing fee all reduce your equity. Every one moves the liquidation price closer.

A position held for days through negative funding can be liquidated meaningfully earlier than at entry, without price having moved further against you than you planned for.

## Slippage on liquidation

Liquidation is a forced market order into whatever depth exists. In a violent move, depth is thin and the fill is poor.

If the fill is worse than your remaining equity covers, the shortfall is taken by the exchange's insurance fund. If that is exhausted, some venues claw back from profitable traders — which we cover in module two.

## Cascades

Liquidations are forced selling. Forced selling pushes price further. That triggers more liquidations, in the same direction, at once.

This is why crypto produces sudden violent moves that reverse almost immediately. The move was not information; it was a cascade of forced orders consuming available depth.

Highly leveraged positions sit exactly where cascades reach, because they are the closest to their liquidation price. You are the fuel.

## The practical instruction

Calculate your liquidation price before you enter, using the exchange's own figure rather than your estimate, and check it after any funding payment.

Then ask whether normal volatility on your timeframe reaches it. If it does — and at high multiples it always does — the position will be closed by noise, and your analysis is irrelevant.

That check, done honestly, eliminates most of the positions people take.`,
          activity: {
            title: "Find the noise distance",
            prompt:
              "Pick a market you follow. Find its average movement per hour and per day. Now calculate, for 5x, 10x, 25x and 50x leverage, roughly how far price must move against you to reach liquidation, accounting for maintenance margin. Compare each to the normal movement figures. Write down the highest multiple at which your liquidation price is still outside a normal day's range. That number is your realistic ceiling, and it is almost certainly lower than what the platform offers you.",
          },
        },
        {
          title: "Risk per trade does not change",
          type: "TEXT",
          points: 10,
          body: `The most important lesson in the course. Leverage changes how much capital a position requires. It does not change how much you should risk.

## The rule that does not move

If your rule is 1% of account per trade, it is 1% with leverage and 1% without. The rule is about your account, not about the instrument.

Leverage lets you take that 1% risk while committing less capital as margin. That is genuinely useful for capital efficiency. It is not permission to risk more.

## Working it through

Account 10,000. Risk rule 1%, so 100 dollars maximum loss.

An idea with an invalidation 2% away from entry. To lose 100 at a 2% move, position size is 5,000.

Unleveraged, 5,000 of capital. At 5x, 1,000 of margin. At 10x, 500.

In every case the risk is 100 dollars. The leverage changed only how much capital is tied up.

## Where it goes wrong

The trader sees 10,000 available and 10x leverage and concludes they can take a 100,000 position. Now a 0.1% move is 100 dollars, and their 2% invalidation is a 2,000 dollar loss — 20% of the account, on one trade.

They did not decide to risk 20%. They sized from available margin instead of from risk, and the leverage number did the deciding.

This single error is behind the large majority of liquidations. Not bad analysis. Arithmetic performed in the wrong order.

## The correct order, always

Decide risk in money, from your account and your percentage rule.

Find the invalidation from structure.

Divide: position size equals risk divided by the distance to invalidation as a fraction.

Only then look at leverage, and only to check the margin required is available.

Leverage is the last number you consider and it never enters the sizing calculation.

## The check

After calculating, ask: if this is stopped out, what percentage of my account is gone? If the answer is not the number in your rule, you have made an error somewhere and should not enter.

## Why maximum available is always wrong

Platforms display maximum position size prominently, because larger positions generate more fees and more liquidations. That number is a marketing figure and it has no relationship to what you should trade.

Treat it exactly as you would treat a shop telling you the maximum you could spend.`,
          activity: {
            title: "Run the calculation four ways",
            prompt:
              "Take a real account size and your risk percentage. Pick a real market and a real structural invalidation level. Now calculate the correct position size, and then the margin required at 1x, 5x, 10x and 25x. Write all four. Confirm that the risk in money is identical in every case. Then calculate what your loss would be if you had instead sized from maximum available margin at 10x, and write that as a percentage of your account. Put the two numbers side by side.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `The pass threshold on this course is 85%, and this is the module it matters most on. Everything after this assumes you can do these sums instantly, because in a live position you will not have time to work them out.`,
          quiz: {
            title: "The arithmetic of leverage",
            passScore: 85,
            maxAttempts: 5,
            questions: [
              {
                prompt: "After a 75% loss, what gain is needed to return to break even?",
                explanation:
                  "300%. You have 25% of your capital left, and turning 25 into 100 requires quadrupling it. This asymmetry is negligible at small losses and dominant at large ones — and leverage is what moves you into the region where it dominates.",
                options: [
                  { text: "300%", correct: true },
                  { text: "75%", correct: false },
                  { text: "100%", correct: false },
                  { text: "150%", correct: false },
                ],
              },
              {
                prompt:
                  "You have 10,000, risk 1% per trade, and your invalidation is 2% from entry. What is the correct position size?",
                explanation:
                  "5,000. Risk of 100 dollars divided by a 2% adverse move gives a 5,000 position. Leverage only determines how much margin that requires — 1,000 at 5x, 500 at 10x — and never changes the 100 dollar risk.",
                options: [
                  { text: "5,000", correct: true },
                  { text: "100,000, using 10x on the full account", correct: false },
                  { text: "10,000, the full account", correct: false },
                  { text: "200, being 2% of the account", correct: false },
                ],
              },
              {
                prompt: "Why are you liquidated before your loss equals your margin?",
                explanation:
                  "Maintenance margin. The exchange closes you while equity still covers the position, because it must close before the position goes negative and becomes its loss. At 100x with 0.5% maintenance, liquidation arrives at roughly a 0.5% move, not 1%.",
                options: [
                  {
                    text: "Maintenance margin requires minimum equity, so closure happens while capital remains",
                    correct: true,
                  },
                  { text: "Exchanges liquidate early to profit from it", correct: false },
                  { text: "Because of slippage on the closing order alone", correct: false },
                  { text: "It does not — liquidation occurs exactly at zero equity", correct: false },
                ],
              },
              {
                prompt: "Why do liquidation cascades produce sharp moves that reverse quickly?",
                explanation:
                  "Liquidations are forced orders in one direction. They push price further, triggering more liquidations at once. The move consumes available depth rather than reflecting information, so price frequently returns once the forced selling exhausts.",
                options: [
                  {
                    text: "Forced closures trigger further closures, consuming depth without reflecting information",
                    correct: true,
                  },
                  { text: "Large participants deliberately hunt individual accounts", correct: false },
                  { text: "News arrives and is then corrected", correct: false },
                  { text: "Exchanges pause and resume trading", correct: false },
                ],
              },
              {
                prompt:
                  "Which position carries more account risk: 10x with a 0.5% stop, or 2x with a 15% stop?",
                explanation:
                  "The 2x position, risking 30% of the committed capital against 5% for the 10x one. Leverage multiples describe position size, not risk — risk is set by stop distance, and quoting leverage without stop distance says nothing about risk.",
                options: [
                  { text: "The 2x position, because the stop is far wider", correct: true },
                  { text: "The 10x position, because leverage is higher", correct: false },
                  { text: "They are identical", correct: false },
                  { text: "Impossible to determine from leverage alone", correct: false },
                ],
              },
              {
                prompt: "What should the maximum position size a platform displays tell you?",
                explanation:
                  "Nothing about what you should trade. Larger positions generate more fees and more liquidations, so it is a marketing figure — the equivalent of a shop telling you the maximum you could spend.",
                options: [
                  { text: "Nothing — it is a marketing figure with no relation to correct sizing", correct: true },
                  { text: "The size the exchange considers safe for your account", correct: false },
                  { text: "A reasonable size for a confident idea", correct: false },
                  { text: "The size at which fees are most efficient", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "How liquidation actually works",
      description:
        "The mechanics in detail, including the ways a winning position can still be taken from you.",
      lessons: [
        {
          title: "Margin, equity and the liquidation price",
          type: "TEXT",
          points: 10,
          body: `The terms are used loosely everywhere and precisely by the engine that closes your position. Precision is the only version that helps you.

## The quantities

Initial margin: what you must post to open. Position value divided by leverage.

Maintenance margin: the minimum equity that must remain. A percentage of position value, and it typically rises with position size — larger positions face stricter requirements, which surprises people scaling up.

Equity: your margin plus unrealised profit, minus unrealised loss and accrued fees.

Liquidation price: where equity falls to maintenance margin.

## Isolated versus cross margin

Isolated: only the margin assigned to that position is at risk. A liquidation costs you that margin and nothing else.

Cross: your whole account balance backs every position. A single bad position can consume everything, including the margin of positions that are winning.

Cross margin gives a position more room and therefore a further liquidation price, which is why people choose it. It also means one mistake takes the account rather than a position.

For anyone still learning, isolated margin per position is the correct default. It converts a catastrophic outcome into a bounded one, and the bound is the point.

## Why the liquidation price moves

It is not fixed at entry. Funding payments reduce equity. Fees reduce equity. On cross margin, losses elsewhere reduce equity.

So a position can drift toward liquidation while price has not moved. Traders who calculated once at entry and never checked again are frequently surprised, and the surprise arrives without any price action to explain it.

Check it after every funding period on any position held longer than a few hours.

## Adding margin

Most venues let you add margin to a position, moving the liquidation price further away.

Understand what this is: increasing the amount at risk on a position that is already losing. Sometimes correct. Frequently the beginning of the sequence where someone adds repeatedly and loses far more than planned.

If you decide in advance that you will never add margin to a losing position, you have removed one of the two most common paths to a large loss.

## The one to internalise

Your liquidation price is not a number you calculate once. It is a moving level that drifts against you over time, and knowing where it is right now is a condition of holding the position at all.`,
          activity: {
            title: "Watch a liquidation price drift",
            prompt:
              "On any exchange with a demo or testnet, open a small leveraged position and record the liquidation price at entry. Then check it again after several hours, and after a funding payment, without price having moved much. Write down how far it moved and why. If you cannot access a testnet, do the arithmetic instead: calculate the liquidation price at entry, then recalculate after subtracting two funding payments and the round-trip fees, and write both.",
          },
        },
        {
          title: "Insurance funds and auto-deleveraging",
          type: "TEXT",
          points: 10,
          body: `The mechanism by which a correct, profitable position can be closed against your will. Most leveraged traders do not know it exists until it happens to them.

## The problem it solves

When a liquidation fills worse than the trader's remaining equity, someone must cover the shortfall. The exchange does not want that loss.

## The insurance fund

Venues maintain a fund, built from liquidations that closed better than the bankruptcy price. It absorbs shortfalls.

In ordinary conditions this works and you never hear about it. In extreme conditions — a violent cascade with thin depth — the fund can be drained.

## Auto-deleveraging

When the fund cannot cover shortfalls, some venues close profitable positions on the other side to balance the book. Your winning position is closed at a price you did not choose, at a moment you did not choose.

Selection is usually by profit and leverage: the most profitable, most leveraged positions go first. So being right, with size, is exactly what makes you a candidate.

## Why this matters

It means your risk is not only that you are wrong. It is also that in the conditions where you are most right — a violent move in your favour — the venue may take the position from you.

This is a counterparty risk, not a market risk, and no stop or sizing protects against it.

## What reduces exposure

Prefer venues with large, publicly reported insurance funds and a history of not deleveraging.

Lower leverage. Deleveraging queues rank by leverage, so lower-leveraged positions are selected later.

Take profit progressively on very large moves rather than holding the full position into the extremes. Partial realisation removes you from the top of the queue.

Understand your venue's specific policy. They differ meaningfully, and it is documented — usually in a page nobody reads until it applies.

## The wider point

Derivatives venues are counterparties with rules, not neutral marketplaces. Those rules describe what happens to you in extremes, and extremes are exactly when the rules bind.

Reading your venue's liquidation and deleveraging documentation is an hour that pays for itself the first time a cascade happens while you are positioned.`,
          activity: {
            title: "Read your venue's actual policy",
            prompt:
              "Find the documentation for the venue you use, or would use, on three things: how the insurance fund works and its current size, whether auto-deleveraging exists and how positions are selected, and what the maintenance margin schedule is at different position sizes. Write down what you found and, specifically, what would happen to a large profitable position of yours during a violent cascade. If any of this is not documented, write that down — it is a reason to reconsider the venue.",
          },
        },
        {
          title: "Stops under leverage",
          type: "TEXT",
          points: 10,
          body: `A stop behaves differently when leveraged, in ways that make the naive assumption dangerous.

## A stop is not a guarantee

It triggers a market order. In fast conditions the fill can be far from the trigger.

Unleveraged this is annoying. At high leverage the difference between your stop and your fill can be a large fraction of your capital, because everything is multiplied.

## The gap problem

Crypto trades continuously, so true gaps are rarer than in other markets, but violent moves function similarly. Price can travel through your stop level with no meaningful depth, and you are filled far below.

At 50x, a 2% move through your stop before the fill is 100% of the margin on that position.

## Stop before liquidation, always

If your stop is beyond your liquidation price, it is decorative. You will be liquidated first, and the liquidation will be a forced market order with a poor fill and a fee.

Check that your stop sits meaningfully inside your liquidation price — not marginally, because liquidation drifts closer over time.

If your structural stop cannot fit inside the liquidation price, your leverage is too high for the idea. Reduce leverage until it fits. That is the correct response and it is available on every trade.

## The obvious-level problem, amplified

Everything from the market structure course applies more strongly. Stops cluster at obvious levels; leveraged liquidations cluster there too, at the prices the crowd's positions imply.

Those clusters are where cascades reach. A stop placed at the obvious level, on leverage, is placed exactly where forced selling will arrive.

## Wider stop, smaller size

The correct adjustment is always the same: place the stop where structure says, then reduce size until the risk is your rule.

Under leverage this often means the position is smaller than feels worth taking. That feeling is the error — a position sized correctly rarely feels exciting, and excitement is what leverage sells.

## Never widen, and here it is absolute

Widening a stop on a leveraged position is how a planned loss becomes a liquidation. There is no version of this that is correct, and the reasoning that suggests it will always sound good in the moment.

Decide now, in writing, that you will not do it. That decision is worth more than anything else in this module.`,
          activity: {
            title: "Check stop against liquidation",
            prompt:
              "Take three real trade ideas with structural invalidation levels. For each, calculate the leverage at which your stop would sit at least twice as far inside the liquidation price as the distance from entry to stop. Write that maximum leverage for each. Then compare it to the leverage you would have been tempted to use. Write both numbers, and write down your no-widening commitment as a dated sentence.",
          },
        },
        {
          title: "Liquidation cascades and where you sit in them",
          type: "TEXT",
          points: 10,
          body: `Understanding cascades changes how you think about entries, because it explains a large share of the violent moves in crypto and tells you where not to be standing.

## The mechanism

Highly leveraged positions cluster at predictable liquidation prices, because traders use round leverage multiples from similar entry areas.

When price reaches one cluster, those positions are force-closed. Forced closing is market selling, which pushes price into the next cluster. That closes too.

The move accelerates in one direction, consuming depth, until the clusters are exhausted. Then it frequently reverses sharply, because the selling was mechanical rather than informed.

## Why the reversal is so fast

Nothing changed about the asset. A large volume of forced orders hit thin depth. Once exhausted, the price that was pushed down finds buyers, and it recovers.

The whole event can take minutes. Traders watching the chart afterwards see a long wick and no explanation, and often invent one.

## Where the clusters are

Beyond obvious highs and lows. Around round numbers. At the prices implied by common leverage multiples from recent popular entry areas.

Some data providers publish estimated liquidation levels. Treat them as approximate, and note that if you can see them, so can everyone, including participants who benefit from price reaching them.

## What this means for you

Do not place yourself just inside an obvious cluster. Your liquidation price should not sit at the level everyone else's does.

Consider that a cascade is a liquidity event rather than an information event. It is often an opportunity in the opposite direction, for someone with capital and no leverage — and a catastrophe for someone leveraged into it.

Expect them. In crypto they occur regularly. A method that assumes orderly price movement will be surprised several times a year.

## The uncomfortable framing

At high leverage, you are the fuel. Your position exists at a known price level, and the market moving there generates the forced orders that carry the move.

That is not paranoia and it does not require anyone targeting you personally. It is simply where your position sits in the structure, and the only remedy is not to be there — which means lower leverage and liquidation prices well away from the crowd's.

## The practical rule

Before entering, ask where your liquidation sits relative to the obvious levels. If it is inside the zone a normal cascade would reach, the position is wrongly sized regardless of how good the idea is.`,
          activity: {
            title: "Study a real cascade",
            prompt:
              "Find a violent move in crypto in the last year — a large candle followed by a rapid recovery. Write down: how far price moved, how long it took, how much it recovered, and what the news explanation given at the time was. Then calculate what leverage multiple would have been liquidated by that move from a typical entry a day earlier. Write down whether your intended leverage would have survived it.",
          },
        },
        {
          title: "Assignment: a full liquidation analysis",
          type: "ASSIGNMENT",
          points: 25,
          body: `The first graded piece, and it is arithmetic rather than opinion. Every number must be calculated and shown.

You are not being asked to take a position. You are being asked to demonstrate that you can establish, before entering, exactly how and when you would be closed.`,
          assignment: {
            title: "Liquidation and sizing analysis",
            instructions: `Analyse one real leveraged position you might take. 600 to 900 words, with all arithmetic shown.

**1. The idea and its invalidation.** Market, timeframe, structural reading, and the exact price at which the idea is wrong. Brief — this course assumes the previous ones.

**2. Correct sizing.** Your account, your risk percentage, the invalidation distance, and the position size that follows. Show the division. State the margin required at three different leverage multiples and confirm the money risked is identical in each.

**3. Liquidation price.** Calculate it, including maintenance margin at that position size. Then state how it changes after two funding payments and round-trip fees. Give both numbers.

**4. The noise test.** Average movement on your timeframe, and whether your liquidation price sits outside it. State the maximum leverage at which your structural stop sits at least twice as far inside the liquidation price as the entry-to-stop distance.

**5. Cascade exposure.** Where the obvious levels are, where the crowd's liquidations likely cluster, and where yours sits relative to them. State whether a normal cascade would reach you.

**6. Venue risk.** Your venue's maintenance margin schedule, insurance fund, and auto-deleveraging policy, from their documentation. State what would happen to this position, in profit, during a violent cascade.

**7. The decision.** Given all of the above, state whether you would take this position and at what leverage. Deciding not to take it is a full-marks answer if the arithmetic supports it.

Any section without shown working scores zero. "Appropriate leverage" and "a reasonable stop" are not answers.`,
            maxScore: 100,
            passScore: 75,
            rubric: [
              {
                criterion: "Sizing is derived from risk, with working shown",
                weight: 25,
                descriptor:
                  "Risk in money divided by invalidation distance, with identical money risk demonstrated across three leverage multiples. Sizing from available margin scores zero here.",
              },
              {
                criterion: "Liquidation price is calculated and its drift accounted for",
                weight: 25,
                descriptor:
                  "Correct calculation including maintenance margin, plus the recalculated figure after funding and fees. Full marks treat liquidation as a moving level rather than a fixed one.",
              },
              {
                criterion: "The noise test is applied and acted on",
                weight: 20,
                descriptor:
                  "Real volatility measured against the liquidation distance, with a stated maximum leverage. Full marks reduce leverage until the stop fits rather than accepting a stop beyond liquidation.",
              },
              {
                criterion: "Cascade exposure is located",
                weight: 15,
                descriptor:
                  "Obvious levels identified and the writer's liquidation placed relative to the likely cluster, with a stated conclusion about whether a normal cascade reaches it.",
              },
              {
                criterion: "Venue mechanics are researched, not assumed",
                weight: 15,
                descriptor:
                  "Actual documented figures for maintenance margin, insurance fund and deleveraging, with the consequence for a profitable position during a cascade stated.",
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "The cost of holding",
      description:
        "Funding rates, basis and fees. The costs that consume a position which is otherwise correct.",
      lessons: [
        {
          title: "Perpetual contracts and why funding exists",
          type: "TEXT",
          points: 10,
          body: `The dominant leveraged instrument in crypto is the perpetual contract, and its defining feature is a mechanism most users treat as a footnote.

## The problem it solves

A traditional futures contract expires, and its price converges to the underlying at expiry. That convergence is what keeps it tethered to reality.

A perpetual never expires. So something else must keep it near the underlying price, or it would drift away indefinitely.

## The funding mechanism

Periodically — typically every eight hours — one side pays the other.

When the contract trades above the underlying, longs pay shorts. This makes being long more expensive and being short more attractive, pulling the price down.

When it trades below, shorts pay longs.

The rate floats with the size of the deviation. It is not a fee to the exchange; it is a transfer between traders, though the exchange usually takes a cut.

## Why this matters more than people think

Funding is charged on position value, not on your margin. At high leverage, that is a large multiple of your capital.

A modest-sounding rate, charged three times daily on a position ten times your capital, is a substantial cost against your capital. Held for a week, it can consume a meaningful fraction of your margin without price moving at all.

## The crowded-trade signal

Persistently high positive funding means longs are paying heavily, which means the long side is crowded and expensive.

That is genuine information. It tells you about positioning, which is one of the few things funding does honestly reveal. Extremely high funding often precedes long liquidation cascades, precisely because it indicates a crowded, leveraged long side.

It is not a timing signal. Crowded conditions persist far longer than people expect, and shorting purely because funding is high is a well-populated way to lose money.

## Practical handling

Check the funding rate before entering and know when the next payment falls.

For short holds, funding is usually negligible. For multi-day positions at leverage, it must be in your arithmetic.

If you are paying high funding, you need the move to happen relatively quickly. A correct idea that takes three weeks can still lose money.

## The thing to remember

You can be right about direction, hold the position, watch price reach your target, and still be worse off than when you started — because funding took more than the move gave. That outcome surprises people once.`,
          activity: {
            title: "Cost a week of funding",
            prompt:
              "Find the current funding rate for a perpetual contract you would trade. Calculate what it costs on a position ten times your capital, over one week, assuming three payments per day at the current rate. Express it as a percentage of your capital, not of position value. Then work out how far price must move in your favour simply to break even after that funding plus round-trip fees. Write that break-even distance down and compare it to normal weekly movement.",
          },
        },
        {
          title: "Basis, contango and what the curve says",
          type: "TEXT",
          points: 10,
          body: `The relationship between derivative prices and the underlying carries information about positioning and expectation. It is one of the few genuinely informative things in this area.

## Basis

The difference between the contract price and the underlying spot price.

Positive basis — contract above spot — indicates demand to be long with leverage. Negative basis indicates the reverse.

## The curve on dated futures

Where contracts exist for several expiry dates, their prices form a curve.

Contango: further-dated contracts priced higher. Normal, reflecting the cost of carry and a general willingness to pay for future exposure.

Backwardation: further-dated priced lower. Less common in crypto, and it usually indicates stress or strong immediate demand for the asset itself.

## What extreme readings indicate

Very high positive basis, alongside high funding, indicates a heavily leveraged long side. That configuration has preceded most large liquidation events, because the fuel is in place.

Deeply negative basis indicates the reverse and has often marked capitulation lows.

These are positioning indicators. They tell you where the crowd is, which is real information, and they do not tell you when the crowd will be wrong.

## The trap

Reading extreme funding and basis as a timing signal. Crowded conditions can persist for weeks and become more crowded. A trader shorting into high funding because it "must" resolve has taken a position against momentum on the basis of a condition that has no deadline.

Use it as context that changes your sizing and your expectations, not as an entry.

## Cash and carry

The genuinely low-risk use of basis, and worth knowing exists. Buy the asset, sell a dated future against it, and collect the basis as the contract converges at expiry. Market-neutral in principle.

The risks are real and specific: exchange failure, margin management on the short leg, and the two legs being on different venues. It is not free money, and it is capital-intensive.

It is mentioned because it is the one strategy in this area that does not depend on being right about direction — and because understanding it explains why basis exists at all.

## The honest use for most people

Check funding and basis before entering, as a positioning read. Size down when they are extreme in the direction you are considering, because that is where cascades happen.

Do not build a method on them.`,
          activity: {
            title: "Track positioning against outcomes",
            prompt:
              "For one market, record the funding rate and basis daily for two weeks alongside the price. Then look back: did extreme readings precede sharp moves, and in which direction? Write what you found. Then find one historical instance of very high funding and note how long it persisted before resolving. Write that duration down — it is the number that stops people trading this as a timing signal.",
          },
        },
        {
          title: "Fees at leverage, and the frequency trap",
          type: "TEXT",
          points: 10,
          body: `Trading fees are charged on position value. Under leverage, position value is a multiple of your capital, so fees are a multiple of what they appear.

## The arithmetic

A fee that sounds trivial as a percentage of position value is that percentage multiplied by your leverage when measured against your capital.

At 20x, a 0.05% taker fee each way is 2% of your capital per round trip. Ten round trips and you have paid 20% of your capital in fees, before any market movement.

## Why frequent leveraged trading fails

This is the mechanism. High leverage plus high frequency produces a fee burden that no realistic edge overcomes.

A trader taking several leveraged trades daily can pay a large multiple of their capital in fees annually. There is no analysis that survives that.

If you are trading frequently at leverage, calculate your annual fee burden as a percentage of capital. The number is usually startling and it usually settles the question.

## Maker rebates

Venues charge less, or pay, for resting orders. At leverage this difference is amplified along with everything else.

Using limit entries where your method allows can materially change viability. It is one of the few genuinely free improvements available.

## Funding compounds with fees

Fees on entry and exit, funding while held. On a multi-day leveraged position, the total cost of carry can require a substantial favourable move simply to break even.

Calculate that break-even distance before entering. If it is large relative to your target, the trade does not work even if your analysis is correct.

## The viability test

Expected gain per trade, minus round-trip fees at your leverage, minus expected funding, times trades per year.

Run it honestly. Many leveraged approaches produce a negative number, which explains their results without reference to skill at all.

## What to do about it

Trade less. Use limit orders. Use lower leverage, which reduces fees proportionally against your capital. Hold for moves large enough to clear the costs.

Every one of those is unexciting, and together they are the difference between a leveraged approach that can work and one that cannot.`,
          activity: {
            title: "Calculate your annual fee burden",
            prompt:
              "Take your actual or intended trading frequency, your typical leverage, and your venue's taker fee. Calculate the total fees paid per year as a percentage of your capital. Then add estimated funding for your typical hold time. Write the total. Then write what average gain per trade you would need simply to break even. Compare that to your actual average. If the numbers do not work, write down which variable you will change.",
          },
        },
        {
          title: "Hedging: the legitimate use",
          type: "TEXT",
          points: 10,
          body: `The clearest legitimate reason to use leverage, and worth understanding even if you never speculate with it.

## What hedging is

Holding an offsetting position to reduce exposure to a risk you already carry.

If you hold an asset long-term and expect a decline you do not want to sell into — for tax reasons, or because selling and rebuying is impractical — a short derivative position offsets the fall.

## Why leverage is appropriate here

To hedge a position without leverage, you would post capital equal to what you are hedging. Leverage lets you post a fraction as margin, freeing the rest.

That is capital efficiency serving a defensive purpose, which is the honest use of the tool.

## The costs

Funding, if the side you need is the one paying. A hedge maintained for months through negative funding is expensive, and that cost must be compared against simply selling.

Margin management. Your hedge can be liquidated if it moves against you, which happens exactly when your underlying holding is doing well. Losing your hedge at the worst moment is a real failure mode and requires maintaining adequate margin.

Basis risk. The derivative may not track the underlying exactly.

Complexity, which has its own cost in attention and error.

## When it is worth it

When selling has a real cost — a tax event, a loss of a position you cannot re-establish, or a large size that would move the market.

When the exposure is temporary and identifiable — a specific event you want to be flat through.

When you can maintain the margin comfortably, meaning far more than the minimum.

## When it is not

When you could simply sell. Most of the time, for most people, selling is cheaper, simpler and carries no liquidation risk. A hedge is a complicated way to be flat.

If you find yourself hedging because you do not want to admit you want to be out, you have a decision problem rather than a hedging problem.

## The partial hedge

You do not have to hedge the whole position. Hedging half reduces exposure while retaining upside, costs half as much, and requires less margin.

For most people, a partial hedge maintained comfortably is better than a full hedge maintained tightly — because the tight one is the one that gets liquidated.

## The honest summary

Hedging is real and useful and narrower than it sounds. If you are reaching for it and cannot state precisely what risk you are offsetting and why selling is worse, you are probably speculating with defensive vocabulary.`,
          activity: {
            title: "Compare hedging against selling",
            prompt:
              "Take a real holding you have, or a hypothetical one. Work out what a 50% hedge would require: margin posted, funding cost per month at current rates, and the price at which the hedge would be liquidated. Then work out what simply selling half would cost — fees, and any tax consequence you know of. Write both, and state honestly which is better for your situation. For most people it is selling, and writing that down is the point.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on carrying costs. The theme is that a correct idea can lose money through costs alone, which is a failure mode that does not exist without leverage and long holds.`,
          quiz: {
            title: "Funding, basis and fees",
            passScore: 85,
            maxAttempts: 5,
            questions: [
              {
                prompt: "Funding on a perpetual contract is charged on what?",
                explanation:
                  "Position value, not your margin. At high leverage that is a large multiple of your capital, which is why a modest-sounding rate becomes a substantial cost against what you actually have.",
                options: [
                  { text: "Position value, which is a multiple of your capital under leverage", correct: true },
                  { text: "Your posted margin only", correct: false },
                  { text: "Your unrealised profit", correct: false },
                  { text: "A flat fee set by the exchange", correct: false },
                ],
              },
              {
                prompt: "What does persistently high positive funding indicate?",
                explanation:
                  "A crowded, leveraged long side paying to hold. It is genuine positioning information and often precedes long liquidation cascades — but it is not a timing signal, because crowded conditions persist far longer than people expect.",
                options: [
                  {
                    text: "A crowded leveraged long side — real positioning information, but not a timing signal",
                    correct: true,
                  },
                  { text: "That price will fall shortly", correct: false },
                  { text: "That the exchange has raised its fees", correct: false },
                  { text: "That the contract is trading below spot", correct: false },
                ],
              },
              {
                prompt:
                  "At 20x leverage with a 0.05% taker fee each way, what does one round trip cost against your capital?",
                explanation:
                  "About 2%. Fees are charged on position value, so 0.1% round trip on a position twenty times your capital is 2% of your capital. Ten such trades cost 20% before any market movement — which is why frequent leveraged trading fails on fees alone.",
                options: [
                  { text: "About 2% of your capital", correct: true },
                  { text: "About 0.1% of your capital", correct: false },
                  { text: "About 0.05% of your capital", correct: false },
                  { text: "It depends on whether the trade wins", correct: false },
                ],
              },
              {
                prompt: "When is a hedge genuinely better than simply selling?",
                explanation:
                  "When selling carries a real cost — a tax event, a position you could not re-establish, or size that would move the market. Most of the time, for most people, selling is cheaper, simpler and carries no liquidation risk.",
                options: [
                  {
                    text: "When selling triggers a tax event or loses a position you cannot rebuild",
                    correct: true,
                  },
                  { text: "Whenever you expect a decline", correct: false },
                  { text: "Whenever funding is positive", correct: false },
                  { text: "Whenever you are uncertain about direction", correct: false },
                ],
              },
              {
                prompt: "How can a correct directional call still lose money on a perpetual?",
                explanation:
                  "Funding and fees can exceed the gain, particularly on a long hold at leverage. Price reaching your target does not guarantee profit — the cost of carry has to be cleared first, and it should be calculated before entering.",
                options: [
                  {
                    text: "Funding and fees over the holding period exceed the move",
                    correct: true,
                  },
                  { text: "Perpetual contracts do not track the underlying at all", correct: false },
                  { text: "Profits on perpetuals are capped", correct: false },
                  { text: "It cannot — a correct call always profits", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Counterparty and platform risk",
      description:
        "The risks that are not market risks. Where your money actually is, and what happens when a venue fails.",
      lessons: [
        {
          title: "Your margin is not your money",
          type: "TEXT",
          points: 10,
          body: `Margin posted to a derivatives venue is a balance on their system. Understanding what that means changes how much you leave there.

## What you actually hold

A claim against the venue. They hold the assets, or say they do, and your balance is their record of what they owe you.

If they become insolvent, are hacked, freeze withdrawals, or simply refuse, you are a creditor. Creditors of failed exchanges have historically recovered a fraction, years later, if anything.

## The failures that have happened

Venues that used customer funds for their own trading and could not return them.

Venues that were hacked and could not cover the loss.

Venues that halted withdrawals during volatility, sometimes permanently.

Venues that restricted or seized accounts from certain jurisdictions with little notice.

This is not a historical curiosity. It has happened repeatedly, at scale, to platforms that appeared solid, and it will happen again to a platform that currently appears solid.

## The specific risk of derivatives venues

Higher than for spot exchanges, for concrete reasons. They are frequently less regulated. They deal in complex obligations whose value moves. They carry the risk of their own insurance fund being exhausted.

And they hold, by design, the margin of every user — which is a large pooled balance in one place.

## What to actually do

Keep on the venue only the margin required for open positions, plus a modest buffer. Not your capital. Not your savings.

Withdraw profits regularly rather than compounding them on the platform. Compounding on a venue is compounding your counterparty exposure alongside your returns.

Use more than one venue if your size justifies it, so a single failure is not total.

Prefer venues with a long record, meaningful regulation, published reserves, and a history of honouring withdrawals during stress. The last of those is the most informative and the least advertised.

## The realistic framing

You cannot eliminate this risk while trading derivatives. You can bound it, and the bound is entirely under your control.

The question to answer before every deposit: if this venue disappeared tomorrow with everything on it, what would that cost me and would I be all right? If the answer is not comfortable, the amount is wrong — regardless of how good the platform looks.`,
          activity: {
            title: "Bound your venue exposure",
            prompt:
              "Write down every derivatives or exchange platform holding value for you, with amounts. For each, answer: if this vanished tomorrow, would I be all right? Then calculate the total as a percentage of everything you hold. Set a maximum percentage you are willing to have on any single venue and a maximum across all of them, and write both numbers down. Then move whatever exceeds them this week and note what you moved.",
          },
        },
        {
          title: "Choosing a venue on things that matter",
          type: "TEXT",
          points: 10,
          body: `Most venue comparisons focus on fees and available leverage. Both are close to irrelevant next to whether the platform will still have your money next year.

## What actually matters

Solvency evidence. Proof-of-reserves attestations, ideally independently verified and covering liabilities as well as assets. Reserves alone prove nothing — a venue can show assets while owing more.

Behaviour under stress. Did they honour withdrawals during the last violent event? Did the platform stay up? Downtime during volatility is not a technical footnote; it means you could not manage a position at the moment it mattered.

Regulatory standing. Meaningful regulation in a jurisdiction with real enforcement. Note that registration in a permissive jurisdiction provides approximately nothing.

Insurance fund size and history, and whether auto-deleveraging has been triggered before.

Liquidity depth, which determines your fills at size and how bad a liquidation would be.

## What matters much less

Maximum leverage offered. High maximums signal a business model built on liquidations, not a superior product.

Small fee differences, which are dwarfed by the cost of a venue failure.

Interface quality. Nice, irrelevant to whether they hold your money.

Promotions and bonuses. These are customer acquisition costs, and a venue spending heavily on acquisition is telling you about its priorities.

## The red flags

No proof of reserves, or reserves without liabilities.

Withdrawal problems, even briefly, even explained. This is the single most predictive warning sign historically.

Very high leverage offered to new accounts with no experience gating.

Aggressive influencer marketing and referral programmes.

A team that cannot be identified.

Unusually generous yields on deposited balances, which means they are lending your collateral.

## The uncomfortable trade-off

The safest venues typically offer lower leverage, stricter verification and fewer features. The ones offering the most attractive terms are frequently the ones with the least to lose from failing.

That correlation is not accidental, and noticing it resolves most venue choices.

## The test

Before depositing: can I find independent evidence that this venue held up during the last major stress event, and can I find their reserves attestation? If not, deposit only what I would write off entirely.`,
          activity: {
            title: "Score your venue against the list",
            prompt:
              "Take the venue you use or would use and score it on each item that matters: reserves attestation covering liabilities, behaviour and uptime during the last violent market event, regulatory standing, insurance fund and deleveraging history, and liquidity depth. Find real evidence for each rather than relying on reputation. Then check it against every red flag. Write your conclusion and the maximum you are willing to hold there as a result.",
          },
        },
        {
          title: "Regulation, access and the rug beneath you",
          type: "TEXT",
          points: 10,
          body: `A risk that has nothing to do with markets or solvency: the rules change, and your access disappears.

## What happens

A regulator acts. A venue exits a jurisdiction. Accounts from certain countries are restricted. Products are withdrawn. Sometimes with notice, sometimes with days, occasionally immediately.

Traders have found themselves in reduce-only mode — able to close but not open — or unable to access an account at all, holding open positions.

## Why derivatives are particularly exposed

Leveraged retail derivatives are among the most heavily scrutinised products in finance, everywhere. Several jurisdictions have banned or severely capped retail leverage.

The trend is toward more restriction, not less. Planning as though current access is permanent is planning on an assumption that has repeatedly failed.

## Using a venue you are not eligible for

Some traders access venues that exclude their jurisdiction, by various means.

Be clear about what that means: you have no recourse. If the venue restricts you, seizes the balance, or refuses withdrawal, you cannot complain to anyone, because you were not supposed to be there. Venues have confiscated balances on exactly this basis, and the traders had no argument.

It may also be an offence where you live. That is a decision you make with full information rather than one to drift into.

## What to prepare

Do not hold size you cannot afford to have frozen.

Keep an alternative venue verified and funded, so a restriction is an inconvenience rather than a trap.

Withdraw profits regularly, which limits what any single event can hold.

Know what happens to open positions if access is restricted. Some venues force-close, some leave them, and the difference matters enormously if you are leveraged.

## The wider point

Your ability to do this at all is granted, and it can be withdrawn by parties who will not consult you.

Any plan that depends on continuous access to a specific platform is fragile in a way that has nothing to do with your analysis. Build for the version where access ends on a Tuesday.`,
          activity: {
            title: "Plan for losing access",
            prompt:
              "Write down what would happen if your primary venue restricted your account tomorrow with an open leveraged position. Would it be force-closed, left open, or would you be reduce-only? Find the actual answer in their documentation. Then write down whether you have a second verified venue, how much is currently exposed to the first, and what you would do in the first hour. If you have no alternative venue, write the date you will set one up.",
          },
        },
        {
          title: "Decentralised alternatives and their own risks",
          type: "TEXT",
          points: 10,
          body: `On-chain derivatives platforms remove some counterparty risk and introduce different risks. The honest comparison is not that one is safe and the other is not.

## What they change

You hold your own keys; collateral sits in a contract rather than with a company. Nobody can freeze your account or refuse a withdrawal by decision.

Rules are in code and can be inspected. Positions and liquidations are publicly verifiable.

There is generally no identity verification, and no jurisdiction restricting who may participate.

## What they do not remove

Smart contract risk. Code can be exploited, and on-chain derivatives protocols have been exploited for very large sums. A flaw is total and immediate, with no company to appeal to.

Oracle risk. The protocol needs a price feed to determine liquidations. Manipulate or break the feed and liquidations happen at wrong prices. This has been done deliberately, repeatedly, at scale.

Liquidity risk. Depth is typically thinner than on major centralised venues, meaning worse fills and worse liquidations.

Governance risk. Token holders can change parameters, including ones affecting your open position.

Your own key risk. Everything from the security course applies, and there is no support to recover anything.

## The honest comparison

Centralised: risk concentrated in a company that could fail, misuse funds, or restrict you — and a support function that can sometimes help.

Decentralised: risk concentrated in code and price feeds that could fail instantly and irreversibly — and nobody to help, ever.

Neither is safe. They are different failure modes, and which is preferable depends on what you can tolerate and monitor.

## The practical note

Costs on chain include gas, which can be significant during exactly the volatile periods when you need to act. A liquidation you could have prevented by adding margin, but could not because the network was congested and fees were extreme, is a genuine failure mode with no centralised equivalent.

## For most people

If you are using leverage at all, a major centralised venue with a long record is generally more practical for reasonable size, and you bound the counterparty risk by keeping little there.

On-chain alternatives are worth understanding, and worth using only if you genuinely understand contract and oracle risk — not as a way to avoid identity verification, which is the reason most people are actually there.`,
          activity: {
            title: "Compare the two honestly",
            prompt:
              "Pick one centralised and one on-chain derivatives venue. For each, write down the three most likely ways you could lose money that have nothing to do with your trade being wrong. Be specific: name the mechanism, not the category. Then write which set of risks you are better placed to monitor and tolerate, and why. Finally, state which you would use and the maximum you would hold there.",
          },
        },
        {
          title: "Assignment: venue and exposure review",
          type: "ASSIGNMENT",
          points: 25,
          body: `The second graded piece. It is about everything that can take your money while your analysis is entirely correct.`,
          assignment: {
            title: "Counterparty risk review",
            instructions: `Review the platform risk you are actually carrying. 600 to 900 words, evidenced from the venues' own documentation rather than reputation.

**1. Exposure map.** Every venue holding value for you, with amounts and percentages of your total. State your maximum acceptable exposure per venue and in total, and whether you currently breach either.

**2. Venue assessment.** For your primary venue: reserves attestation and whether it covers liabilities, behaviour and uptime during the last major stress event, regulatory standing, insurance fund size, and deleveraging history. Cite where you found each. Say plainly where you could not find something.

**3. Red flags.** Go through the warning list and state which apply to your venue. If none apply, say what you checked, because the absence has to be evidenced too.

**4. Access risk.** Your jurisdiction's standing with this venue, whether you are eligible, and what their documentation says happens to open positions if access is restricted. State whether you have a verified alternative.

**5. The failure walkthrough.** Your venue halts withdrawals tomorrow while you hold an open leveraged position. Walk through what happens: to the position, to your margin, to your other holdings, and to you financially. State whether that outcome is acceptable.

**6. Changes.** What you are changing as a result, with amounts and dates. If nothing changes, justify it against the numbers in section one.

No credentials, keys or account identifiers anywhere in this submission.`,
            maxScore: 100,
            passScore: 75,
            rubric: [
              {
                criterion: "Exposure is quantified with stated limits",
                weight: 20,
                descriptor:
                  "Real amounts and percentages per venue with explicit maximum limits, and an honest statement of any current breach.",
              },
              {
                criterion: "Venue assessment is evidenced, not assumed",
                weight: 25,
                descriptor:
                  "Each item sourced from documentation or public record with citation, including honest gaps. Reputation-based claims score low.",
              },
              {
                criterion: "Access and jurisdiction risk addressed",
                weight: 20,
                descriptor:
                  "Eligibility stated plainly, documented behaviour of open positions under restriction, and an alternative venue in place or dated.",
              },
              {
                criterion: "The failure walkthrough is concrete",
                weight: 25,
                descriptor:
                  "Traced to a real financial outcome for the writer, with a stated judgement on acceptability. A conclusion that it would be fine scores zero unless the exposure genuinely is trivial.",
              },
              {
                criterion: "Changes follow from the findings",
                weight: 10,
                descriptor:
                  "Specific amounts and dates, or a justification against the writer's own stated limits.",
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "The instruments",
      description:
        "Perpetuals, dated futures, options and margin borrowing. What each is actually for, and which risks each carries.",
      lessons: [
        {
          title: "Perpetuals versus dated futures",
          type: "TEXT",
          points: 10,
          body: `The two main futures instruments differ in ways that decide which is appropriate for a given purpose.

## Perpetuals

No expiry. Held indefinitely, tethered to spot by the funding mechanism.

Advantages: no rollover, deepest liquidity in crypto, available on every venue, and simple to reason about for short holds.

Disadvantages: funding is an open-ended cost with no known total. A position held for months accrues an amount you cannot calculate in advance, because the rate floats.

Best for: short to medium holds where funding is small and predictable, and for hedges you expect to remove soon.

## Dated futures

Expire on a set date and converge to spot at expiry.

Advantages: the cost is known at entry. The basis you pay or receive is fixed by the price you trade at, so the total carrying cost is determined rather than floating.

Disadvantages: less liquidity, wider spreads, and you must roll if you want exposure beyond expiry — which incurs cost and can be awkward if the curve has moved.

Best for: longer holds where cost certainty matters, and for basis strategies where the convergence is the point.

## The cost comparison

For a hold of days, perpetuals are usually cheaper and simpler.

For a hold of months, dated futures often win, because a known basis beats an unknown sequence of funding payments — particularly when funding is currently elevated, which is exactly when people want to hold.

Run the comparison rather than defaulting. The arithmetic is not difficult and the difference over months can be substantial.

## Settlement

Most crypto futures settle in cash rather than delivering the asset. You receive or pay the difference; nothing changes hands physically.

Some settle in the asset itself, which changes your collateral requirements and your exposure. Know which yours is before expiry, because discovering it at settlement is unpleasant.

## Inverse contracts

Some contracts are margined and settled in the asset rather than in a stablecoin. This means your collateral moves in value with the position, producing non-linear exposure that surprises people.

If you are long an inverse contract and price falls, your collateral is worth less at the same time your position is losing. The effects compound, and liquidation arrives sooner than a linear calculation suggests.

Unless you specifically want that behaviour, prefer linear contracts margined in a stablecoin. They behave the way your arithmetic assumes.

## The practical guidance

Perpetuals, linear, stablecoin-margined, for most purposes. Dated futures when the hold is long and cost certainty matters. Inverse contracts only if you have a specific reason and have done the non-linear arithmetic.`,
          activity: {
            title: "Compare the two on cost",
            prompt:
              "Take a market with both a perpetual and a dated future available. For a three-month hold, calculate: the cost of the perpetual assuming current funding persists, and the cost of the dated future from its current basis. Write both as a percentage of position value. Then write which is cheaper and by how much, and note what would have to happen to funding for the answer to flip.",
          },
        },
        {
          title: "Margin borrowing on spot",
          type: "TEXT",
          points: 10,
          body: `A different form of leverage, with a different risk profile, and frequently the more appropriate one.

## What it is

Borrowing against your holdings to buy more, or borrowing an asset to sell it short. You hold actual assets rather than a derivative contract.

## How it differs from futures

You own the asset. It can be withdrawn to your own wallet if the loan is repaid, which is not true of a futures position.

Interest is charged on the borrowed amount rather than funding on the full position, which is usually a smaller and more predictable cost.

Leverage available is typically much lower — often 3x to 5x rather than 100x. That constraint is a feature.

No auto-deleveraging. Your winning position cannot be taken to balance someone else's loss.

## The risks that remain

Liquidation still applies. If your collateral value falls below the maintenance requirement, positions are sold to repay the loan.

Counterparty risk is the same or worse, because your assets sit with the lender as collateral.

Rates can rise. Borrowing costs on some assets spike sharply during volatility, exactly when you are least able to close comfortably.

## Where it fits

For modest leverage on a longer hold, margin borrowing is often better than a perpetual. Lower cost, lower maximum leverage, no deleveraging risk, and you hold something real.

For short-term directional trades, perpetuals are usually more efficient and more liquid.

## Borrowing against holdings without selling

A common use: borrowing stablecoins against an asset you hold, to access cash without selling. This avoids a disposal and keeps your exposure.

The risk is straightforward and severe: if the asset falls, your collateral falls, and you face liquidation of the very holding you were trying to keep. People have lost long-term positions this way during ordinary drawdowns.

If you do this, borrow a small fraction of the collateral value — the sort of ratio where a 60% fall does not liquidate you. Crypto assets have fallen 60% more than once, and they will again.

## The honest note

Every form of this is leverage and every form carries liquidation risk. The differences are in cost, maximum multiple, and which additional risks apply.

Margin borrowing at low multiples on liquid assets is the most conservative form available, and for anyone who has concluded they want leverage but not much of it, it is usually the right instrument.`,
          activity: {
            title: "Stress-test a collateral loan",
            prompt:
              "Take a holding you have, or a hypothetical one. Work out how much you could borrow against it at your venue, and then calculate the liquidation price at three borrowing levels: 25%, 40% and 60% of collateral value. Write the percentage fall that liquidates you in each case. Then look up the largest drawdown that asset has had in the last three years and write whether each level would have survived it.",
          },
        },
        {
          title: "Options, briefly and honestly",
          type: "TEXT",
          points: 10,
          body: `Options are a large subject and this is not an options course. What follows is enough to know what they are and why the common retail use of them is a poor idea.

## What they are

A call gives the right, not the obligation, to buy at a set price by a set date. A put gives the right to sell. You pay a premium for that right.

The buyer's maximum loss is the premium. The seller's loss can be very large.

## The genuinely attractive property

Defined risk when buying. You cannot lose more than the premium, and there is no liquidation. That is a real advantage over futures, and it is why options are sometimes the correct tool for expressing a view on a large move.

## Why retail buyers usually lose anyway

Options decay. Every day that passes reduces the value of the option, all else equal. You are paying for time, and time runs out.

You must be right about direction, magnitude and timing. Futures require the first two. Options require all three, and the third is the one nobody is good at.

Implied volatility matters enormously. Buy an option when volatility is expensive — which is precisely when everyone wants one, after a large move — and you can be right about direction and still lose, because the volatility premium collapses.

Crypto options are less liquid, with wide spreads that consume a meaningful part of the expected value on entry and exit.

## Selling options

Collecting premium looks attractive: most options expire worthless, so selling appears to win most of the time.

The distribution is the problem. Many small gains and occasional very large losses. Sellers of uncovered options have been destroyed in single sessions, and crypto's volatility makes that outcome more likely rather than less.

Do not sell options uncovered. It is the one instruction in this lesson without qualification.

## The one clear use

Buying a put as insurance on a holding you intend to keep. Cost is known and capped, there is no liquidation risk, and the protection is genuine.

It is expensive, and expensive insurance is still insurance. If you hold something you cannot afford to see fall and cannot sell, this is what the instrument is for.

## The honest recommendation

For most people: do not trade options directionally. The three-variable problem and the volatility premium make it much harder than it appears, and the apparent advantage of defined risk is spent on the additional difficulty.

Understand them well enough to recognise when someone is selling you a strategy whose risk profile they have not explained.`,
          activity: {
            title: "Price the three-variable problem",
            prompt:
              "Find a real crypto option — any strike, any expiry. Write down the premium as a percentage of the underlying price. Then calculate: how far must price move, by expiry, simply for you to break even after that premium? Now write down what happens to your position if price moves that far but two weeks after expiry. That gap is the timing variable, and writing it down is the point of the exercise.",
          },
        },
        {
          title: "Choosing the right instrument for the job",
          type: "TEXT",
          points: 10,
          body: `A summary of the decision, because the instrument choice is made badly far more often than the direction call.

## Start with the purpose

Short-term directional view, days: perpetual, linear, stablecoin-margined, low multiple. Deepest liquidity, simplest arithmetic, funding negligible over the period.

Medium-term directional view, months: dated future for cost certainty, or margin borrowing at a low multiple. Both avoid an unbounded funding cost.

Access to cash without selling: margin borrowing against holdings, at a conservative ratio. Nothing else does this cleanly.

Protecting a holding you cannot sell: a put, accepting the premium as the cost of insurance. Or a partial futures hedge if the premium is unacceptable and you can maintain margin comfortably.

Being flat: sell. This is on the list because people reach for hedges when the answer is to sell, and a hedge is a complicated way to be flat.

## The questions that decide it

How long will I hold? Determines whether funding matters.

Do I need to keep the underlying? Determines whether a derivative or a sale is right.

Can I tolerate liquidation risk on this? If the answer is no, only bought options and outright sales qualify.

What is the total cost of carry over my expected hold? Calculate it for each candidate instrument before choosing.

## The default

If you cannot answer those clearly, the correct instrument is none of them. Uncertainty about the purpose is not resolved by picking a tool.

## What people actually do

Use whatever their venue defaults to, at whatever leverage the slider suggests, for whatever period the trade happens to last.

That is not a choice; it is an absence of one, and it explains a large share of outcomes that get attributed to bad luck.

## The instruction

Before every leveraged position, write the instrument and the reason it is the right one for this purpose and this holding period. One sentence.

If the sentence will not write, you have not decided how long you are holding — which means you also cannot calculate the cost, which means the position is not planned.`,
          activity: {
            title: "Match instruments to your real purposes",
            prompt:
              "List the three reasons you would actually use leverage — be specific about your own situation rather than listing possibilities. For each, work through the four deciding questions and name the correct instrument, with the total cost of carry calculated over your expected hold. Then compare against what you have actually been using. Write down any mismatch, and what you will use instead next time.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on instruments. The theme is that the instrument choice carries as much of the outcome as the directional call, and is made carelessly far more often.`,
          quiz: {
            title: "Instruments and their uses",
            passScore: 85,
            maxAttempts: 5,
            questions: [
              {
                prompt: "For a three-month directional hold, why might a dated future beat a perpetual?",
                explanation:
                  "Cost certainty. The basis is fixed at the price you trade, so the total carrying cost is known, whereas funding on a perpetual floats and accrues an amount you cannot calculate in advance — particularly punishing when funding is currently elevated.",
                options: [
                  {
                    text: "The carrying cost is known at entry, rather than floating with funding",
                    correct: true,
                  },
                  { text: "Dated futures have more liquidity", correct: false },
                  { text: "Dated futures cannot be liquidated", correct: false },
                  { text: "Dated futures offer higher leverage", correct: false },
                ],
              },
              {
                prompt: "What makes an inverse contract behave differently from a linear one?",
                explanation:
                  "Collateral is the asset itself, so its value moves with the position. Long an inverse contract into a fall means your collateral is worth less exactly as the position loses — the effects compound and liquidation arrives sooner than linear arithmetic suggests.",
                options: [
                  {
                    text: "Collateral is the asset, so its value falls alongside the position and liquidation comes sooner",
                    correct: true,
                  },
                  { text: "It has no funding rate", correct: false },
                  { text: "It cannot be shorted", correct: false },
                  { text: "It settles physically rather than in cash", correct: false },
                ],
              },
              {
                prompt: "What is the single unqualified instruction about options in this course?",
                explanation:
                  "Do not sell them uncovered. The distribution is many small gains and occasional very large losses, and crypto's volatility makes the large loss more likely. Sellers have been destroyed in single sessions.",
                options: [
                  { text: "Never sell options uncovered", correct: true },
                  { text: "Never buy options at all", correct: false },
                  { text: "Only trade options with under a week to expiry", correct: false },
                  { text: "Always buy calls rather than puts", correct: false },
                ],
              },
              {
                prompt:
                  "You borrow stablecoins against a long-term holding you do not want to sell. What is the main risk?",
                explanation:
                  "The holding is your collateral, so a fall triggers liquidation of the very position you were trying to keep. Crypto assets have fallen 60% more than once, so the borrowing ratio must survive that, not just a normal correction.",
                options: [
                  {
                    text: "A fall liquidates the holding you were trying to keep",
                    correct: true,
                  },
                  { text: "The interest rate is fixed and cannot be repaid early", correct: false },
                  { text: "Auto-deleveraging will close the loan", correct: false },
                  { text: "Funding rates apply to the borrowed amount", correct: false },
                ],
              },
              {
                prompt: "When is the correct instrument to be flat simply selling?",
                explanation:
                  "Almost always. A hedge is a complicated way to be flat, carrying funding, margin management and liquidation risk. Hedging is only better when selling has a real cost — a tax event, or a position you could not re-establish.",
                options: [
                  {
                    text: "Almost always, unless selling has a real cost you can name",
                    correct: true,
                  },
                  { text: "Only when you have no derivatives account", correct: false },
                  { text: "Only for small positions", correct: false },
                  { text: "Never — hedging is always more capital efficient", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Shorting",
      description:
        "The asymmetry of betting against something, why it is harder than it looks, and the specific ways short positions fail.",
      lessons: [
        {
          title: "The asymmetry nobody mentions",
          type: "TEXT",
          points: 10,
          body: `Shorting is not the mirror image of going long. The mathematics is genuinely asymmetric, and the asymmetry is against you.

## The bounded gain, unbounded loss

A long position can lose 100% and gain without limit. A short position can gain at most 100% — price cannot fall below zero — and can lose without limit.

Price doubling costs a short 100% of position value. Price going up tenfold costs 900%.

Under leverage, this means a short is liquidated by moves that a long would survive comfortably, because the losing direction is the unbounded one.

## Position size drifts against you

As a long position loses, it becomes a smaller share of your portfolio, so its influence shrinks. Losses are self-limiting in that sense.

As a short position loses, it becomes larger — you owe more — so its influence grows. Losses accelerate their own effect.

This is the deep reason shorting requires tighter management. The position works against you faster the more wrong you are.

## The drift

Over long periods, most markets rise. Being short means fighting that drift, so time works against you in a way it does not for a long.

You need to be right about timing as well as direction. A short that is correct eventually can be liquidated on the way to being correct, and being right afterwards is worth nothing.

## The squeeze

When a heavily shorted asset rises, shorts are forced to buy to close, which pushes it higher, which forces more closures. The move can be violent and far larger than any fundamental case would suggest.

Crowded shorts are therefore particularly dangerous, and funding data tells you when the short side is crowded — which is exactly the information the earlier module gave you.

## Where shorting is legitimate

As a hedge against something you hold. This is the main honest use.

As part of a market-neutral pair, where you are long one thing and short another and your exposure is to the relationship rather than the market.

As a directional trade on a specific, identifiable failure — with tight risk, small size, and a definite timeframe.

## Where it is not

As a general expression that things seem expensive. Things stay expensive for a long time and then get more expensive, and this position is the most reliably expensive opinion in finance.

## The practical implication

If you short with leverage, use less of it than you would for the equivalent long. The unbounded direction is the losing one, and the arithmetic that makes a long survivable does not transfer.`,
          activity: {
            title: "Work the asymmetry",
            prompt:
              "Calculate, for a short position: what percentage rise in price produces a 100% loss on unleveraged position value? What about at 3x, 5x and 10x leverage? Then find a historical instance of a crypto asset rising 3x within a month and write down which of those leverage levels would have been liquidated. Finally, write the maximum leverage you will use for a short, and note that it should be lower than your long maximum.",
          },
        },
        {
          title: "Market-neutral and pair positions",
          type: "TEXT",
          points: 10,
          body: `A use of leverage that does not depend on the market going anywhere, and therefore has a different risk profile worth understanding.

## The idea

Long one asset, short another, sized so that overall market exposure is close to zero. You profit from the relationship between them rather than from direction.

If both rise and your long rises more, you profit. If both fall and your short falls more, you profit. The market's direction has largely been removed.

## Why leverage is involved

Because the expected move in a relationship is smaller than the expected move in a market. To make the position meaningful, you need size, and size requires either capital or leverage.

This is a legitimate reason for capital efficiency, and it is one of the few places where leverage genuinely serves a purpose rather than amplifying a gamble.

## The risks that remain

The relationship can widen further before it converges — and there is no deadline by which it must converge.

Correlation can break entirely. Two assets that moved together for a year can decouple for a reason you did not anticipate, at which point you hold two directional positions rather than one neutral one.

Funding on both legs. You may pay on one and receive on the other, or pay on both. Calculate it; it can consume the expected return on a relationship trade, which is smaller to begin with.

Execution and rebalancing. As prices move, the position drifts away from neutral and needs adjusting, which costs fees each time.

## Why it is harder than it sounds

The move you are targeting is small, so costs matter proportionally more. Fees and funding that are negligible against a directional trade can eliminate the entire expected return here.

And the leverage needed to make a small edge meaningful reintroduces liquidation risk on both legs, which can trigger at different times.

## The honest assessment

Market-neutral positions are genuinely lower risk in market terms and genuinely not low risk overall. They replace directional risk with relationship risk, execution cost and complexity.

They are appropriate for someone with a specific, tested view about a relationship — not as a general way to trade without direction, which is how they are usually sold.

## The simplest version

Long an asset, short a broad market proxy against it, sized to neutralise beta. This expresses "this outperforms" rather than "this goes up", which is a narrower and often more defensible claim.

If you cannot state why the relationship should converge, and roughly when, you do not have a pair trade. You have two positions.`,
          activity: {
            title: "Construct one on paper",
            prompt:
              "Build a market-neutral pair on paper: pick two assets, state why you expect one to outperform, and size both legs so market exposure is near zero. Then calculate the total cost of carry — funding on both legs plus round-trip fees on both — over a one-month hold, as a percentage of capital. Compare that to the relationship move you are expecting. Write whether the trade survives its own costs.",
          },
        },
        {
          title: "How short positions actually fail",
          type: "TEXT",
          points: 10,
          body: `The specific failure modes, because they differ from long positions and catch people who are experienced on the long side.

## Being early

The most common. The thesis is correct and the timing is not. Price runs against you first, liquidates the position, and then does what you expected.

Being right later is worth nothing. This is why a short needs a defined timeframe and an invalidation that reflects it — a short with no time limit is a position with unbounded downside and unbounded duration.

## The squeeze

Crowded shorts force each other out. Funding turns sharply negative, meaning shorts are paying heavily, and the position becomes expensive at the same time it becomes dangerous.

Check funding before shorting. Heavily negative funding means the short side is crowded, which is the condition that produces squeezes.

## Borrow cost and availability

On spot margin, borrowing an asset to short has a cost, and that cost rises when many people want to short. It can rise dramatically.

Worse, the borrow can be recalled, forcing you to close at a moment you did not choose. This is less common on perpetuals, which is one reason they dominate.

## The unbounded liquidation

Covered already and worth restating in this context: a move that would be a survivable drawdown on a long is a liquidation on a short of the same leverage, because the adverse direction has no ceiling.

## Correlation during panic

In a market-wide fall, shorts work. In a market-wide rise, they do not, and crypto rises are frequently sharp and broad.

A portfolio of several shorts is one position, and it will be liquidated together.

## The psychological failure

Shorts are uncomfortable to hold. The position loses when the general mood is good, the market rises more often than it falls, and the loss grows as it goes against you.

This produces early exits on correct positions and stubborn holding on wrong ones, which is the opposite of what works.

## The rules that follow

Lower leverage than for longs. A defined timeframe with an exit if it has not worked. Funding checked before entry. Size that accounts for the unbounded direction.

And an honest question: is this a hedge, a tested relationship, or an opinion that things are expensive? Only the first two are trades.`,
          activity: {
            title: "Post-mortem a short",
            prompt:
              "Find a short position you took, or a well-known one that failed publicly. Work out which failure mode applied: early, squeezed, borrow cost, unbounded liquidation, correlation, or psychological. Then write what specific rule would have prevented it — a leverage limit, a time limit, a funding check, or a size adjustment. Then write your own short-specific rules: maximum leverage, maximum hold, and the funding condition that would stop you entering.",
          },
        },
        {
          title: "When being bearish is not a position",
          type: "TEXT",
          points: 10,
          body: `A distinction worth drawing carefully, because it accounts for a great deal of lost money among intelligent people.

## The confusion

Believing something is overvalued, or that a decline is coming, is a view. Being short is a position with a cost, a timeframe and a liquidation price.

The view can be correct and the position can still be a loss. Those are different things and people routinely conflate them.

## Why bearish views feel more rigorous

They usually come with analysis. Something looks overextended, the fundamentals do not support the price, the behaviour resembles previous tops.

That analysis can be entirely right, and markets can remain in that state for a very long time — long enough to liquidate anyone expressing it with leverage.

The intelligence of the analysis is not the constraint. The duration is.

## The alternatives to shorting

Hold cash or stablecoins. Being flat is a bearish position with no cost, no timeframe and no liquidation. It is the correct expression of most bearish views.

Reduce exposure. Selling part of a holding expresses caution proportionally, and costs nothing to maintain.

Buy protection. A put has a known cost and cannot be liquidated. Expensive, and bounded.

Wait. A bearish view with no time pressure does not need to be expressed at all until there is evidence.

## When a short is the right expression

When you have a specific catalyst with a date.

When you are hedging something you hold and cannot sell.

When you have a tested relationship view and are expressing it as a pair.

Notice that "I think this is too expensive" appears on neither list.

## The test

Before shorting, ask: could I express this by simply holding less, or holding cash? If yes, do that instead. It has no funding cost, no liquidation price and no time limit, and it captures most of the benefit if you are right.

## The general principle

The strength of a view does not determine the right instrument for it. Conviction and expression are separate decisions, and most bearish conviction is best expressed by owning less rather than by owning negative.

That sentence would have saved a great deal of money for a great many thoughtful people.`,
          activity: {
            title: "Re-express a bearish view",
            prompt:
              "Write down a bearish view you actually hold, or recently held, about any asset. Then express it four ways: as a leveraged short, as reduced exposure, as holding cash, and as bought protection. For each, write the cost of carrying it for three months and what happens if you are right but six months late. Then write which expression is actually correct for your view, and be honest if it is simply holding less.",
          },
        },
        {
          title: "Assignment: a short or a decision not to",
          type: "ASSIGNMENT",
          points: 25,
          body: `The third graded piece. It asks you to work through a bearish view properly, and a conclusion that the correct expression is holding cash receives full marks.`,
          assignment: {
            title: "Short position analysis",
            instructions: `Take one genuine bearish view and work it through. 600 to 900 words, arithmetic shown.

**1. The view.** What you think and why, stated as a falsifiable claim with a rough timeframe. "Overvalued" without a timeframe is not a claim.

**2. The four expressions.** Cost and consequence of expressing it as a leveraged short, as reduced exposure, as cash, and as bought protection. Include the three-month carrying cost of each and what happens if you are right six months late.

**3. If shorting: the asymmetry.** The percentage rise that liquidates you at your intended leverage. Compare it to the largest one-month rise this asset has had in three years. State your maximum short leverage and why it is lower than your long maximum.

**4. Funding and crowding.** Current funding rate and what it says about how crowded the short side is. State whether this is a squeeze risk and how it changes your sizing.

**5. The timeframe and its exit.** The date or condition at which you close whether or not it has worked. A short without one is a position with unbounded downside and unbounded duration.

**6. The decision.** Which expression you choose and why. Choosing cash or reduced exposure over a short, argued properly, is a full-marks answer — and is the correct answer for most bearish views.

**7. What would make you wrong.** Not the stop — the evidence that the underlying view was mistaken.`,
            maxScore: 100,
            passScore: 75,
            rubric: [
              {
                criterion: "The view is falsifiable and time-bounded",
                weight: 15,
                descriptor:
                  "A specific claim with a rough timeframe. A general statement that something is overvalued scores low.",
              },
              {
                criterion: "All four expressions are costed",
                weight: 25,
                descriptor:
                  "Three-month carrying cost and the six-months-late consequence for each. Full marks show cash and reduced exposure have no carrying cost and no liquidation.",
              },
              {
                criterion: "The asymmetry is calculated against real history",
                weight: 20,
                descriptor:
                  "Liquidating rise computed at the intended leverage and compared to an actual historical move, with a stated short-specific maximum lower than the long maximum.",
              },
              {
                criterion: "Crowding is checked and acted on",
                weight: 15,
                descriptor:
                  "Real funding data read as a positioning signal, with a stated effect on sizing rather than a note that it was checked.",
              },
              {
                criterion: "A time-based exit exists",
                weight: 15,
                descriptor:
                  "A date or condition at which the position closes regardless of outcome.",
              },
              {
                criterion: "The decision follows the analysis",
                weight: 10,
                descriptor:
                  "The chosen expression is justified by the preceding numbers. Choosing cash where the arithmetic supports it scores full marks.",
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "What leverage does to you",
      description:
        "The psychological half. Leverage changes the trader as reliably as it changes the position, and the changes are predictable.",
      lessons: [
        {
          title: "Why leveraged positions are harder to hold",
          type: "TEXT",
          points: 10,
          body: `The same idea, at the same risk, is dramatically harder to execute when leveraged. This is a real effect and it must be designed around rather than resisted.

## The mechanism

Unleveraged, a position moves in percentages that feel proportionate to the asset. Leveraged, the same movement appears as a large percentage of your margin.

A 2% move against a 10x position shows as 20% of your posted margin. Your risk may be entirely within your rule, and what you see is a number that reads as a serious loss.

You are reacting to a display, and the display is designed to be salient.

## What it produces

Exiting early. Positions closed while the idea is intact, because the unrealised number became uncomfortable.

Watching constantly. A leveraged position pulls attention in a way an unleveraged one does not, which increases interference and degrades everything else you were doing that day.

Interference. Moving stops, taking partial profit at random, adding — all decisions made because of a number on a screen rather than because anything changed.

## Sleep, and the continuous market

Crypto trades continuously. A leveraged position exists overnight, and liquidation can occur while you sleep.

The realistic consequences: worse sleep, checking the phone at night, and decisions made half-awake. All of these measurably degrade judgement, and they compound across days.

Any position you cannot sleep through is too large. That is a practical test, not a metaphor, and it is more reliable than any calculation.

## Designing around it

Size so the numbers are tolerable. If a normal fluctuation produces a figure that makes you act, the position is too large regardless of what your risk rule says.

Set orders and step away. Both protective and target orders placed at entry, then close the screen.

Use isolated margin, so the visible worst case is bounded and you know it.

Reduce leverage until you can hold. The leverage that lets you execute your plan is the correct leverage, and it is usually far lower than the maximum you could survive on paper.

## The test that settles it

Can you leave this position and sleep normally? If not, it is too large — irrespective of the arithmetic, because a position you cannot hold correctly is a position you will manage badly, and bad management costs more than lower leverage does.`,
          activity: {
            title: "Find the size you can sleep through",
            prompt:
              "Think about the largest leveraged position you have held, or would hold. Write down honestly: how often did you check it, did you sleep normally, and did you make any decision because of the displayed number rather than because something changed. Then work out the leverage at which you would genuinely stop checking. Write that number. It is your real maximum, and it is more useful than any figure this course could give you.",
          },
        },
        {
          title: "The tilt sequence",
          type: "TEXT",
          points: 10,
          body: `The predictable sequence by which leveraged traders destroy accounts. It is worth knowing in order, because recognising the step you are on is the only reliable exit.

## The sequence

A loss. Ordinary, within the rules, unremarkable in itself.

The urge to recover it now. Not eventually — now, on the next trade.

A larger position, justified by higher confidence, or by the reasoning that the previous idea is still valid.

A worse entry, taken because waiting for the proper setup feels intolerable.

Another loss, larger.

Higher leverage, because the account is smaller and the same recovery now needs more.

Liquidation.

Then, frequently, a deposit, and the sequence repeats from a lower base.

## Why it is so consistent

Loss aversion. Losses hurt disproportionately and produce urgency to eliminate them.

The sunk-cost reflex. Having lost, stopping feels like accepting the loss permanently, and continuing feels like the loss is still recoverable.

Leverage makes recovery seem plausible. Unleveraged, recovering a 30% loss obviously takes a long time. At 20x it looks like one good trade — which is precisely the illusion that completes the sequence.

## Recognising it

The tells: trading outside your plan, larger than usual size, an unfamiliar market, a shorter timeframe than you normally use, entries taken without a written note, and the specific thought that this trade will fix it.

If you notice any of these, you are already in the sequence. Noticing is the intervention.

## The mechanical defence

Rules set in advance, because judgement in the sequence is compromised by definition.

A daily loss limit that ends the day, without exception. Once reached, the platform is closed.

A mandatory pause after any loss, of a fixed length.

A maximum leverage that never rises, whatever the situation.

No deposits after a loss. Ever. Not that week.

Position size determined by a formula rather than by a feeling.

## Why rules rather than intention

Because the person who will be present in step three is not the person reading this now. Intentions formed calmly do not survive; rules that mechanically prevent an action do.

The best of these is the daily loss limit, because it terminates the sequence at step two, before anything expensive has happened.

## The honest note

Almost everyone who has traded leverage has been through some version of this. It is not evidence of a defective character; it is what the tool does to normal people.

The difference between traders who recover and traders who do not is not willpower. It is whether they had a rule that stopped them before step five.`,
          activity: {
            title: "Write the four rules and date them",
            prompt:
              "Write your four mechanical rules now: daily loss limit as a specific figure, mandatory pause length after a loss, maximum leverage that never rises, and a no-deposit-after-loss rule. Make each one checkable by a stranger. Then write down whether you have been through the tilt sequence before and at which step you have historically been caught. Date and sign the rules. A rule written calmly is the only kind that works later.",
          },
        },
        {
          title: "Winning, and why it is also dangerous",
          type: "TEXT",
          points: 10,
          body: `Losing streaks get all the attention. Winning streaks destroy more leveraged accounts, and they do it while everyone involved feels excellent.

## What a winning run does

Confidence rises faster than skill. A run of wins feels like evidence, and over small samples it is almost entirely variance.

Size creeps. Slightly larger positions, slightly more leverage, because the account is bigger and the recent evidence is good.

Rules loosen. A trade taken without a full note, a stop placed a little wider, a market outside the usual list. Each seems minor and each is a rule weakened.

Then a normal losing trade arrives, at the new larger size, into looser rules, and it does more damage than every winner contributed.

## The arithmetic that makes it worse

If size increased through the winning run, your losses are now sized to the peak and your gains were sized to the smaller account.

Eight wins at small size and one loss at large size is frequently negative. Traders in this situation are genuinely confused, because they were right most of the time.

## Why leverage accelerates it

The wins are larger, so confidence builds faster. The account grows quickly, so size increases quickly. And the loss, at the new size and leverage, can exceed everything gained in a single position.

Unleveraged, this pattern costs a portion of gains. Leveraged, it costs the account.

## The defence

Fixed fractional sizing, mechanically. Position size as a fixed percentage of current account, calculated rather than chosen. This grows size with the account slowly and automatically, which is the correct pace.

A maximum leverage that never rises regardless of results. Written down, unchanged.

Withdraw profits on a schedule. Money withdrawn cannot be given back to the market, and it converts a paper run into a realised one.

Review the process, not the result. After a winning run, the correct question is whether you followed the rules, not how much you made.

## The tell to watch for

The moment you think you have worked it out. That thought, specifically, arriving after a good run, is the most reliable warning available.

It has preceded the largest single-position losses of most experienced traders, and it feels exactly like insight.`,
          activity: {
            title: "Check whether your size crept",
            prompt:
              "Go through your record and find your best run of consecutive wins. Write down your position size and leverage at the start of it and at the end. Then find the first loss after that run and write its size relative to the average winner. Calculate whether the run plus that loss was net positive. Then write down your fixed sizing formula and your never-rising maximum leverage, and commit to calculating size rather than choosing it.",
          },
        },
        {
          title: "The social pressure around leverage",
          type: "TEXT",
          points: 10,
          body: `Leverage is not only a financial decision. It sits inside a culture, and that culture is engineered to increase it.

## What you see

Screenshots of large percentage gains, posted by people who do not post the losses. Selection at work: the one person in a thousand who took an enormous leveraged position and was right becomes visible, and the nine hundred and ninety-nine do not.

Groups where high leverage is normalised and caution is mocked.

Influencers with referral arrangements paying them a share of the fees you generate — meaning they are paid more when you trade more and larger, whether or not you profit.

Platforms whose interfaces make maximum leverage the prominent choice.

## The incentive structure

Almost everyone visible to you profits from you using more leverage and trading more frequently. Exchanges earn fees. Affiliates earn a share. Signal groups earn subscriptions.

Almost nobody visible to you profits from you being careful.

That asymmetry shapes everything you see, and it is worth restating whenever an argument for more leverage sounds compelling.

## The comparison trap

Someone posts a 400% gain. You are up 8% and feel inadequate.

You are not seeing their previous liquidations, their position size relative to their capital, or whether the screenshot is real. You are comparing your complete record against someone's best moment.

Your own record, honestly kept, is the only comparison that means anything.

## Being the person who is careful

It is socially costly in these spaces. Caution reads as timidity, and the person warning about leverage is boring next to the person posting gains.

Accept that. The people posting gains this month are frequently not present next year, and the correlation is not accidental.

## What to actually do

Follow people who post losses. Anyone who never does is either lying or not showing you their record.

Leave rooms where caution is mocked. That norm exists because someone profits from it.

Check whether anyone advising you has a referral arrangement. If they do, their advice is compromised whether or not they feel compromised.

Judge yourself against your own record, over a large sample, and nothing else.

## The line worth keeping

If everyone around you is using more leverage, that is information about the room, not about what you should do.`,
          activity: {
            title: "Audit your inputs",
            prompt:
              "List every source that influences your trading decisions — people, groups, channels. For each, answer: do they ever post losses, do they have a referral or affiliate arrangement with a venue, and does the room mock caution? Then write which ones you are leaving. Finally, write down the last time you increased leverage and whether anything in that list contributed to the decision. Most people find one did.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on the psychological material. Note that every correct answer here points to a mechanical rule rather than to better judgement — because judgement is exactly what these conditions remove.`,
          quiz: {
            title: "Behaviour under leverage",
            passScore: 85,
            maxAttempts: 5,
            questions: [
              {
                prompt: "What is the most reliable practical test that a leveraged position is too large?",
                explanation:
                  "Whether you can leave it and sleep normally. A position you cannot hold correctly will be managed badly, and bad management costs more than lower leverage does. It is a better test than any calculation.",
                options: [
                  { text: "You cannot leave it alone and sleep normally", correct: true },
                  { text: "It uses more than half your available margin", correct: false },
                  { text: "The leverage multiple exceeds 10x", correct: false },
                  { text: "It is your largest position ever", correct: false },
                ],
              },
              {
                prompt: "What is the best mechanical defence against the tilt sequence?",
                explanation:
                  "A daily loss limit that ends the day, because it terminates the sequence at step two — before larger size, worse entries and higher leverage have happened. Judgement in the sequence is compromised by definition, so the defence must be mechanical.",
                options: [
                  {
                    text: "A daily loss limit that ends trading, set in advance and never overridden",
                    correct: true,
                  },
                  { text: "Reviewing the losing trade carefully before the next one", correct: false },
                  { text: "Reducing size and continuing to trade", correct: false },
                  { text: "Switching to a market you know better", correct: false },
                ],
              },
              {
                prompt: "Why can a winning streak be more dangerous than a losing one under leverage?",
                explanation:
                  "Size and leverage creep upward while rules loosen, so the eventual normal loss lands at peak size against gains made at smaller size. Eight wins small and one loss large is frequently net negative — which is why the trader is confused despite being right most of the time.",
                options: [
                  {
                    text: "Size grows and rules loosen, so the eventual loss is sized to the peak",
                    correct: true,
                  },
                  { text: "Exchanges raise margin requirements after wins", correct: false },
                  { text: "Winning streaks attract auto-deleveraging", correct: false },
                  { text: "They are not — losing streaks are always worse", correct: false },
                ],
              },
              {
                prompt:
                  "Someone posts a 400% leveraged gain. What are you not seeing?",
                explanation:
                  "Their liquidations, their position size relative to capital, and whether it is real. You are comparing your complete record to someone's best moment, and the visible survivors are a selection from a much larger group.",
                options: [
                  {
                    text: "Their losses, their real position size, and whether the screenshot is genuine",
                    correct: true,
                  },
                  { text: "Their exact entry price", correct: false },
                  { text: "Which venue they used", correct: false },
                  { text: "Nothing — the gain speaks for itself", correct: false },
                ],
              },
              {
                prompt: "Why should position size be calculated rather than chosen?",
                explanation:
                  "Because a chosen size drifts with confidence — upward after wins, and upward again during tilt. A fixed fractional formula grows size with the account automatically and at the correct pace, removing the decision from a compromised decision-maker.",
                options: [
                  {
                    text: "A chosen size drifts with confidence, while a formula grows it at the correct pace",
                    correct: true,
                  },
                  { text: "Calculated sizes produce higher returns", correct: false },
                  { text: "Exchanges require a formula", correct: false },
                  { text: "It reduces trading fees", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Should you do this at all",
      description:
        "The module that argues against the course. An honest account, with numbers, of who benefits from leverage and who does not.",
      lessons: [
        {
          title: "What the data says about leveraged retail traders",
          type: "TEXT",
          points: 10,
          body: `Having taught the mechanics, the honest thing is to state what happens to people who use them.

## The published figures

In jurisdictions requiring disclosure, brokers offering leveraged retail products publish the percentage of client accounts that lose money. The figures cluster between 70 and 85%, consistently, across firms and years.

Those are regulated brokers with capped leverage — commonly 30x or less for retail. Crypto venues offering 100x are not required to publish, and there is no reason to expect better.

## What the losses look like

Not gradual. Studies of leveraged retail accounts find a pattern: a period of small results, then a large loss, then either departure or a deposit and repetition.

The median account life is short. The distribution of outcomes is heavily skewed — a small number of large winners, a large number of total losses.

## Why the losers are not incompetent

They are ordinary people, often with correct analysis. The losses come from sizing, from costs at frequency, and from the behavioural sequence in the previous module.

Being right about direction is not what separates the outcomes. That is the finding that matters, and it is why this course spent four modules on arithmetic and one on charts.

## The honest inference

If 70 to 85% of accounts lose at capped leverage, and you are considering uncapped leverage without institutional risk systems, the base rate applies to you unless you have specific evidence otherwise.

Believing you are in the minority is not evidence. Everyone in the majority believed it too — that belief is close to universal and therefore carries no information.

## What would constitute evidence

A large sample of your own trades — a hundred at minimum — with positive expectancy after all costs, executed with a followed process, across more than one market condition.

Not a good month. Not a memorable trade. A record.

Until you have that, you are running an experiment, and the correct size for an experiment is one where a negative result costs you very little.

## What this course has actually given you

The ability to run that experiment without being destroyed by it. Correct sizing, understood liquidation mechanics, bounded counterparty exposure, and mechanical rules against the predictable behavioural failures.

That is genuinely valuable and it is not the same as an edge. Nothing here provides an edge. It provides survival long enough to find out whether you have one.

## The next lesson makes the argument

Having stated the base rate, the following lesson argues that most readers should not use leverage at all, and does it with numbers rather than caution.`,
          activity: {
            title: "Apply the base rate to yourself",
            prompt:
              "Write down what specific evidence you have that you are in the 15 to 30% rather than the majority. Be strict: a good month is not evidence, a memorable trade is not evidence, and confidence is not evidence. If your honest answer is that you have no such evidence yet, write that plainly, and write what sample and result would constitute it — including the date by which you could realistically have it.",
          },
        },
        {
          title: "The case against leverage, made properly",
          type: "TEXT",
          points: 10,
          body: `The argument, stated as strongly as it can be, because it deserves to be heard at full strength rather than as a caveat.

## It does not increase expected return

Leverage multiplies both outcomes. If your expected return is positive, leverage multiplies it — and multiplies the variance, which increases the probability of reaching zero.

Reaching zero is absorbing. From zero, no expected return recovers anything. So a strategy with positive expectancy can still be a losing strategy at high leverage, purely because of the probability of ruin.

This is a mathematical result, not an opinion, and it is the whole argument in one paragraph.

## The costs are certain and the gains are not

Fees and funding are paid on every position regardless of outcome. Under leverage, both scale with position value, so both scale with your multiple.

You are certain to pay the costs and uncertain to receive the gains. Increasing leverage increases the certain part faster than it increases the expected part.

## It degrades the thing that actually matters

Consistency is the main determinant of trading outcomes, and leverage attacks consistency directly — through the psychological effects, the salience of the numbers, and the tilt sequence.

A trader with an edge and poor consistency does worse than one with less edge and total consistency. Leverage takes from the column that matters and adds to the column that does not.

## The alternative is genuinely good

Broad exposure, bought periodically, held for years, has produced substantial returns for people who did nothing else. No skill, no screen time, no liquidation risk, minimal cost.

For that to be worse than leveraged trading, your leveraged trading must beat it after costs, after tax where applicable, and after valuing your time. Most people never run that comparison, and the ones who do frequently stop.

## The time cost

Leveraged trading takes attention continuously, in a continuous market. That attention has alternative uses — earning more, building something, developing a skill with a more reliable payoff.

For most people, the income lever is far larger than the trading lever, and it is more certain. Time spent on the smaller, less certain lever is a real cost that never appears in a profit figure.

## The narrow legitimate case

Someone with a demonstrated edge over a large sample, who needs capital efficiency for a specific reason, with institutional-grade risk discipline, using modest multiples.

That is a real person and they are rare. If you cannot honestly place yourself in that description, the argument above applies to you.

## What to do with this

Not necessarily stop. But size as though the argument is correct, because the cost of being wrong about having an edge is total, and the cost of being conservative while having one is merely slower.

That asymmetry should decide it.`,
          activity: {
            title: "Argue the other side",
            prompt:
              "Write the strongest case you can for why you specifically should use leverage — and it must survive the arguments in this lesson rather than ignore them. Address the ruin probability, the certain costs, the consistency effect, and the comparison against simply holding broad exposure including your time. Then read what you wrote and mark honestly whether it is an argument or a rationalisation. Most people can tell, once it is on the page.",
          },
        },
        {
          title: "If you proceed: the conditions",
          type: "TEXT",
          points: 10,
          body: `For those who will use leverage anyway — which is most people who take this course — here is the minimum set of conditions.

## Before you start

A hundred trades of record without leverage, showing positive expectancy after costs and a followed process. Without this you do not know whether you have an edge, and leverage on no edge is a faster route to the same place.

Money you can lose entirely without changing your life. Not "would prefer not to lose". Entirely.

Your mechanical rules written and dated: daily loss limit, post-loss pause, maximum leverage that never rises, no deposits after losses.

An understanding of your venue's liquidation, insurance and deleveraging mechanics, from their documentation.

## The limits

Maximum 1% of account risk per position, calculated from invalidation distance. Unchanged by conviction.

Maximum total risk across correlated positions of 3%. Remember that most crypto positions are correlated, so this binds sooner than it appears.

Leverage no higher than the level at which your structural stop sits at least twice as far inside the liquidation price as the entry-to-stop distance. In practice this is usually under 5x, and frequently under 3x.

Isolated margin, always, while learning.

Never add margin to a losing position.

Never widen a stop.

## The practices

Write the note before entering. Every time.

Place protective orders with the entry, then step away.

Check the liquidation price after every funding period on any held position.

Withdraw profits on a schedule.

Record every trade, including the ones you are ashamed of.

## The review

Every hundred trades: expectancy after all costs, deviation rate, and the comparison against simply holding broad exposure over the same period.

If expectancy is negative after two hundred trades, stop. Not adjust — stop. You have run the experiment and it returned a result.

## The stopping rule

Write it now, calmly: the drawdown or the sample-and-expectancy combination at which you stop entirely, and what you will do instead.

Rules written in advance are the only kind that survive the moment they apply. This is the last thing this course asks of you and the most important.

## What success looks like

Not a large gain. Being here in two years, with a record, still following the rules, having found out honestly whether you have an edge.

Most people who use leverage are not here in two years. That is the bar, and it is lower and harder than it sounds.`,
          activity: {
            title: "Check yourself against every condition",
            prompt:
              "Go through the before-you-start list and the limits, item by item, and write yes or no against each honestly. Count the noes. For every no, write what you will do and by when — or write that you will not proceed until it is a yes. Then write your stopping rule as a dated, signed sentence, including what you will do with the time and money instead. If more than two items are no, the honest conclusion is that you are not ready, and writing that down is a pass on this exercise, not a failure.",
          },
        },
        {
          title: "What you can now do",
          type: "TEXT",
          points: 10,
          body: `A final accounting, in the register this course has kept throughout.

## What you can do

Calculate the arithmetic of leverage instantly: what move is a total loss, what gain recovers a loss, what a sequence of losses compounds to.

Calculate a liquidation price including maintenance margin, and know that it drifts against you with funding and fees.

Size a position from risk and invalidation distance, and treat leverage as the last number you consider rather than the first.

Explain insurance funds and auto-deleveraging, and know that a winning position can be taken from you.

Account for funding as a real cost, and calculate the break-even move on a held position.

Assess a venue on solvency evidence and behaviour under stress rather than on fees and maximum leverage.

Recognise the tilt sequence by the step you are on, and defend against it mechanically rather than by intention.

## What you know that most leveraged traders do not

That leverage multiples describe size, not risk. That liquidation arrives before your naive calculation says. That the platform's maximum is a marketing figure. That fees at leverage and frequency can exceed any realistic edge. That winning streaks destroy more accounts than losing ones. That between 70 and 85% of leveraged retail accounts lose, at multiples far lower than crypto venues offer.

## What none of it gives you

An edge. Nothing in this course provides one. It provides the ability to survive long enough to find out whether you have one, which is a different and smaller thing.

## The sentence to keep

Leverage does not increase your expected return. It increases the variance around it and the probability of reaching zero, from which nothing recovers you.

## And the honest hope

That some readers finish this course and decide not to use leverage at all. That outcome is a success for this course, not a failure of it — and it is the outcome that would leave the most of you better off.

For those who proceed: small, recorded, mechanical, and reviewed. Be here in two years.`,
          activity: {
            title: "Answer your own opening",
            prompt:
              "Go back to the first lesson, where you wrote whether you had done a sizing course, whether this was money you need, whether you were trying to recover a loss, and your largest loss so far. Read it. Now write your decision: will you use leverage, at what maximum multiple, with what account, under which stopping rule — or will you not. Write it as a decision rather than an intention, with a date. Then write the one sentence from this course you most need to remember.",
          },
        },
        {
          title: "Capstone: your leverage policy",
          type: "ASSIGNMENT",
          points: 40,
          body: `The final piece. It is a policy document rather than a plan — the rules you will operate under, written calmly, precise enough to be checked by someone else.

A submission concluding "I will not use leverage", properly argued with the arithmetic, receives full marks. That is a legitimate and often correct conclusion, and this assignment is designed to make it available.`,
          assignment: {
            title: "Your leverage policy",
            instructions: `Write your policy as a single document, 900 to 1,400 words. All arithmetic shown. No credentials or account identifiers.

**1. The decision.** Whether you will use leverage, argued against the case in module five — ruin probability, certain costs, the consistency effect, and the comparison against holding broad exposure including your time. A well-argued decision not to proceed is a full-marks answer; an unargued decision either way is not.

**2. Evidence.** What you actually know about your own trading: number of recorded trades, expectancy after costs, deviation rate, and how it compares to simply holding. If you have no data, say so plainly and state when you will.

**3. Limits.** Maximum risk per position, maximum total risk across correlated positions, and your maximum leverage — derived from the requirement that your structural stop sits at least twice as far inside liquidation as the entry-to-stop distance. Show the derivation on a real example.

**4. Mechanics.** Isolated or cross and why, your no-adding-margin rule, your no-widening rule, and how you will check liquidation drift on held positions.

**5. Cost model.** Round-trip fees at your leverage, expected funding for your hold time, and the resulting break-even move. State whether your average expected gain clears it.

**6. Venue policy.** Maximum exposure per venue and in total, your assessment of your primary venue, and your alternative.

**7. Behavioural rules.** Daily loss limit, post-loss pause, no-deposit rule, and the calculated sizing formula. Each phrased so a third party could judge whether you had broken it.

**8. Review and stopping rule.** What you calculate every hundred trades, and the specific drawdown or expectancy result at which you stop entirely — plus what you will do with the time and money instead.

**9. What will break this.** The condition under which this policy fails you. A document claiming nothing will scores zero on that criterion.`,
            maxScore: 100,
            passScore: 75,
            rubric: [
              {
                criterion: "The decision engages the argument against",
                weight: 20,
                descriptor:
                  "Addresses ruin probability, certain costs, consistency and the do-nothing comparison including time. A reasoned decision not to proceed scores full marks; an unargued decision either way scores low.",
              },
              {
                criterion: "Evidence is reported honestly",
                weight: 15,
                descriptor:
                  "Real numbers where they exist, a plain admission and a date where they do not. Confidence presented as evidence scores zero here.",
              },
              {
                criterion: "Limits are derived, with working shown",
                weight: 25,
                descriptor:
                  "Maximum leverage derived from the stop-inside-liquidation requirement on a real example, with correlated-position risk accounted for. Full marks arrive at a low multiple because the arithmetic requires it.",
              },
              {
                criterion: "Cost model is complete",
                weight: 15,
                descriptor:
                  "Fees at leverage plus funding for the hold period, producing a break-even move compared honestly against expected gain.",
              },
              {
                criterion: "Behavioural rules are mechanical and checkable",
                weight: 15,
                descriptor:
                  "Specific figures and durations that a third party could audit. Resolutions to be disciplined score zero.",
              },
              {
                criterion: "The failure condition is named",
                weight: 10,
                descriptor:
                  "A specific circumstance under which the policy fails the writer, with a response. Claiming none scores zero here.",
              },
            ],
          },
        },
      ],
    },
  ],
};
