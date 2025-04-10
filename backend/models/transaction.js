'use strict';
module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        assetId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Assets',
                key: 'id'
            }
        },
        action: {
            type: DataTypes.ENUM('Issued', 'Returned', 'Scrapped'),
            allowNull: false
        },
        employeeId: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'Employees',
                key: 'id'
            }
        },
        reason: {
            type: DataTypes.STRING,
            allowNull: true
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'Transactions'
    });

    Transaction.associate = (models) => {
        Transaction.belongsTo(models.Employee, {
            foreignKey: 'employeeId',
            as: 'Employee'
        });

        Transaction.belongsTo(models.Asset, {
            foreignKey: 'assetId',
            as: 'Asset'
        });
    };

    return Transaction;
};
``
