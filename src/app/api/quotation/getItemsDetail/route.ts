import prisma from "@/lib/prisma";
import { ProductQuotation } from "@/redux/features/quotation/quotationSlice";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const items: ProductQuotation[] = await request.json();
  const productCodes = items.map((item) => item.productCode);

  try {
    const result = await prisma.product.findMany({
      where: { productCode: { in: productCodes } },
    });

    const products: ProductQuotation[] = result.map((item, index) => ({
      no: items[index].no,
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
