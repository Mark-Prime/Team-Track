const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('user:', req.user);
    
    res.send(req.user)
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;