import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { boolean } from "zod";

interface MDA {
  loading: boolean;
  data: {
    productCode: string;
    mdaRegistrationNo: string;
    mdaPageNo: number;
    mdaFile: string;
  }[];
  error: string;
}

const initialState: MDA = {
  loading: false,
  data: [
    {
      productCode: "",
      mdaRegistrationNo: "",
      mdaPageNo: 0,
      mdaFile: "",
    },
  ],
  error: "",
};

export const mdaProducts = createAsyncThunk(
  "mdaProduct/mdaProducts",
  async (productCodes: string, thunkAPI) => {
    try {
      const response = await axios.post(`/api/mda-products`, { productCodes });
      return response.data;
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || "Unknown error";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const mdaProductSlice = createSlice({
  name: "mdaProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(mdaProducts.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default mdaProductSlice.reducer;
