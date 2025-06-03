import { LocalStorageData } from "./definitions";

export const initialLocalStorageData: LocalStorageData = {
  quotationData: {
    general: {
      quotationId: "",
      date: new Date(Date.now()).toISOString().split("T")[0],
      customerTitle: "",
      customerFullname: "",
      organizationName: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      postcode: "",
      city: "",
      state: "",
      country: "",
    },
    items: [
      {
        productCode: "",
        description: "",
        qty: 0,
        oum: "",
        unitPrice: 0,
        total: 0,
      },
    ],
  },
  customer: {
    customerName: {
      title: "",
      fullname: "",
    },
    customerOrganization: {
      department: "",
      organizationName: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      postcode: "",
      city: "",
      county: "",
      country: "",
    },
  },
  customerNameList: [],
};
