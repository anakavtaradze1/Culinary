import styles from "./recipeDetails.module.css";
import { useState } from "react";
import Image from "next/image";

import {
  FaUtensils,
  FaFire,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";
import { Clock, ChefHat, Flame, Users, Timer } from "lucide-react";

export default function RecipesDetails({ details }) {
  const [activeTab, setActiveTab] = useState("ingredients");

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className={styles.starFilled} />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className={styles.starHalf} />);
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className={styles.starEmpty} />);
    }
    return stars;
  };

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.imageContainer}>
          <Image
            src={details.image}
            alt={details.name}
            className={styles.heroImage}
            width={600}
            height={600}
          />
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.title}>{details.name}</h1>

          <div className={styles.tags}>
            {details.tags?.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>

          <div className={styles.ratingSection}>
            <div className={styles.starsContainer}>
              {renderStars(details.rating)}
            </div>
            <span className={styles.ratingInfo}>
              {details.rating} ({details.reviewCount} reviews)
            </span>
          </div>

          <div className={styles.quickInfo}>
            <div className={styles.infoItem}>
              <span className={styles.icon}>
                <ChefHat size={20} className={styles.iconSvg} />
              </span>
              <div>
                <span className={styles.infoLabel}>Difficulty</span>
                <span className={styles.infoValue}>{details.difficulty}</span>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.icon}>
                <FaUtensils size={18} className={styles.iconSvg} />
              </span>
              <div>
                <span className={styles.infoLabel}>Cuisine</span>
                <span className={styles.infoValue}>{details.cuisine}</span>
              </div>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.icon}>
                <Flame size={20} className={styles.iconSvg} />
              </span>
              <div>
                <span className={styles.infoLabel}>Calories</span>
                <span className={styles.infoValue}>
                  {details.caloriesPerServing}/serving
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.timeBar}>
        <div className={styles.timeInfo}>
          <div className={styles.timeItem}>
            <span className={styles.timeIcon}>
              <Clock size={20} />
            </span>
            <div className={styles.timeDetails}>
              <span className={styles.timeLabel}>Prep Time</span>
              <span className={styles.timeValue}>
                {details.prepTimeMinutes} min
              </span>
            </div>
          </div>

          <div className={styles.timeItem}>
            <span className={styles.timeIcon}>
              <ChefHat size={20} />
            </span>
            <div className={styles.timeDetails}>
              <span className={styles.timeLabel}>Cook Time</span>
              <span className={styles.timeValue}>
                {details.cookTimeMinutes} min
              </span>
            </div>
          </div>

          <div className={styles.timeItem}>
            <span className={styles.timeIcon}>
              <Timer size={20} />
            </span>
            <div className={styles.timeDetails}>
              <span className={styles.timeLabel}>Total</span>
              <span className={styles.timeValue}>
                {details.prepTimeMinutes + details.cookTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.tabNav}>
          <button
            className={`${styles.tab} ${
              activeTab === "ingredients" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "instructions" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </button>
          <button
            className={`${styles.tab} ${
              activeTab === "nutrition" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("nutrition")}
          >
            Nutrition
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === "ingredients" && (
            <div className={styles.ingredientsSection}>
              <h2 className={styles.sectionTitle}>Ingredients</h2>
              <ul className={styles.ingredientsList}>
                {details.ingredients?.map((ingredient, index) => (
                  <li key={index} className={styles.ingredientItem}>
                    <span className={styles.ingredientBullet}>•</span>
                    <span className={styles.ingredientText}>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "instructions" && (
            <div className={styles.instructionsSection}>
              <h2 className={styles.sectionTitle}>Instructions</h2>
              <ol className={styles.instructionsList}>
                {details.instructions?.map((instruction, index) => (
                  <li key={index} className={styles.instructionItem}>
                    <span className={styles.stepNumber}>{index + 1}</span>
                    <span className={styles.instructionText}>
                      {instruction}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {activeTab === "nutrition" && (
            <div className={styles.nutritionSection}>
              <h2 className={styles.sectionTitle}>Nutrition Information</h2>
              <div className={styles.nutritionGrid}>
                <div className={styles.nutritionCard}>
                  <span className={styles.nutritionIcon}>
                    <FaFire size={24} className={styles.nutritionIconSvg} />
                  </span>
                  <div className={styles.nutritionInfo}>
                    <span className={styles.nutritionValue}>
                      {details.caloriesPerServing}
                    </span>
                    <span className={styles.nutritionLabel}>Calories</span>
                  </div>
                </div>

                <div className={styles.nutritionCard}>
                  <span className={styles.nutritionIcon}>
                    <Users size={24} className={styles.nutritionIconSvg} />
                  </span>
                  <div className={styles.nutritionInfo}>
                    <span className={styles.nutritionValue}>
                      {details.servings}
                    </span>
                    <span className={styles.nutritionLabel}>Servings</span>
                  </div>
                </div>

                <div className={styles.nutritionCard}>
                  <span className={styles.nutritionIcon}>
                    <Clock size={24} className={styles.nutritionIconSvg} />
                  </span>
                  <div className={styles.nutritionInfo}>
                    <span className={styles.nutritionValue}>
                      {details.prepTimeMinutes + details.cookTimeMinutes}
                    </span>
                    <span className={styles.nutritionLabel}>Total Minutes</span>
                  </div>
                </div>

                <div className={styles.nutritionCard}>
                  <span className={styles.nutritionIcon}>
                    <FaUtensils size={22} className={styles.nutritionIconSvg} />
                  </span>
                  <div className={styles.nutritionInfo}>
                    <span className={styles.nutritionValue}>
                      {details.cuisine}
                    </span>
                    <span className={styles.nutritionLabel}>Cuisine Type</span>
                  </div>
                </div>
              </div>

              {details.mealType && (
                <div className={styles.mealTypes}>
                  <h3 className={styles.mealTypesTitle}>Meal Types</h3>
                  <div className={styles.mealTypesList}>
                    {details.mealType.map((type, index) => (
                      <span key={index} className={styles.mealTypeTag}>
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
