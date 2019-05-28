import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import RecipeList from "./recipe-list";
import NewRecipe from "./new-recipe";
import ViewRecipe from "./view-recipe";
import EditRecipe from "./edit-recipe";
import CreateIngredient from "./create-ingredient";

import "./app.less";


const App = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/recipes/new" component={NewRecipe} />
            <Route
                path="/recipes/view/:recipeId"
                render={props => (
                    <ViewRecipe
                        {...props}
                        id={props.match.params.recipeId}
                    />
                )}
            />
            <Route
                path="/recipes/edit/:recipeId"
                render={props => (
                    <EditRecipe
                        {...props}
                        id={props.match.params.recipeId}
                    />
                )}
            />
            <Route path="/recipes" component={RecipeList} />
            <Route path="/ingredients/new" component={CreateIngredient} />
        </Switch>
    </BrowserRouter>
);

export default App;
