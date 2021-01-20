"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolversMap = void 0;
const query_1 = require("./query");
const mutation_1 = require("./mutation");
exports.resolversMap = Object.assign(Object.assign({}, query_1.query), mutation_1.mutation);
