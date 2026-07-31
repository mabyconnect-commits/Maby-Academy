-- CreateEnum
CREATE TYPE "SeasonStatus" AS ENUM ('DRAFT', 'OPEN', 'LOCKED', 'SETTLED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "SeasonResultStatus" AS ENUM ('PENDING_REVIEW', 'APPROVED', 'WITHHELD', 'PAID');

-- CreateTable
CREATE TABLE "seasons" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "blurb" TEXT,
    "status" "SeasonStatus" NOT NULL DEFAULT 'DRAFT',
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "prizePoolMinor" INTEGER NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "minActiveDays" INTEGER NOT NULL DEFAULT 3,
    "minQualifyingPoints" INTEGER NOT NULL DEFAULT 100,
    "lockedAt" TIMESTAMP(3),
    "lockedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "season_prizes" (
    "id" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "rankFrom" INTEGER NOT NULL,
    "rankTo" INTEGER NOT NULL,
    "amountMinor" INTEGER NOT NULL,
    "label" TEXT,

    CONSTRAINT "season_prizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "season_results" (
    "id" TEXT NOT NULL,
    "seasonId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "qualifyingPoints" INTEGER NOT NULL,
    "activeDays" INTEGER NOT NULL,
    "prizeMinor" INTEGER NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "status" "SeasonResultStatus" NOT NULL DEFAULT 'PENDING_REVIEW',
    "withheldReason" TEXT,
    "flags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "reviewedById" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "payoutRef" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "season_results_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "seasons_slug_key" ON "seasons"("slug");

-- CreateIndex
CREATE INDEX "seasons_status_startsAt_idx" ON "seasons"("status", "startsAt");

-- CreateIndex
CREATE INDEX "season_prizes_seasonId_idx" ON "season_prizes"("seasonId");

-- CreateIndex
CREATE UNIQUE INDEX "season_prizes_seasonId_rankFrom_key" ON "season_prizes"("seasonId", "rankFrom");

-- CreateIndex
CREATE INDEX "season_results_seasonId_rank_idx" ON "season_results"("seasonId", "rank");

-- CreateIndex
CREATE INDEX "season_results_userId_idx" ON "season_results"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "season_results_seasonId_userId_key" ON "season_results"("seasonId", "userId");

-- AddForeignKey
ALTER TABLE "seasons" ADD CONSTRAINT "seasons_lockedById_fkey" FOREIGN KEY ("lockedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "season_prizes" ADD CONSTRAINT "season_prizes_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "seasons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "season_results" ADD CONSTRAINT "season_results_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "seasons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "season_results" ADD CONSTRAINT "season_results_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "season_results" ADD CONSTRAINT "season_results_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
