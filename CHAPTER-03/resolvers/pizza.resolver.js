import { db } from "../config/cnn.js";

const pizzaResolver = {
  Query: {
    pizzas(_root, { id }) {
      if (id == undefined) {
        return db.any("SELECT * FROM pizzas;");
      } else {
        return db.any("SELECT * FROM pizzas WHERE piz_id=$1;", [id]);
      }
    },
    ingredients(_root, { id }) {
      return db.any("SELECT * FROM ingredients;");
    },
  },
  Mutation: {
    async createPizza(_root, { pizza }) {
      try {
        if (pizza === undefined) {
          return null;
        } else {
          const newPizza = await db.one(
            `INSERT INTO pizzas(piz_name, piz_origin, piz_description ,piz_state)
                                    VALUES ($1, $2, $3, $4) returning *`,
            [
              pizza.piz_name,
              pizza.piz_origin,
              pizza.piz_description,
              pizza.piz_state,
            ]
          );
          if (pizza.ingredientsPizza.length > 0) {
            pizza.ingredientsPizza.forEach(async (element) => {
              await db.none(
                `INSERT INTO pizzas_ingredients(piz_id, ing_id, pi_portion)
                            VALUES ($1, $2, $3);`,
                [newPizza.piz_id, element.ing_id, element.pi_portion]
              );
            });
          }
          return newPizza;
        }
      } catch (error) {
        return error;
      }
    },
    async updatePizza(_root, { pizza }) {
      try {
        if (pizza === undefined) {
          return null;
        } else {
          const newPizza = await db.one(
            `UPDATE pizzas
                                SET piz_name=$2, piz_origin=$3, piz_state=$4,
                                piz_description=$5
                                WHERE piz_id=$1 returning *;`,
            [
              pizza.piz_id,
              pizza.piz_name,
              pizza.piz_origin,
              pizza.piz_state,
              pizza.piz_description,
            ]
          );
          if (pizza.ingredientsPizza.length > 0) {
            db.none(`DELETE FROM pizzas_ingredients WHERE piz_id=$1`, [
              newPizza.piz_id,
            ]);
            pizza.ingredientsPizza.forEach(async (element) => {
              await db.none(
                `INSERT INTO pizzas_ingredients(piz_id, ing_id, pi_portion)
                            VALUES ($1, $2, $3);`,
                [newPizza.piz_id, element.ing_id, element.pi_portion]
              );
            });
          }
          return newPizza;
        }
      } catch (error) {
        return error;
      }
    },

    async deletePizza(_root, value) {
      try {
        if (value === undefined) {
          return null;
        } else {
          const { id } = value;
          if (id > 0) {
            await db
              .none(`DELETE FROM pizzas_ingredients WHERE piz_id=$1`, [id])
              .then(async () => {
                await db.none(`DELETE FROM pizzas WHERE piz_id=$1`, [id]);
              });
          }
          return `Pizza ${id} eliminada correctamente`;
        }
      } catch (error) {
        return error;
      }
    },

    async createIngredient(_root, { ingredient }) {
      try {
        if (ingredient === undefined) {
          return null;
        } else {
          const newIngredient = await db.one(
            `INSERT INTO ingredients(ing_name, ing_calories, ing_state)
                                    VALUES ($1, $2, true) returning *`,
            [ingredient.ing_name, ingredient.ing_calories]
          );
          return newIngredient;
        }
      } catch (error) {
        return error;
      }
    },
    async updateIngredient(_root, { ingredient }) {
      try {
        if (ingredient === undefined) {
          return null;
        } else {
          const updateingredient = await db.one(
            `UPDATE ingredients SET ing_name=$2, ing_calories=$3, ing_state=$4
                                WHERE ing_id=$1 returning *;`,
            [
              ingredient.ing_id,
              ingredient.ing_name,
              ingredient.ing_calories,
              ingredient.ing_state,
            ]
          );
          return updateingredient;
        }
      } catch (error) {
        return error;
      }
    },
    async deleteIngredient(_root, value) {
      try {
        if (value === undefined) {
          return null;
        } else {
          const { id } = value;
          if (id > 0) {
            await db
              .none(`DELETE FROM pizzas_ingredients WHERE ing_id=$1`, [id])
              .then(async () => {
                await db.none(`DELETE FROM ingredients WHERE ing_id=$1`, [id]);
              });
          }
          return `Ingrediente ${id} eliminado correctamente`;
        }
      } catch (error) {
        return error;
      }
    },
    async deletePizzaIngredient(_root, value) {
      let piz_id = value.pizzaIngredient.piz_id;
      let ing_id = value.pizzaIngredient.ing_id;
      try {
        if (value === undefined) {
          return null;
        } else {
          if (ing_id > 0 && piz_id > 0) {
            await db.none(
              `DELETE FROM pizzas_ingredients WHERE piz_id=$1 and ing_id=$2`,
              [piz_id, ing_id]
            );
          }
          return `Ingrediente ${ing_id} eliminado correctamente de la pizza ${piz_id}`;
        }
      } catch (error) {
        return error;
      }
    },
  },
  pizzas: {
    ingredients(pizza) {
      return db.any(
        `select i.*, pi.pi_portion
            from pizzas p, ingredients i, pizzas_ingredients pi
            where p.piz_id = pi.piz_id AND pi.ing_id = i.ing_id AND p.piz_id=$1;`,
        [pizza.piz_id]
      );
    },
    async total_calories(pizza) {
      const total_colories = await db.one(
        `select sum(pi.pi_portion * i.ing_calories) total_calories
                            from pizzas p, ingredients i, pizzas_ingredients pi
                            where p.piz_id = pi.piz_id AND pi.ing_id = i.ing_id AND p.piz_id=$1`,
        [pizza.piz_id]
      );
      return total_colories.total_calories;
    },
  },
};

export default pizzaResolver;
