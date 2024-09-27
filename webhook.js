const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { exec } = require('child_process');

const app = express();
const port = 8000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to listen for webhook events
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
    try {
        const event = req.headers['x-github-event'];
        if (event === 'push') {
            // Pull the latest code when a push event is received
            exec('git fetch && git pull origin main', (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing git pull: ${error}`);
                    return res.status(500).send('Error pulling code');
                }

                console.log(`Git Pull Output: ${stdout}`);
                res.status(200).send('Code updated');
            });
        } else {
            res.status(200).send('Event received');
        }
    } catch (error) {
        console.error('Error processing webhook:', error);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});