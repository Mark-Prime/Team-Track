
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

CREATE TABLE "classes"
(
    "id" SERIAL PRIMARY KEY,
    "class_name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
);

CREATE TABLE "gamemodes"
(
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "players" INTEGER NOT NULL,
);

CREATE TABLE "team_members"
(
    "id" SERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "team_id" INTEGER NOT NULL,
    "is_leader" BOOLEAN NOT NULL DEFAULT 'false',
    "main" BOOLEAN NOT NULL DEFAULT 'true',
    "class" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "team_members_pk" PRIMARY KEY ("id")
);

CREATE TABLE "log_base"
(
    "id" BIGINT NOT NULL,
    "blu_id" INTEGER,
    "red_id" INTEGER,
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
    "kpd" VARCHAR(255) NOT NULL,
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

CREATE TABLE "log_team"
(
    "id" SERIAL NOT NULL,
    "log_id" INTEGER NOT NULL,
    "kills" SERIAL NOT NULL,
    "damage" INTEGER NOT NULL,
    "charges" INTEGER NOT NULL,
    "drops" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    CONSTRAINT "log_team_pk" PRIMARY KEY ("id")
);

ALTER TABLE "team_members" ADD CONSTRAINT "team_members_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_fk1" FOREIGN KEY ("team_id") REFERENCES "teams"("id");
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_fk1" FOREIGN KEY ("class") REFERENCES "classes"("id");

ALTER TABLE "log_base" ADD CONSTRAINT "log_base_fk0" FOREIGN KEY ("log_team_pk") REFERENCES "teams"("id");
ALTER TABLE "log_base" ADD CONSTRAINT "log_base_fk1" FOREIGN KEY ("log_team_pk") REFERENCES "teams"("id");

ALTER TABLE "log_stats" ADD CONSTRAINT "log_stats_fk0" FOREIGN KEY ("log_id") REFERENCES "log_base"("id");

ALTER TABLE "kills" ADD CONSTRAINT "kills_fk0" FOREIGN KEY ("log_stat_id") REFERENCES "log_stats"("id");

ALTER TABLE "deaths" ADD CONSTRAINT "deaths_fk0" FOREIGN KEY ("log_stat_id") REFERENCES "log_stats"("id");

ALTER TABLE "weapon" ADD CONSTRAINT "weapon_fk0" FOREIGN KEY ("class_stat_id") REFERENCES "class_stats"("id");

ALTER TABLE "class_stats" ADD CONSTRAINT "class_stats_fk0" FOREIGN KEY ("log_stat_id") REFERENCES "log_stats"("id");

ALTER TABLE "log_team" ADD CONSTRAINT "red_fk0" FOREIGN KEY ("log_id") REFERENCES "log_base"("id");

ALTER TABLE "teams" ADD CONSTRAINT "teams_fk0" FOREIGN KEY ("gamemode") REFERENCES "gamemodes"("id");

INSERT INTO "gamemodes"
    ("title", "players")
VALUES('Highlander', 9),
    ('Prolander', 7),
    ('Sixes', 6),
    ('No Restriction 6s', 6),
    ('Fours', 4),
    ('Ultitrio', 3),
    ('Ultiduo', 2);

INSERT INTO "classes"
    ("class_name", "type")
VALUES
    ('Scout', 'scout'),
    ('Soldier', 'soldier'),
    ('Pyro', 'pyro'),
    ('Demoman', 'demoman'),
    ('Heavy', 'heavyweapons'),
    ('Engineer', 'engineer'),
    ('Medic', 'medic'),
    ('Sniper', 'sniper'),
    ('Spy', 'spy');

INSERT INTO "teams"
    ("name", "gamemode", "active", "password", "tag")
VALUES
    ('lay civ5', 1, FALSE, 'lay likes civ5', 'LAY'),
    ('BRB, HAVE TO GO TO A WEDDING', 3, TRUE, 'swordfish', 'BRB'),
    ('RGL Staff', 2, TRUE, 'RGL.gg', 'RGL.gg'),
    ('Rocko7927 x Minion', 4, FALSE, 'rocko', 'rocko'),
    ('J4MM3RS F4NCLU8', 7, TRUE, 'wepeat', 'j4m'),
    ('The Night Crew', 1, FALSE, 'suicidewatchhl', '3am');

INSERT INTO "user"
    ("id", "displayname", "steamid3", "avatar")
VALUES
    ('76561198073466450', 'Otter | RGL.gg', '[U:1:113200722]', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/4b/4ba684b38b02638a9697a3e11dabf6517537cc17_full.jpg'),
    ('76561198045517514', 'Ryuk', '[U:1:85251786]', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/42/4271c38a896a0d55370e2cf2284fc97296b2c94b_full.jpg'),
    ('76561198834006733', 'Dev1sium', '[U:1:873741005]', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/3f/3f69d88a6fb7e16ad38db7a15043a2d2a5b73420_full.jpg'),
    ('76561198229432644', 'sebbers', '[U:1:269166916]', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/dc/dc39cb4672dcdedd87a8158ae95eab6a2e61f047_full.jpg'),
    ('76561198040047972', 'JordaN', '[U:1:79782244]', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/88/88920fe05fe37e9c0dcfae8ff84dabd04ad408bc_full.jpg'),
    ('76561198085943550', 'R3P3AT', '[U:1:125677822]', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/dc/dcac27d887abd3e8049a7416601cf7b5f0f26ede_full.jpg'),
    ('76561198213561811', 'Fluffy', '[U:1:253296083]', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/b1/b16e68d5b3e876195eaec5e086c8ff8b0889dc73_full.jpg'),
    ('76561198017684173', 'WiLLmaTiC', '[U:1:57418445]', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fa/fa44cec79e8adb1f470423881e0607535c7423d0_full.jpg%27'),
    ('76561198043913557', 'Shim', '[U:1:83647829]', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/dd/dd6593c60fb094df57d25c155b5bbc294b977a3e_full.jpg'),
    ('76561198073158508', 'wxy', '[U:1:112892780]', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/de/dedec21c91de6bf4d2158991ef615506ac8aee9c_full.jpg'),
    ('76561198019252798', 'Bliztank', '[U:1:58987070]', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/0e/0ed8a322fc8e0d538a1530756893c37055a3f4b3_full.jpg'),
    ('76561198072250723', 'DZCreeper', '[U:1:111984995]', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ec/eccb11d8e0f3381033ef8c4835e75d4302cdf7b4_full.jpg'),
    ('76561198044273783', 'Kamil', '[U:1:84008055]', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/53/536b5ce051e52772fd128c22204806742470d8db_full.jpg'),
    ('76561198079437901', 'Lasky', '[U:1:119172173]', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/a0/a0930073efa671e3d9f0066aa23b5906add1b8c7_full.jpg'),
    ('76561198118894124', 'Skorp', '[U:1:158628396]', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/0c/0ca9687722ca2b719b27f6ecfe093836fcf960d1_full.jpg'),
    ('76561197963673725', 'Sylon[DMS]', '[U:1:3407997]', 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/e7/e73826cbc882c1ac5780966efaac42cd0c1bbdad_full.jpg');

INSERT INTO "team_members"
    ("user_id", "team_id", "is_leader", "main", "class")
VALUES
    (76561198045517514, 7, TRUE, TRUE, 7),
    (76561198085943550, 7, TRUE, TRUE, 2),
    (76561198213561811, 7, FALSE, FALSE, 7),
    (6561198017684173, 8, TRUE, TRUE, 8);