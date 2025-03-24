import { Menu } from "../models/menu.js";

const menuResolver = {
  Query: {
    async menus(_, { mn_id }, { userId }) {
      if (!userId) {
        throw new Error("Not authenticated");
      }

      if (mn_id === undefined) {
        return await Menu.findAll();
      } else {
        const menu = await Menu.findOne({ where: { mn_id } });
        if (!menu) {
          throw new Error(`Menu with id ${mn_id} not found`);
        }
        return [menu.dataValues];
      }
    },
  },
};

export default menuResolver;


