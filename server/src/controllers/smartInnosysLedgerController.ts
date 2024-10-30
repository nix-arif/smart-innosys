import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getSmartInnosysLedger = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("Jalan");
  try {
    const data = await prisma.smartInnosysLedger.findMany();
    if (data) {
      res.status(200).json("hello");
    } else {
      res.status(400).json({ message: "No data" });
    }
  } catch (error) {}
};
