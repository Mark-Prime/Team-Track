const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

/**
 * GET route
 */
router.get('/team/:id', (req, res) => {
    let queryText = `SELECT "log_base"."id", "length", "Match", "date", "log_team"."kills", "log_team"."damage", "charges", "log_team"."drops", "color", 
            SUM("damage_taken") as damage_taken, SUM("kills"."Scout") as Scout, SUM("kills"."Soldier") as Soldier, SUM("kills"."Pyro") as Pyro, SUM("kills"."Demo") as Demoman, SUM("kills"."Heavy") as Heavy,
            SUM("kills"."Engineer") as Engineer, SUM("kills"."Medic") as Medic, SUM("kills"."Sniper") as Sniper, SUM("kills"."Spy") as Spy,
            SUM("deaths"."Scout") as Scout_deaths, SUM("deaths"."Soldier") as Soldier_deaths, SUM("deaths"."Pyro") as Pyro_deaths, SUM("deaths"."Demo") as Demoman_deaths, SUM("deaths"."Heavy") as Heavy_deaths,
            SUM("deaths"."Engineer") as Engineer_deaths, SUM("deaths"."Medic") as Medic_deaths, SUM("deaths"."Sniper") as Sniper_deaths, SUM("deaths"."Spy") as Spy_deaths,
            (SUM("deaths"."Scout") + SUM("deaths"."Soldier") + SUM("deaths"."Pyro") + SUM("deaths"."Demo") + SUM("deaths"."Heavy") + SUM("deaths"."Engineer") + SUM("deaths"."Medic") + SUM("deaths"."Sniper") + SUM("deaths"."Spy")) AS deaths,
            (SUM("damage_taken")/("length"/60)) as dtpm, ("log_team"."damage"/("length"/60)) as dpm, ("log_team"."kills"/("length"/60)) as kpm, 
            (((SUM("deaths"."Scout") + SUM("deaths"."Soldier") + SUM("deaths"."Pyro") + SUM("deaths"."Demo") + SUM("deaths"."Heavy") + SUM("deaths"."Engineer") + SUM("deaths"."Medic") + SUM("deaths"."Sniper") + SUM("deaths"."Spy")) / ("log_base"."length"/60))) as depm FROM "log_base"
            JOIN "log_team" ON "log_team"."log_id" = "log_base"."id"
            JOIN "log_stats" ON "log_stats"."log_id" = "log_base"."id"
            JOIN "deaths" ON "deaths"."log_stat_id" = "log_stats"."id"
            JOIN "kills" ON "kills"."log_stat_id" = "log_stats"."id"
            WHERE ("blu_id" = $1 AND "color" = 'Blue' AND "team" = 'Blue') OR ("red_id" = $1 AND "color" = 'Red' AND "team" = 'Red') 
        GROUP BY "log_base"."id", "Match", "date", "log_team"."kills", "log_team"."damage", "charges", "log_team"."drops", "color"
        ORDER BY "date";`;
    pool.query(queryText, [req.params.id]).then(result => {
        let resultRows = result.rows;
        let queryText = `SELECT "log_base"."id", 
            SUM(CASE WHEN "class" = 'scout' THEN "class_stats"."kills" ELSE 0 END) as team_scout_kills,
            SUM(CASE WHEN "class" = 'soldier' THEN "class_stats"."kills" ELSE 0 END) as team_soldier_kills,
            SUM(CASE WHEN "class" = 'pyro' THEN "class_stats"."kills" ELSE 0 END) as team_pyro_kills,
            SUM(CASE WHEN "class" = 'demoman' THEN "class_stats"."kills" ELSE 0 END) as team_demoman_kills,
            SUM(CASE WHEN "class" = 'heavyweapons' THEN "class_stats"."kills" ELSE 0 END) as team_heavy_kills,
            SUM(CASE WHEN "class" = 'engineer' THEN "class_stats"."kills" ELSE 0 END) as team_engineer_kills,
            SUM(CASE WHEN "class" = 'medic' THEN "class_stats"."kills" ELSE 0 END) as team_medic_kills,
            SUM(CASE WHEN "class" = 'sniper' THEN "class_stats"."kills" ELSE 0 END) as team_sniper_kills,
            SUM(CASE WHEN "class" = 'spy' THEN "class_stats"."kills" ELSE 0 END) as team_spy_kills,

            SUM(CASE WHEN "class" = 'scout' THEN "class_stats"."deaths" ELSE 0 END) as team_scout_deaths,
            SUM(CASE WHEN "class" = 'soldier' THEN "class_stats"."deaths" ELSE 0 END) as team_soldier_deaths,
            SUM(CASE WHEN "class" = 'pyro' THEN "class_stats"."deaths" ELSE 0 END) as team_pyro_deaths,
            SUM(CASE WHEN "class" = 'demoman' THEN "class_stats"."deaths" ELSE 0 END) as team_demoman_deaths,
            SUM(CASE WHEN "class" = 'heavyweapons' THEN "class_stats"."deaths" ELSE 0 END) as team_heavy_deaths,
            SUM(CASE WHEN "class" = 'engineer' THEN "class_stats"."deaths" ELSE 0 END) as team_engineer_deaths,
            SUM(CASE WHEN "class" = 'medic' THEN "class_stats"."deaths" ELSE 0 END) as team_medic_deaths,
            SUM(CASE WHEN "class" = 'sniper' THEN "class_stats"."deaths" ELSE 0 END) as team_sniper_deaths,
            SUM(CASE WHEN "class" = 'spy' THEN "class_stats"."deaths" ELSE 0 END) as team_spy_deaths FROM "log_base"
            JOIN "log_team" ON "log_team"."log_id" = "log_base"."id"
            JOIN "log_stats" ON "log_stats"."log_id" = "log_base"."id"
            JOIN "deaths" ON "deaths"."log_stat_id" = "log_stats"."id"
            JOIN "kills" ON "kills"."log_stat_id" = "log_stats"."id"
            JOIN "class_stats" ON "class_stats"."log_stat_id" = "log_stats"."id"
            WHERE ("blu_id" = $1 AND "color" = 'Blue' AND "team" = 'Blue') OR ("red_id" = $1 AND "color" = 'Red' AND "team" = 'Red') 
            GROUP BY "log_base"."id", "date"
        ORDER BY "date";`
        pool.query(queryText, [req.params.id]).then(result => {
            for (let i = 0; i < result.rows.length; i++) {
                for (const key in result.rows[i]) {
                    if (result.rows[i].hasOwnProperty(key)) {
                        resultRows[i][key] = result.rows[i][key]
                    }
                }
            }
            
            res.send(resultRows);
        })
            .catch(error => {
                console.log('error selecting from log_base', error);
                res.sendStatus(500);
            });
    })
    .catch(error => {
        console.log('error selecting from log_base', error);
        res.sendStatus(500);
    });
})


