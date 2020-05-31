/* the only line you likely need to change is

 database: 'prime_app',

 change `prime_app` to the name of your database, and you should be all set!
*/

const pg = require('pg');
const url = require('url');

let config = {};

if (process.env.DATABASE_URL) {
  config = {
    host: process.env.DATABASE_URL,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
    ssl: true,
    rejectUnauthorized: false,
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
} else {
  config = {
    host: "localhost", // Server hosting the postgres database
    port: 5432, // env var: PGPORT
    database: "prime_app", // CHANGE THIS LINE! env var: PGDATABASE, this is likely the one thing you need to change to get up and running
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    rejectUnauthorized: false,
  };
}

// this creates the pool that will be shared by all other modules
const pool = new pg.Pool(config);

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
