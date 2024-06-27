import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
  res.send("User signed up successfully!");
});

export { router as userRouter };
