import gql from "graphql-tag";
import { graphql } from "react-apollo";

const filteredRecipesQuery = gql`
    query FilteredRecipes($ingredientId: ID) {
        filteredRecipes(ingredientId: $ingredientId) {
            id
            name
        }
        ingredients {
            id
            name
        }
    }
`;

const withFilteredRecipes = graphql(filteredRecipesQuery, {
    props: ({ data }) => ({
        ...data,
        recipes: data.filteredRecipes || []
    })
});

export {
    withFilteredRecipes
};

// const RecipeListGraphQLHoc = withFilteredRecipes(RecipeList);
