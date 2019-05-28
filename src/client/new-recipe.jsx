import React from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import RecipeForm from "./recipe-form";
import { recipeListQuery } from "./recipe-list";

const createRecipe = gql`
    mutation CreateRecipe($recipe: RecipeInput!) {
        createRecipe(recipe: $recipe) {
            id
            name
            image
        }
    }
`;

class NewRecipe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            link: "",
            image: ""
        };
    }

    handleChange = (field, value) => {
        this.setState({ [field]: value });
    }

    save = () => {
        this.props.createRecipe(this.state)
        .then(() => this.props.history.push("/recipes"));
    }

    render() {
        const { name, link, image } = this.state;
        return (
            <div>
                <h1>Add Recipe</h1>
                <RecipeForm
                    name={name}
                    link={link}
                    image={image}
                    onChange={this.handleChange}
                />
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

export default graphql(createRecipe, {
    props: ({ mutate }) => ({
        createRecipe: recipe => mutate({
            variables: { recipe }
        })
    })
})(NewRecipe);
