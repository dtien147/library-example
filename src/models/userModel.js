// models/userModel.js
const knex = require('../db'); // Database connection
const bcrypt = require('bcrypt');

// Register a new user
async function registerUser(userData) {
    const { username, email, password, role } = userData;

    // Check if the user already exists
    const existingUser = await knex('users').where({ email }).first();
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const [newUser] = await knex('users').insert({
        username,
        email,
        password: hashedPassword,
        role,
    }).returning('*'); // Return the new user

    return newUser; // Return the new user object
}

// Login a user
async function loginUser(email, password) {
    // Find the user by email
    const user = await knex('users').where({ email }).first();
    if (!user) {
        throw new Error('Invalid credentials');
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    return user; // Return the user object (or you can return a sanitized user object without the password)
}

// Login a user without hashing (for demonstration only)
async function loginUserWithoutHash(username, password) {
    // Find the user by email
    const user = await knex('users').where({ username }).first();
    if (!user) {
        throw new Error('Invalid credentials');
    }

    // Compare the password directly (not recommended for production)
    if (user.password !== password) {
        throw new Error('Invalid credentials');
    }

    return user; // Return the user object
}


// Export the functions
module.exports = {
    registerUser,
    loginUser,
    loginUserWithoutHash,
};
