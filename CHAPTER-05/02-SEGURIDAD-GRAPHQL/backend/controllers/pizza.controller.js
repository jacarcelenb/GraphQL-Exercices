const Pizza = require("../models/pizza");
const Ingredient = require("../models/ingredient");
const User = require("../models/users");
const PizzaIngredient = require("../models/pizza-ingredient");
const totalCalories = require("../models/complex-queries");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const vars = require("../config/env-vars");
const {totalCalories,getIngredientsByPizza} = require("../models/complex-queries");
const pizzaResolver = {
  Query: {
    async pizzas(root, { piz_id }, { userId }) {
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
        if (piz_id == undefined) {
          return await Pizza.findAll();
        } else {
          const pizza = await Pizza.findOne({
            where: { piz_id },
          });
          return [pizza.dataValues];
        }
      }
    },

    async ingredients(root, { ing_id }, { userId }) {
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
        if (ing_id == undefined) {
          return await Ingredient.findAll();
        } else {
          const ingredient = await Ingredient.findOne({
            where: { ing_id },
          });
          return [ingredient.dataValues];
        }
      }
    },

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
      const token = jwt.sign({ userId: usr_id }, vars.JWTSECRET, {
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
        const valid = await bcrypt.compare(usr_password, user.dataValues.usr_password);
        if (!valid) {
          throw new Error("Invalid password");
        } else {
           token = jwt.sign({ userId: user.dataValues.usr_id }, vars.JWTSECRET, {
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
              usr_password: user.usr_password,
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
    async createPizza(root, { pizza }, { userId }) {
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
        try {
          if (pizza === undefined) {
            return null;
          } else {
            const newPizza = await Pizza.create({
              piz_name: pizza.piz_name,
              piz_origin: pizza.piz_origin,
              piz_description: pizza.piz_description,
              piz_state: pizza.piz_state,
            });

            if (pizza.ingredientsPizza.length > 0) {
              pizza.ingredientsPizza.forEach(async (element) => {
                await PizzaIngredient.create({
                  piz_id: newPizza.dataValues.piz_id,
                  ing_id: element.ing_id,
                  pi_portion: element.pi_portion,
                });
              });
              return newPizza;
            }
          }
        } catch (error) {
          return error;
        }
      }
    },
    async updatePizza(root, { pizza }, { userId }) {
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
        try {
          if (pizza === undefined) {
            return null;
          } else {
            const Updatepizza = await Pizza.findOne({
              attributes: [
                "piz_name",
                "piz_origin",
                "piz_state",
                "piz_description",
                "piz_id",
              ],
              where: { piz_id: pizza.piz_id },
            });

            Updatepizza.set({
              piz_id: pizza.piz_id,
              piz_name: pizza.piz_name,
              piz_origin: pizza.piz_origin,
              piz_state: pizza.piz_state,
              piz_description: pizza.piz_description,
            });

            await Updatepizza.save();

            if (pizza.ingredientsPizza.length > 0) {
              await PizzaIngredient.destroy({
                where: { piz_id: pizza.piz_id },
              });

              pizza.ingredientsPizza.forEach(async (element) => {
                await PizzaIngredient.create({
                  piz_id: pizza.piz_id,
                  ing_id: element.ing_id,
                  pi_portion: element.pi_portion,
                });
              });
            }
            return Updatepizza;
          }
        } catch (error) {
          return error;
        }
      }
    },

    async deletePizza(root, value, { userId }) {
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
        try {
          if (value === undefined) {
            return null;
          } else {
            const { id } = value;
            if (id > 0) {
              await PizzaIngredient.destroy({
                where: { piz_id: id },
              });
              await Pizza.destroy({
                where: { piz_id: id },
              });
            }
            return `Pizza ${id} eliminada correctamente`;
          }
        } catch (error) {
          return error;
        }
      }
    },

    async createIngredient(root, { ingredient }, { userId }) {
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
        try {
          if (ingredient === undefined) {
            return null;
          } else {
            console.log({ ingredient });
            const createdIngredient = await Ingredient.create({
              ing_name: ingredient.ing_name,
              ing_calories: ingredient.ing_calories,
              ing_state: true,
            });

            return createdIngredient;
          }
        } catch (error) {
          return error;
        }
      }
    },
    async updateIngredient(root, { ingredient }, { userId }) {
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
        try {
          if (ingredient === undefined) {
            return null;
          } else {
            const updateIngredient = await Ingredient.findOne({
              attributes: ["ing_name", "ing_calories", "ing_state", "ing_id"],
              where: { ing_id: ingredient.ing_id },
            });

            updateIngredient.set({
              ing_id: ingredient.ing_id,
              ing_name: ingredient.ing_name,
              ing_calories: ingredient.ing_calories,
              ing_state: ingredient.ing_state,
            });

            await updateIngredient.save();

            return updateIngredient;
          }
        } catch (error) {
          return error;
        }
      }
    },
    async deleteIngredient(root, value, { userId }) {
      if (!userId) {
        throw new Error("Not authenticated");
      } else {
        try {
          if (value === undefined) {
            return null;
          } else {
            const { id } = value;
            if (id > 0) {
              await PizzaIngredient.destroy({
                where: { ing_id: id },
              });
              await Ingredient.destroy({
                where: { ing_id: id },
              });
            }
            return `Ingrediente ${id} eliminado correctamente`;
          }
        } catch (error) {
          return error;
        }
      }
    },
  },
  pizzas: {
    async ingredients(pizzas) {
      const ingredients = getIngredientsByPizza(pizzas.piz_id);
      return ingredients;
    },

    async total_calories(pizza) {
      const total = await totalCalories(pizza.piz_id);
      return total[0].total_calories;
    },
  },
};

module.exports = pizzaResolver;
