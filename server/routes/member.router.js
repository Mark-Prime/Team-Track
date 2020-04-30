const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route
 */
router.get('/:id', (req, res) => {
    if (req.user) {
        let queryText = `SELECT "user_id", "displayname", "steamid3", "avatar", "is_leader", "join_date", "leave_date", "main", "class_name" FROM "team_members" 
                            JOIN "user" ON "user_id" = "user"."id"
                            JOIN "classes" ON "class" = "classes"."id"
                            WHERE "team_id" = $1
                            ORDER BY is_leader DESC, main DESC, "class";`;
        pool.query(queryText, [req.params.id]).then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('error selecting * from user', error);
            res.send(req.user)
        });
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