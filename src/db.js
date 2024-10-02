// db.js
const knex = require('knex');
const config = require('../knexfile'); // Adjust the path if necessary
const logger = require('./utils/logger');

// Set up the database connection for the desired environment (development, production, etc.)
const environment = process.env.NODE_ENV || 'development'; // Default to development

logger.info('KNEX', config[environment])

const db = knex(config[environment]);

db.migrate.latest();

module.exports = db;
