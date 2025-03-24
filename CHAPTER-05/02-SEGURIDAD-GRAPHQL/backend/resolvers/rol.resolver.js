import { Role } from "../models/rol.js";
 const roleResolver = {
  Query: {
    roles: async (root, { rol_id }, { userId }) => {
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
        try {
          return await Role.findAll();
        } catch (error) {
          throw new Error("Error fetching role");
        }
      }
    },
  },
  Mutation: {
    createRole: async (root, { input }, { userId }) => {
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
        const { rol_description, rol_status } = input;
        try {
          return await Role.create({ rol_description, rol_status });
        } catch (error) {
          throw new Error("Error creating role");
        }
      }
    },
    updateRole: async (root, { input }, { userId }) => {
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
        const { rol_id, rol_description, rol_status } = input;
        try {
          const role = await Role.findByPk(rol_id);
          if (!role) {
            throw new Error("Role not found");
          }
          await role.update({ rol_description, rol_status });
          return role;
        } catch (error) {
          throw new Error("Error updating role");
        }
      }
    },
    deleteRole: async (root, { rol_id }, { userId }) => {
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
        try {
          const role = await Role.findByPk(rol_id);
          if (!role) {
            throw new Error("Role not found");
          }
          await role.destroy();
          return true;
        } catch (error) {
          throw new Error("Error deleting role");
        }
      }
    },
  },
};
export default roleResolver;
