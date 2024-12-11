const ExpenseSchema = require('../models/expenseModel');

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

  const { title, amount, category, description, date } = req.body;

  try {
    // Validation
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "Please fill all fields." });
    }
    if (amount <= 0 || typeof amount !== 'number') {
      return res.status(400).json({ message: "Amount must be a positive number." });
    }

    // Create and save expense
    const expense = new ExpenseSchema({ title, amount, category, description, date });
    await expense.save();

    // Success response
    res.status(200).json({ message: "Expense added successfully" });
  } catch (error) {
    console.error(error);

    // Error response
    res.status(500).json({ message: "Server error" });
  }
};
