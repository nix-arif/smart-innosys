import prisma from "@/lib/prisma";
import {
  GetObjectCommand,
  ListObjectsV2Command,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";

interface ProductMDA {
  productCode: string;
  mdaRegistrationNo: string;
  mdaPageNo: number;
  mdaExpiryDate: Date;
}

// This type reflects the actual shape returned by prisma.select
type PrismaProduct = {
  productCode: string;
  mdaRegistrationNo: string | null;
  mdaExpiryDate: Date | null;
  mdaPageNo: number | null;
};

interface ProductWithFile extends PrismaProduct {
  mdaFile: string | null;
}

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: NextRequest) {
  const { productCodes } = await request.json();
  const productCodeArray = productCodes
    .split("\n")
    .map((s: string) => s.trim())
    .filter(Boolean);

  const foundProducts: PrismaProduct[] = await prisma.product.findMany({
    where: { productCode: { in: productCodeArray } },
    select: {
      productCode: true,
      mdaRegistrationNo: true,
      mdaExpiryDate: true,
      mdaPageNo: true,
    },
  });

  const products: (PrismaProduct | null)[] = productCodeArray.map(
    (code: string) => foundProducts.find((p) => p.productCode === code) ?? null
  );

  const mdaFiles: ProductWithFile[] = await Promise.all(
    products.map(async (product, idx) => {
      if (!product || !product.mdaRegistrationNo) {
        console.warn(
          `Missing product or registration for code: ${product?.productCode}`
        );
        return {
          productCode: productCodeArray[idx],
          mdaRegistrationNo: null,
          mdaPageNo: null,
          mdaExpiryDate: null,
          mdaFile: null,
        };
      }

      const listResult = await s3.send(
        new ListObjectsV2Command({
          Bucket: process.env.R2_BUCKET_MDA!,
          Prefix: "",
        })
      );
      const match = listResult.Contents?.find((obj) =>
        obj.Key?.toLowerCase().includes(
          product.mdaRegistrationNo!.toLowerCase()
        )
      );

      if (!match?.Key) {
        console.warn(`MDA for ${product.productCode} not found.`);
        return { ...product, mdaFile: null };
      }

      const signedUrl = await getSignedUrl(
        s3,
        new GetObjectCommand({
          Bucket: process.env.R2_BUCKET_MDA!,
          Key: match.Key,
        }),
        { expiresIn: 3600 }
      );

      return { ...product, mdaFile: signedUrl };
    })
  );

  return NextResponse.json(mdaFiles, { status: 200 });
}
