import { Pizza } from "../models/pizza.js";
import { Ingredient } from "../models/ingredient.js";
import { PizzaIngredient } from "../models/pizza-ingredient.js";
import { totalCalories, getIngredientsByPizza } from "../models/complex-queries.js";

 const pizzaResolver = {
  Query: {
    async pizzas(root, { piz_id }, { userId }) {
      if (userId === undefined) {
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
  },
  Mutation: {
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
      return getIngredientsByPizza(pizzas.piz_id);
    },

    async total_calories(pizza) {
      const total = await totalCalories(pizza.piz_id);
      return total[0].total_calories;
    },
  },
};

export default pizzaResolver;