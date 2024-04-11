import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import type { Request, Response, NextFunction } from "express";

import connectToDB from "./config/db";
import { logger } from "./utils/logger";
import { handleErrors } from "./middleware/handleErrors";
import { resourcesRouter } from "./routes/resources";

const app = express();
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

const port = process.env.PORT ?? 9000;

// APP ROUTES
app.use("/api/resources", resourcesRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  handleErrors(error, req, res, next);
});

connectToDB()
  .then(() => {
    app.listen(port, () => {
      logger.info(`Connected to DB and server started on port ${port}`);
    });
  })
  .catch((err: Error) => {
    logger.error(err.message);
  });
