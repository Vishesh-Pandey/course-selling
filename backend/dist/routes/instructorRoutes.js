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
exports.instructorRouter = exports.router = exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const authMiddleware_1 = require("../middleware/authMiddleware");
const instructorController_1 = require("../controllers/instructorController");
exports.prisma = new client_1.PrismaClient();
exports.router = express_1.default.Router();
exports.instructorRouter = exports.router;
exports.router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        msg: "working",
    });
}));
exports.router.get("/your-courses", authMiddleware_1.verifyUser, instructorController_1.yourCourses);
exports.router.post("/createCourse", authMiddleware_1.verifyUser, instructorController_1.createCourse);
exports.router.post("/createLesson", authMiddleware_1.verifyUser, instructorController_1.createLesson);
exports.router.delete("/deletelesson", authMiddleware_1.verifyUser, instructorController_1.deleteLesson);
exports.router.get("/courses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield exports.prisma.course.findMany({
        where: {
            id: req.id,
        },
    });
    return res.send(courses);
}));
exports.router.get("/lessons", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("course id is : ", req.query.id);
    try {
        const lessons = yield exports.prisma.lesson.findMany({
            where: {
                courseId: req.id,
            },
        });
        return res.send(lessons);
    }
    catch (error) {
        return res.send({
            msg: "Something went wrong",
        });
    }
}));
