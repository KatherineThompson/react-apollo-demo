import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import App from "./app";

const client = new ApolloClient({
    link: createHttpLink({ uri: "/graphql" }),
    cache: new InMemoryCache({
        dataIdFromObject: object => object.id || null
    })
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById("app-root"),
);
