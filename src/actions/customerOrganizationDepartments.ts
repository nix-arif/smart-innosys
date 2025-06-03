"use server";

import {
  CustomerOrganizationDepartmentFormSchema,
  CustomerOrganizationDepartmentFormState,
} from "@/lib/definitions";
import prisma from "@/lib/prisma";

export const createCustomerOrganizationDepartments = async (
  state: CustomerOrganizationDepartmentFormState,
  formData: FormData
) => {
  const validatedFields = CustomerOrganizationDepartmentFormSchema.safeParse({
    department: formData.get("department"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { department } = validatedFields.data;

  try {
  } catch (error) {}
};
