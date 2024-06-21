const jwt = require("jsonwebtoken");
const vars = require("../config/env-vars");

const getUserFromToken = (token) => {
  if (token) {
    return jwt.verify(token, vars.JWTSECRET);
  }
  return "";
};

module.exports = {getUserFromToken}