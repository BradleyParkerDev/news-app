ALTER TABLE "api_calls" ALTER COLUMN "last_updated" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "api_calls" ALTER COLUMN "last_updated" DROP NOT NULL;