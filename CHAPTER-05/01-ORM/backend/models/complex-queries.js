const sequelize = require("../config/cnn");
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
  return total
};

module.exports = totalCalories
