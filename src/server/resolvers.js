const superagent = require("superagent");
const microServiceUrl = "http://localhost:2222";

function getRecipes() {
    return superagent
    .get(`${microServiceUrl}/recipes`)
    .then(res => res.body)
    .catch(err => {
        global.console.log("Error", err);
        throw err;
    });
}

function createRecipe(_, { recipe }) {
    return superagent
    .post(`${microServiceUrl}/recipes`)
    .send(recipe)
    .then(res => res.body)
    .catch(err => {
        global.console.log("Error", err);
        throw err;
    });
}

function getRecipeById(_, { id }) {
    return superagent
    .get(`${microServiceUrl}/recipes/${id}`)
    .then(res => res.body)
    .catch(err => {
        global.console.log("Error", err);
        throw err;
    });
}

function editRecipe(_, { recipe, id }) {
    return superagent
    .put(`${microServiceUrl}/recipes/${id}`)
    .send(recipe)
    .then(res => res.body)
    .catch(err => {
        global.console.log("Error", err);
        throw err;
    });
}

function getIngredientsByRecipeId(id) {
    return superagent
    .get(`${microServiceUrl}/recipes/${id}/ingredients`)
    .then(res => res.body)
    .catch(err => {
        global.console.log("Error", err);
        throw err;
    });
}

const Recipe = {
    id: ({ id }) => id,
    name: ({ name }) => name,
    image: ({ image }) => image,
    link: ({ link }) => link,
    ingredients: ({ id }) => getIngredientsByRecipeId(id)
};

const RecipeIngredient = {
    id: ({ id }) => id,
    name: ({ name }) => name,
    amount: ({ amount }) => amount,
    unit: ({ unit }) => unit
};

module.exports = {
    RootQuery: {
        recipes: getRecipes,
        recipe: getRecipeById,
        recipeIngredients: getIngredientsByRecipeId
    },
    Mutation: {
        createRecipe,
        editRecipe
    },
    Recipe,
    RecipeIngredient
};