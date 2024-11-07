const DataTypes  = require('sequelize');
const sequelize = require("../config/cnn");

const RoleMenu = sequelize.define('RoleMenu', {
  rm_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rol_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  mn_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rm_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'rol_menu',
  timestamps: false
});

module.exports = RoleMenu;
