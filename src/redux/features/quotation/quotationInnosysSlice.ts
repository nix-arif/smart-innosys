import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Customer } from "../customer/customerSlice";
import axios from "axios";

export interface QuotationHeader {
  id: string;
  agent: string;
  quotationType: string;
  quotationRef: string;
  date: string;
  customer: Customer;
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

export const getInnosysCurrentQuotationRef = createAsyncThunk(
  "/api/quotation/getInnosysCurrentQuotationRef",
  async (agent: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `/api/quotation/quotationRefInnosys?agent=${agent}`
      );
      const quotationInnosysCount = response.data.quotationInnosysCount;
      const runningNo = `QSI${new Date(Date.now())
        .toISOString()
        .slice(2, 4)}-000${quotationInnosysCount + 1}`;
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

const quotationInnosysSlice = createSlice({
  name: "quotationInnosys",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getInnosysCurrentQuotationRef.fulfilled,
      (state, action) => {
        state.quotationHeader.quotationRef = action.payload || "";
      }
    );
  },
});

export default quotationInnosysSlice.reducer;
