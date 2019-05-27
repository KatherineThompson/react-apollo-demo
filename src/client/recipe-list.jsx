import React from "react";
import { graphql, Query } from "react-apollo";
import gql from "graphql-tag";

const recipeListQuery = gql`
    query RecipeListQuery {
        recipes {
            id
            name
        }
    }
`;

const RecipeList = ({ loading, recipes }) => {
    if (loading) {
        return (
            <h1>Loading...</h1>
        );
    }
    const recipeListItems = recipes.map(recipe => (
        <div key={recipe.id} className="recipe-list-item">{recipe.name}</div>
    ));

    return (
        <div>
            <h1>Recipes</h1>
            {recipeListItems}
        </div>
    );

};

const RecipeListGraphQLHoc = graphql(recipeListQuery, {
    props: ({ data }) => data
})(RecipeList);

const RecipeListWithQuery = () => (
    <Query query={recipeListQuery}>
        {({ loading, data }) => (
            <RecipeList {...data} loading={loading} />
        )}
    </Query>
);

export default RecipeListGraphQLHoc;
