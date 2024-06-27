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
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
app.use(express.json()); // for parsing application/json
app.get("/", (req, res) => {
    res.send("Hello World from typescript!");
});
app.post("/user/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    yield prisma.user.create({
        data: {
            id: Math.floor(Math.random() * 1000).toString(),
            name,
            email,
            password,
        },
    });
    res.send("User signed up successfully!");
}));
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
