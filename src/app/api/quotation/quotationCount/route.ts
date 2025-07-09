import { isPrismaKnownRequestError } from "@/lib/errorChecking";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { quoteSequal, agent } = await request.json();

    const agents = ["affirma", "innosys", "biomech"];

    if (quoteSequal === "withDummy") {
      const quoteCounts = await Promise.all(
        agents.map((agent) => prisma.quotation.count({ where: { agent } }))
      );

      const [noAffirmaQuote, noInnosysQuote, noBiomechQuote] = quoteCounts;

      console.error(
        `affirma: ${noAffirmaQuote}, innosys: ${noInnosysQuote}, biomech: ${noBiomechQuote}`
      );
      return NextResponse.json({
        noAffirmaQuote,
        noInnosysQuote,
        noBiomechQuote,
      });
    }

    if (quoteSequal === "single") {
      const quoteCounts = await prisma.quotation.count({ where: { agent } });

      return NextResponse.json({
        noAffirmaQuote: agent === "affirma" ? quoteCounts : undefined,
        noInnosysQuote: agent === "innosys" ? quoteCounts : undefined,
        noBiomechQuote: agent === "biomech" ? quoteCounts : undefined,
      });
    }
  } catch (error: unknown) {
    if (isPrismaKnownRequestError(error)) {
      switch (error.code) {
        case "P2002":
          return NextResponse.json({ error: error.message }, { status: 400 });
        default:
          return NextResponse.json(
            { error: `Prisma error: ${error.message}` },
            { status: 500 }
          );
      }
    }
    return NextResponse.json(
      {
        error: `Failed to Count Quotation ${error}`,
        details: String(error),
      },
      { status: 500 }
    );
  }
}
