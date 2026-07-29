-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "CourseStatus" ADD VALUE 'IN_REVIEW';
ALTER TYPE "CourseStatus" ADD VALUE 'CHANGES_REQUESTED';
ALTER TYPE "CourseStatus" ADD VALUE 'APPROVED';

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "reviewNotes" TEXT,
ADD COLUMN     "reviewedAt" TIMESTAMP(3),
ADD COLUMN     "reviewedById" TEXT,
ADD COLUMN     "submittedForReviewAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "lessons" ADD COLUMN     "minWatchPercent" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "course_review_logs" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "fromStatus" "CourseStatus" NOT NULL,
    "toStatus" "CourseStatus" NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "course_review_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rate_limits" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "windowStart" TIMESTAMP(3) NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rate_limits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "course_review_logs_courseId_createdAt_idx" ON "course_review_logs"("courseId", "createdAt");

-- CreateIndex
CREATE INDEX "rate_limits_expiresAt_idx" ON "rate_limits"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "rate_limits_key_windowStart_key" ON "rate_limits"("key", "windowStart");

-- AddForeignKey
ALTER TABLE "course_review_logs" ADD CONSTRAINT "course_review_logs_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
