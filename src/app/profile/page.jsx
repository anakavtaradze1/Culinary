"use client";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./page.module.css";

export default function Profile() {
  const { user, isLoggedIn } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login?redirect=/profile");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !user) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingMessage}>
          Please log in to view your profile...
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <h1 className={styles.title}>My Profile</h1>

        <div className={styles.profileInfo}>
          <div className={styles.infoItem}>
            <label className={styles.label}>First Name:</label>
            <span className={styles.value}>{user.firstName || "N/A"}</span>
          </div>

          <div className={styles.infoItem}>
            <label className={styles.label}>Last Name:</label>
            <span className={styles.value}>{user.lastName || "N/A"}</span>
          </div>

          <div className={styles.infoItem}>
            <label className={styles.label}>Username:</label>
            <span className={styles.value}>{user.username || "N/A"}</span>
          </div>

          <div className={styles.infoItem}>
            <label className={styles.label}>Email:</label>
            <span className={styles.value}>{user.email || "N/A"}</span>
          </div>

          {user.age && (
            <div className={styles.infoItem}>
              <label className={styles.label}>Age:</label>
              <span className={styles.value}>{user.age}</span>
            </div>
          )}

          {user.phone && (
            <div className={styles.infoItem}>
              <label className={styles.label}>Phone:</label>
              <span className={styles.value}>{user.phone}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
