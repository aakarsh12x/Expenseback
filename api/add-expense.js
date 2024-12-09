const ExpenseSchema = require('../models/expenseModel');

module.exports = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: "Please fill all fields." });
        }
        if (amount <= 0 || typeof amount !== 'number') {
            return res.status(400).json({ message: "Amount must be a positive number." });
        }

        const expense = new ExpenseSchema({ title, amount, category, description, date });
        await expense.save();
        res.status(200).json({ message: "Expense added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
