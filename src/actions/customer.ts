"use server";

import { createPDF } from "@/lib/createPDF";
import { CustomerFormState, CustomerShema } from "@/lib/definitions";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function createCustomer(
  state: CustomerFormState,
  formData: FormData
) {
  const validatedFields = CustomerShema.safeParse({
    title: formData.get("title"),
    fullname: formData.get("fullname"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, fullname } = validatedFields.data;

  try {
    await prisma.customer.create({
      data: { title, fullname },
    });

    return {
      success: true,
      message: "New Customer Created Successfully!",
    };
  } catch (error) {
    console.log("From customer.ts line 31", error);
    return { success: false, message: JSON.stringify(error) };
  }
}

// Promise<{
//     success?: boolean;
//     message?: any;
//     errors?: any;
//     pdfData?: Buffer<ArrayBufferLike>;
//   }>

export const getCustomers = async () => {
  const customer = await prisma.customer.findMany({});

  return customer;
};
