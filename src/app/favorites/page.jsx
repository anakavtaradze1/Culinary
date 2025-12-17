"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { removeFavorite } from "@/lib/slices/favoriteSlice";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Image from "next/image";
import Link from "next/link";
import { Clock, ChefHat, Heart, Trash2 } from "lucide-react";
import { FaStar } from "react-icons/fa";
import styles from "./page.module.css";

function FavoritesPage() {
  const dispatch = useAppDispatch();
  const favoriteItems = useAppSelector((state) => state.favorites.items);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    document.title = "My Favorites - Culinary Delights";
  }, []);

  const handleRemoveFavorite = (recipe) => {
    dispatch(removeFavorite({ recipe, userId: user?.id }));
  };

  if (favoriteItems.length === 0) {
    return (
      <ProtectedRoute>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>My Favorite Recipes</h1>
          </div>
          <div className={styles.emptyState}>
            <Heart size={64} className={styles.emptyIcon} />
            <h2>No favorites yet!</h2>
            <p>Start adding recipes to your favorites to see them here.</p>
            <Link href="/recipes" className={styles.browseButton}>
              Browse Recipes
            </Link>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Favorite Recipes</h1>
          <p className={styles.subtitle}>
            You have {favoriteItems.length} favorite recipe
            {favoriteItems.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className={styles.recipesGrid}>
          {favoriteItems.map((recipe) => (
            <div key={recipe.id} className={styles.recipeCard}>
              {recipe.image && (
                <div className={styles.imageContainer}>
                  <Image
                    src={recipe.image}
                    alt={recipe.name}
                    width={400}
                    height={250}
                    className={styles.recipeImage}
                  />
                  <button
                    className={styles.removeBtn}
                    onClick={() => handleRemoveFavorite(recipe)}
                    aria-label="Remove from favorites"
                    title="Remove from favorites"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              )}

              <div className={styles.recipeContent}>
                <Link href={`/recipes/${recipe.id}`}>
                  <h3 className={styles.recipeName}>{recipe.name}</h3>
                </Link>

                <div className={styles.recipeInfo}>
                  <span className={styles.cuisine}>{recipe.cuisine}</span>
                  <span className={styles.difficulty}>{recipe.difficulty}</span>
                  <span className={styles.rating}>
                    <FaStar className={styles.starIcon} /> {recipe.rating}
                  </span>
                </div>

                <div className={styles.timeInfo}>
                  <span className={styles.timeItem}>
                    <Clock size={16} className={styles.timeIcon} /> Prep:{" "}
                    {recipe.prepTimeMinutes}min
                  </span>
                  <span className={styles.timeItem}>
                    <ChefHat size={17} className={styles.timeIcon} /> Cook:{" "}
                    {recipe.cookTimeMinutes}min
                  </span>
                </div>

                {recipe.tags && recipe.tags.length > 0 && (
                  <div className={styles.tags}>
                    {recipe.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                    {recipe.tags.length > 3 && (
                      <span className={styles.tag}>
                        +{recipe.tags.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                <div className={styles.actions}>
                  <Link
                    href={`/recipes/${recipe.id}`}
                    className={styles.viewButton}
                  >
                    View Recipe
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default FavoritesPage;
