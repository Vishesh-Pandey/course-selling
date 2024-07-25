import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  // hash the password

  const salt = await bcrypt.genSalt(12);

  const hashedPassword = await bcrypt.hash(password, salt);

  await prisma.user.create({
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

export { router as instructorRouter };
