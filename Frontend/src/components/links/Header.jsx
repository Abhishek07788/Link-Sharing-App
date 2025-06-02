import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/Header.module.css";
import { useRouter } from "next/router";

const Header = () => {
  const [activeTab, setActiveTab] = useState("links");
  const route = useRouter();

  useEffect(() => {
    const path = route.pathname;
    if (path === "/") {
      setActiveTab("links");
    } else if (path.includes("profile")) {
      setActiveTab("profile");
    }
  }, [route.pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image
          src="/images/logo-devlinks-large.svg"
          alt="DevLinks Desktop Logo"
          className={styles.desktopLogo}
          width={146}
          height={32}
        />
        <Image
          src="/images/logo-devlinks-small.svg"
          alt="DevLinks Mobile Logo"
          className={styles.mobileLogo}
          width={32}
          height={32}
        />
      </div>

      <div className={styles.navCenter}>
        <button
          className={`${styles.navButton} ${
            activeTab === "links" ? styles.activeNav : styles.inactiveNav
          }`}
          onClick={() => {setActiveTab("links"); route.push("/")}}
        >
          <Image
            src="/images/icon-links-header.svg"
            alt="Links"
            width={20}
            height={20}
            className={styles.iconPurple}
          />
          <span className={styles.buttonText}>Links</span>
        </button>

        <button
          className={`${styles.navButton} ${
            activeTab === "profile" ? styles.activeNav : styles.inactiveNav
          }`}
          onClick={() => {setActiveTab("profile"); route.push("/profile")}}
        >
          <Image
            src="/images/icon-profile-details-header.svg"
            alt="Profile"
            width={20}
            height={20}
            className={styles.iconPurple}
          />
          <span className={styles.buttonText}>Profile Details</span>
        </button>
      </div>

      <div className={styles.previewContainer}>
        <button className={styles.previewButton}>
          <Image
            src="/images/icon-preview-header.svg"
            alt="Preview"
            width={16}
            height={16}
            className={styles.previewIcon}
          />
          <span className={styles.previewText}>Preview</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
