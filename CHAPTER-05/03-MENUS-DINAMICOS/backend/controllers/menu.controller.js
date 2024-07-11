const Menu = require("../models/menu");

const MenuResolver = {
  Query: {
    async menus(root, { mn_id }, { userId }) {
      console.log(userId);
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
        if (mn_id === undefined) {
          return await Menu.findAll();

        } else {
          const menu = await Menu.findOne({
            where: { mn_id },
          });
          return [menu.dataValues];
        }
      }
    },
  },
};

module.exports = MenuResolver;
