const express = require('express');
const cors = require('cors'); // Add CORS if not already included
const {
  addIncome,
  deleteIncome,
  getIncomes,
} = require('../../back/controllers/income');
const {
  addExpense,
  getExpense,
  deleteExpense,
} = require('../../back/controllers/expense');

const router = express.Router();

// Apply CORS Middleware (if not already in the main app)
router.use(cors());

// Define routes
router.post('/add-income', async (req, res) => {
  try {
    await addIncome(req, res);
  } catch (err) {
    console.error('Error adding income:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/get-incomes', async (req, res) => {
  try {
    await getIncomes(req, res);
  } catch (err) {
    console.error('Error fetching incomes:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/delete-income/:id', async (req, res) => {
  try {
    await deleteIncome(req, res);
  } catch (err) {
    console.error('Error deleting income:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/add-expense', async (req, res) => {
  try {
    await addExpense(req, res);
  } catch (err) {
    console.error('Error adding expense:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/get-expenses', async (req, res) => {
  try {
    await getExpense(req, res);
  } catch (err) {
    console.error('Error fetching expenses:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete('/delete-expense/:id', async (req, res) => {
  try {
    await deleteExpense(req, res);
  } catch (err) {
    console.error('Error deleting expense:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
