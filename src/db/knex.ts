import knex from 'knex';
import path from 'path';
import environment from '../environment';

const projectFolder = path.join(__dirname, '../../');
const migrationFolder = path.join(projectFolder, 'migrations');

const db = knex({
  client: 'mysql2',
  connection: {
    host: environment.DB_HOST,
    user: environment.DB_USERNAME,
    password: environment.DB_PASSWORD,
    database: environment.DB_NAME,
  },
  migrations: {
    directory: migrationFolder, // Pointing to the correct migrations folder
  },
  useNullAsDefault: true, // Required for SQLite
});

db.migrate.latest();

export default db;