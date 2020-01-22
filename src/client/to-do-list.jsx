import React, { useEffect, useState } from "react";
import fakeConnect from "./fake-connect";
const microServiceUrl = "https://localhost:2222";

function ToDoItem({ todo }) {
    return (
        <div>
            <div>{todo.name}</div>
            <button>
                Delete
            </button>
        </div>
    );
}

function ToDoList({ todos }) {
    if (!todos) {
        return <div>Loading...</div>;
    }
    if (!todos.length) {
        return <div>No To Dos</div>;
    }
    return (
        <div>
            <h1>To Do:</h1>
            {todos.map(todo => (
                <ToDoItem
                    key={todo.id}
                    todo={todo}
                />
            ))}
            <div className="button-container">
                <button className="button">Add To Do</button>
            </div>
        </div>
    );
}

export default fakeConnect(ToDoList);
