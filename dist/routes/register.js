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
const register_service_1 = require("../services/register.service");
const generateTokens_1 = require("../services/generateTokens");
const router = express_1.default.Router();
router.get("/", (Request, Response) => {
    Response.sendFile(path_1.default.join(__dirname, "../static/register.html"));
});
router.get("/warning", (Request, Response) => {
    Response.sendFile(path_1.default.join(__dirname, "../static/warning.html"));
});
router.post("/", (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = Request.body;
    const newUser = yield (0, register_service_1.register)(username, password);
    if (newUser) {
        const { refreshToken } = (0, generateTokens_1.generateTokens)(newUser);
        Response.cookie("refreshToken", refreshToken);
        return Response.redirect("/login");
    }
    return Response.redirect("/register/warning");
}));
exports.default = router;
