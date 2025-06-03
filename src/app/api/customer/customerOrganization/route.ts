import { CustomerOrganizationFormSchema } from "@/lib/definitions";
import { isPrismaKnownRequestError } from "@/lib/errorChecking";
import prisma from "@/lib/prisma";
import { Organization } from "@/redux/features/customer/customerSlice";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const organizationData: Organization = await request.json();
  console.log("Received organizationData:", organizationData);
  const validatedFields = CustomerOrganizationFormSchema.safeParse({
    department: organizationData.department,
    organizationName: organizationData.organizationName,
    organizationSSMNo: organizationData.organizationSSMNo,
    organizationTINNo: organizationData.organizationTINNo,
    addressLine1: organizationData.addressLine1,
    addressLine2: organizationData.addressLine2,
    addressLine3: organizationData.addressLine3,
    postcode: organizationData.postcode,
    city: organizationData.city,
    province: organizationData.province,
    country: organizationData.country,
  });
  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    return NextResponse.json({ errors }, { status: 400 });
  }
  try {
    const existingOrganization = await prisma.customerOrganization.findUnique({
      where: { organizationName: organizationData.organizationName },
      select: { department: true },
    });
    const departments = existingOrganization
      ? Array.from(
          new Set([
            ...existingOrganization.department,
            organizationData.department,
          ])
        )
      : [organizationData.department];
    const organization = await prisma.customerOrganization.upsert({
      where: {
        organizationName: organizationData.organizationName,
      },
      update: {
        department: {
          set: departments,
        },
      },
      create: {
        organizationName: organizationData.organizationName,
        organizationSSMNo: organizationData.organizationSSMNo || null,
        organizationTINNo: organizationData.organizationTINNo || null,
        department: departments,
        addressLine1: organizationData.addressLine1,
        addressLine2: organizationData.addressLine2,
        addressLine3: organizationData.addressLine3 || null,
        postcode: organizationData.postcode,
        city: organizationData.city,
        province: organizationData.province,
        country: organizationData.country,
      },
    });
    return NextResponse.json({ organization });
  } catch (error: unknown) {
    if (isPrismaKnownRequestError(error)) {
      switch (error.code) {
        case "P2002":
          return NextResponse.json(
            { error: "Duplicate entry — this record already exists." },
            { status: 400 }
          );
        default:
          return NextResponse.json(
            { error: `Prisma error: ${error.message}` },
            { status: 500 }
          );
      }
    }
    return NextResponse.json(
      { error: "Failed to upsert organization", details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const customerOrganizations = await prisma.customerOrganization.findMany({});
  return NextResponse.json({ customerOrganizations });
}
