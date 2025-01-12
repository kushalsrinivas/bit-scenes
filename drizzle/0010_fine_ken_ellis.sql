ALTER TABLE "bitscenes_postLikes" DROP CONSTRAINT "bitscenes_postLikes_post_id_bitscenes_post_postId_fk";
--> statement-breakpoint
ALTER TABLE "bitscenes_postLikes" DROP CONSTRAINT "bitscenes_postLikes_user_id_bitscenes_user_id_fk";
--> statement-breakpoint
ALTER TABLE "bitscenes_postLikes" DROP COLUMN IF EXISTS "created_at";