import { DataTypes } from "sequelize";
import { sequelize } from "../config/cnn.js";

 const Pizza = sequelize.define(
  "Pizza",
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
    tableName:"pizzas",
    timestamps: false,
  }
);
export {Pizza}


