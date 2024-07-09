const DataTypes = require("sequelize");
const sequelize = require("../config/cnn");

const Rol = sequelize.define(
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

module.exports = Rol;
