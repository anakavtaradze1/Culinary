"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  Search,
  Menu,
  X,
  ChefHat,
  Heart,
  Info,
  Mail,
  Lightbulb,
  User,
  LogOut,
} from "lucide-react";
import { FaUtensils } from "react-icons/fa";
import { logout } from "@/lib/slices/authSlice";
import { loadFavorites } from "@/lib/slices/favoriteSlice";
import styles from "./navBar.module.css";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const favoritesCount = useSelector((state) => state.favorites.items.length);
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/recipes?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(loadFavorites([]));
    closeMenu();
    router.push("/");
  };

  const navItems = [
    { href: "/recipes", label: "Recipes", icon: ChefHat },
    { href: "/tips", label: "Tips", icon: Lightbulb },
    { href: "/favorites", label: "Favorites", icon: Heart },
    { href: "/about", label: "About", icon: Info },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.navLogo} onClick={closeMenu}>
          <FaUtensils className={styles.logoIcon} />
          <span className={styles.logoText}>Culinary</span>
        </Link>

        <div className={styles.navMenu}>
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const showCount = item.href === "/favorites" && favoritesCount > 0;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${
                  pathname === item.href ? styles.navLinkActive : ""
                }`}
              >
                <IconComponent size={18} className={styles.navItemIcon} />
                <span>
                  {item.label}
                  {showCount && (
                    <span className={styles.favoritesCount}>
                      {favoritesCount}
                    </span>
                  )}
                </span>
              </Link>
            );
          })}
        </div>

        <form className={styles.searchContainer} onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            <Search size={18} className={styles.searchIcon} />
          </button>
        </form>

        <div className={styles.authSection}>
          {isLoggedIn ? (
            <div className={styles.userInfo}>
              <Link href="/profile" className={styles.userName}>
                <User size={16} className={styles.userIcon} />
                {user?.firstName || user?.username}
              </Link>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                <LogOut size={16} className={styles.logoutIcon} />
                Logout
              </button>
            </div>
          ) : (
            <div className={styles.authLinks}>
              <Link href="/login" className={styles.authLink}>
                Login
              </Link>
              <Link href="/register" className={styles.authLink}>
                Register
              </Link>
            </div>
          )}
        </div>

        <div className={styles.navToggle} onClick={toggleMenu}>
          {isOpen ? (
            <X size={24} className={styles.toggleIcon} />
          ) : (
            <Menu size={24} className={styles.toggleIcon} />
          )}
        </div>
      </div>

      <div className={`${styles.navMenuMobile} ${isOpen ? styles.active : ""}`}>
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const showCount = item.href === "/favorites" && favoritesCount > 0;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLinkMobile} ${
                pathname === item.href ? styles.navLinkMobileActive : ""
              }`}
              onClick={closeMenu}
            >
              <IconComponent size={20} className={styles.navItemIconMobile} />
              <span>
                {item.label}
                {showCount && (
                  <span className={styles.favoritesCount}>
                    {favoritesCount}
                  </span>
                )}
              </span>
            </Link>
          );
        })}
        <form
          className={styles.searchContainerMobile}
          onSubmit={handleSearchSubmit}
        >
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={handleSearchChange}
            className={styles.searchInputMobile}
          />
          <button type="submit" className={styles.searchButtonMobile}>
            <Search size={20} className={styles.searchIcon} />
          </button>
        </form>

        <div className={styles.authSectionMobile}>
          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                className={styles.userInfoMobile}
                onClick={closeMenu}
              >
                <User size={18} className={styles.userIcon} />
                <span>{user?.firstName || user?.username}</span>
              </Link>
              <button onClick={handleLogout} className={styles.logoutBtnMobile}>
                <LogOut size={18} className={styles.logoutIcon} />
                Logout
              </button>
            </>
          ) : (
            <div className={styles.authLinksMobile}>
              <Link
                href="/login"
                className={styles.authLinkMobile}
                onClick={closeMenu}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={styles.authLinkMobile}
                onClick={closeMenu}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
