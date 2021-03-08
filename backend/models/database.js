/* eslint-disable camelcase */
const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
  user: 'nave',
  password: 'nave',
  database: 'nave_dev',
  host: 'db', // Docker-compose host for postgres
  port: 5432,
  options: '-c search_path=nave_schema',
});

// Set up DB tables
fs.readFile('/usr/src/models/DDL.sql', 'utf8',
  async (err, data) => pool.query(data));

module.exports = pool;
