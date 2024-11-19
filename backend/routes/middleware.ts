import jwt from "jsonwebtoken";
import express from "express";

export const varifyUser = (
  req: any,
  res: express.Response,
  next: () => void
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, "secret_signature", (err: any, user: any) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    req.id = user.id;
    next();
  });
};
