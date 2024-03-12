import "express-async-errors";
import express, { Request, Response } from "express";
import routes from "./routes/index.js";
import cors from "cors";
import "dotenv/config.js";
import errorMiddleware from "./middlewares/error.js";
import boot from "./services/boot.js";

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
app.use(errorMiddleware);

boot().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log("log: conected");
  });
});
