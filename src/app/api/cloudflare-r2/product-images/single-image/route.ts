import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { key } = await request.json();
  if (!key) return new NextResponse("Missing key", { status: 400 });

  const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });

  try {
    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: key,
    });

    const { Body, ContentType } = await s3.send(command);
    const stream = Body as ReadableStream<Uint8Array>;

    return new NextResponse(stream, {
      status: 200,
      headers: {
        "Content-Type": ContentType ?? "image/jpeg",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    console.error(err);
    return new NextResponse("Image not found", { status: 404 });
  }
}
