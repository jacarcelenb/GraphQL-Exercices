const { getMenuByRol } = require("../models/complex-queries");
const RoleMenu = require("../models/role-menu");


const RoleMenuResolver = {
  Query: {
    async rolemenus(root, { rol_id }, { userId }) {
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
        if (rol_id === undefined) {
          return await RoleMenu.findAll();
        } else {
          const role_menu = await RoleMenu.findOne({
            where: { rol_id: rol_id },
          });
          return [role_menu.dataValues];
        }
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
        return await RoleMenu.findByPk(input.rm_id);
      }
    },
    deleteRoleMenu: async (_, { rm_id },{userId }) => {
      console.log("rm_id ", rm_id)
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
        await RoleMenu.destroy({
          where: { rm_id:rm_id },
        });
        return `Acceso Rol Menu ${rm_id} eliminado correctamente`;
      }
    },
  },
  RoleMenu: {
    async menus(rolemenu) {
      return getMenuByRol(rolemenu.rol_id);
    },
  },
};

module.exports = RoleMenuResolver;