router.get('/player/:id', (req, res) => {
    let queryText = `SELECT "class_stats"."log_stat_id", "team",
        SUM("class_stats"."kills") AS "total_kills", 
        "log_stats"."damage", 
        ("log_stats"."damage"/("length"/60)) as dpm,
        (SUM("damage_taken"/("length"/60))) as dtpm,
        "date",
        "log_base"."length",
        "log_base"."gamemode",
        "gamemodes"."title",
        SUM("damage_taken") AS damage_taken,
        SUM("class_stats"."deaths") AS "total_deaths",
        mode() WITHIN GROUP (ORDER BY "class_stats"."class") AS "main_class",

        SUM("kills"."Scout") as Scout, 
        SUM("kills"."Soldier") as Soldier, 
        SUM("kills"."Pyro") as Pyro, 
        SUM("kills"."Demo") as Demoman, 
        SUM("kills"."Heavy") as Heavy,
        SUM("kills"."Engineer") as Engineer, 
        SUM("kills"."Medic") as Medic, 
        SUM("kills"."Sniper") as Sniper, 
        SUM("kills"."Spy") as Spy,

        SUM("deaths"."Scout") as Scout_deaths, 
        SUM("deaths"."Soldier") as Soldier_deaths, 
        SUM("deaths"."Pyro") as Pyro_deaths, 
        SUM("deaths"."Demo") as Demoman_deaths, 
        SUM("deaths"."Heavy") as Heavy_deaths,
        SUM("deaths"."Engineer") as Engineer_deaths, 
        SUM("deaths"."Medic") as Medic_deaths, 
        SUM("deaths"."Sniper") as Sniper_deaths, 
        SUM("deaths"."Spy") as Spy_deaths,

        SUM(CASE WHEN "class" = 'scout' THEN "class_stats"."kills" ELSE 0 END) as kills_as_scout,
        SUM(CASE WHEN "class" = 'soldier' THEN "class_stats"."kills" ELSE 0 END) as kills_as_soldier,
        SUM(CASE WHEN "class" = 'pyro' THEN "class_stats"."kills" ELSE 0 END) as kills_as_pyro,
        SUM(CASE WHEN "class" = 'demoman' THEN "class_stats"."kills" ELSE 0 END) as kills_as_demoman,
        SUM(CASE WHEN "class" = 'heavyweapons' THEN "class_stats"."kills" ELSE 0 END) as kills_as_heavy,
        SUM(CASE WHEN "class" = 'engineer' THEN "class_stats"."kills" ELSE 0 END) as kills_as_engineer,
        SUM(CASE WHEN "class" = 'medic' THEN "class_stats"."kills" ELSE 0 END) as kills_as_medic,
        SUM(CASE WHEN "class" = 'sniper' THEN "class_stats"."kills" ELSE 0 END) as kills_as_sniper,
        SUM(CASE WHEN "class" = 'spy' THEN "class_stats"."kills" ELSE 0 END) as kills_as_spy,


        SUM(CASE WHEN "class" = 'scout' THEN "class_stats"."deaths" ELSE 0 END) as deaths_as_scout,
        SUM(CASE WHEN "class" = 'soldier' THEN "class_stats"."deaths" ELSE 0 END) as deaths_as_soldier,
        SUM(CASE WHEN "class" = 'pyro' THEN "class_stats"."deaths" ELSE 0 END) as deaths_as_pyro,
        SUM(CASE WHEN "class" = 'demoman' THEN "class_stats"."deaths" ELSE 0 END) as deaths_as_demoman,
        SUM(CASE WHEN "class" = 'heavyweapons' THEN "class_stats"."deaths" ELSE 0 END) as deaths_as_heavy,
        SUM(CASE WHEN "class" = 'engineer' THEN "class_stats"."deaths" ELSE 0 END) as deaths_as_engineer,
        SUM(CASE WHEN "class" = 'medic' THEN "class_stats"."deaths" ELSE 0 END) as deaths_as_medic,
        SUM(CASE WHEN "class" = 'sniper' THEN "class_stats"."deaths" ELSE 0 END) as deaths_as_sniper,
        SUM(CASE WHEN "class" = 'spy' THEN "class_stats"."deaths" ELSE 0 END) as deaths_as_spy
        FROM "log_stats"

        JOIN "deaths" ON "deaths"."log_stat_id" = "log_stats"."id"
        JOIN "kills" ON "kills"."log_stat_id" = "log_stats"."id"
        JOIN "class_stats" ON "class_stats"."log_stat_id" = "log_stats"."id"
        JOIN "user" ON "log_stats"."steamid3" = "user"."steamid3"
        JOIN "log_base" ON "log_stats"."log_id" = "log_base"."id"
        JOIN "gamemodes" ON "log_base"."gamemode" = "gamemodes"."id"
        WHERE "user"."id" = $1
        GROUP BY "date", "class_stats"."log_stat_id", "gamemodes"."title", "log_base"."gamemode", "team", "date", "log_stats"."damage", "total_time", "log_base"."length"
        ORDER BY "date";`;
    pool.query(queryText, [req.params.id]).then(result => {
        res.send(result.rows);
    })
        .catch(error => {
            console.log('error selecting player logs', error);
            res.sendStatus(500);
        });
})

