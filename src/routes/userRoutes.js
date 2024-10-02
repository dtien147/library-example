// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel'); // Import user model
const jwt = require('jsonwebtoken'); // For creating tokens

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET; // Make sure to use an environment variable for production

// Route to register a new user
router.post('/register', async (req, res) => {
    try {
        const newUser = await userModel.registerUser(req.body);
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to login a user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.loginUserWithoutHash(username, password);
        
        // Generate a JWT token
        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
            expiresIn: '1h', // Token expiry
        });

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

// Export the router
module.exports = router;
