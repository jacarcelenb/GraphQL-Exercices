import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  API_TOKEN: process.env.API_TOKEN,
  API_URL: process.env.API_URL
};

export { config };