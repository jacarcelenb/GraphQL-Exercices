const sequelize = require("../config/cnn");
const { ApolloServer } = require("apollo-server");
const { mergeResolvers, mergeTypes } = require("merge-graphql-schemas");
const { getUserFromToken } = require("../services/auth.service");
const path = require('path');
const { loadFilesSync } = require('@graphql-tools/load-files');

// Conexión a la BDD
sequelize.authenticate().then(() => {
  console.log("Estas conectado a la BD");
});

const typeDefs = mergeTypes(loadFilesSync(path.join(__dirname, '../type-system/*.graphql')));
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, '../controllers')));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    const { userId } = getUserFromToken(token);
    return { userId };
  },
});

server.listen(5000).then(({ url }) => {
  console.log(`🚀 Run server in the URL: ${url}`);
});
