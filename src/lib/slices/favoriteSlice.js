import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState: initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.items.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
