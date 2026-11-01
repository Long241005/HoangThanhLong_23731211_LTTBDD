import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import cart from "./cartSlice";
import wishlist from "./wishlistSlice";

export const store = configureStore({ reducer: { cart, auth, wishlist } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
