const { Asset, AssetCategory, Employee } = require('../models');

// Create a new asset
exports.createAsset = async (req, res) => {
    try {
        const asset = await Asset.create(req.body);
        res.status(201).json(asset);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all assets
exports.getAllAssets = async (req, res) => {
    try {
        const assets = await Asset.findAll({
            include: [
                { model: AssetCategory, attributes: ['id', 'name'] },
                { model: Employee, attributes: ['id', 'firstName', 'lastName'] }
            ]
        });
        res.status(200).json(assets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get asset by ID
exports.getAssetById = async (req, res) => {
    try {
        const asset = await Asset.findByPk(req.params.id, {
            include: [
                { model: AssetCategory, attributes: ['id', 'name'] },
                { model: Employee, attributes: ['id', 'firstName', 'lastName'] }
            ]
        });
        if (!asset) return res.status(404).json({ error: 'Asset not found' });
        res.status(200).json(asset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update asset
exports.updateAsset = async (req, res) => {
    try {
        const asset = await Asset.findByPk(req.params.id);
        if (!asset) return res.status(404).json({ error: 'Asset not found' });

        await asset.update(req.body);
        res.status(200).json(asset);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete asset
exports.deleteAsset = async (req, res) => {
    try {
        const asset = await Asset.findByPk(req.params.id);
        if (!asset) return res.status(404).json({ error: 'Asset not found' });

        await asset.destroy();
        res.status(200).json({ message: 'Asset deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
