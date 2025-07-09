import { NextRequest, NextResponse } from "next/server";
import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { r2, R2_BUCKET } from "@/lib/r2";

export async function POST(request: NextRequest) {
  const productCode = await request.json();
  const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });

  const BUCKET = process.env.R2_BUCKET!;

  const command = new ListObjectsV2Command({
    Bucket: BUCKET,
  });

  const response = await s3.send(command);

  const signedUrls = await Promise.all(
    (response.Contents || []).map(async (item) => {
      const getObjectCommand = new GetObjectCommand({
        Bucket: BUCKET,
        Key: item.Key!,
      });
      return getSignedUrl(s3, getObjectCommand, { expiresIn: 3600 });
    })
  );
  NextResponse.json({});
}
