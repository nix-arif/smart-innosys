import { isPrismaKnownRequestError } from "@/lib/errorChecking";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const agent = searchParams.get("agent");

  try {
    const quotationAffirmaCount = await prisma.quotation.count({
      where: { agent: "affirma" },
    });
    return NextResponse.json({
      quotationAffirmaCount,
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
        error: "Failed To Retrieve Data From Database",
        details: String(error),
      },
      { status: 500 }
    );
  }
}
