const ExpenseSchema = require('../models/expenseModel');

module.exports = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
