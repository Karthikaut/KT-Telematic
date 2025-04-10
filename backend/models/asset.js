'use strict';
module.exports = (sequelize, DataTypes) => {
    const Asset = sequelize.define('Asset', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        serialNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        make: {
            type: DataTypes.STRING,
            allowNull: true
        },
        model: {
            type: DataTypes.STRING,
            allowNull: true
        },
        categoryId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'AssetCategories',
                key: 'id'
            }
        },
        branch: {
            type: DataTypes.STRING,
            allowNull: true
        },
        purchaseDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        purchaseCost: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('In Stock', 'Issued', 'Scrapped'),
            defaultValue: 'In Stock'
        },
        employeeId: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'Employees',
                key: 'id'
            }
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

    Asset.associate = (models) => {
        Asset.hasMany(models.Transaction, { foreignKey: 'AssetId' });
        Asset.belongsTo(models.AssetCategory, { foreignKey: 'categoryId' });
        Asset.belongsTo(models.Employee, { foreignKey: 'employeeId' });
    };

    return Asset;
};
