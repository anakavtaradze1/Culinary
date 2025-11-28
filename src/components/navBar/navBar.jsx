"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, Home, Heart, Info, Mail } from "lucide-react";
import { FaUtensils } from "react-icons/fa";
import styles from "./navBar.module.css";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navItems = [
    { href: "/recipes", label: "Recipes", icon: Home },
    { href: "/favorites", label: "Favorites", icon: Heart },
    { href: "/about", label: "About", icon: Info },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link href="/recipes" className={styles.navLogo} onClick={closeMenu}>
          <FaUtensils className={styles.logoIcon} />
          <span className={styles.logoText}>Culinary</span>
        </Link>

        <div className={styles.navMenu}>
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${
                  pathname === item.href ? styles.navLinkActive : ""
                }`}
              >
                <IconComponent size={18} className={styles.navItemIcon} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search recipes..."
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>
            <Search size={18} className={styles.searchIcon} />
          </button>
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
              <span>{item.label}</span>
            </Link>
          );
        })}
        <div className={styles.searchContainerMobile}>
          <input
            type="text"
            placeholder="Search recipes..."
            className={styles.searchInputMobile}
          />
          <button className={styles.searchButtonMobile}>
            <Search size={20} className={styles.searchIcon} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
