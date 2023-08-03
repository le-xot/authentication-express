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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_service_1 = require("../server/redis.service");
const generateTokens_1 = require("../services/generateTokens");
const user_repository_1 = require("../repositories/user.repository");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function authMiddleware(Request, Response, NextFunction) {
    return __awaiter(this, void 0, void 0, function* () {
        const accessToken = Request.cookies.accessToken;
        const refreshToken = Request.cookies.refreshToken;
        const secretTokenAccess = process.env.SECRET_TOKEN_ACCESS || "";
        if (accessToken &&
            secretTokenAccess &&
            jsonwebtoken_1.default.verify(accessToken, secretTokenAccess)) {
            return NextFunction();
        }
        else if (accessToken === undefined && refreshToken) {
            const username = yield redis_service_1.client.get(refreshToken);
            if (username) {
                const user = yield user_repository_1.User.findOne({ username: username });
                if (user) {
                    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = (0, generateTokens_1.generateTokens)(user);
                    Response.clearCookie("accessToken");
                    Response.clearCookie("refreshToken");
                    Response.cookie("accessToken", newAccessToken);
                    Response.cookie("refreshToken", newRefreshToken);
                    return NextFunction();
                }
            }
        }
        return Response.redirect("/login");
    });
}
exports.default = authMiddleware;
