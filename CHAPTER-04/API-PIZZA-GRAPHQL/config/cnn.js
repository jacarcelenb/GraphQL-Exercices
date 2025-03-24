import * as dotenv from 'dotenv';
import pgPromise from "pg-promise";
dotenv.config();

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

const pgp = pgPromise({});
const db = pgp(config);

export { db };