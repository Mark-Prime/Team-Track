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
        console.log(response.data)
        res.sendStatus(200)
        
    }).catch( (error) => {
        alert('Bad things happened...')
        console.log('Error in get req.body.URL', error)
        res.sendStatus(500)
    })
});

module.exports = router;