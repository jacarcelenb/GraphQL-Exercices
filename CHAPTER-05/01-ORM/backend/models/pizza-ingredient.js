const DataTypes = require("sequelize");
const sequelize = require("../config/cnn");
const Pizza = require("./pizza");
const Ingredient = require("./ingredient");

const PizzaIngredient = sequelize.define(
  "PizzaIngredient",
  {
    pi_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    piz_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Pizza,
      },
    },
    ing_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Ingredient,
      },
    },
    pi_portion: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "pizzas_ingredients",
    timestamps: false,
  }
);

Pizza.belongsToMany(Ingredient, {
  through: PizzaIngredient,
  foreignKey: "piz_id",
});

Ingredient.belongsToMany(Pizza, {
  through: PizzaIngredient,
  foreignKey: "ing_id",
});

module.exports = PizzaIngredient;
