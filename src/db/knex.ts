import knex from 'knex';
import path from 'path';

const projectFolder = path.join(__dirname, '../../');
const dbFile = path.join(projectFolder, 'data/library.sqlite');
const migrationFolder = path.join(projectFolder, 'migrations');

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: dbFile, // Ensure this is the correct path
  },
  migrations: {
    directory: migrationFolder, // Pointing to the correct migrations folder
  },
  useNullAsDefault: true, // Required for SQLite
});

db.migrate.latest();

export default db;