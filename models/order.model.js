const { INTEGER, STRING, ENUM } = require("sequelize");

module.exports = (sequelize) => {
    const Order = sequelize.define("Order", {
        order_id: {
            type: INTEGER,
            autoIncrement: true,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        ship_company: {
            type: STRING(50),
        },
        ship_speed: {
            type: STRING(50)
        },
        ship_number: {
            type: STRING(16)
        },
        status: {
            type: ENUM("Processing", "In-Progress", "Shipped")
        }
    }, {
        tableName: "order",
        underscored: true
    });
    
    console.log(Order === sequelize.models.Order);

    return Order;
};