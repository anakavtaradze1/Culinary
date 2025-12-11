import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoggedIn: false,
  pendingFavorite: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      if (
        typeof window !== "undefined" &&
        typeof localStorage !== "undefined"
      ) {
        try {
          localStorage.setItem("user", JSON.stringify(action.payload));
        } catch (error) {
          console.error("Error saving user to localStorage:", error);
        }
      }
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.pendingFavorite = null;
      if (
        typeof window !== "undefined" &&
        typeof localStorage !== "undefined"
      ) {
        try {
          localStorage.removeItem("user");
        } catch (error) {
          console.error("Error removing user from localStorage:", error);
        }
      }
    },
    setPendingFavorite: (state, action) => {
      state.pendingFavorite = action.payload;
    },
    clearPendingFavorite: (state) => {
      state.pendingFavorite = null;
    },
  },
});

export const {
  loginSuccess,
  logout,
  setPendingFavorite,
  clearPendingFavorite,
} = authSlice.actions;
export default authSlice.reducer;
