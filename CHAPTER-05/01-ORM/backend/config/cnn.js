import Sequelize from "sequelize";
import vars from "./env-vars.js"

export const sequelize = new Sequelize(
  vars.DATABASE_NAME,
  vars.USER,
  vars.PASSWORD,
  {
    host: vars.HOST,
    dialect: vars.DIALECT,
  }
);
