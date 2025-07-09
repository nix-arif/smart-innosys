import { isPrismaKnownRequestError } from "@/lib/errorChecking";
import prisma from "@/lib/prisma";
import { Quotation } from "@/redux/features/quotation/quotationSlice";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const quotationData: Quotation = await request.json();
  console.log(quotationData);

  try {
    if (quotationData.quotationSequal === "single") {
      switch (quotationData.agent) {
        case "affirma":
          await insertAffirmaOriginalQuotationToDB(quotationData);
          return NextResponse.json(
            { message: "Quotation Affirma Created" },
            { status: 200 }
          );
        case "innosys":
          await insertInnosysOriginalQuotationToDB(quotationData);
          return NextResponse.json(
            { message: "Quotation Innosys Created" },
            { status: 200 }
          );
        case "biomech":
          await insertBiomechOriginalQuotationToDB(quotationData);
          return NextResponse.json(
            { message: "Quotation Biomech Created" },
            { status: 200 }
          );
      }
    }
    if (quotationData.quotationSequal === "withDummy") {
      switch (quotationData.agent) {
        case "affirma":
          await insertAffirmaOriginalQuotationToDB(quotationData);
          await insertInnosysDummyQuotationToDB(quotationData);
          await insertBiomechDummyQuotationToDB(quotationData);
          return NextResponse.json(
            { message: "Quotation Affirma Original & 2 Dummy Created" },
            { status: 200 }
          );
        case "innosys":
          await insertAffirmaDummyQuotationToDB(quotationData);
          await insertInnosysOriginalQuotationToDB(quotationData);
          await insertBiomechDummyQuotationToDB(quotationData);
          return NextResponse.json(
            { message: "Quotation Innosys Original & 2 Dummy Created" },
            { status: 200 }
          );
        case "biomech":
          await insertAffirmaDummyQuotationToDB(quotationData);
          await insertInnosysDummyQuotationToDB(quotationData);
          await insertBiomechOriginalQuotationToDB(quotationData);
          return NextResponse.json(
            { message: "Quotation Biomech Original & 2 Dummy Created" },
            { status: 200 }
          );
      }
    }
    return NextResponse.json(
      { message: "Quotation Not Created" },
      { status: 400 }
    );
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
        error: `Failed to Create Quotation ${error}`,
        details: String(error),
      },
      { status: 500 }
    );
  }
}

async function insertAffirmaOriginalQuotationToDB(quotationData: Quotation) {
  await prisma.quotation.create({
    data: {
      agent: "affirma",
      quoteType: "ORIGINAL",
      quoteId: quotationData.quotationHeaders.affirma.quotationRef,
      date: quotationData.quotationHeaders.affirma.date,
      title: quotationData.quotationHeaders.affirma.title,
      customer: {
        connect: {
          id: quotationData.quotationHeaders.affirma.customer.id,
        },
      },
      items: {
        create: quotationData.quotationItems.affirma.map((item) => ({
          productCode: item.productCode,
          description: item.description,
          qty: item.qty,
          oum: item.oum,
          unitPrice: item.unitPrice,
        })),
      },
    },
  });
}

async function insertInnosysOriginalQuotationToDB(quotationData: Quotation) {
  await prisma.quotation.create({
    data: {
      agent: "innosys",
      quoteType: "ORIGINAL",
      quoteId: quotationData.quotationHeaders.innosys.quotationRef,
      date: quotationData.quotationHeaders.innosys.date,
      title: quotationData.quotationHeaders.innosys.title,
      customer: {
        connect: {
          id: quotationData.quotationHeaders.innosys.customer.id,
        },
      },
      items: {
        create: quotationData.quotationItems.innosys.map((item) => ({
          productCode: item.productCode,
          description: item.description,
          qty: item.qty,
          oum: item.oum,
          unitPrice: item.unitPrice,
        })),
      },
    },
  });
}

async function insertBiomechOriginalQuotationToDB(quotationData: Quotation) {
  await prisma.quotation.create({
    data: {
      agent: "biomech",
      quoteType: "ORIGINAL",
      quoteId: quotationData.quotationHeaders.biomech.quotationRef,
      date: quotationData.quotationHeaders.biomech.date,
      title: quotationData.quotationHeaders.biomech.title,
      customer: {
        connect: {
          id: quotationData.quotationHeaders.biomech.customer.id,
        },
      },
      items: {
        create: quotationData.quotationItems.biomech.map((item) => ({
          productCode: item.productCode,
          description: item.description,
          qty: item.qty,
          oum: item.oum,
          unitPrice: item.unitPrice,
        })),
      },
    },
  });
}

async function insertAffirmaDummyQuotationToDB(quotationData: Quotation) {
  await prisma.quotation.create({
    data: {
      agent: "affirma",
      quoteType: "DUMMY",
      quoteId: quotationData.quotationHeaders.affirma.quotationRef,
      date: quotationData.quotationHeaders.affirma.date,
      title: quotationData.quotationHeaders.affirma.title,
      customer: {
        connect: {
          id: quotationData.quotationHeaders.affirma.customer.id,
        },
      },
      items: {
        create: quotationData.quotationItems.affirma.map((item) => ({
          productCode: item.productCode,
          description: item.description,
          qty: item.qty,
          oum: item.oum,
          unitPrice: item.unitPrice,
        })),
      },
    },
  });
}

async function insertInnosysDummyQuotationToDB(quotationData: Quotation) {
  await prisma.quotation.create({
    data: {
      agent: "innosys",
      quoteType: "DUMMY",
      quoteId: quotationData.quotationHeaders.innosys.quotationRef,
      date: quotationData.quotationHeaders.innosys.date,
      title: quotationData.quotationHeaders.innosys.title,
      customer: {
        connect: {
          id: quotationData.quotationHeaders.innosys.customer.id,
        },
      },
      items: {
        create: quotationData.quotationItems.innosys.map((item) => ({
          productCode: item.productCode,
          description: item.description,
          qty: item.qty,
          oum: item.oum,
          unitPrice: item.unitPrice,
        })),
      },
    },
  });
}

async function insertBiomechDummyQuotationToDB(quotationData: Quotation) {
  await prisma.quotation.create({
    data: {
      agent: "biomech",
      quoteType: "DUMMY",
      quoteId: quotationData.quotationHeaders.biomech.quotationRef,
      date: quotationData.quotationHeaders.biomech.date,
      title: quotationData.quotationHeaders.biomech.title,
      customer: {
        connect: {
          id: quotationData.quotationHeaders.biomech.customer.id,
        },
      },
      items: {
        create: quotationData.quotationItems.biomech.map((item) => ({
          productCode: item.productCode,
          description: item.description,
          qty: item.qty,
          oum: item.oum,
          unitPrice: item.unitPrice,
        })),
      },
    },
  });
}
