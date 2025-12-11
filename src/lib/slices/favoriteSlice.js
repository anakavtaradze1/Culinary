import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const getUserFavoritesKey = (userId) => {
  return userId ? `favorites_${userId}` : "favorites_guest";
};

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState: initialState,
  reducers: {
    addFavorite: (state, action) => {
      const { recipe, userId } = action.payload || {};
      if (!recipe || !recipe.id) {
        console.error("Invalid recipe data in addFavorite:", action.payload);
        return;
      }

      const existingRecipe = state.items.find((item) => item.id === recipe.id);
      if (existingRecipe) {
        console.log("Recipe already in favorites:", recipe.name);
        return;
      }

      state.items.push(recipe);
      if (
        typeof window !== "undefined" &&
        typeof localStorage !== "undefined"
      ) {
        try {
          const key = getUserFavoritesKey(userId);
          localStorage.setItem(key, JSON.stringify(state.items));
        } catch (error) {
          console.error("Error saving to localStorage:", error);
        }
      }
    },
    removeFavorite: (state, action) => {
      const { recipe, userId } = action.payload || {};
      if (!recipe || !recipe.id) {
        console.error("Invalid recipe data in removeFavorite:", action.payload);
        return;
      }
      state.items = state.items.filter((item) => item.id !== recipe.id);
      if (
        typeof window !== "undefined" &&
        typeof localStorage !== "undefined"
      ) {
        try {
          const key = getUserFavoritesKey(userId);
          localStorage.setItem(key, JSON.stringify(state.items));
        } catch (error) {
          console.error("Error saving to localStorage:", error);
        }
      }
    },
    loadFavorites: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, loadFavorites } =
  favoriteSlice.actions;
export { getUserFavoritesKey };
export default favoriteSlice.reducer;
