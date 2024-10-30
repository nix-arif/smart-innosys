import { NextResponse } from "next/server";
import * as z from "zod";
import { useGetUsersQuery } from "@/redux/state/api";

// Desine schema for input validation
// const userSchema = z.object({
//   username: z.string().min(1, "Username is required").max(100),
//   email: z.string().min(1, "Email is required").email("Invalid email"),
//   password: z
//     .string()
//     .min(1, "Password is required")
//     .min(6, "Password must have 6 characters"),
// });

// const { data } = useGetUsersQuery();

export async function POST(req: Request) {
  try {
    await req.json();

    // check if email already exists
    // const existingUserByEmail = await db.user.findUnique({
    //   where: { email: email },
    // });
    // if (existingUserByEmail) {
    //   return NextResponse.json(
    //     { user: null, message: "User with this email already exists" },
    //     { status: 409 }
    //   );
    // }

    // if username is already exists
    // const existingUserByUsername = await db.user.findUnique({
    //   where: { username: username },
    // });
    // if (existingUserByUsername) {
    //   return NextResponse.json(
    //     {
    //       user: null,
    //       message: "User with this username already exists",
    //     },
    //     { status: 409 }
    //   );
    // }

    // const hashedPassword = await hash(password, 10);
    // const newUser = await db.user.create({
    //   data: {
    //     username,
    //     email,
    //     password: hashedPassword,
    //   },
    // });

    // const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: "test", message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: JSON.stringify(error) },
      { status: 500 }
    );
  }
}
