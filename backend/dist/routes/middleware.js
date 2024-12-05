"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyUser = (req, res, next) => {
    console.log("Varifying request... insdie varifyUser middleware");
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(token, "secret_signature", (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }
        req.id = user.id;
        console.log("User varified and calling next middleware");
        next();
    });
    console.log("End of varify middleware");
};
exports.verifyUser = verifyUser;
