import React, { Fragment } from "react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";

const selectQuery = gql`
    query SelectQuery {
        ingredients {
            id
            name
        }
        units {
            id
            name
        }
    }
`;

const addIngredientMutation = gql`
    mutation AddRecipeIngredient($recipeIngredient: RecipeIngredientInput!, $recipeId: ID!) {
        addRecipeIngredient(recipeIngredient: $recipeIngredient, recipeId: $recipeId) {
            id
            name
            amount
            unit
        }
    }
`;

class RecipeIngredients extends React.Component {//eslint-disable-line
    constructor(props) {
        super(props);
        this.state = {
            showAddRow: false,
            ingredientId: "",
            amount: "",
            unitId: ""
        };
    }

    saveIngredient = () => {
        const recipeIngredient = {
            ingredient_id: this.state.ingredientId,
            unit_id: this.state.unitId,
            amount: parseFloat(this.state.amount),
            recipe_id: this.props.recipeId
        };
        this.props.addRecipeIngredient(recipeIngredient, this.props.recipeId);
    }

    render() {
        const ingredients = this.props.recipeIngredients.length ? this.props.recipeIngredients.map(ingredient => (
            <div key={ingredient.id}>{`${ingredient.amount} ${ingredient.unit}${ingredient.amount !== 1 ? "s" : ""} ${ingredient.name}`}</div>
        )) : <div>No ingredients for this recipe</div>;
        const newRow = this.state.showAddRow ? (
            <div>
                <div className="form-row--multi">
                    <div>
                        <label>Ingredient</label>
                        <select
                            value={this.state.ingredientId}
                            onChange={e => this.setState({ ingredientId: e.target.value })}
                        >
                            {
                                this.props.ingredients.map(ingredient => (
                                    <option value={ingredient.id} key={ingredient.id}>{ingredient.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <label>Amount</label>
                        <input
                            onChange={e => this.setState({ amount: e.target.value })}
                            value={this.state.amount}
                        />
                    </div>
                    <div>
                        <label>Unit</label>
                        <select
                            value={this.state.unitId}
                            onChange={e => this.setState({ unitId: e.target.value })}
                        >
                            {
                                this.props.units.map(unit => (
                                    <option value={unit.id} key={unit.id}>{unit.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <button
                        className="button"
                        onClick={this.saveIngredient}
                    >
                        Save
                    </button>
                </div>
            </div>
        ) : null;
        return (
            <Fragment>
                <div className="recipe-view__header">
                    <h3>Ingredients</h3>
                    <button
                        className="button"
                        onClick={() => this.setState({ showAddRow: true })}
                    >
                            Add ingredient
                    </button>
                </div>
                {ingredients}
                {newRow}
            </Fragment>
        );
    }
}

export default compose(
    graphql(selectQuery, {
        props: ({ data }) => data
    }),
    graphql(addIngredientMutation, {
        props: ({ mutate }) => ({
            addRecipeIngredient: (recipeIngredient, recipeId) => mutate({
                variables: { recipeIngredient, recipeId }
            })
        })
    })
)(RecipeIngredients);
