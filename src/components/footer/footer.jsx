"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Heart, Info, Mail, Lightbulb } from "lucide-react";
import {
  FaUtensils,
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import styles from "./footer.module.css";

const Footer = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/recipes", label: "Recipes", icon: Home },
    { href: "/tips", label: "Tips", icon: Lightbulb },
    { href: "/favorites", label: "Favorites", icon: Heart },
    { href: "/about", label: "About", icon: Info },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  const socialLinks = [
    { href: "https://github.com", icon: FaGithub, label: "GitHub" },
    { href: "https://instagram.com", icon: FaInstagram, label: "Instagram" },
    { href: "https://facebook.com", icon: FaFacebook, label: "Facebook" },
    { href: "https://linkedin.com", icon: FaLinkedin, label: "LinkedIn" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerBrand}>
          <Link href="/" className={styles.footerLogo}>
            <FaUtensils className={styles.logoIcon} />
            <span className={styles.logoText}>
              Recipe<span className={styles.logoAccent}>Explorer</span>
            </span>
          </Link>
          <p className={styles.brandDescription}>
            Discover amazing recipes from around the world. Cook, share and
            enjoy!
          </p>
        </div>

        <div className={styles.footerNav}>
          <h3 className={styles.footerTitle}>Quick Links</h3>
          <div className={styles.navLinks}>
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.footerLink} ${
                    pathname === item.href ? styles.footerLinkActive : ""
                  }`}
                >
                  <IconComponent size={16} className={styles.linkIcon} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className={styles.footerSocial}>
          <h3 className={styles.footerTitle}>Connect With Us</h3>
          <div className={styles.socialLinks}>
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  className={styles.socialLink}
                  target="_blank"
                  aria-label={social.label}
                >
                  <IconComponent size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.footerBottomContainer}>
          <p className={styles.copyright}>
            © 2025 RecipeExplorer. All rights reserved.
          </p>
          <div className={styles.footerBottomLinks}>
            <Link href="#" className={styles.bottomLink}>
              Privacy Policy
            </Link>
            <Link href="#" className={styles.bottomLink}>
              Terms of Service
            </Link>
            <Link href="#" className={styles.bottomLink}>
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
