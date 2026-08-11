import type { ContentCourse } from "./types";
import { cryptoFromZero } from "./crypto-from-zero";
import { moneyThatLasts } from "./money-that-lasts";
import { strongFoundations } from "./strong-foundations";
import { characterAndCalling } from "./character-and-calling";
import { riskFirstTrading } from "./risk-first-trading";
import { readingTheChain } from "./reading-the-chain";
import { skillToIncome } from "./skill-to-income";
import { emotionalIntelligence } from "./emotional-intelligence";
import { wisdomForLiving } from "./wisdom-for-living";
import { defiAndWeb3 } from "./defi-and-web3";
import { securityAndScams } from "./security-and-scams";
import { stablecoinsAndBorders } from "./stablecoins-and-borders";
import { marketStructure } from "./market-structure";
import { leverageWithoutRuin } from "./leverage-without-ruin";
import { tokenomics } from "./tokenomics";
import { buildTheBusiness } from "./build-the-business";
import { leadingOthers } from "./leading-others";
import { deepFocus } from "./deep-focus";
import { queryTheChain } from "./query-the-chain";
import { restAndRecovery } from "./rest-and-recovery";
import { aiFromZero } from "./ai-from-zero";
import { aiForIncome } from "./ai-for-income";
import { aiAndTheChain } from "./ai-and-the-chain";

/**
 * The authored curriculum.
 *
 * Courses listed here are loaded by the seed *after* the inline course seed, so
 * a slug appearing in both places is authored here — the inline version becomes
 * the skeleton and this becomes the content. That precedence is why the loader
 * updates in place rather than recreating: student progress must survive it.
 */
export const AUTHORED_COURSES: ContentCourse[] = [
  cryptoFromZero,
  moneyThatLasts,
  strongFoundations,
  characterAndCalling,
  riskFirstTrading,
  readingTheChain,
  skillToIncome,
  emotionalIntelligence,
  wisdomForLiving,
  defiAndWeb3,
  securityAndScams,
  stablecoinsAndBorders,
  marketStructure,
  leverageWithoutRuin,
  tokenomics,
  buildTheBusiness,
  leadingOthers,
  deepFocus,
  queryTheChain,
  restAndRecovery,
  aiFromZero,
  aiForIncome,
  aiAndTheChain,
];

export { loadCourse, loadCourses } from "./load";
export type { ContentCourse, ContentLesson, ContentModule } from "./types";
