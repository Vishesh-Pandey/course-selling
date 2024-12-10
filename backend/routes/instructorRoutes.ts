import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { verifyUser } from "./middleware";
import { verify } from "crypto";

const prisma = new PrismaClient();

const router = express.Router();

router.get("/", async (req, res) => {
  res.json({
    msg: "working",
  });
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.instructor.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    // fetch user id from the database

    const user = await prisma.instructor.findUnique({
      where: {
        email: email,
      },
    });

    // create token

    if (user !== null) {
      const token = jwt.sign({ email, id: user.id }, "secret_signature");
      return res.send({
        message: "User created successfully",
        token: token,
      });
    } else {
      return res.status(500).send({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return res.json({
      msg: "Something went wrong",
      error: error,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Given email and password :", { email, password });
    // check if user exists
    const user = await prisma.instructor.findUnique({
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

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).send({
        message: "Invalid email or password",
      });
    }

    // create token
    if (user !== null) {
      const token = jwt.sign({ email: email, id: user.id }, "secret_signature");

      return res.send({
        message: "Login successful",
        token: token,
      });
    } else {
      return res.send({
        msg: "something went wrong ",
        error: "user does not exist",
      });
    }
  } catch (error) {
    return res.send({
      message: "Something went wrong",
      error: error,
    });
  }
});

router.post("/createCourse", verifyUser, async (req: any, res) => {
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
});

router.get("/courses", async (req: any, res) => {
  const courses = await prisma.course.findMany({
    where: {
      id: req.id,
    },
  });
  return res.send(courses);
});

router.get("/your-courses", verifyUser, async (req: any, res) => {
  console.log("instructor id is : ", req.id);
  const courses = await prisma.course.findMany({
    where: {
      instructorId: req.id,
    },
  });
  return res.send(courses);
});

router.post("/createLesson", verifyUser, async (req: any, res) => {
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

router.delete("/deletelesson", verifyUser, async (req: any, res) => {
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
});

export { router as instructorRouter };
