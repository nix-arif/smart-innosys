import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  ListObjectsV2Command,
  ListObjectsV2CommandInput,
} from "@aws-sdk/client-s3";

// Create the S3 client
const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Optional in-memory cache (resets on server restart)
let lastCount = 0;
let lastCheck = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export async function POST(request: NextRequest) {
  const now = Date.now();

  // ✅ Return cached count if within the cache window
  if (now - lastCheck < CACHE_DURATION) {
    return NextResponse.json({ count: lastCount, cached: true });
  }

  let continuationToken: string | undefined = undefined;
  let totalCount = 0;
  let pageCount = 0;

  try {
    do {
      const input: ListObjectsV2CommandInput = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Prefix: "",
        ContinuationToken: continuationToken,
      };

      const command = new ListObjectsV2Command(input);

      console.time(`S3 Page ${pageCount + 1}`);
      const response = await s3.send(command);
      console.timeEnd(`S3 Page ${pageCount + 1}`);

      totalCount += response.Contents?.length ?? 0;

      continuationToken = response.IsTruncated
        ? response.NextContinuationToken
        : undefined;

      pageCount++;
    } while (continuationToken);

    // ✅ Update in-memory cache
    lastCheck = now;
    lastCount = totalCount;

    return NextResponse.json({
      count: totalCount,
      pages: pageCount,
      cached: false,
    });
  } catch (error: any) {
    console.error("S3 error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to count objects" },
      { status: 500 }
    );
  }
}
