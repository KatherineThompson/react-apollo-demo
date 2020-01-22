import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ToDoList from "./to-do-list";

import "./app.less";

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={ToDoList} />
        </Switch>
    </BrowserRouter>
);

export default App;
