import React from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const createIngredient = gql`
    mutation CreateIngredient($ingredient: IngredientInput!) {
        createIngredient(ingredient: $ingredient) {
            id
            name
        }
    }
`;

class CreateIngredient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };
    }

    save = () => {
        this.props.createIngredient(this.state);
    }

    render() {
        return (
            <div>
                <h1>Add Ingredient</h1>
                <form>
                    <div className="form-row">
                        <input
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })}
                        />
                    </div>
                </form>
                <div className="recipe-form__footer">
                    <Link to="/recipes" className="button">Cancel</Link>
                    <button
                        className="button"
                        onClick={this.save}
                    >
                        Save
                    </button>
                </div>
            </div>
        );
    }
}

export default graphql(createIngredient, {
    props: ({ mutate }) => ({
        createIngredient: ingredient => mutate({
            variables: { ingredient }
        })
    })
})(CreateIngredient);
