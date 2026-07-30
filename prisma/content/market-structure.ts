import type { ContentCourse } from "./types";

/**
 * Reading the Market — charts and structure, taught defensively.
 *
 * The hardest editorial problem in the catalogue. Technical analysis attracts
 * more nonsense than any other subject in finance, and a course that teaches
 * patterns without teaching their base rates produces confident losers.
 *
 * The approach here: teach what a chart actually is (a record of transactions,
 * nothing more), teach structure rather than patterns, and be relentless about
 * the difference between a description and a prediction. Every module states
 * what the tool cannot do. The final module is explicitly about the limits of
 * the whole discipline, which is unusual and is the point.
 *
 * Sits after risk-first-trading in the intended order: position sizing before
 * entries, always. A student who arrives here without that course will be told
 * so in lesson one.
 */
export const marketStructure: ContentCourse = {
  slug: "market-structure",
  title: "Reading the Market: Structure, Trend and Timeframes",
  subtitle:
    "What a chart can honestly tell you and what it cannot. Structure over patterns, evidence over prediction, and the discipline to act on neither too quickly.",
  description: `Technical analysis attracts more confident nonsense than any other corner of finance. Patterns get named, examples get cherry-picked, and nobody publishes the count of times the pattern appeared and nothing happened. The result is a field where people become fluent without becoming accurate.

This course teaches the honest version. A chart is a record of transactions — where buyers and sellers agreed, in what size, and how quickly. That record contains real information about supply and demand, and it contains a great deal of noise, and the skill is telling them apart.

You will learn market structure: how trends are actually defined, how ranges behave, where liquidity sits and why price returns to it. You will learn timeframes, and why a signal on one is irrelevant on another. You will learn the handful of tools that survive scrutiny and why the rest do not.

You will also learn what none of it can do. It cannot predict. It cannot tell you what happens next. What it can do is describe the current state of a market, tell you where your idea is wrong, and let you construct a position where being wrong is cheap. That is a smaller claim than most trading education makes, and it is the one that survives contact with a real account.

Take Risk-First Trading before this one. Entries without position sizing is the exact order in which people lose money.`,
  categorySlug: "trading-and-risk",
  level: "INTERMEDIATE",
  priceMinor: 0,
  estimatedHours: 18,
  passThreshold: 80,
  instructorEmail: "daniel@mabyacademy.com",
  outcomes: [
    "Read a chart as a record of transactions rather than a set of predictive shapes",
    "Define trend, range and transition structurally instead of by eye",
    "Identify where liquidity sits and explain why price is drawn back to it",
    "Use multiple timeframes without contradicting yourself between them",
    "Judge the handful of indicators that survive scrutiny, and drop the rest",
    "State in advance the price at which an idea is wrong, before entering",
    "Distinguish a description of the present from a prediction of the future",
    "Keep a trade journal that produces evidence about your own accuracy",
  ],
  modules: [
    // =====================================================================
    {
      title: "What a chart actually is",
      description:
        "Before any pattern: what the data represents, what it omits, and why most of what people read into it is not there.",
      lessons: [
        {
          title: "Start here, or you will lose money faster",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `A warning before anything else, and it is not a formality.

## Do the risk course first

If you have not taken Risk-First Trading, stop and take it. Learning entries before position sizing is the precise order in which people destroy accounts, and it is the order almost all trading education uses because entries are exciting and sizing is not.

The reason is arithmetic. A trader who is right 60% of the time and sizes badly goes broke. A trader who is right 40% of the time and sizes well does not. Accuracy is the smaller variable, and this course is about accuracy.

If you build accuracy on top of bad sizing, you will get better at picking directions and still lose everything, and you will not understand why.

## What this course claims

That a chart is a record of transactions, and that record contains real information about where supply and demand met.

That market structure — how price moves between areas of interest — can be described objectively rather than felt.

That knowing the current structure lets you construct positions where being wrong is cheap and identifiable in advance.

## What it does not claim

That any of it predicts the future. It does not. Nothing does.

That patterns have reliable success rates. Most published pattern statistics are unfalsifiable, because the pattern is identified after the outcome is known.

That you will become profitable by finishing it. Most people who trade lose money, and no course changes that on its own.

## Why bother, then

Because the alternative to a rigorous framework is not neutrality — it is an unexamined framework. Everyone who looks at a chart forms an opinion. The only choice is whether that opinion is disciplined, stated in advance, and testable, or vague and revised after the fact.

This course is about making it the first kind. The main deliverable is not a set of setups. It is the habit of writing down what you think, why, and what would prove you wrong, before you have any money at stake.

## The standard for the whole course

For every tool you meet, ask: what would this look like if it did not work? If you cannot answer, you are not using a tool, you are holding a belief.`,
          activity: {
            title: "Write your honest starting position",
            prompt:
              "Before any of this, write down three things honestly. First, whether you have completed a risk and position-sizing course, and if not, when you will. Second, what you currently believe a chart can tell you — write it plainly, even if you suspect it is wrong. Third, your actual trading record so far if you have one: how many trades, and are you up or down overall. You will compare against this at the end, and the value of that comparison depends entirely on being honest now.",
          },
        },
        {
          title: "What the candles actually record",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `A candlestick looks like it means something. Most of what people believe it means is not in the data.

## What is actually there

For a given period, four numbers: the first trade price, the last, the highest, and the lowest. Plus volume — how much changed hands.

That is the whole record. Everything else is interpretation.

## What it genuinely tells you

Where transactions occurred. Every price on the chart is a price at which a buyer and a seller agreed. That is real information about where the market found agreement.

How much agreement there was. Volume tells you how much changed hands. A move on heavy volume involved many participants; the same move on thin volume involved few.

How fast it happened. A large range in one period means price moved a long way quickly — participants were willing to transact at rapidly changing prices, which means something changed.

## What it does not tell you

Who traded. A retail buyer and a fund rebalancing look identical.

Why. The chart cannot distinguish a forced liquidation from a considered purchase, and those have opposite implications for what comes next.

The order within the period. A candle that opened low and closed high could have gone up steadily or fallen hard and recovered. Same candle, different meaning, and the chart does not say which.

What happens next. Nothing in the record is about the future.

## Why single candles are weak evidence

Whole vocabularies exist for individual candle shapes. Treat them cautiously. A single period on one timeframe is a tiny sample, the shape depends entirely on where the period boundaries fall, and the same price action produces different candles on different timeframes.

Shift your chart's period boundary by fifteen minutes and your beautiful reversal candle disappears. A signal that depends on an arbitrary clock is not a signal.

## What is stronger

Structure across many periods. Where price has repeatedly turned. Where volume concentrated. How far moves run before they stall. These are aggregates, less sensitive to arbitrary boundaries, and they are what the rest of this course is about.

## The habit

When you look at a chart, name what is actually recorded — where transactions happened, in what size, how fast — before you name what you think it means. Most bad reading comes from skipping straight to meaning.`,
          activity: {
            title: "Describe without interpreting",
            prompt:
              "Open any chart. Write ten sentences describing only what is recorded: where price traded, where volume was heavy or light, how far moves ran before stalling, where price repeatedly turned. You are banned from using any word that implies intention or prediction — no 'wants to', no 'is trying to', no 'will'. This is harder than it sounds, and noticing how often you reach for those words is the point of the exercise.",
          },
        },
        {
          title: "Price is made by orders, not by shapes",
          type: "TEXT",
          points: 10,
          body: `Understanding what physically moves price makes most chart mysticism dissolve, and it is the foundation for everything structural.

## The mechanism

Price moves because someone crosses the spread. Buyers willing to pay the asking price consume the sell orders sitting there; when those are exhausted, the next lowest ask becomes the price. That is the whole mechanism.

Price rises because buying demand exceeds the sell orders available at that level. It falls for the mirror reason. There is nothing else.

## Why this reframes everything

A "support level" is not a magic line. It is a price at which enough resting buy interest exists to absorb selling. It holds while those orders are there and fails when they are consumed.

A "breakout" is not a shape completing. It is the exhaustion of the orders that were holding a level, after which price moves quickly because there is little left to absorb it until the next area of interest.

A "level" matters because participants remember it and place orders around it, not because the number itself has any property.

## Liquidity is the useful concept

Liquidity is resting orders — the depth available to transact against. Where it is thick, price moves slowly and struggles to pass. Where it is thin, price travels fast.

This explains the most common observation in trading: price grinds through some areas and rips through others. It is not sentiment. It is depth.

## Why price returns to certain areas

Large participants cannot fill big orders in thin markets without moving price against themselves. They need depth, and depth exists where many orders cluster — around obvious levels, previous highs and lows, and round numbers.

So price is repeatedly drawn back to these areas. Not because of a pattern, but because that is where the transactions can actually happen at size.

Once you see this, a great deal of chart behaviour becomes mundane rather than mysterious.

## Where stops sit, and why it matters

Most traders place protective stops just beyond obvious levels. That creates a cluster of orders at a predictable place — and those orders are liquidity.

Price frequently moves just past an obvious high or low, triggers those orders, and reverses. This is often described as manipulation. It is more simply the market going where the orders are, because that is where a large participant can transact.

The practical lesson is not to be angry about it. It is to stop placing your stop at the most obvious price on the chart, along with everyone else.

## What this gives you

A physical explanation rather than a mystical one. Every structural idea in this course reduces to where orders are and are not, and you can always fall back to that question when something looks strange.`,
          activity: {
            title: "Find the liquidity on a real chart",
            prompt:
              "Open a chart you follow. Mark three areas where price has repeatedly turned, and three areas price has travelled through quickly with little hesitation. Then, for each of the three turning areas, write down where the obvious stop-loss placement would be for someone trading that level — the price just beyond it. Now look at whether price has ever traded to exactly that area and reversed. Write down what you find.",
          },
        },
        {
          title: "The timeframe problem",
          type: "TEXT",
          points: 10,
          body: `The same market looks bullish on one timeframe and bearish on another, simultaneously, and both readings are correct. Understanding why prevents the most common form of self-contradiction in trading.

## Why they disagree

Each timeframe aggregates differently. An hourly chart shows a downward move that on a weekly chart is one small pullback inside a rising trend. Neither is wrong; they are describing different scales of the same data.

The mistake is treating them as competing opinions to be resolved. They are not opinions. They are measurements at different resolutions.

## The self-contradiction that costs money

The classic sequence: form a view on a higher timeframe, enter, then watch a lower timeframe, panic at noise that is invisible on the timeframe your idea was based on, and exit.

The idea was never wrong. The trader simply changed instruments mid-measurement.

The fix is stating your timeframe before you enter and then managing on it, not on whichever chart is currently frightening you.

## A workable hierarchy

Higher timeframe for context. What is the overall structure — trending, ranging, transitioning? Where are the major areas of interest? This sets what kind of trade makes sense.

Trading timeframe for the decision. This is where the idea is defined, where the invalidation lives, and where the trade is managed. State it before entering.

Lower timeframe for execution only. Finding a tighter entry. Never for deciding whether the idea is still valid — that decision belongs to the timeframe it was made on.

## The common ratio

Roughly four to six times between levels. Daily for context, hourly to trade, five to fifteen minutes to execute. The exact numbers matter less than the separation being real; two adjacent timeframes tell you almost the same thing twice and give a false sense of confirmation.

## Alignment is not required, but it changes the trade

When timeframes agree, moves tend to run further with less resistance. When they conflict — a lower-timeframe long against a higher-timeframe downtrend — the trade can still work, but it is a counter-trend trade and should be sized and targeted as one.

The error is taking a counter-trend trade while believing it is a trend trade. Knowing which you are in is most of the discipline.

## The rule

Write your timeframe down before you enter. Manage the position on that timeframe. Look at lower ones only to execute, never to reconsider.

Almost every "I got stopped out and then it went my way" story is this rule being broken.`,
          activity: {
            title: "Read one market at three resolutions",
            prompt:
              "Pick one market. Write a structural description at three separated timeframes — say daily, hourly, and fifteen minute. For each, state whether it is trending, ranging or transitioning, and where the nearest significant levels are. Then write the sentence: if I traded this, my timeframe would be ___, my context timeframe is ___, and my idea would be invalid at ___. Notice where the three descriptions disagree, and write which one you would actually be trading.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on the foundations. These four ideas — what is recorded, what moves price, where liquidity sits, and how timeframes relate — carry everything after them. Structure is meaningless without them.`,
          quiz: {
            title: "What a chart is",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "What does a single candlestick actually record?",
                explanation:
                  "Four prices and a volume for an arbitrary period. It does not record who traded, why, or the order in which price moved within the period — which is why a candle that opened low and closed high could have risen steadily or crashed and recovered.",
                options: [
                  {
                    text: "First, last, highest and lowest traded price for a period, plus volume",
                    correct: true,
                  },
                  { text: "The balance of buyers against sellers", correct: false },
                  { text: "Market sentiment for that period", correct: false },
                  { text: "The order in which price moved through the period", correct: false },
                ],
              },
              {
                prompt: "Why is a single candle shape weak evidence?",
                explanation:
                  "Its shape depends on where the arbitrary period boundary falls. Shift the chart's boundary and the pattern disappears — and a signal that depends on an arbitrary clock is not a signal.",
                options: [
                  {
                    text: "Its shape depends on arbitrary period boundaries and changes if you shift them",
                    correct: true,
                  },
                  { text: "Because candles are a modern invention", correct: false },
                  { text: "Because volume is not shown on candles", correct: false },
                  { text: "Because it only works on daily charts", correct: false },
                ],
              },
              {
                prompt: "Why does price frequently move just past an obvious high and then reverse?",
                explanation:
                  "Protective stops cluster just beyond obvious levels, and those stops are resting orders — liquidity. Large participants need depth to fill size, so price goes where the orders are. It is mechanical, not malicious.",
                options: [
                  {
                    text: "Stops cluster there, and that liquidity is where large orders can actually be filled",
                    correct: true,
                  },
                  { text: "Market makers are manipulating retail traders personally", correct: false },
                  { text: "It is a random coincidence with no cause", correct: false },
                  { text: "Because the level itself has mathematical significance", correct: false },
                ],
              },
              {
                prompt: "You entered on an hourly idea and a five-minute chart now looks frightening. What do you do?",
                explanation:
                  "Manage on the timeframe the idea was made on. Reconsidering on a lower timeframe means changing instruments mid-measurement — the idea was never invalidated, only the resolution changed. This is the single most common way traders exit good positions.",
                options: [
                  {
                    text: "Manage on the hourly, since that is the timeframe the idea and its invalidation live on",
                    correct: true,
                  },
                  { text: "Exit, since the lower timeframe is more current", correct: false },
                  { text: "Move the stop to the five-minute structure", correct: false },
                  { text: "Add to the position to average in", correct: false },
                ],
              },
              {
                prompt: "What physically causes price to rise?",
                explanation:
                  "Buyers crossing the spread consume the resting sell orders at that level; when those are exhausted, the next higher ask becomes the price. Support, breakouts and levels are all descriptions of this one mechanism.",
                options: [
                  {
                    text: "Buying demand consuming the sell orders resting at that level",
                    correct: true,
                  },
                  { text: "A pattern completing on the chart", correct: false },
                  { text: "Positive sentiment among participants", correct: false },
                  { text: "More buyers than sellers existing", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Structure: trend, range, transition",
      description:
        "Defining what a market is doing objectively, so that two people looking at the same chart reach the same description.",
      lessons: [
        {
          title: "Defining a trend so it can be falsified",
          type: "TEXT",
          points: 10,
          body: `Everyone knows what a trend is until asked to define one precisely enough that it can be wrong. That definition is the whole value.

## The structural definition

An uptrend is a sequence of higher swing highs and higher swing lows. A downtrend is lower highs and lower lows.

That is it. It is objective. Two people applying it to the same chart with the same swing definition get the same answer.

## Defining a swing

A swing high is a peak with lower highs on both sides, within some lookback. A swing low is the mirror. Choose a lookback — say three or five periods each side — and apply it consistently.

The lookback choice is arbitrary, and it matters less than being consistent. Changing your definition mid-analysis to make a chart say what you want is the most common self-deception in this field, and it is invisible unless you have written the rule down.

## What breaks a trend

An uptrend is intact while each pullback stops above the previous swing low and each rally exceeds the previous high. It is broken when price makes a lower low.

That is a falsifiable statement. Before entering, you can say: this trend is intact until price trades below X. That single sentence is more useful than any pattern in this course.

## Why this matters more than it sounds

Because it converts an opinion into a testable claim with a price attached. "I think it is going up" is unfalsifiable and unmanageable. "This uptrend is intact above 42,300" tells you your invalidation, your risk, and therefore your position size.

Everything downstream — sizing, stops, targets — depends on having a price at which you are wrong. Structure gives you that price for free.

## A break is not a reversal

Price making a lower low ends the uptrend. It does not begin a downtrend. What follows is usually a range or a period of unclear structure, and traders who flip immediately from long to short on the first break get caught repeatedly.

An uptrend ending means: this trend is over. It does not mean: the opposite trend has begun. Those are different claims and only the first is supported.

## The honest limitation

This describes the past. Structure tells you what has happened and what would constitute a change. It does not tell you what will happen.

Its value is that it defines your invalidation objectively, which is the input everything else needs. That is a real and sufficient contribution. Anyone claiming structure predicts is overselling a good tool.`,
          activity: {
            title: "Define your rules, then apply them",
            prompt:
              "Write down your swing definition — how many periods each side — and commit to it. Then take three charts and, for each, mark the swing highs and lows by your rule, state whether it is in an uptrend, downtrend or neither, and write the exact price at which that structure would break. Where your rule gives an answer you dislike, keep the rule's answer and write down that you disliked it. That reaction is the thing worth noticing.",
          },
        },
        {
          title: "Ranges, and why most of the time is spent in them",
          type: "TEXT",
          points: 10,
          body: `Markets trend some of the time and range most of the time. Since most trading education is about trends, most traders are trained for the minority condition.

## What a range is

Price oscillating between a ceiling and a floor without establishing directional structure. Rallies fail around a similar area; declines stop around another.

Structurally: no consistent sequence of higher highs and higher lows, or lower highs and lower lows. Absence of trend, which is a real state rather than a gap between trends.

## Why they exist

A range is a disagreement being resolved. Buyers find the low attractive, sellers find the high attractive, and neither can push through. It persists until one side runs out.

Ranges are also where large participants accumulate or distribute, precisely because the depth is there.

## Why trend traders lose money in ranges

Every trend technique fails in a range by construction. Breakouts fail because the range boundary holds. Trend-following entries buy the top and sell the bottom. Trailing stops get hit repeatedly by ordinary oscillation.

A trader with only trend tools will lose steadily in a range and often conclude their strategy has stopped working. The strategy is fine; the condition changed and they did not.

## Identifying the condition first

Before any setup, answer one question: is this trending or ranging? Everything else depends on it, and it is the question most people skip because it feels too basic.

A rough test: has price made a meaningful new high or low in the recent period, or has it returned to where it was? If the latter, treat it as a range until it demonstrates otherwise.

## Trading a range, if you must

Fade the edges rather than the middle. The middle of a range is the worst possible entry — furthest from your invalidation and nearest to no information.

Expect failure at the boundaries. Ranges break, and the break is often violent because the orders holding the boundary are consumed all at once.

Size smaller. Range boundaries are less reliable than trend structure, and the payoff is capped by definition.

## The false break

Price exits a range, everyone positions for continuation, and it immediately re-enters. This is extremely common and it is the liquidity mechanism again — the orders beyond the boundary are exactly what a large participant needs.

Waiting for a close beyond the boundary and then a successful retest costs you the first part of a real move and saves you from most false ones. Whether that trade is worth it depends on your record, which is why the journal in module five exists.

## The honest advice

For most people, the best range strategy is not trading. The edges are the only reasonable entries, the payoff is capped, and the false breaks are punishing. Sitting out until structure is clear is a legitimate strategy and it is almost never taught, because nobody sells a course about waiting.`,
          activity: {
            title: "Count how often you were in a range",
            prompt:
              "Take one market and go back six months. Mark each period as trending or ranging using your structural definition. Then calculate roughly what percentage of the time it was ranging. Write the number. Then answer honestly: what percentage of your own trades have been trend-following techniques applied during those ranging periods? For most people this exercise explains a large part of their results.",
          },
        },
        {
          title: "Transitions: where the money is made and lost",
          type: "TEXT",
          points: 10,
          body: `The change from one condition to another is where the largest moves start and where most false signals occur. Both are true at once, and that is what makes transitions difficult.

## The two transitions

Range to trend: price has been oscillating, then breaks out and establishes new directional structure. These produce the largest sustained moves.

Trend to range: a trend loses momentum, pullbacks get deeper, new highs stop being made. Price stalls into oscillation.

## Why transitions are hard

The evidence that confirms a transition arrives after most of the initial move. Wait for confirmation and you miss the beginning; act early and you are frequently wrong, because most apparent transitions are not.

That trade-off does not have a clever solution. It has an honest one: pick a side, apply it consistently, and let your journal tell you whether your version works.

## Signs that a trend is ending

Deeper pullbacks. Each retracement goes further into the previous move.

Failure to make a new extreme, or a new extreme that is barely exceeded and immediately rejected.

Momentum divergence — new price highs on visibly less force. Weak evidence alone, worth something in combination.

Volume falling on continuation and rising on counter-moves.

None of these is a signal. Together they are a reason to reduce size and tighten management, which is a more honest use than treating any of them as an entry.

## Signs of range to trend

A decisive close beyond the boundary rather than a wick.

Follow-through in the next period rather than immediate return.

A successful retest — price comes back to the boundary and holds it as the opposite kind of level.

Expansion in range and volume, indicating genuine participation rather than a probe.

## The discipline that matters

Transitions are where traders take their worst losses, because the potential is real and the false rate is high. Position sizing should be smaller here, not larger, which is the opposite of what excitement suggests.

The trader who takes a half-sized position on a possible transition and adds once structure confirms will outperform the one who takes a full position on the first sign, even though the second occasionally catches a spectacular move. The occasional spectacular result is what makes the bad habit persistent.

## What to write down

Before acting on any suspected transition, write: what specifically would confirm this, what would disconfirm it, and what I will do in each case. Then act on what you wrote.

The value is not that the plan is right. It is that having written it, you cannot rewrite history afterwards — and your journal becomes evidence rather than a story.`,
          activity: {
            title: "Study three transitions after the fact",
            prompt:
              "Find three completed transitions on historical charts — two range-to-trend, one trend-to-range. For each, work backwards and write: what was visible at the time that suggested it, at what point was it confirmed, and how much of the move had already happened by then. Then find one failed transition — a break that reversed — and write what looked identical about it. That last one is the most useful part.",
          },
        },
        {
          title: "Levels that matter and levels that do not",
          type: "TEXT",
          points: 10,
          body: `Any chart can be covered in lines. Most of them are decoration. A few describe real areas of interest, and the difference is testable.

## What makes a level real

Price has repeatedly transacted there and reacted. Not once — repeatedly. One touch is a coincidence; three is a pattern of behaviour.

Volume concentrated there. Areas where a lot changed hands are areas where a lot of participants have positions, and those positions generate future orders.

It is visible on a higher timeframe. A level only apparent on a five-minute chart matters to almost nobody. A level obvious on a daily chart is watched by everyone, and being watched is what makes it self-fulfilling.

It marks a structural point — a swing high or low that defined a trend, or a range boundary.

## What does not make a level real

That you drew it. Confirmation bias in this field is severe: once drawn, every subsequent touch feels significant and every failure is forgotten.

That it is a round number, mostly. Round numbers do attract orders, which makes them mildly real — but far less than people think.

That it comes from a ratio applied to a move whose start and end you chose. Choose different points and get different levels. A tool whose output depends on an arbitrary input, applied after the fact, is difficult to falsify and should be treated with suspicion.

## Zones, not lines

Price does not respect a specific number. It reacts around an area, because orders cluster near a level rather than at it.

Treating a level as a zone changes your behaviour usefully: you stop expecting precision, you stop placing stops at the exact number everyone else uses, and you stop declaring a level broken because of a small overshoot.

## Old resistance becoming support

The most reliable observation about levels. Price breaks above an area that repeatedly capped it, returns to it, and finds support.

The mechanism is straightforward: people who sold there are now wrong and buy back when given the chance; people who wanted to buy and missed get a second entry; people who bought the break defend it. Real orders, real reason.

This is worth more than most named patterns because you can explain why it happens.

## Keeping your chart honest

A rule worth adopting: no more than five levels on a chart. If you have twenty, you have guaranteed that price will always be near one of them, which means they tell you nothing.

Forcing yourself to choose the five that matter is itself the analysis. It is uncomfortable, and that discomfort is you giving up the false comfort of a chart that always has an answer.`,
          activity: {
            title: "Cut your chart down to five levels",
            prompt:
              "Take a chart you have marked up. Delete every level and start again, allowing yourself exactly five. For each of the five, write the justification: how many times price reacted there, whether volume concentrated there, whether it is visible on a higher timeframe, and what structure it marks. If a level cannot earn its place on those criteria, it does not go on. Then write down how many levels you had before, and which ones you were sorry to lose.",
          },
        },
        {
          title: "Assignment: read three markets structurally",
          type: "ASSIGNMENT",
          points: 25,
          body: `The first graded work. It tests whether you can produce an objective structural reading — one that another person could check and disagree with on the evidence, rather than on taste.

No trade recommendations. This is description, and the discipline is in keeping it descriptive.`,
          assignment: {
            title: "Structural reading of three markets",
            instructions: `Analyse three different markets structurally. 700 to 1,000 words total. Include no predictions and no buy or sell recommendations — this is graded on the quality of the description and the honesty of the uncertainty.

**1. Your rules, stated first.** Your swing definition, your three timeframes, and your criteria for a level earning a place on the chart. Everything after this must apply these rules consistently.

**2. For each of the three markets:**

- Condition on your context timeframe: trending, ranging, or transitioning, with the structural evidence — the actual sequence of highs and lows.
- Condition on your trading timeframe, and whether it agrees with the context timeframe.
- No more than five levels, each with its justification against your stated criteria.
- The single price at which your structural reading would be wrong, and what condition would replace it.

**3. The disagreement.** Pick the market where your timeframes conflict most, and write what a competent trader with the opposite view would point to. Steelman it properly — if you cannot make the opposing case well, you do not understand your own.

**4. Confidence.** Rank the three by how confident you are in the reading, and say why the least confident one is unclear. Structural readings are not equally clear, and pretending otherwise is the error this section catches.

Words like "will", "should go", "is heading to" do not belong anywhere in this submission. If you find one, the sentence is a prediction wearing a description's clothes.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Rules are stated first and applied consistently",
                weight: 20,
                descriptor:
                  "Swing definition, timeframes and level criteria declared before analysis, then visibly applied. Full marks show the rule being followed even where it produced an inconvenient answer.",
              },
              {
                criterion: "Structural readings are evidenced, not asserted",
                weight: 25,
                descriptor:
                  "Each condition supported by the actual sequence of swing highs and lows, not by appearance. Full marks distinguish a broken trend from a begun opposite trend.",
              },
              {
                criterion: "Levels are few and justified",
                weight: 20,
                descriptor:
                  "At most five per market, each earning its place against the stated criteria. Full marks include higher-timeframe visibility and reaction count rather than drawn-by-eye lines.",
              },
              {
                criterion: "Invalidation is specific",
                weight: 20,
                descriptor:
                  "An exact price per market at which the reading fails, plus what condition replaces it. Vague invalidation scores nothing here.",
              },
              {
                criterion: "The opposing case is made well",
                weight: 15,
                descriptor:
                  "A genuine steelman that a trader holding that view would recognise as fair, plus honest confidence ranking. A dismissive counter-argument scores low.",
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Tools that survive scrutiny",
      description:
        "The short list of indicators worth using, what each actually measures, and why the rest should be deleted.",
      lessons: [
        {
          title: "What an indicator is, and why most add nothing",
          type: "TEXT",
          points: 10,
          body: `An indicator is arithmetic applied to price and volume. It contains no information that was not already in the data — it can only present it differently.

## The consequence

No indicator tells you anything the chart does not already contain. It can make a property easier to see, and that is genuinely useful. It cannot add knowledge.

Anyone claiming an indicator reveals hidden information is either confused or selling.

## Why most are redundant

The majority are variations on the same few calculations: an average of recent prices, a rate of change, a measure of dispersion. Adding five indicators built on the same underlying quantity gives five views of one thing while feeling like five confirmations.

That false sense of confirmation is the actual danger. A trader with five agreeing indicators feels far more confident than one with a single indicator, and is not more likely to be right.

## The lag problem

Anything computed from past prices necessarily lags. An average of the last twenty periods reflects those twenty periods. It cannot tell you about the twenty-first.

Some indicators reduce lag by weighting recent data more heavily. This increases responsiveness and increases false signals. That trade-off is fundamental and no setting escapes it.

## Overfitting: the quiet killer

Tune parameters until they would have performed well historically and you have described the past, not discovered a rule. The more parameters and the more tuning, the more certainly you have fitted noise.

This is why a strategy that backtests beautifully so often fails live. It was not a discovery; it was a curve drawn through history.

The defence: prefer few parameters, prefer default settings, and test on data you did not use to build the rule.

## What indicators can honestly do

Make a property visible at a glance — whether price is extended relative to its recent average, whether volatility has expanded, whether volume is unusual.

Enforce consistency, by giving you a rule rather than a feeling.

That is worth having. It is a much smaller claim than the marketing, and it is true.

## The rule for this course

Fewer than four indicators on any chart, and you must be able to state exactly what each one measures and what it looks like when it fails.

If you cannot describe what an indicator would look like if it were not working, you are not using a tool. You are holding a belief, and beliefs do not get tested.`,
          activity: {
            title: "Justify or delete every indicator you use",
            prompt:
              "List every indicator currently on your charts. For each one write: exactly what it measures in plain language, what underlying quantity it is built from, and what it would look like when it is giving a false signal. Then group them by underlying quantity — you will probably find several measuring the same thing. Delete until you have three or fewer, each measuring something different, and write down which ones you kept and why.",
          },
        },
        {
          title: "Moving averages: what they honestly show",
          type: "TEXT",
          points: 10,
          body: `The most used indicator in existence, and the most misunderstood. It is genuinely useful for one thing and routinely used for three others it cannot do.

## What it is

The average price over a chosen number of periods, recalculated each period. That is the entire calculation.

## What it honestly shows

Whether current price is above or below its recent average, and whether that average is rising or falling. In other words, a smoothed view of direction over your chosen window.

That is useful. Price is noisy, and a smoothed line makes the underlying drift visible without you having to squint.

## What it does not do

It does not predict. It is arithmetic on past prices.

It does not act as support or resistance in any mechanical sense. Price sometimes bounces near a popular average because enough participants watch it and place orders there — a self-fulfilling effect, real but weak and unreliable. It is not a property of the line.

It does not generate reliable signals when two averages cross. Crossovers lag badly by construction — by the time a short average crosses a long one, a substantial part of the move has occurred. In ranging markets they produce a stream of losses.

## The honest use

As context. Above a rising longer-term average, an uptrend is more plausible; below a falling one, a downtrend is. That is a filter on which direction to consider, not a signal to enter.

As a consistency device. If your rule is that you only take longs above a stated average, it stops you taking counter-trend trades on impulse. The value is the discipline, not the line.

## Choosing a period

The common values are common because they are common, not because they are optimal. Their mild effectiveness comes from being widely watched.

Avoid optimising the period. If your strategy works at 50 and fails at 45, you have fitted noise and it will fail live. Robustness across nearby settings is what distinguishes a real effect from a fitted one — and testing that is more valuable than finding the best number.

## The practical setup

One longer average for context. Optionally one shorter for the shape of recent movement. That is enough.

Charts with five averages produce a spaghetti of lines, at least one of which is always near price, which guarantees you can always find a reason for any decision. That is not analysis; it is a mechanism for justifying whatever you already wanted to do.`,
          activity: {
            title: "Test whether the setting matters",
            prompt:
              "Take one market and a simple rule using a moving average — for example, only consider longs when price is above it. Test that rule visually across six months at three settings: your preferred number, one meaningfully shorter, one meaningfully longer. Write down whether the results are broadly similar or wildly different. If they are wildly different, you have found a fitted parameter rather than a real effect — write that conclusion down, because it is the most valuable finding this lesson can give you.",
          },
        },
        {
          title: "Volume, volatility and the two that are worth it",
          type: "TEXT",
          points: 10,
          body: `Two measurements genuinely add something, because they describe qualities price alone does not: participation, and how far things are currently moving.

## Volume: how much agreement there was

Volume tells you how much changed hands. It is the closest thing to a second dimension on a chart.

The useful readings are comparative, never absolute:

A move on high volume involved many participants. A similar move on low volume did not, and is more easily reversed.

A breakout on low volume is weak evidence. Few participants were involved, so few positions defend it.

Rising volume into a level with no progress suggests absorption — someone is taking the other side in size.

Falling volume during a trend continuation is normal, not a warning. Volume typically declines through the quiet middle of moves.

Note the caveat: volume in decentralised or fragmented markets can be unreliable, and reported crypto volumes have historically included substantial fabrication. Prefer major venues and treat the exact numbers as indicative.

## Volatility: how far things are currently moving

A measure of average range per period. It is genuinely useful for two decisions.

Stop placement. A stop closer than normal movement will be hit by noise regardless of whether you are right. Volatility gives you a floor for how much room a position needs.

Position sizing. Risking a fixed percentage means a wider stop requires a smaller position. Volatility converts your risk rule into a size, and this is where the risk course and this one meet.

Volatility also tends to cluster — calm follows calm, violent follows violent — and it expands and contracts in cycles. A long quiet period often precedes expansion, which is worth knowing, though it says nothing about direction.

## What these two give you together

Volume tells you whether a move had participation. Volatility tells you how much room to give it.

Neither predicts. Both improve decisions you are making anyway, and they measure genuinely different things — which is more than can be said for most indicator combinations.

## The honest setup

Price, structure, volume, and a volatility measure. Optionally one moving average for context.

That is a complete chart, and it is considerably less than most people run. The reduction is not minimalism for its own sake — it is that each remaining element measures something distinct, so agreement between them means something.`,
          activity: {
            title: "Size a position with volatility",
            prompt:
              "Take a real market. Find its recent average range per period on your trading timeframe. Now take a structural invalidation level you identified earlier and measure the distance from a plausible entry to it. Is that distance larger than normal movement, or inside the noise? Then, using a fixed 1% account risk, calculate the position size that distance implies. Write the whole calculation out. This is the arithmetic that connects reading a chart to not going broke.",
          },
        },
        {
          title: "The tools to be sceptical about",
          type: "TEXT",
          points: 10,
          body: `Some popular tools have properties that make them very hard to be wrong with — which sounds like a strength and is the opposite.

## The test

Can this tool produce a signal that is clearly, unarguably wrong afterwards? If not, it cannot be tested, and anything untestable will feel accurate regardless of whether it is.

## Ratio retracement levels

Draw levels at fixed ratios of a chosen move. The problem is that you choose the start and end. Different choices give different levels, and after a reaction you can always find a choice that would have marked it.

There are so many levels — plus extensions — that price is nearly always near one. Being near one therefore means nothing.

The mild real effect is that many people watch a few common ratios, so orders cluster there. Treat them as weak zones of possible interest, never as a reason to enter.

## Wave-counting frameworks

Systems that label markets as sequences of waves. Elaborate, internally consistent, and extremely difficult to falsify, because a failed count is generally resolved by re-labelling rather than by admitting error.

Skilled practitioners exist. But a framework where the response to being wrong is a revised count is not producing testable claims, and you cannot improve at something you cannot score.

## Named patterns with published success rates

Head and shoulders, flags, wedges and the rest. The issue is that they are identified after the fact. Studies claiming high reliability generally find completed patterns in history — the ones that failed never completed and were never counted.

This is survivorship bias, and it is severe. The honest question is: how many times did something that looked like this appear and nothing happened? Almost nobody knows, because nobody counts the negatives.

## Anything with many tunable parameters

The more knobs, the more certainly you have fitted history. A rule with one parameter that works across settings is worth more than one with six parameters tuned to perfection.

## Being fair

Some traders use these tools profitably. Usually they are profitable because of risk management and consistency, and the tool provides a consistent framework for making decisions — which has real value, separate from whether the tool's claims are true.

If a framework makes you disciplined, that is worth something. Just be clear about which part is working. Confusing the discipline for the prediction is how people scale up a losing method.

## What to do

If you use any of these, keep the journal that records what you predicted before the outcome. Then, after fifty trades, you will know rather than believe. That is the only route out of this argument, and it is available to you.`,
          activity: {
            title: "Apply the falsifiability test",
            prompt:
              "Take every analytical tool or framework you currently use, including any from this lesson. For each, answer in writing: describe a specific outcome that would clearly prove this signal wrong. Not 'it did not work this time' — a stated condition, decided in advance. Any tool for which you cannot write that sentence goes on a watch list. You do not have to stop using it, but you must start recording its calls in advance so it becomes testable.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on tools. The theme is falsifiability: a tool you cannot be clearly wrong with will feel accurate whether or not it is, and feeling accurate is what makes people increase size.`,
          quiz: {
            title: "Indicators and their limits",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "What can an indicator add that is not already in the price and volume data?",
                explanation:
                  "Nothing. Indicators are arithmetic on existing data — they can make a property easier to see and enforce consistency, but they cannot add information. Anything claiming to reveal hidden information is confused or selling.",
                options: [
                  { text: "Nothing — it can only present existing data differently", correct: true },
                  { text: "Hidden order flow information", correct: false },
                  { text: "The intentions of large participants", correct: false },
                  { text: "Statistical prediction of the next move", correct: false },
                ],
              },
              {
                prompt:
                  "A strategy performs beautifully on historical data with six tuned parameters. What is the most likely explanation?",
                explanation:
                  "Overfitting. Enough parameters tuned to history will describe noise rather than discover a rule, which is why such strategies routinely fail live. Robustness across nearby settings is the test that distinguishes a real effect.",
                options: [
                  { text: "The parameters were fitted to historical noise", correct: true },
                  { text: "It has found a genuine market inefficiency", correct: false },
                  { text: "It will work until others discover it", correct: false },
                  { text: "The backtest period was too long", correct: false },
                ],
              },
              {
                prompt: "Why are published success rates for named chart patterns unreliable?",
                explanation:
                  "Survivorship bias. Patterns are identified once complete, so formations that looked similar and failed to complete were never counted. Nobody knows how often something that looked like this appeared and nothing happened.",
                options: [
                  {
                    text: "Failed formations never complete, so they are never counted",
                    correct: true,
                  },
                  { text: "The studies use too little data", correct: false },
                  { text: "Patterns work differently in crypto", correct: false },
                  { text: "The rates are accurate but only on daily charts", correct: false },
                ],
              },
              {
                prompt: "What is a volatility measure genuinely useful for?",
                explanation:
                  "Stop placement and position sizing. A stop closer than normal movement gets hit by noise regardless of whether the idea is right, and a fixed percentage risk over a wider stop means a smaller position. It says nothing about direction.",
                options: [
                  { text: "Setting stops outside normal noise, and converting risk into position size", correct: true },
                  { text: "Predicting the direction of the next move", correct: false },
                  { text: "Identifying reversals", correct: false },
                  { text: "Measuring participant sentiment", correct: false },
                ],
              },
              {
                prompt: "What makes a moving-average crossover a poor entry signal?",
                explanation:
                  "It lags by construction — by the time a short average crosses a long one, a substantial part of the move has happened — and in ranging markets it produces a stream of losses. Its honest use is context and consistency, not entry.",
                options: [
                  {
                    text: "It lags by construction and produces repeated losses in ranges",
                    correct: true,
                  },
                  { text: "It only works on very long timeframes", correct: false },
                  { text: "Too few traders watch it to be effective", correct: false },
                  { text: "It cannot be calculated on crypto markets", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "From reading to deciding",
      description:
        "Turning a structural reading into a position with a stated invalidation — where this course meets the risk course.",
      lessons: [
        {
          title: "The idea, written before the money",
          type: "TEXT",
          points: 10,
          body: `The single habit that separates traders who improve from traders who merely accumulate experience: writing the idea down before entering.

## Why it matters more than the idea itself

Memory reconstructs. After an outcome, you will remember having been more certain, or less, depending on what happened. You will remember reasons you did not have and forget doubts you did.

This is not weakness; it is how memory works. The only defence is a written record made before the outcome existed.

## What the note must contain

The market and the timeframe. Stated, so you cannot later manage on a different one.

The structural reading. What condition, with the evidence.

The idea in one sentence. What you think and why.

The invalidation price. The exact level at which this idea is wrong. Not "if it looks bad" — a number.

The size, derived from the invalidation distance and your risk rule. This is where the arithmetic from the risk course does its work.

What you expect if you are right, and roughly when. A directionless expectation cannot be scored.

Confidence, as a number. You will need this later to find out whether your confidence means anything.

## Why the invalidation comes before the target

Because it determines the size, and size determines survival. A trader who sets targets first and stops afterwards is fitting the risk to the hope.

Structure gives you the invalidation for free: the price at which your reading of the market stops being true. That is the correct stop, and it is not related to how much you are willing to lose — that is handled by adjusting size, not by moving the stop closer.

## The rule that follows

If you cannot write the note, you do not have an idea. Not a bad idea — no idea. Wanting to be in the market is not an idea, and it accounts for a large share of entries.

This rule alone eliminates most impulsive trades, which for most traders is where most losses live.

## What it costs

Three minutes. And the discomfort of noticing, sometimes, that you cannot articulate why you want to enter.

That discomfort is the tool working. Sit with it rather than resolving it by trading.`,
          activity: {
            title: "Write three notes and take none of them",
            prompt:
              "Write three complete trade notes on real markets right now, with every field: market, timeframe, structural reading, one-sentence idea, exact invalidation price, size from your risk rule, expectation and rough timing, confidence as a number. Then do not take any of them. Come back in a week and score each one against what happened. This is the whole method of the course compressed into one exercise, and it costs nothing to run.",
          },
        },
        {
          title: "Where the invalidation actually belongs",
          type: "TEXT",
          points: 10,
          body: `Most stops are placed badly, and the badness follows two predictable patterns.

## The first error: sized to comfort

Placing the stop where the loss feels acceptable rather than where the idea is wrong. The result is being stopped out by ordinary movement while the idea remains valid — and then watching it work without you.

This is the most common and most expensive stop error, and it is why "I was right but got stopped out" is such a familiar sentence.

The fix: stop goes where structure says the idea is wrong. If the resulting loss is too large, reduce the size. Never move the stop closer to fit the size.

## The second error: the obvious price

Placing the stop at the most visible level on the chart, where everyone else has placed theirs. Those clustered orders are liquidity, and price frequently reaches for them before continuing.

The fix: place it beyond the level, outside the noise, and accept a slightly larger risk per unit with a correspondingly smaller position. What you lose in size you gain in not being removed by a routine sweep.

## Finding the right level

Ask: at what price would my structural reading be false?

For a trend-continuation idea, that is usually beyond the swing point that defines the trend. If it trades there, higher lows have stopped, and your reason for being in has gone.

For a range-edge idea, beyond the boundary plus room for the overshoot that boundaries routinely produce.

For a transition idea, back inside the prior structure — if it re-enters, the transition did not happen.

In each case the stop is derived from the reading, not chosen.

## Checking against volatility

Once placed, compare the distance to normal movement on that timeframe. If your stop is inside typical range, it will be hit by noise regardless of whether you are right.

If structure says one thing and volatility says the structural stop is too tight, the trade is not available at that timeframe. Move to a higher one, or skip it. Do not compromise by using a stop that cannot survive.

## Moving stops

Only in the direction of reducing risk, and only when structure has genuinely changed — a new higher low in an uptrend gives a new invalidation.

Never widen a stop. Widening is the decision that turns a planned loss into an unplanned catastrophe, and it is always accompanied by a good-sounding reason. There are no exceptions, and traders who make exceptions eventually make the exception that ends them.

## The thing to internalise

The stop is not how much you are willing to lose. It is where you are wrong. How much you are willing to lose is expressed through size.

Confusing those two is the most expensive conceptual error in trading, and it is remarkably common among people who otherwise know what they are doing.`,
          activity: {
            title: "Re-place your last five stops",
            prompt:
              "Take your last five trades, or five you would have taken. For each, write where you actually placed the stop and why. Then work out where structure says the idea would have been wrong, and where the obvious clustered stop would have been. Compare all three. Count how many of your five were placed for comfort rather than structure, and how many sat exactly where everyone else's would have been. Then recalculate what the position size should have been with the structural stop.",
          },
        },
        {
          title: "Targets, and why they matter less than you think",
          type: "TEXT",
          points: 10,
          body: `Targets get far more attention than they deserve, and stops far less. The arithmetic explains why.

## The asymmetry

Your stop is certain: if hit, you lose that amount. Your target is a hope: it may or may not be reached.

So the known quantity is the loss. Managing the known quantity carefully and the uncertain one loosely is the correct priority, and it is the opposite of how most people spend their attention.

## Where to place a target

At the next structural area of interest — a prior swing point, a range boundary, an area of heavy volume. Price tends to stall where orders are, so those are the honest places to expect resistance.

Not at a round number chosen because it sounds good. Not at a ratio extension of a move you selected. Not at whatever gives a pleasing ratio to your stop.

## The ratio question

The common advice is a minimum reward-to-risk ratio — take nothing under two or three to one. It is reasonable and it is frequently misapplied.

The misapplication: choosing a target far enough away to produce the required ratio, regardless of whether anything is there. That is not a target; it is arithmetic dressed up as analysis, and it converts winning trades into losing ones by refusing to take available profit.

The correct order: find where price is likely to stall, measure the distance, compare it to your stop distance, and if the ratio is poor, do not take the trade. The ratio is a filter on which trades to take, not a way to set targets.

## Partial exits

Taking some off at a first target and letting the rest run is popular and is a genuine trade-off, not a free lunch.

It reduces variance and makes trading psychologically easier. It also reduces expectancy, because the largest winners are the ones that carry a full position a long way.

Both are true. Which is right depends on whether you will actually hold a full position through a drawdown. A trader who exits everything in fear at the first pullback is better off with partials; a trader who can hold is better off without.

Be honest about which one you are, rather than which you would like to be.

## When to have no target

Trend-following approaches often use a trailing invalidation rather than a fixed target — hold while structure is intact, exit when it breaks.

This captures the rare enormous moves that carry a strategy's results, at the cost of giving back part of every winner. It requires tolerating open profit disappearing, which many people find harder than losing.

## The honest summary

Getting stops right is most of trading. Getting targets right is an optimisation. Traders who obsess over targets while placing stops for comfort have the priorities exactly inverted, and no target discipline saves a position sized wrongly.`,
          activity: {
            title: "Find where price actually stalls",
            prompt:
              "Take one market and identify five completed moves. For each, mark where the move stopped and write what was there — a prior swing point, a range boundary, an area of heavy volume, or nothing identifiable. Count how many stopped at something structural versus somewhere unremarkable. Then, on a current chart, place a target at the nearest structural area and calculate the ratio against a structural stop. If the ratio is poor, write down that the trade is not available — and mean it.",
          },
        },
        {
          title: "The journal that makes you better",
          type: "TEXT",
          points: 10,
          body: `Experience does not automatically produce skill. Ten years of unexamined trading produces ten years of the same mistakes. The journal is what converts experience into evidence.

## Why memory cannot do this

You will remember the dramatic trades and forget the ordinary ones. You will remember being certain when you were right and cautious when you were wrong. You will construct a story in which your losses were bad luck and your wins were skill.

Everyone does this. The only escape is a record made before outcomes.

## The two-part structure

Written before: everything from the trade note — market, timeframe, reading, idea, invalidation, size, expectation, confidence.

Written after: what actually happened, whether the invalidation was hit, whether you followed the plan, and what you would do differently. Kept strictly separate from the before section, so hindsight cannot contaminate it.

## The question that produces improvement

Not "was this trade profitable?" but "did I follow my process, and was my reasoning sound given what I knew at the time?"

Those come apart in four combinations, and each means something different:

Good process, good outcome — repeat it.

Good process, bad outcome — this is normal and you must not change anything. Reacting to this is how people abandon working methods.

Bad process, bad outcome — the useful lesson.

Bad process, good outcome — the most dangerous cell on the grid, because it rewards the behaviour that will eventually ruin you.

Most traders only examine outcomes, which means they cannot distinguish these at all.

## What to review, and when

Weekly: did I follow my rules? Count the trades where you did not, without judgement. The count is the metric.

Monthly: is my confidence calibrated? Take every trade where you rated confidence high and see what fraction worked. Then the low-confidence ones. If they are similar, your confidence carries no information — which is enormously useful to know, and almost nobody checks.

Quarterly: what is my actual expectancy? Average win, average loss, win rate. That is your real edge or lack of one, and it is a fact rather than a feeling.

## The minimum viable version

If a full journal is too much, record three things per trade: the invalidation price, confidence out of five, and whether you followed the plan.

Those three alone will teach you more in fifty trades than years of unexamined trading.

## The hard part

Recording the trades you are ashamed of — the impulsive one, the revenge trade after a loss, the one where you moved the stop. Those are the highest-value entries in the entire journal, and they are the ones people quietly omit.

A journal that only contains your good trades is a portfolio. The point of this one is to be a record.`,
          activity: {
            title: "Start it, and backfill honestly",
            prompt:
              "Create your journal with the before and after sections separated. Then backfill your last ten trades as honestly as you can, including the ones you would rather not record — the impulsive entries, the moved stops, the revenge trades. For each, mark which of the four cells it falls into: good or bad process, good or bad outcome. Then count how many fall into bad process with a good outcome. That number is your current biggest risk, because those are the habits being rewarded.",
          },
        },
        {
          title: "Assignment: a complete trade plan",
          type: "ASSIGNMENT",
          points: 25,
          body: `The second graded piece. It asks for a complete, executable plan on a real market — with the arithmetic done, not gestured at.

You are not required to take the trade, and you should not take it because it is an assignment.`,
          assignment: {
            title: "Complete trade plan with invalidation and sizing",
            instructions: `Produce a complete trade plan for one real market. 600 to 900 words. Include no advice to anyone else, and take no position because of this assignment.

**1. Structural reading.** Context timeframe and trading timeframe, condition on each with the actual sequence of swing points, and the levels that matter with their justification.

**2. The idea.** One sentence. What you think and the structural reason.

**3. Invalidation.** The exact price at which the idea is wrong, and why structure puts it there. State separately where the obvious clustered stop would sit and how far outside it yours is.

**4. Volatility check.** Normal movement per period on your trading timeframe, and whether your invalidation distance survives it. If it does not, say so and state what you would do instead — moving to a higher timeframe or skipping the trade are both correct answers.

**5. Sizing.** Full arithmetic. Account risk percentage, invalidation distance, resulting position size. Show the calculation, not just the answer.

**6. Target.** Where price is likely to stall and why something structural is there. The resulting reward-to-risk ratio. If the ratio is poor, state that the trade is not available rather than moving the target to fix the arithmetic.

**7. Management.** What would make you exit early, what would make you move the invalidation, and the explicit statement that you will not widen it.

**8. Falsification.** What you expect if you are right, roughly when, and your confidence as a number out of five. Then: what specifically would tell you this reading was wrong for a reason other than the stop being hit?

Every number must be real and calculated. A plan with "appropriate size" or "a reasonable stop" in it is not a plan.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Reading is structural and evidenced",
                weight: 15,
                descriptor:
                  "Both timeframes read from actual swing sequences, with justified levels. Consistent with the rules the writer declared earlier.",
              },
              {
                criterion: "Invalidation is derived from structure, not comfort",
                weight: 25,
                descriptor:
                  "The price is where the reading fails, with reasoning, and is placed beyond the obvious clustered level. Full marks state the distance from the crowd's stop explicitly.",
              },
              {
                criterion: "Volatility check is performed and acted on",
                weight: 15,
                descriptor:
                  "Real average movement measured and compared to the stop distance, with a stated response if the stop is inside the noise. Skipping the trade is a full-marks answer.",
              },
              {
                criterion: "Sizing arithmetic is complete and correct",
                weight: 20,
                descriptor:
                  "Account risk, stop distance and position size shown as a calculation. Full marks derive size from the stop rather than fitting the stop to a desired size.",
              },
              {
                criterion: "Target is structural and the ratio filters the trade",
                weight: 15,
                descriptor:
                  "Target placed where price is likely to stall for a stated structural reason, with the ratio used as a filter. Manufacturing a target to reach a required ratio scores zero here.",
              },
              {
                criterion: "The plan is falsifiable",
                weight: 10,
                descriptor:
                  "A stated expectation with rough timing, a numeric confidence, and a condition other than the stop that would show the reading was wrong.",
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Context beyond the chart",
      description:
        "Sessions, funding, correlation and news. The conditions that determine whether a structural reading means anything today.",
      lessons: [
        {
          title: "Not all hours are the same market",
          type: "TEXT",
          points: 10,
          body: `A structural signal at one time of day is not the same signal at another, because the participants are different and so is the depth.

## Why time matters

Markets have rhythms driven by when large participants are active. Crypto trades continuously, but the humans and institutions do not, and volume follows them.

Thin hours have less depth. The same order moves price further, moves start and fail more easily, and levels are less reliable because fewer participants are defending them.

Active hours have depth. Moves that begin during them are more likely to have real participation behind them.

## The practical consequence

A breakout during thin hours is weaker evidence than an identical breakout during active hours. Same chart pattern, different meaning, because the underlying question — did many participants transact here? — has a different answer.

This is not a rule to apply mechanically. It is a reason to weight the same visual evidence differently depending on when it occurred, and to be more sceptical of dramatic moves in quiet periods.

## Weekends

In crypto specifically, weekend volume is typically lower. Moves can be exaggerated because there is less depth to absorb them, and they frequently reverse when normal participation returns.

A trader who takes a weekend breakout at full size and finds it undone on Monday has not been unlucky. They have traded a thin market as though it were a deep one.

## Period boundaries

Daily and weekly closes attract attention because many participants use them. A level that holds on a closing basis is stronger evidence than one held intraday and lost by the close.

This is genuinely self-fulfilling — it matters because people watch it — but self-fulfilling effects are still effects, and they are more reliable than most of what people trade on.

## What to actually do

Record the time of day for every trade in your journal. After fifty trades, check whether your results differ by session. Many traders discover they lose consistently in one period and never knew, because they never grouped by it.

That is a real, checkable edge available to anyone who keeps records, and it requires no analytical skill at all.

## The limitation

Session effects are a weak factor compared to structure and sizing. Do not build a method on them. Use them to weight evidence, and use your journal to find out whether they matter for you specifically.`,
          activity: {
            title: "Group your results by time",
            prompt:
              "Add a time-of-day column to your journal if it is not there. Then, for whatever trades you already have recorded, group them by session — your local morning, afternoon, evening, overnight — and calculate the result for each group. Write the numbers. If you do not have enough trades, write the date by which you will have fifty with the time recorded. Then check one market: compare average range during its most active hours against its quietest, and write the ratio.",
          },
        },
        {
          title: "Correlation: you own fewer positions than you think",
          type: "TEXT",
          points: 10,
          body: `Traders routinely believe they hold five independent positions when they hold one position five times. This is the most common way a careful risk rule is quietly broken.

## What correlation means here

Two markets are correlated when they tend to move together. In crypto, correlation is unusually high — most assets follow the largest one closely, particularly during stress.

Which means: five long positions across five different tokens is usually one directional bet with extra steps.

## Why it defeats risk management

Suppose your rule is 1% risk per trade. You take five positions, each risking 1%, and believe you are risking 5% across diversified ideas.

If all five are correlated and the market falls, all five hit their stops together. You lose 5% in one event, from what you believed was diversification.

Do that twice in a bad week and a careful risk rule has produced a serious drawdown.

## Correlation rises exactly when it hurts

The cruel part: correlations increase during stress. Assets that behaved somewhat independently in calm conditions move together in a sharp decline, because everyone is selling everything.

So the diversification you measured in normal conditions disappears at the moment you needed it. This is a general property of markets, not a crypto peculiarity, and it has destroyed far more sophisticated operations than yours.

## Counting your real exposure

Group your positions by what they actually depend on. Five long positions on assets that follow the market is one exposure at five times the size.

Then apply your risk limit to the group, not to each position. If your maximum is 1% per idea and 3% total, five correlated longs must each be sized at a fraction, or you must take fewer.

## What genuine diversification looks like

Positions whose outcomes depend on different things. Long one asset and short another in the same sector is closer to independent than two longs. A position based on a structural break in one market and another based on a range in an unrelated one are more independent than two trend trades in the same direction.

Note that even this is imperfect, and treating it as perfect is how people re-acquire the problem in a more sophisticated form.

## The practical rule

Before adding a position, ask: if the whole market fell hard tomorrow, would this lose at the same time as what I already hold? If yes, it is not a new idea, and it must be sized as an addition to an existing exposure rather than as an independent trade.

That one question, asked honestly, prevents most of the drawdowns that surprise people who thought they were being careful.`,
          activity: {
            title: "Count your real exposure",
            prompt:
              "List every position you hold, or would take from your current ideas. Group them by what they actually depend on — most will collapse into one or two groups. Then calculate your true risk per group rather than per position. Write both numbers: what you believed you were risking, and what you are actually risking. Then write the rule you will apply for maximum exposure per group, and check whether your current holdings already break it.",
          },
        },
        {
          title: "News, catalysts and why they are hard to trade",
          type: "TEXT",
          points: 10,
          body: `Events move markets, and trading them is far harder than it looks, for a reason most people never articulate.

## The two-step problem

To profit from news you must be right about two things: what will happen, and how the market will react.

The second is not implied by the first. Markets price expectations in advance, so an outcome that is good but less good than expected can fall. An outcome that is bad but less bad than feared can rise.

People who get the event exactly right and lose money are not unlucky. They answered one question and needed two.

## You are late

By the time news reaches you, it has reached automated systems that act in milliseconds and participants who were positioned in advance. The initial move is gone before a human can respond.

What is left is the second move, which is about positioning rather than information, and reading that requires exactly the structural skills this course teaches — not a view about the news.

## Volatility around events

Around scheduled events, spreads widen, depth thins, and price can move violently in both directions before settling. Stops get hit on moves that reverse immediately.

The practical consequence: existing positions may need reduced size or wider invalidation before a known event, or closing entirely. Being right about direction and removed by the noise is a common and infuriating outcome.

## Scheduled versus unscheduled

Scheduled events — data releases, decisions, unlocks — are knowable in advance. You can choose to be flat, or to size for the volatility.

Unscheduled events cannot be planned for. The only defence is that no position is large enough for a surprise to be catastrophic, which is a sizing question rather than an information question.

## What to do with news

Use it as context, not as a signal. Knowing an event is scheduled tells you volatility is likely and lets you manage accordingly. It does not tell you direction.

Note in your journal whether a trade was around an event, and check later whether those trades performed differently. Many people find they do, and consistently badly.

## The honest position

For most people, most of the time: be flat or small around scheduled events, do not attempt to trade the announcement, and be positioned such that an unscheduled shock is survivable.

That is unexciting advice, and it is what separates traders who are still trading after a surprise from those who are not.`,
          activity: {
            title: "Test the two-step problem",
            prompt:
              "Find three past events in any market where the outcome was widely reported as good or bad. For each, look at what price actually did in the following hours. Write down whether the price reaction matched the obvious reading of the news. Then write down how many of the three you would have lost money on by trading the obvious direction. Finally, check your own journal for trades taken around events and compare their results to your others.",
          },
        },
        {
          title: "Knowing when not to trade",
          type: "TEXT",
          points: 10,
          body: `The most underrated skill in this course, and the hardest to practise, because doing nothing feels like failing to work.

## The conditions to stand aside

Structure is unclear. Neither trending nor cleanly ranging, no reliable levels, no obvious invalidation. If you cannot state where you would be wrong, there is no trade.

Volatility is outside your normal range, in either direction. Too high and your stops cannot survive the noise at any sensible size. Too low and there is not enough movement to pay for the risk.

You are compromised. Tired, angry, recovering from a loss, or in a hurry. Every one of those measurably degrades decision-making, and none of them announce themselves.

You cannot articulate the idea. If the trade note will not write, there is no idea — only the desire to be in the market.

A scheduled event you cannot size around is imminent.

## The pressure to act

Trading rewards patience and feels like it should reward effort. Sitting out feels like not doing your job, particularly if you have set aside time for it.

That feeling causes more losses than any analytical error. The market does not offer good opportunities continuously; it offers a small number and a great deal of noise, and most of what looks like an opportunity in a dull week is noise.

## Revenge trading

After a loss, the urge to recover it immediately is close to universal. It leads to a larger position on a worse idea, and it is the mechanism behind most account-destroying sequences.

The defence is a mechanical rule set in advance: after a loss, no new position for a fixed period. An hour, a day, whatever suits you. Not a judgement call in the moment — a rule, because your judgement is exactly what has been compromised.

## Boredom

Long quiet periods produce trades taken because nothing has happened. These are almost uniformly bad, and they are easy to identify in a journal because the note is thin.

If your trade note reads "possible setup, looks okay", you have written the evidence of a boredom trade in your own hand.

## Making inaction concrete

Set a maximum number of trades per week. Being forced to choose makes you select better ones.

Record the trades you did not take and why. This converts inaction from an absence into a decision you can review — and some of them will turn out to have been your best calls.

## The measure

At the end of a quiet week, having taken nothing, the correct feeling is mild satisfaction rather than frustration. Getting to that point is a genuine milestone, and most traders never reach it.`,
          activity: {
            title: "Keep a no-trade log for a week",
            prompt:
              "For one week, record every trade you considered and did not take, with the reason — unclear structure, wrong volatility, compromised state, no articulable idea. Then at the end of the week, look at what those setups actually did. Write down how many would have worked and how many would not. Also write your after-loss rule: how long you will wait before a new position, decided now rather than in the moment.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on context. Notice that most of these are about sizing and restraint rather than about reading — which is the argument the whole course has been making.`,
          quiz: {
            title: "Context and restraint",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "You hold five long positions in different crypto assets, each risking 1%. What is your real risk?",
                explanation:
                  "Close to 5% on a single directional exposure, because crypto assets are highly correlated and correlation rises during stress. Five correlated longs are one position five times, not five diversified ideas.",
                options: [
                  { text: "Roughly 5% on one exposure, since the assets are correlated", correct: true },
                  { text: "1%, since each position has its own stop", correct: false },
                  { text: "Less than 5%, because diversification reduces it", correct: false },
                  { text: "Impossible to say without knowing the assets", correct: false },
                ],
              },
              {
                prompt: "Why is trading news harder than it appears?",
                explanation:
                  "It requires being right about two separate things — the outcome, and how a market that already priced expectations will react. An outcome that is good but worse than expected can fall, which is why people who call the event correctly still lose.",
                options: [
                  {
                    text: "You must be right about the outcome and about a reaction that is already partly priced",
                    correct: true,
                  },
                  { text: "News is usually false", correct: false },
                  { text: "Markets ignore news entirely", correct: false },
                  { text: "The direction is obvious but the timing is not", correct: false },
                ],
              },
              {
                prompt: "A breakout occurs during a very thin trading period. How should you weight it?",
                explanation:
                  "More sceptically. Thin depth means the same order moves price further, so the move required less genuine participation. The visual evidence is identical; the underlying question of how many participants transacted has a different answer.",
                options: [
                  { text: "As weaker evidence, since thin depth exaggerates moves", correct: true },
                  { text: "As stronger evidence, since it moved without resistance", correct: false },
                  { text: "Identically — the chart is the chart", correct: false },
                  { text: "As a reason to increase position size", correct: false },
                ],
              },
              {
                prompt: "What is the correct defence against revenge trading?",
                explanation:
                  "A mechanical rule set in advance — no new position for a fixed period after a loss. It must not be a judgement call in the moment, because judgement is precisely what the loss has compromised.",
                options: [
                  {
                    text: "A fixed no-trading period after a loss, decided in advance rather than in the moment",
                    correct: true,
                  },
                  { text: "Reducing size and continuing immediately", correct: false },
                  { text: "Switching to a different market", correct: false },
                  { text: "Reviewing the losing trade before the next one", correct: false },
                ],
              },
              {
                prompt: "Which is a legitimate reason to take no trade at all?",
                explanation:
                  "All of them. Unclear structure means no statable invalidation; volatility outside your range makes sensible sizing impossible; and being tired, angry or rushed measurably degrades decisions without announcing itself.",
                options: [
                  {
                    text: "All of these — unclear structure, unusual volatility, or being tired or angry",
                    correct: true,
                  },
                  { text: "Only unclear structure", correct: false },
                  { text: "Only when volatility is too low", correct: false },
                  { text: "None — a plan should produce a trade", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Testing what you believe",
      description:
        "Turning a method into evidence: reviewing history honestly, forward-testing without money, and reading your own numbers.",
      lessons: [
        {
          title: "Reviewing history without fooling yourself",
          type: "TEXT",
          points: 10,
          body: `Looking back at charts is the cheapest way to develop a method and the easiest way to acquire false confidence. The difference is entirely in the procedure.

## Why casual review misleads

You know what happened. That knowledge contaminates everything. Scrolling a chart, you see the setup that worked because you can see the move that followed it, and you do not see the identical setup that failed because nothing drew your eye to it.

This is not carelessness. It is unavoidable when the outcome is visible, and it makes casual review nearly worthless as evidence.

## The procedure that works

Hide the future. Cover the chart beyond a point, or replay it period by period using a tool that does this.

Write the decision before advancing. Note the setup, the invalidation, the size and the expectation, exactly as you would live.

Advance and record the outcome. Then move on without adjusting the rule.

That last part is where discipline is needed. The urge after a loss is to add a condition that would have avoided it. Do that repeatedly and you have fitted the rule to the sample.

## Count the negatives

The critical discipline: record every instance where your conditions were met, including the ones that failed. A record of your successful applications is a highlight reel.

If your rule triggered forty times and worked eighteen, that is the information. Twelve remembered successes is not.

## Sample size

Fifty instances is a minimum for a rough sense. A hundred is better. Below that, variance dominates and you are measuring noise.

This is why historical review is valuable — you can accumulate a hundred instances in an afternoon, where live trading would take a year.

## Different conditions

Test across a rising market, a falling market, and a sideways one. A rule that works only in one condition is not wrong, but you must know which condition it needs and be able to identify that condition live.

Most methods that appear excellent were tested in the condition that suited them.

## What historical review cannot tell you

Whether you will execute it. The gap between a rule on paper and a rule under pressure is enormous, and it is the gap most methods die in.

Whether the market will continue behaving this way. A rule derived from three years of history may reflect a regime rather than a permanent property.

## The honest use

Historical review is for eliminating ideas cheaply. A rule that fails on history will not work live. A rule that works on history may or may not.

That asymmetry is what it is for: not proving things, but discarding them before they cost you money.`,
          activity: {
            title: "Test one rule properly, counting failures",
            prompt:
              "Take one specific rule from your own method — stated precisely enough to be applied mechanically. Then review historical data with the future hidden, advancing period by period, and record every single instance where the conditions were met, including failures. Aim for thirty instances minimum. Write down the count, the success rate, and the average result. Then write down whether the number surprised you, and resist the urge to add a condition that would have fixed the losses.",
          },
        },
        {
          title: "Forward-testing without money",
          type: "TEXT",
          points: 10,
          body: `The step between historical review and real money, and the one almost everybody skips because it feels like a waste of time. It is the cheapest information available to you.

## What it is

Applying your method to live markets, in real time, recording every decision, with no money at stake.

The difference from historical review is that you cannot see what happens next. That is the whole value — it is the only way to test whether your rules are actually applicable in real time, or whether they were only obvious in hindsight.

## What it catches

Rules that are not applicable live. A great many conditions that seem clear on a historical chart are ambiguous while forming. You discover this immediately when you have to decide before knowing.

Rules that are ambiguous. If you find yourself unsure whether a condition is met, the rule is not precise enough and needs rewriting.

The frequency problem. Many methods produce far fewer live signals than historical review suggested, because in review you skipped the periods where nothing happened.

## What it does not catch

Your behaviour under financial pressure. Without money at stake, holding through a drawdown is easy and closing a loser is painless. That is the one thing forward-testing cannot simulate.

Which is why the step after this is real money at a size small enough to be irrelevant — not a size that matters.

## How long

Enough instances to be meaningful, which for most methods means at least a month and often three. Long enough to encounter more than one market condition.

The strong temptation is to cut it short after a good run and start trading. Resist that specifically, because a good run early is exactly when your evidence is thinnest.

## Doing it properly

Same journal, same fields, same discipline. Record before, outcome after, kept separate.

Record the trades your rules said not to take, and what they did. This tells you whether your filters are removing losers or removing winners.

## Then start small

When you move to real money, size so that being wrong about having an edge costs you very little. Not a size that feels meaningful — a size that is genuinely irrelevant to you.

Increase only after a large sample with positive expectancy and a followed process. Not after a good month. A good month is noise.

## Why people skip it

Because it produces no money and takes months, and because they are confident. That confidence has not yet been tested, which is precisely the argument for testing it.

The people who skip this step pay for the same information later, with money, at a much higher price.`,
          activity: {
            title: "Start a forward test today",
            prompt:
              "Begin a forward test now, with no money involved. Write down the start date, the exact rules you are testing, and the number of instances you will require before drawing any conclusion — commit to at least thirty. Then record your first entry today, even if it is a no-trade decision with the reason. Also write down, honestly, what you expect your win rate to be. Comparing that expectation to the result later is the most instructive number you will generate.",
          },
        },
        {
          title: "Reading your own numbers",
          type: "TEXT",
          points: 10,
          body: `Once you have a sample, the numbers tell you things you cannot see any other way. Most traders never calculate them, and so never learn what their record contains.

## Expectancy

Average result per trade after costs. Win rate times average win, minus loss rate times average loss.

This is the number that matters. A 30% win rate with large winners can be excellent; an 80% win rate with occasional enormous losses is a disaster waiting to complete.

Anyone quoting a win rate without the average win and loss is telling you almost nothing.

## Distribution, not just average

Look at the shape. Are your results clustered, or driven by a handful of outliers?

If removing your three best trades makes you unprofitable, your method depends on rare large winners. That is a legitimate approach, and it means you must take every signal — missing one of the rare ones destroys the result.

If removing your three worst makes you profitable, you have a discipline problem rather than a method problem. Find what those three had in common; it is usually oversizing, revenge, or a broken rule.

## Drawdown

The largest peak-to-trough decline. This is what you must survive, and it is what determines whether you can keep executing.

Your historical maximum drawdown is a floor, not a ceiling. A future worse one is likely simply because you have more trades ahead than behind.

## Calibration

Split trades by the confidence you recorded. If high-confidence trades work more often, your judgement carries signal and can inform sizing. If not, your confidence is noise and must not affect size.

This single check is worth more than most analysis, and almost nobody runs it.

## Grouping

By market, by session, by condition, by day of week, by whether you followed your rules.

The last grouping is usually the most revealing. Traders frequently find their rule-following trades are profitable and their exceptions are not — which means the method works and the problem is them.

## Costs

Total spread and fees paid, as a percentage of your account. Frequent traders are often startled. If costs exceed your gross profit, your analysis is irrelevant — you have a frequency problem.

## The uncomfortable part

The numbers may say your method has no edge. That is valuable information, and it is the reason most people avoid calculating them.

Not calculating does not make it untrue. It only delays the point at which you find out, and the delay is expensive.`,
          activity: {
            title: "Calculate your six numbers",
            prompt:
              "From whatever record you have, calculate: expectancy per trade after costs, win rate, average win, average loss, maximum drawdown, and total costs as a percentage of your account. Write all six. Then do two removals: your three best trades, and your three worst. Write what happens to expectancy in each case. Finally, group by whether you followed your rules and write the expectancy of each group. If you lack the data, write the date by which you will have it.",
          },
        },
        {
          title: "Changing a method without destroying it",
          type: "TEXT",
          points: 10,
          body: `Methods need to evolve, and most changes make things worse. The difference between improving and thrashing is entirely in the discipline around the change.

## Why most changes are harmful

They are reactions to recent results. A losing run produces a change; the change is untested; results continue to vary for ordinary reasons; another change follows.

The trader ends up permanently running a new method, never accumulating evidence about any of them, and concluding that nothing works.

## When a change is justified

A large sample shows a specific, identifiable problem. Not a bad month — a hundred trades showing that one condition consistently underperforms.

A structural reason exists. The market you trade has genuinely changed in a way you can articulate independently of your results.

You identified an execution problem. You keep breaking a rule; either the rule needs to be realistic or you need a mechanism.

## When it is not justified

A losing run. Losing runs are statistically certain and say almost nothing.

A single memorable loss. The most vivid trade is not the most informative.

Someone else's approach looking better. Their record is selectively presented and you cannot see their drawdowns.

Boredom.

## How to change safely

One variable at a time. Change two and you cannot attribute the difference.

Write down what you are changing, why, and what you expect. This lets you evaluate the change rather than absorb it.

Keep the sample separate. Do not merge before-and-after into one record; you will not be able to tell them apart.

Give it a fair sample before judging. Reverting after ten trades repeats the original error at the next level.

## The version log

Keep a dated log: what changed, why, what you expected, what happened over the following sample.

After a year this is the most valuable document you own. It shows whether your changes have improved things or whether you have been going in circles — and going in circles is the more common finding.

## The stability principle

A mediocre method executed consistently for a year beats an excellent method changed monthly. Consistency is not a virtue for its own sake; it is the only condition under which evidence accumulates.

If you change constantly, you will never know what works, no matter how good any individual idea was.`,
          activity: {
            title: "Start the version log",
            prompt:
              "Create a version log with dated entries: what changed, why, expected effect, sample size before judging, actual result. Backfill it with every change you have made to your approach in the last year, as honestly as you can remember, including changes made after a losing run. Then count how many were justified by evidence and how many were reactions. Write that ratio down — for most people it is the most sobering number in this course.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on testing. The theme throughout is sample size and honesty about failures — the two things that separate a method from a collection of remembered successes.`,
          quiz: {
            title: "Testing and evidence",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "Why is casually scrolling historical charts nearly worthless as evidence?",
                explanation:
                  "Because you can see what happened next. Successful instances draw the eye and identical failures do not, so the review becomes a highlight reel rather than a count. The fix is hiding the future and recording every instance including failures.",
                options: [
                  {
                    text: "You can see the outcome, so successes draw your eye and failures do not",
                    correct: true,
                  },
                  { text: "Historical data is inaccurate", correct: false },
                  { text: "Past conditions never repeat", correct: false },
                  { text: "It takes too long to be practical", correct: false },
                ],
              },
              {
                prompt: "What can forward-testing catch that historical review cannot?",
                explanation:
                  "Rules that are ambiguous or inapplicable in real time. Many conditions look obvious on a completed chart and are unclear while forming — you only discover this when forced to decide before knowing the outcome.",
                options: [
                  {
                    text: "Rules that are ambiguous or unusable when you cannot see what happens next",
                    correct: true,
                  },
                  { text: "How you behave under financial pressure", correct: false },
                  { text: "Whether the market will change regime", correct: false },
                  { text: "Your maximum drawdown", correct: false },
                ],
              },
              {
                prompt:
                  "Removing your three worst trades would make you profitable. What does that indicate?",
                explanation:
                  "A discipline problem rather than a method problem. Those three usually share a cause — oversizing, revenge trading, or a broken rule — and finding what they have in common is more valuable than changing the method.",
                options: [
                  {
                    text: "A discipline problem — find what those three had in common",
                    correct: true,
                  },
                  { text: "That the method needs new entry conditions", correct: false },
                  { text: "That you should trade a different market", correct: false },
                  { text: "Nothing — outliers should always be excluded", correct: false },
                ],
              },
              {
                prompt: "When is changing your method justified?",
                explanation:
                  "When a large sample shows a specific identifiable problem, when the market has structurally changed for a reason you can articulate independently, or when you have identified an execution problem. A losing run alone is statistically certain and says almost nothing.",
                options: [
                  {
                    text: "When a large sample identifies a specific problem, or the market structurally changed",
                    correct: true,
                  },
                  { text: "After a run of losses", correct: false },
                  { text: "After a particularly memorable loss", correct: false },
                  { text: "When another approach appears to be performing better", correct: false },
                ],
              },
              {
                prompt: "Why does a win rate on its own tell you almost nothing?",
                explanation:
                  "Because expectancy depends on the size of wins and losses too. A 30% win rate with large winners can be excellent; an 80% win rate with occasional enormous losses is a disaster in progress.",
                options: [
                  {
                    text: "Expectancy depends on average win and loss sizes, not just how often you win",
                    correct: true,
                  },
                  { text: "Win rates are usually miscalculated", correct: false },
                  { text: "Win rate only applies to trend strategies", correct: false },
                  { text: "It is unaffected by costs", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Execution",
      description:
        "The gap between a plan and a filled order. Order types, slippage, and the costs that quietly consume an edge.",
      lessons: [
        {
          title: "Order types, and what each one costs you",
          type: "TEXT",
          points: 10,
          body: `A plan becomes a position through an order, and the type you choose changes what you pay and what you risk. Most people use one type for everything and never count the cost.

## Market orders

Buy or sell immediately at whatever price is available. Certain to fill, uncertain in price.

The cost is the spread plus slippage — the difference between the price you saw and the price you got, which grows with your size and shrinks with market depth.

Appropriate when getting in or out matters more than the price: exiting a position that has invalidated, for instance. Being precise about the price of a stop-out is a false economy.

## Limit orders

Fill only at your price or better. Certain in price, uncertain whether they fill at all.

The cost is the trades you miss. Price comes within a fraction of your level, reverses, and the move happens without you.

Appropriate when you have a specific level in mind and are willing to miss the trade. Most planned entries should be limit orders, because a planned entry that has to chase was not really planned.

## Stop orders

Trigger a market order when price reaches a level. Used for protective stops.

The cost is that once triggered, you get a market fill — which in a fast move can be considerably worse than your trigger price. This is why a stop is not a guarantee of your loss size; it is a guarantee of when you exit, not at what.

In violent conditions, the difference can be large. Sizing that assumes a perfect stop fill is sizing that has not accounted for the worst days.

## Stop-limit orders

Trigger a limit order instead. Protects you from a terrible fill and introduces a much worse risk: in a fast move, price gaps past your limit and you are not filled at all, leaving you in a position you intended to exit.

For protective stops, this trade is usually wrong. A bad fill is survivable; an unclosed position in a collapse is not.

## Maker and taker

Many venues charge less for orders that rest in the book and more for those that consume it. Over many trades this difference is real money.

If your method allows resting orders, the fee saving accrues quietly. It is not a reason to change your method, and it is a reason to prefer limit entries where the method is indifferent.

## The practical set

Limit orders for planned entries. Market orders for exits that matter. Stop orders — not stop-limit — for protection. Know your venue's fee structure.

That is the whole of it, and knowing why is what stops you using stop-limits for protection because they sound safer.`,
          activity: {
            title: "Measure your own slippage",
            prompt:
              "For your next ten trades, or ten from your records, note the price you intended and the price you actually got, on both entry and exit. Calculate the average difference as a percentage. Then multiply by your typical number of trades per year to get an annual figure. Write it down. Then look up your venue's maker and taker fees and add those. That total is what execution costs you before any analysis is involved.",
          },
        },
        {
          title: "Slippage, spread and the size you can actually trade",
          type: "TEXT",
          points: 10,
          body: `Every method has a size above which it stops working, and almost nobody knows what theirs is until they exceed it.

## The spread

The gap between the best buy and best sell price. You pay half of it entering and half exiting, so a round trip costs you the full spread before anything else happens.

On liquid markets this is tiny. On less liquid ones it can exceed your entire expected edge per trade, which means the method cannot work there regardless of how good the analysis is.

## Slippage grows with size

A small order fills at the best available price. A larger one consumes that depth and continues into worse prices. The average price paid is worse than the price displayed.

This is why a method that works beautifully at small size can fail at ten times that size. Nothing about the analysis changed; the execution cost grew.

## Knowing your capacity

Look at the depth available near the current price. If your intended position is a meaningful fraction of it, you will move the market against yourself both entering and exiting.

Exiting is the harder problem. You can usually choose when to enter; you cannot always choose when to exit, and exits often happen when everyone else is also exiting and depth has thinned.

## The illiquid market trap

Smaller markets tempt traders because moves are larger and structure looks cleaner. The trap is that the spread is wide, depth is thin, and the exit — particularly a stop-out during a fall — happens at a far worse price than modelled.

A structure that looks perfect on a chart of an illiquid asset is frequently untradeable in practice at any size that matters.

## Costs against edge

The arithmetic that decides whether a method is viable: expected gain per trade minus round-trip cost, times number of trades.

A method expecting 0.5% per trade with 0.3% round-trip costs has 0.2% left. It is technically positive and extremely fragile — a slight increase in spread or a slight decrease in accuracy makes it negative.

A method expecting 3% per trade with the same costs is robust. Same analysis quality, entirely different viability.

## Frequency is the multiplier

Costs scale with trade count. A trader taking five trades a day pays costs 250 times a year more than one taking five a week.

This is why frequent trading requires a much larger per-trade edge to survive, and why the majority of very active traders lose specifically to costs rather than to bad analysis.

## The practical conclusion

Trade liquid markets. Know your round-trip cost as a number. Compare it to your expected gain per trade. If costs are a large fraction of expected gain, either trade less frequently or accept that the method is not viable.`,
          activity: {
            title: "Work out your viability",
            prompt:
              "Calculate three numbers for your main market: the current spread as a percentage, your average slippage from the previous lesson, and your venue fees. Sum them for a round trip. Then take your expected or actual average gain per trade and subtract. Write what is left. Then multiply by your trades per year. If the remainder is small or negative, write down which you will change — the market, the frequency, or the method.",
          },
        },
        {
          title: "The gap between the plan and what you do",
          type: "TEXT",
          points: 10,
          body: `Most traders have better plans than results, and the difference is entirely in execution under pressure. This lesson is about closing that gap mechanically rather than by resolving to try harder.

## The common deviations

Entering before the condition is met, because it looks like it will be.

Not entering when it is met, because it feels wrong.

Moving the stop further away as price approaches it.

Taking profit early because the position is up and it feels good to bank it.

Adding to a loser to improve the average.

Sizing up after wins or down after losses, when the rule says a constant fraction.

Every one of these is a decision made in the moment that overrides a decision made calmly.

## Why willpower does not fix it

The plan was made in a calm state and is executed in an aroused one. Under pressure, the reasoning that produced the plan is not available — you are running on a different system.

Deciding to be more disciplined does not work, because the person making that decision is not the person who will be present at the moment it matters.

## Mechanical solutions

Place the protective order when you enter. Not later, not mentally — as an order in the book. An order you must actively cancel is far harder to override than an intention.

Pre-set your exit orders where the plan says.

Use a checklist before entry. Physically tick the conditions. This slows you enough for the deliberate system to engage.

Set a maximum trades per day or week. When it is used, you are finished, regardless of what appears.

Set a daily loss limit that stops you entirely. This is the single most protective rule available, because the worst sequences are all compressed into one bad day.

## Recording deviations

In your journal, one field: did I follow the plan, yes or no. Nothing else, no explanation.

After fifty trades, count. Then compare the expectancy of the followed trades against the deviations. Most people find the followed set is profitable and the deviations are not, and seeing that in their own numbers is more persuasive than any advice.

## The conditions that produce deviation

Note your state when you deviate. Most people find a pattern — after a loss, late in the day, when tired, when a position has been open a long time.

Once you know your pattern, you can build a rule against that specific condition rather than against deviation in general. A rule that says "no new positions after 9pm" is enforceable. "Be more disciplined" is not.

## The realistic goal

Not perfection. A reduction in deviation rate, tracked, over time. From 40% of trades to 15% is an enormous improvement in results and is achievable. From 40% to zero is not, and aiming for it produces the shame that stops people recording honestly.`,
          activity: {
            title: "Find your deviation pattern",
            prompt:
              "Go through your recorded trades and mark each one: followed the plan, or did not. Calculate your deviation rate as a percentage. Then, for the deviations, note the conditions — time of day, whether it followed a loss, how long you had been at the screen, your mood if you recorded it. Find the pattern. Then write one mechanical rule targeting that specific condition, phrased so that a stranger could tell whether you had broken it.",
          },
        },
        {
          title: "Building the routine",
          type: "TEXT",
          points: 10,
          body: `Everything in this course has to fit into a repeatable weekly rhythm, or it becomes something you did once during a course.

## Before the session

Check the higher timeframe structure. Has anything changed since yesterday? Are the levels still the levels?

Check what is scheduled. Any known event that will change volatility.

Check yourself. Tired, angry, rushed, or recovering from a loss? If yes, that is a no-trade session, and knowing it in advance is worth more than any analysis.

Ten minutes. It is the difference between trading a plan and reacting to a screen.

## During

Only trades on your list, or ones that clearly meet your written conditions. If it is not on the list and does not meet the conditions, it is not a trade.

Write the note before entering. Every time, no exceptions. The note is the mechanism.

Place the protective order with the entry.

Then step away. Watching a position does not improve it and materially increases the chance you interfere with it.

## After the session

Record outcomes against the notes you wrote. Mark followed or deviated. Two minutes.

Do not analyse yet. The analysis belongs to the weekly review, when the emotion has drained out.

## Weekly

Count deviations. Review the trades you did not take and what they did. Note anything that repeatedly caused a deviation.

Do not change the method. Weekly is too frequent to draw conclusions from.

## Monthly

Calculate expectancy and check confidence calibration. Look at your grouping — by session, by market, by condition. Read the version log.

This is where a change might be justified, if a large enough sample supports it.

## Quarterly

The honest question: is this working, measured against doing nothing? Is my drawdown within what I planned for? Am I still following my own stopping rule?

## Why a routine rather than motivation

Because motivation is a bad input to something you need to do the same way every day for years. A routine you can run when uninterested is the only kind that survives, and the discipline this course keeps asking for is entirely a product of structure rather than character.

The trader who is still doing this consistently in three years is not the one who wanted it most. It is the one whose routine did not depend on wanting it.`,
          activity: {
            title: "Write your routine and run it once",
            prompt:
              "Write your routine at all five intervals — before, during, after, weekly, monthly — as concrete actions with time estimates. Keep the daily parts under fifteen minutes total or you will not do them. Then run the before-session part today, in full, including the honest check on your own state. Write down what it surfaced. If it surfaced nothing, run it again on a day when you are tired and see whether it catches that.",
          },
        },
        {
          title: "Assignment: audit your own execution",
          type: "ASSIGNMENT",
          points: 25,
          body: `The third graded piece. It is about the gap between your plan and your behaviour, measured with numbers rather than described with intentions.

If you have no trading record, run a forward test for thirty decisions first and use that. Fabricated numbers teach nothing.`,
          assignment: {
            title: "Execution audit",
            instructions: `Audit your own execution using real data. 600 to 900 words. Use your own records — forward-test records are acceptable and should be labelled as such.

**1. Costs.** Your round-trip cost as a number: spread, measured slippage, and venue fees. Multiply by your trades per year. State what percentage of your account that is annually.

**2. Viability.** Your average gain per trade against that round-trip cost. State what is left and whether the method survives it. If the margin is thin, say what you will change — market, frequency or method.

**3. Deviation rate.** The percentage of trades where you did not follow your plan. Then the expectancy of the followed set against the deviated set, as separate numbers.

**4. The pattern.** The conditions under which you deviate: time, state, whether it follows a loss, how long you had been at the screen. Name the pattern specifically.

**5. Mechanical countermeasures.** One rule per identified pattern, phrased so a stranger could judge whether you had broken it. "Be more disciplined" is not a rule; "no new position within two hours of a loss" is.

**6. Order types.** Which types you use for entries, exits and protection, and why. State explicitly whether you use stop-limit for protective stops, and if so, whether you have considered the unfilled-in-a-collapse risk.

**7. Your routine.** The five intervals with concrete actions and honest time estimates. State which part you are most likely to skip and what makes skipping it harder.

**8. The honest number.** Your deviation rate target for the next quarter. It should be a reduction, not zero — and say why zero is not the target.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Costs are measured, not estimated",
                weight: 20,
                descriptor:
                  "Real spread, measured slippage and actual fees, annualised against trade frequency and expressed as a percentage of the account.",
              },
              {
                criterion: "Viability is calculated honestly",
                weight: 20,
                descriptor:
                  "Average gain against round-trip cost with the remainder stated. Full marks act on a thin margin rather than noting it.",
              },
              {
                criterion: "Deviation is quantified and split",
                weight: 25,
                descriptor:
                  "A real deviation rate plus separate expectancy for followed and deviated trades. Full marks report the numbers even when unflattering.",
              },
              {
                criterion: "Countermeasures are mechanical and checkable",
                weight: 20,
                descriptor:
                  "Rules targeting the identified pattern, phrased so a third party could judge compliance. Resolutions to try harder score zero here.",
              },
              {
                criterion: "Routine and order types are deliberate",
                weight: 15,
                descriptor:
                  "Concrete routine with realistic times and a named likely-skipped step, plus justified order-type choices including the stop-limit risk.",
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "The limits of all of this",
      description:
        "The module most trading courses omit: what this discipline cannot do, and how to know whether it is working for you.",
      lessons: [
        {
          title: "Why most people lose, and it is not the charts",
          type: "TEXT",
          points: 10,
          body: `The uncomfortable statistics, stated plainly, because everything in this module depends on accepting them.

## What the data says

Across studies of retail traders in various markets, the large majority lose money over time. Among the more active, the proportion is higher. Regulated brokers in some jurisdictions are required to publish the share of client accounts that lose, and the figures typically sit between 70 and 85%.

This is not a reason to give up. It is a reason to know what you are entering, and to be suspicious of anyone who does not mention it.

## Why they lose

Costs. Every trade pays a spread and often a fee. Trade frequently enough and costs alone are a substantial annual drag, before any analysis is involved.

Size. Positions too large relative to the account, so a normal losing run — which is statistically certain — causes ruin. This is the biggest single cause, and it is arithmetic rather than skill.

Inconsistency. Changing method after losses, which guarantees you are always running an untested approach and never accumulating evidence about any of them.

Overtrading. Acting from boredom or the need to be doing something. The market does not offer good opportunities continuously, and most of what feels like an opportunity is noise.

Not cutting losses. Holding losers hoping for recovery while taking winners early — the exact inverse of what works, driven by wanting to be right rather than wanting to be profitable.

## What is not usually the cause

Not knowing enough patterns. The traders losing money generally know more patterns than the ones making money.

Not having the right indicator. There isn't one.

Manipulation. It exists, and it is not why most retail accounts lose. Costs, size and inconsistency are.

## What this means for you

Analytical skill is necessary and nowhere near sufficient. A trader with mediocre analysis, good sizing and total consistency will outperform an excellent analyst with poor discipline. Reliably, and not by a small margin.

So the skills that actually matter, ranked: risk management, consistency, patience, then analysis. This course teaches the fourth, and it is telling you the first three matter more.

## The honest recommendation

Most people should not trade actively. Buying broad exposure periodically and leaving it alone beats the large majority of active traders, requires no skill, and costs almost nothing in time.

If you trade, do it with an amount you can lose entirely, keep records, and periodically check whether you are actually beating that simple alternative. If after a hundred trades and a year you are not, the evidence is telling you something and the correct response is to believe it.

That paragraph is the most valuable one in this course, and it argues against its own subject. That is what makes it trustworthy.`,
          activity: {
            title: "Compare yourself against doing nothing",
            prompt:
              "Work out your actual trading result over the longest period you have records for — total profit or loss, after all costs. Then work out what the same money would have done if you had bought a broad market exposure at the start of that period and not touched it. Write both numbers. Then write down how many hours you spent trading in that period, and divide your result by those hours. If the honest answer is unflattering, write down what you will conclude from it.",
          },
        },
        {
          title: "Randomness, streaks and the stories you will tell",
          type: "TEXT",
          points: 10,
          body: `Markets contain a great deal of randomness, and human beings are extremely poor at recognising it. This combination produces most of the false confidence in trading.

## We see patterns in noise

Show people random sequences and they find trends, cycles and structure. This is not stupidity; it is a highly useful instinct applied to a domain where it misfires badly.

Some of what you see on a chart is structure. Some is noise that looks exactly like structure. No amount of experience lets you tell them apart by eye — only records over many trades can.

## Streaks are normal

With a coin, eight heads in a row will appear roughly once in 256 tries. Over hundreds of trades, long runs both ways are expected, not exceptional.

A trader on a winning streak feels they have found something. A trader on a losing streak feels their method has stopped working. Both are usually experiencing ordinary variance, and both frequently take the worst possible action — increasing size after wins, abandoning the method after losses.

## Small samples say nothing

Ten trades tell you essentially nothing about a strategy. Even fifty is thin. The variance in outcomes over small samples swamps the signal.

Which means: you cannot evaluate a method after ten trades. You cannot even evaluate it well after fifty. Almost everyone changes methods far more often than the evidence could possibly justify.

## The narrative reflex

After every outcome, your mind produces an explanation. It will do this whether or not a real cause exists.

The defence is the written note. If you wrote your reasoning before, you can compare it to the story you tell after. The gap between them is the most instructive thing in your journal, and it exists in everyone.

## Confidence is usually uncalibrated

Most people's confidence carries little information about their accuracy. The way to find out is to record confidence as a number and check whether high-confidence trades actually work more often.

If they do, your judgement carries signal and you can weight by it. If they do not, your confidence is a feeling and should not affect your sizing at all.

Almost nobody runs this check, and it is one of the highest-value things in this course.

## What to do about it

Standardise size, so a streak cannot compound into ruin. Judge over large samples, not recent results. Record before, not after. Accept that some of your results — good and bad — are noise, and stop explaining them.

The trader who says "I do not know why that worked" is being more honest than the one with a clean explanation for every outcome, and honesty here is what allows learning.`,
          activity: {
            title: "Check whether your confidence means anything",
            prompt:
              "Take every trade you have recorded with a confidence rating — or start rating from now if you have none, and come back. Split them into high confidence and low confidence. Calculate the win rate of each group. Write both numbers. If they are close, your confidence carries no information and must not affect your position sizing. Write down what you will change. If you do not yet have the data, write the date by which you will have fifty rated trades.",
          },
        },
        {
          title: "Knowing whether it is working",
          type: "TEXT",
          points: 10,
          body: `At some point you have to answer honestly whether this is working for you. Most people avoid the question indefinitely, which is itself an answer.

## The measure that matters

Expectancy: average result per trade, after all costs. Win rate multiplied by average win, minus loss rate multiplied by average loss.

If it is positive across a meaningful sample, you have an edge. If it is negative, you do not, whatever the recent results look like.

## The sample problem

A hundred trades is a reasonable minimum. Two hundred is better. Below that, variance dominates and you are measuring luck.

This is inconvenient, because it means you cannot know for a long time — and in the meantime you must trade small enough that being wrong about having an edge is survivable. That constraint is the whole reason position sizing comes first.

## The comparison that matters

Not whether you made money. Whether you made more than the simple alternative — broad exposure, bought periodically, left alone — after accounting for the hours you spent.

Many people who are up on the year underperformed doing nothing, and never check.

## Decision points

After a hundred trades with positive expectancy and a followed process: continue, and consider size within your risk rules.

After a hundred trades with negative expectancy: something is wrong. Options are fixing the identified problem — usually sizing, overtrading or inconsistency — or stopping. Both are legitimate. Continuing unchanged is not.

After a hundred trades where you did not follow your process: you have no data at all, because you did not run the experiment. Fix the consistency before evaluating anything else.

## The identity problem

The hardest part is that people become attached to being a trader. Stopping feels like failure, so they continue past the point the evidence justifies, often increasing size to recover.

It is worth deciding in advance: what result, over what sample, would make me stop? Write it now, while you are calm. A rule set in advance is the only kind that survives the moment it applies.

## The other outcome

Some people find they genuinely have an edge, and the work compounds. That happens, and this course exists partly for them.

But it happens to a minority, and the honest version of this education says so rather than implying the reader is obviously in that minority. Everyone believes they are. That belief is not evidence.

## What is worth keeping regardless

Even if you stop trading, the habits transfer: stating a claim before the outcome, defining what would prove you wrong, recording rather than remembering, distinguishing process from result. Those are worth more than most of what people take away from trading, and they apply to every decision you will make under uncertainty.`,
          activity: {
            title: "Write your stopping rule now",
            prompt:
              "While you are calm and nothing is at stake, write your stopping rule as a specific sentence: after how many trades, at what expectancy or drawdown, you will stop or materially change what you are doing. Include the comparison against simply holding broad exposure. Then write what you would do instead with the time and money. Sign and date it. A rule written in advance is the only kind that survives the moment it becomes relevant.",
          },
        },
        {
          title: "What you can now do",
          type: "TEXT",
          points: 10,
          body: `A short accounting before the capstone, in the same honest register as the rest of the course.

## What you can do

Read a chart as a record of transactions rather than a set of predictive shapes, and describe what is actually there before saying what it means.

Define trend, range and transition structurally, using a rule you wrote down, so that your reading is checkable rather than a matter of taste.

Identify where liquidity sits, and explain why price is repeatedly drawn to obvious levels — including the level just beyond where everyone puts their stop.

Work across timeframes without contradicting yourself, by stating the timeframe of an idea before entering and managing on it.

Use a small set of tools that measure genuinely different things, and say what each would look like when it fails.

Derive an invalidation from structure and a position size from that invalidation, rather than choosing a stop that fits a size you already wanted.

Keep a journal that separates before from after, and that will eventually tell you whether your confidence means anything.

## What you know that most chart readers do not

That an indicator adds no information. That published pattern statistics omit the failures. That the same price action produces different candles on different period boundaries. That a broken uptrend is not a downtrend. That the stop is where you are wrong, and size is how much you are willing to lose. That most retail traders lose, mostly to costs, size and inconsistency rather than to bad analysis.

## What you still cannot do

Predict. Nothing here does that, and the course would be dishonest to end on any other note.

## The sentence to keep

A chart tells you where transactions happened and where your idea would be wrong. That second half is the entire practical value, and it is enough — because knowing where you are wrong is what lets you size a position so that being wrong does not matter much.

## What is left

The capstone, and then the long, unglamorous business of doing the same thing repeatedly, recording it honestly, and being willing to believe what the record eventually says — including if it says to stop.`,
          activity: {
            title: "Answer your own starting position",
            prompt:
              "Go back to the first lesson, where you wrote what you believed a chart could tell you and what your record was. Read it again. Now write the honest update: what of that belief survived, what was wrong, and what you now think a chart can and cannot do. Then write down the single habit from this course you are most likely to abandon under pressure, and the specific thing you will do to make abandoning it harder.",
          },
        },
        {
          title: "Capstone: your trading method, written down",
          type: "ASSIGNMENT",
          points: 40,
          body: `The final piece. It asks you to write your method as a document precise enough that someone else could follow it and produce the same decisions — which is the only real test of whether you have a method rather than a habit.`,
          assignment: {
            title: "Your complete trading method",
            instructions: `Write your method as a single document, 1,000 to 1,500 words. It will be read as though someone had to execute it without you in the room.

**1. Scope.** What markets, what timeframes, roughly how often you expect to trade, and what conditions you will not trade in at all.

**2. Definitions.** Your swing rule, your criteria for a level, your list of tools with what each measures. Precise enough that another person applying them to the same chart reaches the same reading.

**3. Entry conditions.** What has to be true structurally before you will consider a position. Written so that a reader could tell whether a given chart qualifies.

**4. Invalidation and sizing.** How you derive the invalidation from structure, how you check it against volatility, and the exact arithmetic converting it to position size. Include your maximum risk per trade and your maximum total exposure.

**5. Management.** When you exit early, when you move an invalidation, and your explicit rule that you never widen one. State your rule on partial exits and why it suits you specifically rather than in general.

**6. Records.** What you write before and after each trade, and your weekly, monthly and quarterly review questions.

**7. Evidence.** What you currently know about your own results — number of trades, expectancy if you have enough data, confidence calibration if you have checked it. If you have no data, say so plainly and state when you will.

**8. Your stopping rule.** The sample size and result at which you will stop or materially change, including the comparison against simply holding broad exposure. State what you would do instead.

**9. The weakest part.** Where this method will fail, and under what conditions. Every method has conditions it handles badly — a document claiming otherwise scores zero on this criterion.

No predictions about any market anywhere in this document. It is a description of a process, not a forecast.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Definitions are precise enough to be reproduced",
                weight: 20,
                descriptor:
                  "Another person applying these rules to the same chart would reach the same reading. Full marks avoid terms that depend on judgement without defining them.",
              },
              {
                criterion: "Entry conditions are checkable",
                weight: 15,
                descriptor:
                  "A reader could determine whether a given chart qualifies. Conditions that rely on how something looks score low.",
              },
              {
                criterion: "Invalidation and sizing are structural and arithmetical",
                weight: 25,
                descriptor:
                  "Invalidation derived from structure, checked against volatility, converted to size by shown arithmetic, with stated maximum risk. Full marks size from the stop rather than fitting the stop to a size.",
              },
              {
                criterion: "Management rules are firm and self-aware",
                weight: 15,
                descriptor:
                  "Clear exit and adjustment rules with an explicit no-widening rule, and a partial-exit decision justified by the writer's own behaviour rather than general advice.",
              },
              {
                criterion: "Evidence is reported honestly",
                weight: 15,
                descriptor:
                  "Real numbers where they exist, an honest admission and a date where they do not, and a stopping rule with a specific sample and threshold including the do-nothing comparison.",
              },
              {
                criterion: "The failure conditions are named",
                weight: 10,
                descriptor:
                  "Specific conditions under which the method performs badly. Claiming the method has no weak conditions scores zero here.",
              },
            ],
          },
        },
      ],
    },
  ],
};
