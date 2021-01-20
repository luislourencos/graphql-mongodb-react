"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutation = void 0;
const graphql_mongodb_logic_1 = require("graphql-mongodb-logic");
const graphql_mongodb_logic_2 = require("graphql-mongodb-logic");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const jwt = jsonwebtoken_1.default;
const SECRET = process.env.SECRET;
exports.mutation = {
    Mutation: {
        registerUser(_, { user }) {
            return __awaiter(this, void 0, void 0, function* () {
                return graphql_mongodb_logic_2.registerUser(user);
            });
        },
        authenticateUser(_, { userAuthenticate }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const result = yield graphql_mongodb_logic_1.authenticateUser(userAuthenticate);
                    const token = jwt.sign({ id: result }, SECRET || 'secret', { expiresIn: '1m' });
                    return {
                        token
                    };
                }
                catch (error) {
                    throw new Error(error.message);
                }
            });
        }
    }
};
