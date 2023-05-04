const { Pool } = require('pg');

// .env
require('dotenv').config();

// Connect to DB
const pool = new Pool({
  connectionString: process.env.pgURI,
});

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
