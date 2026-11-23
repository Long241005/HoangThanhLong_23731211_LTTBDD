import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";

interface FavoritesState {
  ids: string[];
}

const initialState: FavoritesState = { ids: [] };

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      const index = state.ids.indexOf(action.payload);
      if (index >= 0) state.ids.splice(index, 1); // có rồi thì bỏ ra
      else state.ids.push(action.payload); // chưa có thì thêm vào
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export const selectFavoriteIds = (s: RootState) => s.favorites.ids;
// Selector trả về selector: nhận id, trả về hàm đọc state
export const selectIsFavorite = (id: string) => (s: RootState) =>
  s.favorites.ids.includes(id);

export default favoritesSlice.reducer;
