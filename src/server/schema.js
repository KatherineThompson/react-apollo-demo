const { gql } = require("apollo-server-express");

const recipe = gql`
    type Recipe {
        id: ID
        name: String
        image: String
        defaultImage: String
        link: String
        ingredients: [RecipeIngredient]
    }
`;

const recipeInput = gql`
    input RecipeInput {
        name: String
        image: String
        link: String
    }
`;

const recipeIngredient = gql`
    type RecipeIngredient {
        id: ID
        name: String
        amount: Float
        unit: String
    }
`;

const ingredient = gql`
    type Ingredient {
        id: ID
        name: String
    }
`;

const ingredientInput = gql`
    input IngredientInput {
        name: String
    }
`;

const mutations = gql`
    type Mutation {
        createRecipe(recipe: RecipeInput!): Recipe
        editRecipe(recipe: RecipeInput!, id: ID!): Recipe
        createIngredient(ingredient: IngredientInput): Ingredient
    }
`;

const rootQuery = gql`
    type RootQuery {
        recipes: [Recipe]
        recipe(id: ID!): Recipe
        recipeIngredients(recipeId: ID!): [RecipeIngredient]
        ingredients: [Ingredient]
    }
`;

const schema = gql`
    schema {
        query: RootQuery
        mutation: Mutation
    }
`;

module.exports = [
    schema,
    rootQuery,
    recipe,
    recipeInput,
    mutations,
    recipeIngredient,
    ingredient,
    ingredientInput
];
