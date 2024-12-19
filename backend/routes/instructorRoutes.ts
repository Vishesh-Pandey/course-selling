import express from "express";
import { PrismaClient } from "@prisma/client";
import { verifyUser } from "../middleware/authMiddleware";
import {
  createCourse,
  createLesson,
  deleteLesson,
  yourCourses,
} from "../controllers/instructorController";

export const prisma = new PrismaClient();

export const router = express.Router();

router.get("/", async (req, res) => {
  res.json({
    msg: "working",
  });
});

router.get("/your-courses", verifyUser, yourCourses);
router.post("/createCourse", verifyUser, createCourse);
router.post("/createLesson", verifyUser, createLesson);
router.delete("/deletelesson", verifyUser, deleteLesson);

router.get("/courses", async (req: any, res) => {
  const courses = await prisma.course.findMany({
    where: {
      id: req.id,
    },
  });
  return res.send(courses);
});

router.get("/lessons", async (req: any, res) => {
  console.log("course id is : ", req.query.id);

  try {
    const lessons = await prisma.lesson.findMany({
      where: {
        courseId: req.id,
      },
    });

    return res.send(lessons);
  } catch (error) {
    return res.send({
      msg: "Something went wrong",
    });
  }
});

export { router as instructorRouter };
