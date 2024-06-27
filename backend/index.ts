import express from "express";
import { router } from "./routes";

const app = express();

app.use(express.json()); // for parsing application/json

app.use("/", router);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
