export const generalInfoState = [
  {
    type: "text",
    value: "QAF/25-0159",
    name: "quotationId",
    label: "Reference No.",
  },
  {
    type: "date",
    value: new Date(Date.now()).toISOString().split("T")[0],
    name: "date",
    label: "Date",
  },
  {
    type: "text",
    value: "dr.",
    name: "customerTitle",
    label: "Customer Title",
  },
  {
    type: "text",
    value: "syed",
    name: "customerName",
    label: "Customer Name",
  },
  {
    type: "text",
    value: "gleneagles",
    name: "corganizationName",
    label: "Organization Name",
  },
  {
    type: "text",
    value: "no. 1, jalan medini utara",
    name: "addressLine1",
    label: "Address Line 1",
  },
  {
    type: "text",
    value: "iskandar puteri",
    name: "addressLine2",
    label: "Address Line 2",
  },
  {
    type: "text",
    value: "iskandar",
    name: "addressLine3",
    label: "Address Line 3",
  },
  {
    type: "text",
    value: "80150",
    name: "postcode",
    label: "Postcode",
  },
  {
    type: "text",
    value: "johor bahru",
    name: "city",
    label: "City",
  },
  {
    type: "text",
    value: "johor",
    name: "state",
    label: "State",
  },
  {
    type: "text",
    value: "malaysia",
    name: "country",
    label: "Country",
  },
];

export const itemsInfoState = [
  { productCode: "", description: "", qty: 0, oum: "", unitPrice: 0, total: 0 },
];

export const quotationProcessedState = {
  quotationId: "",
  date: "",
  customerTitle: "",
  customerName: "",
  organizationName: "",
  addressLine1: "",
  addressLine2: "",
  addressLine3: "",
  postcode: "",
  city: "",
  state: "",
  country: "",
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
};
