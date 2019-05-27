import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BrowserRouter, Route } from "react-router-dom";

import RecipeList from "./recipe-list";
import "./app.less";

const client = new ApolloClient({
    link: createHttpLink({ uri: "/graphql" }),
    cache: new InMemoryCache()
});

const App = () => (
    <ApolloProvider client={client}>
        <BrowserRouter>
            <Route path="/" component={RecipeList} />

        </BrowserRouter>
    </ApolloProvider>
);

export default App;
