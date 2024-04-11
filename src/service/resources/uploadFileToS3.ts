import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import type { PutObjectCommandOutput } from "@aws-sdk/client-s3";

import { logger } from "../../utils/logger";
import type { StandardResponse } from "../../../types";

const s3Client = new S3Client();

const uploadFileToS3 = async (
  filename: string,
  file: Buffer
): Promise<StandardResponse<PutObjectCommandOutput>> => {
  const BUCKET_NAME = process.env.BUCKET_NAME;
  const uploadCommand = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: filename,
    Body: file
  });

  try {
    const uploadRes = await s3Client.send(uploadCommand);
    return {
      error: null,
      result: uploadRes
    };
  } catch (err) {
    logger.error("Error = ", err);
    return {
      error: {
        statusCode: 500,
        message: `Error uploading file to S3 - ${(err as Error).message}`
      },
      result: null
    };
  }
};

export default uploadFileToS3;
