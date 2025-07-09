import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Customer } from "../customer/customerSlice";
import axios from "axios";
import {
  constructAffirmaQuotationRefNo,
  constructBiomechQuotationRefNo,
  constructInnosysQuotationRefNo,
} from "@/lib/generateQuotationRefNo";
import { generateAllQuotePrice } from "@/lib/generateItemsPrice";

export interface OrganizationQuotation {
  id?: string;
  department: string;
  organizationName: string;
  organizationSSMNo?: string;
  organizationTINNo?: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3?: string;
  postcode: string;
  city: string;
  province: string;
  country: string;
}

export interface QuotationHeader {
  id: string;
  agent: string;
  quotationType: string;
  quotationRef: string;
  title: string;
  date: string;
  customer: Customer;
  selectedOrganization: OrganizationQuotation;
}

export interface ProductQuotation {
  no: string;
  id: string;
  sku?: string;
  productCode: string;
  description: string;
  qty: number;
  oum: string;
  unitPrice: number;
  totalPrice: number;
  productImage?: string;
}

export interface Quotation {
  quotationSequal: QuoteSequal;
  agent: AgentKey;
  supportingDoc: boolean;
  markup: number;
  fileFormat: string;
  quoteNo: {
    noAffirmaQuote: number | undefined;
    noInnosysQuote: number | undefined;
    noBiomechQuote: number | undefined;
  };
  quotationHeaders: {
    affirma: QuotationHeader;
    innosys: QuotationHeader;
    biomech: QuotationHeader;
  };
  quotationItems: {
    affirma: ProductQuotation[];
    innosys: ProductQuotation[];
    biomech: ProductQuotation[];
  };
  loading: boolean;
  errors: {
    customer?: string;
    organization?: string;
  };
}

const emptyCustomer: Customer = {
  title: "",
  fullname: "",
};

const emptyOrganization: OrganizationQuotation = {
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
};

export type AgentKey = "affirma" | "innosys" | "biomech";
type QuoteSequal = "single" | "withDummy";

export const defaultHeader = (agent: AgentKey): QuotationHeader => ({
  id: "",
  agent,
  quotationType: "",
  quotationRef: "",
  title: "",
  date: new Date().toISOString(),
  customer: { ...emptyCustomer },
  selectedOrganization: { ...emptyOrganization },
});

export const defaultProduct: ProductQuotation = {
  no: "",
  id: "",
  sku: "",
  productCode: "",
  description: "",
  qty: 0,
  oum: "",
  unitPrice: 0,
  totalPrice: 0,
  productImage: "",
};

const initialState: Quotation = {
  quotationSequal: "withDummy",
  agent: "affirma",
  supportingDoc: true,
  markup: 0,
  fileFormat: "",
  quoteNo: {
    noAffirmaQuote: undefined,
    noInnosysQuote: undefined,
    noBiomechQuote: undefined,
  },
  quotationHeaders: {
    affirma: defaultHeader("affirma"),
    innosys: defaultHeader("innosys"),
    biomech: defaultHeader("biomech"),
  },
  quotationItems: {
    affirma: [defaultProduct],
    innosys: [defaultProduct],
    biomech: [defaultProduct],
  },
  loading: false,
  errors: {
    customer: "No Customer Selected",
    organization: "No Organization Selected",
  },
};

