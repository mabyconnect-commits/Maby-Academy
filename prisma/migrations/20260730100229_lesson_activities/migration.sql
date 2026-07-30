-- AlterTable
ALTER TABLE "lesson_progress" ADD COLUMN     "reflection" TEXT;

-- AlterTable
ALTER TABLE "lessons" ADD COLUMN     "activityPrompt" TEXT,
ADD COLUMN     "activityTitle" TEXT,
ADD COLUMN     "minReflectionChars" INTEGER NOT NULL DEFAULT 0;
