import type { ContentCourse } from "./types";
import { cryptoFromZero } from "./crypto-from-zero";
import { moneyThatLasts } from "./money-that-lasts";

/**
 * The authored curriculum.
 *
 * Courses listed here are loaded by the seed *after* the inline course seed, so
 * a slug appearing in both places is authored here — the inline version becomes
 * the skeleton and this becomes the content. That precedence is why the loader
 * updates in place rather than recreating: student progress must survive it.
 */
export const AUTHORED_COURSES: ContentCourse[] = [cryptoFromZero, moneyThatLasts];

export { loadCourse, loadCourses } from "./load";
export type { ContentCourse, ContentLesson, ContentModule } from "./types";
