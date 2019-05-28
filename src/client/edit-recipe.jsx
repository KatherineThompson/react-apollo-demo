import React from "react";
import { Link } from "react-router-dom";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

import RecipeForm from "./recipe-form";

const editRecipe = gql`
    mutation EditRecipe($recipe: RecipeInput!, $id: ID!) {
        editRecipe(recipe: $recipe, id: $id) {
            id
            name
        }
    }
`;

const recipeQuery = gql`
    query RecipeQuery($id: ID!) {
        recipe(id: $id) {
            id
            name
            link
        }
    }
`;

class EditRecipe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.recipe.name || "",
            link: props.recipe.link || ""
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.loading && !this.props.loading) {
            this.setState({
                name: this.props.recipe.name,
                link: this.props.recipe.link
            });
        }
    }

    handleChange = (field, value) => {
        this.setState({ [field]: value });
    }

    save = () => {
        this.props.editRecipe(this.state, this.props.id)
        .then(() => this.props.history.push(`/recipes/view/${this.props.id}`));
    }

    render() {
        const { name, link } = this.state;
        return (
            <div>
                <h1>Edit Recipe</h1>
                <RecipeForm
                    name={name}
                    link={link}
                    onChange={this.handleChange}
                />
                <div className="recipe-form__footer">
                    <Link to={`/recipes/view/${this.props.id}`} className="button">Cancel</Link>
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

export default compose(
    graphql(recipeQuery, {
        props: ({ data }) => data,
        options: ({ id }) => ({
            variables: { id }
        })
    }),
    graphql(editRecipe, {
        props: ({ mutate }) => ({
            editRecipe: (recipe, id) => mutate({
                variables: { recipe, id }
            })
        })
    })
)(EditRecipe);
