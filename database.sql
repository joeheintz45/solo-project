
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
	"id" serial primary key,
	"username" varchar(50) UNIQUE NOT NULL,
	"password" varchar(30) NOT NULL
);

CREATE TABLE "projects" (
	"id" serial primary key,
	"project_desc" varchar(400),
	"project_link" varchar(200) NOT NULL,
	"profile_id" int references "user"
);

CREATE TABLE "profile" (
	"id" serial primary key,
	"user_id" int references "user",
	"bio" varchar (350),
	"display_name" varchar(50),
	"profile_pic" varchar(200)
);

CREATE TABLE "collab_post" (
	"id" serial primary key,
	"user_id" int references "user",
	"likes" int,
	"published" date,
	"location_id" int references "map"
);

CREATE TABLE "map" (
	"id" serial primary key,
	"location" varchar (60)
);

CREATE TABLE "messages" (
	"id" serial primary key,
	"message" varchar(400)
);

CREATE TABLE "user_messages" (
	"id" serial primary key,
	"primary_user" int references "user",
	"secondary_user" int references "user",
	"message_id" int references "messages"
);

CREATE TABLE "musician_types" (
	"id" serial primary key,
	"type" varchar(40)
);

CREATE TABLE "profile_types" (
	"id" serial primary key,
	"profile_id" int references "profile",
	"type_id" int references "musician_types"
);