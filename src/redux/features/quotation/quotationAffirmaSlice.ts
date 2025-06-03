import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Customer, Organization } from "../customer/customerSlice";
import axios from "axios";

export interface QuotationHeader {
  id: string;
  agent: string;
  quotationType: string;
  quotationRef: string;
  date: string;
  customer: Customer;
  selectedOrganization: Organization;
}

export interface QuotationItem {
  products: Product[];
}

export interface Product {
  id: string;
  sku?: string;
  productCode: string;
  description: string;
  qty: number;
  oum: string;
  unitPrice: number;
  totalPrice: number;
}

export interface Quotation {
  quotationHeader: QuotationHeader;
  quotationItem: QuotationItem;
}

const initialState: Quotation = {
  quotationHeader: {
    id: "",
    agent: "affirma",
    quotationType: "",
    quotationRef: "",
    date: new Date(Date.now()).toISOString(),
    customer: {
      title: "",
      fullname: "",
    },
    selectedOrganization: {
      id: "",
      department: "",
      organizationName: "",
      organizationSSMNo: "",
      organizationTINNo: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      postcode: "",
      city: "",
      province: "",
      country: "",
    },
  },
  quotationItem: {
    products: [
      {
        id: "",
        sku: "",
        productCode: "",
        description: "",
        qty: 0,
        oum: "",
        unitPrice: 0,
        totalPrice: 0,
      },
    ],
  },
};

export const getCustomer = createAsyncThunk(
  "/api/customer/getCustomer",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `/api/customer/customerSingle?customerId=${id}`
      );
      return response.data.customer;
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.error || "Unexpected server error";
        return thunkAPI.rejectWithValue(message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);

export const getAffirmaCurrentQuotationRef = createAsyncThunk(
  "/api/quotation/getAffirmaCurrentQuotationRef",
  async (agent: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `/api/quotation/quotationRefAffirma?agent=${agent}`
      );
      const quotationAffirmaCount = response.data.quotationAffirmaCount;
      const runningNo = `QT${new Date(Date.now())
        .toISOString()
        .slice(0, 4)}-000${quotationAffirmaCount + 1}`;
      return runningNo;
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.error || "Unexpected server error";
        return thunkAPI.rejectWithValue(message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);

export const getQuotationItemsAffirmaDetail = createAsyncThunk(
  "/api/quotation/getItemsDetail",
  async (items: Product[], thunkAPI) => {
    try {
      const response = await axios.post(
        "/api/quotation/affirma/getItemsDetail",
        items
      );
      return response.data.products;
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.error || "Unexpected server error";
        return thunkAPI.rejectWithValue(message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);

export const createAffirmaQuotation = createAsyncThunk(
  "/api/quotation/createAffirmaQuotation",
  async (quotationData: Quotation, thunkAPI) => {
    try {
      const response = await axios.post(
        "/api/quotation/affirma/createQuotation",
        quotationData
      );

      return response.data.result;
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.error || "Unexpected server error";
        return thunkAPI.rejectWithValue(message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);

const quotationAffirmaSlice = createSlice({
  name: "quotationAffirma",
  initialState,
  reducers: {
    setSelectedOrganization: (state, action) => {
      state.quotationHeader.selectedOrganization = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAffirmaCurrentQuotationRef.fulfilled,
      (state, action) => {
        state.quotationHeader.quotationRef = action.payload || "";
      }
    );
    builder.addCase(getCustomer.fulfilled, (state, action) => {
      // console.log("Action.payload", action.payload);
      state.quotationHeader.customer = action.payload;
    });
    builder.addCase(
      getQuotationItemsAffirmaDetail.fulfilled,
      (state, action) => {
        // console.log("Action.payload", action.payload);
        state.quotationItem.products = action.payload;
      }
    );
    builder.addCase(createAffirmaQuotation.fulfilled, (state, action) => {
      console.log("Action.payload", action.payload);
    });
    builder.addCase(createAffirmaQuotation.rejected, (state, action) => {
      console.log("Action.payload", action.payload);
    });
  },
});

export default quotationAffirmaSlice.reducer;
export const { setSelectedOrganization } = quotationAffirmaSlice.actions;
