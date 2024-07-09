const Menu = require("../models/menu");

const resolvers = {
  Query: {
    async menus(root, { userId }) {
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
        return Menu.findAll();
      }
    },
  },
};

module.exports = resolvers;
