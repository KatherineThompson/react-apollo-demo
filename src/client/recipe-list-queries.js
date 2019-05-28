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

const paginateRecipesQuery = gql`
    query PaginatedRecipes($ingredientId: ID, $pageNumber: Int) {
        paginatedRecipes(ingredientId: $ingredientId, pageNumber: $pageNumber) {
            recipes {
                id
                name
            }
            pagination {
                pageNum
                numPages
            }
        }
        ingredients {
            id
            name
        }
    }
`;

const withPaginatedRecipes = graphql(paginateRecipesQuery, {
    props: ({ data }) => ({
        ...data,
        recipes: data.paginatedRecipes ? data.paginatedRecipes.recipes : [],
        pagination: data.paginatedRecipes ? data.paginatedRecipes.pagination : []
    }),
    options: () => ({
        variables: { pageNumber: 1 }
    })
});

export {
    withFilteredRecipes,
    withPaginatedRecipes
};

// const RecipeListGraphQLHoc = withFilteredRecipes(RecipeList);
