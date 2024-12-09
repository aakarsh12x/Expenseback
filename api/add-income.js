const IncomeSchema = require('../models/incomeModel');
const connectDB = require('../utils/db');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    await connectDB();

    const { title, amount, category, description, date } = req.body;

    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "Please fill all fields." });
    }

    if (amount <= 0 || typeof amount !== 'number') {
      return res.status(400).json({ message: "Please provide a valid amount." });
    }

    const income = new IncomeSchema({ title, amount, category, description, date });

    try {
      await income.save();
      res.status(200).json({ message: 'Income Added' });
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  } else {
    res.status(404).json({ message: 'Route not found' });
  }
};
