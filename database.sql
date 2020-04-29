
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user"
(
    "id" BIGINT PRIMARY KEY,
    "displayname" VARCHAR (80) NOT NULL,
    "steamid3" VARCHAR(64) UNIQUE NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/b5/b5bd56c1aa4644a474a2e4972be27ef9e82e517e_full.jpg'
);

CREATE TABLE "teams"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "gamemode" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT 'true',
    "password" VARCHAR(255) NOT NULL,
    "tag" VARCHAR(6) NOT NULL
);

CREATE TABLE "gamemodes"
(
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL
);

CREATE TABLE "team_members"
(
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "team_id" INTEGER NOT NULL,
    "is_leader" BOOLEAN NOT NULL DEFAULT 'false',
    "join_date" DATE NOT NULL,
    "leave_date" DATE NOT NULL,
    "main" BOOLEAN NOT NULL DEFAULT 'true',
    "class" VARCHAR(255) NOT NULL,
    CONSTRAINT "team_members_pk" PRIMARY KEY ("id")
);



CREATE TABLE "log_base"
(
    "id" SERIAL NOT NULL,
    "blu_id" INTEGER NOT NULL,
    "red_id" INTEGER NOT NULL,
    "Match" BOOLEAN NOT NULL DEFAULT 'false',
    "date" DATE NOT NULL,
    CONSTRAINT "log_base_pk" PRIMARY KEY ("id")
);



CREATE TABLE "log_stats"
(
    "id" SERIAL NOT NULL,
    "log_id" INTEGER NOT NULL,
    "steamid3" VARCHAR(255) NOT NULL,
    "team" VARCHAR(255) NOT NULL,
    "assists" INTEGER NOT NULL,
    "suicides" INTEGER NOT NULL,
    "kapd" VARCHAR(255) NOT NULL,
    "kpd" INTEGER NOT NULL,
    "damage" INTEGER NOT NULL,
    "damage_taken" INTEGER NOT NULL,
    "dapm" INTEGER NOT NULL,
    "ubers" INTEGER NOT NULL,
    "drops" INTEGER NOT NULL,
    "backstabs" INTEGER NOT NULL,
    "headshots" INTEGER NOT NULL,
    CONSTRAINT "log_stats_pk" PRIMARY KEY ("id")
);



CREATE TABLE "kills"
(
    "id" SERIAL NOT NULL,
    "log_stat_id" INTEGER NOT NULL,
    "Scout" INTEGER NOT NULL DEFAULT '0',
    "Soldier" INTEGER NOT NULL DEFAULT '0',
    "Pyro" INTEGER NOT NULL DEFAULT '0',
    "Demo" INTEGER NOT NULL DEFAULT '0',
    "Heavy" INTEGER NOT NULL DEFAULT '0',
    "Engineer" INTEGER NOT NULL DEFAULT '0',
    "Medic" INTEGER NOT NULL DEFAULT '0',
    "Sniper" INTEGER NOT NULL DEFAULT '0',
    "Spy" INTEGER NOT NULL DEFAULT '0',
    CONSTRAINT "kills_pk" PRIMARY KEY ("id")
);



CREATE TABLE "deaths"
(
    "id" SERIAL NOT NULL,
    "log_stat_id" INTEGER NOT NULL,
    "Scout" INTEGER NOT NULL DEFAULT '0',
    "Soldier" INTEGER NOT NULL DEFAULT '0',
    "Pyro" INTEGER NOT NULL DEFAULT '0',
    "Demo" INTEGER NOT NULL DEFAULT '0',
    "Heavy" INTEGER NOT NULL DEFAULT '0',
    "Engineer" INTEGER NOT NULL DEFAULT '0',
    "Medic" INTEGER NOT NULL DEFAULT '0',
    "Sniper" INTEGER NOT NULL DEFAULT '0',
    "Spy" INTEGER NOT NULL DEFAULT '0',
    CONSTRAINT "deaths_pk" PRIMARY KEY ("id")
);



CREATE TABLE "weapon"
(
    "id" SERIAL NOT NULL,
    "class_stat_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "kills" INTEGER NOT NULL,
    "damage" INTEGER NOT NULL,
    "shots" INTEGER NOT NULL,
    "hits" INTEGER NOT NULL,
    CONSTRAINT "weapon_pk" PRIMARY KEY ("id")
);



CREATE TABLE "class_stats"
(
    "id" SERIAL NOT NULL,
    "log_stat_id" INTEGER NOT NULL,
    "class" VARCHAR(255) NOT NULL,
    "kills" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "deaths" INTEGER NOT NULL,
    "damage" INTEGER NOT NULL,
    "total_time" INTEGER NOT NULL,
    CONSTRAINT "class_stats_pk" PRIMARY KEY ("id")
);



CREATE TABLE "red"
(
    "id" SERIAL NOT NULL,
    "log_id" INTEGER NOT NULL,
    "kills" SERIAL NOT NULL,
    "damage" INTEGER NOT NULL,
    "charges" INTEGER NOT NULL,
    "drops" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    CONSTRAINT "red_pk" PRIMARY KEY ("id")
);



CREATE TABLE "blu"
(
    "id" SERIAL NOT NULL,
    "log_id" INTEGER NOT NULL,
    "kills" SERIAL NOT NULL,
    "damage" INTEGER NOT NULL,
    "charges" INTEGER NOT NULL,
    "drops" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
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

INSERT INTO "gamemodes"
    ("title")
VALUES('Highlander'),
    ('Prolander'),
    ('Sixes'),
    ('No Restriction 6s'),
    ('Fours'),
    ('Ultitrio'),
    ('Ultiduo');

INSERT INTO "teams"
    ("name", "gamemode", "active", "password", "tag")
VALUES
    ('lay civ5', 1, FALSE, 'lay likes civ5', 'LAY'),
    ('BRB, HAVE TO GO TO A WEDDING', 3, TRUE, 'swordfish', 'BRB'),
    ('RGL Staff', 2, TRUE, 'RGL.gg', 'RGL.gg'),
    ('Rocko7927 x Minion', 4, FALSE, 'rocko', 'rocko');

INSERT INTO "user"
    ("id", "displayname", "steamid3", "avatar")
VALUES
    ('76561198073466450', 'Otter | RGL.gg', '[U:1:113200722]', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/4b/4ba684b38b02638a9697a3e11dabf6517537cc17_full.jpg'),
    ('76561198045517514', 'Ryuk', '[U:1:85251786]', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/42/4271c38a896a0d55370e2cf2284fc97296b2c94b_full.jpg'),
    ('76561198834006733', 'Dev1sium', '[U:1:873741005]', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/3f/3f69d88a6fb7e16ad38db7a15043a2d2a5b73420_full.jpg'),
    ('76561198229432644', 'sebbers', '[U:1:269166916]', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/dc/dc39cb4672dcdedd87a8158ae95eab6a2e61f047_full.jpg');