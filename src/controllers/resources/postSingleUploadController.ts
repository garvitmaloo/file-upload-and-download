import type { Request, Response, NextFunction } from "express";

import uploadFileToS3 from "../../service/resources/uploadFileToS3";
import { logger } from "../../utils/logger";

const postSingleUploadController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const file = req.file;

  if (file === undefined) {
    res.statusCode = 400;
    next(new Error("No file provided"));
    return;
  }

  const response = await uploadFileToS3(file.originalname, file.buffer);

  if (response.error !== null) {
    logger.error("Error uploading file to S3", response.error.message);
    res.statusCode = response.error.statusCode;
    next(new Error(response.error.message));
    return;
  }

  res.status(200).json({
    error: null,
    result: "File uploaded successfully"
  });
};

export default postSingleUploadController;
