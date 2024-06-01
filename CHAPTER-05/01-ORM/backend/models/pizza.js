const DataTypes = require("sequelize");
const sequelize = require("../config/cnn");
const PizzaIngredient = require("./pizza-ingredient");

const Pizza = sequelize.define(
  "pizzas",
  {
    piz_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    piz_name: {
      type: DataTypes.STRING,
    },
    piz_origin: {
      type: DataTypes.STRING,
    },
    piz_state: {
      type: DataTypes.BOOLEAN,
    },
    piz_description: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

Pizza.hasMany(PizzaIngredient, {
  foreinkey: "piz_id",
  sourceKey: "piz_id",
});

PizzaIngredient.belongsTo(Pizza, { foreinkey: "piz_id", targetId: "piz_id" });
module.exports = Pizza;
