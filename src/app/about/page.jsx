"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChefHat, Heart, Clock, Users, Award, Globe } from "lucide-react";
import styles from "./page.module.css";
import food2Image from "../assets/food2.jpg";

const About = () => {
  useEffect(() => {
    document.title = "About - Culinary Insights";
  }, []);

  const features = [
    {
      icon: ChefHat,
      title: "Curated Recipes",
      description:
        "Handpicked recipes from professional chefs and home cooks worldwide",
    },
    {
      icon: Heart,
      title: "Passion for Food",
      description:
        "Every recipe is selected with love and tested for the perfect taste",
    },
    {
      icon: Clock,
      title: "Time-Friendly",
      description: "From quick 15-minute meals to elaborate weekend projects",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by food lovers, for food lovers around the globe",
    },
    {
      icon: Award,
      title: "Quality First",
      description: "Only the best recipes make it to our collection",
    },
    {
      icon: Globe,
      title: "Global Cuisine",
      description: "Explore flavors from every corner of the world",
    },
  ];

  const stats = [
    { number: "1000+", label: "Recipes" },
    { number: "50+", label: "Countries" },
    { number: "10K+", label: "Happy Cooks" },
    { number: "24/7", label: "Available" },
  ];

  return (
    <div className={styles.aboutPage}>
      <section className={styles.heroSection}>
        <Image
          src={food2Image}
          alt="Culinary journey"
          fill
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>About Our</h1>
            <h1 className={styles.heroSubtitle}>
              <span className={styles.culinary}>Culinary</span> Journey
            </h1>
            <p className={styles.heroDescription}>
              Discover the story behind our passion for bringing the
              world&apos;s most delicious recipes to your kitchen.
            </p>
          </div>
        </div>
      </section>

      <div className={styles.container}>
        <section className={styles.missionSection}>
          <div className={styles.missionContent}>
            <h2 className={styles.sectionTitle}>
              Our <span className={styles.culinary}>Mission</span>
            </h2>
            <p className={styles.missionText}>
              We believe that great food brings people together. Our mission is
              to make cooking accessible, enjoyable, and inspiring for everyone
              - from beginners taking their first steps in the kitchen to
              seasoned chefs looking for new culinary adventures.
            </p>
            <p className={styles.missionText}>
              Through our carefully curated collection of recipes from around
              the world, we aim to celebrate the diversity of global cuisine
              while making it easy for you to recreate these incredible flavors
              at home.
            </p>
          </div>
        </section>

        <section className={styles.statsSection}>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <h3 className={styles.statNumber}>{stat.number}</h3>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.featuresSection}>
          <h2 className={styles.sectionTitle}>
            Why Choose{" "}
            <span className={styles.culinary}>Culinary Insights</span>?
          </h2>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <IconComponent size={32} />
                  </div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className={styles.storySection}>
          <div className={styles.storyContent}>
            <h2 className={styles.sectionTitle}>
              Our <span className={styles.culinary}>Story</span>
            </h2>
            <div className={styles.storyText}>
              <p>
                What started as a simple collection of family recipes has grown
                into a comprehensive culinary platform that serves food
                enthusiasts worldwide. Our journey began in 2024 with a simple
                belief: everyone deserves access to incredible recipes that can
                transform their dining experience.
              </p>
              <p>
                Today, we&apos;re proud to offer a diverse collection of recipes
                spanning multiple cuisines, dietary preferences and skill
                levels. Each recipe in our database is carefully selected and
                tested to ensure you get the best possible results in your
                kitchen.
              </p>
              <p>
                Whether you&apos;re looking for a quick weeknight dinner, an
                impressive weekend feast or exploring new flavors from distant
                lands, we&apos;re here to guide you on your culinary adventure.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              Ready to Start <span className={styles.culinary}>Cooking</span>?
            </h2>
            <p className={styles.ctaDescription}>
              Join thousands of home cooks who have already discovered their new
              favorite recipes with us.
            </p>
            <Link href="/recipes" className={styles.ctaButton}>
              Explore Recipes
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
