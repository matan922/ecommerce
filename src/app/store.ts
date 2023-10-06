import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import cartReducer from "../features/cart/cartSlice";
import productsReducer from "../features/product/productSlice";
import authReducer from "../features/auth/authSlice";


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productsReducer,
    auth: authReducer,
  
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
