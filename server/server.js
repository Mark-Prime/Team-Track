const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');

const passport = require('passport');

// Steam oauth
const cookieSession = require('cookie-session');
const SteamStrategy = require('passport-steam').Strategy

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(new SteamStrategy({
  returnURL: `${process.env.DOMAIN_NAME}/auth/steam/return`,
  realm: `${process.env.DOMAIN_NAME}/`,
  apiKey: `${process.env.STEAM_API_KEY}`
},
  function (identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's Steam profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Steam account with a user record in your database,
      // and return that user instead.
      profile.identifier = identifier;
      
      return done(null, profile);
    });
  }
));

app.use(cookieSession({
  secret: `${process.env.SERVER_SESSION_SECRET}`,
  name: 'name of session id',
  resave: true,
  saveUninitialized: true
}));

app.get('/logout', function (req, res) {
  req.session = null
  res.redirect(`${process.env.DOMAIN_NAME}/#/home`);
});

// Route includes
const authRouter = require('./routes/auth.router');
const userRouter = require('./routes/user.router');
const playerRouter = require('./routes/player.router');
const teamRouter = require('./routes/team.router');
const memberRouter = require('./routes/member.router');
const statsRouter = require('./routes/stats.router');
const logRouter = require("./routes/log.router");
const searchRouter = require("./routes/search.router");

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/auth/', authRouter);
app.use('/user/', userRouter);
app.use('/player/', playerRouter);
app.use('/team/', teamRouter);
app.use('/member/', memberRouter);
app.use('/stats/', statsRouter);
app.use('/log/', logRouter);
app.use("/search/", searchRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

// Authentication Confirmation
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}