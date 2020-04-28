
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user"
(
    "id" SERIAL PRIMARY KEY,
    "displayname" VARCHAR (80) NOT NULL,
    "steamid64" VARCHAR (64) NOT NULL,
    "steamid3" VARCHAR (64) NOT NULL
);