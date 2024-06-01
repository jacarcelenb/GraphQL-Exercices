const DataTypes = require("sequelize");
const sequelize = require("../config/cnn");
const PizzaIngredient = require("./pizza-ingredient");

const Ingredient = sequelize.define(
  "ingredients",
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
    timestamps: false,
  }
);

Ingredient.hasMany(PizzaIngredient, {
  foreinkey: "ing_id",
  sourceKey: "ing_id",
});

PizzaIngredient.belongsTo(Ingredient, {
  foreinkey: "ing_id",
  targetId: "ing_id",
});

module.exports = Ingredient;
