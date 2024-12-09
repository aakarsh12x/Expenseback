const IncomeSchema = require('../models/incomeModel');

module.exports = async (req, res) => {
    const { id } = req.query;

    try {
        await IncomeSchema.findByIdAndDelete(id);
        res.status(200).json({ message: "Income deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
