const IncomeSchema = require('../models/incomeModel');
const connectDB = require('../utils/db');

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    await connectDB();

    try {
      const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
      res.status(200).json(incomes);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  } else {
    res.status(404).json({ message: 'Route not found' });
  }
};
