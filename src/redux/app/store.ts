import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../features/customer/customerSlice";
import quotationAffirmaReducer from "../features/quotation/quotationAffirmaSlice";
import quotationInnosysReducer from "../features/quotation/quotationInnosysSlice";

const store = configureStore({
  reducer: {
    customer: customerReducer,
    quotationAffirma: quotationAffirmaReducer,
    quotationInnosys: quotationInnosysReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
