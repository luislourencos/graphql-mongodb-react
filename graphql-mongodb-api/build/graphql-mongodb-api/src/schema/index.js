"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const resolversMap_1 = require("./../resolvers/resolversMap");
const type_1 = require("../type");
const graphql_tools_1 = require("graphql-tools");
exports.schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: type_1.typeDefs,
    resolvers: resolversMap_1.resolversMap
});
