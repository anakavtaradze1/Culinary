"use client";

import { useEffect, useState } from "react";
import RecipesItem from "../../components/recipesItem/recipesItem";
import styles from "./page.module.css";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch("https://dummyjson.com/recipes");
        const data = await response.json();
        setRecipes(data.recipes || []);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <div className={styles.loading}>Loading delicious recipes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className={styles.error}>Error loading recipes: {error}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recipes ({recipes.length})</h1>
      <div className={styles.recipesGrid}>
        {recipes.map((recipe) => (
          <RecipesItem key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
