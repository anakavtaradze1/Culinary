import Image from "next/image";
import styles from "./recipesItem.module.css";
import Link from "next/link";
import { Clock, ChefHat, Heart } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { addFavorite, removeFavorite } from "@/lib/slices/favoriteSlice";

export default function RecipesItem({ recipe }) {
  const dispatch = useAppDispatch();
  const favoriteItems = useAppSelector((state) => state.favorites.items);
  const isFavorite = favoriteItems.some((item) => item.id === recipe.id);

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      dispatch(removeFavorite(recipe));
    } else {
      dispatch(addFavorite(recipe));
    }
  };

  return (
    <Link href={`/recipes/${recipe.id}`}>
      <div className={styles.recipeCard}>
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
              className={styles.favoriteBtn}
              onClick={handleFavoriteToggle}
              aria-label="Toggle favorite"
            >
              <Heart
                size={20}
                className={styles.heartIcon}
                fill={isFavorite ? "currentColor" : "none"}
              />
            </button>
          </div>
        )}

        <div className={styles.recipeContent}>
          <h3 className={styles.recipeName}>{recipe.name}</h3>

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
              {recipe.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
