const { Sequelize } = require('sequelize');
const config = require('../config/config').development;

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
        logging: false, // optional: disable SQL logging
    }
);

const db = {};

// Import models
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Employee = require('./employee')(sequelize, Sequelize);
db.AssetCategory = require('./assetCategory')(sequelize, Sequelize);
db.Asset = require('./asset')(sequelize, Sequelize);
db.Transaction = require('./transaction')(sequelize, Sequelize);

// Call associate() if defined
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;
