import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Enter a valid email address");

/**
 * Length is the dominant factor in password strength, so we require a real
 * minimum and one non-letter rather than a thicket of character classes.
 */
export const passwordSchema = z
  .string()
  .min(10, "Password must be at least 10 characters")
  .max(200, "Password is too long")
  .refine((v) => /[a-zA-Z]/.test(v), "Password must contain a letter")
  .refine((v) => /[0-9]|[^a-zA-Z0-9]/.test(v), "Password must contain a number or symbol");

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Tell us your name").max(80),
  email: emailSchema,
  password: passwordSchema,
  referralCode: z
    .string()
    .trim()
    .toUpperCase()
    .max(20)
    .optional()
    .or(z.literal("")),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Enter your password"),
});

export const requestResetSchema = z.object({ email: emailSchema });

export const resetPasswordSchema = z.object({
  token: z.string().min(10),
  password: passwordSchema,
});

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2).max(80),
  bio: z.string().trim().max(600).optional().or(z.literal("")),
  country: z.string().trim().max(60).optional().or(z.literal("")),
  timezone: z.string().trim().max(60).optional().or(z.literal("")),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Enter your current password"),
  newPassword: passwordSchema,
});

// --- Learning ------------------------------------------------------------

export const progressSchema = z.object({
  lessonId: z.string().min(1),
  watchedSeconds: z.coerce.number().int().min(0).max(60 * 60 * 24).optional(),
  completed: z.coerce.boolean().optional(),
});

export const submissionSchema = z
  .object({
    assignmentId: z.string().min(1),
    textAnswer: z.string().trim().max(20000).optional().or(z.literal("")),
    linkUrl: z
      .string()
      .trim()
      .url("Enter a valid URL")
      .optional()
      .or(z.literal("")),
    fileUrl: z.string().trim().max(500).optional().or(z.literal("")),
    asDraft: z.coerce.boolean().optional(),
  })
  .refine(
    (v) => Boolean(v.textAnswer || v.linkUrl || v.fileUrl),
    { message: "Add an answer, a link or a file before submitting.", path: ["textAnswer"] },
  );

export const gradeSchema = z.object({
  submissionId: z.string().min(1),
  score: z.coerce.number().int().min(0).max(1000),
  feedback: z.string().trim().max(5000).optional().or(z.literal("")),
  rubricScores: z.record(z.string(), z.coerce.number()).optional(),
});

export const quizAttemptSchema = z.object({
  quizId: z.string().min(1),
  answers: z
    .array(
      z.object({
        questionId: z.string().min(1),
        selectedOptionIds: z.array(z.string().min(1)),
      }),
    )
    .min(1, "Answer at least one question"),
});

// --- Community -----------------------------------------------------------

export const rsvpSchema = z.object({ sessionId: z.string().min(1) });

export const reviewSchema = z.object({
  courseId: z.string().min(1),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const enrollSchema = z.object({ courseId: z.string().min(1) });

// --- Lesson questions box ------------------------------------------------

export const lessonQuestionSchema = z.object({
  lessonId: z.string().min(1),
  body: z
    .string()
    .trim()
    .min(5, "Add a little detail so someone can actually help.")
    .max(4000, "That question is too long — trim it down."),
});

export const lessonAnswerSchema = z.object({
  questionId: z.string().min(1),
  body: z
    .string()
    .trim()
    .min(2, "Write your answer first.")
    .max(8000, "That answer is too long — trim it down."),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
