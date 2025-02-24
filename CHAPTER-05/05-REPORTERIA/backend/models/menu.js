import { DataTypes } from "sequelize";
import { sequelize } from "../config/cnn.js";

const Menu = sequelize.define('Menu', {
  mn_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  mn_name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  mn_route: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  mn_icon: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'menu',
  timestamps: false
});

export {Menu}
