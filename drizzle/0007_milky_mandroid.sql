CREATE TABLE IF NOT EXISTS "bitscenes_postLikes" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"post_id" varchar(255) NOT NULL,
	"user_id" varchar(255) NOT NULL
);
