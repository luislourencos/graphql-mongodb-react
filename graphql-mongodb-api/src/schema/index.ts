import { resolversMap } from './../resolvers/resolversMap';
import { typeDefs} from '../type';
import { GraphQLSchema } from 'graphql';
import {makeExecutableSchema} from 'graphql-tools'

export const schema: GraphQLSchema =makeExecutableSchema({
    typeDefs,
    resolvers:resolversMap
})