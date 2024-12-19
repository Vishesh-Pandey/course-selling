import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
export const signup = async (req: express.Request, res: express.Response) => {
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
};

export const login = async (req: express.Request, res: express.Response) => {
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
};
