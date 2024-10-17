"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
})); // for parsing application/json
app.use(express_1.default.json()); // for parsing application/json
app.use((req, res, next) => {
    console.log("Time:", Date.now());
    next();
});
app.use("/", routes_1.router);
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
