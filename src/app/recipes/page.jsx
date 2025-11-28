"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import RecipesItem from "../../components/recipesItem/recipesItem";
import styles from "./page.module.css";
import foodImage from "../assets/food.jpg";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    document.title = `Recipes Explorer`;
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const skip = (currentPage - 1) * itemsPerPage;
        const response = await fetch(
          `https://dummyjson.com/recipes?limit=${itemsPerPage}&skip=${skip}`
        );
        const data = await response.json();
        setRecipes(data.recipes || []);
        setTotalRecipes(data.total || 0);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [currentPage]);

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

  const totalPages = Math.ceil(totalRecipes / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className={styles.pageBackground}>
      <div className={styles.heroSection}>
        <Image
          src={foodImage}
          alt="Delicious food"
          fill
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}>
          <div>
            <h1 className={styles.heroTitle}>Explore</h1>
            <h1 className={styles.heroSubtitle}>
              <span className={styles.culinary}>Culinary</span> Insights
            </h1>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <h1 className={styles.title}>
          What to <span className={styles.culinary}>Cook</span>?
        </h1>
        <div className={styles.recipesGrid}>
          {recipes.map((recipe) => (
            <RecipesItem key={recipe.id} recipe={recipe} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={`${styles.pageButton} ${
                currentPage === 1 ? styles.disabled : ""
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {getPageNumbers().map((page) => (
              <button
                key={page}
                className={`${styles.pageButton} ${
                  currentPage === page ? styles.active : ""
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}

            <button
              className={`${styles.pageButton} ${
                currentPage === totalPages ? styles.disabled : ""
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
