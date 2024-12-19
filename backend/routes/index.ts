import express from "express";
import { userRouter } from "./userRoutes";
import { authRouter } from "./authRoutes";
import { instructorRouter } from "./instructorRoutes";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/instructor", instructorRouter);
export { router };
