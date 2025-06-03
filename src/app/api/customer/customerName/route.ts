import { CustomerShema } from "@/lib/definitions";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const customer = await request.json();
  const validatedFields = CustomerShema.safeParse({
    title: customer.title,
    fullname: customer.fullname,
  });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    return NextResponse.json({ errors }, { status: 400 });
  }

  const { title, fullname } = validatedFields.data;

  try {
    await prisma.customer.create({
      data: { title, fullname },
    });
  } catch (errors) {
    console.log("From api/customer/route.ts line 24", errors);
    return { success: false, message: JSON.stringify(errors) };
  }

  return NextResponse.json({
    customer,
  });
}

export async function GET(request: NextRequest) {
  const customers = await prisma.customer.findMany({
    select: { id: true, title: true, fullname: true },
  });

  return NextResponse.json({
    customers,
  });
}
