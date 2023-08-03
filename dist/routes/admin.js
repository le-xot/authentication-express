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
const user_repository_1 = require("../repositories/user.repository");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.get("/", auth_middleware_1.default, (Request, Response) => {
    Response.sendFile(path_1.default.join(__dirname, "../static/admin.html"));
});
router.get("/api/users", auth_middleware_1.default, (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, user_repository_1.getUsers)();
    Response.json(users);
}));
router.get("/exit", (Request, Response) => {
    Response.clearCookie("accessToken");
    Response.redirect("/");
});
router.post("/delete", auth_middleware_1.default, (Request, Response) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, user_repository_1.deleteUsers)();
    Response.redirect("/admin");
}));
exports.default = router;
