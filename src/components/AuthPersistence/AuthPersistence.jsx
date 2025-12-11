"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { loginSuccess } from "@/lib/slices/authSlice";
import { loadFavorites, getUserFavoritesKey } from "@/lib/slices/favoriteSlice";

export default function AuthPersistence() {
  const dispatch = useAppDispatch();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        dispatch(loginSuccess(userData));

        const userFavoritesKey = getUserFavoritesKey(userData.id);
        const savedFavorites = localStorage.getItem(userFavoritesKey);
        if (savedFavorites) {
          try {
            const favoritesData = JSON.parse(savedFavorites);
            dispatch(loadFavorites(favoritesData));
          } catch (error) {
            console.error("Error parsing saved favorites:", error);
            localStorage.removeItem(userFavoritesKey);
            dispatch(loadFavorites([]));
          }
        } else {
          dispatch(loadFavorites([]));
        }
      } catch (error) {
        console.error("Error parsing saved user data:", error);
        localStorage.removeItem("user");
        dispatch(loadFavorites([]));
      }
    } else {
      dispatch(loadFavorites([]));
    }
  }, [dispatch, isHydrated]);

  return null;
}
