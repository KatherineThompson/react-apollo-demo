const superagent = require("superagent");
const microServiceUrl = "http://localhost:2222";

function getRecipes() {
    return superagent
    .get(`${microServiceUrl}/recipes`)
    .then(res => res.body)
    .catch(err => global.console.log("Error", err));
}

const Recipe = {
    id: ({ id }) => id,
    name: ({ name }) => name,
    image: ({ image }) => image
};

module.exports = {
    RootQuery: {
        recipes: getRecipes
    },
    Recipe
};