export const quotationCount = createAsyncThunk(
  "quotation/quotationCount",
  async (data: { quoteSequal: QuoteSequal; agent: AgentKey }, thunkAPI) => {
    try {
      const response = await axios.post("/api/quotation/quotationCount", data);
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.error || "Unexpected server error";
        return thunkAPI.rejectWithValue(message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);

export const quotationItemsDetail = createAsyncThunk(
  "api/quotation/getItemsDetail",
  async (items: ProductQuotation[], thunkAPI) => {
    try {
      const response = await axios.post("/api/quotation/getItemsDetail", items);
      return response.data.products;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.error || "Unexpected server error";
        return thunkAPI.rejectWithValue(message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);

export const createQuotation = createAsyncThunk(
  "api/quotation/createQuotation",
  async (quotationData: Quotation, thunkAPI) => {
    console.log(quotationData);
    try {
      const response = await axios.post(
        "/api/quotation/createQuotation",
        quotationData
      );
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.error || "Unexpected server error";
        return thunkAPI.rejectWithValue(message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);

export const getProductImage = createAsyncThunk(
  "quotation/getProductImage",
  async (productCode: string, thunkAPI) => {
    try {
      const response = await axios.post(
        `/api/cloudflare-r2/product-images/single-image`,
        { productCode }
      );
      return response.data.imageUrl;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch image"
      );
    }
  }
);

export const getProductImages = createAsyncThunk(
  "api/quotation/getProductImages",
  async (quotationData: Quotation, thunkAPI) => {
    console.log(quotationData);
    try {
      const response = await axios.post(
        "/api/quotation/createQuotation",
        quotationData
      );
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.error || "Unexpected server error";
        return thunkAPI.rejectWithValue(message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);

const quotationSlice = createSlice({
  name: "quotation",
  initialState,
  reducers: {
    changeQuotationSequal: (state, action) => {
      state.quotationSequal = action.payload;
    },
    changeAgent: (state, action) => {
      state.agent = action.payload;
      const username = localStorage.getItem("username") || "";

      if (state.quotationSequal === "withDummy") {
        const affirmaRefNo = constructAffirmaQuotationRefNo(
          state.quoteNo.noAffirmaQuote,
          username,
          action.payload
        );
        const innosysRefNo = constructInnosysQuotationRefNo(
          state.quoteNo.noInnosysQuote,
          username,
          action.payload
        );
        const biomechRefNo = constructBiomechQuotationRefNo(
          state.quoteNo.noBiomechQuote,
          username,
          action.payload
        );
        switch (state.agent) {
          case "affirma":
            state.quotationHeaders.affirma.quotationRef = affirmaRefNo;
            state.quotationHeaders.innosys.quotationRef = innosysRefNo;
            state.quotationHeaders.biomech.quotationRef = biomechRefNo;
          case "innosys":
            state.quotationHeaders.affirma.quotationRef = affirmaRefNo;
            state.quotationHeaders.innosys.quotationRef = innosysRefNo;
            state.quotationHeaders.biomech.quotationRef = biomechRefNo;
          case "biomech":
            state.quotationHeaders.affirma.quotationRef = affirmaRefNo;
            state.quotationHeaders.innosys.quotationRef = innosysRefNo;
            state.quotationHeaders.biomech.quotationRef = biomechRefNo;
        }
      }
      if (state.quotationSequal === "single") {
        switch (state.agent) {
          case "affirma":
            const affirmaRefNo = constructAffirmaQuotationRefNo(
              state.quoteNo.noAffirmaQuote,
              username,
              action.payload
            );
            state.quotationHeaders.affirma.quotationRef = affirmaRefNo;
          case "innosys":
            const innosysRefNo = constructInnosysQuotationRefNo(
              state.quoteNo.noInnosysQuote,
              username,
              action.payload
            );
            state.quotationHeaders.innosys.quotationRef = innosysRefNo;

          case "biomech":
            const biomechRefNo = constructBiomechQuotationRefNo(
              state.quoteNo.noBiomechQuote,
              username,
              action.payload
            );
            state.quotationHeaders.biomech.quotationRef = biomechRefNo;
        }
      }
    },
    changeSupportingDoc: (state, action) => {
      state.supportingDoc = JSON.parse(action.payload);
    },
    changeCustomer: (state, action) => {
      const agents = ["affirma", "innosys", "biomech"] as const;
      agents.forEach((ag) => {
        state.quotationHeaders[ag].customer = action.payload;
      });
      const { customer, ...rest } = state.errors;
      state.errors = rest;
    },
    changeDate: (state, action) => {
      const agents = ["affirma", "innosys", "biomech"] as const;
      agents.forEach((ag) => {
        state.quotationHeaders[ag].date = action.payload;
      });
    },
    changeSelectedOrganization: (state, action) => {
      const agents = ["affirma", "innosys", "biomech"] as const;
      agents.forEach((ag) => {
        state.quotationHeaders[ag].selectedOrganization = action.payload;
      });
      const { organization, ...rest } = state.errors;
      state.errors = rest;
    },
    changeDepartment: (state, action) => {
      const agents = ["affirma", "innosys", "biomech"] as const;
      agents.forEach((ag) => {
        state.quotationHeaders[ag].selectedOrganization.department =
          action.payload;
      });
    },
    changeQuoteType: (state, action) => {
      switch (state.agent) {
        case "affirma":
          state.quotationHeaders.affirma.quotationType = "ORIGINAL";
          state.quotationHeaders.innosys.quotationType = "DUMMY";
          state.quotationHeaders.biomech.quotationType = "DUMMY";
          break;
        case "innosys":
          state.quotationHeaders.affirma.quotationType = "DUMMY";
          state.quotationHeaders.innosys.quotationType = "ORIGINAL";
          state.quotationHeaders.biomech.quotationType = "DUMMY";
          break;
        case "biomech":
          state.quotationHeaders.affirma.quotationType = "DUMMY";
          state.quotationHeaders.innosys.quotationType = "DUMMY";
          state.quotationHeaders.biomech.quotationType = "ORIGINAL";
          break;
      }
    },
    changeTitle: (state, action) => {
      const agents = ["affirma", "innosys", "biomech"] as const;
      agents.forEach((ag) => {
        state.quotationHeaders[ag].title = action.payload;
      });
    },
    changeMarkup: (state, action) => {
      state.markup = action.payload;
    },
    reCalculatePrice: (state) => {
      state.quotationItems = generateAllQuotePrice(
        state.agent,
        state.quotationItems,
        state.markup
      );
    },
    resetQuotation: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(quotationCount.fulfilled, (state, action) => {
      state.quoteNo = action.payload;
    });
    builder.addCase(quotationItemsDetail.fulfilled, (state, action) => {
      console.log(action.payload);
      const agents = ["affirma", "innosys", "biomech"] as const;
      agents.forEach((ag) => {
        state.quotationItems[ag] = action.payload;
      });
    });
    builder.addCase(createQuotation.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createQuotation.rejected, (state, action) => {});
    builder.addCase(getProductImage.fulfilled, (state, action) => {});
  },
});

export default quotationSlice.reducer;
export const {
  changeQuotationSequal,
  changeAgent,
  changeSupportingDoc,
  changeCustomer,
  changeDate,
  changeSelectedOrganization,
  changeDepartment,
  changeQuoteType,
  changeTitle,
  changeMarkup,
  reCalculatePrice,
  resetQuotation,
} = quotationSlice.actions;
