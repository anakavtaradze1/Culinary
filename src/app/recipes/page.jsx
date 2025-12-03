"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import RecipesItem from "../../components/recipesItem/recipesItem";
import styles from "./page.module.css";
import foodImage from "../assets/food.jpg";
import { Clock, BarChart3, Star, Utensils, MapPin } from "lucide-react";

export default function Recipes() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );
  const [filters, setFilters] = useState({
    cookTime: "all",
    difficulty: "all",
    rating: "all",
    mealType: "all",
    cuisine: "all",
  });
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    document.title = `Recipes Explorer`;
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    const url = new URL(window.location);
    if (searchQuery) {
      url.searchParams.set("search", searchQuery);
    } else {
      url.searchParams.delete("search");
    }
    url.searchParams.delete("page");
    window.history.replaceState({}, "", url);
  }, [searchQuery]);

  useEffect(() => {
    async function fetchAllRecipes() {
      try {
        setLoading(true);

        const response = await fetch(`https://dummyjson.com/recipes?limit=0`);
        const data = await response.json();
        setAllRecipes(data.recipes || []);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAllRecipes();
  }, []);

  if (loading) {
    return (
      <div className={styles.pageBackground}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <div className={styles.loading}>Loading delicious recipes...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.pageBackground}>
        <div className={styles.error}>
          Failed to load recipes. Please try again.
        </div>
      </div>
    );
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);

      const url = new URL(window.location);
      url.searchParams.set("page", page.toString());
      window.history.replaceState({}, "", url);

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({
      cookTime: "all",
      difficulty: "all",
      rating: "all",
      mealType: "all",
      cuisine: "all",
    });
    const url = new URL(window.location);
    url.searchParams.delete("search");
    window.history.replaceState({}, "", url);
    setCurrentPage(1);
  };

  const applyFilters = (recipes) => {
    if (!recipes || recipes.length === 0) return [];

    return recipes.filter((recipe) => {
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const recipeName = (recipe.name || "").toLowerCase();

        const matchesSearch = recipeName.includes(query);

        if (!matchesSearch) return false;
      }
      if (filters.cookTime !== "all") {
        const cookTime = recipe.cookTimeMinutes || 0;

        switch (filters.cookTime) {
          case "quick":
            if (cookTime > 15) return false;
            break;
          case "medium":
            if (cookTime < 16 || cookTime > 30) return false;
            break;
          case "long":
            if (cookTime < 31) return false;
            break;
          default:
            return false;
        }
      }

      if (filters.difficulty !== "all") {
        let recipeDifficulty = "easy";

        if (recipe.difficulty) {
          recipeDifficulty = recipe.difficulty.toLowerCase();
        } else {
          const cookTime = recipe.cookTimeMinutes || 0;
          const ingredientCount = recipe.ingredients?.length || 0;

          if (cookTime >= 60 || ingredientCount >= 10) {
            recipeDifficulty = "hard";
          } else if (cookTime >= 30 || ingredientCount >= 6) {
            recipeDifficulty = "medium";
          } else {
            recipeDifficulty = "easy";
          }
        }

        if (recipeDifficulty !== filters.difficulty) return false;
      }

      if (filters.rating !== "all") {
        const rating = parseFloat(recipe.rating) || 0;

        switch (filters.rating) {
          case "high":
            if (rating < 4.5) return false;
            break;
          case "good":
            if (rating < 4.0 || rating > 4.49) return false;
            break;
          case "average":
            if (rating >= 4.0) return false;
            break;
          default:
            return false;
        }
      }

      if (filters.mealType !== "all") {
        const recipeName = (recipe.name || "").toLowerCase();
        const tags = recipe.tags || [];
        const mealType = recipe.mealType || [];

        let mealTypeMatch = false;

        if (mealType.length > 0) {
          mealTypeMatch = mealType.some((type) =>
            type.toLowerCase().includes(filters.mealType.toLowerCase())
          );
        }

        if (!mealTypeMatch) {
          mealTypeMatch = tags.some((tag) => {
            const tagLower = tag.toLowerCase();
            switch (filters.mealType) {
              case "breakfast":
                return (
                  tagLower.includes("breakfast") ||
                  tagLower.includes("brunch") ||
                  tagLower.includes("morning")
                );
              case "lunch":
                return (
                  tagLower.includes("lunch") ||
                  tagLower.includes("appetizer") ||
                  tagLower.includes("snack")
                );
              case "dinner":
                return (
                  tagLower.includes("dinner") ||
                  tagLower.includes("main") ||
                  tagLower.includes("entree")
                );
              case "dessert":
                return (
                  tagLower.includes("dessert") ||
                  tagLower.includes("sweet") ||
                  tagLower.includes("cake") ||
                  tagLower.includes("pie")
                );
              default:
                return false;
            }
          });
        }

        if (!mealTypeMatch) {
          switch (filters.mealType) {
            case "breakfast":
              mealTypeMatch =
                recipeName.includes("pancake") ||
                recipeName.includes("waffle") ||
                recipeName.includes("omelette") ||
                recipeName.includes("cereal") ||
                recipeName.includes("toast");
              break;
            case "lunch":
              mealTypeMatch =
                recipeName.includes("salad") ||
                recipeName.includes("sandwich") ||
                recipeName.includes("wrap") ||
                recipeName.includes("soup");
              break;
            case "dinner":
              mealTypeMatch =
                recipeName.includes("pasta") ||
                recipeName.includes("steak") ||
                recipeName.includes("chicken") ||
                recipeName.includes("fish") ||
                recipeName.includes("rice") ||
                recipeName.includes("curry");
              break;
            case "dessert":
              mealTypeMatch =
                recipeName.includes("cake") ||
                recipeName.includes("cookie") ||
                recipeName.includes("chocolate") ||
                recipeName.includes("ice cream") ||
                recipeName.includes("pudding");
              break;
          }
        }

        if (!mealTypeMatch) return false;
      }

      if (filters.cuisine !== "all") {
        const cuisine = (recipe.cuisine || "").toLowerCase();

        if (cuisine !== filters.cuisine.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  };

  const filteredRecipes = applyFilters(allRecipes);
  const totalRecipes = filteredRecipes.length;
  const totalPages = Math.ceil(totalRecipes / itemsPerPage);

  const activeFiltersCount =
    Object.values(filters).filter((value) => value !== "all").length +
    (searchQuery.trim() !== "" ? 1 : 0);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageRecipes = filteredRecipes.slice(startIndex, endIndex);

  return (
    <div className={styles.pageBackground}>
      <div className={styles.heroSection}>
        <Image
          src={foodImage}
          alt="Delicious food"
          fill
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}>
          <div>
            <h1 className={styles.heroTitle}>Explore</h1>
            <h1 className={styles.heroSubtitle}>
              <span className={styles.culinary}>Culinary</span> Insights
            </h1>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.titleSortWrapper}>
          <h1 className={styles.title}>
            What to <span className={styles.culinary}>Cook</span>?
          </h1>

          <div className={styles.advancedFilterContainer}>
            <button
              className={styles.filterToggle}
              onClick={() => setShowFilters(!showFilters)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4.25 5.61C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.73-4.8 5.75-7.39c.51-.66.04-1.61-.79-1.61H5.04c-.83 0-1.3.95-.79 1.61z" />
              </svg>
              Advanced Filters
              {activeFiltersCount > 0 && (
                <span className={styles.filterBadge}>{activeFiltersCount}</span>
              )}
            </button>

            {activeFiltersCount > 0 && (
              <button className={styles.clearFilters} onClick={clearAllFilters}>
                Clear All
              </button>
            )}
          </div>
        </div>

        {showFilters && (
          <div className={styles.filterSection}>
            <div className={styles.filterGrid}>
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>
                  <Clock size={16} /> Cook Time
                </label>
                <select
                  value={filters.cookTime}
                  onChange={(e) =>
                    handleFilterChange("cookTime", e.target.value)
                  }
                  className={styles.filterSelect}
                >
                  <option value="all">Any Duration</option>
                  <option value="quick">Quick (≤ 15 min)</option>
                  <option value="medium">Medium (16-30 min)</option>
                  <option value="long">Long (30+ min)</option>
                </select>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>
                  <BarChart3 size={16} /> Difficulty
                </label>
                <select
                  value={filters.difficulty}
                  onChange={(e) =>
                    handleFilterChange("difficulty", e.target.value)
                  }
                  className={styles.filterSelect}
                >
                  <option value="all">Any Level</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>
                  <Star size={16} /> Rating
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) => handleFilterChange("rating", e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="all">Any Rating</option>
                  <option value="high">Excellent (4.5+)</option>
                  <option value="good">Good (4.0-4.4)</option>
                  <option value="average">Average (&lt; 4.0)</option>
                </select>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>
                  <Utensils size={16} /> Meal Type
                </label>
                <select
                  value={filters.mealType}
                  onChange={(e) =>
                    handleFilterChange("mealType", e.target.value)
                  }
                  className={styles.filterSelect}
                >
                  <option value="all">Any Meal</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="dessert">Dessert</option>
                </select>
              </div>

              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>
                  <MapPin size={16} /> Cuisine
                </label>
                <select
                  value={filters.cuisine}
                  onChange={(e) =>
                    handleFilterChange("cuisine", e.target.value)
                  }
                  className={styles.filterSelect}
                >
                  <option value="all">Any Cuisine</option>
                  <option value="italian">Italian</option>
                  <option value="asian">Asian</option>
                  <option value="indian">Indian</option>
                  <option value="korean">Korean</option>
                  <option value="pakistani">Pakistani</option>
                  <option value="american">American</option>
                  <option value="mexican">Mexican</option>
                  <option value="mediterranean">Mediterranean</option>
                </select>
              </div>
            </div>

            {(filteredRecipes.length !== allRecipes.length ||
              activeFiltersCount > 0) && (
              <div className={styles.filterResults}>
                Showing {totalRecipes} of {allRecipes.length} recipes
                {activeFiltersCount > 0 &&
                  ` (${activeFiltersCount} filter${
                    activeFiltersCount > 1 ? "s" : ""
                  } applied)`}
              </div>
            )}
          </div>
        )}

        <div className={styles.recipesGrid}>
          {currentPageRecipes.map((recipe) => (
            <RecipesItem key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={`${styles.pageButton} ${
                currentPage === 1 ? styles.disabled : ""
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {getPageNumbers().map((page) => (
              <button
                key={page}
                className={`${styles.pageButton} ${
                  currentPage === page ? styles.active : ""
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}

            <button
              className={`${styles.pageButton} ${
                currentPage === totalPages ? styles.disabled : ""
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
