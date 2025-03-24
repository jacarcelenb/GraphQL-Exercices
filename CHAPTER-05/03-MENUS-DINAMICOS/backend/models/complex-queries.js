import { sequelize } from "../config/cnn.js";
import { QueryTypes } from "sequelize";


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
      where rm.mn_id = mn.mn_id and rm.rol_id=? order by mn.mn_id`,
    {
      plain: false,
      raw: false,
      replacements: [rol_id],
      type: QueryTypes.SELECT,
    }
  );
  return Menu;
};


export {totalCalories, getIngredientsByPizza,getMenuByRol};
