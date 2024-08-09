ALTER TABLE "posts" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "categories_posts" ALTER COLUMN "post_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "categories_posts" ALTER COLUMN "category_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "categories_posts" ADD CONSTRAINT "categories_posts_post_id_category_id_pk" PRIMARY KEY("post_id","category_id");