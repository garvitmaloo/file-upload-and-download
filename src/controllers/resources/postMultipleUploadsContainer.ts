import type { Request, Response, NextFunction } from "express";
import type { PutObjectAclCommandOutput } from "@aws-sdk/client-s3";

import uploadFileToS3 from "../../service/resources/uploadFileToS3";
import type { StandardResponse } from "../../../types";

const postMultipleUploadsContainer = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const allFiles = req.files;

  if (allFiles === undefined || allFiles.length === 0) {
    res.statusCode = 400;
    next(new Error("No files provided"));
    return;
  }

  const allUploads: Array<
    Promise<StandardResponse<PutObjectAclCommandOutput>>
  > = [];

  (allFiles as Express.Multer.File[]).forEach((file) => {
    allUploads.push(uploadFileToS3(file.originalname, file.buffer));
  });

  const allUploadsResponse = await Promise.all(allUploads);
  const uploadFailed = allUploadsResponse.some(
    (upload) => upload.error !== null
  );

  if (uploadFailed) {
    res.statusCode = 500;
    next(new Error("One or more file uploads failed"));
    return;
  }

  res.status(200).json({
    error: null,
    result: "All files uploaded successfully"
  });
};

export default postMultipleUploadsContainer;
