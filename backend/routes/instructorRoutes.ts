import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const router = express.Router();

router.get("/", async (req, res) => {
  res.json({
    msg: "working",
  });
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  // hash the password

  const salt = await bcrypt.genSalt(12);

  const hashedPassword = await bcrypt.hash(password, salt);

  await prisma.instructor.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });

  // create token

  const token = jwt.sign(email, "secretkey");

  return res.send({
    message: "User created successfully",
    token: token,
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // check if user exists
  const user = await prisma.user.findUnique({
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

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).send({
      message: "Invalid email or password",
    });
  }

  // create token

  const token = jwt.sign(email, "secret_signature");

  return res.send({
    message: "Login successful",
    token: token,
  });
});

router.post("/createCourse", async (req, res) => {
  const { title, description, instructorId } = req.body;
  console.log("title", title);
  console.log("description", description);
  console.log("instructorId", instructorId);
  try {
    await prisma.course.create({
      data: {
        title: title,
        description: description,
        instructorId: instructorId,
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

router.get("/courses", async (req, res) => {
  const courses = await prisma.course.findMany();
  return res.send(courses);
});

export { router as instructorRouter };
