import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

import type { StandardResponse } from "../../../types";

const s3Client = new S3Client();

const getPreSignedUrl = async (
  filename: string
): Promise<StandardResponse<string>> => {
  try {
    const getFileCommand = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: filename
    });

    const url = await getSignedUrl(s3Client, getFileCommand);
    return {
      error: null,
      result: url
    };
  } catch (err) {
    return {
      error: {
        statusCode: 500,
        message: (err as Error).message
      },
      result: null
    };
  }
};

export default getPreSignedUrl;
