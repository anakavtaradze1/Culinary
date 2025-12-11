"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { loginSuccess } from "@/lib/slices/authSlice";
import { loadFavorites } from "@/lib/slices/favoriteSlice";
import styles from "./page.module.css";
import Link from "next/link";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(30, "First name must be at most 30 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(30, "Last name must be at most 30 characters"),
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters")
    .max(50, "Password must be at most 50 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

function Register() {
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleRegister = async (data) => {
    setRegisterError("");
    setRegisterSuccess(false);

    try {
      const response = await fetch("https://dummyjson.com/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setRegisterSuccess(true);
        console.log("Registration successful:", result);

        dispatch(loginSuccess(result));

        dispatch(loadFavorites([]));

        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        setRegisterError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setRegisterError("An unexpected error occurred. Please try again.");
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
        <h1 className={styles.title}>Register</h1>

        {registerError && (
          <div className={styles.errorMessage}>{registerError}</div>
        )}

        {registerSuccess && (
          <div className={styles.successMessage}>
            Registration successful! You&apos;re now logged in.
          </div>
        )}

        <form onSubmit={handleSubmit(handleRegister)} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="firstName" className={styles.label}>
              First Name:
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className={`${styles.input} ${
                errors.firstName ? styles.inputError : ""
              }`}
              {...register("firstName")}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <span className={styles.fieldError}>
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="lastName" className={styles.label}>
              Last Name:
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className={`${styles.input} ${
                errors.lastName ? styles.inputError : ""
              }`}
              {...register("lastName")}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <span className={styles.fieldError}>
                {errors.lastName.message}
              </span>
            )}
          </div>

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
              placeholder="Choose a username"
            />
            {errors.username && (
              <span className={styles.fieldError}>
                {errors.username.message}
              </span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={`${styles.input} ${
                errors.email ? styles.inputError : ""
              }`}
              {...register("email")}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <span className={styles.fieldError}>{errors.email.message}</span>
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
              placeholder="Create a password"
            />
            {errors.password && (
              <span className={styles.fieldError}>
                {errors.password.message}
              </span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password:
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className={`${styles.input} ${
                errors.confirmPassword ? styles.inputError : ""
              }`}
              {...register("confirmPassword")}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <span className={styles.fieldError}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>
            Register
          </button>
        </form>

        <div className={styles.registerLink}>
          <Link href="/login">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
