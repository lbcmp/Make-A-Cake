"use strict";

const fs = require("fs");
const path = require("path");
const dbConfig = require("../config/dbConfig");
const Sequelize = require("sequelize");
const db = {};
const basename = path.basename(__filename);

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: console.log,
    define: {
        freezeTableName: true
    }
});

fs
.readdirSync(__dirname)
.filter(file => {
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
})
.forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    const modelName = model.name.charAt(0).toUpperCase() + model.name.slice(1);
    db[modelName] = model;
})

db["Customer"].hasMany(db["Order"], {
    foreignKey: { name: "customer_id", allowNull: false }
});
db["Order"].belongsTo(db["Customer"], {
    foreignKey: { name: "customer_id", allowNull: false }
});

db["Order"].hasOne(db["Cake"], {
    foreignKey: { name: "order_id", allowNull: false }
});
db["Cake"].belongsTo(db["Order"], {
    foreignKey: { name: "order_id", allowNull: false }
});

db["Cake"].hasMany(db["Tier"], {
    foreignKey: { name: "cake_id", allowNull: false }
});
db["Tier"].belongsTo(db["Cake"], {
    foreignKey: { name: "cake_id", allowNull: false }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;