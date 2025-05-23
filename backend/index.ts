import express from "express";
import { router } from "./routes";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:8081"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
); // for parsing application/json

app.use(express.json()); // for parsing application/json

app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

app.use("/", router);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
