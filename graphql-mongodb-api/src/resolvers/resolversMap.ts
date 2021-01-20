import { IResolvers } from 'graphql-tools';
import {query} from './query';
import {mutation} from './mutation';

export const resolversMap :IResolvers= {
  ...query,
  ...mutation
}
