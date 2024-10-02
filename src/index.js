const express = require('express');
const logger = require('./utils/logger');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;

app.use(express.json());

// Log each request
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Book Routes
app.use('/', bookRoutes);

// User Routes
app.use('/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(`An error occurred: ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
});
