import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('books', (table) => {
    table.increments('id');
    table.string('title').notNullable();
    table.string('author').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('books');
}
