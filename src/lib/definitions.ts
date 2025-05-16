import { string, z } from "zod";

export const SignupFormSchema = z
  .object({
    username: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long." })
      .trim(),
    email: z.string().email({ message: "Please enter a valid email." }).trim(),
    password: z
      .string()
      .min(4, { message: "Must be at least 4 characters long." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export const SigninFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(4, { message: "Must be at least 4 characters long." }),
});

export const DeliveryOrderFormSchema = z.object({
  deliveryOrderNo: z.string().min(2, { message: "Required field" }),
  agent: z.string().min(2, { message: "Required field" }),
  salesRep: z.string().min(2, { message: "Required field" }),
  applicationSpec: z.string().min(2, { message: "Required field" }),
  date: z.string().min(2, { message: "Required field" }),
  customerTitle: z.string().min(2, { message: "Required field" }),
  customerName: z.string().min(2, { message: "Required field" }),
  organizationDept: z.string().min(2, { message: "Required field" }),
  organizationName: z.string().min(2, { message: "Required field" }),
  organizationAddressLine1: z.string().min(2, { message: "Required field" }),
  organizationAddressLine2: z.string().min(2, { message: "Required field" }),
  organizationAddressLine3: z.string().min(2, { message: "Required field" }),
  organizationPosscode: z.string().min(2, { message: "Required field" }),
  organizationCity: z.string().min(2, { message: "Required field" }),
  organizationState: z.string().min(2, { message: "Required field" }),
  organizationCountry: z.string().min(2, { message: "Required field" }),
});

export const CustomerShema = z.object({
  title: z.string().min(2, { message: "Required field" }),
  fullname: z.string().min(2, { message: "Required field" }),
});

export type AuthFormState =
  | {
      errors?: {
        username?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
      };
      message?: string;
    }
  | undefined;

export type SessionPayload =
  | {
      userId: string;
      role: string;
      expiresAt: Date;
    }
  | undefined;

export type DeliveryOrderFormState =
  | {
      errors?: {
        deliveryOrderNo?: string[];
        company?: string[];
        salesRep?: string[];
        applicationSpec?: string[];
        date?: string[];
        customerTitle?: string[];
        customerName?: string[];
        organizationDept?: string[];
        organizationName?: string[];
        organizationAddressLine1?: string[];
        organizationAddressLine2?: string[];
        organizationAddressLine3?: string[];
        organizationPosscode?: string[];
        organizationCity?: string[];
        organizationState?: string[];
        organizationCountry?: string[];
      };
    }
  | undefined;

export type CustomerFormState =
  | {
      errors?: {
        title?: string[];
        fullname?: string[];
      };
      message?: string;
    }
  | undefined;

export type DeliveryOrderType = {
  deliveryOrderNo: string;
  agent: string;
  salesRep: string;
  applicationSpec: string;
  date: string;
  customerTitle: string;
  customerName: string;
  organizationDept: string;
  organizationName: string;
  organizationAddressLine1: string;
  organizationAddressLine2: string;
  organizationAddressLine3: string;
  organizationPosscode: string;
  organizationCity: string;
  organizationState: string;
  organizationCountry: string;
  products: ProductDeliveryOrderType[];
};

export type ProductDeliveryOrderType = {
  sku: string;
  productCode: string;
  description: string;
  qty: number;
  oum: string;
  unitPrice: number;
  totalPrice: number;
};

export type QuotationData = Record<string, string>;
