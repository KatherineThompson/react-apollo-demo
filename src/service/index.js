const express = require("express");
const pkg = require("../../package.json");
const bodyParser = require("body-parser");

const {
    getRecipes,
    createRecipe,
    getRecipeById,
    updateRecipe,
    getIngredientByRecipeId,
    addIngredientType,
    getAllIngredients,
    addRecipeIngredient,
    getUnits
} = require("./handler");

const app = express();

app.use(bodyParser.json({ limit: "16mb" }));

app.get("/health-check", function(req, res) {
    res.status(200).send({ version: pkg.version, name: pkg.name });
});

app.get("/recipes", getRecipes);
app.get("/recipes/:recipeId", getRecipeById);
app.get("/recipes/:recipeId/ingredients", getIngredientByRecipeId);
app.post("/recipes/:recipeId/ingredients", addRecipeIngredient);
app.put("/recipes/:recipeId", updateRecipe);
app.post("/recipes", createRecipe);
app.post("/ingredients", addIngredientType);
app.get("/ingredients", getAllIngredients);
app.get("/units", getUnits);

app.listen(2222, () => global.console.log("Micro service ready at http://localhost:2222"));
