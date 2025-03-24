import { DataTypes } from "sequelize";
import { sequelize } from "../config/cnn.js";

const User = sequelize.define(
  "User",
  {
    usr_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usr_name: {
      type: DataTypes.STRING,
    },
    usr_email: {
      type: DataTypes.STRING,
    },
    usr_password: {
      type: DataTypes.STRING,
    },
    usr_status: {
      type: DataTypes.BOOLEAN,
    },
    rol_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

export {User}
