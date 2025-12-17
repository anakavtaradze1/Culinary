import { configureStore } from "@reduxjs/toolkit";
import favoritesSlice from "./slices/favoriteSlice";
import authSlice from "./slices/authSlice";
import mealPlanSlice from "./slices/mealPlanSlice";
import userRecipesSlice from "./slices/userRecipesSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      favorites: favoritesSlice,
      auth: authSlice,
      mealPlan: mealPlanSlice,
      userRecipes: userRecipesSlice,
    },
  });
};
