import express from "express";
import { userRouter } from "./userRoutes";
import { instructorRouter } from "./instructorRoutes";


const router = express.Router();

router.use("/user", userRouter);
router.use("/instructor", instructorRouter);
export { router };
