ALTER TABLE "bitscenes_post" ADD COLUMN "parent_post_id" integer;--> statement-breakpoint
ALTER TABLE "bitscenes_post" ADD COLUMN "likes" integer DEFAULT 0;