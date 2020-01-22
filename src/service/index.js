const express = require("express");
const pkg = require("../../package.json");
const bodyParser = require("body-parser");

const {
    getToDos,
    getToDoById,
    createToDo,
    updateToDo,
    deleteToDo,
    getUsers,
    getUserById,
    updateUser
} = require("./handler");

const app = express();

app.use(bodyParser.json({ limit: "16mb" }));

app.get("/health-check", function(req, res) {
    res.status(200).send({ version: pkg.version, name: pkg.name });
});

app.get("/todos", getToDos);
app.get("/todos/:todoId", getToDoById);
app.post("/todos", createToDo);
app.put("/todos/:todoId", updateToDo);
app.delete("/todos/:todoId", deleteToDo);
app.get("/users", getUsers);
app.get("/users/:userId", getUserById);
app.put("/users/userId", updateUser);

app.listen(2222, () => global.console.log("Micro service ready at http://localhost:2222"));
