const ExpenseSchema = require('../models/expenseModel');

module.exports = async (req, res) => {
    const { id } = req.query;

    try {
        await ExpenseSchema.findByIdAndDelete(id);
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
