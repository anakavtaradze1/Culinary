import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weeklyPlan: {
    monday: { breakfast: null, lunch: null, dinner: null },
    tuesday: { breakfast: null, lunch: null, dinner: null },
    wednesday: { breakfast: null, lunch: null, dinner: null },
    thursday: { breakfast: null, lunch: null, dinner: null },
    friday: { breakfast: null, lunch: null, dinner: null },
    saturday: { breakfast: null, lunch: null, dinner: null },
    sunday: { breakfast: null, lunch: null, dinner: null },
  },
  currentWeek: null,
};

const getMealPlanKey = (userId, weekDate) => {
  return userId
    ? `mealPlan_${userId}_${weekDate}`
    : `mealPlan_guest_${weekDate}`;
};

export const mealPlanSlice = createSlice({
  name: "mealPlan",
  initialState,
  reducers: {
    addMealToPlan: (state, action) => {
      const { day, mealType, recipe, userId } = action.payload;
      if (state.weeklyPlan[day] && recipe) {
        state.weeklyPlan[day][mealType] = recipe;

        if (
          typeof window !== "undefined" &&
          typeof localStorage !== "undefined"
        ) {
          try {
            const key = getMealPlanKey(userId, state.currentWeek);
            localStorage.setItem(key, JSON.stringify(state.weeklyPlan));
          } catch (error) {
            console.error("Error saving meal plan:", error);
          }
        }
      }
    },

    removeMealFromPlan: (state, action) => {
      const { day, mealType, userId } = action.payload;
      if (state.weeklyPlan[day]) {
        state.weeklyPlan[day][mealType] = null;

        if (
          typeof window !== "undefined" &&
          typeof localStorage !== "undefined"
        ) {
          try {
            const key = getMealPlanKey(userId, state.currentWeek);
            localStorage.setItem(key, JSON.stringify(state.weeklyPlan));
          } catch (error) {
            console.error("Error saving meal plan:", error);
          }
        }
      }
    },

    setCurrentWeek: (state, action) => {
      state.currentWeek = action.payload;
    },

    loadMealPlan: (state, action) => {
      const { userId, weekDate } = action.payload;
      if (
        typeof window !== "undefined" &&
        typeof localStorage !== "undefined"
      ) {
        try {
          const planKey = getMealPlanKey(userId, weekDate);

          const savedPlan = localStorage.getItem(planKey);

          if (savedPlan) {
            state.weeklyPlan = JSON.parse(savedPlan);
          } else {
            state.weeklyPlan = initialState.weeklyPlan;
          }

          state.currentWeek = weekDate;
        } catch (error) {
          console.error("Error loading meal plan:", error);
        }
      }
    },

    clearWeekPlan: (state, action) => {
      const { userId } = action.payload || {};
      state.weeklyPlan = initialState.weeklyPlan;

      if (
        typeof window !== "undefined" &&
        typeof localStorage !== "undefined"
      ) {
        try {
          const planKey = getMealPlanKey(userId, state.currentWeek);
          localStorage.removeItem(planKey);
        } catch (error) {
          console.error("Error clearing meal plan:", error);
        }
      }
    },
  },
});

export const {
  addMealToPlan,
  removeMealFromPlan,
  setCurrentWeek,
  loadMealPlan,

  clearWeekPlan,
} = mealPlanSlice.actions;

export default mealPlanSlice.reducer;
