import {gql} from 'apollo-server-express'

export const typeDefs = gql`
    type Query {
        getUsers: [User]!
        getUser(token:String!):User!
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

