const DataTypes = require("sequelize");
const sequelize = require("../config/cnn");

const DetailOrder = sequelize.define(
  "DetailOrder",
  {
    de_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ord_id: {
      type: DataTypes.INTEGER,
    },
    usr_id: {
      type: DataTypes.INTEGER,
    },
    piz_id: {
      type: DataTypes.INTEGER,
    },

    de_subtotal: {
      type: DataTypes.FLOAT,
    },

    de_total: {
      type: DataTypes.FLOAT,
    },
  },
  {
    tableName: "detail_orders",
    timestamps: false,
  }
);

module.exports = DetailOrder;
