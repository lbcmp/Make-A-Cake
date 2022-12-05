const { CHAR, STRING } = require("sequelize");

module.exports = (sequelize) => {
    const Customer = sequelize.define("Customer", {
        customer_id: {
            type: CHAR(8),
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        fname: {
            type: STRING(50),
            allowNull: false
        },
        lname: {
            type: STRING(50),
            allowNull: false
        },
        email: {
            type: STRING(50),
            allowNull: false
        },
        phone_number: {
            type: CHAR(10),
        },
        address: {
            type: STRING(50)
        },
        city: {
            type: STRING(50)
        },
        state: {
            type: CHAR(50)
        },
        zipcode: {
            type: CHAR(5)
        },
    }, {
        tableName: "customer",
        underscored: true
    });
    
    console.log(Customer === sequelize.models.Customer);

    return Customer;
};