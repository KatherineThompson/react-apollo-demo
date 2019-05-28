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
            image
            defaultImage
            ingredients {
                id
                name
                amount
                unit
            }
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

    const ingredients = recipe.ingredients.length ? recipe.ingredients.map(ingredient => (
        <div key={ingredient.id}>{`${ingredient.amount} ${ingredient.unit}${ingredient.amount !== 1 ? "s" : ""} ${ingredient.name}`}</div>
    )) : <div>No ingredients for this recipe</div>;

    return (
        <div className="recipe-view">
            <div className="recipe-view__header">
                <h1>{recipe.name}</h1>
                <div className="button-container">
                    <Link
                        className="button"
                        to="/recipes"
                    >
                        Back
                    </Link>
                    <Link
                        className="button"
                        to={`/recipes/edit/${recipe.id}`}
                    >
                        Edit
                    </Link>
                </div>
            </div>
            <a href={recipe.link || ""}>Link</a>
            <h3>Ingredients</h3>
            {ingredients}
            <img src={recipe.image || recipe.defaultImage} />
        </div>
    );
};

export default graphql(recipeQuery, {
    props: ({ data }) => data,
    options: ({ id }) => ({
        variables: { id }
    })
})(ViewRecipe);
