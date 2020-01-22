const { gql } = require("apollo-server-express");

const Todo = gql`
    type Todo {
        id: ID
        name: String
        dueDate: String
        type: String
        createdAt: Int
        updatedAt: Int
        assignee: String
        completed: Boolean
        archived: Boolean
    }
`;

// const mutations = gql`
//     type Mutation {

//     }
// `;

const rootQuery = gql`
    type RootQuery {
        todos: [Todo]
    }
`;

const schema = gql`
    schema {
        query: RootQuery
        # mutation: Mutation
    }
`;

module.exports = [
    schema,
    // mutations,
    rootQuery,
    Todo
];
