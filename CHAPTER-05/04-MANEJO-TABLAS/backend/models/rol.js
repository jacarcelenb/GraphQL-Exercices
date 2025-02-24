import { DataTypes } from "sequelize";
import { sequelize } from "../config/cnn.js";

const Role = sequelize.define(
  "Rol",
  {
    rol_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rol_description: {
      type: DataTypes.STRING,
    },
    rol_status: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName:"roles",
    timestamps: false,
  }
);

export {Role}
