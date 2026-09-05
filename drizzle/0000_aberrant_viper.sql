CREATE TABLE "academy_workshops" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"type" varchar(50) NOT NULL,
	"description" text,
	"duration_days" integer DEFAULT 1 NOT NULL,
	"institution" varchar(255),
	"conducted_at" timestamp,
	"participant_count" integer,
	"cover_image_url" text,
	"topics_covered" text[],
	"testimonial" varchar(500),
	"is_published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "academy_workshops_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "contact_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(20),
	"type" varchar(20) NOT NULL,
	"message" text NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_brochures" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" varchar(20) NOT NULL,
	"title" varchar(255) NOT NULL,
	"file_url" text NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_metrics" (
	"id" serial PRIMARY KEY NOT NULL,
	"systems_deployed" integer DEFAULT 0 NOT NULL,
	"workshops_conducted" integer DEFAULT 0 NOT NULL,
	"participants_trained" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "solutions_projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"abstract" varchar(300) NOT NULL,
	"tech_stack" text[] NOT NULL,
	"hero_asset_url" text,
	"architecture_content" text,
	"is_published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "solutions_projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "team_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255),
	"name" varchar(255) NOT NULL,
	"role" varchar(255) NOT NULL,
	"bio" varchar(500) NOT NULL,
	"tech_stack" text[] NOT NULL,
	"photo_url" text,
	"github_url" text,
	"linkedin_url" text,
	"display_order" integer DEFAULT 99 NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "team_members_slug_unique" UNIQUE("slug")
);
