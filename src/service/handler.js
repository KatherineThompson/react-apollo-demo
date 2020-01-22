const knex = require("knex");
const cuid = require("cuid");

const knexConfig = {
    client: "mysql",
    connection: {
        host: "localhost",
        database: "apollo-demo",
        user: "root",
        password: "",
        port: 3307,
        charset: "utf8",
        dateStrings: true
    }
};

const todoFields = [
    "todos.id",
    "todos.name",
    "todos.due_date",
    "todos.type",
    "todos.created_at",
    "todos.updated_at",
    "todos.assignee",
    "todos.completed",
    "todos.archived"
];

function getToDos(req, res, next) {
    return knex(knexConfig)
    .select([...todoFields, "users.name"])
    .from("todos")
    .leftJoin("users", "todos.assignee", "users.id")
    .where({ archived: 0 })
    .then(todos => {
        res.status(200).send(todos);
        return next();
    });
}

function getToDo(id) {
    return knex(knexConfig)
    .select([...todoFields, "users.name"])
    .from("todos")
    .leftJoin("users", "todos.assignee", "users.id")
    .where({ id })
    .first();
}

function getToDoById(req, res, next) {
    return getToDo(req.params.toDoId)
    .then(todo => {
        res.status(200).send(todo);
        return next();
    });
}

function createToDo(req, res, next) {
    const todo = Object.assign({}, req.body);
    const id = cuid();
    todo.id = id;
    return knex(knexConfig)
    .insert(todo)
    .into("todos")
    .then(() => getToDo(id))
    .then(todo => {
        res.status(201).send(todo);
        return next();
    });
}

function updateToDo(req, res, next) {
    const todo = Object.assign({}, req.body);
    return knex(knexConfig)
    .update(todo)
    .where({ id: req.params.todoId })
    .into("todos")
    .then(() => getToDo(req.params.todoId))
    .then(todo => {
        res.status(200).send(todo);
        return next();
    });
}

function deleteToDo(req, res, next) {
    return knex
    .update({ archived: true })
    .where({ id: req.params.todoId })
    .into("todos")
    .then(() => {
        res.status(204);
        return next();
    });
}

const userFields = [
    "users.id",
    "users.name",
    "users.email",
    "users.phone"
];

function getUsers(req, res, next) {
    return knex(knexConfig)
    .select(userFields)
    .from("users")
    .then(users => {
        res.status(200).send(users);
        return next();
    });
}

function getUser(id) {
    return knex(knexConfig)
    .select(userFields)
    .from("users")
    .where({ id })
    .first();
}

function getUserById(req, res, next) {
    return getUser(req.params.userId)
    .then(user => {
        res.status(200).send(user);
        return next();
    });
}

function updateUser(req, res, next) {
    const user = Object.assign({}, req.body);
    return knex
    .update(user)
    .where({ id: req.params.userId })
    .then(() => getUser(req.params.userId))
    .then(user => {
        res.status(200).send(user);
        return next();
    });
}

module.exports = {
    getToDos,
    getToDoById,
    createToDo,
    updateToDo,
    deleteToDo,
    getUsers,
    getUserById,
    updateUser
};
