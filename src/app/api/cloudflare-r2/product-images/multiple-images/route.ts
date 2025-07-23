import { ProductQuotation } from "@/redux/features/quotation/quotationSlice";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: NextRequest) {
  //   const { keys } = await request.json();
  //   if (!Array.isArray(keys) || keys.length === 0)
  //     return new NextResponse("Missing keys", { status: 400 });
  //   try {
  // const urls: { key: string; url: string | null }[] = await Promise.all(
  //   keys.map(async (key: string) => {
  //     try {
  //       const command = new GetObjectCommand({
  //         Bucket: process.env.R2_BUCKET!,
  //         Key: key,
  //       });
  //       const { Body, ContentType } = await s3.send(command);
  //       const stream = Body as ReadableStream<Uint8Array>;
  //       return new NextResponse(stream, {
  //         status: 200,
  //         headers: {
  //           "Content-Type": ContentType ?? "image/jpeg",
  //           "Cache-Control": "public, max-age=3600",
  //         },
  //       });
  //     } catch (err) {
  //       console.error(`Error fetching ${key}:`, err);
  //       return { key, url: null };
  //     }
  //   })
  // );
  // return NextResponse.json({ images: urls });
  //   keys.map(async (key) => {
  //     try {
  //       const command = new GetObjectCommand({
  //         Bucket: process.env.R2_BUCKET!,
  //         Key: key,
  //       });
  //       const { Body, ContentType } = await s3.send(command);
  //       const stream = Body as ReadableStream<Uint8Array>;
  //     } catch (err) {
  //       console.error(err);
  //       return new NextResponse("Error fetching images", { status: 500 });
  //     }
  //   });

  const items: ProductQuotation[] = await request.json();
  console.log(items);

  const enrichedItems = await Promise.all(
    items.map(async (item) => {
      try {
        const key = item.productCode + ".jpeg"; // adjust extension if needed

        const command = new GetObjectCommand({
          Bucket: process.env.R2_BUCKET!,
          Key: key,
        });

        const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 }); // 1 hour

        return { ...item, productImage: signedUrl };
      } catch (error) {
        console.warn(`❌ Image for ${item.productCode} not found.`);
        return { ...item, productImage: null };
      }
    })
  );

  return NextResponse.json(enrichedItems);
}
