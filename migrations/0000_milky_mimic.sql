DO $$ BEGIN
 CREATE TYPE "public"."ROLE" AS ENUM('SUPER_ADMIN', 'SUB_ADMIN', 'WHITE_LABEL_ADMIN', 'WHITE_LABEL_SUB_ADMIN', 'CLIENT_SUPER_USER', 'CLIENT_USER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."USER_STATUS" AS ENUM('REJECTED', 'APPROVED', 'REQUESTED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"name" varchar NOT NULL,
	"phone_no" varchar,
	"avatar" varchar,
	"role" "ROLE" DEFAULT 'CLIENT_SUPER_USER' NOT NULL,
	"is_active" boolean DEFAULT false,
	"password" varchar NOT NULL,
	"password_reset_token" varchar,
	"set_password_token" varchar,
	"status" "USER_STATUS" NOT NULL,
	"permissions" text[],
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar,
	"content" text NOT NULL,
	"status" "USER_STATUS" NOT NULL,
	"user_id" integer,
	"created_at" date DEFAULT now(),
	"updated_at" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar,
	"created_at" date DEFAULT now(),
	"updated_at" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories_posts" (
	"post_id" integer,
	"category_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "categories_posts" ADD CONSTRAINT "categories_posts_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "categories_posts" ADD CONSTRAINT "categories_posts_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
