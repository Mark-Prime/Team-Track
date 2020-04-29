const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route
 */
router.get('/all', (req, res) => {
    let queryText = 'SELECT * FROM "teams" ORDER BY active, id;';
    pool.query(queryText).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error selecting * from teams', error);
        res.sendStatus(500);
    });
});

router.get('/:id', (req, res) => {
    let queryText = 'SELECT * FROM "teams" WHERE id = $1;';
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

});

module.exports = router;