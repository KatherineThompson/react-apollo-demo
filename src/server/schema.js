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
const recipeIngredientInput = gql`
    input RecipeIngredientInput {
        ingredient_id: ID
        recipe_id: ID
        amount: Float
        unit_id: String
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

const unit = gql`
    type Unit {
        id: ID
        name: String
    }
`;

const mutations = gql`
    type Mutation {
        createRecipe(recipe: RecipeInput!): Recipe
        editRecipe(recipe: RecipeInput!, id: ID!): Recipe
        createIngredient(ingredient: IngredientInput!): Ingredient
        addRecipeIngredient(recipeIngredient: RecipeIngredientInput!, recipeId: ID!): [RecipeIngredient]
    }
`;

const rootQuery = gql`
    type RootQuery {
        recipes: [Recipe]
        recipe(id: ID!): Recipe
        recipeIngredients(recipeId: ID!): [RecipeIngredient]
        ingredients: [Ingredient]
        units: [Unit]
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
    ingredientInput,
    unit,
    recipeIngredientInput
];
