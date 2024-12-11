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

  if (req.method === 'DELETE') {
    const { id } = req.query;

    // Check if ID is provided in the request query
    if (!id) {
      return res.status(400).json({ message: "Expense ID is required." });
    }

    try {
      // Find and delete the expense by ID
      const deletedExpense = await ExpenseSchema.findByIdAndDelete(id);

      // Check if the expense exists
      if (!deletedExpense) {
        return res.status(404).json({ message: "Expense not found." });
      }

      res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
      console.error("Error deleting expense:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  } else {
    // Handle unsupported methods (non-DELETE requests)
    res.status(404).json({ message: "Route not found" });
  }
};
