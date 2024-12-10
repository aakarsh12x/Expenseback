const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { db } = require('../../backend/db/db'); // Correct path to db.js
const { readdirSync } = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set in .env

// CORS configuration to allow frontend to make requests
app.use(cors({
    origin: ['https://et-frontend-sb72.vercel.app', 'http://localhost:3000'], // Allow multiple origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware for JSON parsing
app.use(express.json());

// Dynamically load and apply routes from the 'routes' folder
const routesPath = path.join(__dirname, './routes');
readdirSync(routesPath).forEach((file) => {
    const route = require(path.join(routesPath, file));
    app.use('/api', route);
});

// Start the server and connect to the database
const startServer = async () => {
    try {
        await db(); // Connect to the database
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to connect to DB. Server not started.', err);
    }
};

startServer();
