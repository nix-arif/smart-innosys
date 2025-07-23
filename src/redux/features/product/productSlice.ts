import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Product {
  productCode: string;
  description: string;
  oum: string;
  unitPrice: number;
  mdaProduct?: string;
}

const initialState: Product = {
  productCode: "",
  description: "",
  oum: "",
  unitPrice: 0,
  mdaProduct: "",
};

export const getSingleProductDetail = createAsyncThunk(
  "product/getSingleProductDetail",
  async (productCode: string, thunkAPI) => {
    try {
      const response = await axios.post(`/api/product/single-product`, {
        productCode,
      });

      return response.data.product;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSingleProductDetail.fulfilled, (state, action) => {
      state.productCode = action.payload.productCode;
      state.description = action.payload.description;
      state.oum = action.payload.oum;
      state.unitPrice = action.payload.unitPrice;
    });
  },
});

export default productSlice.reducer;
