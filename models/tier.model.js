const { INTEGER, STRING } = require("sequelize");

module.exports = (sequelize) => {
    const Tier = sequelize.define("Tier", {
        tier_id: {
            type: INTEGER,
            autoIncrement: true,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        batter_flavor: {
            type: STRING(50)
        },
        inner_frosting_1: {
            type: STRING(50)
        },
        inner_frosting_2: {
            type: STRING(50)
        },
        inner_frosting_3: {
            type: STRING(50)
        },
        outer_frosting_1: {
            type: STRING(50)
        },
        outer_frosting_2: {
            type: STRING(50)
        },
        outer_frosting_3: {
            type: STRING(50)
        },
        decoration_1: {
            type: STRING(50)
        },
        decoration_2: {
            type: STRING(50)
        },
        decoration_3: {
            type: STRING(50)
        },
        image: {
            type: STRING(50)
        },
        notes: {
            type: STRING(250)
        }
    }, {
        tableName: "tier",
        underscored: true
    });
    
    console.log(Tier === sequelize.models.Tier);

    return Tier;
};