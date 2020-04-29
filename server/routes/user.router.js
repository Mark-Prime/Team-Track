const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    if (req.user) {
        console.log('user:', req.user.displayName);
        let queryText = 'SELECT * FROM "user" WHERE id = $1;';
        pool.query(queryText, [req.user.id]).then(result => {
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
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;