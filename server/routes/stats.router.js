const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route
 */
router.get('/:id', (req, res) => {
    let queryText = `SELECT mode() WITHIN GROUP (ORDER BY "is_leader") AS "leader_mode", 
                            mode() WITHIN GROUP (ORDER BY "main") AS "main_mode", 
                            mode() WITHIN GROUP (ORDER BY "class_name") AS "favorite_class", 
                            count(*) AS "team_count"
                        FROM "team_members" 
                        JOIN "classes" ON "class" = "classes"."id"
                        WHERE "user_id" = $1`;
    pool.query(queryText, [req.params.id]).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error selecting * from user', error);
        res.send(req.user)
    });
});

module.exports = router;