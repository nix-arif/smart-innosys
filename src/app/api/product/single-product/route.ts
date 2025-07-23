import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { productCode } = await request.json();
  console.log(productCode);

  if (productCode === "")
    return NextResponse.json({ message: "No Product Code" }, { status: 400 });

  try {
    const product = await prisma.product.findUnique({ where: { productCode } });
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: JSON.stringify(error) },
      { status: 500 }
    );
  }
}
