// routes/incomeExpense.js

const express = require('express');
const { addIncome, deleteIncome, getIncomes } = require('../../back/controllers/income');
const { addExpense, getExpense, deleteExpense } = require('../../back/controllers/expense');

const router = express.Router();

// Define routes
router.post('/add-income', addIncome);
router.get('/get-incomes', getIncomes);
router.delete('/delete-income/:id', deleteIncome);

router.post('/add-expense', addExpense);
router.get('/get-expenses', getExpense);
router.delete('/delete-expense/:id', deleteExpense);

module.exports = router;
