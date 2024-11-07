const DataTypes = require("sequelize");
const sequelize = require("../config/cnn");

const Ingredient = sequelize.define(
  "Ingredient",
  {
    ing_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ing_name: {
      type: DataTypes.STRING,
    },
    ing_calories: {
      type: DataTypes.FLOAT,
    },
    ing_state: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName:"ingredients",
    timestamps: false,
  }
);

module.exports = Ingredient;
