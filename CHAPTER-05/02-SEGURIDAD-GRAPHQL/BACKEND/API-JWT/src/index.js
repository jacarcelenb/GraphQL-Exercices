const { ApolloServer } = require("apollo-server");
const { fileLoader, mergeTypes } = require("merge-graphql-schemas");
const jwt = require("jsonwebtoken");
const typeDefs = mergeTypes(fileLoader("./type-system/schema.graphql"));
const resolvers = require("../controllers/todo.controller");
require("dotenv").config();

const getUserFromToken = (token) => {

    if (token) {
      return jwt.verify(token, process.env.JWTSECRET);
    }
    return "";

};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || ""
    const { userId } = getUserFromToken(token);
    return { userId } ;
  },
});

server.listen(4000).then(({ url }) => {
  console.log(`🚀 Run server in the URL: ${url}`);
});
