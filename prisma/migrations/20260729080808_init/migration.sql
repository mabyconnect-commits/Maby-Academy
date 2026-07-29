-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'INSTRUCTOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "Pillar" AS ENUM ('CRYPTO', 'WEB3', 'FINANCE', 'TRADING', 'ONCHAIN_ANALYSIS', 'BUSINESS', 'FAITH', 'HEALTH', 'MINDSET', 'LIFE_SKILLS');

-- CreateEnum
CREATE TYPE "CourseLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "LessonType" AS ENUM ('VIDEO', 'TEXT', 'QUIZ', 'ASSIGNMENT', 'LIVE');

-- CreateEnum
CREATE TYPE "EnrollmentStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'GRADED', 'RETURNED');

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('SINGLE_CHOICE', 'MULTI_CHOICE', 'TRUE_FALSE');

-- CreateEnum
CREATE TYPE "LiveSessionStatus" AS ENUM ('SCHEDULED', 'LIVE', 'ENDED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "CommissionStatus" AS ENUM ('PENDING', 'APPROVED', 'PAID', 'VOID');

-- CreateEnum
CREATE TYPE "PointsReason" AS ENUM ('LESSON_COMPLETED', 'QUIZ_PASSED', 'ASSIGNMENT_GRADED', 'COURSE_COMPLETED', 'LIVE_ATTENDED', 'STREAK_BONUS', 'REFERRAL_SIGNUP', 'BADGE_AWARDED', 'MANUAL_ADJUSTMENT', 'REDEMPTION');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('SYSTEM', 'COURSE', 'ASSIGNMENT', 'GRADE', 'CERTIFICATE', 'LIVE_SESSION', 'REFERRAL', 'REWARD');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "avatarUrl" TEXT,
    "bio" TEXT,
    "country" TEXT,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "emailVerifiedAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLoginAt" TIMESTAMP(3),
    "referralCode" TEXT NOT NULL,
    "referredById" TEXT,
    "pointsBalance" INTEGER NOT NULL DEFAULT 0,
    "lifetimePoints" INTEGER NOT NULL DEFAULT 0,
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,
    "lastActiveDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastActivityAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verification_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password_reset_tokens" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "pillar" "Pillar" NOT NULL,
    "description" TEXT,
    "iconEmoji" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "trailerUrl" TEXT,
    "level" "CourseLevel" NOT NULL DEFAULT 'BEGINNER',
    "status" "CourseStatus" NOT NULL DEFAULT 'DRAFT',
    "priceMinor" INTEGER NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "estimatedHours" INTEGER NOT NULL DEFAULT 0,
    "passThreshold" INTEGER NOT NULL DEFAULT 80,
    "categoryId" TEXT NOT NULL,
    "instructorId" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modules" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lessons" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "LessonType" NOT NULL DEFAULT 'VIDEO',
    "content" TEXT,
    "videoUrl" TEXT,
    "videoDuration" INTEGER DEFAULT 0,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isPreview" BOOLEAN NOT NULL DEFAULT false,
    "pointsValue" INTEGER NOT NULL DEFAULT 10,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lessons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lesson_resources" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "kind" TEXT NOT NULL DEFAULT 'link',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lesson_resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enrollments" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "status" "EnrollmentStatus" NOT NULL DEFAULT 'ACTIVE',
    "progressPercent" INTEGER NOT NULL DEFAULT 0,
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "lastAccessedAt" TIMESTAMP(3),
    "lastLessonId" TEXT,

    CONSTRAINT "enrollments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lesson_progress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "watchedSeconds" INTEGER NOT NULL DEFAULT 0,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lesson_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assignments" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "rubric" JSONB,
    "maxScore" INTEGER NOT NULL DEFAULT 100,
    "passScore" INTEGER NOT NULL DEFAULT 60,
    "dueAt" TIMESTAMP(3),
    "allowsFile" BOOLEAN NOT NULL DEFAULT true,
    "allowsText" BOOLEAN NOT NULL DEFAULT true,
    "pointsValue" INTEGER NOT NULL DEFAULT 50,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "submissions" (
    "id" TEXT NOT NULL,
    "assignmentId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'DRAFT',
    "textAnswer" TEXT,
    "fileUrl" TEXT,
    "linkUrl" TEXT,
    "attempt" INTEGER NOT NULL DEFAULT 1,
    "score" INTEGER,
    "rubricScores" JSONB,
    "feedback" TEXT,
    "graderId" TEXT,
    "gradedAt" TIMESTAMP(3),
    "submittedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quizzes" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "passScore" INTEGER NOT NULL DEFAULT 70,
    "timeLimitMins" INTEGER,
    "maxAttempts" INTEGER NOT NULL DEFAULT 3,
    "shuffle" BOOLEAN NOT NULL DEFAULT true,
    "pointsValue" INTEGER NOT NULL DEFAULT 30,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quizzes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_questions" (
    "id" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "type" "QuestionType" NOT NULL DEFAULT 'SINGLE_CHOICE',
    "explanation" TEXT,
    "points" INTEGER NOT NULL DEFAULT 1,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "quiz_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_options" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "quiz_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_attempts" (
    "id" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "attempt" INTEGER NOT NULL DEFAULT 1,
    "scorePercent" INTEGER NOT NULL DEFAULT 0,
    "passed" BOOLEAN NOT NULL DEFAULT false,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submittedAt" TIMESTAMP(3),

    CONSTRAINT "quiz_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_answers" (
    "id" TEXT NOT NULL,
    "attemptId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "selectedOptionIds" TEXT[],
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "quiz_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certificates" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "serial" TEXT NOT NULL,
    "verifyToken" TEXT NOT NULL,
    "finalScore" INTEGER,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" TIMESTAMP(3),
    "revokeReason" TEXT,

    CONSTRAINT "certificates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "live_sessions" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "hostId" TEXT NOT NULL,
    "courseId" TEXT,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "meetingUrl" TEXT,
    "replayUrl" TEXT,
    "status" "LiveSessionStatus" NOT NULL DEFAULT 'SCHEDULED',
    "capacity" INTEGER,
    "pointsValue" INTEGER NOT NULL DEFAULT 20,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "live_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "live_session_rsvps" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "attended" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "live_session_rsvps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "amountMinor" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "provider" TEXT NOT NULL DEFAULT 'manual',
    "providerRef" TEXT,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referral_commissions" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "beneficiaryId" TEXT NOT NULL,
    "sourceUserId" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "ratePercent" INTEGER NOT NULL,
    "amountMinor" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "status" "CommissionStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "referral_commissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "points_transactions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "reason" "PointsReason" NOT NULL,
    "referenceKey" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "points_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "badges" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "iconEmoji" TEXT NOT NULL DEFAULT '🏅',
    "pointsValue" INTEGER NOT NULL DEFAULT 0,
    "criteria" JSONB,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "badges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_badges" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "badgeId" TEXT NOT NULL,
    "awardedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_badges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_reviews" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "course_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL DEFAULT 'SYSTEM',
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "linkUrl" TEXT,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT,
    "entityId" TEXT,
    "metadata" JSONB,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_referralCode_key" ON "users"("referralCode");

-- CreateIndex
CREATE INDEX "users_referredById_idx" ON "users"("referredById");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_tokenHash_key" ON "sessions"("tokenHash");

-- CreateIndex
CREATE INDEX "sessions_userId_idx" ON "sessions"("userId");

-- CreateIndex
CREATE INDEX "sessions_expiresAt_idx" ON "sessions"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_tokenHash_key" ON "verification_tokens"("tokenHash");

-- CreateIndex
CREATE INDEX "verification_tokens_userId_idx" ON "verification_tokens"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_tokens_tokenHash_key" ON "password_reset_tokens"("tokenHash");

-- CreateIndex
CREATE INDEX "password_reset_tokens_userId_idx" ON "password_reset_tokens"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "courses_slug_key" ON "courses"("slug");

-- CreateIndex
CREATE INDEX "courses_status_idx" ON "courses"("status");

-- CreateIndex
CREATE INDEX "courses_categoryId_idx" ON "courses"("categoryId");

-- CreateIndex
CREATE INDEX "courses_instructorId_idx" ON "courses"("instructorId");

-- CreateIndex
CREATE INDEX "modules_courseId_idx" ON "modules"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "modules_courseId_sortOrder_key" ON "modules"("courseId", "sortOrder");

-- CreateIndex
CREATE INDEX "lessons_moduleId_idx" ON "lessons"("moduleId");

-- CreateIndex
CREATE UNIQUE INDEX "lessons_moduleId_slug_key" ON "lessons"("moduleId", "slug");

-- CreateIndex
CREATE INDEX "lesson_resources_lessonId_idx" ON "lesson_resources"("lessonId");

-- CreateIndex
CREATE INDEX "enrollments_userId_idx" ON "enrollments"("userId");

-- CreateIndex
CREATE INDEX "enrollments_courseId_idx" ON "enrollments"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "enrollments_userId_courseId_key" ON "enrollments"("userId", "courseId");

-- CreateIndex
CREATE INDEX "lesson_progress_userId_idx" ON "lesson_progress"("userId");

-- CreateIndex
CREATE INDEX "lesson_progress_lessonId_idx" ON "lesson_progress"("lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "lesson_progress_userId_lessonId_key" ON "lesson_progress"("userId", "lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "assignments_lessonId_key" ON "assignments"("lessonId");

-- CreateIndex
CREATE INDEX "submissions_studentId_idx" ON "submissions"("studentId");

-- CreateIndex
CREATE INDEX "submissions_assignmentId_idx" ON "submissions"("assignmentId");

-- CreateIndex
CREATE INDEX "submissions_status_idx" ON "submissions"("status");

-- CreateIndex
CREATE UNIQUE INDEX "submissions_assignmentId_studentId_attempt_key" ON "submissions"("assignmentId", "studentId", "attempt");

-- CreateIndex
CREATE UNIQUE INDEX "quizzes_lessonId_key" ON "quizzes"("lessonId");

-- CreateIndex
CREATE INDEX "quiz_questions_quizId_idx" ON "quiz_questions"("quizId");

-- CreateIndex
CREATE INDEX "quiz_options_questionId_idx" ON "quiz_options"("questionId");

-- CreateIndex
CREATE INDEX "quiz_attempts_userId_idx" ON "quiz_attempts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "quiz_attempts_quizId_userId_attempt_key" ON "quiz_attempts"("quizId", "userId", "attempt");

-- CreateIndex
CREATE UNIQUE INDEX "quiz_answers_attemptId_questionId_key" ON "quiz_answers"("attemptId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "certificates_serial_key" ON "certificates"("serial");

-- CreateIndex
CREATE UNIQUE INDEX "certificates_verifyToken_key" ON "certificates"("verifyToken");

-- CreateIndex
CREATE INDEX "certificates_userId_idx" ON "certificates"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "certificates_userId_courseId_key" ON "certificates"("userId", "courseId");

-- CreateIndex
CREATE INDEX "live_sessions_startsAt_idx" ON "live_sessions"("startsAt");

-- CreateIndex
CREATE INDEX "live_sessions_courseId_idx" ON "live_sessions"("courseId");

-- CreateIndex
CREATE INDEX "live_session_rsvps_userId_idx" ON "live_session_rsvps"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "live_session_rsvps_sessionId_userId_key" ON "live_session_rsvps"("sessionId", "userId");

-- CreateIndex
CREATE INDEX "orders_userId_idx" ON "orders"("userId");

-- CreateIndex
CREATE INDEX "orders_status_idx" ON "orders"("status");

-- CreateIndex
CREATE INDEX "referral_commissions_beneficiaryId_idx" ON "referral_commissions"("beneficiaryId");

-- CreateIndex
CREATE INDEX "referral_commissions_status_idx" ON "referral_commissions"("status");

-- CreateIndex
CREATE UNIQUE INDEX "referral_commissions_orderId_beneficiaryId_key" ON "referral_commissions"("orderId", "beneficiaryId");

-- CreateIndex
CREATE INDEX "points_transactions_userId_idx" ON "points_transactions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "points_transactions_userId_referenceKey_key" ON "points_transactions"("userId", "referenceKey");

-- CreateIndex
CREATE UNIQUE INDEX "badges_code_key" ON "badges"("code");

-- CreateIndex
CREATE INDEX "user_badges_userId_idx" ON "user_badges"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_badges_userId_badgeId_key" ON "user_badges"("userId", "badgeId");

-- CreateIndex
CREATE INDEX "course_reviews_courseId_idx" ON "course_reviews"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "course_reviews_courseId_userId_key" ON "course_reviews"("courseId", "userId");

-- CreateIndex
CREATE INDEX "notifications_userId_readAt_idx" ON "notifications"("userId", "readAt");

-- CreateIndex
CREATE INDEX "audit_logs_userId_idx" ON "audit_logs"("userId");

-- CreateIndex
CREATE INDEX "audit_logs_action_idx" ON "audit_logs"("action");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_referredById_fkey" FOREIGN KEY ("referredById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verification_tokens" ADD CONSTRAINT "verification_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modules" ADD CONSTRAINT "modules_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_resources" ADD CONSTRAINT "lesson_resources_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_progress" ADD CONSTRAINT "lesson_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_progress" ADD CONSTRAINT "lesson_progress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_graderId_fkey" FOREIGN KEY ("graderId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_questions" ADD CONSTRAINT "quiz_questions_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quizzes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_options" ADD CONSTRAINT "quiz_options_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "quiz_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quizzes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_answers" ADD CONSTRAINT "quiz_answers_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "quiz_attempts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_answers" ADD CONSTRAINT "quiz_answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "quiz_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "live_sessions" ADD CONSTRAINT "live_sessions_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "live_sessions" ADD CONSTRAINT "live_sessions_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "live_session_rsvps" ADD CONSTRAINT "live_session_rsvps_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "live_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "live_session_rsvps" ADD CONSTRAINT "live_session_rsvps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_commissions" ADD CONSTRAINT "referral_commissions_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_commissions" ADD CONSTRAINT "referral_commissions_beneficiaryId_fkey" FOREIGN KEY ("beneficiaryId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_commissions" ADD CONSTRAINT "referral_commissions_sourceUserId_fkey" FOREIGN KEY ("sourceUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "points_transactions" ADD CONSTRAINT "points_transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES "badges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_reviews" ADD CONSTRAINT "course_reviews_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_reviews" ADD CONSTRAINT "course_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
