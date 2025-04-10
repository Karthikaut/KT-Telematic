'use strict';
module.exports = (sequelize, DataTypes) => {
    const AssetCategory = sequelize.define('AssetCategory', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });

    AssetCategory.associate = (models) => {
        AssetCategory.hasMany(models.Asset, { foreignKey: 'categoryId' });
    };

    return AssetCategory;
};
