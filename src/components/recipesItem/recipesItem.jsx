import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./recipesItem.module.css";
import Link from "next/link";
import { Clock, ChefHat, Heart, Trash2 } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { addFavorite, removeFavorite } from "@/lib/slices/favoriteSlice";
import { setPendingFavorite } from "@/lib/slices/authSlice";
import { removeRecipe } from "@/lib/slices/userRecipesSlice";

export default function RecipesItem({ recipe }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const favoriteItems = useAppSelector((state) => state.favorites.items);
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);
  const isFavorite = favoriteItems.some((item) => item.id === recipe.id);

  const isOwner =
    recipe.isUserGenerated && recipe.createdBy === (user?.id || user?.email);

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      dispatch(setPendingFavorite(recipe));
      router.push("/login");
      return;
    }

    if (isFavorite) {
      dispatch(removeFavorite({ recipe, userId: user?.id }));
    } else {
      dispatch(addFavorite({ recipe, userId: user?.id }));
    }
  };

  const handleDeleteRecipe = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      window.confirm(
        `Are you sure you want to delete "${recipe.name}"? This action cannot be undone.`
      )
    ) {
      dispatch(removeRecipe(recipe.id));
    }
  };

  return (
    <Link href={`/recipes/${recipe.id}`}>
      <div className={styles.recipeCard}>
        <div className={styles.imageContainer}>
          {recipe.image ? (
            <Image
              src={recipe.image}
              alt={recipe.name}
              width={400}
              height={250}
              className={styles.recipeImage}
            />
          ) : (
            <div className={styles.noImagePlaceholder}>
              <ChefHat size={60} className={styles.placeholderIcon} />
              <span className={styles.placeholderText}>{recipe.name}</span>
            </div>
          )}
          {isOwner && (
            <button
              className={styles.deleteBtn}
              onClick={handleDeleteRecipe}
              aria-label="Delete recipe"
            >
              <Trash2 size={18} className={styles.deleteIcon} />
            </button>
          )}
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

        <div className={styles.recipeContent}>
          <h3 className={styles.recipeName}>{recipe.name}</h3>

          <div className={styles.recipeInfo}>
            {recipe.cuisine && (
              <span className={styles.cuisine}>{recipe.cuisine}</span>
            )}
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
