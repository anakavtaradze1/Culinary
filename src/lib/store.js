import { configureStore } from "@reduxjs/toolkit";
import favoritesSlice from "./slices/favoriteSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      favorites: favoritesSlice,
    },
  });
};
