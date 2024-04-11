/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";

import { uploadSingleFile, uploadMultipleFiles } from "../config/multer";
import postSingleUploadController from "../controllers/resources/postSingleUploadController";
import postMultipleUploadsContainer from "../controllers/resources/postMultipleUploadsContainer";

const resourcesRouter = Router();

resourcesRouter.post(
  "/single-upload",
  (req, res, next) => {
    uploadSingleFile(req, res, function (err) {
      if (err !== undefined) {
        res.statusCode = 500;
        next(new Error((err as Error).message));
        return;
      }

      next();
    });
  },
  postSingleUploadController
);

resourcesRouter.post(
  "/multiple-uploads",
  (req, res, next) => {
    uploadMultipleFiles(req, res, function (err) {
      if (err !== undefined) {
        res.statusCode = 500;
        next(new Error((err as Error).message));
        return;
      }

      next();
    });
  },
  postMultipleUploadsContainer
);

export { resourcesRouter };
