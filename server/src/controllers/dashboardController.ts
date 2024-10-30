import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getDashboardMetrics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const smartInnosysLedger = await prisma.smartInnosysLedger.findMany({
      orderBy: [
        {
          date: "desc",
        },
      ],
    });

    const smartInnosysInvoice = await prisma.smartInnosysInvoice.findMany({
      orderBy: {
        invoiceDate: "desc",
      },
    });

    const affirmaInvoice = await prisma.affirmaInvoice.findMany({
      orderBy: {
        invoiceDate: "desc",
      },
    });

    res.status(200).json({
      smartInnosysLedger,
      smartInnosysInvoice,
      affirmaInvoice,
    });
  } catch (error) {}
};
