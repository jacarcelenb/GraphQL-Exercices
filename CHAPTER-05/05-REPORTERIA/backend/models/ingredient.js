import { DataTypes } from "sequelize";
import { sequelize } from "../config/cnn.js";

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

export {Ingredient}
