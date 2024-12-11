const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { db } = require('./utils/db'); // Adjusted path for db.js
const { readdirSync } = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(
    cors({
        origin: ['https://et-frontend-sb72.vercel.app', 'http://localhost:3000'], // Correct frontend URLs
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
);

// Middleware for JSON parsing
app.use(express.json());

// Dynamically load and apply routes
const routesPath = path.join(__dirname, 'routes'); // Ensure 'routes' path is correct
readdirSync(routesPath).forEach((file) => {
    const route = require(path.join(routesPath, file));
    app.use('/api', route);
});

// Fallback for undefined routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start the server and connect to the database
const startServer = async () => {
    try {
        await db(); // Ensure db connection works
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to connect to DB. Server not started.', err);
    }
};

startServer();
