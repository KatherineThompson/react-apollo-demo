import React from "react";
import { graphql, Query } from "react-apollo";
import { Link } from "react-router-dom";
import gql from "graphql-tag";

import IngredientsSelect from "./ingredients-select";
import { withFilteredRecipes } from "./recipe-list-queries";

const recipeListQuery = gql`
    query RecipeListQuery {
        recipes {
            id
            name
        }
    }
`;

const RecipeList = ({
    loading,
    recipes,
    ingredients,
    refetch,
    variables
}) => {
    if (loading) {
        return (
            <h1>Loading...</h1>
        );
    }
    const recipeListItems = recipes.map(recipe => (
        <Link
            key={recipe.id}
            className="recipe-list__item"
            to={`/recipes/view/${recipe.id}`}
        >
            {recipe.name}
        </Link>
    ));

    const ingredientsFilter = ingredients && ingredients.length ? (
        <IngredientsSelect
            value={variables.ingredientId}
            ingredients={ingredients}
            onChange={e => refetch({ ingredientId: e.target.value })}
        />
    ) : null;

    return (
        <div>
            <div className="recipe-list__header">
                <h1>Recipes</h1>
                {ingredientsFilter}
                <Link
                    className="button"
                    to="/recipes/new"
                >
                    Add New Recipe
                </Link>
            </div>
            {recipeListItems}
        </div>
    );

};

// const RecipeListGraphQLHoc = graphql(recipeListQuery, {
//     props: ({ data }) => data
// })(RecipeList);
const RecipeListGraphQLHoc = withFilteredRecipes(RecipeList);


const RecipeListWithQuery = () => (
    <Query query={recipeListQuery}>
        {({ loading, data }) => (
            <RecipeList {...data} loading={loading} />
        )}
    </Query>
);

export default RecipeListGraphQLHoc;

export {
    recipeListQuery
};
