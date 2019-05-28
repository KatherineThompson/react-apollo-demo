import React from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const recipeQuery = gql`
    query RecipeQuery($id: ID!) {
        recipe(id: $id) {
            id
            name
            link
        }
    }
`;

const ViewRecipe = ({ recipe, loading, error }) => {
    if (loading) {
        return <h1>Loading...</h1>;
    }
    if (error) {
        return (
            <div>
                <h1>Error</h1>
                <div>{error.message}</div>
            </div>
        );
    }
    return (
        <div className="recipe-view__header">
            <h1>{recipe.name}</h1>
            <Link
                className="button"
                to={`/recipes/edit/${recipe.id}`}
            >
                Edit
            </Link>
        </div>
    );
};

export default graphql(recipeQuery, {
    props: ({ data }) => data,
    options: ({ id }) => ({
        variables: { id }
    })
})(ViewRecipe);
