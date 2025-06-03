import Image from "next/image";
import styles from "@/styles/PhonePreview.module.css";
import { PLATFORMS } from "@/utils/config";
import { useContext } from "react";
import { AuthContext } from "@/context/authProvider";
import { ProfileView } from "@/pages/profile";

export default function PhonePreview({ storedLinks = [] }) {
  const { user } = useContext(AuthContext);

  const getPlatformData = (platformValue) => {
    return PLATFORMS.find((p) => p.value === platformValue);
  };

  return (
    <div className={styles.mockup}>
    <div className={styles.phoneContainer}>
      <div className={styles.linksOverlay}>
      <ProfileView user={user} />{/*  Image and name and username */}
      <div className={styles.linksContainer}>
        {storedLinks.map((link) => {
          const platform = getPlatformData(link.platform);
          if (!platform) return null;

          return (
            <div
              key={platform.value}
              className={styles.linkButton}
              style={{ backgroundColor: platform.bgColor }}
            >
              <div className={styles.left}>
                <Image
                  src={platform.icon}
                  alt={platform.label}
                  width={20}
                  height={20}
                />
                <span>{platform.label}</span>
              </div>
              <a
                href={link.url.startsWith("http") ? link.url : `https://${link.url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/icon-arrow-right.svg"
                  alt="arrow"
                  width={20}
                  height={20}
                  className={styles.arrowIcon}
                />
              </a>
            </div>
          );
        })}
        </div>
      </div>
    </div>
    </div>
  );
}