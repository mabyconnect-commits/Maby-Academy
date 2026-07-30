-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "outcomes" TEXT[] DEFAULT ARRAY[]::TEXT[];
