import type { ContentCourse } from "./types";

/**
 * DeFi & Web3 From Zero — the free "using crypto" foundation.
 *
 * The companion to Crypto From Zero. Where that course made you safe holding
 * crypto, this one makes you safe *using* it — connecting a wallet to
 * applications, trading on a DEX, lending, staking, NFTs. The order is
 * deliberate: understand what you're signing before you sign anything, and
 * understand where a yield comes from before you chase it, because interacting
 * with crypto multiplies the ways to lose it.
 *
 * This course teaches no specific products and promises no returns. It is
 * relentlessly safety-first, because the moment you connect a wallet to the
 * wider crypto world, you take on a new class of risk most people never
 * understand until it costs them.
 *
 * Like the rest of the academy, almost every lesson is a written exercise. You
 * do not become safe in DeFi by reading about it. You become safe by
 * understanding each risk and deciding your rules before money is on the line —
 * which is exactly what these activities make you do.
 */
export const defiAndWeb3: ContentCourse = {
  slug: "defi-and-web3",
  title: "DeFi & Web3 From Zero: Using Crypto Safely",
  subtitle:
    "The companion to Crypto From Zero — how to actually use crypto (trade, lend, stake, NFTs) without getting drained. Understand what you're signing, where yields come from, and every risk before you take it.",
  description: `Holding crypto safely is one skill; using it — connecting your wallet to applications, trading on decentralised exchanges, lending, staking, buying NFTs — is another, and it's where a whole new class of risk appears. The moment you connect a wallet to the wider crypto world, you can lose money in ways that simply don't exist when you just hold: a malicious approval, a bad signature, an unsustainable yield, a smart-contract exploit, a bridge hack. Most people learn these risks only after they've been drained.

This course teaches you to use crypto safely, before it costs you. You'll learn what "connect wallet" and signing actually do (and how to read what you're approving), how decentralised exchanges, lending, staking, stablecoins, bridges, and NFTs really work, where yields genuinely come from (and how to spot the ones that are too good to be true), and every major risk — smart-contract, liquidation, scam, and more — with concrete ways to protect yourself. It ends with your own plan for using crypto wisely, if at all.

No product shilling, no yield farming tips, no promises of returns — anyone offering those is usually the risk. Just the safety-first understanding to use crypto without becoming another cautionary tale, built on the custody foundation of Crypto From Zero.`,
  categorySlug: "crypto-foundations",
  level: "INTERMEDIATE",
  priceMinor: 0,
  estimatedHours: 13,
  passThreshold: 80,
  instructorEmail: "mabi@mabyacademy.com",
  outcomes: [
    "Understand what 'connect wallet' and signing actually do, and read what you approve",
    "Manage token approvals and revoke the ones that put your funds at risk",
    "Understand how DEXs, lending, staking, stablecoins, and bridges really work",
    "Judge where a yield genuinely comes from, and spot the too-good-to-be-true ones",
    "See through NFT hype to what digital ownership actually is and isn't",
    "Recognise the smart-contract, liquidation, and scam risks and protect against them",
    "Decide whether and how to use DeFi/Web3 wisely, with sound risk limits",
  ],
  modules: [
    // =====================================================================
    {
      title: "Beyond holding — the world of using crypto",
      description:
        "The companion to Crypto From Zero. What it means to use crypto rather than just hold it, what Web3 and DeFi actually are, and why interacting multiplies the risk.",
      lessons: [
        {
          title: "Welcome — from holding to using",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `Crypto From Zero made you safe holding crypto — owning your keys, backing them up, not getting phished. This course is about the next step: actually using crypto — connecting your wallet to applications, trading, lending, staking, NFTs. It's a whole new world, and a whole new class of risk. Most people step into it unprepared and get drained. This course prepares you first.

## What you'll be able to do

- Understand what "connect wallet" and signing actually do, and read what you approve
- Manage token approvals and revoke the ones that put your funds at risk
- Understand how DEXs, lending, staking, stablecoins, and bridges really work
- Judge where a yield genuinely comes from, and spot the too-good-to-be-true ones
- See through NFT hype to what digital ownership actually is
- Recognise the risks — smart-contract, liquidation, scam — and protect against them

## What this course is not

It is not product shilling, yield-farming tips, or promises of returns. Nobody here will tell you what to buy or where to earn. Anyone offering those is usually the risk. This course is relentlessly safety-first, teaching you to use crypto without becoming another cautionary tale.

## Building on the foundation

This course assumes the custody foundation of Crypto From Zero: you own your keys, you never share your seed phrase, and you understand that transactions are irreversible. If that's not solid yet, start there — using crypto safely requires holding it safely first. Everything here builds on that foundation, adding the safety of interacting with the wider crypto world.

## How the lessons work

Opening a page does not complete it. Almost every lesson has an exercise — usually understanding a risk and deciding your rules before money is on the line — and it only counts once you've done it. The write-up is private; nobody grades it or reads it. It exists because you don't become safe in DeFi by reading about it; you become safe by understanding each risk and deciding your rules in advance, which is exactly what these activities push you to do.`,
          activity: {
            title: "Name what you want to do with crypto",
            prompt:
              "Write down what you actually want to do with crypto beyond just holding it — trade on a DEX, earn yield, use an app, buy an NFT, or just understand it safely. Be honest, including if the answer is 'I'm not sure I should do any of it'. Then note what worries you about it. You'll return to this at the end, when you'll be equipped to decide whether and how to use crypto wisely.",
          },
        },
        {
          title: "What Web3 and DeFi actually mean",
          type: "TEXT",
          isPreview: true,
          points: 10,
          body: `"Web3" and "DeFi" are thrown around constantly, usually to sell you something, and rarely explained plainly. Let's cut through the hype to what they actually mean, because you can't use these things safely if you don't understand what they are.

## Web3, plainly

Web3 is a broad, hype-laden term for applications built on blockchains — apps where the logic runs on a public blockchain via smart contracts rather than on a company's private servers. The idea is that instead of using an app controlled by a company (which holds your data and account), you interact directly with programs on a blockchain using your own wallet, without a company in the middle. Whether Web3 lives up to its grand promises is hotly debated and mostly beside the point for your safety; what matters is the practical reality: Web3 apps are applications you interact with using your crypto wallet, where the logic runs on a blockchain, and using them means connecting your wallet and authorising actions — which carries risks a normal app doesn't. Strip away the hype, and Web3 for your purposes means: apps you use with your wallet, running on blockchains, which you need to interact with safely.

## DeFi, plainly

DeFi — decentralised finance — is a major part of Web3: financial services (trading, lending, borrowing, earning yield) provided by smart contracts on blockchains rather than by banks and financial companies. Instead of trading through a broker, you trade through a smart contract (a decentralised exchange); instead of lending through a bank, you lend through a lending protocol. The appeal is financial services without traditional intermediaries — permissionless, open to anyone with a wallet. The reality for your safety: DeFi means using your own wallet to interact with financial smart contracts that hold and move real money, with no bank, no customer service, no reversals, and no safety net — so the risks (and the responsibility) are entirely yours. DeFi for your purposes means: financial services run by smart contracts you interact with directly, carrying real financial risk with no intermediary to protect you.

## Why the plain understanding matters

Cutting through the hype to what Web3 and DeFi actually are — apps you use with your wallet, and financial services run by smart contracts, both interacted with directly and carrying real risk with no safety net — matters for your safety, because you can't safely use what you don't understand. The hype (revolutionary, the future, easy money) obscures the practical reality that you're interacting directly with programs holding real money, with full responsibility and risk and no intermediary to help you. Understanding this plain reality — beyond the hype — is the foundation for using these things safely, because it frames everything correctly: you're taking on direct interaction with financial smart contracts, which is powerful and risky, and which you need to understand and approach carefully. So understand Web3 and DeFi plainly: apps and financial services run on blockchains that you interact with directly using your wallet, carrying real risk with no safety net — the practical reality beneath the hype, and the foundation for using them safely.`,
          activity: {
            title: "Cut through the hype",
            prompt:
              "Think of Web3 or DeFi claims you've heard (revolutionary, the future of finance, easy passive income). For each, write the plain reality beneath the hype: you're interacting directly with smart contracts that hold real money, with full responsibility and no safety net. Then write one sentence, in your own plain words, of what DeFi actually means for your risk. Understanding what these things really are — beneath the hype — is the foundation for using them safely.",
          },
        },
        {
          title: "Smart contracts — programmable money",
          type: "TEXT",
          points: 10,
          body: `At the heart of Web3 and DeFi are smart contracts — programs that run on a blockchain and control money. Understanding what a smart contract is, and its double-edged nature, is essential, because interacting with smart contracts is what using crypto beyond holding actually means, and their nature explains both the power and the risk.

## What a smart contract is

A smart contract is a program that lives on a blockchain and runs automatically according to its code — often controlling and moving money (crypto) as part of what it does. Where a normal blockchain transaction just moves coins from A to B, a smart contract can do complex things: hold funds, swap tokens, lend and borrow, distribute rewards, run entire financial services — all automatically, according to its code, without a company operating it. This is "programmable money" — money and financial logic embodied in code that runs on the blockchain. When you use a DEX, a lending protocol, or most Web3 apps, you're interacting with smart contracts — sending transactions that trigger their code to do things (swap your tokens, take your deposit, etc.). Understanding that a smart contract is a program on the blockchain that runs automatically and often controls money is essential, because interacting with smart contracts is what using crypto beyond holding means, and it's the source of both DeFi's power and its risk.

## The double-edged nature

Smart contracts are powerfully double-edged. On one hand, they enable remarkable things — financial services without intermediaries, automatic and permissionless, open to anyone. On the other hand, their nature creates serious risks. They run exactly as coded, with no human judgement — if the code has a bug or flaw, it executes anyway, potentially losing funds, with no one to appeal to. They're often irreversible and unstoppable — once deployed and running, a smart contract typically can't be easily stopped or reversed, so a flaw or exploit can drain funds unstoppably. They can be malicious — a smart contract can be deliberately coded to steal from those who interact with it (a whole category of scam). And they're only as trustworthy as their code, which most users can't read — so you're often trusting code you can't evaluate. This double-edged nature — enabling powerful services while running automatically, irreversibly, and only as trustworthy as code you usually can't read — is the source of both DeFi's power and its risk. Understanding it frames the risk correctly: interacting with smart contracts means trusting automatic, irreversible code with your money.

## Interacting with smart contracts

Using crypto beyond holding means interacting with smart contracts — sending transactions that trigger their code, and often granting them permissions over your funds (next module). This interaction is powerful (it's how you use DeFi and Web3) and risky (you're trusting automatic, irreversible code that could be flawed or malicious, and often granting it access to your funds). The risks of interacting with smart contracts — that they run automatically and irreversibly, could be flawed or malicious, and often get permissions over your funds — are the core new risks of using crypto beyond holding, and much of this course is about understanding and managing them. Understanding that interacting with smart contracts is what using crypto beyond holding means, and that it carries these core new risks, frames the whole course: you're learning to interact with smart contracts (to use DeFi and Web3) safely, understanding and managing the risks of trusting automatic, irreversible code with access to your money. So understand smart contracts — programs on the blockchain that run automatically and control money, powerfully double-edged (enabling services while running irreversibly and only as trustworthy as their code), which you interact with (and grant permissions to) when using crypto beyond holding. This understanding frames the core new risks of using crypto — trusting automatic, irreversible, possibly-flawed-or-malicious code with your money — that the rest of this course teaches you to understand and manage.`,
          activity: {
            title: "Grasp the smart-contract risk",
            prompt:
              "In your own words, write what a smart contract is and why interacting with one is riskier than just holding crypto. Note the key risks: it runs automatically and irreversibly (a flaw executes anyway), it could be malicious, and you often grant it access to your funds — with no company to appeal to. Understanding that using DeFi means trusting automatic, irreversible code with your money frames the core new risks this course teaches you to manage.",
          },
        },
        {
          title: "Why the risk multiplies when you interact",
          type: "TEXT",
          points: 10,
          body: `The central safety message of this course is that interacting with the crypto world multiplies your risk far beyond simply holding. Understanding exactly why — the new ways to lose money that appear the moment you connect and interact — is essential, because it's the reason this whole course is safety-first, and the reason to approach using crypto with great care.

## Holding versus interacting

When you simply hold crypto (per Crypto From Zero), your main risks are losing your keys or being tricked into giving them away — real risks, but a limited set, and largely within your control (guard your keys). The moment you start interacting with the crypto world — connecting your wallet to applications, signing transactions and approvals, using smart contracts — you take on a whole new, much larger set of risks that don't exist when you just hold. Interacting means trusting smart contracts (which could be flawed or malicious), granting permissions over your funds (which could be exploited), signing things (which could authorise theft if you're tricked), and exposing yourself to the many risks of the applications and protocols you use. So interacting multiplies your risk far beyond holding: you go from a limited set of custody risks to a large set of interaction risks, most of which don't exist when you just hold. Understanding this multiplication of risk when you move from holding to interacting is the central safety insight of this course, and the reason to approach using crypto with great care.

## The new ways to lose money

Interacting with the crypto world opens many new ways to lose money that don't exist when you just hold. Malicious approvals — granting a smart contract permission over your funds that it then uses to drain them (a major risk, covered next module). Bad signatures — being tricked into signing something that authorises theft. Smart-contract exploits — a protocol you use being hacked or having a flaw that loses your funds. Malicious contracts — interacting with a deliberately malicious smart contract that steals from you. Scam applications — using a fraudulent app or protocol designed to drain you. Financial risks — losing money through the financial risks of what you're doing (bad trades, liquidations, unsustainable yields collapsing, and more, covered throughout). Bridge and cross-chain risks — losing funds to bridge hacks or failures. And more — the many risks of the specific things you do. These new ways to lose money — approvals, signatures, exploits, malicious contracts, scam apps, financial risks, bridge risks, and more — appear the moment you interact, multiplying your risk far beyond holding. Understanding that interacting opens all these new ways to lose money frames why using crypto requires great care and why this course is relentlessly safety-first.

## The safety-first imperative

The multiplication of risk when you interact is why this course is relentlessly safety-first, and why you should approach using crypto with great care. Because interacting opens so many new ways to lose money — with no safety net, no reversals, and no one to appeal to — using crypto beyond holding is genuinely risky, and most people who dive in unprepared eventually get hurt (drained by an approval, exploited by a protocol, scammed by an app, or wrecked by a financial risk they didn't understand). The safety-first imperative is to understand each of these risks and how to manage them before you take them on — which is exactly what this course teaches. It's also to approach using crypto with appropriate caution and skepticism, recognising the multiplied risk, rather than diving in chasing yields and hype. This safety-first approach — understanding and managing the multiplied risks of interacting, and approaching using crypto with great care — is the whole orientation of this course, because interacting with the crypto world genuinely multiplies your risk, and the difference between using crypto safely and becoming a cautionary tale is understanding and managing these risks before you take them. So internalise the central safety insight: interacting with the crypto world multiplies your risk far beyond holding, opening many new ways to lose money (approvals, signatures, exploits, malicious contracts, scam apps, financial risks, and more) with no safety net. This is why the course is safety-first, why you should approach using crypto with great care, and why the rest of this course teaches you to understand and manage each of these multiplied risks before you take them on.`,
          activity: {
            title: "Weigh the multiplied risk",
            prompt:
              "Write down the difference between the risks of just holding crypto (losing/giving away your keys) and the risks of interacting with it (malicious approvals, bad signatures, exploits, malicious contracts, scam apps, financial risks, bridge risks). Notice how interacting multiplies the ways to lose money — with no safety net. Then write one sentence committing to approach using crypto with care, understanding each risk before taking it. This multiplication of risk is why the whole course is safety-first.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on the foundations before we get into connecting your wallet and signing. These ideas — what Web3 and DeFi really are, smart contracts as programmable money, and how interacting multiplies your risk — frame the safety-first approach of the whole course.`,
          quiz: {
            title: "Beyond holding",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "What does DeFi mean, beneath the hype?",
                explanation:
                  "Financial services (trading, lending, earning) run by smart contracts on blockchains that you interact with directly using your own wallet — with no bank, no customer service, no reversals, and no safety net, so the risks and responsibility are entirely yours.",
                options: [
                  {
                    text: "Financial services run by smart contracts you interact with directly, with no safety net",
                    correct: true,
                  },
                  { text: "A guaranteed way to earn passive income", correct: false },
                  { text: "A bank that operates on the blockchain and insures you", correct: false },
                  { text: "A type of cryptocurrency you buy and hold", correct: false },
                ],
              },
              {
                prompt: "What makes smart contracts double-edged?",
                explanation:
                  "They enable powerful services without intermediaries, but they run exactly as coded (a bug executes anyway), are often irreversible and unstoppable, can be deliberately malicious, and are only as trustworthy as code most users can't read.",
                options: [
                  {
                    text: "They enable powerful services but run automatically and irreversibly, only as trustworthy as their code",
                    correct: true,
                  },
                  { text: "They're always perfectly safe and reversible", correct: false },
                  { text: "They're operated by companies with customer service", correct: false },
                  { text: "They can't hold or move money", correct: false },
                ],
              },
              {
                prompt: "Why does interacting with crypto multiply your risk beyond holding?",
                explanation:
                  "Holding has a limited set of custody risks (losing/giving away keys). Interacting opens many new ways to lose money — malicious approvals, bad signatures, exploits, malicious contracts, scam apps, financial risks, bridge risks — with no safety net.",
                options: [
                  {
                    text: "It opens many new ways to lose money that don't exist when you just hold",
                    correct: true,
                  },
                  { text: "It doesn't — interacting is safer than holding", correct: false },
                  { text: "Interacting removes all risk through smart contracts", correct: false },
                  { text: "The risk is exactly the same as holding", correct: false },
                ],
              },
              {
                prompt: "What should this course's central insight lead you to do?",
                explanation:
                  "Because interacting multiplies risk with no safety net, approach using crypto with great care — understanding and managing each risk before taking it on — rather than diving in chasing yields and hype. That's the safety-first imperative.",
                options: [
                  {
                    text: "Approach using crypto with great care, understanding each risk before taking it",
                    correct: true,
                  },
                  { text: "Dive in quickly to chase the best yields", correct: false },
                  { text: "Avoid crypto entirely and never learn about it", correct: false },
                  { text: "Trust that smart contracts will protect you", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },

    // =====================================================================
    {
      title: "Connecting your wallet to the world",
      description:
        "The gateway to everything and the source of much loss: what connecting and signing actually do, the hidden danger of token approvals, and how to read what you're authorising.",
      lessons: [
        {
          title: "What 'connect wallet' really does",
          type: "TEXT",
          points: 10,
          body: `The first step in using almost any Web3 app is "connect wallet" — and understanding what this actually does (and doesn't do) is essential to using crypto safely, because misunderstanding it leads to both needless fear and dangerous carelessness.

## Connecting versus authorising

When you "connect your wallet" to a Web3 app, you're granting the app permission to see your wallet address and public information, and to propose transactions and signatures for you to approve. Crucially, connecting alone doesn't give the app access to your funds or the ability to move your money — it lets the app see your address and request that you sign things, but you still have to approve each transaction or signature yourself for anything to happen. So connecting is relatively low-risk in itself: it lets an app see your public wallet info and propose actions, but it can't take your funds just from connecting; the risk comes from what you then approve. Understanding this distinction — that connecting lets an app see your address and propose actions, but can't move your funds without your approval of specific transactions or signatures — is essential, because it corrects both the needless fear (connecting alone can't drain you) and the dangerous carelessness (approving what the connected app proposes is where the risk is). The danger isn't connecting; it's what you approve after connecting.

## Why connecting still matters for safety

While connecting alone can't take your funds, it still matters for safety, because it's the gateway to the requests you'll then approve — and a malicious app you connect to will propose malicious transactions and signatures for you to approve. So although connecting itself is low-risk, connecting to a malicious or fraudulent app is the first step toward the malicious approvals and signatures that can drain you — the malicious app can't take your funds from connecting, but it will then propose the malicious approvals/signatures that can. This means being careful about what you connect to still matters: connecting to legitimate apps (and being wary of fraudulent ones) reduces your exposure to malicious requests, even though the connection itself is low-risk. Connecting matters for safety not because connecting drains you, but because it's the gateway to the requests you'll approve, and connecting to a malicious app leads to malicious requests. So be careful what you connect to (favouring legitimate apps, wary of fraudulent ones), while understanding that the real risk is in what you then approve, not the connection itself.

## Connecting safely

Using "connect wallet" safely involves a few principles. Understand what connecting does — it lets the app see your address and propose actions, but can't move your funds without your approval of specific requests (so connecting alone is low-risk, and the risk is in what you approve). Be careful what you connect to — favouring legitimate, verified apps and being wary of fraudulent ones (since a malicious app leads to malicious requests), verifying you're on the genuine app (not a fake/phishing version — a common scam). Scrutinise everything you approve after connecting — since that's where the real risk is (covered in the next lessons), carefully reviewing every transaction and signature the connected app proposes rather than blindly approving. And disconnect and manage connections — disconnecting from apps when done and being mindful of what you're connected to. Connecting safely — understanding what connecting does (low-risk gateway), being careful what you connect to (legitimate apps, verified genuine), scrutinising what you approve (where the real risk is), and managing your connections — lets you use Web3 apps while managing the risk correctly (which is in what you approve, not the connection). So understand "connect wallet" correctly: it lets an app see your address and propose actions but can't move your funds without your approval of specific requests, so connecting alone is low-risk and the real risk is in what you then approve. Be careful what you connect to (as the gateway to requests), and above all scrutinise everything you approve after connecting — because that's where using crypto safely is really won or lost.`,
          activity: {
            title: "Correct your mental model of connecting",
            prompt:
              "Write down what 'connect wallet' actually does (lets an app see your address and propose actions) and what it doesn't do (move your funds without your approval of specific requests). Note the correct takeaway: connecting alone is low-risk; the real risk is in what you approve afterward. Then note how you'll still be careful what you connect to (as the gateway to requests) while focusing your scrutiny on what you approve. Getting this mental model right is essential to using crypto safely.",
          },
        },
        {
          title: "Signing — transactions, approvals and messages",
          type: "TEXT",
          points: 10,
          body: `After connecting, apps ask you to sign things — and understanding the different kinds of signing, and what each authorises, is critical to safety, because signing the wrong thing is how many people get drained. Not all signatures are equal, and knowing the difference protects you.

## Signing is authorising

When an app asks you to "sign" something, you're using your wallet's private key to authorise something — and whatever you authorise then happens (or becomes possible). Signing is how anything happens with your wallet: your signature authorises transactions and permissions. This makes signing the critical safety moment — because whatever you sign, you authorise, and if you sign something malicious, you authorise your own robbery. The whole security of using crypto comes down to only signing things you understand and intend, because your signature is what makes things happen with your funds. Understanding that signing is authorising — that whatever you sign, you authorise — frames signing as the critical safety moment: the point where you either authorise something legitimate or, if tricked, authorise theft. This is why reading and understanding what you're signing (this and the next lessons) is so critical: your signature is your authorisation, and signing something malicious authorises your own loss.

## The kinds of signing

Not all signatures are equal; there are different kinds, authorising different things. Transactions — signing a transaction executes an action that costs a fee and does something on-chain (a swap, a transfer, a deposit); you're authorising and paying for that specific action. Approvals (allowances) — signing an approval grants a smart contract permission to spend your tokens up to some amount (covered in depth next lesson); this is especially risky because it grants ongoing access to your funds, and a malicious or excessive approval can drain you. Message signatures — signing a message (which is often free and doesn't execute an on-chain transaction) can authorise things too, and some malicious message signatures can authorise transfers or permissions that drain you, so "just signing a message" is not always safe. These kinds — transactions (authorising a specific action), approvals (granting ongoing spending access, especially risky), and message signatures (which can also authorise harmful things) — authorise different things, and knowing the difference matters, because some (especially approvals and certain message signatures) grant access that can drain you, not just execute one action. Understanding the different kinds of signing and what each authorises is critical, because the especially risky ones (approvals, certain message signatures) grant access to your funds that can be exploited, and knowing this protects you from signing something more dangerous than you realised.

## Signing safely

Signing safely comes down to only signing things you understand and intend, with special caution for the risky kinds. Only sign what you understand and intend — never signing something you don't understand or didn't intend, because your signature authorises it (if you don't understand what you're signing, don't sign it). Be especially cautious with approvals — understanding that an approval grants ongoing spending access to your funds (not just one action), so scrutinising approvals especially carefully (next lesson). Be cautious with message signatures too — not assuming "just a message" is safe, since some message signatures can authorise harmful things. Read what you're signing — actually reviewing what a transaction, approval, or message will do before signing (covered next lesson), rather than blindly approving. And be suspicious of unexpected or confusing signature requests — treating any signature request you don't understand or didn't expect as a potential attack, and not signing it. Signing safely — only signing what you understand and intend, with special caution for approvals and message signatures, reading what you're signing, and being suspicious of unexpected requests — protects you at the critical safety moment where your signature authorises things with your funds. So understand signing: it's authorising (whatever you sign, you authorise, making it the critical safety moment), it comes in different kinds (transactions, approvals, message signatures) that authorise different things (with approvals and certain message signatures being especially risky as they grant access to your funds), and it must be done safely (only signing what you understand and intend, with special caution for the risky kinds, reading what you sign, and refusing unexpected or confusing requests). This understanding of signing — the critical moment where your signature authorises things with your money — is essential to using crypto safely.`,
          activity: {
            title: "Learn the kinds of signing",
            prompt:
              "Write down the different kinds of signing and what each authorises: transactions (a specific action, costs a fee), approvals/allowances (ongoing permission for a contract to spend your tokens — especially risky), and message signatures (can also authorise harmful things — 'just a message' isn't always safe). Then write your rule: only sign what you understand and intend, with special caution for approvals and unexpected requests. Signing is the critical safety moment — your signature authorises things with your funds.",
          },
        },
        {
          title: "Token approvals and the hidden risk",
          type: "TEXT",
          points: 10,
          body: `Token approvals (allowances) are one of the biggest and least-understood risks in DeFi — a mechanism that's necessary for using it, but that has drained countless wallets. Understanding approvals, why they're risky, and how to manage them is essential to using crypto safely, because approval-related exploits are among the most common ways people lose funds.

## What an approval is

To let a smart contract use your tokens (for a swap, a deposit, etc.), you have to grant it an approval (or allowance) — permission for that contract to spend your tokens up to some amount. This is necessary for DeFi: contracts can't move your tokens without your permission, so you approve them to. But here's the hidden risk: an approval grants ongoing permission for the contract to spend the approved amount of your tokens, not just for one transaction — so once you've approved a contract, it can spend up to the approved amount of that token from your wallet, potentially at any later time, until you revoke the approval. This ongoing spending permission is the hidden risk: you're not just authorising one action, but granting the contract standing permission to spend your tokens, which it (or an exploit of it) could use later to drain the approved amount. Understanding that an approval grants ongoing spending permission — standing access to your tokens up to the approved amount, until revoked — is essential, because it's the source of a major, commonly-exploited risk in DeFi.

## Why approvals are so dangerous

Approvals are especially dangerous for several reasons. Unlimited approvals — many apps request (and users grant) unlimited approvals (permission to spend any amount of a token), which means the contract can drain all of that token from your wallet, not just a limited amount; this is common and very dangerous. Ongoing access — because approvals persist until revoked, a contract you approved long ago retains access to your tokens, so if that contract is later exploited or turns malicious, it can drain your approved tokens even much later. Malicious approvals — a major scam is tricking you into approving a malicious contract (which then drains the approved tokens), so a single malicious approval can empty your wallet of the approved token. Forgotten approvals — people accumulate many approvals over time and forget them, leaving standing access to their funds across many contracts, any of which could be exploited. And the exploitation of legitimate approvals — even approvals to legitimate contracts are risky if those contracts are later hacked, as the hack can use the approvals to drain users. These dangers — unlimited approvals granting total access, ongoing access that persists and can be exploited later, malicious approvals draining you, forgotten approvals leaving standing access, and the exploitation of even legitimate approvals — make approvals one of the biggest risks in DeFi, and among the most common ways people lose funds. Understanding why approvals are so dangerous is essential to managing this major risk.

## Managing approval risk

Managing approval risk is a critical safety skill. Grant limited approvals where possible — approving only the amount you need for a transaction rather than unlimited, so a contract can only ever spend what you approved (many wallets/apps let you customise the approval amount; use this to avoid unlimited approvals). Be very careful what you approve — scrutinising approval requests especially carefully (understanding you're granting spending access), and never approving contracts you don't trust or requests you don't understand. Revoke approvals you no longer need — using approval-checking/revoking tools (which show your active approvals and let you revoke them) to review and revoke standing approvals you no longer need, closing off the standing access; doing this periodically limits your exposure. Minimise standing approvals — keeping your active approvals few and limited, so you have minimal standing access granted to contracts at any time. And treat approvals as the serious risk they are — scrutinising them, limiting them, and revoking them, rather than blindly granting unlimited approvals and forgetting them. Managing approval risk — granting limited approvals, being careful what you approve, revoking unneeded approvals, minimising standing approvals, and treating approvals seriously — is a critical safety skill that protects you from one of the biggest and most commonly-exploited risks in DeFi. So understand and manage token approvals: they grant ongoing spending permission (the hidden risk), they're especially dangerous (unlimited approvals, ongoing and exploitable access, malicious and forgotten approvals), and they must be managed (limited approvals, careful approving, revoking unneeded ones, minimising standing access). This management of approval risk — one of the biggest and most-exploited risks in DeFi — is a critical part of using crypto safely, and neglecting it is how countless wallets have been drained.`,
          activity: {
            title: "Plan your approval hygiene",
            prompt:
              "Write your rules for managing token approvals: grant limited approvals (only what you need) rather than unlimited where possible; scrutinise every approval (you're granting ongoing spending access); periodically review and revoke approvals you no longer need (using an approval-checking tool); and keep your standing approvals few. Then, if you already use DeFi, commit to reviewing your active approvals soon. Approvals grant ongoing access to your funds and are among the most-exploited risks in DeFi — managing them is critical.",
          },
        },
        {
          title: "Reading what you're signing",
          type: "TEXT",
          points: 10,
          body: `The single most protective habit in using crypto is reading and understanding what you're signing before you sign it — because your signature authorises whatever it authorises, and blindly signing is how people authorise their own robbery. Developing the habit of reading what you sign, even when it's hard, is essential to safety.

## Blind signing is the core danger

The core danger in using crypto is blind signing — approving transactions, approvals, and signatures without understanding what they do. Because your signature authorises whatever you sign (and some signatures, like approvals, grant access to your funds), signing without understanding means you might authorise something harmful — a malicious approval, a bad transaction, a draining signature — without realising it. Blind signing is how many people get drained: they're tricked or careless, sign something malicious without reading it, and authorise their own robbery. The antidote is reading and understanding what you're signing before you sign — actually reviewing what a transaction, approval, or signature will do, and only signing if you understand and intend it. This habit — reading what you sign — is the single most protective thing you can do in using crypto, because it's what stops you from blindly authorising harmful things. Blind signing is the core danger; reading what you sign is the core protection. Developing the habit of always reading and understanding what you're signing, and never blindly signing, is essential to using crypto safely.

## How to read what you're signing

Reading what you're signing involves understanding what a signature request will do before approving it. For transactions — checking what action it performs (a swap, a transfer, a deposit), what it moves, and to/from where, so you understand and intend the action (and that it matches what you meant to do). For approvals — checking what token you're approving, to what contract, and for how much (especially watching for unlimited approvals and unfamiliar contracts), so you understand the access you're granting. For message signatures — being cautious about what a message signature might authorise (since some can be harmful), and not signing messages you don't understand. Wallets and tools increasingly help by showing what a signature request will do in more readable terms (and some warn of risky requests), so use these to understand what you're signing. Reading what you're signing — understanding what a transaction, approval, or message will do before approving it, using your wallet's information and any helpful tools — lets you catch harmful requests and only sign what you understand and intend. It can be hard (signature requests can be technical and confusing), which is exactly why the rule is: if you can't understand what you're signing, don't sign it — treating confusing or opaque signature requests as reasons not to sign, rather than signing blindly. Reading what you sign, and refusing to sign what you can't understand, is how you avoid blindly authorising harmful things.

## The habit that protects you

Making "read what you sign" a consistent habit is the single most protective practice in using crypto. This means always reviewing what you're signing before you sign it (never blindly signing), understanding transactions, approvals, and message signatures before approving them (catching harmful requests), refusing to sign what you can't understand (treating confusing requests as reasons not to sign), being especially careful with approvals and unexpected requests (the riskiest), and using your wallet's information and helpful tools to understand what you're signing. Making this a consistent habit — always reading and understanding what you sign, never signing blindly, and refusing what you can't understand — protects you from the core danger of blindly authorising harmful things, which is how many people get drained. It requires discipline (signature requests can be tedious and confusing, and it's tempting to just approve), but it's the single most important safety habit in using crypto, because it's what stands between you and blindly authorising your own loss. So develop the habit that protects you: always read and understand what you're signing before you sign it, never sign blindly, refuse to sign what you can't understand, be especially careful with approvals and unexpected requests, and use available tools to understand what you're signing. This habit — reading what you sign, and refusing to sign what you can't understand — is the single most protective practice in using crypto, standing between you and the blind signing that drains so many wallets. If you take one habit from this course, take this: read what you sign, and if you can't understand it, don't sign it.`,
          activity: {
            title: "Commit to reading what you sign",
            prompt:
              "Commit, in writing, to the single most protective habit in using crypto: always read and understand what you're signing before you sign it, never sign blindly, and — crucially — refuse to sign anything you can't understand (treat confusing or opaque requests as reasons NOT to sign). Note how you'll do it: checking what transactions do, what approvals grant (token, contract, amount), and being wary of unexpected requests. Reading what you sign is what stands between you and blindly authorising your own loss.",
          },
        },
        {
          title: "A signing safety plan",
          type: "ASSIGNMENT",
          points: 25,
          body: `Pull the wallet-connection and signing safety into one plan — your rules for connecting, signing, and managing approvals. Graded on how sound and protective the rules are.

Your instructor reads this. The best plans are cautious and specific — a conservative set of rules you'll actually follow beats a permissive one.`,
          assignment: {
            title: "Your signing and approval safety plan",
            instructions: `Write and submit your safety plan for connecting your wallet and signing — the rules that protect you at the critical moments.

Cover all five:

**1. Connecting.** Your rules for what you'll connect your wallet to (understanding connecting is a low-risk gateway, but being careful of fraudulent/fake apps), and verifying you're on genuine apps.

**2. Signing.** Your rules for signing — only signing what you understand and intend, refusing to sign what you can't understand or didn't expect, and understanding the kinds of signing (transactions, approvals, message signatures).

**3. Approvals.** Your rules for token approvals — granting limited (not unlimited) approvals where possible, scrutinising what you approve, and periodically revoking approvals you no longer need.

**4. Reading what you sign.** Your commitment to always reading and understanding what you sign before signing, and how you'll do it.

**5. Your riskiest moment.** The situation where you'd be most likely to sign something harmful (rushing, FOMO, an unexpected request), and how you'll guard against it.

Write it as rules you're committing to. The value is in how sound and protective they are.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Sound signing and approval rules",
                weight: 45,
                descriptor:
                  "Protective rules for signing (only what's understood and intended, refusing the unclear) and approvals (limited not unlimited, scrutinised, revoked) — the combination that guards against the biggest interaction risks.",
              },
              {
                criterion: "The read-what-you-sign habit",
                weight: 30,
                descriptor:
                  "A genuine commitment to always reading and understanding what's being signed, and refusing to sign what can't be understood — the single most protective habit.",
              },
              {
                criterion: "Self-aware about risk",
                weight: 25,
                descriptor:
                  "Honest identification of their riskiest moment (rushing, FOMO, unexpected requests) and a concrete guard against blindly authorising harm.",
              },
            ],
          },
        },
      ],
    },

    // =====================================================================
    {
      title: "Decentralised exchanges and trading",
      description:
        "How trading works without a broker: automated market makers and pools, slippage and price impact, liquidity providing and impermanent loss, and the real risks.",
      lessons: [
        {
          title: "How a DEX works",
          type: "TEXT",
          points: 10,
          body: `A decentralised exchange (DEX) lets you trade tokens without a broker or intermediary — through smart contracts. Understanding how a DEX actually works, especially the automated market maker model, is essential to using one safely and to understanding the risks that follow.

## Trading through smart contracts

A DEX lets you swap one token for another directly through smart contracts, without a company or broker in the middle — you connect your wallet, approve the tokens, and swap. Unlike a traditional exchange (which matches buyers and sellers through an order book run by a company), most DEXs use a different model: automated market makers (AMMs) with liquidity pools. Instead of matching buyers and sellers, an AMM DEX holds pools of token pairs (say, token A and token B) that people have deposited, and you trade against the pool — putting in token A and taking out token B, with the price determined automatically by a formula based on the pool's balances. This lets you trade any time against the pool, without needing a matching counterparty, all through smart contracts. Understanding that a DEX lets you trade through smart contracts (not a broker), and that most use the AMM/liquidity-pool model (trading against pools with automatic pricing) rather than order books, is the foundation for understanding how DEX trading works and its risks.

## The AMM and pools

The automated market maker model works through liquidity pools and a pricing formula. A liquidity pool holds a pair of tokens (deposited by liquidity providers — covered later), and when you swap, you add one token to the pool and remove the other, with the price set by a formula based on the pool's balances (typically, as you take more of one token, its price in the pool rises). This means the price you get depends on the pool's size and your trade's size relative to it: trading a small amount against a large pool gets a price close to the market, while trading a large amount against a small pool moves the price significantly against you (price impact, covered next). The AMM model — trading against pools with prices set automatically by a formula based on pool balances — is how most DEXs work, and understanding it explains key trading dynamics: the price depends on the pool, large trades move the price against you, and pool size matters. Understanding the AMM and pools — trading against token pools with automatic formula-based pricing — is essential to understanding DEX trading and its specific risks (slippage, price impact, and more).

## Using a DEX

Using a DEX involves connecting your wallet, approving the token you're swapping (recall approval risk), and executing the swap through the DEX's smart contracts. The safety considerations build on everything so far: you're interacting with smart contracts (which could be flawed or malicious — verify you're using a legitimate DEX, not a fake/scam one), you're granting approvals (manage them carefully), and you're signing transactions (read what you sign). Beyond these, DEX trading has its own specific risks — slippage and price impact, the risks of the tokens you trade, and more — covered in the next lessons. Using a DEX safely means applying the wallet and signing safety from the last module (legitimate DEX, careful approvals, reading what you sign) plus understanding the specific trading risks (next lessons). Understanding how a DEX works — trading through smart contracts, most using the AMM/liquidity-pool model with automatic pricing — is the foundation for using one safely and understanding its risks. So understand DEXs: they let you trade tokens through smart contracts without a broker, most using automated market makers (trading against liquidity pools with automatic formula-based pricing), and using one safely means applying your wallet/signing safety plus understanding the specific trading risks that the AMM model creates, which the next lessons cover.`,
          activity: {
            title: "Understand the DEX model",
            prompt:
              "In your own words, write how an AMM-based DEX works: you trade against a liquidity pool of token pairs, with the price set automatically by a formula based on the pool's balances (not by matching buyers and sellers). Note the key implication: your trade's size relative to the pool affects the price you get (large trades against small pools move the price against you). Understanding this model is the foundation for understanding DEX trading and the specific risks that follow.",
          },
        },
        {
          title: "Slippage, price impact and MEV",
          type: "TEXT",
          points: 10,
          body: `Three things affect what you actually get when trading on a DEX — slippage, price impact, and MEV — and understanding them protects you from getting a worse deal than you expected, sometimes much worse. These dynamics are specific to on-chain trading and catch many beginners.

## Price impact

Price impact is how much your own trade moves the price against you, based on your trade's size relative to the pool. Because of the AMM model (last lesson), trading a large amount against a pool moves the price as you trade — the more you buy, the higher the price goes, so you get a worse average price. For small trades against large pools, price impact is negligible; for large trades against small pools, it can be severe (you move the price significantly against yourself, getting far less than the market price). Price impact is especially dangerous with small, illiquid pools (recall illiquidity from the on-chain course): trading a meaningful amount against a small pool can cost you a large share of your value to price impact. Understanding price impact — that your trade moves the price against you based on its size relative to the pool — protects you from large, costly trades against small pools, and it's why pool size (liquidity) matters so much for the price you get. Watch price impact, especially with illiquid tokens, and avoid large trades against small pools.

## Slippage

Slippage is the difference between the price you expected and the price you actually get, because the price can change between when you submit a trade and when it executes (as others trade against the same pool). To manage this, DEXs let you set a slippage tolerance — the maximum price change you'll accept, beyond which your trade fails rather than executing at a bad price. Setting slippage tolerance is a safety trade-off: too low and your trade may fail (if the price moves more than your tolerance), too high and you risk executing at a much worse price than expected (and exposing yourself to exploitation, below). The danger is setting slippage tolerance too high (or a scam token forcing high slippage), which lets your trade execute at a much worse price than you expected. Understanding slippage — the difference between expected and actual price, managed by slippage tolerance — protects you: set a reasonable slippage tolerance (not too high), and be suspicious of trades or tokens that require very high slippage (a red flag for illiquidity or scams). Managing slippage tolerance sensibly protects you from executing at much worse prices than you expected.

## MEV and being exploited

MEV (maximal extractable value) refers to ways that others — often bots — can exploit your transactions for profit, at your expense. Because transactions are visible before they're finalised, sophisticated actors/bots can see your pending trade and act around it to profit at your cost — for example, front-running (trading ahead of you to profit) and sandwich attacks (trading just before and after your trade to profit from the price movement your trade causes, leaving you a worse price). This is a real, often-invisible cost of on-chain trading, especially for larger trades and higher slippage tolerances (which give more room for exploitation). While fully avoiding MEV is difficult, you can reduce your exposure: keeping slippage tolerance reasonable (not high, which invites sandwich attacks), being cautious with large trades (more attractive to exploit), being aware of the risk, and using protections some tools/DEXs offer against it. Understanding MEV — that bots can exploit your visible transactions (front-running, sandwich attacks) for profit at your expense, especially with large trades and high slippage — protects you by keeping slippage reasonable, being cautious with large trades, and being aware of this often-invisible cost. So understand what affects your DEX trades: price impact (your trade moves the price against you based on size relative to the pool — watch it, especially with illiquid pools), slippage (the gap between expected and actual price, managed by slippage tolerance — set it reasonably, be suspicious of trades requiring high slippage), and MEV (bots exploiting your visible transactions — keep slippage reasonable, be cautious with large trades). Understanding these three protects you from getting a worse deal than expected on a DEX, sometimes much worse, and they're specific risks of on-chain trading that catch many beginners.`,
          activity: {
            title: "Protect yourself on a DEX trade",
            prompt:
              "Write down how you'd protect yourself from the three DEX trading risks: price impact (avoid large trades against small/illiquid pools — check the price impact shown), slippage (set a reasonable slippage tolerance, be suspicious of trades requiring high slippage), and MEV (keep slippage reasonable and be cautious with large trades, since bots exploit visible transactions). Note the red flag: a token or trade requiring very high slippage. Understanding these protects you from getting a much worse deal than expected.",
          },
        },
        {
          title: "Liquidity providing and impermanent loss",
          type: "TEXT",
          points: 10,
          body: `DEXs let you become a liquidity provider — depositing tokens into a pool to earn fees — which is often promoted as easy passive income. But it carries a specific, poorly-understood risk called impermanent loss, and understanding it is essential before providing liquidity, because many providers end up worse off than if they'd just held.

## What liquidity providing is

The pools that DEXs trade against are supplied by liquidity providers (LPs) — people who deposit a pair of tokens into a pool, enabling others to trade against it. In return, LPs earn a share of the trading fees paid by those who trade against the pool. This is often promoted as passive income: deposit your tokens into a pool, earn fees from the trading. And it can genuinely earn fees. But it carries a specific risk — impermanent loss — that's frequently glossed over in the promotion, and that can leave LPs worse off than if they'd simply held their tokens. Understanding what liquidity providing is (depositing token pairs into a pool to earn a share of trading fees) is the start; understanding its specific risk (impermanent loss) is what you need before doing it, because the fees can be outweighed by impermanent loss, leaving you worse off than just holding.

## Impermanent loss

Impermanent loss is a loss LPs can suffer when the prices of the pooled tokens change relative to each other, compared to simply holding the tokens. Because of how AMM pools work (rebalancing as people trade against them), when the price of the pooled tokens diverges (one rises or falls relative to the other), the pool ends up with a composition that's worth less than if you'd simply held the two tokens outside the pool — that difference is impermanent loss. The larger the price divergence between the pooled tokens, the larger the impermanent loss. It's called "impermanent" because it reduces if prices return to their original ratio, but it becomes a real, permanent loss if you withdraw while prices have diverged. The key implication: as an LP, if the pooled tokens' prices diverge significantly, you can end up with less value than if you'd just held the tokens — and if this impermanent loss exceeds the fees you earned, you're worse off than simply holding. Understanding impermanent loss — the loss from pooled tokens' prices diverging, compared to holding — is essential, because it's the specific risk that can make liquidity providing worse than just holding, and it's frequently glossed over when LPing is promoted as easy passive income.

## Deciding whether to provide liquidity

Understanding impermanent loss lets you decide about liquidity providing with eyes open. The realistic picture: as an LP, you earn trading fees but risk impermanent loss (from the pooled tokens' prices diverging), and you're better off only if the fees you earn exceed the impermanent loss you suffer — which isn't guaranteed and often isn't the case, especially with volatile token pairs (where prices diverge a lot, causing large impermanent loss). So liquidity providing isn't the free passive income it's often promoted as; it's a strategy with a specific risk (impermanent loss) that can outweigh the fees, leaving you worse off than holding. Deciding whether to provide liquidity means weighing the fees against the impermanent-loss risk: it's less risky for stable, correlated pairs (whose prices don't diverge much, minimising impermanent loss) and much riskier for volatile, uncorrelated pairs (whose prices diverge a lot, causing large impermanent loss that often exceeds the fees). It also means understanding you can end up worse off than simply holding, and only providing liquidity if you understand and accept the impermanent-loss risk. So understand liquidity providing realistically: it earns trading fees but risks impermanent loss (from pooled tokens' prices diverging, compared to holding), you're better off only if fees exceed impermanent loss (not guaranteed, often not the case with volatile pairs), and it's frequently mis-promoted as easy passive income while glossing over the risk. Deciding whether to provide liquidity means weighing fees against impermanent-loss risk with eyes open, understanding you can end up worse off than holding — not treating it as the free income it's often sold as.`,
          activity: {
            title: "Understand impermanent loss before LPing",
            prompt:
              "In your own words, write what impermanent loss is (the loss from pooled tokens' prices diverging, compared to just holding them) and why it means liquidity providing isn't the free passive income it's often promoted as. Note the realistic picture: you earn fees but risk impermanent loss, and you're better off only if fees exceed that loss — often not the case with volatile pairs. Understanding impermanent loss is essential before providing liquidity, since many LPs end up worse off than if they'd simply held.",
          },
        },
        {
          title: "The risks of DEX trading",
          type: "TEXT",
          points: 10,
          body: `Beyond the mechanics, DEX trading carries a set of risks that make it more dangerous than it appears, especially for beginners. Understanding these risks together — and that DEXs enable trading anything, including scams — is essential to trading on a DEX safely, or deciding not to.

## Trading anything, including scams

A defining feature of DEXs is that they're permissionless — anyone can create a token and a trading pool, so you can trade almost any token, including outright scams. Unlike a regulated exchange that lists vetted assets, a DEX lets you trade any token anyone has created, with no vetting — which means the tokens available include countless scams: honeypots (you can buy but can't sell — recall the on-chain course), rug pulls, malicious tokens, and worthless tokens created to dump on buyers. This is a major risk: the ease of trading anything on a DEX means it's full of scam tokens, and beginners lured by hype into buying obscure tokens on DEXs frequently buy scams that trap or drain them. Understanding that DEXs let you trade anything, including scams (with no vetting), is essential, because it means you must vet tokens yourself (using the on-chain analysis skills — checking for honeypots, concentration, malicious contracts) before trading them on a DEX, rather than assuming an available token is safe. The permissionless nature that makes DEXs powerful also makes them full of scams, so the responsibility to avoid scam tokens is entirely yours.

## The stacked risks

DEX trading stacks several risks together. Smart-contract risk — you're using smart contracts (the DEX, and the token contracts) that could be flawed, exploited, or malicious (verify legitimate DEXs, and vet token contracts). Approval risk — you grant approvals to trade (manage them carefully — a malicious token or DEX could exploit approvals). Scam-token risk — the tokens you can trade include many scams (honeypots, rugs, malicious tokens) that you must vet yourself. Price impact and slippage — you can get a much worse price than expected, especially with illiquid tokens (watch price impact, set reasonable slippage). MEV — bots can exploit your trades (keep slippage reasonable, be cautious with large trades). Impermanent loss — if you provide liquidity (understand it can leave you worse off than holding). And the general risks of trading — the financial risk of the trades themselves (recall the risk-first trading course: most people lose trading, especially the volatile, illiquid tokens common on DEXs). These stacked risks — smart-contract, approval, scam-token, price impact/slippage, MEV, impermanent loss, and general trading risk — make DEX trading significantly risky, especially for beginners buying obscure, volatile, or scam-laden tokens. Understanding the stacked risks of DEX trading is essential to trading safely (managing each) or deciding it's not worth it.

## Trading on a DEX safely (or not)

Given the stacked risks, trading on a DEX safely — if you do it at all — requires managing all of them. Use legitimate DEXs (not fakes/scams), vet the tokens you trade (using on-chain analysis to avoid honeypots, rugs, and malicious tokens), manage approvals carefully, watch price impact and set reasonable slippage (especially with illiquid tokens), be cautious of MEV with large trades, understand impermanent loss if providing liquidity, and apply sound trading risk management (from the risk-first trading course — small position sizes, only risking what you can lose, given most people lose trading volatile tokens). And crucially, be very cautious about the obscure, hyped, volatile tokens that DEXs are full of — the ones beginners are lured into, which are disproportionately scams or terrible bets. Trading on a DEX safely means managing all the stacked risks and being very cautious about what you trade — or, quite reasonably, deciding that DEX trading (especially of obscure tokens) isn't worth the risk for you. Many people would be better off not trading obscure tokens on DEXs at all, given the stacked risks and the fact that most people lose trading. So understand the risks of DEX trading: DEXs let you trade anything including scams (vet tokens yourself), and DEX trading stacks many risks (smart-contract, approval, scam-token, price impact/slippage, MEV, impermanent loss, general trading risk). Trading safely means managing all these risks and being very cautious about what you trade — or reasonably deciding the risk isn't worth it, especially for the obscure hyped tokens DEXs are full of, given that most people lose trading and those tokens are disproportionately scams or bad bets.`,
          activity: {
            title: "Weigh the risks of DEX trading",
            prompt:
              "List the stacked risks of DEX trading: smart-contract, approval, scam-token (DEXs let you trade anything, including honeypots and rugs — you must vet tokens yourself), price impact/slippage, MEV, impermanent loss, and general trading risk. Then decide honestly: given these stacked risks (and that most people lose trading, especially the obscure hyped tokens DEXs are full of), would you trade on a DEX, and if so, with what cautions — or is it not worth the risk for you? Write your reasoning.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on DEXs and trading before we turn to lending and yield. These ideas — the AMM model, price impact/slippage/MEV, impermanent loss, and the stacked risks (including scam tokens) — are what you need to trade on a DEX safely or decide not to.`,
          quiz: {
            title: "DEXs and trading",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "How does an AMM-based DEX set prices?",
                explanation:
                  "Automatically, by a formula based on the balances of a liquidity pool you trade against — not by matching buyers and sellers. This means your trade's size relative to the pool affects the price you get.",
                options: [
                  {
                    text: "Automatically, by a formula based on the balances of a liquidity pool you trade against",
                    correct: true,
                  },
                  { text: "By a company matching buyers and sellers", correct: false },
                  { text: "By a government-set official price", correct: false },
                  { text: "Prices are fixed and never change", correct: false },
                ],
              },
              {
                prompt: "What is price impact on a DEX?",
                explanation:
                  "How much your own trade moves the price against you, based on its size relative to the pool. Large trades against small/illiquid pools can cost you a large share of your value — a key reason pool size (liquidity) matters.",
                options: [
                  {
                    text: "How much your own trade moves the price against you, based on size relative to the pool",
                    correct: true,
                  },
                  { text: "A fee the DEX charges for large trades", correct: false },
                  { text: "The impact of news on the token's price", correct: false },
                  { text: "It only affects other traders, not you", correct: false },
                ],
              },
              {
                prompt: "What is impermanent loss?",
                explanation:
                  "A loss liquidity providers can suffer when the pooled tokens' prices diverge, compared to simply holding them. If it exceeds the fees earned, the LP is worse off than just holding — which is often glossed over when LPing is sold as passive income.",
                options: [
                  {
                    text: "The loss from pooled tokens' prices diverging, versus just holding them",
                    correct: true,
                  },
                  { text: "A temporary fee that's always refunded", correct: false },
                  { text: "The guaranteed profit from providing liquidity", correct: false },
                  { text: "A loss only traders suffer, not liquidity providers", correct: false },
                ],
              },
              {
                prompt: "Why must you vet tokens yourself before trading on a DEX?",
                explanation:
                  "DEXs are permissionless — anyone can create a token and pool with no vetting — so the tradable tokens include countless scams (honeypots, rugs, malicious tokens). The responsibility to avoid them is entirely yours.",
                options: [
                  {
                    text: "DEXs let anyone list any token with no vetting, so many are scams",
                    correct: true,
                  },
                  { text: "DEXs already vet every token for safety", correct: false },
                  { text: "All tokens on DEXs are guaranteed legitimate", correct: false },
                  { text: "There's no way any token could be a scam", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },

    // =====================================================================
    {
      title: "Lending, borrowing and yield",
      description:
        "Where the 'passive income' lives and where much of it is a trap: how DeFi lending works, where yields genuinely come from, liquidation risk, and spotting unsustainable yields.",
      lessons: [
        {
          title: "DeFi lending and borrowing",
          type: "TEXT",
          points: 10,
          body: `A major part of DeFi is lending and borrowing — earning yield by lending your crypto, or borrowing against your crypto — through smart contracts instead of banks. Understanding how DeFi lending and borrowing works, especially over-collateralisation, is essential to using it safely and understanding its risks.

## Lending and borrowing through contracts

DeFi lending protocols let you lend your crypto (depositing it for others to borrow, earning interest) or borrow crypto (against collateral you provide) — all through smart contracts, without a bank. Lenders earn yield (interest paid by borrowers); borrowers get access to funds without selling their crypto (borrowing against it). This is done through smart contracts that hold the deposits, match lending and borrowing, and manage the terms automatically. The appeal: earn yield on your crypto by lending it, or borrow against your crypto without selling it, permissionlessly. The reality for safety: you're depositing your crypto into a lending smart contract (trusting the contract and the protocol), and if borrowing, taking on debt with specific risks (liquidation, below). Understanding that DeFi lending/borrowing works through smart contracts (lenders earn interest, borrowers borrow against collateral) is the foundation; understanding its specific mechanics (over-collateralisation) and risks (liquidation, and where the yield comes from) is what you need to use it safely.

## Over-collateralisation

A defining feature of most DeFi borrowing is over-collateralisation — you must deposit more value in collateral than you borrow. Because DeFi lending is permissionless and pseudonymous (no credit checks, no way to pursue defaulters), it protects lenders by requiring borrowers to over-collateralise: to borrow, you lock up crypto worth more than what you borrow (say, deposit $150 of crypto to borrow $100). This protects the protocol: if a borrower doesn't repay, the collateral covers the loan. It also means DeFi borrowing isn't like a normal loan (you can't borrow more than you have; you borrow against crypto you already own, locking up more than you take). Why would you over-collateralise to borrow? Common reasons: to get liquidity without selling your crypto (borrow against it, keeping your position), to leverage (borrow to buy more crypto — risky), or other strategies. The key safety point: over-collateralisation means your borrowing is backed by collateral worth more than the loan, and if your collateral's value falls too far relative to your loan, you face liquidation (next lesson) — your collateral being sold to repay the loan. Understanding over-collateralisation — that DeFi borrowing requires locking up more collateral than you borrow, backed by that collateral, with liquidation risk if the collateral value falls — is essential to understanding DeFi borrowing and its main risk.

## Using lending and borrowing safely

Using DeFi lending and borrowing safely builds on everything so far and adds the specific risks. For lending — you deposit crypto into a lending protocol to earn yield, trusting the protocol and its smart contracts (which could be exploited — a major risk, since lending protocols hold large sums and are targets), and earning a yield you should understand the source of (next lesson). For borrowing — you lock up over-collateralised crypto to borrow, taking on liquidation risk (if your collateral value falls too far, it's sold — next lesson) and the risks of what you do with the borrowed funds. Using both safely means: understanding you're trusting the protocol's smart contracts (use established, audited protocols, understanding even those carry smart-contract risk), understanding where any yield comes from (next lesson — is it sustainable?), and, if borrowing, managing liquidation risk carefully (next lesson). Using DeFi lending and borrowing safely means understanding the smart-contract risk (you're trusting the protocol), the yield source (for lending), and the liquidation risk (for borrowing), and managing each. So understand DeFi lending and borrowing: it works through smart contracts (lenders earn interest, borrowers borrow against over-collateralised crypto), it features over-collateralisation (locking up more than you borrow, with liquidation risk if collateral value falls), and using it safely means understanding the smart-contract risk, the yield source, and the liquidation risk. This understanding is the foundation for the yield and liquidation lessons that follow, which cover the specific risks that make DeFi lending and borrowing more dangerous than it appears.`,
          activity: {
            title: "Understand DeFi lending and borrowing",
            prompt:
              "In your own words, write how DeFi lending and borrowing works: lenders deposit crypto to earn yield, borrowers lock up MORE collateral than they borrow (over-collateralisation) and face liquidation if their collateral value falls too far. Note the safety points: you're trusting the protocol's smart contracts (which could be exploited), and borrowing carries liquidation risk. Understanding this is the foundation for understanding where yields come from and the liquidation risk — the specific dangers covered next.",
          },
        },
        {
          title: "Where does the yield come from?",
          type: "TEXT",
          points: 10,
          body: `The most important question to ask about any DeFi yield is: where does it actually come from? Because a yield's source determines whether it's sustainable and safe or a trap, and much of DeFi's promoted "passive income" comes from sources that are risky, unsustainable, or outright Ponzi-like. Learning to ask and answer this question is essential to not getting trapped.

## Yield has to come from somewhere

Any yield — any return you earn — has to come from somewhere; money doesn't appear from nothing. So the crucial question about any DeFi yield is: where does it actually come from? What is generating the return being paid to you? A yield from a genuine, sustainable source (real economic activity generating real returns) is very different from a yield from an unsustainable or Ponzi-like source (paid from new deposits, token printing, or unsustainable subsidies, destined to collapse). Because DeFi is full of promoted high yields, and because yield has to come from somewhere, asking where a yield comes from — and being skeptical of yields whose source you can't identify or that comes from unsustainable sources — is essential to avoiding traps. The mistake beginners make is chasing high yields without asking where they come from, and getting trapped when unsustainable yields collapse (as they inevitably do). Understanding that yield has to come from somewhere, and that the source determines whether it's sustainable, makes "where does this yield come from?" the essential question for any DeFi yield.

## The sources of yield

DeFi yields come from various sources, of very different quality. Genuine sources — real economic activity generating real returns: interest paid by real borrowers (in lending), trading fees from real trading (for liquidity providers), and other genuine economic activity. These are more sustainable (backed by real returns), though still carrying risks (smart-contract, and the underlying activity's risks). Token incentives/emissions — many high yields are paid in a protocol's own newly-printed tokens (emissions) to attract deposits; this yield depends on the token's value (if the token's price falls, the yield's real value collapses) and is often unsustainable (printing tokens to pay yield dilutes and eventually collapses). Much of the eye-popping "yield" in DeFi is this — subsidised by token printing, unsustainable, and destined to fall as the tokens are dumped. Ponzi-like sources — some yields are paid from new deposits (paying earlier depositors with later depositors' money), which is a Ponzi scheme destined to collapse when new deposits slow, taking later depositors' funds. Unsustainable subsidies — yields temporarily subsidised to attract deposits, which collapse when the subsidy ends. Understanding these sources — genuine (real economic returns, more sustainable), token emissions (dependent on token value, often unsustainable), Ponzi-like (paid from new deposits, destined to collapse), and unsustainable subsidies — lets you assess whether a yield is sustainable and safe or a trap. The key: genuine yields from real economic activity are more sustainable; yields from token printing, new deposits, or subsidies are often unsustainable traps.

## Assessing a yield's sustainability

Assessing whether a DeFi yield is sustainable and safe comes down to identifying its source and judging its quality. Ask where the yield comes from — what's actually generating the return (real economic activity, or token printing, or new deposits, or a subsidy)? Be very skeptical of very high yields — because genuine sustainable yields are usually modest (real economic returns are limited), a very high yield is a strong signal of an unsustainable or Ponzi-like source (token emissions, new deposits, subsidies), destined to collapse. Be wary of yields you can't explain — if you can't identify where a yield genuinely comes from, treat it as likely unsustainable or a trap (a yield with no clear genuine source is a red flag). Understand that unsustainable yields collapse — token-emission, Ponzi-like, and subsidised yields inevitably fall or collapse, often taking your funds, so chasing them is a trap. And prefer understood, sustainable yields — if you pursue yield at all, favouring yields from genuine, understandable sources at sustainable (modest) levels, rather than chasing high unsustainable ones. Assessing a yield's sustainability — identifying its source, being skeptical of very high yields, being wary of yields you can't explain, understanding that unsustainable yields collapse, and preferring genuine sustainable ones — protects you from the yield traps that are everywhere in DeFi. So always ask the essential question: where does this yield actually come from? Yield has to come from somewhere, and the source (genuine economic activity versus token printing, new deposits, or subsidies) determines whether it's sustainable or a trap. Be very skeptical of high yields (usually a sign of unsustainable sources), wary of yields you can't explain, and aware that unsustainable yields collapse — because chasing high, unsustainable DeFi yields without asking where they come from is one of the most common ways people lose money in DeFi.`,
          activity: {
            title: "Interrogate a yield's source",
            prompt:
              "Take a DeFi yield you've seen or could imagine (especially a high one). Ask the essential question: where does it actually come from? Work through the possibilities — genuine economic activity (real borrower interest, real trading fees — more sustainable), token emissions (printing tokens — often unsustainable), Ponzi-like (paid from new deposits — collapses), or a subsidy (ends). Write your assessment of whether it's sustainable or a trap. Very high yields usually signal unsustainable sources — asking where a yield comes from protects you from the traps everywhere in DeFi.",
          },
        },
        {
          title: "Liquidation risk",
          type: "TEXT",
          points: 10,
          body: `If you borrow in DeFi, liquidation is the risk that can wipe out your collateral suddenly, and it catches many borrowers off guard. Understanding liquidation risk — how it works and how to avoid it — is essential before borrowing, because being liquidated can cost you far more than you expected, fast.

## What liquidation is

When you borrow against over-collateralised crypto (last lessons), your collateral must stay worth sufficiently more than your loan. If your collateral's value falls too far relative to your loan (because the collateral's price drops, or your debt grows with interest), you cross a threshold and get liquidated — the protocol automatically sells your collateral to repay the loan, usually with a penalty. Liquidation protects the protocol (ensuring loans are repaid from collateral), but for you it means losing your collateral (sold, often at a bad time and with a penalty) suddenly and automatically when your collateral value falls too far. This is the main risk of DeFi borrowing: your collateral being automatically sold (at a loss and penalty) if its value falls too far relative to your loan. Understanding liquidation — that borrowing means your collateral gets automatically sold if its value falls too far relative to your loan — is essential before borrowing, because it's the risk that can suddenly cost you your collateral, and it catches many borrowers who didn't understand or monitor it.

## Why liquidation catches people out

Liquidation catches borrowers off guard for several reasons. Crypto is volatile — collateral values can drop sharply and quickly, pushing you toward liquidation faster than expected (a market drop can liquidate many borrowers at once). Cascading liquidations — when prices drop and many borrowers are liquidated at once, the forced selling can drive prices down further, causing more liquidations (a cascade), so liquidations can be especially severe in market drops. It's automatic and unforgiving — liquidation happens automatically when you cross the threshold, with no grace period or human judgement, so if you're not monitoring, it can happen before you react. Leverage amplifies it — borrowing to leverage (using borrowed funds to buy more crypto) means a smaller price drop can liquidate you, and leveraged positions are liquidated frequently in volatile markets. And penalties add cost — liquidation usually comes with a penalty, so you lose more than just the price drop. These factors — crypto's volatility (sharp drops), cascading liquidations (severe in market drops), the automatic and unforgiving nature (no grace period), leverage amplifying it (smaller drops liquidate you), and penalties — make liquidation a risk that catches many borrowers off guard, costing them their collateral suddenly and severely, especially in market drops. Understanding why liquidation catches people out is essential to avoiding it.

## Avoiding liquidation

Avoiding liquidation — if you borrow at all — requires careful management. Borrow conservatively — keeping your loan well below the maximum against your collateral (a large safety margin), so your collateral value can fall significantly before you're liquidated; the more conservative your borrowing (the larger your collateral buffer), the safer you are from liquidation. Account for crypto's volatility — recognising that collateral values can drop sharply, and keeping enough buffer to survive realistic large drops (not just small ones). Monitor your position — watching your collateral value and liquidation threshold, so you can add collateral or repay before being liquidated if your collateral falls (though in fast drops, you may not react in time — another reason for a large buffer). Be very cautious with leverage — understanding that leveraged borrowing (to buy more crypto) makes liquidation much more likely and is very risky (recall risk-first trading — leverage amplifies risk and causes ruin). And consider whether to borrow at all — recognising that DeFi borrowing carries real liquidation risk, and only borrowing if you understand and can manage it, conservatively. Avoiding liquidation — borrowing conservatively (large buffer), accounting for volatility, monitoring your position, being very cautious with leverage, and considering whether to borrow at all — protects you from the risk that can suddenly cost you your collateral. So understand liquidation risk: borrowing means your collateral is automatically sold (at a loss and penalty) if its value falls too far relative to your loan, it catches people out (crypto's volatility, cascading liquidations, automatic and unforgiving, amplified by leverage, with penalties), and avoiding it requires conservative borrowing (large buffer), accounting for volatility, monitoring, caution with leverage, and considering whether to borrow at all. This liquidation risk is the main danger of DeFi borrowing, and understanding and managing it — or not borrowing — is essential to using DeFi safely.`,
          activity: {
            title: "Plan against liquidation",
            prompt:
              "If you were to borrow in DeFi, write your rules to avoid liquidation: borrow well below the maximum (a large collateral buffer), so your collateral can fall significantly before liquidation; account for crypto's sharp volatility; monitor your position; and be very cautious with leverage (which makes liquidation far more likely). Then decide honestly whether DeFi borrowing's liquidation risk is worth it for you at all. Liquidation can suddenly cost you your collateral — understanding and managing it, or not borrowing, is essential.",
          },
        },
        {
          title: "Too good to be true — unsustainable yields",
          type: "TEXT",
          points: 10,
          body: `The most common way people lose money in DeFi is chasing yields that are too good to be true — high, unsustainable yields that collapse and take deposits with them. Learning to recognise and avoid unsustainable yields is one of the most protective skills in DeFi, because the promise of high passive income is the bait in most DeFi traps.

## Too good to be true usually is

The oldest financial wisdom applies fully in DeFi: if a yield seems too good to be true, it almost always is. High yields — far above what genuine, sustainable sources produce — are usually a sign of an unsustainable or Ponzi-like source (token emissions, new deposits, subsidies) destined to collapse, or of hidden risks you're not seeing. The promise of high passive income is the bait in most DeFi traps, luring people to deposit into schemes that collapse and take their funds. So the instinct to chase high yields is exactly backwards: the higher and more attractive the yield, the more suspicious you should be, because genuine sustainable yields are modest, and eye-popping yields signal unsustainable sources or hidden risks. "Too good to be true usually is" is one of the most protective principles in DeFi, because it counters the yield-chasing that leads to most DeFi losses. When you see a very high yield, your reaction should be skepticism and caution (where does this come from? what's the catch?), not excitement — because too-good-to-be-true yields are the bait in most traps, and chasing them is how most people lose money in DeFi.

## Recognising unsustainable yields

Recognising unsustainable yields — the too-good-to-be-true ones — protects you from the most common DeFi trap. Red flags of unsustainable yields include: very high yields (far above genuine sustainable returns — a strong signal of an unsustainable source or hidden risk); yields you can't explain the source of (if you can't identify a genuine source, it's likely unsustainable); yields paid in a protocol's own newly-printed tokens (dependent on the token's value, often unsustainable — the token gets dumped and the yield collapses); yields that seem to come from new deposits (Ponzi-like, destined to collapse); heavily promoted high yields (the promotion is the bait); and yields with pressure to deposit quickly (urgency is a manipulation flag). These red flags — very high yields, unexplained sources, token-emission yields, Ponzi-like structures, heavy promotion, and urgency — signal unsustainable yields destined to collapse. Recognising them, and being deeply skeptical of high, heavily-promoted, or unexplained yields, protects you from the most common DeFi trap: depositing into a high-yield scheme that collapses and takes your funds. The safest response to a too-good-to-be-true yield is to avoid it, because the downside (losing your deposit when it collapses) far outweighs the temporary high yield.

## Not chasing unsustainable yields

Protecting yourself means not chasing unsustainable yields — resisting the lure of high passive income and being deeply skeptical of too-good-to-be-true yields. This means being very skeptical of high yields (the higher, the more suspicious), always asking where a yield comes from and avoiding those you can't explain or that come from unsustainable sources, recognising the red flags (high, unexplained, token-emission, Ponzi-like, heavily-promoted, urgent), and understanding that unsustainable yields collapse and take deposits, so chasing them is a trap. It means, if you pursue yield at all, favouring only genuine, understandable, sustainable (modest) yields, and avoiding the high unsustainable ones that are the bait in most DeFi traps. And it means resisting the FOMO and greed that yield promotion is designed to trigger (recall the trading course on FOMO and greed) — the high yield is designed to lure you past your caution, and resisting that lure is protective. Not chasing unsustainable yields — being deeply skeptical of high yields, recognising the red flags, understanding that they collapse, favouring only genuine sustainable yields, and resisting the FOMO the promotion triggers — protects you from the most common way people lose money in DeFi. So internalise that too good to be true usually is: high, attractive yields are usually unsustainable (token emissions, Ponzi-like, subsidised) or hide risks, destined to collapse and take deposits. Recognise the red flags of unsustainable yields (high, unexplained, token-emission, Ponzi-like, heavily-promoted, urgent), be deeply skeptical of high yields, and don't chase them — because chasing too-good-to-be-true yields is the most common way people lose money in DeFi, and the promise of high passive income is the bait in most of its traps. If you take one protective principle for DeFi yields, take this: too good to be true usually is, so be deeply skeptical of high yields and don't chase them.`,
          activity: {
            title: "Guard against too-good-to-be-true yields",
            prompt:
              "Write your rule for high yields: too good to be true usually is, so a very high yield should trigger skepticism, not excitement. List the red flags you'll watch for (very high, unexplained source, paid in the protocol's own printed tokens, Ponzi-like, heavily promoted, urgency to deposit) and your response (avoid them, favour only genuine sustainable modest yields). Then note the FOMO/greed the promotion is designed to trigger, and how you'll resist it. Chasing too-good-to-be-true yields is the most common way people lose money in DeFi.",
          },
        },
        {
          title: "A yield evaluation",
          type: "ASSIGNMENT",
          points: 25,
          body: `Evaluate a real DeFi yield opportunity (or a representative one) for its source, sustainability, and risks. Graded on rigorous, skeptical evaluation.

Your instructor reads this. The point is a genuine, skeptical evaluation — concluding a yield is a likely trap is a perfectly good (often correct) result.`,
          assignment: {
            title: "Evaluate a DeFi yield",
            instructions: `Choose a DeFi yield opportunity — real (research one) or representative (a high yield you've seen promoted) — and evaluate it rigorously. Write it up.

Cover all five:

**1. The yield.** What the yield is, how high, and how it's presented/promoted.

**2. The source.** Your best analysis of where the yield actually comes from — genuine economic activity (real borrower interest, real trading fees), token emissions (printed tokens), Ponzi-like (new deposits), or a subsidy. If you can't identify a genuine source, say so.

**3. Sustainability.** Whether the yield is sustainable or likely to collapse, based on its source — and the red flags (very high, unexplained, token-emission, Ponzi-like, heavily-promoted, urgent).

**4. The risks.** The risks of pursuing this yield — smart-contract risk (trusting the protocol), the yield collapsing, liquidation (if borrowing is involved), and any others.

**5. Your verdict.** Whether you'd pursue this yield, avoid it, or need more information — with honest reasoning. Concluding it's a likely trap to avoid is a valid result.

Read public information only — never deposit real funds to 'test' a yield you're evaluating.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Rigorous source analysis",
                weight: 40,
                descriptor:
                  "A genuine effort to identify where the yield actually comes from, correctly distinguishing genuine economic sources from unsustainable ones (token emissions, Ponzi-like, subsidies) — the key question.",
              },
              {
                criterion: "Sound skepticism and risk assessment",
                weight: 35,
                descriptor:
                  "Appropriate skepticism toward high/unexplained yields, recognition of the red flags, and a sound assessment of the risks (smart-contract, collapse, liquidation).",
              },
              {
                criterion: "A well-reasoned verdict",
                weight: 25,
                descriptor:
                  "A verdict genuinely supported by the analysis — with 'avoid, likely a trap' being a valid and often correct conclusion for high unsustainable yields.",
              },
            ],
          },
        },
      ],
    },

    // =====================================================================
    {
      title: "Staking, stablecoins and bridges",
      description:
        "Three more building blocks and their risks: what staking really is, the types and dangers of stablecoins, cross-chain bridges (a favourite hacker target), and wrapped tokens.",
      lessons: [
        {
          title: "Staking and what it really is",
          type: "TEXT",
          points: 10,
          body: `Staking is one of the most common ways to earn yield in crypto, and one of the most misunderstood. Understanding what staking really is, its different forms, and their risks is essential to staking safely, because "staking" covers very different things with very different risk profiles.

## What staking actually is

In its genuine form, staking is locking up crypto to help secure a blockchain (that uses a proof-of-stake system) and earning rewards for doing so. Proof-of-stake blockchains rely on people staking the network's coins to validate transactions and secure the network, and they reward stakers with newly-issued coins and fees for this service. So genuine staking is: locking up a proof-of-stake blockchain's coins to help secure it, earning rewards for that service. This is a real economic activity with a genuine yield source (the network's rewards for securing it). But the word "staking" is used loosely for many things — genuine network staking, but also various DeFi products, lending dressed up as "staking," and outright scams using the term. So "staking" covers a range from genuine (securing a proof-of-stake network for rewards) to risky DeFi products to scams. Understanding what genuine staking actually is (securing a proof-of-stake network for rewards), and that "staking" is used loosely for many different things, is essential, because the risks vary enormously depending on what "staking" actually means in a given case.

## The forms and their risks

"Staking" comes in different forms with different risks. Genuine network staking — locking coins to secure a proof-of-stake network for rewards; risks include lock-up periods (your coins may be locked and illiquid for a time), slashing (in some networks, misbehaving validators lose some stake — relevant if you run or delegate to a validator), and the underlying coin's price risk. Staking through a service/exchange — staking via a platform that stakes for you; adds the risk of trusting that platform (custodial risk — they hold your coins) on top of staking risk. Liquid staking — staking via protocols that give you a token representing your staked position (keeping it liquid); adds smart-contract risk and the risk of the representing token (which can trade below the underlying value). DeFi "staking" products — various DeFi products called "staking" that may be lending, liquidity providing, or other activities with their own risks (and yields that may be unsustainable — recall the yield lessons); the term "staking" here can obscure what's really happening and its risks. And "staking" scams — schemes using "staking" as a lure that are actually Ponzi-like or outright scams (promising high "staking" rewards from unsustainable or fake sources). These forms — genuine network staking (lock-up, slashing, price risk), staking via a service (custodial risk), liquid staking (smart-contract and token risk), DeFi "staking" products (various risks, possibly unsustainable yields), and "staking" scams (Ponzi-like or fake) — carry very different risks, so understanding what "staking" actually means in a given case is essential to assessing its risk. The key: don't assume "staking" is safe or means one thing; understand what it actually is in each case.

## Staking safely

Staking safely means understanding what a given "staking" opportunity actually is and its specific risks. Understand what it actually is — is it genuine network staking, staking via a service, liquid staking, a DeFi product, or a scam? The risks depend entirely on this. Understand the yield source — for genuine network staking, the yield is the network's rewards (sustainable); for DeFi "staking" products, apply the yield analysis (is the yield sustainable, or unsustainable/Ponzi-like?). Understand the specific risks — lock-up periods (illiquidity), slashing (where relevant), custodial risk (staking via a service), smart-contract risk (liquid staking, DeFi products), the underlying coin's price risk, and scam risk (for dubious "staking" schemes). Be skeptical of high "staking" yields — as with all yields, high "staking" rewards signal unsustainable sources or scams (genuine network staking rewards are modest). And use legitimate, understood methods — staking through legitimate methods you understand, being wary of dubious high-yield "staking" schemes (often scams). Staking safely — understanding what a given "staking" actually is, its yield source, its specific risks, being skeptical of high yields, and using legitimate understood methods — protects you across the range of things "staking" can mean. So understand staking: genuinely, it's locking coins to secure a proof-of-stake network for rewards, but "staking" is used loosely for many things (network staking, staking services, liquid staking, DeFi products, and scams) with very different risks. Staking safely means understanding what a given "staking" actually is and its specific risks (lock-up, slashing, custodial, smart-contract, price, scam), being skeptical of high yields, and using legitimate understood methods — because "staking" covers everything from genuine network security to outright scams, and the risk depends entirely on which it actually is.`,
          activity: {
            title: "Clarify what a 'staking' offer really is",
            prompt:
              "Think of a 'staking' opportunity (real or promoted). Clarify what it actually is: genuine network staking (securing a proof-of-stake chain for rewards), staking via a service (custodial risk), liquid staking (smart-contract/token risk), a DeFi product (various risks, maybe unsustainable yield), or a scam? Write which, and its specific risks (lock-up, slashing, custodial, smart-contract, price, scam). Note that high 'staking' yields signal unsustainable sources or scams. 'Staking' covers very different things — its risk depends entirely on which it actually is.",
          },
        },
        {
          title: "Stablecoins — types and risks",
          type: "TEXT",
          points: 10,
          body: `Stablecoins — crypto designed to hold a steady value (usually pegged to a currency like the dollar) — are central to crypto and DeFi, and widely treated as safe. But different types of stablecoins carry different risks, and some have failed catastrophically. Understanding the types and their risks is essential, because "stable" doesn't mean "safe."

## Why stablecoins matter and the false sense of safety

Stablecoins aim to hold a steady value (typically pegged to the dollar), providing a stable unit within volatile crypto — used to trade, to hold value without volatility, and throughout DeFi (as the "cash" of crypto — recall the on-chain course). Because they aim to be stable, people treat them as safe — a safe haven from volatility. But this is a dangerous oversimplification: different types of stablecoins are backed differently and carry different risks, and some have failed catastrophically, losing their peg and much of their value. "Stable" refers to the intended steady value, not to safety — a stablecoin can lose its peg (de-peg) and become worth far less than intended, or fail entirely, depending on its type and backing. Understanding that stablecoins carry real risks that vary by type — that "stable" doesn't mean "safe" — is essential, because treating all stablecoins as safe (a common assumption) ignores real risks, and some stablecoins have collapsed, causing large losses to those who assumed they were safe. The false sense of safety around stablecoins is itself a risk.

## The types and their risks

Stablecoins come in types with different backing and risks. Fiat-backed (centralised) — backed by reserves of real currency/assets held by a company (each stablecoin backed by, say, a dollar in reserve); risks include trusting that the company genuinely holds sufficient reserves (reserve/transparency risk), the centralised issuer (who could freeze funds or fail), and regulatory risk. These are generally considered lower-risk if the issuer is reputable and reserves are genuine and sufficient, but they depend on trusting the issuer and its reserves. Crypto-backed — backed by crypto collateral (over-collateralised, since crypto is volatile), managed by smart contracts; risks include smart-contract risk, the collateral's volatility (a sharp crypto drop could undercollateralise it), and the mechanism's robustness. Algorithmic — attempting to hold the peg through algorithms and mechanisms rather than full backing; these are the riskiest and have failed catastrophically (an algorithmic stablecoin famously collapsed to near zero, causing massive losses), because their peg depends on mechanisms that can fail in a "death spiral" when confidence breaks. Understanding these types — fiat-backed (trust the issuer and reserves; generally lower-risk if reputable), crypto-backed (smart-contract and collateral-volatility risk), and algorithmic (riskiest, have collapsed) — and their different risks is essential, because the risk of a stablecoin depends heavily on its type and backing, and the riskiest (algorithmic, and dubious ones) can fail catastrophically.

## Using stablecoins wisely

Using stablecoins wisely means understanding that they carry risks varying by type, and choosing and using them accordingly. Understand the type and backing — knowing whether a stablecoin is fiat-backed (and whether the issuer and reserves are trustworthy), crypto-backed (smart-contract and collateral risk), or algorithmic (riskiest), so you understand its risk. Favour lower-risk stablecoins — generally, well-established fiat-backed stablecoins from reputable issuers with genuine, transparent, sufficient reserves are lower-risk, while algorithmic and obscure stablecoins are much riskier. Be wary of high yields on stablecoins — a high yield on a "stable" asset is a red flag (recall the yield lessons — where's the yield from, and is the stablecoin or the yield mechanism risky?); "stable, high yield" often hides real risk. Don't assume any stablecoin is perfectly safe — even reputable stablecoins carry some risk (issuer, reserves, regulatory, or mechanism), so not concentrating everything in one, and understanding that "stable" isn't "risk-free." And be especially wary of algorithmic and obscure stablecoins — given the catastrophic failures, treating algorithmic and unproven stablecoins as high-risk. Using stablecoins wisely — understanding the type and backing, favouring lower-risk (reputable fiat-backed) ones, being wary of high yields and of algorithmic/obscure stablecoins, and not assuming any is perfectly safe — protects you from the real risks that "stable" obscures. So understand stablecoins: they aim for steady value but carry real risks that vary by type (fiat-backed — trust issuer/reserves; crypto-backed — smart-contract/collateral risk; algorithmic — riskiest, have collapsed), and "stable" doesn't mean "safe." Use them wisely by understanding the type and backing, favouring lower-risk reputable ones, being wary of high yields and algorithmic/obscure stablecoins, and not assuming perfect safety — because stablecoins carry real, type-dependent risks, some have failed catastrophically, and the false sense of safety around them is itself a danger.`,
          activity: {
            title: "Assess a stablecoin's real risk",
            prompt:
              "Take a stablecoin (or the idea of one). Assess its real risk by type: is it fiat-backed (trust the issuer and reserves — lower-risk if reputable and transparent), crypto-backed (smart-contract and collateral-volatility risk), or algorithmic (riskiest — these have collapsed catastrophically)? Write its type and risks. Then note the red flags: high yields on a 'stable' asset, and algorithmic or obscure stablecoins. 'Stable' doesn't mean 'safe' — understanding the type and backing is essential.",
          },
        },
        {
          title: "Bridges and cross-chain risk",
          type: "TEXT",
          points: 10,
          body: `Bridges — which move assets between different blockchains — are essential infrastructure in a multi-chain crypto world, and they've been the target of some of the largest hacks in crypto history. Understanding bridges and their risks is essential to using them safely, because bridging is one of the riskier things you can do with your crypto.

## What bridges do

Because crypto spans many separate blockchains, and assets on one chain can't natively move to another, bridges exist to move assets across chains — letting you take an asset from one blockchain to another. Bridges typically work by locking your asset on the source chain and issuing a representation on the destination chain (or similar mechanisms), holding large amounts of assets in the process. This is essential infrastructure for a multi-chain world (moving assets between chains), and increasingly common as crypto spans more chains. But bridges are also one of the riskiest parts of crypto, because their mechanisms (holding large amounts of locked assets, with complex smart contracts spanning chains) have proven to be a favourite and lucrative target for hackers — some of the largest hacks in crypto history have been bridge hacks, draining hundreds of millions. Understanding what bridges do (move assets across chains, holding large locked amounts) and that they're one of the riskiest, most-hacked parts of crypto is essential, because bridging your assets exposes them to this significant risk.

## Why bridges are so risky

Bridges are especially risky for several reasons. They're lucrative hacker targets — bridges hold large amounts of locked assets, making them extremely attractive targets, and they've been hacked for enormous sums repeatedly (bridge hacks are among the largest in crypto history). Their complexity — bridges involve complex smart contracts and mechanisms spanning multiple chains, creating a large attack surface and many potential vulnerabilities (complexity breeds bugs and exploits). The concentration of risk — bridging concentrates your risk in the bridge's security (while your assets are bridged/locked, they're exposed to the bridge's vulnerabilities), so a bridge hack can take your bridged assets. The representation risk — the representation of your asset on the destination chain depends on the bridge's continued integrity (if the bridge is hacked or fails, the representation can become worthless). And the frequency of failures — bridges have been hacked and failed often enough that bridging is a genuinely high-risk activity, not a routine safe one. These factors — bridges being lucrative and frequent hacker targets holding large sums, their complexity and attack surface, the concentration of risk in the bridge's security, the representation risk, and the frequency of failures — make bridges one of the riskiest parts of crypto. Understanding why bridges are so risky is essential to treating bridging with the caution it deserves.

## Bridging safely (and minimising it)

Given the risks, using bridges safely means minimising and being cautious with bridging. Minimise bridging — bridging only when genuinely necessary, and not routinely or unnecessarily, since each bridging exposes your assets to bridge risk; the less you bridge, the less exposed you are. Use established, reputable bridges — favouring well-established, audited, battle-tested bridges over new or obscure ones (though even established bridges have been hacked, so this reduces but doesn't eliminate risk). Don't leave assets bridged/exposed longer than necessary — completing your bridging and moving assets to safety rather than leaving them exposed to bridge risk longer than needed. Bridge amounts you can afford to lose — recognising the real risk of loss, and not bridging more than you could afford to lose to a bridge hack. Be aware of the risk — treating bridging as a genuinely high-risk activity (given the history of massive bridge hacks), not a routine safe one, and being cautious accordingly. And consider alternatives — where possible, using alternatives to bridging (or minimising cross-chain activity) to reduce bridge exposure. Bridging safely — minimising bridging, using established bridges, not leaving assets exposed longer than necessary, bridging only amounts you can afford to lose, being aware of the real risk, and considering alternatives — protects you from one of the riskiest parts of crypto, though the risk can't be fully eliminated when you do bridge. So understand bridges and cross-chain risk: bridges move assets across chains (holding large locked amounts) and are one of the riskiest, most-hacked parts of crypto (lucrative hacker targets, complex, concentrating risk, with a history of massive hacks). Use them safely by minimising bridging, using established bridges, not leaving assets exposed, bridging only what you can afford to lose, and treating bridging as the genuinely high-risk activity it is — because bridging exposes your assets to one of crypto's most-exploited risks, and caution here protects you from potentially large losses.`,
          activity: {
            title: "Set your bridging rules",
            prompt:
              "Write your rules for bridging assets across chains, given that bridges are one of the most-hacked parts of crypto (some of the largest hacks ever): minimise bridging (only when necessary), use established/audited bridges, don't leave assets exposed longer than needed, bridge only amounts you could afford to lose, and treat bridging as genuinely high-risk. Then note whether you even need to bridge, or could avoid it. Bridging exposes your assets to one of crypto's biggest risks — caution here protects you from potentially large losses.",
          },
        },
        {
          title: "Wrapped and derivative tokens",
          type: "TEXT",
          points: 10,
          body: `DeFi is full of wrapped tokens and derivative tokens — tokens that represent other assets or positions — and they add layers of risk that are easy to overlook. Understanding what these tokens are and the risks of the layers they add is important to using DeFi safely, because each layer of representation adds risk.

## What wrapped and derivative tokens are

DeFi and crypto are full of tokens that represent something else. Wrapped tokens — tokens on one chain (or in one form) that represent an asset from another chain or form (for example, a token representing Bitcoin on a different blockchain, or a token representing an asset in a wrapped form usable in DeFi). Derivative/receipt tokens — tokens that represent a position or deposit elsewhere (for example, a token representing your deposit in a lending protocol, your staked position, or your liquidity in a pool). These tokens let assets and positions move and be used across DeFi (wrapping Bitcoin to use it in Ethereum DeFi, getting a token for your deposit that you can then use elsewhere), enabling much of DeFi's composability. But each such token is a representation that depends on something backing it, and that dependence adds risk. Understanding that DeFi is full of wrapped tokens (representing assets from elsewhere) and derivative/receipt tokens (representing positions/deposits) — tokens that represent something else — is the start; understanding the risks these layers of representation add is what matters for safety.

## The risks of the layers

Wrapped and derivative tokens add risk because each is a representation that depends on its backing and mechanism. The representation depends on the backing — a wrapped token is only as good as the mechanism holding the underlying asset (if that mechanism is compromised or fails, the wrapped token can lose its backing and value); a derivative/receipt token is only as good as the position it represents (if the underlying protocol is exploited or fails, the token can become worthless). The layers add risks — using a wrapped or derivative token means depending on the risks of the wrapping/representing mechanism (smart-contract risk, the custodian or bridge holding the underlying, the protocol's solvency) on top of the underlying asset's risks; each layer of representation adds a layer of risk. The de-pegging risk — wrapped and derivative tokens can trade below the value they're supposed to represent (de-peg) if confidence in their backing falls or the backing is impaired, so they don't always hold their intended value. The compounding of risk — DeFi often stacks these (a token representing a position that itself holds wrapped tokens, and so on), compounding the layers of risk, so complex DeFi positions can depend on many layers each adding risk. And the opacity — the layers can make it hard to see what a token really depends on and what risks it carries, so people use wrapped/derivative tokens without understanding the risks beneath them. These risks — the representation depending on its backing (which could fail), each layer adding risk, de-pegging risk, the compounding of stacked layers, and the opacity — mean wrapped and derivative tokens carry risks beyond the underlying asset, easy to overlook. Understanding the risks of these layers is important to using DeFi safely, because much of DeFi involves these representative tokens and their added risks.

## Using representative tokens carefully

Using wrapped and derivative tokens carefully means understanding what they represent and the risks the layers add. Understand what a token really represents — knowing what a wrapped or derivative token is backed by and depends on (the underlying asset and the mechanism representing it), rather than treating it as equivalent to the underlying without understanding the layer. Understand the added risks — recognising that each layer of representation adds risk (the backing mechanism's risk, smart-contract risk, de-pegging risk) on top of the underlying, so a wrapped/derivative token is riskier than the underlying asset it represents. Favour well-established, trusted representations — using well-established, battle-tested wrapped/derivative tokens with trusted backing over obscure or new ones (which are riskier). Be wary of stacked layers — recognising that complex DeFi positions stacking many representative tokens compound the layers of risk, so more complexity means more risk; keeping your positions understandable rather than stacking many layers you can't fully assess. And factor the layers into your risk — accounting for the added risks of representation when deciding what to use and how much to risk. Using representative tokens carefully — understanding what they represent and depend on, recognising the added risks of the layers, favouring well-established trusted ones, being wary of stacked layers, and factoring the layers into your risk — protects you from the easily-overlooked risks that wrapped and derivative tokens add. So understand wrapped and derivative tokens: DeFi is full of tokens representing other assets (wrapped) or positions (derivative/receipt), and each is a representation that depends on its backing and adds risk (the backing could fail, each layer adds risk, de-pegging is possible, stacked layers compound risk, and the opacity hides it). Use them carefully by understanding what they represent and depend on, recognising the added risks, favouring established trusted ones, being wary of stacked layers, and factoring the representation risk into your decisions — because these representative tokens are everywhere in DeFi and add real, easily-overlooked layers of risk beyond the underlying assets.`,
          activity: {
            title: "See through a representative token",
            prompt:
              "Take a wrapped or derivative token (a token representing another asset, like wrapped Bitcoin, or a receipt token for a deposit/staked/pooled position). Write down what it actually represents and depends on (the underlying asset and the mechanism backing it), and the added risks each layer brings (the backing could fail, smart-contract risk, de-pegging). Then note the danger of stacking many layers. Each layer of representation adds risk beyond the underlying asset — seeing through these tokens to what they depend on protects you.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on staking, stablecoins, bridges, and wrapped tokens before we turn to NFTs. These building blocks each add specific risks — understanding them (and that 'stable' and 'staking' don't mean 'safe') is essential to using crypto safely.`,
          quiz: {
            title: "Staking, stablecoins and bridges",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "Why can't you assume 'staking' means one safe thing?",
                explanation:
                  "'Staking' covers a range — genuine network staking (securing a proof-of-stake chain for rewards), staking via a service (custodial risk), liquid staking (smart-contract/token risk), DeFi products (various risks), and outright scams — with very different risks. You must understand what it actually is in each case.",
                options: [
                  {
                    text: "It covers everything from genuine network staking to DeFi products to scams, with very different risks",
                    correct: true,
                  },
                  { text: "Staking is always perfectly safe", correct: false },
                  { text: "Staking always means the same low-risk thing", correct: false },
                  { text: "Staking is always a scam", correct: false },
                ],
              },
              {
                prompt: "Why doesn't 'stable' mean 'safe' for stablecoins?",
                explanation:
                  "Different types are backed differently and carry different risks — fiat-backed (trust the issuer/reserves), crypto-backed (smart-contract/collateral risk), algorithmic (riskiest, have collapsed catastrophically). A stablecoin can de-peg or fail depending on its type and backing.",
                options: [
                  {
                    text: "Different types carry different risks, and some (algorithmic) have collapsed catastrophically",
                    correct: true,
                  },
                  { text: "All stablecoins are equally and perfectly safe", correct: false },
                  { text: "'Stable' guarantees the value can never change", correct: false },
                  { text: "Stablecoins have no risks at all", correct: false },
                ],
              },
              {
                prompt: "Why are bridges one of the riskiest parts of crypto?",
                explanation:
                  "They hold large locked amounts, making them lucrative hacker targets, and their complexity creates a large attack surface. Some of the largest hacks in crypto history have been bridge hacks, so bridging is a genuinely high-risk activity.",
                options: [
                  {
                    text: "They hold large locked sums and are complex, making them frequent, lucrative hacker targets",
                    correct: true,
                  },
                  { text: "They're the safest way to move assets", correct: false },
                  { text: "They can't be hacked", correct: false },
                  { text: "They don't actually move any assets", correct: false },
                ],
              },
              {
                prompt: "What risk do wrapped and derivative tokens add?",
                explanation:
                  "Each is a representation that depends on its backing and mechanism, so each layer adds risk (the backing could fail, smart-contract risk, de-pegging) beyond the underlying asset — and stacking many layers compounds the risk.",
                options: [
                  {
                    text: "Each layer of representation adds risk (backing failure, de-pegging) beyond the underlying asset",
                    correct: true,
                  },
                  { text: "They remove all risk from the underlying asset", correct: false },
                  { text: "They're always exactly as safe as the underlying", correct: false },
                  { text: "They add no risk whatsoever", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },

    // =====================================================================
    {
      title: "NFTs and digital ownership",
      description:
        "Cutting through the hype: what an NFT actually is, its real uses versus the speculation, the scams, and what digital ownership genuinely means and doesn't.",
      lessons: [
        {
          title: "What an NFT actually is",
          type: "TEXT",
          points: 10,
          body: `NFTs were surrounded by enormous hype and confusion. Cutting through to what an NFT actually is — and isn't — is essential to understanding them, because much of the hype and many of the losses came from misunderstanding what NFTs really are.

## The plain reality

An NFT (non-fungible token) is a unique token on a blockchain — unlike regular tokens (which are interchangeable, like currency), each NFT is unique and distinguishable. An NFT is essentially a unique entry on the blockchain that can represent ownership of, or association with, something — most famously digital art or collectibles, but potentially other things. The key plain reality, often misunderstood: an NFT is a unique token on the blockchain that points to or represents something (like a digital image), but what it actually confers depends entirely on what's attached to it and what rights (if any) come with it. Owning an NFT of an image typically means owning a unique blockchain token associated with that image — not necessarily owning the image's copyright, not necessarily controlling the image itself (which often lives elsewhere, not on the blockchain), and not necessarily anything beyond the token and whatever specific rights were granted. Understanding the plain reality — an NFT is a unique blockchain token that represents or points to something, with what it actually confers depending entirely on what's attached and what rights come with it — cuts through the hype and confusion, and is essential to understanding what you'd actually be getting (or not) with an NFT.

## What an NFT is not

Much NFT confusion and loss came from misunderstanding what an NFT is not. It's usually not ownership of the underlying content itself — owning an NFT of an image typically doesn't mean you own the image's copyright or control the image (which anyone can still copy and which often lives off-chain); you own a unique token associated with it, not usually the content or its rights. It's not inherently valuable — an NFT's value comes entirely from what it represents, what rights it confers, and what people will pay for it, not from being an NFT; most NFTs are worth little or nothing, despite the hype that any NFT is valuable. It's not necessarily permanent or secure in what it points to — the content an NFT points to often lives off-chain (on some server), so it can disappear or change if that off-chain storage fails, meaning the NFT can end up pointing to nothing. And it's not a guaranteed investment — despite the hype of NFTs as investments, most have lost most of their value, and treating NFTs as investments led to large losses. Understanding what an NFT is not — usually not ownership of the content or its rights, not inherently valuable, not necessarily permanent in what it points to, and not a guaranteed investment — is essential, because much of the NFT hype and loss came from believing NFTs were these things when they're not.

## Understanding NFTs clearly

Understanding NFTs clearly — as unique blockchain tokens whose actual value and meaning depend entirely on what's attached and what rights come with them — protects you from the hype and confusion that caused much NFT loss. It means recognising that an NFT is a unique token representing or pointing to something, with what it actually confers depending on the specifics (what's attached, what rights, where the content lives), rather than assuming an NFT confers ownership, value, or rights it may not. It means being clear that most NFTs are worth little (their value depends entirely on what they represent and what people will pay, and most represent little of value), so not assuming NFTs are valuable or good investments (most weren't). And it means understanding what you'd actually be getting with a specific NFT (the token, and what specific rights and content — if any — come with it), rather than the hyped version. Understanding NFTs clearly — as unique blockchain tokens whose value and meaning depend entirely on the specifics, most worth little, not inherently valuable ownership or investments — cuts through the hype and protects you from the misunderstanding that caused much NFT loss. So understand what an NFT actually is: a unique token on the blockchain that represents or points to something, with what it actually confers (ownership, rights, value) depending entirely on what's attached and what rights come with it — usually not ownership of the content or its copyright, not inherently valuable, not necessarily permanent in what it points to, and not a guaranteed investment (most lost most of their value). This clear understanding — cutting through the enormous hype and confusion — is essential to understanding NFTs and protecting yourself from the misunderstandings that caused much NFT loss.`,
          activity: {
            title: "Cut through the NFT hype",
            prompt:
              "Write down what an NFT actually is (a unique blockchain token that represents or points to something) and what it usually is NOT (ownership of the content or its copyright, inherently valuable, permanent in what it points to, or a guaranteed investment). Note the key point: what an NFT actually confers depends entirely on what's attached and what rights come with it — and most NFTs are worth little. Cutting through the hype to what NFTs really are protects you from the misunderstandings that caused much NFT loss.",
          },
        },
        {
          title: "Uses, hype and reality",
          type: "TEXT",
          points: 10,
          body: `NFTs were promoted with enormous hype as revolutionary and as investments, and the reality proved very different. Understanding the gap between the NFT hype and the reality — and the genuine (if narrower) uses — helps you approach NFTs sensibly rather than being caught by hype.

## The hype

At their peak, NFTs were surrounded by extraordinary hype: promoted as a revolution in ownership, art, and value; as guaranteed investments that would keep rising; as a way to get rich; and as the future of everything from art to gaming to identity. Huge sums were paid for NFTs (some for enormous prices), and the hype drove a frenzy of speculation, with people buying NFTs expecting to flip them for profit. The hype presented NFTs as inherently valuable, as sure investments, and as revolutionary — driving many to buy into the frenzy. This hype, like much crypto hype, was driven by speculation, promotion (much of it by those who profited from selling into the hype), and FOMO, and it drove NFT prices and activity to frenzied heights. Understanding the NFT hype — the extraordinary promotion of NFTs as revolutionary, as guaranteed investments, and as a way to get rich, driving a speculative frenzy — is the start; understanding how the reality differed is what protects you from such hype.

## The reality

The reality of NFTs proved very different from the hype. Most NFTs lost most of their value — after the frenzy, the vast majority of NFTs collapsed in value, and most people who bought NFTs as investments lost heavily (the "guaranteed investments" mostly weren't). The speculation collapsed — the speculative frenzy, like most bubbles, deflated, leaving most NFTs worth a fraction of their peak or nothing, and many holders with large losses. The "revolution" was mostly overblown — while NFTs have some genuine uses (below), the revolutionary claims were largely hype, and NFTs didn't transform everything as promised. And the frenzy was full of scams and manipulation — the hype-driven frenzy attracted many scams, wash trading (faking NFT prices and volume — recall the on-chain course), and manipulation, harming many buyers. The reality — most NFTs losing most of their value, the speculation collapsing, the revolution being overblown, and the frenzy being full of scams — was very different from the hype, and it caused large losses to those who bought into the hype. Understanding this gap between hype and reality — that the hyped NFTs mostly collapsed and most buyers lost — is essential to approaching NFTs sensibly and not being caught by such hype (in NFTs or the next hyped thing).

## The genuine uses and a sensible approach

Beyond the hype and collapse, NFTs do have some genuine (if narrower) uses, and understanding them alongside a sensible, skeptical approach helps you engage with NFTs (if at all) wisely. Genuine uses include: digital art and collectibles (a genuine, if speculative, use — people do value owning unique digital items, though most have little value); potentially, representing ownership or access to various things (tickets, memberships, in-game items, and other uses being explored), where an NFT genuinely represents something useful; and other emerging uses. These genuine uses are narrower and more modest than the hype claimed, and most NFTs still represent little of value. A sensible approach to NFTs, given the hype-reality gap, is deeply skeptical and cautious: not treating NFTs as guaranteed investments (most lost value), being very wary of hyped NFTs and speculative frenzies (which mostly collapse), understanding that most NFTs are worth little, engaging with NFTs (if at all) for their genuine value to you (not as investments or from FOMO), and being alert to the scams and manipulation common in NFTs. A sensible, skeptical approach — recognising the narrow genuine uses while being deeply cautious of the hype, not treating NFTs as investments, understanding most are worth little, and being alert to scams — lets you engage with NFTs wisely (if at all) rather than being caught by hype. So understand the gap between NFT hype and reality: NFTs were hyped as revolutionary guaranteed investments, but the reality was that most lost most of their value, the speculation collapsed, and the frenzy was full of scams. NFTs have some genuine (narrower) uses (digital collectibles, representing access/ownership of things), but a sensible approach is deeply skeptical — not treating NFTs as investments, understanding most are worth little, being wary of hype and frenzies, and engaging (if at all) for genuine value while being alert to scams. This understanding of the hype-reality gap protects you from being caught by NFT hype (and the next hyped thing), and helps you approach NFTs sensibly.`,
          activity: {
            title: "Separate NFT hype from reality",
            prompt:
              "Write down the NFT hype (revolutionary, guaranteed investments, a way to get rich) versus the reality (most lost most of their value, the speculation collapsed, the frenzy was full of scams). Then note the genuine but narrower uses (digital collectibles, representing access/ownership) and a sensible approach: deeply skeptical, not treating NFTs as investments, understanding most are worth little, wary of hype and scams. Understanding this gap protects you from NFT hype — and the next hyped thing.",
          },
        },
        {
          title: "NFT scams and risks",
          type: "TEXT",
          points: 10,
          body: `The NFT space, especially during the frenzy, was full of scams and specific risks that caught many buyers. Understanding the common NFT scams and risks is essential to engaging with NFTs safely (if at all), because NFT-specific scams drained many people.

## The common NFT scams

NFTs attracted many scams, especially during the hype. Fake and copied NFTs — scammers create NFTs copying real art or collections (or fake versions of popular collections) and sell them to buyers who think they're getting the real thing. Rug pulls — NFT projects that hype a collection, sell it, then abandon it (taking the money and leaving the NFTs worthless), a very common NFT scam. Wash trading and fake prices — faking NFT sales and prices (trading NFTs between controlled wallets to inflate apparent prices and volume — recall the on-chain course) to lure buyers into thinking NFTs are more valuable and traded than they are. Pump-and-dumps — hyping an NFT collection to pump its price, then dumping on buyers (recall the on-chain course). Phishing and wallet-draining scams — using fake NFT offers, mints, or airdrops to trick people into connecting wallets and signing malicious approvals/transactions that drain them (recall the signing and approval risks — NFTs are a common vector for these). And fake mints and sites — fake NFT minting sites or offers that steal funds or drain wallets when you interact. These common NFT scams — fake/copied NFTs, rug pulls, wash trading and fake prices, pump-and-dumps, phishing/wallet-draining, and fake mints/sites — drained and defrauded many during the NFT frenzy. Understanding them is essential to engaging with NFTs safely (if at all).

## The specific NFT risks

Beyond scams, NFTs carry specific risks. Wallet-draining through NFT interactions — engaging with NFTs (minting, buying, accepting offers, interacting with NFT sites) involves connecting wallets and signing, which is a common vector for the malicious approvals and signatures that drain wallets (recall the signing/approval risks — many wallet drains happen through NFT-related interactions), so NFT interactions carry the wallet-draining risk acutely. The worthlessness risk — most NFTs are worth little or nothing, so buying NFTs (especially as investments) carries a high risk of the NFT being or becoming near-worthless (most did). The illiquidity risk — many NFTs are illiquid (hard to sell), so even a "valuable" NFT may be hard to sell for what you paid. The off-chain dependence — the content an NFT points to often lives off-chain, so it can disappear if that storage fails, leaving the NFT pointing to nothing. And the manipulation risk — NFT prices are easily manipulated (wash trading, pumps), so apparent NFT values are often fake, and buying based on them leads to loss. These specific risks — acute wallet-draining through NFT interactions, the worthlessness of most NFTs, illiquidity, off-chain dependence, and manipulation — make NFTs risky beyond just the scams. Understanding them is essential to engaging with NFTs safely.

## Engaging with NFTs safely (if at all)

Given the scams and risks, engaging with NFTs safely — if you do at all — requires real caution. Apply your wallet/signing safety acutely — since NFT interactions are a common wallet-draining vector, being especially careful with what you connect to, sign, and approve when dealing with NFTs (verifying legitimate sites, reading what you sign, being wary of NFT offers/mints/airdrops that could be draining scams). Verify authenticity — checking that an NFT is genuine (the real collection/art, not a fake/copy) before buying, using the collection's official sources. Be deeply skeptical of hype and prices — recognising that NFT prices are easily manipulated and most NFTs are worth little, so not buying based on hyped or manipulated prices, and not treating NFTs as investments. Be wary of the common scams — recognising rug pulls, fake mints, phishing offers, and other NFT scams, and avoiding them. Only risk what you can afford to lose — given most NFTs lose value, only spending on NFTs what you could afford to lose entirely. And engage for genuine value, not speculation — if engaging with NFTs at all, doing so for genuine value to you (a collectible you actually want), not as an investment or from FOMO. Engaging with NFTs safely — applying wallet/signing safety acutely, verifying authenticity, being deeply skeptical of hype and prices, being wary of scams, only risking what you can afford to lose, and engaging for genuine value not speculation — protects you from the scams and risks that drained many in NFTs. So understand NFT scams and risks: NFTs attracted many scams (fake NFTs, rug pulls, wash trading, pump-and-dumps, phishing/wallet-draining, fake mints) and carry specific risks (acute wallet-draining through interactions, most being worthless, illiquidity, off-chain dependence, manipulation). Engage with NFTs safely (if at all) by applying wallet/signing safety acutely, verifying authenticity, being deeply skeptical of hype and prices, being wary of scams, only risking what you can afford to lose, and engaging for genuine value not speculation — because NFT-specific scams and risks drained many, and caution is essential.`,
          activity: {
            title: "Prepare against NFT scams",
            prompt:
              "List the common NFT scams (fake/copied NFTs, rug pulls, wash trading/fake prices, pump-and-dumps, phishing and wallet-draining offers, fake mint sites) and the specific risks (acute wallet-draining through NFT interactions, most NFTs worthless, illiquidity, off-chain dependence, manipulation). Then write your rules for engaging with NFTs safely (if at all): apply signing/approval safety acutely, verify authenticity, be skeptical of hype/prices, only risk what you can afford to lose, engage for genuine value not speculation. NFT interactions are a common way wallets get drained.",
          },
        },
        {
          title: "Digital ownership and its limits",
          type: "TEXT",
          points: 10,
          body: `NFTs raised genuine questions about digital ownership — what it means to "own" something digital — and understanding both the genuine idea and its real limits helps you think clearly about NFTs and digital ownership beyond the hype. This lesson steps back to the concept, cutting through both the hype and the cynicism.

## The genuine idea

Behind the NFT hype was a genuine idea worth understanding: blockchains enable a form of verifiable digital ownership — a way to have a unique, verifiable, transferable record of owning or being associated with a digital item, which is genuinely novel. Before this, digital items were infinitely copyable with no way to own a distinct "original," but a blockchain token can be a unique, verifiable, transferable record associated with a digital item, enabling something like ownership of a distinct digital item (or a verifiable association with it). This genuine idea — verifiable, unique, transferable digital ownership records via blockchain tokens — is real and potentially useful (for digital collectibles, representing ownership or access to things, and other uses being explored). Understanding the genuine idea behind NFTs — that blockchains enable a novel form of verifiable, unique, transferable digital ownership records — cuts through the cynicism (NFTs aren't purely worthless nonsense; there's a genuine, if narrower, idea) as well as the hype (the idea is real but far narrower and more modest than the hype claimed). The genuine idea is worth understanding, even as its hype was overblown and its limits are real.

## The real limits

But digital ownership via NFTs has real limits that the hype obscured. You don't usually own the content or its rights — owning an NFT typically means owning a unique token associated with a digital item, not owning the item's copyright or controlling it (anyone can still copy the image), so "ownership" here is a specific, limited thing (a verifiable token association), not full ownership of the content or its rights. The ownership depends on the system — your NFT "ownership" is meaningful within the blockchain system and among those who recognise it, but it doesn't give you control over the content in the wider world (you own a token; the image can still be copied and used by anyone). The content often isn't on-chain — the digital item an NFT points to often lives off-chain, so what you "own" (the token) points to something outside the blockchain that can change or disappear, limiting the ownership's substance. The value and meaning are socially dependent — an NFT's ownership matters only insofar as people recognise and value it, so its meaning and value depend on social recognition (which the hype inflated and the collapse deflated). And the "ownership" can be less than it seems — given these limits, NFT "ownership" is often a narrower, more limited thing than "owning" suggests (a verifiable token association, meaningful within a system, not full control of the content). These real limits — usually not owning the content or its rights, ownership depending on the system, content often off-chain, value being socially dependent, and the ownership being narrower than it seems — mean digital ownership via NFTs is a real but limited thing, far more modest than the hype claimed. Understanding these limits is essential to thinking clearly about NFTs and digital ownership.

## Thinking clearly about digital ownership

Understanding both the genuine idea and its real limits lets you think clearly about NFTs and digital ownership, beyond both hype and cynicism. It means recognising the genuine idea (blockchains enable novel verifiable, unique, transferable digital ownership records, potentially useful) while understanding its real limits (usually not owning the content/rights, ownership depending on the system and social recognition, content often off-chain, and the ownership being narrower than it seems). It means neither dismissing NFTs as purely worthless (there's a genuine, if narrow, idea) nor buying the hype (the idea is far more modest and limited than claimed). It means understanding what NFT "ownership" actually is and isn't (a verifiable token association, meaningful within a system, not full control of the content) so you can assess NFTs realistically. And it means thinking clearly about where verifiable digital ownership genuinely adds value (for some uses) versus where it's hype (for most speculative NFTs). Thinking clearly about digital ownership — recognising the genuine idea and its real limits, avoiding both cynicism and hype, understanding what NFT ownership actually is, and assessing where it genuinely adds value — lets you engage with NFTs and digital ownership sensibly, beyond the hype and confusion. So understand digital ownership and its limits: NFTs embody a genuine idea (verifiable, unique, transferable digital ownership records via blockchain) that's real and potentially useful, but with real limits (usually not owning the content or rights, ownership depending on the system and social recognition, content often off-chain, and the ownership being narrower than it seems). Thinking clearly about digital ownership — recognising the genuine idea and its real limits, beyond both hype and cynicism — lets you assess NFTs and digital ownership realistically, understanding what they genuinely offer (a novel but limited form of verifiable digital ownership, useful for some things) versus the hype (which vastly overstated it). This clear thinking about digital ownership is the mature understanding of NFTs beyond the frenzy: a real but limited and modest idea, worth understanding clearly rather than through hype or cynicism.`,
          activity: {
            title: "Think clearly about digital ownership",
            prompt:
              "Write down the genuine idea behind NFTs (blockchains enable verifiable, unique, transferable digital ownership records — novel and potentially useful) and its real limits (you usually don't own the content or its rights, the ownership depends on the system and social recognition, the content is often off-chain). Then note the clear-thinking conclusion, beyond both hype and cynicism: NFT ownership is a real but limited and modest thing. Understanding what digital ownership genuinely is and isn't lets you assess NFTs realistically.",
          },
        },
        {
          title: "An NFT reality check",
          type: "ASSIGNMENT",
          points: 25,
          body: `Apply clear thinking to NFTs — an honest reality check on what they are, their risks, and how you'd engage (if at all). Graded on clear, skeptical thinking beyond both hype and cynicism.

Your instructor reads this. The point is genuine clear thinking about NFTs — 'I wouldn't engage with NFTs' is a perfectly valid, well-reasoned conclusion.`,
          assignment: {
            title: "Your NFT reality check",
            instructions: `Write and submit an honest reality check on NFTs — clear thinking about what they are and how you'd engage.

Cover all five:

**1. What an NFT actually is.** Your clear understanding of what an NFT is (a unique blockchain token representing/pointing to something) and what it usually isn't (ownership of the content/rights, inherently valuable, a guaranteed investment).

**2. Hype versus reality.** The gap between the NFT hype (revolutionary, guaranteed investments) and the reality (most lost most of their value, the speculation collapsed, scams were rife).

**3. The scams and risks.** The main NFT scams (fake NFTs, rug pulls, wash trading, phishing/wallet-draining) and specific risks (acute wallet-draining through interactions, most worthless, illiquidity, off-chain dependence, manipulation).

**4. Digital ownership.** Your clear thinking on what digital ownership via NFTs genuinely offers (a real but limited, novel form) and its real limits — beyond both hype and cynicism.

**5. Your approach.** Whether and how you'd engage with NFTs — with honest reasoning. 'I wouldn't engage' is a valid, well-reasoned conclusion; if you would, your safety rules.

Read public information only — never interact with NFT sites/offers with real funds to 'test' them.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Clear understanding beyond hype",
                weight: 40,
                descriptor:
                  "A clear, accurate understanding of what NFTs are and aren't, and the hype-reality gap — cutting through both hype and cynicism.",
              },
              {
                criterion: "Sound grasp of scams and risks",
                weight: 35,
                descriptor:
                  "Real understanding of the NFT scams and specific risks (especially the acute wallet-draining vector), and how to guard against them.",
              },
              {
                criterion: "A well-reasoned approach",
                weight: 25,
                descriptor:
                  "A genuinely reasoned approach to NFTs — with 'I wouldn't engage' being a valid conclusion, and any engagement paired with sound safety rules.",
              },
            ],
          },
        },
      ],
    },

    // =====================================================================
    {
      title: "The risks and how to survive them",
      description:
        "Pulling the dangers together: smart-contract risk and audits, the scams of DeFi and Web3, the protective habits that actually work, and what to do when something goes wrong.",
      lessons: [
        {
          title: "Smart-contract risk and audits",
          type: "TEXT",
          points: 10,
          body: `The deepest risk running through all of DeFi and Web3 is smart-contract risk — the risk that the code you're trusting with your money is flawed or exploitable. Understanding smart-contract risk and the limits of audits is essential, because even legitimate protocols can be hacked, and no protocol is truly safe.

## The risk that runs through everything

Every time you use DeFi or Web3 — a DEX, a lending protocol, staking, a bridge, an NFT platform — you're trusting smart contracts (code) with your money, and that code could be flawed or exploitable. Smart-contract risk — the risk that the code has a bug, vulnerability, or flaw that leads to loss of funds — runs through everything in DeFi and Web3, because it all depends on smart contracts, and smart contracts can have exploitable flaws. This risk is real and significant: even legitimate, well-intentioned protocols have been hacked and drained through smart-contract vulnerabilities, losing user funds (many large DeFi hacks were exploits of legitimate protocols' code flaws, not scams). So smart-contract risk is a fundamental, unavoidable risk of using DeFi and Web3: you're trusting code with your money, and that code could be exploited, potentially losing your funds, even in legitimate protocols. Understanding that smart-contract risk runs through everything — that you're always trusting potentially-flawed code with your money, and even legitimate protocols can be hacked — is essential to using DeFi safely, because it means no protocol is truly safe, and this risk must be factored into everything you do.

## Audits and their limits

Protocols often get audits — reviews of their code by security firms — and audits are frequently cited as evidence a protocol is safe. Audits do add some assurance (a reviewed protocol is somewhat less likely to have obvious flaws than an unreviewed one), so an audit by a reputable firm is a positive signal. But audits have real limits that are often overlooked. Audits don't guarantee safety — audited protocols have still been hacked, because audits can miss vulnerabilities (code is complex, and even good audits don't catch everything); an audit reduces but doesn't eliminate smart-contract risk. Audit quality varies — audits vary in thoroughness and quality (a superficial audit or one by a weak firm provides little assurance), so "audited" alone means little without knowing the quality. Audits can be misused as marketing — protocols may cite audits to seem safe while the audit was limited, or even claim audits that don't say what's implied; "audited" is sometimes used as a marketing badge more than genuine assurance. And audits don't cover all risks — an audit reviews the code but doesn't cover other risks (economic design flaws, the team's honesty, external dependencies), so an audited protocol can still fail in ways an audit wouldn't catch. Understanding audits and their limits — that audits add some assurance but don't guarantee safety, that audited protocols have been hacked, that audit quality varies, that audits can be misused as marketing, and that they don't cover all risks — is essential, because relying on "audited" as proof of safety is a mistake, and smart-contract risk remains even in audited protocols.

## Managing smart-contract risk

Since smart-contract risk can't be eliminated, managing it is essential. Prefer established, battle-tested protocols — favouring protocols that have operated at scale for a long time without being hacked (battle-tested by time and large sums, which is stronger evidence than an audit alone), over new or unproven ones (which carry higher smart-contract risk). Treat audits as one weak signal, not proof — considering audits (by reputable firms) as a small positive signal, but not as proof of safety, and not relying on "audited" alone. Understand that no protocol is truly safe — recognising that even the best protocols carry smart-contract risk (any could be hacked), so never treating any DeFi protocol as risk-free. Limit your exposure to any protocol — not putting more into any single protocol than you could afford to lose to a hack (recall risk management — diversify across protocols and don't over-concentrate, since any could be exploited). Be especially cautious with new/unproven protocols — recognising that new protocols carry the highest smart-contract risk (untested by time and scale), so being especially cautious with them (the high yields on new protocols often compensate for their high risk of being exploited — recall the yield lessons). And factor smart-contract risk into everything — accounting for this unavoidable risk in all your DeFi decisions, never assuming any protocol is safe. Managing smart-contract risk — preferring battle-tested protocols, treating audits as a weak signal not proof, understanding no protocol is truly safe, limiting exposure to any protocol, being especially cautious with new ones, and factoring the risk into everything — is essential to surviving in DeFi, because this risk runs through everything and can't be eliminated. So understand smart-contract risk: it runs through all of DeFi and Web3 (you're always trusting potentially-flawed code with your money, and even legitimate protocols get hacked), audits add only limited assurance (they don't guarantee safety, and audited protocols have been hacked), and it must be managed (prefer battle-tested protocols, treat audits as weak signals, understand no protocol is truly safe, limit exposure to any one, be especially cautious with new ones). This unavoidable smart-contract risk is the deepest risk in DeFi, and understanding and managing it — never assuming any protocol is safe — is essential to surviving.`,
          activity: {
            title: "Manage your smart-contract risk",
            prompt:
              "Write your rules for managing smart-contract risk (the risk that code you trust with your money is flawed — even legitimate protocols get hacked): prefer established, battle-tested protocols over new ones; treat 'audited' as a weak signal, not proof of safety (audited protocols have been hacked); never treat any protocol as risk-free; and limit how much you put into any single protocol (don't over-concentrate — any could be exploited). Smart-contract risk runs through all of DeFi and can't be eliminated — only managed.",
          },
        },
        {
          title: "The scams of DeFi and Web3",
          type: "TEXT",
          points: 10,
          body: `Beyond the risks of legitimate protocols, DeFi and Web3 are full of outright scams designed to steal your funds. Understanding the common scams — pulling together threads from throughout this course and the on-chain course — is essential to recognising and avoiding them, because scams are everywhere in this space and drain enormous sums.

## Scams are everywhere

DeFi and Web3, being permissionless, unregulated, and full of money and hype, are a magnet for scams — an enormous amount of the activity is fraudulent, designed to steal from the unwary. Scams drain vast sums in this space, preying on greed, FOMO, inexperience, and the difficulty of telling legitimate projects from fraudulent ones. So a large part of surviving in DeFi and Web3 is recognising and avoiding the many scams — treating the space with deep skepticism, because scams are everywhere and sophisticated. Understanding that scams are everywhere in DeFi and Web3 — that a large part of the activity is fraudulent, preying on greed and inexperience — is essential to surviving, because assuming things are legitimate (rather than being deeply skeptical) leads to being scammed, and the space is full of sophisticated scams designed to steal your funds. Deep skepticism toward the space — assuming scams are common and being wary — is a core survival posture.

## The common scams

Pulling together the scams from throughout this course and the on-chain course, the common DeFi/Web3 scams include: Rug pulls — projects that hype and sell a token/NFT/protocol, then pull the value and abandon it (recall the on-chain course); extremely common. Malicious approvals and wallet-draining — tricking you into approving malicious contracts or signing draining transactions (recall the signing/approval risks); a major vector, often via fake sites, offers, mints, or airdrops. Phishing and fake sites — fake versions of legitimate apps/protocols that steal your funds or credentials when you interact (a very common scam — always verify you're on the genuine site). Unsustainable yields and Ponzi schemes — high-yield schemes paid from new deposits or token printing that collapse (recall the yield lessons); the "passive income" bait. Fake tokens and honeypots — scam tokens that are worthless, can't be sold (honeypots), or are malicious (recall the on-chain course); rife on DEXs. Pump-and-dumps — coordinated schemes to pump then dump on buyers (recall the on-chain course). Impersonation and social engineering — scammers impersonating projects, support, or trusted people to trick you (recall Crypto From Zero — no legitimate support asks for your seed phrase or to connect/sign). Fake airdrops and offers — fake "free" tokens or offers that drain your wallet when you claim/interact. And investment/return scams — schemes promising guaranteed high returns (always a scam). These common scams — rug pulls, malicious approvals/wallet-draining, phishing/fake sites, unsustainable yields/Ponzis, fake tokens/honeypots, pump-and-dumps, impersonation/social engineering, fake airdrops/offers, and return scams — drain enormous sums in DeFi/Web3. Recognising them is essential to avoiding them.

## Avoiding the scams

Avoiding DeFi/Web3 scams draws together the protective principles from throughout the courses. Be deeply skeptical — treating the space as full of scams, being wary rather than trusting, and being especially skeptical of anything promising high returns, easy money, or free tokens (the bait). Verify everything — verifying you're on genuine sites/apps (not fakes/phishing), that tokens and projects are legitimate (using on-chain analysis), and that offers are real, rather than assuming. Read what you sign and manage approvals — never blindly signing or approving (the wallet-draining vector), and managing approvals carefully (recall the signing module). Never share your seed phrase or keys — the absolute rule from Crypto From Zero (no legitimate thing needs them; the request is always the attack). Be wary of the scam patterns — recognising rug pulls, unsustainable yields, honeypots, impersonation, fake airdrops, and the other patterns, and avoiding them. Resist greed and FOMO — recognising that scams prey on greed and FOMO (the high yield, the hot token, the free tokens, the guaranteed returns), and resisting the lure that's designed to bypass your caution (recall the trading course). And only risk what you can afford to lose — so that even if scammed, you survive. Avoiding scams — deep skepticism, verifying everything, reading what you sign and managing approvals, never sharing keys, recognising scam patterns, resisting greed and FOMO, and only risking what you can afford to lose — draws together the protective principles from throughout the courses to protect you from the many scams that drain so many in DeFi/Web3. So understand that scams are everywhere in DeFi and Web3 (a large part of the activity is fraudulent, preying on greed and inexperience), recognise the common scams (rug pulls, wallet-draining, phishing, unsustainable yields, fake tokens, pump-and-dumps, impersonation, fake airdrops, return scams), and avoid them through deep skepticism, verifying everything, reading what you sign, never sharing keys, recognising the patterns, resisting greed and FOMO, and only risking what you can afford to lose. This protection from scams — a core survival skill in a space full of them — draws together the protective wisdom of this and the other crypto courses, and it's essential to surviving in DeFi and Web3.`,
          activity: {
            title: "Build your scam-defence checklist",
            prompt:
              "Build your DeFi/Web3 scam-defence checklist, pulling together the protective principles: be deeply skeptical (assume scams are common); verify everything (genuine sites, legitimate tokens/projects); read what you sign and manage approvals (the wallet-draining vector); never share your seed phrase or keys; recognise the scam patterns (rug pulls, unsustainable yields, honeypots, phishing, impersonation, fake airdrops, guaranteed returns); resist greed and FOMO (the bait); and only risk what you can afford to lose. Scams are everywhere in this space — this checklist is core survival.",
          },
        },
        {
          title: "Protecting yourself — the habits that work",
          type: "TEXT",
          points: 10,
          body: `Surviving in DeFi and Web3 comes down to a set of protective habits — practical practices that, together, protect you from the many risks and scams. Pulling these habits together into a coherent defence is essential, because it's the consistent practice of these habits that keeps you safe.

## Defence in depth

No single measure protects you in DeFi/Web3; safety comes from defence in depth — multiple protective habits working together, so that if one fails, others still protect you. Because the risks are many (smart-contract, approval, scam, financial, and more) and no single measure covers them all, protecting yourself requires a set of habits addressing the different risks, practised consistently. This defence in depth — multiple protective habits working together — is how you survive in a space full of risks and scams, because it addresses the various risks and provides backup if one measure fails. Understanding that safety comes from defence in depth (a set of consistent protective habits, not a single measure) frames the protective approach: build and consistently practise the habits that, together, protect you from the many risks. The rest of this lesson pulls together the key protective habits into a coherent defence.

## The key protective habits

The key protective habits, drawn from throughout the courses, include: Separate wallets (hot and cold) — using a separate "hot" wallet with limited funds for interacting with DeFi/Web3 (so a compromise only risks the limited funds in it), while keeping the bulk of your holdings in a secure "cold" wallet that never interacts with risky protocols (recall custody from Crypto From Zero); this single habit — not connecting your main holdings to DeFi/Web3, but using a limited-fund hot wallet — is one of the most protective, limiting what any interaction risk can take. Read what you sign and manage approvals — never blindly signing, understanding what you approve, and revoking unneeded approvals (the wallet-draining defence). Verify everything — genuine sites/apps, legitimate tokens/projects, real offers (against phishing and scams). Never share keys — the absolute rule (seed phrase/keys never shared, never entered anywhere). Be deeply skeptical and resist greed/FOMO — treating the space as full of scams, being wary, and resisting the lures (high yields, hot tokens, free tokens, guaranteed returns). Limit exposure and only risk what you can afford to lose — not over-concentrating in any protocol, and only putting into DeFi/Web3 what you could afford to lose entirely (so any loss is survivable). Prefer established, battle-tested protocols — over new/unproven ones (smart-contract risk). Understand what you're doing — only using DeFi/Web3 things you understand (the risks, the yield source, the mechanism), avoiding what you don't. And stay informed about risks and scams — keeping up with new scam techniques and risks (below). These key protective habits — separate hot/cold wallets (limiting exposure), reading what you sign and managing approvals, verifying everything, never sharing keys, deep skepticism and resisting greed/FOMO, limiting exposure and only risking what you can afford to lose, preferring battle-tested protocols, understanding what you're doing, and staying informed — together form a defence in depth that protects you from the many risks and scams. Practising them consistently is how you survive in DeFi and Web3.

## The hot wallet habit especially

Among the protective habits, the separate hot/cold wallet habit deserves emphasis, because it's one of the most protective and limits the damage of many risks at once. By using a separate "hot" wallet with only limited funds for interacting with DeFi/Web3 — and keeping the bulk of your holdings in a secure cold wallet that never connects to or interacts with risky protocols — you ensure that no interaction risk (malicious approval, smart-contract exploit, scam, bad signature) can take more than the limited funds in your hot wallet. This single habit dramatically limits your exposure to the entire class of interaction risks: your main holdings, safe in cold storage and never interacting, can't be drained by any DeFi/Web3 risk, while your hot wallet holds only what you're willing to risk in interactions. It's the practical embodiment of not exposing more than you can afford to lose, and it protects your core holdings from the multiplied risks of interacting. Making this a firm habit — never connecting your main holdings to DeFi/Web3, always using a separate limited-fund hot wallet for interactions — is one of the most protective things you can do, limiting the damage of the many interaction risks and scams to only your hot wallet's limited funds. So build a defence in depth of protective habits: use separate hot/cold wallets (limiting interaction exposure — especially protective), read what you sign and manage approvals, verify everything, never share keys, be deeply skeptical and resist greed/FOMO, limit exposure and only risk what you can afford to lose, prefer battle-tested protocols, understand what you're doing, and stay informed. Practising these habits consistently — especially the hot/cold wallet separation — is how you survive in DeFi and Web3, protecting yourself in depth from the many risks and scams, so that even when things go wrong, the damage is limited and survivable.`,
          activity: {
            title: "Set up your defence in depth",
            prompt:
              "Write your defence-in-depth of protective habits for DeFi/Web3, emphasising the most protective one: use a separate 'hot' wallet with only limited funds for interacting (keeping your main holdings in cold storage that never connects to risky protocols), so no interaction risk can take more than your hot wallet's limited funds. Then list your other habits: read what you sign, manage approvals, verify everything, never share keys, be skeptical and resist greed/FOMO, limit exposure, prefer battle-tested protocols, understand what you do. Consistent practice of these habits is how you survive.",
          },
        },
        {
          title: "When something goes wrong",
          type: "TEXT",
          points: 10,
          body: `Despite your best efforts, something may go wrong — a compromised wallet, a scam, a loss. Knowing what to do (and what's realistically possible) when something goes wrong is important, because acting quickly and correctly can limit damage, and having realistic expectations prevents further loss to "recovery" scams.

## Acting quickly to limit damage

If you suspect something has gone wrong — a compromised wallet, a malicious approval, a scam interaction — acting quickly can sometimes limit the damage. If you suspect your wallet is compromised (e.g., you signed something malicious, or notice unauthorised activity), the priority is to move any remaining funds to safety immediately (a new, secure wallet the compromise doesn't affect) before they can be drained, since a compromised wallet's remaining funds are at risk. If you granted a malicious approval, revoking it quickly (if funds haven't already been taken) can prevent further draining. If you realise you're interacting with a scam, stopping immediately (not sending more, not signing more) limits the damage. Acting quickly to limit damage — moving remaining funds to safety if compromised, revoking malicious approvals, and stopping scam interactions — can sometimes prevent further loss, so speed matters when something goes wrong. However, because crypto transactions are irreversible (recall Crypto From Zero), funds already taken are usually gone, so quick action limits further damage but typically can't recover what's already lost. Understanding to act quickly to limit further damage (move funds to safety, revoke approvals, stop) when something goes wrong is important, even though what's already lost is usually unrecoverable.

## The hard reality: usually unrecoverable

A hard reality of crypto is that losses are usually unrecoverable. Because transactions are irreversible and there's no central authority to reverse them or recover funds (recall Crypto From Zero — this is the flip side of self-custody and decentralisation), funds lost to a scam, hack, or mistake are usually gone for good, with no realistic way to recover them. There's no bank to reverse the transaction, no customer service to refund you, no authority to claw back the funds — the irreversibility and lack of intermediaries that give crypto its properties also mean losses are typically permanent. This hard reality — that crypto losses are usually unrecoverable — is important to understand, both to take prevention seriously (since you usually can't recover losses, preventing them is everything) and to have realistic expectations when something goes wrong (accepting that lost funds are usually gone, rather than desperately chasing recovery). Understanding that losses are usually unrecoverable is sobering but essential: it underscores why this whole course is prevention-focused (since recovery usually isn't possible), and it prepares you to accept a loss realistically rather than making it worse.

## Beware recovery scams

A crucial warning: when something goes wrong, beware recovery scams — scammers who prey on victims by promising to recover their lost funds. After a loss, victims are often targeted by "recovery" scammers who claim they can recover the lost funds (for a fee, or by getting access to your wallet), preying on the desperation of victims. These recovery scams are themselves scams — they can't actually recover your funds (which are usually unrecoverable), and they steal more from you (taking a fee for nothing, or draining your wallet if you give them access). So a victim who falls for a recovery scam loses even more, on top of the original loss. The rule: after a loss, be extremely wary of anyone promising to recover your funds — recovery scams are common and prey on desperate victims, and legitimate fund recovery is usually not possible, so anyone promising it is almost certainly a scammer trying to steal more from you. Never pay a "recovery" service or give anyone access to your wallet to "recover" funds — this just adds a second loss to the first. Understanding to beware recovery scams — that anyone promising to recover your lost crypto is almost certainly a scammer preying on your desperation — protects you from being victimised twice. So know what to do when something goes wrong: act quickly to limit further damage (move remaining funds to safety, revoke malicious approvals, stop scam interactions), understand the hard reality that losses are usually unrecoverable (irreversible transactions, no authority to reverse them — so prevention is everything and lost funds are usually gone), and beware recovery scams (anyone promising to recover your funds is almost certainly a scammer preying on your desperation, so never pay them or give them access). This knowledge — act quickly, accept that losses are usually unrecoverable, and beware recovery scams — helps you respond correctly when something goes wrong, limiting further damage and protecting you from being victimised twice, while underscoring that prevention (the focus of this whole course) is everything, because recovery usually isn't possible.`,
          activity: {
            title: "Prepare for something going wrong",
            prompt:
              "Prepare, in advance, for something going wrong. Write down: what you'd do quickly to limit further damage (if your wallet is compromised, move remaining funds to a new secure wallet immediately; revoke malicious approvals; stop scam interactions). Then acknowledge the hard reality (crypto losses are usually unrecoverable — irreversible, no authority to reverse them), and the crucial warning: beware recovery scams (anyone promising to recover your funds is almost certainly a scammer preying on your desperation — never pay them or give them access). Prevention is everything because recovery usually isn't possible.",
          },
        },
        {
          title: "Check your understanding",
          type: "QUIZ",
          points: 15,
          body: `A check on the risks and surviving them before the final module on using crypto wisely. These — smart-contract risk and audits' limits, the scams, the protective habits (especially hot/cold wallets), and what to do when things go wrong — are the core of surviving in DeFi and Web3.`,
          quiz: {
            title: "Risks and surviving them",
            passScore: 80,
            maxAttempts: 5,
            questions: [
              {
                prompt: "Why isn't 'audited' proof that a protocol is safe?",
                explanation:
                  "Audits add only limited assurance — they can miss vulnerabilities, vary in quality, are sometimes used as marketing, and don't cover all risks. Audited protocols have still been hacked, so smart-contract risk remains even in audited protocols.",
                options: [
                  {
                    text: "Audits can miss flaws and don't guarantee safety — audited protocols have still been hacked",
                    correct: true,
                  },
                  { text: "Audits make a protocol completely risk-free", correct: false },
                  { text: "Audits are legally binding guarantees of safety", correct: false },
                  { text: "Only unaudited protocols ever get hacked", correct: false },
                ],
              },
              {
                prompt: "What's a defining posture for avoiding DeFi/Web3 scams?",
                explanation:
                  "Deep skepticism — treating the space as full of scams and being wary rather than trusting, especially of anything promising high returns, easy money, or free tokens (the bait). Assuming things are legitimate leads to being scammed.",
                options: [
                  {
                    text: "Deep skepticism — assume scams are common and be wary, especially of high-return lures",
                    correct: true,
                  },
                  { text: "Trusting that most projects are legitimate", correct: false },
                  { text: "Acting fast on every opportunity before it's gone", correct: false },
                  { text: "Assuming audited projects can't be scams", correct: false },
                ],
              },
              {
                prompt: "Why is using a separate hot wallet with limited funds so protective?",
                explanation:
                  "It ensures no interaction risk (malicious approval, exploit, scam, bad signature) can take more than the limited funds in the hot wallet, while your main holdings stay in cold storage that never interacts — dramatically limiting exposure to the whole class of interaction risks.",
                options: [
                  {
                    text: "No interaction risk can take more than the hot wallet's limited funds; your main holdings never interact",
                    correct: true,
                  },
                  { text: "Hot wallets are immune to all hacks", correct: false },
                  { text: "It increases your yields", correct: false },
                  { text: "It makes transactions reversible", correct: false },
                ],
              },
              {
                prompt: "What should you know about anyone promising to recover your lost crypto?",
                explanation:
                  "They're almost certainly a recovery scammer preying on desperate victims. Crypto losses are usually unrecoverable (irreversible, no authority to reverse them), so legitimate recovery is usually impossible — paying or giving access just adds a second loss.",
                options: [
                  {
                    text: "They're almost certainly a scammer — losses are usually unrecoverable, so never pay or give access",
                    correct: true,
                  },
                  { text: "They can reliably recover your funds for a fee", correct: false },
                  { text: "You should give them wallet access to help", correct: false },
                  { text: "Recovery services are the normal way to get funds back", correct: false },
                ],
              },
            ],
          },
        },
      ],
    },

    // =====================================================================
    {
      title: "Using crypto wisely",
      description:
        "Bringing it together into a wise, safety-first approach: whether you even need DeFi, sizing your risk, staying current and skeptical, and your own plan for using crypto.",
      lessons: [
        {
          title: "Do you even need DeFi?",
          type: "TEXT",
          points: 10,
          body: `After all the risks, a wise and often-skipped question is whether you even need to use DeFi and Web3 at all. Honestly considering whether you need these things — rather than assuming you should use them because they exist and are hyped — is a mark of wisdom, because for many people, the answer is that they don't, and not using them is the safest choice.

## The question worth asking

Amid all the hype pushing people to use DeFi and Web3 (and all the risks of doing so), a wise question that's rarely asked is: do you even need to? Just because DeFi and Web3 exist and are heavily promoted doesn't mean you need to use them — and given the substantial risks (which this whole course has detailed), the honest question is whether the benefits to you justify the risks, or whether you'd be better off not using them at all. For many people, the honest answer is that they don't need DeFi/Web3 — they can hold crypto safely (per Crypto From Zero) without taking on the multiplied risks of interacting, and not using DeFi/Web3 is a perfectly valid, often safest choice. Asking whether you even need DeFi — rather than assuming you should use it because it exists and is hyped — is a mark of wisdom, because it weighs the benefits against the substantial risks honestly, and often concludes that not using it is the wise choice. The hype pushes everyone toward using these things; wisdom asks whether you actually need to, given the risks.

## Weighing benefits against risks

Deciding whether to use DeFi/Web3 means honestly weighing the benefits to you against the substantial risks. The potential benefits — earning yield, trading, using certain applications, or other uses — should be weighed honestly (are they genuinely valuable to you, and worth the risk?), recognising that some promoted benefits (high yields) are often traps, and that many benefits are modest or not worth the risk for many people. The substantial risks — the multiplied risks of interacting (smart-contract, approval, scam, financial, and more), the real possibility of losing funds, and the unrecoverability of losses — should be weighed fully, recognising that using DeFi/Web3 genuinely risks your funds in ways that holding doesn't. Weighing these honestly, many people find the benefits (to them) don't justify the risks — that the modest or trap-laden benefits aren't worth risking their funds to the substantial dangers — and conclude they're better off not using DeFi/Web3, or using it minimally. Weighing benefits against risks honestly — recognising that benefits are often modest or trap-laden while risks are substantial and losses unrecoverable — often concludes that not using DeFi/Web3 (or using it minimally) is the wise choice for many people. This honest weighing, rather than assuming you should use these things, is how you wisely decide whether to use DeFi/Web3.

## Not using it is a valid choice

A key point, against all the hype: not using DeFi/Web3 is a perfectly valid, often wise choice. The hype makes it seem like everyone should be using DeFi, earning yields, trading, and engaging with Web3 — and that not doing so means missing out. But given the substantial risks, not using DeFi/Web3 (holding crypto safely without interacting, per Crypto From Zero) is a valid and often wise choice, especially for those for whom the benefits don't justify the risks (which is many people). Not using DeFi/Web3 means avoiding the entire class of multiplied interaction risks (smart-contract, approval, scam, financial) — a significant safety benefit — at the cost of the benefits (which are often modest or trap-laden). For many, this trade-off favours not using DeFi/Web3, and choosing not to (despite the hype and FOMO) is wise. Recognising that not using DeFi/Web3 is a valid, often wise choice — that you don't have to use it just because it's hyped, and that avoiding its risks is a legitimate and often best decision — frees you from the FOMO that pushes people into risky activities they don't need. So ask the wise question: do you even need DeFi and Web3? Weigh the benefits to you (often modest or trap-laden) honestly against the substantial risks (multiplied interaction risks, unrecoverable losses), and recognise that for many people, the benefits don't justify the risks, and not using DeFi/Web3 (holding crypto safely without interacting) is a valid, often wise choice. This honest questioning of whether you need these things — rather than assuming you should use them because they're hyped — is a mark of wisdom, and it often, wisely, concludes that not using DeFi/Web3, or using it minimally, is the safest and best choice for you. The remaining lessons cover using crypto wisely if you do use DeFi/Web3, but the first wisdom is asking whether you need to at all.`,
          activity: {
            title: "Decide whether you even need DeFi",
            prompt:
              "Ask the wise question honestly: do you even need to use DeFi/Web3? Weigh the benefits to you (be honest — are they genuinely valuable, or modest/trap-laden like high yields?) against the substantial risks (multiplied interaction risks, unrecoverable losses). Write your honest conclusion — including that 'I don't need DeFi/Web3, and holding crypto safely without interacting is my wise choice' is a completely valid, often best answer. Not using it, despite the hype and FOMO, is frequently the safest choice.",
          },
        },
        {
          title: "Position sizing and risk in DeFi",
          type: "TEXT",
          points: 10,
          body: `If you do use DeFi/Web3, applying sound risk management — especially position sizing and only risking what you can afford to lose — is essential to surviving. Drawing on the risk-first trading course, understanding how to size and limit your DeFi risk protects you from the losses that are so common in this space.

## Risk management applies fully

Everything from the risk-first trading course applies fully to using DeFi/Web3, because using DeFi/Web3 involves financial risk (of losing funds to the many risks and scams), and surviving financial risk requires risk management. The core principle — survival first, only risk what you can afford to lose, and size your risk so no single loss can ruin you (recall the trading course) — applies directly to DeFi/Web3: given the substantial risks and the frequency of losses, you must manage your DeFi risk so that losses (which are likely at some point) are survivable, not ruinous. Using DeFi/Web3 without risk management — putting in more than you can afford to lose, over-concentrating, and not sizing your risk — is how people get ruined when the losses come (as they often do). Applying sound risk management to DeFi/Web3 — survival first, only risking what you can afford to lose, and sizing your risk so no loss can ruin you — is essential to surviving, and it draws directly on the risk-first trading course. Understanding that risk management applies fully to using DeFi/Web3 (which involves real financial risk of loss) is essential, because the many risks and frequent losses mean unmanaged DeFi risk leads to ruin.

## Sizing and limiting your DeFi risk

Sizing and limiting your DeFi risk protects you from ruinous losses. Only use what you can afford to lose — putting into DeFi/Web3 only funds you could lose entirely without it harming you (given the real possibility of losing funds to the many risks and scams, and the unrecoverability of losses); this is the foundation, ensuring any loss is survivable. Keep DeFi/Web3 a limited portion — not putting a large or ruinous share of your wealth into DeFi/Web3 (which risks it to the substantial dangers), but keeping it a limited portion you could afford to lose. Limit exposure to any single protocol/thing — not over-concentrating in any single protocol, token, or activity (any of which could be exploited, scammed, or fail), but spreading your (limited) DeFi risk so no single failure is ruinous (recall diversification and concentration risk). Use a limited hot wallet — the hot/cold wallet habit (last module) practically enforces limiting your exposure, keeping only limited funds in the interacting hot wallet. Size individual positions/risks sensibly — not risking too much on any single trade, yield, or activity, so no single one can badly hurt you. And account for the multiplied risk — recognising that DeFi/Web3 risk is substantial (multiplied interaction risks, frequent losses), so sizing your risk conservatively given the real chance of loss. Sizing and limiting your DeFi risk — only using what you can afford to lose, keeping DeFi a limited portion, limiting exposure to any single thing, using a limited hot wallet, sizing individual risks sensibly, and accounting for the multiplied risk — protects you from the ruinous losses that unmanaged DeFi risk leads to. This risk management is essential to surviving in DeFi/Web3.

## Survival first in DeFi

The overarching principle, as in trading, is survival first: managing your DeFi/Web3 risk so that you survive the losses that are likely at some point, rather than being ruined by them. Because using DeFi/Web3 carries substantial risk and losses are common (from the many risks and scams), the priority is ensuring that no loss can ruin you — that you only risk what you can afford to lose, keep DeFi a limited and diversified portion, and size your risk so you survive whatever happens. This survival-first approach — managing your DeFi risk so losses are survivable, not ruinous — is what lets you use DeFi/Web3 (if you choose to) without being ruined by the losses that are likely, and it's essential given the substantial risks. It means accepting that you'll probably lose money at some point (to a scam, exploit, bad trade, or failed protocol), and ensuring that when you do, it's a survivable loss (a limited portion you could afford to lose) rather than a ruinous one. Survival first in DeFi — managing your risk so losses are survivable, only risking what you can afford to lose, and sizing your risk so no loss can ruin you — is the overarching risk-management principle for using DeFi/Web3, drawn from the risk-first trading course and essential to surviving the substantial risks. So if you use DeFi/Web3, apply sound risk management: recognise that risk management applies fully (real financial risk of loss), size and limit your DeFi risk (only use what you can afford to lose, keep it a limited diversified portion, limit exposure to any single thing, use a limited hot wallet, size individual risks sensibly), and put survival first (manage your risk so likely losses are survivable, not ruinous). This risk management — drawn from the risk-first trading course and essential given DeFi's substantial risks — protects you from the ruinous losses that are so common, and lets you use DeFi/Web3 (if you choose to) while surviving the losses that are likely at some point.`,
          activity: {
            title: "Size your DeFi risk for survival",
            prompt:
              "If you use DeFi/Web3, write your risk-management rules (drawn from the risk-first trading course): only use funds you could lose entirely without harm; keep DeFi/Web3 a limited portion of your wealth; limit exposure to any single protocol/token/activity (diversify — any could fail); use a limited hot wallet; and size individual risks so no single loss can ruin you. Then state the survival-first principle: assume you'll lose money at some point, and ensure it's survivable, not ruinous. Sound risk management protects you from the ruinous losses so common in DeFi.",
          },
        },
        {
          title: "Staying current and skeptical",
          type: "TEXT",
          points: 10,
          body: `DeFi and Web3 evolve constantly — new protocols, new risks, new scams — so using them safely over time requires staying current and staying skeptical. Understanding the need to keep learning about risks and scams (while maintaining deep skepticism) is essential to ongoing safety, because yesterday's knowledge doesn't cover today's threats.

## The space evolves constantly

DeFi and Web3 evolve rapidly — new protocols, products, and uses constantly appear, and so do new risks, new scam techniques, and new ways to lose money. This means safety isn't a one-time learning but an ongoing effort: the risks and scams you need to guard against keep changing, so staying safe over time requires staying current with new risks and scams (which constantly emerge), not relying only on what you learned before. Scammers and exploiters constantly innovate, developing new scam techniques and finding new vulnerabilities, so new ways to lose money keep appearing, and staying safe requires keeping up with them. Understanding that the space evolves constantly — with new risks and scams continually emerging — is essential, because it means using DeFi/Web3 safely requires ongoing learning about new risks and scams, not just a one-time education. Yesterday's knowledge, while foundational, doesn't cover today's new threats, so staying current is part of staying safe.

## Staying current on risks and scams

Staying current — keeping up with new risks and scams — is essential to ongoing safety in the evolving space. This means keeping up with new scam techniques — since scammers constantly innovate, learning about new scam methods as they emerge (so you can recognise and avoid them) is essential, because a scam technique you don't know about is one you might fall for. It means keeping up with new risks — as new protocols, products, and mechanisms appear, understanding their new risks before using them (rather than using new things without understanding their risks). It means learning from others' losses — following news of hacks, scams, and losses (which reveal new risks and scam techniques), and learning from them to avoid the same fates. It means updating your practices — adjusting your protective habits as new risks and scams require (rather than relying on outdated practices). And it means staying informed through reliable sources — following credible sources on crypto risks and security (skeptically), engaging with the security-conscious community, and keeping your knowledge current. Staying current on risks and scams — keeping up with new scam techniques and risks, learning from others' losses, updating your practices, and staying informed through reliable sources — is essential to ongoing safety in a space where new threats constantly emerge. Neglecting this — relying only on past knowledge — leaves you vulnerable to the new risks and scams that keep appearing.

## Maintaining deep skepticism

Alongside staying current, maintaining deep skepticism is essential to ongoing safety, because skepticism is your core defence in a space full of risks and scams. The deep skepticism this course has emphasised — treating the space as full of scams, being wary of hype and high yields, verifying everything, and resisting greed and FOMO — must be maintained over time, not relaxed as you become more familiar or as new things tempt you. In fact, familiarity and confidence can erode skepticism (people become careless as they get comfortable), which is dangerous, so deliberately maintaining deep skepticism — staying wary, verifying, and resisting the lures — even as you become experienced is essential to ongoing safety. New hype, new "opportunities," and new temptations will constantly test your skepticism, and maintaining it (rather than being lured by the latest hyped thing) is your core ongoing defence. Maintaining deep skepticism over time — not relaxing your wariness as you become familiar, and resisting each new hype and temptation with the same skepticism — is essential to ongoing safety, because skepticism is your core defence and the space will constantly test it with new lures. So use DeFi/Web3 safely over time by staying current and staying skeptical: recognise that the space evolves constantly (new risks and scams continually emerge), stay current on new risks and scams (keeping up with new scam techniques and risks, learning from others' losses, updating your practices, staying informed), and maintain deep skepticism (staying wary, verifying, and resisting hype and FOMO even as you become experienced). This ongoing effort — staying current and staying skeptical — is essential to using DeFi/Web3 safely over time, because the space's constant evolution means new threats keep appearing, and your safety depends on keeping up with them while maintaining the deep skepticism that is your core defence. Safety in DeFi/Web3 is an ongoing practice of staying current and skeptical, not a one-time achievement.`,
          activity: {
            title: "Plan to stay current and skeptical",
            prompt:
              "Write your plan for staying safe in DeFi/Web3 over time: how you'll stay current on new risks and scams (following credible security sources skeptically, learning from news of hacks and scams, understanding new things' risks before using them), and how you'll maintain deep skepticism even as you get more familiar (not relaxing your wariness, verifying everything, resisting each new hype and FOMO). The space evolves constantly and will keep testing your skepticism — staying current and skeptical is your ongoing defence.",
          },
        },
        {
          title: "Ethics and the future of Web3",
          type: "TEXT",
          points: 10,
          body: `As this course closes, it's worth stepping back to think clearly about the ethics and future of DeFi and Web3 — beyond both the hype and the cynicism — so you can engage with the space thoughtfully and honestly. This final teaching lesson places using crypto within a clearer, more honest perspective.

## Beyond hype and cynicism

DeFi and Web3 attract both extreme hype (revolutionary, the future of everything, easy riches) and extreme cynicism (all a scam, entirely worthless). Thinking clearly requires going beyond both, to an honest, nuanced view. The honest view recognises both the genuine potential and the very real problems. The genuine potential — DeFi and Web3 do enable some genuinely novel and potentially valuable things (financial services without intermediaries, verifiable digital ownership, permissionless access, and other capabilities), which are real even if far more modest than the hype claimed. The very real problems — the space is also full of scams, unsustainable schemes, hype, manipulation, and genuine harms (many people have lost money, and much of the activity is speculative, fraudulent, or harmful), which are real even if the space isn't entirely worthless. An honest, clear-thinking view holds both — recognising the genuine (if modest) potential and the very real (and substantial) problems — rather than the extreme hype (which ignores the problems) or extreme cynicism (which ignores the potential). Thinking clearly about DeFi and Web3, beyond hype and cynicism, means holding this nuanced view: real but modest potential, alongside very real and substantial problems. This clear thinking lets you engage with the space honestly.

## The ethical dimensions

Using DeFi and Web3 has ethical dimensions worth considering. Not harming others — engaging with the space honestly and not participating in the scams, manipulation, and harmful schemes that plague it (not becoming part of the problem — not running scams, pumping and dumping, or exploiting others). Not spreading hype or harm — not promoting unsustainable schemes, hyping things dishonestly, or luring others into risks and scams (recall the on-chain course's ethics — not using your knowledge to harm or mislead others). Being honest about risks — if you discuss or influence others regarding crypto, being honest about the substantial risks rather than promoting the hype (many people are harmed by dishonest promotion of crypto's easy riches). And considering the broader effects — thinking about the broader effects of the space (its genuine value versus its harms, speculation, and scams) and engaging in ways that contribute to the genuine value rather than the harm. These ethical dimensions — not harming others, not spreading hype or harm, being honest about risks, and considering the broader effects — matter for engaging with DeFi/Web3 ethically, in a space where much activity harms others through scams, manipulation, and dishonest hype. Engaging ethically — honestly, not harming others, not spreading hype or harm, and contributing to genuine value rather than harm — is part of using crypto wisely and rightly (connecting to the character and wisdom courses' emphasis on integrity and not harming others).

## Engaging thoughtfully

Bringing it together, engaging with DeFi and Web3 thoughtfully means combining clear thinking (beyond hype and cynicism), safety-first caution (given the substantial risks), and ethical engagement (not harming others). It means recognising the genuine but modest potential and the very real problems (clear thinking), approaching the space with the deep caution and safety-first practices this course has taught (given the substantial risks), and engaging honestly and ethically (not participating in or spreading the scams, manipulation, and dishonest hype that harm others). It also means holding realistic expectations about the future — recognising that the space will likely continue to have both genuine value and substantial problems, that much of the current hype and speculation will likely deflate (as it has repeatedly), and that engaging wisely means focusing on genuine value and safety rather than hype and speculation. Engaging thoughtfully with DeFi/Web3 — with clear thinking (beyond hype and cynicism), safety-first caution (given the risks), ethical engagement (not harming others), and realistic expectations (about the mixed future) — is how you engage with the space wisely and rightly, as the culmination of this course's safety-first, clear-thinking approach. So think clearly about the ethics and future of DeFi/Web3: hold a nuanced view beyond hype and cynicism (real but modest potential, alongside very real problems), engage ethically (not harming others, not spreading hype or harm, being honest about risks), and engage thoughtfully (with clear thinking, safety-first caution, ethical engagement, and realistic expectations). This clear, ethical, thoughtful engagement — beyond hype and cynicism, cautious about risks, honest and not harming others — is how you engage with DeFi and Web3 wisely and rightly, placing your use of crypto within a clearer and more honest perspective as this course closes.`,
          activity: {
            title: "Form your honest view",
            prompt:
              "Write your honest, clear-thinking view of DeFi/Web3, beyond both hype and cynicism: its genuine but modest potential (novel financial services, verifiable digital ownership, permissionless access), alongside its very real problems (scams, unsustainable schemes, hype, manipulation, harm). Then note your ethical commitments: engaging honestly, not participating in or spreading scams/manipulation/dishonest hype, and being honest about risks if you influence others. Engaging with clear thinking, caution, and ethics — not harming others — is how you use crypto wisely and rightly.",
          },
        },
        {
          title: "Your DeFi and Web3 plan",
          type: "ASSIGNMENT",
          points: 30,
          body: `The capstone. Everything in this course exists to make this possible: a clear, safety-first plan for whether and how you'll use DeFi and Web3 — bringing together all the risks, protections, and wisdom.

Your instructor reads this final assignment. It should read like a genuine, safety-first plan from someone who understands the risks — and 'I'll hold crypto safely and not use DeFi/Web3' is a completely valid, well-reasoned plan.`,
          assignment: {
            title: "Your plan for using crypto (or not)",
            instructions: `Write your complete plan for whether and how you'll use DeFi and Web3, bringing together everything from the course. Aim for clarity and honesty over ambition — a cautious plan you'll follow beats an ambitious risky one.

Cover all seven, briefly:

**1. Whether you'll use DeFi/Web3.** Your honest decision on whether you even need to use DeFi/Web3, weighing the benefits (often modest/trap-laden) against the substantial risks — with 'I'll hold safely and not use it' being a valid, well-reasoned choice.

**2. Your safety setup.** If you'll use it: your wallet safety (especially a separate limited-fund hot wallet, keeping your main holdings in cold storage that never interacts), and your signing/approval safety.

**3. Your risk limits.** Only using what you can afford to lose, keeping DeFi a limited diversified portion, limiting exposure to any single protocol, and survival-first risk management.

**4. What you'll actually do (if anything).** The specific things you might do (or won't) — trading, lending, staking, NFTs — and your safety approach and skepticism for each (including judging yields by their source and avoiding too-good-to-be-true ones).

**5. Your scam defence.** Your deep skepticism, verifying everything, never sharing keys, recognising scam patterns, and resisting greed/FOMO.

**6. Staying safe over time.** How you'll stay current on new risks/scams and maintain deep skepticism as the space evolves.

**7. Your ethics and perspective.** Your honest, clear-thinking view (beyond hype and cynicism) and ethical commitments (not harming others, not spreading hype).

Finally, look back at what you wrote in lesson one about what you wanted to do with crypto. Write one line on whether this plan reflects a wiser, safer version of that.

Write it as your real plan. The value is in how safe, honest, and clear it is.`,
            maxScore: 100,
            passScore: 70,
            rubric: [
              {
                criterion: "Safety-first and honest",
                weight: 40,
                descriptor:
                  "A genuinely cautious, safety-first plan grounded in the course's risk understanding — with a limited hot wallet, sound risk limits, and 'not using DeFi/Web3' being a valid, well-reasoned choice. Honest about the substantial risks.",
              },
              {
                criterion: "Complete and coherent",
                weight: 35,
                descriptor:
                  "All seven areas present and coherent — decision, safety setup, risk limits, activities, scam defence, staying safe over time, and ethics — forming a real plan, and closing the loop with lesson one.",
              },
              {
                criterion: "Skeptical and wise",
                weight: 25,
                descriptor:
                  "Demonstrates deep skepticism (yields judged by source, scams recognised, greed/FOMO resisted), clear thinking beyond hype and cynicism, and ethical engagement — the wise, safety-first culmination of the course.",
              },
            ],
          },
        },
      ],
    },
  ],
};

