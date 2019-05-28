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
            image
        }
    }
`;

const recipeQuery = gql`
    query RecipeQuery($id: ID!) {
        recipe(id: $id) {
            id
            name
            link
            image
        }
    }
`;

class EditRecipe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: (props.recipe && props.recipe.name) || "",
            link: (props.recipe && props.recipe.link) || "",
            image: (props.recipe && props.recipe.image) || ""
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.loading && !this.props.loading) {
            this.setState({
                name: this.props.recipe.name,
                link: this.props.recipe.link,
                image: this.props.recipe.image
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
        const { name, link, image } = this.state;
        if (this.props.loading) {
            return <h1>Loading...</h1>;
        }
        return (
            <div>
                <h1>Edit Recipe</h1>
                <RecipeForm
                    name={name}
                    link={link}
                    image={image}
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
