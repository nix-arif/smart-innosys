import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Organization {
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

export interface Customer {
  id?: string;
  title: string;
  fullname: string;
}

interface CustomerState {
  loading: boolean;
  customer: Customer;
  customers: Customer[];
  customerOrganizations: Organization[];
  organizationsByCustomerId: Organization[];
  error: string;
}

const initialState: CustomerState = {
  loading: false,
  customer: {
    title: "",
    fullname: "",
  },
  customers: [],
  customerOrganizations: [],
  organizationsByCustomerId: [],
  error: "",
};

export const createCustomer = createAsyncThunk(
  "customer/createCustomer",
  async (customer: Customer, thunkAPI) => {
    try {
      const response = await axios.post(`/api/customer/customerName`, customer);
      return response.data as Customer;
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCustomers = createAsyncThunk(
  "customer/getCustomer",
  async () => {
    try {
      const response = await axios.get("/api/customer/customerName");
      return response.data.customers as Customer[];
    } catch (err: any) {
      console.log(err);
    }
  }
);

export const getCustomerOrganizations = createAsyncThunk(
  "customer/getCustomerOrganizations",
  async () => {
    try {
      const response = await axios.get("/api/customer/customerOrganization");
      return response.data.customerOrganizations;
    } catch (err: any) {}
  }
);

export const getCustomerOrganizationByCustomerId = createAsyncThunk(
  "customer/getCustomerOrganizationByCustomerId",
  async (id: string) => {
    try {
      const response = await axios.get(
        `/api/customer/customerOrganizationByCustomerId?customerId=${id}`
      );
      return response.data.organizationsByCustomerId;
    } catch (err: any) {}
  }
);

export const createRelationshipCustomerAndCustomeOrganization =
  createAsyncThunk(
    "customer/createRelationshipCustomerAndCustomeOrganization",
    async (dataId: { customerId: string; organizationId: string }) => {
      const response = await axios.post(
        "/api/customer/customerOrganizationRelationship",
        dataId
      );
      return response.data;
    }
  );

export const createOrganization = createAsyncThunk(
  "customer/createCustomerOrganization",
  async (organizationData: Organization, thunkAPI) => {
    try {
      const response = await axios.post(
        "/api/customer/customerOrganization",
        organizationData
      );
      return response.data;
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.error || "Unexpected server error";
        return thunkAPI.rejectWithValue(message);
      }
      return thunkAPI.rejectWithValue("Unknown error occurred");
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createCustomer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCustomer.fulfilled, (state, action) => {
      state.loading = false;
      state.customer = action.payload;
      state.error = "";
    });
    builder.addCase(createCustomer.rejected, (state, action) => {
      state.loading = false;
      state.customer = { title: "", fullname: "" };
      state.error =
        (action.payload as string) ||
        action.error.message ||
        "Failed to create customer";
    });
    builder.addCase(getCustomers.fulfilled, (state, action) => {
      state.customers = action.payload || [];
    });
    builder.addCase(getCustomerOrganizations.fulfilled, (state, action) => {
      state.customerOrganizations = action.payload || [];
    });
    builder.addCase(createOrganization.fulfilled, (state, action) => {
      console.log("Action.payload", action.payload);
    });
    builder.addCase(
      createRelationshipCustomerAndCustomeOrganization.fulfilled,
      (state, action) => {
        console.log("Action.payload", action.payload);
      }
    );
    builder.addCase(
      getCustomerOrganizationByCustomerId.fulfilled,
      (state, action) => {
        state.organizationsByCustomerId = action.payload;
      }
    );
  },
  reducers: {},
});

export default customerSlice.reducer;
