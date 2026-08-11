-- A new pillar for AI. Added as its own migration and not used in the same
-- transaction, so Postgres accepts the new enum value cleanly.
ALTER TYPE "Pillar" ADD VALUE IF NOT EXISTS 'AI';
