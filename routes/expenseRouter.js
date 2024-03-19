const express = require('express');
const bodyParser = require('body-parser');
const expenseController = require('../controllers/expenseController.js');

const router = express.Router();

router.use(bodyParser.json({extended:false}));

router.get('/expenses', expenseController.getExpenses);
router.post('/expenses', expenseController.postExpense);
router.delete('/deleteExpense/:id', expenseController.deleteExpense);

module.exports = router;
