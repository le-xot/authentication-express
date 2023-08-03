"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_service_1 = require("../server/redis.service");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function generateTokens(User) {
    const secretTokenAccess = process.env.SECRET_TOKEN_ACCESS || "";
    const secretTokenRefresh = process.env.SECRET_TOKEN_REFRESH || "";
    const accessToken = jsonwebtoken_1.default.sign({ User }, secretTokenAccess, {
        expiresIn: "15m",
    });
    const refreshToken = jsonwebtoken_1.default.sign({ User }, secretTokenRefresh, {
        expiresIn: "7d",
    });
    redis_service_1.client.set(refreshToken, User.username, "EX", 7 * 24 * 60 * 60);
    return { accessToken, refreshToken };
}
exports.generateTokens = generateTokens;
