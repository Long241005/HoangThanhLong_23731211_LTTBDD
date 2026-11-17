import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface WishlistState {
  ids: number[];
}

const initialState: WishlistState = { ids: [] };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Đã có thì bỏ ra, chưa có thì thêm vào.
    toggleWishlist(state, action: PayloadAction<number>) {
      const i = state.ids.indexOf(action.payload);
      if (i >= 0) {
        state.ids.splice(i, 1);
      } else {
        state.ids.push(action.payload);
      }
    },
    // Nạp lại yêu thích đã lưu trong AsyncStorage khi mở app (buổi 9, mục 9.8).
    setWishlistIds(state, action: PayloadAction<number[]>) {
      state.ids = action.payload;
    },
  },
});

export const { toggleWishlist, setWishlistIds } = wishlistSlice.actions;
export default wishlistSlice.reducer;
