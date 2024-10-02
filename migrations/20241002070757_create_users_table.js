exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary(); // Auto-incrementing primary key
        table.string('username').notNullable().unique(); // Unique username
        table.string('email').notNullable().unique(); // Unique email
        table.string('password').notNullable(); // Hashed password
        table.string('role').defaultTo('user'); // User role, default is 'user'
        table.timestamps(true, true); // Created and updated timestamps
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users'); // Rollback the migration
};
