const fs = require('fs');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'db',
    user: 'nave',
    password: 'nave',
    database: 'nave_dev',
  },
  searchPath: ['nave_schema'],
});

// Set up DB tables
fs.readFile('/usr/src/models/DDL.sql', 'utf8',
  async (err, data) => knex.raw(data));

module.exports = knex;
