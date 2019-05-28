const { gql } = require("apollo-server-express");

const recipe = gql`
    type Recipe {
        id: ID
        name: String
        image: String
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


const mutations = gql`
    type Mutation {
        createRecipe(recipe: RecipeInput!): Recipe
        editRecipe(recipe: RecipeInput!, id: ID!): Recipe
    }
`;

const rootQuery = gql`
    type RootQuery {
        recipes: [Recipe]
        recipe(id: ID!): Recipe
        recipeIngredients(recipeId: ID!): [RecipeIngredient]
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
    recipeIngredient
];
