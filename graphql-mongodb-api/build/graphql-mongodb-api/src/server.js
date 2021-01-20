"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = require("./schema");
require("dotenv/config");
const graphql_mongodb_data_1 = require("graphql-mongodb-data");
const { env: { PORT = 5000, MONGODB_URL = '' } } = process;
const app = express_1.default();
const server = new apollo_server_express_1.ApolloServer({
    schema: schema_1.schema,
    introspection: true
});
console.info('Conecting with database...');
graphql_mongodb_data_1.mongoose.connect(MONGODB_URL)
    .then(() => {
    console.info('Conected with data base!!!');
    app.use(cors_1.default());
    server.applyMiddleware({ app });
    app.listen(PORT, () => {
        console.log(`Server conected!! at port http://localhost${PORT}${server.graphqlPath}`);
    });
})
    .catch((error) => {
    console.error('Problem connecting with dataBase!', error.message);
});
