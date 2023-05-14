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

/* 
Database Schema

Users Table
id | email | password

Projects Table
id | name | locked | password | user_id (foreign key) 

Songs Table
id | name | url | complete | project_id (foreign key) 

Notes Table
id | content | complete | song_id (foreign key)
*/
