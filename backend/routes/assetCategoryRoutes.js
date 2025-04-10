const express = require('express');
const router = express.Router();
const assetCategoryController = require('../controllers/assetCategoryController');

// Create
router.post('/', assetCategoryController.createCategory);

// Read
router.get('/', assetCategoryController.getAllCategories);
router.get('/:id', assetCategoryController.getCategoryById);

// Update
router.put('/:id', assetCategoryController.updateCategory);

// Delete
router.delete('/:id', assetCategoryController.deleteCategory);

module.exports = router;
