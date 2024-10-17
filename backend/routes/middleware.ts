import jwt from "jsonwebtoken";
import express from "express";

export const varifyUser = (
  req: express.Request,
  res: express.Response,
  next: () => void
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, "secret_signature", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
