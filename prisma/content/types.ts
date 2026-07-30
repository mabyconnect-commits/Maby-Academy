/**
 * Course content, authored as data.
 *
 * Lessons live here as TypeScript rather than in the seed script so the
 * curriculum can be reviewed as prose in a diff, and so the seed stays a thin
 * loader. One file per course keeps a forty-lesson course reviewable.
 *
 * The shape mirrors the Prisma models closely but not exactly — it omits ids,
 * ordering and slugs, all of which are derived at load time. That is deliberate:
 * an author should not have to keep `sortOrder` correct by hand, and a
 * hand-written slug is one more thing that can collide.
 */

export type QuizQuestion = {
  prompt: string;
  /** Shown after answering, right or wrong. The teaching happens here. */
  explanation: string;
  options: { text: string; correct: boolean }[];
};

export type LessonQuiz = {
  title: string;
  /** Percentage needed to pass. */
  passScore: number;
  maxAttempts: number;
  questions: QuizQuestion[];
};

export type LessonAssignment = {
  title: string;
  instructions: string;
  maxScore: number;
  passScore: number;
  /** Criterion name → what full marks looks like. */
  rubric: { criterion: string; weight: number; descriptor: string }[];
};

export type ContentLesson = {
  title: string;
  type: "TEXT" | "VIDEO" | "QUIZ" | "ASSIGNMENT" | "LIVE";
  /**
   * The lesson body. Blank line separates paragraphs; `## ` a heading,
   * `### ` a subheading, `- ` a list item — the same subset the lesson
   * renderer understands. Deliberately not arbitrary HTML.
   */
  body: string;
  /** Free preview lessons are readable without enrolling. */
  isPreview?: boolean;
  points?: number;
  /** An in-lesson exercise: no grading, no submission, just the work. */
  activity?: { title: string; prompt: string };
  quiz?: LessonQuiz;
  assignment?: LessonAssignment;
};

export type ContentModule = {
  title: string;
  description: string;
  lessons: ContentLesson[];
};

export type ContentCourse = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  /** Category slug, which must already exist in the seed. */
  categorySlug: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  priceMinor: number;
  currency?: string;
  estimatedHours: number;
  /** Completion share required for a certificate. */
  passThreshold: number;
  /** Instructor email, which must already exist in the seed. */
  instructorEmail: string;
  outcomes: string[];
  modules: ContentModule[];
};
