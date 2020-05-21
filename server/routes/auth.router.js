const express = require('express')
const router = express.Router()
const passport = require('passport');
const pool = require('../modules/pool');
const SteamID = require('steamid');

// GET /auth/steam
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Steam authentication will involve redirecting
//   the user to steamcommunity.com.  After authenticating, Steam will redirect the
//   user back to this application at /auth/steam/return
router.get('/steam',
    passport.authenticate('steam', { failureRedirect: `${process.env.DOMAIN_NAME}/#/home` }),
    function (req, res) {
        res.redirect('/');
    });

// GET /auth/steam/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/steam/return',
    // Issue #37 - Workaround for Express router module stripping the full url, causing assertion to fail 
    function (req, res, next) {
        req.url = req.originalUrl;
        next();
    },
    passport.authenticate('steam', { failureRedirect: `${process.env.DOMAIN_NAME}/#/home` }),
    function (req, res) {

        let queryText = 'SELECT * FROM "user" WHERE id = $1;';
        pool.query(queryText, [req.user.id]).then(result => {
            if (!result.rows[0]){
                console.log(`New User: ${req.user.displayName}`)
                let steamid3 = (new SteamID(req.user.id)).steam3();
                let queryText = `INSERT INTO "user" (id, displayname, steamid3, avatar) 
                VALUES($1, $2, $3, $4);`;
                pool.query(queryText, [req.user.id, req.user.displayName, steamid3, req.user._json.avatarfull]).then(result => {
                    res.redirect(`${process.env.DOMAIN_NAME}/#/player/${req.user.id}`);
                })
                .catch(error => {
                    console.log('error posting into "user"', error);
                    res.redirect(`${process.env.DOMAIN_NAME}/#/home`);
                });
            } else {
                res.redirect(`${process.env.DOMAIN_NAME}/#/home`);

            }
        })
        .catch(error => {
            console.log('error selecting * from user', error);
            res.redirect(`${process.env.DOMAIN_NAME}/#/home`);
        });

    });

module.exports = router;