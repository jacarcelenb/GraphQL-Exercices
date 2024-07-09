const RoleMenu = require("../models/role-menu");
const { getMenuByRol } = require("../models/complex-queries");

const resolver = {
  Query: {
    async rolmenus(root, { rol_id }, { userId }) {
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
      }

      const role_menu = await RoleMenu.findOne({
        where: { rol_id: rol_id },
      });
      return [role_menu.dataValues];
    },

    async rolemenus(root, { userId }) {
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
        const role_menu = await RoleMenu.findAll();
        return role_menu;
      }
    },
  },
  Mutation: {
    addRoleMenu: async (_, { input }, { userId }) => {
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
        const roleMenu = await RoleMenu.create(input);
        return roleMenu;
      }
    },
    updateRoleMenu: async (_, { input }, { userId }) => {
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
        await RoleMenu.update(input, {
          where: { rm_id: input.rm_id },
        });
        return await RoleMenu.findByPk(rm_id);
      }
    },
    deleteRoleMenu: async (_, { rm_id }) => {
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
        const roleMenu = await RoleMenu.findByPk(rm_id);
        await RoleMenu.destroy({
          where: { rm_id },
        });
        return roleMenu;
      }
    },
  },
  RoleMenu: {
    async menus(rol_menu) {
      return getMenuByRol(rol_menu.rol_id);
    },
  },
};

module.exports = resolver;
