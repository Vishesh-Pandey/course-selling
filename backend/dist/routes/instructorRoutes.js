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
exports.router.post("/signup", instructorController_1.signup);
exports.router.post("/login", instructorController_1.login);
exports.router.post("/createCourse", authMiddleware_1.verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // verifyUser(req, res, () => {
    //   console.log("User varified");
    // });
    console.log("Request to create course rec");
    console.log("Request body is : ", req.body);
    const { title, description } = req.body;
    console.log("title", title);
    console.log("description", description);
    console.log("instructor id is : ", req.id);
    try {
        yield exports.prisma.course.create({
            data: {
                title: title,
                description: description,
                instructorId: req.id,
            },
        });
        return res.send({
            message: "Course created successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.send({
            message: "Internal server error",
        });
    }
    // check if password is correct
}));
exports.router.get("/courses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield exports.prisma.course.findMany({
        where: {
            id: req.id,
        },
    });
    return res.send(courses);
}));
exports.router.get("/your-courses", authMiddleware_1.verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("instructor id is : ", req.id);
    const courses = yield exports.prisma.course.findMany({
        where: {
            instructorId: req.id,
        },
    });
    return res.send(courses);
}));
exports.router.post("/createLesson", authMiddleware_1.verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Request to create course rec");
    console.log("Request body is : ", req.body);
    const { title, description, courseId, content } = req.body;
    try {
        // verify if course belongs to same instructor who is making the request
        const course = yield exports.prisma.course.findUnique({
            where: {
                id: courseId,
            },
        });
        if (course !== null) {
            if (course.instructorId !== req.id) {
                return res.send({
                    message: "You are not authorized to create a lesson for this course",
                });
            }
        }
        yield exports.prisma.lesson.create({
            data: {
                title: title,
                description: description,
                courseId: courseId,
                content: content,
            },
        });
        return res.send({
            message: "Lesson created successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.send({
            message: "Internal server error",
        });
    }
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
exports.router.delete("/deletelesson", authMiddleware_1.verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lessonId, courseId } = req.query;
    console.log("id is : ", lessonId, courseId);
    try {
        const courseRow = yield exports.prisma.course.findUnique({
            where: {
                id: courseId,
            },
        });
        if (courseRow !== null) {
            if (courseRow.instructorId !== req.id) {
                return res.send({
                    message: "You are not authorized to delete this lesson",
                });
            }
        }
        yield exports.prisma.lesson.delete({
            where: {
                id: lessonId,
                courseId: courseId,
            },
        });
        return res.send({
            message: "Lesson deleted successfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.send({
            message: "Internal server error",
        });
    }
}));
