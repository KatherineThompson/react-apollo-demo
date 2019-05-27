const knex = require("knex");

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

function getRecipes(req, res, next) {
    return knex(knexConfig)
    .select()
    .from("recipes")
    .then(recipes => {
        res.status(200).send(recipes);
        return next();
    });
}

module.exports = {
    getRecipes
};
