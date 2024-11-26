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
exports.instructorRouter = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const middleware_1 = require("./middleware");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
exports.instructorRouter = router;
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        msg: "working",
    });
}));
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(12);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        yield prisma.instructor.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword,
            },
        });
        // fetch user id from the database
        const user = yield prisma.instructor.findUnique({
            where: {
                email: email,
            },
        });
        // create token
        if (user !== null) {
            const token = jsonwebtoken_1.default.sign({ email, id: user.id }, "secret_signature");
            return res.send({
                message: "User created successfully",
                token: token,
            });
        }
        else {
            return res.status(500).send({
                message: "Something went wrong",
            });
        }
    }
    catch (error) {
        return res.json({
            msg: "Something went wrong",
            error: error,
        });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log("Given email and password :", { email, password });
        // check if user exists
        const user = yield prisma.instructor.findUnique({
            where: {
                email: email,
            },
        });
        console.log("User detected : ", user);
        if (!user) {
            return res.status(400).send({
                message: "Invalid email or password",
            });
        }
        // check if password is correct
        const validPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send({
                message: "Invalid email or password",
            });
        }
        // create token
        if (user !== null) {
            const token = jsonwebtoken_1.default.sign({ email: email, id: user.id }, "secret_signature");
            return res.send({
                message: "Login successful",
                token: token,
            });
        }
        else {
            return res.send({
                msg: "something went wrong ",
                error: "user does not exist",
            });
        }
    }
    catch (error) {
        return res.send({
            message: "Something went wrong",
            error: error,
        });
    }
}));
router.post("/createCourse", middleware_1.verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // verifyUser(req, res, () => {
    //   console.log("User varified");
    // });
    const { title, description } = req.body;
    console.log("title", title);
    console.log("description", description);
    console.log("instructor id is : ", req.id);
    try {
        yield prisma.course.create({
            data: {
                title: title,
                description: description,
                instructorId: req.id
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
router.get("/courses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield prisma.course.findMany({
        where: {
            id: req.id,
        },
    });
    return res.send(courses);
}));
router.get("/your-courses", middleware_1.verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("instructor id is : ", req.id);
    const courses = yield prisma.course.findMany({
        where: {
            instructorId: req.id,
        },
    });
    return res.send(courses);
}));
