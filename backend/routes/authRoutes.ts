import { login, signup } from "../controllers/authController";
import { Router } from "express";

export const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
