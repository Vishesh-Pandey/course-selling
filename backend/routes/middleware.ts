import jwt from "jsonwebtoken";
import express from "express";

export const verifyUser = (
  req: any,
  res: express.Response,
  next: () => void
) => {
  console.log("Varifying request... insdie varifyUser middleware");
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, "secret_signature", (err: any, user: any) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    req.id = user.id;
    console.log("User varified and calling next middleware");
    next();
  });
  console.log("End of varify middleware");
};
