// authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware to authenticate user
function authenticateUser(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Get the token from the Authorization header
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
        req.user = decoded; // Attach user information to the request
        next(); // Move to the next middleware or route handler
    });
}

module.exports = authenticateUser;
