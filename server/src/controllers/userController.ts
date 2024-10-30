import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      if (user.password === password) res.status(200).json(user);
    } else {
      res.status(401).json({ message: "Unauthorised" });
    }
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
};
