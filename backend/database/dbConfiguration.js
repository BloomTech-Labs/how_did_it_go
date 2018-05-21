const knex = require('knex');
const knexConfig = require('../knexfile.js');

const dbConfig = process.env.DBCONFIG || "development";

module.exports = knex(knexConfig[dbConfig]);