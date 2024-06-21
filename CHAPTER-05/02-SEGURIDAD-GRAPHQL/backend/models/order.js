const DataTypes = require("sequelize");
const sequelize = require("../config/cnn");

const Order = sequelize.define(
  "Order",
  {
    ord_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usr_id: {
      type: DataTypes.INTEGER,
    },
    ord_date: {
      type: DataTypes.DATE,
    },
    ord_description: {
      type: DataTypes.STRING,
    }
  },
  {
    tableName: "orders",
    timestamps: false,
  }
);

module.exports = Order;
