
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user"
(
    "id" SERIAL PRIMARY KEY,
    "displayname" VARCHAR (80) NOT NULL,
    "steamid64" VARCHAR(64) UNIQUE NOT NULL,
    "steamid3" VARCHAR(64) UNIQUE NOT NULL,
    "avatar" TEXT NOT NULL
);

CREATE TABLE "teams"
(
    "id" serial PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "gamemode" integer NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT 'true',
    "password" VARCHAR(255) NOT NULL
);

CREATE TABLE "gamemodes"
(
    "id" serial PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL
);

CREATE TABLE "team_members"
(
    "id" serial NOT NULL,
    "user_id" integer NOT NULL,
    "team_id" integer NOT NULL,
    "is_leader" BOOLEAN NOT NULL DEFAULT 'false',
    "join_date" DATE NOT NULL,
    "leave_date" DATE NOT NULL,
    "main" BOOLEAN NOT NULL DEFAULT 'true',
    "class" VARCHAR(255) NOT NULL,
    CONSTRAINT "team_members_pk" PRIMARY KEY ("id")
);



CREATE TABLE "log_base"
(
    "id" serial NOT NULL,
    "blu_id" integer NOT NULL,
    "red_id" integer NOT NULL,
    "Match" BOOLEAN NOT NULL DEFAULT 'false',
    "date" DATE NOT NULL,
    CONSTRAINT "log_base_pk" PRIMARY KEY ("id")
);



CREATE TABLE "log_stats"
(
    "id" serial NOT NULL,
    "log_id" integer NOT NULL,
    "steamid3" VARCHAR(255) NOT NULL,
    "team" VARCHAR(255) NOT NULL,
    "assists" integer NOT NULL,
    "suicides" integer NOT NULL,
    "kapd" VARCHAR(255) NOT NULL,
    "kpd" integer NOT NULL,
    "damage" integer NOT NULL,
    "damage_taken" integer NOT NULL,
    "dapm" integer NOT NULL,
    "ubers" integer NOT NULL,
    "drops" integer NOT NULL,
    "backstabs" integer NOT NULL,
    "headshots" integer NOT NULL,
    CONSTRAINT "log_stats_pk" PRIMARY KEY ("id")
);



CREATE TABLE "kills"
(
    "id" serial NOT NULL,
    "log_stat_id" integer NOT NULL,
    "Scout" integer NOT NULL DEFAULT '0',
    "Soldier" integer NOT NULL DEFAULT '0',
    "Pyro" integer NOT NULL DEFAULT '0',
    "Demo" integer NOT NULL DEFAULT '0',
    "Heavy" integer NOT NULL DEFAULT '0',
    "Engineer" integer NOT NULL DEFAULT '0',
    "Medic" integer NOT NULL DEFAULT '0',
    "Sniper" integer NOT NULL DEFAULT '0',
    "Spy" integer NOT NULL DEFAULT '0',
    CONSTRAINT "kills_pk" PRIMARY KEY ("id")
);



CREATE TABLE "deaths"
(
    "id" serial NOT NULL,
    "log_stat_id" integer NOT NULL,
    "Scout" integer NOT NULL DEFAULT '0',
    "Soldier" integer NOT NULL DEFAULT '0',
    "Pyro" integer NOT NULL DEFAULT '0',
    "Demo" integer NOT NULL DEFAULT '0',
    "Heavy" integer NOT NULL DEFAULT '0',
    "Engineer" integer NOT NULL DEFAULT '0',
    "Medic" integer NOT NULL DEFAULT '0',
    "Sniper" integer NOT NULL DEFAULT '0',
    "Spy" integer NOT NULL DEFAULT '0',
    CONSTRAINT "deaths_pk" PRIMARY KEY ("id")
);



CREATE TABLE "weapon"
(
    "id" serial NOT NULL,
    "class_stat_id" integer NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "kills" integer NOT NULL,
    "damage" integer NOT NULL,
    "shots" integer NOT NULL,
    "hits" integer NOT NULL,
    CONSTRAINT "weapon_pk" PRIMARY KEY ("id")
);



CREATE TABLE "class_stats"
(
    "id" serial NOT NULL,
    "log_stat_id" integer NOT NULL,
    "class" VARCHAR(255) NOT NULL,
    "kills" integer NOT NULL,
    "assists" integer NOT NULL,
    "deaths" integer NOT NULL,
    "damage" integer NOT NULL,
    "total_time" integer NOT NULL,
    CONSTRAINT "class_stats_pk" PRIMARY KEY ("id")
);



CREATE TABLE "red"
(
    "id" serial NOT NULL,
    "log_id" integer NOT NULL,
    "kills" serial NOT NULL,
    "damage" integer NOT NULL,
    "charges" integer NOT NULL,
    "drops" integer NOT NULL,
    "score" integer NOT NULL,
    CONSTRAINT "red_pk" PRIMARY KEY ("id")
);



CREATE TABLE "blu"
(
    "id" serial NOT NULL,
    "log_id" integer NOT NULL,
    "kills" serial NOT NULL,
    "damage" integer NOT NULL,
    "charges" integer NOT NULL,
    "drops" integer NOT NULL,
    "score" integer NOT NULL,
    CONSTRAINT "blu_pk" PRIMARY KEY ("id")
);

ALTER TABLE "team_members" ADD CONSTRAINT "team_members_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_fk1" FOREIGN KEY ("team_id") REFERENCES "teams"("id");

ALTER TABLE "log_base" ADD CONSTRAINT "log_base_fk0" FOREIGN KEY ("blu_id") REFERENCES "teams"("id");
ALTER TABLE "log_base" ADD CONSTRAINT "log_base_fk1" FOREIGN KEY ("red_id") REFERENCES "teams"("id");

ALTER TABLE "log_stats" ADD CONSTRAINT "log_stats_fk0" FOREIGN KEY ("log_id") REFERENCES "log_base"("id");
ALTER TABLE "log_stats" ADD CONSTRAINT "log_stats_fk1" FOREIGN KEY ("steamid3") REFERENCES "user"("steamid3");

ALTER TABLE "kills" ADD CONSTRAINT "kills_fk0" FOREIGN KEY ("log_stat_id") REFERENCES "log_stats"("id");

ALTER TABLE "deaths" ADD CONSTRAINT "deaths_fk0" FOREIGN KEY ("log_stat_id") REFERENCES "log_stats"("id");

ALTER TABLE "weapon" ADD CONSTRAINT "weapon_fk0" FOREIGN KEY ("class_stat_id") REFERENCES "class_stats"("id");

ALTER TABLE "class_stats" ADD CONSTRAINT "class_stats_fk0" FOREIGN KEY ("log_stat_id") REFERENCES "log_stats"("id");

ALTER TABLE "red" ADD CONSTRAINT "red_fk0" FOREIGN KEY ("log_id") REFERENCES "log_base"("id");

ALTER TABLE "blu" ADD CONSTRAINT "blu_fk0" FOREIGN KEY ("log_id") REFERENCES "log_base"("id");

ALTER TABLE "teams" ADD CONSTRAINT "teams_fk0" FOREIGN KEY ("gamemode") REFERENCES "gamemodes"("id");