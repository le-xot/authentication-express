"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const environment = {
    secretTokenAccess: process.env.SECRET_TOKEN_ACCESS,
    secretTokenRefresh: process.env.SECRET_TOKEN_REFRESH,
    devToken: process.env.DEV_TOKEN,
    mongoUri: process.env.MONGO_URI ||
        "mongodb://localhost:27017/authentification-express",
};
exports.default = environment;
