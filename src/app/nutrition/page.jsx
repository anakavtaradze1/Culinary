"use client";

import { useEffect } from "react";
import {
  Apple,
  Heart,
  Activity,
  Zap,
  Shield,
  Brain,
  BarChart3,
  Droplets,
  Sparkles,
  Target,
  Scale,
  Calculator,
} from "lucide-react";
import { FaFish, FaBreadSlice, FaSeedling } from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";
import styles from "./page.module.css";
import Link from "next/link";

export default function Nutrition() {
  useEffect(() => {
    document.title = "Nutrition Guide - Culinary Delights";
  }, []);

  const macronutrients = [
    {
      icon: FaBreadSlice,
      name: "Carbohydrates",
      percentage: "45-65%",
      description: "Primary energy source for your body and brain",
      sources: ["Whole grains", "Fruits", "Vegetables", "Legumes"],
      color: "#FF6B6B",
    },
    {
      icon: FaFish,
      name: "Proteins",
      percentage: "10-35%",
      description: "Essential for muscle repair and immune function",
      sources: ["Lean meats", "Fish", "Eggs", "Beans", "Nuts"],
      color: "#4ECDC4",
    },
    {
      icon: FaSeedling,
      name: "Fats",
      percentage: "20-35%",
      description: "Important for hormone production and nutrient absorption",
      sources: ["Olive oil", "Avocados", "Nuts", "Seeds", "Fatty fish"],
      color: "#45B7D1",
    },
  ];

  const vitamins = [
    {
      name: "Vitamin C",
      benefit: "Immune system boost",
      sources: "Citrus fruits, berries, bell peppers",
      dailyValue: "65-90mg",
    },
    {
      name: "Vitamin D",
      benefit: "Bone health & calcium absorption",
      sources: "Sunlight, fatty fish, fortified foods",
      dailyValue: "600-800 IU",
    },
    {
      name: "Vitamin B12",
      benefit: "Energy production & nerve function",
      sources: "Meat, fish, dairy, fortified cereals",
      dailyValue: "2.4mcg",
    },
    {
      name: "Folate",
      benefit: "Cell division & DNA synthesis",
      sources: "Leafy greens, legumes, fortified grains",
      dailyValue: "400mcg",
    },
    {
      name: "Iron",
      benefit: "Oxygen transport in blood",
      sources: "Red meat, spinach, lentils, tofu",
      dailyValue: "8-18mg",
    },
    {
      name: "Calcium",
      benefit: "Strong bones and teeth",
      sources: "Dairy, leafy greens, almonds",
      dailyValue: "1000-1200mg",
    },
  ];

  const nutritionTips = [
    {
      icon: Droplets,
      title: "Stay Hydrated",
      tip: "Drink at least 8 glasses of water daily. Add lemon or cucumber for variety.",
    },
    {
      icon: Target,
      title: "Portion Control",
      tip: "Use your hand as a guide: palm for protein, fist for veggies, cupped hand for carbs.",
    },
    {
      icon: Activity,
      title: "Meal Timing",
      tip: "Eat every 3-4 hours to maintain steady blood sugar levels and energy.",
    },
    {
      icon: GiFruitBowl,
      title: "Colorful Plate",
      tip: "Aim for at least 5 different colors on your plate for diverse nutrients.",
    },
    {
      icon: Brain,
      title: "Mindful Eating",
      tip: "Eat slowly, chew thoroughly, and listen to your body's hunger cues.",
    },
    {
      icon: Scale,
      title: "Balance is Key",
      tip: "Follow the 80/20 rule: eat nutritiously 80% of the time, enjoy treats 20%.",
    },
  ];

  const mealPlanningTips = [
    "Plan your meals for the week every Sunday",
    "Prep ingredients in advance to save time",
    "Include a variety of protein sources throughout the week",
    "Batch cook grains and proteins for easy assembly",
    "Keep healthy snacks readily available",
    "Don't skip meals - it can lead to overeating later",
  ];

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <Apple className={styles.heroIcon} />
        <h1 className={styles.title}>Nutrition Guide</h1>
        <p className={styles.subtitle}>
          Fuel your body with knowledge. Discover the science behind healthy
          eating
          <br />
          and learn how to make nutrition work for your lifestyle.
        </p>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <BarChart3 className={styles.sectionIcon} />
            Understanding Macronutrients
          </h2>
          <div className={styles.macroGrid}>
            {macronutrients.map((macro, index) => {
              const IconComponent = macro.icon;
              return (
                <div key={index} className={styles.macroCard}>
                  <div
                    className={styles.macroHeader}
                    style={{ borderColor: macro.color }}
                  >
                    <IconComponent
                      className={styles.macroIcon}
                      style={{ color: macro.color }}
                    />
                    <h3>{macro.name}</h3>
                    <span
                      className={styles.percentage}
                      style={{ backgroundColor: macro.color }}
                    >
                      {macro.percentage}
                    </span>
                  </div>
                  <p className={styles.macroDescription}>{macro.description}</p>
                  <div className={styles.sources}>
                    <strong>Best Sources:</strong>
                    <ul>
                      {macro.sources.map((source, idx) => (
                        <li key={idx}>{source}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Sparkles className={styles.sectionIcon} />
            Essential Vitamins & Minerals
          </h2>
          <div className={styles.vitaminGrid}>
            {vitamins.map((vitamin, index) => (
              <div key={index} className={styles.vitaminCard}>
                <div className={styles.vitaminHeader}>
                  <h4>{vitamin.name}</h4>
                  <span className={styles.dailyValue}>
                    {vitamin.dailyValue}
                  </span>
                </div>
                <p className={styles.benefit}>{vitamin.benefit}</p>
                <p className={styles.sources}>
                  <strong>Sources:</strong> {vitamin.sources}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Heart className={styles.sectionIcon} />
            Daily Nutrition Tips
          </h2>
          <div className={styles.tipsGrid}>
            {nutritionTips.map((tip, index) => {
              const IconComponent = tip.icon;
              return (
                <div key={index} className={styles.tipCard}>
                  <IconComponent className={styles.tipIcon} />
                  <h4>{tip.title}</h4>
                  <p>{tip.tip}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Calculator className={styles.sectionIcon} />
            Smart Meal Planning
          </h2>
          <div className={styles.mealPlanningContent}>
            <div className={styles.planningTips}>
              <h3>Weekly Planning Checklist</h3>
              <ul className={styles.checklistItems}>
                {mealPlanningTips.map((tip, index) => (
                  <li key={index} className={styles.checklistItem}>
                    <Zap className={styles.checkIcon} />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.plateGuide}>
              <h3>The Balanced Plate</h3>
              <div className={styles.plateVisual}>
                <div className={styles.plateSection} data-section="vegetables">
                  <span>½ Vegetables & Fruits</span>
                </div>
                <div className={styles.plateSection} data-section="grains">
                  <span>¼ Whole Grains</span>
                </div>
                <div className={styles.plateSection} data-section="protein">
                  <span>¼ Lean Protein</span>
                </div>
              </div>
              <p className={styles.plateNote}>
                Plus healthy oils, water, and limited dairy portions
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Droplets className={styles.sectionIcon} />
            Hydration Guidelines
          </h2>
          <div className={styles.hydrationContent}>
            <div className={styles.hydrationFacts}>
              <div className={styles.hydrationFact}>
                <h4>Daily Water Intake</h4>
                <p>Men: 15.5 cups (3.7 liters)</p>
                <p>Women: 11.5 cups (2.7 liters)</p>
              </div>
              <div className={styles.hydrationFact}>
                <h4>Signs of Good Hydration</h4>
                <ul>
                  <li>Light yellow urine</li>
                  <li>Moist lips and mouth</li>
                  <li>Good energy levels</li>
                  <li>Elastic skin</li>
                </ul>
              </div>
              <div className={styles.hydrationFact}>
                <h4>Hydrating Foods</h4>
                <ul>
                  <li>Watermelon (92% water)</li>
                  <li>Cucumber (95% water)</li>
                  <li>Lettuce (96% water)</li>
                  <li>Tomatoes (94% water)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <Shield className={styles.ctaIcon} />
            <h2>Ready to Transform Your Health?</h2>
            <p>
              Start implementing these nutrition principles today. Remember,
              small consistent changes lead to lasting results.
            </p>
            <div className={styles.ctaButtons}>
              <a href="/meal-planner" className={styles.primaryBtn}>
                Plan Your Meals
              </a>
              <Link href="/recipes" className={styles.secondaryBtn}>
                Find Healthy Recipes
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
