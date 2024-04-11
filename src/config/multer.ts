import type { Request } from "express";
import multer, { diskStorage } from "multer";
import type { FileFilterCallback } from "multer";

import {
  ACCEPTED_FILE_TYPES,
  MAX_MEDIUM_FILE_SIZE,
  MAX_SMALL_FILE_SIZE
} from "../utils/constants";

const fileFilterHandler = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  if (ACCEPTED_FILE_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("This file format is not supported"));
  }
};

const diskStorageConfig = diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${process.cwd()}/uploads`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const singleUpload = multer({
  storage: diskStorageConfig,
  fileFilter: fileFilterHandler,
  limits: { fileSize: MAX_MEDIUM_FILE_SIZE }
});

const multipleUploads = multer({
  storage: multer.memoryStorage(),
  fileFilter: fileFilterHandler,
  limits: {
    files: 10,
    fileSize: MAX_SMALL_FILE_SIZE
  }
});

export const uploadSingleFile = singleUpload.single("file");
export const uploadMultipleFiles = multipleUploads.array("files", 10);
