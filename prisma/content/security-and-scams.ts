import type { ContentCourse } from "./types";

/**
 * Don't Get Drained — security and scam defence.
 *
 * Deliberately free, and deliberately early in the catalogue. Everything else
 * the academy teaches assumes the student still has their money. This course is
 * the one that protects the others.
 *
 * The order is defensive rather than technical: mindset first, because almost
 * every drain begins with a feeling (greed, urgency, fear of missing out) and
 * only later becomes a signature. Keys come second because they are the one
 * mistake with no recovery. The scam taxonomy comes third, once the student has
 * the vocabulary to see the machinery rather than the story.
 *
 * A standing rule runs through the whole course and is stated in almost every
 * module: nobody — not support, not an instructor, not this academy — ever
 * needs your recovery phrase. Any request for it is an attack, without
 * exception, and the course never asks a student to write one down anywhere.
 */
export const securityAndScams: ContentCourse = {
  slug: "security-and-scams",
  title: "Don't Get Drained: Security and Scam Defence",
  subtitle:
    "The course that protects every other course. How wallets are actually emptied, how the scripts work, and the small set of habits that make you a hard target.",
  description: `Almost nobody loses their crypto to a hacker in a hoodie breaking encryption. They lose it by clicking something, signing something, or telling something to a very friendly stranger. The attacks that empty ordinary wallets are social, not mathematical — which is good news, because it means the defence is learnable.

This course walks through the machinery. What a private key actually is and why one mistake with it has no undo. How approval-based drains empty a wallet weeks after the click that caused them. Why the "support agent" who messaged you first is always a thief. How romance, jobs, giveaways and fake apps are engineered, step by step, and what each of them needs from you in order to work.

Then it builds the defence: a wallet layout that limits blast radius, an approvals habit, a device and account perimeter, and a written plan for the day something goes wrong — because the difference between a scare and a catastrophe is usually the ten minutes after you notice.

One rule is repeated until it is boring, because it is the rule that matters: your recovery phrase is never needed by anyone, ever, for any reason. Nobody in this academy will ask you for it. Anyone who does is stealing from you, no matter how official they look.`,
  categorySlug: "crypto-foundations",
  level: "BEGINNER",
  priceMinor: 0,
  estimatedHours: 15,
  passThreshold: 80,
  instructorEmail: "grace@mabyacademy.com",
  outcomes: [
    "Recognise the emotional setup — urgency, greed, authority — that every scam needs before it can work",
    "Explain what a private key and a recovery phrase are, and why one mistake with them is final",
    "Name the main drain mechanisms on sight, including approval drains and blind signing",
    "Run a multi-wallet layout that caps how much any single mistake can cost you",
    "Audit and revoke token approvals, and keep the habit going",
    "Harden the accounts and devices that sit around your wallet, including SIM-swap defence",
    "Act correctly in the first ten minutes after a compromise, in the right order",
    "Write and keep a personal security plan you will actually follow",
  ],
  modules: [
    // =====================================================================
    {
      title: "Why people lose money",
      description:
        "Before any tooling: the shape of the problem. Almost every loss starts as a feeling, not a technical failure.",
      lessons: [
        {
          title: "The attacker doesn't break the maths",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `There is a picture in most people's heads of how crypto gets stolen: someone very clever, somewhere far away, breaks the encryption. It almost never happens. The cryptography holding your wallet together has never been broken, and if it ever were, your coins would be the least of the world's problems.

## What actually happens

People are talked into it. They click a link and sign a transaction they did not read. They download a wallet from an advert instead of the real site. They tell a helpful stranger the twelve words that are the wallet. They send money to a trading platform that was never a trading platform. Every one of those is a human being making a reasonable-seeming decision under pressure, not a computer being defeated.

That reframing matters, because it changes what you have to learn. You do not need to become a cryptographer. You need to become hard to talk into things.

## The uncomfortable part

Self-custody means there is no fraud department. A bank can reverse a transfer, freeze an account, refund a card. A blockchain cannot, and will not, and that is not a bug — it is the same property that means nobody can freeze your money either. You get sovereignty and liability in the same box. You cannot keep one and return the other.

So the standard is different from the one you are used to. In the banking world, being careless is expensive. Here, being careless once can be final.

## What makes this learnable

The attacks are not infinitely varied. Strip the stories away and there are perhaps a dozen mechanisms, recycled endlessly with new branding. Once you can see the mechanism under the story, the story stops working on you — which is the entire goal of this course.

## The rule that runs through everything

You will read this many times before the end, deliberately: nobody legitimate ever needs your recovery phrase. Not support. Not a wallet developer. Not an exchange. Not an instructor at this academy. There is no situation — no upgrade, no validation, no rescue, no migration — where giving those words to another human is the right move. Every single request for them is theft in progress.`,
          activity: {
            title: "Write down what you would actually lose",
            prompt:
              "Before any technique, get concrete about the stakes. Write down, honestly: if the wallet you use most were emptied tonight, what would you lose in money, and what would you lose in progress — savings toward something, months of work, a plan? Do not exaggerate and do not minimise. You are establishing the size of the thing you are about to learn to protect, so that the effort later feels proportionate rather than paranoid.",
          },
        },
        {
          title: "Every scam needs a feeling first",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `A scam has two parts: a mechanism and a mood. The mechanism is the technical bit — the malicious signature, the fake site, the wrong address. The mood is what makes you skip the check you would normally do. Attackers spend far more effort on the mood, because the mechanism is worthless without it.

## The four moods

Urgency. A window that is closing. A price that is about to move. A "your account will be locked in 24 hours". Urgency exists to remove the pause in which you would have thought.

Greed. A return that is unusually good, an airdrop you qualified for, a presale you got early access to. Greed makes you the one arguing for the deal, which is far more effective than the attacker arguing for it.

Authority. A support badge, a verified tick, an official-looking address, a person with your platform's name in their handle. Authority borrows trust you have already given to someone else.

Fear. Your wallet is at risk. Your funds are exposed. Move them now to a safe address. Fear is the most effective of all, because it makes speed feel like safety.

## Why this is your best defence

You will not always spot a malicious contract. You will not always notice a lookalike domain. But you can nearly always notice a feeling — if you have practised looking for it.

So the core habit of this entire course is one question, asked at the moment you feel any of the four: why am I in a hurry? If the answer is "because someone else made me be", stop. Nothing legitimate in this space is destroyed by waiting an hour. Nothing.

## The reversal test

Legitimate things survive scrutiny. Scams do not. So apply this: if I slow this down, verify it independently, and come back tomorrow, what happens? A real opportunity is still there tomorrow, slightly less exciting. A scam evaporates or turns aggressive — and the aggression itself is the answer.

The people who lose money are not stupid. They are rushed. Almost every victim, afterwards, says a version of the same sentence: I knew something was off, but I did not want to miss it.`,
          activity: {
            title: "Name your own weak mood",
            prompt:
              "The four moods are not equally dangerous for everyone. Think back over the last year — not in crypto necessarily, anywhere. Which one has actually moved you into a bad decision: urgency, greed, authority, or fear? Write about one specific occasion in a few sentences: what the situation was, what you felt, and what you skipped because of it. Then write the sentence you will say to yourself next time you notice that feeling.",
          },
        },
        {
          title: "Custody: who can actually move your money",
          type: "TEXT",
          points: 10,
          body: `Before you can secure anything, you have to know where it actually lives and who is capable of moving it. Most people are fuzzy on this, and the fuzziness itself is a vulnerability.

## Three arrangements

An exchange account. The platform holds the keys; you hold a claim against the platform. You can be locked out by them, frozen by them, and you lose everything if they collapse. In exchange, they can also reverse a mistake, help you recover a password, and stop a thief who has your login but not your second factor.

A software wallet on your phone or browser. You hold the keys; they sit on a device that is connected to the internet and runs other software. Nobody can freeze you. Nobody can help you either.

A hardware wallet. You hold the keys; they sit on a small device that never exposes them to your computer, and every transaction requires a physical button press. It is not magic, and it does not protect you from signing a malicious transaction — it protects you from having the key stolen off your machine.

## The question that clarifies everything

For every place you keep value, answer one question: who, other than me, is technically capable of moving this? On an exchange, the answer is the exchange, plus anyone who compromises your login. In a software wallet, the answer is anyone who obtains your recovery phrase or gets you to sign the wrong thing. On a hardware wallet, the answer is anyone who gets you to press the button on a bad transaction.

Different answers mean different defences. Exchange security is account security: passwords, second factors, phone number hygiene. Self-custody security is key security and signing discipline. Confusing the two is why people put a hardware wallet on a desk and still lose everything to a phishing site — the device was never the thing that was going to save them there.

## Not a hierarchy

It is tempting to rank these from bad to good. Resist it. An exchange is genuinely safer for a beginner with a small balance and no backup discipline, because the failure mode of self-custody for that person is total and permanent. A hardware wallet is genuinely safer for meaningful savings. The right answer changes as your amount and your competence change, and pretending otherwise is how people end up self-custodying badly.`,
          activity: {
            title: "Map your own custody",
            prompt:
              "List every place you currently hold value — exchanges, wallets, apps, anything. Next to each, write the rough amount and the answer to the clarifying question: who other than me can technically move this? Then mark the one that holds the most value. That is the one the rest of this course is really about. If you notice that your largest amount sits in your least protected place, write that down too — it is extremely common and it is the single highest-value thing you will fix.",
          },
        },
        {
          title: "Blast radius: the idea that saves people",
          type: "TEXT",
          points: 10,
          body: `Security professionals do not plan on never making a mistake. They plan on making one and containing it. The word for that is blast radius: when the worst thing happens, how much does it take with it?

## The single-wallet problem

Most people have one wallet. It holds their savings, and it is also the wallet they connect to every new site, mint with, test with, and click around in. That arrangement means every casual click is played for the full balance. One bad signature and the savings go with the experiment.

Nothing about that is unlucky. It is structural. The same wallet is being used for two jobs with completely different risk profiles.

## Splitting the jobs

The fix is unglamorous and enormously effective: separate wallets for separate risk levels.

A vault. Long-term holdings. Ideally a hardware wallet. It connects to almost nothing, signs almost nothing, and never touches a site you found in a message. Weeks pass without it being opened.

A daily wallet. Ordinary amounts you are willing to move around. Connects to well-known applications you have used before. Losing it would hurt and would not ruin you.

A burner. Small, expendable, and the only one that ever touches something new, unfamiliar, or offered to you. It holds an amount you could genuinely lose without changing your month.

## What this actually buys

It converts catastrophes into incidents. The person who signs a malicious approval from a burner loses forty dollars and a lesson. The person who signs the identical transaction from a single combined wallet loses everything. The click was the same. The layout was not.

## Why people resist it

It is mildly inconvenient. Three wallets means moving money between them and remembering which is which. That inconvenience is the entire product — friction in the right place. The wallet you have to deliberately go and get is a wallet you cannot spend impulsively or connect carelessly.

You will build this layout properly in module four. For now, just hold the idea: you are not trying to be perfect. You are trying to make being imperfect survivable.`,
          activity: {
            title: "Sketch your three tiers",
            prompt:
              "Using your custody map from the last lesson, sketch what a vault / daily / burner split would look like for you specifically. Write down: what amount belongs in the vault, what a sensible daily balance is for how you actually use crypto, and what number is genuinely expendable for a burner. Be honest about the last one — if losing it would ruin your week, it is not a burner amount. You are not setting anything up yet; you are deciding the shape.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on the foundations before we go near keys. These four ideas — attacks are social, every scam needs a mood, custody determines the defence, and blast radius beats perfection — carry the whole course. If any answer here surprises you, reread before continuing, because module two is the one with no undo.`,
          quiz: {
            title: "How losses actually happen",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "How is crypto most commonly stolen from ordinary holders?",
                explanation:
                  "By persuading the holder to act — clicking, signing, downloading, or disclosing. The underlying cryptography has never been broken. This is why the defence is behavioural rather than mathematical.",
                options: [
                  {
                    text: "By persuading the holder to click, sign, download or disclose something",
                    correct: true,
                  },
                  { text: "By breaking the encryption on the wallet", correct: false },
                  { text: "By guessing private keys with fast computers", correct: false },
                  { text: "By intercepting transactions in transit", correct: false },
                ],
              },
              {
                prompt:
                  "You get a message saying your wallet is at risk and you must move funds to a safe address immediately. Which mood is being manufactured?",
                explanation:
                  "Fear, reinforced by urgency. Fear is the most effective lever because it makes speed feel like safety — the victim believes hurrying is the responsible thing to do. No legitimate party asks you to move funds to an address they supply.",
                options: [
                  { text: "Fear, reinforced by urgency", correct: true },
                  { text: "Greed", correct: false },
                  { text: "Curiosity", correct: false },
                  { text: "None — it is a routine security notice", correct: false },
                ],
              },
              {
                prompt: "What does a hardware wallet protect you against?",
                explanation:
                  "It keeps the private key off your internet-connected computer, so malware cannot read it. It does not stop you approving a malicious transaction — you still press the button. That is why signing discipline is a separate skill from key storage.",
                options: [
                  {
                    text: "Your key being read off an infected computer — but not you approving a bad transaction",
                    correct: true,
                  },
                  { text: "Every possible loss, including scams", correct: false },
                  { text: "Sending funds to the wrong address", correct: false },
                  { text: "An exchange freezing your account", correct: false },
                ],
              },
              {
                prompt: "What is the point of a vault / daily / burner wallet split?",
                explanation:
                  "It limits blast radius. The same mistake costs a burner balance instead of everything. It assumes you will eventually err, and makes the error survivable rather than trying to guarantee it never happens.",
                options: [
                  {
                    text: "To make an inevitable mistake cost a small amount rather than everything",
                    correct: true,
                  },
                  { text: "To hide your holdings from being traced", correct: false },
                  { text: "To reduce transaction fees", correct: false },
                  { text: "To qualify for more airdrops", correct: false },
                ],
              },
              {
                prompt: "Who legitimately needs your recovery phrase?",
                explanation:
                  "Nobody. There is no upgrade, migration, validation, rescue or support process that requires it. Every request is theft in progress, regardless of how official the requester appears. This rule has no exceptions and no edge cases.",
                options: [
                  { text: "Nobody, ever, under any circumstances", correct: true },
                  { text: "Wallet support staff, when recovering an account", correct: false },
                  { text: "An exchange, when verifying ownership", correct: false },
                  { text: "A wallet developer, during a migration", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Keys, phrases and the one rule",
      description:
        "The part with no undo. What the secret actually is, how backups fail, and the discipline that has no exceptions.",
      lessons: [
        {
          title: "What a private key actually is",
          type: "TEXT",
          points: 10,
          body: `A wallet does not contain coins. Nothing is stored in it. A wallet is a keyring, and the blockchain is a public ledger that records which key is allowed to move what.

## The mechanism, briefly

A private key is an enormous random number. From it, mathematics derives a public address — one direction only. Anyone can see the address and everything it holds. Nobody can work backwards from the address to the key, and the gap between those two facts is the entire security model of every blockchain.

When you send funds, your wallet uses the private key to produce a signature: a proof that the holder of the key authorised this exact transaction. The network verifies the signature against the address. The key itself never travels.

## Why the number is unguessable

The keyspace is not merely large, it is a size that does not map onto human intuition. Every computer on earth guessing continuously since the beginning of the universe would not make a dent. This is why nobody attacks the key directly, and why every real attack goes after where the key is kept, or after your willingness to sign with it.

## The consequence people miss

Possession is ownership. Not registration, not identity, not intent — possession. The chain has no idea who you are. Whoever holds the key is, as far as the network is concerned, the owner.

That has two edges. Nobody can take it from you by decree. And if someone copies your key, they do not steal it — they join you. There is no lock to change, no card to cancel. From the network's point of view there are simply now two legitimate owners, and only one of them is in a hurry.

## Why this changes your behaviour

Once you understand that the key is the asset, a lot of advice stops being arbitrary. Do not photograph it: photographs sync to clouds. Do not type it into anything except the wallet itself. Do not paste it: clipboards are read by other software. Do not store it in notes, email, or a password manager you also use on a shared machine.

None of that is superstition. Each one closes a specific route by which a copy of the number reaches somebody else — and a copy is all it takes.`,
          activity: {
            title: "Explain it to someone who does not care",
            prompt:
              "Write a short explanation — five or six sentences — of what a private key is, aimed at a family member with no interest in crypto. You must get across three things: nothing is stored in the wallet, whoever has the key owns the funds, and a copy is as good as the original. Do not use the word cryptography. If you cannot explain it plainly, you do not yet have it, and this is the lesson to fix that on.",
          },
        },
        {
          title: "Recovery phrases: twelve words that are everything",
          type: "TEXT",
          points: 10,
          body: `Almost nobody handles raw private keys any more. Instead, wallets give you a recovery phrase: twelve or twenty-four ordinary English words in a specific order. It is friendlier to read and write down, and that is its only purpose.

## What it really is

Those words are a compact encoding of a master secret, from which your wallet derives every key and every address it will ever have. That is why one phrase restores a whole wallet with all its accounts, on any compatible software, on any device, anywhere in the world, forever.

Read that sentence again with an attacker's eyes. Anyone, on any device, anywhere, forever. There is no session to end, no device to deauthorise, no password to change. The phrase is not a password to your wallet. The phrase is the wallet.

## Why the words look ordinary

They come from a fixed public list of 2048 words. The list is not secret and does not need to be — the security is in which words, in which order. But it does mean any twelve-word sequence from that list is recognisable as a recovery phrase on sight, which is exactly how automated thieves scan cloud storage, screenshots and pasted text for them.

## The failure modes, in order of how often they happen

Photographed, and the photo syncs to a cloud account that is later breached or simply signed into by someone else.

Typed into a website that offered to validate, restore, migrate or unlock the wallet. This site is always a thief. There is no legitimate version of it.

Stored in a notes app, email draft, or messaging thread to self. All of these are searchable by anyone who gets into the account, and all of them sync.

Given to a support agent, usually a very patient and helpful one, in a direct message the victim did not initiate.

Lost. Not stolen — lost. Written on paper that was thrown away, in a house that flooded, or simply somewhere the person no longer remembers. This is far more common than theft, and it is the reason a backup has to be durable as well as secret.

## The rule, stated plainly

You write the phrase down once, on something physical, and you never type it anywhere except into a wallet you are deliberately restoring on a device you control. Nobody sees it. Nobody is told it. No exceptions, no edge cases, no emergencies.

This academy will never ask you for it. If a message claiming to be from Maby Academy ever does, it is not from us, and the correct response is to report it and delete it.`,
          activity: {
            title: "Audit where your secret has been",
            prompt:
              "Without writing the phrase itself anywhere — not in this exercise, not in a file, nowhere — think back through every place your recovery phrase may have existed. A photo, a screenshot, a notes app, a cloud drive, a chat, a password manager, an email, a typed field on a website. List the ones that apply, honestly. If any of them are true, write down the words: this wallet needs replacing. A phrase that has ever touched a synced device should be treated as compromised even if nothing has happened yet — and the next lesson covers how to move.",
          },
        },
        {
          title: "Backups that survive real life",
          type: "TEXT",
          points: 10,
          body: `A backup has to solve two opposite problems at once. It must be findable by you in five years, and unfindable by anyone else ever. Most people optimise one and quietly fail the other.

## Two ways to lose

Secrecy failure: someone else finds it. Durability failure: nobody finds it, including you. Both end with the same balance. It is worth noticing that people who worry a great deal about the first often die of the second — a phrase so cleverly hidden that it is effectively destroyed.

## What durable looks like

Physical, not digital. Paper works. Metal works better, because the realistic threats to paper are fire, water, and being thrown out by someone tidying up.

Written by hand, legibly, with the word order numbered. A backup you cannot read is not a backup. Write the numbers.

More than one copy, in more than one building. A single copy at home fails to a single house fire. Two copies in two places survives almost everything a normal life throws at you.

Not labelled. A sealed envelope marked "crypto wallet" is an instruction to whoever finds it.

## What secret looks like

Nowhere that syncs. If a device sees it, a cloud eventually sees it.

Not in a shared space. A drawer in a shared flat is not a safe.

Not split cleverly, unless you genuinely know what you are doing. People love the idea of writing six words in one place and six in another. The maths does not work the way they think — a partial phrase dramatically weakens the remainder — and far more people have lost funds to a clever split they later could not reassemble than have been saved by one.

## The test almost nobody runs

A backup you have never restored from is a hypothesis, not a backup. The honest test is: could you, today, with only what is in your backup location and no access to your current phone, restore this wallet? If the answer involves "I think" or "probably", it is not done.

Restoring a wallet onto a spare device using only the backup, then wiping that device, is the single most valuable hour in this entire course. It is also the one most people skip, because it feels like admin rather than security. It is security. Everything else in this module is theory until you have proven the backup works.`,
          activity: {
            title: "Design your backup, then find the hole",
            prompt:
              "Write your backup plan in specific terms: what medium, written how, stored where, how many copies, and in which separate physical locations. Then attack it. Write down what happens to your plan in each of these: a house fire, a burglary, a flood, a family member tidying, and you forgetting where you put it in four years. If any of those five destroys or exposes your funds, the plan is not finished — revise it in writing until all five are survivable.",
          },
        },
        {
          title: "Signing: the second way to lose everything",
          type: "TEXT",
          points: 10,
          body: `You can keep your recovery phrase perfectly and still be emptied, because there is a second route: you authorise it yourself. This is the mechanism that catches experienced people, and it is the reason a hardware wallet alone is not a complete answer.

## What a signature can mean

Most people assume signing means "send this amount to this person". It can mean far more. A signature can grant a smart contract permission to move a token on your behalf — not once, but standing, for an unlimited amount, indefinitely. It can authorise a transfer of everything of a given type. It can authorise a contract that itself does something else entirely.

The wallet popup for a devastating permission and a harmless one look almost identical to someone who is not reading carefully. That similarity is not accidental; it is the product being exploited.

## Blind signing

Some requests cannot be rendered in plain language by the wallet, and you are shown a block of data instead. Approving one of those is called blind signing, and it is exactly what it sounds like: you are agreeing to something you have not read.

There are legitimate uses. There is also an entire category of theft that depends on you doing it. The workable rule for a beginner is simple — if you cannot tell what a request does, do not approve it. Nothing legitimate requires you to sign something incomprehensible in a hurry.

## Off-chain signatures

Some requests do not cost gas and do not appear on chain at all. They feel free, and therefore safe. They are not — an off-chain signature can be a standing authorisation that a thief then submits themselves, later, at a moment of their choosing. A free-looking popup is not a harmless popup.

## The habit to build now

Three questions, every time, before you approve anything:

What is this contract, and did I arrive here by typing the address myself rather than following a link?

What permission is being granted, and is it limited to the amount I intend?

Am I in a hurry, and if so, who made me hurry?

Slow signing is unglamorous and it is the single highest-return habit in self-custody. The people who get drained are almost never the people who read the popup.`,
          activity: {
            title: "Read one popup properly",
            prompt:
              "The next time you connect a wallet to anything, stop at the approval screen before pressing confirm and actually read it. Write down what you see: which contract, which permission, what amount, and whether the amount is limited or unlimited. If your wallet shows an unlimited allowance, note that. Then write your own three-question checklist in your own words — the version you will actually run in your head at speed, not a copy of mine.",
          },
        },
        {
          title: "Assignment: your key and backup plan",
          type: "ASSIGNMENT",
          points: 25,
          body: `The first graded work in the course. It is deliberately about the boring half of security, because the boring half is where the permanent losses happen.

Write a plan an instructor could read and tell you whether it survives contact with reality. Do not include any secret material — no phrase, no key, no partial phrase, no photograph, no hint. A submission containing any of those will be rejected rather than graded, and the wallet should be considered compromised.`,
          assignment: {
            title: "Key custody and recovery plan",
            instructions: `Write a plan covering the four sections below. Aim for 500 to 800 words. Be specific — "keep it safe" is not a plan, and the grader is checking whether a stranger could follow your plan and get the same outcome you intend.

**1. Inventory.** Every place you hold value, the rough proportion of your total in each, and who other than you can technically move it. You may use bands rather than exact figures.

**2. Backup design.** For your main self-custodied wallet: what medium, written how, how many copies, stored in which distinct physical locations, and how each copy is protected from being read by whoever finds it.

**3. Failure walkthrough.** Take your plan through five scenarios and state the outcome of each: house fire, burglary, flood, a well-meaning family member clearing out a drawer, and you personally forgetting the location in four years. For each, say whether you keep your funds and whether anyone else gains them.

**4. Verification.** State how you will prove the backup works, and by when. If you have already restored from it, describe what you did. If you have not, write the date by which you will, and what device you will use.

**Do not submit any secret material.** No phrase, no key, no fragment, no photograph of either, no clue that narrows a guess. The plan describes the system, never the secret. Nobody at this academy — instructor, mentor or admin — will ever ask you for that material, in this assignment or anywhere else.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Inventory is complete and honest",
                weight: 20,
                descriptor:
                  "Every holding location is listed with a realistic proportion and a correct answer to who else can move it. Full marks require noticing where the largest amount actually sits, rather than where the writer wishes it sat.",
              },
              {
                criterion: "Backup design is durable and secret",
                weight: 30,
                descriptor:
                  "Physical medium, handwritten and numbered, at least two copies in genuinely separate locations, nothing that syncs to a cloud, and no label that advertises what it is. Full marks address both failure directions rather than only theft.",
              },
              {
                criterion: "Failure walkthrough is genuinely adversarial",
                weight: 30,
                descriptor:
                  "All five scenarios are worked through to a stated outcome, and any that break the plan lead to a revision within the submission. Full marks show the writer found at least one real hole in their own plan and closed it.",
              },
              {
                criterion: "Verification is committed to, not hoped for",
                weight: 20,
                descriptor:
                  "A specific method and a specific date, or an account of a restore already performed. Full marks describe how the writer will know the restore succeeded, not merely that they will attempt one.",
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "The drain mechanisms",
      description:
        "The technical half. A dozen mechanisms account for nearly every theft — learn to see them under the story.",
      lessons: [
        {
          title: "Approval drains: the delayed robbery",
          type: "TEXT",
          points: 10,
          body: `This is the mechanism behind an enormous share of losses, and the one people find most surprising afterwards, because the theft happens long after the mistake.

## How token permissions work

Tokens are not held by your wallet in the way coins are. They live in the token's own contract, which keeps a ledger of balances. For an application to move your tokens — a swap, a deposit, a marketplace sale — you must first grant it an allowance: permission to move up to some amount of that token from your address.

That allowance is a standing grant. It does not expire. It survives you closing the tab, disconnecting the wallet, uninstalling the app, and forgetting the whole thing ever happened.

## Where it goes wrong

Two things make this dangerous. First, applications routinely request an unlimited allowance rather than the amount you are actually using, because it saves the user a transaction later. Second, a malicious application requests exactly the same thing, and it looks identical.

So you grant an unlimited allowance to a contract you visited once. Weeks pass. Nothing happens. Then one day the tokens leave — because the contract always had permission, and the thief simply chose their moment. Many victims never connect the drain to the click, because the click was a month ago.

## Why disconnecting does nothing

The single most common misunderstanding in this whole subject: pressing "disconnect wallet" removes the site's ability to ask you for things. It does not remove permissions you already granted. Those live on chain, in the token contract, and only an explicit revoke transaction removes them.

Disconnecting is closing the door of a house where you already gave someone a key.

## The defence

Grant limited allowances where the wallet lets you. Some do; use it.

Audit your allowances periodically using a revoke tool, and remove everything you are not actively using. This costs a little gas and takes ten minutes.

Keep the vault out of it. A wallet that never grants allowances cannot be drained by one. This is precisely why the split from module one matters.

You will do a real audit in module four. For now, know the shape: the click and the theft are separated in time, which is why this one catches careful people.`,
          activity: {
            title: "Find your oldest connection",
            prompt:
              "Think back over every application you have ever connected a wallet to — swaps, marketplaces, games, mints, anything, including ones you tried once and abandoned. Write the list, or as much of it as you can remember. Then mark the ones you have not used in the last three months. Every one of those is a standing permission you are still carrying, from a contract you no longer think about. Write down how many there are. That number is your current exposure.",
          },
        },
        {
          title: "Lookalikes: sites, apps and addresses",
          type: "TEXT",
          points: 10,
          body: `The cheapest attack in existence is to build something that looks like the real thing and wait for people to arrive. It requires no exploit at all — only that you find it first.

## Domain lookalikes

A character swapped for a similar one. A different ending on the same name. A hyphen inserted. A subdomain arranged so the real name appears in the middle of a domain that is not it. Read left of the first single slash, and read the ending — that is where the truth is, and it is where the eye does not go.

## Search and advertising

Paid results sit above real ones and look the same. For a long stretch, searching for a major wallet by name returned a malicious advert first. Never reach a wallet or exchange through a search result. Use a bookmark you made yourself, on a day when nothing was urgent, from an address you typed.

## Fake applications

Malicious wallet apps appear in app stores, sometimes with reviews and download counts. They function normally until the moment they have your phrase. On desktop, an installer downloaded from anywhere other than the project's own site should be assumed hostile.

## Address poisoning

A subtle one worth knowing. Attackers generate an address whose first and last characters match one you have recently sent to, then send you a tiny worthless transaction from it. It now sits in your history, looking familiar. Later, you copy an address from your own history — and you copy theirs.

The defence: never copy an address from transaction history. Copy from the source each time, and check the middle of the address, not just the ends. Better still, send a small test amount first for any transfer large enough to hurt.

## The common thread

Every one of these attacks depends on you arriving by a route you did not choose. Link in a message, advert in a search, address in a history. The habit that defeats all of them at once is arriving deliberately: bookmarks you made, addresses you fetched from the source, apps from the project's own site.

Where you came from matters more than what the page looks like. The page will always look right. That is the whole point of it.`,
          activity: {
            title: "Build your bookmark bar",
            prompt:
              "Right now, while nothing is urgent, do this properly. For every crypto service you use — wallet, exchange, explorer, any application — navigate to it by the most reliable route you have, verify the address carefully character by character, and bookmark it. Then write down the list of what you bookmarked, and write one sentence committing to reaching those services only through those bookmarks from now on. This is a ten-minute exercise that removes an entire attack category permanently.",
          },
        },
        {
          title: "Fake support and the direct message",
          type: "TEXT",
          points: 10,
          body: `Post a question in any public crypto channel, and within minutes you will receive private messages from people offering to help. Every single one of them is a thief. This is not an exaggeration or a heuristic — it is close to an absolute.

## Why it works so reliably

The victim is already frustrated. Something is broken, money may be stuck, and a human being has appeared who seems to know what they are doing and is being kind about it. Gratitude is a disarming emotion. It is also the product being manufactured.

## The scripts

The validation script. You are asked to visit a site and "validate", "restore", "sync" or "unlock" your wallet by entering your phrase. The site is a form that posts your words to a server. There is no legitimate service on earth that does this.

The screen-share script. You are walked through a fix while sharing your screen. At some point you are asked to open your wallet's backup or settings. The recording captures it.

The migration script. Your wallet is old, deprecated, or affected by a vulnerability, and must be migrated. You are given a new address to move funds to.

The support-fee script. Your issue can be resolved, but a small fee or gas top-up must be sent first. Once paid, either the requests escalate or the person disappears.

## The structural tell

Direction of contact. Real support does not message you first, and it does not appear in your inbox because you posted publicly. If they contacted you, it is an attack. That single rule catches nearly all of these without any need to evaluate what is being said.

## What real support never does

Ask for a recovery phrase or private key, in any form or fragment. Ask you to share your screen while your wallet is open. Ask you to move funds to an address they provide. Ask for payment to resolve a support issue. Contact you first about a problem you did not report.

If any of those five happen, the conversation is over. There is nothing to establish and nobody to be polite to. Block and report.

## Including us

Maby Academy has one support route, and it is inside the site. Nobody from this academy will message you privately about your wallet, ask for a phrase, or request a payment. If someone claims to, they are impersonating us — report it, and do not engage.`,
          activity: {
            title: "Write your refusal script",
            prompt:
              "The hard part of this attack is social, not technical: it feels rude to shut down someone being helpful. So write your exit line now, before you need it — one or two sentences you will send and then block, without negotiating. Something you can send without thinking. Write it down. Then write the five things real support never does, from memory, without looking back at the lesson.",
          },
        },
        {
          title: "Too good to be true: giveaways, presales and doublers",
          type: "TEXT",
          points: 10,
          body: `This family of scams runs on greed rather than fear, and it is the oldest one in the book — it predates crypto by about a century. The branding changes constantly; the machinery has not changed at all.

## The doubler

Send funds to this address and receive double back. Usually attached to a hijacked or impersonated account belonging to somebody famous, sometimes with a livestream. It is a straightforward theft, and it works because the sums are small enough to feel like a cheap bet.

Nobody gives away money at scale to strangers. The one-line test: why would this person, with money, prefer to give it to me rather than keep it?

## The fake airdrop

You are told you qualify for a distribution and must claim it. Claiming requires connecting your wallet and signing — and the signature grants an allowance rather than claiming anything. Attackers also send worthless tokens into wallets whose only function is to lure you to a claim site.

Real distributions do not require you to sign an unusual permission, and they do not arrive by direct message.

## The presale and the guaranteed return

Early access to something enormous, at a price only you are being offered, closing soon. Or a managed programme with a fixed weekly return. Fixed returns do not exist in a volatile market — anyone promising one is either lying about the risk or paying old investors with new deposits, which ends the same way every time.

## The recovery scam

The cruellest one. After a loss, someone appears offering to recover the funds for a fee. They have your details because victim lists circulate and are resold. Nobody can reverse a blockchain transaction. Not a hacker, not a firm, not a service. A person promising recovery is stealing from someone who has already been stolen from.

## The single test

If the offer is real, waiting a day costs you a slightly worse entry. If it is a scam, waiting a day costs you nothing and saves everything. Since the downside of waiting is tiny and the upside is total, wait. Every time.

An opportunity that cannot survive twenty-four hours of scrutiny was never an opportunity. It was a deadline someone else set for you, and deadlines set by other people on your money are the most reliable warning sign in this entire field.`,
          activity: {
            title: "Autopsy something you have seen",
            prompt:
              "Find a real example — in your messages, a social feed, a group you are in, or your memory. Write down what it offered, what it needed you to do, and which of the four moods it was built on. Then answer the one-line test in writing: why would this person, with money, prefer to give it to me than keep it? Seeing your own answer written down does something that reading about it does not.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on the mechanisms. These are the ones you should be able to name on sight, under pressure, without deliberating — because the situations where you meet them are precisely the situations designed to stop you thinking clearly.`,
          quiz: {
            title: "Mechanisms of theft",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt:
                  "You granted an unlimited token allowance to an application, then pressed disconnect. What is your exposure?",
                explanation:
                  "Unchanged. Disconnecting removes the site's ability to prompt you; the allowance lives on chain in the token contract and persists until you send an explicit revoke transaction. This gap is why approval drains often occur weeks after the click.",
                options: [
                  {
                    text: "Unchanged — the allowance persists until explicitly revoked on chain",
                    correct: true,
                  },
                  { text: "Removed, because disconnecting ends the permission", correct: false },
                  { text: "Reduced to a single further transaction", correct: false },
                  { text: "Expired automatically after 30 days", correct: false },
                ],
              },
              {
                prompt:
                  "You are about to send a large amount and copy the address from your own transaction history. What is the risk?",
                explanation:
                  "Address poisoning. Attackers generate addresses matching the first and last characters of one you used, then send a dust transaction so it appears in your history. Always copy from the source and verify the middle of the address, and send a test amount first.",
                options: [
                  {
                    text: "Address poisoning — a lookalike address may have been planted in your history",
                    correct: true,
                  },
                  { text: "None, history addresses are verified by the wallet", correct: false },
                  { text: "The transaction will fail and cost gas", correct: false },
                  { text: "The recipient will see your full history", correct: false },
                ],
              },
              {
                prompt:
                  "You post a problem publicly and someone messages you privately offering to help. What is the correct read?",
                explanation:
                  "It is an attack. Direction of contact is the structural tell: legitimate support does not initiate private messages off the back of a public post. You do not need to evaluate what they say — the fact they messaged first settles it.",
                options: [
                  { text: "It is an attack, decided by the fact that they contacted you first", correct: true },
                  { text: "It depends on whether their account is verified", correct: false },
                  { text: "It is safe as long as you never share your phrase", correct: false },
                  { text: "It is probably a community volunteer", correct: false },
                ],
              },
              {
                prompt:
                  "Someone offers, for a fee, to recover funds you lost to a scam last month. What is true?",
                explanation:
                  "It is a second scam targeting a known victim. Blockchain transactions cannot be reversed by anybody — no firm, no hacker, no service. Victim lists circulate and are resold, which is how they found you.",
                options: [
                  {
                    text: "It is a second scam — no one can reverse a blockchain transaction",
                    correct: true,
                  },
                  { text: "It is worth trying if the fee is small", correct: false },
                  { text: "It works if they have law-enforcement contacts", correct: false },
                  { text: "It works only for large amounts", correct: false },
                ],
              },
              {
                prompt: "What is blind signing?",
                explanation:
                  "Approving a request your wallet cannot render in plain language, so you are shown raw data instead. There are legitimate uses, but if you cannot tell what a request does, the correct action is to decline — nothing legitimate requires you to approve something incomprehensible in a hurry.",
                options: [
                  {
                    text: "Approving a request whose effect your wallet cannot display in plain language",
                    correct: true,
                  },
                  { text: "Signing without a hardware wallet connected", correct: false },
                  { text: "Signing a transaction with no gas fee", correct: false },
                  { text: "Approving a transaction on a mobile device", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Wallet hygiene in practice",
      description:
        "Stop reading and start configuring. The layout, the audit, and the habits that survive a busy week.",
      lessons: [
        {
          title: "Building the three-wallet layout",
          type: "TEXT",
          points: 10,
          body: `Time to build the structure you sketched in module one. This lesson is procedural, and the point is that you finish it rather than admire it.

## The vault

A wallet whose keys have never touched an internet-connected device in a form that could be copied. In practice, a hardware wallet, set up while following the device's own screen rather than any website.

Rules for the vault: it receives, and it sends to addresses you control. It connects to nothing. It signs no approvals. It has no browser extension pointed at it. If you want to use funds in an application, you move them out to the daily wallet first and use them there.

Yes, this is inconvenient. The inconvenience is the security. A vault that is convenient to spend from is convenient to drain.

## The daily wallet

A software wallet holding an amount you use. It connects to established applications you have used before, reached through your own bookmarks. It is where ordinary activity happens.

Rules for the daily: known applications only, allowances audited monthly, and a balance that would hurt to lose but not ruin you. Anything above that threshold goes to the vault, and the moving is a deliberate habit rather than something you get around to.

## The burner

A separate wallet with a small, expendable balance. It is the only wallet that touches anything new — a mint you saw, an application someone recommended, a link from anywhere, an airdrop claim, anything at all that you have not used before.

Rules for the burner: never funded above the expendable amount, and rotated after anything sketchy. If a burner gets drained, you lost the burner amount and learned something at a fair price. That is a good outcome, not a failure.

## Keeping them separate in practice

Give them names in your wallet software that make the tier obvious at a glance — the mistake you are guarding against is signing from the wrong one while distracted, and a label catches that.

Use separate browser profiles if you can, so the vault's extension is not even present in the browser where you experiment. Physical separation beats intention every time.

## The honest failure mode

Most people build this and then quietly collapse it back into one wallet within a month, because moving funds is annoying. If you feel that happening, the fix is not more willpower — it is making the vault genuinely long-term, so you are not reaching for it weekly in the first place. If you need to touch your vault every week, it is not a vault; it is a daily wallet with extra steps.`,
          activity: {
            title: "Actually create the wallets",
            prompt:
              "Do the work, then report on it. Create or designate your three wallets, label them clearly by tier, and move funds so each holds roughly what your plan says it should. Write up: what you named each one, what proportion of your total is in each, and what specifically went wrong or felt awkward while doing it. That last part matters most — the awkwardness is what will collapse the system in a month, and naming it now is how you design around it.",
          },
        },
        {
          title: "Auditing and revoking approvals",
          type: "TEXT",
          points: 10,
          body: `Every standing allowance you carry is a small open door. This lesson closes them, and establishes the rhythm that keeps them closed.

## What you are looking for

An allowance record consists of a token, a spender contract, and an amount. What you are hunting is the combination of an unlimited amount and a contract you no longer use — the worst case being one you used once, a long time ago, and never thought about again.

## Doing the audit

Use a well-known revocation tool, reached through a bookmark you made yourself. This is a point where a lookalike site would be especially profitable for an attacker, since it captures people in the act of doing security work — so verify the address carefully, and be aware that the tool asks you to connect your wallet, which is exactly what a fake one would also do.

Connect the wallet being audited, and only that one. Do not connect the vault to check whether the vault has allowances; if you have followed the layout, it has none by construction.

Go through the list. For each entry, ask: do I use this, this month? If not, revoke. Revoking costs a small amount of gas per entry, and it is the cheapest insurance available anywhere in this field.

## Prioritise properly

If gas is expensive and the list is long, revoke in this order: unlimited allowances on your largest holdings first, then unlimited allowances on anything else, then limited allowances on contracts you do not recognise. A limited allowance on a small token is a small door; an unlimited one on your main holding is the whole wall.

## The rhythm

Monthly is a good default. Tie it to something you already do — the day you check your accounts, the first of the month, whatever already exists in your life. A security habit hanging on nothing gets done twice and then never.

Also audit immediately after any interaction with something new, and always after a burner touches anything unfamiliar.

## The thing to notice

Most people running their first audit find between five and thirty standing permissions they had entirely forgotten. That is the normal result, and it is worth sitting with: for however long you have been active, those doors have been open, and nothing prevented them from being used except that nobody chose to. Security is not what has not happened to you yet.`,
          activity: {
            title: "Run the audit and count the doors",
            prompt:
              "Run a real approval audit on your most-used wallet, using a bookmarked revocation tool. Write down: how many standing allowances you found, how many were unlimited, how many were for contracts you no longer use, and how many you revoked. Then write the date you will do the next audit, and what existing habit you have attached it to. If you found more than you expected, say so — that gap between expectation and reality is the lesson.",
          },
        },
        {
          title: "Hardware wallets: what they do and do not do",
          type: "TEXT",
          points: 10,
          body: `A hardware wallet is the strongest practical tool in personal crypto security, and it is routinely misunderstood in both directions — treated as a magic amulet by some and dismissed as unnecessary by others.

## What it does

It generates and stores the private key inside a chip, and never lets the key leave. When you transact, the unsigned transaction goes in, the signature comes out, and the key stays inside. Malware on your computer, however thorough, cannot read what never arrives.

It also requires physical confirmation. Nothing is signed without a human pressing a button on the device, which means remote software cannot silently authorise anything.

## What it does not do

It does not read the transaction for you. If you approve a malicious contract, the device signs it faithfully — that is its job. The button press is a consent mechanism, not a judgement.

It does not protect a phrase you have already exposed. If the recovery phrase was photographed or typed into a website, the device is irrelevant; the wallet can be restored elsewhere by whoever has the words.

It does not make a burner unnecessary. Blast radius still matters, and a hardware wallet connected to every new site is a well-protected key signing bad transactions.

## Buying one

Only from the manufacturer directly, or an authorised reseller listed on their own site. Never from a marketplace, never second-hand, never from anyone offering a good price.

Tampered devices are a real category of attack. The classic version arrives with a pre-printed recovery phrase and a card saying "your device is ready, here is your backup phrase". A genuine device never does this. You generate your own phrase, on the device, on first setup, and nobody on earth has seen it. If a phrase came in the box, the box is the attack.

## Setting it up correctly

Set it up yourself, following the device's screen, not a website you were sent to. Write the phrase from the device's display. Verify the phrase when it asks you to. Set a PIN. Then send a small test amount, and — the step most people skip — practise a restore before the balance is meaningful.

## The honest cost-benefit

A hardware wallet costs roughly what a nice dinner costs. If your holdings are meaningfully larger than that, the arithmetic is not close. If they are smaller, an exchange account with strong second-factor security is a reasonable place to be while you grow, and there is no shame in saying so.`,
          activity: {
            title: "Make the decision on paper",
            prompt:
              "Decide, in writing, whether a hardware wallet is right for you now. Write down: your rough total self-custodied holdings, the cost of a device, and the specific attacks it would and would not protect you from given how you actually use crypto. Then commit to one of two things — buying one direct from the manufacturer by a specific date, or a written reason why an exchange with strong second-factor security is the right place for you at this size, plus the amount at which you will revisit the decision.",
          },
        },
        {
          title: "The habits that survive a busy week",
          type: "TEXT",
          points: 10,
          body: `Everything so far is a system. Systems degrade. The question this lesson answers is which parts of your security will still be running in six months, when you are tired, busy, and something looks urgent.

## Why security decays

Not because people stop caring, but because the effort is constant and the reward is invisible. Nothing happening feels like nothing happening, not like a system working. Meanwhile the friction is felt every single time.

So the design goal is not maximum security. It is the strongest set of habits you will still be doing when you are not thinking about security at all.

## The four that are worth defending

Arrive deliberately. Bookmarks only, never a search result, never a link from a message. This one costs nothing after the first setup and removes an entire category of attack.

Pause on any of the four moods. Notice urgency, greed, authority or fear, and name it. Costs seconds, defeats the setup phase of nearly every scam.

Burner for anything new. Never connect the daily wallet or the vault to something you have not used before. Costs a transfer, caps the damage of the mistakes you will make.

Read the popup. Which contract, what permission, what amount. Costs ten seconds and stops the mechanism that empties experienced people.

If everything else in this course fell out of your head and those four remained, you would be safer than most people in this space.

## Two more that are worth the effort

Monthly approvals audit, tied to something you already do.

Quarterly ten-minute review: check the wallet layout has not quietly collapsed into one wallet, that the vault balance is still where it should be, and that your backups are where you think they are.

## What to drop

Anything you have not done in two months. An abandoned practice is not security; it is a false belief about your own protection, which is worse than knowing you are exposed. Be ruthless about cutting a habit you do not keep, and replace it with a weaker one you will.

The person who runs four simple habits reliably is genuinely safer than the person with an elaborate system they abandoned in March.`,
          activity: {
            title: "Cut your own list down",
            prompt:
              "Write down every security practice you have adopted from this course so far. Then be honest with yourself and mark each one: will I still be doing this in six months, yes or no? Cut every no. For each thing you cut, write either a weaker version you would genuinely keep, or an acknowledgement that you are accepting that risk deliberately. A short list you keep beats a long list you abandon, and pretending otherwise is how people end up unprotected while feeling protected.",
          },
        },
        {
          title: "Assignment: your wallet layout and audit",
          type: "ASSIGNMENT",
          points: 25,
          body: `The second graded piece, and the practical one. This is not a plan for the future — it asks what you have actually built and what the audit actually found. An instructor reads it to check that the structure would hold under a real mistake.`,
          assignment: {
            title: "Wallet layout and approvals audit",
            instructions: `Report on the system you have built. 500 to 800 words. Include no addresses that you would rather not share and no secret material of any kind.

**1. The layout as built.** Your three tiers, what proportion of your holdings sits in each, and what rule governs what each one is allowed to connect to. If you did not build all three, say which you did not and why — a defended decision scores better than a pretended one.

**2. The audit results.** How many standing allowances you found, how many were unlimited, how many belonged to contracts you no longer use, and how many you revoked. State which tool you used and how you verified you were on the real one.

**3. The blast radius test.** Take a specific realistic mistake — you connect to a malicious site and approve an unlimited allowance while distracted. Walk through what happens under your layout. State exactly what an attacker gets, what they do not, and how you would find out. Then state whether that outcome is acceptable to you, and what you would change if not.

**4. The habits you kept and cut.** Which practices you have committed to, which you deliberately cut as unrealistic, and what risk you are knowingly accepting by cutting them. Honesty scores higher than ambition here.

Do not include any recovery phrase, private key, or fragment of either. Nobody at this academy will ever ask for that material.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Layout is built and the rules are specific",
                weight: 30,
                descriptor:
                  "Three tiers exist with stated proportions and explicit connection rules. Full marks require a vault that genuinely connects to nothing and a burner funded at a truly expendable amount, or a well-argued deviation.",
              },
              {
                criterion: "Audit was actually performed",
                weight: 25,
                descriptor:
                  "Real numbers, not intentions: allowances found, unlimited ones, stale ones, revocations made, and a stated method for verifying the revocation tool was genuine.",
              },
              {
                criterion: "Blast radius test is honest",
                weight: 30,
                descriptor:
                  "The mistake is traced to a concrete outcome — what is lost, what survives, how it is detected. Full marks state whether the outcome is acceptable and make a change if it is not, rather than concluding that everything is fine.",
              },
              {
                criterion: "Habits are realistic rather than aspirational",
                weight: 15,
                descriptor:
                  "A short list the writer will plausibly keep, with cut practices named and the accepted risk stated plainly. An unfeasibly long list scores lower than a defended short one.",
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "The human attack surface",
      description:
        "Social engineering, at length. Romance, jobs, groups and impersonation — the attacks that take weeks and work best on careful people.",
      lessons: [
        {
          title: "The long con: relationship-based theft",
          type: "TEXT",
          points: 10,
          body: `The most expensive scams in this space are not clicks. They are relationships, built patiently over weeks or months, that end in a transfer the victim makes voluntarily and gratefully.

## The shape

Contact begins somewhere ordinary and unrelated — a dating app, a professional network, a wrong-number message that turns into conversation, a shared interest group. Crypto is not mentioned for a long time. What is being built first is trust, and the investment of time is exactly what makes it work.

Eventually, wealth appears incidentally. A screenshot, a mention of a good month, a relative who works in trading. The victim asks. That is the design: the target must ask, because a person who asked believes it was their own idea.

Then a platform is introduced. It looks professional, it has an app, and it shows real-time balances. A small deposit is made and shows a gain. A small withdrawal is permitted and arrives. Trust is now anchored in evidence.

Then the deposits grow. And when the victim tries to withdraw a meaningful amount, there is a tax, a fee, an account level, a verification. Each obstacle demands more money. The platform's numbers were always a display; the money left at the first deposit.

## Why intelligence does not protect you

This attack does not target gullibility. It targets loneliness, ambition, and the ordinary human tendency to trust someone who has been consistently kind for two months. The victims are frequently well-educated professionals, and the loss is often life-altering because the trust was earned slowly enough to justify large amounts.

## The structural tells

Someone you have never met in person introduces you to a financial opportunity. That combination — not met, plus money — is the core signal, whatever the story around it.

The platform is not one you found yourself. Search it independently; look for it existing before this year.

Withdrawals become difficult exactly when the amount becomes significant. This is the moment of truth and it is always the same.

They cannot meet, always with a good reason. There is always a good reason.

## The one habit

Never take financial advice or platform recommendations from someone you have not met in person, however long you have known them online and however kind they have been. Not smaller advice, not a small first deposit, not just to see. The kindness is the tool.`,
          activity: {
            title: "Write the warning for someone you love",
            prompt:
              "This attack takes people who are lonely, ambitious, or simply going through a hard stretch. Write a short message — the kind you would actually send — to a specific person in your life who could be a target. Describe the shape without being condescending: how it starts, how the platform appears, and the withdrawal moment. Then decide whether to actually send it. The point of the exercise is that explaining it to someone else is what fixes it in you.",
          },
        },
        {
          title: "Job offers, tasks and the fake employer",
          type: "TEXT",
          points: 10,
          body: `Targeting people who need work is efficient, because need suppresses scepticism. Several distinct attacks share this ground, and they are worth separating.

## The task scam

You are hired for simple remote work — rating products, completing app tasks, boosting listings. Early payments are real and prompt. Then the tasks require you to deposit funds first, to be reimbursed with commission. The deposits grow, the reimbursements stall, and eventually your account shows a negative balance you must clear to be paid at all.

The tell is structural: no legitimate job requires the worker to send money to the employer. None. If money flows from you to them, it is not employment.

## The interview with an attachment

A recruiter approaches with a strong offer. There is a coding task, a technical assessment, or a document to review. Running it installs malware that searches for wallet files and phrases.

This one has taken very technically sophisticated people, because the victim is in professional mode, not security mode, and opening files is what the situation appears to call for. Run anything from a recruiter in a disposable environment, or not at all.

## The advance-fee employer

You are hired, and there is a small upfront cost: equipment, certification, a training platform, a background check. It is always small and always in crypto. Real employers pay for these things and pay you first.

## The money-mule role

The most dangerous, because it does not feel like a scam at all. You are hired to process payments, receive funds and forward them, or manage accounts. The pay is good and the work is easy. You are laundering money, and the legal exposure is yours — you are the identifiable person in the chain, which is precisely why you were recruited.

If a job involves receiving money into your own account and sending it onward, refuse it regardless of the explanation. There is no innocent version of that role.

## The general rule

Money should only ever flow from employer to worker. The moment the direction reverses, at any size, for any stated reason, it is not a job. Being desperate for work does not change this, and attackers select for people who are.`,
          activity: {
            title: "Write your three job rules",
            prompt:
              "Write down the three rules you will apply to any remote or crypto-related work offer, in your own words. Then think of someone you know who is looking for work right now — write down whether they would recognise the task scam or the mule role if it arrived tomorrow, and what one sentence you would tell them. Attacks on employment target need, and need is the one condition nobody chooses.",
          },
        },
        {
          title: "Groups, calls and manufactured consensus",
          type: "TEXT",
          points: 10,
          body: `A large part of crypto happens in group chats, and groups are exceptionally easy to fake. What looks like the enthusiasm of hundreds of independent people is often one operator with a lot of accounts.

## How consensus is manufactured

A room is filled with accounts that are not people. They ask questions, receive answers, post gains, and thank the leader. Some are automated, some are cheap human labour, and a few are real people who were added early to make the numbers look organic.

Your brain reads a room of confident agreement as evidence. It is not evidence — it is a set, built at low cost, and it is the most effective part of the whole operation.

## Common patterns

The signals group. Free calls, some of which win. Then a paid tier, then a managed account, then a request to deposit with a specific platform. The free calls exist to establish a track record, and losses are quietly deleted.

The pump. A coordinated push into a small token, where the people organising it are already positioned and are selling into the enthusiasm they created. Everyone in the room is told they are early. Most are the exit.

The support impersonation in group. A "mod" or "admin" watching for confused newcomers, who then messages them privately. Real moderators do not do this.

The airdrop announcement. A pinned message with a claim link, posted from a compromised or spoofed admin account. This is why a link in a group is not safer than a link in a message.

## Evaluating a group honestly

Look for people disagreeing. A real community has arguments, complaints, people reporting losses and people pointing out problems. A room where everyone is happy and nobody dissents has had dissent removed, and removal is the signal.

Look at who profits from your action. If the group's advice consistently routes to one platform, one token, or one paid tier, that is the business model, not the community.

Check whether anyone is accountable. Anonymous leadership with no track record and no history is fine for discussion and is not fine for taking money.

## What a good room looks like

People teaching without a funnel. Arguments in public. Warnings about scams, including ones that would embarrass the community. Nobody promising outcomes. Those rooms exist and they are worth finding — and none of them will ever ask you to deposit anywhere.`,
          activity: {
            title: "Audit a group you are in",
            prompt:
              "Pick a crypto group or channel you are actually in. Scroll back a few weeks and answer in writing: does anyone disagree with the leadership, and what happens when they do? Does the advice route consistently to one platform, token or paid product? Is anyone accountable by name and history? Then rate it — teaching room, funnel, or unclear — and write what you will do about it, including leaving if that is the answer.",
          },
        },
        {
          title: "Impersonation and the borrowed badge",
          type: "TEXT",
          points: 10,
          body: `Almost every scam wears someone else's face. Understanding why impersonation is cheap and effective is what makes you stop evaluating appearances.

## What can be copied

A name and a photograph, trivially. A verified badge, since verification is now purchasable on several platforms. A website, pixel for pixel, in an afternoon. A voice, from a few seconds of recorded audio. A video call, well enough to fool someone briefly. A message from a genuine account, if that account has been compromised.

There is no visual signal left that cannot be faked. This is the important conclusion, and most people have not updated on it.

## Which means you cannot verify by looking

The only reliable verification is out-of-band: confirming through a separate channel you already trust, that the other party does not control.

Your instructor appears to message you about a payment — you do not reply there, you contact them through the academy. A relative calls in distress asking for funds — you hang up and call the number you already have. A colleague's account asks for something unusual — you ring them.

The rule generalises: never verify a request through the channel that made it. That is the one channel an attacker definitely controls.

## The family emergency

Worth naming specifically, because voice cloning has made it much stronger. A call, a familiar voice, distress, urgency, and a request for money in a form that cannot be reversed. The defence is a family code word agreed in advance, in person, and a standing rule that money requests get called back on a known number.

Set the code word this week. It takes one conversation and it defeats the entire attack.

## Our own commitment

So you have something concrete to verify against: Maby Academy communicates through the site and through the email address on our contact page. We do not message members privately about payments, wallets, or account problems. We will never ask for a recovery phrase, a private key, or a payment to resolve a support issue. Anyone doing those things is impersonating us — report it through the site, and we would rather see ten false reports than miss one real impersonation.`,
          activity: {
            title: "Set up out-of-band verification",
            prompt:
              "Do two concrete things and write them up. First, agree a code word with your family or closest people — a word that must be given on any urgent request for money, agreed in person or on a call you initiated. Second, write down your verification route for each important relationship: for your bank, your exchange, this academy, and your two closest contacts, what is the channel you would use to check a suspicious message, and do you have those details saved already? Fill in any gaps now.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on the social attacks. These are the ones that take the largest amounts, because they are the ones that build genuine trust first. Notice that every correct answer here is structural — about the shape of the situation, not about how convincing it seemed.`,
          quiz: {
            title: "Social engineering",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt:
                  "Someone you have spoken with warmly online for three months introduces you to a trading platform. Small deposits and a small withdrawal have both worked. What is the read?",
                explanation:
                  "The successful small withdrawal is part of the design — it converts trust into evidence and precedes the large deposits. The structural signal is that a person you have never met in person introduced you to a financial platform. That combination decides it, regardless of how the relationship feels.",
                options: [
                  {
                    text: "It is the standard long con — the working withdrawal exists to justify larger deposits",
                    correct: true,
                  },
                  { text: "It is legitimate, since withdrawals demonstrably work", correct: false },
                  { text: "It is safe if you only deposit small amounts", correct: false },
                  { text: "It depends on whether the platform has an app", correct: false },
                ],
              },
              {
                prompt:
                  "A remote job pays well and asks you to receive payments into your own account and forward them onward. What is happening?",
                explanation:
                  "You are being recruited as a money mule. The legal exposure falls on you, because you are the identifiable person in the chain — which is exactly why the role exists. There is no innocent version of this arrangement.",
                options: [
                  { text: "You are being recruited to launder money, and the legal risk is yours", correct: true },
                  { text: "It is legitimate payment processing work", correct: false },
                  { text: "It is safe provided the amounts are small", correct: false },
                  { text: "It is fine if the employer has a registered company", correct: false },
                ],
              },
              {
                prompt: "What is the most reliable sign that a group chat is a funnel rather than a community?",
                explanation:
                  "The absence of disagreement. Real communities argue, complain and report losses. A room where everyone is happy has had dissent removed — and the removal is the signal. Member count, activity level and confident tone are all cheap to manufacture.",
                options: [
                  { text: "Nobody ever disagrees, and advice routes consistently to one platform", correct: true },
                  { text: "It has a very large number of members", correct: false },
                  { text: "The admins post frequently", correct: false },
                  { text: "It requires an invite to join", correct: false },
                ],
              },
              {
                prompt:
                  "You receive a call in a familiar voice, urgently asking for money. How do you verify it?",
                explanation:
                  "Out of band — hang up and call back on a number you already had, or use a pre-agreed code word. Voices can be cloned from seconds of audio, so the call itself proves nothing. Never verify a request through the channel that made it, since that is the channel the attacker controls.",
                options: [
                  {
                    text: "Hang up and call back on a number you already had, or use a pre-agreed code word",
                    correct: true,
                  },
                  { text: "Ask a question only they would know, on the same call", correct: false },
                  { text: "Ask them to send a photo", correct: false },
                  { text: "Send a small amount first to test", correct: false },
                ],
              },
              {
                prompt: "Which of these can be faked convincingly today?",
                explanation:
                  "All of them. Names, photographs, purchased verification badges, pixel-perfect websites, cloned voices and brief video calls are all achievable. This is why verification has to be out-of-band rather than visual — there is no appearance left that constitutes evidence.",
                options: [
                  { text: "All of them — name, badge, website, voice and video call", correct: true },
                  { text: "Only the website", correct: false },
                  { text: "Everything except a verified badge", correct: false },
                  { text: "Everything except a voice", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "The perimeter around the wallet",
      description:
        "Your wallet is only as safe as the email, phone and devices standing around it. Most compromises come in through the perimeter.",
      lessons: [
        {
          title: "Email is the master key",
          type: "TEXT",
          points: 10,
          body: `Think about what your email account can do. It can reset the password on almost every other account you own, because that is what password reset is: proof of email control. Whoever holds your email holds everything downstream of it.

## Why it is attacked first

Compromising an email is usually easier than compromising an exchange directly, and it yields more. From inside an email account, an attacker resets exchange logins, reads recovery information, sees which services you use, and — crucially — deletes the warning messages that would have alerted you.

## Hardening it

A unique password, used nowhere else. Reused passwords are the reason a breach at a forum you forgot about turns into a loss at your exchange: attackers take leaked pairs and try them everywhere, automatically, at scale.

Strong second-factor authentication, which we cover properly in the next lesson.

Check the recovery options, which almost nobody does. An old phone number you no longer control, or a secondary email you abandoned years ago, is a back door standing wide open. Remove anything stale.

Review connected applications and sessions, and remove what you do not recognise.

## A separate identity for money

Consider an email address used only for financial accounts — exchanges, banks, anything holding value. Not published, not used for newsletters, not given to shops, not used to sign up for anything social.

This does two things. It removes your financial identity from the breach lists that circulate, because that address is not in the databases that get leaked. And it means anything arriving in it is either genuine or a blind guess, which makes phishing far easier to spot: a "your exchange account is locked" message arriving at your public address is unambiguous, because your exchange does not have that address.

## The order of operations

If you do only one thing after this lesson, secure the email before anything else. Hardening an exchange while your email is weak is fitting a better lock to a door whose hinges are on the outside.`,
          activity: {
            title: "Harden the account everything hangs from",
            prompt:
              "Go to your main email account's security settings now and work through four things, writing down what you find: is the password unique to this account, what second factor is enabled, what recovery phone numbers and backup email addresses are listed, and what applications and sessions have access. Remove every stale recovery option and every application you do not recognise. Then decide in writing whether you will create a separate financial-only email address, and if so, which accounts you will migrate to it first.",
          },
        },
        {
          title: "Second factors, ranked honestly",
          type: "TEXT",
          points: 10,
          body: `Two-factor authentication is not one thing. The options differ enormously in strength, and the most common one is the weakest.

## SMS codes: weak

A code by text message is better than nothing and worse than everything else. It is vulnerable to SIM swapping, where an attacker persuades or bribes a mobile operator to move your number to their card. Your phone loses signal, and every code goes to them.

This is not exotic. It is routine, it has taken very large sums, and it is especially available where operator staff are underpaid and identity checks are thin.

If SMS is your only option somewhere, use it — but never as the second factor on your email or your exchange, and get off it wherever an alternative exists.

## Authenticator apps: good

A code generated on your device from a shared secret, with no network involved. SIM swapping is irrelevant, since the phone number plays no part.

The thing people get wrong: back up the setup codes when you enable it. Losing the phone without them means losing access to every account at once, and account recovery is slow, humiliating, and sometimes impossible. Store those backup codes physically, like a recovery phrase.

## Hardware security keys: strongest

A physical key you touch. It is the only common method that defeats phishing outright, because the key verifies the site's real domain before responding. On a lookalike site it simply does not work — the fake domain does not match, so there is nothing to steal.

That property is worth understanding, because it means a hardware key protects you even when your judgement fails, which is exactly when protection matters. Buy two: one used, one stored as backup.

## Where to put the effort

Email first, then exchange, then anything else holding value. Those two accounts justify hardware keys if you can afford them, and authenticator apps at minimum.

## SIM-swap defence

Beyond moving off SMS: call your mobile operator and ask for a port-out PIN or account lock. It is a free five-minute call and it materially raises the cost of a SIM swap. Also remove your phone number from account recovery anywhere you can — a number left as a recovery option is a way in, whatever your second factor is set to.`,
          activity: {
            title: "Upgrade your two most important accounts",
            prompt:
              "Take your email and your largest exchange account. For each, write down what second factor is currently enabled, then upgrade it: SMS to authenticator app at minimum, or hardware key if you have one. Save the backup codes physically as you go. Then call your mobile operator and request a port-out PIN or account lock, and write down what they said. Report on all three actions — what you changed, what you could not change and why, and whether your phone number is still listed as a recovery option anywhere.",
          },
        },
        {
          title: "Devices: the ground everything stands on",
          type: "TEXT",
          points: 10,
          body: `A wallet is only as trustworthy as the device running it. Perfect key hygiene on a compromised machine is a strong lock on a wall that is not there.

## The realistic threats

Malware that reads your clipboard and swaps a copied address for the attacker's. Since nobody reads a full address after pasting, this works often.

Malware that searches for wallet files and browser extension data.

Screen capture and keylogging, which catch a phrase during setup or restore.

Malicious browser extensions, including ones that were fine when installed and were later sold or updated into something hostile. This route is badly underestimated.

## Practical hardening

Update the operating system and browser. Most successful attacks use flaws that were patched months earlier, against people who postponed the restart.

Install little, and from official sources. Every application is a potential path in. Pirated software is a common malware carrier and it is not worth the saving, not once.

Audit browser extensions. Remove everything you do not actively use, and be strict — extensions can read every page you visit, including your wallet interface.

Use a separate browser profile for crypto, with the wallet extension and nothing else. It is a five-minute setup and it isolates your wallet from whatever the rest of your browsing picks up.

Lock the device with a real passcode and enable disk encryption. It is on by default on most modern phones and is often off on laptops. A stolen unencrypted laptop is an open filing cabinet.

## Public networks and public machines

Never access a wallet or exchange on a shared or public computer. Not once, not quickly. You cannot know what is running on it.

Public Wi-Fi is less dangerous than it used to be, since traffic is encrypted in transit, but avoid doing anything sensitive on it where you can. Your phone's own connection is generally safer than a café network.

## The dedicated device

If your holdings are meaningful, consider a cheap phone or tablet used only for crypto. No email, no messaging, no browsing, no other applications. It costs less than a hardware wallet and removes almost every path listed above at once. Sitting alongside a hardware wallet, it is close to the strongest practical setup an individual can run.`,
          activity: {
            title: "Clean the device you actually use",
            prompt:
              "Take the device you use most for crypto and do four things, writing down what you find: install pending operating system and browser updates, list every browser extension and remove the ones you do not actively use, confirm disk encryption and a real passcode are on, and set up a separate browser profile containing only your wallet extension. Note anything you found that surprised you — an extension you did not remember installing is worth writing down, because it is the most commonly missed route in.",
          },
        },
        {
          title: "Privacy: what your address tells the world",
          type: "TEXT",
          points: 10,
          body: `Blockchains are public. Every transaction from your address is visible to anyone, permanently, along with your balance and your entire history. Most people know this abstractly and have not thought through what it means for their safety.

## What is linkable

Once anyone connects an address to you, they can see everything that address has ever done and everything it holds. And addresses get connected to people constantly: by posting one publicly, by receiving payment from someone who knows you, by using a service that holds your identity documents, by an exchange withdrawal, or simply by patterns of activity that are recognisable.

## Why this is a security issue, not only a privacy one

A visible balance makes you a target for tailored attacks. Someone who knows what you hold can craft a scam specific to your holdings, and knows how much effort you are worth. In some places, it is a physical safety issue — there is a real category of crime involving people being coerced in person, and it selects for people whose wealth is publicly demonstrable.

This is why publishing your holdings, posting gains, or attaching an address to your public identity carries a cost that is not obvious at the time.

## Practical steps

Do not post addresses publicly under your own name. Use a fresh address if you must publish one to receive something.

Keep the vault unconnected to any service holding your identity, where you can. An address that has never touched an identified account is much harder to attribute.

Separate the wallet used for public activity — anything associated with your name — from the one holding savings.

Be careful about consolidating. Merging funds from several addresses in one transaction proves that the same person controls all of them, and undoes any separation you had.

## Being realistic

Total anonymity is not achievable for most people and chasing it produces elaborate systems that break in ordinary ways. The achievable goal is unlinkability of your savings from your public identity, which is a much smaller ask.

The one thing worth being strict about: do not broadcast what you hold. Not in a group, not on a feed, not to a stranger, not as a screenshot. Almost every attack in this course gets easier the moment someone knows you are worth attacking.`,
          activity: {
            title: "Look yourself up",
            prompt:
              "Take the address you use most and open it in a block explorer, as an outsider would. Write down what a stranger learns: the balance, the tokens, how long it has been active, and which services it has interacted with. Then answer honestly — is this address connected to your public identity anywhere, through a post, a payment from someone who knows you, or a service holding your documents? Write down what separation you need and what one change you will make.",
          },
        },
        {
          title: "Assignment: harden the perimeter",
          type: "ASSIGNMENT",
          points: 25,
          body: `The third graded piece. It covers the accounts and devices around your wallet, which is where a large share of real compromises actually enter. Report on what you have changed, not what you intend to change.`,
          assignment: {
            title: "Perimeter hardening report",
            instructions: `Report on the perimeter around your holdings. 500 to 800 words. Do not include passwords, codes, phrases, or any secret material.

**1. Email.** What you found when you audited your main email account: password uniqueness, second factor in place, stale recovery phone numbers or backup addresses, and connected applications. What you removed. Whether you are separating a financial-only address, and your reasoning either way.

**2. Second factors.** The method now protecting your email and your largest exchange account, what it was before, and where your backup codes are stored. State whether you contacted your mobile operator about a port-out PIN, and what the result was. If any account is still on SMS, say which and why.

**3. Devices.** What you did to the device you use most: updates, extensions removed, encryption and passcode status, browser profile separation. Name anything you found that you did not expect. State whether a dedicated device makes sense for you at your holdings, with reasoning.

**4. Exposure.** What a stranger learns from looking up your most-used address in an explorer, and whether that address is linkable to your public identity. State one specific change you are making as a result.

**5. The weakest link.** Having done all of the above, name the single weakest point remaining in your setup and say what you are doing about it — including deciding to accept it, if that is the honest answer.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Email audit is complete and acted on",
                weight: 25,
                descriptor:
                  "All four areas checked with findings stated and stale recovery options actually removed. Full marks show the writer understood why email sits upstream of everything else.",
              },
              {
                criterion: "Second factors upgraded and backed up",
                weight: 25,
                descriptor:
                  "Email and main exchange moved off SMS where possible, backup codes stored physically, operator contacted about port-out protection. Remaining SMS use is named and justified rather than hidden.",
              },
              {
                criterion: "Device hardening was actually performed",
                weight: 20,
                descriptor:
                  "Concrete actions with specific findings, not a list of intentions. Full marks name something unexpected that the audit surfaced.",
              },
              {
                criterion: "Exposure is assessed from an outsider's view",
                weight: 15,
                descriptor:
                  "The writer has actually looked up their own address and states what is visible and whether it links to their identity, followed by one concrete change.",
              },
              {
                criterion: "Weakest link is named honestly",
                weight: 15,
                descriptor:
                  "A real remaining weakness, not a token one, with either a fix or an explicit accepted-risk decision. Claiming no weaknesses remain scores zero on this criterion.",
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "When it goes wrong",
      description:
        "Response, not prevention. What to do in the first ten minutes, what is recoverable, and how to survive the aftermath.",
      lessons: [
        {
          title: "The first ten minutes",
          type: "TEXT",
          points: 10,
          body: `If you notice a compromise, the next few minutes matter more than anything you did in the previous year. Most people freeze, or do the right things in the wrong order. This lesson is the order.

## Stop the bleeding first

Do not investigate. Do not work out how it happened. Do not message anyone. Move what can still be moved, immediately.

If the compromised wallet still holds anything, send it to a wallet the attacker cannot possibly know — ideally one you generate right now on a different device, or your hardware wallet. Speed matters: automated drainers monitor compromised addresses and take incoming funds within seconds, which is why some victims lose the gas they send in to rescue their tokens.

If it is an exchange account, use the emergency freeze or account lock if the platform has one, then change the password and terminate all sessions.

## Then cut the path

Once nothing further can move, close the route. Revoke approvals if the drain was permission-based and you still control the wallet. Disconnect the device from the network if you suspect malware. Change the password on the email account, from a different, clean device.

That last detail matters. Changing a password on the compromised machine hands the new password straight to whatever is running on it.

## Then triage

Now work out what else uses the same password, the same email, the same phone number, the same recovery route. A compromise almost never stays in one place. List every account that could be reached from what the attacker now has, and secure them in order of value.

## Then, and only then, understand it

With the money safe and the paths closed, work out what happened. What did you sign, what did you install, what did you type and where. This matters, because if you rebuild without knowing the cause, you rebuild into the same hole.

## What not to do

Do not put funds back into the compromised wallet to test it. If the phrase is out, the wallet is permanently the attacker's, and anything sent to it is a donation.

Do not accept help from anyone who contacts you afterwards. Victim lists circulate and are resold within hours. Every recovery offer is a second theft.

Do not delay because you are ashamed. The hours spent not telling anyone are hours the attacker uses.

## Write it before you need it

Have this sequence written down somewhere you can find while panicking. The one thing guaranteed in that moment is that you will not be thinking clearly, and a list you wrote calmly is worth more than judgement under adrenaline.`,
          activity: {
            title: "Write your emergency card",
            prompt:
              "Write your own incident response card — short enough to be usable in a panic, no more than ten lines. It should cover: where you move funds to and how you access that wallet in a hurry, which accounts you lock and in what order, which device you would use given yours might be compromised, and which passwords you change first. Then write down where this card will physically live so you can find it when you are frightened, and put it there today.",
          },
        },
        {
          title: "What is recoverable and what is not",
          type: "TEXT",
          points: 10,
          body: `Honesty here matters, because false hope is what the recovery scammers monetise. Some losses have routes; most do not.

## Not recoverable

A confirmed on-chain transfer from your wallet. Once it is in a block, it is final. No service, firm, hacker or authority can reverse it. This covers most self-custody losses.

Funds sent to a wrong address you do not control. Gone.

Funds moved by someone who has your recovery phrase. That wallet belongs to them permanently, and everything ever sent to it afterwards will also go.

## Sometimes recoverable

Exchange account compromises, if reported fast. Platforms can freeze accounts, halt withdrawals in progress, and occasionally reverse internal movements. Speed is the entire variable.

Funds traced to an exchange. If the thief moves stolen funds to a platform with identity checks, and law enforcement engages, freezing is possible. This is rare, slow, and depends on amounts large enough for anyone to act — but it is a real path, which is why reporting is worth doing.

Approval drains caught before execution. If you notice a malicious allowance and revoke it before the attacker uses it, you lose nothing but gas.

## Worth doing even when recovery is unlikely

Report to your local authorities. It produces a record, which occasionally matters later for tax, insurance, or an eventual class action.

Report to the exchange the funds landed in, if you can trace them. Provide transaction hashes. Sometimes it works.

Report the scam publicly, in the right places. It will not get your money back, and it may stop the next person.

## The scam that follows the scam

Anyone offering guaranteed recovery is stealing from you. Anyone asking for payment upfront to recover funds is stealing from you. Anyone claiming law-enforcement contacts or specialist blockchain access in an unsolicited message is stealing from you.

This is a large, organised industry that specifically targets people who have just lost money, because those people are motivated and already identified. The kindest thing this course can tell you is: when it is gone, it is gone, and the second loss is entirely preventable.

## Which is why the money goes on prevention

Every hour spent on backups, layout and signing discipline is worth more than every hour that will ever be available to you afterwards. There is no afterwards. That is the whole reason this course exists.`,
          activity: {
            title: "Sort losses by recoverability",
            prompt:
              "Write out five loss scenarios that could realistically happen to you specifically, given how you actually hold and use crypto. For each, state honestly whether it is recoverable, sometimes recoverable, or final — and what you would actually do in the first hour. Then look at which of your five are final, and write down what prevention you have in place for those specifically. The final ones are where all your effort belongs.",
          },
        },
        {
          title: "Rebuilding after a compromise",
          type: "TEXT",
          points: 10,
          body: `Once the immediate emergency has passed, there is a rebuild. Done badly, people restore straight back into the conditions that caused the loss.

## Assume the compromise is wider than it looks

If a device is suspect, treat everything on it as exposed: saved passwords, sessions, browser data, files, messages. If a phrase is exposed, every account derived from it is gone forever, including addresses you have never used.

The instinct is to assume the damage stopped where you noticed it. It usually did not.

## Rebuild in the right order

Start clean. If malware is suspected, reinstall the operating system rather than removing the specific threat you found — you do not know what else is there, and modern malware installs companions.

New wallets, new phrases, generated on a device you trust. Never reuse a phrase that may have been exposed, in any circumstances, for any wallet, ever.

New passwords everywhere, starting with email. Not variations of the old ones.

Fresh second factors, since the old ones may be on a compromised device.

Then move funds, last, once everything else is standing.

## Do the honest post-mortem

Write down what actually happened, in order, including the part where you knew something was slightly off and continued anyway. Almost every victim has that moment, and it is the most useful sentence in the whole account.

Then identify the one change that would have broken the chain — usually a burner wallet, a bookmark, or a pause. Rebuild with that change in place, or the rebuild is just a reset.

## The part nobody writes about

Being scammed is humiliating, and the shame is heavier than the money for a lot of people. It makes them hide it, which stops them reporting, warning others, or asking for help.

You were targeted by someone who does this professionally, repeatedly, with practised scripts, and who selected the moment. Falling for a good attack is not a character verdict. The response that matters is the rebuild, not the self-recrimination — and telling someone is part of it, because the isolation is what the recovery scammers walk into.

## A note on money you cannot afford to lose

If the loss has damaged your ability to live, the priority stops being crypto entirely. Stabilise income and obligations first, and do not attempt to trade your way back. Trying to recover a loss quickly is the exact psychological state that attackers and markets both punish hardest, and it is how a bad month becomes a bad year.`,
          activity: {
            title: "Pre-write the post-mortem questions",
            prompt:
              "You cannot write a post-mortem for something that has not happened, but you can prepare the questions. Write the five questions you would want to answer honestly after a compromise — including one that asks what you noticed and ignored. Then, separately, write down the name of the one person you would tell, and why telling them quickly matters. Deciding that now, calmly, is what makes it possible later when shame is arguing against it.",
          },
        },
        {
          title: "Helping someone who has been hit",
          type: "TEXT",
          points: 10,
          body: `Sooner or later someone will come to you — a friend, a family member, someone in a group — having lost money. What you do in that conversation matters, and most people get it wrong in predictable ways.

## First, do not lecture

They already know they made a mistake. Explaining what they should have done is for later, if ever, and doing it immediately makes them defensive at exactly the moment they need to act fast. The lecture is for your comfort, not their benefit.

## Get the sequence going

Ask what is still at risk and move it. Ask what accounts share the password or email. Ask what device it happened on and get them off it.

Speed matters more than understanding, and their instinct will be to explain what happened. Redirect gently: we will work out how later, right now we are stopping it.

## Protect them from the second theft

Tell them explicitly, before it happens: people will contact you offering to recover this, and every one of them is a thief. Say it early, because the offers arrive within hours and they will be at their most vulnerable to hope.

Warn them that anyone who messages first is an attacker, including anyone claiming to be from a platform they have contacted.

## Then, the useful help

Help them list what is exposed and secure it in order. Help them report, if there is anywhere worth reporting to. Help them rebuild properly rather than restoring into the same hole.

And be a person they can tell without shame. The reason so many losses go unreported is that the victim cannot face saying it out loud, and that silence costs them time they do not have.

## The community angle

If you are in a group where this happens, the highest-value contribution is not being the person who knows the most. It is being the person who says clearly and repeatedly: nobody legitimate will ever message you first, and nobody ever needs your recovery phrase.

That one sentence, said often in a room where beginners arrive, prevents more loss than any amount of technical explanation. It works precisely because it is short enough to remember at the moment it is needed.`,
          activity: {
            title: "Write the first three questions",
            prompt:
              "Someone messages you: they have just been drained. Write the exact first message you would send back — no lecture, no diagnosis, just what gets them moving. Then write the three questions you would ask, in order, and the one warning you would give before anything else. Keep it short enough to send in thirty seconds. You are writing something you will one day actually use.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on response. This is the module you hope never to use, which is exactly why it has to be memorised rather than understood — under adrenaline, you will only have what is already automatic.`,
          quiz: {
            title: "Incident response",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "You discover your wallet is being drained. What is the first action?",
                explanation:
                  "Move whatever can still be moved, to a wallet the attacker cannot know about. Investigation, notification and understanding all come after the bleeding stops. Automated drainers monitor compromised addresses, so speed is the whole variable.",
                options: [
                  {
                    text: "Move any remaining funds to a wallet the attacker cannot know about",
                    correct: true,
                  },
                  { text: "Work out how it happened so you can stop it", correct: false },
                  { text: "Post in a group asking for help", correct: false },
                  { text: "Contact the wallet provider's support", correct: false },
                ],
              },
              {
                prompt:
                  "Your email password was compromised and you are on the possibly infected computer. What do you do?",
                explanation:
                  "Change it from a different, clean device. Changing a password on a compromised machine delivers the new password straight to whatever is running on it — a very common and very costly mistake.",
                options: [
                  { text: "Change it from a different device you trust", correct: true },
                  { text: "Change it immediately on the same computer", correct: false },
                  { text: "Change it after running an antivirus scan", correct: false },
                  { text: "Wait until you understand what happened", correct: false },
                ],
              },
              {
                prompt: "Which of these losses is genuinely final?",
                explanation:
                  "A confirmed on-chain transfer cannot be reversed by anyone. Exchange compromises can sometimes be frozen if reported fast, and an approval caught before execution costs only gas — but a settled transaction is settled permanently.",
                options: [
                  { text: "A confirmed on-chain transfer out of your wallet", correct: true },
                  { text: "An exchange account compromise reported within minutes", correct: false },
                  { text: "A malicious approval you revoked before it was used", correct: false },
                  { text: "A withdrawal still pending on a platform", correct: false },
                ],
              },
              {
                prompt:
                  "Hours after a loss, someone offers to recover your funds for a fee. What is happening?",
                explanation:
                  "A second scam targeting an identified victim. Victim lists circulate and are resold within hours. Nobody can reverse a blockchain transaction, so a promise of recovery is definitionally false.",
                options: [
                  { text: "A second scam — victim lists are resold within hours", correct: true },
                  { text: "A legitimate specialist service", correct: false },
                  { text: "Worth trying if the fee is small relative to the loss", correct: false },
                  { text: "Likely genuine if they cite law-enforcement contacts", correct: false },
                ],
              },
              {
                prompt:
                  "Your wallet's recovery phrase was exposed. Can you keep using the wallet after revoking approvals?",
                explanation:
                  "No. The phrase is the wallet — whoever has it controls every address it derives, permanently. Anything ever sent to it afterwards will be taken. A new wallet with a new phrase, generated on a trusted device, is the only correct response.",
                options: [
                  {
                    text: "No — the wallet belongs to the attacker permanently and must be abandoned",
                    correct: true,
                  },
                  { text: "Yes, once all approvals are revoked", correct: false },
                  { text: "Yes, if you change the wallet password", correct: false },
                  { text: "Yes, if you move it to a hardware wallet", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Judgement calls",
      description:
        "The grey areas, where there is no rule to follow. How to evaluate something new when nobody can tell you whether it is safe.",
      lessons: [
        {
          title: "Evaluating something genuinely new",
          type: "TEXT",
          points: 10,
          body: `Rules cover known attacks. Sooner or later something arrives that fits no rule, and you have to judge it. This lesson is a framework rather than a checklist.

## Start with who benefits

Follow the money in the situation in front of you. Who profits if you act? If the answer is "the person who brought this to me", the incentive is misaligned and everything else needs more evidence. If the answer is "everyone including me, in proportion", that is different.

This one question does most of the work, and it applies to advice as much as to products.

## Ask what has to be true

For this to be legitimate, what must be true? Write the list. Then check the items you can check, cheaply.

The project must have existed before this month — checkable. The team must be identifiable — checkable. The returns must come from somewhere real — often the item that collapses the whole thing, because "where does the yield come from" frequently has no answer.

## Ask what happens if you are wrong

Not how likely it is. What it costs. This reframing is more useful than probability because you can actually answer it.

If being wrong costs a burner balance, act and learn. If being wrong costs your savings, you need evidence proportionate to that, and enthusiasm is not evidence.

## Notice how you found it

Did you go looking for this, or did it find you? Almost everything that finds you — in a message, a reply, an advert, a group post — has a marketing budget or an attacker behind it. Things you sought out yourself, researched, and arrived at deliberately have a fundamentally different risk profile.

This is not a rule that things which find you are always scams. It is that they have to clear a much higher bar.

## Apply the delay

Whatever the answer, wait. Twenty-four hours minimum on anything meaningful. The delay costs you almost nothing on a real opportunity and saves you everything on a fake one, and no amount of analysis substitutes for it — because the analysis you do while excited is not analysis.

## Be comfortable missing things

The hardest part. You will decline things that turn out to have been real, and you will watch other people profit from them. That is the cost of the strategy, and it is a good trade.

Missing an opportunity costs you a gain you never had. Taking a bad one costs you capital you did have, plus the compounding of everything it would have become. Those are not symmetrical, and treating them as symmetrical is why people who "never miss anything" end up with nothing.`,
          activity: {
            title: "Run the framework on something real",
            prompt:
              "Find something you are currently curious about — a platform, a token, an opportunity, anything with money attached. Run the full framework in writing: who benefits, what must be true, what you checked and what you found, what being wrong would cost, and how you found it. Then state your decision and the date you will revisit it. Notice which question did the most work — for most people it is the one about where the returns actually come from.",
          },
        },
        {
          title: "Yield, and where it actually comes from",
          type: "TEXT",
          points: 10,
          body: `A large share of catastrophic losses involve yield. Not theft in the direct sense — the funds are handed over willingly, in exchange for a return that was never being generated.

## The only question that matters

Where does the money come from? Every legitimate yield has an answer, and you should be able to state it in one sentence.

Lending: from borrowers paying interest. Checkable — you can look at whether borrowers exist and what they pay.

Trading fees: from traders paying to use a pool. Checkable — volume is public.

Staking rewards: from new issuance or transaction fees. Checkable, and comes with dilution you should account for.

Business profit: from customers. Checkable if the business is real.

If nobody can tell you where the return comes from, or the answer is vague — "arbitrage", "our proprietary strategy", "market making" — assume it comes from other depositors. That structure has one ending, and the only variable is when.

## Why fixed returns are the loudest signal

Real yields move. They rise when demand for borrowing rises and fall when it falls. A fixed weekly percentage, stable regardless of market conditions, is not a yield — it is a promise, and a promise is only as good as the entity making it.

Anyone offering a guaranteed return in a volatile market is either lying about the risk, taking the risk without telling you, or paying you with the next person's deposit.

## Legitimate yield still has risk

This is where people over-correct. A real protocol can pay a real yield and still lose your money — through a contract flaw, a failure of the collateral behind it, a depeg, or a governance attack. Real does not mean safe.

So the second question after where does it come from is what could make this go to zero, and would I know before it did?

## The proportionality rule

Yield is compensation for risk. A return several times what the safest available option pays is telling you something about the risk, whether or not anyone says so out loud. If you cannot articulate what risk you are being paid to take, you are not being paid for it — you are simply exposed to it.

The people who blew up in every cycle were not paid for risk they understood. They were paid for risk nobody had named, right up until it arrived.`,
          activity: {
            title: "Trace a yield to its source",
            prompt:
              "Pick any yield-bearing opportunity you can see right now — a platform, a protocol, a product, anything advertising a return. Write down the advertised rate, then answer in writing: where does this money actually come from, in one sentence? What could make it go to zero? Would you find out before or after it happened? If you cannot answer the first question from public information, write down that fact — that is the finding, and it is usually the whole answer.",
          },
        },
        {
          title: "Trust, delegation and the people you learn from",
          type: "TEXT",
          points: 10,
          body: `You cannot verify everything yourself. Some trust has to be delegated, and doing it well is a skill in its own right.

## Trust the process, not the person

The useful question is not whether someone is honest. It is whether they would be caught if they were not.

Someone with a public track record, who states positions before outcomes are known, who acknowledges losses, and who has something to lose from being wrong, is trustworthy in a structural sense — not because of their character but because they are exposed.

Someone anonymous, who only shows wins, whose claims cannot be checked, and who is selling something, is not — regardless of how right they have been recently.

## The tells of someone worth learning from

They say when they are wrong, and specifically, not as a humble aside.

They tell you what would change their mind.

They describe risk unprompted and in detail, including the risk in their own position.

They have no financial interest in your specific action, or they disclose it plainly.

They teach you to evaluate rather than to follow, which means their advice makes you need them less over time.

## The tells of someone to leave

Certainty. Markets do not produce certainty, and anyone expressing it is either selling or does not understand what they are doing.

Only wins in the record. Everyone loses. A feed with no losses has been curated, and the curation is the information.

Urgency attached to every idea. Constant deadlines are a sales technique.

Attacking anyone who asks a question. Legitimate positions survive questions.

## Delegating safely

Trust people for information, not for action. A good analyst's view is an input. Nobody should be able to cause a transaction from your wallet by saying something.

Never give anyone access. Not to your keys, not to your accounts, not to a managed arrangement. The category of "someone trades on my behalf" has almost no legitimate retail version, and an enormous fraudulent one.

Diversify who you learn from, especially people who disagree with each other. If everyone you follow says the same thing, you are not informed, you are in a room.

## Including this academy

Apply the same test here. We should be telling you what we are uncertain about, describing risk unprompted, and teaching you to evaluate rather than to follow. If a course here ever tells you to buy a specific thing by a specific date, treat it with the suspicion you would apply anywhere else.`,
          activity: {
            title: "Audit who you learn from",
            prompt:
              "List the five sources you actually take crypto or money information from — people, channels, accounts, wherever it really comes from. For each, mark: do they ever say they were wrong, do they describe risk unprompted, do they have a financial interest in your action, and would they be caught if they were dishonest? Then decide who to drop and who to add — specifically, add at least one source that disagrees with the others. Write down what you changed.",
          },
        },
        {
          title: "Living with irreversibility",
          type: "TEXT",
          points: 10,
          body: `The last idea in the technical part of this course is a way of holding all of it. Self-custody is a permanent shift in how carefully you have to act, and the people who do well with it have made peace with that rather than fighting it.

## What has actually changed

In the traditional system, most mistakes are recoverable. Wrong transfer, reversible. Card stolen, cancelled. Password lost, reset. Fraud, refunded. The system carries a great deal of your risk, and it charges you for that in fees, restrictions and permission.

Here, the system carries none of it. Every mistake is yours, permanently. In exchange, nobody can freeze you, refuse you, or take it by decree.

That is a genuine trade with real benefits, and it is not free. Anyone who sold you self-custody as pure upside skipped the part where you become your own bank, including the bank's operations department.

## The way to hold it

Not anxiety. Anxious people make worse decisions, check obsessively, and burn out into carelessness — the most common trajectory is not a careful person, it is someone who was tense for six months and then stopped caring.

The workable posture is procedural. Do not rely on being alert; rely on having built a system that does not require alertness. Bookmarks so you do not have to evaluate links. A burner so a mistake is cheap. A layout so the vault is out of reach when you are careless. A written response plan so panic has instructions.

Good security feels boring, not vigilant. If your security depends on you being sharp, it will fail on the day you are tired — and there will be such a day.

## Sizing to your competence

The honest version of this principle: hold in self-custody what your current competence justifies, and grow it as your competence grows.

There is no shame in an exchange with strong second factors while you are learning. There is real shame in the industry's habit of pushing beginners into full self-custody with no discipline, then blaming them when it goes wrong.

## What you have actually gained

The habits from this course transfer. Slowing down when you feel urgency, checking where a request came from, asking who profits, verifying out of band, thinking about blast radius — none of that is crypto-specific. It is a general immunity to being rushed, and it will protect your money and your time in places that have nothing to do with a blockchain.

Your money is now genuinely yours. That was always the promise. This is what it costs, and it is payable in habits rather than in fear.`,
          activity: {
            title: "Decide what your competence justifies",
            prompt:
              "Write an honest assessment. Given the habits you have actually built during this course — not the ones you read about — what amount is it reasonable for you to hold in self-custody right now? Write the number, and write what would have to be true for you to double it. Then write one sentence about which posture you have been carrying: anxious, careless, or procedural. If it is one of the first two, write the specific system you will build so it does not have to depend on you being sharp.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `The last check before the capstone. These questions have no rule to look up — they test whether the framework has become how you think, which is the only thing that helps when something genuinely new arrives.`,
          quiz: {
            title: "Judgement",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt:
                  "A platform offers a fixed 3% weekly return and cannot explain where the yield comes from beyond 'proprietary trading'. What do you conclude?",
                explanation:
                  "It is being paid from new deposits. Real yields move with market conditions and have a traceable source you can state in a sentence. A fixed return plus an unexplainable source is the standard structure, and it ends the same way every time.",
                options: [
                  {
                    text: "The return is being paid from new deposits and will end when inflows stop",
                    correct: true,
                  },
                  { text: "It is legitimate if withdrawals currently work", correct: false },
                  { text: "It is fine for a small amount", correct: false },
                  { text: "It is credible if the team is public", correct: false },
                ],
              },
              {
                prompt: "What is the most important thing about how an opportunity reached you?",
                explanation:
                  "Whether you sought it out or it found you. Things that arrive in a message, reply, advert or group post have either a marketing budget or an attacker behind them, and must clear a much higher bar than something you researched and arrived at deliberately.",
                options: [
                  { text: "Whether you went looking for it, or it found you", correct: true },
                  { text: "Whether the person who sent it is trustworthy", correct: false },
                  { text: "Whether it has a professional website", correct: false },
                  { text: "How many people are already in it", correct: false },
                ],
              },
              {
                prompt: "Which makes someone structurally trustworthy as a source?",
                explanation:
                  "Being exposed — a public track record, stated positions before outcomes are known, acknowledged losses, and something to lose from being wrong. It is not about character; it is about whether dishonesty would be caught.",
                options: [
                  {
                    text: "A public record that would catch them out, including admitted losses",
                    correct: true,
                  },
                  { text: "A long run of correct calls recently", correct: false },
                  { text: "A large following", correct: false },
                  { text: "Confidence and clarity in their views", correct: false },
                ],
              },
              {
                prompt: "Why is 'what does being wrong cost?' more useful than 'how likely is this to be a scam?'",
                explanation:
                  "Because you can actually answer it. Probability estimates on unfamiliar situations are unreliable, especially while excited. Cost of being wrong is knowable, and it tells you directly how much evidence to demand and which wallet to use.",
                options: [
                  {
                    text: "Because you can answer it accurately, and it tells you how much evidence to demand",
                    correct: true,
                  },
                  { text: "Because probability is irrelevant to security", correct: false },
                  { text: "Because most things are scams anyway", correct: false },
                  { text: "Because it is faster to calculate", correct: false },
                ],
              },
              {
                prompt: "What does well-designed personal security feel like day to day?",
                explanation:
                  "Boring and procedural. Security that depends on you being alert fails on the day you are tired, and there will be such a day. The goal is a system that holds without requiring vigilance — bookmarks, burners, layout, a written plan.",
                options: [
                  { text: "Boring and procedural, requiring no vigilance to work", correct: true },
                  { text: "Constantly alert and suspicious", correct: false },
                  { text: "Anxious, which keeps you careful", correct: false },
                  { text: "Effortless, because good tools handle everything", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },
    // =====================================================================
    {
      title: "Your security system",
      description:
        "Pull it together into something you will still be running next year — written down, tested, and shared with the people who need it.",
      lessons: [
        {
          title: "The one-page plan",
          type: "TEXT",
          points: 10,
          body: `Everything in this course has to collapse into something short enough to actually live by. A security plan longer than a page is a document; a page is a system.

## What belongs on it

Your layout. The three tiers, what is in each, and the rule for what each one connects to. One or two lines each.

Your backups. Where they are, in what form, how many copies, and the date you last verified a restore worked.

Your perimeter. Which email guards what, what second factor is on each critical account, where your backup codes live.

Your habits, with dates. Approvals audit monthly on a specific day. Quarterly review on a specific date. Attached to something already in your calendar.

Your emergency sequence. The first five things you do, in order, and where the funds go.

## What does not belong on it

Any secret. Not a phrase, not a fragment, not a key, not a password, not a clue that narrows a guess. The plan describes the system and never contains the secret. If you would not be comfortable with a stranger reading it, it contains too much.

Aspirations. Only what you actually do. A plan containing things you have not done is a wish list, and it will make you feel protected while you are not — which is the most dangerous state available.

## Where it lives

Somewhere you will find it in a panic and somewhere you will see it in ordinary life. Both matter: the first is for the incident, the second is what stops the system decaying quietly.

Printed is good. A note on a device is fine provided it contains no secrets, which it should not.

## Reviewing it

Quarterly, ten minutes, four questions. Has the layout collapsed back into one wallet? Are the backups still where they should be, and when did I last verify one? Have I done the monthly audits? Has my balance grown past what my current setup justifies?

That last question is the one people miss. Security that was proportionate at a small balance is not proportionate at ten times that, and the change happens gradually enough that nobody notices the day it stopped being enough.`,
          activity: {
            title: "Write the page",
            prompt:
              "Write your one-page security plan now, using the five sections from this lesson. Constraints: it fits on one page, contains no secret material of any kind, and every line describes something you have actually done rather than something you intend to do. Where you have not done something, write it in a clearly marked 'not yet' list at the bottom with a date. Then write where the page will physically live, and put it there.",
          },
        },
        {
          title: "Teaching it to the people around you",
          type: "TEXT",
          points: 10,
          body: `Your security is not only yours. The people close to you are part of your attack surface, and you are part of theirs.

## Why other people are your problem too

If a family member is compromised, an attacker gets a trusted channel to you — a real account, a real relationship, real context. Impersonation from a genuinely compromised account is far harder to detect than a fake one.

If someone knows what you hold, that information exists outside your control. It reaches whoever they tell, and whoever compromises them.

And if you are the person in your circle who knows about crypto, you are the person everyone will ask, which means their losses become your evenings whether you planned for it or not.

## What is actually worth teaching

Not all of this course. Three things, repeated until they stick:

Nobody who contacts you first is legitimate. Not support, not a platform, not a recruiter, not an official.

Nobody ever needs your recovery phrase or your password. Not for any reason, in any emergency.

Slow down when you feel rushed, and verify on a channel they did not choose.

Those three cover the overwhelming majority of what will actually be attempted against an ordinary person.

## The family code word

The single highest-value item for people who do not use crypto at all. Agree a word, in person, that must be given on any urgent request for money. It costs one conversation and defeats voice cloning, account compromise and impersonation in a single move.

## Teaching without condescension

People stop listening the moment they feel talked down to, and older relatives get this constantly. What works better: tell them about an attack that nearly worked on you, or on someone competent. It makes the point that this is not about being clever, which is the belief that gets people caught.

## What you owe a beginner

If you introduce anyone to crypto, you owe them the security conversation before the opportunity conversation. The industry does this backwards constantly — excitement first, security after the first loss — and the result is people who lose their first money and never come back.

Start them on an exchange with strong second factors and a small amount. Move them to self-custody when they have shown they will keep a backup. That order is not gatekeeping. It is the difference between someone who is still here in two years and someone who is not.`,
          activity: {
            title: "Have one conversation this week",
            prompt:
              "Pick one specific person who is exposed — a parent, a sibling, a friend who has just started, anyone. Write down what you will tell them, limited to the three rules and the code word. Then write how you will say it without condescension, including which near-miss of your own you will lead with. Then actually have the conversation this week and write down what happened, including anything that surprised you about what they already believed.",
          },
        },
        {
          title: "Keeping up without drowning",
          type: "TEXT",
          points: 10,
          body: `Attacks evolve. A course written today will be missing something in eighteen months. This lesson is about staying current without turning security into a hobby that consumes your attention.

## What changes and what does not

The mechanisms change slowly. Approval drains, phishing, impersonation, fake support, advance fees and long cons have all been running for years and will still be running in five. The specific packaging changes constantly — new chains, new interfaces, new stories, new technologies to impersonate with.

This means the framework from this course has a long shelf life, and the specifics do not. Learn the shapes and you will recognise the repackaging.

## A sustainable input

One good source of security-specific information, checked occasionally. Not a feed of every incident — that produces anxiety and no behaviour change.

What you actually want is notification of new mechanisms, not new incidents. A new type of attack is worth ten minutes. The four hundredth instance of an existing attack is not.

## The two questions when something new appears

Does this defeat one of my existing defences? If a new attack still fails against bookmarks, burners and slow signing, it changes nothing for you and you can note it and move on.

Does this require a new habit? Almost always no. Occasionally yes, and those are worth adopting immediately.

## Reviewing when your position changes

Security should be revisited on events, not only on a calendar. When your holdings grow significantly. When you start using a new type of application. When you change devices or phones. When someone close to you is compromised. When you begin holding for someone else.

Each of those changes what is proportionate, and the growth one is the most commonly missed — because it happens gradually and there is no day on which it announces itself.

## The honest end state

You will not be perfectly secure, and chasing that produces elaborate systems that collapse. What is achievable is being a hard target: enough friction that automated attacks fail, enough habits that opportunistic ones fail, and enough blast-radius control that the ones that succeed are survivable.

That is a realistic goal, it is reachable in a weekend of work, and it puts you ahead of almost everyone else in this space. Attackers are running a numbers game. Being meaningfully harder than average is most of the defence.`,
          activity: {
            title: "Set your review triggers",
            prompt:
              "Write down your review triggers: the specific events — not dates — that will make you revisit your security plan. Include a balance threshold with an actual number on it, since that is the one people miss. Then choose your one security information source and write down where you will check it and how often. Finally, write the two questions you will ask about any new attack you read about, in your own words.",
          },
        },
        {
          title: "What you can now do",
          type: "TEXT",
          points: 10,
          body: `Before the capstone, a look back at what has actually changed — because the value of this course is invisible by design, and it is worth making it explicit once.

## The mechanisms you can now name

Approval drains and why disconnecting does nothing. Lookalike domains, adverts and applications. Address poisoning. Fake support and the direction-of-contact rule. Giveaways, doublers, fake airdrops, presales and recovery scams. Long cons and relationship-based theft. Task scams, mule roles and malicious recruiters. Manufactured group consensus. Impersonation across every channel including voice.

That is most of what will ever be attempted against you, and you can see the machinery under the story now.

## The structure you have built

A wallet layout where a mistake costs a burner rather than everything. Backups that survive fire, theft and forgetting, and that you have verified. A perimeter where your email is not the weak point and your phone number is not a route in. Devices that are updated, minimal and separated. A written response plan for the day something goes wrong.

## The habits that carry it

Arriving deliberately through your own bookmarks. Pausing on urgency, greed, authority and fear. Burner for anything new. Reading the popup before signing. A monthly audit attached to something you already do.

## The judgement that outlasts the specifics

Who benefits. What must be true. What does being wrong cost. How did this find me. Wait twenty-four hours. Where does the yield come from. Would this person be caught if they were dishonest.

Those transfer far beyond crypto, and they are the most durable thing here.

## The one rule

Nobody legitimate ever needs your recovery phrase. Not support, not a developer, not an exchange, not this academy, not in any emergency, not ever. If you forget everything else in this course, keep that.

## What is left

The capstone, which asks you to write the whole system down as one document — because a plan that exists only in your head is a plan that decays without you noticing.

And then the ordinary work of running it: quietly, unremarkably, for years, while nothing happens. Nothing happening is what success looks like here. It is not exciting, and it is the entire point.`,
          activity: {
            title: "Write your before and after",
            prompt:
              "Go back to the first lesson's exercise, where you wrote what you would lose if your main wallet were emptied tonight. Read it again. Now write the honest comparison: what would actually happen today, given what you have built during this course? Be specific about what an attacker would get and what they would not. Then write down the one thing you know is still weak — everyone has one — and what you are doing about it this month.",
          },
        },
        {
          title: "Capstone: your complete security system",
          type: "ASSIGNMENT",
          points: 40,
          body: `The final piece of work. It pulls the whole course into a single document that an instructor reads as though they were an attacker looking for the way in.

This is the most useful thing you will produce here, because it is the artefact that survives the course. A year from now you will not remember module four. You will have this.`,
          assignment: {
            title: "Your complete security system",
            instructions: `Write your full security system as a single document, 900 to 1,400 words. It will be read adversarially — the grader's job is to find the way in.

**1. Position.** What you hold in rough terms, where it sits, and who other than you can technically move each part. Bands rather than exact figures are fine.

**2. Layout and blast radius.** Your wallet tiers and the connection rules for each. Then a worked scenario: pick the most likely mistake you will actually make, and trace it to a concrete outcome — what is lost, what survives, how you find out, and how fast.

**3. Backups.** Medium, copies, locations, protection, and the date you last verified a restore. If you have not verified one, say so and give the date you will.

**4. Perimeter.** Email, second factors, backup code storage, mobile operator protection, device hardening, browser separation. Name what is still weak.

**5. Habits.** The short list you have actually kept, with the trigger each one hangs on. Separately, the practices you deliberately cut and the risk you are accepting by cutting them.

**6. Response plan.** Your first five actions in order, where funds go, which device you use, and what you will not do — including the recovery-scam warning.

**7. The way in.** Read your own document as an attacker. Where is the weakest point, and what is your realistic plan for it? This section is where the marks are. A submission concluding that no weakness remains scores zero here, because every real system has one and not finding it means you did not look.

**8. Review.** Your triggers and dates, including a specific balance threshold at which your current setup stops being proportionate.

**No secret material.** No phrase, key, password, backup code, fragment, photograph, or clue that would narrow a guess. Nobody at this academy will ever ask you for that material, and a submission containing it will be rejected rather than graded.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "The system is real, not aspirational",
                weight: 20,
                descriptor:
                  "Describes what has actually been built and done, with anything outstanding clearly marked and dated. Full marks make the distinction explicit rather than blurring intentions into accomplishments.",
              },
              {
                criterion: "Blast radius is traced to a concrete outcome",
                weight: 20,
                descriptor:
                  "A realistic mistake is followed through to exactly what is lost, what survives, and how it is detected. Full marks pick a mistake the writer is genuinely likely to make, not a convenient one.",
              },
              {
                criterion: "Backups and perimeter are complete and verified",
                weight: 20,
                descriptor:
                  "Durable, secret, multi-location backups with a verification date; email, second factors and devices hardened with remaining weaknesses named rather than omitted.",
              },
              {
                criterion: "Habits are short, triggered and honest",
                weight: 15,
                descriptor:
                  "A list the writer will plausibly still be running in a year, each attached to an existing trigger, with cut practices and accepted risks stated plainly.",
              },
              {
                criterion: "Response plan is ordered and usable under panic",
                weight: 10,
                descriptor:
                  "Correct sequence — stop the bleeding, cut the path, triage, then understand — with a clean device specified and the recovery-scam warning included.",
              },
              {
                criterion: "The adversarial section finds a real weakness",
                weight: 15,
                descriptor:
                  "A genuine weakest point identified with a realistic plan. Full marks find something the rest of the document did not already flag. Concluding that no weakness remains scores zero on this criterion.",
              },
            ],
          },
        },
      ],
    },
  ],
};
