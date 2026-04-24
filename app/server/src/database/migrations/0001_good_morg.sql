CREATE TABLE "api_calls" (
	"api_call_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"api_name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_updated" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "api_calls_api_call_id_unique" UNIQUE("api_call_id"),
	CONSTRAINT "api_calls_api_name_unique" UNIQUE("api_name")
);
