const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

/**
 * GET route
 */


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

        let color_id = "blu_id"
        let teamColor = "Blue"
        if (req.body.teamColor === 'red') {
            color_id = "red_id"
            teamColor = "Red"
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
                    let queryText = `INSERT INTO ${req.body.teamColor} ("log_id", "kills", "damage", "charges", "drops") 
                                        VALUES($1, $2, $3, $4, $5);`;
                    pool.query(queryText, [log_id, log.teams[teamColor].kills, log.teams[teamColor].dmg, log.teams[teamColor].charges, log.teams[teamColor].drops]).then(result => {
                        for (const key in log.players) {
                            if (log.players.hasOwnProperty(key)) {
                                const player = log.players[key];
                                
                                let queryText = `INSERT INTO "log_stats" 
                                                    ("log_id", "steamid3", "team", "assists", "suicides", "kapd", "kpd", 
                                                    "damage", "damage_taken", "dapm", "ubers", "drops", "backstabs", "headshots")
                                                    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);`;
                                pool.query(queryText,[log_id, key, player.team, player.assists, player.suicides, player.kapd, player.kpd,
                                                        player.dmg, player.dt, player.dapm, player.ubers, player.drops, player.backstabs, player.headshots_hit]).then(result => {
                                })
                                .catch(error => {
                                    console.log('error posting into "log_stats"', error);
                                });
                                
                            }
                        }
                    })
                    .catch(error => {
                        console.log(`error posting into "${req.body.teamColor}"`, error);
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