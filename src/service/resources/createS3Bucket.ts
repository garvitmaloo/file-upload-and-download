import { S3Client, CreateBucketCommand } from "@aws-sdk/client-s3";
import type { CreateBucketCommandOutput } from "@aws-sdk/client-s3";

import { logger } from "../../utils/logger";
import type { StandardResponse } from "../../../types";

const s3Client = new S3Client();

const createS3Bucket = async (
  bucketName: string
): Promise<StandardResponse<CreateBucketCommandOutput>> => {
  const createBucketCommand = new CreateBucketCommand({
    Bucket: bucketName
  });

  try {
    const response = await s3Client.send(createBucketCommand);
    return {
      error: null,
      result: response
    };
  } catch (err) {
    logger.error(`Error creating S3 bucket - ${(err as Error).message}`);
    return {
      error: {
        statusCode: 500,
        message: `Error creating S3 bucket - ${(err as Error).message}`
      },
      result: null
    };
  }
};

export default createS3Bucket;
