const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
// const { ApolloServer } = require("apollo-server-express");
// const typeDefs = require("./schema");
// const resolvers = require("./resolvers");

const app = express();

app.use(bodyParser.json({ limit: "16mb" }));

// const server = new ApolloServer({ typeDefs, resolvers });

// server.applyMiddleware({ app });

app.get("/*", function(req, res) {
    res.status(200).sendFile(path.join(__dirname, "../../dist/index.html"));
});

app.listen(2020, () => global.console.log("Server ready at http://localhost:2020"));
