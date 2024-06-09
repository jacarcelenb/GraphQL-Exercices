const sequelize = require("../config/cnn")
const {ApolloServer} = require("apollo-server")
const {fileLoader, mergeTypes} = require("merge-graphql-schemas")

// Conexión a la BDD
sequelize.authenticate().then(() =>{
  console.log("Estas conectado a la BD")
});;

// Sincronización de los modelos con la BDD
//sequelize.sync()

const typeDefs = mergeTypes(fileLoader('./type-system/schema.graphql'))
const resolvers = require("../controllers/pizza.controller")

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen(5000).then(({ url }) => {
    console.log(`🚀 Run server in the URL: ${url}`);
});

