import prisma from "@/lib/prisma";
import { Product } from "@/redux/features/quotation/quotationAffirmaSlice";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const items: Product[] = await request.json();
  const productCodes = items.map((item) => item.productCode);

  try {
    const result = await prisma.product.findMany({
      where: { productCode: { in: productCodes } },
    });

    const products: Product[] = result.map((item, index) => ({
      id: item.id,
      sku: item.sku || "",
      productCode: item.productCode,
      description: item.description,
      qty: items[index].qty,
      unitPrice: item.unitPrice,
      oum: item.oum,
      totalPrice: item.unitPrice * items[index].qty,
    }));
    return NextResponse.json({
      products,
    });
  } catch (error: unknown) {}
}
