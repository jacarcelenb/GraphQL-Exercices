import gql from "graphql-tag";

export const typeDef = gql`
  type Pizza {
    piz_id: Int!
    piz_name: String!
    piz_origin: String!
    piz_description: String
    piz_state: Boolean!
    total_calories: Float
    ingredients: [Ingredient!]
  }

  type Ingredient {
    ing_id: Int!
    ing_name: String!
    ing_calories: Float!
    ing_state: Boolean!
    pi_portion: Int
  }

  input InputPizza {
    piz_name: String!
    piz_origin: String!
    piz_description: String!
    piz_state: Boolean
    ingredientsPizza: [IngredientPortion!]
  }

  input UpdatePizza {
    piz_id: Int!
    piz_name: String!
    piz_origin: String!
    piz_description: String!
    piz_state: Boolean
    ingredientsPizza: [IngredientPortion!]
  }

  input InputIngredient {
    ing_name: String!
    ing_calories: Float!
    ing_state: Boolean
    pi_portion: Int
  }

  input UpdateIngredient {
    ing_id: Int!
    ing_name: String
    ing_calories: Float
    ing_state: Boolean
    pi_portion: Int
  }

  input IngredientPortion {
    ing_id: Int!
    pi_portion: Int
  }

  input PizzaIngredient {
    ing_id: Int
    piz_id: Int
  }

  type Query {
    pizzas(id: Int): [Pizza!]
    ingredients: [Ingredient!]
  }

  type Mutation {
    createPizza(pizza: InputPizza): Pizza
    updatePizza(pizza: UpdatePizza): Pizza
    deletePizza(id: ID!): String
    createIngredient(ingredient: InputIngredient): Ingredient
    updateIngredient(ingredient: UpdateIngredient): Ingredient
    deleteIngredient(id: ID!): String
    deletePizzaIngredient(pizzaIngredient: PizzaIngredient): String
  }
`;
