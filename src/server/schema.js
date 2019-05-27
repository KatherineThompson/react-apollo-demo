const { gql } = require("apollo-server-express");

const recipe = gql`
    type Recipe {
        id: ID
        name: String
        image: String
    }
`;

const rootQuery = gql`
    type RootQuery {
        recipes: [Recipe]
    }
`;

const schema = gql`
    schema {
        query: RootQuery
    }
`;

module.exports = [schema, rootQuery, recipe];
