// seeds/userSeeder.js
const knex = require('../src/db'); // Adjust the path to your database connection file

async function seedUsers() {
    const users = [
        {
            username: 'admin',
            email: 'admin@example.com',
            password: 'admin123', // Make sure to hash the password in production
            role: 'admin',
        },
        {
            username: 'user1',
            email: 'user1@example.com',
            password: 'user123', // Hash this password as well
            role: 'user',
        },
        {
            username: 'user2',
            email: 'user2@example.com',
            password: 'user123', // Hash this password as well
            role: 'user',
        },
    ];

    try {
        // Clear existing users (optional, use with caution)
        await knex('users').del();
        
        // Insert the users into the database
        await knex('users').insert(users);
        console.log('Users seeded successfully!');
    } catch (error) {
        console.error('Error seeding users:', error);
    }
}

// Execute the seeder
seedUsers()
    .then(() => {
        process.exit(0); // Exit the process after seeding
    })
    .catch((error) => {
        console.error('Error executing seeder:', error);
        process.exit(1);
    });
