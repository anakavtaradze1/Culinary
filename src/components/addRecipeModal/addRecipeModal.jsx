"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe } from "../../lib/slices/userRecipesSlice";
import { X, Plus, Minus } from "lucide-react";
import styles from "./addRecipeModal.module.css";

export default function AddRecipeModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    prepTimeMinutes: "",
    cookTimeMinutes: "",
    servings: "",
    difficulty: "easy",
    cuisine: "",
    instructions: [""],
    ingredients: [""],
    tags: [],
    mealType: [],
    caloriesPerServing: "",
  });

  const [currentTag, setCurrentTag] = useState("");
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = value;
    setFormData((prev) => ({
      ...prev,
      instructions: newInstructions,
    }));
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData((prev) => ({
      ...prev,
      ingredients: newIngredients,
    }));
  };

  const addInstruction = () => {
    setFormData((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ""],
    }));
  };

  const removeInstruction = (index) => {
    if (formData.instructions.length > 1) {
      const newInstructions = formData.instructions.filter(
        (_, i) => i !== index
      );
      setFormData((prev) => ({
        ...prev,
        instructions: newInstructions,
      }));
    }
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }));
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = formData.ingredients.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        ingredients: newIngredients,
      }));
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleMealTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        mealType: [...prev.mealType, value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        mealType: prev.mealType.filter((type) => type !== value),
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Recipe name is required";
    if (!formData.cookTimeMinutes || formData.cookTimeMinutes < 1) {
      newErrors.cookTimeMinutes = "Cook time must be at least 1 minute";
    }
    if (!formData.servings || formData.servings < 1) {
      newErrors.servings = "Servings must be at least 1";
    }
    if (formData.instructions.some((instruction) => !instruction.trim())) {
      newErrors.instructions = "All instruction steps must be filled";
    }
    if (formData.ingredients.some((ingredient) => !ingredient.trim())) {
      newErrors.ingredients = "All ingredients must be filled";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("Please log in to add recipes");
      return;
    }

    if (!validateForm()) return;

    const recipeData = {
      ...formData,
      prepTimeMinutes: formData.prepTimeMinutes
        ? parseInt(formData.prepTimeMinutes)
        : 0,
      cookTimeMinutes: parseInt(formData.cookTimeMinutes),
      servings: parseInt(formData.servings),
      caloriesPerServing: formData.caloriesPerServing
        ? parseInt(formData.caloriesPerServing)
        : 0,
      instructions: formData.instructions.filter((instruction) =>
        instruction.trim()
      ),
      ingredients: formData.ingredients.filter((ingredient) =>
        ingredient.trim()
      ),
      image: formData.image.trim() || null,
      createdBy: user?.id || user?.email,
    };

    dispatch(addRecipe(recipeData));

    setFormData({
      name: "",
      image: "",
      prepTimeMinutes: "",
      cookTimeMinutes: "",
      servings: "",
      difficulty: "easy",
      cuisine: "",
      instructions: [""],
      ingredients: [""],
      tags: [],
      mealType: [],
      caloriesPerServing: "",
    });

    setCurrentTag("");
    setErrors({});
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Add New Recipe</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Recipe Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? styles.error : ""}
                placeholder="Enter recipe name"
              />
              {errors.name && (
                <span className={styles.errorText}>{errors.name}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg "
              />
            </div>

            <div className={styles.formGroup}>
              <label>Prep Time (minutes)</label>
              <input
                type="number"
                name="prepTimeMinutes"
                value={formData.prepTimeMinutes}
                onChange={handleInputChange}
                min="0"
                placeholder="0"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Cook Time (minutes) *</label>
              <input
                type="number"
                name="cookTimeMinutes"
                value={formData.cookTimeMinutes}
                onChange={handleInputChange}
                min="1"
                className={errors.cookTimeMinutes ? styles.error : ""}
                placeholder="30"
              />
              {errors.cookTimeMinutes && (
                <span className={styles.errorText}>
                  {errors.cookTimeMinutes}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Servings *</label>
              <input
                type="number"
                name="servings"
                value={formData.servings}
                onChange={handleInputChange}
                min="1"
                className={errors.servings ? styles.error : ""}
                placeholder="4"
              />
              {errors.servings && (
                <span className={styles.errorText}>{errors.servings}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Difficulty</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Cuisine</label>
              <input
                type="text"
                name="cuisine"
                value={formData.cuisine}
                onChange={handleInputChange}
                placeholder="e.g., Italian, Asian, American"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Calories per Serving</label>
              <input
                type="number"
                name="caloriesPerServing"
                value={formData.caloriesPerServing}
                onChange={handleInputChange}
                min="0"
                placeholder="250"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Meal Type</label>
            <div className={styles.checkboxGroup}>
              {["breakfast", "lunch", "dinner", "dessert", "snack"].map(
                (type) => (
                  <label key={type} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      value={type}
                      checked={formData.mealType.includes(type)}
                      onChange={handleMealTypeChange}
                    />
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </label>
                )
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.sectionTitle}>Ingredients *</label>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className={styles.listItem}>
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) =>
                    handleIngredientChange(index, e.target.value)
                  }
                  placeholder={`Ingredient ${index + 1}`}
                  className={errors.ingredients ? styles.error : ""}
                />
                {formData.ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className={styles.removeButton}
                  >
                    <Minus size={16} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className={styles.addButton}
            >
              <Plus size={16} /> Add Ingredient
            </button>
            {errors.ingredients && (
              <span className={styles.errorText}>{errors.ingredients}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.sectionTitle}>Instructions *</label>
            {formData.instructions.map((instruction, index) => (
              <div key={index} className={styles.listItem}>
                <textarea
                  value={instruction}
                  onChange={(e) =>
                    handleInstructionChange(index, e.target.value)
                  }
                  placeholder={`Step ${index + 1}`}
                  rows="2"
                  className={errors.instructions ? styles.error : ""}
                />
                {formData.instructions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeInstruction(index)}
                    className={styles.removeButton}
                  >
                    <Minus size={16} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addInstruction}
              className={styles.addButton}
            >
              <Plus size={16} /> Add Step
            </button>
            {errors.instructions && (
              <span className={styles.errorText}>{errors.instructions}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.sectionTitle}>Tags</label>
            <div className={styles.tagInput}>
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Add tag and press Enter"
              />
              <button
                type="button"
                onClick={addTag}
                className={styles.addTagButton}
              >
                Add
              </button>
            </div>
            <div className={styles.tagList}>
              {formData.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className={styles.removeTag}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className={styles.modalActions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Add Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
