const { AssetCategory, Asset } = require('../models');

// Create a new asset category
exports.createCategory = async (req, res) => {
    try {
        const category = await AssetCategory.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all asset categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await AssetCategory.findAll({
            include: [
                { model: Asset, attributes: ['id', 'name', 'serialNumber', 'status'] }
            ]
        });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await AssetCategory.findByPk(req.params.id, {
            include: [
                { model: Asset, attributes: ['id', 'name', 'serialNumber', 'status'] }
            ]
        });
        if (!category) return res.status(404).json({ error: 'Category not found' });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update category
exports.updateCategory = async (req, res) => {
    try {
        const category = await AssetCategory.findByPk(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });

        await category.update(req.body);
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete category
exports.deleteCategory = async (req, res) => {
    try {
        const category = await AssetCategory.findByPk(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });

        await category.destroy();
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
