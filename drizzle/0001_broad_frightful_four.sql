CREATE TABLE IF NOT EXISTS "bitscenes_students" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"usn" varchar(50) NOT NULL,
	"username" varchar(255) NOT NULL,
	"branch" varchar(255) NOT NULL,
	"social_links" json NOT NULL,
	"intrests" varchar[] NOT NULL
);
