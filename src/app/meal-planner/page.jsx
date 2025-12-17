"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ChefHat,
  Plus,
  Trash2,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import {
  addMealToPlan,
  removeMealFromPlan,
  setCurrentWeek,
  loadMealPlan,
  clearWeekPlan,
} from "../../lib/slices/mealPlanSlice";
import styles from "./page.module.css";

const getStartOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
};

const formatWeekKey = (date) => {
  return `${date.getFullYear()}-W${getWeekNumber(date)}`;
};

const getWeekNumber = (date) => {
  const start = new Date(date.getFullYear(), 0, 1);
  return Math.ceil((date - start) / (7 * 24 * 60 * 60 * 1000));
};

export default function MealPlanner() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { weeklyPlan } = useSelector((state) => state.mealPlan);

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(null);

  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const mealTypes = ["breakfast", "lunch", "dinner"];

  useEffect(() => {
    document.title = "Meal Planner - Plan Your Week";
  }, []);

  useEffect(() => {
    const today = new Date();
    const startOfWeek = getStartOfWeek(today);
    const weekKey = formatWeekKey(startOfWeek);
    setCurrentWeekStart(startOfWeek);
    dispatch(setCurrentWeek(weekKey));
    dispatch(loadMealPlan({ userId: user?.id, weekDate: weekKey }));
  }, [dispatch, user]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const formatWeekDisplay = (startDate) => {
    if (!startDate) return "";
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    return `${startDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} - ${endDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;
  };

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/recipes?limit=50");
      const data = await response.json();
      setRecipes(data.recipes || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const navigateWeek = (direction) => {
    if (!currentWeekStart) return;

    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + direction * 7);
    const weekKey = formatWeekKey(newDate);

    setCurrentWeekStart(newDate);
    dispatch(setCurrentWeek(weekKey));
    dispatch(loadMealPlan({ userId: user?.id, weekDate: weekKey }));
  };

  const handleAddMeal = (day, mealType) => {
    setSelectedSlot({ day, mealType });
    setShowRecipeModal(true);
  };

  const handleSelectRecipe = (recipe) => {
    if (selectedSlot) {
      dispatch(
        addMealToPlan({
          day: selectedSlot.day,
          mealType: selectedSlot.mealType,
          recipe,
          userId: user?.id,
        })
      );
      setShowRecipeModal(false);
      setSelectedSlot(null);
    }
  };

  const handleRemoveMeal = (day, mealType, e) => {
    e.stopPropagation();
    dispatch(removeMealFromPlan({ day, mealType, userId: user?.id }));
  };

  const handleClearWeek = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all planned meals for this week?"
      )
    ) {
      dispatch(clearWeekPlan({ userId: user?.id }));
    }
  };

  const getMealsByType = (mealType) => {
    if (mealType === "breakfast") {
      return recipes.filter((recipe) => recipe.prepTimeMinutes <= 20);
    } else if (mealType === "lunch") {
      return recipes.filter((recipe) => recipe.prepTimeMinutes <= 35);
    } else {
      return recipes;
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <ChefHat size={48} />
        <p>Loading your meal planner...</p>
      </div>
    );
  }

  return (
    <div className={styles.mealPlanner}>
      <div className={styles.header}>
        <h1 className={styles.title}>Weekly Meal Planner</h1>
        <p className={styles.subtitle}>
          Plan your meals for the week and stay organized
        </p>
      </div>

      <div className={styles.weekNavigation}>
        <div className={styles.weekSelector}>
          <button
            className={styles.weekButton}
            onClick={() => navigateWeek(-1)}
          >
            <ChevronLeft size={18} />
            Previous Week
          </button>
          <span className={styles.currentWeekText}>
            {formatWeekDisplay(currentWeekStart)}
          </span>
          <button className={styles.weekButton} onClick={() => navigateWeek(1)}>
            Next Week
            <ChevronRight size={18} />
          </button>
        </div>
        <div className={styles.actionButtons}>
          <button className={styles.clearButton} onClick={handleClearWeek}>
            <Trash2 size={18} />
            Clear Week
          </button>
        </div>
      </div>

      <div className={styles.planGrid}>
        {daysOfWeek.map((day) => (
          <div key={day} className={styles.dayColumn}>
            <div className={styles.dayHeader}>{day}</div>
            {mealTypes.map((mealType) => {
              const meal = weeklyPlan[day]?.[mealType];
              return (
                <div
                  key={`${day}-${mealType}`}
                  className={`${styles.mealSlot} ${meal ? styles.filled : ""}`}
                  onClick={() => !meal && handleAddMeal(day, mealType)}
                >
                  <div className={styles.mealType}>{mealType}</div>
                  {meal ? (
                    <div className={styles.mealCard}>
                      <div className={styles.mealName}>{meal.name}</div>
                      <div className={styles.mealInfo}>
                        <span>
                          <Clock size={12} /> {meal.prepTimeMinutes}min
                        </span>
                        <span>
                          <Star size={12} /> {meal.rating}
                        </span>
                      </div>
                      <button
                        className={styles.removeButton}
                        onClick={(e) => handleRemoveMeal(day, mealType, e)}
                      >
                        <X size={12} />
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className={styles.addMealText}>
                      <Plus size={16} />
                      <br />
                      Add {mealType}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {showRecipeModal && (
        <div
          className={styles.recipeModal}
          onClick={() => setShowRecipeModal(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                Choose a {selectedSlot?.mealType} recipe
              </h3>
              <button
                className={styles.closeButton}
                onClick={() => setShowRecipeModal(false)}
              >
                <X size={24} />
              </button>
            </div>
            <div className={styles.recipeGrid}>
              {getMealsByType(selectedSlot?.mealType).map((recipe) => (
                <div
                  key={recipe.id}
                  className={styles.recipeOption}
                  onClick={() => handleSelectRecipe(recipe)}
                >
                  <div className={styles.recipeOptionName}>{recipe.name}</div>
                  <div className={styles.recipeOptionInfo}>
                    <span>
                      <Clock size={14} /> {recipe.prepTimeMinutes}min
                    </span>
                    <span>
                      <Star size={14} /> {recipe.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {getMealsByType(selectedSlot?.mealType).length === 0 && (
              <div className={styles.emptyState}>
                <p>No recipes found for this meal type.</p>
                <p>Try adding some recipes or check back later!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
