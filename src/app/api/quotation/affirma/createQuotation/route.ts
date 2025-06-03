import { isPrismaKnownRequestError } from "@/lib/errorChecking";
import prisma from "@/lib/prisma";
import { Quotation } from "@/redux/features/quotation/quotationAffirmaSlice";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const quotationData: Quotation = await request.json();

  try {
    const customerId = quotationData?.quotationHeader?.customer?.id;
    const quoteId = quotationData?.quotationHeader?.quotationRef;
    const quotationItems = quotationData.quotationItem.products.map(
      (product) => ({
        productCode: product.productCode,
        description: product.description,
        unitPrice: product.unitPrice,
        oum: product.oum,
        qty: product.qty,
      })
    );

    if (!customerId) {
      throw new Error("Customer ID is required");
    }

    if (!quoteId) {
      throw new Error("Quotation Ref is required");
    }

    const result = await prisma.quotation.create({
      data: {
        agent: quotationData.quotationHeader.agent,
        quoteType: "ORIGINAL",
        quoteId: quotationData.quotationHeader.quotationRef,
        date: new Date(quotationData.quotationHeader.date),
        customerId: customerId,
        title: "",
        items: {
          create: quotationItems,
        },
      },
      include: {
        items: true,
      },
    });
    return NextResponse.json({
      result,
    });
  } catch (error: unknown) {
    if (isPrismaKnownRequestError(error)) {
      switch (error.code) {
        case "P2001":
          return NextResponse.json(
            { error: "Database Connection Error — cannot retrieve database." },
            { status: 500 }
          );
        default:
          return NextResponse.json(
            { error: `Prisma error: ${error.message}` },
            { status: 500 }
          );
      }
    }
    return NextResponse.json(
      {
        error: "Failed Create Record",
        details: String(error),
      },
      { status: 500 }
    );
  }
}
