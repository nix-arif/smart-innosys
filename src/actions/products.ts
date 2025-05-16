"use server";

import prisma from "@/lib/prisma";

export const getProduct = async (productCode: string) => {
  const res = await prisma.product.findFirst({
    where: {
      productCode,
    },
  });
  return res;
};
