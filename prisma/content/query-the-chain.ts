import type { ContentCourse } from "./types";

/**
 * Query the Chain — SQL, dashboards and on-chain data.
 *
 * The most technical course in the catalogue and the only one that teaches a
 * directly employable skill. On-chain analysts are hired, and the entry
 * requirement is the ability to write a query and defend the number it
 * returns.
 *
 * Written for someone with no programming background. SQL is taught from
 * nothing, because the alternative — assuming a technical reader — excludes
 * exactly the audience this academy exists for.
 *
 * The editorial spine is that a number is worthless until you can say what it
 * counted and what it missed. Most on-chain analysis fails not on the query
 * but on the definition, and the course spends as much time on what a metric
 * excludes as on how to compute it.
 */
export const queryTheChain: ContentCourse = {
  slug: "query-the-chain",
  title: "Query the Chain: SQL, Dashboards and On-Chain Data",
  subtitle:
    "Stop reading other people's charts. Write the query yourself, know exactly what it counted, and build dashboards people rely on.",
  description: `Every claim about on-chain activity comes from a query somebody wrote. Whether that claim is true depends entirely on decisions that were made inside it — which addresses were counted, which were excluded, what window was used, and what the person doing it wanted to find.

Most people consume those numbers without being able to check any of it. This course is about writing them yourself.

You will learn SQL from nothing — no programming background assumed — and then the specific shape of blockchain data: how transactions, transfers, logs and decoded events are actually stored, and why a simple question like "how many users does this protocol have" has no simple answer.

Then the analysis: measuring activity without counting bots, tracking flows without double-counting, valuing what a protocol earns and who receives it, and building dashboards that stay correct when the data changes underneath them.

The discipline running through it is that a number is worthless until you can say what it counted and what it missed. Most on-chain analysis fails on the definition rather than the query, and a beautiful dashboard measuring the wrong thing is worse than no dashboard, because people act on it.

This is the only course here that teaches a directly employable skill. On-chain analysts are hired, and the entry requirement is being able to write a query and defend the number it returns.`,
  categorySlug: "on-chain-analysis",
  level: "INTERMEDIATE",
  priceMinor: 0,
  estimatedHours: 20,
  passThreshold: 80,
  instructorEmail: "grace@mabyacademy.com",
  outcomes: [
    "Write SQL from nothing — select, filter, group, join and aggregate",
    "Read the shape of blockchain data, including logs and decoded events",
    "Define a metric precisely enough that someone else could reproduce it",
    "Measure users and activity while accounting for bots and multiple addresses",
    "Trace flows between addresses without double-counting",
    "Compute protocol revenue and establish who actually receives it",
    "Build a dashboard that stays correct when the underlying data changes",
    "State what any number of yours excludes, before anyone asks",
  ],
  modules: [
    // =====================================================================
    {
      title: "SQL from nothing",
      description:
        "The language, taught from zero. No programming background needed — by the end of this module you can answer real questions.",
      lessons: [
        {
          title: "What a query actually is",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `SQL looks like programming and is closer to writing a precise request. If you can describe what you want in a careful sentence, you can learn this.

## The shape of the data

Everything is a table: rows and columns, like a spreadsheet with rules.

A table of transactions might have columns for the hash, the sender, the recipient, the value, and the block. Each row is one transaction.

Blockchain data is unusually well suited to this because it is already structured — every transaction has the same fields.

## The basic request

Three parts, in order: what columns you want, which table, and which rows.

Select the sender and the value, from the transactions table, where the value is greater than a hundred.

That sentence is almost exactly what you write. The language was designed in the 1970s to be readable by people who were not programmers, and that intention survives.

## Why write it yourself

Because every chart you have seen embeds decisions you cannot inspect. Which addresses were excluded, what counted as a user, what window was used.

Two analysts asking "how many people used this protocol last month" will produce different numbers, both correct under their own definitions. Without the query, you cannot tell which definition you are looking at.

## The four things you will learn

Filtering — narrowing to the rows you want.

Aggregating — turning many rows into one number: a count, a sum, an average.

Grouping — doing that separately for each category, which is where most real analysis lives.

Joining — combining two tables, which is how you turn addresses into names and transactions into meaning.

That is genuinely most of it. The rest is practice and knowing the data.

## Where to run it

Several platforms host blockchain data and let you write queries in a browser with no setup — no database to install, no software to configure.

Create an account on one before the next lesson. Everything here is written to work on any of them, because the language is standard even where the table names differ.

## The honest expectation

Two weeks of regular practice gets most people to the point of answering real questions.

It is not a difficult language. What is difficult, and takes much longer, is knowing what the data means — which is why this course spends four modules on that and two on the syntax.`,
          activity: {
            title: "Get set up and run one query",
            prompt:
              "Create an account on a platform that hosts blockchain data with a browser-based query editor. Find any existing public query, open it, and run it without changing anything. Then change one thing — a number in a filter, or a limit — and run it again. Write down what you changed and how the result differed. The goal is only to have executed something and seen it respond.",
          },
        },
        {
          title: "Select, where, order, limit",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `The four clauses that make up most queries. Learn these and you can already answer real questions.

## Select

Which columns you want back.

Writing a star means every column, which is useful for exploring an unfamiliar table and wasteful afterwards. Name the columns you actually need.

## From

Which table. Blockchain platforms usually organise these by chain and type — a transactions table, a logs table, decoded tables per contract.

Spend time looking at what exists before writing anything. Most beginner difficulty is not syntax; it is not knowing which table holds the thing.

## Where

Which rows. This is where most of the thinking goes.

Conditions can be combined with and and or. Text values go in quotes; numbers do not. Addresses are text, and they are usually stored lowercase — a query returning nothing is very often a case mismatch on an address.

Always filter by time. Blockchain tables are enormous, and a query with no time filter will be slow, expensive, or refused.

## Order by

How to sort. Descending for largest first, which is what you usually want when looking at top holders or biggest transfers.

## Limit

How many rows. Always use one while developing. You do not need ten million rows to find out whether your logic is right, and you will run the query twenty times before it is.

## Putting it together

Select the sender and the value from the transactions table, where the block time is in the last seven days and the value is above some threshold, ordered by value descending, limited to a hundred.

That is a complete, useful query and it uses only what is in this lesson.

## The habit that saves you

Build up in stages. Write the select and the from, run it, look. Add the where, run it, look. Then order and limit.

Writing thirty lines and then debugging is far slower than adding one clause at a time, and it is the single most common reason beginners get stuck.

## Comments

Anything after two dashes is ignored. Use them to say why a filter exists — future you will not remember why you excluded a particular address, and that exclusion is exactly what someone will ask about.`,
          activity: {
            title: "Write five queries from scratch",
            prompt:
              "On a chain of your choice, write five queries using only select, from, where, order by and limit. Build each one up in stages rather than writing it whole. Find: the ten largest transactions in the last day, all transactions from one specific address, transactions above a threshold in the last week, the most recent hundred transactions to a contract, and one question of your own. Write down which one gave you the most trouble and why.",
          },
        },
        {
          title: "Counting, summing and grouping",
          type: "TEXT",
          points: 10,
          body: `Aggregation turns many rows into a number, and grouping does it per category. This is where queries start answering real questions.

## The aggregate functions

Count gives you how many rows. Count of a specific column ignores empty values, which occasionally matters.

Count distinct gives you how many different values — the difference between how many transactions and how many senders, which is a distinction this whole course cares about.

Sum, average, min and max do what they say.

## Group by

The important one. It splits the rows into buckets and computes the aggregate for each.

Group transactions by sender and count, and you get the number of transactions per address. Group by day and sum, and you get daily volume.

The rule that catches everyone: every column in your select must either be aggregated or appear in the group by. If you ask for the sender and a count, you must group by sender.

## Having

Where filters rows before grouping. Having filters groups after.

To find addresses with more than a hundred transactions, you count grouped by sender, then use having to keep only the groups above a hundred. Using where for this does not work, because the count does not exist yet when where runs.

This distinction confuses everyone once and then never again.

## Time grouping

Almost every dashboard groups by time. Platforms provide a function to truncate a timestamp to a day, week or month.

Truncate the block time to a day, group by it, and you have a daily series ready to chart.

## The ordering trap

Grouping does not sort. Add an explicit order by, or your daily series will come back in an order that looks random and produces an unreadable chart.

## The first real query

Daily count of distinct senders and total volume, for one contract, over the last thirty days.

That is a genuine metric that people build dashboards on, and it uses only what is in these three lessons.

Write it. When it runs, you have crossed from reading other people's numbers to producing your own.`,
          activity: {
            title: "Build a daily activity series",
            prompt:
              "Write a query returning, per day for the last thirty days: the number of transactions, the number of distinct senders, and the total value — for one contract or token of your choice. Build it in stages. Then add a having clause to exclude days below some threshold and see what disappears. Write the query out and note the difference between the transaction count and the distinct sender count.",
          },
        },
        {
          title: "Joining tables",
          type: "TEXT",
          points: 10,
          body: `Joining combines two tables on a shared column, and it is what turns raw data into meaning.

## Why it is needed

One table has transactions with addresses. Another has labels saying which address belongs to which exchange or protocol.

Alone, the first gives you hashes and hexadecimal. Joined, it gives you a readable account of what happened.

## The mechanics

You state which two tables, and which column matches which. Rows that match are combined into one wide row.

Give each table a short alias and prefix your columns with it. Without that, a query with two tables that both have an address column will be ambiguous and confusing to read.

## Inner versus left

An inner join keeps only rows that matched. If a transaction's address has no label, that transaction disappears.

A left join keeps everything from the first table, with empty values where there was no match.

This choice is the most consequential decision in joining and it is made carelessly constantly. An inner join to a label table silently drops every unlabelled address — which is most of them — and your "total volume" is now the volume of labelled addresses only.

Default to a left join unless you specifically want only matched rows, and say which you used.

## The duplication problem

If the second table has more than one row per key, the join multiplies rows.

Join transactions to a table with three entries for the same address, and each transaction appears three times. Sum the value afterwards and it is three times too large.

This is the single most common way on-chain numbers come out wrong, and it is silent — nothing errors, the query just returns an inflated figure.

The check: count rows before and after the join. If the number went up, you have duplication and your aggregates are wrong.

## Subqueries

A query inside a query. Useful for filtering by the result of another calculation — the transactions belonging to the top hundred addresses, for instance.

Readable alternative: a with clause, which names a temporary result and lets you use it below. Long queries are far easier to follow written as several named steps than as one nested expression.

## The practical advice

Build joins one at a time, checking the row count after each. Three joins written together and debugged afterwards is a bad afternoon.`,
          activity: {
            title: "Join and check the row count",
            prompt:
              "Write a query joining a transactions table to a labels table so you can see which known entities are involved. Count the rows before and after the join and write both numbers — if they differ, work out why. Then run the same query with an inner join and a left join and write down how many rows disappeared with the inner version. That number is what an inner join would have silently removed from your analysis.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on the language. If any of these are uncertain, redo the exercises before continuing — everything after this assumes you can write and debug a query without help.`,
          quiz: {
            title: "SQL fundamentals",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "You want addresses with more than 100 transactions. Where does that condition go?",
                explanation:
                  "In a having clause, because it filters groups after aggregation. A where clause runs before grouping, when the count does not yet exist, so it cannot be used for a condition on an aggregate.",
                options: [
                  { text: "In having, because it filters groups after the count is computed", correct: true },
                  { text: "In where, alongside the other conditions", correct: false },
                  { text: "In the select clause", correct: false },
                  { text: "In order by, with a limit", correct: false },
                ],
              },
              {
                prompt: "After joining to a label table, your row count increased. What has happened?",
                explanation:
                  "The label table has more than one row per address, so the join multiplied rows. Any sum computed afterwards is inflated. This is the most common way on-chain numbers come out wrong, and it fails silently.",
                options: [
                  {
                    text: "Duplication — the second table has multiple rows per key, and your sums are now inflated",
                    correct: true,
                  },
                  { text: "Normal behaviour for any join", correct: false },
                  { text: "The join condition was written backwards", correct: false },
                  { text: "The first table contained duplicates", correct: false },
                ],
              },
              {
                prompt: "Why default to a left join when attaching labels?",
                explanation:
                  "An inner join silently drops every row whose address has no label — which is most addresses. Your total would then be the total of labelled addresses only, without any indication that anything was removed.",
                options: [
                  {
                    text: "An inner join silently drops all unlabelled addresses, which is most of them",
                    correct: true,
                  },
                  { text: "Left joins are faster on large tables", correct: false },
                  { text: "Inner joins cannot be used with text columns", correct: false },
                  { text: "It makes no practical difference", correct: false },
                ],
              },
              {
                prompt: "What is the difference between count and count distinct on a sender column?",
                explanation:
                  "Count gives the number of transactions; count distinct gives the number of different addresses. That distinction is the difference between activity and participants, and confusing the two is how user numbers get overstated.",
                options: [
                  {
                    text: "One counts transactions, the other counts different addresses",
                    correct: true,
                  },
                  { text: "They are equivalent for address columns", correct: false },
                  { text: "Count distinct excludes zero values", correct: false },
                  { text: "Count distinct is only valid on numeric columns", correct: false },
                ],
              },
              {
                prompt: "Your query returns nothing when filtering on an address. What is the likely cause?",
                explanation:
                  "A case mismatch. Addresses are stored as text and usually lowercased in these tables, so a query using a mixed-case address matches nothing. It is the most common cause of an empty result.",
                options: [
                  { text: "Case mismatch — addresses are usually stored lowercase", correct: true },
                  { text: "The address has no transactions", correct: false },
                  { text: "Addresses must be queried as numbers", correct: false },
                  { text: "The table needs an index first", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "The shape of blockchain data",
      description:
        "What is actually stored, where, and why a simple question has no simple answer.",
      lessons: [
        {
          title: "Transactions, traces and logs",
          type: "TEXT",
          points: 10,
          body: `Three different tables holding three different things, and choosing the wrong one is a common and invisible error.

## Transactions

The top-level actions someone initiated. One row per transaction: who sent it, to which address, how much native currency, how much gas, which block.

What it does not contain: anything that happened inside the transaction. A single transaction can move a dozen tokens between five contracts, and the transactions table shows one row with a value that may be zero.

Querying only this table and concluding nothing happened is a genuine beginner mistake.

## Traces

Internal calls — one contract calling another during a transaction. A single transaction can produce many traces.

This is where native currency movements inside a transaction appear. If you are following value and only using the transactions table, you are missing most of it.

Traces are large and slower to query. Use them when you need internal movement specifically.

## Logs

Events emitted by contracts. This is where most of what you actually want lives.

When a token moves, the token contract emits a transfer event. When a swap happens, the pool emits a swap event. These are the record of what occurred at the application level.

Raw logs are hexadecimal and difficult. Which is why the next lesson exists.

## Decoded tables

Most platforms provide decoded versions: readable tables per contract or per event type, with named columns.

A token transfers table with sender, recipient and amount as proper columns is enormously easier than parsing raw logs, and it is what you should use whenever it exists.

## Choosing

Someone sent native currency: transactions, plus traces if it might have been internal.

A token moved: the token transfer table.

Something happened in a protocol: that protocol's decoded event tables.

Gas costs, transaction counts, who initiated: transactions.

## The check that catches errors

Take one transaction you can inspect on a block explorer, and find it in your query results.

If your query says it moved nothing and the explorer shows three token transfers, you are querying the wrong table. That single check catches most structural mistakes and takes two minutes.`,
          activity: {
            title: "Follow one transaction through the tables",
            prompt:
              "Find a transaction on a block explorer that did something interesting — a swap, or several token transfers. Note what the explorer shows. Then find that same transaction in the transactions table, in the token transfers table, and in any relevant decoded table. Write down what each one showed and what it omitted. That comparison is the clearest possible illustration of this lesson.",
          },
        },
        {
          title: "Tokens, decimals and the mistake everyone makes",
          type: "TEXT",
          points: 10,
          body: `Token amounts are stored as integers with an implied decimal place, and getting this wrong produces numbers that are wrong by factors of a billion.

## How it works

Blockchains do not store fractions. A token with 18 decimals stores one whole token as a 1 followed by 18 zeros.

To get the human amount, divide by ten to the power of the token's decimals.

## Why it matters so much

Different tokens use different decimals. Many use 18. Several major stablecoins use 6. Some use 8.

If you assume 18 for a token using 6, your figure is a trillion times too large. This is not a subtle error and it appears in published dashboards regularly.

## The correct approach

Join to a token metadata table that has the decimals, and divide by that. Never hard-code 18.

If you must hard-code for a single known token, comment it explicitly with the token and its decimals, so the next person knows the assumption exists.

## The amount and the value

Two different things, constantly confused.

The amount is how many tokens moved. The value is what they were worth, which requires a price at that moment.

Prices come from a separate table, usually by token and hour or day. Joining to prices is how you turn 500 tokens into a dollar figure.

A dashboard reporting "volume" without saying whether it means token amount or dollar value is ambiguous, and both readings are common.

## Historical prices

Use the price at the time of the transaction, not today's price. Valuing last year's transfers at today's price produces a figure that is not wrong so much as meaningless.

This requires joining on both the token and the time period, which is a slightly awkward join and is the correct one.

## Missing prices

Not every token has price data, particularly small ones. A join to prices will silently drop them with an inner join, or produce empty values with a left join.

Either way, state it. "Volume, excluding tokens without price data" is an honest metric; "volume" is not, if that is what you computed.

## The check

Take one transfer, compute your figure, and compare it to what a block explorer shows for the same transfer.

If they differ by a power of ten, it is decimals. If they differ by a plausible amount, it is prices. If they match, you have it right.`,
          activity: {
            title: "Get one transfer exactly right",
            prompt:
              "Pick a single token transfer. Write a query returning its amount, correctly adjusted using the token's decimals from a metadata table rather than a hard-coded number. Then join to a price table to get its dollar value at the time it happened. Compare both figures to what a block explorer shows. Write down whether they matched, and if not, whether the error was decimals or prices.",
          },
        },
        {
          title: "Why 'how many users' has no answer",
          type: "TEXT",
          points: 10,
          body: `The most requested metric in this field is also the one with no correct definition, and understanding why is more valuable than any query.

## Addresses are not people

One person can control hundreds of addresses. One address can be a contract used by thousands of people.

An exchange's hot wallet is one address representing millions of customers. A single trader may operate fifty addresses deliberately.

So counting distinct addresses counts neither people nor accounts. It counts addresses.

## Contracts in the count

Much on-chain activity is contracts calling contracts. Counting distinct senders without excluding contracts inflates the figure with things that are not users in any sense.

Filtering to addresses that are not contracts is a start, and it is not sufficient — automated systems operate from ordinary addresses too.

## Bots

A large share of activity on most chains is automated: arbitrage, liquidations, market making.

These are real economic activity and they are not users in the sense anyone means when they ask. A protocol with a thousand daily addresses where nine hundred are bots does not have a thousand users.

Identifying them is imperfect. Signals include very high transaction frequency, activity at exact intervals, and near-identical repeated behaviour.

## Airdrop farming

Where a token is expected, people create many addresses to qualify. Activity rises, address counts rise, and almost none of it represents demand.

This is why user growth around an expected distribution should be treated as suspect by default, and why the tokenomics course asks what survives when incentives stop.

## What to do instead

Define the metric precisely and state the definition alongside the number.

"Distinct non-contract addresses with at least one transaction over 50 dollars in the period, excluding addresses with more than 100 transactions per day" is a defensible metric. It is not "users" and it should not be labelled as such.

## The honest framing

You are measuring addresses meeting stated criteria. Say that.

An analyst who reports "12,400 addresses meeting these criteria" is more credible than one reporting "12,400 users", because the first one is true and the second one is not.

## The standard for this course

Every metric you produce should come with its definition and its exclusions, close enough to the number that nobody reads one without the other.

That habit is the difference between analysis and decoration.`,
          activity: {
            title: "Define a user metric three ways",
            prompt:
              "For one protocol, write three different queries counting 'users' with three different defensible definitions — vary whether contracts are excluded, whether a minimum value applies, and whether high-frequency addresses are filtered. Write the three numbers side by side. Then write the definition you would publish, stated precisely enough that someone else could reproduce it exactly, and say what it excludes.",
          },
        },
        {
          title: "Data you cannot see",
          type: "TEXT",
          points: 10,
          body: `On-chain data is complete about what happened on chain and silent about a great deal that matters. Knowing the gaps is part of the skill.

## What is not visible

Identity. You see addresses, not people, and the mapping is guesswork except where someone published it.

Intent. You see that funds moved, not why. A transfer to an exchange might be a sale, a deposit for collateral, or an internal move.

Off-chain agreements. Deals, contracts and arrangements that determine why on-chain events occurred.

Anything on another chain, unless you query that chain too — and cross-chain flows are increasingly a large share of activity.

Centralised exchange activity. Trades inside an exchange never touch the chain. A token with heavy centralised volume has most of its trading invisible to you.

## The attribution problem

Labels — this address is an exchange, that one is a protocol treasury — come from someone's research and are incomplete and sometimes wrong.

Treat labels as evidence rather than fact, and say where they came from. A conclusion resting entirely on one label is resting on someone else's uncited work.

## Clustering

Grouping addresses believed to be controlled by one party, using funding patterns and behaviour.

Genuinely useful and genuinely probabilistic. Present clustered results as estimates, because they are.

## Bridges and wrapped assets

An asset moved across a bridge appears to leave one chain and appear on another, which can look like a sale and a purchase if you are not careful. Double-counting across chains is easy and common.

## What this means for your work

State your scope. Which chain, which period, which contracts.

State what is excluded and why — unlabelled addresses, tokens without prices, activity on other chains, anything you filtered.

Do not present an on-chain figure as a complete picture of a business. A protocol may have substantial off-chain revenue or costs, and your number is about what settled on chain.

## The credibility point

An analyst who states limitations is more trusted, not less.

The ones who present a number as complete truth are the ones whose work gets discredited the first time someone finds what they missed — and someone always does.`,
          activity: {
            title: "Write the limitations section first",
            prompt:
              "Take a question you would like to answer on chain — something real about a protocol you follow. Before writing any query, write the limitations: what your answer will not capture, which chains are excluded, what off-chain activity might exist, what labels you will rely on and where they come from. Then write the query. Notice how much the limitations section changed how you framed the question.",
          },
        },
        {
          title: "Assignment: a metric you can defend",
          type: "ASSIGNMENT",
          points: 25,
          body: `The first graded piece. It asks for one number, computed correctly, with a definition precise enough that someone else could reproduce it exactly.

The query matters less than the definition and the exclusions.`,
          assignment: {
            title: "One metric, defined and defended",
            instructions: `Produce one on-chain metric for a protocol or token of your choice. 500 to 800 words plus the query.

**1. The question.** What you are measuring and why it matters. One or two sentences.

**2. The definition.** Precise enough that another analyst could reproduce your number exactly — which chain, which contracts, which time window, which addresses count and which do not, what minimum thresholds apply.

**3. The query.** Written out in full, with comments explaining any filter that is not obvious. Someone should be able to see why each exclusion exists.

**4. The number.** Your result, with the time period stated.

**5. Verification.** How you checked it. At minimum: one transaction traced through to a block explorer and confirmed, and a row count before and after any join. State both.

**6. What it excludes.** Everything your figure does not capture — unlabelled addresses, tokens without prices, other chains, off-chain activity, bots you could not identify. Be thorough; this section carries the most marks.

**7. The alternative definition.** Compute the same metric one other defensible way and give both numbers. Explain why they differ and which you would publish.

**8. What would make this wrong.** A change in the data or the protocol that would silently break your query — a contract migration, a new pool, a label that changes. Say how you would notice.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "The definition is reproducible",
                weight: 25,
                descriptor:
                  "Chain, contracts, window, address criteria and thresholds all stated. Another analyst following it would get the same number. Vague definitions score low regardless of the query's quality.",
              },
              {
                criterion: "The query is correct and commented",
                weight: 20,
                descriptor:
                  "Runs, uses decimals from metadata rather than hard-coded, joins chosen deliberately, with comments explaining non-obvious filters.",
              },
              {
                criterion: "Verification was actually performed",
                weight: 20,
                descriptor:
                  "A transaction traced to an explorer and confirmed, plus row counts around joins. Asserting correctness without checking scores low.",
              },
              {
                criterion: "Exclusions are thorough and honest",
                weight: 25,
                descriptor:
                  "Everything the number does not capture, including bots, other chains and off-chain activity. This section carries the most marks because it is what separates analysis from decoration.",
              },
              {
                criterion: "The alternative definition is computed",
                weight: 10,
                descriptor:
                  "A second defensible number with an explanation of the difference and a stated preference.",
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Real analysis",
      description:
        "Flows, revenue and behaviour. Turning queries into answers people act on.",
      lessons: [
        {
          title: "Following the money without double-counting",
          type: "TEXT",
          points: 10,
          body: `Tracing value between addresses is the most requested on-chain analysis and the easiest to get wrong.

## The simple version

Sum transfers into an address, sum transfers out, and you have net flow.

This is correct and it is rarely what people actually want, because it treats every transfer as equivalent regardless of what it represents.

## Internal transfers

An entity moving funds between its own addresses produces inflows and outflows that are not economic activity.

Exchange addresses do this constantly. Counting an exchange's internal consolidation as inflow will show enormous flows that mean nothing.

Excluding transfers where both sides are labelled as the same entity removes most of it.

## Round trips

Funds that leave and return within a short period are frequently one economic event counted twice.

If you are measuring "how much left the protocol", a withdrawal and a re-deposit an hour later is not two events.

Define your window and say what you did with round trips inside it.

## Netting versus gross

Gross inflow is the sum of everything in. Net flow is in minus out.

These answer different questions and are frequently reported interchangeably. Gross volume looks impressive and net flow tells you what actually changed.

Publish both, or say clearly which one you mean.

## Wrapped and bridged assets

An asset wrapped or bridged appears as a burn and a mint, or as a transfer to a bridge and an appearance elsewhere.

Counting both sides doubles the figure. Whether you should count either depends on the question, and the decision must be stated.

## The check

Sum the flows and compare to the address's actual balance change over the period.

If your computed net flow does not reconcile with the balance change, you have missed something — an internal transfer, a token you did not include, or a fee.

This reconciliation is the single most valuable check in flow analysis, and it either confirms your work or shows you exactly where the gap is.

## The reporting standard

State the window, whether internal transfers were excluded and how you identified them, whether you report gross or net, and how bridged assets were handled.

Four sentences. Without them the number is uninterpretable, and with them it is genuinely useful.`,
          activity: {
            title: "Reconcile a flow to a balance change",
            prompt:
              "Pick an address with meaningful activity — a protocol treasury or a known entity. Compute its total inflow, outflow and net flow over a month. Then find its actual balance at the start and end of that month. Compare your net flow to the balance change. Write both numbers. If they do not reconcile, find the gap and write what it was — that hunt is the exercise.",
          },
        },
        {
          title: "Protocol revenue, computed properly",
          type: "TEXT",
          points: 10,
          body: `Revenue is the metric most connected to value and the one most often computed loosely.

## What counts as revenue

Fees the protocol charges for its service. Not volume, which is what people quote because it is larger.

A billion in swap volume at a five basis point fee is 500,000 in fees. Reporting the billion as revenue is a category error and it is extremely common.

## Finding it in the data

Usually in the decoded event tables — a swap event with a fee field, an interest accrual event, a fee-collection transfer.

Sometimes it must be computed: volume multiplied by a fee rate, where the rate may vary by pool or by asset. If rates vary, using one rate for everything is wrong and the size of the error scales with how much of the volume sits in the exceptions.

## Gross versus what reaches the protocol

Critical, and it connects directly to the tokenomics course.

Total fees paid by users is one number. The share retained by the protocol treasury is another, usually much smaller, because most goes to liquidity providers.

And the share reaching token holders is a third, frequently zero.

Report all three, or state precisely which one you mean. "Protocol revenue" used ambiguously across these is the most common misleading figure in the field.

## The denominators

Revenue per day, per user, per unit of value held. Ratios are more informative than totals because they survive comparison across protocols of different sizes.

Revenue divided by value held is particularly useful — it tells you how hard the deposited capital is working.

## Costs

Protocols have costs, and they are mostly off chain: development, audits, salaries, marketing.

Token incentives paid out are a real cost and they are visible on chain. A protocol earning a million in fees while paying three million in token incentives is not profitable, however good the revenue chart looks.

Always compare revenue against emissions. Reporting one without the other tells half the story, and it is the flattering half.

## The standard to hold

Fee revenue, the share reaching the treasury, the share reaching token holders, and incentives paid, over the same window.

Four numbers. Together they say whether a protocol is a business. Any one of them alone can be made to look like anything.`,
          activity: {
            title: "Compute all four numbers",
            prompt:
              "Pick a protocol with on-chain fees. Compute for the last thirty days: total fees paid by users, the share retained by the protocol, the share reaching token holders, and token incentives paid out. Write all four. Then compute revenue divided by total value held. Finally, write one sentence on whether this protocol is a business, and what your numbers do not capture.",
          },
        },
        {
          title: "Cohorts and retention",
          type: "TEXT",
          points: 10,
          body: `The analysis that distinguishes real growth from churn, and the one most rarely done in this field.

## The question it answers

Not how many addresses used this, but whether the ones who used it last month came back.

A protocol with 10,000 monthly addresses where 9,000 are new every month is not growing. It is replacing.

## Building a cohort

Group addresses by the period in which they first appeared. Then, for each subsequent period, count how many of that original group were still active.

The result is a triangle: each starting cohort, and its survival over time.

## What good looks like

Retention that declines and then flattens. Some drop-off is inevitable; a flat tail means a core of genuine users.

Retention that declines to near zero means nobody stays, and the growth chart is entirely acquisition.

## The incentive test, made concrete

This is where the tokenomics question — what survives if incentives stop — becomes measurable.

Find a period where emissions were reduced. Compare the retention of cohorts before and after.

If retention collapsed when incentives fell, the users were renting. That is a finding you can compute, and almost nobody does.

## Value-weighted retention

Counting addresses treats a large depositor and a dust account identically.

Weighting by value held or volume transacted usually tells a different story — often that a small number of retained addresses account for most of the retained value, which is a much healthier picture than the address count suggests.

Compute both. The difference between them is informative on its own.

## Implementation

First-seen date per address, then activity per address per period, then a join between them.

It is the most complex query in this course and it is worth building carefully, because it is the analysis that most reliably distinguishes a protocol with users from one with traffic.

## Why it is rare

It requires several months of data, it takes longer to write, and it frequently produces an unflattering answer.

Which is exactly why it is valuable. A retention chart is much harder to argue with than a growth chart, and it is the one an experienced reader asks for first.`,
          activity: {
            title: "Build a retention triangle",
            prompt:
              "For one protocol, build a monthly cohort retention analysis over at least six months: first-seen month per address, then activity per address per month, then survival per cohort. Write out the triangle. Then do it again weighted by value rather than by address count and compare. Finally, if you can find a period where incentives changed, compare cohorts either side and write what you found.",
          },
        },
        {
          title: "Sanity checks and being wrong in public",
          type: "TEXT",
          points: 10,
          body: `Published numbers get repeated. A wrong one propagates and is difficult to correct, so the checking discipline matters more here than in most work.

## The checks worth running every time

Order of magnitude. Is this plausible? A protocol with 200 users producing a billion in volume is either wrong or the most interesting finding of the year, and it is almost always wrong.

Compare to a known source. If a platform publishes a similar figure, compare. A large discrepancy means one of you has a different definition — find out which before publishing.

Trace one row. Take a single transaction from your result and verify it manually on a block explorer.

Row counts around joins. Covered already and worth repeating because it fails silently.

Check the edges. The first and last periods in a time series are frequently partial. A final day that is only three hours long will look like a collapse.

## The specific traps

Missing decimals — figures out by a power of ten.

Time zones — daily boundaries differing from another source by a few hours, which shifts every daily figure slightly.

Excluded nulls — an inner join quietly removing rows.

A contract migration mid-period, so half your window queries a contract nobody uses any more.

## When you find an error after publishing

Correct it immediately and visibly. Say what was wrong, what the number should be, and why it happened.

The reputational cost of a corrected error is small. The cost of a quietly amended chart that someone notices is very large.

## Version your work

Keep the query that produced any published number, dated. When someone asks in three months how you got a figure, "here is the exact query" is a complete answer.

Analysts who cannot reproduce their own past numbers are not trusted twice.

## The disposition

Assume your query is wrong until you have checked. This is not pessimism; the base rate for a first draft being wrong in some way is high, and every experienced analyst knows it.

The ones who are trusted are not the ones who are never wrong. They are the ones who check before publishing and correct visibly when they are.`,
          activity: {
            title: "Break your own analysis",
            prompt:
              "Take the metric from your assignment and run all five checks on it: order of magnitude, comparison to another published source, one row traced manually, row counts around joins, and the edges of the time series. Write down what each check found. Then deliberately look for a reason your number is wrong — a migration, a time zone, a missing token. Write what you found, even if the answer is that it held up.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on analysis. The theme is that the query is the easy part and the definition, the exclusions and the checking are where the work is.`,
          quiz: {
            title: "Doing the analysis",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "A protocol did a billion in swap volume at a 5 basis point fee. What is its revenue?",
                explanation:
                  "About 500,000 — volume multiplied by the fee rate. Reporting the billion as revenue is a category error and it is extremely common, because the larger number is the one people quote.",
                options: [
                  { text: "About 500,000 — the fees, not the volume", correct: true },
                  { text: "A billion, which is the volume it processed", correct: false },
                  { text: "It cannot be computed from on-chain data", correct: false },
                  { text: "Whatever the treasury received that month", correct: false },
                ],
              },
              {
                prompt: "What is the single most valuable check in flow analysis?",
                explanation:
                  "Reconciling computed net flow against the address's actual balance change over the period. If they do not match you have missed something — an internal transfer, a token, or a fee — and the gap shows you exactly where.",
                options: [
                  {
                    text: "Reconciling net flow against the actual balance change",
                    correct: true,
                  },
                  { text: "Comparing to a published dashboard", correct: false },
                  { text: "Checking that inflows exceed outflows", correct: false },
                  { text: "Verifying the address is not a contract", correct: false },
                ],
              },
              {
                prompt: "Why is cohort retention rare in on-chain analysis?",
                explanation:
                  "It needs months of data, takes longer to write, and frequently produces an unflattering answer. Which is why it is valuable — a retention chart is much harder to argue with than a growth chart.",
                options: [
                  {
                    text: "It is harder to build and usually gives an unflattering answer",
                    correct: true,
                  },
                  { text: "The data required is not publicly available", correct: false },
                  { text: "It cannot be computed without identity information", correct: false },
                  { text: "Growth metrics are more accurate", correct: false },
                ],
              },
              {
                prompt: "Your daily series shows a collapse on the final day. What should you check first?",
                explanation:
                  "Whether the last period is partial. A final day only a few hours long looks like a collapse, and checking the edges of a time series is one of the standard checks for exactly this reason.",
                options: [
                  { text: "Whether the final day is incomplete", correct: true },
                  { text: "Whether the protocol was exploited", correct: false },
                  { text: "Whether prices were missing that day", correct: false },
                  { text: "Whether the join dropped rows", correct: false },
                ],
              },
              {
                prompt: "You published a figure and later find it was wrong. What is the right response?",
                explanation:
                  "Correct it immediately and visibly — say what was wrong, what it should be, and why. The cost of a visible correction is small; the cost of a quietly amended chart that someone notices is very large.",
                options: [
                  {
                    text: "Correct it visibly, stating what was wrong and why",
                    correct: true,
                  },
                  { text: "Amend the chart quietly and move on", correct: false },
                  { text: "Leave it, since the direction was right", correct: false },
                  { text: "Republish with a different definition that makes it correct", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Queries that finish",
      description:
        "Making large queries fast enough to run, and readable enough to fix six months later.",
      lessons: [
        {
          title: "Why your query is slow",
          type: "TEXT",
          points: 10,
          body: `Blockchain tables are among the largest public datasets available. A query that would be instant on a small table can be refused outright here.

## The main cause

Scanning more data than you need. The engine reads what your filters permit it to skip, and a query with no time filter permits nothing.

## Filter on time, always

Almost every one of these tables is organised by time. A filter on block time lets the engine skip everything outside the range without reading it.

This single filter is usually the difference between a query taking two seconds and being refused. Add it first, even while exploring.

## Filter early

Reduce rows before joining, not after. A join between two large tables is expensive; a join between two small filtered results is not.

Written with a with clause, this reads naturally: filter each side to what you need, name each result, then join the small things.

## Select only what you need

A star on a wide table reads every column. Naming five columns instead of forty is a large saving on a large table.

## Aggregate before joining

If you need daily totals per address joined to labels, compute the daily totals first — that reduces millions of rows to thousands — and join the labels to the small result.

Joining first and aggregating afterwards does the expensive operation on the large data, which is the wrong order.

## Develop on a small window

Write the query against one day. Get the logic right. Then widen the range.

Debugging a thirty-day query that takes four minutes per run is a slow way to work, and everything you learn from one day transfers.

## Limit while developing

Always. You do not need the full result to check whether your logic is correct.

## When it is still too slow

Reconsider the question. Frequently a slow query is answering a broader question than necessary — a metric over all time when the last ninety days would do.

And check whether the platform provides a pre-aggregated table for what you want. Someone has often already built the daily summary you are computing from scratch.

## The habit

Time filter, then narrow columns, then filter each side, then aggregate, then join.

That order alone solves most performance problems, and it is worth applying from the first draft rather than after the query fails.`,
          activity: {
            title: "Make a slow query fast",
            prompt:
              "Write a deliberately naive query on a large table — no time filter, a star select, joining before aggregating — and time it. Then rewrite it applying the order in this lesson: time filter, named columns, filter each side, aggregate, then join. Time it again. Write both durations and which single change made the largest difference.",
          },
        },
        {
          title: "Writing queries someone can read",
          type: "TEXT",
          points: 10,
          body: `You will read your own queries in six months and understand nothing. Writing for that reader is the whole discipline.

## Use with clauses

Break the work into named steps rather than nesting.

A query with three named stages — the filtered transfers, the daily totals, the labelled result — reads as a sequence of ideas. The same logic nested three deep reads as a puzzle.

## Name things for what they are

A stage called daily_volume tells the reader what it holds. One called t2 does not.

## Comment the why, not the what

Nobody needs a comment saying this filters by date. Everybody needs one saying why this address is excluded.

The exclusions and the constants are the things that will be questioned, and they are the things whose reasoning is entirely invisible in the code.

## Constants at the top

Contract addresses, thresholds and dates named at the top rather than scattered through the query.

When the contract migrates, one line changes rather than seven, and you can see at a glance what the query depends on.

## Formatting

One column per line in a long select. Keywords aligned. Consistent case.

It looks fussy and it is the difference between spotting a missing comma immediately and reading the same forty lines four times.

## Write the header

Three lines at the top of every published query: what this measures, what it excludes, and when it was last checked.

This is the single most useful habit in this lesson. Anyone opening the query — including you — knows immediately whether it answers their question.

## Keep them

Whatever the platform offers for saving and versioning, use it. A published number whose query you cannot produce is a number you cannot defend.

## The test

Give a query to someone who knows SQL but not your subject and ask what it measures.

If they cannot tell, the naming and comments are insufficient. This takes two minutes and it is a much better check than reading it yourself, because you already know the answer.`,
          activity: {
            title: "Rewrite one query for a stranger",
            prompt:
              "Take your longest query and rewrite it properly: named with-clause stages, constants at the top, comments explaining every exclusion and threshold, and a three-line header saying what it measures, what it excludes and when it was last checked. Then give it to someone who knows SQL but not your subject and ask what it measures. Write down what they got wrong — that is what your naming failed to communicate.",
          },
        },
        {
          title: "Window functions",
          type: "TEXT",
          points: 10,
          body: `The one advanced feature worth learning, because several standard analyses are impossible without it.

## What they do

Compute across a set of rows related to the current row, without collapsing them into one row the way grouping does.

Grouping turns a hundred rows into one. A window function keeps all hundred and adds a column computed across them.

## The three uses that matter here

Running totals. Cumulative volume over time, computed as you go rather than requiring a separate query per point.

Rankings. Number the rows within each group by size — the largest transfer per day, the top three holders per period.

Comparing to the previous row. The change from yesterday, the time since an address's last transaction, growth rates. All of these need a value from a neighbouring row, which is exactly what grouping cannot give you.

## First transaction per address

The specific pattern behind cohort analysis: number each address's transactions in time order and keep the first.

This is a two-line window function and it is otherwise a difficult self-join. It is worth learning for this alone, since retention is the analysis most worth doing.

## Moving averages

Averaging over a trailing window smooths a noisy daily series into something readable.

Say the window length on any chart showing one, because a seven-day and a thirty-day average of the same data tell different stories and both look authoritative.

## The syntax

An over clause, saying how to partition the rows and how to order them. Partition by address, order by time, and the function operates within each address in time order.

Partition is the grouping. Order is the sequence. Those two ideas cover most of what you will write.

## Where they get slow

They sort, which is expensive on large data. Filter down first, as always.

## The realistic scope

Running totals, row numbering, and comparing to the previous row.

Those three cover most real analysis, and there is a great deal more in the feature that you will probably never need.`,
          activity: {
            title: "Use all three patterns",
            prompt:
              "Write three queries using window functions: a running cumulative total of volume over time, the top three transfers within each day ranked by size, and the day-over-day percentage change in a daily metric. Then write a fourth finding the first transaction per address, which is the pattern behind cohort analysis. Write out all four and note which took longest to get right.",
          },
        },
        {
          title: "Working with decoded contract data",
          type: "TEXT",
          points: 10,
          body: `Decoded tables are where real protocol analysis happens, and using them requires understanding what was decoded and what was not.

## What decoding is

A contract emits events as raw data. Decoding matches that against the contract's interface definition and produces named columns.

A raw log becomes a swap table with sender, amounts in and out, and pool address. That is the difference between an afternoon of hexadecimal and a query you can write in five minutes.

## What exists and what does not

Popular contracts are decoded. Newer, smaller or unusual ones frequently are not.

If the protocol you want is not decoded, your options are: work from raw logs, wait, or submit the decoding yourself. The last is genuinely a good way to become known, since it is visible work that people who hire notice.

## Reading a decoded table

Look at the columns before writing anything. Names vary by protocol and are not always what you expect.

Check what one row represents. A swap row might be one swap or one leg of a multi-hop route, and summing without knowing which produces double counting.

Check whether amounts are raw or already adjusted for decimals. Both conventions exist and the difference is a factor of a billion.

## Versions

Protocols deploy new versions, and each is a separate set of contracts and often a separate decoded table.

An analysis covering only version two, published while most volume moved to version three, is undercounting silently. This is the most common way protocol analysis becomes quietly wrong.

Always check which versions exist and whether you are covering all of them.

## Factories and pools

Many protocols deploy a contract per pool or per market. A query hard-coding three pool addresses will miss every pool created afterwards.

Get the list from the factory's creation events rather than typing addresses. That way new pools are included automatically, which is what makes a dashboard survive.

## Proxies

Many contracts sit behind a proxy, so the address people know is not where the logic lives. Events are usually emitted from the proxy address, which is what you want, but it is worth confirming rather than assuming.

## The check

Take one action you can see on the protocol's own interface and find it in the decoded table.

If it is not there, you are on the wrong table, the wrong version, or the wrong contract — and finding out now is much better than finding out after publishing.`,
          activity: {
            title: "Cover every version and pool",
            prompt:
              "Pick a protocol with more than one deployed version. Find out how many versions exist and which decoded tables cover each. Write a query covering all of them, and compare the total to a query covering only the version you first found. Write both numbers. Then replace any hard-coded pool addresses with a list derived from the factory's creation events, and note how many pools that added.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on the craft. These are the things that separate a query that works today from one that is still correct in six months.`,
          quiz: {
            title: "Performance and craft",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "What is the single most important filter on a large blockchain table?",
                explanation:
                  "Block time. These tables are organised by time, so a time filter lets the engine skip everything outside the range without reading it — usually the difference between a query taking seconds and being refused.",
                options: [
                  { text: "A time filter on block time", correct: true },
                  { text: "A filter on the contract address", correct: false },
                  { text: "A limit clause", correct: false },
                  { text: "A filter excluding zero values", correct: false },
                ],
              },
              {
                prompt: "You need daily totals per address, joined to labels. What order should you work in?",
                explanation:
                  "Aggregate first, then join. Computing daily totals reduces millions of rows to thousands, so the join happens on small data. Joining first performs the expensive operation on the large table.",
                options: [
                  { text: "Aggregate to daily totals first, then join labels to the small result", correct: true },
                  { text: "Join labels first, then aggregate", correct: false },
                  { text: "Join and aggregate in a single step", correct: false },
                  { text: "The order makes no difference to speed", correct: false },
                ],
              },
              {
                prompt: "What should a comment in a query explain?",
                explanation:
                  "The why — particularly why an address is excluded or a threshold was chosen. Those are the decisions that will be questioned and whose reasoning is completely invisible in the code. Nobody needs a comment saying a line filters by date.",
                options: [
                  { text: "Why an exclusion or threshold exists", correct: true },
                  { text: "What each clause does mechanically", correct: false },
                  { text: "Who wrote it and when", correct: false },
                  { text: "Which tables are being used", correct: false },
                ],
              },
              {
                prompt: "Why is hard-coding pool addresses a problem?",
                explanation:
                  "Every pool created afterwards is missed, silently. Deriving the list from the factory's creation events means new pools are included automatically, which is what lets a dashboard survive without maintenance.",
                options: [
                  {
                    text: "New pools created later are silently excluded",
                    correct: true,
                  },
                  { text: "Hard-coded addresses slow the query down", correct: false },
                  { text: "Addresses change over time", correct: false },
                  { text: "It is fine if the addresses are commented", correct: false },
                ],
              },
              {
                prompt: "A protocol has three deployed versions and you queried one. What is the risk?",
                explanation:
                  "Silent undercounting. If most volume has moved to a newer version, your figure looks reasonable and is substantially wrong — which is the most common way protocol analysis becomes quietly incorrect.",
                options: [
                  {
                    text: "Silent undercounting, because the number still looks plausible",
                    correct: true,
                  },
                  { text: "The query will error on the missing tables", correct: false },
                  { text: "None, if the version you chose is the original", correct: false },
                  { text: "Double counting across versions", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Reading behaviour",
      description:
        "What addresses do, what it suggests, and where inference stops and guessing begins.",
      lessons: [
        {
          title: "Whales, and what large holders actually signal",
          type: "TEXT",
          points: 10,
          body: `Large-holder analysis is popular, frequently overinterpreted, and genuinely useful within limits.

## What you can establish

Which addresses hold large balances. Whether concentration is rising or falling. Whether large holders are accumulating or distributing over a period.

All three are computable and none requires knowing who anyone is.

## What you cannot establish

Intent. A transfer to an exchange is not a sale; it might be collateral, a custody change, or an internal move. Treating exchange inflow as selling pressure is an inference, not an observation, and it should be labelled as one.

Identity. Clustering suggests common control and does not prove it.

Whether a large holder knows anything. The correlation between size and being right is weaker than people assume, and large holders have been catastrophically wrong many times.

## The exchange-flow metric

Widely published and worth being careful with.

Inflow to exchanges may indicate intent to sell. It also captures market makers rebalancing, custody transfers, and collateral movement.

Net flow is more informative than gross, and both are noisy at short horizons.

## What is more reliable

Concentration over time. A steadily rising share held by the top ten, into a rising price, means someone is selling to new entrants.

Behaviour around known events. Large addresses moving before an unlock or an announcement is worth noting, with the caveat that you are looking at a small sample and hindsight makes patterns visible that were not predictive.

Age of holdings. Coins that have not moved for years moving is a genuine signal, because it represents a decision by someone with a long horizon.

## The presentation standard

Report the observation, then the possible interpretations, then which you favour and why.

"Ten thousand tokens moved from a long-dormant address to an exchange" is an observation. "A whale is dumping" is a conclusion presented as one, and it is the most common failure in this genre.

## The honest limit

Large-holder analysis is best used as a question generator rather than as an answer.

It tells you where to look. What is actually happening usually requires information that is not on chain.`,
          activity: {
            title: "Track concentration and separate observation from inference",
            prompt:
              "For one token, compute the share held by the top ten non-exchange, non-contract addresses at the start and end of a three-month period. Write both figures and the direction. Then find one large movement in that period and write two things separately: the observation — what moved, from where, to where — and the possible interpretations, with which you favour and why. Keep them visibly distinct.",
          },
        },
        {
          title: "Bots, and how to tell",
          type: "TEXT",
          points: 10,
          body: `A large share of on-chain activity is automated. Identifying it changes almost every metric, and the identification is imperfect.

## Why it matters

A protocol with 5,000 daily addresses where 4,000 are arbitrage bots does not have 5,000 users, and its growth chart is measuring something other than adoption.

Bot activity is real economic activity and it is not demand in the sense anyone means when they ask about users.

## The signals

Frequency. Hundreds of transactions per day from one address is not a person.

Regularity. Activity at precise intervals, or at exactly the same time daily.

Uniformity. Near-identical transaction structure, repeated, with the same gas settings and the same contract sequence.

Speed. Acting within the same block as a triggering event, or consistently in the first position of a block.

Profitability patterns. Arbitrage bots take small consistent profits across many transactions, which looks quite different from a person trading.

Funding. Many addresses funded from one source, acting similarly, is a cluster of bots or a farming operation.

## Building a filter

No single signal is sufficient. Combine: addresses above a frequency threshold, with high regularity, and uniform transaction structure.

Then check a sample manually on a block explorer. Ten addresses inspected by hand will tell you whether your filter is catching what you think.

## The unavoidable error

You will exclude some real users who are simply very active, and include some sophisticated bots that look human.

Both directions of error exist and the honest response is to state the criteria and the estimated effect, rather than to pretend the filter is clean.

## Reporting it

Give the number with and without the filter, and state the criteria.

"12,000 addresses, or 3,400 after excluding addresses with more than 50 daily transactions and highly regular timing" is far more useful than either number alone, because the reader can judge the filter.

## What not to do

Silently filter and present the result as the truth. Someone will compute the unfiltered number and the discrepancy will discredit your work.

Show your working. It is the whole basis of being trusted in this field.`,
          activity: {
            title: "Build a bot filter and check it manually",
            prompt:
              "For one protocol, build a filter combining at least three signals — frequency, regularity, and uniformity of transaction structure. Compute the address count with and without it. Then take ten addresses your filter excluded and inspect them manually on a block explorer. Write down how many were genuinely automated and how many were active humans. That error rate is what you should publish alongside the number.",
          },
        },
        {
          title: "Clustering addresses",
          type: "TEXT",
          points: 10,
          body: `Grouping addresses that appear to be controlled by one party. Useful, probabilistic, and frequently presented with more confidence than it deserves.

## Why it is needed

One person controlling fifty addresses appears as fifty participants. Any metric counting addresses overstates participation by whatever the multiple is.

## The signals

Common funding. Addresses first funded from the same source, particularly in a short window, are often related.

Consolidation. Funds from many addresses gathered into one is strong evidence of common control.

Timing. Addresses acting together, repeatedly, within short windows.

Identical behaviour. The same sequence of interactions, the same amounts, the same contracts.

Gas patterns. Unusual and consistent gas settings across addresses.

## How strong each is

Consolidation into a single address is the strongest single signal.

Common funding is suggestive and weaker — an exchange withdrawal funds thousands of unrelated addresses.

Timing and behaviour are weak alone and meaningful in combination.

## The error directions

False positives: grouping unrelated addresses, which understates participation.

False negatives: missing genuine relationships, which overstates it.

Both happen, and a clustering result is an estimate with unknown error bars.

## Doing it defensibly

State the rules used. Report the effect — how many addresses collapsed into how many clusters.

Present clustered figures alongside unclustered ones rather than instead of them.

And check a sample by hand. Clustering that has never been manually inspected is a hypothesis.

## The privacy consideration

This is deanonymisation, and it is worth being deliberate about.

Analysing patterns in aggregate is ordinary research. Publishing an analysis identifying a specific individual's holdings is a different act with real consequences for that person, including physical safety in some places.

The security course covers this from the holder's side. From the analyst's side: aggregate is fine, and naming individuals requires a much stronger justification than curiosity.

## The standard

Clustering is a tool for improving aggregate metrics, not for exposing people.

Anyone using it for the second should be clear with themselves about what they are doing and why.`,
          activity: {
            title: "Cluster on one signal and check by hand",
            prompt:
              "Pick one clustering signal — consolidation into a common address is the strongest — and apply it to a set of addresses interacting with one protocol. Report how many addresses collapsed into how many clusters, and give the metric both clustered and unclustered. Then manually inspect five of your clusters and write how many looked genuinely related. Finally, write your own rule on when you would and would not publish clustered analysis about identifiable individuals.",
          },
        },
        {
          title: "Where inference stops",
          type: "TEXT",
          points: 10,
          body: `A closing lesson on the discipline that separates an analyst from a storyteller.

## The three layers

Observation: what the data shows. Ten thousand tokens moved from address A to address B at this time.

Inference: what it probably means, given what else you know. Address B is labelled as an exchange, so this may be preparation to sell.

Speculation: a story built on the inference. A large holder is losing confidence and the price will fall.

Each layer is more useful and less reliable than the one before, and the failure is presenting the third as though it were the first.

## Keeping them separate in writing

Say which you are doing. "The data shows X. This is consistent with Y or Z. I think Y is more likely because of W."

That structure takes a sentence more and it is the difference between analysis somebody can evaluate and a claim they must simply believe.

## The incentive to blur them

Definite claims get more attention than careful ones. "Whales are accumulating" travels further than "concentration among non-exchange addresses rose 2% over the quarter, which is consistent with accumulation or with exchange rebalancing".

The second is true and the first is a story, and the field rewards the story. Which is exactly why the analysts who stay credible are the ones who resist it.

## Checking yourself

Before publishing, mark each claim as observation, inference or speculation.

If most of your piece is the third category, you have written commentary rather than analysis. That may be what you intended; it should not be presented as data-driven.

## What to do with uncertainty

State it. "I cannot tell whether this is a sale or a custody transfer from the data" is a complete and useful sentence.

Analysts who state uncertainty are trusted with the things they do assert. Analysts who are certain about everything are discounted on everything.

## The final standard

Everything in this course reduces to two habits.

Say exactly what you counted and what you missed. And say which of your claims is observation and which is your opinion.

Do both consistently and you will be more useful, and more trusted, than most people publishing in this field — regardless of how sophisticated your queries are.`,
          activity: {
            title: "Label every claim in your own writing",
            prompt:
              "Take a piece of analysis you have written, or write a short one now. Go through it sentence by sentence and label each claim: observation, inference, or speculation. Count them. Then rewrite any speculation presented as observation so that its status is explicit. Write down what proportion of your original piece was actually observation — for most people it is less than they expected.",
          },
        },
        {
          title: "Assignment: an analysis with its uncertainty",
          type: "ASSIGNMENT",
          points: 25,
          body: `The second graded piece. It is about behaviour rather than volume, and it is graded largely on how carefully you separate what you saw from what you concluded.`,
          assignment: {
            title: "A behavioural analysis",
            instructions: `Analyse the behaviour of participants in one protocol or token. 600 to 900 words plus queries.

**1. The question.** Something behavioural — are large holders accumulating, is activity automated, is growth driven by a small number of addresses.

**2. Bot filtering.** Your criteria, combining at least three signals. The metric with and without the filter. Ten excluded addresses inspected manually, with how many were genuinely automated. Report your error rate.

**3. Concentration or clustering.** Either concentration over time among non-exchange, non-contract addresses, or a clustering analysis with the rule used and its effect. If clustering, report figures both clustered and unclustered.

**4. The three layers, kept separate.** Your findings written so that every claim is visibly one of: observation, inference, or speculation. Label them if that helps.

**5. Alternative explanations.** For your main finding, at least two other things that could produce the same data. Say why you favour yours.

**6. What you could not determine.** Questions the data cannot answer, stated plainly. "I cannot tell whether this was a sale or a custody transfer" is a good sentence.

**7. Verification.** One row traced to a block explorer, row counts around joins, and a sanity check on the order of magnitude.

**8. The privacy line.** If your analysis touches identifiable individuals, state what you would and would not publish, and why.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "The bot filter is built and manually validated",
                weight: 25,
                descriptor:
                  "At least three combined signals, the metric reported both ways, and ten addresses actually inspected with a stated error rate. An unvalidated filter scores low.",
              },
              {
                criterion: "Observation, inference and speculation are kept separate",
                weight: 25,
                descriptor:
                  "Every claim's status is clear to the reader. Presenting a conclusion as though it were data scores heavily against.",
              },
              {
                criterion: "Alternative explanations are genuine",
                weight: 20,
                descriptor:
                  "At least two plausible competing explanations argued fairly, with a reasoned preference rather than a dismissal.",
              },
              {
                criterion: "Uncertainty is stated plainly",
                weight: 15,
                descriptor:
                  "Specific questions the data cannot answer, named rather than glossed. Full marks state them without hedging.",
              },
              {
                criterion: "Verification was performed",
                weight: 15,
                descriptor:
                  "A traced row, row counts around joins, and an order-of-magnitude check, each reported with what it found.",
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Comparing and valuing",
      description:
        "Putting numbers next to each other honestly, and the specific traps in cross-protocol and cross-chain comparison.",
      lessons: [
        {
          title: "Comparing protocols without lying",
          type: "TEXT",
          points: 10,
          body: `Comparison is the most common request and the easiest place to produce something misleading without intending to.

## The definition problem

Two protocols reporting "volume" are frequently counting different things — one counting each leg of a routed trade, the other counting the trade once.

Any comparison across protocols requires you to compute both numbers yourself, with one definition. Taking each protocol's self-reported figure and putting them side by side compares two definitions rather than two protocols.

## Normalising

Absolute numbers favour whoever is largest. Ratios are what let you compare.

Revenue per unit of value held. Volume per active address. Fees as a share of volume. These survive size differences and they are what actually distinguishes protocols.

## Same window, same chain

Obvious and frequently violated. A comparison over different periods, or where one protocol is measured on one chain and another across five, is not a comparison.

State the window and the chains for every figure.

## The multi-chain problem

A protocol deployed on six chains has activity on all of them. Measuring one chain and comparing it to a single-chain competitor systematically understates the first.

Either measure all deployments or state clearly that you are comparing one chain only.

## Age

A protocol launched last month and one running for three years are not comparable on cumulative anything.

Compare over a recent common window, or compare growth rates from a common starting point, and say which you did.

## Incentives

Two protocols with similar volume, where one pays heavily in token incentives and the other does not, are in completely different positions.

Any comparison of activity should be accompanied by incentives paid. Otherwise you have compared what was bought with what was earned.

## The presentation

A comparison table with a definitions row underneath it. Every column defined, the window stated, the chains listed.

It looks heavier than a clean table and it is the difference between a chart people can rely on and one that will be quoted wrongly.

## The honest framing

You are comparing what you measured, under your definition, over your window, on the chains you covered.

Say that once, plainly, and the comparison becomes genuinely useful rather than something someone will later find a hole in.`,
          activity: {
            title: "Build a fair comparison",
            prompt:
              "Compare two protocols in the same category on three normalised metrics — for instance revenue per unit of value held, volume per active address, and fees as a share of volume. Compute all figures yourself under one definition rather than using their published numbers. State the window and the chains. Then add incentives paid for each, and write one sentence on whether that changes the picture.",
          },
        },
        {
          title: "Value held, and what the headline figure hides",
          type: "TEXT",
          points: 10,
          body: `The most quoted protocol metric, and one with several well-known ways of being inflated.

## What it is meant to be

The value of assets deposited in a protocol's contracts.

## Double counting

The main problem. An asset deposited in protocol A, which issues a receipt token, which is then deposited in protocol B, is counted by both.

Summed across an ecosystem, the same underlying value appears several times. Aggregate figures for a whole chain routinely include this, and the size of the effect can be large.

If you are computing it, decide whether you count receipt tokens and state the decision.

## Price sensitivity

The figure is a quantity multiplied by a price. A rise can mean more deposits or simply a higher price for what was already there.

Reporting the change without separating the two is uninformative. Compute the quantity change separately — it is the part that reflects behaviour.

## The protocol's own token

Where a large share of the deposited value is the protocol's own token, the figure is partly circular: the token's price supports the metric, which supports the narrative, which supports the token.

Report what proportion is the native token. It is a straightforward calculation and it materially changes how the headline should be read.

## Locked versus deposited

Some value is genuinely committed for a period. Some can leave in one transaction.

These are different things and both are reported under the same name. Where you can distinguish them, do.

## What it does not tell you

Whether the protocol earns anything. Whether the deposits are sticky. Whether one address is most of it.

A protocol with a large figure concentrated in three addresses is fragile in a way the number does not show, and computing that concentration takes one query.

## The version worth publishing

Total, excluding receipt tokens, split into native token and other assets, with the quantity change separated from the price change, and the concentration among the top holders.

Five numbers rather than one. Together they say something; the headline alone does not.`,
          activity: {
            title: "Decompose one headline figure",
            prompt:
              "Take one protocol and compute its deposited value five ways: the total, the figure excluding receipt tokens, the share that is its own native token, the quantity change over three months separated from the price change, and the concentration among the top ten depositing addresses. Write all five. Then write one sentence on how the headline number should be read given what you found.",
          },
        },
        {
          title: "Cross-chain analysis",
          type: "TEXT",
          points: 10,
          body: `Activity increasingly spans several chains, and analysis that covers one is increasingly incomplete.

## The basic difficulty

Each chain is a separate dataset with its own tables, its own decoded contracts and sometimes different conventions.

An analysis across five chains is five analyses that have to be made comparable before they are combined.

## What differs

Table names and structures vary by chain on most platforms.

Block times differ, so a per-block metric is not comparable across chains. Use time rather than blocks for anything cross-chain.

Native currencies differ, and gas costs vary by orders of magnitude — which means "number of transactions" means something different on a chain where a transaction costs a cent than on one where it costs five dollars.

Decoded coverage varies. A protocol may be decoded on one chain and not another, which will silently bias your totals toward the chains with better coverage.

## Bridged assets

The same underlying asset appears on several chains. Summing balances across chains double counts anything bridged, since the original is locked on the source chain.

Decide whether you are measuring the asset or its representations, and say which.

## Users across chains

The same person operating on three chains appears as three addresses — or as the same address, since many chains share an address format.

A shared address across chains is suggestive of the same controller and it is not proof; different people can control the same address string on different chains in principle, though in practice it is usually the same party.

State the assumption.

## Building it

Compute each chain separately, with the same definition, then combine.

Keep the per-chain figures visible in the output. A combined total hiding the split is less useful and it prevents anyone spotting that one chain is missing.

## The honest scope statement

Which chains you covered, which you did not, and why.

"Ethereum and Arbitrum only; deployments on three other chains excluded because the contracts are not decoded" is a good sentence. It is honest, it explains the gap, and it tells the reader how to interpret the total.`,
          activity: {
            title: "Measure one protocol across two chains",
            prompt:
              "Pick a protocol deployed on at least two chains. Compute one metric on each chain separately using the same definition, then combine. Keep the per-chain split visible. Write down what differed between the two — table structures, decoded coverage, conventions. Then write your scope statement: which chains you covered, which you did not, and why.",
          },
        },
        {
          title: "Knowing when the answer is 'you cannot tell'",
          type: "TEXT",
          points: 10,
          body: `The most valuable thing an analyst says, and the hardest to say when someone is expecting a number.

## The questions with no on-chain answer

How many people use this. Addresses are not people and the mapping is unavailable.

Why did this address do that. Intent is not recorded.

Is this protocol profitable. Costs are mostly off chain.

Will this continue. Nothing in historical data answers a question about the future.

Who is behind this address. Sometimes inferable, usually not, and the inference is probabilistic.

## The pressure to answer anyway

Someone asked, they expect a number, and a careful non-answer feels like failure.

So an approximation gets produced, the caveats get dropped as it travels, and within a week your estimate is being quoted as a fact by people who never saw the qualification.

## What to say instead

"The data cannot answer that. What it can tell you is X, which is related but different, and here is what that does and does not imply."

That is a genuinely useful response. It redirects to an answerable question and it tells the person why their original one was not.

## The partial answer

Frequently you can answer a narrower version.

Not "how many users" but "how many addresses met these criteria". Not "is this profitable" but "here is on-chain revenue and on-chain incentive cost, excluding all off-chain costs".

Narrowing is not evasion. It is the honest form of the answer.

## Estimates with error

Where you must estimate, give a range and say how you got it.

A range with a stated method can be evaluated. A single number with an implied precision it does not have cannot, and it will be treated as more certain than it is.

## What this buys

An analyst who says "I cannot tell you that" is trusted on the things they do say.

The ones who always have an answer get discounted on everything, because the reader has no way to distinguish their solid work from their guesses.

## The habit

Before publishing, look at each conclusion and ask whether the data actually supports it or whether you filled a gap with a reasonable assumption.

Where you filled a gap, say so. That single practice does more for credibility than any amount of technical sophistication.`,
          activity: {
            title: "Answer an unanswerable question properly",
            prompt:
              "Find a question about a protocol that the data genuinely cannot answer — profitability, intent, or number of people. Write the response you would give: why it cannot be answered from on-chain data, the narrower question that can be, the answer to that, and what it does and does not imply. Then look at your own previous analysis and find one place where you filled a gap with an assumption without saying so.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on comparison and valuation. The theme is that the widely-quoted figures each hide something specific, and knowing what is most of the skill.`,
          quiz: {
            title: "Comparison and its traps",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "Why can you not compare two protocols using their self-reported volume?",
                explanation:
                  "They are frequently counting different things — one counting each leg of a routed trade, the other counting it once. Putting the two figures side by side compares definitions rather than protocols; you have to compute both yourself under one definition.",
                options: [
                  {
                    text: "They use different definitions, so you would compare definitions rather than protocols",
                    correct: true,
                  },
                  { text: "Self-reported figures are usually fabricated", correct: false },
                  { text: "Volume is never a useful metric", correct: false },
                  { text: "You can, provided both are on the same chain", correct: false },
                ],
              },
              {
                prompt: "A protocol's deposited value rose 40%. What must you separate before interpreting it?",
                explanation:
                  "The quantity change from the price change. The figure is a quantity multiplied by a price, so a rise can mean more deposits or simply a higher price for what was already there — and only the first reflects behaviour.",
                options: [
                  { text: "How much was quantity and how much was price", correct: true },
                  { text: "Which chain each deposit came from", correct: false },
                  { text: "Whether deposits are locked or liquid", correct: false },
                  { text: "The number of depositing addresses", correct: false },
                ],
              },
              {
                prompt: "Why does summing balances across chains often double count?",
                explanation:
                  "Bridged assets appear on both chains — the original is locked on the source chain while a representation exists on the destination. You have to decide whether you are measuring the asset or its representations, and state which.",
                options: [
                  {
                    text: "Bridged assets exist on both chains at once, as a lock and a representation",
                    correct: true,
                  },
                  { text: "Chains report balances in different units", correct: false },
                  { text: "Block times differ across chains", correct: false },
                  { text: "It does not — summing is always correct", correct: false },
                ],
              },
              {
                prompt: "Someone asks whether a protocol is profitable. What is the correct answer?",
                explanation:
                  "That on-chain data cannot answer it, because costs are mostly off chain — then give the narrower answerable version: on-chain revenue and on-chain incentive cost, with the exclusion stated. Narrowing is the honest form of the answer, not evasion.",
                options: [
                  {
                    text: "It cannot be answered on chain; give on-chain revenue and incentives with the exclusion stated",
                    correct: true,
                  },
                  { text: "Compute revenue minus incentives and report it as profit", correct: false },
                  { text: "Decline to answer without further explanation", correct: false },
                  { text: "Estimate the off-chain costs from headcount", correct: false },
                ],
              },
              {
                prompt: "What does an analyst gain by saying 'I cannot tell you that'?",
                explanation:
                  "Credibility on everything else. Analysts who always have an answer get discounted on all of it, because the reader cannot distinguish their solid work from their guesses.",
                options: [
                  { text: "Being trusted on the things they do assert", correct: true },
                  { text: "Less work overall", correct: false },
                  { text: "Protection from being quoted", correct: false },
                  { text: "Nothing — it signals a lack of skill", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Alerts and monitoring",
      description:
        "Queries that watch for you. Detecting the thing worth knowing about, without a hundred false alarms.",
      lessons: [
        {
          title: "What is worth being told about",
          type: "TEXT",
          points: 10,
          body: `A query that runs on a schedule and tells you when something happens is more useful than a dashboard you have to remember to check.

## What makes a good alert

It is actionable. If you would do nothing on receiving it, it is a notification rather than an alert, and it will train you to ignore the channel.

It is rare. An alert firing daily is background noise within a week.

It is specific enough to be understood without investigation. "Address X moved 2,000 tokens to an exchange, having been dormant 400 days" is complete; "unusual activity detected" requires work before you know whether you care.

## The things worth watching

Large movements from addresses you care about — a treasury, a known insider, a vesting contract.

Unlock events, since they are scheduled and their effects are worth observing rather than reconstructing later.

A metric crossing a threshold you decided in advance. Deposits falling below a level, concentration rising past a point.

Contract deployments from a known deployer, which is how you learn about a new version before it is announced.

Unusual gas or failure rates, which frequently precede a public incident.

## The threshold problem

Set too low and it fires constantly. Set too high and it misses what matters.

The workable approach: relative rather than absolute. A movement larger than this address's usual, or a metric outside its recent range, adapts as conditions change where a fixed number does not.

## Reducing false alarms

Exclude the known-normal. An exchange's routine internal movements should not trigger anything.

Require persistence. A metric below a threshold for three consecutive periods is a signal; one reading is noise.

Combine conditions. Large movement plus long dormancy is far more informative than either alone.

## The maintenance

Alerts break like everything else — contracts migrate, thresholds become stale, an address that was interesting stops being.

Review them quarterly and delete the ones that have not fired usefully. An alert channel full of noise is worse than none, because it trains you to dismiss the one that mattered.

## The honest scope

Two or three good alerts beats twenty. Most people build too many, ignore them within a month, and conclude the approach does not work.

Start with one thing you genuinely want to know about, and add only when the first has proved useful.`,
          activity: {
            title: "Design one alert properly",
            prompt:
              "Pick one thing you genuinely want to know about — a treasury movement, an unlock, a metric crossing a level. Write the query that detects it. Then define the threshold relatively rather than absolutely, add an exclusion for known-normal behaviour, and add a persistence requirement if appropriate. Then run it against the last three months of history and count how many times it would have fired. If it is more than a handful, tighten it.",
          },
        },
        {
          title: "Testing against history",
          type: "TEXT",
          points: 10,
          body: `An alert that has never been run against the past is a guess about what it will catch.

## The method

Run the detection logic over historical data and look at every point where it would have fired.

This takes ten minutes and it tells you three things: how often it fires, whether it caught the events you would have wanted, and how many of the firings were noise.

## What you learn

Frequency. An alert that would have fired 400 times in three months is unusable and you know before deploying it rather than after.

Coverage. Take three events you know were significant and check whether your alert would have caught them. Frequently it would not, for a reason you can then fix.

The false positives. Look at what fired and was not interesting. There is usually a pattern — one address, one type of movement — and excluding it is a one-line change.

## Tuning honestly

The temptation is to adjust the threshold until the historical firings look exactly like the events you already know mattered.

That is fitting to the past, and it is the same error the trading course describes. An alert tuned precisely to three known events will probably not catch the fourth.

Prefer a simple rule that catches most of them to a complicated one that catches all of them historically.

## The two failure modes

Too sensitive: constant firing, you stop reading it, and the real one arrives into a channel you have learned to ignore.

Too insensitive: silence, which feels like nothing is happening. Test this deliberately — an alert that has never fired might be well-tuned or might be broken, and those look identical.

## Checking it still works

Include a heartbeat. Something that confirms the query ran, even when it found nothing.

Otherwise a broken alert and a quiet period are indistinguishable, and you will discover it was broken at the moment you needed it.

## The realistic standard

Run it over history, count the firings, check it would have caught what you care about, exclude the obvious noise, and add a heartbeat.

Twenty minutes of work, and it is the difference between an alert you rely on and one you built and forgot.`,
          activity: {
            title: "Backtest and tune your alert",
            prompt:
              "Take the alert from the previous lesson and run its logic over at least three months of history. Count every firing. Then check three events you know were significant and write whether it would have caught each. Look at the firings that were not interesting and find the pattern — then write the one exclusion that removes most of them. Finally, describe the heartbeat you would add.",
          },
        },
        {
          title: "Automating the boring part",
          type: "TEXT",
          points: 10,
          body: `Once your queries are correct, the remaining work is running them and getting the output where it needs to go.

## Scheduled queries

Most platforms let a query run on a schedule and store the result. This is the foundation — a query that runs daily produces a series you can chart without re-running anything.

Choose the frequency by how fast the answer changes. A daily metric does not need hourly refreshes, and over-frequent scheduling is the most common waste.

## Materialising expensive work

If several dashboards need the same underlying calculation, compute it once on a schedule and have the others read the result.

This is the single largest performance improvement available for a set of related dashboards, and it also means one definition rather than four slightly different ones.

## Where the output goes

A dashboard, for things you look at deliberately.

A message channel, for alerts. Formatted so the message itself is complete — nobody wants to open a link to find out whether they care.

A spreadsheet or file, for anything that feeds other work.

## Keeping it honest when automated

Automation removes the human check that would have noticed something absurd.

So include the checks in the output: a row count, a coverage figure, a comparison to the previous period. A number that jumped 400% overnight should be visible as such in the same message.

## Failure handling

Decide what happens when the query fails. Silence is the wrong answer — it looks identical to nothing happening.

At minimum, a failure should be visible somewhere you look.

## Not over-building

The temptation once things are automated is to automate more, and to spend more time on the pipeline than on the analysis.

The value is in the questions and the definitions. A simple scheduled query producing a correct, well-defined number beats an elaborate system producing something nobody trusts.

## The realistic setup

Two or three scheduled queries feeding one dashboard, one alert going to a channel you actually read, and a heartbeat.

That covers most of what an individual analyst needs, and it can be built in an afternoon.`,
          activity: {
            title: "Schedule one query and route the output",
            prompt:
              "Take your best metric and set it to run on a schedule at a frequency justified by how fast the answer changes. Then route the output somewhere useful — a dashboard or a message channel. Include a coverage figure and a comparison to the previous period in the output itself. Then deliberately break the query and check what happens: is the failure visible, or does it look like nothing happened?",
          },
        },
        {
          title: "Working with people who cannot query",
          type: "TEXT",
          points: 10,
          body: `Most of the people who need your numbers cannot produce them, and how you present the work determines whether it gets used.

## What they need

The answer, first. Not the method, not the caveats — the number and what it means, in the first two lines.

Then the confidence: how sure you are and why.

Then the method and the limitations, for anyone who wants them.

Most analysts write this in the reverse order, and lose the reader before the answer arrives.

## Translating

"Distinct non-contract addresses with at least one transaction above 50 dollars" is precise and unreadable to a non-analyst.

Give it a plain-language name in the text and put the precise definition next to it. Both, always — the plain name so it is understood, the precise one so it can be checked.

## The question behind the question

Someone asking for a number usually has a decision behind it. Finding out what it is frequently changes what you should compute.

"How many users does this have" often means "is this worth partnering with", which is a different question and better served by retention than by a headcount.

Ask. It takes one message and it regularly saves a day of work on the wrong metric.

## Managing the certainty gap

Non-technical readers hear a number as more certain than you meant it.

Counter this explicitly. "This is a good estimate, within perhaps 20%" is worth saying out loud, because they will not infer it from a caveat at the bottom.

## When they want a number you cannot give

Covered already, and it happens most often here, from people who do not know the data has limits.

Explain the limit briefly, offer the narrower answerable question, and give that answer. Most people accept it readily once they understand why.

## Being useful rather than impressive

The instinct is to show the sophistication of the work. The reader wants the answer.

Keep the sophistication available — the query, the method, the checks — and lead with the conclusion. The people who need your work are not evaluating your technique; they are trying to decide something.

## The measure

Did they use it, and did they use it correctly?

If a number you produced gets quoted without its caveat, that is partly a presentation failure, and it is worth fixing in how you write it rather than in what you compute.`,
          activity: {
            title: "Rewrite one analysis for a non-analyst",
            prompt:
              "Take an analysis you have produced and rewrite it for someone who cannot read a query: answer in the first two lines, then your confidence, then plain-language metric names with the precise definitions beside them, then method and limitations at the end. Keep it under 300 words. Then send it to someone non-technical and ask what they concluded — and whether they picked up the uncertainty.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on monitoring and communication. Both are where good analysis either becomes useful or quietly does not.`,
          quiz: {
            title: "Alerts and audiences",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "What makes an alert worth having?",
                explanation:
                  "That it is actionable, rare, and specific enough to understand without investigation. An alert you would do nothing about is a notification, and one that fires daily becomes background noise within a week.",
                options: [
                  { text: "It is actionable, rare, and understandable without investigation", correct: true },
                  { text: "It covers as many conditions as possible", correct: false },
                  { text: "It fires often enough to confirm it is working", correct: false },
                  { text: "It uses an absolute threshold for consistency", correct: false },
                ],
              },
              {
                prompt: "Why run an alert's logic over historical data before deploying it?",
                explanation:
                  "It tells you how often it fires, whether it would have caught events you care about, and what the false positives look like — all before you rely on it rather than after.",
                options: [
                  {
                    text: "To learn its firing frequency, its coverage of known events, and its noise pattern",
                    correct: true,
                  },
                  { text: "To prove the query syntax is valid", correct: false },
                  { text: "To establish the historical average", correct: false },
                  { text: "It is unnecessary if the logic is simple", correct: false },
                ],
              },
              {
                prompt: "Why include a heartbeat in an automated alert?",
                explanation:
                  "Because a broken alert and a quiet period look identical. Without confirmation that the query ran, you discover it was broken at the moment you needed it.",
                options: [
                  {
                    text: "A broken alert is indistinguishable from nothing happening",
                    correct: true,
                  },
                  { text: "It keeps the scheduled query from expiring", correct: false },
                  { text: "It improves query performance", correct: false },
                  { text: "It is required by most platforms", correct: false },
                ],
              },
              {
                prompt: "Someone asks how many users a protocol has. What should you do first?",
                explanation:
                  "Find out the decision behind the question. It often means 'is this worth partnering with', which is better served by retention than a headcount — and asking takes one message and regularly saves a day of work on the wrong metric.",
                options: [
                  { text: "Ask what decision the number is for", correct: true },
                  { text: "Compute the address count and send it", correct: false },
                  { text: "Explain that the question is unanswerable", correct: false },
                  { text: "Send them the dashboard to look at themselves", correct: false },
                ],
              },
              {
                prompt: "Your number was quoted without its caveat. Whose problem is that?",
                explanation:
                  "Partly yours — it is a presentation failure. Non-technical readers hear a number as more certain than intended, so the uncertainty has to be stated up front rather than left in a footnote.",
                options: [
                  {
                    text: "Partly yours — the uncertainty needed stating up front, not in a footnote",
                    correct: true,
                  },
                  { text: "Entirely theirs, since the caveat was published", correct: false },
                  { text: "Nobody's — caveats are always dropped", correct: false },
                  { text: "The platform's, for not enforcing definitions", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Dashboards and the work",
      description:
        "Building things people rely on, keeping them correct, and turning this into income.",
      lessons: [
        {
          title: "A dashboard people actually use",
          type: "TEXT",
          points: 10,
          body: `Most dashboards are built to demonstrate effort. A useful one answers a specific question for a specific person.

## Start from the question

Not "everything about this protocol". One question, and the chart that answers it.

"Is revenue growing relative to incentives paid" is a question. "Protocol overview" is a collection.

## What belongs

The headline number, large, with its time period visible.

The trend, because a number without direction is nearly meaningless.

The definition, on the dashboard rather than in a linked document. If someone reads the number, they should read the definition.

The last updated time. A stale dashboard being read as current is the most common way a good dashboard causes harm.

## What does not belong

Everything you were able to compute. Effort is not the point, and a dashboard with fourteen charts is one nobody reads.

Charts with no interpretation. If you cannot say what a chart tells the reader, remove it.

Vanity metrics — total transactions ever, cumulative volume. They only go up and they tell nobody anything.

## Design that helps

Consistent time ranges across charts, so they can be compared.

Titles that state the finding rather than the contents. "Revenue has doubled since March" is a title; "Monthly Revenue" is a label.

Fewer colours than you think. One series, one colour, unless a comparison is the point.

Numbers formatted for humans. Nobody wants twelve significant figures.

## Making it survivable

Every dashboard breaks eventually — a contract migrates, a table changes, a label moves.

Note the assumptions in the description. Set a date to check it. And when you find it broken, either fix it or take it down, because a wrong dashboard being used is worse than no dashboard.

## The test

Show it to someone who knows the subject and ask what they conclude.

If they conclude something you did not intend, the presentation is wrong. If they ask what a number means, the definition is missing. If they say "and?", the question was not worth answering.`,
          activity: {
            title: "Build one that answers one question",
            prompt:
              "Build a dashboard answering exactly one question about a protocol you follow. Constraints: no more than four charts, every title states a finding rather than a label, the definition is visible on the page, and the last-updated time is shown. Then show it to someone who knows the subject and ask what they conclude. Write down what they said, and what you changed as a result.",
          },
        },
        {
          title: "Keeping it correct",
          type: "TEXT",
          points: 10,
          body: `A dashboard is not finished when it is published. It is a thing that will silently become wrong, and maintaining it is most of the work.

## How they break

A contract migrates and your query points at the old one, which now shows nothing. A chart falling to zero is at least visible.

A new pool or version launches and your query does not include it. Your number becomes an undercount, and this one is invisible — the chart still looks reasonable.

A table is renamed or restructured by the platform.

A label changes, so an address you were excluding is no longer matched, and it silently re-enters your figures.

Prices become unavailable for a token, so it drops out of a value calculation.

## The invisible failures are the dangerous ones

A query that errors gets noticed. A query that quietly returns 60% of the truth does not, and people act on it for months.

## Building in the alarm

Include a row count or a coverage figure on the dashboard itself. If your revenue query normally covers 40 pools and today covers 31, that is visible.

Compare against a total. If you are measuring a subset, show it as a percentage of the whole — a share that moves without explanation is a signal.

## The review

Every dashboard you publish, on a schedule. Quarterly at minimum.

Check that the contracts are still the live ones, that no new version launched, that the numbers still reconcile against an independent source.

## Documenting the assumptions

In the description, in plain language: which contracts, which chain, what is excluded, what would break this.

Write it for someone else, because in six months you are someone else.

## Taking things down

If you cannot maintain a dashboard, remove it.

An abandoned dashboard with stale numbers is actively harmful, and people will keep using it because it exists. The kindest thing is to delete it or mark it clearly as unmaintained.

## The professional standard

Published work has an owner. If your name is on it, it is either current or clearly marked as not, and there is no third state.`,
          activity: {
            title: "Add an alarm and write the assumptions",
            prompt:
              "Take a dashboard you have built and add one visible coverage indicator — a row count, a number of pools included, or your subset as a percentage of a known total. Then write the assumptions in the description in plain language: which contracts, which chain, what is excluded, and what specifically would break it. Then set a calendar reminder to check it in three months.",
          },
        },
        {
          title: "Turning this into income",
          type: "TEXT",
          points: 10,
          body: `On-chain analysis is one of the few crypto skills that is genuinely hired for. This lesson is about how people actually get paid for it.

## What the work is

Protocols hire analysts to understand their own usage. Funds hire them for research. Data platforms hire people to build and maintain decoded tables. Media and research outfits pay for analysis.

There is also grant and bounty work — protocols paying for specific dashboards or investigations.

## What gets someone hired

Published work. A body of dashboards and written analysis that someone can look at.

This is unusually true in this field. Nobody will ask for your qualifications; they will look at what you have built.

## Building the portfolio

Pick protocols you find interesting and answer questions about them properly. Publish, with the definitions and the limitations.

Ten thorough pieces of work beat fifty shallow dashboards, and the thoroughness is what a hiring analyst is actually reading for.

Include something that produced an unwelcome finding — a metric that showed a protocol was weaker than claimed. It demonstrates independence, which is the scarcest quality in this field.

## Getting noticed

Answer questions publicly when someone asks something you can compute. This is how most people in this field found their first work.

Contribute decoded tables or fix errors in public data. Highly visible to exactly the people who hire.

Write up the method, not just the result. The method is what shows you can be relied on.

## Pricing it

The business course applies exactly: price the outcome, scope the work precisely, and write the exclusions.

Analysis work is unusually prone to scope creep, because "and could you also break that down by" is a natural sentence and each one is another query.

## The conflict problem

If you hold a position in something you publish about, disclose it. Every time, plainly.

This field has a serious credibility problem precisely because so many analysts are positioned and quiet about it. Being the person who discloses is a durable advantage and it costs nothing.

## The realistic path

Three to six months of consistent published work is enough for most people to start getting approached.

That is a real timeline requiring real effort, and it is considerably shorter than most routes into a technical field.`,
          activity: {
            title: "Publish your first piece properly",
            prompt:
              "Take your best analysis so far and publish it properly: the question, the definition, the query, the number, the limitations, and what would break it. Then write your plan for the next five pieces — which protocols, which questions, and by when. Include at least one where you expect the finding may be unwelcome. Finally, write your disclosure line, to use every time you publish about something you hold.",
          },
        },
        {
          title: "What you can now do",
          type: "TEXT",
          points: 10,
          body: `A short accounting before the capstone.

## What you can do

Write SQL — select, filter, aggregate, group, join — well enough to answer real questions without help.

Read blockchain data structurally: transactions, traces, logs and decoded tables, and know which one holds what you need.

Handle decimals correctly from metadata, and value transfers at historical prices.

Define a metric precisely enough that someone else could reproduce it, and state what it excludes.

Count addresses honestly, knowing that they are not people and that a large share of activity is automated.

Trace flows and reconcile them against balance changes.

Compute protocol fees, the share reaching the treasury, the share reaching holders, and incentives paid — the four numbers together.

Build a cohort retention analysis, which is the one that distinguishes users from traffic.

Check your work before publishing, and correct visibly when you are wrong.

Build a dashboard that answers one question and keeps working.

## What you know that most people quoting on-chain numbers do not

That volume is not revenue. That addresses are not users. That an inner join to labels silently drops most of your data. That a row count that rises after a join means your sums are inflated. That the last day of a time series is usually partial. That valuing old transfers at today's price produces a meaningless figure.

## The standard to keep

A number is worthless until you can say what it counted and what it missed.

If you hold to that, you will be more useful than most people publishing in this field, and considerably more trusted.

## What is left

The capstone, and then the ordinary work: questions answered properly, published with their limitations, maintained or taken down, and corrected in public when they turn out wrong.`,
          activity: {
            title: "Answer a question you could not answer before",
            prompt:
              "Find a claim someone has made about on-chain activity — in a post, a report, or a chart. Work out what definition would produce that number, then compute it yourself with your own stated definition. Write both numbers and explain the difference. Then write down what you can now do that you could not before this course, specifically enough that it is a skill rather than a feeling.",
          },
        },
        {
          title: "Capstone: a complete piece of analysis",
          type: "ASSIGNMENT",
          points: 40,
          body: `The final piece. A full analysis of a real question, published to the standard the rest of this course has argued for.

It is graded on rigour rather than on whether the finding is interesting.`,
          assignment: {
            title: "A published on-chain analysis",
            instructions: `Produce a complete analysis of one real question. 1,000 to 1,500 words plus queries and charts.

**1. The question and why it matters.** Specific and answerable. "Is this protocol's growth real or incentive-driven" is a question; "analysis of protocol X" is not.

**2. Scope and definitions.** Chain, contracts, time window, and every metric defined precisely enough to reproduce. State this before any numbers.

**3. Limitations, stated up front.** What your analysis cannot capture — other chains, off-chain activity, centralised exchange volume, unlabelled addresses, bots you could not identify. Placing this before the findings rather than after is deliberate.

**4. The queries.** Written out, commented, with decimals handled from metadata and joins chosen deliberately.

**5. The findings.** At least three related metrics, including one of: cohort retention, or revenue split across the four categories. Charts where they help.

**6. Verification.** All five checks run and reported: order of magnitude, comparison to an independent source, one row traced to an explorer, row counts around joins, and the edges of the series. State what each found, including the ones that found nothing.

**7. The alternative reading.** Someone competent looking at the same data and disagreeing with your conclusion — what would they point to? Make the case properly rather than dismissing it.

**8. What would break this.** The specific change — a migration, a new version, a label change, a price gap — that would silently make your numbers wrong, and how you would notice.

**9. Disclosure.** Whether you hold a position in what you analysed. State it plainly either way.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Definitions are reproducible and stated first",
                weight: 20,
                descriptor:
                  "Every metric defined precisely enough for another analyst to reproduce exactly, before any numbers appear.",
              },
              {
                criterion: "Limitations lead rather than follow",
                weight: 20,
                descriptor:
                  "A thorough account of what the analysis cannot capture, placed before the findings. Full marks include off-chain and cross-chain blind spots, not only technical ones.",
              },
              {
                criterion: "Queries are correct and handle the known traps",
                weight: 20,
                descriptor:
                  "Decimals from metadata, deliberate join types, commented filters, and no double-counting across bridges or internal transfers.",
              },
              {
                criterion: "All five verification checks were run",
                weight: 20,
                descriptor:
                  "Each check reported with what it found, including the ones that found nothing. Asserting correctness without evidence scores low.",
              },
              {
                criterion: "The alternative reading is made properly",
                weight: 10,
                descriptor:
                  "A competent opposing interpretation argued fairly rather than dismissed. A weak strawman scores low.",
              },
              {
                criterion: "Fragility and disclosure are stated",
                weight: 10,
                descriptor:
                  "A specific change that would silently break the analysis with a detection method, plus a plain position disclosure either way.",
              },
            ],
          },
        },
      ],
    },
  ],
};
