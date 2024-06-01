const  DataTypes = require("sequelize");
const  sequelize = require("../config/cnn") ;

const PizzaIngredient = sequelize.define(
  "pizzas_ingredients",
  {
    pi_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    piz_id: {
        type: DataTypes.INTEGER,
    },
    ing_id: {
        type: DataTypes.INTEGER,
    },
    pi_portion: {
        type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = PizzaIngredient
