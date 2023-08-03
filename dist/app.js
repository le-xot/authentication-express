"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_1 = __importDefault(require("./routes/index"));
const admin_1 = __importDefault(require("./routes/admin"));
const login_1 = __importDefault(require("./routes/login"));
const register_1 = __importDefault(require("./routes/register"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use("/", index_1.default);
app.use("/admin", admin_1.default);
app.use("/login", login_1.default);
app.use("/register", register_1.default);
exports.default = app;
