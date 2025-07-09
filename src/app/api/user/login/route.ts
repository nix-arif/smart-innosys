import { SigninFormSchema } from "@/lib/definitions";
import prisma from "@/lib/prisma";
import { compareSync } from "bcrypt-ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const user = await request.json();

  const validatedFields = SigninFormSchema.safeParse({
    email: user.email,
    password: user.password,
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    return NextResponse.json({ errors }, { status: 400 });
  }

  const { email, password } = validatedFields.data;

  try {
    const userFromDB = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userFromDB)
      return NextResponse.json(
        { message: "Unauthorised User" },
        { status: 401 }
      );

    const isPasswordMatch = await compareSync(
      password,
      userFromDB.hashedPassword
    );

    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Unauthorised User" },
        { status: 401 }
      );
    }

    const { hashedPassword, ...safeUser } = userFromDB;

    return NextResponse.json({ userData: safeUser });
  } catch (errors) {
    return NextResponse.json({ message: "No User Found" });
  }
}
