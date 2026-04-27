import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "./env";

let s3Client: S3Client | null = null;

export function getS3Client() {
  if (!s3Client) {
    if (!env.s3Endpoint || !env.s3AccessKeyId || !env.s3SecretAccessKey) {
      throw new Error("S3 is not configured. Please check your environment variables.");
    }

    s3Client = new S3Client({
      region: env.s3Region,
      endpoint: env.s3Endpoint,
      credentials: {
        accessKeyId: env.s3AccessKeyId,
        secretAccessKey: env.s3SecretAccessKey,
      },
    });
  }
  return s3Client;
}

export async function generateUploadUrl(key: string, contentType: string) {
  const client = getS3Client();
  const command = new PutObjectCommand({
    Bucket: env.s3Bucket,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
  const publicUrl = env.s3PublicUrl ? `${env.s3PublicUrl}/${key}` : uploadUrl.split("?")[0];

  return { uploadUrl, publicUrl };
}
