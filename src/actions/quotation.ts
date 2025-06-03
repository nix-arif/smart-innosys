"use server";

import { QuotationData } from "@/lib/definitions";
import prisma from "@/lib/prisma";

export const createQuotation = async (quotationData: QuotationData) => {
  //   const data = formData.get("general");
  console.log(quotationData);

  const quoteDB = await prisma.quotation.create({
    data: {
      quoteId: quotationData.general.quoteId,
      date: quotationData.general.date,
    },
  });
};
