import express, { Request, Response } from "express";
import routes from "./routes/index.js";
import cors from "cors";
import "dotenv/config.js";

const app = express();

app.use(cors({ origin: "*", methods: "GET,POST,PUT,DELETE,OPTIONS" }));

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to backend!",
  });
});

app.use("/api", routes);

app.listen(5000, () => {
  console.log("log: conected");
});
