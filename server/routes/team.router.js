const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route
 */
router.get('/all', (req, res) => {
    let queryText = `SELECT "teams"."id" as "trueid", "gamemodes"."id", "name", "active", "title" FROM "teams" 
                        JOIN "gamemodes" ON "gamemode" = "gamemodes"."id"
                        ORDER BY "active" DESC, "gamemodes"."id", "name";`;
    pool.query(queryText).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error selecting * from teams', error);
        res.sendStatus(500);
    });
});

router.get('/:id', (req, res) => {
    let queryText = 'SELECT "teams"."id" as "trueid", "gamemodes"."id", "tag", "name", "active", "title", "team_page" FROM "teams" JOIN "gamemodes" ON "gamemode" = "gamemodes"."id" WHERE "teams"."id" = $1;';
    pool.query(queryText, [req.params.id]).then(result => {
        res.send(result.rows);
    })
        .catch(error => {
            console.log('error selecting * from teams', error);
            res.sendStatus(500);
        });
});

/**
 * POST route
 */
router.post('/', (req, res) => {

    let queryText = 'INSERT INTO "teams" ("name", "tag", "gamemode") VALUES($1, $2, $3) RETURNING "id";';
    pool.query(queryText,[req.body.name, req.body.tag, req.body.gamemode]).then(result => {
        let request = { id: req.body.userID, team_id: result.rows[0].id }
        let queryText = `INSERT INTO "team_members" ("user_id", "team_id", "is_leader") VALUES($1, $2, $3);`;
        pool.query(queryText, [request.id, request.team_id, true]).then(newResult => {

            res.send(request);
        })
            .catch(error => {
                console.log('error posting into "team_members"', error);
                res.sendStatus(500);
            });
    })
    .catch(error => {
        console.log('error posting into "teams"', error);
        res.sendStatus(500);
    });
});

/**
 * PUT route
 */
router.put('/name', (req, res) => {
    console.log(req.body)
    let queryText = 'UPDATE "teams" SET "name" = $1 WHERE "id" = $2';
    pool.query(queryText,[req.body.newName, req.body.id]).then(result => {
        res.sendStatus(200);
    })
    .catch(error => {
        console.log('error updating "teams"', error);
        res.sendStatus(500);
    });
});

router.put('/tag', (req, res) => {
    let queryText = 'UPDATE "teams" SET "tag" = $1 WHERE "id" = $2';
    pool.query(queryText, [req.body.newTag, req.body.id]).then(result => {
        res.sendStatus(200);
    })
        .catch(error => {
            console.log('error updating "teams"', error);
            res.sendStatus(500);
        });
});

router.put("/link", (req, res) => {
  let queryText = 'UPDATE "teams" SET "team_page" = $1 WHERE "id" = $2';
  pool
    .query(queryText, [req.body.newTag, req.body.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error updating "teams"', error);
      res.sendStatus(500);
    });
});

router.put('/deactivate/:id', (req, res) => {
    let queryText = 'UPDATE "teams" SET "active" = $1 WHERE "id" = $2';
    pool.query(queryText, [false, req.params.id]).then(result => {
        res.sendStatus(200);
    })
        .catch(error => {
            console.log('error updating "teams"', error);
            res.sendStatus(500);
        });
});

module.exports = router;