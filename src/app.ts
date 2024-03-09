import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import type { Request, Response, NextFunction } from "express";

import connectToDB from "./config/db";
import authRoutes from "./routes/auth";
import { errorHandler } from "./middleware/errors";

const app = express();
const port = process.env.PORT ?? 9000;

config();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(morgan("tiny"));

// Main App Routes
app.use("/auth", authRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(error, req, res, next);
});

app.listen(port, () => {
  connectToDB()
    .then(() => {
      console.log(`Server is running on the port ${port}`);
    })
    .catch((err) => {
      console.error(err);
    });
});