/**
 * POST route
 */
router.post('/', async (req, res) => {
    console.log('request', req.body);
    
    axios.get(req.body.URL)
    .then( async (response) => {
        let log = response.data
        let log_id = (req.body.URL.split('json/')[1]).split('#')[0]
        console.log(log_id)

        let color_id = 'blu_id'
        let otherColor = 'Red'
        if (req.body.teamColor === 'Red') {
            color_id = 'red_id'
            otherColor = 'Blue'
        }


        const connection = await pool.connect();

        try {
            await connection.query('BEGIN;');

            let queryText = `SELECT "id" FROM "log_base" WHERE id = $1;`;
            const check = await connection.query(queryText, [log_id]);
            
            if (check.rows[0]) {
              queryText = `UPDATE "log_base" SET ${color_id} = $1 WHERE id = $2`;
              await connection.query(queryText, [req.body.teamID, log_id]);
            } else {
              queryText = `INSERT INTO "log_base" 
                                ("id", ${color_id}, "Match", "date", "length", "gamemode")
                            VALUES
                                ($1, $2, $3, $4, $5, $6);`;
              await connection.query(queryText, [
                log_id,
                req.body.teamID,
                req.body.match,
                log.info.date,
                log.length,
                req.body.gamemode,
              ]);

              queryText = `INSERT INTO "log_team" ("log_id", "kills", "damage", "charges", "drops", "color") 
                                        VALUES($1, $2, $3, $4, $5, $6), ($1, $7, $8, $9, $10, $11);`;
              await connection.query(queryText, [
                log_id,
                log.teams[req.body.teamColor].kills,
                log.teams[req.body.teamColor].dmg,
                log.teams[req.body.teamColor].charges,
                log.teams[req.body.teamColor].drops,
                req.body.teamColor,
                log.teams[otherColor].kills,
                log.teams[otherColor].dmg,
                log.teams[otherColor].charges,
                log.teams[otherColor].drops,
                otherColor,
              ]);

              for (const key in log.players) {
                if (log.players.hasOwnProperty(key)) {
                  let player = log.players[key];
                  let playerKills = log.classkills[key] || {};
                  let playerDeaths = log.classdeaths[key] || {};

                  queryText = `INSERT INTO "log_stats" 
                                        ("log_id", "steamid3", "team", "assists", "suicides", "kapd", "kpd", 
                                         "damage", "damage_taken", "dapm", "ubers", "drops", "backstabs", "headshots")
                                    VALUES
                                        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
                                    RETURNING "id";`;
                  const result = await connection.query(queryText, [
                    log_id,
                    key,
                    player.team,
                    player.assists,
                    player.suicides,
                    player.kapd,
                    player.kpd,
                    player.dmg,
                    player.dt,
                    player.dapm,
                    player.ubers,
                    player.drops,
                    player.backstabs,
                    player.headshots_hit,
                  ]);

                  let log_stat_id = result.rows[0].id;

                  queryText = `INSERT INTO "kills" ("log_stat_id", "Scout", "Soldier", "Pyro", "Demo", "Heavy", "Engineer", "Medic", "Sniper", "Spy") 
                                                        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
                  await connection.query(queryText, [
                    log_stat_id,
                    playerKills.scout || 0,
                    playerKills.soldier || 0,
                    playerKills.pyro || 0,
                    playerKills.demoman || 0,
                    playerKills.heavyweapons || 0,
                    playerKills.engineer || 0,
                    playerKills.medic || 0,
                    playerKills.sniper || 0,
                    playerKills.spy || 0,
                  ]);

                  queryText = `INSERT INTO "deaths" ("log_stat_id", "Scout", "Soldier", "Pyro", "Demo", "Heavy", "Engineer", "Medic", "Sniper", "Spy") 
                                    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
                  await connection.query(queryText, [
                    log_stat_id,
                    playerDeaths.scout || 0,
                    playerDeaths.soldier || 0,
                    playerDeaths.pyro || 0,
                    playerDeaths.demoman || 0,
                    playerDeaths.heavyweapons || 0,
                    playerDeaths.engineer || 0,
                    playerDeaths.medic || 0,
                    playerDeaths.sniper || 0,
                    playerDeaths.spy || 0,
                  ]);

                  for (let player_class of player.class_stats) {
                    queryText = `INSERT INTO "class_stats" ("log_stat_id", "class", "kills", "assists", "deaths", "damage", "total_time") 
                            VALUES($1, $2, $3, $4, $5, $6, $7);`;
                    await connection.query(queryText, [
                      log_stat_id,
                      player_class.type,
                      player_class.kills,
                      player_class.assists,
                      player_class.deaths,
                      player_class.dmg,
                      player_class.total_time,
                    ]);
                  }
                }
              }
            }
    


            await connection.query('COMMIT;');
            res.sendStatus(200)
        } catch (error) {
            console.log(`Error uploading log ${log_id}`, error)
            await connection.query('ROLLBACK;');
            res.sendStatus(500);
        } finally {
            connection.release();
        }
    })
});

module.exports = router;