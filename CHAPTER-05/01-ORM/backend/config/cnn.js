const Sequelize = require("sequelize") ;
const vars = require( "./env-vars")

const sequelize = new Sequelize(
  vars.DATABASE_NAME,
  vars.USER,
  vars.PASSWORD,
  {
    host: vars.HOST,
    dialect: vars.DIALECT,
  }
);
module.exports = sequelize