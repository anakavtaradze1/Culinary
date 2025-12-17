"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import RecipesDetails from "../../../components/recipeDetails/recipeDetails";
import styles from "./page.module.css";

export default function Recipepage() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const { userRecipes } = useSelector((state) => state.userRecipes);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const userRecipe = userRecipes.find(
          (recipe) => recipe.id.toString() === params.id
        );

        if (userRecipe) {
          setRecipe(userRecipe);
          document.title = `${userRecipe.name}`;
          setLoading(false);
          return;
        }

        const res = await fetch(`https://dummyjson.com/recipes/${params.id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setRecipe(data);
        document.title = `${data.name}`;
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setError(error.message);
        document.title = "Recipe Not Found";
      } finally {
        setLoading(false);
      }
    };

    if (typeof window !== "undefined" && userRecipes.length === 0) {
      try {
        const savedRecipes = localStorage.getItem("userRecipes");
        if (savedRecipes) {
          const parsedRecipes = JSON.parse(savedRecipes);
          const userRecipe = parsedRecipes.find(
            (recipe) => recipe.id.toString() === params.id
          );
          if (userRecipe) {
            setRecipe(userRecipe);
            document.title = `${userRecipe.name}`;
            setLoading(false);
            return;
          }
        }
      } catch (error) {
        console.error("Error loading user recipes from localStorage:", error);
      }
    }

    if (params.id) {
      fetchData();
    }
  }, [params.id, userRecipes]);

  if (loading) {
    return (
      <div className={styles.pageBackground}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <div className={styles.loading}>Loading recipe...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.pageBackground}>
        <div className={styles.error}>
          Failed to load recipe. Please try again.
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className={styles.pageBackground}>
        <div className={styles.notFound}>Recipe not found</div>
      </div>
    );
  }

  return (
    <div className={styles.pageBackground}>
      <RecipesDetails details={recipe} />
    </div>
  );
}
