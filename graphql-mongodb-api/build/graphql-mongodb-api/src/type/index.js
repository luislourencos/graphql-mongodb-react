"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = apollo_server_express_1.gql `
    type Query {
        getUsers: [User]!

    }

    type Mutation {
        registerUser(user:UserInput!):User!
        authenticateUser(userAuthenticate:UserAuthenticate!):Token!
    }

    input UserInput {
        id:ID
        name:String!
        email:String!
        password:String!
    }
    input UserAuthenticate {
        email:String!
        password:String!
    }

    type Token {
        token:String!
    }
    type User {
        id:ID!
        name:String!
        email:String!
        password:String
    }
`;
