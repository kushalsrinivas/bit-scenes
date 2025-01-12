ALTER TABLE "bitscenes_postLikes" ADD COLUMN "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bitscenes_postLikes" ADD CONSTRAINT "bitscenes_postLikes_post_id_bitscenes_post_postId_fk" FOREIGN KEY ("post_id") REFERENCES "public"."bitscenes_post"("postId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bitscenes_postLikes" ADD CONSTRAINT "bitscenes_postLikes_user_id_bitscenes_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."bitscenes_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
