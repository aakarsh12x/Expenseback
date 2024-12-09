const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { db } = require('../backend/db/db'); // Correct path to db.js
const { readdirSync } = require('fs');
const app = express();
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set in .env

// CORS configuration to allow frontend to make requests
app.use(cors({
    origin: 'https://et-frontend-sb72.vercel.app', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware for JSON parsing
app.use(express.json());

// Dynamically load and apply routes from the 'routes' folder
readdirSync('./routes').map(route => app.use('/api/v1', require(`./routes/${route}`)));

// Start the server and connect to the database
const server = () => {
    db().then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        }).on('error', (err) => {
            console.error('Error starting server:', err);
        });
    }).catch((err) => {
        console.error('Failed to connect to DB. Server not started.', err);
    });
};

server();
