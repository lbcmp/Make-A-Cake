const { INTEGER } = require("sequelize");

module.exports = (sequelize) => {
    const Cake = sequelize.define("Cake", {
        cake_id: {
            type: INTEGER,
            autoIncrement: true,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        price: {
            type: INTEGER
        }
    }, {
        tableName: "cake",
        underscored: true
    });
    
    console.log(Cake === sequelize.models.Cake);

    return Cake;
};