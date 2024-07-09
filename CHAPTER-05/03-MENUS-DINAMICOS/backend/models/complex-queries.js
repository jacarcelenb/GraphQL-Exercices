const sequelize = require("../config/cnn");
const Pizza = require("../models/pizza");
const PizzaIngredient = require("../models/pizza-ingredient");
const Ingredient = require("../models/ingredient");
const Menu = require("../models/menu");
const { QueryTypes } = require("sequelize");

const totalCalories = async (piz_id) => {
  const total = await sequelize.query(
    `select sum(pi.pi_portion * i.ing_calories) total_calories
      from pizzas p, ingredients i, pizzas_ingredients pi
      where p.piz_id = pi.piz_id AND pi.ing_id = i.ing_id AND p.piz_id=?`,
    {
      plain: false,
      raw: false,
      replacements: [piz_id],
      type: QueryTypes.SELECT,
    }
  );
  return total;
};

const getIngredientsByPizza = async (piz_id) => {
  const ingredient = await sequelize.query(
    `select i.*, pi.pi_portion
            from pizzas p, ingredients i, pizzas_ingredients pi
            where p.piz_id = pi.piz_id AND pi.ing_id = i.ing_id AND p.piz_id=?`,
    {
      plain: false,
      raw: false,
      replacements: [piz_id],
      type: QueryTypes.SELECT,
    }
  );
  return ingredient;
};

const getMenuByRol = async (rol_id) => {
  const Menu = await sequelize.query(
    `SELECT mn.mn_id ,mn.mn_name, mn.mn_route, mn.mn_icon from menu mn , rol_menu rm
      where rm.mn_id = mn.mn_id and rm.rol_id=?`,
    {
      plain: false,
      raw: false,
      replacements: [rol_id],
      type: QueryTypes.SELECT,
    }
  );
  return Menu;
};

const getPizzaIngredients = async (piz_id) => {
  let ingredientList = [];
  const ingredient = {
    ing_id: 0,
    ing_name: "",
    ing_calories: 0,
    ing_state: true,
    pi_portion: 0,
  };
  const ingredients = await Pizza.findOne({
    where: { piz_id: piz_id },
    include: [
      {
        model: Ingredient,
        through: {
          model: PizzaIngredient,
          attributes: ["pi_portion"],
        },
      },
    ],
  });

  for (
    let index = 0;
    index < ingredients.dataValues.Ingredients.length;
    index++
  ) {
    const element = ingredients.dataValues.Ingredients[index];
    ingredient.ing_id = element.dataValues.ing_id;
    ingredient.ing_name = element.dataValues.ing_name;
    ingredient.ing_calories = element.dataValues.ing_calories;
    ingredient.ing_state = element.dataValues.ing_state;
    ingredient.pi_portion = element.PizzaIngredient.dataValues.pi_portion;
    ingredientList.push(ingredient);
  }
  return ingredientList;
};

module.exports = {
  totalCalories,
  getIngredientsByPizza,
  getPizzaIngredients,
  getMenuByRol
};
