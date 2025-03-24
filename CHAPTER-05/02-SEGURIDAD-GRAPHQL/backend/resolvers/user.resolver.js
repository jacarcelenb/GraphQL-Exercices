import bcrypt from  'bcryptjs'
import jwt from 'jsonwebtoken'
import { config } from "../config/env-vars.js";
import {User} from  "../models/users.js"
const userResolver = {
  Query: {
    async users(root, { usr_id }, { userId }) {
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
        if (usr_id == undefined) {
          return await User.findAll();
        } else {
          const user = await User.findOne({
            where: { usr_id },
          });
          return [user.dataValues];
        }
      }
    },
  },
  Mutation: {
    createUser: async (root, { user }) => {
      const hashedPassword = await bcrypt.hash(user.usr_password, 10);
      const newUser = await User.create({
        usr_name: user.usr_name,
        usr_email: user.usr_email,
        usr_password: hashedPassword,
        usr_status: user.usr_status,
        rol_id: user.rol_id,
      });
      const { usr_id, usr_name, usr_email, usr_password, usr_status, rol_id } =
        newUser;
      const token = jwt.sign({ userId: usr_id }, config.JWTSECRET, {
        expiresIn: "1h",
      });
      return {
        usr_id: usr_id,
        usr_name: usr_name,
        usr_email: usr_email,
        usr_password: usr_password,
        usr_status: usr_status,
        rol_id: rol_id,
        user_token: token,
      };
    },
    loginUser: async (root, { usr_email, usr_password }) => {
      const user = await User.findOne({
        where: { usr_email: usr_email },
      });
      let token = "";

      if (!user) {
        throw new Error("User not found");
      } else {
        const valid = await bcrypt.compare(
          usr_password,
          user.dataValues.usr_password
        );
        if (!valid) {
          throw new Error("Invalid password");
        } else {
          token = jwt.sign({ userId: user.dataValues.usr_id }, config.JWTSECRET, {
            expiresIn: "1h",
          });
        }
      }
      return {
        usr_id: user.dataValues.usr_id,
        usr_name: user.dataValues.usr_name,
        usr_email: user.dataValues.usr_email,
        usr_password: user.dataValues.usr_password,
        usr_status: user.dataValues.usr_status,
        rol_id: user.dataValues.rol_id,
        user_token: token,
      };
    },
    async updateUser(root, { user }, { userId }) {
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
        try {
          if (user === undefined) {
            return null;
          } else {
            const updateUser = await User.findOne({
              attributes: [
                "usr_name",
                "usr_email",
                "usr_password",
                "usr_status",
                "usr_id",
              ],
              where: { usr_id: user.usr_id },
            });

              updateUser.set({
                usr_id: user.usr_id,
                usr_name: user.usr_name,
                usr_email: user.usr_email,
                usr_status: user.usr_status,
              });

            await updateUser.save();

            return updateUser;
          }
        } catch (error) {
          return error;
        }
      }
    },
    async deleteUser(root, value, { userId }) {
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
        try {
          if (value === undefined) {
            return null;
          } else {
            const { id } = value;
            if (id > 0) {
              await User.destroy({
                where: { usr_id: id },
              });
            }
            return `Usuario ${id} eliminado correctamente`;
          }
        } catch (error) {
          return error;
        }
      }
    },
  },
};

export default userResolver;