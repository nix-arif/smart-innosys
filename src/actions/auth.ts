"use server";

import {
  FormState,
  SigninFormSchema,
  SignupFormSchema,
} from "@/lib/definitions";
import prisma from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { compare, genSalt, hash } from "bcrypt-ts";
import { redirect } from "next/navigation";

export async function signup(state: FormState, formData: FormData) {
  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { username, email, password } = validatedFields.data;
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);

  // 3. Insert the user into the database
  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        hashedPassword,
      },
    });

    if (!user) {
      return { message: "An error occurred while creating your account." };
    }

    // 4. Create user session
    await createSession(user.id);
    redirect("/dashboard");
  } catch (error) {
    return { message: "Internal server error." };
  }
}

export async function signin(state: FormState, formData: FormData) {
  // 1. Validate form fields
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  console.warn(
    "Im in auth.ts line 63, validatedFields.data",
    validatedFields.data
  );

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for database comparison
  const { email, password } = validatedFields.data;

  // 3. Find email in database
  let success = false;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return {
        message: "User not exists.",
      };
    }

    const isPasswordMatch = await compare(password, user.hashedPassword);

    if (!isPasswordMatch) {
      return {
        message: "Invalid credentials.",
      };
    }
    // 4. Create user session
    await createSession(user.id);
    success = true;
  } catch (error) {
    return {
      message: "Internal server error",
    };
  } finally {
    if (success) {
      redirect("/dashboard");
    }
  }
}
