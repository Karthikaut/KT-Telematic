const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Create
router.post('/', transactionController.createTransaction);

// Read
router.get('/', transactionController.getAllTransactions);
router.get('/:id', transactionController.getTransactionById);

// Update
router.put('/:id', transactionController.updateTransaction);

// Delete
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;
