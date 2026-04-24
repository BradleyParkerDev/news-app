ALTER TABLE "api_calls" ALTER COLUMN "last_updated" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "api_calls" ALTER COLUMN "last_updated" DROP NOT NULL;--> statement-breakpoint
UPDATE "api_calls"
SET "last_updated" = NULL
WHERE "created_at" = "last_updated";
