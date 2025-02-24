import jwt from 'jsonwebtoken'
import { config } from '../config/env-vars.js';

const getUserFromToken = (token) => {
  if (token) {
    return jwt.verify(token, config.JWTSECRET);
  }
  return "";
};

export {getUserFromToken}