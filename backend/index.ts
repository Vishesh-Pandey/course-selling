const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World from typescript!");
});

app.post("/user/signup", async (req, res) => {
  const { name, email, password } = req.body;
  await prisma.user.create({
    data: {
      id: Math.floor(Math.random() * 1000),
      name,
      email,
      password,
    },
  });
  res.send("User signed up successfully!");
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
