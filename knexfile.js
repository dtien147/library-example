const path = require('path')
const environment = require('./src/environment');

const migrationFolder = path.join(__dirname, 'migrations');

// knexfile.js
module.exports = {
  development: {
      client: 'mysql2',
      connection: {
        host: environment.DB_HOST,
        user: environment.DB_USERNAME,
        password: environment.DB_PASSWORD,
        database: environment.DB_NAME,
      },
      migrations: {
          tableName: 'knex_migrations',
          directory: migrationFolder, // Pointing to the correct migrations folder
      },
      seeds: {
          directory: './seeds' // Specify the seeds directory if used
      }
  }
};