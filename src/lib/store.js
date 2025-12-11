import { configureStore } from "@reduxjs/toolkit";
import favoritesSlice from "./slices/favoriteSlice";
import authSlice from "./slices/authSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      favorites: favoritesSlice,
      auth: authSlice,
    },
  });
};
