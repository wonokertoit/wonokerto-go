ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "rating" integer;
ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "feedback" text;
ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "feedback_created_at" timestamp;
