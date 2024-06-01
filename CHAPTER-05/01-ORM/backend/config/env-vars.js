
require("dotenv/config")

module.exports = {
    DATABASE_NAME: process.env.DATABASE,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DIALECT: process.env.DIALECT

   }