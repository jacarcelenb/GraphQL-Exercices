import Sequelize from 'sequelize';
import { config } from './env-vars.js';

const sequelize = new Sequelize(
  config.database,
  config.user,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false,  // Desactiva los logs
  }
);


export { sequelize };