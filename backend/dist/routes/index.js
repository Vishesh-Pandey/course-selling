"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const userRoutes_1 = require("./userRoutes");
const authRoutes_1 = require("./authRoutes");
const instructorRoutes_1 = require("./instructorRoutes");
const router = express_1.default.Router();
exports.router = router;
router.use("/auth", authRoutes_1.authRouter);
router.use("/user", userRoutes_1.userRouter);
router.use("/instructor", instructorRoutes_1.instructorRouter);
