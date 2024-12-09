const mongoose = require('mongoose');

let isConnected = false;

const db = async () => {
    if (isConnected) return;

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
};

module.exports = { db };
