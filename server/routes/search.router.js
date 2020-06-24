const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route
 */
router.get('/team/:value', (req, res) => {
    let queryText = `SELECT "teams"."id" as "trueid", "gamemodes"."id", "tag", "name", "active", "title"
                    FROM "teams" 
                    JOIN "gamemodes" ON "gamemode" = "gamemodes"."id"
                    WHERE LOWER("teams"."name") LIKE LOWER($1)
                    ORDER BY "active" DESC, "gamemodes"."id", "name";`;
    pool.query(queryText, ['%' + req.params.value + '%']).then(result => {
        res.send(result.rows);
    })
        .catch(error => {
            console.log('error selecting * from teams', error);
            res.sendStatus(500);
        });
});

router.get("/player/:value", (req, res) => {
  let queryText =
    'SELECT * FROM "user" WHERE LOWER(displayname) LIKE LOWER($1) ORDER BY displayname, id;';
  pool
    .query(queryText, ["%" + req.params.value + "%"])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("error selecting * from teams", error);
      res.sendStatus(500);
    });
});

module.exports = router;