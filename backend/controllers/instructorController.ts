import express from "express";
import { PrismaClient } from "@prisma/client";

// import { verifyUser } from "./middleware";

type RequestWithId = express.Request & {
  id: string;
};

const prisma = new PrismaClient();

export const createCourse = async (req: any, res: express.Response) => {
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
    await prisma.course.create({
      data: {
        title: title,
        description: description,
        instructorId: req.id,
      },
    });
    return res.send({
      message: "Course created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.send({
      message: "Internal server error",
    });
  }

  // check if password is correct
};

export const createLesson = async (req: any, res: any) => {
  console.log("Request to create course rec");
  console.log("Request body is : ", req.body);

  const { title, description, courseId, content } = req.body;

  try {
    // verify if course belongs to same instructor who is making the request

    const course = await prisma.course.findUnique({
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

    await prisma.lesson.create({
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
  } catch (error) {
    console.log(error);
    return res.send({
      message: "Internal server error",
    });
  }
};

export const deleteLesson = async (req: any, res: any) => {
  const { lessonId, courseId } = req.query;
  console.log("id is : ", lessonId, courseId);
  try {
    const courseRow = await prisma.course.findUnique({
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

    await prisma.lesson.delete({
      where: {
        id: lessonId,
        courseId: courseId,
      },
    });

    return res.send({
      message: "Lesson deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.send({
      message: "Internal server error",
    });
  }
};

export const yourCourses = async (req: any, res: any) => {
  console.log("instructor id is : ", req.id);
  const courses = await prisma.course.findMany({
    where: {
      instructorId: req.id,
    },
  });
  return res.send(courses);
};
