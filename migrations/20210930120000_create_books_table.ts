export async function up(knex) {
  return knex.schema.createTable('books', (table) => {
    table.increments('id');
    table.string('title').notNullable();
    table.string('author').notNullable();
  });
}

export async function down(knex) {
  return knex.schema.dropTableIfExists('books');
}
