const envVars = require("../config/env-vars.js");
const API_KEY = envVars.API_TOKEN;

const getFrameURl = (item) => {
  return "https://" + item.player.embedHtml.substring(40, 73);
};


module.exports = {
    getFrameURl,

}