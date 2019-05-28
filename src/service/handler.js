const knex = require("knex");
const kebabCase = require("lodash/kebabCase");

const knexConfig = {
    client: "mysql",
    connection: {
        host: "localhost",
        database: "react-apollo-demo",
        user: "root",
        password: "",
        port: 3307,
        charset: "utf8",
        dateStrings: true
    }
};
const recipeFields = [
    "recipes.id",
    "recipes.name",
    "recipes.link",
    "recipes.image"
];

function getRecipes(req, res, next) {
    return knex(knexConfig)
    .select(recipeFields)
    .from("recipes")
    .leftJoin("recipes_ingredients", "recipes.id", "recipes_ingredients.recipe_id")
    .modify(query => {
        if (req.query.page) {
            const page = req.query.page - 1;
            const offset = page > 0 ? page * 2 : 0;
            query.offset(offset);
            query.limit(2);
        }
        if (req.query.ingredient) {
            query.where({ "recipes_ingredients.ingredient_id": req.query.ingredient });
        }
    })
    .groupBy("recipes.id")
    .then(recipes => {
        let responseBody = recipes;
        if (req.query.page) {
            responseBody = {
                recipes,
                pagination: {
                    page: req.query.page,
                    numResults: 2
                }
            };
        }
        res.status(200).send(responseBody);
        return next();
    });
}

function createRecipe(req, res, next) {
    const recipe = Object.assign({}, req.body);
    recipe.id = kebabCase(recipe.name.toLowerCase());
    return knex(knexConfig)
    .insert(recipe)
    .into("recipes")
    .then(() => {
        res.status(201).send(recipe);
        return next();
    });
}

function getRecipeById(req, res, next) {
    return knex(knexConfig)
    .select()
    .where({ id: req.params.recipeId })
    .from("recipes")
    .first()
    .then(recipe => {
        if (!recipe) {
            res.status(404);
            return next(new Error("Not found"));
        }
        res.status(202).send(recipe);
        return next();
    });
}

function updateRecipe(req, res, next) {
    if (req.body.name === "error") {
        res.status(500);
        return next(new Error("Oops"));
    }
    const recipe = Object.assign({}, req.body);
    return knex(knexConfig)
    .update(recipe)
    .where({ id: req.params.recipeId })
    .into("recipes")
    .then(() => {
        res.status(200).send(Object.assign({ id: req.params.recipeId }, recipe));
        return next();
    });
}

const fields = [
    "ingredients.id",
    "ingredients.name",
    "recipes_ingredients.amount",
    "units.unit"
];

function getIngredientByRecipeId(req, res, next) {
    return knex(knexConfig)
    .select(fields)
    .leftJoin("ingredients", "recipes_ingredients.ingredient_id", "ingredients.id")
    .leftJoin("units", "recipes_ingredients.unit_id", "units.id")
    .where({ "recipes_ingredients.recipe_id": req.params.recipeId })
    .from("recipes_ingredients")
    .groupBy("ingredients.id")
    .then(recipe => {
        if (!recipe) {
            res.status(404);
            return next(new Error("Not found"));
        }
        res.status(202).send(recipe);
        return next();
    });
}

function getAllIngredients(req, res, next) {
    return knex(knexConfig)
    .select()
    .from("ingredients")
    .then(ingredients => {
        res.status(200).send(ingredients);
        return next();
    });
}

function addIngredientType(req, res, next) {
    const ingredient = Object.assign({}, req.body);
    ingredient.id = kebabCase(ingredient.name.toLowerCase());
    return knex(knexConfig)
    .insert(ingredient)
    .into("ingredients")
    .then(() => {
        res.status(201).send(ingredient);
        return next();
    });
}

function addRecipeIngredient(req, res, next) {
    return knex(knexConfig)
    .insert(req.body)
    .into("recipes_ingredients")
    .then(() => (
        knex(knexConfig)
        .select(fields)
        .leftJoin("ingredients", "recipes_ingredients.ingredient_id", "ingredients.id")
        .leftJoin("units", "recipes_ingredients.unit_id", "units.id")
        .where({ "recipes_ingredients.recipe_id": req.params.recipeId })
        .from("recipes_ingredients")
        .groupBy("ingredients.id")
    ))
    .then(ingredient => {
        res.status(201).send(ingredient);
        return next();
    });
}

function getUnits(req, res, next) {
    return knex(knexConfig)
    .select()
    .from("units")
    .then(units => {
        res.status(200).send(units);
        return next();
    });
}


module.exports = {
    getRecipes,
    createRecipe,
    getRecipeById,
    updateRecipe,
    getIngredientByRecipeId,
    getAllIngredients,
    addIngredientType,
    addRecipeIngredient,
    getUnits
};
