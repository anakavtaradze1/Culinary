"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Heart,
  Clock,
  BookOpen,
  Leaf,
  Sun,
  Coffee,
  Calendar,
} from "lucide-react";
import styles from "./page.module.css";
import foodImage from "./assets/food3.jpg";

export default function Home() {
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Culinary Delights - Where Every Meal Becomes a Memory";
  }, []);

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        const response = await fetch("https://dummyjson.com/recipes?limit=12");
        const data = await response.json();

        if (data.recipes && data.recipes.length > 0) {
          const sortedRecipes = [...data.recipes].sort(
            (a, b) => b.rating - a.rating
          );
          setPopularRecipes(sortedRecipes.slice(0, 6));
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, []);

  const inspirations = [
    {
      title: "Morning Delights",
      subtitle: "Start your day with love",
      description:
        "Gentle breakfast recipes that warm the heart and energize the soul",
      icon: Sun,
    },
    {
      title: "Comfort & Care",
      subtitle: "Nourish your loved ones",
      description:
        "Soul-warming dishes that bring families together around the table",
      icon: Heart,
    },
    {
      title: "Fresh & Light",
      subtitle: "Embrace natural flavors",
      description:
        "Clean, vibrant meals that celebrate the beauty of fresh ingredients",
      icon: Leaf,
    },
  ];

  const featuredIngredients = [
    {
      name: "Avocado",
      description: "Rich in healthy fats and perfect for any meal",
      benefit: "Heart Healthy",
    },
    {
      name: "Quinoa",
      description: "Complete protein powerhouse from ancient grains",
      benefit: "Protein Rich",
    },
    {
      name: "Blueberries",
      description: "Antioxidant superfruits for vibrant health",
      benefit: "Antioxidants",
    },
  ];

  const cookingTips = [
    {
      tip: "Always taste as you cook",
      description: "Your palate is your best guide to perfect seasoning",
      icon: Coffee,
    },
    {
      tip: "Prep ingredients first",
      description: "Mise en place makes cooking smoother and more enjoyable",
      icon: Clock,
    },
    {
      tip: "Use fresh herbs generously",
      description: "Fresh herbs elevate any dish from good to extraordinary",
      icon: Leaf,
    },
  ];

  return (
    <div className={styles.homePage}>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <span className={styles.heroLabel}>Welcome to</span>
            <h1 className={styles.heroTitle}>
              Culinary <span className={styles.delicate}>Delights</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Where every meal becomes a cherished memory and cooking transforms
              into an art of love and connection.
            </p>
            <div className={styles.heroActions}>
              <Link href="/recipes" className={styles.exploreButton}>
                Explore Recipes
                <ArrowRight size={18} />
              </Link>
              <Link href="#inspirations" className={styles.exploreButton}>
                Find Inspiration
              </Link>
            </div>
          </div>
          <div className={styles.heroImageContainer}>
            <Image
              src={foodImage}
              alt="Beautiful culinary creation"
              width={500}
              height={400}
              className={styles.heroImage}
              priority
            />
            <div className={styles.floatingCard}>
              <Sparkles size={16} />
              <span>Handcrafted with love</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.mealPlannerFeature}>
        <div className={styles.container}>
          <div className={styles.featureContent}>
            <div className={styles.featureText}>
              <span className={styles.sectionLabel}>New Feature</span>
              <h2 className={styles.featureTitle}>Smart Meal Planning</h2>
              <p className={styles.featureDescription}>
                Plan your entire week with our intelligent meal planner.
                Organize your meals by day and meal type, and never wonder
                &quot;what&apos;s for dinner?&quot; again.
              </p>
              <div className={styles.featurePoints}>
                <div className={styles.featurePoint}>
                  <Calendar size={20} />
                  <span>Weekly meal organization</span>
                </div>
                <div className={styles.featurePoint}>
                  <BookOpen size={20} />
                  <span>Smart recipe suggestions</span>
                </div>
                <div className={styles.featurePoint}>
                  <Clock size={20} />
                  <span>Time-saving meal organization</span>
                </div>
              </div>
              <Link href="/meal-planner" className={styles.featureButton}>
                Start Planning Now
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className={styles.featureVisual}>
              <div className={styles.plannerPreview}>
                <div className={styles.previewHeader}>
                  <Calendar size={16} />
                  <span>This Week&apos;s Plan</span>
                </div>
                <div className={styles.previewGrid}>
                  <div className={styles.previewDay}>
                    <span>Mon</span>
                    <div className={styles.previewMeal}></div>
                  </div>
                  <div className={styles.previewDay}>
                    <span>Tue</span>
                    <div className={styles.previewMeal}></div>
                  </div>
                  <div className={styles.previewDay}>
                    <span>Wed</span>
                    <div className={styles.previewMeal}></div>
                  </div>
                  <div className={styles.previewDay}>
                    <span>Thu</span>
                    <div className={styles.previewMeal}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.container}>
        <section id="inspirations">
          <div className={styles.inspirationsHeader}>
            <span className={styles.sectionLabel}>Find Your</span>
            <h2 className={styles.sectionTitle}>Culinary Inspiration</h2>
            <p className={styles.sectionDescription}>
              Discover thoughtfully curated collections that celebrate the joy
              of cooking
            </p>
          </div>

          <div className={styles.inspirationsGrid}>
            {inspirations.map((inspiration, index) => {
              const IconComponent = inspiration.icon;
              return (
                <div key={index} className={styles.inspirationCard}>
                  <div className={styles.inspirationIcon}>
                    <IconComponent size={24} />
                  </div>
                  <h3 className={styles.inspirationTitle}>
                    {inspiration.title}
                  </h3>
                  <p className={styles.inspirationSubtitle}>
                    {inspiration.subtitle}
                  </p>
                  <p className={styles.inspirationDescription}>
                    {inspiration.description}
                  </p>
                  <Link href="/recipes" className={styles.inspirationLink}>
                    Explore Collection
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        <section className={styles.ingredientsSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Featured This Week</span>
            <h2 className={styles.sectionTitle}>Superfood Ingredients</h2>
            <p className={styles.sectionDescription}>
              Discover the nutritional powerhouses that make every dish
              healthier and more delicious
            </p>
          </div>
          <div className={styles.ingredientsGrid}>
            {featuredIngredients.map((ingredient, index) => (
              <div key={index} className={styles.ingredientCard}>
                <div className={styles.ingredientBadge}>
                  {ingredient.benefit}
                </div>
                <h4 className={styles.ingredientName}>{ingredient.name}</h4>
                <p className={styles.ingredientDescription}>
                  {ingredient.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {!loading && popularRecipes.length > 0 && (
          <section>
            <div className={styles.popularHeader}>
              <span className={styles.sectionLabel}>Community Favorites</span>
              <h2 className={styles.sectionTitle}>Most Loved Recipes</h2>
            </div>

            <div className={styles.popularGrid}>
              {popularRecipes.map((recipe) => (
                <Link
                  key={recipe.id}
                  href={`/recipes/${recipe.id}`}
                  className={styles.popularCard}
                >
                  <div className={styles.popularImage}>
                    <Image
                      src={recipe.image}
                      alt={recipe.name}
                      width={280}
                      height={200}
                      className={styles.cardImage}
                    />
                    <div className={styles.cardRating}>
                      <span>★ {recipe.rating}</span>
                    </div>
                  </div>
                  <div className={styles.popularInfo}>
                    <h4 className={styles.popularTitle}>{recipe.name}</h4>
                    <div className={styles.popularMeta}>
                      <span className={styles.time}>
                        <Clock size={12} />
                        {recipe.cookTimeMinutes}m
                      </span>
                      <span className={styles.type}>{recipe.cuisine}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className={styles.tipsSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Pro Tips</span>
            <h2 className={styles.sectionTitle}>Master Chef Secrets</h2>
            <p className={styles.sectionDescription}>
              Transform your cooking with these expert techniques and insider
              knowledge
            </p>
          </div>
          <div className={styles.tipsGrid}>
            {cookingTips.map((tip, index) => {
              const IconComponent = tip.icon;
              return (
                <div key={index} className={styles.tipCard}>
                  <div className={styles.tipIcon}>
                    <IconComponent size={24} />
                  </div>
                  <h4 className={styles.tipTitle}>{tip.tip}</h4>
                  <p className={styles.tipDescription}>{tip.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className={styles.newsletterSection}>
          <div className={styles.newsletterCard}>
            <div className={styles.newsletterContent}>
              <BookOpen size={32} className={styles.newsletterIcon} />
              <h3 className={styles.newsletterTitle}>Stay Inspired</h3>
              <p className={styles.newsletterDescription}>
                Receive weekly recipe inspirations and cooking tips directly in
                your inbox
              </p>
              <form className={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="Your email address"
                  className={styles.emailInput}
                />
                <button type="submit" className={styles.subscribeBtn}>
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
