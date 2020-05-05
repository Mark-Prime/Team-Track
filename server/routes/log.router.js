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
        GROUP BY "log_base"."id", "Match", "date", "kills", "log_team"."damage", "charges", "log_team"."drops", "color"
        ORDER BY "date";`;
    pool.query(queryText, [req.params.id]).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error selecting from log_base', error);
        res.sendStatus(500);
    });
})

router.get('/player/:id', (req, res) => {
    
})

/**
 * POST route
 */
router.post('/', (req, res) => {
    console.log('request', req.body);
    
    axios.get(req.body.URL)
    .then( (response) => {
        let log = response.data
        let log_id = (req.body.URL.split('json/')[1]).split('#')[0]
        console.log(log_id)

        let color_id = 'blu_id'
        let otherColor = 'Red'
        if (req.body.teamColor === 'Red') {
            color_id = 'red_id'
            otherColor = 'Blue'
        }

        let queryText = 'SELECT "id" FROM "log_base" WHERE id = $1;';
        pool.query(queryText, [log_id]).then(result => {
            if (result.rows[0]) {
                let queryText = `UPDATE "log_base" SET ${color_id} = $1 WHERE id = $2`;
                pool.query(queryText, [req.body.teamID, log_id]).then(result => {})
                .catch(error => {
                    console.log('error updating "log_base"', error);
                });
            } else {
                let queryText = `INSERT INTO "log_base" ("id", ${color_id}, "Match", "date", "length")
                                    VALUES($1, $2, $3, $4, $5);`;
                pool.query(queryText, [log_id, req.body.teamID, req.body.match, log.info.date, log.length]).then(result => {
                    let queryText = `INSERT INTO "log_team" ("log_id", "kills", "damage", "charges", "drops", "color") 
                                        VALUES($1, $2, $3, $4, $5, $6), ($1, $7, $8, $9, $10, $11);`;
                    pool.query(queryText, [log_id, log.teams[req.body.teamColor].kills, log.teams[req.body.teamColor].dmg, 
                            log.teams[req.body.teamColor].charges, log.teams[req.body.teamColor].drops, req.body.teamColor, 
                            log.teams[otherColor].kills, log.teams[otherColor].dmg, log.teams[otherColor].charges, 
                            log.teams[otherColor].drops, otherColor]).then(result => {
                        for (const key in log.players) {
                            if (log.players.hasOwnProperty(key)) {
                                let player = log.players[key];
                                let playerKills = log.classkills[key] || {}
                                let playerDeaths = log.classdeaths[key] || {}
                                
                                let queryText = `INSERT INTO "log_stats" 
                                                    ("log_id", "steamid3", "team", "assists", "suicides", "kapd", "kpd", 
                                                    "damage", "damage_taken", "dapm", "ubers", "drops", "backstabs", "headshots")
                                                    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING "id";`;
                                pool.query(queryText,[log_id, key, player.team, player.assists, player.suicides, player.kapd, player.kpd,
                                                        player.dmg, player.dt, player.dapm, player.ubers, player.drops, player.backstabs, player.headshots_hit]).then(result => {

                                    let log_stat_id = result.rows[0].id
                                    
                                    let queryText = `INSERT INTO "kills" ("log_stat_id", "Scout", "Soldier", "Pyro", "Demo", "Heavy", "Engineer", "Medic", "Sniper", "Spy") 
                                                        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
                                    pool.query(queryText, [log_stat_id, playerKills.scout || 0, playerKills.soldier || 0,
                                        playerKills.pyro || 0, playerKills.demoman || 0, playerKills.heavyweapons || 0,
                                        playerKills.engineer || 0, playerKills.medic || 0, playerKills.sniper || 0, playerKills.spy || 0,]).then(result => {

                                            let queryText = `INSERT INTO "deaths" ("log_stat_id", "Scout", "Soldier", "Pyro", "Demo", "Heavy", "Engineer", "Medic", "Sniper", "Spy") 
                                                        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
                                            pool.query(queryText, [log_stat_id, playerDeaths.scout || 0, playerDeaths.soldier || 0,
                                                playerDeaths.pyro || 0, playerDeaths.demoman || 0, playerDeaths.heavyweapons || 0,
                                                playerDeaths.engineer || 0, playerDeaths.medic || 0, playerDeaths.sniper || 0, playerDeaths.spy || 0,]).then(result => {

                                                })
                                                .catch(error => {
                                                    console.log('error posting into "deaths"', error);
                                                });
                                    })
                                    .catch(error => {
                                        console.log('error posting into "kills"', error);
                                    });
                                })
                                .catch(error => {
                                    console.log('error posting into "log_stats"', error);
                                });
                                
                            }
                        }
                    })
                    .catch(error => {
                        console.log(`error posting into "log_team"`, error);
                    });

                })
                .catch(error => {
                    console.log('error posting into "log_base"', error);
                });
            }
        })
        .catch(error => {
            console.log('error selecting "id" from log_base', error);
        });

        res.sendStatus(200)
        
    }).catch( (error) => {
        alert('Bad things happened...')
        console.log('Error in get logs.tf json', error)
        res.sendStatus(500)
    })
});

module.exports = router;