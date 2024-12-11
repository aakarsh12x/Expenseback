const mongoose = require('mongoose');

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {  // Change this to MONGO_URL
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        throw err;
    }
};

module.exports = { db };
