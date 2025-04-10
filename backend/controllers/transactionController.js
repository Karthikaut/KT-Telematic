const { Transaction, Asset, Employee } = require('../models');

// Create a new transaction
exports.createTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.create(req.body);
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all transactions
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.findAll({
            include: [
                { model: Asset, as: 'Asset', attributes: ['id', 'name', 'serialNumber'] },
                { model: Employee, as: 'Employee', attributes: ['id', 'firstName', 'lastName'] }
            ],
            order: [['date', 'DESC']]
        });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get transaction by ID
exports.getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findByPk(req.params.id, {
            include: [
                { model: Asset, as: 'Asset', attributes: ['id', 'name', 'serialNumber'] },
                { model: Employee, as: 'Employee', attributes: ['id', 'firstName', 'lastName'] }
            ]
        });
        if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update transaction
exports.updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByPk(req.params.id);
        if (!transaction) return res.status(404).json({ error: 'Transaction not found' });

        await transaction.update(req.body);
        res.status(200).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete transaction
exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByPk(req.params.id);
        if (!transaction) return res.status(404).json({ error: 'Transaction not found' });

        await transaction.destroy();
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
