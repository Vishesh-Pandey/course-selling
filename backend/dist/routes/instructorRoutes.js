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
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
exports.instructorRouter = router;
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    // hash the password
    const salt = yield bcrypt_1.default.genSalt(12);
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    yield prisma.instructor.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword,
        },
    });
    // create token
    const token = jsonwebtoken_1.default.sign(email, "secretkey");
    return res.send({
        message: "User created successfully",
        token: token,
    });
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // check if user exists
    const user = yield prisma.user.findUnique({
        where: {
            email: email,
        },
    });
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
    const token = jsonwebtoken_1.default.sign(email, "secret_signature");
    return res.send({
        message: "Login successful",
        token: token,
    });
}));
router.post("/createCourse", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, instructorId } = req.body;
    console.log('title', title);
    console.log('description', description);
    console.log('instructorId', instructorId);
    try {
        yield prisma.course.create({
            data: {
                title: title,
                description: description,
                instructorId: instructorId,
            }
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
