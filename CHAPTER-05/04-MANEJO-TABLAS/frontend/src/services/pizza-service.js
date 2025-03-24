import { gql } from "@apollo/client";
import { showMessage } from "./message-service";

const GET_PIZZAS = gql`
  {
    pizzas {
      piz_id
      piz_name
      piz_origin
      piz_description
      piz_state
      total_calories
      ingredients {
        ing_name
        ing_calories
        ing_state
        ing_id
        pi_portion
      }
    }
  }
`;

const CREATE_PIZZA = gql`
  mutation createPizza($pizza: inputPizza) {
    createPizza(pizza: $pizza) {
      piz_name
      piz_origin
      piz_description
      piz_state
      ingredients {
        ing_id
        pi_portion
      }
    }
  }
`;

const UPDATE_PIZZA = gql`
  mutation UpdatePizza($pizza: updatePizza) {
    updatePizza(pizza: $pizza) {
      piz_id
      piz_name
      piz_description
      piz_origin
    }
  }
`;

const DELETE_PIZZA = gql`
  mutation deletePizza($deletePizzaId: ID!) {
    deletePizza(id: $deletePizzaId)
  }
`;

const DELETE_PIZZA_INGREDIENT = gql`
  mutation deletePizzaIngredient($pizzaIngredient: pizzaIngredient) {
    deletePizzaIngredient(pizzaIngredient: $pizzaIngredient)
  }
`;

const deleteIngredient = (item, Ingredientlist) => {
  let ingredients = [];
  for (let index = 0; index < Ingredientlist.length; index++) {
    const element = Ingredientlist[index];
    if (element.ing_id != item.ing_id) {
      ingredients.push(element);
    }
  }
  return ingredients;
};

const ListSelectedIngredients = (Ingredientlist) => {
  let result = [];
  for (let index = 0; index < Ingredientlist.length; index++) {
    const element = Ingredientlist[index];
    result.push({
      ing_id: element.ing_id,
      pi_portion: element.pi_portion,
    });
  }
  return result;
};

const getTotalCalories = (ingredients) => {
  let total = 0;
  if (ingredients != undefined) {
    for (let index = 0; index < ingredients.length; index++) {
      const element = ingredients[index];
      total += element.ing_calories * element.pi_portion;
    }
  }
  return total;
};

const addIngredient = (IngredientsList, quantity, newIngredient) => {
  const ingredient = {
    ing_id: 0,
    ing_name: "",
    ing_calories: 0,
    pi_portion: 0,
    ing_state: false,
  };

  let foundIngredient = IngredientsList.data?.ingredients.find(
    (ingredient) => ingredient.ing_id == parseInt(newIngredient)
  );
  if (quantity == 0) {
    showMessage("Debe ingresar la cantidad", "warning");
  } else {
    ingredient.ing_id = foundIngredient.ing_id;
    ingredient.ing_name = foundIngredient.ing_name;
    ingredient.ing_calories = foundIngredient.ing_calories;
    ingredient.ing_state = foundIngredient.ing_state;
    ingredient.pi_portion = quantity;
  }

  return ingredient;
};

const showIngredient = (ingredients) => {
  let result = "";
  if (ingredients != undefined) {
    for (let index = 0; index < ingredients.length; index++) {
      const element = ingredients[index];
      result += "✅ " + element.ing_name + "  ";
    }
    if (ingredients.length === 0) {
      result = "Sin ingredientes";
    }
  }
  return result;
};

export {
  DELETE_PIZZA,
  GET_PIZZAS,
  UPDATE_PIZZA,
  CREATE_PIZZA,
  DELETE_PIZZA_INGREDIENT,
  getTotalCalories,
  deleteIngredient,
  ListSelectedIngredients,
  addIngredient,
  showIngredient,
};
