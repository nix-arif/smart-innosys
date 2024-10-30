import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface User {
  userId: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface Customer {
  customerId: number;
  title: string;
  fullname: string;
  // smartInnosysInvoice SmartInnosysInvoice[]
  // affirmaInoice       AffirmaInvoice[]
  createdAt: string;
  updatedAt: string;
  // organization CustomersOnOrganizations[]
}

export interface Organization {
  organizationId: number;
  organizationName: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  state: string;
  poscode: string;
  createdAt: string;
  updatedAt: string;
  // organization     CustomersOnOrganizations[]
  // smartInnosysInvoice SmartInnosysInvoice[]
  // affirmaInvoice      AffirmaInvoice[]
}

export interface SmartInnosysLedger {
  smartInnosysLedgerId: number;
  title: string;
  amount: number;
  date: string;
  receiveFrom?: string;
  paidTo?: string;
  docNo?: string;
  docDate?: string;
  remark?: string;
  ledgerId: number;
}

export interface SmartInnosysInvoice {
  smartInnosysInvoiceId: number;
  smartInnosysInvoiceNo: string;
  smartInnosysDeliveryOrderNo: string;
  invoiceDate: string;
  procedureDate: string;
  qty: number;
  totalPrice: number;
  customerId: number;
  customer: Customer[];
  organizationId: number;
  organization: Organization[];
  mrnNo?: string;
  caseType: string;
  salesPerson: string;
  poNo?: string;
  poDate?: string;
  invoiceAfterPODate?: string;
  paymentStatus?: boolean;
  paymentDate?: string;
  createdAt: string;
  updatedAt: string;

  // products        InvoicesOnProducts[]
}

export interface AffirmaInvoice {
  affirmaInvoiceId: number;
  affirmaInvoiceNo: string;
  affirmaDeliveryOrderNo: string;
  invoiceDate: string;
  procedureDate: string;
  qty: number;
  totalPrice: number;
  customerId: number;
  customer: Customer[];
  organizationId: number;
  organization: Organization[];
  mrnNo?: string;
  caseType: string;
  salesPerson: string;
  poNo?: string;
  poDate?: string;
  invoiceAfterPODate?: string;
  paymentStatus?: boolean;
  paymentDate?: string;
  createdAt: string;
  updatedAt: string;

  // products        InvoicesOnProducts[]
}

export interface DashboardMetrics {
  smartInnosysLedger: SmartInnosysLedger[];
  smartInnosysInvoice: SmartInnosysInvoice[];
  affirmaInvoice: AffirmaInvoice[];
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["Users", "DashboardMetrics"],
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    getDashboardMetrics: build.query<DashboardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"],
    }),
  }),
});

export const { useGetUsersQuery, useGetDashboardMetricsQuery } = api;
