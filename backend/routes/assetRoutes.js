const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');

// Create
router.post('/', assetController.createAsset);

// Read
router.get('/', assetController.getAllAssets);
router.get('/:id', assetController.getAssetById);

// Update
router.put('/:id', assetController.updateAsset);

// Delete
router.delete('/:id', assetController.deleteAsset);

module.exports = router;
