const superagent = require("superagent");
const mapKeys = require("lodash/mapKeys");
const snakeCase = require("lodash/snakeCase");

const microServiceUrl = "http://localhost:2222";

function getTodos() {
    return superagent
    .get(`${microServiceUrl}/todos`)
    .then(res => res.body)
    .catch(err => global.console.log(err));
}

const Todo = {
    id: ({ id }) => id,
    name: ({ name }) => name,
    dueDate: ({ due_date }) => due_date,
    type: ({ type }) => type,
    assignee: ({ assignee }) => assignee,
    completed: ({ completed }) => completed,
    archived: ({ archived }) => archived,
    createdAt: ({ created_at }) => created_at,
    updatedAt: ({ updated_at }) => updated_at
};

module.exports = {
    Todo,
    RootQuery: {
        todos: getTodos
    }
    // Mutation: {

    // }
};