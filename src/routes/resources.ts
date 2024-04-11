import { Router } from "express";

import { uploadSingleFile, uploadMultipleFiles } from "../config/multer";

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
  (req, res) => {
    res.send("Single file upload");
  }
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
  (req, res) => {
    res.send("Multiple files upload");
  }
);

export { resourcesRouter };
