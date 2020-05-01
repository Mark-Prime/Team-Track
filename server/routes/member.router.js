const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route
 */
router.get('/:id', (req, res) => {
    let queryText = `SELECT "user_id", "displayname", "steamid3", "avatar", "is_leader", "main", "class", "class_name" FROM "team_members" 
                        JOIN "user" ON "user_id" = "user"."id"
                        JOIN "classes" ON "class" = "classes"."id"
                        WHERE "team_id" = $1
                        ORDER BY is_leader DESC, "team_members"."id";`;
    pool.query(queryText, [req.params.id]).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error selecting * from user', error);
        res.send(req.user)
    });
});

router.get('/user/:id', (req, res) => {
    let queryText = `SELECT "user_id", "active", "team_id", "name", "is_leader", "tag", "main", "class", "class_name", "title" FROM "team_members" 
                        JOIN "teams" ON "team_id" = "teams"."id"
                        JOIN "classes" ON "class" = "classes"."id"
                        JOIN "gamemodes" ON "gamemode" = "gamemodes"."id"
                        WHERE "user_id" = $1
                        ORDER BY "active" DESC, "is_leader" DESC, "gamemode", "main" DESC, "class";`;
    pool.query(queryText, [req.params.id]).then(result => {
        res.send(result.rows);
    })
        .catch(error => {
            console.log('error selecting * from user in member/user/:id', error);
            res.send(req.user)
        });
});

/**
 * PUT route
 */
router.put('/class', (req, res) => {
    let queryText = 'UPDATE "team_members" SET "class" = $1 WHERE "user_id" = $2 AND "team_id" = $3';
    pool.query(queryText,[req.body.value, req.body.id, req.body.target]).then(result => {
        res.sendStatus(200);
    })
    .catch(error => {
        console.log('error updating "members"', error);
        res.sendStatus(500);
    });
});

router.put('/promote', (req, res) => {
    let queryText = 'UPDATE "team_members" SET "is_leader" = true WHERE "user_id" = $1 AND "team_id" = $2';
    pool.query(queryText, [req.body.id, req.body.team]).then(result => {
        res.sendStatus(200);
    })
        .catch(error => {
            console.log('error updating "members"', error);
            res.sendStatus(500);
        });
});

router.put('/main', (req, res) => {
    let queryText = 'UPDATE "team_members" SET "main" = $1 WHERE "user_id" = $2 AND "team_id" = $3';
    pool.query(queryText, [req.body.value, req.body.id, req.body.target]).then(result => {
        res.sendStatus(200);
    })
        .catch(error => {
            console.log('error updating "members"', error);
            res.sendStatus(500);
        });
});

/**
 * POST route
 */
router.post('/', (req, res) => {
    let queryText = 'INSERT INTO "team_members" ("user_id", "team_id") VALUES($1, $2);';
    pool.query(queryText,[req.body.id, req.body.team]).then(result => {
        
        res.sendStatus(200);
    })
    .catch(error => {
        console.log('error posting into "team_members"', error);
        res.sendStatus(500);
    });
});

/**
 * DELETE route
 */
router.delete('/', (req, res) => {
    console.log('req.body DELETE', req.body);
    
    let queryText = 'DELETE FROM "team_members" WHERE user_id = $1 AND team_id = $2';
    pool.query(queryText,[req.body.id, req.body.team]).then(result => {
        
        res.sendStatus(200);
    })
    .catch(error => {
        console.log('error deleting from "team_members"', error);
        res.sendStatus(500);
    });
});



module.exports = router;