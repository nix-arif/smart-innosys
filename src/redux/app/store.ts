import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import customerReducer from "../features/customer/customerSlice";
import quotationReducer from "../features/quotation/quotationSlice";
import quotationAffirmaReducer from "../features/quotation/quotationAffirmaSlice";
import quotationInnosysReducer from "../features/quotation/quotationInnosysSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    customer: customerReducer,
    quotation: quotationReducer,
    // quotationAffirma: quotationAffirmaReducer,
    // quotationInnosys: quotationInnosysReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
