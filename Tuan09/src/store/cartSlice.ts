import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../types";

const clamp = (q: number, stock: number): number => Math.max(1, Math.min(q, stock));

interface CartState {
  items: CartItem[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Đã có sách thì tăng số lượng, kẹp tối đa bằng stock; chưa có thì thêm mới với quantity = 1.
    addItem(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
      const found = state.items.find((i) => i.bookId === action.payload.bookId);
      if (found) {
        found.quantity = clamp(found.quantity + 1, found.stock);
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.bookId !== action.payload);
    },
    setQuantity(state, action: PayloadAction<{ bookId: number; quantity: number }>) {
      const found = state.items.find((i) => i.bookId === action.payload.bookId);
      if (found) {
        found.quantity = clamp(action.payload.quantity, found.stock);
      }
    },
    clearCart(state) {
      state.items = [];
    },
    // Nạp lại giỏ đã lưu trong AsyncStorage khi mở app (buổi 9, mục 9.8).
    setCartItems(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload.filter((i) => i.quantity >= 1);
    },
  },
});

export const { addItem, removeItem, setQuantity, clearCart, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
