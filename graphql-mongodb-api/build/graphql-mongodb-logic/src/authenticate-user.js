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
exports.authenticateUser = void 0;
const graphql_mongodb_commons_1 = require("graphql-mongodb-commons");
const graphql_mongodb_data_1 = require("graphql-mongodb-data");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const { User } = graphql_mongodb_data_1.models;
const { String, Email } = graphql_mongodb_commons_1.utils;
const { UnexistenceError, CredentialsError } = graphql_mongodb_commons_1.errors;
const authenticateUser = ({ email, password }) => {
    String.notVoid(email);
    String.notVoid(password);
    String.validatePassword(password);
    Email.validate(email);
    return (() => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User.findOne({ email });
        if (!user)
            throw new UnexistenceError(`This email: ${email} is not register!`);
        const match = yield bcryptjs_1.default.compare(password, user.password);
        if (!match)
            throw new CredentialsError(`Wrong password!`);
        return user.id;
    }))();
};
exports.authenticateUser = authenticateUser;
