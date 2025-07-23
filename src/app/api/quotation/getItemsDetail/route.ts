import prisma from "@/lib/prisma";
import { ProductQuotation } from "@/redux/features/quotation/quotationSlice";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const items: ProductQuotation[] = await request.json();
  const productCodes = items.map((item) => item.productCode);

  try {
    const dbProducts = await prisma.product.findMany({
      where: { productCode: { in: productCodes } },
    });

    // Create a map for fast lookup by productCode
    const productMap = new Map(
      dbProducts.map((product) => [product.productCode, product])
    );

    // Map the original items (to preserve order)
    const products: ProductQuotation[] = items.map((item) => {
      const product = productMap.get(item.productCode);
      return {
        no: item.no,
        id: product?.id || "", // fallback to empty string if not found
        sku: product?.sku || "",
        productCode: item.productCode,
        description: product?.description || "",
        qty: item.qty,
        unitPrice: product?.unitPrice || 0,
        oum: product?.oum || "",
        totalPrice: (product?.unitPrice || 0) * item.qty,
      };
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Failed to process product quotations:", error);
    return NextResponse.json(
      { error: "Failed to fetch product data" },
      { status: 500 }
    );
  }
}
