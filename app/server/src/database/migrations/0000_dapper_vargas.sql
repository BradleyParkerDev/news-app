CREATE TYPE "public"."theme" AS ENUM('light', 'dark');--> statement-breakpoint
CREATE TYPE "public"."news_category" AS ENUM('business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology');--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"storage_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text,
	"last_name" text,
	"email_address" text NOT NULL,
	"user_name" text NOT NULL,
	"password" text NOT NULL,
	"last_updated" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "users_storage_id_unique" UNIQUE("storage_id"),
	CONSTRAINT "users_email_address_unique" UNIQUE("email_address"),
	CONSTRAINT "users_user_name_unique" UNIQUE("user_name")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"session_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"start_time" timestamp DEFAULT now() NOT NULL,
	"expiration_time" timestamp NOT NULL,
	"ip_address" varchar(45),
	"user_agent" text,
	CONSTRAINT "sessions_session_id_unique" UNIQUE("session_id")
);
--> statement-breakpoint
CREATE TABLE "user_themes" (
	"theme_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"session_id" uuid,
	"theme" "theme" DEFAULT 'light' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_updated" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_themes_theme_id_unique" UNIQUE("theme_id")
);
--> statement-breakpoint
CREATE TABLE "user_profile_images" (
	"user_profile_image_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"image_url" text,
	"image_key" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_profile_images_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "articles" (
	"article_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"source_id" text,
	"source_name" text NOT NULL,
	"author" text,
	"title" text NOT NULL,
	"description" text,
	"url" text NOT NULL,
	"url_to_image" text,
	"published_at" timestamp,
	"content" text,
	"category" "news_category" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_updated" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "articles_article_id_unique" UNIQUE("article_id"),
	CONSTRAINT "articles_url_unique" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE "saved_articles" (
	"saved_article_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"article_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_updated" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "saved_articles_saved_article_id_unique" UNIQUE("saved_article_id")
);
--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_themes" ADD CONSTRAINT "user_themes_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_themes" ADD CONSTRAINT "user_themes_session_id_sessions_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("session_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profile_images" ADD CONSTRAINT "user_profile_images_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_articles" ADD CONSTRAINT "saved_articles_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_articles" ADD CONSTRAINT "saved_articles_article_id_articles_article_id_fk" FOREIGN KEY ("article_id") REFERENCES "public"."articles"("article_id") ON DELETE cascade ON UPDATE no action;