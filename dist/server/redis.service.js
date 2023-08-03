"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const redis_1 = __importDefault(require("redis"));
const client = redis_1.default.createClient();
exports.client = client;
client.on("connect", () => {
    console.log("Connected to Redis");
});
client.on("error", (err) => {
    console.error("Error connecting to Redis", err);
});
