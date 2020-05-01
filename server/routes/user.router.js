const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

/**
 * GET route
 */
router.get('/', (req, res) => {
    if (req.user) {
        console.log('user:', req.user.displayName);
        let queryText = 'SELECT * FROM "user" WHERE id = $1;';
        pool.query(queryText, [req.user.id]).then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('error selecting * from user in user router', error);
            res.send(req.user)
        });
    } else {
        res.send(req.user)
    }
    
});

router.get('/refresh', (req, res) => {
    if (req.user) {
        axios.get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${req.user.id}`, )
        .then( (response) => {
            
            updatedUser = response.data.response.players[0]

            let queryText = 'UPDATE "user" SET "displayname" = $1, "avatar" = $2 WHERE "id" = $3';
            pool.query(queryText, [updatedUser.personaname, updatedUser.avatarfull, req.user.id ]).then(result => {
                
                res.sendStatus(200);
            })
            .catch(error => {
                console.log('error updating "user"', error);
                res.sendStatus(500);
            });
            
        }).catch( (error) => {
            alert('Bad things happened...')
            console.log(`Error in get http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=STEAM_API_KEY&steamids=${req.user.id}`, error)

            res.sendStatus(500)
        })
    } else {
        res.send(req.user)
    }

});

/**
 * POST route
 */
router.post('/', (req, res) => {

});

module.exports = router;