const pgPromise = require("pg-promise");
require("dotenv").config();

const config = {
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
};
const pgp = pgPromise({});
const db = pgp(config);

exports.db = db;
