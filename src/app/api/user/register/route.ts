import { SignupFormSchema } from "@/lib/definitions";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { hashSync } from "bcrypt-ts";

export async function POST(request: NextRequest) {
  const userData = await request.json();

  const validatedFields = SignupFormSchema.safeParse({
    username: userData.username,
    email: userData.email,
    password: userData.password,
    confirmPassword: userData.confirmPassword,
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    return NextResponse.json({ errors }, { status: 400 });
  }

  const { username, email, password } = validatedFields.data;
  try {
    const userFromDB = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userFromDB)
      return NextResponse.json(
        { message: "Existing User, Please Login" },
        { status: 401 }
      );

    if (password !== userData.confirmPassword)
      return NextResponse.json(
        { message: "Password Mismatch" },
        { status: 401 }
      );

    const hashedPassword = await hashSync(password);

    const createdUser = await prisma.user.create({
      data: {
        username,
        email,
        hashedPassword,
      },
    });
    return NextResponse.json({ createdUser });
  } catch (error) {
    return NextResponse.json({ message: "User Not Created" }, { status: 500 });
  }
}
