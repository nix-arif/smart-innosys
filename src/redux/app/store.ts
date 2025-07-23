import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import customerReducer from "../features/customer/customerSlice";
import quotationReducer from "../features/quotation/quotationSlice";
import productReducer from "../features/product/productSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    customer: customerReducer,
    quotation: quotationReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
