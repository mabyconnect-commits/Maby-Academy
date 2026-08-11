-- The lesson "questions box": in-context Q&A attached to a single lesson, so a
-- learner can ask the moment something doesn't click and peers or mentors can
-- answer without leaving the lesson.

-- CreateTable
CREATE TABLE "lesson_questions" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "status" "ModerationStatus" NOT NULL DEFAULT 'VISIBLE',
    "answerCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lesson_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lesson_answers" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "isAccepted" BOOLEAN NOT NULL DEFAULT false,
    "status" "ModerationStatus" NOT NULL DEFAULT 'VISIBLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lesson_answers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "lesson_questions_lessonId_createdAt_idx" ON "lesson_questions"("lessonId", "createdAt");

-- CreateIndex
CREATE INDEX "lesson_questions_authorId_idx" ON "lesson_questions"("authorId");

-- CreateIndex
CREATE INDEX "lesson_answers_questionId_createdAt_idx" ON "lesson_answers"("questionId", "createdAt");

-- CreateIndex
CREATE INDEX "lesson_answers_authorId_idx" ON "lesson_answers"("authorId");

-- AddForeignKey
ALTER TABLE "lesson_questions" ADD CONSTRAINT "lesson_questions_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_questions" ADD CONSTRAINT "lesson_questions_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_answers" ADD CONSTRAINT "lesson_answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "lesson_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_answers" ADD CONSTRAINT "lesson_answers_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
