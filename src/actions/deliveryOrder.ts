"use server";

import {
  DeliveryOrderFormSchema,
  DeliveryOrderFormState,
} from "@/lib/definitions";

export async function createDeliveryOrder(
  state: DeliveryOrderFormState,
  formData: FormData
) {
  // 1. Validate form fields
  const validatedFields = DeliveryOrderFormSchema.safeParse({
    deliveryOrderNo: formData.get("deliveryOrderNo"),
    agent: formData.get("agent"),
    salesRep: formData.get("salesRep"),
    applicationSpec: formData.get("applicationSpec"),
    date: formData.get("date"),
    customerTitle: formData.get("customerTitle"),
    customerName: formData.get("customerName"),
    organizationDept: formData.get("organizationDept"),
    organizationName: formData.get("organizationName"),
    organizationAddressLine1: formData.get("organizationAddressLine1"),
    organizationAddressLine2: formData.get("organizationAddressLine2"),
    organizationAddressLine3: formData.get("organizationAddressLine3"),
    organizationPosscode: formData.get("organizationPosscode"),
    organizationCity: formData.get("organizationCity"),
    organizationState: formData.get("organizationState"),
    organizationCountry: formData.get("organizationCountry"),
  });

  // If any form fields are invalid, return early
  console.log(validatedFields.success);

  if (!validatedFields.success) {
    console.warn(
      "Im in deliveryOrder.ts line 32, validatedFields.errors",
      validatedFields.error?.flatten().fieldErrors
    );
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
}
