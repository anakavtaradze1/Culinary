import Image from "next/image";
import styles from "./recipesItem.module.css";
import Link from "next/link";

export default function RecipesItem({ recipe }) {
  return (
    <Link href={`/recipes/${recipe.id}`}>
      <div className={styles.recipeCard}>
        {recipe.image && (
          <Image
            src={recipe.image}
            alt={recipe.name}
            width={400}
            height={200}
            className={styles.recipeImage}
          />
        )}

        <div className={styles.recipeContent}>
          <h3 className={styles.recipeName}>{recipe.name}</h3>

          <div className={styles.recipeInfo}>
            <span className={styles.cuisine}>{recipe.cuisine}</span>
            <span className={styles.difficulty}>{recipe.difficulty}</span>
            <span className={styles.rating}>⭐ {recipe.rating}</span>
          </div>

          <div className={styles.timeInfo}>
            <span>🕐 Prep: {recipe.prepTimeMinutes}min</span>
            <span>🍳 Cook: {recipe.cookTimeMinutes}min</span>
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
