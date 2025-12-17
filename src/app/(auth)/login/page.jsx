"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { loginSuccess, clearPendingFavorite } from "@/lib/slices/authSlice";
import {
  addFavorite,
  loadFavorites,
  getUserFavoritesKey,
} from "@/lib/slices/favoriteSlice";
import styles from "./page.module.css";
import Link from "next/link";

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters")
    .max(20, "Password must be at most 20 characters"),
});

function Login() {
  const [loginError, setLoginError] = useState("");
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.title = "Login - Culinary Delights";
  }, []);
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const pendingFavorite = useAppSelector((state) => state.auth.pendingFavorite);
  const redirectTo = searchParams.get("redirect");

  const handleLogin = async (data) => {
    setLoginError("");
    setIsLoginSuccessful(false);

    try {
      const response = await fetch("https://dummyjson.com/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsLoginSuccessful(true);

        dispatch(loginSuccess(result));

        if (
          typeof window !== "undefined" &&
          typeof localStorage !== "undefined"
        ) {
          try {
            const userFavoritesKey = getUserFavoritesKey(result.id);
            const savedFavorites = localStorage.getItem(userFavoritesKey);
            if (savedFavorites) {
              const favoritesData = JSON.parse(savedFavorites);
              dispatch(loadFavorites(favoritesData));
            } else {
              dispatch(loadFavorites([]));
            }
          } catch (error) {
            console.error("Error loading user favorites:", error);
            dispatch(loadFavorites([]));
          }
        }

        if (pendingFavorite) {
          dispatch(addFavorite({ recipe: pendingFavorite, userId: result.id }));
          dispatch(clearPendingFavorite());
        }

        console.log("Login successful:", result);

        setTimeout(() => {
          router.push(redirectTo || "/");
        }, 1500);
      } else {
        setLoginError("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError("An unexpected error occurred. Please try again.");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Login</h1>

        {loginError && <div className={styles.errorMessage}>{loginError}</div>}

        {isLoginSuccessful && (
          <div className={styles.successMessage}>Login successful!</div>
        )}

        <form onSubmit={handleSubmit(handleLogin)} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>
              Username:
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className={`${styles.input} ${
                errors.username ? styles.inputError : ""
              }`}
              {...register("username")}
              placeholder="Enter your username"
            />
            {errors.username && (
              <span className={styles.fieldError}>
                {errors.username.message}
              </span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className={`${styles.input} ${
                errors.password ? styles.inputError : ""
              }`}
              {...register("password")}
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className={styles.fieldError}>
                {errors.password.message}
              </span>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>
            Login
          </button>
        </form>

        <div className={styles.registerLink}>
          <Link href="/register">Don&apos;t have an account? Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
