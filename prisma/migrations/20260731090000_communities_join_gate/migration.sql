-- Free enrolment is gated on joining the academy's communities and channels.
-- Null = not yet confirmed.
ALTER TABLE "users" ADD COLUMN "communitiesJoinedAt" TIMESTAMP(3);
