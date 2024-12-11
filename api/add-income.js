const IncomeSchema = require('../models/incomeModel');
const connectDB = require('../utils/db');

module.exports = async (req, res) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Replace '*' with your frontend URL in production
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400'); // Cache preflight response for 24 hours
    return res.status(204).end(); // Respond to preflight request
  }

  // Allow CORS for the main request
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace '*' with your frontend URL in production

  if (req.method === 'POST') {
    try {
      // Connect to the database
      await connectDB();

      const { title, amount, category, description, date } = req.body;

      // Validate the required fields
      if (!title || !category || !description || !date) {
        return res.status(400).json({ message: "Please fill all fields." });
      }

      // Validate the amount value
      if (amount <= 0 || typeof amount !== 'number') {
        return res.status(400).json({ message: "Please provide a valid amount." });
      }

      // Create a new Income document
      const income = new IncomeSchema({ title, amount, category, description, date });

      // Save the income document to the database
      await income.save();
      res.status(200).json({ message: 'Income Added' });

    } catch (error) {
      // Log and return a detailed error message
      console.error("Error saving income:", error);
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  } else {
    // Handle unsupported methods (non-POST requests)
    res.status(404).json({ message: 'Route not found' });
  }
};
