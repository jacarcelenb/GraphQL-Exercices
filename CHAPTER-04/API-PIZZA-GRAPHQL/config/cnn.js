const pgPromise = require("pg-promise");
const config = {
  host: "localhost",
  port: "5432",
  database: "pizza",
  user: "postgres",
  password: "1234admin",
};
const pgp = pgPromise({});
const db = pgp(config);

exports.db = db;
