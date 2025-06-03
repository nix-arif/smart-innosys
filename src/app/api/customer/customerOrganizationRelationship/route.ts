import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const dataId = await request.json();
  const customer = await prisma.customer.update({
    where: {
      id: dataId.customerId,
    },
    data: {
      customerOrganization: {
        connect: {
          id: dataId.organizationId,
        },
      },
    },
    include: {
      customerOrganization: true,
    },
  });

  return NextResponse.json({
    customer,
  });
}

export async function GET(request: NextRequest) {}
