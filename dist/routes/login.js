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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const login_service_1 = require("../services/login.service");
const generateTokens_1 = require("../services/generateTokens");
const router = express_1.default.Router();
router.get("/", (Request, Response) => {
    Response.sendFile(path_1.default.join(__dirname, "../static/login.html"));
});
router.get("/denied", (Request, Response) => {
    Response.sendFile(path_1.default.join(__dirname, "../static/denied.html"));
});
router.post("/", (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = Request.body;
    const user = yield (0, login_service_1.login)(username, password);
    if (user) {
        const { accessToken, refreshToken } = (0, generateTokens_1.generateTokens)(user);
        Response.cookie("accessToken", accessToken);
        Response.cookie("refreshToken", refreshToken);
        return Response.redirect("/admin");
    }
    return Response.redirect("/login/denied");
}));
exports.default = router;
