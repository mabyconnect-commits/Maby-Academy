import type { ContentCourse } from "./types";

/**
 * Crypto From Zero — the free foundation course.
 *
 * Written to be finishable by someone who has never owned crypto, and to make
 * them safe before it makes them clever. The order is deliberate: custody and
 * scam awareness come before anything about markets, because the most common way
 * a beginner loses money is not a bad trade — it is handing their keys to
 * someone who asked nicely.
 */
export const cryptoFromZero: ContentCourse = {
  slug: "crypto-from-zero",
  title: "Crypto From Zero: Own Your Keys",
  subtitle:
    "Everything you need to hold, move and protect crypto without trusting anyone you shouldn't.",
  description: `Most people lose money in crypto long before they ever place a bad trade. They lose it to a phishing link, a screenshot of a seed phrase, an exchange that never let them withdraw, or a friend who was "just helping".

This course fixes that first. You'll learn what a blockchain actually does, how wallets and keys really work, and how to move money on-chain without fear. By the end you'll be able to set up self-custody properly, verify a transaction before you sign it, and spot the scams that catch most beginners.

No hype, no price predictions. Just the foundation everything else stands on.`,
  categorySlug: "crypto-foundations",
  level: "BEGINNER",
  priceMinor: 0,
  estimatedHours: 12,
  passThreshold: 80,
  instructorEmail: "mabi@mabyacademy.com",
  outcomes: [
    "Explain what a blockchain is to someone else, in plain language",
    "Set up a self-custody wallet and back it up properly",
    "Send a transaction and verify it independently",
    "Recognise the scam patterns that catch nearly every beginner",
    "Read a block explorer well enough to check a claim yourself",
  ],
  modules: [
    // =====================================================================
    {
      title: "What you're actually buying",
      description:
        "The mental model that makes everything else make sense. No jargon, no diagrams of pickaxes.",
      lessons: [
        {
          title: "Welcome — and what this course will cost you",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `Crypto rewards patience and punishes shortcuts. This course asks for about twelve focused hours. If you give it those hours you will finish able to hold your own money safely, which is a genuinely rare skill.

## What you'll be able to do

- Explain what a blockchain is to someone else, in plain language
- Set up a self-custody wallet and back it up properly
- Send a transaction and verify it independently
- Recognise the four scams that catch nearly every beginner

## What this course is not

It is not a list of coins to buy. Nobody here will tell you what to buy. The goal is that you become the kind of person who can work that out for themselves — and, more importantly, who can tell when someone else is guessing.

## One rule, stated once and never softened

**Maby Academy will never ask you for a seed phrase, a private key, or a recovery phrase.** Not support, not an instructor, not a mentor, not me. Anyone who does — including someone using my name — is trying to steal from you. You will understand exactly why by the end of module 2.

## How the lessons work

Opening a page does not complete it. Most lessons have an exercise, a quiz or a written assignment attached, and the lesson only completes when you have actually done the thing. That is slower. It is also the only reason the certificate at the end means anything.`,
          activity: {
            title: "Write down why you're here",
            prompt:
              "Before you read another word, write one sentence: what would make these twelve hours worth it to you? Be specific — 'get rich' is not an outcome, 'move my own money without asking permission' is. Keep it somewhere you'll see it in week three, when the novelty has gone.",
          },
        },
        {
          title: "Blockchains without the buzzwords",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `Forget the word blockchain for a moment. Start with a problem.

Imagine a village with no bank. Everyone keeps their own ledger of who owes whom. The obvious problem: I can quietly edit my own copy and claim you paid me. So instead the village agrees on one shared ledger, read aloud in the square, and everyone keeps an identical copy. To change history you would have to convince most of the village at once.

That is it. That is the whole idea.

## The three properties that matter

**Shared.** Thousands of independent computers hold the same ledger. There is no master copy on a server somewhere that can be edited.

**Append-only.** You add new entries. You never edit old ones. Every entry references the one before it, so altering an old entry would break every entry after it — which is what makes tampering detectable rather than merely forbidden.

**Permissionless to read.** Anyone can check any entry. This is why "trust me" is never necessary and why, later in this course, you will verify things yourself rather than taking my word for them.

## What it is not

A blockchain is not private. Most are the opposite — every transaction is public forever. It is not fast; a shared ledger that thousands of machines must agree on will always be slower than one company's database. And it is not magic: a blockchain records that a transfer happened. It has no opinion about whether the transfer was a good idea, and it cannot reverse one.

## Why "irreversible" is the word to remember

In a bank, a mistaken payment can often be recalled. On a blockchain, a confirmed transaction is final. Sent to the wrong address? Gone. Signed a malicious approval? Gone.

Every safety habit in this course exists because of that one sentence.`,
          activity: {
            title: "Explain it to somebody",
            prompt:
              "Explain a blockchain to a friend or family member in under sixty seconds, without using the words 'decentralised', 'immutable', 'trustless' or 'ledger'. If they look confused, you don't understand it yet — try a different everyday comparison and go again. Note down which comparison finally landed.",
          },
        },
        {
          title: "Coins, tokens, and why the difference matters",
          type: "TEXT",
          points: 10,
          body: `People use "coin" and "token" interchangeably. They are not the same, and the difference will save you money.

## A coin is native to its chain

Bitcoin on Bitcoin. Ether on Ethereum. SOL on Solana. The coin is what the network itself uses to pay for the work of recording transactions. You cannot use the network without it, which is why you need a small amount of the native coin before you can move anything else.

This catches almost every beginner exactly once: they buy a token, send it to their wallet, then discover they cannot move it because they hold no native coin to pay the fee. The token is there. It is visible. It is stuck.

## A token lives on top of a chain

A token is an entry in a smart contract — a program running on the chain that keeps a list of who owns how much. Anyone can deploy one. It costs a few pounds and takes ten minutes.

Read that again. **Anyone can create a token.** A token existing means nothing at all. It is not a licence, an endorsement, a company, or evidence that anybody has built anything.

## The practical consequences

- A token can be created with any name, including the name of something real. "Bitcoin" tokens exist on chains Bitcoin has nothing to do with.
- A token's contract can contain rules the marketing does not mention: a fee on every sale, a limit on who may sell, a switch that lets the creator mint unlimited supply.
- Two tokens with identical names and logos can exist side by side. The only thing that distinguishes them is the contract address.

## The habit to build now

Identify a token by its **contract address**, never by its name or logo. Get the address from the project's own documentation or a reputable data site — never from a message someone sent you, and never from a search advert.`,
          quiz: {
            title: "Coins and tokens",
            passScore: 70,
            maxAttempts: 4,
            questions: [
              {
                prompt:
                  "You buy a token, send it to your wallet, and now you cannot move it. What is the most likely reason?",
                explanation:
                  "Moving anything on-chain costs a fee, and the fee is paid in the chain's native coin — not in the token you are trying to move. The token is fine; you simply have nothing to pay the network with. Keep a small buffer of the native coin in any wallet you intend to use.",
                options: [
                  {
                    text: "You hold no native coin to pay the transaction fee",
                    correct: true,
                  },
                  { text: "The token has not finished confirming", correct: false },
                  { text: "Tokens cannot be moved once received", correct: false },
                  { text: "Your wallet needs to be verified first", correct: false },
                ],
              },
              {
                prompt: "What does the existence of a token tell you about a project?",
                explanation:
                  "Nothing whatsoever. Deploying a token takes minutes and costs very little. Anyone can create one with any name and logo, including the name of a real project. The token's existence is not evidence that anything has been built.",
                options: [
                  { text: "Nothing — anyone can create one", correct: true },
                  { text: "That it passed a listing review", correct: false },
                  { text: "That a company stands behind it", correct: false },
                  { text: "That its supply is fixed", correct: false },
                ],
              },
              {
                prompt: "How should you identify which token you are dealing with?",
                explanation:
                  "By its contract address, obtained from the project's own documentation or a reputable data source. Names and logos can be copied exactly; the contract address cannot. Never take an address from a direct message or a search advert.",
                options: [
                  {
                    text: "By its contract address, from a source you chose yourself",
                    correct: true,
                  },
                  { text: "By its ticker symbol", correct: false },
                  { text: "By its logo", correct: false },
                  { text: "By the address someone sent you", correct: false },
                ],
              },
            ],
          },
        },
        {
          title: "Where the fee goes, and why it moves",
          type: "TEXT",
          points: 10,
          body: `Every transaction costs a fee. Understanding what you are paying for stops you overpaying and stops you panicking when a fee spikes.

## What you're paying for

Block space. A block holds a limited amount of activity, and when more people want in than fit, the space is auctioned. Your fee is a bid. A higher bid gets included sooner.

You are not paying a company. You are outbidding strangers for a seat on the next train.

## Why it changes so much

Because demand changes. A quiet Sunday morning and a chaotic market hour are different auctions. The same transfer might cost pennies or many pounds depending on nothing but timing.

This means: **if a transaction is not urgent, wait.** Fees on most chains fall noticeably during quiet hours. Checking a fee tracker before moving a large amount is a two-minute habit that saves real money.

## What "gas" actually measures

Gas is a measure of computational work, not of money. A simple transfer uses a small, fixed amount of work. Interacting with a complex contract uses more. Your total cost is roughly:

**work required × price per unit of work**

You control neither number completely, but you influence the second by choosing when to transact, and the first by choosing what to do.

## A failed transaction still costs you

This surprises people and it is important. If a transaction runs out of gas or reverts, the network still did the work of trying. You pay for the attempt and the transfer does not happen. Setting a fee too low to save money can therefore cost you money and achieve nothing.

## The practical habits

- Keep a small buffer of native coin in every wallet — more than you think you need
- Check current fees before a large or non-urgent transfer
- Never set the fee to the absolute minimum on a transaction that matters
- Expect your first transaction on a new chain to feel expensive; it is a one-off learning cost`,
          activity: {
            title: "Watch a fee move",
            prompt:
              "Find a fee tracker for a chain you're interested in. Note the current fee. Check again eight hours later, and once more at a very different time of day. Write down the highest and lowest figures you saw. The ratio between them is the money you'd waste by never checking.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A short check on the mental model before we touch a wallet. If any answer surprises you, go back — module 2 is where mistakes start costing real money, and it builds directly on this.`,
          quiz: {
            title: "Foundations",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "Why is a blockchain hard to tamper with?",
                explanation:
                  "Each entry references the one before it and thousands of independent machines hold identical copies. Altering an old entry breaks every entry after it, on every copy — so tampering is detectable rather than merely against the rules.",
                options: [
                  {
                    text: "Entries reference each other and thousands of copies exist independently",
                    correct: true,
                  },
                  { text: "The data is encrypted so nobody can read it", correct: false },
                  { text: "A regulator audits the records", correct: false },
                  {
                    text: "Only verified users are allowed to write to it",
                    correct: false,
                  },
                ],
              },
              {
                prompt: "You send crypto to the wrong address. What can be done?",
                explanation:
                  "Nothing. A confirmed transaction is final and there is no support desk that can reverse it. This single fact is why every safety habit in this course exists — verification happens before you sign, because afterwards there is nothing to verify.",
                options: [
                  { text: "Nothing — a confirmed transaction is final", correct: true },
                  { text: "Contact support to reverse it", correct: false },
                  { text: "Report it to the network to freeze the funds", correct: false },
                  { text: "Wait for the automatic 24-hour reversal window", correct: false },
                ],
              },
              {
                prompt: "A blockchain transaction is private.",
                explanation:
                  "The opposite, on most chains. Transactions are public and permanent. Your address is pseudonymous rather than anonymous — it carries no name, but once anyone links it to you, your entire history is visible to them forever.",
                options: [
                  {
                    text: "False — most transactions are public and permanent",
                    correct: true,
                  },
                  { text: "True — that is the main purpose", correct: false },
                  { text: "True, unless you opt out of privacy", correct: false },
                  { text: "Only large transactions are visible", correct: false },
                ],
              },
              {
                prompt: "A transaction fails. What happens to the fee?",
                explanation:
                  "You still pay it. The network performed the work of attempting the transaction. This is why setting the fee too low can cost you money and accomplish nothing at all.",
                options: [
                  { text: "You pay it and the transfer does not happen", correct: true },
                  { text: "It is refunded automatically", correct: false },
                  { text: "It is held until the transaction succeeds", correct: false },
                  { text: "No fee is charged for failed transactions", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },

    // =====================================================================
    {
      title: "Self-custody, properly",
      description:
        "The module that decides whether you keep your money. Read it twice.",
      lessons: [
        {
          title: "Wallets, keys and what you're really holding",
          type: "TEXT",
          points: 10,
          body: `A wallet does not hold your crypto. This is the single most useful correction in this course.

Your coins are entries on the blockchain. A wallet holds the **key** that authorises changes to those entries. The wallet is a keyring, not a purse.

## Three things, often confused

**Private key.** A very large secret number. Whoever knows it can move the funds. That is the entire security model — there is no second factor, no identity check, no appeal.

**Public address.** Derived from the private key, safe to share. This is what you give someone to receive funds. You cannot work backwards from an address to a key.

**Seed phrase.** Twelve or twenty-four ordinary words that regenerate your private keys. It exists so you can recover a wallet after losing a device. It is *equivalent to* the keys — anyone holding the phrase holds everything, on every chain, forever.

## Why the rule is absolute

Now the earlier warning should read differently. A support agent asking for your seed phrase is not asking for a password they could reset. They are asking you to hand over the account itself, permanently and irreversibly.

There is no legitimate reason for anyone to need it. Not to "verify" your wallet, not to "restore" it, not to "sync" it, not to send you an airdrop. **The request is the attack.**

## Custodial versus self-custody

**Custodial** — an exchange holds the keys. You have an account with a company. You can reset a password, and they can freeze your funds, lose them, or refuse a withdrawal.

**Self-custody** — you hold the keys. Nobody can freeze your funds. Nobody can help you if you lose them.

Neither is universally correct. Custodial is reasonable while you are learning, or for money you are actively trading. Self-custody is right for savings and for anything you would be genuinely upset to lose to somebody else's business failure.

The mistake is not choosing one. The mistake is not knowing which you are using.`,
          activity: {
            title: "Audit what you already hold",
            prompt:
              "List every place you currently hold crypto, if any. Next to each, write 'custodial' or 'self-custody' — who holds the keys? If you cannot answer for one of them, that is the finding. For anything custodial, write down what you would lose if that company shut down tomorrow with no notice.",
          },
        },
        {
          title: "Setting up your first wallet",
          type: "TEXT",
          points: 15,
          body: `We will set up a wallet the careful way. It takes twenty minutes instead of three, and the extra time is entirely spent on things that prevent permanent loss.

## Before you download anything

Get the wallet from the official source, reached by typing the address yourself or following a link from the project's own documentation. **Do not use a search advert.** Fake wallet apps that exist purely to steal seed phrases have appeared at the top of search results for every major wallet.

Check the publisher name in the app store. Check the download count. A wallet with a familiar name and two hundred downloads is not that wallet.

## Setting up

1. Create a new wallet. Do not import one, and do not use a phrase anybody sent you.
2. It will show you twelve or twenty-four words. This is the moment that matters.
3. Write them on paper. Not a screenshot. Not a photo. Not a note app. Not a password manager you have not thought hard about. Not a message to yourself.
4. Write them **in order**, and read them back against the screen, word by word.
5. It will ask you to confirm the words. Do not skip this — it is the only test you will ever get of whether you wrote them down correctly.
6. Set a device password or biometric lock. This protects against someone picking up your unlocked phone; it does *not* protect the seed phrase.

## Why paper, still

A screenshot lives in a photo library that syncs to a cloud account protected by a password that can be phished. A note app is searchable by any process that reads your files. Malware specifically hunts for twelve consecutive dictionary words.

Paper has one failure mode — physical loss — and it is a failure mode you can reason about and mitigate. Digital storage has failure modes you will never see coming.

## Then test it

Before this wallet holds anything meaningful: delete the app, reinstall it, and restore from your written phrase.

This feels alarming, which is exactly why you do it now, while the wallet is empty. A backup you have never tested is a hope, not a backup. Most people discover their phrase was written down wrong at the worst possible moment.`,
          activity: {
            title: "Do the restore test",
            prompt:
              "Set up a new wallet, write the phrase on paper, then delete the app and restore from your written words alone. Do not look at the screen you copied from. If the restore fails, you have just saved yourself from a catastrophe — start again and be slower. Do not put money in until a restore has succeeded.",
          },
        },
        {
          title: "Backing up so that you actually recover",
          type: "TEXT",
          points: 10,
          body: `You have a phrase on paper. Now make it survive real life: a fire, a flood, a burglary, a house move, and your own memory.

## The two failure modes, pulling in opposite directions

**Loss** — you cannot find the phrase. Solved by having more copies.

**Theft** — someone else finds the phrase. Solved by having fewer copies.

Every backup decision trades one against the other. There is no arrangement that eliminates both, and anyone who tells you otherwise is selling something.

## A reasonable arrangement for most people

- **Two paper copies**, in two different buildings. Home and a relative's house, or home and a safe-deposit box. One building can burn down.
- **Neither copy labelled** "crypto" or "seed phrase". A list of twelve words means nothing to a casual burglar. A list of twelve words in an envelope marked BITCOIN is a target.
- **Metal backup** for larger amounts. Stamped steel plates survive fire and water; paper does not. They cost less than the amount you are protecting.
- **Somebody knows it exists.** Not what it is, or where — just that it exists and matters. Crypto that nobody knows about is crypto that dies with you.

## Passphrases: real protection, real risk

Most wallets support an optional extra word — a "passphrase" or "25th word" — on top of the seed phrase. The phrase alone then opens an empty wallet; the phrase plus the passphrase opens the real one.

This genuinely defends against someone finding your paper. It also creates a new way to lose everything: forget the passphrase and the funds are gone, with no recovery path, because the passphrase is not stored anywhere.

Only use one if you have a concrete plan for remembering it that does not rely on your memory alone.

## What never to do

- Never type the phrase into a website. Not one. There is no legitimate site that needs it.
- Never store it in email, cloud notes, a photo, or a chat with yourself.
- Never split it across two cloud services and think you have been clever — most wallets can be brute-forced from a partial phrase.
- Never let anyone watch you write it, and never read it aloud.`,
          assignment: {
            title: "Your custody plan",
            instructions: `Write your custody plan and submit it. This is graded on judgement, not on length.

Cover all four:

**1. Where your backups live.** How many copies, in how many buildings, in what form. Explain your reasoning against both loss and theft.

**2. What happens if your house burns down tonight.** Walk through it. Would you still have access?

**3. What happens if you die tomorrow.** Who knows the funds exist? How would they reach them? If the honest answer is "nobody could", say so — that is a real finding and worth full marks for honesty.

**4. Your custodial/self-custody split.** What stays on an exchange, what you self-custody, and why that line is where it is.

**Never include your actual seed phrase, any part of it, a passphrase, or a private key.** Submitting one is an automatic zero and we will tell you to move the funds immediately. Describe your arrangement, never its contents.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Loss resilience",
                weight: 30,
                descriptor:
                  "Multiple copies in separate physical locations, with a clear account of which single disaster the plan survives and which it does not.",
              },
              {
                criterion: "Theft resilience",
                weight: 25,
                descriptor:
                  "Backups are unlabelled and not stored digitally. Any passphrase use comes with a concrete memory plan rather than optimism.",
              },
              {
                criterion: "Inheritance",
                weight: 25,
                descriptor:
                  "Someone would be able to find and access the funds, or the gap is identified honestly with a stated next step.",
              },
              {
                criterion: "Honest custody split",
                weight: 20,
                descriptor:
                  "States what is held custodially versus self-custodied and gives a real reason, rather than claiming a purity that the submission's own details contradict.",
              },
            ],
          },
        },
        {
          title: "Hot wallets, cold wallets, and the amount test",
          type: "TEXT",
          points: 10,
          body: `"Hot" means the keys touch an internet-connected device. "Cold" means they never do. Everything else about wallets is detail.

## Hot wallets

A browser extension or phone app. The key sits on a device that also runs a browser, reads email and installs software. Convenient, and appropriate for small amounts you use often.

The risk is not theoretical. Malware that scans for wallet files exists, is cheap, and is widely deployed. A malicious browser extension can read what other extensions display.

## Cold wallets

A dedicated device that holds the key and never reveals it. To send funds, the device signs the transaction internally and hands back only the signature. The key never touches your computer, so malware on your computer cannot read it.

This is the meaningful upgrade. It is not about the device being unhackable — it is that the attack surface shrinks from "everything my laptop runs" to "the device itself, physically".

## Buying a cold wallet without being robbed

- Buy **direct from the manufacturer**. Never from a marketplace listing, never second-hand, never from someone in a chat.
- A device that arrives with a seed phrase already written on a card is a scam, one hundred per cent of the time. A genuine device generates the phrase in front of you, on first use.
- If the packaging looks tampered with, do not use it.

## The amount test

The useful question is not "which wallet is best" but "how much is on this device, and would I be all right if it vanished tonight?"

- **Spending money** — a hot wallet is fine. Keep it to an amount you would be annoyed but not damaged to lose.
- **Savings** — cold. Anything you would be genuinely hurt to lose belongs on a device that never touches the internet.
- **Two wallets, not one.** Separating them means a compromise of your everyday wallet does not reach your savings. This is the single highest-value habit in this module.

## The reflex worth building

Before signing anything, ask: *if this transaction is malicious, what is the worst it can take?* On a hot wallet holding spending money, the answer is bounded. On one wallet holding everything, it is everything.`,
          quiz: {
            title: "Custody",
            passScore: 80,
            maxAttempts: 4,
            questions: [
              {
                prompt:
                  "A support agent in a project's official chat asks for your seed phrase to restore your wallet. What do you do?",
                explanation:
                  "Refuse and report it. There is no legitimate reason for anyone to need your seed phrase — not support, not a developer, not an exchange, not this academy. The phrase is the wallet. The request itself is the attack, regardless of how official the setting looks.",
                options: [
                  {
                    text: "Refuse and report it — the request itself is the attack",
                    correct: true,
                  },
                  {
                    text: "Share it, since the channel is official",
                    correct: false,
                  },
                  { text: "Share only the first six words", correct: false },
                  {
                    text: "Ask them to verify their identity first, then share",
                    correct: false,
                  },
                ],
              },
              {
                prompt: "A new hardware wallet arrives with a seed phrase printed on a card.",
                explanation:
                  "It is a scam, without exception. A genuine device generates the phrase in front of you on first use and never ships with one. Someone else knows those words and is waiting for you to fund the wallet.",
                options: [
                  { text: "It is a scam — do not use it", correct: true },
                  { text: "It is the factory default, so use it", correct: false },
                  { text: "Use it but change it afterwards", correct: false },
                  { text: "It is fine if the packaging was sealed", correct: false },
                ],
              },
              {
                prompt: "What is the practical difference between a hot and a cold wallet?",
                explanation:
                  "Whether the private key ever touches an internet-connected device. A cold wallet signs transactions internally and returns only the signature, so malware on your computer never sees the key. That shrinks the attack surface enormously — it does not make the device unhackable.",
                options: [
                  {
                    text: "Whether the private key ever touches an internet-connected device",
                    correct: true,
                  },
                  { text: "Whether the wallet supports multiple chains", correct: false },
                  { text: "Whether it is free or paid", correct: false },
                  { text: "How quickly transactions confirm", correct: false },
                ],
              },
              {
                prompt: "Why keep two wallets rather than one?",
                explanation:
                  "So that a compromise of the wallet you use every day does not reach your savings. It bounds the worst case. A single wallet holding everything means every risky interaction risks everything you own.",
                options: [
                  {
                    text: "So a compromise of everyday funds cannot reach savings",
                    correct: true,
                  },
                  { text: "To reduce transaction fees", correct: false },
                  { text: "To qualify for more airdrops", correct: false },
                  { text: "Because wallets have balance limits", correct: false },
                ],
              },
            ],
          },
        },
        {
          title: "Back up your wallet — for real",
          type: "ASSIGNMENT",
          points: 20,
          body: `The written plan was theory. This is the practice. You will do the restore, and you will report honestly on what happened — including if it went wrong, which is common and is the entire point of doing it while the wallet is empty.`,
          assignment: {
            title: "The restore drill",
            instructions: `Complete a real restore drill on an **empty** wallet, then report on it.

**What to do**

1. Create a new wallet and write the phrase on paper, carefully and in order.
2. Put nothing in it.
3. Delete the wallet app entirely.
4. Reinstall it and restore using **only your written words** — no screenshots, no glancing at the original screen.
5. Confirm the restored wallet shows the same first address.

**What to submit**

- Confirmation that the restored address matched, or that it did not
- How long the whole drill took
- **Anything that went wrong.** A misread word, an out-of-order word, an ambiguous handwritten letter, a wallet that asked for a passphrase you had forgotten setting. Full marks require this section to be honest, and "nothing went wrong" is an acceptable answer only if it is true.
- One change you have made to your written backup as a result

**Never submit any part of a seed phrase, a passphrase, or a private key.** Doing so is an automatic zero and you will be told to abandon that wallet.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Drill actually completed",
                weight: 40,
                descriptor:
                  "A real delete-and-restore was performed on an empty wallet and the resulting address was checked against the original.",
              },
              {
                criterion: "Honest reporting of problems",
                weight: 30,
                descriptor:
                  "Names what went wrong specifically, or states plainly that nothing did. Vague reassurance scores low — the failures are the learning.",
              },
              {
                criterion: "Backup improved",
                weight: 20,
                descriptor:
                  "One concrete change to the written backup as a result of the drill, not a general intention to be more careful.",
              },
              {
                criterion: "Handled secrets correctly",
                weight: 10,
                descriptor:
                  "No phrase, partial phrase, passphrase or key anywhere in the submission.",
              },
            ],
          },
        },
      ],
    },

    // =====================================================================
    {
      title: "Moving money without fear",
      description:
        "Your first transactions, done carefully enough that they become routine.",
      lessons: [
        {
          title: "Anatomy of an address",
          type: "TEXT",
          points: 10,
          body: `An address is a destination. Get one character wrong and the money goes somewhere nobody controls, or somewhere someone else controls. There is no undo.

## What an address is

A string derived from a public key. Different chains use different formats — Ethereum-style addresses begin \`0x\` and run forty hex characters; Bitcoin has several formats; Solana uses a different alphabet entirely. They are not interchangeable.

## The mistake that costs the most

**Sending to the right address on the wrong chain.** The same \`0x\` address often exists on Ethereum, Arbitrum, Polygon, BNB Chain and others. Send a token to your address on a chain your wallet does not watch, and it is not lost exactly — but recovering it needs knowledge you do not yet have, and sometimes it truly is unrecoverable.

Before every send, confirm two things: the address, **and the network**.

## Checksums help, a little

Ethereum-style addresses use mixed capitalisation as an error check. Most software will reject an address whose capitalisation does not match its content, catching a mistyped character. This is a safety net, not a strategy — it does not catch a *valid* address belonging to someone else.

## Address poisoning: the attack that beats copy-paste

Attackers generate an address whose first and last characters match one you have used, then send you a tiny worthless transfer from it. Their address now sits in your transaction history looking exactly like the real one, because your wallet shows you \`0x71C7…8f3A\` and both match.

Then you copy from history, out of habit, and send to them.

The defence is specific: **never copy an address from your transaction history.** Copy from your own address book, or from the recipient directly.

## The verification habit

1. Paste the address.
2. Check the **first four and last four** characters against the source.
3. Check **at least four characters in the middle** — this is what defeats poisoning, and it is the step everybody skips.
4. Confirm the network matches.
5. Send a small test amount first for any large or first-time transfer. The fee is trivial insurance.`,
          activity: {
            title: "Build an address book",
            prompt:
              "Add every address you send to regularly into your wallet's address book with a clear label. Then look at your transaction history and notice how similar the truncated addresses look to each other. That resemblance is the entire basis of address poisoning — and your address book is the defence.",
          },
        },
        {
          title: "Your first transaction, step by step",
          type: "TEXT",
          points: 15,
          body: `Send a small amount. Verify it independently. Once you have done this, moving money on-chain stops being frightening and becomes admin.

## Before you start

- A funded wallet with a little native coin for the fee
- A destination address you control — a second wallet is ideal
- The **network** clear in your mind

## The steps

**1. Start small.** A few pounds. The point is the process, not the amount.

**2. Enter the address.** Paste it, then verify: first four, last four, and four in the middle.

**3. Check the network.** Your wallet shows which chain it is on. Confirm it matches the destination.

**4. Read the fee.** Note it before confirming. If it looks unreasonable for a simple transfer, stop — an unexpectedly high fee often means you are not doing what you think you are doing.

**5. Confirm.** Your wallet will show a summary. Read it. This is the last moment anything can be changed.

**6. Copy the transaction hash.** A long string identifying your transaction. Keep it.

## Verify it yourself

Do not take the wallet's word for it. Open a block explorer for that chain and paste the hash.

You will see: the sending address, the receiving address, the amount, the fee actually paid, and a confirmation count.

**Confirm the receiving address is the one you intended.** This is the whole exercise. You are checking the public record rather than trusting your own software — and building the habit that lets you check anyone's claim about anything on-chain.

## Reading the states

- **Pending** — broadcast, not yet included. Normal for seconds to minutes.
- **Success** — done. Irreversible.
- **Failed / Reverted** — it did not happen, and you still paid the fee.
- **Confirmations** — how many blocks have been built on top. More means harder to undo. A handful is plenty for ordinary amounts.

## If it seems stuck

It usually is not. Fees rise, your bid is now too low, and the transaction waits. Most wallets let you resubmit with a higher fee — a "speed up". Do that rather than sending a second transaction, which risks sending twice.`,
          activity: {
            title: "Send, then verify on a block explorer",
            prompt:
              "Send a small amount between two wallets you control. Then open a block explorer, paste the transaction hash, and find four things: sender, receiver, amount and fee actually paid. Write down how the fee you paid compared with the estimate. You have now verified a transaction without trusting any single piece of software.",
          },
        },
        {
          title: "Approvals — the permission people forget they gave",
          type: "TEXT",
          points: 15,
          body: `The most expensive signature you will ever make is not a transfer. It is an approval — and it is the mechanism behind most drained wallets that had a perfectly safe seed phrase.

## What an approval is

To let a contract move your tokens, you grant it permission first. Two signatures: an approval, then the action.

The approval has an amount. Many interfaces request **unlimited**, because it is convenient and means never asking again.

## Why unlimited is the problem

An unlimited approval is a standing permission to move every one of those tokens you will ever hold in that wallet, at any time in the future, without asking you again.

If that contract is malicious now, or is compromised in two years, or contains a bug — the approval is still live. Your keys were never stolen. You granted access, and then forgot.

This is why wallets get emptied months after the interaction that caused it.

## Reading a signature request

Your wallet tells you what you are signing, though rarely clearly. Look for:

- **Approve / Allowance** — you are granting spending permission, not transferring
- **The amount** — a specific figure, or "unlimited"
- **The spender** — which contract gets the permission
- **setApprovalForAll** — for NFTs, this grants control of an entire collection

If a request is for an unlimited approval and you only intend one trade, set a specific amount instead. Most wallets let you edit it.

## The blind-signing trap

Some requests show only a hash — no readable summary. Signing that is agreeing to something you cannot see, and it is how a great deal of money is lost.

**If you cannot read what you are signing, do not sign it.** No legitimate application needs you to sign something illegible.

## Audit and revoke

Approvals persist until revoked. There are tools for each major chain that list every approval a wallet has granted.

Do this now, and put it in the calendar quarterly:

1. Open an approval checker for your chain
2. Connect your wallet — read-only, it cannot move funds
3. Revoke everything you no longer actively use
4. Revoke every unlimited approval you can live without

Each revocation costs a small fee. It is the cheapest insurance in this course.`,
          activity: {
            title: "Audit and revoke your approvals",
            prompt:
              "Use an approval checker for a chain where you hold anything. List every live approval and note which are unlimited. Revoke everything you are not actively using this week. Write down how many were unlimited and how many you had entirely forgotten — that number is the point of the exercise.",
          },
        },
        {
          title: "Bridges, exchanges and the moment of most risk",
          type: "TEXT",
          points: 10,
          body: `Moving between chains, or between an exchange and a wallet, is when most avoidable losses happen. Not because the tools are bad, but because two systems have to agree and you are the one holding both ends.

## Withdrawing from an exchange

The exchange asks for an address and a network. Both must be right.

- **The network dropdown is not decoration.** Choosing the cheap network because it is cheap, when your wallet is not watching it, is a very common and very expensive mistake.
- **Withdraw a test amount first**, the first time you use any address. Every time.
- Expect a delay and possibly a hold on a first withdrawal. Annoying, not sinister.

## Bridges

A bridge moves value between chains. Mechanically it usually locks tokens on one side and issues a representation on the other.

What that means practically: the bridge holds the real asset. If it is exploited, the representation you hold may become worthless while the original sits in an attacker's wallet. Bridges have been among the largest losses in crypto's history, repeatedly.

So: use established bridges, move in amounts you can afford to have stuck, and do not leave value sitting mid-route.

## The wrapped-asset thing

A bridged token is not the original. "Wrapped" anything is a claim on the real asset, held somewhere by someone. The claim is only as good as whoever holds the collateral.

This is not a reason to avoid them. It is a reason to know which one you hold, because when something breaks, the difference is the whole story.

## The pre-flight check

Before any cross-chain or exchange transfer:

1. Which chain is it leaving? Which chain is it arriving on?
2. Does my receiving wallet actually watch that chain?
3. Do I hold native coin *on the destination chain* to move it afterwards?
4. Have I sent a test amount to this address on this network before?

Question 3 catches people constantly. Funds arrive perfectly and cannot be moved, because there is nothing to pay the fee with.`,
          quiz: {
            title: "Moving money",
            passScore: 80,
            maxAttempts: 4,
            questions: [
              {
                prompt:
                  "You are about to send to an address you copied from your transaction history. What is the risk?",
                explanation:
                  "Address poisoning. An attacker generates an address matching the first and last characters of one you use, sends you a dust transaction, and waits for you to copy theirs from history. Copy from your address book or from the recipient — never from history.",
                options: [
                  {
                    text: "It may be a poisoning address matching the first and last characters",
                    correct: true,
                  },
                  { text: "History addresses expire after a time", correct: false },
                  { text: "The fee will be higher", correct: false },
                  { text: "There is no risk if it worked before", correct: false },
                ],
              },
              {
                prompt: "Why is an unlimited token approval dangerous?",
                explanation:
                  "It is a standing permission to move all of those tokens at any point in the future. If the contract is malicious, or is compromised later, the approval is still live — and your seed phrase was never involved. This is how wallets get emptied months after the interaction that caused it.",
                options: [
                  {
                    text: "It lets that contract move those tokens at any future time",
                    correct: true,
                  },
                  { text: "It exposes your seed phrase to the contract", correct: false },
                  { text: "It raises your fees permanently", correct: false },
                  { text: "It is not dangerous if the app is well known", correct: false },
                ],
              },
              {
                prompt:
                  "Your wallet asks you to sign something it cannot decode into readable terms.",
                explanation:
                  "Do not sign it. Blind signing means agreeing to something you cannot inspect, and no legitimate application requires it. This is one of the most reliable ways to lose everything in a single click.",
                options: [
                  { text: "Do not sign it", correct: true },
                  { text: "Sign it if the site looks professional", correct: false },
                  { text: "Sign it — wallets often cannot decode valid data", correct: false },
                  { text: "Sign it with a low fee to limit the damage", correct: false },
                ],
              },
              {
                prompt:
                  "Tokens arrive on a new chain but you cannot move them. What did you forget?",
                explanation:
                  "Native coin on the destination chain to pay the fee. The tokens are there and visible; you simply have nothing to pay the network with. Always check this before bridging or withdrawing to a chain you have not used.",
                options: [
                  { text: "Native coin on the destination chain for the fee", correct: true },
                  { text: "To activate the chain in your wallet settings", correct: false },
                  { text: "To wait for the bridge's 24-hour unlock", correct: false },
                  { text: "To verify your wallet with the bridge", correct: false },
                ],
              },
            ],
          },
        },
        {
          title: "A live walkthrough: first transaction",
          type: "LIVE",
          points: 15,
          body: `A scheduled session where we do this together, on-screen, with questions.

## What we cover

- Setting up a wallet from scratch, including the parts people rush
- Sending a small transaction and verifying it on a block explorer
- Reading a real signature request and identifying an unlimited approval
- Auditing and revoking approvals live

## What we will never do

Ask you to share your screen while a seed phrase is visible, ask for a phrase in chat, or send you a link in a direct message. If anyone claiming to be from this session does any of those things, it is not us.

Bring a wallet with a small amount in it and your questions. Sessions are recorded, and the recording is posted here afterwards.`,
        },
      ],
    },

    // =====================================================================
    {
      title: "Not getting robbed",
      description:
        "The scams that catch beginners, taught as patterns rather than a list you have to memorise.",
      lessons: [
        {
          title: "The four patterns behind nearly every scam",
          type: "TEXT",
          points: 15,
          body: `You cannot memorise every scam — new ones appear weekly. You can learn the four shapes underneath them, and then recognise a scam you have never seen before.

## 1. The secret you must reveal

Anything that needs your seed phrase, private key, or a code from your authenticator. Dressed as support, a wallet migration, an airdrop claim, a compensation scheme.

**The tell:** a legitimate process never needs a secret that grants total control. Not once, not partially, not "just to verify".

## 2. The urgency you did not create

A deadline you had not heard of. A wallet "at risk". A limited window. A price about to move.

**The tell:** urgency you did not set yourself. Urgency exists to stop you checking, and checking is the only thing that protects you. Anything genuinely legitimate survives you taking an hour.

## 3. The return that cannot exist

Guaranteed profit. Fixed daily percentages. A bot that never loses. A yield with no explanation of who pays it.

**The tell:** the word "guaranteed" attached to a volatile asset. Ask who the payer is. If the answer is vague, or the answer is "new deposits", it is a Ponzi regardless of what it calls itself.

## 4. The helpful stranger

Someone who messaged you first. Who moves the conversation to a direct message. Who is patient, friendly, and eventually has an opportunity.

**The tell:** the direction of contact and the move to privacy. Real support answers in public and lets you come to them. A DM removes witnesses, which is the point.

## The rule that covers all four

**Slow down.** Every one of these needs you to act before you check. Not one survives an hour, a second opinion, or a question asked in a public channel.

Nothing legitimate is damaged by you waiting an hour. That asymmetry is the most useful thing in this module.

## And the specific one worth naming

Someone will eventually contact you claiming to be from Maby Academy — using my name, this logo, a similar domain. They may know things about you. They will be plausible.

We will never ask for a seed phrase, a private key, a password, or a payment sent to a wallet address in a message. If it happens, report it through Support. That queue is priority.`,
          activity: {
            title: "Classify five real attempts",
            prompt:
              "Find five scam attempts — in your spam folder, a project's public channel, or replies under any large crypto account. Label each with which of the four patterns it uses. Some use two. Then write down which one you think you would personally be most likely to fall for, and why. Knowing your own weak spot is worth more than knowing all four patterns.",
          },
        },
        {
          title: "Phishing sites and the address bar",
          type: "TEXT",
          points: 10,
          body: `A phishing site is a pixel-perfect copy of something real, at an address that is nearly right. It does not need to break anything. It needs you to connect a wallet and sign one thing.

## How you end up there

- **Search adverts.** Paid placements above real results, for every major exchange and wallet. This is the most common route and the most under-appreciated.
- **A link in a DM or a reply.** Often under a genuine announcement, often from an account with a copied name and avatar.
- **A typo.** Domains one character off are registered specifically for this.
- **A QR code.** You cannot inspect a QR code before scanning it.

## What they take

Rarely your seed phrase — that requires you to type it, and increasingly people do not. Instead: a signature. An unlimited approval, a \`setApprovalForAll\`, or a transaction that looks like a claim and is actually a transfer.

You sign once. Your keys are never exposed. Your wallet empties anyway.

## Defences that work

**Bookmark the real sites.** Navigate from your own bookmarks, always. This alone defeats most phishing.

**Never click a link to reach a wallet or exchange.** Type it, or use your bookmark. Treat links in messages as untrusted by default, including from people you know — accounts get compromised.

**Read the address bar before connecting.** Every single time. Check the whole domain, not just that it contains the right word. \`app.example.com\` and \`app-example.com\` are unrelated.

**Use a separate browser profile** for crypto, with no other extensions. A malicious extension can read what your wallet displays.

**Check for a connection you did not make.** If a site asks you to connect and you have no reason to, close it.

## When you think you have signed something bad

Speed matters, so know the order now:

1. **Revoke approvals immediately**, from a revocation tool for that chain. Do this first.
2. **Move remaining funds** to a fresh wallet with a new seed phrase — not to another address in the same wallet.
3. **Assume the old wallet is compromised** forever. Do not reuse it.
4. **Report it** so others get warned.

Do not wait to understand what happened. Revoke, then move, then investigate.`,
          activity: {
            title: "Set up a clean crypto browser profile",
            prompt:
              "Create a separate browser profile used only for crypto. Install your wallet and nothing else. Bookmark the real addresses of every site you use, typed by hand. Then, from now on, only reach those sites from those bookmarks. Note which sites you had been reaching by search until now.",
          },
        },
        {
          title: "Social engineering, and why it works on careful people",
          type: "TEXT",
          points: 10,
          body: `Technical defences are the easy half. The hard half is that competent, sceptical people get talked out of their own rules — not tricked, but persuaded.

## Why intelligence is not protection

Social engineering does not exploit ignorance. It exploits normal social instincts: wanting to be helpful, not wanting to seem paranoid, trusting a familiar name, and being tired at the wrong moment.

Knowing about a scam does not immunise you against it. Plenty of people who could describe these attacks in detail have still lost money to them, because in the moment they were being polite rather than analytical.

## The specific techniques

**Authority.** Claiming to be support, a moderator, a developer. Copied avatars and names differing by one character.

**Reciprocity.** Genuinely helping you first, over days. Then asking. The help was the investment.

**Social proof.** Fake accounts in a thread confirming it worked. Cheap to manufacture.

**Manufactured scarcity.** A closing window that never existed.

**Sunk cost.** Once you have sent something, "one more step to release your funds" exploits your reluctance to accept the first loss. This is why recovery scams target scam victims — and why the same person is often hit twice.

## The rules that survive persuasion

Written now, while you are calm, because in the moment you will not be:

1. **I never share a seed phrase, private key, or authenticator code. There is no exception and no context that changes this.**
2. **I do not act on anything urgent within one hour of first hearing about it.**
3. **I do not continue a conversation that moved to a DM after someone contacted me first.**
4. **I verify money-related requests through a second channel I chose.**
5. **I never sign what I cannot read.**

Notice these are not judgements. They are rules, precisely so that they work when your judgement is compromised by tiredness, excitement or embarrassment.

## Say it out loud

If you have been scammed, say so. Publicly if you can bear it.

Shame is the reason scams keep working — victims go quiet, so the next person never hears about the pattern. There is nothing embarrassing about being deceived by people who do this professionally. The only real failure is letting them do it to someone else in silence.`,
          activity: {
            title: "Write your five rules and put them somewhere",
            prompt:
              "Write your own version of the five rules, in your own words, and put them where you will see them when you are about to act — a note beside your desk, or a file pinned in your wallet browser profile. Then send them to one person who also holds crypto, and ask them to hold you to rule 2.",
          },
        },
        {
          title: "Scam awareness — the drill",
          type: "QUIZ",
          points: 20,
          body: `Ten scenarios. Every option is plausible; that is the point. Aim for the reasoning rather than the score — the explanations after each answer are the actual lesson.`,
          quiz: {
            title: "Scam awareness",
            passScore: 80,
            maxAttempts: 6,
            questions: [
              {
                prompt:
                  "A wallet you use posts an urgent security update: migrate your funds using a link in the announcement. The account is verified.",
                explanation:
                  "Verified accounts get compromised regularly, and 'migrate your funds urgently' is the classic combination of manufactured urgency and a link you did not choose. Reach the wallet through your own bookmark and check for the same announcement there. A real update never depends on you clicking one specific link.",
                options: [
                  {
                    text: "Reach the site from your own bookmark and verify the announcement there",
                    correct: true,
                  },
                  { text: "Follow the link, since the account is verified", correct: false },
                  { text: "Migrate quickly, before the deadline", correct: false },
                  { text: "Reply asking whether it is genuine", correct: false },
                ],
              },
              {
                prompt:
                  "Someone helpful in a public channel has answered your questions for a week. They now mention a yield opportunity paying 3% a day.",
                explanation:
                  "Two patterns at once: reciprocity, and a return that cannot exist. 3% a day is over 3,000% a year — no strategy produces that sustainably, and the week of genuine help was the investment that made you willing to believe it. The helpfulness was real; the opportunity is not.",
                options: [
                  {
                    text: "Decline — the return cannot exist, and the help was the setup",
                    correct: true,
                  },
                  { text: "Try it with a small amount to test", correct: false },
                  { text: "Ask for proof of past returns first", correct: false },
                  { text: "Accept — they have been genuinely helpful", correct: false },
                ],
              },
              {
                prompt:
                  "You are told you can recover funds from an earlier scam, for an upfront fee.",
                explanation:
                  "A recovery scam, targeting people already hurt. It exploits sunk cost and hope. Nobody can reverse a confirmed blockchain transaction — that is not a service that exists at any price. Scam victims are the most targeted group precisely because they most want this to be true.",
                options: [
                  {
                    text: "It is a second scam — confirmed transactions cannot be reversed",
                    correct: true,
                  },
                  { text: "Worth trying if the fee is small", correct: false },
                  { text: "Legitimate if they show credentials", correct: false },
                  { text: "Legitimate if payment is only on success", correct: false },
                ],
              },
              {
                prompt:
                  "A site offers a free airdrop. Claiming needs one signature. Your wallet shows only a hex string.",
                explanation:
                  "Do not sign. An unreadable signature request is how approvals and transfers get disguised as claims. The 'free' framing is there to make the signature feel low-stakes. No legitimate claim requires signing something you cannot read.",
                options: [
                  { text: "Do not sign — you cannot read what it does", correct: true },
                  { text: "Sign it; airdrop claims always look like that", correct: false },
                  { text: "Sign from a wallet with a small balance", correct: false },
                  { text: "Sign, then revoke immediately afterwards", correct: false },
                ],
              },
              {
                prompt:
                  "An exchange asks you to complete identity verification before withdrawing.",
                explanation:
                  "Ordinary regulated practice, however inconvenient and whatever you think of it. The thing to verify is that you are actually on the exchange's real domain, reached from your own bookmark — the request is normal, but the same request on a phishing clone is not.",
                options: [
                  {
                    text: "Normal — but confirm you are on the real domain via your bookmark",
                    correct: true,
                  },
                  { text: "Always a scam — no exchange needs identity", correct: false },
                  { text: "Send the documents by email instead", correct: false },
                  { text: "Provide it only if they waive fees", correct: false },
                ],
              },
              {
                prompt:
                  "A friend messages asking you to send crypto urgently — their account, their writing style.",
                explanation:
                  "Verify through a channel you choose: phone them on a number you already have. Compromised accounts are extremely common, and message-based verification is worthless because the attacker controls the account you would be messaging.",
                options: [
                  {
                    text: "Verify by phoning a number you already had",
                    correct: true,
                  },
                  { text: "Send it — the writing style matches", correct: false },
                  { text: "Ask a security question in the same chat", correct: false },
                  { text: "Send a smaller amount as a compromise", correct: false },
                ],
              },
              {
                prompt:
                  "You receive an unexpected token in your wallet. It shows a large value.",
                explanation:
                  "Leave it entirely alone. Unsolicited tokens are bait — the displayed value is fake, and attempting to sell or approve it takes you to a contract designed to drain the wallet. Do not interact with it, including trying to send it away.",
                options: [
                  { text: "Do not interact with it at all", correct: true },
                  { text: "Sell it quickly before the value drops", correct: false },
                  { text: "Send it to another wallet to check it", correct: false },
                  { text: "Approve it so you can move it later", correct: false },
                ],
              },
              {
                prompt:
                  "A project's public channel has an announcement, and a reply from a similar-looking account with a slightly different link.",
                explanation:
                  "The reply is the attack — a near-identical name and avatar under a real announcement, which is where people are already primed to click. Ignore both links and reach the project from your own bookmark. Replies under genuine announcements are one of the highest-yield phishing spots there is.",
                options: [
                  {
                    text: "Ignore both links and use your own bookmark",
                    correct: true,
                  },
                  { text: "Use the reply's link — it is the mirror", correct: false },
                  { text: "Whichever has more engagement", correct: false },
                  { text: "Both, to compare them", correct: false },
                ],
              },
              {
                prompt:
                  "An instructor from this academy direct-messages you asking to confirm your seed phrase for a certificate.",
                explanation:
                  "An impersonator, without exception. Maby Academy will never ask for a seed phrase, in any context, for any reason — a certificate has nothing to do with a wallet. Report it through Support, which routes scam reports to a priority queue.",
                options: [
                  {
                    text: "An impersonator — report it through Support",
                    correct: true,
                  },
                  { text: "Comply — the academy issued the certificate", correct: false },
                  { text: "Share a partial phrase as a compromise", correct: false },
                  { text: "Ask them to prove their identity, then comply", correct: false },
                ],
              },
              {
                prompt: "What single habit defeats the largest share of these?",
                explanation:
                  "Waiting an hour. Every one of these attacks needs you to act before you check, and nothing legitimate is harmed by an hour's delay. That asymmetry is the most valuable thing in this module — it works even against attacks you have never seen.",
                options: [
                  {
                    text: "Refusing to act on anything urgent for an hour",
                    correct: true,
                  },
                  { text: "Using a hardware wallet for everything", correct: false },
                  { text: "Keeping funds spread across many wallets", correct: false },
                  { text: "Reading every project's whitepaper", correct: false },
                ],
              },
            ],
          },
        },
        {
          title: "Write the warning you wish you'd had",
          type: "ASSIGNMENT",
          points: 25,
          body: `The best test of understanding is explaining it to someone who does not have it. This assignment is read and graded by a real instructor, and the best submissions get used — with your permission — to warn other members.`,
          assignment: {
            title: "Explain one scam to someone who would fall for it",
            instructions: `Pick **one** scam pattern and write a warning aimed at a specific real person who would be vulnerable to it — a parent, a younger sibling, a friend who has just started buying crypto. Write it for them, not for us.

**Include all four:**

1. **The scam, in plain language.** No jargon. If you use a term like "approval" or "seed phrase", explain it in the same sentence.

2. **Why it works.** Not "because people are careless" — name the specific instinct it exploits. Helpfulness, urgency, embarrassment, hope, trust in a familiar name.

3. **The one thing they should do instead.** A single action they will actually remember at the moment it matters. Five rules is a policy; one rule is a habit.

4. **What to do if it has already happened.** Including the order of operations, and something about the shame that stops people reporting it.

**Length:** 300–600 words. Longer is not better — this has to be readable by someone who is not interested yet.

**Graded on:** whether your named person would actually understand and remember it. Technically correct writing that they would not read scores badly. Write for the reader, not for the grader.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Written for a real, named reader",
                weight: 30,
                descriptor:
                  "Clearly aimed at a specific person's level and concerns. No unexplained jargon. Reads as something that person would finish.",
              },
              {
                criterion: "Mechanism explained correctly",
                weight: 25,
                descriptor:
                  "The scam's actual mechanics are right — what the attacker gets and how — not just that it is bad.",
              },
              {
                criterion: "Names the psychology",
                weight: 20,
                descriptor:
                  "Identifies the specific instinct exploited, rather than blaming the victim's carelessness.",
              },
              {
                criterion: "One memorable defence",
                weight: 15,
                descriptor:
                  "A single concrete action, not a list. Something recallable under pressure.",
              },
              {
                criterion: "Recovery and shame",
                weight: 10,
                descriptor:
                  "Correct order of operations after a compromise, and addresses the embarrassment that keeps victims silent.",
              },
            ],
          },
        },
      ],
    },

    // =====================================================================
    {
      title: "Reading the chain for yourself",
      description:
        "Block explorers, and the shift from taking claims on trust to checking them.",
      lessons: [
        {
          title: "Your first block explorer",
          type: "TEXT",
          points: 10,
          body: `A block explorer is a search engine for a blockchain. It is the tool that turns "someone told me" into "I checked".

## The three things you can look up

**An address.** Balance, full transaction history, tokens held. Any address, including one that is not yours — this is public data.

**A transaction hash.** What happened, when, between whom, what it cost, whether it succeeded.

**A contract.** Its code, if published. Who deployed it and when. Every interaction it has ever had.

## Reading an address page

- **Balance** — native coin held
- **Token holdings** — a separate list. Remember: unsolicited tokens appear here and mean nothing
- **Transactions** — every transfer in and out, oldest available to newest
- **Age of first transaction** — how long this address has existed

That last one is quietly powerful. An address created three days ago that is being promoted as an established project is telling you something the promotion is not.

## Reading a transaction page

- **Status** — success or failed
- **From / To** — sender and recipient. If "To" is a contract, this was an interaction, not a transfer
- **Value** — native coin moved. Often zero for a contract interaction, which confuses people
- **Token transfers** — a separate section, and where the actual movement usually is
- **Fee** — what was really paid
- **Input data** — the instruction, decoded if the contract's code is published

## Verified contracts

A "verified" contract has published source code matching what is deployed. It means you can read what it does.

It does **not** mean anyone audited it, that it is safe, or that its author is honest. Verified means readable. Nothing more. A great deal of money has been lost by people who saw a green tick and stopped reading.

## What explorers cannot tell you

Who owns an address. Whether a project is legitimate. Whether a token has value. They tell you what happened, precisely and verifiably. What it means is your job.`,
          activity: {
            title: "Look up three things",
            prompt:
              "On a block explorer: (1) look up your own address and find your first transaction, (2) look up a well-known project's token contract and find its deployment date, (3) find a transaction that failed and note the fee that was still charged. Write one line on what each told you that a screenshot could not have proved.",
          },
        },
        {
          title: "Checking a claim without trusting anyone",
          type: "TEXT",
          points: 15,
          body: `The point of the previous lesson was capability. This one is the habit: turning any on-chain claim into something you verify.

## Claims you can check yourself

**"The team holds only 5%."** Look at the token's holder list. Look at the top ten addresses and what share they control. Check whether several of them were funded by the same address on the same day — which makes them one holder wearing ten hats.

**"Liquidity is locked."** Locked liquidity sits in a contract with a time condition. You can read that contract. Check the unlock date. "Locked" with an unlock date of next Tuesday is a countdown, not a commitment.

**"We have thousands of users."** Look at unique addresses interacting with the contract. Then look at when they were created and how they were funded. A thousand addresses created the same week and funded from one source is one person.

**"The contract is renounced."** Check whether owner privileges were actually given up, and whether the contract has functions that do not need the owner — a mint function callable by anyone is worse than a responsible owner.

## What you cannot check on-chain

Whether the team are who they say. Whether the product works. Whether a partnership is real. Whether the market will care.

Knowing the boundary matters as much as the skill. On-chain data answers "what happened", never "is this a good idea".

## The habit, in three questions

Whenever anyone makes an on-chain claim:

1. **Is this checkable?** Some claims are, some are not. Say which.
2. **What would the data look like if it were false?** Decide before you look, so you are testing rather than confirming.
3. **Did I check, or did I read a screenshot?** A screenshot is not evidence. It takes seconds to fabricate.

## Why this matters more than any tip

The specific coins discussed anywhere will be irrelevant within a year. The ability to check a claim yourself does not expire, and it is the difference between having opinions and having a method.

It is also the whole reason the next course in this pillar exists.`,
          activity: {
            title: "Fact-check one claim",
            prompt:
              "Find any public claim about a token's holders, liquidity or usage. Before looking, write down what the data would show if the claim were false. Then check it on a block explorer. Write down what you actually found and whether it matched the claim. Do this once and you will never fully trust a screenshot again.",
          },
        },
        {
          title: "Where to go from here",
          type: "TEXT",
          points: 10,
          body: `If you have done the work rather than just read the pages, you can now do something most people who own crypto cannot: hold your own money safely, and check a claim rather than believing it.

## What you should now be able to do

- Explain a blockchain without jargon
- Set up self-custody, back it up, and prove the backup works
- Send a transaction and verify it independently
- Recognise an unlimited approval and revoke it
- Identify the four scam patterns in something you have never seen
- Look up an address, a transaction and a contract, and say what each shows

If any of those feels shaky, that module is worth a second pass. This foundation is load-bearing.

## What comes next

**Reading the Chain: On-Chain Analysis** takes the explorer skills much further — following money between wallets, telling real usage from manufactured activity, and building a view of a protocol from data rather than from marketing.

**Risk First: Trading Without Blowing Up** is about surviving markets. It is deliberately unglamorous and it is the course most people should take before they ever place a trade.

**Money Basics That Actually Hold** is the boring foundation underneath all of it. If your finances outside crypto are fragile, that fragility is what will force you to sell at the worst moment.

## One last thing

The habits in this course are worth more than any position you will ever hold. Someone with modest holdings and good custody keeps their money. Someone with large holdings and bad custody is a story other people learn from.

Be the first one. Then help somebody else be.

You will not be reminded of the seed-phrase rule again, because you now understand *why* it exists rather than just that it does — and that is the difference between a rule you follow and a rule you keep.`,
          activity: {
            title: "Teach one person one thing",
            prompt:
              "Pick the single most useful thing you learned here and teach it to one person who holds crypto. Not a summary of the course — one thing, properly. Then write down what they asked that you could not answer. That gap is where your next course should start.",
          },
        },
      ],
    },
  ],
};
