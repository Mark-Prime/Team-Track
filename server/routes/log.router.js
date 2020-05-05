const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

/**
 * GET route
 */
router.get('/team/:id', (req, res) => {
    let queryText = `SELECT "log_base"."id", "Match", "date", "kills", "damage", "charges", "drops", "color" FROM "log_base" 
            JOIN "log_team" ON "log_id" = "log_base"."id"
            WHERE ("blu_id" = $1 AND "color" = 'Blue') OR ("red_id" = $1 AND "color" = 'Red') 
        ORDER BY "date";`;
    pool.query(queryText, [req.params.id]).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error selecting * from log_base', error);
        res.sendStatus(500);
    });
})

router.get('/team/matches/:id', (req, res) => {
    let queryText = `SELECT "log_base"."id", "Match", "date", "kills", "damage", "charges", "drops", "color" FROM "log_base" 
            JOIN "log_team" ON "log_id" = "log_base"."id"
            WHERE "Match" = true AND (("blu_id" = $1 AND "color" = 'Blue') OR ("red_id" = $1 AND "color" = 'Red'))
        ORDER BY "date";`;
    pool.query(queryText, [req.params.id]).then(result => {
        res.send(result.rows);
    })
        .catch(error => {
            console.log('error selecting * from log_base', error);
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
                let queryText = `INSERT INTO "log_base" ("id", ${color_id}, "Match", "date")
                                    VALUES($1, $2, $3, $4);`;
                pool.query(queryText, [log_id, req.body.teamID, req.body.match, log.info.date]).then(result => {
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