"use server";

import {
  CustomerOrganizationFormSchema,
  CustomerOrganizationFormState,
} from "@/lib/definitions";
import prisma from "@/lib/prisma";

export const createOrganization = async (
  stateData: CustomerOrganizationFormState,
  formData: FormData
) => {
  const validatedFields = CustomerOrganizationFormSchema.safeParse({
    department: formData.get("department"),
    organizationName: formData.get("organizationName"),
    addressLine1: formData.get("addressLine1"),
    addressLine2: formData.get("addressLine2"),
    addressLine3: formData.get("addressLine3"),
    postcode: formData.get("postcode"),
    city: formData.get("city"),
    county: formData.get("county"),
    country: formData.get("country"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const {
    department,
    organizationName,
    addressLine1,
    addressLine2,
    addressLine3,
    postcode,
    city,
    county,
    country,
  } = validatedFields.data;

  try {
    await prisma.customerOrganization.create({
      data: {
        department: [department],
        organizationName,
        addressLine1,
        addressLine2,
        addressLine3,
        postcode,
        city,
        county,
        country,
      },
    });

    return { success: true, message: "New Organization Created Successfully" };
  } catch (error) {
    console.warn("Internal server error", error);
  }
};

export const getOrganizations = async () => {
  const organization = await prisma.customerOrganization.findMany();
  return organization;
};
