import { gql } from "@apollo/client";
const GET_INGREDIENTS = gql`
  {
    ingredients {
      ing_id
      ing_name
      ing_calories
      ing_state
    }
  }
`;

const CREATE_INGREDIENTS = gql`
  mutation CreateIngredient($ingredient: inputIngredient) {
    createIngredient(ingredient: $ingredient) {
      ing_name
      ing_state
      ing_calories
    }
  }
`;

const UPDATE_INGREDIENTS = gql`
  mutation updateIngredient($ingredient: updateIngredient) {
    updateIngredient(ingredient: $ingredient) {
      ing_id
      ing_name
      ing_state
      ing_calories
    }
  }
`;

const DELETE_INGREDIENTS = gql`
  mutation deleteIngredient($deleteIngredientId: ID!) {
    deleteIngredient(id: $deleteIngredientId)
  }
`;

const ListActiveIngredients = (list) =>{
  console.log(list);
  return list.map(item => item.ing_state === true);
}

export { GET_INGREDIENTS, CREATE_INGREDIENTS, UPDATE_INGREDIENTS, DELETE_INGREDIENTS ,
  ListActiveIngredients };
