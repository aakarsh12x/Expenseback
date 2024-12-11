const IncomeSchema = require('../models/incomeModel');
const connectDB = require('../utils/db');

module.exports = async (req, res) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins, or specify your frontend URL
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400'); // Cache preflight response for 24 hours
    return res.status(204).end(); // Respond to preflight request
  }

  // Allow CORS for the main request
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace * with your frontend URL if needed

  if (req.method === 'GET') {
    await connectDB(); // Ensure database connection

    try {
      const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
      return res.status(200).json(incomes);
    } catch (error) {
      return res.status(500).json({ message: 'Server Error' });
    }
  } else {
    return res.status(404).json({ message: 'Route not found' });
  }
};
