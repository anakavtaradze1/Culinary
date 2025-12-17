import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userRecipes: [],
};

export const userRecipesSlice = createSlice({
  name: "userRecipes",
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      const newRecipe = {
        ...action.payload,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        isUserGenerated: true,
      };
      state.userRecipes.unshift(newRecipe);

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(
            "userRecipes",
            JSON.stringify(state.userRecipes)
          );
        } catch (error) {
          console.error("Error saving user recipes to localStorage:", error);
        }
      }
    },

    removeRecipe: (state, action) => {
      state.userRecipes = state.userRecipes.filter(
        (recipe) => recipe.id !== action.payload
      );

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(
            "userRecipes",
            JSON.stringify(state.userRecipes)
          );
        } catch (error) {
          console.error("Error updating user recipes in localStorage:", error);
        }
      }
    },

    loadUserRecipesFromStorage: (state, action) => {
      state.userRecipes = action.payload || [];
    },
  },
});

export const { addRecipe, removeRecipe, loadUserRecipesFromStorage } =
  userRecipesSlice.actions;

export default userRecipesSlice.reducer;
