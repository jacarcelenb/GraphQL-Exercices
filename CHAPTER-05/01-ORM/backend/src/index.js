import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { sequelize } from '../config/cnn.js';
import path from "path";
import { fileURLToPath } from "url";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar y combinar los schemas
const allSchemas = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, "../schemas/**/*.graphql"))
);

// Cargar y combinar resolvers
const allResolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "../resolvers/**/*.js"))
);

// Configuración del servidor Apollo
const server = new ApolloServer({
  typeDefs: allSchemas,
  resolvers:allResolvers
});

// Conexión hacia la base de datos con Sequelize
sequelize.authenticate().then(() => {
  console.log('Connected to PostgreSQL..');
  return startStandaloneServer(server, {
    listen: { port: 4000 }
  });
}).then(({ url }) => {
  console.log(`🚀 Server ready at: ${url}`);
}).catch((error) => {
  console.error('Error connecting to the database:', error);
});
